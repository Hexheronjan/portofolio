"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgressBar: Garis 2px warna aksen di paling atas halaman
 * Bergerak via scaleX mengikuti progres scroll pengguna.
 */
export function ScrollProgressBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 24,
        restDelta: 0.001,
    });

    return (
        <motion.div
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[9999] pointer-events-none"
            style={{ scaleX }}
        />
    );
}
