"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
    children: ReactNode;
    direction?: "up" | "down" | "left" | "right" | "center" | "fade";
    delay?: number;
    duration?: number;
    distance?: number;
    className?: string;
    viewportMargin?: string;
    once?: boolean;
}

export function ScrollReveal({
    children,
    direction = "up",
    delay = 0,
    duration = 0.7,
    distance = 48,
    className = "",
    viewportMargin = "-40px",
    once = true,
}: ScrollRevealProps) {
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mq.matches);
        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    const getInitial = () => {
        if (reducedMotion) return { opacity: 0 };

        switch (direction) {
            case "left":
                return { opacity: 0, x: -distance, y: 0 };
            case "right":
                return { opacity: 0, x: distance, y: 0 };
            case "up":
                return { opacity: 0, y: distance, x: 0 };
            case "down":
                return { opacity: 0, y: -distance, x: 0 };
            case "center":
                return { opacity: 0, scale: 0.92, y: 0, x: 0 };
            case "fade":
            default:
                return { opacity: 0, y: 0, x: 0 };
        }
    };

    const getAnimate = () => {
        return {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
        };
    };

    return (
        <motion.div
            initial={getInitial()}
            whileInView={getAnimate()}
            viewport={{ once, margin: viewportMargin }}
            transition={{
                duration: reducedMotion ? 0.2 : duration,
                delay: reducedMotion ? 0 : delay,
                ease: [0.16, 1, 0.3, 1], // Smooth Apple-like spring cubic-bezier
            }}
            className={className}
            style={{
                willChange: reducedMotion ? "auto" : "transform, opacity",
            }}
        >
            {children}
        </motion.div>
    );
}

// Container dengan staggered delay untuk grid atau list
export function StaggerContainer({
    children,
    className = "",
    staggerDelay = 0.1,
    viewportMargin = "-40px",
}: {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
    viewportMargin?: string;
}) {
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mq.matches);
        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: reducedMotion ? 0 : staggerDelay,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            ...(reducedMotion ? {} : { y: 32 }),
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: viewportMargin }}
            variants={containerVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    const itemVariants = {
        hidden: { opacity: 0, y: 32 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    return (
        <motion.div variants={itemVariants} className={`h-full ${className}`}>
            {children}
        </motion.div>
    );
}
