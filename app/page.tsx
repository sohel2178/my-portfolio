import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { WhatIBuild } from "@/sections/what-i-build";
import { Architecture } from "@/sections/architecture";
import { Projects } from "@/sections/projects";
import { TechStack } from "@/sections/tech-stack";
import { Philosophy } from "@/sections/philosophy";
import { Journey } from "@/sections/journey";
import { Contact } from "@/sections/contact";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-md bg-fg px-4 py-2 text-sm text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <WhatIBuild />
        <Architecture />
        <Projects />
        <TechStack />
        <Philosophy />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
