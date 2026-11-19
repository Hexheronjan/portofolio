"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    Trophy,
    Award,
    ExternalLink,
    X,
    Eye,
    FileText,
    Calendar,
    Hash,
    BadgeCheck,
} from "lucide-react";
import { certificates, Certificate } from "@/constants/certificates";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Certificates() {
    const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

    const featuredCert = certificates.find((c) => c.featured);
    const otherCerts = certificates.filter((c) => !c.featured);

    // Tutup modal dengan tombol Escape & kunci scroll latar saat lightbox terbuka
    useEffect(() => {
        if (!selectedCert) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedCert(null);
        };
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [selectedCert]);

    return (
        <section
            id="sertifikat"
            aria-label="Sertifikat & Pencapaian"
            className="section-y relative border-t border-border/70 bg-muted/25 overflow-hidden"
        >
            {/* Aksen latar arsitektural halus */}
            <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[360px] editorial-grid opacity-45 -z-10"
                aria-hidden="true"
            />

            <div className="container-page">
                {/* Header Section + Ringkasan Kredensial */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <ScrollReveal direction="left" className="max-w-2xl">
                        <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.16em] text-primary">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                            04 // Prestasi &amp; Kualifikasi Resmi
                        </span>
                        <h2 className="text-h2 font-display font-bold tracking-tight text-foreground mt-2.5">
                            Penghargaan &amp; Sertifikasi
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base mt-3 leading-relaxed">
                            Bukti pencapaian kompetisi pengembangan web, sertifikasi kompetensi resmi, dan pelatihan profesional yang terdokumentasi.
                        </p>
                    </ScrollReveal>

                    {/* Ringkasan Angka Editorial */}
                    <ScrollReveal direction="right" delay={0.08} className="self-start md:self-auto">
                        <div className="flex items-center gap-4 px-4 py-2.5 rounded-2xl border border-border bg-card shadow-soft">
                            <div className="flex items-center gap-2">
                                <Trophy className="h-4 w-4 text-brass" />
                                <div className="leading-tight">
                                    <p className="font-mono text-xs font-bold text-foreground">Juara 2</p>
                                    <p className="text-[10px] text-muted-foreground">ITX Web Dev</p>
                                </div>
                            </div>
                            <span className="h-7 w-px bg-border" aria-hidden="true" />
                            <div className="flex items-center gap-2">
                                <BadgeCheck className="h-4 w-4 text-primary" />
                                <div className="leading-tight">
                                    <p className="font-mono text-xs font-bold text-foreground">
                                        {String(certificates.length).padStart(2, "0")} Dokumen
                                    </p>
                                    <p className="text-[10px] text-muted-foreground">Resmi &amp; Asli</p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* SPOTLIGHT PRESTASI UTAMA (JUARA 2 ITX 2026) */}
                {featuredCert && (
                    <ScrollReveal direction="center" className="mb-8">
                        <article className="group relative rounded-3xl border border-border bg-card shadow-lift overflow-hidden">
                            {/* Garis aksen copper-brass di sisi atas */}
                            <div
                                className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-ink via-primary to-brass z-10"
                                aria-hidden="true"
                            />

                            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                                {/* Kolom Media: Bingkai Galeri Sertifikat */}
                                <div className="lg:col-span-7 relative p-4 sm:p-6 bg-muted/55 border-b lg:border-b-0 lg:border-r border-border/80 flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedCert(featuredCert)}
                                        aria-label={`Perbesar sertifikat ${featuredCert.title}`}
                                        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border/90 bg-background shadow-lift cursor-pointer group/img focus-visible:ring-2 focus-visible:ring-primary"
                                    >
                                        <Image
                                            src={featuredCert.image}
                                            alt={`Sertifikat resmi ${featuredCert.title}`}
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 58vw"
                                            className="object-cover transition-transform duration-500 ease-out group-hover/img:scale-[1.03]"
                                        />

                                        {/* Badge Medali Melayang */}
                                        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink/90 text-ink-foreground backdrop-blur-md text-[11px] font-mono font-semibold tracking-wide shadow-lift border border-white/10">
                                            <Trophy className="h-3.5 w-3.5 text-[#e07a52]" />
                                            <span>JUARA 2 · ITX 2026</span>
                                        </div>

                                        {/* Overlay Hover Perbesar */}
                                        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#171412] text-xs font-semibold shadow-lift">
                                                <Eye className="h-3.5 w-3.5" />
                                                <span>Perbesar Sertifikat</span>
                                            </span>
                                        </div>
                                    </button>
                                </div>

                                {/* Kolom Dossier / Cerita Prestasi */}
                                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between gap-6">
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[11px] font-mono font-semibold uppercase tracking-wider">
                                                <Trophy className="h-3 w-3" />
                                                <span>{featuredCert.badge || "Prestasi Unggulan"}</span>
                                            </span>
                                            <span className="font-mono text-xs text-muted-foreground">
                                                01 / {String(certificates.length).padStart(2, "0")}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground leading-snug tracking-tight">
                                                {featuredCert.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm font-semibold text-primary mt-1.5">
                                                {featuredCert.issuer}
                                            </p>
                                        </div>

                                        {featuredCert.themeQuote && (
                                            <blockquote className="border-l-2 border-primary/70 bg-muted/50 rounded-r-xl pl-3.5 pr-3 py-2.5 text-xs sm:text-sm text-foreground/90 italic leading-relaxed">
                                                &ldquo;{featuredCert.themeQuote}&rdquo;
                                            </blockquote>
                                        )}

                                        {featuredCert.note && (
                                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                                {featuredCert.note}
                                            </p>
                                        )}

                                        {/* Metadata Resmi */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 pt-2 border-t border-border/70">
                                            {featuredCert.credentialId && (
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Hash className="h-3.5 w-3.5 text-brass shrink-0" />
                                                    <span className="font-mono text-[11px] text-foreground truncate">
                                                        {featuredCert.credentialId}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Calendar className="h-3.5 w-3.5 text-brass shrink-0" />
                                                <span className="font-mono text-[11px] text-foreground">
                                                    {featuredCert.issuedAt}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Aksi Utama */}
                                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/70">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedCert(featuredCert)}
                                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-ink text-ink-foreground text-xs font-semibold shadow-soft hover:bg-primary hover:text-primary-foreground transition-all"
                                        >
                                            <Eye className="h-3.5 w-3.5" />
                                            <span>Pratinjau Penuh</span>
                                        </button>

                                        {featuredCert.pdfUrl && (
                                            <a
                                                href={featuredCert.pdfUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-border bg-background hover:border-primary hover:text-primary text-foreground text-xs font-semibold transition-all"
                                            >
                                                <FileText className="h-3.5 w-3.5" />
                                                <span>Buka PDF Asli</span>
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </article>
                    </ScrollReveal>
                )}

                {/* GALERI SERTIFIKASI LAINNYA (GRID 3 KOLOM: Kiri -> Tengah, Tengah -> Up, Kanan -> Tengah) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {otherCerts.map((cert, idx) => {
                        const dir = idx % 3 === 0 ? "left" : idx % 3 === 1 ? "up" : "right";
                        return (
                            <ScrollReveal
                                key={cert.credentialId || cert.title}
                                direction={dir}
                                delay={(idx % 3) * 0.12}
                                className="h-full flex flex-col"
                            >
                            <article className="group relative flex flex-col h-full rounded-2xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-lift hover:border-primary/45 transition-all duration-300">
                                {/* Garis aksen hover di atas kartu */}
                                <div
                                    className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-primary via-brass to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                                    aria-hidden="true"
                                />

                                {/* Area Preview Bingkai Mat Galeri */}
                                <div className="p-3 bg-muted/45 border-b border-border/60">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedCert(cert)}
                                        aria-label={`Lihat sertifikat ${cert.title}`}
                                        className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-border/80 bg-background block cursor-pointer group/thumb focus-visible:ring-2 focus-visible:ring-primary"
                                    >
                                        <Image
                                            src={cert.image}
                                            alt={`Dokumen sertifikat ${cert.title}`}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover object-top transition-transform duration-500 ease-out group-hover/thumb:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#171412] text-xs font-semibold shadow-lift">
                                                <Eye className="h-3.5 w-3.5" />
                                                <span>Perbesar</span>
                                            </span>
                                        </div>
                                    </button>
                                </div>

                                {/* Detail Sertifikat */}
                                <div className="flex flex-col flex-1 p-5 gap-2.5">
                                    <div className="flex items-center justify-between gap-2 text-xs">
                                        <span className="font-mono text-[11px] font-semibold text-muted-foreground">
                                            {String(idx + 2).padStart(2, "0")} · {cert.issuedAt}
                                        </span>
                                        {cert.verifyUrl ? (
                                            <span className="font-mono text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20 font-semibold">
                                                Terverifikasi
                                            </span>
                                        ) : (
                                            <span className="font-mono text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded-full border border-border/70">
                                                {cert.badge || cert.category}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="font-display font-bold text-base text-foreground leading-snug group-hover:text-primary transition-colors">
                                        {cert.title}
                                    </h3>

                                    <p className="text-xs text-primary font-medium flex items-center gap-1.5">
                                        <Award className="h-3.5 w-3.5 shrink-0 text-brass" />
                                        <span>{cert.issuer}</span>
                                    </p>

                                    {cert.note && (
                                        <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                                            {cert.note}
                                        </p>
                                    )}

                                    {cert.credentialId && (
                                        <p className="font-mono text-[10px] text-muted-foreground/85 truncate mt-1">
                                            ID: {cert.credentialId}
                                        </p>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="pt-3 border-t border-border/60 flex items-center justify-between mt-auto">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedCert(cert)}
                                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-primary transition-colors"
                                        >
                                            <Eye className="h-3.5 w-3.5" />
                                            <span>Lihat Sertifikat</span>
                                        </button>

                                        {cert.verifyUrl && (
                                            <a
                                                href={cert.verifyUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors font-medium"
                                            >
                                                <span>Verifikasi</span>
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </article>
                        </ScrollReveal>
                        );
                    })}
                </div>
            </div>

            {/* Lightbox Modal Premium */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label={`Pratinjau sertifikat: ${selectedCert.title}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-8"
                        onClick={() => setSelectedCert(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 12 }}
                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                            className="relative max-w-4xl w-full bg-card rounded-2xl border border-border overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header Modal */}
                            <div className="flex items-start justify-between gap-4 p-4 sm:p-5 border-b border-border bg-muted/40">
                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        {selectedCert.badge && (
                                            <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold">
                                                {selectedCert.badge}
                                            </span>
                                        )}
                                        <span className="font-mono text-[11px] text-muted-foreground">
                                            {selectedCert.issuedAt}
                                        </span>
                                    </div>
                                    <h3 className="font-display font-bold text-sm sm:text-base text-foreground leading-snug">
                                        {selectedCert.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        {selectedCert.issuer}
                                        {selectedCert.credentialId ? ` · ${selectedCert.credentialId}` : ""}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedCert(null)}
                                    aria-label="Tutup pratinjau"
                                    className="p-2 rounded-full border border-border bg-card hover:bg-muted text-foreground transition-colors shrink-0"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Gambar Sertifikat Asli */}
                            <div className="relative aspect-[4/3] w-full max-h-[68vh] bg-muted/30 flex items-center justify-center">
                                <Image
                                    src={selectedCert.image}
                                    alt={selectedCert.title}
                                    fill
                                    className="object-contain p-3 sm:p-5"
                                    sizes="100vw"
                                />
                            </div>

                            {/* Footer Aksi Modal */}
                            {(selectedCert.pdfUrl || selectedCert.verifyUrl) && (
                                <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 py-3.5 border-t border-border bg-muted/30">
                                    <span className="text-[11px] font-mono text-muted-foreground">
                                        Tekan ESC atau klik di luar untuk menutup
                                    </span>
                                    <div className="flex items-center gap-2.5">
                                        {selectedCert.pdfUrl && (
                                            <a
                                                href={selectedCert.pdfUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ink text-ink-foreground text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                                            >
                                                <FileText className="h-3.5 w-3.5" />
                                                <span>Buka / Unduh PDF</span>
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        )}
                                        {selectedCert.verifyUrl && (
                                            <a
                                                href={selectedCert.verifyUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-card text-foreground text-xs font-semibold hover:border-primary hover:text-primary transition-colors"
                                            >
                                                <span>Verifikasi Online</span>
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
