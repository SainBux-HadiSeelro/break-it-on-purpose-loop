"use client";

import React, { useState } from "react";
import { Play, Flame, Terminal, Check, AlertCircle, RefreshCw } from "lucide-react";
import { CostEntry, ProgressEntry } from "@/data/initialData";

interface SimulatorProps {
  todos: string[];
  onAddCostLog: (entry: CostEntry) => void;
  onAddProgressLog: (entry: ProgressEntry) => void;
  onReset: () => void;
}

export default function LoopSimulator({
  todos,
  onAddCostLog,
  onAddProgressLog,
  onReset,
}: SimulatorProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [activeMode, setActiveMode] = useState<"normal" | "broken" | null>(null);
  const [consoleLines, setConsoleLines] = useState<string[]>([
    "System ready. Daily Digest cron daemon initialized.",
    "Concept 13: Cost Observability active.",
    "Concept 14: Unattended failure detection & needs-a-human note active.",
  ]);

  const runBeat = async (mode: "normal" | "broken") => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveMode(mode);

    const now = new Date();
    const timestampStr = now.toISOString().replace("T", " ").substring(0, 19);
    const dateStr = now.toISOString().substring(0, 10);

    const appendConsole = (line: string) => {
      setConsoleLines((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${line}`]);
    };

    if (mode === "normal") {
      appendConsole(">>> Executing: ./daily_digest.sh");
      await new Promise((r) => setTimeout(r, 600));

      appendConsole(`[SCAN] Scanning TODO file: ./todos.txt (Found ${todos.length} items)`);
      await new Promise((r) => setTimeout(r, 700));

      const writtenTokens = Math.round(25 + Math.random() * 5);
      const readTokens = Math.round(todos.join("").length / 4);

      appendConsole(`[COST] Counting tokens: read ~${readTokens}, written ~${writtenTokens}`);
      await new Promise((r) => setTimeout(r, 600));

      appendConsole(`[APPEND] Writing cost record to cost_log.md (Beat Note: ${todos.length} TODOs processed)`);
      appendConsole(`[SPINE] Writing heartbeat to progress.md: "${dateStr} | digest running"`);
      await new Promise((r) => setTimeout(r, 500));

      appendConsole(">>> Daily digest beat finished with exit code 0 [OK]");

      onAddCostLog({
        id: `cost-${Date.now()}`,
        run: timestampStr,
        tokensRead: readTokens,
        tokensWritten: writtenTokens,
        beatNote: `${todos.length} TODOs processed in daily run`,
        status: "success",
      });

      onAddProgressLog({
        id: `prog-${Date.now()}`,
        date: dateStr,
        type: "running",
        message: "digest running (normal beat completed)",
        raw: `${dateStr} | digest running`,
      });
    } else {
      appendConsole(">>> Executing: ./daily_digest_broken.sh [Sabotage Mode]");
      await new Promise((r) => setTimeout(r, 600));

      appendConsole("[CONFIG] Sabotaged TODO_FILE set to: C:\\Users\\dell\\Desktop\\nonexistent\\todos.txt");
      await new Promise((r) => setTimeout(r, 700));

      appendConsole("[FAIL] Test-Path check returned false! Directory/File does not exist.");
      await new Promise((r) => setTimeout(r, 700));

      const humanSignal = `NEEDS HUMAN: TODO scan file not found: C:\\Users\\dell\\Desktop\\nonexistent\\todos.txt, at ${dateStr}`;
      appendConsole(`[ALERT] Concept 14 triggered! Writing to progress.md: "${humanSignal}"`);
      appendConsole(`[LOG] Appending failure trace to digest.log: "Failure: TODO scan file not found"`);
      await new Promise((r) => setTimeout(r, 500));

      appendConsole(">>> Loop halted safely with exit code 1. Human alerted via spine.");

      onAddProgressLog({
        id: `prog-${Date.now()}`,
        date: dateStr,
        type: "needs_human",
        message: humanSignal,
        raw: `${dateStr} | ${humanSignal}`,
      });
    }

    setIsRunning(false);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Terminal className="h-5 w-5 text-cyan-400" />
            Interactive Beat Execution Simulator
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Test healthy loop runs or deliberately trigger sabotage failure to verify the Concept 14 Spine.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => runBeat("normal")}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium text-xs shadow-md transition-all active:scale-95"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            {isRunning && activeMode === "normal" ? "Executing..." : "Run Normal Beat"}
          </button>

          <button
            onClick={() => runBeat("broken")}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-medium text-xs shadow-md transition-all active:scale-95"
          >
            <Flame className="h-3.5 w-3.5" />
            {isRunning && activeMode === "broken" ? "Sabotaging..." : "Break It On Purpose"}
          </button>

          <button
            onClick={onReset}
            disabled={isRunning}
            title="Reset to default seed data"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset State
          </button>
        </div>
      </div>

      {/* Terminal View */}
      <div className="mt-5 rounded-lg border border-slate-800 bg-black/75 p-4 font-mono text-xs shadow-inner">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block"></span>
            <span className="text-[11px] text-slate-400 ml-2">bash terminal emulator & live spine tracer</span>
          </div>
          {isRunning && (
            <span className="flex items-center gap-1.5 text-cyan-400 animate-pulse text-[11px]">
              <span className="h-2 w-2 rounded-full bg-cyan-400"></span> Executing beat...
            </span>
          )}
        </div>

        <div className="h-44 overflow-y-auto space-y-1.5 pr-2">
          {consoleLines.map((line, idx) => (
            <div
              key={idx}
              className={`leading-relaxed ${
                line.includes("[FAIL]") || line.includes("NEEDS HUMAN") || line.includes("Sabotaging")
                  ? "text-red-400 font-bold"
                  : line.includes("[OK]") || line.includes("Found") || line.includes("[SCAN]")
                  ? "text-emerald-400"
                  : line.includes(">>>")
                  ? "text-cyan-300 font-semibold"
                  : "text-slate-300"
              }`}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
