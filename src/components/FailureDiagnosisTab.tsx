"use client";

import React from "react";
import { AlertTriangle, CheckCircle, ShieldAlert, FileSearch, ArrowRight, HelpCircle } from "lucide-react";
import { ProgressEntry } from "@/data/initialData";

interface FailureProps {
  progressLogs: ProgressEntry[];
}

export default function FailureDiagnosisTab({ progressLogs }: FailureProps) {
  const needsHumanAlerts = progressLogs.filter((p) => p.type === "needs_human");

  return (
    <div className="space-y-6">
      {/* Concept 14 Introduction */}
      <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-5 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-rose-500/20 p-2 text-rose-400">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-rose-500/20 text-rose-300 uppercase tracking-wide">
              Concept 14: Unattended Loops & "Needs A Human" Notes
            </span>
            <h3 className="mt-1 text-base font-semibold text-white">
              The Spine Diagnosis Principle
            </h3>
            <p className="mt-1 text-xs text-slate-300 leading-relaxed">
              When an unattended autonomous loop breaks overnight, an engineer reading cold in the morning must NEVER
              have to guess what happened. The loop must leave an unambiguous, visible trace in the spine (e.g. <code className="text-rose-300 font-mono">progress.md</code>)
              stating exact reasons and timestamps.
            </p>
          </div>
        </div>
      </div>

      {/* The 3 Core Spine Diagnosis Questions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Q1 */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <HelpCircle className="h-4 w-4" />
            1. What Failed?
          </div>
          <p className="text-xs text-slate-300 font-mono leading-relaxed">
            The TODO file scan step in <span className="text-cyan-400">daily_digest_broken.sh</span>. The path was intentionally sabotaged to point to a non-existent directory:
            <br />
            <span className="text-red-400 mt-1 block break-all font-semibold">
              C:\Users\dell\Desktop\nonexistent\todos.txt
            </span>
          </p>
        </div>

        {/* Q2 */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <HelpCircle className="h-4 w-4" />
            2. When Did It Fail?
          </div>
          <p className="text-xs text-slate-300 font-mono leading-relaxed">
            Exact timestamp recorded in <span className="text-cyan-400">digest.log</span> and <span className="text-cyan-400">progress.md</span>:
            <br />
            <span className="text-emerald-400 mt-1 block font-semibold">
              Timestamp: 2026-08-23 02:30 UTC
            </span>
            Cold morning review pinpointed the exact beat execution cycle immediately.
          </p>
        </div>

        {/* Q3 */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <HelpCircle className="h-4 w-4" />
            3. Did You Have To Guess?
          </div>
          <p className="text-xs text-slate-300 font-mono leading-relaxed">
            <span className="text-emerald-400 font-semibold">NO GUESSING REQUIRED.</span>
            <br />
            The explicit signal:
            <span className="text-rose-300 block mt-1 font-semibold">
              "NEEDS HUMAN: TODO scan file not found"
            </span>
            was written directly into progress.md with an exit 1 status.
          </p>
        </div>
      </div>

      {/* Spine Progress History */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <FileSearch className="h-4 w-4 text-cyan-400" />
            progress.md (Spine Heartbeats & Needs-A-Human Events)
          </h4>
          <span className="text-xs text-slate-400 font-mono">{progressLogs.length} heartbeat records</span>
        </div>

        <div className="space-y-2">
          {progressLogs.map((entry) => (
            <div
              key={entry.id}
              className={`flex items-start gap-3 rounded-lg p-3 text-xs font-mono transition-all ${
                entry.type === "needs_human"
                  ? "border border-red-500/40 bg-red-950/30 text-red-200"
                  : "border border-slate-800/80 bg-slate-950/40 text-slate-300"
              }`}
            >
              {entry.type === "needs_human" ? (
                <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <span className="text-slate-500 mr-2">{entry.date} |</span>
                <span className={entry.type === "needs_human" ? "font-bold text-red-300" : "text-emerald-300"}>
                  {entry.message}
                </span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded font-sans uppercase font-medium ${
                  entry.type === "needs_human"
                    ? "bg-red-500/20 text-red-300"
                    : "bg-emerald-500/10 text-emerald-400"
                }`}
              >
                {entry.type === "needs_human" ? "NEEDS HUMAN" : "HEARTBEAT"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
