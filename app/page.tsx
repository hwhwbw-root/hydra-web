"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CircleNotch } from "@phosphor-icons/react";
import { Logo } from "@/components/logo";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("sarah.aziz@hydra.io");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    // mock auth — any credentials are accepted
    setTimeout(() => router.push("/dashboard"), 550);
  }

  return (
    <div className="grid min-h-[100dvh] lg:grid-cols-[1.05fr_1fr]">
      {/* Brand panel — purple gradient + title only, no intro copy */}
      <div
        className="relative hidden flex-col items-center justify-center overflow-hidden p-12 lg:flex"
        style={{
          background:
            "radial-gradient(120% 90% at 15% 10%, #2a2140 0%, #18141f 45%, #120f18 100%)",
        }}
      >
        <div
          className="animate-drift pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(40% 40% at 80% 25%, rgba(124,100,222,0.28), transparent 70%), radial-gradient(35% 35% at 20% 85%, rgba(91,110,224,0.22), transparent 70%)",
          }}
        />
        <div className="relative flex flex-col items-center gap-5 text-center">
          <Logo size={64} />
          <div>
            <p className="text-3xl font-semibold tracking-tight text-white">
              Hydra
            </p>
            <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.2em] text-sidebar-muted">
              Console
            </p>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center px-5 py-12 sm:px-10">
        <div className="animate-fade-up w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <span className="inline-flex rounded-2xl bg-sidebar p-2">
              <Logo size={32} />
            </span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Sign in to Hydra
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Welcome back. Enter your details to open the console.
          </p>

          <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Work email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-xl border border-input bg-card px-3.5 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/15"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <span className="text-xs font-medium text-primary">Forgot?</span>
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 rounded-xl border border-input bg-card px-3.5 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/15"
              />
            </div>

            <button
              type="submit"
              disabled={busy}
              className="mt-2 flex h-11 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-diffuse transition-all hover:bg-primary/92 active:scale-[0.98] disabled:opacity-80"
            >
              {busy ? (
                <CircleNotch size={18} className="animate-spin" />
              ) : (
                <>
                  Open console
                  <ArrowRight size={17} weight="bold" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Prototype — any email and password will sign you in.
          </p>
        </div>
      </div>
    </div>
  );
}
