"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="opacity-0">{children}</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
}
