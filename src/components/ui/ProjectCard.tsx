"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    image: string;
    githubUrl?: string;
    liveUrl?: string;
}

export function ProjectCard({
    title,
    description,
    tags,
    image,
    githubUrl,
    liveUrl,
}: ProjectCardProps) {
    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative flex flex-col h-full rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transition-shadow duration-500"
        >
            {/* Animated top border glow */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/60 transition-all duration-700" />

            {/* Image area */}
            <div className="relative aspect-video overflow-hidden bg-muted">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Shimmer sweep */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 animate-shimmer" />
                </div>

                {/* Live link overlay button */}
                {liveUrl && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                        <Link
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-white/90 dark:bg-black/80 backdrop-blur-sm text-foreground text-sm font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-black transition-colors"
                        >
                            <ArrowUpRight className="h-4 w-4" />
                            Buka Website
                        </Link>
                    </motion.div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow p-5 gap-3">
                <div>
                    <h3 className="font-semibold text-lg leading-tight line-clamp-1 group-hover:text-primary transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                    {tags.map((tag) => (
                        <Badge
                            key={tag}
                            variant="secondary"
                            className="px-2 py-0.5 text-xs font-medium transition-all duration-200 group-hover:border-primary/20"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>

                {/* Footer buttons */}
                {(githubUrl || liveUrl) && (
                    <div className="flex gap-2 pt-2 border-t border-border/50 mt-1">
                        {githubUrl && (
                            <Button variant="outline" size="sm" className="flex-1 gap-2 h-8 text-xs hover:border-primary/50 transition-all" asChild>
                                <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                                    <Github className="h-3.5 w-3.5" />
                                    Code
                                </Link>
                            </Button>
                        )}
                        {liveUrl && (
                            <Button size="sm" className="flex-1 gap-2 h-8 text-xs shine-effect" asChild>
                                <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-3.5 w-3.5" />
                                    Demo
                                </Link>
                            </Button>
                        )}
                    </div>
                )}
            </div>

            {/* Bottom glow line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/40 transition-all duration-700" />
        </motion.div>
    );
}
