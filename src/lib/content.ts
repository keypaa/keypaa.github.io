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
    "I'm Keylhan — an engineering student at EFREI Paris (just finished my first year, année préparatoire), French, daily-driving Linux with Windows on the side for school. I read a lot, lurk on X more than I post, and tinker with AI the way the hardware allows: no GPUs, so I go where the interesting work doesn't need them — reverse-engineering how tools are built, local-first infra, clever scripts, and the odd borderline-legal extraction.",
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
      "“The more constraints you can introduce into your inference system, the better performance you will achieve.” — the Golden Rule of Inference.",
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    edition: "20th Anniversary Edition",
    status: "read",
    take: "Placeholder — your one-line take goes here.",
  },
  {
    title: "Talking to Strangers",
    author: "Malcolm Gladwell",
    status: "read",
    take: "Placeholder — your one-line take goes here.",
  },
  {
    title: "Pourquoi les classiques",
    author: "Italo Calvino",
    status: "next",
    take: "Placeholder — why you want to read this.",
  },
  {
    title: "The O'Reilly catalog",
    author: "ongoing, broad goal",
    status: "ongoing",
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
    name: "Claude Web sandbox — rebuilt from scratch",
    blurb:
      "Reverse-engineered how Claude's web sandbox works and rebuilt it from the ground up.",
    detail:
      "Curiosity-driven teardown. Figured out the moving parts, then re-implemented them myself to actually understand the design.",
    tags: ["reverse-engineering", "from-scratch"],
    status: "live",
    link: { label: "github.com/keypaa", href: "https://github.com/keypaa" },
  },
  {
    id: "llamacpp-installer",
    name: "llama.cpp easy-install for cloud instances",
    blurb:
      "A script that skips the 20-minute llama.cpp compile on 4-core Colab sessions.",
    detail:
      "I burned a lot of Colab sessions recompiling llama.cpp every time — 4 cores, 20+ minutes each. So I scripted the painful part away. Now a fresh cloud instance is usable in minutes.",
    tags: ["tooling", "infra", "local-first"],
    status: "live",
    link: { label: "github.com/keypaa", href: "https://github.com/keypaa" },
  },
  {
    id: "claude-code-re",
    name: "Claude Code binary — reverse engineered",
    blurb:
      "Extracted the .exe, rebuilt the source tree from the extracted contents, now I can recompile with my own patches.",
    detail:
      "A bit borderline, legally — but a great exercise. Currently working on recovering meaningful function names from the minified output, so LLMs can actually navigate the codebase instead of drowning in garbage symbols.",
    tags: ["reverse-engineering", "tooling"],
    status: "wip",
    link: { label: "github.com/keypaa", href: "https://github.com/keypaa" },
  },
  {
    id: "zenno",
    name: "zenno — a Claude Code plugin",
    blurb: "My own plugin for Claude Code. Currently in the planning phase.",
    detail:
      "Still shaping the scope. More here soon — ask me about it if you're curious.",
    tags: ["plugin", "planning"],
    status: "planning",
  },
  {
    id: "homelab",
    name: "Homelab stack",
    blurb: "A self-hosted stack I run and iterate on.",
    detail:
      "The substrate under most of my experiments — services, storage, and the little automations that make a Linux box feel like home.",
    tags: ["infra", "self-hosted"],
    status: "live",
  },
  {
    id: "hermes",
    name: "Hermes agent — daily driver",
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
  { label: "reading", value: "Inference Engineering — Philip Kiely" },
  { label: "building", value: "zenno, a Claude Code plugin" },
  { label: "untangling", value: "minified symbols in the Claude Code binary" },
  { label: "based in", value: "Paris, France" },
  // `school` value is computed at runtime by getSchoolYearProgress()
  { label: "school", value: "EFREI Paris — year 1 / 5" },
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
    return `EFREI Paris — graduated (${SCHOOL_GRAD_YEAR})`;
  }

  // Which academic year are we currently IN?
  // From Sept of start year onward, we're in year 1; each subsequent Sept bumps it.
  let yearNum = now.getFullYear() - SCHOOL_START_YEAR;
  if (now.getMonth() >= SCHOOL_START_MONTH) {
    yearNum += 1;
  }
  yearNum = Math.max(1, Math.min(SCHOOL_TOTAL_YEARS, yearNum));
  return `EFREI Paris — year ${yearNum} / ${SCHOOL_TOTAL_YEARS}`;
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
  costProjection: { monthly: number; annual: number };
  daily: DailySession[];
  topModels: { name: string; sessions: number; tokens: number }[];
  topProjects: { name: string; sessions: number; tokens: number }[];
};

export const agentUsage: AgentUsage = {
  tool: "opencode",
  rangeLabel: "Jul 8 – Jul 26, 2026",
  firstDate: "Jul 08, 2026",
  lastDate: "Jul 26, 2026",
  updatedAt: "Jul 26, 2026",
  kpis: {
    sessions: 1045,
    messages: 30201,
    tokens: 2768972257,
    cost: 0.08,
    cacheEfficiency: 947,
  },
  tokenBreakdown: {
    input: 262267923,
    output: 16883988,
    reasoning: 6287202,
    cacheRead: 2483533144,
  },
  costProjection: { monthly: 0.08, annual: 0.97 },
  daily: [
    { date: "2026-07-08", sessions: 28 },
    { date: "2026-07-09", sessions: 120 },
    { date: "2026-07-10", sessions: 92 },
    { date: "2026-07-11", sessions: 35 },
    { date: "2026-07-12", sessions: 23 },
    { date: "2026-07-13", sessions: 3 },
    { date: "2026-07-14", sessions: 97 },
    { date: "2026-07-15", sessions: 43 },
    { date: "2026-07-16", sessions: 21 },
    { date: "2026-07-17", sessions: 107 },
    { date: "2026-07-18", sessions: 15 },
    { date: "2026-07-19", sessions: 193 },
    { date: "2026-07-20", sessions: 87 },
    { date: "2026-07-21", sessions: 28 },
    { date: "2026-07-22", sessions: 104 },
    { date: "2026-07-23", sessions: 6 },
    { date: "2026-07-24", sessions: 2 },
    { date: "2026-07-25", sessions: 36 },
    { date: "2026-07-26", sessions: 5 },
  ],
  topModels: [
    { name: "deepseek-v4-flash-free", sessions: 854, tokens: 1950160194 },
    { name: "mimo-v2.5-free", sessions: 74, tokens: 133645296 },
    { name: "big-pickle", sessions: 70, tokens: 114882832 },
    { name: "nemotron-3-ultra-free", sessions: 8, tokens: 418919817 },
    { name: "z-ai/glm-5.2", sessions: 9, tokens: 30277657 },
  ],
  topProjects: [
    { name: "argus", sessions: 480, tokens: 574051069 },
    { name: "decrypter-claude", sessions: 327, tokens: 1807627527 },
    { name: "vicinae", sessions: 36, tokens: 50187134 },
    { name: "zenno", sessions: 21, tokens: 14890743 },
    { name: "chrome-claude-export", sessions: 15, tokens: 16220180 },
  ],
};

/* Helpers for formatting the big numbers in the UI. */
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
  if (n < 0.01) return `$${n.toFixed(2)}`;
  return `$${n.toFixed(2)}`;
}
