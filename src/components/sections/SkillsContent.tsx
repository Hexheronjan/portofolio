import { skillCategories } from "@/constants/skills";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function SkillsContent() {
    return (
        <div className="section-y relative">
            <div className="container-page">
                {/* Header (Slide Up) */}
                <ScrollReveal direction="up" className="max-w-2xl mb-12">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Keahlian & Teknologi
                    </span>
                    <h1 className="text-display font-display font-bold tracking-tight text-foreground mt-2">
                        Keahlian Teknis
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base mt-3">
                        Rincian ekosistem teknologi, framework, basis data, dan alat kerja yang aktif saya gunakan dalam pengembangan produk web dan aplikasi mobile.
                    </p>
                </ScrollReveal>

                {/* Grid Kategori Keahlian (Slide Kiri, Tengah, Kanan) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((cat, idx) => {
                        const dir: "left" | "center" | "right" = idx % 3 === 0 ? "left" : idx % 3 === 1 ? "center" : "right";
                        return (
                            <ScrollReveal
                                key={idx}
                                direction={dir}
                                distance={35}
                                delay={idx * 0.08}
                                className="h-full flex flex-col"
                            >
                                <div className="flex flex-col h-full rounded-2xl border border-border/70 bg-card p-6 shadow-soft hover:shadow-lift hover:border-primary/40 transition-all duration-300">
                                    <h2 className="font-display font-bold text-lg text-foreground">
                                        {cat.title}
                                    </h2>
                                    <p className="text-xs text-muted-foreground mt-1 mb-5">
                                        {cat.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {cat.skills.map((skill, sIdx) => (
                                            <span
                                                key={sIdx}
                                                className="inline-flex items-center text-xs font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border/50 hover:border-primary/40 transition-colors"
                                            >
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
