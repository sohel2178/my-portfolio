import { Section, SectionHeading } from "@/components/section-heading";
import { Avatar } from "@/components/avatar";
import { site } from "@/lib/site";

// Read top-down like a depth sounding: from the screen down to the hardware.
const layers = ["interface", "realtime", "data", "backend", "protocol", "network", "hardware"];

function Corner({ className }: { className: string }) {
  return <span aria-hidden="true" className={`absolute size-3 border-route ${className}`} />;
}

export function About() {
  return (
    <Section id="about" className="border-t border-line">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading id="about-title" title="I like knowing how the whole thing works." />
          <div className="mt-8 max-w-[38rem] space-y-5 text-base leading-relaxed text-pretty text-muted sm:text-[17px]">
            <p>
              I’m a software developer from Bangladesh. Most of what I build has a physical device at one end and a
              person at the other, and a lot happens in between: radio links, TCP sockets, binary protocols, queues,
              caches, databases, and finally a dashboard.
            </p>
            <p>
              I don’t stay in one layer. When a tracker stops reporting, the cause can be the firmware, the 4G link, the
              proxy, the parser, or the cache, and I want to be able to follow it through all of them. That’s why I work
              across frontend, backend, infrastructure, networking, and hardware. The hard problems are usually where
              those layers meet, and those are the ones I find most interesting.
            </p>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:pt-2">
          <figure className="w-fit">
            <div className="relative p-2">
              <Corner className="top-0 left-0 border-t-2 border-l-2" />
              <Corner className="top-0 right-0 border-t-2 border-r-2" />
              <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
              <Corner className="right-0 bottom-0 border-r-2 border-b-2" />
              <Avatar size={176} className="size-40 rounded-[6px] sm:size-44" />
            </div>
            <figcaption className="mt-2 text-[13px] text-muted">
              {site.name}, {site.location}
            </figcaption>
          </figure>

          <div>
            <p className="text-sm font-medium text-fg">The layers I work across</p>
            <ol className="mt-3 border-l-2 border-line-strong">
              {layers.map((layer, i) => (
                <li key={layer} className="relative flex items-center gap-3 py-1.5 pl-4 text-[15px] text-fg/85">
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 -left-[2px] h-0.5 bg-route/70"
                    style={{ width: `${8 + i * 3}px` }}
                  />
                  <span style={{ marginLeft: i * 3 }}>{layer}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}
