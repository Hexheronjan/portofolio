"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

const techStack = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Laravel",
    "WordPress",
    "Node.js",
    "Framer Motion",
];

export function Hero() {
    const [heroLogoError, setHeroLogoError] = useState(false);

    return (
        <Section className="min-h-[85vh] flex items-center justify-center relative overflow-hidden">
            {/* Mesh gradient background */}
            <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(96,165,250,0.08),transparent)]" />
            {/* Grid pattern */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            {/* Gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] -z-10 rounded-full bg-primary/10 blur-3xl animate-glow" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 -z-10 rounded-full bg-[var(--highlight)]/10 blur-3xl animate-float" />
            <div className="absolute top-1/2 right-1/3 w-64 h-64 -z-10 rounded-full bg-[var(--highlight)]/5 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
            {/* Floating dots */}
            <div className="absolute top-20 left-[15%] w-2 h-2 rounded-full bg-primary/30 animate-float" style={{ animationDuration: "5s" }} />
            <div className="absolute top-40 right-[20%] w-1.5 h-1.5 rounded-full bg-[var(--highlight)]/40 animate-float" style={{ animationDuration: "7s", animationDelay: "1s" }} />
            <div className="absolute bottom-40 left-[25%] w-1 h-1 rounded-full bg-primary/20 animate-float" style={{ animationDuration: "6s", animationDelay: "0.5s" }} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center w-full max-w-6xl mx-auto px-4 z-10">
                {/* Kiri: teks & CTA */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8 order-2 md:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm font-medium border border-primary/20">
                            Terbuka untuk peluang baru
                        </Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-foreground leading-[1.1]">
                            Standar untuk <br />
                            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/60 bg-[length:200%_auto] animate-gradient">
                                Pengembangan Web Modern
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-muted-foreground max-w-xl leading-relaxed"
                    >
                        Halo, saya <span className="text-foreground font-semibold">Fauzan</span>.
                        Saya menciptakan pengalaman web yang aksesibel, pixel-perfect, dan berperforma tinggi
                        menggunakan teknologi modern.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                    >
                        <Button size="lg" className="group h-12 px-8 text-base shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300" asChild>
                            <Link href="/projects">
                                Lihat Proyek
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-12 px-8 text-base border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300" asChild>
                            <Link href="/contact">Hubungi Saya</Link>
                        </Button>
                    </motion.div>
                </div>

                {/* Kanan: logo (foto terpisah dari logo navbar) */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center justify-center order-1 md:order-2"
                >
                    {!heroLogoError ? (
                        <div className="relative w-full max-w-sm md:max-w-md aspect-square">
                            <Image
                                src="/hero-logo.png"
                                alt="Logo Pengembangan Web"
                                fill
                                className="object-contain drop-shadow-2xl"
                                unoptimized
                                onError={() => setHeroLogoError(true)}
                            />
                        </div>
                    ) : (
                        <div className="w-full max-w-sm md:max-w-md aspect-square rounded-2xl border-2 border-dashed border-primary/20 flex items-center justify-center bg-primary/5">
                            <p className="text-sm text-muted-foreground text-center px-4">
                                Logo di sini
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Teknologi - full width di bawah */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="w-full max-w-4xl mx-auto pt-16 pb-4 z-10"
            >
                <p className="text-sm text-muted-foreground mb-4 font-medium uppercase tracking-wider text-center">
                    Teknologi
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                    {techStack.map((tech, index) => (
                        <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Badge
                                variant="outline"
                                className="px-3 py-1.5 bg-background/50 backdrop-blur-sm border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-default"
                            >
                                {tech}
                            </Badge>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </Section>
    );
}
