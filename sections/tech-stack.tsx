import { Section, SectionHeading } from "@/components/section-heading";
import { TechIcon, hasTechIcon } from "@/components/icons/tech";
import { primaryTech, skillGroups } from "@/lib/content";

export function TechStack() {
  return (
    <Section id="stack" className="border-t border-line">
      <SectionHeading
        id="stack-title"
        title="Tools I reach for first."
        lede="The core set I use day to day, followed by the wider set I work with across the stack."
      />

      <ul className="mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-[10px] border border-line bg-line sm:grid-cols-4 lg:grid-cols-7">
        {primaryTech.map((name) => (
          <li key={name} className="group bg-bg">
            <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2.5 transition-colors duration-300 group-hover:bg-surface">
              {hasTechIcon(name) ? (
                <TechIcon
                  name={name}
                  className="size-6 text-muted transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:text-route"
                />
              ) : (
                <span className="grid h-6 place-items-center rounded-[2px] border border-muted/60 px-1.5 font-mono text-[10px] font-semibold text-muted transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:text-route">
                  0x7E
                </span>
              )}
              <span className="text-[12.5px] text-subtle transition-colors group-hover:text-fg">{name}</span>
            </div>
          </li>
        ))}
      </ul>

      <dl className="mt-12 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g) => (
          <div key={g.name} className="border-t border-line py-6">
            <dt className="text-[15px] font-semibold text-fg">{g.name}</dt>
            <dd className="mt-2 text-[14.5px] leading-relaxed text-muted">{g.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
