"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Section, SectionHeading } from "@/components/section-heading";
import { architecture, type ArchNode } from "@/lib/content";
import { cn } from "@/lib/utils";

const layerLabel: Record<ArchNode["layer"], string> = {
  device: "device",
  network: "network",
  edge: "edge / L4",
  service: "service",
  data: "data",
  realtime: "realtime",
  client: "client",
};

const ease = [0.2, 0.7, 0.2, 1] as const;

function Detail({ node, index }: { node: ArchNode; index: number }) {
  return (
    <div>
      <p className="text-[13px] text-muted">
        Stage {index + 1} of {architecture.length}, {layerLabel[node.layer]} layer
      </p>
      <h3 className="display mt-2 text-xl text-fg sm:text-2xl">{node.label}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-pretty text-muted">{node.detail}</p>
      <ul className="mt-5 grid gap-2 text-[14px] sm:grid-cols-2">
        {node.points.map((p) => (
          <li key={p} className="flex items-center gap-2.5 text-fg/85">
            <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full border border-route" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Architecture() {
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Walk through the pipeline on its own while visible on desktop, until the visitor takes over.
  useEffect(() => {
    if (interacted) return;
    const el = rootRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!el || reduce || !desktop) return;

    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        clearInterval(timer);
        if (entry.isIntersecting) {
          timer = setInterval(() => setActive((i) => (i + 1) % architecture.length), 3200);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, [interacted]);

  const select = (i: number) => {
    setInteracted(true);
    setActive(i);
  };

  const progress = architecture.length > 1 ? active / (architecture.length - 1) : 0;

  return (
    <Section id="architecture" className="relative overflow-hidden border-t border-line">
      <div
        aria-hidden="true"
        className="graticule pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)]"
      />
      <div className="relative">
        <SectionHeading
          id="architecture-title"
          title="From a tracker on a vehicle to a fleet manager’s screen."
          lede="A simplified view of the GPS platforms I build and run. Select a stage to see what happens there."
        />

        <div ref={rootRef} className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <ol className="relative lg:col-span-6" aria-label="Data pipeline stages">
            {/* Course line: the travelled part is drawn in route colour */}
            <span aria-hidden="true" className="absolute top-6 bottom-6 left-[19px] w-0.5 bg-line-strong">
              <m.span
                className="absolute inset-x-0 top-0 h-full origin-top bg-route"
                initial={false}
                animate={{ scaleY: progress }}
                transition={{ duration: 0.5, ease }}
              />
            </span>

            {architecture.map((node, i) => {
              const isActive = i === active;
              return (
                <li key={node.id} className="relative">
                  <button
                    type="button"
                    onClick={() => select(i)}
                    onMouseEnter={() => select(i)}
                    onFocus={() => select(i)}
                    aria-pressed={isActive}
                    className="group flex w-full items-center gap-4 rounded-lg py-1.5 text-left"
                  >
                    <span
                      className={cn(
                        "relative z-10 grid size-10 shrink-0 place-items-center rounded-full border-2 bg-bg text-[13px] font-medium tabular-nums transition-colors duration-300",
                        isActive || i < active ? "border-route text-route" : "border-line-strong text-subtle",
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className="relative flex min-w-0 flex-1 items-center justify-between gap-3 rounded-lg px-4 py-3">
                      {isActive && (
                        <m.span
                          layoutId="arch-active"
                          aria-hidden="true"
                          className="absolute inset-0 rounded-lg border border-route/40 bg-surface"
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        />
                      )}
                      <span className="relative min-w-0">
                        <span
                          className={cn(
                            "block truncate text-[15px] font-medium transition-colors",
                            isActive ? "text-fg" : "text-fg/75 group-hover:text-fg",
                          )}
                        >
                          {node.label}
                        </span>
                        <span className="block truncate text-[13px] text-subtle">{node.sub}</span>
                      </span>
                      <span className="relative hidden shrink-0 text-[12.5px] text-subtle sm:block">
                        {layerLabel[node.layer]}
                      </span>
                    </span>
                  </button>

                  {/* Mobile: detail opens inline under the selected stage */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <m.div
                        key="detail"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                        className="overflow-hidden lg:hidden"
                      >
                        <div className="mt-1 mb-3 ml-14 rounded-[10px] border border-line bg-surface p-5">
                          <Detail node={node} index={i} />
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>

          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-28 rounded-[10px] border border-line bg-surface p-8">
              <div className="min-h-64">
                <AnimatePresence mode="wait" initial={false}>
                  <m.div
                    key={active}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease }}
                  >
                    <Detail node={architecture[active]} index={active} />
                  </m.div>
                </AnimatePresence>
              </div>
              <div className="mt-8 border-t border-line pt-5">
                <div className="flex gap-1" aria-hidden="true">
                  {architecture.map((n, i) => (
                    <span
                      key={n.id}
                      className={cn(
                        "h-1 flex-1 rounded-full transition-colors duration-300",
                        i < active ? "bg-route/40" : i === active ? "bg-route" : "bg-line-strong",
                      )}
                    />
                  ))}
                </div>
                <dl className="mt-5 space-y-1.5 text-[13.5px] text-muted">
                  <div className="flex gap-3">
                    <dt className="w-12 shrink-0 font-medium text-fg">Ingest</dt>
                    <dd>Tracker, TCP, parser, then Redis and MongoDB</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-12 shrink-0 font-medium text-fg">Push</dt>
                    <dd>Redis to Socket.IO and Firebase, then the dashboard</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
