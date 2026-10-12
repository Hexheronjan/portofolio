import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { projects } from "@/constants/projects";
import { site } from "@/lib/site";
import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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
        <div className="section-y relative">
            <div className="container-page">
                {/* Back button */}
                <div className="mb-8">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Kembali ke Semua Proyek</span>
                    </Link>
                </div>

                {/* Header (Slide Up) */}
                <ScrollReveal direction="up" className="max-w-3xl mb-10">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {project.role}
                    </span>
                    <h1 className="text-display font-display font-bold tracking-tight text-foreground mt-2">
                        {project.title}
                    </h1>
                    <p className="text-muted-foreground text-base sm:text-lg mt-4 leading-relaxed">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-6">
                        {project.tags.map((t) => (
                            <span
                                key={t}
                                className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-medium border border-border/50"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Banner Image (Zoom Halus dari Tengah) */}
                <ScrollReveal direction="center" distance={20} className="mb-12">
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border/80 bg-muted shadow-lift">
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

                {/* Detail Information (Kiri, Tengah/Up, Kanan) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 sm:p-8 rounded-2xl border border-border/80 bg-card mb-12 shadow-soft">
                    <ScrollReveal direction="left" distance={30}>
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Tantangan / Masalah
                        </h2>
                        <p className="text-sm text-foreground mt-2 leading-relaxed">
                            {project.problem || "Menyediakan platform web berkinerja stabil dan ramah perangkat bergerak."}
                        </p>
                    </ScrollReveal>

                    <ScrollReveal direction="up" distance={30}>
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Solusi & Pendekatan
                        </h2>
                        <p className="text-sm text-foreground mt-2 leading-relaxed">
                            {project.solution || "Menerapkan antarmuka intuitif dengan struktur komponen yang optimal dan waktu respons cepat."}
                        </p>
                    </ScrollReveal>

                    <ScrollReveal direction="right" distance={30}>
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Hasil yang Dicapai
                        </h2>
                        <p className="text-sm text-foreground mt-2 leading-relaxed">
                            {project.result || "Situs siap digunakan dan mempermudah operasional pengguna."}
                        </p>
                    </ScrollReveal>
                </div>

                {/* Live Action (Slide Up) */}
                {project.liveUrl && (
                    <ScrollReveal direction="up" className="flex items-center gap-4">
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-soft hover:opacity-95 transition-all"
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
