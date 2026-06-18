import { cn } from "@/lib/utils";
import type { WorkerStatus } from "@/lib/mock/types";

const LABEL: Record<WorkerStatus, string> = {
  online: "Online",
  idle: "Idle",
  offline: "Offline",
};

const COLOR: Record<WorkerStatus, string> = {
  online: "text-online",
  idle: "text-idle",
  offline: "text-offline",
};

export function StatusDot({
  status,
  withLabel = false,
  className,
}: {
  status: WorkerStatus;
  withLabel?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className={cn("relative flex h-2.5 w-2.5", COLOR[status])}>
        {status === "online" && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
        )}
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-current" />
      </span>
      {withLabel && (
        <span className="text-sm font-medium text-foreground/80">
          {LABEL[status]}
        </span>
      )}
    </span>
  );
}
