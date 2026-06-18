import Link from "next/link";
import { Clock, CaretRight } from "@phosphor-icons/react/dist/ssr";
import type { Report } from "@/lib/mock/types";
import { getWorker } from "@/lib/mock/workers";
import { getTeam } from "@/lib/mock/teams";
import { Avatar } from "@/components/avatar";
import { ReportStatusBadge, CategoryIcon } from "@/components/report-badges";
import { formatMins, formatDuration } from "@/lib/utils";

export function ReportRow({ report }: { report: Report }) {
  const worker = getWorker(report.workerId);
  const team = worker ? getTeam(worker.teamId) : undefined;

  return (
    <Link
      href={`/dashboard/reports/${report.id}`}
      className="group -mx-2 flex items-center gap-3 rounded-xl px-2 py-3.5 transition-colors hover:bg-muted/60 md:gap-4"
    >
      {/* category tile */}
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
        <CategoryIcon category={report.category} />
      </span>

      {/* title + activity */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">
          {report.title}
        </p>
        <p className="tnum mt-0.5 truncate text-xs text-muted-foreground">
          Activity #{report.activityId} · {report.date}
        </p>
      </div>

      {/* submitter — fixed width keeps avatars aligned across rows */}
      <div className="hidden w-40 shrink-0 items-center gap-2 md:flex">
        {worker && team && (
          <>
            <Avatar name={worker.name} accent={team.accent} size={28} />
            <div className="min-w-0">
              <p className="truncate text-sm text-foreground">{worker.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {team.name}
              </p>
            </div>
          </>
        )}
      </div>

      {/* duration */}
      <div className="hidden w-16 shrink-0 items-center gap-1.5 text-sm text-muted-foreground lg:flex">
        <Clock size={14} />
        <span className="tnum">{formatDuration(report.durationMins)}</span>
      </div>

      {/* status */}
      <div className="hidden w-36 shrink-0 justify-end sm:flex">
        <ReportStatusBadge status={report.status} />
      </div>

      {/* submitted */}
      <span className="tnum hidden w-12 shrink-0 text-right text-xs text-muted-foreground lg:block">
        {formatMins(report.submittedMinsAgo)}
      </span>

      <CaretRight
        size={16}
        className="shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  );
}
