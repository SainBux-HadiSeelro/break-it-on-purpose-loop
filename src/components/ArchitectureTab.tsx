"use client";

import React, { useState } from "react";
import { Code2, GitFork, Copy, Check, BookOpen, CheckCircle2, ShieldCheck, FileText, Cpu } from "lucide-react";
import { RAW_DOCS } from "@/data/initialData";

const SCRIPT_SH = `#!/usr/bin/env bash
# daily_digest.sh - Concept 13 Cost Observability & Concept 14 Spine Logging

BASE_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"
TODO_FILE="\${BASE_DIR}/todos.txt"
COST_LOG="\${BASE_DIR}/cost_log.md"
PROGRESS="\${BASE_DIR}/progress.md"
DIGEST_LOG="\${BASE_DIR}/digest.log"

DATE=$(date +"%Y-%m-%d")
TIME=$(date +"%Y-%m-%d %H:%M:%S")

if [ ! -f "$TODO_FILE" ]; then
  echo "\${DATE} | NEEDS HUMAN: TODO scan file not found: \${TODO_FILE}, at \${DATE}" >> "$PROGRESS"
  echo "\${DATE} | Failure: TODO scan file not found: \${TODO_FILE}" >> "$DIGEST_LOG"
  exit 1
fi

COUNT=$(grep -c "^TODO:" "$TODO_FILE" 2>/dev/null || echo 0)

# Concept 13: Character-based token heuristic (chars / ~4)
READ_CHARS=$(wc -c < "$TODO_FILE" | tr -d ' ')
READ_TOKENS=$(( READ_CHARS / 4 ))
WRITTEN_TOKENS=25

# Append to cost_log.md (append-only)
cat <<EOF >> "$COST_LOG"
- **Run**: \${TIME}
- **Tokens read (est.)**: ~\${READ_TOKENS}
- **Tokens written (est.)**: ~\${WRITTEN_TOKENS}
- **Beat note**: \${COUNT} new TODOs found

EOF

echo "\${DATE} | digest running" >> "$PROGRESS"
exit 0`;

const SCRIPT_BROKEN = `#!/usr/bin/env bash
# daily_digest_broken.sh - Sabotaged copy for failure testing (Concept 14)

BASE_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"
# SABOTAGE: Set non-existent path
TODO_FILE="C:\\Users\\dell\\Desktop\\nonexistent\\todos.txt"
PROGRESS="\${BASE_DIR}/progress.md"
DIGEST_LOG="\${BASE_DIR}/digest.log"

DATE=$(date +"%Y-%m-%d")

if [ ! -f "$TODO_FILE" ]; then
  # Emits unambiguous 'needs a human' note into the spine
  echo "\${DATE} | NEEDS HUMAN: TODO scan file not found: \${TODO_FILE}, at \${DATE}" >> "$PROGRESS"
  echo "\${DATE} | Failure: TODO scan file not found: \${TODO_FILE}" >> "$DIGEST_LOG"
  exit 1
fi`;

export default function ArchitectureTab() {
  const [activeDoc, setActiveDoc] = useState<"spec" | "script" | "broken" | "estimate" | "diagnosis" | "failure">("spec");
  const [copied, setCopied] = useState(false);

  const getDocContent = () => {
    switch (activeDoc) {
      case "spec":
        return RAW_DOCS.systemSpec;
      case "script":
        return SCRIPT_SH;
      case "broken":
        return SCRIPT_BROKEN;
      case "estimate":
        return RAW_DOCS.costEstimate;
      case "diagnosis":
        return RAW_DOCS.diagnosis;
      case "failure":
        return RAW_DOCS.failureTest;
      default:
        return "";
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getDocContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Formal System Specifications Matrix */}
      <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/80 p-6 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
                Formal System Specifications
              </span>
              <span className="text-xs text-slate-400">RFC / Architecture Contract</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">Autonomous Loop Core Invariants</h3>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            <span>4 of 4 Invariants Active</span>
          </div>
        </div>

        {/* 4 Invariant Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="rounded-xl border border-slate-800/80 bg-slate-950/50 p-4">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1.5">
              <Cpu className="h-4 w-4" />
              SPEC-13: Token Cost Observability
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every beat MUST compute characters divided by ~4 and append to <code className="text-cyan-300 font-mono">cost_log.md</code>.
              File is strictly append-only; truncation or rewriting is prohibited.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-950/50 p-4">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1.5">
              <ShieldCheck className="h-4 w-4" />
              SPEC-14: Unattended Failure Protocol
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Unattended loops MUST NEVER fail silently. On blocking errors, write <code className="text-rose-300 font-mono">NEEDS HUMAN: [reason]</code> to <code className="text-rose-300 font-mono">progress.md</code> and exit with code 1.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-950/50 p-4">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1.5">
              <BookOpen className="h-4 w-4" />
              SPEC-15: Cold Morning Guarantee
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              An engineer reading cold in the morning must identify exact failure reason and timestamp from spine logs without re-executing code or guessing.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-950/50 p-4">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1.5">
              <FileText className="h-4 w-4" />
              SPEC-16: File Interface Contracts
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Input: <code className="text-slate-300 font-mono">todos.txt</code>. Outputs: <code className="text-slate-300 font-mono">cost_log.md</code>, <code className="text-slate-300 font-mono">progress.md</code>, <code className="text-slate-300 font-mono">digest.log</code>. Test harness: <code className="text-slate-300 font-mono">daily_digest_broken.sh</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
        <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
          <GitFork className="h-4 w-4 text-cyan-400" />
          Autonomous Loop Execution Pipeline (State Machine)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
            <span className="text-[10px] text-cyan-400 uppercase font-semibold block mb-1">Step 1: Cron Beat</span>
            <div className="text-slate-200 font-semibold">02:30 UTC Trigger</div>
            <p className="text-[11px] text-slate-400 mt-1">daily_digest.sh runs once daily</p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
            <span className="text-[10px] text-indigo-400 uppercase font-semibold block mb-1">Step 2: Scan & Path Check</span>
            <div className="text-slate-200 font-semibold">Check todos.txt</div>
            <p className="text-[11px] text-slate-400 mt-1">If missing: writes NEEDS HUMAN & exits 1</p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
            <span className="text-[10px] text-emerald-400 uppercase font-semibold block mb-1">Step 3: Concept 13</span>
            <div className="text-slate-200 font-semibold">cost_log.md</div>
            <p className="text-[11px] text-slate-400 mt-1">Append tokens read/written + beat note</p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
            <span className="text-[10px] text-amber-400 uppercase font-semibold block mb-1">Step 4: Concept 14</span>
            <div className="text-slate-200 font-semibold">progress.md (Spine)</div>
            <p className="text-[11px] text-slate-400 mt-1">Heartbeat trace or actionable alert note</p>
          </div>
        </div>
      </div>

      {/* Code & Doc Inspector */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveDoc("spec")}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                activeDoc === "spec"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              SPEC.md
            </button>
            <button
              onClick={() => setActiveDoc("script")}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                activeDoc === "script"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              daily_digest.sh
            </button>
            <button
              onClick={() => setActiveDoc("broken")}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                activeDoc === "broken"
                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              daily_digest_broken.sh
            </button>
            <button
              onClick={() => setActiveDoc("estimate")}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                activeDoc === "estimate"
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              COST_ESTIMATE.md
            </button>
            <button
              onClick={() => setActiveDoc("diagnosis")}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                activeDoc === "diagnosis"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              DIAGNOSIS.md
            </button>
            <button
              onClick={() => setActiveDoc("failure")}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                activeDoc === "failure"
                  ? "bg-slate-700/60 text-slate-200 border border-slate-600"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              FAILURE_TEST.md
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors shrink-0"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy Source"}
          </button>
        </div>

        <pre className="rounded-xl bg-black/90 border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed max-h-96">
          {getDocContent()}
        </pre>
      </div>
    </div>
  );
}
