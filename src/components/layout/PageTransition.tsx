"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * PageTransition: Transisi antar halaman fade + geser tipis sangat cepat (maks 220ms).
 * Tidak memblokir navigasi atau interaktivitas.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.22,
                ease: "easeOut",
            }}
            className="flex-grow flex flex-col"
        >
            {children}
        </motion.div>
    );
}
