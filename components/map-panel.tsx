"use client";

import dynamic from "next/dynamic";
import type { Worker } from "@/lib/mock/types";
import { cn } from "@/lib/utils";

const WorkerMap = dynamic(
  () => import("@/components/worker-map").then((m) => m.WorkerMap),
  {
    ssr: false,
    loading: () => (
      <div className="skeleton h-full w-full" aria-label="Loading map" />
    ),
  },
);

export function MapPanel({
  workers,
  showTrails = false,
  className,
}: {
  workers: Worker[];
  showTrails?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-muted shadow-diffuse",
        className,
      )}
    >
      <WorkerMap workers={workers} showTrails={showTrails} className="h-full w-full" />
    </div>
  );
}
