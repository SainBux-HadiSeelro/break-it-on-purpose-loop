export interface CostEntry {
  id: string;
  run: string;
  tokensRead: number;
  tokensWritten: number;
  beatNote: string;
  status: "success" | "failure";
}

export interface ProgressEntry {
  id: string;
  date: string;
  type: "running" | "needs_human";
  message: string;
  raw: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR" | "SUCCESS";
  message: string;
}

export const INITIAL_COST_LOGS: CostEntry[] = [
  {
    id: "cost-1",
    run: "2026-08-23 02:32:55",
    tokensRead: 0,
    tokensWritten: 25,
    beatNote: "0 new TODOs found",
    status: "success",
  },
  {
    id: "cost-2",
    run: "2026-08-23 02:34:14",
    tokensRead: 0,
    tokensWritten: 25,
    beatNote: "Routine baseline check completed",
    status: "success",
  },
  {
    id: "cost-3",
    run: "2026-08-23 02:34:45",
    tokensRead: 0,
    tokensWritten: 25,
    beatNote: "1 new TODOs found",
    status: "success",
  },
  {
    id: "cost-4",
    run: "2026-08-23 02:34:59",
    tokensRead: 0,
    tokensWritten: 25.25,
    beatNote: "1 new TODOs found (parser sync)",
    status: "success",
  },
];

export const INITIAL_PROGRESS_LOGS: ProgressEntry[] = [
  {
    id: "prog-1",
    date: "2026-08-23",
    type: "running",
    message: "digest running (cadence 02:30)",
    raw: "2026-08-23 | digest running",
  },
  {
    id: "prog-2",
    date: "2026-08-23",
    type: "running",
    message: "digest running (todos scan active)",
    raw: "2026-08-23 | digest running",
  },
  {
    id: "prog-3",
    date: "2026-08-23",
    type: "running",
    message: "digest running (cost appended)",
    raw: "2026-08-23 | digest running",
  },
  {
    id: "prog-4",
    date: "2026-08-23",
    type: "running",
    message: "digest running (normal beat completed)",
    raw: "2026-08-23 | digest running",
  },
  {
    id: "prog-5",
    date: "2026-08-23",
    type: "needs_human",
    message: "NEEDS HUMAN: TODO scan file not found: C:\\Users\\dell\\Desktop\\nonexistent\\todos.txt, at 2026-08-23",
    raw: "2026-08-23 | NEEDS HUMAN: TODO scan file not found: C:\\Users\\dell\\Desktop\\nonexistent\\todos.txt, at 2026-08-23",
  },
  {
    id: "prog-6",
    date: "2026-08-23",
    type: "running",
    message: "digest running (recovered state check)",
    raw: "2026-08-23 | digest running",
  },
];

export const INITIAL_TODOS = [
  "TODO: Fix bug in parser",
  "TODO: NEW: Add unit tests",
  "TODO: Refactor API client",
];

export const RAW_DOCS = {
  readme: `# Daily Digest: Cost Observability & Failure Diagnosis
This project demonstrates Concept 13 (token cost) and Concept 14 (needs-a-human notes) applied to a daily digest loop.

Part 1: Cost Observability (daily_digest.sh & cost_log.md)
Part 2: Sabotage & Failure Diagnosis (daily_digest_broken.sh & progress.md)`,

  costEstimate: `Daily Digest Cost Estimate
=========================
Tokens per beat (from real run):
  - Tokens read (est.): ~0 (small TODO file in local test)
  - Tokens written (est.): ~25 (approx 100 characters / 4)
Loop cadence: once daily (30 beats/month)
Total monthly tokens = ~25 * 30 = ~750 tokens per month
Important: Rough estimate heuristic (chars/4), not exact provider billing.`,

  diagnosis: `Diagnosis from the Spine
========================
Date of diagnosis: 2026-08-23 (reading cold in the morning from log files)

1. What failed?
The TODO file scan step in daily_digest_broken.sh. The script was configured with $TODO_FILE pointing to a non-existent path: C:\\Users\\dell\\Desktop\\nonexistent\\todos.txt.

2. When did it fail (exact timestamp from the log)?
Logged in digest.log & progress.md at 2026-08-23.

3. Is there a clear 'needs a human' signal, or did I have to guess?
There is a clear 'needs a human' signal!
progress.md: "2026-08-23 | NEEDS HUMAN: TODO scan file not found: C:\\Users\\dell\\Desktop\\nonexistent\\todos.txt"
digest.log: "2026-08-23 | Failure: TODO scan file not found"
No guessing was required.`,

  failureTest: `Failure Test Documentation (Sabotage Method)
============================================
Script: daily_digest_broken.sh
Sabotage method: Point it at a file or directory that does not exist ($TODO_FILE = "C:\\Users\\dell\\Desktop\\nonexistent\\todos.txt").
When the loop fails:
1. Writes a "NEEDS HUMAN" signal to progress.md under today's date.
2. Writes the failure reason to digest.log.
3. Exits with non-zero exit code (exit 1).`,

  systemSpec: `# System Specification: Daily Digest Autonomous Loop

1. Concept 13 Invariants (Cost Observability):
   - Every beat estimates tokens using (chars / 4).
   - cost_log.md is append-only (never truncated or overwritten).
   - Monthly token cost = average tokens/beat * 30 beats/month.

2. Concept 14 Invariants (Failure Spine):
   - Unattended loops MUST NEVER fail silently.
   - On error: writes 'NEEDS HUMAN: <reason>, at <timestamp>' to progress.md.
   - Secondary failure reason logged to digest.log.
   - Exits with status code 1.

3. Cold Morning Diagnosis:
   - What failed? Pinpointed immediately from spine.
   - When did it fail? Exact timestamp logged.
   - Any guessing? Zero guessing required.

4. File Contracts:
   - Input: todos.txt
   - Outputs: cost_log.md, progress.md, digest.log
   - Sabotage Test: daily_digest_broken.sh`
};
