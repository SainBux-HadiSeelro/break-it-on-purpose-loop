"use client";

import React, { useState } from "react";
import {
  Play,
  AlertTriangle,
  RotateCcw,
  Bot,
  Sparkles,
  CheckCircle2,
  FileSearch,
  Coins,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Terminal,
} from "lucide-react";
import { CostEntry, ProgressEntry } from "@/data/initialData";

interface AgentControlCenterProps {
  todos: string[];
  hasNeedsHumanAlert: boolean;
  onAddCostLog: (entry: CostEntry) => void;
  onAddProgressLog: (entry: ProgressEntry) => void;
  onReset: () => void;
}

export default function AgentControlCenter({
  todos,
  hasNeedsHumanAlert,
  onAddCostLog,
  onAddProgressLog,
  onReset,
}: AgentControlCenterProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeAction, setActiveAction] = useState<"normal" | "sabotage" | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>(
    "Agent is currently sleeping. Click a button below to wake it up and test it."
  );
  const [showDevLog, setShowDevLog] = useState(false);
  const [rawLogs, setRawLogs] = useState<string[]>([
    "[SYSTEM] Agentic Loop runtime initialized.",
    "[STATUS] Ready to execute daily digest loop.",
  ]);

  const addLog = (msg: string) => {
    setRawLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const runNormalTest = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setActiveAction("normal");
    setCurrentStep(1);
    setStatusMessage("🤖 AI Agent Woke Up: Checking task list (todos.txt)...");
    addLog("Waking up agent for daily beat execution...");

    await new Promise((r) => setTimeout(r, 800));
    setCurrentStep(2);
    setStatusMessage(`📋 Reading Tasks: Found ${todos.length} active tasks to process.`);
    addLog(`Scanned todos.txt: ${todos.length} items found.`);

    await new Promise((r) => setTimeout(r, 900));
    setCurrentStep(3);
    const readTokens = Math.max(1, Math.round(todos.join("").length / 4));
    const writtenTokens = 25;
    setStatusMessage(`🪙 Calculating Token Cost: Used ~${readTokens + writtenTokens} tokens (Heuristic chars/4).`);
    addLog(`Cost calculated: read=${readTokens}, written=${writtenTokens}`);

    await new Promise((r) => setTimeout(r, 800));
    setCurrentStep(4);
    setStatusMessage("✅ Success! AI completed the daily task without any issues.");
    addLog("Loop finished successfully with exit code 0. Heartbeat logged.");

    const now = new Date();
    const timestampStr = now.toISOString().replace("T", " ").substring(0, 19);
    const dateStr = now.toISOString().substring(0, 10);

    onAddCostLog({
      id: `cost-${Date.now()}`,
      run: timestampStr,
      tokensRead: readTokens,
      tokensWritten: writtenTokens,
      beatNote: `${todos.length} tasks processed cleanly`,
      status: "success",
    });

    onAddProgressLog({
      id: `prog-${Date.now()}`,
      date: dateStr,
      type: "running",
      message: "digest running (normal beat completed)",
      raw: `${dateStr} | digest running`,
    });

    setIsProcessing(false);
  };

  const runSabotageTest = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setActiveAction("sabotage");
    setCurrentStep(1);
    setStatusMessage("🤖 AI Agent Woke Up: Attempting to find task file...");
    addLog("Starting intentional sabotage test (Break-It-On-Purpose)...");

    await new Promise((r) => setTimeout(r, 800));
    setCurrentStep(2);
    setStatusMessage("⚠️ File Missing! The task path does not exist on the server.");
    addLog("ERROR: C:\\Users\\dell\\Desktop\\nonexistent\\todos.txt not found!");

    await new Promise((r) => setTimeout(r, 900));
    setCurrentStep(3);
    setStatusMessage("🚨 Concept 14 Triggered: AI safely paused and sent an alert for human review.");
    addLog("WRITING SIGNAL TO SPINE: 'NEEDS HUMAN: TODO scan file not found'");

    const now = new Date();
    const dateStr = now.toISOString().substring(0, 10);
    const alertMsg = `NEEDS HUMAN: TODO scan file not found: C:\\Users\\dell\\Desktop\\nonexistent\\todos.txt, at ${dateStr}`;

    onAddProgressLog({
      id: `prog-${Date.now()}`,
      date: dateStr,
      type: "needs_human",
      message: alertMsg,
      raw: `${dateStr} | ${alertMsg}`,
    });

    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      {/* Agent Persona Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/30">
              <Bot className="h-8 w-8 text-white" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${hasNeedsHumanAlert ? "bg-red-400" : "bg-emerald-400"}`}></span>
                <span className={`relative inline-flex rounded-full h-4 w-4 ${hasNeedsHumanAlert ? "bg-red-500" : "bg-emerald-500"}`}></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">Autonomous Daily Digest Agent</h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  <Sparkles className="h-3 w-3" /> Agentic AI 2.0
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-300 max-w-xl">
                This AI works in the background once every day. It watches its own spending and alerts an engineer if anything breaks.
              </p>
            </div>
          </div>

          {/* Quick Status Tag */}
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-xl border text-center ${
              hasNeedsHumanAlert
                ? "border-red-500/50 bg-red-950/60 text-red-300"
                : "border-emerald-500/50 bg-emerald-950/60 text-emerald-300"
            }`}>
              <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">Current AI State</div>
              <div className="text-sm font-bold flex items-center justify-center gap-1.5 mt-0.5">
                {hasNeedsHumanAlert ? "🚨 Help Needed (Alert)" : "🟢 All Clear & Healthy"}
              </div>
            </div>

            <button
              onClick={onReset}
              title="Reset state to initial"
              className="p-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1.5"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Two Big Action Cards for Non-Tech Users */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: Normal Run */}
        <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/70 p-6 flex flex-col justify-between hover:border-emerald-500/60 transition-all shadow-lg">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/20 text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5" /> Normal Mode
              </span>
              <span className="text-xs text-slate-400">Concept 13 Test</span>
            </div>

            <h3 className="mt-3 text-lg font-bold text-white">Test Normal AI Work (Healthy Run)</h3>
            <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
              Click this button to see the AI agent wake up, read your tasks, calculate how much AI tokens it spent, and report that everything went smoothly.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Expected: All steps pass (0 errors)</span>
            <button
              onClick={runNormalTest}
              disabled={isProcessing}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold text-xs transition-all shadow-md shadow-emerald-900/30 disabled:opacity-50"
            >
              <Play className="h-4 w-4 fill-current" />
              {isProcessing && activeAction === "normal" ? "AI Working..." : "Run Normal Test"}
            </button>
          </div>
        </div>

        {/* Card 2: Break on Purpose */}
        <div className="rounded-2xl border border-red-500/30 bg-slate-900/70 p-6 flex flex-col justify-between hover:border-red-500/60 transition-all shadow-lg">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-red-500/20 text-red-300">
                <AlertTriangle className="h-3.5 w-3.5" /> Sabotage Mode
              </span>
              <span className="text-xs text-slate-400">Concept 14 Test</span>
            </div>

            <h3 className="mt-3 text-lg font-bold text-white">Break It On Purpose (Safety Test)</h3>
            <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
              We purposely hide the task file. Watch how a well-designed AI does NOT crash silently, but raises an explicit &ldquo;NEEDS HUMAN&rdquo; flag for engineers.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-red-400 font-medium">Safe Test • Demonstrates Self-Reporting</span>
            <button
              onClick={runSabotageTest}
              disabled={isProcessing}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 active:scale-95 text-white font-semibold text-xs transition-all shadow-md shadow-red-900/30 disabled:opacity-50"
            >
              <AlertTriangle className="h-4 w-4" />
              {isProcessing && activeAction === "sabotage" ? "Simulating Error..." : "Test Sabotage Alert"}
            </button>
          </div>
        </div>
      </div>

      {/* Live AI Status Window (Non-Tech Friendly) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-inner">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <h4 className="text-sm font-semibold text-white">AI Agent Live Activity Monitor</h4>
          </div>

          <button
            onClick={() => setShowDevLog(!showDevLog)}
            className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors font-mono"
          >
            <Terminal className="h-3 w-3" />
            {showDevLog ? "Hide Developer Console" : "Show Developer Console"}
            {showDevLog ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
        </div>

        {/* Friendly Status Box */}
        <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
            <Bot className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Current Activity</div>
            <div className={`text-sm font-medium mt-0.5 ${
              statusMessage.includes("Success")
                ? "text-emerald-400"
                : statusMessage.includes("Alert") || statusMessage.includes("Missing")
                ? "text-red-400 font-semibold"
                : "text-slate-100"
            }`}>
              {statusMessage}
            </div>
          </div>
        </div>

        {/* Developer Console (Collapsible) */}
        {showDevLog && (
          <div className="mt-4 rounded-xl bg-black border border-slate-800 p-3.5 font-mono text-xs text-slate-300 max-h-48 overflow-y-auto space-y-1">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest border-b border-slate-800/60 pb-1 mb-2">
              Terminal Trace & Spine Audit
            </div>
            {rawLogs.map((log, i) => (
              <div
                key={i}
                className={
                  log.includes("ERROR") || log.includes("NEEDS HUMAN")
                    ? "text-red-400"
                    : log.includes("exit code 0") || log.includes("success")
                    ? "text-emerald-400"
                    : "text-slate-400"
                }
              >
                {log}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
