"use client";

import { useState } from "react";
import { projects } from "@/constants/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

export function ProjectsList() {
    const [selectedTag, setSelectedTag] = useState<string>("Semua");

    // Ambil tag unik
    const allTags = ["Semua", "WordPress", "Next.js", "React", "Tailwind CSS"];

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

            {/* Grid Kartu Proyek (Staggered Animation Up) */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.06}>
                {filteredProjects.map((project) => (
                    <StaggerItem key={project.slug}>
                        <ProjectCard {...project} />
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </div>
    );
}
