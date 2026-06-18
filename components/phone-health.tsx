import {
  BatteryFull,
  BatteryMedium,
  BatteryLow,
  BatteryWarning,
  CellSignalFull,
  CellSignalMedium,
  CellSignalLow,
  CellSignalNone,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

export function Battery({
  percent,
  className,
}: {
  percent: number;
  className?: string;
}) {
  const tone =
    percent <= 15
      ? "text-offline"
      : percent <= 35
        ? "text-idle"
        : "text-online";
  const Icon =
    percent <= 15
      ? BatteryWarning
      : percent <= 40
        ? BatteryLow
        : percent <= 70
          ? BatteryMedium
          : BatteryFull;
  return (
    <span className={cn("inline-flex items-center gap-1.5", tone, className)}>
      <Icon size={18} weight="bold" />
      <span className="tnum text-sm font-medium text-foreground/80">
        {percent}%
      </span>
    </span>
  );
}

export function Signal({
  bars,
  className,
}: {
  bars: number;
  className?: string;
}) {
  const Icon =
    bars >= 4
      ? CellSignalFull
      : bars >= 3
        ? CellSignalMedium
        : bars >= 1
          ? CellSignalLow
          : CellSignalNone;
  return (
    <Icon
      size={18}
      weight="bold"
      className={cn(bars === 0 ? "text-offline" : "text-foreground/70", className)}
    />
  );
}
