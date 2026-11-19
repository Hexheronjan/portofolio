"use client";

import { useState } from "react";
import {
    Mail,
    MessageSquare,
    Send,
    CheckCircle2,
    ArrowUpRight,
    Clock,
    MapPin,
    Headset,
    Copy,
    Check,
} from "lucide-react";
import { site, whatsappUrl, mailtoUrl } from "@/lib/site";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";

export function ContactContent() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [emailCopied, setEmailCopied] = useState(false);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const encodedText = encodeURIComponent(
            `Halo Fauzan, saya ${name} (${email}).\n\nPesan:\n${message}`
        );
        window.open(`https://wa.me/${site.phoneIntl}?text=${encodedText}`, "_blank");
        setSubmitted(true);
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(site.email);
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
    };

    return (
        <div className="relative">
            {/* Full-Bleed Dark Obsidian Hero Banner + Floating Quick-Connect Bar */}
            <PageHeroBanner
                eyebrow="04 // KONTAK & KOLABORASI // 2026"
                title="MULAI DISKUSI"
                titleAccent="PROYEK ANDA"
                description="Punya ide website bisnis, aplikasi mobile, kebutuhan rekrutmen, atau proyek freelance? Hubungi saya langsung melalui WhatsApp, email resmi, atau formulir di bawah ini."
                icon={<Headset className="h-3.5 w-3.5" />}
                floatingBar={
                    <div className="rounded-2xl sm:rounded-full border border-border bg-card px-4 py-3 sm:px-5 sm:py-2.5 shadow-[0_20px_50px_-15px_rgba(23,20,18,0.2)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.65)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                            <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                            </span>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-foreground truncate">
                                    Aktif merespons · Senin – Sabtu, 08:00 – 21:00 WIB
                                </p>
                                <p className="font-mono text-[11px] text-muted-foreground truncate">
                                    {site.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                type="button"
                                onClick={handleCopyEmail}
                                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full border border-border bg-secondary text-xs font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors flex-1 sm:flex-none"
                            >
                                {emailCopied ? (
                                    <>
                                        <Check className="h-3.5 w-3.5 text-primary" />
                                        <span>Tersalin</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-3.5 w-3.5" />
                                        <span>Salin Email</span>
                                    </>
                                )}
                            </button>
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-ink text-ink-foreground text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-colors flex-1 sm:flex-none"
                            >
                                <MessageSquare className="h-3.5 w-3.5" />
                                <span>WhatsApp</span>
                            </a>
                        </div>
                    </div>
                }
            />

            {/* Konten Utama */}
            <div className="container-page pt-14 sm:pt-20 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                    {/* Kolom Kiri: Saluran Kontak Langsung & Status Rekrutmen */}
                    <ScrollReveal direction="left" delay={0.05} className="lg:col-span-5 space-y-4">
                        {/* WhatsApp Card */}
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lift transition-all duration-200 shadow-soft group"
                        >
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="h-12 w-12 rounded-xl bg-ink text-ink-foreground group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center shrink-0 transition-colors duration-200">
                                    <MessageSquare className="h-5 w-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                                        Chat Cepat via WhatsApp
                                    </p>
                                    <p className="text-base font-display font-semibold text-foreground mt-0.5 truncate">
                                        {site.phoneDisplay}
                                    </p>
                                </div>
                            </div>
                            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                        </a>

                        {/* Email Card */}
                        <a
                            href={mailtoUrl}
                            className="flex items-center justify-between gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lift transition-all duration-200 shadow-soft group"
                        >
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary border border-primary/15 group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center shrink-0 transition-colors duration-200">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                                        Kirim Email Resmi
                                    </p>
                                    <p className="text-sm sm:text-base font-display font-semibold text-foreground truncate mt-0.5">
                                        {site.email}
                                    </p>
                                </div>
                            </div>
                            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                        </a>

                        {/* Lokasi & Jam Respons */}
                        <div className="p-5 rounded-2xl border border-border/80 bg-muted/45 space-y-2.5">
                            <div className="flex items-center gap-2 text-foreground">
                                <Clock className="h-4 w-4 text-primary shrink-0" />
                                <h3 className="font-display font-bold text-sm">
                                    Waktu Respons Cepat
                                </h3>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Senin – Sabtu, 08:00 – 21:00 WIB. Pesan WhatsApp umumnya dibalas dalam waktu kurang dari 2 jam.
                            </p>
                            <div className="pt-1 flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
                                <MapPin className="h-3.5 w-3.5 text-brass shrink-0" />
                                <span>{site.location}</span>
                            </div>
                        </div>

                        {/* Box Penawaran Rekrutmen Perusahaan */}
                        <div className="p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-soft space-y-3 relative overflow-hidden">
                            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-primary via-brass to-transparent" aria-hidden="true" />
                            <h3 className="font-display font-bold text-sm text-foreground flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                                <span>Terbuka Rekrutmen &amp; Kolaborasi</span>
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Bekerja aktif sebagai Full Stack Developer di Oke Web Indonesia &amp; Freelance di PrajaLinks, serta terbuka untuk peluang kerja sama dan penempatan kerja baru:
                            </p>
                            <div className="flex flex-wrap gap-1.5 text-[11px] pt-1">
                                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold">
                                    PKWTT (Tetap)
                                </span>
                                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold">
                                    PKWT (Kontrak)
                                </span>
                                {["Remote / WFH", "WFO", "Full Time", "Part Time", "Shift", "Magang", "Freelance", "Outsourcing"].map((label) => (
                                    <span
                                        key={label}
                                        className="px-2.5 py-1 rounded-full bg-secondary text-foreground border border-border/70 font-medium"
                                    >
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Kolom Kanan: Formulir Kontak */}
                    <ScrollReveal direction="right" delay={0.12} className="lg:col-span-7">
                        <div className="relative p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-lift overflow-hidden">
                            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-ink via-primary to-brass" aria-hidden="true" />

                            <div className="mb-6">
                                <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-primary font-semibold">
                                    Direct Message
                                </span>
                                <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground mt-1">
                                    Kirim Pesan Langsung
                                </h2>
                                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                                    Draf pesan akan langsung diarahkan ke WhatsApp untuk respons instan.
                                </p>
                            </div>

                            {submitted ? (
                                <div className="flex flex-col items-center justify-center text-center py-12 space-y-3">
                                    <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                        <CheckCircle2 className="h-8 w-8" />
                                    </div>
                                    <h3 className="font-display font-bold text-lg text-foreground">
                                        Pesan Diteruskan!
                                    </h3>
                                    <p className="text-xs sm:text-sm text-muted-foreground max-w-sm leading-relaxed">
                                        Aplikasi WhatsApp Anda telah dibuka dengan draf pesan. Jika belum terkirim, Anda juga dapat menghubungi saya via email resmi.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setSubmitted(false)}
                                        className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-secondary text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
                                    >
                                        Kirim pesan lain
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleFormSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="contact-name" className="block text-xs font-semibold text-foreground mb-1.5">
                                                Nama Anda *
                                            </label>
                                            <input
                                                id="contact-name"
                                                type="text"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Nama atau perusahaan"
                                                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/65 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="contact-email" className="block text-xs font-semibold text-foreground mb-1.5">
                                                Email Anda *
                                            </label>
                                            <input
                                                id="contact-email"
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="nama@email.com"
                                                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/65 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="contact-message" className="block text-xs font-semibold text-foreground mb-1.5">
                                            Rincian Pesan / Kebutuhan Proyek *
                                        </label>
                                        <textarea
                                            id="contact-message"
                                            required
                                            rows={5}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Jelaskan kebutuhan website, aplikasi mobile, atau posisi kerja sama yang ingin didiskusikan..."
                                            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/65 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-ink text-ink-foreground font-semibold text-sm shadow-soft hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-pointer"
                                    >
                                        <Send className="h-4 w-4" />
                                        <span>Kirimkan ke WhatsApp</span>
                                    </button>
                                </form>
                            )}
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
}
