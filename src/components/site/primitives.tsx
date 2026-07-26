"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/* Gentle, deliberate easing used across the site */
export const ease = [0.22, 0.61, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </MotionTag>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

export function StaggerGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

/* Mono eyebrow label with a small clay tick */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-clay",
        className,
      )}
    >
      <span className="inline-block h-1 w-1 rounded-full bg-clay" />
      <span>{children}</span>
    </div>
  );
}

export type Status = "live" | "wip" | "planning";

const statusMeta: Record<
  Status,
  { label: string; dot: string; text: string; ring: string }
> = {
  live: {
    label: "live",
    dot: "bg-emerald-400/90",
    text: "text-emerald-300/90",
    ring: "ring-emerald-400/20",
  },
  wip: {
    label: "in progress",
    dot: "bg-amber-400/90",
    text: "text-amber-300/90",
    ring: "ring-amber-400/20",
  },
  planning: {
    label: "planning",
    dot: "bg-clay/90",
    text: "text-clay",
    ring: "ring-clay/25",
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: Status;
  className?: string;
}) {
  const m = statusMeta[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ring-1 ring-inset",
        m.text,
        m.ring,
        className,
      )}
    >
      <span className={cn("inline-block h-1.5 w-1.5 rounded-full", m.dot)} />
      {m.label}
    </span>
  );
}

/* Hairline divider with a soft fade on both ends */
export function Hairline({ className }: { className?: string }) {
  return (
    <div
      className={cn("h-px w-full hairline", className)}
      aria-hidden="true"
    />
  );
}
