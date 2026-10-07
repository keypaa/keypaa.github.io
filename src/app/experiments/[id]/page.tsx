import { notFound } from "next/navigation";
import { experiments } from "@/lib/content";
import Link from "next/link";
import { Reveal, StatusBadge, Eyebrow } from "@/components/site/primitives";

export const generateStaticParams = () => {
  return experiments.map((exp) => ({
    id: exp.id,
  }));
};

export default async function ExperimentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experiment = experiments.find((exp) => exp.id === id);
  if (!experiment) notFound();

  return (
    <div className="min-h-[calc(100vh-4.5rem)] py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>experiment</Eyebrow>
          <h1 className="mt-4 font-serif text-3xl font-medium tracking-tight sm:text-4xl">
            {experiment.name}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <StatusBadge status={experiment.status} />
            {experiment.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted/50 px-2 py-0.5 font-mono text-[10.5px] text-muted-foreground ring-1 ring-inset ring-border/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.06} className="mt-8">
          <p className="text-lg leading-relaxed text-foreground/90">
            {experiment.blurb}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="hairline h-px w-full" aria-hidden />
        </Reveal>

        {experiment.detail && (
          <Reveal delay={0.12} className="mt-10">
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              {experiment.detail}
            </p>
          </Reveal>
        )}

        {experiment.facts && experiment.facts.length > 0 && (
          <Reveal delay={0.14} className="mt-10">
            <dl className="grid gap-px overflow-hidden rounded-xl border border-border/50 bg-border/40 sm:grid-cols-3">
              {experiment.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="bg-card/40 px-4 py-4"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 font-mono text-[13px] text-foreground">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}

        {experiment.story && experiment.story.length > 0 && (
          <div className="mt-14">
            {experiment.story.map((section, idx) => (
              <Reveal key={section.heading} delay={0.04 * idx} className={idx > 0 ? "mt-12" : ""}>
                <h2 className="font-serif text-xl font-medium tracking-tight">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((para, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-[15px] leading-relaxed text-muted-foreground"
                    >
                      {para}
                    </p>
                  ))}
                  {section.quote && (
                    <blockquote className="border-l-2 border-clay/50 pl-4 font-serif text-[17px] italic leading-relaxed text-foreground/85">
                      {section.quote}
                    </blockquote>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {experiment.services && experiment.services.length > 0 && (
          <Reveal delay={0.1} className="mt-12">
            <h2 className="font-serif text-xl font-medium tracking-tight">
              Services
            </h2>
            <dl className="mt-5 flex flex-col gap-2">
              {experiment.services.map((g) => (
                <div key={g.group} className="flex gap-3">
                  <dt className="w-24 shrink-0 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground/70">
                    {g.group}
                  </dt>
                  <dd className="font-mono text-[11.5px] leading-relaxed text-foreground/70">
                    {g.items.join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}

        <Reveal delay={0.12} className="mt-14">
          <div className="flex flex-wrap items-center gap-4 border-t border-border/60 pt-6">
            {experiment.link ? (
              <Link
                href={experiment.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-clay/40 px-4 py-2 font-mono text-[12px] text-clay transition-colors hover:border-clay hover:text-foreground"
              >
                {experiment.link.label}
                <span aria-hidden="true">↗</span>
              </Link>
            ) : (
              <span className="font-mono text-[12px] text-muted-foreground/70">
                more soon
              </span>
            )}
            <Link
              href="/#experiments"
              className="font-mono text-[12px] text-muted-foreground transition-colors hover:text-foreground"
            >
              ← back to workbench
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}