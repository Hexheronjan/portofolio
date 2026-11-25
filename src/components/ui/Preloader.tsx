"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";

/**
 * =========================================================================
 * KONFIGURASI PRELOADER / INTRO
 * =========================================================================
 */
export const PRELOADER_CONFIG = {
    ENABLED: true,
    MIN_DURATION: 2.0,
    MAX_DURATION: 3.8,
    TEXT_LINE_1: "Selamat datang di",
    TEXT_LINE_2_MAIN: "Portofolio",
    TEXT_LINE_2_ACCENT: "Fauzan",
    TEXT_LINE_3: "Full Stack & Mobile Developer",
    LOCATION_LABEL: "Portfolio 2026 — Ponorogo, Indonesia",
    STORAGE_KEY: "portfolio_intro_shown",
};

interface PreloaderProps {
    onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    // Mulai dengan true di Beranda agar Preloader langsung menutup layar sejak first paint (SSR)
    // di root stacking context (di atas Navbar & MobileBottomNav). Jika sesi sudah melihat intro,
    // aturan CSS `html[data-intro="skip"] .preloader-root { display: none }` menyembunyikannya instan.
    const [isVisible, setIsVisible] = useState(isHomePage);
    const [isExiting, setIsExiting] = useState(false);
    const counterRef = useRef<HTMLSpanElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const progressMotion = useMotionValue(0);
    const finishedRef = useRef(false);

    const finishIntro = useCallback(() => {
        if (finishedRef.current) return;
        finishedRef.current = true;
        setIsExiting(true);

        try {
            sessionStorage.setItem(PRELOADER_CONFIG.STORAGE_KEY, "true");
            document.documentElement.setAttribute("data-intro", "skip");
            window.dispatchEvent(new CustomEvent("portfolio_intro_finished"));
        } catch {}

        document.body.style.overflow = "";

        setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
        }, 750);
    }, [onComplete]);

    useEffect(() => {
        if (!isHomePage || !PRELOADER_CONFIG.ENABLED) {
            setIsVisible(false);
            if (onComplete) onComplete();
            return;
        }

        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) {
            try {
                sessionStorage.setItem(PRELOADER_CONFIG.STORAGE_KEY, "true");
                document.documentElement.setAttribute("data-intro", "skip");
                window.dispatchEvent(new CustomEvent("portfolio_intro_finished"));
            } catch {}
            setIsVisible(false);
            if (onComplete) onComplete();
            return;
        }

        const alreadyShown =
            sessionStorage.getItem(PRELOADER_CONFIG.STORAGE_KEY) === "true" ||
            document.documentElement.getAttribute("data-intro") === "skip";

        if (alreadyShown) {
            setIsVisible(false);
            if (onComplete) onComplete();
            return;
        }

        document.body.style.overflow = "hidden";

        const unsubscribe = progressMotion.on("change", (latest) => {
            const val = Math.min(100, Math.floor(latest));
            if (counterRef.current) {
                counterRef.current.textContent = String(val).padStart(3, "0");
            }
            if (progressBarRef.current) {
                progressBarRef.current.style.transform = `scaleX(${val / 100})`;
            }
        });

        const criticalAssetsPromise = Promise.all([
            document.fonts ? document.fonts.ready : Promise.resolve(),
            new Promise<void>((resolve) => {
                const img = new window.Image();
                img.src = "/portrait-hero.jpg";
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

        const controls = animate(progressMotion, 100, {
            duration: PRELOADER_CONFIG.MIN_DURATION,
            ease: [0.25, 0.1, 0.25, 1],
        });

        const maxTimer = setTimeout(() => {
            finishIntro();
        }, PRELOADER_CONFIG.MAX_DURATION * 1000);

        Promise.all([criticalAssetsPromise, minTimerPromise, controls]).then(() => {
            clearTimeout(maxTimer);
            setTimeout(() => {
                finishIntro();
            }, 220);
        });

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
    }, [finishIntro, isHomePage, onComplete, progressMotion]);

    if (!isHomePage || !isVisible) return null;

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
                        transition: {
                            duration: 0.72,
                            ease: [0.76, 0, 0.24, 1],
                        },
                    }}
                    className="preloader-root fixed inset-0 z-[999999] flex flex-col justify-between bg-[#0e0d0c] text-[#f4efe8] select-none overflow-hidden"
                >
                    {/* Latar Grid Arsitektural & Cahaya Copper Halus */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-35"
                        style={{
                            backgroundImage:
                                "linear-gradient(to right, rgba(244, 239, 232, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(244, 239, 232, 0.05) 1px, transparent 1px)",
                            backgroundSize: "48px 48px",
                        }}
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[340px] rounded-full blur-[130px]"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(224, 122, 82, 0.22), rgba(212, 175, 114, 0.08) 55%, transparent 75%)",
                        }}
                    />

                    {/* Header: Indikator & Tombol Lewati */}
                    <div className="relative z-10 w-full flex items-center justify-between p-6 sm:p-10">
                        <div className="flex items-center gap-2.5">
                            <span className="h-2 w-2 rounded-full bg-[#e07a52] animate-pulse" />
                            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#a49b91]">
                                Loading Experience
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={finishIntro}
                            className="text-xs font-mono font-medium uppercase tracking-wider text-[#b8afa5] hover:text-[#f4efe8] px-3.5 py-1.5 rounded-full border border-white/15 hover:border-[#e07a52]/60 bg-white/5 backdrop-blur transition-all"
                            aria-label="Lewati intro (tekan Esc)"
                        >
                            Lewati [Esc]
                        </button>
                    </div>

                    {/* Tengah: Teks Sambutan Editorial */}
                    <div className="relative z-10 container-page flex flex-col items-center justify-center text-center my-auto px-6">
                        <div className="overflow-hidden pb-1">
                            <motion.p
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: "0%", opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
                                className="font-mono text-xs sm:text-sm uppercase tracking-[0.28em] text-[#e07a52] font-semibold"
                            >
                                {PRELOADER_CONFIG.TEXT_LINE_1}
                            </motion.p>
                        </div>

                        <div className="overflow-hidden my-2 sm:my-3">
                            <motion.h1
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: "0%", opacity: 1 }}
                                transition={{ duration: 0.75, delay: 0.28, ease: [0.33, 1, 0.68, 1] }}
                                className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-[#f4efe8]"
                            >
                                {PRELOADER_CONFIG.TEXT_LINE_2_MAIN}{" "}
                                <span className="font-editorial text-[#e07a52] font-normal text-[1.12em]">
                                    {PRELOADER_CONFIG.TEXT_LINE_2_ACCENT}
                                </span>
                            </motion.h1>
                        </div>

                        <div className="overflow-hidden pt-1">
                            <motion.p
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: "0%", opacity: 1 }}
                                transition={{ duration: 0.65, delay: 0.42, ease: [0.33, 1, 0.68, 1] }}
                                className="text-sm sm:text-base font-medium text-[#a49b91] tracking-wide"
                            >
                                {PRELOADER_CONFIG.TEXT_LINE_3}
                            </motion.p>
                        </div>
                    </div>

                    {/* Bawah: Lokasi & Counter Angka */}
                    <div className="relative z-10 w-full flex items-end justify-between p-6 sm:p-10">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="font-mono text-[11px] sm:text-xs text-[#8a8177] tracking-wider pb-2 sm:pb-4"
                        >
                            {PRELOADER_CONFIG.LOCATION_LABEL}
                        </motion.div>

                        <div className="flex items-baseline">
                            <span
                                ref={counterRef}
                                className="font-display font-black tracking-tighter text-[#f4efe8] tabular-nums leading-none select-none text-[clamp(4rem,14vw,9.5rem)]"
                            >
                                000
                            </span>
                            <span className="font-mono text-sm sm:text-xl font-bold text-[#e07a52] ml-1 sm:ml-2">
                                %
                            </span>
                        </div>
                    </div>

                    {/* Progress Bar Tipis Copper-Brass */}
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 overflow-hidden">
                        <div
                            ref={progressBarRef}
                            className="h-full w-full bg-gradient-to-r from-[#e07a52] via-[#d4af72] to-[#e07a52] origin-left transition-transform duration-75 ease-linear"
                            style={{ transform: "scaleX(0)" }}
                        />
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
