"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { site, mailtoUrl, whatsappUrl } from "@/lib/site";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Footer() {
    return (
        <footer className="mt-20 border-t border-border bg-card/40 transition-colors">
            {/* CTA Section singkat sebelum footer */}
            <div data-bg-intensity="0.75" className="border-b border-border/60 py-16">
                <ScrollReveal direction="up" className="container-page flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    <div className="max-w-xl">
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                            Mari Berkolaborasi
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-foreground mt-2">
                            Punya ide proyek web atau aplikasi mobile yang ingin diwujudkan?
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base mt-2">
                            Terbuka untuk kesempatan freelance, proyek baru, atau diskusi teknis. Hubungi saya langsung.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-soft hover:opacity-95 transition-all"
                        >
                            <span>Hubungi Saya</span>
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-border bg-background hover:bg-muted text-foreground font-medium text-sm transition-all"
                        >
                            <span>WhatsApp</span>
                        </a>
                    </div>
                </ScrollReveal>
            </div>

            {/* Bagian bawah footer */}
            <div className="py-10">
                <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-6">
                    {/* Brand & Ringkasan (Slide dari Kiri) */}
                    <ScrollReveal direction="left" className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/set.png"
                                alt=""
                                aria-hidden="true"
                                width={28}
                                height={28}
                                className="h-7 w-7 object-contain"
                            />
                            <span className="font-display font-bold text-base tracking-tight">
                                {site.name}
                            </span>
                        </div>
                        <span className="hidden sm:inline text-muted-foreground/40">•</span>
                        <p className="text-xs text-muted-foreground">
                            © {new Date().getFullYear()} {site.shortName}. Seluruh hak cipta dilindungi.
                        </p>
                    </ScrollReveal>

                    {/* Media Sosial dengan Ikon + Label (Slide dari Kanan) */}
                    <ScrollReveal direction="right">
                        <nav aria-label="Tautan Sosial Media" className="flex items-center gap-4">
                            <a
                                href={site.socials.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Kunjungi profil GitHub Fauzan"
                                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-muted"
                            >
                                <Github className="h-4 w-4" />
                                <span>GitHub</span>
                            </a>
                            <a
                                href={site.socials.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Kunjungi profil LinkedIn Fauzan"
                                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-muted"
                            >
                                <Linkedin className="h-4 w-4" />
                                <span>LinkedIn</span>
                            </a>
                            <a
                                href={mailtoUrl}
                                aria-label="Kirim email ke Fauzan"
                                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-muted"
                            >
                                <Mail className="h-4 w-4" />
                                <span>Email</span>
                            </a>
                        </nav>
                    </ScrollReveal>
                </div>
            </div>
        </footer>
    );
}
