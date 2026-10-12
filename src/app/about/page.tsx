import type { Metadata } from "next";
import { AboutContent } from "@/components/sections/AboutContent";
import { site } from "@/lib/site";

export const metadata: Metadata = {
    title: `Tentang | ${site.name}`,
    description: `Profil profesional ${site.name}, ${site.role}. Lulusan RPL SMKN 1 Jenangan dengan spesialisasi pengembangan web dan aplikasi mobile.`,
};

export default function AboutPage() {
    return <AboutContent />;
}
