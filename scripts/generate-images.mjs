#!/usr/bin/env node
/**
 * Generate the localized Inspira image set via the Higgsfield CLI.
 *
 *   node scripts/generate-images.mjs             # generate anything missing
 *   node scripts/generate-images.mjs --skip-existing  # only fill in what is missing
 *   node scripts/generate-images.mjs --only banner-distribution,menu_about
 *   node scripts/generate-images.mjs --dry-run   # print the plan, spend nothing
 *
 * Prompts are the ones agreed in docs/localized-image-brief.md. Each render is
 * downloaded and re-encoded to the exact filename + format the site already
 * references, so no source changes are needed afterwards.
 *
 * Model: nano_banana (Google) — Higgsfield's budget realistic text-to-image model,
 * 1 credit per image. 15 images => ~15 credits.
 */

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { writeFile, mkdir, readFile, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const execFileAsync = promisify(execFile);

const MODEL = "nano_banana";
const PUBLIC_DIR = "public";
const TMP_DIR = path.join("node_modules", ".cache", "hf-renders");

/** Appended to every prompt — hallucinated lettering is the main failure mode here. */
const NEGATIVE =
    "No text, no lettering, no captions, no signage, no logos, no watermarks, " +
    "no readable numbers, no brand names, no name badges.";

const STYLE =
    "Authentic Sri Lankan setting, South Asian people with brown skin and black hair. " +
    "Warm tropical daylight, friendly and professional, documentary editorial photography, " +
    "shot on 35mm, natural colour, shallow depth of field.";

const JOBS = [
    // ---------- Hero banners (16:9) ----------
    {
        id: "banner-distribution",
        out: "banner-distribution.jpg",
        aspect: "16:9",
        encode: { format: "jpeg", width: 1920, height: 1080, quality: 82 },
        prompt:
            "Wide editorial photograph inside a Sri Lankan pharmaceutical distribution warehouse in Colombo. " +
            "Two Sri Lankan warehouse staff in clean navy polo uniforms and hairnets check a handheld scanner " +
            "beside tall pallet racking stacked with plain white medicine cartons. Bright modern facility, " +
            "polished concrete floor, yellow floor safety lines, warm daylight from high windows. " +
            "Competent and approachable expressions. Generous clean negative space on the left third for a text overlay.",
    },
    {
        id: "banner-cold-chain",
        out: "banner-cold-chain.jpg",
        aspect: "16:9",
        encode: { format: "jpeg", width: 1920, height: 1080, quality: 82 },
        prompt:
            "Wide editorial photograph of a pharmaceutical cold-storage room in Sri Lanka. A Sri Lankan logistics " +
            "technician in an insulated navy jacket and gloves checks a temperature display on a stainless steel " +
            "cold-room door while holding a clipboard. Cool blue light spilling from the open cold room contrasted " +
            "with warm facility light behind. Clean, modern, clinical but human. " +
            "Clean negative space on the left for a text overlay.",
    },
    {
        id: "banner-partnership",
        out: "banner-partnership.jpg",
        aspect: "16:9",
        encode: { format: "jpeg", width: 1920, height: 1080, quality: 82 },
        prompt:
            "Wide editorial photograph of a warm business meeting in a modern Colombo office. Three Sri Lankan " +
            "business professionals — a woman in a smart blazer and two men in open-collar shirts — talk over " +
            "documents at a light wood table, one laughing. Large windows with lush tropical green foliage and " +
            "soft Colombo daylight outside. Genuine collaborative energy, not stiff or corporate. " +
            "Clean space on the left for a text overlay.",
    },

    // ---------- Process steps (4:3) ----------
    {
        id: "process_step_1",
        out: "process_step_1_clean.webp",
        aspect: "4:3",
        encode: { format: "webp", width: 1200, height: 900, quality: 80 },
        prompt:
            "Editorial photograph of a friendly business meeting in a modern Colombo office. Four Sri Lankan " +
            "professionals, a mix of women and men in smart business attire, discuss a product portfolio over a " +
            "tablet and printed documents at a meeting table. Warm daylight through large windows, lush green " +
            "foliage outside. Engaged, warm, collaborative body language.",
    },
    {
        id: "process_step_2",
        out: "process_step_2_clean.webp",
        aspect: "4:3",
        encode: { format: "webp", width: 1200, height: 900, quality: 80 },
        prompt:
            "Editorial photograph inside a bright Sri Lankan pharmaceutical warehouse. A Sri Lankan woman in a navy " +
            "warehouse polo and hairnet works at a mobile standing desk with a laptop, beside tall racking of plain " +
            "white medicine cartons on wooden pallets. A colleague moves a pallet trolley in the background. " +
            "Clean polished concrete floor, yellow safety lines, bright natural daylight. Organised and professional.",
    },
    {
        id: "process_step_3",
        out: "process_step_3_clean.webp",
        aspect: "4:3",
        encode: { format: "webp", width: 1200, height: 900, quality: 80 },
        prompt:
            "Editorial photograph of a busy loading bay at a pharmaceutical distribution centre in Sri Lanka. " +
            "Sri Lankan warehouse crew in navy uniforms load sealed cartons into plain white delivery vans under a " +
            "covered dock. Tropical sunlight, palm trees and green hills in the far background. " +
            "Energetic, coordinated, purposeful movement. No number plates.",
    },
    {
        id: "process_step_4",
        out: "process_step_4_clean.webp",
        aspect: "4:3",
        encode: { format: "webp", width: 1200, height: 900, quality: 80 },
        prompt:
            "Editorial photograph of two Sri Lankan business professionals reviewing distribution performance on a " +
            "large wall-mounted screen in a modern Colombo office. A woman in a smart blazer points at a simple " +
            "abstract line chart while a male colleague takes notes on a tablet. Warm daylight, plants, " +
            "contemporary office. Focused and constructive.",
    },

    // ---------- Navigation menu images (1:1) ----------
    {
        id: "menu_about",
        out: "menu_about_compressed.jpg",
        aspect: "1:1",
        encode: { format: "jpeg", width: 600, height: 600, quality: 80 },
        prompt:
            "Square editorial photograph of a pharmaceutical distribution team in Sri Lanka. A group of five " +
            "Sri Lankan colleagues in navy polos and smart business attire stand together in a bright warehouse " +
            "aisle, relaxed and smiling naturally at the camera. Pallet racking softly out of focus behind them. " +
            "Warm, human, trustworthy.",
    },
    {
        id: "menu_careers",
        out: "menu_careers_compressed.jpg",
        aspect: "1:1",
        encode: { format: "jpeg", width: 600, height: 600, quality: 80 },
        prompt:
            "Square editorial photograph of a young Sri Lankan professional in a plain navy company polo standing " +
            "confidently in a bright pharmaceutical warehouse, holding a tablet, smiling warmly at the camera. " +
            "Colleagues working softly out of focus behind. Optimistic and welcoming.",
    },
    {
        id: "menu_newsroom",
        out: "menu_newsroom_compressed.jpg",
        aspect: "1:1",
        encode: { format: "jpeg", width: 600, height: 600, quality: 80 },
        prompt:
            "Square editorial photograph of a Sri Lankan corporate announcement event in Colombo. A Sri Lankan woman " +
            "in a smart business sari speaks at a simple modern lectern to a seated audience of Sri Lankan business " +
            "professionals in a bright contemporary conference room. Warm professional lighting, tropical daylight " +
            "from side windows. Dignified and modern. Blank screens with nothing written on them.",
    },
    {
        id: "menu_collaboration",
        out: "menu_collaboration_compressed.jpg",
        aspect: "1:1",
        encode: { format: "jpeg", width: 600, height: 600, quality: 80 },
        prompt:
            "Square editorial photograph of a warm partnership handshake between two Sri Lankan business " +
            "professionals in a modern Colombo office, colleagues smiling around them. Light wood table, documents, " +
            "large windows with tropical green foliage outside. Genuine warmth and mutual respect.",
    },

    // ---------- Article images (16:9) ----------
    {
        id: "article_market_entry",
        out: "article_market_entry.png",
        aspect: "16:9",
        encode: { format: "png", width: 1600, height: 900 },
        prompt:
            "Editorial photograph of a strategy meeting in a modern Colombo office tower. Five Sri Lankan business " +
            "professionals in smart attire discuss market plans around a table with printed charts and laptops. " +
            "Through floor-to-ceiling windows, a Colombo skyline at dusk with the Indian Ocean beyond. " +
            "Serious, capable, collaborative. Warm interior light against a blue evening sky. Charts are abstract and unreadable.",
    },
    {
        id: "article_pharmacy_retail",
        out: "article_pharmacy_retail.png",
        aspect: "16:9",
        encode: { format: "png", width: 1600, height: 900 },
        prompt:
            "Editorial photograph inside a bright modern Sri Lankan neighbourhood pharmacy in Colombo. A Sri Lankan " +
            "pharmacist in a plain white coat smiles while accepting a sealed delivery carton from a Sri Lankan " +
            "delivery driver in a navy uniform and cap across the counter. Neat shelves of plain unlabelled medicine " +
            "boxes, warm daylight from the shop front. Friendly everyday local commerce.",
    },

    // ---------- Supporting (1:1) ----------
    {
        id: "b2b_logistics",
        out: "b2b-logistics.png",
        aspect: "1:1",
        encode: { format: "png", width: 900, height: 900 },
        prompt:
            "Square editorial photograph of a pharmaceutical packing line in a clean Sri Lankan facility. Plain " +
            "white medicine cartons move along a stainless conveyor under bright even lighting, a Sri Lankan " +
            "operator in a hairnet and navy polo softly out of focus behind. Cool clean industrial palette with " +
            "warm skin tones. No barcodes.",
    },
    {
        id: "warehouse_vertical",
        out: "warehouse-vertical.png",
        aspect: "1:1",
        encode: { format: "png", width: 900, height: 900 },
        prompt:
            "Square editorial photograph looking down a long aisle of a large Sri Lankan pharmaceutical warehouse. " +
            "Tall racking on both sides stacked with plain white cartons, receding to a bright vanishing point. " +
            "A Sri Lankan warehouse worker in a navy polo walks in the middle distance. Cool blue industrial " +
            "palette, clean polished floor, dramatic symmetry.",
    },
];

/* ------------------------------------------------------------------ */

const args = process.argv.slice(2);
const SKIP_EXISTING = args.includes("--skip-existing");
const DRY_RUN = args.includes("--dry-run");
const onlyArg = args.find((a) => a.startsWith("--only"));
const ONLY = onlyArg
    ? (onlyArg.includes("=") ? onlyArg.split("=")[1] : args[args.indexOf(onlyArg) + 1] || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : null;

const hf = process.platform === "win32" ? "higgsfield.cmd" : "higgsfield";

function buildPrompt(job) {
    return `${job.prompt} ${STYLE} ${NEGATIVE}`;
}

async function run(cmd, cmdArgs, timeoutMs = 15 * 60 * 1000) {
    return execFileAsync(cmd, cmdArgs, {
        timeout: timeoutMs,
        maxBuffer: 32 * 1024 * 1024,
        windowsHide: true,
        shell: process.platform === "win32",
    });
}

async function checkAuth() {
    try {
        await run(hf, ["auth", "token"], 60_000);
        return true;
    } catch (err) {
        const text = `${err.stdout || ""}${err.stderr || ""}${err.message || ""}`;
        if (/binary not found|ENOENT|spawn/i.test(text)) {
            throw new Error(
                "The Higgsfield CLI binary is missing (Windows Defender quarantined it).\n" +
                "Restore it from an elevated PowerShell, then re-run this script."
            );
        }
        throw new Error("Not authenticated. Run: higgsfield auth login");
    }
}

/** Pull the first http(s) media URL out of the CLI's JSON or plain output. */
function extractUrl(stdout) {
    try {
        const parsed = JSON.parse(stdout);
        const found = [];
        (function walk(node) {
            if (!node) return;
            if (typeof node === "string") {
                if (/^https?:\/\/\S+\.(png|jpe?g|webp)(\?|$)/i.test(node)) found.push(node);
                return;
            }
            if (Array.isArray(node)) return node.forEach(walk);
            if (typeof node === "object") return Object.values(node).forEach(walk);
        })(parsed);
        if (found.length) return found[found.length - 1];
    } catch {
        /* not JSON — fall through to regex */
    }
    const m = stdout.match(/https?:\/\/\S+?\.(?:png|jpe?g|webp)(?=[\s"']|$)/gi);
    return m ? m[m.length - 1] : null;
}

async function download(url, dest) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Download failed: HTTP ${res.status}`);
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
}

async function encode(srcPath, job) {
    const { format, width, height, quality } = job.encode;
    const dest = path.join(PUBLIC_DIR, job.out);
    let pipeline = sharp(srcPath).resize(width, height, { fit: "cover", position: "centre" });

    if (format === "jpeg") pipeline = pipeline.jpeg({ quality, mozjpeg: true });
    else if (format === "webp") pipeline = pipeline.webp({ quality });
    else pipeline = pipeline.png({ compressionLevel: 9 });

    await pipeline.toFile(dest);
    return dest;
}

async function generate(job) {
    const cmdArgs = [
        "generate", "create", MODEL,
        "--prompt", buildPrompt(job),
        "--aspect_ratio", job.aspect,
        "--wait",
        "--wait-timeout", "12m",
        "--json",
    ];

    const { stdout } = await run(hf, cmdArgs);
    const url = extractUrl(stdout);
    if (!url) throw new Error("No image URL in CLI output:\n" + stdout.slice(0, 400));

    const tmp = path.join(TMP_DIR, `${job.id}.raw`);
    await download(url, tmp);
    const dest = await encode(tmp, job);
    await unlink(tmp).catch(() => { });
    return dest;
}

/* ------------------------------------------------------------------ */

async function main() {
    // Every file in the manifest is one we intend to REPLACE — the existing assets are
    // the un-localized ones. So the default is "generate all"; --skip-existing opts out.
    let queue = JOBS;
    if (ONLY) queue = queue.filter((j) => ONLY.includes(j.id));
    if (SKIP_EXISTING) {
        queue = queue.filter((j) => !existsSync(path.join(PUBLIC_DIR, j.out)));
    }

    if (queue.length === 0) {
        console.log("Nothing to generate for that selection.");
        return;
    }

    console.log(`Model: ${MODEL} · ${queue.length} image(s) · ~${queue.length} credit(s)\n`);

    if (DRY_RUN) {
        queue.forEach((j, i) =>
            console.log(`${String(i + 1).padStart(2)}. ${j.out}  [${j.aspect}]\n    ${buildPrompt(j).slice(0, 150)}…\n`)
        );
        return;
    }

    await checkAuth();
    await mkdir(TMP_DIR, { recursive: true });

    const done = [];
    const failed = [];

    for (const [i, job] of queue.entries()) {
        const label = `[${i + 1}/${queue.length}] ${job.out}`;
        process.stdout.write(`${label} … `);
        try {
            const dest = await generate(job);
            console.log(`ok -> ${dest}`);
            done.push(job.out);
        } catch (err) {
            console.log(`FAILED: ${err.message.split("\n")[0]}`);
            failed.push({ id: job.id, reason: err.message.split("\n")[0] });
            // A missing binary or bad auth will fail every remaining job — stop early.
            if (/binary is missing|Not authenticated|Out of credits/i.test(err.message)) {
                console.log("\nStopping: this failure affects every remaining job.");
                break;
            }
        }
    }

    console.log(`\n${done.length} generated, ${failed.length} failed.`);
    if (failed.length) {
        failed.forEach((f) => console.log(`  - ${f.id}: ${f.reason}`));
        console.log(`\nRetry just those:  node scripts/generate-images.mjs --only ${failed.map((f) => f.id).join(",")}`);
        process.exitCode = 1;
    } else {
        console.log("\nReview every render for hallucinated text before shipping.");
    }
}

main().catch((err) => {
    console.error("\n" + err.message);
    process.exitCode = 1;
});
