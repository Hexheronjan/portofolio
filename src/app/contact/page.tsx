"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Loader2, Send, Github, Linkedin } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    const socialLinks = [
        { name: "GitHub", href: "https://github.com/Hexheronjan", icon: Github },
        { name: "LinkedIn", href: "https://www.linkedin.com/in/fauzan-bagus-prasetyo-bisnis-b8315738b", icon: Linkedin },
    ];

    return (
        <div className="flex flex-col relative">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-96 h-96 -z-10 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute bottom-1/4 left-0 w-64 h-64 -z-10 rounded-full bg-primary/5 blur-3xl" />

            <Section className="pb-8">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            Hubungi Saya
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8">
                            Punya ide proyek atau ingin berkolaborasi? Jangan ragu untuk menghubungi saya.
                            Saya selalu terbuka untuk mendiskusikan proyek baru, ide kreatif, atau
                            peluang untuk menjadi bagian dari visi Anda.
                        </p>

                        <div className="space-y-6">
                            <a
                                href="mailto:fauzanbagusprasetyobisnis@gmail.com"
                                className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group p-3 rounded-xl hover:bg-secondary/50"
                            >
                                <div className="bg-secondary p-3 rounded-full group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <span className="text-lg font-medium">fauzanbagusprasetyobisnis@gmail.com</span>
                            </a>

                            <a
                                href="tel:+6282338689711"
                                className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group p-3 rounded-xl hover:bg-secondary/50"
                            >
                                <div className="bg-secondary p-3 rounded-full group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <span className="text-lg font-medium">082338689711</span>
                            </a>

                            <div className="pt-8">
                                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                                    Ikuti Saya
                                </h3>
                                <div className="flex gap-4">
                                    {socialLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className="bg-secondary p-3 rounded-full text-foreground hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:-rotate-6 transition-all duration-300"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={link.name}
                                        >
                                            <link.icon className="h-5 w-5" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                            <CardContent className="p-6 md:p-8">
                                {isSuccess ? (
                                    <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
                                        <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-4 rounded-full mb-2">
                                            <Send className="h-8 w-8" />
                                        </div>
                                        <h3 className="text-2xl font-bold">Pesan Terkirim!</h3>
                                        <p className="text-muted-foreground">
                                            Terima kasih telah menghubungi. Saya akan segera membalas pesan Anda.
                                        </p>
                                        <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-4">
                                            Kirim pesan lain
                                        </Button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label htmlFor="name" className="text-sm font-medium">
                                                    Nama
                                                </label>
                                                <Input id="name" placeholder="John Doe" required />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="email" className="text-sm font-medium">
                                                    Email
                                                </label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="subject" className="text-sm font-medium">
                                                Subjek
                                            </label>
                                            <Input
                                                id="subject"
                                                placeholder="Tentang apa ini?"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="message" className="text-sm font-medium">
                                                Pesan
                                            </label>
                                            <Textarea
                                                id="message"
                                                placeholder="Ceritakan tentang proyek Anda..."
                                                required
                                                className="min-h-[150px]"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full h-12 text-base"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Mengirim...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="mr-2 h-4 w-4" />
                                                    Kirim Pesan
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </Section>
        </div>
    );
}
