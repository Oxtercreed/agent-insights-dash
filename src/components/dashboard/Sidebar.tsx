import {
  Activity,
  Boxes,
  CircleDollarSign,
  Cpu,
  KeyRound,
  LayoutGrid,
  LifeBuoy,
  Settings,
  Terminal,
} from "lucide-react";

const nav = [
  { label: "Overview", icon: LayoutGrid, active: true },
  { label: "Agents", icon: Boxes, badge: "6" },
  { label: "Runs", icon: Activity },
  { label: "Models", icon: Cpu },
  { label: "Traces", icon: Terminal },
  { label: "Spend", icon: CircleDollarSign },
  { label: "API keys", icon: KeyRound },
];

export function Sidebar() {
  return (
    <aside className="hidden w-[228px] shrink-0 flex-col border-r border-border bg-sidebar lg:flex">
      <div className="flex h-14 items-center gap-2.5 border-b border-border px-5">
        <span className="grid size-6 place-items-center rounded-[6px] text-[13px] font-bold text-primary-foreground" style={{ background: "var(--gradient-cyan)" }}>
          A
        </span>
        <span className="font-display text-[15px] font-semibold tracking-tight">Axon</span>
        <span className="ml-auto rounded border border-border px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          PRO
        </span>
      </div>

      <nav className="flex-1 space-y-0.5 p-2.5">
        {nav.map(({ label, icon: Icon, active, badge }) => (
          <button
            key={label}
            className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[13px] transition-colors duration-150 ${
              active
                ? "bg-sidebar-accent text-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
            }`}
          >
            <Icon className={`size-4 ${active ? "text-primary" : ""}`} strokeWidth={1.75} />
            {label}
            {badge && (
              <span className="ml-auto rounded bg-muted px-1.5 text-[10px] nums text-muted-foreground">
                {badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="border-t border-border p-2.5">
        {[
          { label: "Settings", icon: Settings },
          { label: "Support", icon: LifeBuoy },
        ].map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[13px] text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-foreground"
          >
            <Icon className="size-4" strokeWidth={1.75} />
            {label}
          </button>
        ))}
        <div className="mt-2 flex items-center gap-2.5 rounded-md px-2.5 py-2">
          <span className="grid size-7 place-items-center rounded-full bg-muted text-[11px] font-semibold">
            OH
          </span>
          <div className="min-w-0">
            <p className="truncate text-[12px] font-medium">Omary Hassan</p>
            <p className="truncate text-[11px] text-muted-foreground">omary@axon.dev</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
