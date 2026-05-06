"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface JourneyItem {
    year: string;
    title: string;
    role: string;
    description: string;
}

const journeyItems: JourneyItem[] = [
    {
        year: "2023 – 2026",
        title: "SMK Negeri 1 Jenangan",
        role: "Rekayasa Perangkat Lunak",
        description:
            "Mempelajari dasar-dasar pemrograman, pengembangan web, dan rekayasa perangkat lunak secara profesional. Aktif dalam berbagai proyek nyata dan pengembangan sistem yang relevan dengan industri.",
    },
    {
        year: "2023 – 2024",
        title: "Web Developer",
        role: "Frontend Developer",
        description:
            "Merancang dan mengembangkan website statis & interaktif berkinerja tinggi menggunakan HTML, CSS, dan JavaScript. Mengerjakan berbagai pesanan klien: landing page, toko online, dan profil bisnis.",
    },
    {
        year: "2025 – Sekarang",
        title: "Full Stack Developer",
        role: "Full Stack Developer + WordPress",
        description:
            "Mengembangkan aplikasi web full stack menggunakan React/Vue + Node.js/Express + MySQL, PostgreSQL & Supabase. Membangun website WordPress dengan custom theme & plugin untuk berbagai proyek klien.",
    },
];

// ── Content block shared by both mobile and desktop ───────────────────────────
function EntryContent({ item, align }: { item: JourneyItem; align: "left" | "right" | "mobile" }) {
    const isRight = align === "right";
    const isMobile = align === "mobile";

    const wrapper = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
    };
    const fadeUp = {
        hidden: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as number[] } },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-40px" }}
            variants={wrapper}
            className={`flex flex-col ${
                isMobile ? "items-start text-left" :
                isRight ? "items-start text-left" : "items-end text-right"
            }`}
        >
            <motion.h3
                variants={fadeUp}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-none mb-3 md:mb-5 transition-colors duration-300"
                style={{ color: "var(--journey-text, #ffffff)" }}
            >
                {item.title}
            </motion.h3>
            <motion.p
                variants={fadeUp}
                className="text-sm sm:text-base leading-relaxed mb-3 md:mb-5 transition-colors duration-300"
                style={{ color: "var(--journey-text-muted, #9CA3AF)" }}
            >
                {item.role}
            </motion.p>
            <motion.p
                variants={fadeUp}
                className="text-sm leading-relaxed mb-4 md:mb-6 max-w-xs transition-colors duration-300"
                style={{ color: "var(--journey-text-dim, #6B7280)" }}
            >
                {item.description}
            </motion.p>
            <motion.span
                variants={fadeUp}
                className="text-[11px] font-mono uppercase tracking-[0.18em] transition-colors duration-300"
                style={{ color: "var(--journey-text-dimmer, #4B5563)" }}
            >
                {item.year}
            </motion.span>
        </motion.div>
    );
}

// ── Mobile entry — single column with left-side vertical line ─────────────────
function MobileEntry({ item, index }: { item: JourneyItem; index: number }) {
    return (
        <div className="relative pl-8 pb-12 last:pb-0">
            {/* Dot */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, margin: "-20px" }}
                transition={{ duration: 0.35, delay: 0.1, ease: "backOut" }}
                className="absolute left-0 top-1 w-3.5 h-3.5 -translate-x-1/2 rounded-full z-10"
                style={{ background: "#BEF264", boxShadow: "0 0 12px rgba(190,242,100,0.7)" }}
            />
            <EntryContent item={item} align="mobile" />
        </div>
    );
}

// ── Desktop entry — alternating left / right ──────────────────────────────────
function DesktopEntry({ item, index }: { item: JourneyItem; index: number }) {
    const isLeft = index % 2 === 0;
    return (
        <div className="hidden md:grid grid-cols-[1fr_80px_1fr] lg:grid-cols-[1fr_100px_1fr] items-start min-h-[320px]">
            {/* Left side */}
            <div className={isLeft ? "pr-8 lg:pr-12 py-14 flex flex-col items-end" : ""}>
                {isLeft && <EntryContent item={item} align="left" />}
            </div>

            {/* Center dot */}
            <div className="flex flex-col items-center">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.35, delay: 0.15, ease: "backOut" }}
                    className="mt-16 w-4 h-4 rounded-full relative z-10"
                    style={{ background: "#BEF264", boxShadow: "0 0 16px rgba(190,242,100,0.8)" }}
                />
            </div>

            {/* Right side */}
            <div className={!isLeft ? "pl-8 lg:pl-12 py-14 flex flex-col items-start" : ""}>
                {!isLeft && <EntryContent item={item} align="right" />}
            </div>
        </div>
    );
}

// ── Main Journey Component ────────────────────────────────────────────────────
export function Journey() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const desktopTimelineRef = useRef<HTMLDivElement>(null);
    const mobileLineRef = useRef<HTMLDivElement>(null);

    // Scroll-driven background color (white ↔ black)
    // FIX: Do NOT pass color strings to useTransform — Framer Motion's mixObject
    // crashes on unmount when trying to interpolate between string color values.
    // Instead, subscribe to the MotionValue via useEffect and write directly to
    // element.style. The unsubscribe cleanup ensures no crash on page navigation.
    const { scrollYProgress: bgProg } = useScroll({
        target: wrapperRef,
        offset: ["start end", "end start"],
    });
    const smoothBg = useSpring(bgProg, { stiffness: 55, damping: 20, mass: 0.5 });

    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;

        const unsubscribe = smoothBg.on("change", (v: number) => {
            // Map: 0→rgb(255,255,255), 0.14→rgb(10,10,10), 0.86→rgb(10,10,10), 1→rgb(255,255,255)
            let channel: number;
            if (v <= 0.14) {
                const t = v / 0.14;
                channel = Math.round(255 + (10 - 255) * t);
            } else if (v <= 0.86) {
                channel = 10;
            } else {
                const t = (v - 0.86) / 0.14;
                channel = Math.round(10 + (255 - 10) * t);
            }
            
            const isDarkBg = channel < 128;
            el.style.backgroundColor = `rgb(${channel},${channel},${channel})`;
            
            // Set text colors based on background brightness
            if (isDarkBg) {
                el.style.setProperty("--journey-text", "#ffffff");
                el.style.setProperty("--journey-text-muted", "#d1d5db"); // zinc-300
                el.style.setProperty("--journey-text-dim", "#9ca3af"); // zinc-400
                el.style.setProperty("--journey-text-dimmer", "#6b7280"); // zinc-500
            } else {
                el.style.setProperty("--journey-text", "#000000");
                el.style.setProperty("--journey-text-muted", "#1f2937"); // gray-800
                el.style.setProperty("--journey-text-dim", "#4b5563"); // gray-600
                el.style.setProperty("--journey-text-dimmer", "#6b7280"); // gray-500
            }
        });

        return () => unsubscribe();
    }, [smoothBg]);

    // Desktop timeline line fill — only numeric values, no strings
    const { scrollYProgress: lineProg } = useScroll({
        target: desktopTimelineRef,
        offset: ["start 70%", "end 40%"],
    });
    const lineScaleY = useTransform(lineProg, [0, 1], [0, 1]);

    // FIX: dotTop previously used string values ("0%", "100%") which triggers
    // mixObject crash. Use a derived transform function that computes numeric px.
    const dotProgress = useTransform(lineProg, [0, 1], [0, 1]);

    // Mobile timeline line fill — only numeric values
    const { scrollYProgress: mobileLineProg } = useScroll({
        target: mobileLineRef,
        offset: ["start 80%", "end 50%"],
    });
    const mobileLineScaleY = useTransform(mobileLineProg, [0, 1], [0, 1]);

    return (
        // Plain div — backgroundColor driven by useEffect subscription above
        <div ref={wrapperRef} className="relative w-full" style={{ backgroundColor: "#ffffff" }}>

            {/* ── HEADING ──────────────────────────────────────────── */}
            <div className="relative flex flex-col items-center justify-center min-h-[50vh] md:min-h-[60vh] text-center px-5 sm:px-8 overflow-hidden z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-2xl h-[300px] bg-lime-500/10 blur-[100px] rounded-full pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex flex-col items-center gap-6"
                >
                    <span className="text-lime-400 font-mono text-sm tracking-[0.2em] uppercase">
                        Experience &amp; Education
                    </span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] max-w-4xl text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 pb-2">
                        Jelajahi perjalanan saya dan teknologi yang membentuk keahlian ini.
                    </h2>
                </motion.div>
            </div>

            {/* ── MOBILE TIMELINE (single column) ──────────────────── */}
            <div ref={mobileLineRef} className="relative md:hidden max-w-lg mx-auto px-5 sm:px-8 pt-10 pb-20">
                {/* Static gray line */}
                <div className="absolute left-[28px] top-0 bottom-0 w-px" style={{ background: "#252525" }} />
                {/* Lime fill line — numeric-only transform */}
                <motion.div
                    className="absolute left-[28px] top-0 w-px"
                    style={{
                        background: "#BEF264",
                        scaleY: mobileLineScaleY,
                        height: "100%",
                        boxShadow: "0 0 8px rgba(190,242,100,0.4)",
                        transformOrigin: "top",
                    }}
                />
                {journeyItems.map((item, i) => (
                    <MobileEntry key={i} item={item} index={i} />
                ))}
            </div>

            {/* ── DESKTOP TIMELINE (alternating) ───────────────────── */}
            <div ref={desktopTimelineRef} className="relative hidden md:block max-w-5xl mx-auto px-6 pt-8 pb-24">
                {/* Gray center line */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px" style={{ background: "#252525" }} />
                {/* Lime fill line — numeric-only transform */}
                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 top-0 w-px"
                    style={{
                        background: "#BEF264",
                        scaleY: lineScaleY,
                        height: "100%",
                        boxShadow: "0 0 12px rgba(190,242,100,0.45)",
                        transformOrigin: "top",
                    }}
                />
                {/* Glowing traveling dot — FIX: numeric pixel translation via transform function */}
                <motion.div
                    className="absolute left-1/2 top-0 z-20 -translate-x-1/2"
                    style={{
                        translateY: useTransform(dotProgress, (v: number) => {
                            const el = desktopTimelineRef.current;
                            if (!el) return 0;
                            return v * el.offsetHeight;
                        }),
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        background: "#BEF264",
                        boxShadow: "0 0 20px 4px rgba(190,242,100,0.6)",
                    }}
                />
                {journeyItems.map((item, i) => (
                    <DesktopEntry key={i} item={item} index={i} />
                ))}
            </div>
        </div>
    );
}
