"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
    X,
    Home,
    UserRound,
    Layers,
    Briefcase,
    Headset,
    ArrowUpRight,
    Github,
    Linkedin,
    Mail,
    MapPin,
    MessageSquare,
    FileDown,
    type LucideIcon,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MusicToggle } from "@/components/ui/MusicToggle";
import { site, navItems, mailtoUrl, whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

interface MobileSidebarProps {
    open: boolean;
    onClose: () => void;
}

const navMeta: Record<
    (typeof navItems)[number]["href"],
    { icon: LucideIcon; subtitle: string }
> = {
    "/": { icon: Home, subtitle: "Ringkasan & karya unggulan" },
    "/about": { icon: UserRound, subtitle: "Profil, visi & perjalanan" },
    "/skills": { icon: Layers, subtitle: "Stack web, mobile & backend" },
    "/projects": { icon: Briefcase, subtitle: "26+ studi kasus & proyek live" },
    "/contact": { icon: Headset, subtitle: "Diskusi proyek & kolaborasi" },
};

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
    const pathname = usePathname();
    const prefersReducedMotion = useReducedMotion();
    const prevPathRef = React.useRef(pathname);

    // Tutup sidebar otomatis ketika navigasi berpindah halaman
    React.useEffect(() => {
        if (prevPathRef.current !== pathname) {
            prevPathRef.current = pathname;
            onClose();
        }
    }, [pathname, onClose]);

    // Kunci scroll halaman & dukung tombol Escape saat sidebar terbuka
    React.useEffect(() => {
        if (!open) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <div
                    className="fixed inset-0 z-[80] md:hidden"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Menu Navigasi Mobile"
                >
                    {/* Backdrop gelap dengan blur halus */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.01 : 0.22 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
                        aria-hidden="true"
                    />

                    {/* Panel Sidebar meluncur dari kanan */}
                    <motion.aside
                        initial={prefersReducedMotion ? { opacity: 0 } : { x: "100%" }}
                        animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { x: "100%" }}
                        transition={
                            prefersReducedMotion
                                ? { duration: 0.01 }
                                : { type: "spring", stiffness: 360, damping: 36 }
                        }
                        className="absolute top-0 right-0 bottom-0 w-[86vw] max-w-[360px] bg-background border-l border-border shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Garis aksen copper-brass di tepi atas */}
                        <div
                            aria-hidden="true"
                            className="h-[3px] w-full bg-gradient-to-r from-primary via-brass to-primary/40 shrink-0"
                        />

                        {/* Header Sidebar */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-border/80 bg-card/60">
                            <Link
                                href="/"
                                onClick={onClose}
                                className="flex items-center gap-2.5"
                            >
                                <div className="relative h-9 w-9 rounded-full overflow-hidden border border-border bg-muted/60 p-0.5">
                                    <Image
                                        src="/set.png"
                                        alt=""
                                        aria-hidden="true"
                                        width={36}
                                        height={36}
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                                <div>
                                    <p className="font-display font-bold text-base leading-none text-foreground">
                                        Fauzan<span className="text-primary">.</span>
                                    </p>
                                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground mt-1">
                                        Portfolio &apos;26
                                    </p>
                                </div>
                            </Link>

                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Tutup menu sidebar"
                                className="h-9 w-9 rounded-full border border-border bg-card hover:bg-muted text-foreground flex items-center justify-center transition-colors active:scale-95"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Konten Scrollable Sidebar */}
                        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
                            {/* Kartu Status Singkat */}
                            <div className="relative rounded-2xl border border-border/80 bg-card p-3.5 shadow-soft overflow-hidden">
                                <div className="flex items-center gap-3">
                                    <div className="relative h-11 w-11 rounded-xl overflow-hidden border border-border shrink-0 bg-muted">
                                        <Image
                                            src="/portrait-hero.jpg"
                                            alt={site.name}
                                            fill
                                            sizes="44px"
                                            className="object-cover object-center"
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-display font-bold text-sm text-foreground truncate">
                                            {site.name}
                                        </p>
                                        <p className="text-[11px] text-primary font-medium truncate">
                                            {site.role}
                                        </p>
                                        <div className="flex items-center gap-1.5 mt-1 text-[10px] font-mono text-muted-foreground">
                                            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                                            </span>
                                            <MapPin className="h-2.5 w-2.5 shrink-0" />
                                            <span className="truncate">{site.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Daftar Navigasi Bernomor */}
                            <nav aria-label="Navigasi Sidebar Mobile" className="space-y-1.5">
                                <p className="px-2 pb-1 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                                    Navigasi Halaman
                                </p>
                                {navItems.map((item, idx) => {
                                    const meta = navMeta[item.href];
                                    const Icon = meta.icon;
                                    const isActive =
                                        item.href === "/"
                                            ? pathname === "/"
                                            : pathname === item.href ||
                                              pathname.startsWith(`${item.href}/`);

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={onClose}
                                            aria-current={isActive ? "page" : undefined}
                                            className={cn(
                                                "group relative flex items-center gap-3.5 px-3.5 py-3 rounded-xl border transition-all duration-200",
                                                isActive
                                                    ? "bg-primary/10 border-primary/35 text-foreground shadow-soft"
                                                    : "bg-transparent border-transparent hover:bg-card hover:border-border/80 text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            {isActive && (
                                                <span
                                                    aria-hidden="true"
                                                    className="absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-r-full bg-primary"
                                                />
                                            )}

                                            <div
                                                className={cn(
                                                    "flex h-9 w-9 items-center justify-center rounded-lg border shrink-0 transition-colors",
                                                    isActive
                                                        ? "bg-primary text-primary-foreground border-primary"
                                                        : "bg-card border-border/80 text-muted-foreground group-hover:text-primary group-hover:border-primary/40"
                                                )}
                                            >
                                                <Icon className="h-4 w-4" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono text-[10px] text-primary/80">
                                                        0{idx + 1}
                                                    </span>
                                                    <span className="font-display font-semibold text-sm text-foreground">
                                                        {item.name}
                                                    </span>
                                                </div>
                                                <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                                                    {meta.subtitle}
                                                </p>
                                            </div>

                                            <ArrowUpRight
                                                className={cn(
                                                    "h-4 w-4 shrink-0 transition-transform",
                                                    isActive
                                                        ? "text-primary"
                                                        : "text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                                )}
                                            />
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* Aksi Cepat: CV & WhatsApp */}
                            <div className="space-y-2.5">
                                <p className="px-2 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                                    Aksi Cepat
                                </p>
                                <div className="grid grid-cols-2 gap-2.5">
                                    <Link
                                        href={site.cvPath}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={onClose}
                                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-ink text-ink-foreground text-xs font-semibold shadow-soft hover:bg-primary hover:text-primary-foreground transition-colors"
                                    >
                                        <FileDown className="h-3.5 w-3.5" />
                                        <span>Unduh CV</span>
                                    </Link>
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={onClose}
                                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-border bg-card text-foreground text-xs font-semibold hover:border-primary hover:text-primary transition-colors"
                                    >
                                        <MessageSquare className="h-3.5 w-3.5 text-primary" />
                                        <span>WhatsApp</span>
                                    </a>
                                </div>
                            </div>

                            {/* Pengaturan Tampilan & Audio */}
                            <div className="flex items-center justify-between px-3.5 py-3 rounded-xl border border-border/80 bg-card/70">
                                <div>
                                    <p className="text-xs font-semibold text-foreground">
                                        Tema &amp; Musik Latar
                                    </p>
                                    <p className="text-[11px] text-muted-foreground">
                                        Sesuaikan kenyamanan tampilan
                                    </p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MusicToggle variant="inline" />
                                    <ThemeToggle />
                                </div>
                            </div>
                        </div>

                        {/* Footer Sidebar: Sosial Media */}
                        <div className="px-5 py-4 border-t border-border/80 bg-card/50 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <a
                                    href={site.socials.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub Fauzan"
                                    className="h-9 w-9 rounded-full border border-border bg-card hover:border-primary hover:text-primary text-muted-foreground flex items-center justify-center transition-colors"
                                >
                                    <Github className="h-4 w-4" />
                                </a>
                                <a
                                    href={site.socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn Fauzan"
                                    className="h-9 w-9 rounded-full border border-border bg-card hover:border-primary hover:text-primary text-muted-foreground flex items-center justify-center transition-colors"
                                >
                                    <Linkedin className="h-4 w-4" />
                                </a>
                                <a
                                    href={mailtoUrl}
                                    aria-label="Email Fauzan"
                                    className="h-9 w-9 rounded-full border border-border bg-card hover:border-primary hover:text-primary text-muted-foreground flex items-center justify-center transition-colors"
                                >
                                    <Mail className="h-4 w-4" />
                                </a>
                            </div>
                            <span className="font-mono text-[10px] text-muted-foreground">
                                Oke Web ID
                            </span>
                        </div>
                    </motion.aside>
                </div>
            )}
        </AnimatePresence>
    );
}
