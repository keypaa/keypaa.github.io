"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "@/lib/content";
import { Eyebrow, Reveal, StaggerGroup, StaggerItem } from "./primitives";

const links = [
  {
    label: "X / Twitter",
    handle: `@${profile.x}`,
    href: profile.xUrl,
    note: "DMs are open",
  },
  {
    label: "GitHub",
    handle: profile.github,
    href: profile.githubUrl,
    note: "where the tinkering lives",
  },
  {
    label: "Hugging Face",
    handle: profile.hf,
    href: profile.hfUrl,
    note: "models & spaces",
  },
  {
    label: "Email",
    handle: "say hi",
    href: `mailto:${profile.email}`,
    note: profile.email,
  },
];

export function Elsewhere() {
  return (
    <section
      id="elsewhere"
      className="mx-auto max-w-5xl scroll-mt-20 px-5 py-16 sm:px-8 sm:py-20"
    >
      <Reveal>
        <Eyebrow>elsewhere</Eyebrow>
        <h2 className="mt-4 font-serif text-2xl font-medium tracking-tight sm:text-3xl">
          Find me, or say hi.
        </h2>
        <p className="mt-3 max-w-lg text-[14.5px] leading-relaxed text-muted-foreground">
          I lurk more than I post, but I read everything and I&apos;m always up
          for a conversation about AI tooling, reverse-engineering, or a good
          book.
        </p>
      </Reveal>

      <Reveal delay={0.08} className="mt-9">
        <StaggerGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l) => (
            <StaggerItem key={l.label}>
              <a
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex h-full flex-col justify-between rounded-2xl border border-border/60 bg-card/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-clay/45 hover:bg-card/55"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-clay">
                    {l.label}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-clay" />
                </div>
                <div className="mt-6">
                  <p className="font-serif text-lg tracking-tight text-foreground">
                    {l.handle}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                    {l.note}
                  </p>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Reveal>

      <Reveal delay={0.12} className="mt-8">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 font-mono text-[12px] text-muted-foreground transition-colors hover:text-clay"
        >
          <Mail className="h-3.5 w-3.5" />
          {profile.email}
        </a>
      </Reveal>
    </section>
  );
}
