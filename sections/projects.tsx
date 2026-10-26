"use client";

import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { GitHubIcon } from "@/components/icons/brand";
import { Jt808Frame, SignalPath } from "@/components/project-visuals";
import { featuredProject, projects, type Project } from "@/lib/content";

function ProjectLinks({ project }: { project: Project }) {
  if (!project.url && !project.repo) return null;
  return (
    <div className="mt-6 flex gap-2">
      {project.url && (
        <ButtonLink href={project.url} target="_blank" rel="noopener noreferrer" variant="outline" size="sm">
          Live site <ArrowUpRight />
        </ButtonLink>
      )}
      {project.repo && (
        <ButtonLink href={project.repo} target="_blank" rel="noopener noreferrer" variant="ghost" size="sm">
          <GitHubIcon /> Source
        </ButtonLink>
      )}
    </div>
  );
}

function Stack({ items }: { items: string[] }) {
  return <p className="text-[13.5px] leading-relaxed text-subtle">{items.join(", ")}</p>;
}

const route = "M40 230 C 90 215, 120 140, 200 138 S 300 110, 330 70";

// Stylised live map: streets, a river, one route that draws itself when scrolled into view, a few vehicles.
function RouteMap() {
  const vehicles: [number, number, string][] = [
    [40, 230, "var(--subtle)"],
    [200, 138, "var(--route)"],
    [330, 70, "var(--route)"],
    [272, 232, "var(--water)"],
    [96, 72, "var(--route)"],
  ];
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <path
        d="M-10 120 C 80 150, 140 260, 260 250 S 380 300, 420 320"
        fill="none"
        stroke="var(--water)"
        strokeWidth="16"
        opacity="0.12"
      />
      <g fill="none" stroke="var(--line-strong)" strokeWidth="5" strokeLinecap="round" opacity="0.7">
        <path d="M-10 210 C 80 200, 120 120, 210 130 S 330 60, 420 70" />
        <path d="M60 -10 C 70 80, 40 160, 90 310" />
        <path d="M250 -10 C 240 100, 300 200, 280 310" />
        <path d="M-10 60 L 420 250" strokeWidth="2.5" />
      </g>
      <m.path
        d={route}
        fill="none"
        stroke="var(--route)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.6, ease: [0.45, 0, 0.2, 1] }}
      />
      {vehicles.map(([x, y, c], i) => (
        <m.g
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.15 }}
        >
          <circle cx={x} cy={y} r="9" fill={c} opacity="0.15" />
          <circle cx={x} cy={y} r="4" fill={c} stroke="var(--bg)" strokeWidth="1.5" />
        </m.g>
      ))}
      <g
        fontSize="11"
        fill="var(--fg)"
        stroke="var(--bg)"
        strokeWidth="4"
        style={{ paintOrder: "stroke" }}
        strokeLinejoin="round"
      >
        <text x="212" y="130">
          moving
        </text>
        <text x="284" y="236" fill="var(--water)">
          alert
        </text>
        <text x="318" y="62" textAnchor="end">
          online
        </text>
      </g>
    </svg>
  );
}

function Featured() {
  const p = featuredProject;
  return (
    <Reveal>
      <article className="overflow-hidden rounded-[10px] border border-line bg-surface">
        <div className="grid lg:grid-cols-12">
          <div className="p-6 sm:p-10 lg:col-span-7">
            <p className="text-[13px] text-muted">{p.category}</p>
            <h3 className="display mt-3 text-[clamp(1.75rem,4vw,2.5rem)] leading-tight text-fg">{p.name}</h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-[17px]">{p.summary}</p>

            <div className="mt-8 border-l-2 border-route pl-5">
              <p className="text-sm font-medium text-fg">The hard part</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-pretty text-fg/85">{p.challenge}</p>
            </div>

            <div className="mt-8">
              <p className="text-sm font-medium text-fg">What it does</p>
              <ul className="mt-3 grid gap-x-6 gap-y-2 text-[14.5px] text-muted sm:grid-cols-2">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-[9px] size-1 shrink-0 rounded-full bg-route" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <ProjectLinks project={p} />
          </div>

          <div className="graticule flex flex-col border-t border-line bg-bg/60 lg:col-span-5 lg:border-t-0 lg:border-l">
            <div className="relative min-h-64 flex-1">
              <div className="absolute inset-0">
                <RouteMap />
              </div>
            </div>
            <div className="border-t border-line bg-surface/80 p-5 sm:p-6">
              <p className="mb-1.5 text-sm font-medium text-fg">Built with</p>
              <Stack items={p.stack} />
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function ProjectEntry({ project }: { project: Project }) {
  return (
    <article className="flex flex-col border-t border-line pt-8">
      <p className="text-[13px] text-muted">{project.category}</p>
      <h3 className="display mt-2 text-xl text-fg sm:text-2xl">{project.name}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-pretty text-muted">{project.summary}</p>
      {project.visual === "jt808-frame" && <Jt808Frame />}
      {project.visual === "signal-path" && <SignalPath />}

      <div className="mt-6 border-l-2 border-line-strong pl-4">
        <p className="text-sm font-medium text-fg">The hard part</p>
        <p className="mt-1 text-[14.5px] leading-relaxed text-pretty text-fg/80">{project.challenge}</p>
      </div>

      <ul className="mt-6 space-y-1.5 text-[14.5px] text-muted">
        {project.features.map((f) => (
          <li key={f} className="flex gap-2.5">
            <span aria-hidden="true" className="mt-[9px] size-1 shrink-0 rounded-full bg-route/70" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <Stack items={project.stack} />
      </div>
      <ProjectLinks project={project} />
    </article>
  );
}

export function Projects() {
  return (
    <Section id="work" className="border-t border-line">
      <SectionHeading
        id="work-title"
        title="Production systems, protocols, and hardware."
        lede="What each system does, and what made it hard to build."
      />
      <div className="mt-12">
        <Featured />
        <div className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectEntry key={p.name} project={p} />
          ))}
        </div>
      </div>
    </Section>
  );
}
