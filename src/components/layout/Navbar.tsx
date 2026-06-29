"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/Magnetic";

const navItems = [
    { name: "Beranda",  href: "/" },
    { name: "Tentang",  href: "/about" },
    { name: "Keahlian", href: "/skills" },
    { name: "Proyek",   href: "/projects" },
    { name: "Kontak",   href: "/contact" },
];

/* ── 3D Flip + underline nav link ─────────────────────────────── */
const NavLink3D = ({ name, href, isActive }: { name: string; href: string; isActive: boolean }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 400, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 400, damping: 30 });

    const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width  - 0.5);
        mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
    };
    const handleLeave = () => { mouseX.set(0); mouseY.set(0); };

    return (
        <div style={{ perspective: "600px" }}>
            <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
                <Link
                    href={href}
                    onMouseMove={handleMove}
                    onMouseLeave={handleLeave}
                    className="group relative overflow-hidden flex flex-col items-start justify-start text-sm font-medium h-[24px]"
                >
                    <div className="flex flex-col transition-transform duration-500 ease-[0.87,0,0.13,1] group-hover:-translate-y-1/2">
                        <span className={cn(
                            "flex items-center h-[24px]",
                            isActive ? "text-primary" : "text-muted-foreground"
                        )}>
                            {name}
                        </span>
                        <span className="flex items-center h-[24px] text-foreground font-bold">
                            {name}
                        </span>
                    </div>
                    <span className={cn(
                        "absolute bottom-0 left-0 h-px bg-primary transition-all duration-500 ease-[0.87,0,0.13,1] group-hover:w-full",
                        isActive ? "w-full" : "w-0"
                    )} />
                </Link>
            </motion.div>
        </div>
    );
};

export function Navbar() {
    const [isOpen,      setIsOpen]      = React.useState(false);
    const [isScrolled,  setIsScrolled]  = React.useState(false);
    const [logoError,   setLogoError]   = React.useState(false);
    const pathname = usePathname();

    React.useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close mobile menu when route changes
    React.useEffect(() => { setIsOpen(false); }, [pathname]);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                isScrolled
                    ? "py-3"
                    : "bg-transparent border-b border-transparent py-5"
            )}
        >
            {/* 3D glassmorphism bar — only when scrolled */}
            {isScrolled && (
                <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 z-[-1]"
                    style={{
                        background: "rgba(var(--navbar-rgb, 255 255 255) / 0.65)",
                        backdropFilter: "blur(24px) saturate(1.8)",
                        WebkitBackdropFilter: "blur(24px) saturate(1.8)",
                        borderBottom: "1px solid rgba(255,255,255,0.12)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.25)",
                    }}
                />
            )}

            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo — 3D hover tilt */}
                <Magnetic strength={0.25}>
                    <Link href="/" className="flex items-center gap-2 group" style={{ perspective: "600px" }}>
                        <motion.div
                            whileHover={{ rotateY: 12, rotateX: -6, scale: 1.08 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {!logoError ? (
                                <Image
                                    src="/set.png"
                                    alt="Fauzan"
                                    width={40}
                                    height={40}
                                    className="h-10 w-10 object-contain"
                                    unoptimized
                                    onError={() => setLogoError(true)}
                                />
                            ) : (
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="font-display font-bold text-sm text-primary">F</span>
                                </div>
                            )}
                        </motion.div>
                        <motion.span
                            whileHover={{ letterSpacing: "0.08em" }}
                            transition={{ duration: 0.3 }}
                            className="font-display font-bold text-xl tracking-tight hidden sm:inline"
                        >
                            Fauzan<span className="text-primary">.</span>
                        </motion.span>
                    </Link>
                </Magnetic>

                {/* Desktop Nav — 3D pill container */}
                <nav className="hidden md:flex items-center gap-1 relative">
                    {/* Frosted pill background */}
                    <div
                        className="absolute inset-0 rounded-full -z-10"
                        style={{
                            background: "rgba(128,128,128,0.06)",
                            border: "1px solid rgba(128,128,128,0.12)",
                            backdropFilter: "blur(8px)",
                        }}
                    />
                    <div className="flex items-center gap-6 px-6 py-2">
                        {navItems.map((item) => (
                            <NavLink3D
                                key={item.href}
                                href={item.href}
                                name={item.name}
                                isActive={pathname === item.href}
                            />
                        ))}
                    </div>
                    <div className="pr-2">
                        <Magnetic strength={0.5}>
                            <ThemeToggle />
                        </Magnetic>
                    </div>
                </nav>

                {/* Mobile toggle */}
                <div className="flex md:hidden items-center gap-3">
                    <ThemeToggle />
                    <motion.button
                        whileTap={{ scale: 0.9, rotateZ: 90 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-foreground rounded-lg border border-border/40 bg-background/60 backdrop-blur-sm"
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            {isOpen
                                ? <motion.div key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={20} /></motion.div>
                                : <motion.div key="menu" initial={{ rotate: 90,  opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={20} /></motion.div>
                            }
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>

            {/* Mobile full-screen menu — 3D slide in */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, rotateX: -8, y: -20 }}
                        animate={{ opacity: 1, rotateX: 0, y: 0 }}
                        exit={{ opacity: 0, rotateX: -8, y: -20 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
                        className="md:hidden fixed inset-0 top-[60px] z-40 overflow-hidden"
                        onClick={() => setIsOpen(false)}
                    >
                        {/* Blurred glass panel */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: "rgba(var(--background-rgb, 255 255 255) / 0.92)",
                                backdropFilter: "blur(32px) saturate(2)",
                                WebkitBackdropFilter: "blur(32px) saturate(2)",
                            }}
                        />

                        <div className="relative z-10 px-6 py-10 flex flex-col gap-3 h-full justify-center">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: -32, rotateY: -15 }}
                                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                                    transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    style={{ perspective: "800px" }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "block text-4xl font-display font-bold py-3 px-4 rounded-xl transition-all duration-200",
                                            "hover:bg-primary/8 hover:pl-8",
                                            pathname === item.href
                                                ? "text-primary"
                                                : "text-foreground/70 hover:text-foreground"
                                        )}
                                    >
                                        <span className="inline-flex items-center gap-3">
                                            <span className="text-sm font-mono text-muted-foreground/50 tabular-nums">
                                                0{i + 1}
                                            </span>
                                            {item.name}
                                        </span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
