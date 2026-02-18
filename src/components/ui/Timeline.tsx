"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TimelineItem {
    year: string;
    title: string;
    organization?: string;
    description: string;
}

export function Timeline({ items }: { items: TimelineItem[] }) {
    return (
        <div className="relative ml-3 space-y-8 pb-4">
            {/* Animated vertical line */}
            <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ originY: 0 }}
                className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent"
            />

            {items.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                    className="ml-6 relative group"
                >
                    {/* Animated dot */}
                    <span className="absolute -left-[37px] flex items-center justify-center w-6 h-6">
                        {/* Pulse ring */}
                        <span className="absolute w-6 h-6 rounded-full bg-primary/10 group-hover:scale-150 transition-transform duration-500" />
                        <span className="relative flex items-center justify-center w-6 h-6 bg-background rounded-full ring-4 ring-background border border-border group-hover:border-primary transition-colors duration-300">
                            <motion.div
                                className="w-2 h-2 rounded-full bg-muted-foreground/40 group-hover:bg-primary transition-colors duration-300"
                                whileHover={{ scale: 1.4 }}
                            />
                        </span>
                    </span>

                    {/* Year badge */}
                    <motion.time
                        className="inline-block mb-2 text-xs font-mono px-2.5 py-0.5 rounded-full bg-secondary border border-border/50 text-muted-foreground group-hover:border-primary/30 group-hover:text-primary transition-all duration-300"
                    >
                        {item.year}
                    </motion.time>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-foreground mb-0.5 group-hover:text-primary transition-colors duration-300">
                        {item.title}
                    </h3>

                    {/* Organization */}
                    {item.organization && (
                        <span className="block mb-2 text-sm font-medium text-primary/80">
                            {item.organization}
                        </span>
                    )}

                    {/* Description */}
                    <p className={cn(
                        "text-sm text-muted-foreground leading-relaxed max-w-2xl",
                        "border-l-2 border-transparent group-hover:border-primary/30 pl-0 group-hover:pl-3 transition-all duration-300"
                    )}>
                        {item.description}
                    </p>
                </motion.div>
            ))}
        </div>
    );
}
