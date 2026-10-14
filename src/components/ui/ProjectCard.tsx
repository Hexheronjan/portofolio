"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, ArrowRight } from "lucide-react";
import { Project } from "@/constants/projects";

export function ProjectCard({
    slug,
    title,
    description,
    tags,
    image,
    liveUrl,
    role,
    isOffline,
}: Project) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <article
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative flex flex-col h-full rounded-2xl border border-border/70 bg-card overflow-hidden shadow-soft hover:shadow-lift hover:border-primary/40 transition-all duration-300"
        >
            {/* Dynamic Spotlight Glow mengikuti kursor */}
            {isHovered && (
                <div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition-opacity duration-300 -z-0"
                    style={{
                        background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.12), transparent 80%)`,
                    }}
                />
            )}

            {/* Area Gambar dengan Rasio 16:9 dan Sizes Spesifik */}
            <Link
                href={`/projects/${slug}`}
                className="relative aspect-video w-full overflow-hidden bg-muted block cursor-pointer"
                title={`Lihat detail studi kasus ${title}`}
            >
                <Image
                    src={image}
                    alt={`Tampilan antarmuka website ${title}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Overlay Subtle Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full">
                        <span>Buka Studi Kasus</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                </div>

                {/* Indikator Status Situs Jika Offline */}
                {isOffline && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-500/90 text-black text-[10px] font-bold tracking-wider uppercase backdrop-blur-sm shadow-sm">
                        Domain Kedaluwarsa
                    </div>
                )}
            </Link>

            {/* Isi Konten Kartu */}
            <div className="flex flex-col flex-1 p-5 sm:p-6 gap-3 relative z-10">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <span className="text-[11px] font-semibold tracking-wider text-primary uppercase font-mono">
                            {role}
                        </span>
                        <Link href={`/projects/${slug}`}>
                            <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors mt-0.5 line-clamp-1">
                                {title}
                            </h3>
                        </Link>
                    </div>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {description}
                </p>

                {/* Tech Stack Chips */}
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center text-[11px] px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium border border-border/50"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Tombol Aksi */}
                <div className="pt-3 border-t border-border/60 flex items-center justify-between mt-2">
                    {liveUrl ? (
                        <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Buka website live ${title}`}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-primary transition-colors py-1 group/btn"
                        >
                            <span>Buka Live</span>
                            <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                        </a>
                    ) : (
                        <span className="text-xs text-muted-foreground italic">Proyek Internal</span>
                    )}

                    <Link
                        href={`/projects/${slug}`}
                        className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
                    >
                        <span>Detail</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
