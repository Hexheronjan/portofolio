"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const prefersReducedMotion = useReducedMotion();

    // Paksa reset scroll secara instan ke paling atas (abaikan `scroll-behavior: smooth`)
    // agar halaman baru tidak mulai dari bawah dan tidak memicu ScrollReveal terlalu dini.
    useIsomorphicLayoutEffect(() => {
        if (window.location.hash) return;
        const html = document.documentElement;
        const prevBehavior = html.style.scrollBehavior;
        html.style.scrollBehavior = "auto";
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
        html.scrollTop = 0;
        document.body.scrollTop = 0;
        const raf = requestAnimationFrame(() => {
            html.style.scrollBehavior = prevBehavior;
        });
        return () => {
            cancelAnimationFrame(raf);
            html.style.scrollBehavior = prevBehavior;
        };
    }, [pathname]);

    return (
        <motion.div
            key={pathname}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
}
