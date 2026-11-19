"use client";

import { useMemo, useState } from "react";
import {
    Search,
    X,
    Layers,
    Terminal,
    Code2,
    Smartphone,
    Server,
    Database,
    Wrench,
    ShieldCheck,
    Gauge,
    Cpu,
    Sparkles,
    type LucideIcon,
} from "lucide-react";
import { skillCategories } from "@/constants/skills";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";

const categoryIcons: Record<string, LucideIcon> = {
    "Bahasa Pemrograman": Terminal,
    "Frontend & UI": Code2,
    "Mobile App": Smartphone,
    "Backend & API": Server,
    "Basis Data": Database,
    "CMS & DevOps": Wrench,
};

export function SkillsContent() {
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

    const categoryNames = useMemo(
        () => ["Semua", ...skillCategories.map((c) => c.title)],
        []
    );

    const totalSkills = useMemo(
        () => skillCategories.reduce((sum, c) => sum + c.skills.length, 0),
        []
    );

    const filteredCategories = useMemo(() => {
        const q = query.trim().toLowerCase();
        return skillCategories.filter((cat) => {
            if (selectedCategory !== "Semua" && cat.title !== selectedCategory) return false;
            if (!q) return true;
            return (
                cat.title.toLowerCase().includes(q) ||
                cat.description.toLowerCase().includes(q) ||
                cat.skills.some((s) => s.name.toLowerCase().includes(q))
            );
        });
    }, [query, selectedCategory]);

    return (
        <div className="relative">
            {/* Full-Bleed Dark Obsidian Hero Banner + Floating Live Tech Search Bar */}
            <PageHeroBanner
                eyebrow={`02 // KEAHLIAN TEKNIS // ${totalSkills} TOOLS`}
                title="EKOSISTEM &"
                titleAccent="KEAHLIAN"
                description="Rincian teknologi, framework, basis data, dan alur kerja rekayasa yang aktif saya gunakan untuk membangun website bisnis dan aplikasi mobile berstandar produksi."
                icon={<Layers className="h-3.5 w-3.5" />}
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
                            placeholder="Cari bahasa, framework, atau tools (misal: Golang, Kotlin, C++, Java, Next.js)..."
                            aria-label="Cari keahlian atau teknologi"
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

            {/* Konten Utama */}
            <div className="container-page pt-12 sm:pt-16 pb-12">
                {/* Filter Kategori & Status Jumlah */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                    <div className="flex flex-wrap gap-2">
                        {categoryNames.map((name) => {
                            const active = selectedCategory === name;
                            return (
                                <button
                                    key={name}
                                    type="button"
                                    onClick={() => setSelectedCategory(name)}
                                    className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                                        active
                                            ? "bg-ink text-ink-foreground border-ink shadow-soft"
                                            : "bg-card text-foreground border-border hover:border-primary/50 hover:text-primary"
                                    }`}
                                >
                                    {name}
                                </button>
                            );
                        })}
                    </div>

                    <span className="font-mono text-xs text-muted-foreground shrink-0">
                        {filteredCategories.length} kategori ditampilkan
                    </span>
                </div>

                {/* Grid Kategori Keahlian */}
                {filteredCategories.length === 0 ? (
                    <div className="text-center py-16 px-6 rounded-2xl border border-border bg-card shadow-soft">
                        <p className="font-display font-bold text-lg text-foreground">
                            Teknologi &ldquo;{query}&rdquo; belum ditemukan
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1.5">
                            Coba kata kunci lain seperti Golang, C++, Java, Kotlin, Next.js, atau PostgreSQL.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setQuery("");
                                setSelectedCategory("Semua");
                            }}
                            className="mt-5 px-5 py-2.5 rounded-full bg-ink text-ink-foreground text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                            Tampilkan Semua Keahlian
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCategories.map((cat, idx) => {
                            const Icon = categoryIcons[cat.title] ?? Layers;
                            const q = query.trim().toLowerCase();
                            const dir = idx % 3 === 0 ? "left" : idx % 3 === 1 ? "up" : "right";
                            return (
                                <ScrollReveal
                                    key={cat.title}
                                    direction={dir}
                                    delay={(idx % 3) * 0.1}
                                    className="h-full flex flex-col"
                                >
                                    <div className="group relative flex flex-col h-full rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-lift hover:border-primary/45 transition-all duration-300 overflow-hidden">
                                        <div
                                            className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-primary via-brass to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            aria-hidden="true"
                                        />

                                        <div className="flex items-center justify-between gap-2 mb-4">
                                            <div className="h-10 w-10 rounded-xl bg-secondary border border-border/70 text-primary group-hover:bg-ink group-hover:text-ink-foreground flex items-center justify-center transition-colors duration-200">
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div className="text-right">
                                                <span className="block font-mono text-xs font-bold text-primary">
                                                    {String(idx + 1).padStart(2, "0")}
                                                </span>
                                                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                                                    {cat.skills.length} tools
                                                </span>
                                            </div>
                                        </div>

                                        <h2 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                                            {cat.title}
                                        </h2>
                                        <p className="text-xs text-muted-foreground mt-1.5 mb-5 leading-relaxed">
                                            {cat.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/60">
                                            {cat.skills.map((skill, sIdx) => {
                                                const isMatch = q.length > 0 && skill.name.toLowerCase().includes(q);
                                                return (
                                                    <span
                                                        key={sIdx}
                                                        className={`inline-flex items-center text-xs font-medium px-3 py-1 rounded-full border transition-colors ${
                                                            isMatch
                                                                ? "bg-primary text-primary-foreground border-primary font-semibold shadow-sm"
                                                                : "bg-secondary text-secondary-foreground border-border/70 hover:border-primary/50 hover:text-primary"
                                                        }`}
                                                    >
                                                        {skill.name}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                )}

                {/* Standar Rekayasa */}
                <section className="mt-16 pt-14 border-t border-border/70">
                    <ScrollReveal direction="up" className="mb-8">
                        <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.16em] text-primary">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                            Standar Kualitas Kode
                        </span>
                        <h2 className="text-h2 font-display font-bold text-foreground mt-2">
                            Prinsip Rekayasa di Setiap Proyek
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            {
                                icon: Cpu,
                                title: "TypeScript Strict",
                                desc: "Kode terstruktur aman tipe agar minim bug dan mudah dirawat jangka panjang.",
                            },
                            {
                                icon: Gauge,
                                title: "Performa Mobile-First",
                                desc: "Optimasi aset, lazy loading, dan respons cepat sejak muatan layar pertama.",
                            },
                            {
                                icon: ShieldCheck,
                                title: "Arsitektur Bersih",
                                desc: "Pemisahan komponen, API, dan data yang rapi untuk skalabilitas bisnis.",
                            },
                            {
                                icon: Sparkles,
                                title: "UI Presisi & Aksesibel",
                                desc: "Kontras warna nyaman dibaca (WCAG AA) dengan interaksi yang halus.",
                            },
                        ].map((std, i) => {
                            const Icon = std.icon;
                            const dir = i === 0 ? "left" : i === 3 ? "right" : "up";
                            return (
                                <ScrollReveal key={std.title} direction={dir} delay={i * 0.08}>
                                    <div className="h-full p-5 rounded-2xl border border-border bg-card shadow-soft">
                                        <Icon className="h-5 w-5 text-primary mb-3" />
                                        <h3 className="font-display font-bold text-sm text-foreground">
                                            {std.title}
                                        </h3>
                                        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                                            {std.desc}
                                        </p>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}
