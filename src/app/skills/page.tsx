import type { Metadata } from "next";
import { SkillsContent } from "@/components/sections/SkillsContent";
import { site } from "@/lib/site";

export const metadata: Metadata = {
    title: `Keahlian & Teknologi | ${site.name}`,
    description: `Daftar keahlian teknis ${site.name}: Go (Golang), C, C++, Java, Kotlin, TypeScript, React, Next.js, React Native, Node.js, PHP/Laravel, PostgreSQL, dan WordPress.`,
};

export default function SkillsPage() {
    return <SkillsContent />;
}
