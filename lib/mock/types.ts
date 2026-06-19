export type WorkerStatus = "online" | "idle" | "offline";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface TrailPoint extends GeoPoint {
  /** minutes before "now" for this ping (deterministic, hydration-safe) */
  minsAgo: number;
}

export interface Team {
  id: string;
  name: string;
  /** on-brand accent hue (violet/indigo family) for map pins + badges */
  accent: string;
  focus: string;
  lead: string;
}

export interface Worker {
  id: string;
  name: string;
  teamId: string;
  role: string;
  phoneModel: string;
  phoneNumber: string;
  status: WorkerStatus;
  /** minutes since last phone ping */
  lastSeenMins: number;
  /** battery percent 0-100 */
  battery: number;
  /** signal bars 0-4 */
  signal: number;
  shiftStart: string;
  location: GeoPoint;
  /** most-recent-last trail of recent pings */
  trail: TrailPoint[];
}

export type ActivityKind = "report" | "check-in" | "geofence" | "offline";

export interface ActivityEvent {
  id: string;
  workerId: string;
  kind: ActivityKind;
  message: string;
  /** minutes before "now" */
  minsAgo: number;
}

/* ---- Field reports (submitted from the worker mobile app) ---- */

export type ReportStatus = "pending" | "approved" | "rejected";

export type ReportCategory = "maintenance" | "premix" | "general";

export type DamageType =
  | "Electrical"
  | "Mechanical"
  | "Structural"
  | "Plumbing"
  | "Civil"
  | "Other";

/** One bilingual photo-documentation slot in a report's checklist. */
export interface PhotoItem {
  /** Malay label */
  ms: string;
  /** English label */
  en: string;
  /** whether the worker attached a photo for this slot */
  hasPhoto: boolean;
}

export interface Report {
  id: string;
  /** activity the worker started in the app, e.g. "1042" */
  activityId: string;
  workerId: string;
  category: ReportCategory;
  title: string;
  location: string;
  /** display date "18/06/2026" */
  date: string;
  day: string;
  startTime: string;
  endTime: string;
  /** auto-calculated in the app */
  durationMins: number;
  damageTypes: DamageType[];
  materials: string[];
  photos: PhotoItem[];
  status: ReportStatus;
  reviewerNote?: string;
  /** minutes since submission */
  submittedMinsAgo: number;
}
