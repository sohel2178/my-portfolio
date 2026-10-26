"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable (insecure context); the mailto link still works.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={buttonVariants({ variant: "outline" })}
      aria-label="Copy email address"
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={copied ? "check" : "copy"}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.4, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
          className="grid place-items-center"
        >
          {copied ? <Check className="text-route" /> : <Copy />}
        </m.span>
      </AnimatePresence>
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
