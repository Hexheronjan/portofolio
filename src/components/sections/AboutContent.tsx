import Link from "next/link";
import { Download, ArrowUpRight } from "lucide-react";
import { timeline } from "@/constants/experience";
import { site } from "@/lib/site";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AboutContent() {
    return (
        <div className="section-y relative">
            <div className="container-page">
                {/* Header (Slide Up) */}
                <ScrollReveal direction="up" className="max-w-2xl mb-12">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Tentang Saya
                    </span>
                    <h1 className="text-display font-display font-bold tracking-tight text-foreground mt-2">
                        {site.name}
                    </h1>
                    <p className="text-lg text-primary font-medium mt-1">
                        {site.role} • {site.location}
                    </p>
                </ScrollReveal>

                {/* Grid Narasi & Profil (Slide Kiri & Kanan) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
                    <ScrollReveal direction="left" distance={40} className="lg:col-span-7 space-y-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                        <p>
                            Halo, saya Fauzan Bagus Prasetyo, seorang <strong className="text-foreground font-semibold">Full Stack & Mobile Developer</strong> yang berbasis di Ponorogo, Jawa Timur, Indonesia. Saya berfokus pada perancangan dan pembangunan aplikasi web modern serta aplikasi mobile yang efisien dan fungsional.
                        </p>
                        <p>
                            Latar belakang pendidikan saya di bidang <strong className="text-foreground font-semibold">Rekayasa Perangkat Lunak (RPL) SMK Negeri 1 Jenangan (2023–2026)</strong> memberi fondasi komputasi yang kokoh dalam logika pemrograman, basis data relasional, dan arsitektur sistem.
                        </p>
                        <p>
                            Selain menempuh pendidikan kejuruan, saya aktif mengerjakan proyek freelance untuk klien bisnis, mulai dari company profile berskala korporat, landing page promosi, hingga platform custom berbasis WordPress, React/Next.js, dan Node.js.
                        </p>
                        <div className="pt-4 flex flex-wrap gap-3">
                            <Link
                                href={site.cvPath}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-soft hover:opacity-95 transition-all"
                            >
                                <Download className="h-4 w-4" />
                                <span>Unduh CV (PDF)</span>
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-background hover:bg-muted text-foreground text-xs font-semibold transition-all"
                            >
                                <span>Hubungi Langsung</span>
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal direction="right" distance={40} className="lg:col-span-5 p-6 rounded-2xl border border-border/80 bg-card/60 shadow-soft">
                        <h2 className="font-display font-bold text-base text-foreground mb-4">
                            Ringkasan Profil
                        </h2>
                        <dl className="space-y-3 text-xs sm:text-sm">
                            <div className="flex justify-between py-2 border-b border-border/50">
                                <dt className="text-muted-foreground">Status</dt>
                                <dd className="font-medium text-foreground">Tersedia untuk Freelance & Kontrak</dd>
                            </div>
                            <div className="flex justify-between py-2 border-b border-border/50">
                                <dt className="text-muted-foreground">Pendidikan</dt>
                                <dd className="font-medium text-foreground">SMKN 1 Jenangan (RPL, 2023–2026)</dd>
                            </div>
                            <div className="flex justify-between py-2 border-b border-border/50">
                                <dt className="text-muted-foreground">Lokasi</dt>
                                <dd className="font-medium text-foreground">{site.location}</dd>
                            </div>
                            <div className="flex justify-between py-2">
                                <dt className="text-muted-foreground">Bahasa</dt>
                                <dd className="font-medium text-foreground">Bahasa Indonesia, English (Technical)</dd>
                            </div>
                        </dl>
                    </ScrollReveal>
                </div>

                {/* Section Linimasa Riwayat Hidup */}
                <div className="border-t border-border/60 pt-16">
                    <ScrollReveal direction="up">
                        <h2 className="text-h2 font-display font-bold text-foreground mb-10">
                            Linimasa Pengalaman & Pendidikan
                        </h2>
                    </ScrollReveal>

                    <div className="relative border-l border-border/80 ml-3 sm:ml-6 space-y-10 py-2 max-w-3xl">
                        {timeline.map((item, idx) => (
                            <ScrollReveal
                                key={idx}
                                direction="left"
                                distance={30}
                                delay={idx * 0.1}
                                className="relative pl-6 sm:pl-8 group"
                            >
                                <div
                                    aria-hidden="true"
                                    className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-background bg-primary ring-4 ring-background"
                                />
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className="font-mono text-xs font-semibold text-primary">
                                        {item.period}
                                    </span>
                                    <span className="text-muted-foreground/40">•</span>
                                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border/50">
                                        {item.type}
                                    </span>
                                </div>
                                <h3 className="font-display font-bold text-lg text-foreground">
                                    {item.position}
                                </h3>
                                <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-3">
                                    {item.institution}
                                </p>
                                <ul className="space-y-1.5 text-xs sm:text-sm text-muted-foreground">
                                    {item.points.map((pt, pIdx) => (
                                        <li key={pIdx} className="flex items-start gap-2">
                                            <span className="text-primary mt-1" aria-hidden="true">▸</span>
                                            <span>{pt}</span>
                                        </li>
                                    ))}
                                </ul>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
