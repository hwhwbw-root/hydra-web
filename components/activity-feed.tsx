import Link from "next/link";
import {
  FileText,
  MapPin,
  Polygon,
  WifiSlash,
  BatteryLow,
} from "@phosphor-icons/react/dist/ssr";
import type { ActivityEvent, ActivityKind } from "@/lib/mock/types";
import { getWorker } from "@/lib/mock/workers";
import { getTeam } from "@/lib/mock/teams";
import { Avatar } from "@/components/avatar";
import { formatMins } from "@/lib/utils";

const KIND_ICON: Record<ActivityKind, React.ElementType> = {
  report: FileText,
  "check-in": MapPin,
  geofence: Polygon,
  offline: WifiSlash,
  online: MapPin,
  battery: BatteryLow,
};

const KIND_TONE: Record<ActivityKind, string> = {
  report: "text-primary",
  "check-in": "text-online",
  geofence: "text-[#5b6ee0]",
  offline: "text-offline",
  online: "text-online",
  battery: "text-idle",
};

export function ActivityFeed({ events }: { events: ActivityEvent[] }) {
  return (
    <ul className="stagger-children divide-y divide-border">
      {events.map((ev) => {
        const worker = getWorker(ev.workerId);
        if (!worker) return null;
        const team = getTeam(worker.teamId);
        const KindIcon = KIND_ICON[ev.kind];
        return (
          <li key={ev.id}>
            <Link
              href={`/dashboard/workers/${worker.id}`}
              className="flex items-center gap-3 py-3 transition-colors hover:bg-muted/60 -mx-2 px-2 rounded-lg"
            >
              <Avatar
                name={worker.name}
                accent={team?.accent ?? "#6e56cf"}
                size={36}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-foreground">
                  <span className="font-semibold">{worker.name}</span>{" "}
                  <span className="text-muted-foreground">{ev.message}</span>
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {team?.name} team
                </p>
              </div>
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-muted ${KIND_TONE[ev.kind]}`}
              >
                <KindIcon size={15} weight="bold" />
              </span>
              <span className="tnum w-16 shrink-0 text-right text-xs text-muted-foreground">
                {formatMins(ev.minsAgo)}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
