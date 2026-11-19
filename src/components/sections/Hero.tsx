"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Code2, Smartphone } from "lucide-react";
import { site } from "@/lib/site";
import { motion } from "framer-motion";

export function Hero() {
    const photoContainerRef = useRef<HTMLDivElement>(null);
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handleMotionChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };
        mediaQuery.addEventListener("change", handleMotionChange);
        return () => mediaQuery.removeEventListener("change", handleMotionChange);
    }, []);

    // Parallax mouse effect (maksimal ±12px, hanya di desktop non-touch & tanpa reduced-motion)
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isTouchDevice || prefersReducedMotion || !photoContainerRef.current) return;
        const rect = photoContainerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);

        setMouseOffset({
            x: Math.max(-12, Math.min(12, deltaX * 12)),
            y: Math.max(-12, Math.min(12, deltaY * 12)),
        });
    };

    const handleMouseLeave = () => {
        setMouseOffset({ x: 0, y: 0 });
    };

    return (
        <section
            aria-label="Hero Pengenalan"
            className="relative w-full overflow-hidden section-y min-h-[calc(100svh-4rem)] flex flex-col justify-center"
        >
            {/* Latar Belakang Arsitektural Halus: Grid + Warm Ambient + Grain */}
            <div className="aurora" aria-hidden="true">
                <div className="absolute inset-0 editorial-grid opacity-75" />
                <div className="aurora__blob aurora__blob--1" />
                <div className="aurora__blob aurora__blob--2" />
                <div className="aurora__blob aurora__blob--3" />
                <div className="grain" />
            </div>

            <div className="container-page relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    
                    {/* KOLOM KIRI: Teks & Identitas (Masuk Langsung) */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col items-start"
                        >
                            {/* Status Badge */}
                            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-border bg-card/85 backdrop-blur-sm text-xs font-medium text-foreground mb-6 shadow-soft">
                                <span className="relative flex h-2 w-2" aria-hidden="true">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                                </span>
                                <span className="font-mono text-[11px] tracking-wide uppercase">Full Stack Developer</span>
                                <span className="text-border">•</span>
                                <span className="text-muted-foreground text-[11px]">Oke Web Indonesia</span>
                            </div>

                            {/* Nama & Posisi */}
                            <h1 className="text-display font-display font-bold tracking-tight text-foreground leading-[1.04]">
                                {site.name}
                            </h1>

                            <p className="mt-3 text-h3 font-medium text-primary">
                                {site.role}
                            </p>

                            {/* Kalimat Value Proposition */}
                            <p className="mt-5 text-lead text-muted-foreground max-w-xl">
                                {site.tagline}
                            </p>

                            {/* Call To Actions Nyata */}
                            <div className="mt-8 flex flex-wrap items-center gap-3 w-full sm:w-auto">
                                <Link
                                    href="/projects"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-ink text-ink-foreground font-semibold text-sm shadow-lift hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                                >
                                    <span>Lihat Proyek</span>
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>

                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-border bg-card hover:border-primary/50 hover:bg-muted text-foreground font-medium text-sm transition-all shadow-soft"
                                >
                                    <span>Hubungi Saya</span>
                                </Link>
                            </div>

                            {/* Kesiapan Skema Kerja Perusahaan */}
                            <div className="mt-8 pt-6 border-t border-border/70 w-full max-w-xl">
                                <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-muted-foreground mb-2.5">
                                    Kesiapan Kerja &amp; Penempatan
                                </p>
                                <div className="flex flex-wrap gap-1.5 text-[11px]">
                                    <span className="px-2.5 py-1 rounded-full bg-card text-foreground font-medium border border-border/80">
                                        Remote / WFH
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full bg-card text-foreground font-medium border border-border/80">
                                        WFO
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">
                                        Full Time (PKWTT / PKWT)
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full bg-card text-foreground font-medium border border-border/80">
                                        Part Time / Shift
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full bg-card text-foreground font-medium border border-border/80">
                                        Magang
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full bg-card text-foreground font-medium border border-border/80">
                                        Freelance
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full bg-card text-foreground font-medium border border-border/80">
                                        Outsourcing
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* KOLOM KANAN: Foto Hero (Masuk Langsung) */}
                    <div
                        ref={photoContainerRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="lg:col-span-5 flex justify-center lg:justify-end relative"
                    >
                        <motion.div
                            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] mx-auto lg:mx-0"
                        >
                            {/* Frame Arsitektural Hangat Di Belakang Foto */}
                            <div
                                aria-hidden="true"
                                className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-tr from-primary/20 via-brass/15 to-transparent blur-2xl -z-10"
                            />
                            <div
                                aria-hidden="true"
                                className="absolute -inset-1.5 rounded-[2rem] border border-border bg-gradient-to-b from-card to-muted -z-10 shadow-lift"
                            />

                            {/* Kontainer Foto dengan Rasio 4:5, Border Halus, Shadow Lembut */}
                            <div
                                className="relative w-full h-full rounded-[1.75rem] overflow-hidden border border-border/90 bg-muted/40 shadow-lift transition-transform duration-200 ease-out flex items-end justify-center"
                                style={
                                    !prefersReducedMotion && !isTouchDevice
                                        ? {
                                              transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
                                          }
                                        : undefined
                                }
                            >
                                {/* Foto Hero dengan Priority LCP & sizes responsif */}
                                <Image
                                    src="/portrait-hero.png"
                                    alt={`Foto potret ${site.name}, ${site.role}`}
                                    fill
                                    priority
                                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 380px, 420px"
                                    className="object-cover object-top select-none"
                                />
                            </div>

                            {/* Badge Melayang 1: TypeScript & Tailwind */}
                            <div
                                className="absolute -top-3 left-2 sm:-left-6 px-3.5 py-1.5 rounded-full border border-border bg-card/95 backdrop-blur-md text-xs font-semibold text-foreground shadow-lift flex items-center gap-1.5 float-y z-20"
                                style={{ "--d": "0ms" } as React.CSSProperties}
                            >
                                <Sparkles className="h-3.5 w-3.5 text-brass" />
                                <span>TypeScript &amp; Golang</span>
                            </div>

                            {/* Badge Melayang 2: Next.js */}
                            <div
                                className="absolute top-1/2 right-2 sm:-right-6 px-3.5 py-1.5 rounded-full border border-border bg-card/95 backdrop-blur-md text-xs font-semibold text-foreground shadow-lift flex items-center gap-1.5 float-y z-20"
                                style={{ "--d": "1200ms" } as React.CSSProperties}
                            >
                                <Code2 className="h-3.5 w-3.5 text-primary" />
                                <span>Next.js Full Stack</span>
                            </div>

                            {/* Badge Melayang 3: React Native */}
                            <div
                                className="absolute -bottom-3 left-4 sm:left-6 px-3.5 py-1.5 rounded-full border border-border bg-card/95 backdrop-blur-md text-xs font-semibold text-foreground shadow-lift flex items-center gap-1.5 float-y z-20"
                                style={{ "--d": "2400ms" } as React.CSSProperties}
                            >
                                <Smartphone className="h-3.5 w-3.5 text-foreground/80" />
                                <span>React Native &amp; Kotlin</span>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* STRIP GAMBAR BERGERAK (MARQUEE 2 BARIS) */}
            <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-14 sm:mt-20 pt-6 sm:pt-10 relative overflow-hidden"
                aria-hidden="true"
            >
                <div
                    className="relative -mx-4 sm:-mx-10 py-4 sm:py-6 transform -rotate-2 sm:-rotate-3 lg:-rotate-6 sm:scale-105 pointer-events-auto hover:[&_.marquee__track]:[animation-play-state:paused]"
                >
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
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3">
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
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3">
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
