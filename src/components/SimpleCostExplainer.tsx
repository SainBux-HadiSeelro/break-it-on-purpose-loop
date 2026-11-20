"use client";

import React, { useState } from "react";
import { Coins, HelpCircle, Check, Sparkles, TrendingDown, DollarSign } from "lucide-react";

export default function SimpleCostExplainer() {
  const [runsPerDay, setRunsPerDay] = useState(1);

  // Calculation: ~25 tokens per run * 30 days
  const tokensPerRun = 25;
  const monthlyRuns = runsPerDay * 30;
  const monthlyTokens = monthlyRuns * tokensPerRun;

  // Pricing based on Gemini Flash ($0.30 per 1M output tokens)
  const monthlyCostUSD = (monthlyTokens / 1_000_000) * 0.30;

  return (
    <div className="space-y-6">
      {/* Friendly Explanation Card */}
      <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 to-cyan-950/20 p-6 backdrop-blur-md">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-300 shrink-0">
            <Coins className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
                Concept 13 Explained Simply
              </span>
              <span className="text-xs text-slate-400">Zero Technical Jargon</span>
            </div>
            <h3 className="mt-2 text-lg font-bold text-white">How Much Money Does This AI Spend?</h3>
            <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
              Every time an AI reads or writes words, AI providers (like OpenAI or Google) charge for &ldquo;tokens&rdquo; (1 token is roughly 4 characters or 1 word).
              In production, an unmonitored AI can run in an infinite loop and cause huge bills. 
              Our agent implements <strong>Cost Observability</strong>: it weighs every word it processes and logs it automatically.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <span className="text-xs font-medium text-slate-400">Cost per Daily Run</span>
          <div className="mt-2 text-2xl font-bold text-white font-mono">~25 tokens</div>
          <p className="mt-1 text-xs text-emerald-400 flex items-center gap-1">
            <TrendingDown className="h-3.5 w-3.5" /> Ultra-lightweight payload
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <span className="text-xs font-medium text-slate-400">Monthly Usage (30 Runs)</span>
          <div className="mt-2 text-2xl font-bold text-cyan-300 font-mono">~{monthlyTokens.toLocaleString()} tokens</div>
          <p className="mt-1 text-xs text-slate-400">
            Equivalent to reading ~2 pages of text
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <span className="text-xs font-medium text-slate-400">Estimated Total Monthly Bill</span>
          <div className="mt-2 text-2xl font-bold text-emerald-400 font-mono">
            {monthlyCostUSD < 0.001 ? "< $0.001" : `$${monthlyCostUSD.toFixed(4)}`}
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Practically free on modern AI models
          </p>
        </div>
      </div>

      {/* Interactive Bill Estimator for Non-Tech Users */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <h4 className="text-base font-bold text-white flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-emerald-400" />
          Interactive Cost Slider: What if the AI runs more often?
        </h4>
        <p className="mt-1 text-xs text-slate-300">
          Slide to see what happens to the monthly budget if you increase how often the AI agent wakes up:
        </p>

        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-300 font-medium">Agent Run Frequency:</span>
            <span className="text-sm font-bold text-cyan-400 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 font-mono">
              {runsPerDay === 1 ? "Once Daily (1 run/day)" : runsPerDay === 24 ? "Every Hour (24 runs/day)" : `${runsPerDay} times every day`}
            </span>
          </div>

          <input
            type="range"
            min="1"
            max="24"
            value={runsPerDay}
            onChange={(e) => setRunsPerDay(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
          />

          <div className="flex justify-between text-[11px] text-slate-500">
            <span>1x Daily (Current setup)</span>
            <span>6x Daily</span>
            <span>12x Daily</span>
            <span>24x (Hourly)</span>
          </div>

          {/* Result summary banner */}
          <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs text-slate-400">At {runsPerDay} runs per day ({monthlyRuns} runs/month):</div>
              <div className="text-sm text-slate-200 font-medium mt-0.5">
                Total consumption is only <span className="text-cyan-400 font-bold font-mono">~{monthlyTokens.toLocaleString()} tokens</span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-xs text-slate-400">Estimated Cost:</div>
              <div className="text-lg font-bold text-emerald-400 font-mono">
                {monthlyCostUSD < 0.01 ? "Less than 1 cent ($0.01)" : `$${monthlyCostUSD.toFixed(3)} USD`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
