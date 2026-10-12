"use client";

import { timeline } from "@/constants/experience";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Journey() {
    return (
        <section aria-label="Riwayat Pengalaman & Pendidikan" className="section-y relative border-t border-border/60">
            <div className="container-page">
                {/* Header */}
                <ScrollReveal direction="up" className="max-w-2xl mb-12">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Perjalanan Karier
                    </span>
                    <h2 className="text-h2 font-display font-bold tracking-tight text-foreground mt-2">
                        Pengalaman & Pendidikan
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base mt-3">
                        Linimasa tahapan belajar, sertifikasi, serta kontribusi dalam proyek web nyata.
                    </p>
                </ScrollReveal>

                {/* Vertical Timeline Rapi (Satu sumber data, tanpa klon ganda) */}
                <div className="relative border-l border-border/80 ml-3 sm:ml-6 space-y-10 py-2">
                    {timeline.map((item, idx) => (
                        <ScrollReveal
                            key={idx}
                            direction="left"
                            distance={30}
                            delay={idx * 0.12}
                            className="relative pl-6 sm:pl-8 group"
                        >
                            {/* Titik Lingkaran Timeline */}
                            <div
                                aria-hidden="true"
                                className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-background bg-primary ring-4 ring-background transition-transform group-hover:scale-125"
                            />

                            {/* Badge Periode & Tipe */}
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="font-mono text-xs font-semibold text-primary">
                                    {item.period}
                                </span>
                                <span className="text-muted-foreground/40">•</span>
                                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border/50">
                                    {item.type}
                                </span>
                            </div>

                            {/* Judul Posisi & Institusi */}
                            <h3 className="font-display font-bold text-lg text-foreground">
                                {item.position}
                            </h3>
                            <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-3">
                                {item.institution}
                            </p>

                            {/* Poin-poin Pencapaian */}
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
        </section>
    );
}
