"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string | null;
}

const STATUS_OPTIONS: Option[] = [
  { label: "All", value: null },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

const CATEGORY_OPTIONS: Option[] = [
  { label: "All types", value: null },
  { label: "Maintenance", value: "maintenance" },
  { label: "Premix", value: "premix" },
  { label: "General", value: "general" },
];

function Segmented({
  paramKey,
  options,
  current,
}: {
  paramKey: string;
  options: Option[];
  current: string | null;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  function set(value: string | null) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(paramKey, value);
    else next.delete(paramKey);
    const qs = next.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-xl border border-border bg-card p-1">
      {options.map((opt) => {
        const active = (opt.value ?? null) === (current ?? null);
        return (
          <button
            key={opt.label}
            onClick={() => set(opt.value)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export function ReportFilters({
  status,
  category,
}: {
  status: string | null;
  category: string | null;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Segmented paramKey="status" options={STATUS_OPTIONS} current={status} />
      <Segmented
        paramKey="category"
        options={CATEGORY_OPTIONS}
        current={category}
      />
    </div>
  );
}
