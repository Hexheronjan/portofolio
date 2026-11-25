import { Hero } from "@/components/sections/Hero";
import { TechStream } from "@/components/ui/TechStream";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { LiveTechShowcase } from "@/components/sections/LiveTechShowcase";
import { DynamicPhoto } from "@/components/sections/DynamicPhoto";
import { Certificates } from "@/components/sections/Certificates";
import { Journey } from "@/components/sections/Journey";

export default function Home() {
  return (
    <>
      <Hero />
      <TechStream />
      <FeaturedProjects />
      <LiveTechShowcase />
      <DynamicPhoto />
      <Certificates />
      <Journey />
    </>
  );
}
