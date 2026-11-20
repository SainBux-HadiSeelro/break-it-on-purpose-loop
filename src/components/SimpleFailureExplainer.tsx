"use client";

import React from "react";
import { ShieldAlert, AlertTriangle, CheckCircle, HelpCircle, ArrowRight, UserCheck } from "lucide-react";
import { ProgressEntry } from "@/data/initialData";

interface SimpleFailureProps {
  progressLogs: ProgressEntry[];
}

export default function SimpleFailureExplainer({ progressLogs }: SimpleFailureProps) {
  const needsHumanEntries = progressLogs.filter((p) => p.type === "needs_human");

  return (
    <div className="space-y-6">
      {/* Intro Card */}
      <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-br from-slate-900 to-rose-950/20 p-6 backdrop-blur-md">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-rose-500/20 text-rose-300 shrink-0">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300">
                Concept 14 Explained Simply
              </span>
              <span className="text-xs text-slate-400">Human-In-The-Loop Safety</span>
            </div>
            <h3 className="mt-2 text-lg font-bold text-white">Why Did We Break The AI On Purpose?</h3>
            <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
              When bad AI scripts crash overnight, they usually fail silently. When the engineer wakes up in the morning,
              they have to spend hours guessing what broke.
              <br className="my-1" />
              In <strong>Loop Engineering</strong>, we purposely sabotage the AI by giving it a fake directory path
              (<code className="text-rose-300 font-mono">C:\Users\dell\Desktop\nonexistent\todos.txt</code>) to verify that it writes an unmistakable 
              <strong> &ldquo;NEEDS HUMAN&rdquo;</strong> note in its spine file.
            </p>
          </div>
        </div>
      </div>

      {/* The 3 Cold Morning Rules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="h-4 w-4" />
            1. What Broke?
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The task scanner could not find the file because the path was intentionally set to a missing folder.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="h-4 w-4" />
            2. When Did It Break?
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The exact timestamp is stamped in the logs immediately, so nobody has to check server timestamps.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <UserCheck className="h-4 w-4" />
            3. Did Anyone Have To Guess?
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong>Zero guessing!</strong> The note explicitly shouted &ldquo;NEEDS HUMAN: File not found&rdquo; with exit code 1.
          </p>
        </div>
      </div>

      {/* Heartbeat Records */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            Heartbeat History (progress.md)
          </h4>
          <span className="text-xs text-slate-400 font-mono">{progressLogs.length} entries</span>
        </div>

        <div className="space-y-2">
          {progressLogs.map((p) => (
            <div
              key={p.id}
              className={`p-3.5 rounded-xl border text-xs font-mono flex items-center justify-between gap-3 ${
                p.type === "needs_human"
                  ? "border-red-500/40 bg-red-950/30 text-red-200"
                  : "border-slate-800 bg-slate-950 text-slate-300"
              }`}
            >
              <div className="flex items-center gap-2">
                {p.type === "needs_human" ? (
                  <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                )}
                <span>{p.message}</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-semibold uppercase ${
                p.type === "needs_human" ? "bg-red-500/20 text-red-300" : "bg-emerald-500/10 text-emerald-300"
              }`}>
                {p.type === "needs_human" ? "Action Required" : "Heartbeat OK"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
