import { Activity, Binary, Cpu, Layers, Map, Server } from "lucide-react";
import { Section, SectionHeading } from "@/components/section-heading";
import { capabilities, type Capability } from "@/lib/content";

const icons: Record<Capability["icon"], typeof Activity> = {
  activity: Activity,
  map: Map,
  server: Server,
  cpu: Cpu,
  layers: Layers,
  binary: Binary,
};

export function WhatIBuild() {
  return (
    <Section id="build" className="border-t border-line">
      <SectionHeading
        id="build-title"
        title="Systems with moving parts."
        lede="The kind of software where devices, networks, and people are all part of the same loop."
      />
      <dl className="mt-12 grid gap-x-12 sm:grid-cols-2">
        {capabilities.map((c) => {
          const Icon = icons[c.icon];
          return (
            <div key={c.title} className="border-t border-line py-7">
              <dt className="flex items-center gap-3 text-lg font-semibold tracking-tight text-fg">
                <Icon className="size-5 shrink-0 text-route" strokeWidth={1.75} aria-hidden="true" />
                {c.title}
              </dt>
              <dd className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">{c.body}</dd>
              <dd className="mt-4 text-[13px] text-subtle">{c.tags.join(", ")}</dd>
            </div>
          );
        })}
      </dl>
    </Section>
  );
}
