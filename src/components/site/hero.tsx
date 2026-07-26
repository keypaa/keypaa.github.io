"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/content";
import { ease } from "./primitives";

const wordVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay: 0.08 * i },
  }),
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto max-w-5xl px-5 pb-20 pt-16 sm:px-8 sm:pt-28"
    >
      {/* mono meta line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.1 }}
        className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
      >
        <span className="text-clay">{profile.handle}</span>
        <span className="text-border">/</span>
        <span>{profile.school}</span>
        <span className="text-border">/</span>
        <span>{profile.location}</span>
      </motion.div>

      {/* Name */}
      <h1 className="font-serif text-[clamp(2.75rem,9vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.02em]">
        {["Keylhan", "Paumard–André"].map((w, i) => (
          <motion.span
            key={w}
            custom={i}
            variants={wordVariants}
            initial="hidden"
            animate="show"
            className="block"
          >
            {w}
          </motion.span>
        ))}
      </h1>

      {/* tagline */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.42 }}
        className="mt-7 max-w-2xl font-mono text-[13px] leading-relaxed text-clay sm:text-sm"
      >
        {profile.tagline}
      </motion.p>

      {/* blurb */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.54 }}
        className="mt-6 max-w-2xl text-[15px] leading-[1.75] text-foreground/80 sm:text-base"
      >
        {profile.blurb}
      </motion.p>

      {/* quick links row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.66 }}
        className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[12px] text-muted-foreground"
      >
        <a
          href={profile.xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
        >
          <span className="text-clay">x</span>
          <span>@{profile.x}</span>
        </a>
        <span className="h-3 w-px bg-border" />
        <a
          href={profile.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
        >
          <span className="text-clay">gh</span>
          <span>{profile.github}</span>
        </a>
        <span className="h-3 w-px bg-border" />
        <a
          href={profile.hfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
        >
          <span className="text-clay">hf</span>
          <span>{profile.hf}</span>
        </a>
        <span className="h-3 w-px bg-border" />
        <a
          href={`mailto:${profile.email}`}
          className="group inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
        >
          <span className="text-clay">mail</span>
          <span>say hi</span>
        </a>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease, delay: 1 }}
        className="mt-16 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60"
      >
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block"
        >
          ↓
        </motion.span>
        <span>scroll</span>
      </motion.div>
    </section>
  );
}
