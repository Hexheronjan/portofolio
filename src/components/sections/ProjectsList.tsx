"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/Button";
import { projects } from "@/constants/projects";

export function ProjectsList() {
    const [filter, setFilter] = useState("All");

    const categories = ["All", "Next.js", "WordPress", "TypeScript", "Tailwind CSS"];

    const filteredProjects =
        filter === "All"
            ? projects
            : projects.filter((project) => project.tags.includes(filter));

    return (
        <>
            {/* Filter Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-wrap gap-2 mb-12"
            >
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={filter === category ? "default" : "outline"}
                        onClick={() => setFilter(category)}
                        className="rounded-full transition-all duration-300 hover:scale-105"
                    >
                        {category === "All" ? "Semua" : category}
                    </Button>
                ))}
            </motion.div>

            {/* Projects Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <ProjectCard {...project} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredProjects.length === 0 && (
                <p className="text-muted-foreground text-center py-20">
                    Tidak ada proyek ditemukan untuk kategori ini.
                </p>
            )}
        </>
    );
}
