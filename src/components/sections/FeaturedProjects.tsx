"use client";

import { motion } from "framer-motion";
import { projects } from "@/constants/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Section } from "@/components/ui/Section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
    }),
};

export function FeaturedProjects() {
    const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

    return (
        <Section className="relative overflow-hidden bg-transparent py-24 md:py-32">
            {/* Subtle section separator */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

            {/* Background accent blobs — desktop only with smooth ambient animations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] -z-10 rounded-full bg-violet-500/10 blur-[120px] hidden lg:block animate-pulse-ring" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] -z-10 rounded-full bg-blue-500/10 blur-[120px] hidden lg:block animate-float" />

            <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col gap-16">

                {/* ── Section header ────────────────────────────────── */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-50px" }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6"
                >
                    <div>
                        <motion.p
                            variants={fadeUp}
                            custom={0}
                            className="text-xs font-semibold tracking-[0.18em] uppercase text-blue-600 dark:text-blue-400 mb-3"
                        >
                            Karya Pilihan
                        </motion.p>
                        <motion.h2
                            variants={fadeUp}
                            custom={0.08}
                            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight leading-none"
                        >
                            Proyek Unggulan
                        </motion.h2>
                        <motion.p
                            variants={fadeUp}
                            custom={0.16}
                            className="text-muted-foreground text-base sm:text-lg mt-4 max-w-md font-light leading-relaxed"
                        >
                            Seleksi karya terbaik yang mendemonstrasikan
                            keahlian teknis dan desain visual saya.
                        </motion.p>
                    </div>

                    {/* "See all" link — desktop */}
                    <motion.div variants={fadeUp} custom={0.1} className="hidden sm:block shrink-0">
                        <Link
                            href="/projects"
                            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border/60 hover:border-border rounded-full px-5 py-2.5 bg-background/50 transition-all duration-200"
                        >
                            Semua Proyek
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* ── Project cards ─────────────────────────────────── */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-50px" }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.12 } },
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 32 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                                },
                            }}
                        >
                            <ProjectCard {...project} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* ── See all — mobile only ─────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center sm:hidden"
                >
                    <Link
                        href="/projects"
                        className="group w-full inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-all"
                    >
                        Jelajahi Semua Proyek
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </div>
        </Section>
    );
}
