"use client";

import React, { useState } from "react";
import { Coins, Calculator, FileText, Check, ArrowRight } from "lucide-react";
import { CostEntry } from "@/data/initialData";

interface CostTabProps {
  costLogs: CostEntry[];
}

const AI_MODELS = [
  { name: "Gemini 1.5 Flash", inputPerM: 0.075, outputPerM: 0.30 },
  { name: "Gemini 1.5 Pro", inputPerM: 1.25, outputPerM: 5.00 },
  { name: "GPT-4o", inputPerM: 2.50, outputPerM: 10.00 },
  { name: "Claude 3.5 Sonnet", inputPerM: 3.00, outputPerM: 15.00 },
  { name: "Llama 3.3 70B (Groq)", inputPerM: 0.59, outputPerM: 0.79 },
];

export default function CostObservabilityTab({ costLogs }: CostTabProps) {
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0]);
  const [beatsPerDay, setBeatsPerDay] = useState(1);
  const [customWrittenTokens, setCustomWrittenTokens] = useState(25);
  const [customReadTokens, setCustomReadTokens] = useState(150);

  // Calculations
  const beatsPerMonth = beatsPerDay * 30;
  const monthlyReadTokens = customReadTokens * beatsPerMonth;
  const monthlyWrittenTokens = customWrittenTokens * beatsPerMonth;
  const totalMonthlyTokens = monthlyReadTokens + monthlyWrittenTokens;

  const monthlyInputCost = (monthlyReadTokens / 1_000_000) * selectedModel.inputPerM;
  const monthlyOutputCost = (monthlyWrittenTokens / 1_000_000) * selectedModel.outputPerM;
  const totalMonthlyCost = monthlyInputCost + monthlyOutputCost;

  return (
    <div className="space-y-6">
      {/* Concept 13 Banner */}
      <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-5 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-cyan-500/20 p-2 text-cyan-400">
            <Coins className="h-6 w-6" />
          </div>
          <div>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-cyan-500/20 text-cyan-300 uppercase tracking-wide">
              Concept 13: Cost Observability
            </span>
            <h3 className="mt-1 text-base font-semibold text-white">Append-Only Token Logging (cost_log.md)</h3>
            <p className="mt-1 text-xs text-slate-300 leading-relaxed">
              Every beat of an autonomous loop must measure and log its token consumption. The token heuristic
              counts input and output characters and divides by ~4, producing an append-only audit trail that is never overwritten.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Log Table & Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cost Log Table */}
        <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <FileText className="h-4 w-4 text-cyan-400" />
              cost_log.md (Live Records)
            </h4>
            <span className="text-xs text-slate-400 font-mono">{costLogs.length} entries recorded</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 bg-slate-800/40 text-slate-400">
                <tr>
                  <th className="py-2.5 px-3">Run Timestamp</th>
                  <th className="py-2.5 px-3">Tokens Read</th>
                  <th className="py-2.5 px-3">Tokens Written</th>
                  <th className="py-2.5 px-3">Beat Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {costLogs.map((entry) => (
                  <tr key={entry.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-cyan-300">{entry.run}</td>
                    <td className="py-2.5 px-3 text-slate-300">~{entry.tokensRead}</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-semibold">~{entry.tokensWritten}</td>
                    <td className="py-2.5 px-3 text-slate-300 max-w-[200px] truncate">{entry.beatNote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive Cost Calculator */}
        <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
            <Calculator className="h-4 w-4 text-indigo-400" />
            Monthly Cost Projection Engine
          </h4>

          <div className="space-y-4 text-xs">
            {/* Model select */}
            <div>
              <label className="block text-slate-400 font-medium mb-1">Target AI Model</label>
              <select
                value={selectedModel.name}
                onChange={(e) => {
                  const m = AI_MODELS.find((mod) => mod.name === e.target.value);
                  if (m) setSelectedModel(m);
                }}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 outline-none focus:border-cyan-500"
              >
                {AI_MODELS.map((m) => (
                  <option key={m.name} value={m.name}>
                    {m.name} (${m.inputPerM}/M in, ${m.outputPerM}/M out)
                  </option>
                ))}
              </select>
            </div>

            {/* Cadence slider */}
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Beat Cadence:</span>
                <span className="text-cyan-400 font-semibold font-mono">{beatsPerDay} beat(s) / day</span>
              </div>
              <input
                type="range"
                min="1"
                max="24"
                value={beatsPerDay}
                onChange={(e) => setBeatsPerDay(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                <span>1x Daily</span>
                <span>12x/day</span>
                <span>Hourly (24x)</span>
              </div>
            </div>

            {/* Tokens per beat */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Read Tok / Beat</label>
                <input
                  type="number"
                  value={customReadTokens}
                  onChange={(e) => setCustomReadTokens(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-slate-100 font-mono outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Written Tok / Beat</label>
                <input
                  type="number"
                  value={customWrittenTokens}
                  onChange={(e) => setCustomWrittenTokens(Math.max(1, Number(e.target.value)))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-slate-100 font-mono outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Projection Summary Box */}
            <div className="mt-4 rounded-lg bg-slate-950/70 border border-slate-800/80 p-3.5 space-y-2 font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Beats per Month:</span>
                <span className="text-white font-bold">{beatsPerMonth}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Monthly Tokens:</span>
                <span className="text-cyan-300 font-bold">~{totalMonthlyTokens.toLocaleString()}</span>
              </div>
              <div className="border-t border-slate-800 pt-2 flex justify-between items-baseline">
                <span className="text-slate-300 font-sans font-semibold">Estimated Billing:</span>
                <span className="text-emerald-400 text-base font-bold">
                  ${totalMonthlyCost < 0.01 ? "< $0.01" : `$${totalMonthlyCost.toFixed(4)}`} / mo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
