import type { ActivityEvent } from "./types";

/* Newest first (ascending minsAgo). Drives the Overview feed. */
export const ACTIVITY: ActivityEvent[] = [
  { id: "a1", workerId: "w-bryan", kind: "report", message: "submitted inspection report #INS-2291", minsAgo: 0 },
  { id: "a2", workerId: "w-priya", kind: "check-in", message: "checked in at Sri Petaling site B", minsAgo: 1 },
  { id: "a3", workerId: "w-hafiz", kind: "geofence", message: "entered Setapak depot zone", minsAgo: 3 },
  { id: "a4", workerId: "w-arif", kind: "report", message: "submitted inspection report #INS-2290", minsAgo: 6 },
  { id: "a5", workerId: "w-farah", kind: "battery", message: "phone battery dropped below 35%", minsAgo: 11 },
  { id: "a6", workerId: "w-kavitha", kind: "check-in", message: "paused — idle at Brickfields", minsAgo: 14 },
  { id: "a7", workerId: "w-sofia", kind: "report", message: "uploaded survey photos (8) for #SUR-118", minsAgo: 17 },
  { id: "a8", workerId: "w-nurul", kind: "offline", message: "phone went offline near Wangsa Maju", minsAgo: 52 },
  { id: "a9", workerId: "w-raj", kind: "geofence", message: "left Ampang service area", minsAgo: 64 },
  { id: "a10", workerId: "w-chong", kind: "offline", message: "no ping received for over an hour", minsAgo: 96 },
];
