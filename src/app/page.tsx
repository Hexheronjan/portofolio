import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedProjects />
    </div>
  );
}
