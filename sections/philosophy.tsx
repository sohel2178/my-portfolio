import { Section, SectionHeading } from "@/components/section-heading";
import { philosophy } from "@/lib/content";

export function Philosophy() {
  return (
    <Section id="principles" className="border-t border-line">
      <SectionHeading id="principles-title" title="How I approach the work." />
      <ul className="mt-10">
        {philosophy.map((line) => (
          <li key={line} className="border-b border-line py-6 first:border-t sm:py-8">
            <p className="display max-w-4xl text-[clamp(1.4rem,3.4vw,2.25rem)] leading-tight text-balance text-fg">
              {line}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
