import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { Preloader } from "@/components/ui/Preloader";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { MusicToggle } from "@/components/ui/MusicToggle";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { AudioInit } from "@/components/ui/AudioInit";

import { SmoothScroll } from "@/components/ui/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fauzan | Portofolio Profesional",
  description: "Portofolio Profesional Fauzan - Frontend Developer & UI Engineer",
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
          "min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/20 overflow-x-hidden",
          inter.variable,
          poppins.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            {/* Audio element: muted untuk bypass autoplay policy browser */}
            <audio
              id="bg-music"
              src="/musik (1).mp3"
              loop
              preload="auto"
              muted
              playsInline
              crossOrigin="anonymous"
            />
            {/* AudioInit: memaksa play muted via JS secepat mungkin */}
            <AudioInit />
            <Preloader />
            <ScrollProgress />
            <CursorGlow />
            <MusicToggle />
            <WhatsAppFloat />
            <ScrollToTop />
            <div className="flex flex-col min-h-screen noise-bg">
              <Navbar />
              <main className="flex-grow pt-20">{children}</main>
              <Footer />
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
