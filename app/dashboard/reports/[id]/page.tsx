import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarBlank,
  Clock,
  Timer,
  MapPin,
  Package,
  ListChecks,
  Hash,
  CaretRight,
} from "@phosphor-icons/react/dist/ssr";
import { getReport } from "@/lib/mock/reports";
import { getWorker } from "@/lib/mock/workers";
import { getTeam } from "@/lib/mock/teams";
import { Avatar } from "@/components/avatar";
import { TeamBadge } from "@/components/team-badge";
import {
  DamageChip,
  ReportStatusBadge,
  CategoryIcon,
  categoryLabel,
} from "@/components/report-badges";
import { DocChecklist } from "@/components/doc-checklist";
import { ReportReviewPanel } from "@/components/report-review-panel";
import { Panel, PanelHeader } from "@/components/section";
import { formatMins, formatDuration } from "@/lib/utils";

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const report = getReport(id);
  if (!report) notFound();

  const worker = getWorker(report.workerId);
  const team = worker ? getTeam(worker.teamId) : undefined;
  const accent = team?.accent ?? "#6e56cf";
  const documented = report.photos.filter((p) => p.hasPhoto).length;
  const totalDocs = report.photos.length;

  return (
    <div className="flex flex-col gap-5">
      <Link
        href="/dashboard/reports"
        className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={16} /> Back to reports
      </Link>

      {/* Header */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-diffuse">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
            <CategoryIcon category={report.category} size={22} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-semibold tracking-tight text-foreground">
                {report.title}
              </h1>
              <ReportStatusBadge status={report.status} />
            </div>
            <p className="tnum mt-1 text-sm text-muted-foreground">
              {categoryLabel(report.category)} · Activity #{report.activityId} ·{" "}
              submitted {formatMins(report.submittedMinsAgo)}
            </p>
          </div>
          {worker && team && (
            <Link
              href={`/dashboard/workers/${worker.id}`}
              className="group flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2 transition-colors hover:bg-muted"
            >
              <Avatar name={worker.name} accent={accent} size={36} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {worker.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {team.name} · {worker.role}
                </p>
              </div>
              <CaretRight
                size={15}
                className="text-muted-foreground/50 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          )}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Left: report content */}
        <div className="flex flex-col gap-5 lg:col-span-2">
          <Panel>
            <PanelHeader title="Timing & outcome" />
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3">
              <Field icon={<CalendarBlank size={15} />} label="Date">
                {report.date}
              </Field>
              <Field icon={<CalendarBlank size={15} />} label="Day">
                {report.day}
              </Field>
              <Field icon={<Clock size={15} />} label="Start">
                {report.startTime}
              </Field>
              <Field icon={<Clock size={15} />} label="End">
                {report.endTime}
              </Field>
              <Field icon={<Timer size={15} />} label="Duration">
                {formatDuration(report.durationMins)}
              </Field>
              <Field icon={<MapPin size={15} />} label="Location">
                {report.location}
              </Field>
            </div>
            <div className="mt-5 border-t border-border pt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Jenis Kerosakan / Damage type
              </p>
              <div className="flex flex-wrap gap-1.5">
                {report.damageTypes.map((d) => (
                  <DamageChip key={d} type={d} />
                ))}
              </div>
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Resources & materials" />
            <ul className="flex flex-col divide-y divide-border">
              {report.materials.map((m, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2.5 py-2.5 text-sm text-foreground"
                >
                  <Package size={15} className="shrink-0 text-muted-foreground" />
                  {m}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel>
            <PanelHeader
              title="Site documentation"
              hint={`${documented} of ${totalDocs} items documented`}
            />
            <DocChecklist items={report.photos} />
          </Panel>
        </div>

        {/* Right: review + meta */}
        <div className="flex flex-col gap-5">
          <Panel className="lg:sticky lg:top-20">
            <ReportReviewPanel
              initialStatus={report.status}
              initialNote={report.reviewerNote}
            />
          </Panel>

          <Panel>
            <PanelHeader title="Activity" />
            <dl className="flex flex-col divide-y divide-border">
              <Field icon={<Hash size={15} />} label="Activity ID" inline>
                <span className="tnum">{report.activityId}</span>
              </Field>
              <Field
                icon={<ListChecks size={15} />}
                label="Documentation"
                inline
              >
                <span className="tnum">
                  {documented}/{totalDocs}
                </span>
              </Field>
              <Field icon={<MapPin size={15} />} label="Location" inline>
                <span className="text-right">{report.location}</span>
              </Field>
            </dl>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Field({
  icon,
  label,
  children,
  inline = false,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  inline?: boolean;
}) {
  if (inline) {
    return (
      <div className="flex items-center gap-3 py-2.5">
        <span className="text-muted-foreground">{icon}</span>
        <dt className="text-sm text-muted-foreground">{label}</dt>
        <dd className="ml-auto text-sm font-medium text-foreground">
          {children}
        </dd>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-1">
      <dt className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        {icon}
        {label}
      </dt>
      <dd className="text-sm font-medium text-foreground">{children}</dd>
    </div>
  );
}
