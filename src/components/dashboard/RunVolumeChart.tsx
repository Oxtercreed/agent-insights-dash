import { useState } from "react";
import { runSeries } from "@/lib/agent-data";

export function RunVolumeChart() {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...runSeries.map((d) => d.completed + d.failed));
  const gridLines = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
        {[...gridLines].reverse().map((g) => (
          <div key={g} className="flex items-center gap-3">
            <span className="w-8 shrink-0 text-right text-[10px] nums text-muted-foreground/70">
              {Math.round((max * g) / 1000)}k
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>
        ))}
      </div>

      <div className="relative ml-11 flex h-52 items-end gap-[6px]">
        {runSeries.map((d, i) => {
          const total = d.completed + d.failed;
          const active = hover === i;
          return (
            <button
              key={d.day}
              type="button"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className="group relative flex h-full flex-1 flex-col justify-end gap-[2px] rounded-t-sm outline-none"
              aria-label={`${d.day}: ${total.toLocaleString()} runs`}
            >
              <span
                className="w-full rounded-[3px] bg-destructive/80 transition-all duration-300"
                style={{ height: `${(d.failed / max) * 100 * 3}%` }}
              />
              <span
                className="w-full rounded-[3px] transition-all duration-300"
                style={{
                  height: `${(d.completed / max) * 100}%`,
                  background: active ? "var(--gradient-cyan)" : "var(--color-primary)",
                  opacity: hover === null || active ? 1 : 0.35,
                  boxShadow: active ? "var(--shadow-glow)" : "none",
                }}
              />
              {active && (
                <div className="absolute bottom-full left-1/2 z-10 mb-2 w-40 -translate-x-1/2 rounded-md border border-border-strong bg-popover p-2.5 text-left shadow-xl">
                  <p className="text-[11px] font-medium text-muted-foreground">{d.day}</p>
                  <p className="mt-1 text-sm font-semibold nums">{total.toLocaleString()} runs</p>
                  <div className="mt-1.5 space-y-0.5 text-[11px] nums text-muted-foreground">
                    <p className="flex justify-between">
                      <span>completed</span>
                      <span className="text-foreground">{d.completed.toLocaleString()}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>failed</span>
                      <span className="text-destructive">{d.failed.toLocaleString()}</span>
                    </p>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="ml-11 mt-2 flex gap-[6px]">
        {runSeries.map((d, i) => (
          <span
            key={d.day}
            className="flex-1 text-center text-[10px] nums text-muted-foreground transition-colors"
            style={{ color: hover === i ? "var(--color-foreground)" : undefined }}
          >
            {i % 2 === 0 ? d.day.replace("Sep ", "") : ""}
          </span>
        ))}
      </div>
    </div>
  );
}
