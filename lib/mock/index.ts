import { WORKERS } from "./workers";
import { computeReportKpis } from "./reports";

export * from "./types";
export { TEAMS, TEAM_MAP, getTeam } from "./teams";
export {
  WORKERS,
  WORKER_MAP,
  getWorker,
  workersByTeam,
} from "./workers";
export { ACTIVITY } from "./activity";
export {
  REPORTS,
  REPORT_MAP,
  getReport,
  DAMAGE_TYPES,
  computeReportKpis,
} from "./reports";
export type { ReportKpis } from "./reports";

export interface Kpis {
  total: number;
  online: number;
  idle: number;
  offline: number;
  activeTeams: number;
  reportsPending: number;
  avgBattery: number;
}

export function computeKpis(): Kpis {
  const online = WORKERS.filter((w) => w.status === "online").length;
  const idle = WORKERS.filter((w) => w.status === "idle").length;
  const offline = WORKERS.filter((w) => w.status === "offline").length;
  const teams = new Set(
    WORKERS.filter((w) => w.status !== "offline").map((w) => w.teamId),
  );
  const avgBattery = Math.round(
    WORKERS.reduce((sum, w) => sum + w.battery, 0) / WORKERS.length,
  );
  return {
    total: WORKERS.length,
    online,
    idle,
    offline,
    activeTeams: teams.size,
    reportsPending: computeReportKpis().pending,
    avgBattery,
  };
}
