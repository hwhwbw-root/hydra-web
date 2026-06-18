"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOut, CaretRight } from "@phosphor-icons/react";
import { NAV } from "@/components/nav-config";
import { TEAMS } from "@/lib/mock/teams";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname.startsWith(href);
}

export function Sidebar({
  mobileOpen,
  onNavigate,
}: {
  mobileOpen: boolean;
  onNavigate: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-[264px] flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-out lg:static lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex h-16 items-center px-5">
        <Link href="/dashboard" onClick={onNavigate}>
          <Logo withWordmark />
        </Link>
      </div>

      <nav className="mt-2 flex flex-col gap-1 px-3">
        {NAV.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/75 hover:bg-white/[0.04] hover:text-sidebar-foreground",
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
              )}
              <Icon size={19} weight={active ? "fill" : "regular"} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="tnum rounded-full bg-primary/20 px-2 py-0.5 text-[11px] font-semibold text-sidebar-accent-foreground">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-7 px-5">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-sidebar-muted">
          Teams
        </p>
        <div className="flex flex-col gap-0.5">
          {TEAMS.map((team) => (
            <Link
              key={team.id}
              href={`/dashboard/map?team=${team.id}`}
              onClick={onNavigate}
              className="group flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-sidebar-foreground/70 transition-colors hover:bg-white/[0.04] hover:text-sidebar-foreground"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: team.accent }}
              />
              <span className="flex-1">{team.name}</span>
              <CaretRight
                size={13}
                className="opacity-0 transition-opacity group-hover:opacity-60"
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-auto p-3">
        <div className="flex items-center gap-3 rounded-xl bg-white/[0.04] p-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#8b75e0] to-[#5b46b0] text-sm font-semibold text-white">
            SA
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              Sarah Aziz
            </p>
            <p className="truncate text-xs text-sidebar-muted">Administrator</p>
          </div>
          <Link
            href="/"
            onClick={onNavigate}
            aria-label="Sign out"
            className="grid h-8 w-8 place-items-center rounded-lg text-sidebar-muted transition-colors hover:bg-white/[0.06] hover:text-sidebar-foreground"
          >
            <SignOut size={17} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
