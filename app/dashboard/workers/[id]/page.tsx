import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  DeviceMobile,
  Clock,
  Crosshair,
  ChatCircleDots,
  FileText,
  NavigationArrow,
  BatteryMedium,
  CellSignalMedium,
  Hash,
} from "@phosphor-icons/react/dist/ssr";
import { getWorker } from "@/lib/mock/workers";
import { getTeam } from "@/lib/mock/teams";
import { ACTIVITY } from "@/lib/mock/activity";
import { MapPanel } from "@/components/map-panel";
import { Avatar } from "@/components/avatar";
import { StatusDot } from "@/components/status-dot";
import { Battery, Signal } from "@/components/phone-health";
import { TeamBadge } from "@/components/team-badge";
import { Panel, PanelHeader } from "@/components/section";
import { formatMins } from "@/lib/utils";

export default async function WorkerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const worker = getWorker(id);
  if (!worker) notFound();

  const team = getTeam(worker.teamId);
  const accent = team?.accent ?? "#6e56cf";
  const pings = [...worker.trail].reverse(); // newest first
  const workerActivity = ACTIVITY.filter((a) => a.workerId === worker.id);

  return (
    <div className="flex flex-col gap-5">
      <Link
        href="/dashboard/map"
        className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={16} /> Back to map
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-diffuse sm:flex-row sm:items-center">
        <Avatar name={worker.name} accent={accent} size={60} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              {worker.name}
            </h1>
            {team && <TeamBadge team={team} />}
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {worker.role} · Shift from {worker.shiftStart}
          </p>
        </div>
        <div className="flex items-center gap-6 sm:flex-col sm:items-end sm:gap-1">
          <StatusDot status={worker.status} withLabel />
          <p className="tnum text-xs text-muted-foreground">
            last seen {formatMins(worker.lastSeenMins)}
          </p>
        </div>
        <div className="flex gap-2 sm:ml-2">
          <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted active:translate-y-px">
            <ChatCircleDots size={17} /> Message
          </button>
          <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-3.5 text-sm font-semibold text-primary-foreground shadow-diffuse transition-all hover:bg-primary/92 active:scale-[0.98]">
            <FileText size={17} /> Reports
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Map + trail */}
        <div className="flex flex-col gap-2 lg:col-span-2">
          <MapPanel
            workers={[worker]}
            showTrails
            className="h-[44vh] min-h-[340px]"
          />
          <p className="flex items-center gap-1.5 px-1 text-xs text-muted-foreground">
            <NavigationArrow size={13} weight="bold" style={{ color: accent }} />
            Dashed line traces the last {worker.trail.length} phone pings.
          </p>
        </div>

        {/* Phone + position */}
        <Panel>
          <PanelHeader title="Phone & position" />
          <dl className="flex flex-col divide-y divide-border">
            <Row icon={<DeviceMobile size={16} />} label="Device">
              {worker.phoneModel}
            </Row>
            <Row icon={<Hash size={16} />} label="Number">
              <span className="tnum">{worker.phoneNumber}</span>
            </Row>
            <Row icon={<BatteryMedium size={16} />} label="Battery">
              <Battery percent={worker.battery} />
            </Row>
            <Row icon={<CellSignalMedium size={16} />} label="Signal">
              <span className="inline-flex items-center gap-1.5">
                <Signal bars={worker.signal} />
                <span className="text-foreground/80">{worker.signal}/4</span>
              </span>
            </Row>
            <Row icon={<Crosshair size={16} />} label="Coordinates">
              <span className="tnum text-foreground/80">
                {worker.location.lat.toFixed(4)}, {worker.location.lng.toFixed(4)}
              </span>
            </Row>
            <Row icon={<Clock size={16} />} label="Last ping">
              <span className="tnum text-foreground/80">
                {formatMins(worker.lastSeenMins)}
              </span>
            </Row>
          </dl>
        </Panel>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Recent pings */}
        <Panel className="lg:col-span-2">
          <PanelHeader title="Recent pings" hint="Most recent first" />
          <ol className="relative ml-1.5 border-l border-border">
            {pings.map((p, i) => (
              <li key={i} className="relative py-2.5 pl-5">
                <span
                  className="absolute -left-[5px] top-4 h-2.5 w-2.5 rounded-full border-2 border-card"
                  style={{ backgroundColor: i === 0 ? accent : "#cbc6d4" }}
                />
                <div className="flex items-center justify-between gap-3">
                  <span className="tnum text-sm text-foreground">
                    {p.lat.toFixed(5)}, {p.lng.toFixed(5)}
                  </span>
                  <span className="tnum text-xs text-muted-foreground">
                    {formatMins(p.minsAgo)}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </Panel>

        {/* Worker activity */}
        <Panel>
          <PanelHeader title="This worker" hint="Events today" />
          {workerActivity.length > 0 ? (
            <ul className="flex flex-col divide-y divide-border">
              {workerActivity.map((ev) => (
                <li key={ev.id} className="py-2.5">
                  <p className="text-sm text-foreground">{ev.message}</p>
                  <p className="tnum mt-0.5 text-xs text-muted-foreground">
                    {formatMins(ev.minsAgo)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No recorded events today.
            </p>
          )}
        </Panel>
      </div>
    </div>
  );
}

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 py-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-muted text-foreground/70">
        {icon}
      </span>
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="ml-auto text-right text-sm font-medium text-foreground">
        {children}
      </dd>
    </div>
  );
}
