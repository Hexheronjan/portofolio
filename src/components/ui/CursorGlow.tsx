"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function CursorGlow() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [isTouch, setIsTouch] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const isDeviceTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        setIsTouch(isDeviceTouch);
        
        if (isDeviceTouch) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let animFrame: number;
        let mouseX = -100;
        let mouseY = -100;
        let ringX = -100;
        let ringY = -100;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const animate = () => {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            
            // Offset logic for centering
            dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
            ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
            
            animFrame = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        animFrame = requestAnimationFrame(animate);

        // Hover effect for links
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a') || target.closest('button')) {
                ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px) scale(1.5)`;
                ring.style.borderColor = 'rgba(190, 242, 100, 0.8)';
                ring.style.backgroundColor = 'rgba(190, 242, 100, 0.1)';
            } else {
                ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px) scale(1)`;
                ring.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                ring.style.backgroundColor = 'transparent';
            }
        };

        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            cancelAnimationFrame(animFrame);
        };
    }, [pathname]);

    if (isTouch) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[120] overflow-hidden hidden md:block">
            <div 
                ref={dotRef}
                className="absolute top-0 left-0 w-2 h-2 bg-foreground/80 rounded-full will-change-transform"
            />
            <div 
                ref={ringRef}
                className="absolute top-0 left-0 w-8 h-8 border border-foreground/30 rounded-full will-change-transform transition-colors duration-300"
            />
        </div>
    );
}
