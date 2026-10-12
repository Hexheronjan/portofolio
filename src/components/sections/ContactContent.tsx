"use client";

import { useState } from "react";
import { Mail, Phone, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { site, whatsappUrl, mailtoUrl } from "@/lib/site";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ContactContent() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Integrasi form kirim langsung via WhatsApp / Mailto nyata agar pesan benar-benar terkirim
        const encodedText = encodeURIComponent(
            `Halo Fauzan, saya ${name} (${email}).\n\nPesan:\n${message}`
        );
        window.open(`https://wa.me/${site.phoneIntl}?text=${encodedText}`, "_blank");
        setSubmitted(true);
    };

    return (
        <div className="section-y relative">
            <div className="container-page">
                {/* Header (Slide Up) */}
                <ScrollReveal direction="up" className="max-w-2xl mb-12">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Kontak & Konsultasi
                    </span>
                    <h1 className="text-display font-display font-bold tracking-tight text-foreground mt-2">
                        Hubungi Saya
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base mt-3">
                        Punya proyek yang ingin didiskusikan, pertanyaan teknis, atau penawaran kerja sama? Silakan hubungi saya melalui saluran langsung di bawah ini.
                    </p>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Kolom Informasi Saluran Kontak Langsung (Slide dari Kiri) */}
                    <ScrollReveal direction="left" distance={40} className="lg:col-span-5 space-y-6">
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-5 rounded-2xl border border-border/80 bg-card hover:border-emerald-500/50 hover:bg-muted/40 transition-all shadow-soft group"
                        >
                            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                <MessageSquare className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground font-medium">Chat Cepat via WhatsApp</p>
                                <p className="text-base font-semibold text-foreground mt-0.5">{site.phoneDisplay}</p>
                            </div>
                        </a>

                        <a
                            href={mailtoUrl}
                            className="flex items-center gap-4 p-5 rounded-2xl border border-border/80 bg-card hover:border-primary/50 hover:bg-muted/40 transition-all shadow-soft group"
                        >
                            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                <Mail className="h-6 w-6" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-xs text-muted-foreground font-medium">Kirim Email Resmi</p>
                                <p className="text-sm sm:text-base font-semibold text-foreground truncate mt-0.5">{site.email}</p>
                            </div>
                        </a>

                        <div className="p-6 rounded-2xl border border-border/60 bg-muted/30">
                            <h3 className="font-display font-bold text-sm text-foreground mb-2">
                                Waktu Respons Cepat
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Jam aktif komunikasi: Senin – Sabtu, 08:00 – 21:00 WIB. Saya biasanya merespons pesan WhatsApp dalam kurun waktu kurang dari 2 jam.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Formulir Kontak Nyata (Slide dari Kanan) */}
                    <ScrollReveal direction="right" distance={40} className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-border/80 bg-card shadow-soft">
                        <h2 className="font-display font-bold text-xl text-foreground mb-2">
                            Kirim Pesan Langsung
                        </h2>
                        <p className="text-xs text-muted-foreground mb-6">
                            Pesan Anda akan otomatis diarahkan ke WhatsApp untuk respons instan.
                        </p>

                        {submitted ? (
                            <div className="flex flex-col items-center justify-center text-center py-10 space-y-3">
                                <CheckCircle2 className="h-12 w-12 text-emerald-500 animate-bounce" />
                                <h3 className="font-display font-bold text-lg text-foreground">
                                    Pesan Diteruskan!
                                </h3>
                                <p className="text-xs text-muted-foreground max-w-sm">
                                    Aplikasi WhatsApp Anda telah dibuka dengan draf pesan. Jika belum terkirim, Anda juga dapat menghubungi via email.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setSubmitted(false)}
                                    className="mt-4 text-xs font-semibold text-primary underline"
                                >
                                    Kirim pesan lain
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleFormSubmit} className="space-y-4">
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
                                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
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
                                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contact-message" className="block text-xs font-semibold text-foreground mb-1.5">
                                        Rincian Pesan / Kebutuhan Proyek *
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        required
                                        rows={4}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Jelaskan kebutuhan website atau aplikasi yang ingin Anda bangun..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-soft hover:opacity-95 transition-all cursor-pointer"
                                >
                                    <Send className="h-4 w-4" />
                                    <span>Kirimkan ke WhatsApp</span>
                                </button>
                            </form>
                        )}
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
}
