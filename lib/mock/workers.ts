import type { GeoPoint, TrailPoint, Worker, WorkerStatus } from "./types";

/** Deterministic recent-ping trail leading up to `location` (newest last). */
function buildTrail(
  location: GeoPoint,
  seed: number,
  count: number,
  lastSeenMins: number,
): TrailPoint[] {
  const points: TrailPoint[] = [];
  for (let i = 0; i < count; i++) {
    const age = count - 1 - i; // 0 == newest (== current location)
    const mag = age * 0.0012;
    const angle = seed * 1.3 + age * 0.85;
    points.push({
      lat: Number((location.lat + Math.cos(angle) * mag).toFixed(5)),
      lng: Number((location.lng + Math.sin(angle) * mag * 1.4).toFixed(5)),
      minsAgo: lastSeenMins + age * 6,
    });
  }
  return points;
}

interface Seed {
  id: string;
  name: string;
  teamId: string;
  role: string;
  phoneModel: string;
  phoneNumber: string;
  status: WorkerStatus;
  lastSeenMins: number;
  battery: number;
  signal: number;
  shiftStart: string;
  lat: number;
  lng: number;
}

const SEEDS: Seed[] = [
  // Alpha — Inspections, Central
  { id: "w-arif", name: "Arif Danial", teamId: "adia-a", role: "Field Inspector", phoneModel: "iPhone 14", phoneNumber: "+60 12-847 1928", status: "online", lastSeenMins: 1, battery: 83, signal: 4, shiftStart: "08:00", lat: 3.1382, lng: 101.7081 },
  { id: "w-meiling", name: "Mei Ling Tan", teamId: "adia-a", role: "Senior Inspector", phoneModel: "Samsung Galaxy S23", phoneNumber: "+60 16-332 6710", status: "online", lastSeenMins: 2, battery: 67, signal: 3, shiftStart: "08:00", lat: 3.1466, lng: 101.7109 },
  { id: "w-kavitha", name: "Kavitha Suresh", teamId: "adia-a", role: "Field Inspector", phoneModel: "Pixel 8", phoneNumber: "+60 19-204 5583", status: "idle", lastSeenMins: 14, battery: 41, signal: 2, shiftStart: "09:00", lat: 3.1291, lng: 101.6872 },
  { id: "w-bryan", name: "Bryan Teoh", teamId: "adia-a", role: "Field Inspector", phoneModel: "iPhone 13", phoneNumber: "+60 11-2890 4471", status: "online", lastSeenMins: 0, battery: 95, signal: 4, shiftStart: "08:00", lat: 3.1578, lng: 101.7121 },

  // Bravo — Installations, North
  { id: "w-hafiz", name: "Hafiz Rahman", teamId: "adia-b", role: "Lead Installer", phoneModel: "Samsung Galaxy A55", phoneNumber: "+60 13-771 0492", status: "online", lastSeenMins: 1, battery: 76, signal: 4, shiftStart: "07:30", lat: 3.1981, lng: 101.7248 },
  { id: "w-weijie", name: "Wei Jie Lim", teamId: "adia-b", role: "Installer", phoneModel: "Redmi Note 13", phoneNumber: "+60 17-558 3326", status: "online", lastSeenMins: 3, battery: 54, signal: 3, shiftStart: "07:30", lat: 3.1822, lng: 101.6918 },
  { id: "w-nurul", name: "Nurul Izzati", teamId: "adia-b", role: "Installer", phoneModel: "Oppo Reno 11", phoneNumber: "+60 12-630 7715", status: "offline", lastSeenMins: 52, battery: 12, signal: 1, shiftStart: "09:00", lat: 3.2049, lng: 101.7371 },
  { id: "w-joachim", name: "Joachim Lau", teamId: "adia-b", role: "Installer", phoneModel: "Vivo Y36", phoneNumber: "+60 16-918 2204", status: "online", lastSeenMins: 4, battery: 88, signal: 4, shiftStart: "08:00", lat: 3.2138, lng: 101.6361 },

  // Charlie — Maintenance, East
  { id: "w-raj", name: "Raj Kumaravel", teamId: "meranti", role: "Maintenance Tech", phoneModel: "iPhone 14", phoneNumber: "+60 19-447 6650", status: "online", lastSeenMins: 2, battery: 61, signal: 3, shiftStart: "08:00", lat: 3.1503, lng: 101.7602 },
  { id: "w-farah", name: "Farah Nadia", teamId: "meranti", role: "Senior Maintenance Tech", phoneModel: "Samsung Galaxy S23", phoneNumber: "+60 13-205 8819", status: "idle", lastSeenMins: 11, battery: 33, signal: 2, shiftStart: "09:00", lat: 3.1077, lng: 101.7398 },
  { id: "w-adam", name: "Adam Solomon", teamId: "meranti", role: "Maintenance Tech", phoneModel: "Pixel 7a", phoneNumber: "+60 11-3947 1180", status: "online", lastSeenMins: 1, battery: 72, signal: 4, shiftStart: "08:00", lat: 3.1748, lng: 101.7003 },
  { id: "w-chong", name: "Chong Kok Wai", teamId: "meranti", role: "Maintenance Tech", phoneModel: "Redmi Note 12", phoneNumber: "+60 17-820 3367", status: "offline", lastSeenMins: 96, battery: 9, signal: 0, shiftStart: "10:00", lat: 3.2051, lng: 101.7188 },

  // Delta — Surveys, South
  { id: "w-priya", name: "Pavithra Menon", teamId: "premix", role: "Surveyor", phoneModel: "iPhone 15", phoneNumber: "+60 12-559 9043", status: "online", lastSeenMins: 0, battery: 58, signal: 3, shiftStart: "08:00", lat: 3.0682, lng: 101.6881 },
  { id: "w-imran", name: "Imran Yusof", teamId: "premix", role: "Lead Surveyor", phoneModel: "Samsung Galaxy S22", phoneNumber: "+60 16-714 2298", status: "online", lastSeenMins: 2, battery: 47, signal: 2, shiftStart: "07:30", lat: 3.1003, lng: 101.6703 },
  { id: "w-sofia", name: "Sofia Marlowe", teamId: "premix", role: "Surveyor", phoneModel: "iPhone 13 mini", phoneNumber: "+60 19-661 3372", status: "idle", lastSeenMins: 18, battery: 28, signal: 2, shiftStart: "09:00", lat: 3.1286, lng: 101.6792 },
  { id: "w-daniel", name: "Daniel Aziz", teamId: "premix", role: "Surveyor", phoneModel: "Oppo A98", phoneNumber: "+60 13-308 7754", status: "offline", lastSeenMins: 134, battery: 19, signal: 0, shiftStart: "10:00", lat: 3.0712, lng: 101.6740 },
];

export const WORKERS: Worker[] = SEEDS.map((s, i) => {
  const location = { lat: s.lat, lng: s.lng };
  const count = s.status === "offline" ? 5 : 8;
  const { lat, lng, ...rest } = s;
  void lat;
  void lng;
  return {
    ...rest,
    location,
    trail: buildTrail(location, i + 1, count, s.lastSeenMins),
  };
});

export const WORKER_MAP: Record<string, Worker> = Object.fromEntries(
  WORKERS.map((w) => [w.id, w]),
);

export function getWorker(id: string): Worker | undefined {
  return WORKER_MAP[id];
}

export function workersByTeam(teamId: string): Worker[] {
  return WORKERS.filter((w) => w.teamId === teamId);
}
