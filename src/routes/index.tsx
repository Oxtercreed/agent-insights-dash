import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  ChevronDown,
  Download,
  Search,
  Sparkles,
} from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Sparkline } from "@/components/dashboard/Sparkline";
import { RunVolumeChart } from "@/components/dashboard/RunVolumeChart";
import { activity, agents, kpis, modelSplit } from "@/lib/agent-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Axon — AI Agent Usage Dashboard" },
      {
        name: "description",
        content:
          "Track runs, token spend, latency and error rates for every AI agent in your fleet.",
      },
      { property: "og:title", content: "Axon — AI Agent Usage Dashboard" },
      {
        property: "og:description",
        content: "Track runs, token spend, latency and error rates for every AI agent.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const statusStyles: Record<string, string> = {
  active: "text-success",
  degraded: "text-warning",
  paused: "text-muted-foreground",
};

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/85 px-5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-[13px]">
            <span className="text-muted-foreground">Workspace</span>
            <span className="text-muted-foreground/40">/</span>
            <span className="font-medium">Overview</span>
          </div>

          <div className="relative ml-auto hidden w-64 items-center md:flex">
            <Search className="absolute left-2.5 size-3.5 text-muted-foreground" strokeWidth={1.75} />
            <input
              placeholder="Search agents, runs, traces"
              className="h-8 w-full rounded-md border border-border bg-surface pl-8 pr-2 text-[12.5px] placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring/40 transition-colors"
            />
          </div>

          <button className="flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-[12.5px] text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground">
            Last 14 days
            <ChevronDown className="size-3.5" strokeWidth={1.75} />
          </button>
          <button className="grid size-8 place-items-center rounded-md border border-border bg-surface text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground">
            <Bell className="size-4" strokeWidth={1.75} />
          </button>
          <button className="flex h-8 items-center gap-1.5 rounded-md px-3 text-[12.5px] font-medium text-primary-foreground transition-transform duration-150 hover:-translate-y-px" style={{ background: "var(--gradient-cyan)", boxShadow: "var(--shadow-glow)" }}>
            <Sparkles className="size-3.5" strokeWidth={2} />
            New agent
          </button>
        </header>

        <div className="mx-auto w-full max-w-[1320px] space-y-5 p-5">
          {/* Title row */}
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-[22px] font-semibold">Agent usage</h1>
              <p className="mt-1 text-[13px] text-muted-foreground">
                6 agents · 230,210 runs · updated{" "}
                <span className="text-foreground">2 min ago</span>
              </p>
            </div>
            <button className="flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-[12.5px] text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground">
              <Download className="size-3.5" strokeWidth={1.75} />
              Export CSV
            </button>
          </div>

          {/* KPIs */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((k) => (
              <div
                key={k.label}
                className="panel group overflow-hidden p-4 transition-colors duration-200 hover:border-border-strong"
              >
                <p className="text-[12px] font-medium text-muted-foreground">{k.label}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-[26px] font-semibold nums">{k.value}</span>
                  <span
                    className={`flex items-center gap-0.5 text-[11.5px] font-medium nums ${
                      k.up ? "text-success" : "text-destructive"
                    }`}
                  >
                    {k.up ? (
                      <ArrowUpRight className="size-3" strokeWidth={2.25} />
                    ) : (
                      <ArrowDownRight className="size-3" strokeWidth={2.25} />
                    )}
                    {k.delta}
                  </span>
                </div>
                <p className="mt-1 text-[11.5px] nums text-muted-foreground">{k.sub}</p>
                <Sparkline
                  data={k.trend}
                  className="mt-3 h-8 w-full opacity-80 transition-opacity duration-200 group-hover:opacity-100"
                  stroke={k.up ? "var(--color-primary)" : "var(--color-destructive)"}
                />
              </div>
            ))}
          </section>

          {/* Chart + model split */}
          <section className="grid gap-4 xl:grid-cols-[1.9fr_1fr]">
            <div className="panel p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-[14px] font-semibold">Run volume</h2>
                  <p className="mt-0.5 text-[12px] text-muted-foreground">
                    Completed vs failed runs per day
                  </p>
                </div>
                <div className="flex items-center gap-4 text-[11.5px] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-[2px] bg-primary" /> Completed
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-[2px] bg-destructive/80" /> Failed
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <RunVolumeChart />
              </div>
            </div>

            <div className="panel p-5">
              <h2 className="text-[14px] font-semibold">Token share by model</h2>
              <p className="mt-0.5 text-[12px] text-muted-foreground">120.9M tokens total</p>

              <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-muted">
                {modelSplit.map((m) => (
                  <span
                    key={m.model}
                    className="h-full transition-all duration-300"
                    style={{ width: `${m.share}%`, background: m.color }}
                  />
                ))}
              </div>

              <ul className="mt-4 space-y-2.5">
                {modelSplit.map((m) => (
                  <li key={m.model} className="flex items-center gap-2.5 text-[12.5px]">
                    <span className="size-2 rounded-full" style={{ background: m.color }} />
                    <span className="truncate font-mono text-[11.5px]">{m.model}</span>
                    <span className="ml-auto nums text-muted-foreground">{m.tokens}</span>
                    <span className="w-9 text-right nums">{m.share}%</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-md border border-border bg-surface-raised p-3">
                <p className="text-[11.5px] text-muted-foreground">Monthly budget</p>
                <div className="mt-1.5 flex items-baseline justify-between">
                  <span className="text-[16px] font-semibold nums">$4,812</span>
                  <span className="text-[11.5px] nums text-muted-foreground">of $6,000</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <span className="block h-full w-[80%] rounded-full" style={{ background: "var(--gradient-cyan)" }} />
                </div>
              </div>
            </div>
          </section>

          {/* Agents table + activity */}
          <section className="grid gap-4 xl:grid-cols-[1.9fr_1fr]">
            <div className="panel overflow-hidden">
              <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
                <h2 className="text-[14px] font-semibold">Agents</h2>
                <button className="text-[12px] text-primary transition-opacity hover:opacity-70">
                  View all
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-[12.5px]">
                  <thead>
                    <tr className="text-left text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                      <th className="px-5 py-2.5 font-medium">Agent</th>
                      <th className="px-3 py-2.5 font-medium">Model</th>
                      <th className="px-3 py-2.5 text-right font-medium">Runs</th>
                      <th className="px-3 py-2.5 text-right font-medium">Tokens</th>
                      <th className="px-3 py-2.5 text-right font-medium">p50</th>
                      <th className="px-3 py-2.5 text-right font-medium">Success</th>
                      <th className="px-3 py-2.5 text-right font-medium">Cost</th>
                      <th className="px-5 py-2.5 text-right font-medium">14d</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map((a) => (
                      <tr key={a.id} className="row-hover border-t border-border">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`size-1.5 rounded-full bg-current ${statusStyles[a.status]}`}
                            />
                            <div className="min-w-0">
                              <p className="truncate font-mono text-[12px] font-medium">{a.name}</p>
                              <p className="truncate text-[11px] text-muted-foreground">
                                {a.purpose}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <span className="rounded border border-border whitespace-nowrap bg-surface-raised px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                            {a.model}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-right nums">{a.runs.toLocaleString()}</td>
                        <td className="px-3 py-3 text-right nums">
                          {(a.tokens / 1_000_000).toFixed(1)}M
                        </td>
                        <td className="px-3 py-3 text-right nums text-muted-foreground">
                          {a.avgLatencyMs < 1000
                            ? `${a.avgLatencyMs}ms`
                            : `${(a.avgLatencyMs / 1000).toFixed(2)}s`}
                        </td>
                        <td
                          className={`px-3 py-3 text-right nums ${
                            a.successRate < 95 ? "text-warning" : ""
                          }`}
                        >
                          {a.successRate}%
                        </td>
                        <td className="px-3 py-3 text-right nums">${a.costUsd.toFixed(2)}</td>
                        <td className="px-5 py-3">
                          <Sparkline
                            data={a.trend}
                            fill={false}
                            className="ml-auto h-6 w-16"
                            stroke={
                              (a.trend.at(-1) ?? 0) >= (a.trend[0] ?? 0)
                                ? "var(--color-primary)"
                                : "var(--color-destructive)"
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="panel overflow-hidden">
              <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
                <h2 className="text-[14px] font-semibold">Live activity</h2>
                <span className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
                  <span className="size-1.5 animate-pulse rounded-full bg-success" />
                  streaming
                </span>
              </div>
              <ul className="divide-y divide-border">
                {activity.map((a) => (
                  <li key={a.time} className="row-hover px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`size-1.5 rounded-full ${
                          a.level === "error"
                            ? "bg-destructive"
                            : a.level === "warn"
                              ? "bg-warning"
                              : "bg-success"
                        }`}
                      />
                      <span className="font-mono text-[11.5px] text-muted-foreground nums">
                        {a.time}
                      </span>
                      <span className="truncate font-mono text-[11.5px] text-foreground">
                        {a.event}
                      </span>
                      <span className="ml-auto truncate font-mono text-[11px] text-muted-foreground">
                        {a.agent}
                      </span>
                    </div>
                    <p className="mt-1 pl-[14px] text-[12px] text-muted-foreground">{a.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
