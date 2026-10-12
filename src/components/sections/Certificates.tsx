"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, ExternalLink, X, Eye } from "lucide-react";
import { certificates, Certificate } from "@/constants/certificates";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Certificates() {
    const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

    return (
        <section aria-label="Sertifikat & Pencapaian" className="section-y relative border-t border-border/60 bg-muted/20">
            <div className="container-page">
                {/* Header Section */}
                <ScrollReveal direction="up" className="max-w-2xl mb-12">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Kualifikasi Resmi
                    </span>
                    <h2 className="text-h2 font-display font-bold tracking-tight text-foreground mt-2">
                        Sertifikasi & Pencapaian
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base mt-3">
                        Bukti kompetensi terverifikasi melalui uji kompetensi resmi dan lembaga pelatihan industri terpercaya.
                    </p>
                </ScrollReveal>

                {/* Grid Sertifikat (Variasi Kiri, Tengah, Kanan) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert, idx) => {
                        const dir: "left" | "center" | "right" = idx % 3 === 0 ? "left" : idx % 3 === 1 ? "center" : "right";
                        return (
                            <ScrollReveal
                                key={idx}
                                direction={dir}
                                delay={idx * 0.1}
                                distance={35}
                                className="h-full flex flex-col"
                            >
                                <div className="group flex flex-col h-full rounded-2xl border border-border/70 bg-card overflow-hidden shadow-soft hover:shadow-lift hover:border-primary/40 transition-all duration-300">
                                    {/* Gambar Sertifikat dengan Tombol Lightbox */}
                                    <div
                                        onClick={() => setSelectedCert(cert)}
                                        className="relative aspect-[4/3] w-full overflow-hidden bg-muted cursor-pointer"
                                    >
                                        <Image
                                            src={cert.image}
                                            alt={`Foto fisik ${cert.title}`}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-semibold shadow-lg">
                                                <Eye className="h-3.5 w-3.5" />
                                                <span>Perbesar</span>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Detail Sertifikat */}
                                    <div className="flex flex-col flex-1 p-5 gap-2.5">
                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <span className="font-mono">{cert.issuedAt}</span>
                                            {cert.credentialId && (
                                                <span className="font-mono text-[10px] bg-secondary px-2 py-0.5 rounded border border-border/50">
                                                    {cert.year}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="font-display font-bold text-base text-foreground leading-snug">
                                            {cert.title}
                                        </h3>

                                        <p className="text-xs text-primary font-medium">
                                            {cert.issuer}
                                        </p>

                                        {cert.note && (
                                            <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                                                {cert.note}
                                            </p>
                                        )}

                                        {/* Action Buttons */}
                                        <div className="pt-3 border-t border-border/60 flex items-center justify-between mt-auto">
                                            <button
                                                type="button"
                                                onClick={() => setSelectedCert(cert)}
                                                className="text-xs font-semibold text-foreground hover:text-primary transition-colors"
                                            >
                                                Lihat Sertifikat
                                            </button>

                                            {cert.verifyUrl && (
                                                <a
                                                    href={cert.verifyUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                                                >
                                                    <span>Verifikasi</span>
                                                    <ExternalLink className="h-3 w-3" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedCert && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Pratinjau sertifikat: ${selectedCert.title}`}
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
                    onClick={() => setSelectedCert(null)}
                >
                    <div
                        className="relative max-w-4xl w-full bg-card rounded-2xl border border-border overflow-hidden shadow-2xl flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Modal */}
                        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                            <div>
                                <h3 className="font-display font-bold text-sm sm:text-base text-foreground">
                                    {selectedCert.title}
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    {selectedCert.issuer} • {selectedCert.issuedAt}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedCert(null)}
                                aria-label="Tutup pratinjau"
                                className="p-2 rounded-full hover:bg-muted text-foreground transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Gambar Sertifikat Asli di Lightbox */}
                        <div className="relative aspect-[4/3] w-full max-h-[75vh] bg-black/10 flex items-center justify-center">
                            <Image
                                src={selectedCert.image}
                                alt={selectedCert.title}
                                fill
                                className="object-contain p-2"
                                sizes="100vw"
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
