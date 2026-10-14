"use client";

import React from "react";
import { motion } from "framer-motion";

interface HeadingRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

/**
 * HeadingReveal: Mask reveal bertingkat untuk judul section (overflow-hidden, teks meluncur naik dari bawah)
 * Gaya konsisten dengan preloader intro.
 */
export function HeadingReveal({
    children,
    className = "",
    delay = 0,
}: HeadingRevealProps) {
    return (
        <div className={`overflow-hidden ${className}`}>
            <motion.div
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                    duration: 0.65,
                    delay,
                    ease: [0.16, 1, 0.3, 1],
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
