"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { GitHubIcon } from "@/components/icons/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

// Highlights the nav item whose section is crossing the upper part of the viewport.
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    // The hero is observed too, so scrolling back to the top clears the highlight.
    const els = ["#top", ...nav.map((n) => n.href)]
      .map((href) => document.querySelector(href))
      .filter((el): el is Element => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id === "top" ? null : `#${e.target.id}`);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled || open ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent",
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-[15px] text-fg">
          <span aria-hidden="true" className="grid size-4 place-items-center rounded-full border-2 border-route">
            <span className="size-1 rounded-full bg-route" />
          </span>
          <span className="display text-[15px] tracking-[-0.01em]">{site.name}</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? "true" : undefined}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-sm transition-colors hover:text-fg",
                active === item.href ? "text-fg" : "text-muted",
              )}
            >
              {item.label}
              {active === item.href && (
                <m.span
                  layoutId="nav-active"
                  className="absolute inset-x-3.5 -bottom-px h-0.5 rounded-full bg-route"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
            </a>
          ))}
          {site.github && (
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="ml-1 grid size-10 place-items-center rounded-full text-muted transition-colors hover:text-fg"
            >
              <GitHubIcon className="size-4" />
            </a>
          )}
          <ThemeToggle className="ml-1" />
        </div>

        <div className="-mr-2 flex items-center md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-muted hover:text-fg"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <ul className="mx-auto max-w-6xl px-5 py-3">
              {nav.map((item, i) => (
                <m.li
                  key={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.06, duration: 0.24 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="display block py-3 text-xl text-fg/85 hover:text-route"
                  >
                    {item.label}
                  </a>
                </m.li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
