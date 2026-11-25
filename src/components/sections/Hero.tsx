"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowUpRight,
    Sparkles,
    Terminal,
    Github,
    Linkedin,
    Mail,
    Code2,
    Globe,
    Smartphone,
    Cpu,
} from "lucide-react";
import { site, mailtoUrl } from "@/lib/site";
import { motion, AnimatePresence } from "framer-motion";

const focusModes = [
    {
        id: "web",
        label: "Web Apps",
        icon: Globe,
        chips: ["Next.js", "Laravel", "React", "TypeScript", "Tailwind"],
        detail: "Website bisnis, SaaS & aplikasi web full-stack super cepat dengan SEO dan arsitektur rapi.",
    },
    {
        id: "mobile",
        label: "Mobile",
        icon: Smartphone,
        chips: ["React Native", "Expo", "Kotlin Android", "REST Sync"],
        detail: "Aplikasi seluler responsif dan mulus untuk operasional bisnis hingga konsumen.",
    },
    {
        id: "backend",
        label: "Backend & AI",
        icon: Cpu,
        chips: ["Laravel", "Golang", "Node.js", "PostgreSQL", "MySQL"],
        detail: "REST API terstruktur, manajemen database aman, hingga integrasi AI adaptif.",
    },
] as const;

export function Hero() {
    const cardRef = useRef<HTMLDivElement>(null);
    const [activeMode, setActiveMode] = useState<(typeof focusModes)[number]["id"]>("web");
    const [tilt, setTilt] = useState({
        rotateX: 0,
        rotateY: 0,
        glareX: 50,
        glareY: 50,
        active: false,
    });
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [heroReady, setHeroReady] = useState(false);

    useEffect(() => {
        setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handleMotionChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };
        mediaQuery.addEventListener("change", handleMotionChange);

        // Sinkronkan animasi masuk Hero agar mulai tepat setelah Preloader selesai
        const isIntroSkipped =
            sessionStorage.getItem("portfolio_intro_shown") === "true" ||
            document.documentElement.getAttribute("data-intro") === "skip" ||
            mediaQuery.matches;

        if (isIntroSkipped) {
            setHeroReady(true);
        } else {
            const onIntroDone = () => setHeroReady(true);
            window.addEventListener("portfolio_intro_finished", onIntroDone);
            const fallbackTimer = setTimeout(() => setHeroReady(true), 4200);
            return () => {
                mediaQuery.removeEventListener("change", handleMotionChange);
                window.removeEventListener("portfolio_intro_finished", onIntroDone);
                clearTimeout(fallbackTimer);
            };
        }

        return () => mediaQuery.removeEventListener("change", handleMotionChange);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouchDevice || prefersReducedMotion || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        setTilt({
            rotateX: (0.5 - y) * 8,
            rotateY: (x - 0.5) * 8,
            glareX: x * 100,
            glareY: y * 100,
            active: true,
        });
    };

    const handleMouseLeave = () => {
        setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, active: false });
    };

    const nameParts = site.name.split(" ");
    const firstNameLine = nameParts.slice(0, 2).join(" ");
    const lastNameAccent = nameParts.slice(2).join(" ");
    const currentFocus = focusModes.find((m) => m.id === activeMode) ?? focusModes[0];

    const leftContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.09,
                delayChildren: prefersReducedMotion ? 0 : 0.08,
            },
        },
    };

    const slideFromLeft = {
        hidden: prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -52 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: prefersReducedMotion ? 0.01 : 0.65,
                ease: [0.22, 1, 0.36, 1] as const,
            },
        },
    };

    return (
        <section
            aria-label="Hero Pengenalan"
            className="relative w-full overflow-hidden pt-5 sm:pt-8 pb-14 sm:pb-20 min-h-[calc(100svh-4rem)] flex flex-col justify-center"
        >
            {/* Latar Belakang Arsitektural Halus: Grid + Warm Ambient + Grain */}
            <div className="aurora" aria-hidden="true">
                <div className="absolute inset-0 editorial-grid opacity-80" />
                <div className="aurora__blob aurora__blob--1" />
                <div className="aurora__blob aurora__blob--2" />
                <div className="aurora__blob aurora__blob--3" />
                <div className="grain" />
            </div>

            <div className="container-page relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
                    {/* KOLOM KIRI: Editorial Identity + Interactive Capability Deck (Slide dari Kiri ke Tengah) */}
                    <div className="lg:col-span-7">
                        <motion.div
                            variants={leftContainerVariants}
                            initial="hidden"
                            animate={heroReady ? "visible" : "hidden"}
                            className="flex flex-col items-start"
                        >
                            {/* Status Pill */}
                            <motion.div
                                variants={slideFromLeft}
                                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-border bg-card/90 backdrop-blur-sm text-[11px] font-medium text-foreground shadow-soft mb-5"
                            >
                                <span className="relative flex h-2 w-2" aria-hidden="true">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-65" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                                </span>
                                <span className="font-mono tracking-wide uppercase">
                                    Tersedia untuk Kolaborasi
                                </span>
                            </motion.div>

                            {/* Display Name dengan Editorial Serif + Copper Flourish */}
                            <motion.h1
                                variants={slideFromLeft}
                                className="text-display font-display font-extrabold tracking-tight text-foreground leading-[0.98]"
                            >
                                {firstNameLine}
                                {lastNameAccent && (
                                    <>
                                        <br className="hidden sm:inline" />{" "}
                                        <span className="relative inline-block font-editorial text-primary font-normal tracking-normal text-[1.16em]">
                                            {lastNameAccent}
                                            <svg
                                                aria-hidden="true"
                                                viewBox="0 0 220 12"
                                                fill="none"
                                                className="absolute -bottom-1 left-0 w-full h-2.5 text-primary/45 pointer-events-none"
                                            >
                                                <path
                                                    d="M2 8.5C58 2.5 152 1.5 218 7.5"
                                                    stroke="currentColor"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        </span>
                                    </>
                                )}
                            </motion.h1>

                            {/* Role Pill */}
                            <motion.div
                                variants={slideFromLeft}
                                className="mt-5 inline-flex flex-wrap items-center gap-2.5 rounded-full border border-border/85 bg-card/90 backdrop-blur-md pl-2 pr-4 py-1.5 shadow-soft"
                            >
                                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink text-ink-foreground shrink-0">
                                    <Terminal className="h-3.5 w-3.5 text-[#e07a52]" />
                                </span>
                                <span className="text-sm sm:text-[15px] font-display font-semibold text-foreground tracking-tight">
                                    {site.role}
                                </span>
                            </motion.div>

                            {/* Value Proposition (Tanpa Oke Web Indonesia) */}
                            <motion.p
                                variants={slideFromLeft}
                                className="mt-4 text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed"
                            >
                                {site.tagline}
                            </motion.p>

                            {/* Interactive Capability Switcher Card (Obsidian-accented, Unik & Interaktif!) */}
                            <motion.div
                                variants={slideFromLeft}
                                className="relative mt-5 w-full max-w-xl rounded-2xl border border-border/90 bg-card/90 backdrop-blur-md p-4 shadow-soft overflow-hidden"
                            >
                                <div
                                    aria-hidden="true"
                                    className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-primary via-brass to-transparent"
                                />
                                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border/70">
                                    <div className="flex flex-wrap items-center gap-1.5">
                                        {focusModes.map((mode) => {
                                            const Icon = mode.icon;
                                            const isActive = mode.id === activeMode;
                                            return (
                                                <button
                                                    key={mode.id}
                                                    type="button"
                                                    onClick={() => setActiveMode(mode.id)}
                                                    className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${isActive
                                                        ? "text-ink-foreground"
                                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                                                        }`}
                                                >
                                                    {isActive && (
                                                        <motion.span
                                                            layoutId="hero-focus-pill"
                                                            transition={{
                                                                type: "spring",
                                                                stiffness: 420,
                                                                damping: 32,
                                                            }}
                                                            className="absolute inset-0 rounded-full bg-ink shadow-sm"
                                                        />
                                                    )}
                                                    <Icon className="relative z-10 h-3.5 w-3.5" />
                                                    <span className="relative z-10">{mode.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                                        Core Stack
                                    </span>
                                </div>

                                <div className="pt-3 min-h-[64px]">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentFocus.id}
                                            initial={
                                                prefersReducedMotion
                                                    ? { opacity: 1 }
                                                    : { opacity: 0, y: 6 }
                                            }
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={
                                                prefersReducedMotion
                                                    ? { opacity: 0 }
                                                    : { opacity: 0, y: -6 }
                                            }
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="flex flex-wrap gap-1.5 mb-2">
                                                {currentFocus.chips.map((chip) => (
                                                    <span
                                                        key={chip}
                                                        className={`font-mono text-[10.5px] font-semibold px-2.5 py-0.5 rounded-md border ${chip === "Laravel" || chip === "Next.js"
                                                            ? "bg-primary/12 text-primary border-primary/25"
                                                            : "bg-secondary/80 text-foreground border-border/70"
                                                            }`}
                                                    >
                                                        {chip}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
                                                {currentFocus.detail}
                                            </p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </motion.div>

                            {/* Tombol CTA Utama + Quick Social Icons */}
                            <motion.div
                                variants={slideFromLeft}
                                className="mt-6 flex flex-wrap items-center gap-3 w-full sm:w-auto"
                            >
                                <Link
                                    href="/projects"
                                    className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-ink text-ink-foreground font-semibold text-sm shadow-lift hover:bg-primary hover:text-primary-foreground transition-all duration-200 flex-1 sm:flex-none"
                                >
                                    <span>Eksplorasi Proyek</span>
                                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </Link>

                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-border bg-card hover:border-primary/60 hover:bg-muted text-foreground font-medium text-sm transition-all shadow-soft flex-1 sm:flex-none"
                                >
                                    <span>Hubungi Saya</span>
                                </Link>

                                <div className="hidden sm:flex items-center gap-1.5 pl-2.5 ml-1 border-l border-border/80">
                                    <a
                                        href={site.socials.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="GitHub Fauzan"
                                        className="h-10 w-10 rounded-full border border-border bg-card hover:border-primary hover:text-primary text-muted-foreground flex items-center justify-center transition-all shadow-soft hover:-translate-y-0.5"
                                    >
                                        <Github className="h-4 w-4" />
                                    </a>
                                    <a
                                        href={site.socials.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="LinkedIn Fauzan"
                                        className="h-10 w-10 rounded-full border border-border bg-card hover:border-primary hover:text-primary text-muted-foreground flex items-center justify-center transition-all shadow-soft hover:-translate-y-0.5"
                                    >
                                        <Linkedin className="h-4 w-4" />
                                    </a>
                                    <a
                                        href={mailtoUrl}
                                        aria-label="Email Fauzan"
                                        className="h-10 w-10 rounded-full border border-border bg-card hover:border-primary hover:text-primary text-muted-foreground flex items-center justify-center transition-all shadow-soft hover:-translate-y-0.5"
                                    >
                                        <Mail className="h-4 w-4" />
                                    </a>
                                </div>
                            </motion.div>

                            {/* Kesiapan Skema Kerja */}
                            <motion.div
                                variants={slideFromLeft}
                                className="mt-6 pt-4 border-t border-border/75 w-full max-w-xl"
                            >
                                <div className="flex flex-wrap items-center gap-1.5">
                                    <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground mr-1">
                                        Skema Kerja:
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold border border-primary/25 text-[11px]">
                                        Full Time
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full bg-card text-foreground font-medium border border-border/80 text-[11px]">
                                        Remote / WFH
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full bg-card text-foreground font-medium border border-border/80 text-[11px]">
                                        WFO
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full bg-card text-foreground font-medium border border-border/80 text-[11px]">
                                        Freelance
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full bg-card text-foreground font-medium border border-border/80 text-[11px]">
                                        Part Time / Magang
                                    </span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* KOLOM KANAN: Frameless Glass Monolith (Slide dari Kanan ke Tengah) */}
                    <div
                        className="lg:col-span-5 flex justify-center lg:justify-end relative"
                        style={{ perspective: "1200px" }}
                    >
                        <motion.div
                            ref={cardRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            initial={
                                prefersReducedMotion
                                    ? { opacity: 1, x: 0, scale: 1 }
                                    : { opacity: 0, x: 56, scale: 0.95 }
                            }
                            animate={
                                heroReady
                                    ? { opacity: 1, x: 0, scale: 1 }
                                    : prefersReducedMotion
                                    ? { opacity: 1, x: 0, scale: 1 }
                                    : { opacity: 0, x: 56, scale: 0.95 }
                            }
                            transition={{ duration: 0.72, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                            className="relative w-full max-w-[300px] sm:max-w-[335px] mx-auto lg:mx-0 group"
                        >
                            {/* Halo Cahaya Studio Cyan-Copper di Belakang Monolith */}
                            <div
                                aria-hidden="true"
                                className="absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-sky-500/30 via-primary/20 to-amber-300/20 blur-3xl opacity-85 group-hover:opacity-100 transition-opacity duration-500 -z-20"
                            />

                            {/* Ring Arsitektural Putus-Putus Halus */}
                            <div
                                aria-hidden="true"
                                className="hidden sm:block absolute -inset-3 rounded-[2.6rem] border border-dashed border-primary/25 -z-10"
                            />

                            {/* Bezel Kaca Ultra-Tipis + Interactive 3D Tilt */}
                            <div
                                className="relative p-[6px] rounded-[2.3rem] bg-gradient-to-b from-white/85 via-white/35 to-white/15 dark:from-white/25 dark:via-white/10 dark:to-white/5 shadow-[0_32px_70px_-18px_rgba(15,23,42,0.42)] transition-transform duration-200 ease-out"
                                style={
                                    !prefersReducedMotion && !isTouchDevice
                                        ? {
                                            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                                            transformStyle: "preserve-3d",
                                        }
                                        : undefined
                                }
                            >
                                {/* Kontainer Foto Full-Bleed */}
                                <div className="relative w-full aspect-[10/14.5] rounded-[1.95rem] overflow-hidden bg-[#0c1118] ring-1 ring-black/15">
                                    <Image
                                        src="/portrait-hero.jpg"
                                        alt={`Foto potret ${site.name}, ${site.role}`}
                                        fill
                                        priority
                                        sizes="(max-width: 640px) 85vw, 335px"
                                        className="object-cover object-center select-none transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                    />

                                    {/* Specular Glass Glare Mengikuti Kursor */}
                                    {tilt.active && !isTouchDevice && !prefersReducedMotion && (
                                        <div
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-200"
                                            style={{
                                                background: `radial-gradient(280px circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.22), transparent 60%)`,
                                            }}
                                        />
                                    )}

                                    {/* Diagonal Glass Light Sheen saat Hover */}
                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    >
                                        <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[sheen-sweep_1.2s_ease-in-out]" />
                                    </div>

                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[1.95rem]"
                                    />
                                </div>
                            </div>

                            {/* Floating Pill 1: Link LinkedIn (Kiri Atas) */}
                            <a
                                href={site.socials.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute -top-3 -left-3 sm:-left-5 z-30 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/95 backdrop-blur-md border border-border shadow-lift text-[11px] font-semibold text-foreground hover:border-primary hover:text-primary transition-all float-y"
                                style={{ "--d": "0ms" } as React.CSSProperties}
                            >
                                <span className="relative flex h-2 w-2" aria-hidden="true">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
                                </span>
                                <span>LinkedIn Verified</span>
                                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                            </a>

                            {/* Floating Pill 2: Stack Badge Gelap (Kiri Bawah agar tidak bentrok dengan tombol WA kanan) */}
                            <div
                                className="absolute -bottom-3 -left-2 sm:-left-5 z-30 inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#141210]/95 text-[#f4efe8] backdrop-blur-md border border-white/15 shadow-lift text-[11px] font-medium float-y"
                                style={{ "--d": "1100ms" } as React.CSSProperties}
                            >
                                <Code2 className="h-3.5 w-3.5 text-[#e07a52] shrink-0" />
                                <span className="font-mono text-[10.5px] tracking-tight">
                                    Next.js · Laravel · Go · Kotlin
                                </span>
                                <Sparkles className="h-3 w-3 text-[#d4af72] shrink-0" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Pemisah Editorial sebelum Marquee */}
            <div className="container-page relative z-10 mt-14 sm:mt-16">
                <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground shrink-0">
                        Showcase Karya Pilihan · 2024–2026
                    </span>
                    <div className="hairline-copper flex-1" aria-hidden="true" />
                </div>
            </div>

            {/* STRIP GAMBAR BERGERAK (MARQUEE 2 BARIS) */}
            <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 sm:mt-6 relative overflow-hidden"
                aria-hidden="true"
            >
                <div className="relative -mx-4 sm:-mx-10 py-4 sm:py-6 transform -rotate-2 sm:-rotate-3 lg:-rotate-4 sm:scale-105 pointer-events-auto hover:[&_.marquee__track]:[animation-play-state:paused]">
                    {/* Baris 1: Arah Kiri */}
                    <div className="marquee mb-4">
                        <div className="marquee__track gap-4 pr-4">
                            {[
                                { title: "NALARA AI Learning", img: "/itxlearning.png" },
                                { title: "PrajaLinks Studio", img: "/prajalinks-perusahaan.png" },
                                { title: "Desa Karangwaluh", img: "/desa-karangwaluh.png" },
                                { title: "PrajaLinks Coffee & Bakery", img: "/prajalinks-kafe.png" },
                                { title: "Ponorogo Phone", img: "/ponorogophone.png" },
                                { title: "PrajaLinks Laundry & Care", img: "/prajalinks-laundry.png" },
                                { title: "PrajaLinks Nightlife", img: "/prajalinks-diskotik.png" },
                                { title: "NALARA AI Learning", img: "/itxlearning.png" },
                            ].map((p, idx) => (
                                <div
                                    key={`m1-${idx}`}
                                    className="relative w-64 sm:w-80 aspect-video rounded-xl overflow-hidden border border-border/80 bg-card shadow-soft shrink-0 group"
                                >
                                    <Image
                                        src={p.img}
                                        alt={idx < 7 ? p.title : ""}
                                        aria-hidden={idx >= 7 ? true : undefined}
                                        fill
                                        sizes="(max-width: 640px) 256px, 320px"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end p-3">
                                        <span className="text-white text-xs font-medium tracking-tight">
                                            {p.title}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Baris 2: Arah Kanan (Berlawanan) */}
                    <div className="marquee">
                        <div className="marquee__track marquee__track--reverse gap-4 pr-4">
                            {[
                                { title: "PrajaLinks Nightlife", img: "/prajalinks-diskotik.png" },
                                { title: "PrajaLinks Laundry & Care", img: "/prajalinks-laundry.png" },
                                { title: "Desa Karangwaluh", img: "/desa-karangwaluh.png" },
                                { title: "PrajaLinks Coffee & Bakery", img: "/prajalinks-kafe.png" },
                                { title: "PrajaLinks Studio", img: "/prajalinks-perusahaan.png" },
                                { title: "Rempang Melayu Perkasa", img: "/rempang.png" },
                                { title: "Bernardus Insight", img: "/bernadus.png" },
                                { title: "PrajaLinks Nightlife", img: "/prajalinks-diskotik.png" },
                            ].map((p, idx) => (
                                <div
                                    key={`m2-${idx}`}
                                    className="relative w-64 sm:w-80 aspect-video rounded-xl overflow-hidden border border-border/80 bg-card shadow-soft shrink-0 group"
                                >
                                    <Image
                                        src={p.img}
                                        alt={idx < 7 ? p.title : ""}
                                        aria-hidden={idx >= 7 ? true : undefined}
                                        fill
                                        sizes="(max-width: 640px) 256px, 320px"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end p-3">
                                        <span className="text-white text-xs font-medium tracking-tight">
                                            {p.title}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
