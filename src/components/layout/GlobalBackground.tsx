"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * =========================================================================
 * KONFIGURASI GLOBAL BACKGROUND
 * =========================================================================
 * - ENABLED: Toggle global on/off untuk seluruh situs
 * - DESKTOP_LINES: Jumlah kurva garis di layar desktop (18 - 22)
 * - MOBILE_LINES: Jumlah kurva garis di layar mobile (8 - 10)
 * - SPEED: Faktor pengali kecepatan gerak cahaya beam (durasi 8-16s)
 * - INTENSITY: Intensitas default cahaya beam
 * =========================================================================
 */
export const GLOBAL_BG_CONFIG = {
    ENABLED: true,
    DESKTOP_LINES: 20,
    MOBILE_LINES: 10,
    SPEED: 1,
    INTENSITY: 1,
    ACTIVE_BEAMS: 7, // Maksimal beam aktif bersamaan
};

interface PathItem {
    id: string;
    d: string;
    isFar: boolean;
    hasBeam: boolean;
    pathLength: number;
    beamLength: number;
    duration: number;
    delay: number;
    reverse: boolean;
}

export function GlobalBackground() {
    const pathname = usePathname();
    const containerRef = useRef<HTMLDivElement>(null);

    const [isMobile, setIsMobile] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [isTabVisible, setIsTabVisible] = useState(true);
    const [isReady, setIsReady] = useState(false);
    const [currentIntensity, setCurrentIntensity] = useState<number>(0.45);

    // Parallax Scroll: Layer jauh (-20px) dan dekat (-40px)
    const { scrollY } = useScroll();
    const farY = useTransform(scrollY, [0, 2000], [0, prefersReducedMotion ? 0 : -20]);
    const nearY = useTransform(scrollY, [0, 2000], [0, prefersReducedMotion ? 0 : -42]);

    useEffect(() => {
        // 1. Cek prefers-reduced-motion
        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(motionQuery.matches);
        const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        motionQuery.addEventListener("change", handleMotionChange);

        // 2. Deteksi Mobile
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);

        // 3. Pause saat tab blur (VisibilityChange)
        const handleVisibilityChange = () => {
            setIsTabVisible(document.visibilityState === "visible");
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        // 4. Sinkronisasi dengan Preloader Intro
        const isIntroSkipped =
            sessionStorage.getItem("portfolio_intro_shown") === "true" ||
            document.documentElement.getAttribute("data-intro") === "skip" ||
            window.location.pathname !== "/";

        if (isIntroSkipped) {
            setIsReady(true);
        } else {
            const handleIntroDone = () => setIsReady(true);
            window.addEventListener("portfolio_intro_finished", handleIntroDone);
            const timer = setTimeout(() => setIsReady(true), 2500);
            return () => {
                window.removeEventListener("portfolio_intro_finished", handleIntroDone);
                clearTimeout(timer);
            };
        }

        return () => {
            motionQuery.removeEventListener("change", handleMotionChange);
            window.removeEventListener("resize", checkMobile);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    // 5. Observer Intensitas Berdasarkan Section / Rute
    useEffect(() => {
        // Jika di halaman dalam (/about, /skills, /projects, /contact), default intensitas lembut 0.45
        if (pathname !== "/") {
            setCurrentIntensity(0.45);
            return;
        }

        // Jika di homepage root (/), pantau elemen data-bg-intensity via IntersectionObserver
        const sections = document.querySelectorAll("[data-bg-intensity]");
        if (sections.length === 0) {
            setCurrentIntensity(0.85); // Default homepage jika section belum terdeteksi
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const val = entry.target.getAttribute("data-bg-intensity");
                        if (val) {
                            setCurrentIntensity(parseFloat(val));
                        }
                    }
                }
            },
            {
                threshold: 0.25,
                rootMargin: "-10% 0px -20% 0px",
            }
        );

        sections.forEach((sec) => observer.observe(sec));
        return () => observer.disconnect();
    }, [pathname]);

    // Generate Path Kurva S-Curve Saling Menyilang Landai
    const paths = useMemo<PathItem[]>(() => {
        const lineCount = isMobile ? GLOBAL_BG_CONFIG.MOBILE_LINES : GLOBAL_BG_CONFIG.DESKTOP_LINES;
        const width = 1440;
        const height = 960;
        const list: PathItem[] = [];

        // Pilih maksimal 7 beam aktif terdistribusi
        const activeBeamIndices = new Set<number>();
        const step = Math.max(1, Math.floor(lineCount / GLOBAL_BG_CONFIG.ACTIVE_BEAMS));
        for (let b = 0; b < lineCount; b += step) {
            if (activeBeamIndices.size < GLOBAL_BG_CONFIG.ACTIVE_BEAMS) {
                activeBeamIndices.add(b);
            }
        }

        for (let i = 0; i < lineCount; i++) {
            const isFar = i % 2 === 0;
            const factor = i / (lineCount - 1 || 1);

            // Koordinat S-curve landai
            const startY = height * 0.08 + factor * (height * 0.84) + Math.sin(i * 1.3) * 30;
            const endY = height * 0.12 + factor * (height * 0.78) - Math.cos(i * 1.5) * 35;

            const cp1X = width * 0.32;
            const cp1Y = startY + ((i % 2 === 0 ? 1 : -1) * (45 + i * 3.5));

            const cp2X = width * 0.68;
            const cp2Y = endY + ((i % 3 === 0 ? -1 : 1) * (55 + i * 3));

            const d = `M -60 ${startY.toFixed(1)} C ${cp1X.toFixed(1)} ${cp1Y.toFixed(1)}, ${cp2X.toFixed(1)} ${cp2Y.toFixed(1)}, ${width + 60} ${endY.toFixed(1)}`;

            const estimatedLength = 1600;
            const beamLength = 130 + (i % 3) * 30;
            // Durasi 8s - 16s
            const duration = (8.5 + (i * 1.1) % 7) / Math.max(0.2, GLOBAL_BG_CONFIG.SPEED);
            const delay = (i * 0.8) % 6;
            const reverse = i % 3 === 1;
            const hasBeam = activeBeamIndices.has(i);

            list.push({
                id: `line-${i}`,
                d,
                isFar,
                hasBeam,
                pathLength: estimatedLength,
                beamLength,
                duration,
                delay,
                reverse,
            });
        }
        return list;
    }, [isMobile]);

    if (!GLOBAL_BG_CONFIG.ENABLED) return null;

    const farPaths = paths.filter((p) => p.isFar);
    const nearPaths = paths.filter((p) => !p.isFar);

    return (
        <div
            ref={containerRef}
            aria-hidden="true"
            className="fixed inset-0 -z-10 pointer-events-none select-none overflow-hidden transition-opacity duration-700 ease-out"
            style={{
                opacity: isReady ? currentIntensity : 0,
            }}
        >
            {/* LAYER 1: Glow Orbs (Gumpalan cahaya besar warna aksen yang melayang sangat pelan, transform saja) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Glow Orb 1 (Kiri Atas) */}
                <motion.div
                    animate={
                        prefersReducedMotion || !isTabVisible
                            ? {}
                            : {
                                  x: [0, 45, -35, 0],
                                  y: [0, -35, 30, 0],
                              }
                    }
                    transition={{
                        duration: 32,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full pointer-events-none opacity-[0.14] dark:opacity-[0.16]"
                    style={{
                        background: "radial-gradient(circle, var(--primary) 0%, transparent 68%)",
                    }}
                />

                {/* Glow Orb 2 (Kanan Tengah) */}
                <motion.div
                    animate={
                        prefersReducedMotion || !isTabVisible
                            ? {}
                            : {
                                  x: [0, -50, 40, 0],
                                  y: [0, 40, -45, 0],
                              }
                    }
                    transition={{
                        duration: 38,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 3,
                    }}
                    className="absolute top-1/3 -right-32 w-[620px] h-[620px] rounded-full pointer-events-none opacity-[0.11] dark:opacity-[0.14]"
                    style={{
                        background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
                    }}
                />

                {/* Glow Orb 3 (Kiri Bawah) */}
                <motion.div
                    animate={
                        prefersReducedMotion || !isTabVisible
                            ? {}
                            : {
                                  x: [0, 35, -40, 0],
                                  y: [0, -40, 30, 0],
                              }
                    }
                    transition={{
                        duration: 35,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 6,
                    }}
                    className="absolute -bottom-24 left-1/4 w-[480px] h-[480px] rounded-full pointer-events-none opacity-[0.10] dark:opacity-[0.13]"
                    style={{
                        background: "radial-gradient(circle, var(--primary) 0%, transparent 68%)",
                    }}
                />
            </div>

            {/* LAYER 3 (TEKSTUR): Grain Overlay Halus (3.5% Opacity) untuk Kedalaman */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.045] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* LAYER 4: Partikel Debu Halus (24 titik melayang ke atas, nonaktif di mobile / reduced-motion) */}
            {!isMobile && !prefersReducedMotion && isTabVisible && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {Array.from({ length: 24 }).map((_, idx) => {
                        const left = (idx * 4.15 + (idx % 3) * 1.5) % 96;
                        const size = idx % 3 === 0 ? 2 : 1.2;
                        const duration = 16 + (idx % 8) * 2.5;
                        const delay = (idx * 0.7) % 12;

                        return (
                            <motion.span
                                key={`dust-${idx}`}
                                initial={{ y: "105vh", opacity: 0 }}
                                animate={{
                                    y: "-5vh",
                                    opacity: [0, 0.25, 0.25, 0],
                                }}
                                transition={{
                                    duration,
                                    repeat: Infinity,
                                    delay,
                                    ease: "linear",
                                }}
                                className="absolute rounded-full bg-primary"
                                style={{
                                    left: `${left}%`,
                                    width: `${size}px`,
                                    height: `${size}px`,
                                }}
                            />
                        );
                    })}
                </div>
            )}

            {/* LAYER 3: SVG Flowing Lines & Light Beams */}
            <svg
                viewBox="0 0 1440 960"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
                className="w-full h-full"
            >
                <defs>
                    {/* Linear Gradient Beam Arah Normal (Kiri ke Kanan) */}
                    <linearGradient id="global-beam-normal" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
                        <stop offset="25%" stopColor="var(--primary)" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.95" />
                        <stop offset="75%" stopColor="var(--primary)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                    </linearGradient>

                    {/* Linear Gradient Beam Arah Reverse (Kanan ke Kiri) */}
                    <linearGradient id="global-beam-reverse" x1="100%" y1="0%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
                        <stop offset="25%" stopColor="var(--primary)" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.95" />
                        <stop offset="75%" stopColor="var(--primary)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* 3A. SUB-LAYER JAUH: Lebih tipis, lebih redup, parallax lebih lambat */}
                <motion.g
                    style={{ y: farY }}
                    className="text-foreground"
                >
                    {/* Garis Dasar Jauh (stroke 0.8px, opacity 0.06 - 0.08) */}
                    {farPaths.map((b) => (
                        <path
                            key={`base-${b.id}`}
                            d={b.d}
                            stroke="currentColor"
                            strokeWidth="0.8"
                            strokeOpacity={isMobile ? "0.05" : "0.07"}
                            strokeLinecap="round"
                            fill="none"
                        />
                    ))}

                    {/* Cahaya Beam Jauh (Tanpa filter blur, menggunakan dual stroke untuk glow halus) */}
                    {!prefersReducedMotion && isTabVisible && farPaths.map((b) => {
                        if (!b.hasBeam) return null;
                        const dasharray = `${b.beamLength} ${b.pathLength}`;
                        const initOffset = b.reverse ? -b.pathLength : b.pathLength + b.beamLength;
                        const animOffset = b.reverse ? b.pathLength + b.beamLength : -b.pathLength;
                        const grad = b.reverse ? "url(#global-beam-reverse)" : "url(#global-beam-normal)";

                        return (
                            <React.Fragment key={`beam-group-${b.id}`}>
                                {/* Halo Glow Stroke (lebih lebar, opacity rendah) */}
                                <motion.path
                                    d={b.d}
                                    fill="none"
                                    stroke={grad}
                                    strokeWidth="3.2"
                                    strokeOpacity="0.22"
                                    strokeLinecap="round"
                                    strokeDasharray={dasharray}
                                    initial={{ strokeDashoffset: initOffset }}
                                    animate={{ strokeDashoffset: animOffset }}
                                    transition={{
                                        duration: b.duration,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        ease: "linear",
                                        delay: b.delay,
                                    }}
                                />
                                {/* Core Beam Stroke */}
                                <motion.path
                                    d={b.d}
                                    fill="none"
                                    stroke={grad}
                                    strokeWidth="1.2"
                                    strokeOpacity="0.75"
                                    strokeLinecap="round"
                                    strokeDasharray={dasharray}
                                    initial={{ strokeDashoffset: initOffset }}
                                    animate={{ strokeDashoffset: animOffset }}
                                    transition={{
                                        duration: b.duration,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        ease: "linear",
                                        delay: b.delay,
                                    }}
                                />
                            </React.Fragment>
                        );
                    })}
                </motion.g>

                {/* 3B. SUB-LAYER DEKAT: Sedikit lebih jelas, parallax lebih responsif */}
                <motion.g
                    style={{ y: nearY }}
                    className="text-foreground"
                >
                    {/* Garis Dasar Dekat (stroke 1.1px, opacity 0.09 - 0.12) */}
                    {nearPaths.map((b) => (
                        <path
                            key={`base-${b.id}`}
                            d={b.d}
                            stroke="currentColor"
                            strokeWidth="1.1"
                            strokeOpacity={isMobile ? "0.08" : "0.10"}
                            strokeLinecap="round"
                            fill="none"
                        />
                    ))}

                    {/* Cahaya Beam Dekat */}
                    {!prefersReducedMotion && isTabVisible && nearPaths.map((b) => {
                        if (!b.hasBeam) return null;
                        const dasharray = `${b.beamLength} ${b.pathLength}`;
                        const initOffset = b.reverse ? -b.pathLength : b.pathLength + b.beamLength;
                        const animOffset = b.reverse ? b.pathLength + b.beamLength : -b.pathLength;
                        const grad = b.reverse ? "url(#global-beam-reverse)" : "url(#global-beam-normal)";

                        return (
                            <React.Fragment key={`beam-group-${b.id}`}>
                                {/* Halo Glow Stroke */}
                                <motion.path
                                    d={b.d}
                                    fill="none"
                                    stroke={grad}
                                    strokeWidth="3.6"
                                    strokeOpacity="0.28"
                                    strokeLinecap="round"
                                    strokeDasharray={dasharray}
                                    initial={{ strokeDashoffset: initOffset }}
                                    animate={{ strokeDashoffset: animOffset }}
                                    transition={{
                                        duration: b.duration,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        ease: "linear",
                                        delay: b.delay,
                                    }}
                                />
                                {/* Core Beam Stroke */}
                                <motion.path
                                    d={b.d}
                                    fill="none"
                                    stroke={grad}
                                    strokeWidth="1.5"
                                    strokeOpacity="0.9"
                                    strokeLinecap="round"
                                    strokeDasharray={dasharray}
                                    initial={{ strokeDashoffset: initOffset }}
                                    animate={{ strokeDashoffset: animOffset }}
                                    transition={{
                                        duration: b.duration,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        ease: "linear",
                                        delay: b.delay,
                                    }}
                                />
                            </React.Fragment>
                        );
                    })}
                </motion.g>
            </svg>
        </div>
    );
}
