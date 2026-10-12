import type { Metadata } from "next";
import { ContactContent } from "@/components/sections/ContactContent";
import { site } from "@/lib/site";

export const metadata: Metadata = {
    title: `Kontak | ${site.name}`,
    description: `Hubungi ${site.name} untuk kolaborasi proyek pembuatan website dan aplikasi mobile. Respons cepat via WhatsApp dan email.`,
};

export default function ContactPage() {
    return <ContactContent />;
}
