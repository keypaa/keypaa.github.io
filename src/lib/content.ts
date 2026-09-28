/**
 * Content for the personal site.
 *
 * Edit this file to update the reading log, experiments, and profile.
 * Hotlines / takes are placeholders for now — replace `take` strings with
 * your own one-liners whenever you want.
 */

export const profile = {
  name: "Keylhan",
  fullName: "Keylhan Paumard--André",
  handle: "keypaa",
  tagline: "Tinkering with AI from a Linux box in Paris.",
  blurb:
    "I'm Keylhan, an engineering student at EFREI Paris (just finished my first year, année préparatoire), French, daily-driving Linux with Windows on the side for school. I read a lot, lurk on X more than I post, and tinker with AI the way the hardware allows: no GPUs, so I go where the interesting work doesn't need them, going after reverse-engineering how tools are built, local-first infra, clever scripts, and the odd borderline-legal extraction.",
  location: "Paris, France",
  school: "EFREI Paris",
  email: "paumardkeylhan@gmail.com",
  x: "keylhan_p",
  xUrl: "https://x.com/keylhan_p",
  github: "keypaa",
  githubUrl: "https://github.com/keypaa",
  hf: "keypa",
  hfUrl: "https://huggingface.co/keypa",
} as const;

export type Book = {
  title: string;
  author: string;
  note?: string;
  edition?: string;
  status: "read" | "next" | "ongoing";
  take?: string;
};

export const books: Book[] = [
  {
    title: "Inference Engineering",
    author: "Philip Kiely",
    note: "Baseten",
    status: "read",
    take:
      "“The more constraints you can introduce into your inference system, the better performance you will achieve.” The Golden Rule of Inference.",
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    edition: "20th Anniversary Edition",
    status: "read",
    take: "Good design is always easier to change, and great code starts with taking ownership.",
  },
  {
    title: "Pourquoi les classiques",
    author: "Italo Calvino",
    status: "read",
    take:
      "“A classic is a book that has never finished saying what it has to say.” Fourteen definitions of a classic, and no reason better than this one.",
  },
  {
    title: "Talking to Strangers",
    author: "Malcolm Gladwell",
    status: "ongoing",
    take:
      "“The right way to talk to strangers is with caution and humility.” The closing thesis of a book about how badly we misread people we don't know.",
  },
  {
    title: "The O'Reilly catalog",
    author: "ongoing, broad goal",
    status: "next",
    take: "Read as much as I can from O'Reilly over the coming months / years.",
  },
];

export type Experiment = {
  id: string;
  name: string;
  blurb: string;
  detail: string;
  tags: string[];
  status: "live" | "wip" | "planning";
  link?: { label: string; href: string };
};

export const experiments: Experiment[] = [
  {
    id: "sandbox",
    name: "Claude Web sandbox: rebuilt from scratch",
    blurb:
      "Reverse-engineered how Claude's web sandbox works and rebuilt it from the ground up.",
    detail:
      "Curiosity-driven teardown. Figured out the moving parts, then re-implemented them myself to actually understand the design.",
    tags: ["reverse-engineering", "from-scratch"],
    status: "live",
    link: {
      label: "github.com/keypaa/fusebox",
      href: "https://github.com/keypaa/fusebox",
    },
  },
  {
    id: "llamacpp-installer",
    name: "llama.cpp easy-install for cloud instances",
    blurb:
      "A script that skips the 20-minute llama.cpp compile on 4-core Colab sessions.",
    detail:
      "I burned a lot of Colab sessions recompiling llama.cpp every time: 4 cores, 20+ minutes each. So I scripted the painful part away. Now a fresh cloud instance is usable in minutes.",
    tags: ["tooling", "infra", "local-first"],
    status: "live",
    link: {
      label: "github.com/keypaa/llamaup",
      href: "https://github.com/keypaa/llamaup",
    },
  },
  {
    id: "claude-code-re",
    name: "Claude Code binary: reverse engineered",
    blurb:
      "Extracted the .exe, rebuilt the source tree from the extracted contents, now I can recompile with my own patches.",
    detail:
      "A bit borderline, legally, but a great exercise. Currently working on recovering meaningful function names from the minified output, so LLMs can actually navigate the codebase instead of drowning in garbage symbols.",
    tags: ["reverse-engineering", "tooling"],
    status: "wip",
    link: {
      label: "github.com/keypaa/0xClaude",
      href: "https://github.com/keypaa/0xClaude",
    },
  },
  {
    id: "zenno",
    name: "zenno, a Claude Code plugin",
    blurb:
      "Security guards, disciplined multi-agent orchestration, and persistent memory, for Claude Code and opencode.",
    detail:
      "Zenno watches what agents do and keeps them honest: four Shield guards block secret leaks, confidential-file reads, risky installs, and self-modification of Zenno itself; hard caps stop runaway subagent fan-out; a memory layer carries project knowledge across sessions; and a doctor, cost tracker, and trace exporter keep the whole thing observable. I run it on my own machine every day.",
    tags: ["plugin", "tooling", "agents"],
    status: "live",
    link: {
      label: "github.com/keypaa/zenno",
      href: "https://github.com/keypaa/zenno",
    },
  },
  {
    id: "nestclockos",
    name: "NestClockOS: bilingual voice smart clock",
    blurb:
      "A voice-controlled clock that runs its command routing on-device: mic → Voxtral STT → a locally fine-tuned Laya router, cloud LLM only as fallback. Speaks French and English, including mixed.",
    detail:
      "The interesting part wasn't the app, it was the measurement. Zero-shot routing scored 91% in English but 62% in French, so I generated 2,500 labeled commands, fine-tuned Laya's multilingual checkpoint with RLCD on a Colab T4, and took French to 93%, then spent two more rounds chasing the confident mistakes that remained, and learned when to stop training and fix safety in plain code instead.",
    tags: ["voice", "on-device", "fine-tuning"],
    status: "wip",
  },
  {
    id: "homelab",
    name: "Homelab stack",
    blurb: "A self-hosted stack I run and iterate on.",
    detail:
      "The substrate under most of my experiments: services, storage, and the little automations that make a Linux box feel like home.",
    tags: ["infra", "self-hosted"],
    status: "live",
  },
  {
    id: "hermes",
    name: "Hermes agent, daily driver",
    blurb: "Running a Hermes agent like everyone else, as my daily driver.",
    detail:
      "Not exotic, but it's the workhorse behind a lot of my day-to-day tinkering.",
    tags: ["agents"],
    status: "live",
  },
];

export type NowItem = {
  label: string;
  value: string;
};

export const nowItems: NowItem[] = [
  { label: "reading", value: "Talking to Strangers, Malcolm Gladwell" },
  { label: "building", value: "NestClockOS, bilingual voice smart clock" },
  { label: "untangling", value: "Minified symbols in the Claude Code binary" },
  { label: "based in", value: "Paris, France" },
  // `school` value is computed at runtime by getSchoolYearProgress()
  { label: "school", value: "EFREI Paris, year 1 / 5" },
];

/**
 * School timeline.
 * Started Sept 2025, 5-year program, graduates around August 2030.
 * Academic year N runs Sept (2025 + N - 1) → Aug (2025 + N).
 *
 * The label is an *in-progress* framing ("year N / 5"), not a completed count,
 * so the counter flips in September when a new academic year starts.
 */
const SCHOOL_START_YEAR = 2025;
const SCHOOL_START_MONTH = 8; // September (0-indexed)
const SCHOOL_TOTAL_YEARS = 5;
const SCHOOL_GRAD_YEAR = 2030;

export function getSchoolYearProgress(now: Date = new Date()): string {
  // Post-graduation: September 2030 onward.
  const graduated =
    now.getFullYear() > SCHOOL_GRAD_YEAR ||
    (now.getFullYear() === SCHOOL_GRAD_YEAR && now.getMonth() >= 8);

  if (graduated) {
    return `EFREI Paris, graduated (${SCHOOL_GRAD_YEAR})`;
  }

  // Which academic year are we currently IN?
  // From Sept of start year onward, we're in year 1; each subsequent Sept bumps it.
  let yearNum = now.getFullYear() - SCHOOL_START_YEAR;
  if (now.getMonth() >= SCHOOL_START_MONTH) {
    yearNum += 1;
  }
  yearNum = Math.max(1, Math.min(SCHOOL_TOTAL_YEARS, yearNum));
  return `EFREI Paris, year ${yearNum} / ${SCHOOL_TOTAL_YEARS}`;
}

export const navLinks = [
  { label: "Now", href: "#now" },
  { label: "Reading", href: "#reading" },
  { label: "Experiments", href: "#experiments" },
  { label: "Agents", href: "#agents" },
  { label: "Elsewhere", href: "#elsewhere" },
] as const;

/* ------------------------------------------------------------------ */
/* Agent usage — exported from the opencode analytics dashboard.       */
/* To update: re-export your dashboard, copy the headline numbers and  */
/* the per-day sessions array, and swap them in here.                  */
/* ------------------------------------------------------------------ */

export type DailySession = { date: string; sessions: number };

export type AgentUsage = {
  tool: string;
  rangeLabel: string;
  firstDate: string;
  lastDate: string;
  updatedAt: string;
  kpis: {
    sessions: number;
    messages: number;
    tokens: number; // raw total
    cost: number; // USD
    cacheEfficiency: number; // percentage, e.g. 947
  };
  tokenBreakdown: {
    input: number;
    output: number;
    reasoning: number;
    cacheRead: number;
  };
  daily: DailySession[];
  topModels: { name: string; sessions: number; tokens: number }[];
  topProjects: { name: string; sessions: number; tokens: number }[];
};

export const agentUsage: AgentUsage = {
  tool: "opencode + Claude Code",
  rangeLabel: "Aug 1 \u2013 Sep 28, 2026",
  firstDate: "Aug 01, 2026",
  lastDate: "Sep 28, 2026",
  updatedAt: "Sep 28, 2026",
  kpis: {
    sessions: 283,
    messages: 26396,
    tokens: 5040523453,
    cost: 0,
    cacheEfficiency: 93,
  },
  tokenBreakdown: {
    input: 379684452,
    output: 8368842,
    reasoning: 4926920,
    cacheRead: 4647543239,
  },
  daily: [
    { date: "2026-08-01", sessions: 13 },
    { date: "2026-08-02", sessions: 1 },
    { date: "2026-08-06", sessions: 2 },
    { date: "2026-08-09", sessions: 4 },
    { date: "2026-08-11", sessions: 2 },
    { date: "2026-08-12", sessions: 1 },
    { date: "2026-08-13", sessions: 4 },
    { date: "2026-08-16", sessions: 1 },
    { date: "2026-08-18", sessions: 10 },
    { date: "2026-08-21", sessions: 4 },
    { date: "2026-08-22", sessions: 12 },
    { date: "2026-08-23", sessions: 59 },
    { date: "2026-08-24", sessions: 2 },
    { date: "2026-08-26", sessions: 4 },
    { date: "2026-08-29", sessions: 20 },
    { date: "2026-08-30", sessions: 10 },
    { date: "2026-09-01", sessions: 5 },
    { date: "2026-09-02", sessions: 4 },
    { date: "2026-09-04", sessions: 15 },
    { date: "2026-09-05", sessions: 5 },
    { date: "2026-09-07", sessions: 3 },
    { date: "2026-09-08", sessions: 1 },
    { date: "2026-09-11", sessions: 6 },
    { date: "2026-09-12", sessions: 2 },
    { date: "2026-09-13", sessions: 4 },
    { date: "2026-09-14", sessions: 3 },
    { date: "2026-09-16", sessions: 15 },
    { date: "2026-09-17", sessions: 28 },
    { date: "2026-09-18", sessions: 2 },
    { date: "2026-09-19", sessions: 4 },
    { date: "2026-09-21", sessions: 3 },
    { date: "2026-09-22", sessions: 7 },
    { date: "2026-09-23", sessions: 2 },
    { date: "2026-09-24", sessions: 3 },
    { date: "2026-09-25", sessions: 7 },
    { date: "2026-09-26", sessions: 8 },
    { date: "2026-09-27", sessions: 7 },
  ],
  topModels: [
    { name: "muse-spark-1.3", sessions: 65, tokens: 1916002586 },
    { name: "muse-spark-1.2", sessions: 39, tokens: 1350273220 },
    { name: "x-preview-f", sessions: 33, tokens: 79516677 },
    { name: "deepseek-v4-flash", sessions: 20, tokens: 71666913 },
  ],
  topProjects: [
    { name: "Vision-Adapter", sessions: 30, tokens: 1692250147 },
    { name: "claude-desktop-omarchy", sessions: 23, tokens: 1080364287 },
    { name: "0xClaude", sessions: 27, tokens: 749593068 },
    { name: "dsh-jspace-workspace", sessions: 8, tokens: 131159886 },
  ],
};

export function formatTokens(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return `${n}`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export function formatCost(n: number): string {
  return `$${n.toFixed(2)}`;
}
