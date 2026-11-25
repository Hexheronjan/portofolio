"use client";

import { Cpu, Smartphone, Globe, Database, Server, Palette, Cloud, Terminal, Code2, Layers } from "lucide-react";

const techItems = [
    { name: "Next.js & React", icon: Globe, highlight: "Full Stack Web" },
    { name: "Laravel & PHP", icon: Layers, highlight: "Full Stack Backend" },
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
        <div
            className="w-full py-6 border-y border-white/10 bg-[#141210] text-[#f4efe8] overflow-hidden relative"
            aria-label="Teknologi Inti"
        >
            <div className="marquee">
                <div className="marquee__track gap-3.5 pr-3.5">
                    {[...techItems, ...techItems].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={idx}
                                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full border border-white/12 bg-white/[0.04] backdrop-blur-sm shrink-0 hover:border-[#e07a52]/60 hover:bg-white/[0.08] transition-colors"
                            >
                                <div className="p-1.5 rounded-full bg-[#e07a52]/15 text-[#e07a52]">
                                    <Icon className="h-4 w-4" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-semibold text-[#f4efe8] tracking-tight">
                                        {item.name}
                                    </span>
                                    <span className="text-[10px] font-mono text-[#a49b91]">
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
