# System Specification: Daily Digest Autonomous Loop (Break-It-On-Purpose)

This specification defines the formal requirements, behavioral invariants, file contracts, and verification criteria for the **Daily Digest Autonomous Loop** implementing **Concept 13 (Token Cost Observability)** and **Concept 14 (Needs-A-Human Failure Diagnosis)**.

---

## 1. System Overview & Objective

The Daily Digest loop is an unattended, scheduled background agent designed to scan task files, calculate work items, maintain cost visibility, and self-report failures without human babysitting.

- **Cadence**: 1 execution per day (02:30 UTC cron schedule)
- **Primary Agent Goal**: Scan `todos.txt`, log summary, track token consumption, and report heartbeat.
- **Resilience Goal**: Fail loudly and visibly; never fail silently.

---

## 2. Concept 13 Specification: Cost Observability

Autonomous agents running unattended can incur runaway costs if prompt sizing or execution loops expand unchecked.

### 2.1 Requirements & Invariants
1. **Append-Only Logging**: Every beat execution MUST append a new cost record to `cost_log.md`. The log file MUST NEVER be truncated or overwritten.
2. **Token Heuristic Formula**:
   $$\text{Tokens Read} = \left\lfloor \frac{\text{Length of Input Characters}}{4} \right\rfloor$$
   $$\text{Tokens Written} = \left\lfloor \frac{\text{Length of Output Characters}}{4} \right\rfloor$$
3. **Record Schema**:
   Each record in `cost_log.md` MUST conform to:
   ```markdown
   - **Run**: YYYY-MM-DD HH:MM:SS
   - **Tokens read (est.)**: ~<N>
   - **Tokens written (est.)**: ~<M>
   - **Beat note**: <Concise 1-line note of what the beat processed>
   ```
4. **Monthly Projection Formula**:
   $$\text{Monthly Tokens} = \text{Average Tokens per Beat} \times \text{Cadence (30 beats/month)}$$
   $$\text{Monthly Cost} = \left(\frac{\text{Monthly Read Tokens}}{10^6} \times P_{\text{in}}\right) + \left(\frac{\text{Monthly Written Tokens}}{10^6} \times P_{\text{out}}\right)$$
   Where $P_{\text{in}}$ and $P_{\text{out}}$ are model prices per 1M tokens.

---

## 3. Concept 14 Specification: Unattended Failure & Needs-A-Human Notes

Unattended background loops must leave unambiguous audit traces when blocked, rather than failing silently or hanging.

### 3.1 Requirements & Invariants
1. **Non-Zero Exit Code**: On any unrecoverable failure (e.g. missing target file, invalid path), the script MUST terminate with `exit 1`.
2. **Spine Signal Contract**:
   On failure, the script MUST append an explicit, unambiguous signal to `progress.md` under today's date formatted strictly as:
   ```markdown
   YYYY-MM-DD | NEEDS HUMAN: <Exact reason with path or condition>, at YYYY-MM-DD
   ```
3. **Secondary Error Trace**:
   The identical failure reason MUST be recorded into `digest.log`:
   ```markdown
   YYYY-MM-DD | Failure: <Exact reason with path or condition>
   ```
4. **The Cold Morning Diagnosis Test**:
   An engineer reviewing `progress.md` and `digest.log` in the morning MUST be able to answer the following three questions WITHOUT inspecting source code or re-running the script:
   - *What failed?* (Explicitly answered by the note)
   - *When did it fail?* (Exact timestamp included)
   - *Did you have to guess?* (No, the string `NEEDS HUMAN:` is unmistakable)

---

## 4. Sabotage Test Specification (Break-It-On-Purpose)

To ensure the loop safely handles failure, a deliberate sabotage test script (`daily_digest_broken.sh` / `daily_digest_broken_TEST.ps1`) is maintained alongside the healthy script.

- **Sabotage Method**: Configure `$TODO_FILE` to point to a non-existent path:
  `C:\Users\dell\Desktop\nonexistent\todos.txt`
- **Expected Behavior**:
  1. `Test-Path` evaluates to `$false`.
  2. Execution routes directly to failure handler.
  3. Writes `NEEDS HUMAN:` line to `progress.md`.
  4. Appends trace to `digest.log`.
  5. Terminates with status code `1`.
  6. Does NOT corrupt `cost_log.md`.

---

## 5. File & Directory Contracts

| File | Purpose | Access Mode | Owner / Trigger |
| :--- | :--- | :--- | :--- |
| `daily_digest.sh` | Main loop script | Execute | Cron / Agent Runner |
| `daily_digest_broken.sh` | Sabotaged test script | Execute | Test Harness / Sabotage Runner |
| `todos.txt` | Target task input file | Read / Parse | User / Task Generator |
| `cost_log.md` | Token audit log | Append-only | `daily_digest.sh` |
| `progress.md` | Central heartbeat spine | Append-only | `daily_digest.sh` / Sabotage |
| `digest.log` | Raw execution log | Append-only | Loop execution runtime |
| `COST_ESTIMATE.md` | Monthly token calculations | Read / Static | System Documentation |
| `DIAGNOSIS.md` | Cold-morning analysis record | Read / Static | Human Operator Review |
| `FAILURE_TEST.md` | Sabotage test specification | Read / Static | Test Verification Report |
| `SPEC.md` | Formal system specifications | Read / Reference | System Architecture |

---

## 6. Frontend Dashboard Specification

The web interface (Next.js 14 + Tailwind CSS) acts as the interactive observation and control center for the loop.

### 6.1 Required Views:
1. **Agent Playground**:
   - Status indicators (Healthy 🟢 vs Needs Human 🚨).
   - "Run Normal Test" (simulating `daily_digest.sh`).
   - "Test Sabotage Alert" (simulating `daily_digest_broken.sh`).
   - Reset System button (restores clean baseline across all components).
2. **Cost Guard**:
   - Plain-English token explanations for non-technical users.
   - Interactive cadence slider (1 to 24 runs/day).
   - Model pricing selector and billing projection table.
3. **Safety & Sabotage Inspector**:
   - Visual breakdown of the 3 Cold Morning spine questions.
   - Live heartbeat timeline viewer.
4. **Task List Manager**:
   - Dynamic TODO adder and remover.
   - Real-time prompt token size calculator ($\text{chars}/4$).
5. **System Specifications & Architecture**:
   - Interactive specification reader and invariant checklist.
   - Code viewer with one-click copy for bash scripts and markdown specs.
