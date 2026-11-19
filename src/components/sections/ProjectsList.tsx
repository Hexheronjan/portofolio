"use client";

import { useMemo, useState } from "react";
import { Briefcase, Search, X } from "lucide-react";
import { projects } from "@/constants/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";

const ALL_TAGS = ["Semua", "Next.js", "React Native", "WordPress", "React", "Tailwind CSS"] as const;

export function ProjectsList() {
    const [selectedTag, setSelectedTag] = useState<string>("Semua");
    const [query, setQuery] = useState<string>("");

    const filteredProjects = useMemo(() => {
        const q = query.trim().toLowerCase();
        return projects.filter((p) => {
            const matchesTag =
                selectedTag === "Semua" ||
                p.tags.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase()));
            if (!matchesTag) return false;
            if (!q) return true;
            return (
                p.title.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.role.toLowerCase().includes(q) ||
                p.tags.some((t) => t.toLowerCase().includes(q))
            );
        });
    }, [selectedTag, query]);

    return (
        <div className="relative">
            {/* Full-Bleed Dark Obsidian Hero Banner + Floating Live Project Search */}
            <PageHeroBanner
                eyebrow={`03 // ARSIP KARYA // ${projects.length} PROYEK`}
                title="PORTOFOLIO &"
                titleAccent="STUDI KASUS"
                description="Koleksi website perusahaan, portal pelayanan publik, e-commerce, landing page konversi, dan aplikasi web & mobile berbasis Next.js yang dibangun untuk kebutuhan bisnis nyata."
                icon={<Briefcase className="h-3.5 w-3.5" />}
                floatingBar={
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="flex items-center gap-2 rounded-full border border-border bg-card p-2 pl-5 shadow-[0_20px_50px_-15px_rgba(23,20,18,0.2)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.65)] focus-within:border-primary/60 transition-colors"
                    >
                        <Search className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Cari proyek, bidang usaha, atau teknologi (misal: Kafe, Desa, Next.js, AI)..."
                            aria-label="Cari proyek portofolio"
                            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none py-1.5"
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={() => setQuery("")}
                                aria-label="Hapus pencarian"
                                className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                        <button
                            type="submit"
                            className="px-5 py-2.5 rounded-full bg-ink text-ink-foreground text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-colors shrink-0"
                        >
                            Cari
                        </button>
                    </form>
                }
            />

            {/* Konten Grid Proyek */}
            <div className="container-page pt-12 sm:pt-16 pb-12">
                <div className="flex flex-col gap-8">
                    {/* Filter Tabs & Jumlah Hasil */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                            {ALL_TAGS.map((tag) => {
                                const isActive = selectedTag === tag;
                                return (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => setSelectedTag(tag)}
                                        className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                                            isActive
                                                ? "bg-ink text-ink-foreground border-ink shadow-soft"
                                                : "bg-card text-foreground border-border hover:border-primary/50 hover:text-primary"
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                );
                            })}
                        </div>

                        <span className="font-mono text-xs text-muted-foreground shrink-0">
                            Menampilkan {filteredProjects.length} dari {projects.length} proyek
                        </span>
                    </div>

                    {/* Grid Kartu Proyek */}
                    {filteredProjects.length === 0 ? (
                        <div className="text-center py-16 px-6 rounded-2xl border border-border bg-card shadow-soft">
                            <p className="font-display font-bold text-lg text-foreground">
                                Tidak ada proyek yang cocok dengan &ldquo;{query}&rdquo;
                            </p>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1.5">
                                Coba ubah kata kunci atau pilih filter teknologi lain.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setQuery("");
                                    setSelectedTag("Semua");
                                }}
                                className="mt-5 px-5 py-2.5 rounded-full bg-ink text-ink-foreground text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                                Tampilkan Semua Proyek
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects.map((project, idx) => {
                                const dir = idx % 3 === 0 ? "left" : idx % 3 === 1 ? "up" : "right";
                                return (
                                    <ScrollReveal
                                        key={`${selectedTag}-${query}-${project.slug}`}
                                        direction={dir}
                                        delay={(idx % 3) * 0.1}
                                        className="h-full flex flex-col"
                                    >
                                        <ProjectCard {...project} />
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
