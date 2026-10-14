"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Cek prefers-reduced-motion
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) return;

        // Inisialisasi Lenis dengan durasi 1.15
        const lenis = new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 1.2,
        });
        lenisRef.current = lenis;

        let animationFrameId: number;
        function raf(time: number) {
            lenis.raf(time);
            animationFrameId = requestAnimationFrame(raf);
        }
        animationFrameId = requestAnimationFrame(raf);

        // Menghubungkan klik link jangkar / skip link agar di-scroll halus oleh Lenis
        const handleAnchorClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement)?.closest("a");
            if (!target) return;
            const href = target.getAttribute("href");
            if (href && href.startsWith("#") && href.length > 1) {
                const el = document.querySelector(href);
                if (el) {
                    e.preventDefault();
                    lenis.scrollTo(el as HTMLElement, { offset: -60 });
                }
            }
        };
        document.addEventListener("click", handleAnchorClick);

        return () => {
            document.removeEventListener("click", handleAnchorClick);
            cancelAnimationFrame(animationFrameId);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
