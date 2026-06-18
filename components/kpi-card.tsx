import type { Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  icon: IconCmp,
  hint,
  accent = "var(--primary)",
  index = 0,
}: {
  label: string;
  value: string | number;
  icon: Icon;
  hint?: string;
  accent?: string;
  index?: number;
}) {
  return (
    <div
      className="animate-fade-up rounded-2xl border border-border bg-card p-5 shadow-diffuse"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          {label}
        </span>
        <span
          className="grid h-9 w-9 place-items-center rounded-xl"
          style={{ backgroundColor: `${accent}14`, color: accent }}
        >
          <IconCmp size={18} weight="bold" />
        </span>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="tnum text-3xl font-semibold tracking-tight text-foreground">
          {value}
        </span>
        {hint && (
          <span className="text-xs font-medium text-muted-foreground">
            {hint}
          </span>
        )}
      </div>
    </div>
  );
}

export function KpiGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("grid grid-cols-2 gap-4 lg:grid-cols-4")}>{children}</div>
  );
}
