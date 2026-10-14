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
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    siteName: site.name,
    images: [
      {
        url: "/portrait-hero.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    images: ["/portrait-hero.png"],
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(sessionStorage.getItem("portfolio_intro_shown")==="true"){document.documentElement.setAttribute("data-intro","skip");}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": `${site.url}/#person`,
                  name: site.name,
                  jobTitle: site.role,
                  description: site.tagline,
                  url: site.url,
                  email: site.email,
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Ponorogo",
                    addressRegion: "Jawa Timur",
                    addressCountry: "ID",
                  },
                  sameAs: [site.socials.github, site.socials.linkedin],
                  alumniOf: {
                    "@type": "EducationalOrganization",
                    name: "SMK Negeri 1 Jenangan",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": `${site.url}/#website`,
                  url: site.url,
                  name: `${site.name} — Portfolio`,
                  description: site.tagline,
                  inLanguage: "id-ID",
                  publisher: {
                    "@id": `${site.url}/#person`,
                  },
                },
              ],
            }),
          }}
        />
      </head>
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
