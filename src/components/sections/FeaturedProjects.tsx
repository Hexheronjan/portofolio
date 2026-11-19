"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/constants/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function FeaturedProjects() {
    // Ambil 6 proyek unggulan live teratas (termasuk NALARA AI & proyek Vercel terbaru)
    const featuredList = projects.filter((p) => p.featured).slice(0, 6);

    return (
        <section aria-label="Proyek Pilihan" className="section-y relative border-t border-border/60 overflow-x-clip">
            <div className="container-page">
                {/* Header Section: Kiri meluncur dari kiri, Tombol dari kanan */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
                    <ScrollReveal direction="left" className="max-w-xl">
                        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary font-mono">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                            01 // Karya Nyata
                        </span>
                        <h2 className="text-h2 font-display font-bold tracking-tight text-foreground mt-2.5">
                            Proyek Pilihan
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base mt-3">
                            Daftar pekerjaan web profesional dan aplikasi yang dibangun dengan fokus pada kecepatan akses, kegunaan nyata, serta kemudahan bagi pengguna.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal direction="right" delay={0.08}>
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition-all shadow-soft group"
                        >
                            <span>Lihat Semua ({projects.length})</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </ScrollReveal>
                </div>

                {/* Grid 3 Kolom: Kiri meluncur dari kiri, Tengah naik dari bawah, Kanan meluncur dari kanan */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredList.map((project, idx) => {
                        const dir = idx % 3 === 0 ? "left" : idx % 3 === 1 ? "up" : "right";
                        return (
                            <ScrollReveal
                                key={project.slug}
                                direction={dir}
                                delay={(idx % 3) * 0.1}
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
