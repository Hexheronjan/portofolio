"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";

export interface BackgroundBeamsProps {
    lineCount?: number;
    speed?: number;
    intensity?: number;
    className?: string;
}

interface BeamPathData {
    id: string;
    d: string;
    pathLength: number;
    beamLength: number;
    duration: number;
    delay: number;
    reverse: boolean;
}

export function BackgroundBeams({
    lineCount = 18,
    speed = 1,
    intensity = 1,
    className = "",
}: BackgroundBeamsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Cek prefers-reduced-motion
        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(motionQuery.matches);
        const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        motionQuery.addEventListener("change", handleMotionChange);

        // Deteksi mobile
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);

        // Pause animasi saat tab tidak aktif
        const handleVisibilityChange = () => {
            setIsVisible(document.visibilityState === "visible");
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Pause saat hero keluar dari viewport
        let observer: IntersectionObserver | null = null;
        if (containerRef.current && "IntersectionObserver" in window) {
            observer = new IntersectionObserver(
                ([entry]) => {
                    setIsVisible(entry.isIntersecting);
                },
                { threshold: 0.05 }
            );
            observer.observe(containerRef.current);
        }

        return () => {
            motionQuery.removeEventListener("change", handleMotionChange);
            window.removeEventListener("resize", checkMobile);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            if (observer) observer.disconnect();
        };
    }, []);

    // Tentukan jumlah garis: sekitar 18 di desktop, setengahnya di mobile (9)
    const effectiveLineCount = isMobile ? Math.max(8, Math.floor(lineCount / 2)) : lineCount;

    // Generate path kurva lengkung landai dengan variasi ketinggian dan kelengkungan
    const beams: BeamPathData[] = useMemo(() => {
        const width = 1440;
        const height = 900;
        const list: BeamPathData[] = [];

        for (let i = 0; i < effectiveLineCount; i++) {
            // Distribusi posisi vertikal dari atas ke bawah
            const factor = i / (effectiveLineCount - 1 || 1);
            const startY = height * 0.1 + factor * (height * 0.8) + (Math.sin(i * 1.5) * 35);
            const endY = height * 0.15 + factor * (height * 0.75) - (Math.cos(i * 1.8) * 40);

            // Titik kontrol Bezier untuk lengkungan halus landai
            const cp1X = width * 0.28;
            const cp1Y = startY + ((i % 2 === 0 ? 1 : -1) * (50 + (i * 4)));

            const cp2X = width * 0.72;
            const cp2Y = endY + ((i % 3 === 0 ? -1 : 1) * (60 + (i * 3)));

            const d = `M -60 ${startY.toFixed(1)} C ${cp1X.toFixed(1)} ${cp1Y.toFixed(1)}, ${cp2X.toFixed(1)} ${cp2Y.toFixed(1)}, ${width + 60} ${endY.toFixed(1)}`;

            // Estimasi panjang path
            const estimatedLength = 1600;
            // Panjang goresan cahaya berkisar 140px - 220px
            const beamLength = 140 + (i % 4) * 25;
            // Durasi acak berkisar 7s - 14s (disesuaikan dengan prop speed)
            const baseDuration = (7.5 + (i * 0.55) % 6) / Math.max(0.2, speed);
            // Delay acak
            const delay = (i * 0.65) % 5;
            // Arah: mayoritas kiri ke kanan, sebagian kanan ke kiri
            const reverse = i % 4 === 1;

            list.push({
                id: `beam-path-${i}`,
                d,
                pathLength: estimatedLength,
                beamLength,
                duration: baseDuration,
                delay,
                reverse,
            });
        }
        return list;
    }, [effectiveLineCount, speed]);

    return (
        <div
            ref={containerRef}
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none ${className}`}
            style={{
                // Gradient mask di keempat tepi agar garis menyatu lembut dengan halaman
                maskImage:
                    "radial-gradient(ellipse 85% 70% at 50% 45%, black 40%, rgba(0,0,0,0.6) 65%, transparent 95%)",
                WebkitMaskImage:
                    "radial-gradient(ellipse 85% 70% at 50% 45%, black 40%, rgba(0,0,0,0.6) 65%, transparent 95%)",
            }}
        >
            <svg
                viewBox="0 0 1440 900"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
                className="w-full h-full"
            >
                <defs>
                    {/* Linear Gradient untuk cahaya Beam yang membaca variabel --primary */}
                    <linearGradient id="beam-gradient-normal" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
                        <stop offset="25%" stopColor="var(--primary)" stopOpacity={0.4 * intensity} />
                        <stop offset="50%" stopColor="var(--primary)" stopOpacity={0.95 * intensity} />
                        <stop offset="75%" stopColor="var(--primary)" stopOpacity={0.4 * intensity} />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                    </linearGradient>

                    {/* Gradient terbalik untuk beam arah sebaliknya */}
                    <linearGradient id="beam-gradient-reverse" x1="100%" y1="0%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
                        <stop offset="25%" stopColor="var(--primary)" stopOpacity={0.4 * intensity} />
                        <stop offset="50%" stopColor="var(--primary)" stopOpacity={0.95 * intensity} />
                        <stop offset="75%" stopColor="var(--primary)" stopOpacity={0.4 * intensity} />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                    </linearGradient>

                    {/* Glow filter lembut khusus dark mode tanpa blur berat */}
                    <filter id="beam-glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2.5" result="glow" />
                        <feMerge>
                            <feMergeNode in="glow" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* 1. LAYER GARIS DASAR: Warna teks netral dengan opacity 0.08 - 0.11 */}
                <g className="text-foreground">
                    {beams.map((b) => (
                        <path
                            key={`base-${b.id}`}
                            d={b.d}
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeOpacity={isMobile ? "0.07" : "0.09"}
                            strokeLinecap="round"
                            fill="none"
                        />
                    ))}
                </g>

                {/* 2. LAYER GORESAN CAHAYA (ANIMATED BEAMS): Bergerak mengalir sepanjang path */}
                {!prefersReducedMotion && isVisible && (
                    <g>
                        {beams.map((b) => {
                            const total = b.pathLength;
                            const beam = b.beamLength;
                            // Dasharray: [panjang cahaya, spasi sisa]
                            const strokeDasharray = `${beam} ${total}`;

                            // Arah pergerakan dashoffset
                            const initialOffset = b.reverse ? -total : total + beam;
                            const animateOffset = b.reverse ? total + beam : -total;

                            return (
                                <motion.path
                                    key={`active-${b.id}`}
                                    d={b.d}
                                    fill="none"
                                    stroke={b.reverse ? "url(#beam-gradient-reverse)" : "url(#beam-gradient-normal)"}
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeDasharray={strokeDasharray}
                                    initial={{ strokeDashoffset: initialOffset, opacity: 0.2 }}
                                    animate={{
                                        strokeDashoffset: animateOffset,
                                        opacity: [0.2, 0.85 * intensity, 0.85 * intensity, 0.2],
                                    }}
                                    transition={{
                                        duration: b.duration,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        ease: "linear",
                                        delay: b.delay,
                                    }}
                                    className="filter dark:[filter:url(#beam-glow)]"
                                />
                            );
                        })}
                    </g>
                )}
            </svg>
        </div>
    );
}
