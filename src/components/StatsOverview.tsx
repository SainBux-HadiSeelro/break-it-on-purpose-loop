"use client";

import React from "react";
import { Activity, AlertTriangle, CheckCircle2, Coins, Clock, ArrowUpRight } from "lucide-react";
import { CostEntry, ProgressEntry } from "@/data/initialData";

interface StatsProps {
  costLogs: CostEntry[];
  progressLogs: ProgressEntry[];
  hasNeedsHumanAlert: boolean;
}

export default function StatsOverview({ costLogs, progressLogs, hasNeedsHumanAlert }: StatsProps) {
  const totalTokens = costLogs.reduce((acc, curr) => acc + curr.tokensRead + curr.tokensWritten, 0);
  const totalRuns = costLogs.length;
  const failureCount = progressLogs.filter((p) => p.type === "needs_human").length;
  const successRate = totalRuns > 0 ? Math.round(((totalRuns) / (totalRuns + failureCount)) * 100) : 100;
  
  // Monthly estimate assuming 30 beats/month based on average written tokens
  const avgTokensPerBeat = totalRuns > 0 ? totalTokens / totalRuns : 25;
  const monthlyProjectedTokens = Math.round(avgTokensPerBeat * 30);

  return (
    <div className="space-y-4">
      {hasNeedsHumanAlert && (
        <div className="relative overflow-hidden rounded-xl border border-red-500/50 bg-red-950/40 p-4 shadow-lg backdrop-blur-md glow-danger">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-red-500/20 p-2 text-red-400">
              <AlertTriangle className="h-6 w-6 animate-bounce" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-500/30 text-red-200 uppercase tracking-wide">
                  Concept 14 Alert
                </span>
                <h3 className="font-semibold text-red-200">NEEDS HUMAN Signal Detected</h3>
              </div>
              <p className="mt-1 text-sm text-red-300/90 font-mono">
                TODO scan file not found: C:\Users\dell\Desktop\nonexistent\todos.txt (Sabotage test triggered)
              </p>
              <p className="mt-1 text-xs text-red-400/80">
                The autonomous loop safely halted and left an unambiguous spine trace for human intervention.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* System Health */}
        <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm transition-all hover:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Loop Status</span>
            {hasNeedsHumanAlert ? (
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
            ) : (
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            )}
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-2xl font-bold tracking-tight ${hasNeedsHumanAlert ? "text-red-400" : "text-emerald-400"}`}>
              {hasNeedsHumanAlert ? "NEEDS HUMAN" : "HEALTHY"}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
            <Clock className="h-3.5 w-3.5 text-slate-500" />
            <span>Cadence: 1 beat/day (cron @ 02:30 UTC)</span>
          </div>
        </div>

        {/* Tokens Observability */}
        <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm transition-all hover:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Total Tokens (est.)</span>
            <Coins className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-white font-mono">
              ~{totalTokens.toFixed(1)}
            </span>
            <span className="text-xs text-cyan-400 font-medium">tokens</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>Heuristic: chars / 4</span>
            <span className="text-slate-500 font-mono">~{(avgTokensPerBeat).toFixed(1)} t/beat</span>
          </div>
        </div>

        {/* Monthly Projection */}
        <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm transition-all hover:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Monthly Projection</span>
            <ArrowUpRight className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-indigo-300 font-mono">
              ~{monthlyProjectedTokens}
            </span>
            <span className="text-xs text-slate-400">tok/mo</span>
          </div>
          <div className="mt-2 text-xs text-slate-400">
            30 beats × ~{avgTokensPerBeat.toFixed(0)} tokens/beat
          </div>
        </div>

        {/* Success Rate */}
        <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm transition-all hover:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Spine Reliability</span>
            <Activity className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-white">
              {successRate}%
            </span>
            <span className="text-xs text-slate-400">({totalRuns} runs, {failureCount} alerts)</span>
          </div>
          <div className="mt-2 text-xs text-emerald-400/90 flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Spine trace recorded on every beat</span>
          </div>
        </div>
      </div>
    </div>
  );
}
