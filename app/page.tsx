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
    <div className="grid min-h-[100dvh] place-items-center bg-background px-4">
      <div className="animate-fade-up w-full max-w-sm">
        {/* site title */}
        <div className="mb-7 flex items-center justify-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-sidebar">
            <Logo size={26} />
          </span>
          <span className="text-xl font-semibold tracking-tight text-foreground">
            Hydra
          </span>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-diffuse sm:p-7">
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            Sign in
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your details to open the console.
          </p>

          <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
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
        </div>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          Prototype — any email and password will sign you in.
        </p>
      </div>
    </div>
  );
}
