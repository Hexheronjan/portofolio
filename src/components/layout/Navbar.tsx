"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Beranda", href: "/" },
    { name: "Tentang", href: "/about" },
    { name: "Keahlian", href: "/skills" },
    { name: "Proyek", href: "/projects" },
    { name: "Kontak", href: "/contact" },
];

import { Magnetic } from "@/components/ui/Magnetic";

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [logoError, setLogoError] = React.useState(false);
    const pathname = usePathname();

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-background/90 backdrop-blur-xl border-b border-border/80 py-4 shadow-lg shadow-primary/5"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <Magnetic strength={0.2}>
                    <Link href="/" className="flex items-center gap-2 group">
                        {!logoError ? (
                            <Image
                                src="/set.png"
                                alt="FRAVOX Digital Solutions"
                                width={40}
                                height={40}
                                className="h-10 w-10 object-contain group-hover:opacity-90 transition-opacity"
                                unoptimized
                                onError={() => setLogoError(true)}
                            />
                        ) : (
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="font-display font-bold text-sm text-primary">F</span>
                            </div>
                        )}
                        <span className="font-display font-bold text-xl tracking-tight hidden sm:inline">
                            FRAVOX<span className="text-primary">.</span>
                        </span>
                    </Link>
                </Magnetic>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary relative group",
                                pathname === item.href
                                    ? "text-primary"
                                    : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                            <span
                                className={cn(
                                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full",
                                    pathname === item.href ? "w-full" : "w-0"
                                )}
                            />
                        </Link>
                    ))}
                    <Magnetic strength={0.5}>
                        <div className="p-1">
                            <ThemeToggle />
                        </div>
                    </Magnetic>
                </nav>

                {/* Mobile Nav Toggle */}
                <div className="flex md:hidden items-center gap-4">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-foreground"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden fixed inset-0 top-[60px] bg-background border-t border-border z-40 overflow-hidden"
                    >
                        <div className="px-4 py-8 flex flex-col gap-6 items-center justify-center h-full">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "text-2xl font-display font-bold transition-colors hover:text-primary",
                                        pathname === item.href
                                            ? "text-primary"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
