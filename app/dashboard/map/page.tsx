import { MapPin, Broadcast } from "@phosphor-icons/react/dist/ssr";
import { WORKERS } from "@/lib/mock/workers";
import { getTeam } from "@/lib/mock/teams";
import type { WorkerStatus } from "@/lib/mock/types";
import { MapPanel } from "@/components/map-panel";
import { WorkerRow } from "@/components/worker-row";

const STATUS_WEIGHT: Record<WorkerStatus, number> = {
  online: 0,
  idle: 1,
  offline: 2,
};

export default async function LiveMapPage({
  searchParams,
}: {
  searchParams: Promise<{ team?: string }>;
}) {
  const { team } = await searchParams;
  const selected = team ? getTeam(team) : undefined;

  const workers = (team ? WORKERS.filter((w) => w.teamId === team) : WORKERS)
    .slice()
    .sort(
      (a, b) =>
        STATUS_WEIGHT[a.status] - STATUS_WEIGHT[b.status] ||
        a.lastSeenMins - b.lastSeenMins,
    );

  const online = workers.filter((w) => w.status === "online").length;

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm">
          <MapPin size={16} className="text-primary" weight="bold" />
          <span className="font-medium text-foreground">
            {selected ? `${selected.name} team` : "All teams"}
          </span>
          <span className="text-muted-foreground">
            · {workers.length} phones tracked
          </span>
        </div>
        <MapPanel
          workers={workers}
          showTrails={Boolean(selected)}
          className="h-[58vh] min-h-[380px] lg:h-[calc(100dvh-11rem)]"
        />
      </div>

      <aside className="flex min-h-0 flex-col rounded-2xl border border-border bg-card shadow-diffuse">
        <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Workers
          </h2>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-online">
            <Broadcast size={14} weight="bold" />
            {online} online
          </span>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-3 lg:max-h-[calc(100dvh-13rem)]">
          <div className="stagger-children divide-y divide-border">
            {workers.map((w) => (
              <WorkerRow key={w.id} worker={w} showTeam={!selected} />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
