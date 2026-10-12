"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { site, whatsappUrl } from "@/lib/site";

export function WhatsAppFloat() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Tampilkan tombol WhatsApp setelah 1.5 detik
        const timer = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Hubungi ${site.name} via WhatsApp`}
                    initial={{ opacity: 0, scale: 0.6, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    /* Posisi dipisahkan: bottom-20 agar tidak menimpa ScrollToTop (bottom-6) */
                    className="fixed bottom-20 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lift hover:bg-emerald-500 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 group"
                    title="Chat via WhatsApp"
                >
                    <MessageSquare className="h-5 w-5" />
                    
                    {/* Tooltip Nomor */}
                    <span className="absolute right-14 bg-background/95 text-foreground border border-border text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-soft opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        WhatsApp: {site.phoneDisplay}
                    </span>
                </motion.a>
            )}
        </AnimatePresence>
    );
}
