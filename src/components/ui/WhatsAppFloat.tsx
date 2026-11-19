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
                    /* Posisi dipisahkan: di mobile berada di atas MobileBottomNav + ScrollToTop; di desktop bottom-20 */
                    className="fixed bottom-[9.75rem] right-4 md:bottom-20 md:right-6 z-40 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full border border-border/80 bg-ink text-ink-foreground shadow-lift hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary group"
                    title="Chat via WhatsApp"
                >
                    <MessageSquare className="h-5 w-5" />
                    <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" aria-hidden="true" />
                    
                    {/* Tooltip Nomor */}
                    <span className="absolute right-14 bg-background/95 text-foreground border border-border text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-soft opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        WhatsApp: {site.phoneDisplay}
                    </span>
                </motion.a>
            )}
        </AnimatePresence>
    );
}
