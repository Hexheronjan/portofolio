"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue } from "framer-motion";

export function Hero() {
    const [isEntered, setIsEntered] = useState(false);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Main Hero Scroll Parallax
    const yTextBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const yPhoto = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const yFloating1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const yFloating2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    // Mouse tracking for Intro Screen Parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const targetX = (clientX / (typeof window !== "undefined" ? window.innerWidth : 1000) - 0.5) * 50;
        const targetY = (clientY / (typeof window !== "undefined" ? window.innerHeight : 1000) - 0.5) * 50;
        mouseX.set(targetX);
        mouseY.set(targetY);
    };

    const springConfig = { damping: 20, stiffness: 100 };
    const blob1X = useSpring(useTransform(mouseX, [-50, 50], [40, -40]), springConfig);
    const blob1Y = useSpring(useTransform(mouseY, [-50, 50], [40, -40]), springConfig);
    const blob2X = useSpring(useTransform(mouseX, [-50, 50], [-60, 60]), springConfig);
    const blob2Y = useSpring(useTransform(mouseY, [-50, 50], [-60, 60]), springConfig);
    
    const textLayerX = useSpring(useTransform(mouseX, [-50, 50], [-10, 10]), springConfig);
    const textLayerY = useSpring(useTransform(mouseY, [-50, 50], [-10, 10]), springConfig);

    return (
        <section 
            ref={containerRef}
            className="relative w-full h-[100svh] min-h-[100svh] overflow-hidden font-sans selection:bg-lime-400 selection:text-black bg-[#0f0f0f]"
        >
            {/* ====================================================
                1. INTRO / COVER SCREEN (CLICK TO ENTER)
                ==================================================== */}
            <AnimatePresence>
                {!isEntered && (
                    <motion.div 
                        key="intro-screen"
                        exit={{ y: "-100%", opacity: 0, transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
                        onMouseMove={handleMouseMove}
                        onClick={() => setIsEntered(true)}
                        className="absolute inset-0 z-50 cursor-pointer bg-[#050505] overflow-hidden flex flex-col justify-between p-6 sm:p-10 select-none border-b border-white/5"
                    >
                        {/* Interactive Background Blobs (Dark Theme) */}
                        <motion.div 
                            style={{ x: blob1X, y: blob1Y }}
                            className="absolute top-[-10%] left-[10%] w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-zinc-800/20 rounded-full pointer-events-none mix-blend-screen blur-[80px]"
                        />
                        <motion.div 
                            style={{ x: blob2X, y: blob2Y }}
                            className="absolute bottom-[-10%] right-[5%] w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] bg-zinc-900/40 rounded-full pointer-events-none mix-blend-screen blur-[100px]"
                        />
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none" />

                        {/* Interactive Text Layer */}
                        <motion.div 
                            style={{ x: textLayerX, y: textLayerY }}
                            className="relative z-10 w-full h-full flex flex-col justify-center gap-6 md:gap-10"
                        >
                            
                            {/* Top Left Text - Author text removed per request */}
                            <div className="flex flex-col items-start gap-4 overflow-hidden py-2">
                                <motion.h2 
                                    initial={{ y: "100%" }}
                                    animate={{ y: "0%" }}
                                    whileHover={{ scale: 1.05, skewX: -5, color: "#a3e635" }}
                                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                                    className="text-4xl md:text-6xl font-display font-medium tracking-tighter scale-y-[1.4] origin-top-left text-white"
                                >
                                    FAUZAN
                                </motion.h2>
                            </div>

                            {/* Section 1: FOLIO OF FAUZAN */}
                            <div className="w-full border-t border-zinc-800/80 pt-2 md:pt-4 overflow-hidden">
                                <motion.h1 
                                    initial={{ y: "120%" }}
                                    animate={{ y: "0%" }}
                                    whileHover={{ skewX: -2, y: -10 }}
                                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                                    className="text-[13vw] md:text-[11vw] font-black uppercase tracking-tighter text-white scale-y-[1.6] origin-top leading-[0.75]"
                                >
                                    FOLIO OF FAUZAN
                                </motion.h1>
                            </div>

                            {/* Section 2: Date & Location */}
                            <div className="w-full border-t border-zinc-800/80 pt-2 md:pt-4 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-4 overflow-hidden">
                                <motion.h1 
                                    initial={{ y: "120%" }}
                                    animate={{ y: "0%" }}
                                    whileHover={{ scale: 1.02, skewX: -2 }}
                                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
                                    className="text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter text-transparent scale-y-[1.6] origin-top leading-[0.75] relative transition-colors hover:text-white"
                                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.8)" }}
                                >
                                    28/MAY.2026
                                </motion.h1>
                                <motion.div 
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    whileHover={{ scale: 1.1, rotate: -5 }}
                                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
                                    className="flex flex-col items-center justify-center border border-zinc-700 rounded-full px-6 py-2 md:px-10 md:py-4 relative top-2 md:top-0 hover:bg-white hover:text-black transition-colors duration-500"
                                >
                                    <span className="font-display text-sm md:text-2xl uppercase scale-y-[1.4] origin-bottom tracking-widest">
                                        ( BASED IN INDONESIA )
                                    </span>
                                </motion.div>
                            </div>

                            {/* Section 3: Bottom Text */}
                            <div className="w-full border-t border-zinc-800/80 pt-2 md:pt-4 mt-auto overflow-hidden">
                                <motion.h1 
                                    initial={{ y: "120%" }}
                                    animate={{ y: "0%" }}
                                    whileHover={{ skewX: -2, y: -5, color: "#a3e635" }}
                                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
                                    className="text-[11vw] md:text-[9vw] font-black uppercase tracking-tighter text-white scale-y-[1.6] origin-bottom leading-[0.75] opacity-90"
                                >
                                    FULL STACK DEVELOPER
                                </motion.h1>
                            </div>
                        </motion.div>

                        {/* Floating Click Indicator */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 1 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="bg-zinc-900/80 text-white border border-white/20 px-8 py-4 rounded-full font-mono text-xs md:text-sm uppercase tracking-widest flex items-center gap-3 backdrop-blur-xl hover:bg-white hover:text-black transition-colors duration-300"
                            >
                                <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                                CLICK TO REVEAL
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ====================================================
                2. MAIN HERO (FAUZAN STUDIO)
                ==================================================== */}
            <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center z-10 overflow-hidden">
                {/* --- BACKGROUND FLOATING BLOBS (Depth) --- */}
                <motion.div 
                    style={{ y: yFloating1 }}
                    className="absolute top-[10%] left-[10%] w-[30vw] h-[30vw] min-w-[300px] min-h-[300px] bg-indigo-600/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"
                />
                <motion.div 
                    style={{ y: yFloating2 }}
                    className="absolute bottom-[10%] right-[5%] w-[40vw] h-[40vw] min-w-[400px] min-h-[400px] bg-lime-500/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none"
                />
                
                {/* Noise Texture */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04] mix-blend-overlay pointer-events-none z-50" />

                {/* --- MASSIVE TYPOGRAPHY (Background Layer) --- */}
                <motion.div 
                    style={{ y: yTextBg }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none select-none w-full"
                >
                    <div className="flex flex-col items-center justify-center -space-y-[4vw] md:-space-y-[2vw]">
                        <motion.h1 
                            whileHover={{ scale: 1.02 }}
                            className="text-[22vw] md:text-[18vw] font-black uppercase tracking-tighter text-[#eaeaea] leading-[0.8] scale-y-[1.6] origin-bottom opacity-90 pointer-events-auto cursor-default"
                        >
                            FAUZAN
                        </motion.h1>
                        <motion.h1 
                            whileHover={{ scale: 1.02 }}
                            className="text-[22vw] md:text-[18vw] font-black uppercase tracking-tighter text-transparent leading-[0.8] scale-y-[1.6] origin-top pointer-events-auto cursor-default"
                            style={{ WebkitTextStroke: "2px rgba(234, 234, 234, 0.15)" }}
                        >
                            STUDIO
                        </motion.h1>
                    </div>
                </motion.div>

                {/* --- ORGANIC BLOB PHOTO (Middle Layer) --- */}
                <motion.div 
                    style={{ y: yPhoto }}
                    className="relative z-10 w-[70vw] sm:w-[50vw] md:w-[35vw] max-w-[450px] aspect-[3/4] mt-[5vh]"
                >
                    <motion.div
                        animate={{
                            borderRadius: [
                                "30% 70% 70% 30% / 30% 30% 70% 70%",
                                "50% 50% 20% 80% / 25% 80% 20% 75%",
                                "70% 30% 40% 60% / 60% 20% 80% 40%",
                                "30% 70% 70% 30% / 30% 30% 70% 70%",
                            ]
                        }}
                        transition={{ 
                            duration: 10, 
                            repeat: Infinity, 
                            ease: "linear" 
                        }}
                        className="w-full h-full overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10 relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                        
                        <img 
                            src="/foto deigner.png" 
                            alt="Fauzan Designer" 
                            className="w-full h-full object-cover scale-[1.15] group-hover:scale-100 transition-transform duration-1000 ease-out grayscale-[0.2]"
                        />
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isEntered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ delay: 1, type: "spring", bounce: 0.5 }}
                        className="absolute -bottom-6 -right-6 z-20 px-6 py-6 bg-lime-400 text-black rounded-full flex items-center justify-center font-black tracking-tighter text-xl shadow-2xl rotate-12"
                    >
                        DEV
                    </motion.div>
                </motion.div>

                {/* --- FOREGROUND DETAILS --- */}
                <div className="absolute bottom-8 left-6 md:left-12 z-20 font-mono text-[10px] md:text-xs text-white/50 uppercase flex flex-col gap-1 tracking-widest">
                    <p>Portfolio <span className="text-lime-400">©2026</span></p>
                    <p>Location: Indonesia</p>
                </div>
                
                <div className="absolute bottom-8 right-6 md:right-12 z-20 font-mono text-[10px] md:text-xs text-white/50 uppercase flex flex-col gap-1 tracking-widest text-right">
                    <p>Role: Mobile & Full Stack</p>
                    <p>Scroll to explore ↓</p>
                </div>

                {/* --- OVERLAPPING FOREGROUND TEXT --- */}
                <motion.div 
                    className="absolute z-30 top-1/2 left-4 md:left-12 -translate-y-1/2 pointer-events-none mix-blend-difference hidden sm:block"
                >
                    <motion.p 
                        whileHover={{ skewX: -5 }}
                        className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[0.9] pointer-events-auto cursor-default"
                    >
                        Mobile<br/>Developer.<br/>Full Stack<br/>Developer.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}
