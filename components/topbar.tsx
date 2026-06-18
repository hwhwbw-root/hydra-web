"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  List,
  MagnifyingGlass,
  Bell,
  CaretDown,
  Check,
  Users,
} from "@phosphor-icons/react";
import { TEAMS } from "@/lib/mock/teams";
import { cn } from "@/lib/utils";

function titleFor(pathname: string): string {
  if (pathname === "/dashboard") return "Overview";
  if (pathname.startsWith("/dashboard/map")) return "Live Map";
  if (pathname.startsWith("/dashboard/reports")) return "Reports";
  if (pathname.startsWith("/dashboard/workers")) return "Worker Detail";
  return "Dashboard";
}

function TeamFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);
  const current = params.get("team");
  const active = TEAMS.find((t) => t.id === current);

  function select(teamId: string | null) {
    const next = new URLSearchParams(params.toString());
    if (teamId) next.set("team", teamId);
    else next.delete("team");
    const qs = next.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ""}`);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted active:translate-y-px"
      >
        {active ? (
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: active.accent }}
          />
        ) : (
          <Users size={16} className="text-muted-foreground" />
        )}
        <span>{active ? `${active.name} team` : "All teams"}</span>
        <CaretDown
          size={13}
          className={cn(
            "text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <>
          <button
            className="fixed inset-0 z-40 cursor-default"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl border border-border bg-card p-1 shadow-diffuse-lg">
            <button
              onClick={() => select(null)}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
            >
              <Users size={16} className="text-muted-foreground" />
              <span className="flex-1 text-left">All teams</span>
              {!current && <Check size={15} className="text-primary" />}
            </button>
            <div className="my-1 h-px bg-border" />
            {TEAMS.map((team) => (
              <button
                key={team.id}
                onClick={() => select(team.id)}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: team.accent }}
                />
                <span className="flex-1 text-left">{team.name}</span>
                {current === team.id && (
                  <Check size={15} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
      <button
        onClick={onMenu}
        aria-label="Open menu"
        className="grid h-9 w-9 place-items-center rounded-lg text-foreground transition-colors hover:bg-muted lg:hidden"
      >
        <List size={20} />
      </button>

      <h1 className="text-base font-semibold tracking-tight text-foreground">
        {titleFor(pathname)}
      </h1>

      <div className="ml-auto flex items-center gap-2">
        <label className="hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm text-muted-foreground sm:flex">
          <MagnifyingGlass size={16} />
          <input
            placeholder="Search workers…"
            className="w-36 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
          />
        </label>

        <TeamFilter />

        <button
          aria-label="Notifications"
          className="relative grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-muted active:translate-y-px"
        >
          <Bell size={18} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary ring-2 ring-card" />
        </button>
      </div>
    </header>
  );
}
