"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
    children: ReactNode;
    direction?: "up" | "down" | "left" | "right" | "fade";
    delay?: number;
    duration?: number;
    className?: string;
    viewportMargin?: string;
    once?: boolean;
}

// Check for reduced motion preference
const useReducedMotion = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    return prefersReducedMotion;
};

export function ScrollReveal({
    children,
    direction = "up",
    delay = 0,
    duration = 0.6,
    className = "",
    viewportMargin = "-50px",
    once = true,
}: ScrollRevealProps) {
    const reducedMotion = useReducedMotion();

    // Animation variants - only transform and opacity for performance
    const variants = {
        hidden: {
            opacity: 0,
            ...(reducedMotion
                ? {}
                : {
                    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
                    x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
                }),
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: viewportMargin }}
            variants={variants}
            transition={{
                duration: reducedMotion ? 0.3 : duration,
                delay: reducedMotion ? 0 : delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
            style={{
                // Only add will-change if not reduced motion
                willChange: reducedMotion ? "auto" : "transform, opacity",
            }}
        >
            {children}
        </motion.div>
    );
}

// Staggered children variant for lists/grids
export function StaggerContainer({
    children,
    className = "",
    staggerDelay = 0.1,
}: {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
}) {
    const reducedMotion = useReducedMotion();

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
            ...(reducedMotion ? {} : { y: 20 }),
        },
        visible: {
            opacity: 1,
            y: 0,
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className={className}
        >
            {Array.isArray(children)
                ? children.map((child, i) => (
                    <motion.div key={i} variants={itemVariants}>
                        {child}
                    </motion.div>
                ))
                : children}
        </motion.div>
    );
}
