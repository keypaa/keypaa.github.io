"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { navLinks, profile } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 12);
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="group flex items-center gap-2 font-serif text-[17px] font-medium tracking-tight"
        >
          <span className="text-foreground transition-colors group-hover:text-clay">
            {profile.name}
          </span>
          <span className="inline-block h-1.5 w-1.5 translate-y-px rounded-full bg-clay transition-transform duration-300 group-hover:scale-125" />
        </a>

        <nav className="flex items-center gap-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-2.5 py-1.5 font-mono text-[12px] text-muted-foreground transition-colors hover:text-foreground sm:px-3"
            >
              {l.label}
            </a>
          ))}
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 hidden rounded-md border border-border/70 px-3 py-1.5 font-mono text-[12px] text-muted-foreground transition-colors hover:border-clay/50 hover:text-clay sm:inline-block"
          >
            github
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
