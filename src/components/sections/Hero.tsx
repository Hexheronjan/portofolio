"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

const techStack = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Laravel",
    "WordPress",
    "Node.js",
    "Framer Motion",
];

// Particle burst on click
function Particle({ x, y, color }: { x: number; y: number; color: string }) {
    const angle = Math.random() * 360;
    const distance = 60 + Math.random() * 80;
    const dx = Math.cos((angle * Math.PI) / 180) * distance;
    const dy = Math.sin((angle * Math.PI) / 180) * distance;

    return (
        <motion.div
            className="absolute w-2 h-2 rounded-full pointer-events-none z-50"
            style={{ left: x, top: y, backgroundColor: color }}
            initial={{ scale: 1, opacity: 1, x: 0, y: 0 }}
            animate={{ scale: 0, opacity: 0, x: dx, y: dy }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        />
    );
}

const COLORS = ["#3b82f6", "#f59e0b", "#8b5cf6", "#10b981", "#ef4444", "#f97316", "#ec4899"];

export function Hero() {
    const [heroLogoError, setHeroLogoError] = useState(false);
    const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
    const [isHovered, setIsHovered] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const logoRef = useRef<HTMLDivElement>(null);

    // 3D tilt effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 200, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        const newParticles = Array.from({ length: 14 }, (_, i) => ({
            id: Date.now() + i,
            x: cx,
            y: cy,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
        }));
        setParticles((prev) => [...prev, ...newParticles]);
        setClickCount((c) => c + 1);
        setTimeout(() => {
            setParticles((prev) => prev.filter((p) => !newParticles.find((n) => n.id === p.id)));
        }, 800);
    };

    // Cycling rainbow glow colors
    const glowColors = [
        "rgba(59,130,246,0.6)",
        "rgba(168,85,247,0.6)",
        "rgba(236,72,153,0.6)",
        "rgba(245,158,11,0.6)",
        "rgba(16,185,129,0.6)",
    ];
    const glowIndex = clickCount % glowColors.length;

    return (
        <Section className="min-h-[85vh] flex items-center justify-center relative overflow-hidden">
            {/* Mesh gradient background */}
            <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(96,165,250,0.08),transparent)]" />
            {/* Grid pattern */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            {/* Gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] -z-10 rounded-full bg-primary/10 blur-3xl animate-glow" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 -z-10 rounded-full bg-[var(--highlight)]/10 blur-3xl animate-float" />
            <div className="absolute top-1/2 right-1/3 w-64 h-64 -z-10 rounded-full bg-[var(--highlight)]/5 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
            {/* Floating dots */}
            <div className="absolute top-20 left-[15%] w-2 h-2 rounded-full bg-primary/30 animate-float" style={{ animationDuration: "5s" }} />
            <div className="absolute top-40 right-[20%] w-1.5 h-1.5 rounded-full bg-[var(--highlight)]/40 animate-float" style={{ animationDuration: "7s", animationDelay: "1s" }} />
            <div className="absolute bottom-40 left-[25%] w-1 h-1 rounded-full bg-primary/20 animate-float" style={{ animationDuration: "6s", animationDelay: "0.5s" }} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center w-full max-w-6xl mx-auto px-4 z-10">
                {/* Kiri: teks & CTA */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8 order-2 md:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm font-medium border border-primary/20 gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-primary" />
                            Terbuka untuk peluang baru
                        </Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-foreground leading-[1.1]">
                            Standar untuk <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_auto] animate-gradient">
                                Pengembangan Web Modern
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-muted-foreground max-w-xl leading-relaxed"
                    >
                        Halo, saya <span className="text-foreground font-semibold">Fauzan</span>.
                        Saya menciptakan pengalaman web yang aksesibel, pixel-perfect, dan berperforma tinggi
                        menggunakan teknologi modern.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                    >
                        <Button size="lg" className="group h-12 px-8 text-base shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300" asChild>
                            <Link href="/projects">
                                Lihat Proyek
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-12 px-8 text-base border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300" asChild>
                            <Link href="/contact">Hubungi Saya</Link>
                        </Button>
                    </motion.div>
                </div>

                {/* Kanan: Logo dengan efek premium */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center justify-center order-1 md:order-2"
                >
                    {!heroLogoError ? (
                        <div
                            ref={logoRef}
                            className="relative w-full max-w-sm md:max-w-md aspect-square cursor-pointer select-none"
                            onMouseMove={handleMouseMove}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={handleMouseLeave}
                            onClick={handleClick}
                            style={{ perspective: "800px" }}
                        >
                            {/* Particle container */}
                            <div className="absolute inset-0 pointer-events-none overflow-visible z-50">
                                {particles.map((p) => (
                                    <Particle key={p.id} x={p.x} y={p.y} color={p.color} />
                                ))}
                            </div>

                            {/* Outer spinning rainbow ring */}
                            <motion.div
                                className="absolute inset-[-16px] rounded-full"
                                style={{
                                    background: "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #10b981, #3b82f6)",
                                    opacity: isHovered ? 0.7 : 0.3,
                                    filter: "blur(2px)",
                                }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                            />
                            {/* Mask to make it ring-shaped */}
                            <div className="absolute inset-[-4px] rounded-full bg-background/90 dark:bg-background/95" />

                            {/* Middle spinning ring (reverse) */}
                            <motion.div
                                className="absolute inset-[-8px] rounded-full"
                                style={{
                                    background: "conic-gradient(from 180deg, #f59e0b, #ef4444, #8b5cf6, #3b82f6, #10b981, #f59e0b)",
                                    opacity: isHovered ? 0.5 : 0.15,
                                    filter: "blur(1px)",
                                }}
                                animate={{ rotate: -360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />
                            <div className="absolute inset-[-2px] rounded-full bg-background/90 dark:bg-background/95" />

                            {/* Dynamic glow behind logo */}
                            <motion.div
                                className="absolute inset-0 rounded-full blur-2xl"
                                animate={{
                                    background: isHovered
                                        ? [
                                            "radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)",
                                            "radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)",
                                            "radial-gradient(circle, rgba(236,72,153,0.5) 0%, transparent 70%)",
                                            "radial-gradient(circle, rgba(245,158,11,0.5) 0%, transparent 70%)",
                                            "radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)",
                                        ]
                                        : "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
                                    scale: isHovered ? 1.1 : 1,
                                }}
                                transition={{
                                    background: { duration: 2, repeat: Infinity, ease: "linear" },
                                    scale: { duration: 0.3 },
                                }}
                            />

                            {/* Click glow burst */}
                            <motion.div
                                key={clickCount}
                                className="absolute inset-0 rounded-full pointer-events-none"
                                initial={{ opacity: 0.8, scale: 1 }}
                                animate={{ opacity: 0, scale: 1.6 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                style={{ background: `radial-gradient(circle, ${glowColors[glowIndex]} 0%, transparent 70%)` }}
                            />

                            {/* 3D tilt logo image */}
                            <motion.div
                                className="relative w-full h-full"
                                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                                whileHover={{ scale: 1.04 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            >
                                <Image
                                    src="/hero-logo.png"
                                    alt="FRAVOX Logo"
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    style={{
                                        filter: isHovered
                                            ? "drop-shadow(0 0 24px rgba(59,130,246,0.6)) drop-shadow(0 0 48px rgba(168,85,247,0.3)) brightness(1.1)"
                                            : "drop-shadow(0 8px 32px rgba(0,0,0,0.3))",
                                        transition: "filter 0.4s ease",
                                    }}
                                    unoptimized
                                    onError={() => setHeroLogoError(true)}
                                />
                            </motion.div>

                            {/* Hint text */}
                            <motion.div
                                className="absolute -bottom-8 left-0 right-0 text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isHovered ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <span className="text-xs text-muted-foreground/60 font-mono">✨ klik untuk efek!</span>
                            </motion.div>
                        </div>
                    ) : (
                        <div className="w-full max-w-sm md:max-w-md aspect-square rounded-2xl border-2 border-dashed border-primary/20 flex items-center justify-center bg-primary/5">
                            <p className="text-sm text-muted-foreground text-center px-4">Logo di sini</p>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Teknologi - full width di bawah */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="w-full max-w-4xl mx-auto pt-16 pb-4 z-10"
            >
                <p className="text-sm text-muted-foreground mb-4 font-medium uppercase tracking-wider text-center">
                    Teknologi
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                    {techStack.map((tech, index) => (
                        <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                            whileHover={{ scale: 1.08, y: -2 }}
                        >
                            <Badge
                                variant="outline"
                                className="px-3 py-1.5 bg-background/50 backdrop-blur-sm border-border hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-300 cursor-default"
                            >
                                {tech}
                            </Badge>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </Section>
    );
}
