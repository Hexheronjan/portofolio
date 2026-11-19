"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Home, UserRound, Layers, Briefcase, Headset, type LucideIcon } from "lucide-react";
import { navItems } from "@/lib/site";
import { cn } from "@/lib/utils";

const iconMap: Record<(typeof navItems)[number]["href"], LucideIcon> = {
    "/": Home,
    "/about": UserRound,
    "/skills": Layers,
    "/projects": Briefcase,
    "/contact": Headset,
};

export function MobileBottomNav() {
    const pathname = usePathname();
    const prefersReducedMotion = useReducedMotion();

    return (
        <div
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-none px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
        >
            <nav
                aria-label="Navigasi Mobile"
                className="pointer-events-auto mx-auto flex max-w-md items-center justify-between rounded-full border border-[var(--dock-border)] bg-[var(--dock-bg)]/95 px-2.5 py-2 backdrop-blur-xl shadow-[0_18px_40px_-10px_rgba(0,0,0,0.48)]"
            >
                {navItems.map((item) => {
                    const Icon = iconMap[item.href];
                    const isActive =
                        item.href === "/"
                            ? pathname === "/"
                            : pathname === item.href || pathname.startsWith(`${item.href}/`);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-label={item.name}
                            aria-current={isActive ? "page" : undefined}
                            className={cn(
                                "relative flex items-center justify-center rounded-full outline-none transition-transform duration-150 active:scale-95 focus-visible:ring-2 focus-visible:ring-[var(--dock-active)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--dock-bg)]",
                                isActive ? "px-4 py-2.5" : "h-11 w-11"
                            )}
                        >
                            {isActive && (
                                <motion.span
                                    layoutId="mobile-bottom-active-pill"
                                    aria-hidden="true"
                                    className="absolute inset-0 rounded-full bg-[var(--dock-active)]"
                                    style={{
                                        boxShadow: "0 0 22px -3px var(--dock-glow)",
                                    }}
                                    transition={
                                        prefersReducedMotion
                                            ? { duration: 0.01 }
                                            : { type: "spring", stiffness: 420, damping: 34 }
                                    }
                                />
                            )}

                            <span
                                className={cn(
                                    "relative z-10 flex items-center justify-center gap-2 transition-colors duration-200",
                                    isActive
                                        ? "text-[var(--dock-active-fg)]"
                                        : "text-[#f4efe8]/75 hover:text-[#f4efe8]"
                                )}
                            >
                                <Icon
                                    className={cn(
                                        "shrink-0",
                                        isActive ? "h-[18px] w-[18px]" : "h-[20px] w-[20px]"
                                    )}
                                    strokeWidth={isActive ? 2.2 : 1.75}
                                    aria-hidden="true"
                                />
                                {isActive && (
                                    <span className="text-[13px] font-semibold tracking-tight whitespace-nowrap">
                                        {item.name}
                                    </span>
                                )}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
