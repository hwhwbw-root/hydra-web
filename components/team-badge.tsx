import { cn } from "@/lib/utils";
import type { Team } from "@/lib/mock/types";

export function TeamBadge({
  team,
  className,
}: {
  team: Team;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        className,
      )}
      style={{
        color: team.accent,
        backgroundColor: `${team.accent}14`,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: team.accent }}
      />
      {team.name}
    </span>
  );
}
