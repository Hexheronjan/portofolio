"use client";

import { useState, useEffect } from "react";
import { Terminal, Code, Cpu, Sparkles, Check, Play, Copy, Layers, Activity } from "lucide-react";
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
  education: "SMK Negeri 1 Jenangan (RPL, 2023-2026)",
  location: "Ponorogo, Jawa Timur, Indonesia",
  activeProject: "NALARA AI Learning Intelligence",
  stack: {
    frontend: ["Next.js 16", "React", "TypeScript", "Tailwind CSS v4"],
    mobile: ["React Native", "Expo"],
    backend: ["Node.js", "Express", "PostgreSQL", "Supabase", "MySQL"], // TODO: tambahkan Laravel jika proyek publik sudah tersedia
    cloud: ["Vercel", "Turbopack", "Edge Network"]
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
echo "🚀 Memulai kompilasi Next.js 16 (Turbopack)..."
pnpm run lint --max-warnings 0
pnpm run build:ssg

# Menghasilkan rute statis teroptimasi
# ✓ 18/18 halaman proyek terkompilasi
# Status performa: 100/100 Core Web Vitals
echo "✨ Deploy berhasil ke Vercel Edge Network!"`,
    },
];

export function LiveTechShowcase() {
    const [activeTab, setActiveTab] = useState(0);
    const [copied, setCopied] = useState(false);
    const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        setTerminalOutput([
            "system: Fauzan Development Environment v2.6 ready.",
            "status: All test suites passed [18 projects indexed].",
            "ready: Click 'Jalankan Perintah' untuk simulasi pengujian.",
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

    return (
        <section aria-label="Showcase Teknologi Interaktif" className="section-y relative border-t border-border/60 bg-muted/10 overflow-hidden">
            {/* Latar Belakang Lingkaran Cahaya Halus */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="container-page">
                {/* Header Section */}
                <ScrollReveal direction="up" className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>Workspace Rekayasa Perangkat Lunak</span>
                        </div>
                        <h2 className="text-h2 font-display font-bold tracking-tight text-foreground">
                            Interaksi Kode & Ekosistem Nyata
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base mt-2">
                            Melihat lebih dekat bagaimana saya menstrukturkan kode, arsitektur aplikasi AI, dan alur kerja otomatis yang rapi dan mudah dirawat.
                        </p>
                    </div>

                    {/* Metrik Bergerak */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border/80 shadow-soft">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs font-mono font-medium text-foreground">
                                Interactive Sandbox (Demo)
                            </span>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Grid Interaktif: Jendela Code Editor (Kiri) & Live Simulator (Kanan) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    
                    {/* JENDELA CODE EDITOR MAC-STYLE (7 Kolom - Slide dari Kiri) */}
                    <ScrollReveal direction="left" distance={40} className="lg:col-span-7 flex flex-col h-full">
                        <div className="flex flex-col h-full rounded-2xl border border-border/80 bg-card overflow-hidden shadow-lift transition-all duration-300">
                        {/* Title Bar Editor */}
                        <div className="flex items-center justify-between px-4 py-3 bg-muted/60 border-b border-border/80">
                            {/* Window control buttons */}
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                                <span className="text-xs font-mono text-muted-foreground ml-2 hidden sm:inline">
                                    fauzan-workspace / src
                                </span>
                            </div>

                            {/* Tombol Salin */}
                            <button
                                type="button"
                                onClick={handleCopy}
                                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted"
                                title="Salin kode"
                            >
                                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                                <span className="text-[11px] font-mono">{copied ? "Tersalin!" : "Salin"}</span>
                            </button>
                        </div>

                        {/* File Tabs */}
                        <div className="flex items-center overflow-x-auto bg-muted/30 border-b border-border/60 px-2 pt-2 scrollbar-none">
                            {files.map((file, idx) => {
                                const Icon = file.icon;
                                const isActive = activeTab === idx;
                                return (
                                    <button
                                        key={file.name}
                                        type="button"
                                        onClick={() => setActiveTab(idx)}
                                        className={`flex items-center gap-2 px-3.5 py-2 text-xs font-mono border-t-2 border-transparent transition-all rounded-t-lg shrink-0 ${
                                            isActive
                                                ? "bg-card text-foreground font-semibold border-primary shadow-sm"
                                                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                                        }`}
                                    >
                                        <Icon className="h-3.5 w-3.5 text-primary" />
                                        <span>{file.name}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Code Display dengan Baris Angka */}
                        <div className="p-4 sm:p-6 overflow-x-auto bg-card text-xs sm:text-sm font-mono leading-relaxed text-foreground select-text flex-1">
                            <pre className="text-muted-foreground/90 whitespace-pre">
                                <code>{files[activeTab].code}</code>
                            </pre>
                        </div>
                    </div>
                </ScrollReveal>

                    {/* INTERACTIVE TERMINAL & LIVE METRICS (5 Kolom - Slide dari Kanan) */}
                    <ScrollReveal direction="right" distance={40} className="lg:col-span-5 flex flex-col gap-6 justify-between">
                        
                        {/* Terminal Box */}
                        <div className="rounded-2xl border border-border/80 bg-[#0d1117] text-[#c9d1d9] p-5 shadow-lift flex flex-col flex-1">
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <Terminal className="h-4 w-4 text-emerald-400" />
                                    <span className="text-xs font-mono font-semibold text-white">
                                        Developer Console
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleRunCommand}
                                    disabled={isRunning}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-mono font-medium transition-all disabled:opacity-50"
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
                                                ? "text-emerald-400"
                                                : line.startsWith("$")
                                                ? "text-sky-300 font-semibold"
                                                : line.startsWith("✨")
                                                ? "text-amber-300 font-semibold"
                                                : "text-zinc-400"
                                        }
                                    >
                                        {line}
                                    </p>
                                ))}
                                {isRunning && (
                                    <p className="text-zinc-500 animate-pulse">
                                        Sedang mengeksekusi suite pengujian...
                                    </p>
                                )}
                            </div>

                            <div className="pt-3 mt-auto border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                                <span>Environment: Browser Sandbox</span>
                                <span>Latensi Demo: ~12ms</span>
                            </div>
                        </div>

                        {/* Kartu Ringkasan Proyek Terbaru: NALARA */}
                        <div className="p-5 rounded-2xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 shadow-soft">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[11px] font-mono font-semibold text-primary uppercase">
                                    Proyek Terbaru
                                </span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                                    Live di Vercel
                                </span>
                            </div>

                            <h3 className="font-display font-bold text-base text-foreground">
                                NALARA AI Learning Intelligence
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                Platform adaptif dengan Think First Socratic Tutor, peta graf prasyarat, dan simulasi soal cerdas.
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
