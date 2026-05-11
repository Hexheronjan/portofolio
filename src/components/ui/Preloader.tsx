"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
    const [mounted, setMounted] = useState(false);
    const [show, setShow] = useState(true);
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<"counting" | "welcome" | "exiting">("counting");

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
        setMounted(true);

        // Uncomment this section if you only want the preloader to show ONCE per session.
        // For now, it will show on every reload so you can test and see the animation!
        /*
        if (sessionStorage.getItem("preloader_done")) {
            setShow(false);
            return;
        }
        */

        let start: number | null = null;
        const duration = 2000; // 2 seconds counting animation

        function step(timestamp: number) {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            
            // Ease out quart function for smooth deceleration at the end
            const easeOutQuart = 1 - Math.pow(1 - Math.min(elapsed / duration, 1), 4);
            const currentProgress = Math.floor(easeOutQuart * 100);
            
            setProgress(currentProgress);

            if (elapsed < duration) {
                requestAnimationFrame(step);
            } else {
                setProgress(100);
                setTimeout(() => {
                    setPhase("welcome");
                    // Memulai musik latar belakang
                    const audio = document.getElementById("bg-music") as HTMLAudioElement;
                    if (audio) {
                        audio.play().catch(e => console.warn("Autoplay dicegah oleh browser:", e));
                    }
                }, 300); // Wait 0.3s at 100%
                setTimeout(() => setPhase("exiting"), 2000); // Show 'Welcome' for 1.7s
            }
        }

        requestAnimationFrame(step);

    }, []);

    if (!mounted || !show) return null;

    return (
        <AnimatePresence
            onExitComplete={() => {
                sessionStorage.setItem("preloader_done", "1");
                setShow(false);
            }}
        >
            {phase !== "exiting" && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
                    style={{ backgroundColor: "#efefef", color: "#111" }}
                    exit={{
                        y: "-100vh",
                        transition: {
                            duration: 1.0,
                            ease: [0.76, 0, 0.24, 1],
                        },
                    }}
                >
                    {/* Noise Overlay */}
                    {!isMobile && <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.05] pointer-events-none" />}

                    {/* Centered Content Container */}
                    <div className="relative z-10 flex items-center justify-center h-32 overflow-hidden">
                        <AnimatePresence mode="wait">
                            {/* PHASE 1: COUNTING 0-100% */}
                            {phase === "counting" && (
                                <motion.div
                                    key="counter"
                                    exit={{ y: -80, opacity: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
                                    className="flex items-start gap-1"
                                >
                                    <span className="font-display font-medium text-[15vw] md:text-[10vw] leading-none tracking-tighter scale-y-[1.4] origin-bottom">
                                        {progress}
                                    </span>
                                    <span className="font-display text-4xl md:text-5xl mt-2 font-medium scale-y-[1.2] origin-bottom">
                                        %
                                    </span>
                                </motion.div>
                            )}
                            
                            {/* PHASE 2: WELCOME TEXT */}
                            {phase === "welcome" && (
                                <motion.div
                                    key="welcome"
                                    initial={{ y: 80, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                                    exit={{ y: -50, opacity: 0, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } }}
                                    className="flex flex-col items-center justify-center gap-2"
                                >
                                    <span className="font-display font-medium text-lg md:text-2xl uppercase tracking-[0.3em] text-[#111]/60">
                                        Welcome To
                                    </span>
                                    <span className="font-display font-bold text-3xl md:text-6xl uppercase tracking-tighter scale-y-[1.3] origin-bottom">
                                        PORTOFOLIO FAUZAN
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
