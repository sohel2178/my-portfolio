import { ArrowUpRight, Mail } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { CopyEmail } from "@/components/copy-email";
import { GitHubIcon } from "@/components/icons/brand";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line">
      <div
        aria-hidden="true"
        className="graticule pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_top,#000,transparent)]"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-36">
        <Reveal>
          <h2
            id="contact-title"
            className="display max-w-4xl text-[clamp(2.25rem,6.5vw,4.5rem)] leading-[1.02] text-balance text-fg"
          >
            Have a system that needs to be built? Let’s talk.
          </h2>
        </Reveal>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          Email is the fastest way to reach me. Tell me what the system has to do and where it runs.
        </p>

        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={`mailto:${site.email}`} className="min-w-0">
            <Mail /> <span className="truncate">{site.email}</span>
          </ButtonLink>
          <CopyEmail email={site.email} />
          {site.github && (
            <ButtonLink href={site.github} target="_blank" rel="noopener noreferrer" variant="ghost">
              <GitHubIcon /> GitHub <ArrowUpRight />
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
