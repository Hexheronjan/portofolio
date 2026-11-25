"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileSidebar } from "@/components/layout/MobileSidebar";
import { site, navItems } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [logoError, setLogoError] = React.useState(false);
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const pathname = usePathname();

    // Halaman selain Beranda dibuka dengan banner gelap obsidian di bagian atas
    const overDarkHero = pathname !== "/" && !isScrolled;

    React.useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 24);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [pathname]);

    const handleCloseSidebar = React.useCallback(() => {
        setSidebarOpen(false);
    }, []);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled
                        ? "bg-background/88 backdrop-blur-md border-b border-border shadow-soft py-3"
                        : "bg-transparent py-4 sm:py-5"
                )}
            >
                <div className="container-page flex items-center justify-between">
                    {/* Brand Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                        aria-label={`Beranda ${site.name}`}
                    >
                        {!logoError ? (
                            <div
                                className={cn(
                                    "relative h-9 w-9 rounded-full overflow-hidden border p-0.5 transition-all group-hover:scale-105",
                                    overDarkHero
                                        ? "border-white/20 bg-white/10"
                                        : "border-border/70 bg-card/80 shadow-soft"
                                )}
                            >
                                <Image
                                    src="/set.png"
                                    alt=""
                                    aria-hidden="true"
                                    width={36}
                                    height={36}
                                    className="h-full w-full object-contain"
                                    priority
                                    onError={() => setLogoError(true)}
                                />
                            </div>
                        ) : (
                            <div className="h-9 w-9 rounded-full bg-primary/15 text-primary font-bold flex items-center justify-center text-sm">
                                F
                            </div>
                        )}
                        <div className="flex flex-col">
                            <span
                                className={cn(
                                    "font-display font-semibold text-base sm:text-lg leading-none tracking-tight transition-colors",
                                    overDarkHero ? "text-[#f4efe8]" : "text-foreground"
                                )}
                            >
                                Fauzan
                                <span className={overDarkHero ? "text-[#e07a52]" : "text-primary"}>
                                    .
                                </span>
                            </span>
                            <span
                                className={cn(
                                    "hidden sm:inline font-mono text-[9px] uppercase tracking-[0.16em] mt-0.5 transition-colors",
                                    overDarkHero ? "text-[#f4efe8]/55" : "text-muted-foreground"
                                )}
                            >
                                Full Stack
                            </span>
                        </div>
                    </Link>

                    {/* Navigasi Desktop dengan animated active pill */}
                    <nav
                        aria-label="Navigasi Utama"
                        className={cn(
                            "hidden md:flex items-center gap-1 rounded-full border backdrop-blur-md px-2 py-1.5 shadow-soft transition-colors",
                            overDarkHero
                                ? "border-white/15 bg-white/[0.06]"
                                : "border-border/80 bg-card/80"
                        )}
                    >
                        {navItems.map((item) => {
                            const isActive =
                                item.href === "/"
                                    ? pathname === "/"
                                    : pathname === item.href ||
                                    pathname.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    aria-current={isActive ? "page" : undefined}
                                    className={cn(
                                        "relative px-4 py-1.5 text-xs font-medium rounded-full transition-colors duration-200",
                                        isActive
                                            ? overDarkHero
                                                ? "text-[#140d0a] font-semibold"
                                                : "text-ink-foreground font-semibold"
                                            : overDarkHero
                                                ? "text-[#f4efe8]/75 hover:text-[#f4efe8]"
                                                : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="desktop-nav-active-pill"
                                            aria-hidden="true"
                                            transition={{
                                                type: "spring",
                                                stiffness: 420,
                                                damping: 34,
                                            }}
                                            className={cn(
                                                "absolute inset-0 rounded-full shadow-sm",
                                                overDarkHero ? "bg-[#e07a52]" : "bg-ink"
                                            )}
                                        />
                                    )}
                                    <span className="relative z-10">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Kontrol Desktop & CTA */}
                    <div className="hidden md:flex items-center gap-2.5">
                        <ThemeToggle onDarkSurface={overDarkHero} />
                        <Link
                            href={site.cvPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200 shadow-soft",
                                overDarkHero
                                    ? "border-white/20 bg-white/10 text-[#f4efe8] hover:bg-[#e07a52] hover:border-[#e07a52] hover:text-[#140d0a]"
                                    : "border-border bg-card text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground"
                            )}
                        >
                            <span>Unduh CV</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    {/* Kontrol Mobile: Tema & Tombol Sidebar Drawer */}
                    <div className="flex md:hidden items-center gap-1.5">
                        <ThemeToggle onDarkSurface={overDarkHero} />
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            aria-label="Buka sidebar navigasi"
                            aria-expanded={sidebarOpen}
                            className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-semibold transition-all active:scale-95 shadow-soft",
                                overDarkHero
                                    ? "border-white/20 bg-white/10 text-[#f4efe8] hover:bg-[#e07a52] hover:text-[#140d0a] hover:border-[#e07a52]"
                                    : "border-border bg-ink text-ink-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                            )}
                        >
                            <Menu className="h-4 w-4" />
                            <span>Menu</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar Drawer */}
            <MobileSidebar open={sidebarOpen} onClose={handleCloseSidebar} />
        </>
    );
}
