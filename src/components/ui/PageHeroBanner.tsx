import * as React from "react";
import { Compass } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeroBannerProps {
    /** Label teknis di dalam pill atas, misal: "01 // TENTANG SAYA // 2026" */
    eyebrow: string;
    /** Judul utama banner (tebal & tegas) */
    title: string;
    /** Kata/frasa opsional yang diberi sorotan warna burnished copper */
    titleAccent?: string;
    /** Deskripsi singkat 1–2 kalimat di bawah judul */
    description: string;
    /** Ikon opsional untuk pill atas */
    icon?: React.ReactNode;
    /** Slot floating bar (search / quick actions) yang menumpuk tepat di batas bawah banner */
    floatingBar?: React.ReactNode;
    /** Konten tambahan di dalam area gelap banner (misal tombol/tags pada halaman detail proyek) */
    children?: React.ReactNode;
    align?: "center" | "left";
    className?: string;
}

export function PageHeroBanner({
    eyebrow,
    title,
    titleAccent,
    description,
    icon,
    floatingBar,
    children,
    align = "center",
    className,
}: PageHeroBannerProps) {
    const isCenter = align === "center";

    return (
        <div className={cn("relative", className)}>
            {/* Full-bleed Dark Obsidian Editorial Banner (menarik ke atas di belakang navbar fixed) */}
            <section
                aria-label={title}
                className={cn(
                    "relative -mt-16 overflow-hidden bg-[#13110f] text-[#f4efe8] border-b border-white/10",
                    floatingBar ? "pt-28 sm:pt-36 pb-20 sm:pb-24" : "pt-28 sm:pt-36 pb-16 sm:pb-20"
                )}
            >
                {/* Lapisan Grid Arsitektural Gelap */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, rgba(244, 239, 232, 0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(244, 239, 232, 0.045) 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                        maskImage: "radial-gradient(ellipse 85% 75% at 50% 35%, #000 15%, transparent 82%)",
                        WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 50% 35%, #000 15%, transparent 82%)",
                    }}
                />

                {/* Sorotan Studio Hangat (Burnished Copper & Brushed Brass — Tanpa Biru/Hijau) */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[560px] h-[280px] rounded-full blur-[110px]"
                    style={{ background: "radial-gradient(circle, rgba(224, 122, 82, 0.22), transparent 70%)" }}
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-24 right-[-10%] w-[420px] h-[260px] rounded-full blur-[100px]"
                    style={{ background: "radial-gradient(circle, rgba(212, 175, 114, 0.14), transparent 70%)" }}
                />

                {/* Tekstur Grain Sangat Halus */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.045]"
                    style={{ backgroundImage: "url('/noise.svg')", backgroundSize: "180px 180px" }}
                />

                <div className={cn("container-page relative z-10", isCenter && "text-center")}>
                    {/* Eyebrow Pill Teknis */}
                    <div
                        className={cn(
                            "inline-flex flex-wrap items-center justify-center gap-1.5 max-w-full px-3.5 py-1.5 rounded-full border border-[#e07a52]/30 bg-[#e07a52]/10 text-[#f3ae90] text-[10px] sm:text-[11px] font-mono font-medium uppercase tracking-[0.12em] sm:tracking-[0.16em] mb-5",
                            !isCenter && "justify-start mb-4"
                        )}
                    >
                        <span className="text-[#e07a52] shrink-0" aria-hidden="true">
                            {icon ?? <Compass className="h-3.5 w-3.5" />}
                        </span>
                        <span className="break-words">{eyebrow}</span>
                    </div>

                    {/* Display Title */}
                    <h1
                        className={cn(
                            "font-display font-extrabold tracking-tight text-[#f4efe8] leading-[1.08] text-2xl sm:text-5xl lg:text-[3.35rem] break-words",
                            isCenter ? "mx-auto max-w-4xl" : "max-w-3xl"
                        )}
                    >
                        {title}
                        {titleAccent && (
                            <>
                                {" "}
                                <span className="text-[#e07a52]">{titleAccent}</span>
                            </>
                        )}
                    </h1>

                    {/* Subtitle */}
                    <p
                        className={cn(
                            "mt-4 text-sm sm:text-base text-[#b8afa5] leading-relaxed",
                            isCenter ? "mx-auto max-w-2xl" : "max-w-2xl"
                        )}
                    >
                        {description}
                    </p>

                    {children && <div className="mt-6">{children}</div>}
                </div>
            </section>

            {/* Floating Seam Bar (Menumpuk elegan di batas antara banner gelap & kanvas terang/gelap) */}
            {floatingBar && (
                <div className="container-page relative z-20 -mt-8 sm:-mt-9">
                    <div className="mx-auto max-w-3xl">{floatingBar}</div>
                </div>
            )}
        </div>
    );
}
