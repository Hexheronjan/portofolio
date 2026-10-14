"use client";

import { useState } from "react";
import { projects } from "@/constants/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ProjectsList() {
    const [selectedTag, setSelectedTag] = useState<string>("Semua");

    // Ambil tag unik
    const allTags = ["Semua", "Next.js", "React Native", "WordPress", "React", "Tailwind CSS"];

    const filteredProjects = selectedTag === "Semua"
        ? projects
        : projects.filter((p) => p.tags.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase())));

    return (
        <div className="flex flex-col gap-8">
            {/* Filter Tabs (Slide dari Kiri) */}
            <ScrollReveal direction="left">
                <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => {
                        const isActive = selectedTag === tag;
                        return (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => setSelectedTag(tag)}
                                className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                                    isActive
                                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                        : "bg-secondary text-secondary-foreground border-border hover:bg-muted"
                                }`}
                            >
                                {tag}
                            </button>
                        );
                    })}
                </div>
            </ScrollReveal>

            {/* Grid Kartu Proyek dengan Animasi Fluid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, idx) => (
                        <motion.div
                            key={project.slug}
                            layout
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{
                                duration: 0.35,
                                delay: Math.min(idx * 0.04, 0.2),
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="h-full flex flex-col"
                        >
                            <ProjectCard {...project} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
