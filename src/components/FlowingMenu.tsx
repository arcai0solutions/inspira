"use client";
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';

interface MenuItemData {
    link: string;
    text: string;
    image: string;
}

interface FlowingMenuProps {
    items?: MenuItemData[];
    speed?: number;
    textColor?: string;
    bgColor?: string;
    marqueeBgColor?: string;
    marqueeTextColor?: string;
    borderColor?: string;
}

interface MenuItemProps extends MenuItemData {
    speed: number;
    textColor: string;
    marqueeBgColor: string;
    marqueeTextColor: string;
    borderColor: string;
    isFirst: boolean;
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({
    items = [],
    speed = 15,
    textColor = '#fff',
    bgColor = '#060010',
    marqueeBgColor = '#fff',
    marqueeTextColor = '#060010',
    borderColor = '#fff'
}) => {
    return (
        <div className="w-full h-full pt-20 md:pt-28 overflow-hidden flex flex-col justify-end pb-8" style={{ backgroundColor: bgColor }}>
            <nav className="flex flex-col h-full max-h-[85vh] m-0 p-0">
                {items.map((item, idx) => (
                    <MenuItem
                        key={idx}
                        {...item}
                        speed={speed}
                        textColor={textColor}
                        marqueeBgColor={marqueeBgColor}
                        marqueeTextColor={marqueeTextColor}
                        borderColor={borderColor}
                        isFirst={idx === 0}
                    />
                ))}
            </nav>
        </div>
    );
};

const MenuItem: React.FC<MenuItemProps> = ({
    link,
    text,
    image,
    speed,
    textColor,
    marqueeBgColor,
    marqueeTextColor,
    borderColor,
    isFirst
}) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const marqueeInnerRef = useRef<HTMLDivElement>(null);
    const marqueeScrollRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Tween | null>(null);
    const [repetitions, setRepetitions] = useState(4);

    const animationDefaults = { duration: 0.6, ease: 'expo' };

    const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {
        const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
        const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
        return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
    };

    useEffect(() => {
        const calculateRepetitions = () => {
            if (!marqueeScrollRef.current) return;
            const marqueeContent = marqueeScrollRef.current.querySelector('.marquee-part') as HTMLElement;
            if (!marqueeContent) return;
            const contentWidth = marqueeContent.offsetWidth;
            const viewportWidth = window.innerWidth;
            const needed = Math.ceil(viewportWidth / contentWidth) + 2;
            setRepetitions(Math.max(4, needed));
        };

        calculateRepetitions();
        window.addEventListener('resize', calculateRepetitions);
        return () => window.removeEventListener('resize', calculateRepetitions);
    }, [text, image]);

    useEffect(() => {
        let resizeObserver: ResizeObserver | null = null;

        const setupMarquee = () => {
            if (!marqueeScrollRef.current) return;
            const marqueeContent = marqueeScrollRef.current.querySelector('.marquee-part') as HTMLElement;
            if (!marqueeContent) return;
            const contentWidth = marqueeContent.offsetWidth;
            if (contentWidth === 0) return;

            if (animationRef.current) {
                animationRef.current.kill();
            }

            animationRef.current = gsap.to(marqueeScrollRef.current, {
                x: -contentWidth,
                duration: speed,
                ease: 'none',
                repeat: -1,
                overwrite: "auto",
            });
        };

        if (marqueeScrollRef.current) {
            resizeObserver = new ResizeObserver(() => {
                setupMarquee();
            });
            resizeObserver.observe(marqueeScrollRef.current);
        }

        const timer = setTimeout(setupMarquee, 100);
        return () => {
            clearTimeout(timer);
            if (resizeObserver) resizeObserver.disconnect();
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, [text, image, repetitions, speed]);

    const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

        gsap
            .timeline({ defaults: { ...animationDefaults, overwrite: "auto" } })
            .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
            .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
            .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
    };

    const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

        gsap
            .timeline({ defaults: { ...animationDefaults, overwrite: "auto" } })
            .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
            .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
    };

    return (
        <div
            className="flex-1 relative overflow-hidden text-center flex items-center justify-center"
            ref={itemRef}
            style={{ borderTop: isFirst ? 'none' : `1px solid ${borderColor}` }}
        >
            <Link
                className="flex items-center justify-center w-full relative cursor-pointer uppercase no-underline font-semibold tracking-wide text-[28px] md:text-[36px] lg:text-[52px] py-3 md:py-4 transition-colors"
                href={link}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ color: textColor }}
                aria-label={`Navigate to ${text}`}
            >
                {text}
            </Link>
            <div
                className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none translate-y-[101%] flex items-center justify-center will-change-transform"
                ref={marqueeRef}
                style={{ backgroundColor: marqueeBgColor }}
                aria-hidden="true"
            >
                <div className="h-full w-full flex items-center will-change-transform" ref={marqueeInnerRef}>
                    <div className="h-full w-fit flex items-center will-change-transform" ref={marqueeScrollRef}>
                        {[...Array(repetitions)].map((_, idx) => (
                            <div className="marquee-part flex items-center flex-shrink-0 h-full" key={idx} style={{ color: marqueeTextColor }}>
                                <span className="whitespace-nowrap uppercase font-bold text-[28px] md:text-[36px] lg:text-[52px] leading-[1] px-[4vw] tracking-wider">{text}</span>
                                <div
                                    className="relative w-[120px] md:w-[180px] xl:w-[220px] h-[50px] md:h-[60px] my-[10px] mx-[2vw] rounded-[16px] shadow-lg overflow-hidden flex-shrink-0"
                                >
                                    <Image
                                        src={image}
                                        alt={text}
                                        fill
                                        sizes="(max-width: 768px) 120px, (max-width: 1280px) 180px, 220px"
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlowingMenu;
