"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Info } from "@phosphor-icons/react";
import type { ReportStatus } from "@/lib/mock/types";
import { ReportStatusBadge } from "@/components/report-badges";

export function ReportReviewPanel({
  initialStatus,
  initialNote = "",
}: {
  initialStatus: ReportStatus;
  initialNote?: string;
}) {
  const [status, setStatus] = useState<ReportStatus>(initialStatus);
  const [note, setNote] = useState(initialNote);
  const [savedAs, setSavedAs] = useState<ReportStatus | null>(null);

  function decide(next: Exclude<ReportStatus, "pending">) {
    setStatus(next);
    setSavedAs(next);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          Review
        </h2>
        <ReportStatusBadge status={status} />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="reviewer-note"
          className="text-sm font-medium text-foreground"
        >
          Reviewer note
        </label>
        <textarea
          id="reviewer-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="Add a note for the worker (optional)…"
          className="resize-none rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/15"
        />
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={() => decide("approved")}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-online text-sm font-semibold text-white shadow-diffuse transition-all hover:brightness-105 active:scale-[0.98]"
        >
          <CheckCircle size={18} weight="bold" /> Approve
        </button>
        <button
          onClick={() => decide("rejected")}
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card text-sm font-semibold text-[#e05a6b] transition-all hover:bg-[#e05a6b]/8 active:scale-[0.98]"
        >
          <XCircle size={18} weight="bold" /> Reject
        </button>
      </div>

      {savedAs && (
        <p className="flex items-start gap-2 rounded-xl border border-dashed border-border bg-primary-softer px-3.5 py-2.5 text-xs text-muted-foreground">
          <Info size={15} className="mt-px shrink-0 text-primary" />
          <span>
            Marked <span className="font-semibold text-foreground">{savedAs}</span>{" "}
            in this session. Decisions will persist once the backend is wired.
          </span>
        </p>
      )}
    </div>
  );
}
