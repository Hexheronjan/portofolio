"use client";

import { Cpu, Smartphone, Globe, Database, Server, Palette, Cloud, ShieldCheck } from "lucide-react";

const techItems = [
    { name: "Next.js 16 (App Router)", icon: Globe, highlight: "Full Stack Web" },
    { name: "React Native & Expo", icon: Smartphone, highlight: "iOS & Android" },
    { name: "TypeScript", icon: Cpu, highlight: "Type Safe" },
    { name: "Tailwind CSS v4", icon: Palette, highlight: "Modern Styling" },
    { name: "Node.js & Express", icon: Server, highlight: "REST API" },
    { name: "PostgreSQL & Supabase", icon: Database, highlight: "Cloud DB" },
    { name: "Vercel Edge Network", icon: Cloud, highlight: "Fast Deploy" },
    { name: "AI Integration Engine", icon: ShieldCheck, highlight: "Socratic AI" },
];

export function TechStream() {
    return (
        <div className="w-full py-8 border-y border-border/60 bg-muted/20 overflow-hidden relative" aria-label="Teknologi Inti">
            <div className="marquee">
                <div className="marquee__track gap-4 pr-4">
                    {[...techItems, ...techItems].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={idx}
                                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-border/70 bg-card/80 backdrop-blur-sm shadow-soft shrink-0 hover:border-primary/50 transition-colors"
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
