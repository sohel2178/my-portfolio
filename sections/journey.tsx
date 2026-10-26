"use client";

import { useRef } from "react";
import { m, useScroll, useSpring } from "framer-motion";
import { Section, SectionHeading } from "@/components/section-heading";
import { journey } from "@/lib/content";

export function Journey() {
  const listRef = useRef<HTMLOListElement>(null);
  // The course line fills in as the reader moves down the timeline.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 });

  return (
    <Section id="journey" className="border-t border-line">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="journey-title"
              title="Each layer led to the one below it."
              lede="I started with interfaces. Each project pushed me a layer further down, toward the device."
            />
          </div>
        </div>
        <ol ref={listRef} className="relative lg:col-span-7">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[6px] w-0.5 bg-line-strong">
            <m.span className="absolute inset-0 origin-top bg-route" style={{ scaleY }} />
          </span>
          {journey.map((step, i) => (
            <li key={step.stage} className="relative pb-10 pl-10 last:pb-0">
              <span
                aria-hidden="true"
                className={`absolute top-1.5 left-0 size-[14px] rounded-full border-2 border-route ${
                  i === journey.length - 1 ? "bg-route" : "bg-bg"
                }`}
              />
              <h3 className="text-lg font-semibold tracking-tight text-fg">{step.stage}</h3>
              <p className="mt-1.5 max-w-lg text-[15px] leading-relaxed text-pretty text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
