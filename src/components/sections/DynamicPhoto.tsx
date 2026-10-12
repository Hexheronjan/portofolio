"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { site } from "@/lib/site";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

export function DynamicPhoto() {
    return (
        <section aria-label="Profil Singkat" className="section-y relative border-t border-border/60">
            <div className="container-page">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* FOTO PROFIL (portrait-profile.jpg - Slide dari Kiri) */}
                    <ScrollReveal direction="left" distance={45} className="lg:col-span-5 flex justify-center">
                        <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-2xl overflow-hidden border border-border/80 bg-muted shadow-soft">
                            <Image
                                src="/portrait-profile.jpg"
                                alt={`Foto profil ${site.name}`}
                                fill
                                sizes="(max-width: 640px) 90vw, 340px"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
                                <div className="text-white">
                                    <p className="font-display font-bold text-base">{site.name}</p>
                                    <p className="text-xs text-white/80">{site.role}</p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* DESKRIPSI & RINGKASAN PRINSIP KERJA (Slide dari Kanan) */}
                    <ScrollReveal direction="right" distance={45} className="lg:col-span-7 flex flex-col items-start">
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                            Tentang Pendekatan Saya
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
                                <StaggerItem key={i}>
                                    <div className="flex items-start gap-3 p-3.5 rounded-xl border border-border/50 bg-card/60 h-full">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="text-xs sm:text-sm font-semibold text-foreground">
                                                {item.title}
                                            </h4>
                                            <p className="text-xs text-muted-foreground mt-0.5">
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
