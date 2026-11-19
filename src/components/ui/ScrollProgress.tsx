"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 32,
        restDelta: 0.001,
    });

    return (
        <motion.div
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-primary via-brass to-primary z-[60] pointer-events-none"
            style={{ scaleX, transformOrigin: "left" }}
        />
    );
}
