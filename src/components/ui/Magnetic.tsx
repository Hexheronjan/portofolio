"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export function Magnetic({ children, strength = 0.5 }: { children: React.ReactNode, strength?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const rect = ref.current?.getBoundingClientRect();

        if (rect) {
            const { width, height, left, top } = rect;
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            setPosition({ x: x * strength, y: y * strength });
        }
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
}
