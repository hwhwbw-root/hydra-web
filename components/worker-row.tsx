import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import type { Worker } from "@/lib/mock/types";
import { getTeam } from "@/lib/mock/teams";
import { Avatar } from "@/components/avatar";
import { StatusDot } from "@/components/status-dot";
import { Battery } from "@/components/phone-health";
import { TeamBadge } from "@/components/team-badge";
import { formatMins } from "@/lib/utils";

export function WorkerRow({
  worker,
  showTeam = true,
}: {
  worker: Worker;
  showTeam?: boolean;
}) {
  const team = getTeam(worker.teamId);
  return (
    <Link
      href={`/dashboard/workers/${worker.id}`}
      className="group flex items-center gap-3 px-2 py-3 transition-colors hover:bg-muted/60 -mx-2 rounded-xl"
    >
      <Avatar name={worker.name} accent={team?.accent ?? "#6e56cf"} size={40} />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold text-foreground">
            {worker.name}
          </p>
          {showTeam && team && <TeamBadge team={team} />}
        </div>
        <p className="truncate text-xs text-muted-foreground">{worker.role}</p>
      </div>

      <div className="hidden w-28 shrink-0 sm:block">
        <StatusDot status={worker.status} withLabel />
        <p className="tnum mt-0.5 text-xs text-muted-foreground">
          {formatMins(worker.lastSeenMins)}
        </p>
      </div>

      <div className="hidden w-16 shrink-0 md:block">
        <Battery percent={worker.battery} />
      </div>

      <CaretRight
        size={16}
        className="shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-muted-foreground"
      />
    </Link>
  );
}
