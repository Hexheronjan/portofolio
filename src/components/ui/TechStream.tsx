"use client";

import { Cpu, Smartphone, Globe, Database, Server, Palette, Cloud, Terminal, Code2 } from "lucide-react";

const techItems = [
    { name: "Next.js & React", icon: Globe, highlight: "Full Stack Web" },
    { name: "Go (Golang)", icon: Server, highlight: "High-Perf API" },
    { name: "Kotlin & Java", icon: Smartphone, highlight: "Android & OOP" },
    { name: "C & C++", icon: Terminal, highlight: "Systems & Logic" },
    { name: "TypeScript", icon: Cpu, highlight: "Type Safe" },
    { name: "React Native & Expo", icon: Code2, highlight: "Cross-Platform" },
    { name: "Tailwind CSS v4", icon: Palette, highlight: "Modern Styling" },
    { name: "PostgreSQL & Supabase", icon: Database, highlight: "Cloud DB" },
    { name: "Vercel Edge Network", icon: Cloud, highlight: "Fast Deploy" },
];

export function TechStream() {
    return (
        <div className="w-full py-8 border-y border-border/70 bg-card/55 overflow-hidden relative" aria-label="Teknologi Inti">
            <div className="marquee">
                <div className="marquee__track gap-3.5 pr-3.5">
                    {[...techItems, ...techItems].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={idx}
                                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full border border-border bg-card shadow-soft shrink-0 hover:border-primary/50 transition-colors"
                            >
                                <div className="p-1.5 rounded-full bg-primary/10 text-primary">
                                    <Icon className="h-4 w-4" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-semibold text-foreground tracking-tight">
                                        {item.name}
                                    </span>
                                    <span className="text-[10px] font-mono text-muted-foreground">
                                        {item.highlight}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
