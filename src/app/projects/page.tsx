import type { Metadata } from "next";
import { ProjectsList } from "@/components/sections/ProjectsList";
import { site } from "@/lib/site";

export const metadata: Metadata = {
    title: `Proyek Portfolio | ${site.name}`,
    description: "Koleksi proyek website profesional, portal korporat, dan aplikasi web & mobile karya Fauzan Bagus Prasetyo.",
};

export default function ProjectsPage() {
    return <ProjectsList />;
}
