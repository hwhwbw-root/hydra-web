import { House, MapTrifold, FileText } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { computeReportKpis } from "@/lib/mock/reports";

export interface NavItem {
  label: string;
  href: string;
  icon: Icon;
  badge?: string;
}

const pending = computeReportKpis().pending;

export const NAV: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: House },
  { label: "Live Map", href: "/dashboard/map", icon: MapTrifold },
  {
    label: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
    badge: pending > 0 ? String(pending) : undefined,
  },
];
