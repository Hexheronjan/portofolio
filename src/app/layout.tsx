import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./providers";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";
import dynamic from "next/dynamic";

const ScrollToTop = dynamic(
  () => import("@/components/ui/ScrollToTop").then((mod) => ({ default: mod.ScrollToTop })),
  { loading: () => null }
);

const MusicToggle = dynamic(
  () => import("@/components/ui/MusicToggle").then((mod) => ({ default: mod.MusicToggle })),
  { loading: () => null }
);

const WhatsAppFloat = dynamic(
  () => import("@/components/ui/WhatsAppFloat").then((mod) => ({ default: mod.WhatsAppFloat })),
  { loading: () => null }
);

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — ${site.role}`,
  description: `${site.name} (${site.role}) - ${site.tagline}`,
  keywords: [
    "Fauzan Bagus Prasetyo",
    "Full Stack Developer Indonesia",
    "Mobile Developer",
    "React Developer",
    "Next.js Developer",
    "SMK Negeri 1 Jenangan",
    "Web Developer Ponorogo",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/set.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/20 selection:text-primary"
        )}
      >
        <a href="#content" className="skip-link">
          Lewati ke konten utama
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Audio latar: default pause, tanpa autoplay paksaan */}
          <audio
            id="bg-music"
            src="/music.mp3"
            loop
            preload="none"
          />

          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main id="content" className="flex-grow pt-16">
              {children}
            </main>
            <Footer />
          </div>

          <MusicToggle />
          <WhatsAppFloat />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
