"use client";

import { motion } from "framer-motion";
import { projects } from "@/constants/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeaturedProjects() {
    const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

    return (
        <Section className="bg-secondary/30 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-96 h-96 -z-10 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 -z-10 rounded-full bg-primary/5 blur-3xl" />

            <div className="flex flex-col space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row justify-between items-end gap-4 mb-12"
                >
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                            Proyek Unggulan
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Pilihan proyek yang menunjukkan keahlian dan hasrat saya dalam
                            membangun produk.
                        </p>
                    </div>
                    <Button variant="outline" className="group w-fit" asChild>
                        <Link href="/projects">
                            Lihat Semua Proyek
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: { staggerChildren: 0.15 },
                        },
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.5, ease: "easeOut" },
                                },
                            }}
                        >
                            <ProjectCard {...project} />
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="md:hidden flex justify-center"
                >
                    <Button variant="outline" className="w-full group" asChild>
                        <Link href="/projects">
                            Lihat Semua Proyek{" "}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </Section>
    );
}
