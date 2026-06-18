import Link from "next/link";
import {
  Broadcast,
  UsersThree,
  FileDashed,
  BatteryMedium,
  ArrowRight,
  ClipboardText,
  CircleNotch,
  Timer,
} from "@phosphor-icons/react/dist/ssr";
import { computeKpis } from "@/lib/mock";
import { TEAMS } from "@/lib/mock/teams";
import { WORKERS } from "@/lib/mock/workers";
import { ACTIVITY } from "@/lib/mock/activity";
import { computeReportKpis, DAMAGE_TYPES } from "@/lib/mock/reports";
import { KpiCard, KpiGrid } from "@/components/kpi-card";
import { Panel, PanelHeader } from "@/components/section";
import { ActivityFeed } from "@/components/activity-feed";
import { WorkerRow } from "@/components/worker-row";
import { DamageChip, ReportStatusBadge } from "@/components/report-badges";
import { initials, formatDuration } from "@/lib/utils";

export default async function OverviewPage({
  searchParams,
}: {
  searchParams: Promise<{ team?: string }>;
}) {
  const { team } = await searchParams;
  const kpis = computeKpis();
  const rk = computeReportKpis();
  const maxDamage = Math.max(...DAMAGE_TYPES.map((d) => rk.damageCounts[d]), 1);
  const statusRows = [
    { key: "pending" as const, count: rk.statusCounts.pending, color: "#d99318" },
    { key: "approved" as const, count: rk.statusCounts.approved, color: "#16a37a" },
    { key: "rejected" as const, count: rk.statusCounts.rejected, color: "#e05a6b" },
  ];

  const roster = team ? WORKERS.filter((w) => w.teamId === team) : WORKERS;
  const sortedRoster = [...roster].sort(
    (a, b) => a.lastSeenMins - b.lastSeenMins,
  );

  return (
    <div className="flex flex-col gap-5">
      <KpiGrid>
        <KpiCard
          label="Workers online"
          value={kpis.online}
          hint={`of ${kpis.total}`}
          icon={Broadcast}
          index={0}
        />
        <KpiCard
          label="Active teams"
          value={`${kpis.activeTeams}/4`}
          hint="reporting"
          icon={UsersThree}
          accent="#5b6ee0"
          index={1}
        />
        <KpiCard
          label="Reports to review"
          value={kpis.reportsPending}
          hint="pending"
          icon={FileDashed}
          accent="#9d5bd2"
          index={2}
        />
        <KpiCard
          label="Avg phone battery"
          value={`${kpis.avgBattery}%`}
          hint="fleet"
          icon={BatteryMedium}
          accent="#16a37a"
          index={3}
        />
      </KpiGrid>

      <div className="grid gap-5 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <PanelHeader
            title="Recent activity"
            hint="Latest pings, check-ins and reports"
          />
          <ActivityFeed events={ACTIVITY.slice(0, 7)} />
        </Panel>

        <Panel>
          <PanelHeader title="Teams" hint="Coverage right now" />
          <ul className="stagger-children flex flex-col">
            {TEAMS.map((t) => {
              const members = WORKERS.filter((w) => w.teamId === t.id);
              const online = members.filter(
                (w) => w.status === "online",
              ).length;
              const pct = Math.round((online / members.length) * 100);
              return (
                <li key={t.id}>
                  <Link
                    href={`/dashboard/map?team=${t.id}`}
                    className="-mx-2 flex items-center gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-muted/60"
                  >
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-bold text-white"
                      style={{ backgroundColor: t.accent }}
                    >
                      {initials(t.name)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground">
                        {t.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {t.focus}
                      </p>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: t.accent,
                          }}
                        />
                      </div>
                    </div>
                    <span className="tnum shrink-0 text-right text-sm font-semibold text-foreground">
                      {online}
                      <span className="text-muted-foreground">
                        /{members.length}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Panel>
      </div>

      <Panel>
        <PanelHeader
          title={team ? "Team roster" : "Workforce"}
          hint={`${sortedRoster.length} workers · sorted by last seen`}
          action={{ label: "Open live map", href: "/dashboard/map" }}
        />
        <div className="stagger-children divide-y divide-border">
          {sortedRoster.map((w) => (
            <WorkerRow key={w.id} worker={w} showTeam={!team} />
          ))}
        </div>
        <Link
          href="/dashboard/map"
          className="mt-4 flex items-center justify-center gap-1.5 rounded-xl border border-border py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          See everyone on the map
          <ArrowRight size={15} weight="bold" />
        </Link>
      </Panel>

      {/* Reports */}
      <div className="flex items-center justify-between pt-1">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          Reports
        </h2>
        <Link
          href="/dashboard/reports"
          className="text-xs font-semibold text-primary transition-colors hover:text-primary/80"
        >
          Open review queue
        </Link>
      </div>

      <KpiGrid>
        <KpiCard
          label="Total reports"
          value={rk.total}
          hint="this week"
          icon={ClipboardText}
          index={0}
        />
        <KpiCard
          label="Pending review"
          value={rk.pending}
          hint="awaiting you"
          icon={CircleNotch}
          accent="#d99318"
          index={1}
        />
        <KpiCard
          label="Man-hours logged"
          value={`${rk.totalManHours}h`}
          icon={Timer}
          accent="#5b6ee0"
          index={2}
        />
        <KpiCard
          label="Avg repair time"
          value={formatDuration(rk.avgRepairMins)}
          hint="per report"
          icon={FileDashed}
          accent="#9d5bd2"
          index={3}
        />
      </KpiGrid>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel>
          <PanelHeader title="Damage types" hint="Across all reports" />
          <ul className="flex flex-col gap-3">
            {DAMAGE_TYPES.map((d) => (
              <li key={d} className="flex items-center gap-3">
                <span className="w-28 shrink-0">
                  <DamageChip type={d} />
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary/70"
                    style={{
                      width: `${(rk.damageCounts[d] / maxDamage) * 100}%`,
                    }}
                  />
                </div>
                <span className="tnum w-6 shrink-0 text-right text-sm font-semibold text-foreground">
                  {rk.damageCounts[d]}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <PanelHeader title="Report status" hint="Review pipeline" />
          <ul className="flex flex-col gap-3">
            {statusRows.map((s) => (
              <li key={s.key} className="flex items-center gap-3">
                <span className="w-32 shrink-0">
                  <ReportStatusBadge status={s.key} />
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(s.count / rk.total) * 100}%`,
                      backgroundColor: s.color,
                    }}
                  />
                </div>
                <span className="tnum w-6 shrink-0 text-right text-sm font-semibold text-foreground">
                  {s.count}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
