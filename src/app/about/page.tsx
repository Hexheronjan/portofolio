import type { Metadata } from "next";
import { AboutContent } from "@/components/sections/AboutContent";

export const metadata: Metadata = {
    title: "Tentang | Fauzan",
    description: "Pelajari lebih lanjut tentang Fauzan, seorang Frontend Developer yang berspesialisasi dalam React dan Next.js.",
};

export default function AboutPage() {
    return <AboutContent />;
}
