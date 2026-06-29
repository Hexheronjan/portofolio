"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useRef, useState, useEffect } from "react";

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
    const cardRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }, []);

    // 3D tilt values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
        stiffness: 300,
        damping: 30,
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
        stiffness: 300,
        damping: 30,
    });
    const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMobile || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        /* Perspective wrapper */
        <div style={{ perspective: "1000px" }} className="h-full">
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={
                    !isMobile
                        ? {
                              rotateX,
                              rotateY,
                              transformStyle: "preserve-3d",
                          }
                        : {}
                }
                whileHover={isMobile ? { y: -4 } : { scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative flex flex-col h-full rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transition-shadow duration-500"
            >
                {/* Animated top border glow */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/60 transition-all duration-700" />

                {/* 3D Glare effect — desktop only */}
                {!isMobile && (
                    <motion.div
                        className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                        style={{
                            background: useTransform(
                                [glareX, glareY],
                                ([x, y]: [string, string]) =>
                                    `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.12) 0%, transparent 60%)`
                            ),
                        }}
                    />
                )}


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

                {/* Content — slightly raised in 3D on desktop */}
                <div
                    className="flex flex-col flex-grow p-5 gap-3"
                    style={!isMobile ? { transform: "translateZ(20px)" } : {}}
                >
                    <div>
                        <h3 className="font-semibold text-lg leading-tight line-clamp-1 group-hover:text-primary transition-colors duration-300">
                            {title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Tags */}
                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-auto">
                            {tags.slice(0, 4).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}

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
        </div>
    );
}
