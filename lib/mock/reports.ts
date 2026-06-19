import type {
  DamageType,
  PhotoItem,
  Report,
  ReportCategory,
} from "./types";

/* Photo-documentation templates, mirrored from the worker mobile app.
   Labels are bilingual (Malay / English) exactly as the app presents them. */

type Slot = Omit<PhotoItem, "hasPhoto">;

const MAINTENANCE_TEMPLATE: Slot[] = [
  { ms: "Wakil Syabas di tapak", en: "Representative at site" },
  { ms: "Penyediaan peralatan keselamatan", en: "Safety equipment provision" },
  { ms: "Lokasi Kebocoran", en: "Leak location" },
  { ms: "Kerja-kerja Pemotongan Jalan", en: "Road cutting works" },
  { ms: "Kerja-kerja Pengorekan", en: "Excavation works" },
  { ms: "Kerja-kerja Pembaikan", en: "Repair works" },
  { ms: "Barangan yang telah rosak/lama", en: "Damaged / old items" },
  { ms: "Barangan yang akan diganti", en: "Items to be replaced" },
  { ms: "Kerja memasukkan pasir", en: "Sand filling works" },
  { ms: "Kerja-kerja mampatan pasir lapisan pertama", en: "Sand compaction (first layer)" },
  { ms: "Kerja-kerja mampatan batu pecah", en: "Aggregate compaction" },
  { ms: "Kerja-kerja Pembaikan akhir", en: "Final repair works" },
];

const PREMIX_TEMPLATE: Slot[] = [
  { ms: "Wakil Syabas di tapak", en: "Representative at site" },
  { ms: "Penyediaan peralatan keselamatan", en: "Safety equipment provision" },
  { ms: "Lokasi Kerja Premix", en: "Premix work location" },
  { ms: "Kerja-kerja Pemotongan Jalan", en: "Road cutting works" },
  { ms: "Pembersihan Kawasan", en: "Area cleaning" },
  { ms: "Penuangan Premix", en: "Premix pouring" },
  { ms: "Kerja-kerja Pemadatan", en: "Compaction works" },
  { ms: "Kerja-kerja Kemasan", en: "Finishing works" },
  { ms: "Kerja telah siap sepenuhnya", en: "Work fully completed" },
  { ms: "Gambar Papan Putih", en: "Whiteboard picture" },
  { ms: "Gambar Pengesahan Tapak", en: "Site confirmation" },
  { ms: "Gambar Sebelum Kerja", en: "Before-work picture" },
];

const GENERAL_TEMPLATE: Slot[] = [
  { ms: "Wakil Syabas di tapak", en: "Representative at site" },
  { ms: "Penyediaan peralatan keselamatan", en: "Safety equipment provision" },
  { ms: "Gambar Sebelum Kerja", en: "Before-work picture" },
  { ms: "Gambar Semasa Kerja", en: "During-work picture" },
  { ms: "Gambar Selepas Kerja", en: "After-work picture" },
  { ms: "Gambar Pengesahan Tapak", en: "Site confirmation" },
];

const TEMPLATES: Record<ReportCategory, Slot[]> = {
  maintenance: MAINTENANCE_TEMPLATE,
  premix: PREMIX_TEMPLATE,
  general: GENERAL_TEMPLATE,
};

/** Build a photo checklist for a category, first `filled` slots attached. */
function photos(category: ReportCategory, filled: number): PhotoItem[] {
  return TEMPLATES[category].map((slot, i) => ({
    ...slot,
    hasPhoto: i < filled,
  }));
}

interface Seed {
  id: string;
  activityId: string;
  workerId: string;
  category: ReportCategory;
  title: string;
  location: string;
  date: string;
  day: string;
  startTime: string;
  endTime: string;
  durationMins: number;
  damageTypes: DamageType[];
  materials: string[];
  status: Report["status"];
  reviewerNote?: string;
  submittedMinsAgo: number;
  /** photos attached; defaults to all when omitted */
  filled?: number;
}

const SEEDS: Seed[] = [
  {
    id: "r-2291", activityId: "1042", workerId: "w-bryan", category: "maintenance",
    title: "Pipe leak repair — Jalan Pudu", location: "Jalan Pudu, KL",
    date: "18/06/2026", day: "Thursday", startTime: "08:15", endTime: "09:50",
    durationMins: 95, damageTypes: ["Plumbing"],
    materials: ["uPVC pipe 100mm ×2", "Quick-set cement 25kg", "Pipe clamp ×4"],
    status: "pending", submittedMinsAgo: 0, filled: 9,
  },
  {
    id: "r-2290", activityId: "1041", workerId: "w-arif", category: "maintenance",
    title: "Valve inspection — Bukit Bintang", location: "Jalan Bukit Bintang, KL",
    date: "18/06/2026", day: "Thursday", startTime: "08:40", endTime: "09:58",
    durationMins: 78, damageTypes: ["Structural", "Mechanical"],
    materials: ["Gate valve 150mm", "Gasket set", "Anti-seize compound"],
    status: "pending", submittedMinsAgo: 6, filled: 8,
  },
  {
    id: "r-2289", activityId: "1039", workerId: "w-sofia", category: "premix",
    title: "Premix resurfacing — Bangsar South", location: "Jalan Kerinchi, Bangsar South",
    date: "18/06/2026", day: "Thursday", startTime: "07:30", endTime: "08:34",
    durationMins: 64, damageTypes: ["Civil"],
    materials: ["Premix asphalt 1.2t", "Tack coat 20L", "Road marking paint"],
    status: "pending", submittedMinsAgo: 17, filled: 10,
  },
  {
    id: "r-2288", activityId: "1036", workerId: "w-hafiz", category: "premix",
    title: "Premix pouring — Setapak depot", location: "Setapak depot yard",
    date: "18/06/2026", day: "Thursday", startTime: "07:45", endTime: "09:45",
    durationMins: 120, damageTypes: ["Civil", "Structural"],
    materials: ["Premix asphalt 2.0t", "Tack coat 40L"],
    status: "approved", submittedMinsAgo: 41, reviewerNote: "Clean job, all checkpoints documented.",
  },
  {
    id: "r-2287", activityId: "1033", workerId: "w-raj", category: "maintenance",
    title: "Pump motor fault — Ampang main", location: "Ampang booster station",
    date: "18/06/2026", day: "Thursday", startTime: "06:50", endTime: "08:40",
    durationMins: 110, damageTypes: ["Mechanical", "Electrical"],
    materials: ["Motor bearing set", "3-phase contactor", "Lubricant 5L"],
    status: "approved", submittedMinsAgo: 64, reviewerNote: "Approved — follow up on contactor next service.",
  },
  {
    id: "r-2286", activityId: "1031", workerId: "w-farah", category: "maintenance",
    title: "Meter replacement — Cheras", location: "Taman Cheras, Lot 14",
    date: "17/06/2026", day: "Wednesday", startTime: "14:10", endTime: "15:02",
    durationMins: 52, damageTypes: ["Plumbing"],
    materials: ["Water meter 15mm", "Brass union ×2"],
    status: "rejected", submittedMinsAgo: 88,
    reviewerNote: "Leak-location and before-work photos missing — please resubmit with full checklist.",
    filled: 4,
  },
  {
    id: "r-2285", activityId: "1029", workerId: "w-imran", category: "premix",
    title: "Trench premix — Old Klang Road", location: "Old Klang Road, near KM6",
    date: "17/06/2026", day: "Wednesday", startTime: "09:20", endTime: "11:34",
    durationMins: 134, damageTypes: ["Civil"],
    materials: ["Premix asphalt 1.6t", "Aggregate 0.8t", "Tack coat 30L"],
    status: "pending", submittedMinsAgo: 122, filled: 11,
  },
  {
    id: "r-2284", activityId: "1026", workerId: "w-priya", category: "general",
    title: "Site survey follow-up — Sri Petaling", location: "Sri Petaling, Block C",
    date: "17/06/2026", day: "Wednesday", startTime: "10:05", endTime: "11:18",
    durationMins: 73, damageTypes: ["Other"],
    materials: ["Survey pegs ×6", "Marking spray ×2"],
    status: "pending", submittedMinsAgo: 180, filled: 4,
  },
  {
    id: "r-2283", activityId: "1021", workerId: "w-adam", category: "maintenance",
    title: "Cabling fault repair — Titiwangsa", location: "Titiwangsa pump house",
    date: "17/06/2026", day: "Wednesday", startTime: "08:00", endTime: "09:36",
    durationMins: 96, damageTypes: ["Electrical"],
    materials: ["Armoured cable 10m", "Cable gland ×4", "Heat-shrink kit"],
    status: "approved", submittedMinsAgo: 300, reviewerNote: "Documentation complete.",
  },
  {
    id: "r-2282", activityId: "1018", workerId: "w-weijie", category: "premix",
    title: "Premix compaction — Sentul", location: "Jalan Sentul, KL",
    date: "16/06/2026", day: "Tuesday", startTime: "13:30", endTime: "14:58",
    durationMins: 88, damageTypes: ["Civil"],
    materials: ["Premix asphalt 1.0t", "Plate compactor fuel"],
    status: "pending", submittedMinsAgo: 360, filled: 9,
  },
  {
    id: "r-2281", activityId: "1014", workerId: "w-joachim", category: "maintenance",
    title: "Gearbox service — Kepong", location: "Kepong reservoir",
    date: "16/06/2026", day: "Tuesday", startTime: "07:15", endTime: "09:37",
    durationMins: 142, damageTypes: ["Mechanical"],
    materials: ["Gear oil 15L", "Seal kit", "Coupling spider"],
    status: "approved", submittedMinsAgo: 480, reviewerNote: "Good work.",
  },
  {
    id: "r-2280", activityId: "1009", workerId: "w-meiling", category: "maintenance",
    title: "Leak repair — Wangsa Maju", location: "Wangsa Maju, Seksyen 2",
    date: "16/06/2026", day: "Tuesday", startTime: "15:05", endTime: "16:12",
    durationMins: 67, damageTypes: ["Plumbing", "Civil"],
    materials: ["uPVC pipe 80mm", "Repair clamp ×2", "Sand 2 bags"],
    status: "pending", submittedMinsAgo: 1440, filled: 8,
  },
];

export const REPORTS: Report[] = SEEDS.map((s) => {
  const { filled, ...rest } = s;
  return {
    ...rest,
    photos: photos(s.category, filled ?? TEMPLATES[s.category].length),
  };
});

export const REPORT_MAP: Record<string, Report> = Object.fromEntries(
  REPORTS.map((r) => [r.id, r]),
);

export function getReport(id: string): Report | undefined {
  return REPORT_MAP[id];
}

export const DAMAGE_TYPES: DamageType[] = [
  "Electrical",
  "Mechanical",
  "Structural",
  "Plumbing",
  "Civil",
  "Other",
];

export interface ReportKpis {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  totalManHours: number;
  damageCounts: Record<DamageType, number>;
  statusCounts: { pending: number; approved: number; rejected: number };
}

export function computeReportKpis(): ReportKpis {
  const total = REPORTS.length;
  const pending = REPORTS.filter((r) => r.status === "pending").length;
  const approved = REPORTS.filter((r) => r.status === "approved").length;
  const rejected = REPORTS.filter((r) => r.status === "rejected").length;
  const totalMins = REPORTS.reduce((s, r) => s + r.durationMins, 0);

  const damageCounts = DAMAGE_TYPES.reduce(
    (acc, d) => {
      acc[d] = REPORTS.filter((r) => r.damageTypes.includes(d)).length;
      return acc;
    },
    {} as Record<DamageType, number>,
  );

  return {
    total,
    pending,
    approved,
    rejected,
    totalManHours: Math.round(totalMins / 60),
    damageCounts,
    statusCounts: { pending, approved, rejected },
  };
}
