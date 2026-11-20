<div align="center">

# 🤖 Sentinel AI • Daily Digest Autonomous Loop
### *Self-Observing, Cost-Bounded & Self-Reporting Autonomous Background Agent*

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Live Demo](https://img.shields.io/badge/Live_Demo-break--it--on--purpose--loop.vercel.app-00dfa2?style=for-the-badge&logo=vercel&logoColor=black)](https://break-it-on-purpose-loop.vercel.app/)
[![Loop Engineering](https://img.shields.io/badge/Loop_Engineering-Concepts_13_%26_14-8b5cf6?style=for-the-badge&logo=openai&logoColor=white)]()

<p align="center">
  <b>A reference implementation of production-grade Autonomous AI Loop Engineering.</b><br>
  Demonstrates <b>Concept 13 (Token Cost Observability)</b> and <b>Concept 14 (Needs-A-Human Failure Spine)</b> with an interactive, non-tech friendly Next.js Web Dashboard.
</p>

[🚀 **Launch Live Demo**](https://break-it-on-purpose-loop.vercel.app/) • [📋 System Specifications](SPEC.md) • [🚀 Quickstart](#-quickstart) • [🛡️ Sabotage Testing](#-part-2-sabotage--failure-diagnosis-concept-14)

---

</div>

## 📌 Executive Summary

Autonomous AI agents running unattended in background cron schedules face two critical existential risks:
1. **Unbounded Cost Expansion**: An infinite or inefficient loop can silently burn through thousands of dollars in LLM API tokens overnight without any alarm.
2. **Silent Failure Disasters**: When background workers crash or encounter missing files, standard scripts fail quietly, leaving morning engineering teams to guess what went wrong.

**Sentinel AI** demonstrates the architectural antidote:
- **Concept 13 (Cost Observability)**: The agent measures its own token spend on every beat using a character heuristic ($\text{chars}/4$) and appends an immutable audit log to `cost_log.md`.
- **Concept 14 (Needs-A-Human Spine)**: The agent is deliberately sabotaged in testing (`daily_digest_broken.sh`) to prove that on any failure, it terminates safely with `exit 1` and writes an explicit, unambiguous `NEEDS HUMAN:` signal to `progress.md`.

---

## 🏗️ Autonomous Loop Architecture

```
                       [ Cron Daemon / Scheduled Beat ]
                               (Cadence: 02:30 UTC)
                                        │
                                        ▼
                         [ Verify Target File Path ]
                               (todos.txt Exists?)
                                  /            \
                       YES       /              \       NO (Sabotage Triggered)
                                /                \
                               ▼                  ▼
                [ Scan & Parse Tasks ]     [ Write 'NEEDS HUMAN' Signal ]
                        │                  - Append reason to progress.md
                        ▼                  - Log trace to digest.log
               [ Compute Token Cost ]      - Terminate with exit code 1
               - Read Tok = chars/4               │
               - Write Tok = ~25                  ▼
                        │               [ Cold-Morning Human Review ]
                        ▼               (Engineer diagnoses from spine alone)
               [ Append to cost_log.md ]
               (Append-Only, Never Overwritten)
                        │
                        ▼
               [ Append Spine Heartbeat ]
               ("YYYY-MM-DD | digest running")
                        │
                        ▼
                 [ Status: OK (0) ]
```

---

## ⚡ The Two Engineering Pillars

### 📊 1. Concept 13: Cost Observability (`daily_digest.sh` & `cost_log.md`)
Every beat of the autonomous loop tracks and records its token footprint:
- **Tokens Read**: Approximated by reading characters from target input files divided by ~4:
  $$\text{Tokens Read} = \left\lfloor \frac{\text{Input Characters}}{4} \right\rfloor$$
- **Tokens Written**: Output logging payload divided by ~4 ($\approx 25$ tokens per run).
- **Append-Only Invariant**: `cost_log.md` is strictly append-only. It is **never overwritten, truncated, or hidden**.
- **Monthly Budget Math**:
  $$\text{30 beats/month} \times \sim 25\text{ tokens/beat} \approx \mathbf{750\text{ tokens/month}} \quad (\text{Less than } \$0.01/\text{month})$$

```markdown
### cost_log.md Example Record
- **Run**: 2026-08-23 02:32:55
- **Tokens read (est.)**: ~0
- **Tokens written (est.)**: ~25
- **Beat note**: 1 new TODOs found
```

---

### 🚨 2. Concept 14: Unattended Failure & Spine Diagnosis (`progress.md`)
To test failure self-reporting, we built a broken twin: `daily_digest_broken.sh`.

- **Sabotage Method**: `$TODO_FILE` is deliberately configured to a non-existent path:
  `C:\Users\dell\Desktop\nonexistent\todos.txt`
- **Failure Protocol**:
  1. Emits an unmistakable line to `progress.md`:
     `2026-08-23 | NEEDS HUMAN: TODO scan file not found: C:\Users\dell\Desktop\nonexistent\todos.txt, at 2026-08-23`
  2. Emits secondary trace to `digest.log`.
  3. Exits with non-zero exit code (`exit 1`).

#### ☕ The "Cold Morning Diagnosis" Test
When an engineer checks the system at 9:00 AM using **ONLY** `progress.md` and `digest.log` (without reading code or running scripts):

| Spine Diagnosis Question | Answer Extracted Cold From Logs |
| :--- | :--- |
| **1. What failed?** | TODO file scan step — path `C:\Users\dell\Desktop\nonexistent\todos.txt` not found. |
| **2. When did it fail?** | Exact timestamp `2026-08-23 02:30 UTC` recorded in logs. |
| **3. Did you have to guess?** | **No guessing required.** The `NEEDS HUMAN:` signal is loud and explicit. |

---

## 🖥️ Interactive Web Dashboard

A modern, production-grade **Next.js 14 + Tailwind CSS** dashboard tailored so that both **technical developers** and **non-technical stakeholders** can interact with and understand the system.

> ### 🌐 Live Interactive Demo
> **Direct URL:** [https://break-it-on-purpose-loop.vercel.app/](https://break-it-on-purpose-loop.vercel.app/)  
> *No installation required — test healthy agent execution, sabotage safety alerts, and token cost simulations directly in your browser.*

### Dashboard Highlights:
- **🤖 1-Click Agent Playground**: Run normal beats (`daily_digest.sh`) or trigger deliberate sabotage (`daily_digest_broken.sh`) with live animated activity progress.
- **💰 Plain-English Cost Guard**: Interactive cadence slider (1 to 24 runs/day) with instant monthly billing estimates across GPT-4o, Claude 3.5 Sonnet, and Gemini 1.5 Flash.
- **🛡️ Safety & Spine Diagnosis**: Visual breakdown of the 3 cold-morning diagnosis questions and live heartbeat timelines.
- **📋 Live TODO Scanner**: Add or delete tasks from `todos.txt` and watch prompt token sizing calculate in real time.
- **🔄 Universal Reset**: Instant 1-click reset to clean baseline state across all state variables, alerts, and logs.
- **📋 Formal Specifications Matrix**: Interactive reader for [SPEC.md](SPEC.md) and underlying bash scripts.

---

## 📁 Repository Structure

```
break-it-on-purpose-loop/
├── 📜 SPEC.md                    # Formal RFC specifications and invariants
├── 📜 readme.md                  # System overview and agent documentation
├── ⚙️ daily_digest.sh             # Main loop with Concept 13 token logging
├── 💥 daily_digest_broken.sh      # Sabotaged script for Concept 14 testing
├── 📝 todos.txt                  # Scanned task input file
├── 📊 cost_log.md                # Append-only token cost audit log
├── 📈 COST_ESTIMATE.md           # Monthly token cost math
├── 🩺 progress.md                # Central spine with HEARTBEAT and NEEDS HUMAN signals
├── 🪵 digest.log                 # Raw execution and error trace log
├── 🔬 FAILURE_TEST.md            # Sabotage method documentation
├── 🕵️ DIAGNOSIS.md               # Cold morning spine diagnosis notes
├── 🌐 vercel.json                # Vercel zero-config deployment manifest
├── 📦 package.json               # Next.js 14, Tailwind, Lucide dependencies
└── 📂 src/
    ├── app/                      # Next.js App Router (layout.tsx, page.tsx, globals.css)
    ├── components/               # AgentControlCenter, CostExplainer, FailureExplainer, TodosTab
    └── data/                     # Initial seed logs and system specs
```

---

## 🚀 Quickstart

### 1. View Live Hosted Demo
Open the live Vercel production deployment:  
👉 **[https://break-it-on-purpose-loop.vercel.app/](https://break-it-on-purpose-loop.vercel.app/)**

### 2. Run the Web Dashboard Locally
```bash
# Clone the repository
git clone https://github.com/SainBux-HadiSeelro/break-it-on-purpose-loop.git
cd break-it-on-purpose-loop

# Install dependencies
npm install

# Start development server
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 2. Deploy to Vercel (1-Click)
This repository is configured for automatic Vercel deployment:
1. Go to [vercel.com/new](https://vercel.com/new).
2. Select `SainBux-HadiSeelro/break-it-on-purpose-loop`.
3. Vercel automatically detects **Next.js** framework preset.
4. Click **Deploy**.

### 3. Run via Command Line (CLI)
```bash
# Run the healthy digest loop
./daily_digest.sh

# Run the sabotaged loop (fails loudly with visible spine trace)
./daily_digest_broken.sh
```

---

## 📜 Formal System Invariants

| Spec ID | Name | Invariant Description | Status |
| :--- | :--- | :--- | :---: |
| **SPEC-13** | Cost Observability | Token heuristic ($\text{chars}/4$) appended to `cost_log.md` on every run. Strictly append-only. | ✅ Enforced |
| **SPEC-14** | Unattended Failure | Failures emit `NEEDS HUMAN: <reason>` to `progress.md` with `exit 1`. Never fail silently. | ✅ Enforced |
| **SPEC-15** | Cold Morning Review | Failure cause and timestamp extractable without running code or guessing. | ✅ Enforced |
| **SPEC-16** | File Interface Contracts | Clean separation of input (`todos.txt`), logs (`cost_log.md`), and spine (`progress.md`). | ✅ Enforced |

---

<div align="center">

**Built with precision by [SainBux-HadiSeelro](https://github.com/SainBux-HadiSeelro)**  
*Agentic AI & Loop Engineering Reference Architecture*

</div>
