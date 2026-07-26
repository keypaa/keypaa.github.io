"use client";

import * as React from "react";
import { BookOpen, Bookmark } from "lucide-react";
import { books, type Book } from "@/lib/content";
import { Eyebrow, Reveal, StaggerGroup, StaggerItem } from "./primitives";
import { cn } from "@/lib/utils";

function BookRow({ book }: { book: Book }) {
  return (
    <StaggerItem>
      <article className="group relative rounded-xl border border-border/60 bg-card/30 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-clay/40 hover:bg-card/60 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-serif text-lg font-medium leading-snug tracking-tight text-foreground">
              {book.title}
            </h3>
            <p className="mt-1 font-mono text-[12px] text-muted-foreground">
              {book.author}
              {book.edition ? <span className="text-border"> · {book.edition}</span> : null}
              {book.note ? <span className="text-clay"> · {book.note}</span> : null}
            </p>
          </div>
          <span
            className={cn(
              "mt-1 shrink-0 font-mono text-[10px] uppercase tracking-[0.18em]",
              book.status === "read"
                ? "text-muted-foreground"
                : "text-clay",
            )}
          >
            {book.status === "read"
              ? "read"
              : book.status === "ongoing"
                ? "ongoing"
                : "up next"}
          </span>
        </div>
        {book.take ? (
          <p className="mt-3 border-l-2 border-clay/40 pl-3 text-[13.5px] italic leading-relaxed text-foreground/65">
            {book.take}
          </p>
        ) : null}
      </article>
    </StaggerItem>
  );
}

export function Reading() {
  const read = books.filter((b) => b.status === "read");
  const queue = books.filter((b) => b.status === "next" || b.status === "ongoing");

  return (
    <section
      id="reading"
      className="mx-auto max-w-5xl scroll-mt-20 px-5 py-16 sm:px-8 sm:py-20"
    >
      <Reveal>
        <Eyebrow>reading log</Eyebrow>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-xl font-serif text-2xl font-medium tracking-tight sm:text-3xl">
            A commonplace book of what I&apos;m reading.
          </h2>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {read.length} read · {queue.length} on the queue
          </p>
        </div>
      </Reveal>

      {/* Recently read */}
      <Reveal delay={0.06} className="mt-10">
        <div className="mb-4 flex items-center gap-2.5 text-muted-foreground">
          <BookOpen className="h-3.5 w-3.5 text-clay" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
            recently read
          </span>
        </div>
        <StaggerGroup className="grid gap-3 sm:grid-cols-2">
          {read.map((b) => (
            <BookRow key={b.title} book={b} />
          ))}
        </StaggerGroup>
      </Reveal>

      {/* On the queue */}
      <Reveal delay={0.06} className="mt-12">
        <div className="mb-4 flex items-center gap-2.5 text-muted-foreground">
          <Bookmark className="h-3.5 w-3.5 text-clay" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
            on the queue
          </span>
        </div>
        <StaggerGroup className="grid gap-3 sm:grid-cols-2">
          {queue.map((b) => (
            <BookRow key={b.title} book={b} />
          ))}
        </StaggerGroup>
      </Reveal>
    </section>
  );
}
