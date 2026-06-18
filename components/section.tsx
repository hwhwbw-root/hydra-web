import Link from "next/link";
import { cn } from "@/lib/utils";

export function Panel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-card p-5 shadow-diffuse",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function PanelHeader({
  title,
  hint,
  action,
}: {
  title: string;
  hint?: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <div>
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="shrink-0 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
