"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

interface SkillCategory {
    title: string;
    skills: { name: string; level: number }[];
}

const skillCategories: SkillCategory[] = [
    {
        title: "Pengembangan Frontend",
        skills: [
            { name: "React / Next.js", level: 95 },
            { name: "TypeScript", level: 90 },
            { name: "Tailwind CSS", level: 95 },
            { name: "Framer Motion", level: 85 },
            { name: "HTML5 / CSS3", level: 95 },
        ],
    },
    {
        title: "Backend & Basis Data",
        skills: [
            { name: "Node.js", level: 80 },
            { name: "Laravel", level: 70 },
            { name: "PostgreSQL", level: 75 },
            { name: "Prisma ORM", level: 80 },
            { name: "REST API", level: 90 },
            { name: "GraphQL", level: 70 },
        ],
    },
    {
        title: "CMS & Platform",
        skills: [
            { name: "WordPress", level: 90 },
        ],
    },
    {
        title: "Alat & DevOps",
        skills: [
            { name: "Git / GitHub", level: 90 },
            { name: "VS Code", level: 95 },
            { name: "Vercel", level: 90 },
            { name: "Docker", level: 60 },
            { name: "Figma", level: 80 },
        ],
    },
];

/* ── 3D Skill Card ── */
function SkillCard3D({
    category,
    index,
    isMobile,
}: {
    category: SkillCategory;
    index: number;
    isMobile: boolean;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

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
        <div style={{ perspective: "1000px" }}>
            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, y: 60, rotateX: isMobile ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={!isMobile ? { rotateX, rotateY, transformStyle: "preserve-3d" } : {}}
                className="h-full"
            >
                <Card className="relative h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    {/* Inner gradient glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Glare */}
                    {!isMobile && (
                        <motion.div
                            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                            style={{
                                background: "radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.08) 0%, transparent 60%)",
                            }}
                        />
                    )}

                    <CardHeader style={!isMobile ? { transform: "translateZ(20px)" } : {}}>
                        <CardTitle className="text-xl text-primary relative">
                            {category.title}
                        </CardTitle>
                    </CardHeader>

                    <CardContent
                        className="space-y-6 relative"
                        style={!isMobile ? { transform: "translateZ(10px)" } : {}}
                    >
                        {category.skills.map((skill, skillIndex) => (
                            <SkillBar
                                key={skillIndex}
                                name={skill.name}
                                level={skill.level}
                                index={skillIndex}
                            />
                        ))}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}

export function SkillsContent() {
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }, []);

    // Parallax scroll for the title section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });
    const titleY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["-5%", "5%"]);

    return (
        <div ref={containerRef} className="flex flex-col relative">
            {/* Decorative background — desktop only */}
            {!isMobile && (
                <>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] -z-10 rounded-full bg-primary/5 blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] -z-10 rounded-full bg-blue-500/5 blur-[80px]" />
                </>
            )}

            <Section className="pb-8">
                {/* Title with scroll parallax */}
                <motion.div
                    style={{ y: titleY }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
                        Keahlian Teknis
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mb-12">
                        Saya telah menghabiskan bertahun-tahun mengasah keterampilan saya dalam pengembangan web.
                        Berikut rincian keahlian teknis saya di berbagai domain.
                    </p>
                </motion.div>

                {/* 3D Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category, index) => (
                        <SkillCard3D
                            key={index}
                            category={category}
                            index={index}
                            isMobile={isMobile}
                        />
                    ))}
                </div>
            </Section>
        </div>
    );
}

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
        >
            <div className="flex justify-between mb-2 gap-2">
                <span className="font-medium text-sm truncate">{name}</span>
                <span className="text-xs text-muted-foreground font-mono shrink-0">{level}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: level / 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 + index * 0.05, ease: [0.33, 1, 0.68, 1] }}
                    className="bg-gradient-to-r from-primary to-primary/80 h-full rounded-full shadow-sm w-full"
                    style={{ transformOrigin: "left" }}
                />
            </div>
        </motion.div>
    );
}
