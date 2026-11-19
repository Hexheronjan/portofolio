"use client";

import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type RevealDirection = "up" | "down" | "left" | "right" | "center" | "fade";

interface ScrollRevealProps {
    children: ReactNode;
    direction?: RevealDirection;
    delay?: number;
    duration?: number;
    distance?: number;
    className?: string;
    viewportMargin?: string;
    once?: boolean;
}

function getHiddenTransform(direction: RevealDirection, distance: number): string {
    switch (direction) {
        case "left":
            return `translate3d(-${distance}px, 0, 0)`;
        case "right":
            return `translate3d(${distance}px, 0, 0)`;
        case "down":
            return `translate3d(0, -${distance}px, 0)`;
        case "center":
            return `translate3d(0, ${Math.round(distance * 0.45)}px, 0) scale(0.94)`;
        case "fade":
            return "translate3d(0, 0, 0)";
        case "up":
        default:
            return `translate3d(0, ${distance}px, 0)`;
    }
}

/**
 * ScrollReveal presisi menggunakan inline `transform: translate3d(...)` + `opacity`
 * (kompatibel 100% dengan Tailwind CSS v4 dan berjalan di GPU compositor).
 * - Elemen yang sudah di layar awal langsung terlihat (tanpa blank/stuck).
 * - Elemen di bawah layar menunggu sampai benar-benar masuk ke 84% area pandang
 *   (margin bawah -16%) lalu meluncur halus sesuai arah (`left`, `up`, `right`, `center`).
 */
export function ScrollReveal({
    children,
    direction = "up",
    delay = 0,
    duration = 0.9,
    distance,
    className = "",
    once = true,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [phase, setPhase] = useState<"idle" | "hidden" | "visible">("idle");
    const [activeDistance, setActiveDistance] = useState<number>(distance ?? 48);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) {
            setPhase("visible");
            return;
        }

        const isMobile = window.innerWidth < 768;
        const computedDist = distance ?? (isMobile ? 34 : 56);
        setActiveDistance(computedDist);

        const isAtBottom = () =>
            window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24;

        const rect = el.getBoundingClientRect();
        // Jika elemen sudah berada jelas di dalam layar awal saat halaman pertama dibuka
        if (rect.top < window.innerHeight * 0.82 && rect.bottom > 0) {
            setPhase("visible");
            return;
        }

        // Elemen berada di bawah area pandang: tahan di posisi awal sampai pengguna scroll ke sini
        setPhase("hidden");

        let revealed = false;
        const triggerReveal = () => {
            if (revealed) return;
            revealed = true;
            // Pastikan browser sempat mem-paint state `hidden` sebelum mentransisikan ke `visible`
            requestAnimationFrame(() => {
                setPhase("visible");
            });
        };

        const observer =
            typeof IntersectionObserver !== "undefined"
                ? new IntersectionObserver(
                      (entries) => {
                          for (const entry of entries) {
                              if (entry.isIntersecting) {
                                  triggerReveal();
                                  if (once) observer?.disconnect();
                              }
                          }
                      },
                      { threshold: 0.05, rootMargin: "0px 0px -16% 0px" }
                  )
                : null;

        observer?.observe(el);

        const onScroll = () => {
            if (revealed) return;
            const r = el.getBoundingClientRect();
            if (r.top < window.innerHeight * 0.84 || isAtBottom()) {
                triggerReveal();
                observer?.disconnect();
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            observer?.disconnect();
            window.removeEventListener("scroll", onScroll);
        };
    }, [once, distance]);

    const isHidden = phase === "hidden";
    const isAnimatingIn = phase === "visible";

    return (
        <div
            ref={ref}
            style={{
                opacity: isHidden ? 0 : 1,
                transform: isHidden
                    ? getHiddenTransform(direction, activeDistance)
                    : "translate3d(0, 0, 0) scale(1)",
                transitionProperty: "opacity, transform",
                transitionDuration: isAnimatingIn ? `${Math.round(duration * 1000)}ms` : "0ms",
                transitionDelay: isAnimatingIn ? `${Math.round(Math.min(delay, 0.45) * 1000)}ms` : "0ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: isHidden ? "opacity, transform" : "auto",
            }}
            className={className}
        >
            {children}
        </div>
    );
}

// Context agar StaggerItem meluncur berurutan dengan arah masing-masing (kiri, tengah-up, kanan)
const StaggerContext = createContext<{
    phase: "idle" | "hidden" | "visible";
    staggerDelay: number;
    distance: number;
}>({
    phase: "idle",
    staggerDelay: 0.11,
    distance: 52,
});

export function StaggerContainer({
    children,
    className = "",
    staggerDelay = 0.11,
}: {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
    viewportMargin?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [phase, setPhase] = useState<"idle" | "hidden" | "visible">("idle");
    const [distance, setDistance] = useState(52);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) {
            setPhase("visible");
            return;
        }

        setDistance(window.innerWidth < 768 ? 34 : 56);

        const isAtBottom = () =>
            window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24;

        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.82 && rect.bottom > 0) {
            setPhase("visible");
            return;
        }

        setPhase("hidden");

        let done = false;
        const trigger = () => {
            if (done) return;
            done = true;
            requestAnimationFrame(() => {
                setPhase("visible");
            });
        };

        const observer =
            typeof IntersectionObserver !== "undefined"
                ? new IntersectionObserver(
                      (entries) => {
                          for (const entry of entries) {
                              if (entry.isIntersecting) {
                                  trigger();
                                  observer?.disconnect();
                              }
                          }
                      },
                      { threshold: 0.04, rootMargin: "0px 0px -16% 0px" }
                  )
                : null;

        observer?.observe(el);

        const onScroll = () => {
            if (done) return;
            const r = el.getBoundingClientRect();
            if (r.top < window.innerHeight * 0.84 || isAtBottom()) {
                trigger();
                observer?.disconnect();
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            observer?.disconnect();
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    const indexedChildren = React.Children.map(children, (child, index) => {
        if (React.isValidElement<{ _staggerIndex?: number }>(child)) {
            return React.cloneElement(child, { _staggerIndex: index });
        }
        return child;
    });

    return (
        <StaggerContext.Provider value={{ phase, staggerDelay, distance }}>
            <div ref={ref} className={className}>
                {indexedChildren}
            </div>
        </StaggerContext.Provider>
    );
}

export function StaggerItem({
    children,
    direction = "up",
    className = "",
    _staggerIndex = 0,
}: {
    children: ReactNode;
    direction?: RevealDirection;
    className?: string;
    _staggerIndex?: number;
}) {
    const { phase, staggerDelay, distance } = useContext(StaggerContext);
    const isHidden = phase === "hidden";
    const isAnimatingIn = phase === "visible";

    return (
        <div
            style={{
                opacity: isHidden ? 0 : 1,
                transform: isHidden
                    ? getHiddenTransform(direction, distance)
                    : "translate3d(0, 0, 0) scale(1)",
                transitionProperty: "opacity, transform",
                transitionDuration: isAnimatingIn ? "850ms" : "0ms",
                transitionDelay: isAnimatingIn
                    ? `${Math.round(Math.min(_staggerIndex * staggerDelay, 0.55) * 1000)}ms`
                    : "0ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: isHidden ? "opacity, transform" : "auto",
            }}
            className={cn("h-full", className)}
        >
            {children}
        </div>
    );
}
