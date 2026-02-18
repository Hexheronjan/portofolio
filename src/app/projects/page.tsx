import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { ProjectsList } from "@/components/sections/ProjectsList";

export const metadata: Metadata = {
    title: "Proyek | Fauzan",
    description: "Daftar proyek yang telah saya kerjakan.",
};

export default function ProjectsPage() {
    return (
        <div className="flex flex-col relative">
            {/* Decorative background */}
            <div className="absolute top-20 right-0 w-80 h-80 -z-10 rounded-full bg-primary/5 blur-3xl" />
            <Section className="pb-8">
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                    Proyek
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mb-12">
                    Koleksi proyek yang berkaitan dengan pengembangan web, sistem desain, dan lainnya.
                </p>
                <ProjectsList />
            </Section>
        </div>
    );
}
