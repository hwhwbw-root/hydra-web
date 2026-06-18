import {
  Wrench,
  RoadHorizon,
  ClipboardText,
  CircleNotch,
  CheckCircle,
  XCircle,
} from "@phosphor-icons/react/dist/ssr";
import type {
  DamageType,
  ReportCategory,
  ReportStatus,
} from "@/lib/mock/types";
import { cn } from "@/lib/utils";

const DAMAGE_COLOR: Record<DamageType, string> = {
  Electrical: "#d99318",
  Mechanical: "#5b6ee0",
  Structural: "#9d5bd2",
  Plumbing: "#2f8fd6",
  Civil: "#16a37a",
  Other: "#8a8594",
};

export function DamageChip({ type }: { type: DamageType }) {
  const color = DAMAGE_COLOR[type];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium"
      style={{ color, backgroundColor: `${color}16` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      {type}
    </span>
  );
}

const STATUS_META: Record<
  ReportStatus,
  { label: string; color: string; icon: React.ElementType }
> = {
  pending: { label: "Pending review", color: "#d99318", icon: CircleNotch },
  approved: { label: "Approved", color: "#16a37a", icon: CheckCircle },
  rejected: { label: "Rejected", color: "#e05a6b", icon: XCircle },
};

export function ReportStatusBadge({
  status,
  className,
}: {
  status: ReportStatus;
  className?: string;
}) {
  const m = STATUS_META[status];
  const Icon = m.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        className,
      )}
      style={{ color: m.color, backgroundColor: `${m.color}16` }}
    >
      <Icon size={13} weight="bold" />
      {m.label}
    </span>
  );
}

const CATEGORY_META: Record<
  ReportCategory,
  { label: string; icon: React.ElementType }
> = {
  maintenance: { label: "Maintenance", icon: Wrench },
  premix: { label: "Premix", icon: RoadHorizon },
  general: { label: "General", icon: ClipboardText },
};

export function CategoryIcon({
  category,
  size = 18,
}: {
  category: ReportCategory;
  size?: number;
}) {
  const Icon = CATEGORY_META[category].icon;
  return <Icon size={size} weight="bold" />;
}

export function categoryLabel(category: ReportCategory): string {
  return CATEGORY_META[category].label;
}
