"use client";

import { profile } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-border/60 bg-background/40">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-2.5 font-serif text-[15px]">
          <span className="text-foreground">Keylhan Paumard–André</span>
          <span className="inline-block h-1 w-1 rounded-full bg-clay" />
          <span className="font-mono text-[11px] lowercase tracking-[0.12em] text-muted-foreground">
            {profile.handle}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground/70">
          <span>© {year}</span>
          <span className="hidden sm:inline text-border">·</span>
          <span>built in Paris</span>
          <span className="hidden sm:inline text-border">·</span>
          <span>Next.js · Tailwind · Framer Motion</span>
        </div>
      </div>
    </footer>
  );
}
