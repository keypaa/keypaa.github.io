"use client";

import * as React from "react";
import { getSchoolYearProgress, nowItems } from "@/lib/content";
import { Eyebrow, Reveal, StaggerGroup, StaggerItem } from "./primitives";

export function NowSection() {
  // Compute the school line on the client after mount to avoid SSR/client
  // timezone hydration mismatches.
  const [schoolValue, setSchoolValue] = React.useState<string>(
    "EFREI Paris — year 1 / 5",
  );

  React.useEffect(() => {
    setSchoolValue(getSchoolYearProgress());
  }, []);

  const items = nowItems.map((item) =>
    item.label === "school" ? { ...item, value: schoolValue } : item,
  );

  return (
    <section id="now" className="mx-auto max-w-5xl scroll-mt-20 px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <Eyebrow>now</Eyebrow>
        <h2 className="mt-4 font-serif text-2xl font-medium tracking-tight sm:text-3xl">
          A snapshot of what&apos;s current.
        </h2>
      </Reveal>

      <Reveal delay={0.08} className="mt-8">
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/40">
          <StaggerGroup>
            {items.map((item, i) => (
              <StaggerItem key={item.label}>
                <div
                  className={
                    "flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-6 sm:px-7 " +
                    (i !== items.length - 1 ? "border-b border-border/60" : "")
                  }
                >
                  <span className="w-28 shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="text-[14px] text-foreground/90 sm:text-[15px]">
                    {item.value}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Reveal>
    </section>
  );
}
