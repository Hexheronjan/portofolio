import Image from "next/image";
import Link from "next/link";
import { Download, ArrowUpRight, Trophy, Briefcase, Sparkles, GraduationCap, MapPin } from "lucide-react";
import { timeline } from "@/constants/experience";
import { site } from "@/lib/site";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";

export function AboutContent() {
    return (
        <div className="relative">
            {/* Full-Bleed Dark Obsidian Hero Banner + Floating Quick-Action Bar */}
            <PageHeroBanner
                eyebrow="01 // TENTANG FAUZAN // 2026"
                title="PROFIL &"
                titleAccent="FILOSOFI KERJA"
                description="Memadukan ketelitian rekayasa perangkat lunak dengan estetika desain yang bersih untuk membangun website bisnis dan aplikasi mobile yang cepat, stabil, serta mudah dikelola."
                floatingBar={
                    <div className="rounded-full border border-border bg-card px-2.5 py-2 sm:px-4 sm:py-2.5 shadow-[0_20px_50px_-15px_rgba(23,20,18,0.2)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.65)] flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none min-w-0">
                            <a
                                href="#cerita-profil"
                                className="px-3 py-1.5 rounded-full text-xs font-semibold text-foreground hover:bg-muted transition-colors whitespace-nowrap shrink-0"
                            >
                                Profil
                            </a>
                            <a
                                href="#kesiapan-kerja"
                                className="px-3 py-1.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors whitespace-nowrap shrink-0"
                            >
                                Skema Kerja
                            </a>
                            <a
                                href="#linimasa-karier"
                                className="px-3 py-1.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors whitespace-nowrap shrink-0"
                            >
                                Linimasa
                            </a>
                        </div>
                        <Link
                            href={site.cvPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-ink text-ink-foreground text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-colors shrink-0"
                        >
                            <Download className="h-3.5 w-3.5" />
                            <span>CV</span>
                        </Link>
                    </div>
                }
            />

            {/* Konten Utama di Bawah Banner */}
            <div className="container-page pt-14 sm:pt-20 pb-12">
                {/* 1. Editorial Story + Portrait Split */}
                <section id="cerita-profil" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-20">
                    <ScrollReveal direction="left" className="lg:col-span-7 space-y-5">
                        <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.16em] text-primary">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                            Latar Belakang &amp; Pendekatan
                        </span>
                        <h2 className="text-h2 font-display font-bold tracking-tight text-foreground leading-[1.12]">
                            Berangkat dari kebutuhan nyata akan produk digital yang cepat, rapi, dan dapat diandalkan.
                        </h2>
                        <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                            <p>
                                Halo, saya <strong className="text-foreground font-semibold">{site.name}</strong>, seorang <strong className="text-foreground font-semibold">{site.role}</strong> yang berbasis di Ponorogo, Jawa Timur, Indonesia. Saya berfokus pada perancangan dan pembangunan aplikasi web modern serta aplikasi mobile yang efisien dan fungsional.
                            </p>
                            <p>
                                Saat ini saya bekerja aktif sebagai <strong className="text-foreground font-semibold">Full Stack Developer di Oke Web Indonesia</strong> sekaligus berkontribusi sebagai <strong className="text-foreground font-semibold">Freelance Full Stack &amp; Web Developer di PrajaLinks</strong> untuk merancang berbagai website bisnis dan sistem kustom berskala produksi. Pendidikan di bidang <strong className="text-foreground font-semibold">Rekayasa Perangkat Lunak (RPL) SMK Negeri 1 Jenangan (2023–2026)</strong> memberi fondasi kokoh dalam logika pemrograman, basis data relasional, dan arsitektur sistem.
                            </p>
                            <p>
                                Bagi perusahaan maupun klien yang membutuhkan talenta engineering berdedikasi, saya terbuka untuk berbagai skema kerja yang fleksibel: mulai dari <strong className="text-foreground font-semibold">PKWTT, PKWT, Magang, Freelance</strong>, hingga <strong className="text-foreground font-semibold">Outsourcing</strong> secara <strong className="text-foreground font-semibold">Remote/WFH, WFO, Full-time, Part-time, maupun Shift</strong>.
                            </p>
                        </div>

                        <div className="pt-3 flex flex-wrap gap-3">
                            <Link
                                href="/projects"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-ink-foreground text-xs font-semibold shadow-soft hover:bg-primary hover:text-primary-foreground transition-all"
                            >
                                <span>Lihat Koleksi Proyek</span>
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border bg-card hover:border-primary/50 hover:text-primary text-foreground text-xs font-semibold transition-all"
                            >
                                <span>Hubungi Langsung</span>
                            </Link>
                        </div>
                    </ScrollReveal>

                    {/* Foto Editorial + Frame Offset */}
                    <ScrollReveal direction="right" delay={0.1} className="lg:col-span-5 flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-[380px]">
                            <div
                                aria-hidden="true"
                                className="absolute -bottom-3 -right-3 inset-0 rounded-3xl border border-primary/35 -z-10"
                            />
                            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-border bg-[#151311] shadow-lift">
                                {/* Sorotan studio hangat di belakang potret */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0"
                                    style={{
                                        background:
                                            "radial-gradient(circle at 50% 35%, rgba(224, 122, 82, 0.24), rgba(212, 175, 114, 0.08) 45%, transparent 72%)",
                                    }}
                                />
                                <Image
                                    src="/fototengah.jpg"
                                    alt={`Foto potret ${site.name}`}
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 90vw, 380px"
                                    className="object-contain object-center p-4 pb-16"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#110f0d] via-[#110f0d]/25 to-transparent flex items-end p-6">
                                    <div className="text-[#f4efe8] space-y-1">
                                        <p className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#e07a52]">
                                            <MapPin className="h-3 w-3" />
                                            <span>{site.location}</span>
                                        </p>
                                        <p className="font-display font-bold text-lg leading-tight">
                                            {site.name}
                                        </p>
                                        <p className="text-xs text-[#b8afa5]">
                                            Oke Web Indonesia · PrajaLinks
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </section>

                {/* 2. Bento Ringkasan Profil & Kesiapan Kerja */}
                <section id="kesiapan-kerja" className="mb-20 border-t border-border/70 pt-16">
                    <ScrollReveal direction="up" className="mb-8">
                        <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.16em] text-primary">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                            Ringkasan Eksekutif
                        </span>
                        <h2 className="text-h2 font-display font-bold text-foreground mt-2">
                            Profil Singkat &amp; Kesiapan Kerja
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                        <ScrollReveal direction="left" className="p-6 rounded-2xl border border-border bg-card shadow-soft relative overflow-hidden">
                            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-primary to-transparent" aria-hidden="true" />
                            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                                <Briefcase className="h-5 w-5" />
                            </div>
                            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                                Pekerjaan Aktif
                            </p>
                            <h3 className="font-display font-bold text-base text-foreground mt-1">
                                Oke Web Indonesia
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                                Full Stack Developer · Pengembangan web bisnis &amp; sistem kustom produksi.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal direction="up" delay={0.1} className="p-6 rounded-2xl border border-border bg-card shadow-soft relative overflow-hidden">
                            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-brass to-transparent" aria-hidden="true" />
                            <div className="h-10 w-10 rounded-xl bg-secondary text-brass flex items-center justify-center mb-4">
                                <Sparkles className="h-5 w-5" />
                            </div>
                            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                                Pengalaman Freelance
                            </p>
                            <h3 className="font-display font-bold text-base text-foreground mt-1">
                                PrajaLinks Studio
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                                Freelance Full Stack &amp; Web Developer · Proyek lintas industri berbasis Next.js.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal direction="right" delay={0.18} className="p-6 rounded-2xl border border-border bg-card shadow-soft relative overflow-hidden">
                            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-ink to-transparent" aria-hidden="true" />
                            <div className="h-10 w-10 rounded-xl bg-ink text-ink-foreground flex items-center justify-center mb-4">
                                <GraduationCap className="h-5 w-5" />
                            </div>
                            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                                Pendidikan &amp; Prestasi
                            </p>
                            <h3 className="font-display font-bold text-base text-foreground mt-1">
                                SMKN 1 Jenangan (RPL)
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                                Lulusan RPL (2023–2026) · Juara 2 ITX Web Development UNIDA 2026.
                            </p>
                        </ScrollReveal>
                    </div>

                    {/* Kartu Skema Kerja */}
                    <ScrollReveal direction="up" delay={0.08} className="p-6 sm:p-7 rounded-2xl border border-border bg-card shadow-soft">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground mb-3">
                                    Metode &amp; Format Kerja Siap Diambil
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold">Remote / WFH</span>
                                    <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold">WFO</span>
                                    <span className="text-xs px-3 py-1 rounded-full bg-secondary text-foreground border border-border/70 font-medium">Full Time</span>
                                    <span className="text-xs px-3 py-1 rounded-full bg-secondary text-foreground border border-border/70 font-medium">Part Time</span>
                                    <span className="text-xs px-3 py-1 rounded-full bg-secondary text-foreground border border-border/70 font-medium">Shift</span>
                                </div>
                            </div>
                            <div>
                                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground mb-3">
                                    Skema Hubungan Kerja Perusahaan
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs px-3 py-1 rounded-full bg-ink text-ink-foreground font-semibold">Karyawan Tetap (PKWTT)</span>
                                    <span className="text-xs px-3 py-1 rounded-full bg-ink text-ink-foreground font-semibold">Karyawan Kontrak (PKWT)</span>
                                    <span className="text-xs px-3 py-1 rounded-full bg-secondary text-foreground border border-border/70 font-medium">Magang (Internship)</span>
                                    <span className="text-xs px-3 py-1 rounded-full bg-secondary text-foreground border border-border/70 font-medium">Freelance</span>
                                    <span className="text-xs px-3 py-1 rounded-full bg-secondary text-foreground border border-border/70 font-medium">Outsourcing (Alih Daya)</span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </section>

                {/* 3. Section Linimasa Riwayat Hidup */}
                <section id="linimasa-karier" className="border-t border-border/70 pt-16">
                    <ScrollReveal direction="up" className="mb-10">
                        <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.16em] text-primary">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                            Rekam Jejak
                        </span>
                        <h2 className="text-h2 font-display font-bold text-foreground mt-2">
                            Linimasa Pengalaman, Prestasi &amp; Pendidikan
                        </h2>
                    </ScrollReveal>

                    <div className="relative border-l border-border ml-3 sm:ml-6 space-y-6 py-2 max-w-4xl">
                        {timeline.map((item, idx) => {
                            const isAward = item.type === "Prestasi";
                            return (
                                <ScrollReveal
                                    key={idx}
                                    direction="left"
                                    delay={idx * 0.08}
                                    className="relative pl-6 sm:pl-9 group"
                                >
                                    <div
                                        aria-hidden="true"
                                        className={`absolute -left-[5.5px] top-6 h-2.5 w-2.5 rounded-full border border-background ring-4 ring-background ${
                                            isAward ? "bg-brass" : "bg-primary"
                                        }`}
                                    />
                                    <div className="relative p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-soft hover:shadow-lift hover:border-primary/45 transition-all overflow-hidden">
                                        {isAward && (
                                            <div
                                                className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-primary via-brass to-transparent"
                                                aria-hidden="true"
                                            />
                                        )}
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <span className="font-mono text-xs font-semibold text-primary">
                                                {item.period}
                                            </span>
                                            <span className="text-muted-foreground/40">•</span>
                                            <span
                                                className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                                                    isAward
                                                        ? "bg-primary/10 text-primary border-primary/25"
                                                        : "bg-secondary text-secondary-foreground border-border/60"
                                                }`}
                                            >
                                                {isAward && <Trophy className="h-3 w-3 text-brass" />}
                                                <span>{item.type}</span>
                                            </span>
                                        </div>
                                        <h3 className="font-display font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors">
                                            {item.position}
                                        </h3>
                                        <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-3 mt-0.5">
                                            {item.institution}
                                        </p>
                                        <ul className="space-y-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                            {item.points.map((pt, pIdx) => (
                                                <li key={pIdx} className="flex items-start gap-2">
                                                    <span className="text-primary mt-0.5" aria-hidden="true">▸</span>
                                                    <span>{pt}</span>
                                                </li>
                                            ))}
                                        </ul>
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
