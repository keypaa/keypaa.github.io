"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  agentUsage,
  formatCost,
  formatNumber,
  formatTokens,
} from "@/lib/content";
import {
  Eyebrow,
  Reveal,
  StaggerGroup,
  StaggerItem,
  ease,
} from "./primitives";
import { cn } from "@/lib/utils";

/* The headline KPI cards. */
function Kpi({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card/30 p-4 sm:p-5",
        accent ? "border-clay/40" : "border-border/60",
      )}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
      <div
        className={cn(
          "mt-2 font-serif text-2xl font-medium tracking-tight sm:text-3xl",
          accent ? "text-clay" : "text-foreground",
        )}
      >
        {value}
      </div>
      {sub ? (
        <div className="mt-1 font-mono text-[10.5px] text-muted-foreground">
          {sub}
        </div>
      ) : null}
    </div>
  );
}

/* Daily sessions bar chart — pure CSS, animated grow on reveal. */
function DailyChart() {
  const { daily } = agentUsage;
  const max = Math.max(...daily.map((d) => d.sessions));
  const peakIdx = daily.findIndex((d) => d.sessions === max);

  return (
    <div className="rounded-2xl border border-border/60 bg-card/30 p-5 sm:p-6">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          sessions / day
        </h3>
        <span className="font-mono text-[11px] text-muted-foreground">
          peak {max} · {daily[peakIdx].date.slice(5)}
        </span>
      </div>

      {/* bars */}
      <div className="flex h-32 items-end gap-1 sm:gap-1.5">
        {daily.map((d, i) => {
          const h = Math.max(4, (d.sessions / max) * 100);
          const isPeak = i === peakIdx;
          return (
            <motion.div
              key={d.date}
              title={`${d.date} — ${d.sessions} sessions`}
              className={cn(
                "group relative flex-1 rounded-t-sm transition-colors",
                isPeak
                  ? "bg-clay"
                  : "bg-clay/30 hover:bg-clay/55",
              )}
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: `${h}%`, opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                ease,
                delay: i * 0.025,
              }}
            />
          );
        })}
      </div>

      {/* axis labels */}
      <div className="mt-2 flex justify-between font-mono text-[10px] text-muted-foreground/70">
        <span>{agentUsage.firstDate.slice(0, 6)}</span>
        <span>{agentUsage.lastDate.slice(0, 6)}</span>
      </div>
    </div>
  );
}

/* A labelled horizontal bar list — used for models and projects. */
function BarList({
  items,
  total,
  formatValue,
}: {
  items: { name: string; sessions: number; tokens: number }[];
  total: number;
  formatValue: (n: number) => string;
}) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((it, i) => {
        const pct = (it.sessions / total) * 100;
        return (
          <Reveal key={it.name} delay={i * 0.05} y={10}>
            <div>
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <span className="truncate font-mono text-[12px] text-foreground/90">
                  {it.name}
                </span>
                <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                  {it.sessions} · {formatValue(it.tokens)} tok
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/60">
                <motion.div
                  className="h-full rounded-full bg-clay/70"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.05 }}
                />
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export function AgentUsageSection() {
  const { kpis, tokenBreakdown, topModels, topProjects, costProjection } =
    agentUsage;
  const totalModelSessions = topModels.reduce((s, m) => s + m.sessions, 0);
  const totalProjectSessions = topProjects.reduce(
    (s, p) => s + p.sessions,
    0,
  );
  // Honest cache metric: of all tokens processed, the fraction served from cache.
  const cacheShare = Math.round(
    (tokenBreakdown.cacheRead / kpis.tokens) * 100,
  );

  return (
    <section
      id="agents"
      className="mx-auto max-w-5xl scroll-mt-20 px-5 py-16 sm:px-8 sm:py-20"
    >
      <Reveal>
        <Eyebrow>agent usage</Eyebrow>
        <h2 className="mt-4 font-serif text-2xl font-medium tracking-tight sm:text-3xl">
          I run a lot of agents. Here are the receipts.
        </h2>
        <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-muted-foreground">
          {agentUsage.rangeLabel} on {agentUsage.tool} —{" "}
          {formatNumber(kpis.sessions)} sessions,{" "}
          {formatTokens(kpis.tokens)} tokens processed,{" "}
          {formatCost(kpis.cost)} spent. Being a free-tier hacker has its
          perks.
        </p>
      </Reveal>

      {/* KPI row */}
      <Reveal delay={0.06} className="mt-9">
        <StaggerGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <StaggerItem>
            <Kpi
              label="sessions"
              value={formatNumber(kpis.sessions)}
              sub="19 days"
            />
          </StaggerItem>
          <StaggerItem>
            <Kpi
              label="messages"
              value={formatNumber(kpis.messages)}
              sub="to/from agents"
            />
          </StaggerItem>
          <StaggerItem>
            <Kpi
              label="tokens"
              value={formatTokens(kpis.tokens)}
              sub="processed"
            />
          </StaggerItem>
          <StaggerItem>
            <Kpi
              label="total cost"
              value={formatCost(kpis.cost)}
              sub={`~${formatCost(costProjection.annual)}/yr projected`}
              accent
            />
          </StaggerItem>
          <StaggerItem>
            <Kpi
              label="from cache"
              value={`${cacheShare}%`}
              sub="of all tokens"
            />
          </StaggerItem>
        </StaggerGroup>
      </Reveal>

      {/* Daily chart */}
      <Reveal delay={0.08} className="mt-4">
        <DailyChart />
      </Reveal>

      {/* Models + Projects two-column */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Reveal delay={0.06}>
          <div className="h-full rounded-2xl border border-border/60 bg-card/30 p-5 sm:p-6">
            <div className="mb-5 flex items-baseline justify-between">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                top models
              </h3>
              <span className="font-mono text-[10px] text-muted-foreground/70">
                by sessions
              </span>
            </div>
            <BarList
              items={topModels}
              total={totalModelSessions}
              formatValue={formatTokens}
            />
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="h-full rounded-2xl border border-border/60 bg-card/30 p-5 sm:p-6">
            <div className="mb-5 flex items-baseline justify-between">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                top projects
              </h3>
              <span className="font-mono text-[10px] text-muted-foreground/70">
                by sessions
              </span>
            </div>
            <BarList
              items={topProjects}
              total={totalProjectSessions}
              formatValue={formatTokens}
            />
          </div>
        </Reveal>
      </div>

      {/* footer note */}
      <Reveal delay={0.1} className="mt-6">
        <p className="font-mono text-[11px] leading-relaxed text-muted-foreground/70">
          exported from {agentUsage.tool} analytics · {agentUsage.firstDate} →{" "}
          {agentUsage.lastDate} · updated {agentUsage.updatedAt}. cache reads
          account for{" "}
          {Math.round(
            (tokenBreakdown.cacheRead / kpis.tokens) * 100,
          )}
          % of all tokens — the prompt cache does the heavy lifting.
        </p>
      </Reveal>
    </section>
  );
}
