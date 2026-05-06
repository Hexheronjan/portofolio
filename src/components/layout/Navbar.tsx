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

const FlipperLink = ({ name, href, isActive }: { name: string; href: string; isActive: boolean }) => {
    return (
        <Link
            href={href}
            className="group relative overflow-hidden flex flex-col items-start justify-start text-sm font-medium h-[24px]"
        >
            <div className="flex flex-col transition-transform duration-500 ease-[0.87,0,0.13,1] group-hover:-translate-y-1/2">
                <span className={cn(
                    "flex items-center h-[24px]",
                    isActive ? "text-primary" : "text-muted-foreground"
                )}>
                    {name}
                </span>
                <span className="flex items-center h-[24px] text-foreground font-semibold">
                    {name}
                </span>
            </div>
            <span
                className={cn(
                    "absolute bottom-0 left-0 h-px bg-primary transition-all duration-500 ease-[0.87,0,0.13,1] group-hover:w-full",
                    isActive ? "w-full" : "w-0"
                )}
            />
        </Link>
    );
};

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
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                isScrolled
                    ? "premium-glass py-4"
                    : "bg-transparent border-b border-transparent py-6"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <Magnetic strength={0.2}>
                    <Link href="/" className="flex items-center gap-2 group">
                        {!logoError ? (
                            <Image
                                src="/set.png"
                                alt="Fauzan Digital Solutions"
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
                            Fauzan<span className="text-primary">.</span>
                        </span>
                    </Link>
                </Magnetic>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <FlipperLink
                            key={item.href}
                            href={item.href}
                            name={item.name}
                            isActive={pathname === item.href}
                        />
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
