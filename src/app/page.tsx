"use client";

import React, { useState } from "react";
import {
  Bot,
  Sparkles,
  Coins,
  ShieldAlert,
  ListChecks,
  Code2,
  Github,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
} from "lucide-react";
import AgentControlCenter from "@/components/AgentControlCenter";
import SimpleCostExplainer from "@/components/SimpleCostExplainer";
import SimpleFailureExplainer from "@/components/SimpleFailureExplainer";
import TodosTab from "@/components/TodosTab";
import ArchitectureTab from "@/components/ArchitectureTab";
import {
  INITIAL_COST_LOGS,
  INITIAL_PROGRESS_LOGS,
  INITIAL_TODOS,
  CostEntry,
  ProgressEntry,
} from "@/data/initialData";

export default function DashboardPage() {
  const [costLogs, setCostLogs] = useState<CostEntry[]>(INITIAL_COST_LOGS);
  const [progressLogs, setProgressLogs] = useState<ProgressEntry[]>(INITIAL_PROGRESS_LOGS);
  const [todos, setTodos] = useState<string[]>(INITIAL_TODOS);
  const [activeTab, setActiveTab] = useState<"agent" | "cost" | "safety" | "tasks" | "code">("agent");

  // Determine if there is an active NEEDS HUMAN alert
  const hasNeedsHumanAlert = progressLogs.some(
    (p, idx) => idx === progressLogs.length - 1 && p.type === "needs_human"
  );

  const handleAddCostLog = (entry: CostEntry) => {
    setCostLogs((prev) => [entry, ...prev]);
  };

  const handleAddProgressLog = (entry: ProgressEntry) => {
    setProgressLogs((prev) => [...prev, entry]);
  };

  const handleReset = () => {
    setCostLogs(INITIAL_COST_LOGS);
    setProgressLogs(INITIAL_PROGRESS_LOGS);
    setTodos(INITIAL_TODOS);
  };

  const handleAddTodo = (item: string) => {
    setTodos((prev) => [...prev, item]);
  };

  const handleRemoveTodo = (index: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#070b12]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white tracking-tight text-base sm:text-lg">
                  Sentinel AI
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Sparkles className="h-3 w-3" /> Agentic AI Developer Build
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Daily Autonomous Digest Loop with Self-Observability & Sabotage Testing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300">
              <span className={`h-2 w-2 rounded-full ${hasNeedsHumanAlert ? "bg-red-400 animate-pulse" : "bg-emerald-400"}`}></span>
              {hasNeedsHumanAlert ? "Alert Active" : "Loop Ready"}
            </span>

            <a
              href="https://github.com/SainBux-HadiSeelro/break-it-on-purpose-loop"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-white transition-all shadow-sm"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* Navigation Tabs (Friendly Labels with Icons) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-1.5 backdrop-blur-sm">
          <nav className="flex space-x-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab("agent")}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === "agent"
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <Bot className="h-4 w-4" />
              1. AI Agent Playground
            </button>

            <button
              onClick={() => setActiveTab("cost")}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === "cost"
                  ? "bg-cyan-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <Coins className="h-4 w-4" />
              2. Cost & Bill Guard
            </button>

            <button
              onClick={() => setActiveTab("safety")}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === "safety"
                  ? "bg-rose-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <ShieldAlert className="h-4 w-4" />
              3. Safety & Sabotage Test
            </button>

            <button
              onClick={() => setActiveTab("tasks")}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === "tasks"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <ListChecks className="h-4 w-4" />
              4. Task List ({todos.length})
            </button>

            <button
              onClick={() => setActiveTab("code")}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === "code"
                  ? "bg-slate-700 text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <Code2 className="h-4 w-4" />
              5. Developer Specs & Scripts
            </button>
          </nav>
        </div>

        {/* Tab Panes */}
        <div className="pt-2">
          {activeTab === "agent" && (
            <AgentControlCenter
              todos={todos}
              hasNeedsHumanAlert={hasNeedsHumanAlert}
              onAddCostLog={handleAddCostLog}
              onAddProgressLog={handleAddProgressLog}
              onReset={handleReset}
            />
          )}

          {activeTab === "cost" && <SimpleCostExplainer />}

          {activeTab === "safety" && <SimpleFailureExplainer progressLogs={progressLogs} />}

          {activeTab === "tasks" && (
            <TodosTab
              todos={todos}
              onAddTodo={handleAddTodo}
              onRemoveTodo={handleRemoveTodo}
            />
          )}

          {activeTab === "code" && <ArchitectureTab />}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-medium text-slate-400">
            🤖 Agentic AI Reference Implementation • Concept 13 (Cost Guard) & Concept 14 (Needs-A-Human Spine)
          </span>
          <span className="text-slate-500 font-mono">
            Vercel Ready • 1-Click Zero Config Deploy
          </span>
        </div>
      </footer>
    </div>
  );
}
