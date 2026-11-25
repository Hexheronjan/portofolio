"use client";

import { useState, useEffect } from "react";
import { Terminal, Code, Cpu, Sparkles, Check, Play, Copy } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const files = [
    {
        name: "DeveloperProfile.ts",
        icon: Code,
        language: "typescript",
        code: `// Profil Pengembang & Fokus Rekayasa Sistem
export const developer = {
  name: "Fauzan Bagus Prasetyo",
  role: "Full Stack & Mobile Developer",
  work: ["Oke Web Indonesia", "PrajaLinks (Freelance)"],
  award: "Juara 2 — ITX 2026 Web Development (UNIDA Gontor)",
  location: "Ponorogo, Jawa Timur, Indonesia",
  languages: [
    "TypeScript", "JavaScript", "Go (Golang)",
    "Kotlin", "Java", "C++", "C", "PHP"
  ],
  stack: {
    frontend: ["Next.js 16", "React", "Tailwind CSS v4"],
    mobile: ["React Native", "Expo", "Kotlin Android"],
    backend: ["Node.js", "Express", "Go API", "Laravel"],
    database: ["PostgreSQL", "MySQL", "Supabase", "Prisma"]
  },
  availableForHire: true
};`,
    },
    {
        name: "NALARA_AI_Engine.tsx",
        icon: Cpu,
        language: "typescript",
        code: `// Implementasi Bimbingan Nalar Socrates & DAG Engine
import { SocraticTutor, DAGKnowledgeGraph } from "@/ai/engine";

export async function evaluateStudentMastery(studentId: string, topic: string) {
  const diagnostic = await DAGKnowledgeGraph.checkPrerequisites(studentId, topic);
  
  if (diagnostic.hasMisconception) {
    // Alur bimbingan Socrates tanpa membocorkan kunci jawaban
    return SocraticTutor.generateGuidedQuestion({
      misconception: diagnostic.identifiedRoot,
      difficulty: "adaptive",
      targetMasteryScore: 0.984
    });
  }
  
  return { status: "MASTERED", canAdvance: true };
}`,
    },
    {
        name: "Deploy_Pipeline.sh",
        icon: Terminal,
        language: "bash",
        code: `#!/bin/bash
# Pipeline build & validasi kualitas
echo "Memulai kompilasi Next.js 16 (Turbopack)..."
npm run lint
npm run build

# Menghasilkan rute statis teroptimasi
# ✓ 26 proyek live terindeks & terkompilasi
# Status performa: Optimal Core Web Vitals
echo "✨ Deploy berhasil ke Vercel Edge Network!"`,
    },
];

function renderHighlightedLine(line: string) {
    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("#")) {
        return <span className="text-[#8a8177] italic">{line}</span>;
    }

    const tokenRegex =
        /("[^"]*"|\b(?:export|const|import|from|async|function|await|if|return|true|false|string|npm|run|echo)\b|\b\d+(?:\.\d+)?\b)/g;

    const parts = line.split(tokenRegex);
    return parts.map((part, idx) => {
        if (!part) return null;
        if (part.startsWith('"') && part.endsWith('"')) {
            return (
                <span key={idx} className="text-[#d4af72]">
                    {part}
                </span>
            );
        }
        if (
            /^(export|const|import|from|async|function|await|if|return|npm|run|echo)$/.test(
                part
            )
        ) {
            return (
                <span key={idx} className="text-[#e07a52] font-semibold">
                    {part}
                </span>
            );
        }
        if (/^(true|false|string|\d+(?:\.\d+)?)$/.test(part)) {
            return (
                <span key={idx} className="text-[#f3b59b]">
                    {part}
                </span>
            );
        }
        return (
            <span key={idx} className="text-[#e8e2d9]">
                {part}
            </span>
        );
    });
}

export function LiveTechShowcase() {
    const [activeTab, setActiveTab] = useState(0);
    const [copied, setCopied] = useState(false);
    const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        setTerminalOutput([
            "system: Fauzan Development Environment v2.6 ready.",
            "status: All test suites passed [26 projects indexed].",
            "ready: Klik 'Jalankan Tes' untuk simulasi pengujian.",
        ]);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(files[activeTab].code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleRunCommand = () => {
        if (isRunning) return;
        setIsRunning(true);
        setTerminalOutput((prev) => [...prev, "$ pnpm test:portfolio-core"]);

        setTimeout(() => {
            setTerminalOutput((prev) => [
                ...prev,
                "✓ Validasi Web Performance & Responsive Layout (360px - 1920px): PASSED",
            ]);
        }, 600);

        setTimeout(() => {
            setTerminalOutput((prev) => [
                ...prev,
                "✓ Pemeriksaan WCAG AA Accessibility Contrast Ratio (≥6:1): PASSED",
            ]);
        }, 1200);

        setTimeout(() => {
            setTerminalOutput((prev) => [
                ...prev,
                "✓ Integrasi NALARA AI Learning & Database Sync: ONLINE",
                "✨ Seluruh sistem siap produksi (0 error).",
            ]);
            setIsRunning(false);
        }, 1800);
    };

    const activeLines = files[activeTab].code.split("\n");

    return (
        <section
            aria-label="Showcase Teknologi Interaktif"
            className="section-y relative border-t border-border/60 bg-muted/15 overflow-hidden"
        >
            {/* Latar Belakang Lingkaran Cahaya Halus */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="container-page">
                {/* Header Section */}
                <ScrollReveal
                    direction="up"
                    className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12"
                >
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-semibold uppercase tracking-[0.12em] mb-3">
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>02 // Workspace Rekayasa</span>
                        </div>
                        <h2 className="text-h2 font-display font-bold tracking-tight text-foreground">
                            Interaksi Kode &amp;{" "}
                            <span className="font-editorial text-primary font-normal text-[1.12em]">
                                Ekosistem Nyata
                            </span>
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base mt-2">
                            Melihat lebih dekat bagaimana saya menstrukturkan kode, arsitektur
                            aplikasi AI, dan alur kerja otomatis yang rapi dan mudah dirawat.
                        </p>
                    </div>

                    {/* Metrik Bergerak */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border shadow-soft">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-65" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                            </span>
                            <span className="text-xs font-mono font-medium text-foreground">
                                Interactive Sandbox (Demo)
                            </span>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Grid Interaktif: Jendela Code Editor (Kiri) & Live Simulator (Kanan) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* JENDELA CODE EDITOR OBSIDIAN (7 Kolom) */}
                    <ScrollReveal direction="left" className="lg:col-span-7 flex flex-col h-full">
                        <div className="flex flex-col h-full rounded-2xl border border-white/10 bg-[#141210] text-[#e8e2d9] overflow-hidden shadow-lift transition-all duration-300">
                            {/* Title Bar Editor */}
                            <div className="flex items-center justify-between px-4 py-3 bg-[#1c1916] border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#e07a52] inline-block" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#d4af72] inline-block" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-white/25 inline-block" />
                                    <span className="text-xs font-mono text-[#a49b91] ml-2 hidden sm:inline">
                                        fauzan-workspace / src
                                    </span>
                                </div>

                                {/* Tombol Salin */}
                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    className="inline-flex items-center gap-1.5 text-xs text-[#a49b91] hover:text-[#f4efe8] transition-colors px-2.5 py-1 rounded-md hover:bg-white/10"
                                    title="Salin kode"
                                >
                                    {copied ? (
                                        <Check className="h-3.5 w-3.5 text-[#e07a52]" />
                                    ) : (
                                        <Copy className="h-3.5 w-3.5" />
                                    )}
                                    <span className="text-[11px] font-mono">
                                        {copied ? "Tersalin!" : "Salin"}
                                    </span>
                                </button>
                            </div>

                            {/* File Tabs */}
                            <div className="flex items-center overflow-x-auto bg-[#181513] border-b border-white/10 px-2 pt-2 scrollbar-none">
                                {files.map((file, idx) => {
                                    const Icon = file.icon;
                                    const isActive = activeTab === idx;
                                    return (
                                        <button
                                            key={file.name}
                                            type="button"
                                            onClick={() => setActiveTab(idx)}
                                            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-mono border-t-2 transition-all rounded-t-lg shrink-0 ${
                                                isActive
                                                    ? "bg-[#141210] text-[#f4efe8] font-semibold border-[#e07a52]"
                                                    : "border-transparent text-[#8a8177] hover:text-[#f4efe8] hover:bg-white/5"
                                            }`}
                                        >
                                            <Icon className="h-3.5 w-3.5 text-[#e07a52]" />
                                            <span>{file.name}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Code Display dengan Nomor Baris & Syntax Highlighting */}
                            <div className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-[13px] font-mono leading-relaxed select-text flex-1">
                                <div className="min-w-max">
                                    {activeLines.map((line, i) => (
                                        <div
                                            key={i}
                                            className="flex hover:bg-white/[0.03] rounded px-1 -mx-1"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="w-8 pr-4 text-right text-[#5c554e] select-none shrink-0"
                                            >
                                                {i + 1}
                                            </span>
                                            <span className="whitespace-pre">
                                                {renderHighlightedLine(line)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* INTERACTIVE TERMINAL & LIVE METRICS (5 Kolom) */}
                    <ScrollReveal
                        direction="right"
                        delay={0.1}
                        className="lg:col-span-5 flex flex-col gap-6 justify-between"
                    >
                        {/* Terminal Box */}
                        <div className="rounded-2xl border border-white/10 bg-[#141210] text-[#e8e2d9] p-5 shadow-lift flex flex-col flex-1">
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <Terminal className="h-4 w-4 text-[#e07a52]" />
                                    <span className="text-xs font-mono font-semibold text-[#f4efe8]">
                                        Developer Console
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleRunCommand}
                                    disabled={isRunning}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e07a52]/20 hover:bg-[#e07a52]/30 text-[#f2a684] text-xs font-mono font-medium transition-all disabled:opacity-50"
                                >
                                    <Play className="h-3 w-3 fill-current" />
                                    <span>{isRunning ? "Menjalankan..." : "Jalankan Tes"}</span>
                                </button>
                            </div>

                            {/* Terminal Logs Output */}
                            <div className="space-y-2 text-xs font-mono flex-1 overflow-y-auto max-h-[220px]">
                                {terminalOutput.map((line, lIdx) => (
                                    <p
                                        key={lIdx}
                                        className={
                                            line.startsWith("✓")
                                                ? "text-[#e07a52]"
                                                : line.startsWith("$")
                                                ? "text-[#f4efe8] font-semibold"
                                                : line.startsWith("✨")
                                                ? "text-[#d4af72] font-semibold"
                                                : "text-[#a49b91]"
                                        }
                                    >
                                        {line}
                                    </p>
                                ))}
                                {isRunning && (
                                    <p className="text-[#8a8177] animate-pulse">
                                        Sedang mengeksekusi suite pengujian...
                                    </p>
                                )}
                            </div>

                            <div className="pt-3 mt-auto border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#8a8177]">
                                <span>Environment: Browser Sandbox</span>
                                <span>Latensi Demo: ~12ms</span>
                            </div>
                        </div>

                        {/* Kartu Ringkasan Proyek Terbaru: NALARA */}
                        <div className="relative p-5 rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
                            <div
                                className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-primary via-brass to-transparent"
                                aria-hidden="true"
                            />
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[11px] font-mono font-semibold text-primary uppercase">
                                    Proyek Terbaru
                                </span>
                                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold">
                                    Live di Vercel
                                </span>
                            </div>

                            <h3 className="font-display font-bold text-base text-foreground">
                                NALARA AI Learning Intelligence
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                Platform adaptif dengan Think First Socratic Tutor, peta graf
                                prasyarat, dan simulasi soal cerdas.
                            </p>

                            <div className="mt-4 flex items-center justify-between">
                                <Link
                                    href="/projects/itx-learning-nalara"
                                    className="text-xs font-semibold text-primary hover:underline"
                                >
                                    Pelajari Arsitektur →
                                </Link>
                                <a
                                    href="https://itx-learning-zx7g.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-muted-foreground hover:text-foreground font-medium"
                                >
                                    Buka Live App ↗
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
