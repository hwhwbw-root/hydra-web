import type { ActivityEvent } from "./types";

/*
  Newest first (ascending minsAgo). Every event maps to something the system
  can actually observe from the worker app / phone:
   - report   → a report submission from the app
   - check-in → the worker tapping "Start Activity" in the app (carries an Activity #)
   - geofence → a location ping crossing a configured site zone
   - offline  → pings stopped arriving
*/
export const ACTIVITY: ActivityEvent[] = [
  { id: "a1", workerId: "w-bryan", kind: "report", message: "submitted maintenance report (Activity #1042)", minsAgo: 0 },
  { id: "a2", workerId: "w-priya", kind: "check-in", message: "started Activity #1044 at Sri Petaling site B", minsAgo: 1 },
  { id: "a3", workerId: "w-hafiz", kind: "geofence", message: "entered Setapak depot zone", minsAgo: 3 },
  { id: "a4", workerId: "w-arif", kind: "report", message: "submitted inspection report (Activity #1041)", minsAgo: 6 },
  { id: "a5", workerId: "w-weijie", kind: "check-in", message: "started Activity #1018 near Sentul", minsAgo: 11 },
  { id: "a6", workerId: "w-kavitha", kind: "check-in", message: "started Activity #1051 at Brickfields", minsAgo: 14 },
  { id: "a7", workerId: "w-sofia", kind: "report", message: "uploaded survey report (Activity #1039)", minsAgo: 17 },
  { id: "a8", workerId: "w-nurul", kind: "offline", message: "phone stopped reporting near Wangsa Maju", minsAgo: 52 },
  { id: "a9", workerId: "w-raj", kind: "geofence", message: "left Ampang service area", minsAgo: 64 },
  { id: "a10", workerId: "w-chong", kind: "offline", message: "no ping received for over an hour", minsAgo: 96 },
];
