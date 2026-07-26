"use client";

import { ArrowUpRight } from "lucide-react";
import { experiments, type Experiment } from "@/lib/content";
import {
  Eyebrow,
  Reveal,
  StatusBadge,
  StaggerGroup,
  StaggerItem,
} from "./primitives";
import { cn } from "@/lib/utils";

function ExperimentCard({ exp }: { exp: Experiment }) {
  const isPlanning = exp.status === "planning";
  return (
    <StaggerItem>
      <article
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-card/55",
          isPlanning
            ? "border-dashed border-clay/30 hover:border-clay/50"
            : "border-border/60 hover:border-clay/45",
        )}
      >
        {/* warm glow on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-clay/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="relative flex items-start justify-between gap-3">
          <h3 className="font-serif text-lg font-medium leading-snug tracking-tight text-foreground">
            {exp.name}
          </h3>
          <StatusBadge status={exp.status} className="shrink-0" />
        </div>

        <p className="relative mt-3 text-[14px] leading-relaxed text-foreground/80">
          {exp.blurb}
        </p>
        <p className="relative mt-3 text-[13px] leading-relaxed text-muted-foreground">
          {exp.detail}
        </p>

        <div className="relative mt-auto flex flex-wrap items-center gap-1.5 pt-5">
          {exp.tags.map((t) => (
            <span
              key={t}
              className="rounded-md bg-muted/50 px-2 py-0.5 font-mono text-[10.5px] text-muted-foreground ring-1 ring-inset ring-border/50"
            >
              {t}
            </span>
          ))}
        </div>

        {exp.link ? (
          <a
            href={exp.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-5 inline-flex items-center gap-1.5 font-mono text-[12px] text-clay transition-colors hover:text-foreground"
          >
            {exp.link.label}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ) : (
          <div className="relative mt-5 inline-flex items-center gap-1.5 font-mono text-[12px] text-muted-foreground/70">
            more soon
          </div>
        )}
      </article>
    </StaggerItem>
  );
}

export function Experiments() {
  return (
    <section
      id="experiments"
      className="mx-auto max-w-5xl scroll-mt-20 px-5 py-16 sm:px-8 sm:py-20"
    >
      <Reveal>
        <Eyebrow>workbench</Eyebrow>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-xl font-serif text-2xl font-medium tracking-tight sm:text-3xl">
            Things I&apos;ve built, broken, and reverse-engineered.
          </h2>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {experiments.length} entries · no GPUs harmed
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.08} className="mt-10">
        <StaggerGroup className="grid gap-4 md:grid-cols-2">
          {experiments.map((e) => (
            <ExperimentCard key={e.id} exp={e} />
          ))}
        </StaggerGroup>
      </Reveal>
    </section>
  );
}
