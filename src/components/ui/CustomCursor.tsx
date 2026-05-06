"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
    const [isMobile, setIsMobile] = useState(true);
    const [isClicking, setIsClicking] = useState(false);
    
    // Posisi kursor asli
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    // Physics untuk efek smooth mengikuti (lagging effect)
    const springConfig = { damping: 25, stiffness: 300, mass: 0.2 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Deteksi apakah perangkat menggunakan layar sentuh
        setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
        
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };
        
        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);
        
        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        
        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [cursorX, cursorY]);

    // Jangan tampilkan kursor custom di perangkat HP agar tidak berat
    if (isMobile) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-lime-400 pointer-events-none z-[100] mix-blend-difference hidden md:flex items-center justify-center backdrop-blur-[1px]"
            style={{ x: cursorXSpring, y: cursorYSpring }}
            animate={{ 
                scale: isClicking ? 0.7 : 1,
                borderColor: isClicking ? "#ffffff" : "#BEF264",
                borderWidth: isClicking ? "4px" : "2px"
            }}
            transition={{ duration: 0.15 }}
        >
            <motion.div 
                className="w-1.5 h-1.5 bg-lime-400 rounded-full"
                animate={{ scale: isClicking ? 0 : 1 }}
            />
        </motion.div>
    );
}
