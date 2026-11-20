"use client";

import React, { useState } from "react";
import { Code2, GitFork, Copy, Check, BookOpen } from "lucide-react";
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
  const [activeDoc, setActiveDoc] = useState<"script" | "broken" | "estimate" | "diagnosis" | "failure">("script");
  const [copied, setCopied] = useState(false);

  const getDocContent = () => {
    switch (activeDoc) {
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
      {/* Visual Pipeline Flow */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
        <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
          <GitFork className="h-4 w-4 text-cyan-400" />
          Autonomous Loop Architecture (Cron Cadence & Spine)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
            <span className="text-[10px] text-cyan-400 uppercase font-semibold block mb-1">Step 1: Cron Beat</span>
            <div className="text-slate-200 font-semibold">02:30 UTC Trigger</div>
            <p className="text-[11px] text-slate-400 mt-1">daily_digest.sh runs once daily</p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
            <span className="text-[10px] text-indigo-400 uppercase font-semibold block mb-1">Step 2: Scan & Test-Path</span>
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
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveDoc("script")}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                activeDoc === "script"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
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

        <pre className="rounded-lg bg-black/80 border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed max-h-96">
          {getDocContent()}
        </pre>
      </div>
    </div>
  );
}
