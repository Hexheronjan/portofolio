"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/constants/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ScrollReveal, StaggerContainer } from "@/components/ui/ScrollReveal";
import { HeadingReveal } from "@/components/ui/HeadingReveal";

export function FeaturedProjects() {
    // Ambil proyek unggulan teratas (termasuk NALARA AI)
    const featuredList = projects.filter((p) => p.featured).slice(0, 4);

    return (
        <section aria-label="Proyek Pilihan" data-bg-intensity="0.4" className="section-y relative border-t border-border/60">
            <div className="container-page">
                {/* Header Section: Teks dari KIRI, Tombol dari KANAN */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
                    <ScrollReveal direction="left" distance={45} className="max-w-xl">
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary font-mono">
                            Karya Nyata
                        </span>
                        <HeadingReveal delay={0.05} className="mt-2">
                            <h2 className="text-h2 font-display font-bold tracking-tight text-foreground">
                                Proyek Pilihan
                            </h2>
                        </HeadingReveal>
                        <p className="text-muted-foreground text-sm sm:text-base mt-3">
                            Daftar pekerjaan web profesional dan aplikasi yang dibangun dengan fokus pada kecepatan akses, kegunaan nyata, serta kemudahan bagi pengguna.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal direction="right" distance={45}>
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors pb-1 group"
                        >
                            <span>Lihat Semua ({projects.length})</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </ScrollReveal>
                </div>

                {/* Grid Kartu Proyek: Staggered Slide-Up dari BAWAH */}
                <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
                    {featuredList.map((project) => (
                        <ProjectCard key={project.slug} {...project} />
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
