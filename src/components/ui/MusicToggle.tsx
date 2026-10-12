"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function MusicToggle() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        // Cek preferensi dari localStorage (default: MATI / false)
        const savedPref = localStorage.getItem("portfolio_music_pref");
        const shouldPlay = savedPref === "true";
        setIsPlaying(shouldPlay);
        setHasInteracted(true);

        const audio = document.getElementById("bg-music") as HTMLAudioElement | null;
        if (!audio) return;

        audio.volume = 0.35; // Volume lembut
        if (shouldPlay) {
            audio.play().catch(() => {
                // Browser autoplay blocker fallback
                setIsPlaying(false);
            });
        } else {
            audio.pause();
        }
    }, []);

    const toggle = () => {
        const audio = document.getElementById("bg-music") as HTMLAudioElement | null;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
            localStorage.setItem("portfolio_music_pref", "false");
        } else {
            audio.play().then(() => {
                setIsPlaying(true);
                localStorage.setItem("portfolio_music_pref", "true");
            }).catch((err) => {
                console.warn("Audio play prevented:", err);
            });
        }
    };

    if (!hasInteracted) return null;

    return (
        <button
            onClick={toggle}
            aria-label={isPlaying ? "Matikan musik latar" : "Putar musik latar"}
            className="fixed bottom-6 left-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-background/80 text-foreground shadow-soft backdrop-blur-md transition-transform hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-primary"
            title={isPlaying ? "Mute audio" : "Play audio"}
        >
            {isPlaying ? (
                <Volume2 className="h-4 w-4 text-primary animate-pulse" />
            ) : (
                <VolumeX className="h-4 w-4 text-muted-foreground" />
            )}
        </button>
    );
}
