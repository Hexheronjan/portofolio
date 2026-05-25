"use client";

import { useState, useEffect, useRef } from "react";
import { VolumeX, Music } from "lucide-react";
import { motion } from "framer-motion";

export function MusicToggle() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);

        const audio = document.getElementById("bg-music") as HTMLAudioElement;
        if (audio) {
            audioRef.current = audio;

            const updateState = () => {
                // Dianggap "playing" jika audio berjalan DAN tidak muted
                setIsPlaying(!audio.paused && !audio.muted);
            };

            audio.addEventListener("play", updateState);
            audio.addEventListener("pause", updateState);
            audio.addEventListener("volumechange", updateState);

            // Cek status awal
            updateState();

            return () => {
                audio.removeEventListener("play", updateState);
                audio.removeEventListener("pause", updateState);
                audio.removeEventListener("volumechange", updateState);
            };
        }
    }, []);

    const toggleMusic = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            // Matikan: pause audio
            audio.pause();
            setIsPlaying(false);
        } else {
            // Nyalakan: unmute & play
            audio.muted = false;
            audio.play()
                .then(() => setIsPlaying(true))
                .catch(e => console.log("Play failed", e));
        }
    };

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.5, duration: 0.8, type: "spring" }}
            onClick={toggleMusic}
            className={`fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[9000] w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/40 dark:bg-white/10 backdrop-blur-xl border border-white/20 dark:border-white/10 flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform cursor-pointer ${!isMobile ? 'mix-blend-difference' : ''}`}
            aria-label="Toggle Music"
        >
            {isPlaying ? (
                isMobile ? (
                    <div className="flex gap-[3px] items-end justify-center h-5">
                        <div className="w-1.5 bg-white rounded-t-sm animate-pulse" style={{ height: '12px' }} />
                        <div className="w-1.5 bg-white rounded-t-sm animate-pulse" style={{ height: '16px', animationDelay: '0.15s' }} />
                        <div className="w-1.5 bg-white rounded-t-sm animate-pulse" style={{ height: '10px', animationDelay: '0.3s' }} />
                    </div>
                ) : (
                    <div className="flex gap-[3px] items-end justify-center h-5">
                        <motion.div
                            animate={{ height: ["6px", "20px", "6px"] }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1.5 bg-white rounded-t-sm"
                        />
                        <motion.div
                            animate={{ height: ["12px", "6px", "16px", "12px"] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1.5 bg-white rounded-t-sm"
                        />
                        <motion.div
                            animate={{ height: ["20px", "10px", "20px"] }}
                            transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1.5 bg-white rounded-t-sm"
                        />
                    </div>
                )
            ) : (
                <div className="relative flex items-center justify-center">
                    <Music className="w-5 h-5 md:w-6 md:h-6 opacity-60" />
                    <div className="absolute w-[120%] h-0.5 bg-white rotate-45 opacity-80 rounded-full" />
                </div>
            )}
        </motion.button>
    );
}
