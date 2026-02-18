"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const glow = glowRef.current;
        if (!glow) return;

        let animFrame: number;
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const animate = () => {
            // Smooth lerp follow
            currentX += (mouseX - currentX) * 0.08;
            currentY += (mouseY - currentY) * 0.08;
            glow.style.transform = `translate(${currentX - 200}px, ${currentY - 200}px)`;
            animFrame = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", handleMouseMove);
        animFrame = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animFrame);
        };
    }, []);

    return (
        <div
            ref={glowRef}
            className="pointer-events-none fixed top-0 left-0 z-0 w-[400px] h-[400px] rounded-full opacity-[0.06] dark:opacity-[0.08]"
            style={{
                background: "radial-gradient(circle, rgba(59,130,246,1) 0%, transparent 70%)",
                willChange: "transform",
            }}
        />
    );
}
