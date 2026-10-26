"use client";

import { Fragment } from "react";
import { m } from "framer-motion";
import { Mail } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { GitHubIcon } from "@/components/icons/brand";
import { Avatar } from "@/components/avatar";
import { HeroChart } from "@/components/hero-chart";
import { site } from "@/lib/site";

const headline = "I build systems that connect software, devices, and the real world.";
const ease = [0.2, 0.7, 0.2, 1] as const;

export function Hero() {
  const words = headline.split(" ");
  return (
    <section id="top" aria-labelledby="hero-title" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <m.div
            data-reveal
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <span className="shrink-0 rounded-full p-[3px] ring-2 ring-route">
              <Avatar size={56} priority className="size-12 rounded-full sm:size-14" />
            </span>
            <span>
              <span className="block text-[15px] font-semibold text-fg">{site.name}</span>
              <span className="block text-sm text-muted">Backend and IoT systems, {site.location}</span>
            </span>
          </m.div>

          <h1
            id="hero-title"
            className="display mt-8 text-[clamp(2.25rem,6.2vw,4.25rem)] leading-[1.02] text-balance text-fg"
          >
            {words.map((w, i) => (
              <Fragment key={i}>
                <m.span
                  data-reveal
                  className="inline-block"
                  initial={{ opacity: 0, y: "0.35em" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.15 + i * 0.035, ease }}
                >
                  {w}
                </m.span>{" "}
              </Fragment>
            ))}
          </h1>

          <m.div
            data-reveal
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease }}
          >
            <p className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-pretty text-muted sm:text-lg">
              Software developer focused on real-time systems, GPS tracking, IoT, backend infrastructure, and scalable
              web applications. I work from the tracker on the vehicle to the dashboard on the screen.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="#work">View projects</ButtonLink>
              <ButtonLink href="#contact" variant="outline">
                Contact me
              </ButtonLink>
              <span className="flex items-center gap-1">
                {site.github && (
                  <ButtonLink
                    href={site.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="ghost"
                    size="icon"
                    aria-label="GitHub profile"
                  >
                    <GitHubIcon />
                  </ButtonLink>
                )}
                <ButtonLink
                  href={`mailto:${site.email}`}
                  variant="ghost"
                  size="icon"
                  aria-label={`Email ${site.email}`}
                >
                  <Mail />
                </ButtonLink>
              </span>
            </div>
          </m.div>
        </div>

        <m.div
          data-reveal
          className="lg:col-span-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <HeroChart />
        </m.div>
      </div>
    </section>
  );
}
