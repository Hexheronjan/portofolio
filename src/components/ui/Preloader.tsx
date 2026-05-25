"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
    const [mounted, setMounted] = useState(false);
    const [show, setShow] = useState(true);
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<"counting" | "welcome" | "exiting">("counting");
    const [audioUnlocked, setAudioUnlocked] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const audioUnlockedRef = useRef(false);

    // Fungsi untuk membuka kunci audio (dipanggil saat ada interaksi)
    const unlockAndPlay = () => {
        const audio = document.getElementById("bg-music") as HTMLAudioElement;
        if (!audio) return;

        // Trick: play lalu langsung pause untuk "membuka kunci" audio di browser
        // Setelah ini, audio.play() di masa depan tidak akan diblokir browser
        if (!audioUnlockedRef.current) {
            audio.volume = 0;
            audio.play().then(() => {
                audio.pause();
                audio.currentTime = 0;
                audio.volume = 1;
                audioUnlockedRef.current = true;
                setAudioUnlocked(true);
            }).catch(() => {
                // Fallback: tandai tetap terbuka kunci meski gagal
                audioUnlockedRef.current = true;
                setAudioUnlocked(true);
            });
        }
    };

    useEffect(() => {
        setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
        setMounted(true);

        let start: number | null = null;
        const duration = 2000; // 2 detik animasi loading

        function step(timestamp: number) {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;

            const easeOutQuart = 1 - Math.pow(1 - Math.min(elapsed / duration, 1), 4);
            const currentProgress = Math.floor(easeOutQuart * 100);
            setProgress(currentProgress);

            if (elapsed < duration) {
                requestAnimationFrame(step);
            } else {
                setProgress(100);
                setTimeout(() => {
                    setPhase("welcome");
                    // Coba mainkan musik saat fase Welcome muncul
                    const audio = document.getElementById("bg-music") as HTMLAudioElement;
                    if (audio) {
                        audio.volume = 1;
                        audio.play().catch(e => {
                            console.warn("Autoplay dicegah browser:", e);
                        });
                    }
                }, 300);
                setTimeout(() => setPhase("exiting"), 2000);
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
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none cursor-pointer"
                    style={{ backgroundColor: "#efefef", color: "#111" }}
                    exit={{
                        y: "-100vh",
                        transition: {
                            duration: 1.0,
                            ease: [0.76, 0, 0.24, 1],
                        },
                    }}
                    onClick={unlockAndPlay}
                    onTouchStart={unlockAndPlay}
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

                    {/* Hint klik di bawah (hanya tampil saat fase counting & audio belum terbuka kuncinya) */}
                    <AnimatePresence>
                        {phase === "counting" && !audioUnlocked && (
                            <motion.p
                                key="tap-hint"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } }}
                                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                                className="absolute bottom-12 text-[#111]/40 text-xs md:text-sm tracking-widest uppercase"
                            >
                                {isMobile ? "Tap to enable sound" : "Click to enable sound"}
                            </motion.p>
                        )}
                        {phase === "counting" && audioUnlocked && (
                            <motion.p
                                key="sound-ready"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute bottom-12 text-[#111]/40 text-xs md:text-sm tracking-widest uppercase"
                            >
                                🎵 Sound ready
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
