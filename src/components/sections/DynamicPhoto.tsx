"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Cpu, Globe, Layers, Sparkles } from "lucide-react";

const FlowerIcon = () => (
    <svg viewBox="0 0 100 100" className="w-[0.7em] h-[0.7em] text-[#b4f000] drop-shadow-sm" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0 C60 0, 70 10, 70 25 C70 40, 50 50, 50 50 C50 50, 30 40, 30 25 C30 10, 40 0, 50 0 Z" fill="currentColor"/>
        <path d="M100 50 C100 60, 90 70, 75 70 C60 70, 50 50, 50 50 C50 50, 60 30, 75 30 C90 30, 100 40, 100 50 Z" fill="currentColor"/>
        <path d="M50 100 C40 100, 30 90, 30 75 C30 60, 50 50, 50 50 C50 50, 70 60, 70 75 C70 90, 60 100, 50 100 Z" fill="currentColor"/>
        <path d="M0 50 C0 40, 10 30, 25 30 C40 30, 50 50, 50 50 C50 50, 40 70, 25 70 C10 70, 0 60, 0 50 Z" fill="currentColor"/>
    </svg>
);

const Badge = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        className={`absolute z-30 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 shadow-xl flex items-center gap-2 text-xs font-medium ${className}`}
    >
        {children}
    </motion.div>
);

export function DynamicPhoto() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Efek kartu membesar saat di-scroll
    const margin = useTransform(scrollYProgress, [0, 0.2], ["4vw", "0vw"]);
    const radius = useTransform(scrollYProgress, [0, 0.2], ["3rem", "0rem"]);
    
    // Animasi foto
    const photoY = useTransform(scrollYProgress, [0.2, 0.5], [200, 0]);
    const photoScale = useTransform(scrollYProgress, [0.2, 0.5], [0.9, 1]);
    const photoOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
    
    // Floating background text
    const bgTextX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

    return (
        <section ref={containerRef} className="relative w-full bg-[#0A0A0A] overflow-hidden">
            
            {/* The expanding card */}
            <motion.div 
                style={{ 
                    marginLeft: margin, 
                    marginRight: margin, 
                    borderTopLeftRadius: radius,
                    borderTopRightRadius: radius,
                }}
                className="bg-white dark:bg-[#111] overflow-hidden flex flex-col items-center pt-[15vh] pb-[25vh] mt-[5vh] relative transition-colors duration-500"
            >
                {/* Large Background Decorative Text */}
                <motion.div 
                    style={{ x: bgTextX }}
                    className="absolute top-[20%] left-0 w-full text-[30vw] font-black text-black/[0.03] dark:text-white/[0.02] whitespace-nowrap pointer-events-none select-none uppercase tracking-tighter"
                >
                    Creative Developer
                </motion.div>

                {/* Marquee Text */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative z-20 w-full overflow-hidden pointer-events-none mb-[10vh] md:mb-[15vh]"
                >
                    <motion.div 
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                        className="flex whitespace-nowrap items-center font-display font-bold tracking-tight text-[#111] dark:text-white w-max"
                    >
                        <div className="flex items-center gap-8 md:gap-16 pr-8 md:pr-16 text-[12vw] md:text-[8vw]">
                            <span className="opacity-90">FULL-STACK DEVELOPER</span>
                            <FlowerIcon />
                            <span className="text-zinc-400 dark:text-zinc-600">MOBILE DEVELOPER</span>
                            <FlowerIcon />
                            <span className="opacity-90">FULL-STACK DEVELOPER</span>
                            <FlowerIcon />
                            <span className="text-zinc-400 dark:text-zinc-600">MOBILE DEVELOPER</span>
                            <FlowerIcon />
                        </div>
                        <div className="flex items-center gap-8 md:gap-16 pr-8 md:pr-16 text-[12vw] md:text-[8vw]">
                            <span className="opacity-90">FULL-STACK DEVELOPER</span>
                            <FlowerIcon />
                            <span className="text-zinc-400 dark:text-zinc-600">MOBILE DEVELOPER</span>
                            <FlowerIcon />
                            <span className="opacity-90">FULL-STACK DEVELOPER</span>
                            <FlowerIcon />
                            <span className="text-zinc-400 dark:text-zinc-600">MOBILE DEVELOPER</span>
                            <FlowerIcon />
                        </div>
                    </motion.div>
                </motion.div>

                {/* Photo Container with Floating Badges */}
                <div className="relative group px-4">
                    {/* Floating Badges for Mobile & Desktop Appeal */}
                    <Badge className="top-[-5%] left-[-10%] bg-white/80 dark:bg-black/80 text-black dark:text-white" delay={0.2}>
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span>Innovator</span>
                    </Badge>
                    
                    <Badge className="bottom-[10%] left-[-15%] bg-indigo-500 text-white border-indigo-400/50" delay={0.4}>
                        <Code2 className="w-3 h-3" />
                        <span>Next.js Expert</span>
                    </Badge>
                    
                    <Badge className="top-[15%] right-[-15%] bg-lime-400 text-black border-lime-500/50" delay={0.6}>
                        <Cpu className="w-3 h-3" />
                        <span>Backend Wiz</span>
                    </Badge>

                    <Badge className="bottom-[-5%] right-[-5%] bg-white/80 dark:bg-black/80 text-black dark:text-white" delay={0.8}>
                        <Globe className="w-3 h-3 text-blue-500" />
                        <span>Global Scalability</span>
                    </Badge>

                    {/* Main Photo Card */}
                    <motion.div 
                        style={{ y: photoY, scale: photoScale, opacity: photoOpacity }}
                        className="relative z-10 w-[80vw] max-w-[340px] md:max-w-[480px] aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] bg-zinc-200 dark:bg-zinc-800 border-4 border-white dark:border-zinc-700"
                    >
                        <img 
                            src="/fototengah.jpg" 
                            alt="Fauzan Portfolio Portrait" 
                            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                        />
                        
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        
                        {/* Interactive Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out pointer-events-none" />
                    </motion.div>

                    {/* Decorative Elements around photo */}
                    <div className="absolute -inset-4 border border-zinc-200 dark:border-zinc-800 rounded-[3rem] -z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -inset-8 border border-zinc-100 dark:border-zinc-900 rounded-[3.5rem] -z-20 opacity-30 group-hover:opacity-60 transition-opacity duration-700" />
                </div>

                {/* Subtext on Mobile */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-12 text-center px-8 md:hidden"
                >
                    <p className="text-zinc-500 dark:text-zinc-400 font-mono text-[10px] tracking-[0.3em] uppercase">
                        Based in Indonesia • Available for projects
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
}

