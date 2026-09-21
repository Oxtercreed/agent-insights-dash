export type Agent = {
  id: string;
  name: string;
  purpose: string;
  model: string;
  runs: number;
  tokens: number;
  avgLatencyMs: number;
  successRate: number;
  costUsd: number;
  status: "active" | "degraded" | "paused";
  trend: number[];
};

export const agents: Agent[] = [
  {
    id: "agt_7f21",
    name: "support-triage",
    purpose: "Inbound ticket classification",
    model: "gpt-5.1",
    runs: 48213,
    tokens: 31_420_880,
    avgLatencyMs: 842,
    successRate: 99.2,
    costUsd: 1284.4,
    status: "active",
    trend: [12, 18, 15, 22, 26, 24, 31, 29, 34, 38, 36, 42],
  },
  {
    id: "agt_3c90",
    name: "sales-researcher",
    purpose: "Account enrichment & briefs",
    model: "claude-sonnet-4.5",
    runs: 21980,
    tokens: 24_118_230,
    avgLatencyMs: 2140,
    successRate: 97.8,
    costUsd: 942.17,
    status: "active",
    trend: [22, 20, 25, 23, 27, 31, 28, 33, 30, 35, 39, 37],
  },
  {
    id: "agt_be44",
    name: "codegen-reviewer",
    purpose: "PR review & test suggestions",
    model: "gpt-5.1-codex",
    runs: 15642,
    tokens: 41_902_440,
    avgLatencyMs: 4380,
    successRate: 94.1,
    costUsd: 2110.86,
    status: "degraded",
    trend: [30, 28, 33, 36, 32, 38, 35, 31, 27, 24, 29, 26],
  },
  {
    id: "agt_a012",
    name: "billing-reconciler",
    purpose: "Invoice matching & disputes",
    model: "gemini-3-pro",
    runs: 9331,
    tokens: 7_412_190,
    avgLatencyMs: 1265,
    successRate: 99.7,
    costUsd: 312.05,
    status: "active",
    trend: [8, 9, 11, 10, 13, 12, 15, 14, 16, 18, 17, 19],
  },
  {
    id: "agt_5d77",
    name: "voice-scheduler",
    purpose: "Outbound call booking",
    model: "gpt-5.1-mini",
    runs: 6104,
    tokens: 3_204_770,
    avgLatencyMs: 610,
    successRate: 91.4,
    costUsd: 98.42,
    status: "paused",
    trend: [19, 17, 15, 16, 12, 11, 9, 10, 7, 6, 5, 4],
  },
  {
    id: "agt_9e18",
    name: "docs-indexer",
    purpose: "Embedding & retrieval refresh",
    model: "text-embed-4",
    runs: 128940,
    tokens: 12_884_000,
    avgLatencyMs: 184,
    successRate: 99.9,
    costUsd: 64.31,
    status: "active",
    trend: [40, 42, 41, 44, 46, 45, 48, 47, 50, 52, 51, 54],
  },
];

/** 14 days of run volume, split between completed and failed runs. */
export const runSeries = [
  { day: "Sep 08", completed: 12840, failed: 214 },
  { day: "Sep 09", completed: 13120, failed: 188 },
  { day: "Sep 10", completed: 12010, failed: 402 },
  { day: "Sep 11", completed: 14430, failed: 176 },
  { day: "Sep 12", completed: 15980, failed: 231 },
  { day: "Sep 13", completed: 11240, failed: 149 },
  { day: "Sep 14", completed: 9870, failed: 132 },
  { day: "Sep 15", completed: 16420, failed: 298 },
  { day: "Sep 16", completed: 17880, failed: 344 },
  { day: "Sep 17", completed: 18240, failed: 261 },
  { day: "Sep 18", completed: 19110, failed: 512 },
  { day: "Sep 19", completed: 17650, failed: 208 },
  { day: "Sep 20", completed: 14980, failed: 171 },
  { day: "Sep 21", completed: 20340, failed: 224 },
];

export const modelSplit = [
  { model: "gpt-5.1", share: 34, tokens: "31.4M", color: "var(--color-primary)" },
  { model: "gpt-5.1-codex", share: 27, tokens: "41.9M", color: "var(--color-violet)" },
  { model: "claude-sonnet-4.5", share: 21, tokens: "24.1M", color: "var(--color-success)" },
  { model: "gemini-3-pro", share: 11, tokens: "7.4M", color: "var(--color-warning)" },
  { model: "other", share: 7, tokens: "16.1M", color: "var(--color-muted-foreground)" },
];

export type ActivityItem = {
  time: string;
  agent: string;
  event: string;
  detail: string;
  level: "ok" | "warn" | "error";
};

export const activity: ActivityItem[] = [
  {
    time: "17:02:41",
    agent: "codegen-reviewer",
    event: "tool_timeout",
    detail: "github.listFiles exceeded 30s — retried once",
    level: "error",
  },
  {
    time: "16:58:12",
    agent: "support-triage",
    event: "run_completed",
    detail: "1,284 runs in last 15m · p95 1.1s",
    level: "ok",
  },
  {
    time: "16:51:03",
    agent: "sales-researcher",
    event: "rate_limited",
    detail: "Upstream 429 from enrichment API · backoff 4s",
    level: "warn",
  },
  {
    time: "16:44:37",
    agent: "docs-indexer",
    event: "reindex_finished",
    detail: "18,402 chunks embedded · 0 failures",
    level: "ok",
  },
  {
    time: "16:39:20",
    agent: "billing-reconciler",
    event: "human_handoff",
    detail: "Dispute #40182 escalated to finance queue",
    level: "warn",
  },
  {
    time: "16:30:58",
    agent: "voice-scheduler",
    event: "agent_paused",
    detail: "Paused by omary@axon.dev pending prompt review",
    level: "warn",
  },
];

export const kpis = [
  {
    label: "Total runs",
    value: "230,210",
    delta: "+12.4%",
    up: true,
    sub: "vs. previous 14 days",
    trend: [18, 22, 20, 26, 24, 30, 28, 34, 33, 38, 42, 40, 46, 52],
  },
  {
    label: "Tokens consumed",
    value: "120.9M",
    delta: "+8.1%",
    up: true,
    sub: "input 71.2M · output 49.7M",
    trend: [30, 28, 33, 31, 36, 34, 39, 41, 38, 44, 43, 48, 46, 51],
  },
  {
    label: "Avg latency",
    value: "1.42s",
    delta: "-6.3%",
    up: true,
    sub: "p95 4.10s · p99 7.85s",
    trend: [46, 44, 45, 41, 42, 38, 39, 35, 36, 33, 31, 30, 28, 27],
  },
  {
    label: "Spend",
    value: "$4,812",
    delta: "+19.7%",
    up: false,
    sub: "budget $6,000 · 80% used",
    trend: [12, 15, 14, 19, 22, 21, 26, 29, 27, 33, 36, 40, 44, 48],
  },
];
