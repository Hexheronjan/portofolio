"use client";

import { Trophy } from "lucide-react";
import { timeline } from "@/constants/experience";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Journey() {
    return (
        <section aria-label="Riwayat Pengalaman & Pendidikan" className="section-y relative border-t border-border/60">
            <div className="container-page">
                {/* Header */}
                <ScrollReveal direction="up" className="max-w-2xl mb-12">
                    <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.16em] text-primary">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                        05 // Perjalanan Karier
                    </span>
                    <h2 className="text-h2 font-display font-bold tracking-tight text-foreground mt-2.5">
                        Pengalaman, Prestasi &amp; Pendidikan
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base mt-3">
                        Linimasa pencapaian kompetisi, pengalaman profesional, serta kontribusi dalam proyek web nyata.
                    </p>
                </ScrollReveal>

                {/* Vertical Timeline dengan Kartu Editorial */}
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
                                {/* Titik Lingkaran Timeline */}
                                <div
                                    aria-hidden="true"
                                    className={`absolute -left-[5.5px] top-6 h-2.5 w-2.5 rounded-full border border-background ring-4 ring-background transition-transform group-hover:scale-125 ${
                                        isAward ? "bg-brass" : "bg-primary"
                                    }`}
                                />

                                <div className="relative p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-soft hover:shadow-lift hover:border-primary/45 transition-all duration-300 overflow-hidden">
                                    {isAward && (
                                        <div
                                            className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-primary via-brass to-transparent"
                                            aria-hidden="true"
                                        />
                                    )}

                                    {/* Badge Periode & Tipe */}
                                    <div className="flex flex-wrap items-center gap-2 mb-2.5">
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

                                    {/* Judul Posisi & Institusi */}
                                    <h3 className="font-display font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors">
                                        {item.position}
                                    </h3>
                                    <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-3 mt-0.5">
                                        {item.institution}
                                    </p>

                                    {/* Poin-poin Pencapaian */}
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
            </div>
        </section>
    );
}
