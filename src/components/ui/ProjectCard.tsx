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
            </div>

            {/* Bottom glow line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/40 transition-all duration-700" />
        </motion.div>
    );
}
