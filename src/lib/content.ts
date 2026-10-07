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
  services?: { group: string; items: string[] }[];
  story?: StorySection[];
  facts?: { label: string; value: string }[];
};

export type StorySection = {
  heading: string;
  body: string[];
  quote?: string;
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
    facts: [
      { label: "hypervisor", value: "Firecracker" },
      { label: "boot", value: "custom kernel + initrd" },
      { label: "docs", value: "4 guides" },
    ],
    story: [
      {
        heading: "Why rebuild it",
        body: [
          "Claude's web sandbox is one of those systems that looks simple until you open the hood. Rather than read about how it works, I took it apart and rebuilt the moving parts myself. The point was never to clone a product; it was to understand the design decisions by feeling them.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "At the core sits a Firecracker microVM: a minimal kernel and a custom initrd, launched through the Firecracker API socket. A TAP device gives the guest network egress, and a WebSocket control plane bridges the browser to the serial console. Every piece is a small shell script you can read in one sitting.",
        ],
      },
      {
        heading: "Pieces worth knowing",
        body: [
          "The kernel and VM config live in sandbox/kernel/microvm.config and sandbox/firecracker/vm-config.json. setup-tap.sh brings up the network, build-initrd.sh assembles the ramdisk, and launch.sh ties everything together. Serial output lands in /tmp/fusebox-serial.log, and the WebSocket protocol is documented in websocket.md.",
        ],
        quote: "The fastest way to understand a system is to build it again.",
      },
      {
        heading: "What it taught me",
        body: [
          "Boot chains, network namespaces, and the Firecracker API stop being mysterious once you have launched your own microVM from scratch. The debugging notes in troubleshooting.md are the best proof: every odd behavior got a root cause written down next to it.",
        ],
      },
    ],
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
    facts: [
      { label: "binaries", value: "per SM version" },
      { label: "install time", value: "seconds" },
      { label: "stars", value: "7" },
    ],
    story: [
      {
        heading: "The problem",
        body: [
          "The official llama.cpp releases ship pre-built Windows CUDA binaries and nothing for Linux. Run llama.cpp across cloud instances and you recompile from source on every machine: 4 cores, 20+ minutes each, every single time. That is how I burned most of my early Colab sessions.",
        ],
      },
      {
        heading: "The fix",
        body: [
          "Build once per GPU SM version, store the binary on GitHub Releases, pull it anywhere in seconds. pull.sh detects the GPU, finds the matching binary, verifies its SHA256 checksum, and installs it to ~/.local/bin/llama. The archive bundles the CUDA runtime, so the target machine only needs a compatible driver.",
        ],
        quote: "Twenty minutes of compile time, every session, is a tax you only notice once you stop paying it.",
      },
      {
        heading: "The tooling",
        body: [
          "Six scripts cover the whole lifecycle: detect.sh for diagnostics, build.sh for compiling and uploading, pull.sh for installing, list.sh for browsing the store, verify.sh for checksums, and cleanup.sh for removing old versions. configs/gpu_map.json maps GPU model names to SM versions, and CI auto-builds every SM version on each new llama.cpp release.",
        ],
      },
      {
        heading: "Where it runs",
        body: [
          "T4, A100, L40S, RTX 4090, H100: if it has an SM number, it has a binary. The repo has picked up a small following, and the pattern generalizes to any project that ships Windows-only binaries.",
        ],
      },
    ],
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
    facts: [
      { label: "target", value: "claude.exe v2.1.205" },
      { label: "bundle", value: "19 MB JS" },
      { label: "patches", value: "9 shipped" },
    ],
    story: [
      {
        heading: "The target",
        body: [
          "The official Claude Code CLI is a single 100 MB Bun-compiled executable. Inside it sits a 19 MB JavaScript application bundled as a CommonJS IIFE that no one can edit. 0xClaude unpacks that bundle and gives it back to you as something patchable.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "extract-bundle.py pulls the embedded JS and assets out of your own claude.exe. A small patch framework then layers changes on top: each patch is a CommonJS module that exports bundleTransform(source) => source and anchors itself to a unique string in the bundle. build.ps1 recompiles a fresh claude-fork.exe with the patched bundle, and an acceptance gate verifies --version output stays byte-identical.",
        ],
        quote: "The patches are small, self-contained, and toggle-able by renaming a file.",
      },
      {
        heading: "The patch catalog",
        body: [
          "Nine patches ship today: model menus, providers, login, setmodel, auto-pairs, slash commands, classifier logging, hot-reload, and a hello-world demo. Enable the ones you want, disable the rest: alternate model providers like LiteLLM, NVIDIA NIM, or LM Studio appear in the native /model picker, get cached, hot-reload, and persist to ~/.claude/settings.json like built-in models.",
        ],
      },
      {
        heading: "Where it is heading",
        body: [
          "The next frontier is symbol recovery: pulling meaningful function names out of the minified output so an LLM can navigate the codebase instead of drowning in garbage identifiers. It is a bit borderline, legally, but it is a great exercise in how these tools are built.",
        ],
      },
    ],
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
    facts: [
      { label: "guards", value: "4" },
      { label: "tests", value: "432" },
      { label: "hosts", value: "Claude Code + opencode" },
    ],
    story: [
      {
        heading: "The idea",
        body: [
          "Agents are only as trustworthy as the guardrails around them. Zenno is a plugin for Claude Code and opencode that watches what agents do and keeps them honest, without getting in the way of the work.",
        ],
      },
      {
        heading: "Four Shield guards",
        body: [
          "Secret Scanner blocks commits or pushes containing high-confidence secrets and high-entropy strings. Confidential File Guard blocks reads of sensitive files like .env and *.pem. Provenance Guard blocks global installs, typosquats, and very-recently-published packages. Haruspex Guard blocks any write to Zenno's own files. Guards fail safe: they deny on uncertainty, never auto-fix, and every override is a deliberate human action, never something negotiated mid-conversation.",
        ],
      },
      {
        heading: "Caps and teams",
        body: [
          "Hard caps stop runaway subagent fan-out: depth 3, 8 concurrent, 10 per task. Two fixed-size team templates, plan-stress-test and bounded-research, offer a disciplined alternative to open-ended fan-out.",
        ],
      },
      {
        heading: "Memory and observability",
        body: [
          "A memory layer carries project knowledge across sessions with git-versioned snapshots and rollback. A ctags-based repo graph indexes symbols and nudges when stale. OTLP-style telemetry, a cost tracker, a failure journal, and zenno doctor with 30+ health checks keep the whole thing observable.",
          "The best guardrail is the one you never notice until you need it.",
        ],
        quote: "The best guardrail is the one you never notice until you need it.",
      },
      {
        heading: "Why it matters",
        body: [
          "432 tests, all passing, on pure Node.js with zero dependencies. One core/ powers both hosts, so the same guards fire whether you are in Claude Code or opencode.",
        ],
      },
    ],
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
    facts: [
      { label: "STT", value: "Voxtral" },
      { label: "router", value: "Laya, fine-tuned" },
      { label: "French routing", value: "62% → 93%" },
    ],
    story: [
      {
        heading: "The product",
        body: [
          "A voice-controlled clock that runs its command routing on-device: mic in, Voxtral STT, a locally fine-tuned Laya router, cloud LLM only as fallback. It speaks French and English, including mixed sentences.",
        ],
      },
      {
        heading: "The measurement",
        body: [
          "The interesting part was not the app, it was the numbers. Zero-shot routing scored 91% in English but 62% in French. That gap was the whole project: a bilingual device that quietly works better in one language is not bilingual.",
        ],
      },
      {
        heading: "The fix",
        body: [
          "I generated 2,500 labeled commands and fine-tuned Laya's multilingual checkpoint with RLCD on a Colab T4. French routing climbed to 93%, then two more rounds chased the confident mistakes that remained.",
        ],
        quote: "A model that answers confidently in the wrong language is worse than one that says nothing.",
      },
      {
        heading: "The lesson",
        body: [
          "The last round taught me when to stop training and fix safety in plain code instead. Some failure modes are not data problems; they are design problems wearing a data costume.",
        ],
      },
    ],
    status: "wip",
  },
  {
    id: "homelab",
    name: "Homelab stack",
    blurb:
      "13 compose projects on an OptiPlex-3070, all behind Traefik, plus a Hermes agent that does the daily driving.",
    detail:
      "The substrate under most of my experiments: photos, media, bookmarks, DNS, and the dashboards that tell me the box is still alive. Intel UHD 630, no discrete GPU, everything on one 1TB drive and a 256GB NVMe. Watchtower keeps the images fresh, which is the least glamorous part of owning any of this.",
    tags: ["infra", "self-hosted", "agents"],
    status: "live",
    services: [
      { group: "AI", items: ["open-webui"] },
      {
        group: "Media",
        items: ["immich", "jellyfin", "youtube-dl"],
      },
      { group: "Reading", items: ["karakeep"] },
      {
        group: "Network",
        items: ["traefik", "adguard", "duckdns", "portainer"],
      },
      {
        group: "Ops",
        items: ["glance", "watchtower", "speedtest"],
      },
    ],
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
