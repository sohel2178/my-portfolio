import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  className?: string;
};

export function SectionHeading({ id, title, lede, className }: Props) {
  return (
    <Reveal className={cn("max-w-2xl", className)}>
      <h2 id={id} className="display text-[clamp(1.75rem,4.5vw,2.75rem)] leading-[1.08] text-balance text-fg">
        {title}
      </h2>
      {lede && <p className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg">{lede}</p>}
    </Reveal>
  );
}

export function Section({ id, className, children }: { id: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("py-20 sm:py-28", className)}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}
