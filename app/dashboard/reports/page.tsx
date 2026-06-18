import { Suspense } from "react";
import {
  ClipboardText,
  CircleNotch,
  CheckCircle,
  Clock,
  FileMagnifyingGlass,
} from "@phosphor-icons/react/dist/ssr";
import { REPORTS } from "@/lib/mock/reports";
import { computeReportKpis } from "@/lib/mock/reports";
import { getWorker } from "@/lib/mock/workers";
import { getTeam } from "@/lib/mock/teams";
import { KpiCard, KpiGrid } from "@/components/kpi-card";
import { Panel, PanelHeader } from "@/components/section";
import { ReportRow } from "@/components/report-row";
import { ReportFilters } from "@/components/report-filters";
import { formatDuration } from "@/lib/utils";

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; category?: string; team?: string }>;
}) {
  const { status, category, team } = await searchParams;
  const kpis = computeReportKpis();

  let list = REPORTS.slice();
  if (status) list = list.filter((r) => r.status === status);
  if (category) list = list.filter((r) => r.category === category);
  if (team) {
    list = list.filter((r) => getWorker(r.workerId)?.teamId === team);
  }
  list.sort((a, b) => a.submittedMinsAgo - b.submittedMinsAgo);

  const teamName = team ? getTeam(team)?.name : undefined;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-foreground">
          Field reports
        </h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Reports submitted from the worker app — review, approve, or send back.
        </p>
      </div>

      <KpiGrid>
        <KpiCard label="Total reports" value={kpis.total} icon={ClipboardText} index={0} />
        <KpiCard
          label="Pending review"
          value={kpis.pending}
          hint="awaiting you"
          icon={CircleNotch}
          accent="#d99318"
          index={1}
        />
        <KpiCard
          label="Approved"
          value={kpis.approved}
          icon={CheckCircle}
          accent="#16a37a"
          index={2}
        />
        <KpiCard
          label="Avg repair time"
          value={formatDuration(kpis.avgRepairMins)}
          hint={`${kpis.totalManHours}h logged`}
          icon={Clock}
          accent="#5b6ee0"
          index={3}
        />
      </KpiGrid>

      <Suspense fallback={<div className="h-10" />}>
        <ReportFilters status={status ?? null} category={category ?? null} />
      </Suspense>

      <Panel>
        <PanelHeader
          title={teamName ? `${teamName} reports` : "All reports"}
          hint={`${list.length} ${list.length === 1 ? "report" : "reports"}`}
        />
        {list.length > 0 ? (
          <div className="stagger-children divide-y divide-border">
            {list.map((r) => (
              <ReportRow key={r.id} report={r} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-12 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-muted text-muted-foreground">
              <FileMagnifyingGlass size={22} />
            </span>
            <p className="text-sm font-medium text-foreground">
              No reports match these filters
            </p>
            <p className="text-sm text-muted-foreground">
              Try clearing the status, type, or team filter.
            </p>
          </div>
        )}
      </Panel>
    </div>
  );
}
