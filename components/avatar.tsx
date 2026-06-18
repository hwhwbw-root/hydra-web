import { cn, initials } from "@/lib/utils";

/** Initials avatar on a team-tinted gradient (no generic photo placeholders). */
export function Avatar({
  name,
  accent,
  size = 40,
  className,
}: {
  name: string;
  accent: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white select-none",
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: `radial-gradient(120% 120% at 30% 20%, ${accent}, ${accent}cc 55%, ${accent}99)`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.25), 0 2px 8px -3px ${accent}80`,
      }}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}
