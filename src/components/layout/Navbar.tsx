"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { site, navItems } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [logoError, setLogoError] = React.useState(false);
    const pathname = usePathname();

    React.useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Tutup drawer ketika rute berpindah
    React.useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Kunci scroll saat drawer mobile terbuka
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-background/80 backdrop-blur-md border-b border-border shadow-soft py-3"
                    : "bg-transparent py-5"
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
                        <div className="relative h-9 w-9 rounded-full overflow-hidden border border-border/60 bg-muted/50 p-0.5">
                            <Image
                                src="/set.png"
                                alt=""
                                aria-hidden="true"
                                width={36}
                                height={36}
                                className="h-full w-full object-contain"
                                priority
                            />
                        </div>
                    ) : (
                        <div className="h-9 w-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                            F
                        </div>
                    )}
                    <span className="font-display font-semibold text-base sm:text-lg tracking-tight">
                        Fauzan<span className="text-primary">.</span>
                    </span>
                </Link>

                {/* Navigasi Desktop */}
                <nav
                    aria-label="Navigasi Utama"
                    className="hidden md:flex items-center gap-1 rounded-full border border-border/80 bg-background/60 backdrop-blur-md px-4 py-1.5 shadow-soft"
                >
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={isActive ? "page" : undefined}
                                className={cn(
                                    "px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors relative",
                                    isActive
                                        ? "text-primary-foreground bg-primary font-semibold shadow-sm"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                )}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Kontrol Desktop & CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <ThemeToggle />
                    <Link
                        href={site.cvPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border border-border hover:border-primary/50 bg-secondary/80 text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    >
                        <span>Unduh CV</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                </div>

                {/* Kontrol Mobile */}
                <div className="flex md:hidden items-center gap-2">
                    <ThemeToggle />
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Tutup menu" : "Buka menu utama"}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                        className="p-2 text-foreground rounded-lg border border-border/60 bg-background/80 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Menu Mobile Overlay */}
            {isOpen && (
                <div
                    id="mobile-menu"
                    className="md:hidden fixed inset-x-0 top-[61px] bottom-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border px-6 py-8 flex flex-col justify-between"
                >
                    <div className="flex flex-col gap-2">
                        {navItems.map((item, idx) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    aria-current={isActive ? "page" : undefined}
                                    className={cn(
                                        "flex items-center justify-between py-3.5 px-4 rounded-xl text-lg font-medium transition-colors",
                                        isActive
                                            ? "bg-primary/10 text-primary font-semibold"
                                            : "text-foreground/80 hover:bg-muted hover:text-foreground"
                                    )}
                                >
                                    <span>{item.name}</span>
                                    <span className="text-xs font-mono text-muted-foreground">0{idx + 1}</span>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="pt-6 border-t border-border flex flex-col gap-3">
                        <Link
                            href={site.cvPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-soft"
                        >
                            <span>Unduh CV (PDF)</span>
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                        <p className="text-center text-xs text-muted-foreground">
                            {site.role} • {site.location}
                        </p>
                    </div>
                </div>
            )}
        </header>
    );
}
