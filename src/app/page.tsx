"use client";

import React, { useState } from "react";
import {
  Activity,
  Coins,
  ShieldAlert,
  ListChecks,
  GitBranch,
  Github,
  Terminal,
  ExternalLink,
  Code2,
} from "lucide-react";
import StatsOverview from "@/components/StatsOverview";
import LoopSimulator from "@/components/LoopSimulator";
import CostObservabilityTab from "@/components/CostObservabilityTab";
import FailureDiagnosisTab from "@/components/FailureDiagnosisTab";
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
  const [activeTab, setActiveTab] = useState<"cost" | "failure" | "todos" | "architecture">("cost");

  // Determine if there is an active NEEDS HUMAN condition
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
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#090d16]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Terminal className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white tracking-tight text-base sm:text-lg">
                  Break-It-On-Purpose
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Concept 13 & 14 Loop
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
                Daily Digest Loop: Cost Observability & Failure Spine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              Vercel Ready
            </span>

            <a
              href="https://github.com/SainBux-HadiSeelro/break-it-on-purpose-loop"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-xs font-medium text-slate-200 transition-colors shadow-sm"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub Repository</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* Metric Overview Cards */}
        <StatsOverview
          costLogs={costLogs}
          progressLogs={progressLogs}
          hasNeedsHumanAlert={hasNeedsHumanAlert}
        />

        {/* Live Simulator Runner */}
        <LoopSimulator
          todos={todos}
          onAddCostLog={handleAddCostLog}
          onAddProgressLog={handleAddProgressLog}
          onReset={handleReset}
        />

        {/* Navigation Tabs */}
        <div className="border-b border-slate-800">
          <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-px">
            <button
              onClick={() => setActiveTab("cost")}
              className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                activeTab === "cost"
                  ? "border-cyan-500 text-cyan-400"
                  : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              <Coins className="h-4 w-4" />
              Cost Observability (Concept 13)
            </button>

            <button
              onClick={() => setActiveTab("failure")}
              className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                activeTab === "failure"
                  ? "border-rose-500 text-rose-400"
                  : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              <ShieldAlert className="h-4 w-4" />
              Spine & Failure Diagnosis (Concept 14)
            </button>

            <button
              onClick={() => setActiveTab("todos")}
              className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                activeTab === "todos"
                  ? "border-indigo-500 text-indigo-400"
                  : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              <ListChecks className="h-4 w-4" />
              TODO Scanner ({todos.length})
            </button>

            <button
              onClick={() => setActiveTab("architecture")}
              className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                activeTab === "architecture"
                  ? "border-emerald-500 text-emerald-400"
                  : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              <Code2 className="h-4 w-4" />
              Architecture & Scripts
            </button>
          </nav>
        </div>

        {/* Tab Panes */}
        <div className="pt-2">
          {activeTab === "cost" && <CostObservabilityTab costLogs={costLogs} />}
          {activeTab === "failure" && <FailureDiagnosisTab progressLogs={progressLogs} />}
          {activeTab === "todos" && (
            <TodosTab
              todos={todos}
              onAddTodo={handleAddTodo}
              onRemoveTodo={handleRemoveTodo}
            />
          )}
          {activeTab === "architecture" && <ArchitectureTab />}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/40 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
          <span>Loop Engineering: Concept 13 & 14 Reference Implementation</span>
          <span>Deployable on Vercel with zero config</span>
        </div>
      </footer>
    </div>
  );
}
