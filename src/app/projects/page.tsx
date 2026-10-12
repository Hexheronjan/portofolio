import type { Metadata } from "next";
import { ProjectsList } from "@/components/sections/ProjectsList";
import { site } from "@/lib/site";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
    title: `Proyek Portfolio | ${site.name}`,
    description: "Koleksi proyek website profesional, portal korporat, dan aplikasi web & mobile karya Fauzan Bagus Prasetyo.",
};

export default function ProjectsPage() {
    return (
        <div className="section-y relative">
            <div className="container-page">
                <ScrollReveal direction="up" className="max-w-2xl mb-10">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Portofolio
                    </span>
                    <h1 className="text-display font-display font-bold tracking-tight text-foreground mt-2">
                        Daftar Proyek
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base mt-3">
                        Koleksi proyek nyata yang mencakup website perusahaan, landing page konversi, platform toko online, serta aplikasi manajemen berbasis Next.js.
                    </p>
                </ScrollReveal>

                <ProjectsList />
            </div>
        </div>
    );
}
