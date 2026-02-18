"use client";

import { motion } from "framer-motion";
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

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export function SkillsContent() {
    return (
        <div className="flex flex-col relative">
            {/* Decorative background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] -z-10 rounded-full bg-primary/5 blur-3xl" />
            <Section className="pb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Keahlian Teknis
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mb-12">
                        Saya telah menghabiskan bertahun-tahun mengasah keterampilan saya dalam pengembangan web.
                        Berikut rincian keahlian teknis saya di berbagai domain.
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {skillCategories.map((category, index) => (
                        <motion.div key={index} variants={item}>
                            <Card className="relative h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                <CardHeader>
                                    <CardTitle className="text-xl text-primary relative">
                                        {category.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6 relative">
                                    {category.skills.map((skill, skillIndex) => (
                                        <SkillBar key={skillIndex} name={skill.name} level={skill.level} index={skillIndex} />
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </Section>
        </div>
    );
}

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
        >
            <div className="flex justify-between mb-2">
                <span className="font-medium text-sm">{name}</span>
                <span className="text-xs text-muted-foreground font-mono">{level}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${level}%` }}
                    transition={{ duration: 1.2, delay: 0.2 + index * 0.05, ease: "easeOut" }}
                    className="bg-gradient-to-r from-primary to-primary/80 h-full rounded-full shadow-sm"
                />
            </div>
        </motion.div>
    );
}
