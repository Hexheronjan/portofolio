"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import { projects } from "@/constants/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function FeaturedProjects() {
    // Ambil 7 proyek unggulan live teratas (1 flagship + 6 grid 3x2 agar simetris)
    const featuredList = projects.filter((p) => p.featured).slice(0, 7);
    const [flagship, ...restProjects] = featuredList;

    return (
        <section
            aria-label="Proyek Pilihan"
            className="section-y relative border-t border-border/60 overflow-x-clip"
        >
            <div className="container-page">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
                    <ScrollReveal direction="left" className="max-w-xl">
                        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary font-mono">
                            <span
                                className="h-1.5 w-1.5 rounded-full bg-primary"
                                aria-hidden="true"
                            />
                            01 // Karya Nyata
                        </span>
                        <h2 className="text-h2 font-display font-bold tracking-tight text-foreground mt-2.5">
                            Proyek{" "}
                            <span className="font-editorial text-primary font-normal text-[1.12em]">
                                Pilihan
                            </span>
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base mt-3">
                            Daftar pekerjaan web profesional dan aplikasi yang dibangun dengan fokus
                            pada kecepatan akses, kegunaan nyata, serta kemudahan bagi pengguna.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal direction="right" delay={0.08}>
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-card text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition-all shadow-soft group"
                        >
                            <span>Lihat Semua ({projects.length})</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </ScrollReveal>
                </div>

                {/* Flagship Spotlight Card (Proyek #1 — Split Editorial Layout) */}
                {flagship && (
                    <ScrollReveal direction="up" className="mb-8">
                        <article className="group relative rounded-3xl border border-border bg-card overflow-hidden shadow-lift hover:border-primary/50 transition-all duration-300">
                            <div
                                aria-hidden="true"
                                className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-ink via-primary to-brass z-10"
                            />

                            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                                {/* Kolom Gambar Flagship */}
                                <Link
                                    href={`/projects/${flagship.slug}`}
                                    className="lg:col-span-7 relative aspect-video lg:aspect-auto lg:min-h-[340px] bg-muted overflow-hidden block"
                                >
                                    <Image
                                        src={flagship.image}
                                        alt={`Tampilan antarmuka ${flagship.title}`}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 58vw"
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151210]/90 text-[#f4efe8] border border-white/15 backdrop-blur-md text-[11px] font-mono font-semibold">
                                        <Sparkles className="h-3 w-3 text-[#e07a52]" />
                                        <span>01 // FLAGSHIP PROJECT</span>
                                    </div>
                                </Link>

                                {/* Kolom Dossier Flagship */}
                                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between gap-5">
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-primary">
                                                {flagship.role}
                                            </span>
                                            <span className="font-mono text-[11px] text-muted-foreground">
                                                Featured #01
                                            </span>
                                        </div>

                                        <Link href={`/projects/${flagship.slug}`}>
                                            <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground group-hover:text-primary transition-colors leading-snug">
                                                {flagship.title}
                                            </h3>
                                        </Link>

                                        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                                            {flagship.description}
                                        </p>

                                        {flagship.tags && flagship.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-5">
                                                {flagship.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="inline-flex items-center text-[11px] px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium border border-border/60"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-4 border-t border-border/70 flex flex-wrap items-center gap-3">
                                        <Link
                                            href={`/projects/${flagship.slug}`}
                                            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-ink text-ink-foreground text-xs font-semibold shadow-soft hover:bg-primary hover:text-primary-foreground transition-colors"
                                        >
                                            <span>Pelajari Studi Kasus</span>
                                            <ArrowUpRight className="h-3.5 w-3.5" />
                                        </Link>

                                        {flagship.liveUrl && (
                                            <a
                                                href={flagship.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-border bg-background hover:border-primary hover:text-primary text-foreground text-xs font-semibold transition-colors"
                                            >
                                                <span>Buka Live</span>
                                                <ExternalLink className="h-3.5 w-3.5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </article>
                    </ScrollReveal>
                )}

                {/* Grid Proyek Pilihan Lainnya */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {restProjects.map((project, idx) => {
                        const dir = idx % 3 === 0 ? "left" : idx % 3 === 1 ? "up" : "right";
                        return (
                            <ScrollReveal
                                key={project.slug}
                                direction={dir}
                                delay={(idx % 3) * 0.08}
                                className="h-full"
                            >
                                <ProjectCard {...project} />
                            </ScrollReveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
