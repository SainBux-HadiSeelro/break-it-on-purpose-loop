"use client";

import React, { useState } from "react";
import { CheckSquare, Plus, Trash2, ListChecks, Hash } from "lucide-react";

interface TodosProps {
  todos: string[];
  onAddTodo: (text: string) => void;
  onRemoveTodo: (index: number) => void;
}

export default function TodosTab({ todos, onAddTodo, onRemoveTodo }: TodosProps) {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    onAddTodo(newTodo.trim().startsWith("TODO:") ? newTodo.trim() : `TODO: ${newTodo.trim()}`);
    setNewTodo("");
  };

  const totalChars = todos.join("\n").length;
  const estimatedReadTokens = Math.ceil(totalChars / 4);

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-cyan-400" />
              todos.txt Target Input File
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              The Daily Digest loop inspects this file on every beat to scan for pending work items and calculate token load.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/60 border border-slate-800 px-3.5 py-2 rounded-lg font-mono text-xs">
            <div>
              <span className="text-slate-500">Items: </span>
              <span className="text-cyan-400 font-bold">{todos.length}</span>
            </div>
            <div className="border-l border-slate-800 pl-3">
              <span className="text-slate-500">File size: </span>
              <span className="text-white font-bold">{totalChars} B</span>
            </div>
            <div className="border-l border-slate-800 pl-3">
              <span className="text-slate-500">Est. Prompt Tokens: </span>
              <span className="text-emerald-400 font-bold">~{estimatedReadTokens}</span>
            </div>
          </div>
        </div>

        {/* Add Todo Form */}
        <form onSubmit={handleSubmit} className="mt-5 flex gap-2">
          <input
            type="text"
            placeholder="Add new task e.g. Fix memory leak in background worker..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition-all shadow-md active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Add TODO
          </button>
        </form>

        {/* List of items */}
        <div className="mt-4 space-y-2">
          {todos.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-950/40 px-3.5 py-2.5 text-xs font-mono transition-all hover:border-slate-700"
            >
              <div className="flex items-center gap-2.5 text-slate-200">
                <CheckSquare className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>{item}</span>
              </div>
              <button
                onClick={() => onRemoveTodo(idx)}
                className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                title="Delete task"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}

          {todos.length === 0 && (
            <div className="py-8 text-center text-xs text-slate-500 font-mono">
              No tasks currently in todos.txt. Add one above!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
