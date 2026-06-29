"use client";

import { useEffect } from "react";

export function AudioInit() {
    useEffect(() => {
        const initAudio = () => {
            const audio = document.getElementById("bg-music") as HTMLAudioElement;
            if (!audio) return false;

            audio.muted = true;
            audio.volume = 1;

            // Langsung play jika belum diputar
            if (audio.paused) {
                audio.play().catch((e) => {
                    console.warn("Muted autoplay failed:", e);
                });
            }
            return true;
        };

        // Coba langsung saat mount
        if (!initAudio()) {
            // Jika gagal, coba lagi setelah DOM siap
            const timeouts = [
                setTimeout(initAudio, 100),
                setTimeout(initAudio, 300),
                setTimeout(initAudio, 500),
            ];

            // Fallback: coba jika ada interaksi user
            const handleInteraction = () => {
                initAudio();
                window.removeEventListener("click", handleInteraction);
                window.removeEventListener("touchstart", handleInteraction);
            };
            window.addEventListener("click", handleInteraction, { once: true });
            window.addEventListener("touchstart", handleInteraction, { once: true });

            return () => {
                timeouts.forEach(t => clearTimeout(t));
                window.removeEventListener("click", handleInteraction);
                window.removeEventListener("touchstart", handleInteraction);
            };
        }
    }, []);

    return null;
}
