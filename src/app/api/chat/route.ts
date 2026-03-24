import { openai } from '@ai-sdk/openai';
import { generateText, tool, stepCountIs } from 'ai';
import { SYSTEM_PROMPT } from '@/lib/ai-context';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

// Service-role client for server-side operations that bypass RLS
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || '',
);

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        // Validate API key
        if (!process.env.OPENAI_API_KEY) {
            return new Response(JSON.stringify({ error: 'API key not configured' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const { messages, sessionId } = await req.json();

        // Validate messages
        if (!messages || !Array.isArray(messages)) {
            return new Response(JSON.stringify({ error: 'Messages required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Extract the latest user message to log to Supabase
        const latestMessage = messages[messages.length - 1];

        if (sessionId && latestMessage && latestMessage.role === 'user') {
            // Log user message to Supabase asynchronously (don't block the request)
            supabase.from('chat_messages').insert([
                {
                    session_id: sessionId,
                    role: 'user',
                    content: typeof latestMessage.content === 'string' ? latestMessage.content : '',
                }
            ]).then(({ error }) => {
                if (error) console.error("Error logging user message to Supabase:", error);
            });
        }

        // Format messages for the API
        const formattedMessages = messages.map((msg: { role: string; content: unknown }) => ({
            role: msg.role as 'user' | 'assistant' | 'system',
            content: typeof msg.content === 'string' ? msg.content : '',
        }));

        // Call OpenAI with tool support
        const result = await generateText({
            model: openai('gpt-4o-mini'),
            system: SYSTEM_PROMPT,
            messages: formattedMessages,
            stopWhen: stepCountIs(5),
            tools: {
                saveLead: tool({
                    description: 'Save a customer as a new lead in the CRM. Use this when you have gathered enough info about a prospect during the conversation. Generate notes summarizing what the customer is interested in based on the conversation.',
                    inputSchema: z.object({
                        name: z.string().describe("The prospect's full name"),
                        phone: z.string().optional().describe("The prospect's phone number"),
                        email: z.string().optional().describe("The prospect's email address"),
                        company: z.string().optional().describe("The prospect's company name"),
                        notes: z.string().describe("AI-generated summary of the conversation: what the customer seemed interested in, key topics discussed, and any specific needs or requirements mentioned."),
                    }),
                    execute: async ({ name, phone, email, company, notes }) => {
                        console.log(`Executing saveLead tool for ${name}...`);
                        try {
                            // 1. Insert into contacts table
                            const { data: contactData, error: contactError } = await supabaseAdmin
                                .from('contacts')
                                .insert([{
                                    name,
                                    email: email || null,
                                    phone: phone || null,
                                    company: company || null,
                                }])
                                .select('id')
                                .single();

                            if (contactError) {
                                console.error('Supabase contacts insert error:', contactError);
                                return { success: false, error: contactError.message };
                            }

                            // 2. Get the "New Leads" stage ID
                            const { data: stageData, error: stageError } = await supabaseAdmin
                                .from('crm_stages')
                                .select('id')
                                .eq('name', 'New Leads')
                                .single();

                            if (stageError) {
                                console.error('Supabase stage lookup error:', stageError);
                                // Lead was saved to contacts even if stage lookup fails
                                return {
                                    success: true,
                                    contactId: contactData.id,
                                    message: `Contact saved for ${name} (CRM stage assignment skipped)`,
                                };
                            }

                            // 3. Count existing leads in this stage for position
                            const { count } = await supabaseAdmin
                                .from('crm_leads')
                                .select('id', { count: 'exact', head: true })
                                .eq('stage_id', stageData.id);

                            // 4. Create a CRM lead entry
                            const { error: leadError } = await supabaseAdmin
                                .from('crm_leads')
                                .insert([{
                                    title: company ? `${company} — ${name}` : `Inquiry from ${name}`,
                                    contact_id: contactData.id,
                                    stage_id: stageData.id,
                                    notes: notes,
                                    position: (count || 0),
                                }]);

                            if (leadError) {
                                console.error('Supabase crm_leads insert error:', leadError);
                                return {
                                    success: true,
                                    contactId: contactData.id,
                                    message: `Contact saved for ${name} (CRM lead creation had an issue)`,
                                };
                            }

                            return {
                                success: true,
                                contactId: contactData.id,
                                message: `Lead saved successfully for ${name}`,
                            };
                        } catch (e: unknown) {
                            const err = e as Error;
                            console.error('saveLead caught error:', err);
                            return { success: false, error: err.message };
                        }
                    }
                }),
                subscribeNewsletter: tool({
                    description: 'Subscribe a user to the Inspira Worldwide newsletter. Use this when a user agrees to receive updates and provides their email address.',
                    inputSchema: z.object({
                        email: z.string().email().describe("The user's email address for the newsletter subscription"),
                        name: z.string().optional().describe("The user's name if available"),
                        topic_interest: z.string().describe("The specific service or topic the user is interested in based on the conversation (e.g., 'Island-Wide Distribution', 'Warehousing'), or 'general' if no specific interest was detected"),
                    }),
                    execute: async ({ email, name, topic_interest }) => {
                        console.log(`Executing subscribeNewsletter tool for ${email} (topic: ${topic_interest})...`);
                        try {
                            // Use the anon client since anonymous inserts are allowed on email_subscribers
                            const { error } = await supabase
                                .from('email_subscribers')
                                .insert([{
                                    email,
                                    name: name || null,
                                    source: 'ai_agent',
                                }]);

                            if (error) {
                                // Handle duplicate email gracefully
                                if (error.code === '23505') {
                                    return {
                                        success: true,
                                        message: `${email} is already subscribed to updates`,
                                    };
                                }
                                console.error('Supabase subscribeNewsletter error:', error);
                                return { success: false, error: error.message };
                            }

                            return {
                                success: true,
                                message: `Successfully subscribed ${email} to newsletter updates on ${topic_interest}`,
                            };
                        } catch (e: unknown) {
                            const err = e as Error;
                            console.error('subscribeNewsletter caught error:', err);
                            return { success: false, error: err.message };
                        }
                    }
                }),
            }
        });

        const responseText = result.text ?? '';

        if (sessionId) {
            // Log AI response to Supabase asynchronously
            supabase.from('chat_messages').insert([
                {
                    session_id: sessionId,
                    role: 'assistant',
                    content: responseText,
                }
            ]).then(({ error }) => {
                if (error) console.error("Error logging AI message to Supabase:", error);
            });
        }

        // Return response
        return new Response(JSON.stringify({ content: responseText }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error: unknown) {
        const err = error as Error;
        console.error('Chat API Error:', err);
        return new Response(JSON.stringify({
            error: 'Internal server error',
            details: err.message ?? String(error),
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
