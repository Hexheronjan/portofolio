"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface MusicToggleProps {
    /** Mode inline dipakai di dalam header mobile agar tidak menutupi teks halaman. */
    variant?: "floating" | "inline";
    onDarkSurface?: boolean;
    className?: string;
}

export function MusicToggle({
    variant = "floating",
    onDarkSurface = false,
    className,
}: MusicToggleProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [introDone, setIntroDone] = useState(false);

    useEffect(() => {
        const isIntroSkipped =
            typeof window !== "undefined" &&
            (sessionStorage.getItem("portfolio_intro_shown") === "true" ||
                document.documentElement.getAttribute("data-intro") === "skip" ||
                window.location.pathname !== "/");

        if (isIntroSkipped) {
            setIntroDone(true);
        } else {
            const handleIntroEnd = () => setIntroDone(true);
            window.addEventListener("portfolio_intro_finished", handleIntroEnd);
            const timer = setTimeout(() => setIntroDone(true), 4000);
            return () => {
                window.removeEventListener("portfolio_intro_finished", handleIntroEnd);
                clearTimeout(timer);
            };
        }
    }, []);

    useEffect(() => {
        const savedPref = localStorage.getItem("portfolio_music_pref");
        const shouldPlay = savedPref === "true";
        setIsPlaying(shouldPlay);
        setHasInteracted(true);

        const audio = document.getElementById("bg-music") as HTMLAudioElement | null;
        if (!audio) return;

        audio.volume = 0.35;
        if (shouldPlay) {
            audio.play().catch(() => setIsPlaying(false));
        } else {
            audio.pause();
        }

        const syncState = () => setIsPlaying(!audio.paused);
        audio.addEventListener("play", syncState);
        audio.addEventListener("pause", syncState);
        return () => {
            audio.removeEventListener("play", syncState);
            audio.removeEventListener("pause", syncState);
        };
    }, []);

    const toggle = () => {
        const audio = document.getElementById("bg-music") as HTMLAudioElement | null;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
            localStorage.setItem("portfolio_music_pref", "false");
        } else {
            audio
                .play()
                .then(() => {
                    setIsPlaying(true);
                    localStorage.setItem("portfolio_music_pref", "true");
                })
                .catch((err) => {
                    console.warn("Audio play prevented:", err);
                });
        }
    };

    if (variant === "inline") {
        return (
            <button
                type="button"
                onClick={toggle}
                aria-label={isPlaying ? "Matikan musik latar" : "Putar musik latar"}
                title={isPlaying ? "Matikan audio" : "Putar audio"}
                className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    onDarkSurface
                        ? "border-white/20 bg-white/10 hover:bg-white/20 text-[#f4efe8]"
                        : "border-border/80 bg-background/80 hover:bg-muted text-foreground",
                    className
                )}
            >
                {isPlaying ? (
                    <Volume2 className={cn("h-4 w-4 animate-pulse", onDarkSurface ? "text-[#e07a52]" : "text-primary")} />
                ) : (
                    <VolumeX className={cn("h-4 w-4", onDarkSurface ? "text-[#f4efe8]/80" : "text-muted-foreground")} />
                )}
            </button>
        );
    }

    if (!hasInteracted || !introDone) return null;

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={isPlaying ? "Matikan musik latar" : "Putar musik latar"}
            className={cn(
                "hidden md:flex fixed bottom-6 left-6 z-40 h-10 w-10 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-soft backdrop-blur-md transition-all hover:border-primary/50 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-primary",
                className
            )}
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
