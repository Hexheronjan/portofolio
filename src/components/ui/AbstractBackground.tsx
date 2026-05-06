"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function AbstractBackground() {
    const { scrollYProgress } = useScroll();

    // Orb 1 bergerak dari atas ke bawah seiring scroll
    const orb1Y = useTransform(scrollYProgress, [0, 1], ["-20vh", "80vh"]);
    const orb1X = useTransform(scrollYProgress, [0, 1], ["-10vw", "20vw"]);

    // Orb 2 bergerak dari bawah ke atas dengan kecepatan berbeda
    const orb2Y = useTransform(scrollYProgress, [0, 1], ["100vh", "-20vh"]);
    const orb2X = useTransform(scrollYProgress, [0, 1], ["10vw", "-10vw"]);

    return (
        <div className="fixed inset-0 z-[0] overflow-hidden pointer-events-none">
            {/* Orb Abstrak 1 - Warna Lime */}
            <motion.div
                className="absolute top-0 left-0 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full opacity-40 dark:opacity-20"
                style={{
                    y: orb1Y,
                    x: orb1X,
                    background: "radial-gradient(circle, rgba(190, 242, 100, 0.8) 0%, rgba(190, 242, 100, 0) 70%)",
                    filter: "blur(60px)",
                }}
            />

            {/* Orb Abstrak 2 - Warna Biru/Indigo */}
            <motion.div
                className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full opacity-30 dark:opacity-20"
                style={{
                    y: orb2Y,
                    x: orb2X,
                    background: "radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, rgba(99, 102, 241, 0) 70%)",
                    filter: "blur(80px)",
                }}
            />
            
            {/* SVG Grid Pattern Statis yang sangat tipis untuk menambah tekstur */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.02] bg-repeat" />
        </div>
    );
}