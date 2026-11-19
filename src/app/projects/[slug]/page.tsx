import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Briefcase } from "lucide-react";
import { projects } from "@/constants/projects";
import { site } from "@/lib/site";
import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";

interface ProjectDetailProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return projects.map((p) => ({
        slug: p.slug,
    }));
}

export async function generateMetadata({ params }: ProjectDetailProps): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) return { title: "Proyek Tidak Ditemukan" };

    return {
        title: `${project.title} | Portofolio ${site.name}`,
        description: project.description,
    };
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="relative">
            {/* Full-Bleed Dark Obsidian Hero Banner untuk Studi Kasus */}
            <PageHeroBanner
                align="left"
                eyebrow={`STUDI KASUS // ${project.role.toUpperCase()}`}
                title={project.title}
                description={project.description}
                icon={<Briefcase className="h-3.5 w-3.5" />}
            >
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    {project.tags.map((t) => (
                        <span
                            key={t}
                            className="text-xs px-3 py-1 rounded-full bg-white/[0.08] text-[#f4efe8] font-medium border border-white/15"
                        >
                            {t}
                        </span>
                    ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/20 bg-white/[0.06] text-xs font-semibold text-[#f4efe8] hover:bg-white/15 transition-colors"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        <span>Kembali ke Semua Proyek</span>
                    </Link>

                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#e07a52] text-[#140d0a] font-semibold text-xs hover:bg-[#f4efe8] transition-colors shadow-soft"
                        >
                            <span>Buka Situs Live</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                    )}
                </div>
            </PageHeroBanner>

            <div className="container-page pt-10 sm:pt-14 pb-12">
                {/* Banner Image */}
                <ScrollReveal direction="up" className="mb-12">
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border bg-muted shadow-lift">
                        <Image
                            src={project.image}
                            alt={`Screenshot ${project.title}`}
                            fill
                            priority
                            sizes="(max-width: 1200px) 100vw, 1200px"
                            className="object-cover"
                        />
                    </div>
                </ScrollReveal>

                {/* Detail Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        {
                            index: "01",
                            label: "Tantangan / Masalah",
                            text: project.problem || "Menyediakan platform web berkinerja stabil dan ramah perangkat bergerak.",
                        },
                        {
                            index: "02",
                            label: "Solusi & Pendekatan",
                            text: project.solution || "Menerapkan antarmuka intuitif dengan struktur komponen yang optimal dan waktu respons cepat.",
                        },
                        {
                            index: "03",
                            label: "Hasil yang Dicapai",
                            text: project.result || "Situs siap digunakan dan mempermudah operasional pengguna.",
                        },
                    ].map((block, i) => (
                        <ScrollReveal
                            key={block.index}
                            direction={i === 0 ? "left" : i === 1 ? "up" : "right"}
                            delay={i * 0.1}
                        >
                            <div className="h-full p-6 rounded-2xl border border-border bg-card shadow-soft relative overflow-hidden">
                                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-primary/60 to-transparent" aria-hidden="true" />
                                <span className="font-mono text-xs font-bold text-primary">
                                    {block.index}
                                </span>
                                <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mt-2">
                                    {block.label}
                                </h2>
                                <p className="text-sm text-foreground mt-2.5 leading-relaxed">
                                    {block.text}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Live Action bawah */}
                {project.liveUrl && (
                    <ScrollReveal direction="up" className="flex items-center gap-4">
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-ink-foreground font-semibold text-sm shadow-soft hover:bg-primary hover:text-primary-foreground transition-all"
                        >
                            <span>Buka Situs Live</span>
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    </ScrollReveal>
                )}
            </div>
        </div>
    );
}
