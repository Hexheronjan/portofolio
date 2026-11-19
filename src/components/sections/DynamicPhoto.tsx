"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

export function DynamicPhoto() {
    return (
        <section aria-label="Profil Singkat" className="section-y relative border-t border-border/60">
            <div className="container-page">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* FOTO PROFIL STUDIO (fototengah.jpg) */}
                    <ScrollReveal direction="left" className="lg:col-span-5 flex justify-center">
                        <div className="relative w-full max-w-[340px]">
                            {/* Bingkai arsitektural offset */}
                            <div
                                aria-hidden="true"
                                className="absolute -bottom-3 -right-3 inset-0 rounded-2xl border border-primary/35 -z-10"
                            />
                            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-[#151311] shadow-lift">
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
                                    alt={`Foto profil ${site.name}`}
                                    fill
                                    sizes="(max-width: 640px) 90vw, 340px"
                                    className="object-contain object-center p-4 pb-16"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#110f0d] via-[#110f0d]/25 to-transparent flex items-end p-5">
                                    <div className="text-[#f4efe8]">
                                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#e07a52] mb-1">
                                            {site.location}
                                        </p>
                                        <p className="font-display font-bold text-base">{site.name}</p>
                                        <p className="text-xs text-[#b8afa5]">{site.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* DESKRIPSI & RINGKASAN PRINSIP KERJA */}
                    <ScrollReveal direction="right" delay={0.08} className="lg:col-span-7 flex flex-col items-start">
                        <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.16em] text-primary">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                            03 // Tentang Pendekatan Saya
                        </span>
                        
                        <h2 className="text-h2 font-display font-bold tracking-tight text-foreground mt-2">
                            Membangun sistem yang handal, cepat, dan mudah dipelihara.
                        </h2>

                        <p className="mt-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
                            Sebagai pengembang web dan aplikasi mobile, saya menitikberatkan pada kesederhanaan kode, kemudahan operasional bagi pemilik bisnis, serta pengalaman visual yang responsif di berbagai perangkat.
                        </p>

                        <StaggerContainer className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full" staggerDelay={0.08}>
                            {[
                                {
                                    title: "Kode Bersih & Terstruktur",
                                    desc: "Memastikan arsitektur web rapi sehingga mudah dikembangkan di masa mendatang.",
                                },
                                {
                                    title: "Fokus Kebutuhan Bisnis",
                                    desc: "Mengutamakan solusi yang langsung menjawab tujuan konversi dan kebutuhan pengguna.",
                                },
                                {
                                    title: "Responsif & Aksesibel",
                                    desc: "Tampilan mulus dari smartphone 360px hingga layar desktop beresolusi tinggi.",
                                },
                                {
                                    title: "Dukungan Purna Jual",
                                    desc: "Komunikasi transparan dan bantuan teknis pasca-peluncuran situs.",
                                },
                            ].map((item, i) => (
                                <StaggerItem key={i} direction={i % 2 === 0 ? "left" : "right"}>
                                    <div className="group flex items-start gap-3 p-4 rounded-xl border border-border/80 bg-card hover:border-primary/45 shadow-soft transition-all h-full">
                                        <span className="font-mono text-[11px] font-bold text-primary bg-primary/10 border border-primary/20 rounded-lg px-2 py-1 shrink-0">
                                            0{i + 1}
                                        </span>
                                        <div>
                                            <h4 className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                                {item.title}
                                            </h4>
                                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>

                        <div className="mt-8 flex items-center gap-4">
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                            >
                                <span>Pelajari latar belakang saya lebih lanjut</span>
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </ScrollReveal>

                </div>
            </div>
        </section>
    );
}
