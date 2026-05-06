"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Code, PenTool } from "lucide-react";
import Link from "next/link";
import { Magnetic } from "@/components/ui/Magnetic";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const [isTouch, setIsTouch] = useState(false);
    
    // Mouse X position percentage (0 to 100)
    const mouseX = useMotionValue(50);
    // Add physics to the movement for a smooth fluid feel
    const springX = useSpring(mouseX, { stiffness: 45, damping: 15, mass: 0.8 });

    // FIX: useMotionTemplate produces a MotionValue<string> which can trigger
    // mixObject on unmount. Write clipPath directly to element.style instead.
    useEffect(() => {
        const unsubscribe = springX.on("change", (v: number) => {
            if (overlayRef.current) {
                overlayRef.current.style.clipPath = `polygon(0 0, ${v}% 0, ${v}% 100%, 0 100%)`;
            }
        });
        // Set initial value
        if (overlayRef.current) {
            overlayRef.current.style.clipPath = `polygon(0 0, 50% 0, 50% 100%, 0 100%)`;
        }
        return () => unsubscribe();
    }, [springX]);

    useEffect(() => {
        setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
        
        // Mobile auto-wobble effect so the user sees it's interactive
        if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
            let step = 0;
            const interval = setInterval(() => {
                step += 0.05;
                const wave = Math.sin(step) * 15 + 50; // oscillates between 35% and 65%
                mouseX.set(wave);
            }, 50);
            return () => clearInterval(interval);
        }
    }, [mouseX]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isTouch) return;
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            // Calculate percentage based on mouse position
            const percentage = ((e.clientX - rect.left) / rect.width) * 100;
            // Clamp it slightly so it doesn't completely disappear (limit to 10% - 90%)
            const clamped = Math.min(Math.max(percentage, 10), 90);
            mouseX.set(clamped);
        }
    };

    const handleMouseLeave = () => {
        if (!isTouch) {
            // Return to perfectly centered when mouse leaves
            mouseX.set(50); 
        }
    };

    return (
        <section 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full h-[100svh] min-h-[700px] overflow-hidden bg-[#0A0A0A] select-none"
        >
            {/* =========================================
                BASE LAYER (RIGHT SIDE - FULL STACK DEVELOPER)
                ========================================= */}
            <div className="absolute inset-0 bg-[#0A0A0A] text-zinc-100 flex flex-col justify-center">
                {/* Tech-themed background for Developer side */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(132,204,22,0.08),transparent_50%)]" />
                    <div 
                        className="absolute inset-0 opacity-[0.03]" 
                        style={{ 
                            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                            backgroundSize: "60px 60px"
                        }} 
                    />
                </div>

                <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-20 flex items-center justify-end relative h-full">
                    {/* Developer Text Block - Enhanced with Tech elements */}
                    <div className="w-[42%] flex flex-col justify-center items-start z-10 hidden md:flex">
                        <div className="relative">
                            {/* Decorative line numbers for tech feel */}
                            <div className="absolute -left-12 top-0 bottom-0 w-px bg-zinc-800/50 hidden lg:block">
                                {[12, 13, 14, 15, 16].map(n => (
                                    <span key={n} className="absolute -left-8 text-[10px] text-zinc-700 font-mono" style={{ top: `${(n-12)*40}px` }}>0{n}</span>
                                ))}
                            </div>

                            <div className="flex flex-col gap-6">
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1.2, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/10 border border-lime-500/20 text-lime-400 font-mono text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(132,204,22,0.1)]">
                                        <Code className="w-4 h-4" /> full stack developer
                                    </span>
                                </motion.div>

                                <motion.h1 
                                    initial={{ opacity: 0, x: 80 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1.2, delay: 3.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-5xl lg:text-6xl xl:text-7xl font-mono font-bold leading-[1.1] tracking-tighter text-white"
                                >
                                    Arsitektur <span className="text-zinc-500">&lt;</span><span className="text-lime-300">Data</span><span className="text-zinc-500">&gt;</span><br />
                                    Kinerja <span className="text-zinc-400 italic">Efisien.</span>
                                </motion.h1>

                                <motion.p 
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1.2, delay: 3.6, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-zinc-300 font-mono text-sm lg:text-base max-w-sm leading-relaxed"
                                >
                                    Membangun logika backend yang tangguh dan infrastruktur yang skalabel untuk pengalaman digital tanpa hambatan.
                                </motion.p>
                            </div>
                        </div>
                    </div>

                    {/* Developer Image */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, delay: 3.0 }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
                    >
                        <div className="w-[320px] h-[420px] md:w-[400px] md:h-[520px] overflow-hidden shadow-2xl relative border border-zinc-800 bg-zinc-950 group">
                            <img 
                                src="/foto dev.png" 
                                alt="Fauzan Developer" 
                                className="w-full h-full object-cover opacity-80 grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                            />
                            {/* Scanning line effect */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lime-500/10 to-transparent h-20 w-full -translate-y-full animate-[scan_3s_linear_infinite]" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* =========================================
                TOP LAYER (LEFT SIDE - UI DESIGNER / MASKED)
                ========================================= */}
            <div 
                ref={overlayRef}
                className="absolute inset-0 bg-white text-slate-900 flex flex-col justify-center"
            >
                {/* Designer Aesthetic Background */}
                <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-indigo-100/50 blur-[80px]" />
                <div className="absolute bottom-[10%] left-[20%] w-[350px] h-[350px] rounded-full bg-rose-100/40 blur-[80px]" />

                <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-20 flex items-center justify-start relative h-full">
                    {/* Designer Text Block - Added sliding animations */}
                    <div className="w-[42%] flex flex-col justify-center items-start z-10 hidden md:flex">
                        <div className="flex flex-col gap-6">
                            <motion.div 
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.2, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-medium text-xs tracking-[0.2em] uppercase shadow-sm">
                                    <PenTool className="w-4 h-4" /> ui/ux designer
                                </span>
                            </motion.div>

                            <motion.h1 
                                initial={{ opacity: 0, x: -80 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.2, delay: 3.4, ease: [0.16, 1, 0.3, 1] }}
                                className="text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] tracking-tighter text-black mb-2"
                            >
                                Estetika <span className="text-slate-500 font-light">Visual.</span><br />
                                Pengalaman <span className="text-indigo-700 italic">Sempurna.</span>
                            </motion.h1>

                            <motion.p 
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.2, delay: 3.6, ease: [0.16, 1, 0.3, 1] }}
                                className="text-slate-800 text-sm lg:text-base max-w-sm leading-relaxed border-l-2 border-indigo-500/20 pl-4"
                            >
                                Merancang antarmuka memukau dan pengalaman pengguna yang intuitif dengan presisi visual yang tinggi.
                            </motion.p>
                        </div>
                    </div>

                    {/* Designer Image */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, delay: 3.0 }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
                    >
                        <div className="w-[320px] h-[420px] md:w-[400px] md:h-[520px] overflow-hidden shadow-2xl relative border border-white bg-slate-100">
                            <img 
                                src="/foto deigner.png" 
                                alt="Fauzan Designer" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── Scroll hint ─────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-50 pointer-events-none mix-blend-difference"
                aria-hidden
            >
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-medium">Scroll</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-px h-7 bg-gradient-to-b from-white/30 to-transparent"
                />
            </motion.div>
        </section>
    );
}
