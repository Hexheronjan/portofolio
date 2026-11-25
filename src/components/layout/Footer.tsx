"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail, ArrowUpRight, MessageSquare } from "lucide-react";
import { site, mailtoUrl, whatsappUrl } from "@/lib/site";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Footer() {
    return (
        <footer className="mt-20 border-t border-border bg-card/55 transition-colors pb-28 md:pb-0">
            {/* Editorial Obsidian CTA Card */}
            <div className="container-page pt-14 pb-10">
                <ScrollReveal direction="up">
                    <div className="relative rounded-3xl overflow-hidden bg-[#141210] text-[#f4efe8] border border-white/10 shadow-lift px-6 py-10 sm:px-12 sm:py-14">
                        {/* Grid & Warm Copper Glow */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 opacity-40"
                            style={{
                                backgroundImage:
                                    "linear-gradient(to right, rgba(244, 239, 232, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(244, 239, 232, 0.05) 1px, transparent 1px)",
                                backgroundSize: "40px 40px",
                            }}
                        />
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-[95px]"
                            style={{
                                background:
                                    "radial-gradient(circle, rgba(224, 122, 82, 0.35), transparent 70%)",
                            }}
                        />

                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                            <div className="max-w-xl">
                                <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.16em] text-[#e07a52]">
                                    <span
                                        className="h-1.5 w-1.5 rounded-full bg-[#e07a52]"
                                        aria-hidden="true"
                                    />
                                    Mari Berkolaborasi
                                </span>
                                <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight text-[#f4efe8] mt-3 leading-[1.12]">
                                    Punya ide proyek web atau aplikasi yang ingin{" "}
                                    <span className="font-editorial text-[#e07a52] font-normal text-[1.12em]">
                                        diwujudkan?
                                    </span>
                                </h2>
                                <p className="text-[#b8afa5] text-sm sm:text-base mt-3 leading-relaxed">
                                    Terbuka untuk kesempatan full-time, freelance, proyek baru, atau
                                    diskusi teknis. Hubungi saya langsung.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#e07a52] text-[#140d0a] font-semibold text-sm shadow-lift hover:bg-[#f4efe8] transition-all flex-1 sm:flex-none"
                                >
                                    <span>Hubungi Saya</span>
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/12 text-[#f4efe8] font-medium text-sm transition-all flex-1 sm:flex-none"
                                >
                                    <MessageSquare className="h-4 w-4 text-[#e07a52]" />
                                    <span>WhatsApp</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* Bagian bawah footer */}
            <div className="py-8 border-t border-border/60">
                <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-6">
                    {/* Brand & Ringkasan */}
                    <ScrollReveal
                        direction="left"
                        className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left"
                    >
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
                            © {new Date().getFullYear()} {site.shortName}. Seluruh hak cipta
                            dilindungi.
                        </p>
                    </ScrollReveal>

                    {/* Media Sosial */}
                    <ScrollReveal direction="right">
                        <nav aria-label="Tautan Sosial Media" className="flex items-center gap-3">
                            <a
                                href={site.socials.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Kunjungi profil GitHub Fauzan"
                                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-full border border-transparent hover:border-border hover:bg-muted"
                            >
                                <Github className="h-4 w-4" />
                                <span>GitHub</span>
                            </a>
                            <a
                                href={site.socials.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Kunjungi profil LinkedIn Fauzan"
                                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-full border border-transparent hover:border-border hover:bg-muted"
                            >
                                <Linkedin className="h-4 w-4" />
                                <span>LinkedIn</span>
                            </a>
                            <a
                                href={mailtoUrl}
                                aria-label="Kirim email ke Fauzan"
                                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-full border border-transparent hover:border-border hover:bg-muted"
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
