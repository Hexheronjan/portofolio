"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [
    "Halo",
    "Hello",
    "Bonjour",
    "こんにちは",
    "Ciao",
    "안녕하세요",
    "Merhaba",
];

// How long each word stays visible (ms)
const WORD_DURATION = 420;

// Easing for the word slide — feels very fluid
const EASE = [0.22, 1, 0.36, 1] as const;

export function Preloader() {
    const [mounted, setMounted] = useState(false);
    const [show, setShow] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setMounted(true);

        // Skip if already shown this session
        if (sessionStorage.getItem("preloader_done")) {
            setShow(false);
            return;
        }

        let idx = 0;

        function nextWord() {
            idx += 1;
            if (idx >= words.length) {
                // All words done — wait a beat then slide overlay away
                timerRef.current = setTimeout(() => setIsExiting(true), 300);
            } else {
                setCurrentIndex(idx);
                timerRef.current = setTimeout(nextWord, WORD_DURATION);
            }
        }

        timerRef.current = setTimeout(nextWord, WORD_DURATION);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    if (!mounted || !show) return null;

    return (
        <AnimatePresence
            onExitComplete={() => {
                sessionStorage.setItem("preloader_done", "1");
                setShow(false);
            }}
        >
            {!isExiting && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[9999] flex items-center justify-center select-none"
                    style={{ backgroundColor: "#0a0a0a" }}
                    exit={{
                        // Whole panel slides upward — the "curtain reveal" effect
                        // FIX: "-100%" is a string that goes through mixObject parsing.
                        // Use a large enough negative pixel value instead.
                        y: "-100vh",
                        transition: {
                            duration: 1.0,
                            ease: [0.76, 0, 0.24, 1],
                        },
                    }}
                >
                    {/*
                      ── WORD FLIP ROW ─────────────────────────────────────
                      Layout: [●] [word]
                      The word slides up from below on enter, up into void on exit.
                      overflow-hidden clips the motion so it feels like a slot machine.
                    */}
                    <div className="flex items-center gap-4">
                        {/* Dot */}
                        <span className="w-2.5 h-2.5 rounded-full bg-white shrink-0 opacity-90" />

                        {/* Slot container — fixed height so layout doesn't jump */}
                        <div
                            className="overflow-hidden"
                            style={{ height: "1.15em" }}
                        >
                            <AnimatePresence mode="popLayout" initial={false}>
                                <motion.p
                                    key={currentIndex}
                                    className="m-0 text-white text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-none"
                                    initial={{ y: 80, opacity: 0 }}
                                    animate={{
                                        y: 0,
                                        opacity: 1,
                                        transition: {
                                            duration: 0.45,
                                            ease: EASE,
                                        },
                                    }}
                                    exit={{
                                        y: -80,
                                        opacity: 0,
                                        transition: {
                                            duration: 0.35,
                                            ease: [0.55, 0, 1, 0.45],
                                        },
                                    }}
                                >
                                    {words[currentIndex]}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
