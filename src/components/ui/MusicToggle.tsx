"use client";

import { useState, useEffect, useRef } from "react";
import { VolumeX, Music } from "lucide-react";
import { motion } from "framer-motion";

export function MusicToggle() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Cari elemen audio global yang sudah ada di layout
        const audio = document.getElementById("bg-music") as HTMLAudioElement;
        if (audio) {
            audioRef.current = audio;
            
            // Dengarkan event play/pause (misalnya jika Preloader menyalakannya)
            const handlePlay = () => setIsPlaying(true);
            const handlePause = () => setIsPlaying(false);
            
            audio.addEventListener("play", handlePlay);
            audio.addEventListener("pause", handlePause);
            
            // Cek status saat ini
            if (!audio.paused) {
                setIsPlaying(true);
            }

            return () => {
                audio.removeEventListener("play", handlePlay);
                audio.removeEventListener("pause", handlePause);
            };
        }
    }, []);

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log("Play failed", e));
            }
        }
    };

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.5, duration: 0.8, type: "spring" }}
            onClick={toggleMusic}
            className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[9000] w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/20 dark:bg-white/10 backdrop-blur-xl border border-white/20 dark:border-white/10 flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform cursor-pointer mix-blend-difference"
            aria-label="Toggle Music"
        >
            {isPlaying ? (
                // Animasi Equalizer saat musik menyala
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
            ) : (
                // Icon musik mati
                <div className="relative flex items-center justify-center">
                    <Music className="w-5 h-5 md:w-6 md:h-6 opacity-60" />
                    <div className="absolute w-[120%] h-0.5 bg-white rotate-45 opacity-80 rounded-full" />
                </div>
            )}
        </motion.button>
    );
}
