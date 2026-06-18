import { cn } from "@/lib/utils";

/** Hydra mark — three rising heads on a plum gradient tile. */
export function Logo({
  size = 34,
  className,
  withWordmark = false,
}: {
  size?: number;
  className?: string;
  withWordmark?: boolean;
}) {
  const mark = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <defs>
        <linearGradient id="hydra-g" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#8b75e0" />
          <stop offset="1" stopColor="#5b46b0" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#hydra-g)" />
      <path
        d="M9 22V13.5c0-1.4 1.6-2.2 2.7-1.3L13 13.3V11c0-1.5 1.8-2.3 2.9-1.2L17 11V12.6l1.4-1.1c1.1-.9 2.7-.1 2.7 1.3V22"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      />
      <circle cx="11" cy="22.5" r="1.1" fill="white" />
      <circle cx="16" cy="22.5" r="1.1" fill="white" />
      <circle cx="21" cy="22.5" r="1.1" fill="white" />
    </svg>
  );

  if (!withWordmark) return mark;

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {mark}
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-tight text-white">
          Hydra
        </span>
        <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-sidebar-muted">
          Console
        </span>
      </span>
    </span>
  );
}
