"use client";

import { useEffect } from "react";

/**
 * Komponen ini tidak merender apapun ke layar.
 * Tugasnya hanya satu: memaksa audio "bg-music" untuk mulai
 * diputar dalam kondisi MUTED sesegera mungkin saat halaman dibuka.
 * Browser mengizinkan muted autoplay, jadi ini tidak akan diblokir.
 * Preloader.tsx kemudian akan unmute-nya saat "Welcome" muncul.
 */
export function AudioInit() {
    useEffect(() => {
        const tryPlay = () => {
            const audio = document.getElementById("bg-music") as HTMLAudioElement;
            if (!audio) return;
            audio.muted = true;
            audio.volume = 1;
            if (audio.paused) {
                audio.play().catch(() => {
                    // Jika masih gagal (sangat jarang), coba lagi di interaksi pertama
                    const retry = () => {
                        audio.play().catch(() => {});
                        window.removeEventListener("pointerdown", retry);
                        window.removeEventListener("touchstart", retry);
                    };
                    window.addEventListener("pointerdown", retry, { once: true });
                    window.addEventListener("touchstart", retry, { once: true });
                });
            }
        };

        // Coba langsung
        tryPlay();

        // Juga coba setelah 300ms (kadang elemen audio belum siap saat mount pertama)
        const t = setTimeout(tryPlay, 300);
        return () => clearTimeout(t);
    }, []);

    return null;
}
