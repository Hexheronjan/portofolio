"use client";

import { useRef, useState, useEffect } from "react";
import {
    motion, useScroll, useTransform, useSpring,
    AnimatePresence, useMotionValue,
} from "framer-motion";

export function Hero() {
    const [isEntered, setIsEntered] = useState(false);
    const [isMobile,  setIsMobile]  = useState(false);

    useEffect(() => {
        setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }, []);

    const containerRef = useRef<HTMLDivElement>(null);
    const photoRef     = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // ─── multi-layer parallax (visible difference between layers) ───────────
    const yTextBg    = useTransform(scrollYProgress, [0, 1], ["0%",   isMobile ? "25%" : "65%"]);
    const yPhoto     = useTransform(scrollYProgress, [0, 1], ["0%",   isMobile ? "10%" : "28%"]);
    const yForeText  = useTransform(scrollYProgress, [0, 1], ["0%",   isMobile ? "5%"  : "10%"]);
    const yBlob1     = useTransform(scrollYProgress, [0, 1], ["0%",   "-80%"]);
    const yBlob2     = useTransform(scrollYProgress, [0, 1], ["0%",    "50%"]);
    const scalePhoto = useTransform(scrollYProgress, [0, 0.6], [1,     isMobile ? 1 : 0.82]);
    const scaleText  = useTransform(scrollYProgress, [0, 0.6], [1,     isMobile ? 1 : 1.12]);
    const opacity    = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

    // ─── mouse parallax for intro screen ────────────────────────────────────
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const sp     = { damping: 18, stiffness: 90 };
    const blob1X = useSpring(useTransform(mouseX, [-50, 50], [ 50, -50]), sp);
    const blob1Y = useSpring(useTransform(mouseY, [-50, 50], [ 50, -50]), sp);
    const blob2X = useSpring(useTransform(mouseX, [-50, 50], [-70,  70]), sp);
    const blob2Y = useSpring(useTransform(mouseY, [-50, 50], [-70,  70]), sp);
    const textX  = useSpring(useTransform(mouseX, [-50, 50], [-14,  14]), sp);
    const textY  = useSpring(useTransform(mouseY, [-50, 50], [-14,  14]), sp);

    // ─── 3D photo tilt on mouse hover ───────────────────────────────────────
    const photoMX = useMotionValue(0);
    const photoMY = useMotionValue(0);
    const spFast  = { damping: 22, stiffness: 250 };
    const photoRX = useSpring(useTransform(photoMY, [-0.5, 0.5], [ 14, -14]), spFast);
    const photoRY = useSpring(useTransform(photoMX, [-0.5, 0.5], [-14,  14]), spFast);

    const onPhotoMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMobile || !photoRef.current) return;
        const r = photoRef.current.getBoundingClientRect();
        photoMX.set((e.clientX - r.left) / r.width  - 0.5);
        photoMY.set((e.clientY - r.top)  / r.height - 0.5);
    };
    const onPhotoLeave = () => { photoMX.set(0); photoMY.set(0); };

    const onMouseMove = (e: React.MouseEvent) => {
        if (isMobile) return;
        mouseX.set((e.clientX / window.innerWidth  - 0.5) * 50);
        mouseY.set((e.clientY / window.innerHeight - 0.5) * 50);
    };

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[100svh] min-h-[100svh] overflow-hidden font-sans selection:bg-lime-400 selection:text-black bg-[#0f0f0f]"
        >
            {/* ── INTRO / COVER SCREEN ───────────────────────────────── */}
            <AnimatePresence>
                {!isEntered && (
                    <motion.div
                        key="intro"
                        exit={{ y: "-100%", transition: { duration: isMobile ? 0.7 : 1.1, ease: [0.76, 0, 0.24, 1] } }}
                        onMouseMove={!isMobile ? onMouseMove : undefined}
                        onMouseEnter={() => setIsEntered(true)}
                        onClick={() => setIsEntered(true)}
                        onWheel={() => setIsEntered(true)}
                        onTouchStart={() => setIsEntered(true)}
                        className="absolute inset-0 z-50 cursor-pointer bg-[#050505] overflow-hidden flex flex-col justify-between p-6 sm:p-10 select-none"
                    >
                        {/* Mouse-driven blobs */}
                        {!isMobile && (
                            <>
                                <motion.div
                                    style={{ x: blob1X, y: blob1Y, background: "radial-gradient(circle, rgba(163,230,53,0.07) 0%, transparent 70%)", filter: "blur(40px)" }}
                                    className="absolute top-[-15%] left-[5%] w-[55vw] h-[55vw] rounded-full pointer-events-none will-change-transform"
                                />
                                <motion.div
                                    style={{ x: blob2X, y: blob2Y, background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", filter: "blur(60px)" }}
                                    className="absolute bottom-[-15%] right-[0%] w-[65vw] h-[65vw] rounded-full pointer-events-none will-change-transform"
                                />
                            </>
                        )}
                        {!isMobile && <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] pointer-events-none" />}

                        {/* Text layer with mouse parallax */}
                        <motion.div
                            style={!isMobile ? { x: textX, y: textY } : undefined}
                            className="relative z-10 w-full h-full flex flex-col justify-center gap-6 md:gap-10"
                        >
                            <div className="flex flex-col items-start gap-4 overflow-hidden py-2">
                                <motion.h2
                                    initial={{ y: "110%" }} animate={{ y: "0%" }}
                                    transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                                    className="text-4xl md:text-6xl font-display font-medium tracking-tighter scale-y-[1.4] origin-top-left text-white"
                                >FAUZAN</motion.h2>
                            </div>

                            <div className="w-full border-t border-zinc-800/80 pt-2 md:pt-4 overflow-hidden">
                                <motion.h1
                                    initial={{ y: "120%" }} animate={{ y: "0%" }}
                                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                                    className="text-[13vw] md:text-[11vw] font-black uppercase tracking-tighter text-white scale-y-[1.6] origin-top leading-[0.75]"
                                >FOLIO OF FAUZAN</motion.h1>
                            </div>

                            <div className="w-full border-t border-zinc-800/80 pt-2 md:pt-4 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-4 overflow-hidden">
                                <motion.h1
                                    initial={{ y: "120%" }} animate={{ y: "0%" }}
                                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
                                    className="text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter text-transparent scale-y-[1.6] origin-top leading-[0.75] hover:text-white transition-colors"
                                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.8)" }}
                                >28/MAY.2026</motion.h1>
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
                                    className="flex flex-col items-center justify-center border border-zinc-700 rounded-full px-6 py-2 md:px-10 md:py-4 hover:bg-white hover:text-black transition-colors duration-500"
                                >
                                    <span className="font-display text-sm md:text-2xl uppercase scale-y-[1.4] origin-bottom tracking-widest">( BASED IN INDONESIA )</span>
                                </motion.div>
                            </div>

                            <div className="w-full border-t border-zinc-800/80 pt-2 md:pt-4 mt-auto overflow-hidden">
                                <motion.h1
                                    initial={{ y: "120%" }} animate={{ y: "0%" }}
                                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
                                    className="text-[11vw] md:text-[9vw] font-black uppercase tracking-tighter text-white scale-y-[1.6] origin-bottom leading-[0.75] opacity-90"
                                >FULL STACK DEVELOPER</motion.h1>
                            </div>
                        </motion.div>

                        {/* Click indicator */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 1 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.06, 1] }}
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

            {/* ── MAIN HERO — 3D layered scene ─────────────────────── */}
            <motion.div
                style={{ opacity }}
                className="absolute inset-0 w-full h-full flex flex-col items-center justify-center z-10 overflow-hidden"
            >
                {/* ── Layer 1 (FARTHEST): blobs, move fastest upward ── */}
                {!isMobile && (
                    <>
                        <motion.div
                            style={{ y: yBlob1, background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)", filter: "blur(60px)" }}
                            className="absolute top-[5%] left-[8%] w-[35vw] h-[35vw] min-w-[280px] min-h-[280px] rounded-full pointer-events-none will-change-transform"
                        />
                        <motion.div
                            style={{ y: yBlob2, background: "radial-gradient(circle, rgba(163,230,53,0.08) 0%, transparent 70%)", filter: "blur(80px)" }}
                            className="absolute bottom-[5%] right-[3%] w-[45vw] h-[45vw] min-w-[360px] min-h-[360px] rounded-full pointer-events-none will-change-transform"
                        />
                    </>
                )}

                {!isMobile && <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.04] mix-blend-overlay pointer-events-none z-50" />}

                {/* ── Layer 2 (BACKGROUND text): moves 65% up on scroll ── */}
                <motion.div
                    style={{ y: yTextBg, scale: scaleText }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none select-none w-full will-change-transform"
                >
                    <div className="flex flex-col items-center justify-center -space-y-[4vw] md:-space-y-[2vw]">
                        <h1 className="text-[22vw] md:text-[18vw] font-black uppercase tracking-tighter text-[#eaeaea] leading-[0.8] scale-y-[1.6] origin-bottom opacity-90 cursor-default">
                            FAUZAN
                        </h1>
                        <h1
                            className="text-[22vw] md:text-[18vw] font-black uppercase tracking-tighter text-transparent leading-[0.8] scale-y-[1.6] origin-top cursor-default"
                            style={{ WebkitTextStroke: "2px rgba(234,234,234,0.15)" }}
                        >
                            STUDIO
                        </h1>
                    </div>
                </motion.div>

                {/* ── Layer 3 (MIDDLE): photo, moves 28% up ── */}
                <motion.div
                    ref={photoRef}
                    style={{
                        y: yPhoto, scale: scalePhoto,
                        ...(isMobile ? {} : { rotateX: photoRX, rotateY: photoRY, transformStyle: "preserve-3d" as const }),
                    }}
                    onMouseMove={onPhotoMove}
                    onMouseLeave={onPhotoLeave}
                    className="relative z-10 w-[65vw] sm:w-[45vw] md:w-[32vw] max-w-[420px] aspect-[3/4] mt-[5vh] cursor-pointer will-change-transform"
                >
                    <div style={{ perspective: "800px" }}>
                        <div
                            className={`w-full h-full overflow-hidden border border-white/10 relative group ${
                                isMobile ? "rounded-[30%_70%_70%_30%/30%_30%_70%_70%]" : "animate-morph"
                            }`}
                            style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05) inset" }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
                            {!isMobile && (
                                <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-transparent via-white/6 to-white/12" />
                            )}
                            <img
                                src="/foto deigner.png"
                                alt="Fauzan Designer"
                                className="w-full h-full object-cover scale-[1.15] group-hover:scale-100 transition-transform duration-1000 ease-out grayscale-[0.15]"
                                loading="eager"
                            />
                        </div>
                    </div>

                    {/* DEV badge — floats above photo in 3D */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isEntered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ delay: 1, type: "spring", bounce: 0.5 }}
                        style={!isMobile ? { transform: "translateZ(50px)" } : {}}
                        className="absolute -bottom-6 -right-6 z-20 px-6 py-6 bg-lime-400 text-black rounded-full flex items-center justify-center font-black tracking-tighter text-xl shadow-2xl rotate-12"
                    >
                        DEV
                    </motion.div>
                </motion.div>

                {/* ── Layer 4 (NEAREST): foreground text, moves only 10% ── */}
                <motion.div style={{ y: yForeText }}
                    className="absolute bottom-8 left-6 md:left-12 z-20 font-mono text-[10px] md:text-xs text-white/50 uppercase flex flex-col gap-1 tracking-widest will-change-transform"
                >
                    <p>Portfolio <span className="text-lime-400">©2026</span></p>
                    <p>Location: Indonesia</p>
                </motion.div>

                <motion.div style={{ y: yForeText }}
                    className="absolute bottom-8 right-6 md:right-12 z-20 font-mono text-[10px] md:text-xs text-white/50 uppercase flex flex-col gap-1 tracking-widest text-right will-change-transform"
                >
                    <p>Role: Mobile & Full Stack</p>
                    <p>Scroll to explore ↓</p>
                </motion.div>

                <motion.div
                    style={{ y: yForeText }}
                    className={`absolute z-30 top-1/2 left-4 md:left-12 -translate-y-1/2 pointer-events-none will-change-transform ${!isMobile ? "mix-blend-difference" : ""} hidden sm:block`}
                >
                    <p className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[0.9] cursor-default">
                        Mobile<br />Developer.<br />Full Stack<br />Developer.
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
}
