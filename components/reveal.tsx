"use client";

import { m } from "framer-motion";

type Props = {
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

// Used sparingly: section headings and the featured project only.
export function Reveal({ delay = 0, className, children }: Props) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay: delay / 1000, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </m.div>
  );
}
