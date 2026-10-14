"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";

/**
 * =========================================================================
 * KONFIGURASI PRELOADER / INTRO
 * =========================================================================
 * Anda dapat dengan mudah mengubah teks, durasi, atau mematikan intro di sini:
 * - ENABLED: Set false untuk menonaktifkan intro secara permanen.
 * - MIN_DURATION: Durasi minimal animasi counter (detik).
 * - MAX_DURATION: Batas maksimal waktu tunggu sebelum dipaksa selesai (detik).
 * =========================================================================
 */
export const PRELOADER_CONFIG = {
    ENABLED: true,
    MIN_DURATION: 1.8,
    MAX_DURATION: 3.5,
    TEXT_LINE_1: "Selamat datang di",
    TEXT_LINE_2: "Portofolio Fauzan",
    TEXT_LINE_3: "Full Stack & Mobile Developer",
    LOCATION_LABEL: "Portfolio 2026 — Ponorogo, Indonesia",
    STORAGE_KEY: "portfolio_intro_shown",
};

interface PreloaderProps {
    onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const counterRef = useRef<HTMLSpanElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const progressMotion = useMotionValue(0);

    const finishIntro = useCallback(() => {
        setIsExiting(true);
        try {
            sessionStorage.setItem(PRELOADER_CONFIG.STORAGE_KEY, "true");
            document.documentElement.setAttribute("data-intro", "skip");
            window.dispatchEvent(new CustomEvent("portfolio_intro_finished"));
        } catch {}

        // Kembalikan scroll body
        document.body.style.overflow = "";

        setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
        }, 850);
    }, [onComplete]);

    useEffect(() => {
        // 1. Cek apakah dinonaktifkan di konfigurasi
        if (!PRELOADER_CONFIG.ENABLED) {
            if (onComplete) onComplete();
            return;
        }

        // 2. Cek preferensi reduced motion
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) {
            try {
                sessionStorage.setItem(PRELOADER_CONFIG.STORAGE_KEY, "true");
            } catch {}
            if (onComplete) onComplete();
            return;
        }

        // 3. Cek apakah sudah pernah tampil di sesi browser ini
        const alreadyShown = sessionStorage.getItem(PRELOADER_CONFIG.STORAGE_KEY) === "true";
        if (alreadyShown) {
            if (onComplete) onComplete();
            return;
        }

        // Tampilkan intro & kunci scroll
        setIsVisible(true);
        document.body.style.overflow = "hidden";

        // Listener angka counter & progress bar via MotionValue (tanpa re-render React tree)
        const unsubscribe = progressMotion.on("change", (latest) => {
            const val = Math.min(100, Math.floor(latest));
            if (counterRef.current) {
                counterRef.current.textContent = String(val).padStart(3, "0");
            }
            if (progressBarRef.current) {
                progressBarRef.current.style.transform = `scaleX(${val / 100})`;
            }
        });

        // Tunggu document.fonts.ready & decode foto hero sebagai sinyal kesiapan aset
        const criticalAssetsPromise = Promise.all([
            document.fonts ? document.fonts.ready : Promise.resolve(),
            new Promise<void>((resolve) => {
                const img = new window.Image();
                img.src = "/portrait-hero.png";
                if (img.decode) {
                    img.decode().then(() => resolve()).catch(() => resolve());
                } else {
                    img.onload = () => resolve();
                    img.onerror = () => resolve();
                }
            }),
        ]);

        const minTimerPromise = new Promise((resolve) =>
            setTimeout(resolve, PRELOADER_CONFIG.MIN_DURATION * 1000)
        );

        // Animasi angka dari 0 ke 100 dengan easing cubic-bezier natural
        const controls = animate(progressMotion, 100, {
            duration: PRELOADER_CONFIG.MIN_DURATION + 0.4,
            ease: [0.25, 0.1, 0.25, 1],
        });

        // Timer pengaman batas maksimal (fallback)
        const maxTimer = setTimeout(() => {
            finishIntro();
        }, PRELOADER_CONFIG.MAX_DURATION * 1000);

        // Setelah minimal waktu dan aset siap, transisi keluar
        Promise.all([criticalAssetsPromise, minTimerPromise, controls]).then(() => {
            clearTimeout(maxTimer);
            // Tahan sejenak di angka 100 sebelum slide up
            setTimeout(() => {
                finishIntro();
            }, 300);
        });

        // Handler tombol Esc untuk melewati
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                clearTimeout(maxTimer);
                finishIntro();
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            unsubscribe();
            controls.stop();
            clearTimeout(maxTimer);
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [finishIntro, onComplete, progressMotion]);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {!isExiting ? (
                <motion.div
                    key="preloader-overlay"
                    role="status"
                    aria-label="Memuat portofolio"
                    initial={{ opacity: 1 }}
                    exit={{
                        y: "-100%",
                        opacity: 0.95,
                        transition: {
                            duration: 0.85,
                            ease: [0.76, 0, 0.24, 1],
                        },
                    }}
                    className="fixed inset-0 z-[999999] flex flex-col justify-between bg-background text-foreground select-none overflow-hidden"
                >
                    {/* Header: Tombol Lewati */}
                    <div className="w-full flex items-center justify-between p-6 sm:p-10 z-10">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                                Loading Experience
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={finishIntro}
                            className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground px-3.5 py-1.5 rounded-full border border-border/80 hover:border-primary/50 bg-card/60 backdrop-blur transition-all"
                            aria-label="Lewati intro (tekan Esc)"
                        >
                            Lewati [Esc]
                        </button>
                    </div>

                    {/* Tengah: Mask Reveal Teks Sambutan Bertingkat */}
                    <div className="container-page flex flex-col items-center justify-center text-center my-auto px-6">
                        {/* Baris 1: Selamat datang di */}
                        <div className="overflow-hidden pb-1">
                            <motion.p
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: "0%", opacity: 1 }}
                                transition={{ duration: 0.7, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
                                className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-primary font-semibold"
                            >
                                {PRELOADER_CONFIG.TEXT_LINE_1}
                            </motion.p>
                        </div>

                        {/* Baris 2: Portofolio Fauzan */}
                        <div className="overflow-hidden my-2 sm:my-3">
                            <motion.h1
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: "0%", opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.45, ease: [0.33, 1, 0.68, 1] }}
                                className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-foreground"
                            >
                                {PRELOADER_CONFIG.TEXT_LINE_2}
                            </motion.h1>
                        </div>

                        {/* Baris 3: Full Stack & Mobile Developer */}
                        <div className="overflow-hidden pt-1">
                            <motion.p
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: "0%", opacity: 0.75 }}
                                transition={{ duration: 0.7, delay: 0.6, ease: [0.33, 1, 0.68, 1] }}
                                className="text-sm sm:text-base font-medium text-muted-foreground tracking-wide"
                            >
                                {PRELOADER_CONFIG.TEXT_LINE_3}
                            </motion.p>
                        </div>
                    </div>

                    {/* Bawah: Meta Lokasi (Kiri) & Counter Angka Tabular (Kanan) */}
                    <div className="w-full flex items-end justify-between p-6 sm:p-10 z-10">
                        {/* Label Lokasi */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="font-mono text-[11px] sm:text-xs text-muted-foreground tracking-wider pb-2 sm:pb-4"
                        >
                            {PRELOADER_CONFIG.LOCATION_LABEL}
                        </motion.div>

                        {/* Counter 000 - 100 */}
                        <div className="flex items-baseline">
                            <span
                                ref={counterRef}
                                className="font-display font-black tracking-tighter text-foreground tabular-nums leading-none select-none text-[clamp(4.5rem,15vw,11rem)]"
                            >
                                000
                            </span>
                            <span className="font-mono text-sm sm:text-xl font-bold text-primary ml-1 sm:ml-2">
                                %
                            </span>
                        </div>
                    </div>

                    {/* Progress Bar Tipis di Dasar Layar */}
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-muted/40 overflow-hidden">
                        <div
                            ref={progressBarRef}
                            className="h-full w-full bg-primary origin-left transition-transform duration-75 ease-linear"
                            style={{ transform: "scaleX(0)" }}
                        />
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
