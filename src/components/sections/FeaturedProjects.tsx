"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { projects } from "@/constants/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Section } from "@/components/ui/Section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeaturedProjects() {
    const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Each card scrolls at a different vertical speed → strong depth illusion
    const y0 = useSpring(useTransform(scrollYProgress, [0, 1], [100, -80]),  { stiffness: 60, damping: 18 });
    const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [160, -120]), { stiffness: 60, damping: 18 });
    const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [80,  -60]),  { stiffness: 60, damping: 18 });
    const yOffsets = [y0, y1, y2];

    const titleY = useTransform(scrollYProgress, [0, 1], [50, -30]);

    return (
        <div ref={sectionRef}>
            <Section className="relative overflow-hidden bg-transparent py-24 md:py-32">
                {/* Top separator */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

                {/* 3D perspective grid floor (fixed style prop) */}
                <div
                    className="absolute inset-0 -z-20 pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(128,128,128,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.06) 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                        transform: "perspective(600px) rotateX(22deg) scaleX(1.2)",
                        transformOrigin: "top center",
                        maskImage:
                            "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                        WebkitMaskImage:
                            "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
                    } as React.CSSProperties}
                />

                {/* Scroll-driven ambient glow blobs */}
                <motion.div
                    style={{ y: y1 }}
                    className="absolute top-0 right-0 w-[500px] h-[500px] -z-10 rounded-full bg-violet-500/10 blur-[100px] hidden lg:block pointer-events-none"
                />
                <motion.div
                    style={{ y: y0 }}
                    className="absolute bottom-0 left-0 w-[400px] h-[400px] -z-10 rounded-full bg-blue-500/10 blur-[100px] hidden lg:block pointer-events-none"
                />

                <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col gap-16">

                    {/* Header with 3D flip-in */}
                    <motion.div
                        style={{ y: titleY }}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6"
                    >
                        <div>
                            <motion.p
                                initial={{ opacity: 0, y: 24, rotateX: 30 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                style={{ transformOrigin: "bottom", perspective: "500px" }}
                                className="text-xs font-semibold tracking-[0.18em] uppercase text-blue-600 dark:text-blue-400 mb-3"
                            >
                                Karya Pilihan
                            </motion.p>
                            <motion.h2
                                initial={{ opacity: 0, y: 36, rotateX: 25 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                                style={{ transformOrigin: "bottom", perspective: "500px" }}
                                className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight leading-none text-3d"
                            >
                                Proyek Unggulan
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                                className="text-muted-foreground text-base sm:text-lg mt-4 max-w-md font-light leading-relaxed"
                            >
                                Seleksi karya terbaik yang mendemonstrasikan keahlian teknis dan desain visual saya.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="hidden sm:block shrink-0"
                        >
                            <Link
                                href="/projects"
                                className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border/60 hover:border-border rounded-full px-5 py-2.5 bg-background/50 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                            >
                                Semua Proyek
                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Cards — different Y parallax per card = strong 3D depth */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {featuredProjects.map((project, index) => (
                            <motion.div
                                key={index}
                                style={{ y: yOffsets[index] ?? 0 }}
                                initial={{ opacity: 0, y: 80, rotateX: 18 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{
                                    duration: 0.9,
                                    delay: index * 0.14,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="scene-3d"
                            >
                                <ProjectCard {...project} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile see-all */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
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
        </div>
    );
}
