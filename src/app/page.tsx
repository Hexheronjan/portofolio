import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { DynamicPhoto } from "@/components/sections/DynamicPhoto";
import { Journey } from "@/components/sections/Journey";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { AbstractBackground } from "@/components/ui/AbstractBackground";

export default function Home() {
  return (
    <main className="relative flex flex-col noise-bg">
      {/* Global custom cursor for desktop (disabled automatically on mobile) */}
      <CustomCursor />
      
      {/* Global noise texture overlay for premium aesthetic */}
      <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'url("/noise.png")' }} />

      {/* Latar belakang abstrak yang mengikuti scroll */}
      <AbstractBackground />

      {/* Komponen-komponen utama */}
      <Hero />
      <FeaturedProjects />
      <DynamicPhoto />
      <Journey />
    </main>
  );
}

