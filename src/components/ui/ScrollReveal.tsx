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
    duration = 0.6,
    distance = 36,
    className = "",
    viewportMargin = "-20px",
    once = true,
}: ScrollRevealProps) {
    const [reducedMotion, setReducedMotion] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mq.matches);
        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mq.addEventListener("change", handler);

        // Deteksi apakah perangkat mobile / layar kecil
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => {
            mq.removeEventListener("change", handler);
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    const getInitial = () => {
        if (reducedMotion) return { opacity: 0 };

        // Di mobile, gunakan jarak pergeseran pendek (16px) agar tidak membebani GPU saat scroll
        const activeDistance = isMobile ? Math.min(distance, 16) : distance;

        // Di mobile, arahkan geseran horizontal ke geseran vertikal ringan agar tidak terjadi lag layout
        if (isMobile) {
            switch (direction) {
                case "left":
                case "right":
                case "up":
                    return { opacity: 0, y: activeDistance, x: 0 };
                case "down":
                    return { opacity: 0, y: -activeDistance, x: 0 };
                case "center":
                    return { opacity: 0, scale: 0.95, y: 0, x: 0 };
                case "fade":
                default:
                    return { opacity: 0, y: 0, x: 0 };
            }
        }

        // Di desktop (layar lebar), gunakan arah penuh
        switch (direction) {
            case "left":
                return { opacity: 0, x: -activeDistance, y: 0 };
            case "right":
                return { opacity: 0, x: activeDistance, y: 0 };
            case "up":
                return { opacity: 0, y: activeDistance, x: 0 };
            case "down":
                return { opacity: 0, y: -activeDistance, x: 0 };
            case "center":
                return { opacity: 0, scale: 0.94, y: 0, x: 0 };
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
            viewport={{ once, margin: isMobile ? "0px 0px -20px 0px" : viewportMargin }}
            transition={{
                duration: reducedMotion ? 0.2 : (isMobile ? 0.4 : duration),
                delay: reducedMotion ? 0 : (isMobile ? Math.min(delay, 0.15) : delay),
                ease: [0.22, 1, 0.36, 1], // Kurva performa tinggi, sangat halus dan responsif
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Container dengan staggered delay untuk grid atau list
export function StaggerContainer({
    children,
    className = "",
    staggerDelay = 0.08,
    viewportMargin = "-20px",
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

    return (
        <motion.div
            initial={reducedMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.02 }}
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
        hidden: { opacity: 0, y: 16 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <motion.div variants={itemVariants} className={`h-full ${className}`}>
            {children}
        </motion.div>
    );
}
