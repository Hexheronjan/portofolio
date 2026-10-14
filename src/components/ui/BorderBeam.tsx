"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface BorderBeamProps {
    duration?: number;
    beamLength?: number;
    className?: string;
}

/**
 * BorderBeam: Goresan cahaya aksen yang mengalir mengelilingi tepi kartu secara otomatis.
 * Menggunakan SVG vector stroke-dashoffset sehingga 100% akselerasi GPU dan presisi di semua browser.
 * Pointer-events none, tidak mengubah layout atau klik kartu.
 */
export function BorderBeam({
    duration = 8,
    beamLength = 120,
    className = "",
}: BorderBeamProps) {
    const [prefersReduced, setPrefersReduced] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReduced(mq.matches);
        const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    if (prefersReduced) return null;

    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden z-20 ${className}`}
        >
            <svg
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="beam-card-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
                        <stop offset="40%" stopColor="var(--primary)" stopOpacity="0.4" />
                        <stop offset="70%" stopColor="var(--primary)" stopOpacity="1" />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Halo stroke halus */}
                <motion.rect
                    x="1"
                    y="1"
                    width="calc(100% - 2px)"
                    height="calc(100% - 2px)"
                    rx="16"
                    stroke="url(#beam-card-gradient)"
                    strokeWidth="3"
                    strokeOpacity="0.25"
                    strokeDasharray={`${beamLength} 1200`}
                    initial={{ strokeDashoffset: 1320 }}
                    animate={{ strokeDashoffset: -120 }}
                    transition={{
                        duration,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                    }}
                />

                {/* Core stroke tegas */}
                <motion.rect
                    x="1"
                    y="1"
                    width="calc(100% - 2px)"
                    height="calc(100% - 2px)"
                    rx="16"
                    stroke="url(#beam-card-gradient)"
                    strokeWidth="1.5"
                    strokeOpacity="0.85"
                    strokeDasharray={`${beamLength} 1200`}
                    initial={{ strokeDashoffset: 1320 }}
                    animate={{ strokeDashoffset: -120 }}
                    transition={{
                        duration,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                    }}
                />
            </svg>
        </div>
    );
}
