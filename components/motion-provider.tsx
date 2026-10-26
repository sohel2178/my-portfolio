"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

// Every animation honours the visitor's reduced-motion setting.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
