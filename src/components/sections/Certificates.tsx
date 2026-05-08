"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

const certificates = [
    {
        title: "FRONTEND EXPERT",
        desc: "Advanced frontend architecture, performance optimization, and modern React patterns.",
        hugeText: "REACT",
        image: "/perpus.png", // Ganti dengan path gambar sertifikat 1 yang asli
        yOffset: [50, -100], // Kecepatan parallax diperhalus
        positionClasses: "left-[5%] md:left-[5%] top-[5%] md:top-[10%]",
        floatDuration: 4
    },
    {
        title: "FULL STACK WEB",
        desc: "End-to-end development covering Next.js, Node.js, databases, and secure APIs.",
        hugeText: "NEXT.JS",
        image: "/rempang.png", // Ganti dengan path gambar sertifikat 2 yang asli
        yOffset: [150, -250], // Kecepatan parallax diperhalus
        positionClasses: "left-[5%] md:left-[36%] top-[35%] md:top-[25%]",
        floatDuration: 5.5
    },
    {
        title: "MOBILE APP DEV",
        desc: "Cross-platform mobile application development with React Native and modern tools.",
        hugeText: "MOBILE",
        image: "/mitafiz.png", // Ganti dengan path gambar sertifikat 3 yang asli
        yOffset: [250, -400], // Kecepatan parallax diperhalus
        positionClasses: "left-[5%] md:left-[67%] top-[65%] md:top-[15%]",
        floatDuration: 4.5
    }
];

function CertCard({ cert, scrollYProgress }: { cert: typeof certificates[0], scrollYProgress: any }) {
    // 1. Menggunakan useSpring agar scroll parallax menjadi sangat halus (smooth)
    const smoothProgress = useSpring(scrollYProgress, { damping: 25, stiffness: 60, mass: 0.5 });
    const yScroll = useTransform(smoothProgress, [0, 1], cert.yOffset);

    return (
        // Layer 1: Parallax Scrolling Effect
        <motion.div 
            style={{ y: yScroll }}
            className={`absolute w-[90vw] md:w-[28vw] max-w-[400px] z-20 ${cert.positionClasses}`}
        >
            {/* Layer 2: Animasi Mengambang (Floating) terus-menerus saat tidak di-scroll */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ 
                    duration: cert.floatDuration, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
                className="w-full h-full bg-white rounded-[2rem] p-6 md:p-8 flex flex-col shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-black/5 hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] transition-shadow duration-700"
            >
                {/* Dot and Title */}
                <div className="flex items-center gap-3 mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#111]" />
                    <h3 className="font-display font-medium text-lg tracking-widest uppercase text-[#111]">{cert.title}</h3>
                </div>

                {/* 16:9 Image representing Certificate */}
                <div className="w-full aspect-video bg-zinc-200 rounded-xl overflow-hidden mb-8 relative group cursor-pointer">
                    <img 
                        src={cert.image} 
                        alt={cert.title}
                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                {/* Description */}
                <p className="font-mono text-[10px] md:text-xs leading-relaxed uppercase text-zinc-500 mb-12">
                    {cert.desc}
                </p>

                {/* Massive Text at Bottom of Card */}
                <div className="mt-auto overflow-hidden pb-2">
                    <h2 className="font-display font-black text-6xl md:text-7xl uppercase tracking-tighter scale-y-[1.5] origin-bottom leading-[0.8] text-[#111]">
                        {cert.hugeText}
                    </h2>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function Certificates() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Pelembut scroll untuk Teks besar agar gerakannya sangat smooth dan tidak patah-patah
    const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 40 });
    // Dibuat lebih lambat: dari 0% ke -15% saja (sebelumnya -50%)
    const titleX = useTransform(smoothProgress, [0, 1], ["0%", "-15%"]);

    return (
        <section ref={containerRef} className="relative w-full py-20 md:py-32 bg-[#eaeaea] overflow-hidden text-[#111]">
            
            {/* Decorative Noise Background */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            {/* Massive Scrolling Title Banner - Slower and Smoother */}
            <div className="w-full border-b border-[#111]/20 pb-4 mb-10 md:mb-20 overflow-hidden relative z-10">
                <motion.div 
                    style={{ x: titleX }}
                    className="whitespace-nowrap font-display text-[15vw] md:text-[8vw] font-black uppercase tracking-tighter scale-y-[1.4] origin-top flex gap-8 items-center"
                >
                    <span>CERTIFICATES & ACHIEVEMENTS</span>
                    <span className="w-4 h-4 md:w-8 md:h-8 rounded-full bg-lime-500 shrink-0" />
                    <span>PROFESSIONAL MILESTONES</span>
                    <span className="w-4 h-4 md:w-8 md:h-8 rounded-full bg-[#111] shrink-0" />
                    <span>CERTIFICATES & ACHIEVEMENTS</span>
                </motion.div>
            </div>

            {/* Floating Cards Container */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative h-[180vh] md:h-[130vh] z-20">
                {certificates.map((cert, i) => (
                    <CertCard key={i} cert={cert} scrollYProgress={scrollYProgress} />
                ))}
            </div>
        </section>
    );
}
