"use client";

import { Suspense, useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { cn } from "@/lib/utils";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-[100dvh]">
      <Sidebar
        mobileOpen={mobileOpen}
        onNavigate={() => setMobileOpen(false)}
      />

      {/* mobile backdrop */}
      <button
        aria-hidden
        onClick={() => setMobileOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden",
          mobileOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0",
        )}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Suspense
          fallback={<div className="h-16 border-b border-border bg-background" />}
        >
          <Topbar onMenu={() => setMobileOpen(true)} />
        </Suspense>
        <main className="flex-1 px-4 py-6 md:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1400px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
