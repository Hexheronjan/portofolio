import type { Metadata } from "next";
import { SkillsContent } from "@/components/sections/SkillsContent";

export const metadata: Metadata = {
    title: "Keahlian | Fauzan",
    description: "Keahlian teknis dan kepakaran Fauzan.",
};

export default function SkillsPage() {
    return <SkillsContent />;
}
