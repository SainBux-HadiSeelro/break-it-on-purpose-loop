# Daily Digest: Cost Observability & Failure Diagnosis

This project demonstrates Concept 13 (token cost) and Concept 14 (needs-a-human notes) applied to a daily digest loop.

## Project Structure

```
7_break-it-on-purpose/
├── daily_digest.sh          # Main digest loop with cost logging
├── daily_digest_broken.sh   # Sabotaged copy for failure testing
├── cost_log.md              # Append-only cost log (auto-generated)
├── COST_ESTIMATE.md         # Monthly token cost estimate
├── progress.md              # Progress tracking with NEEDS HUMAN signals
├── digest.log               # Operation log with failure traces
├── FAILURE_TEST.md          # Documentation of sabotage method
├── DIAGNOSIS.md             # Diagnosis from spine analysis
├── todos.txt                # Example TODO file
└── (other generated files)
```

## Part 1: Cost Observability

### daily_digest.sh
Each run appends cost data to `cost_log.md`:

- **Run**: Date/time of the run
- **Tokens read (est.)**: Rough estimate, counting characters in prompt/response and dividing by ~4
- **Tokens written (est.)**: Rough estimate of output characters divided by ~4
- **Beat note**: One-line description of what the beat did (e.g., "2 new TODOs found")

### cost_log.md
Append-only log that is never overwritten. Each run adds a new entry with:
```
- **Run**: 2026-08-23 02:32:55
- **Tokens read (est.)**: ~0
- **Tokens written (est.)**: ~25
- **Beat note**: 0 new TODOs found

```

### COST_ESTIMATE.md
Monthly cost math written explicitly:
- Tokens per beat (from real run): ~25 written tokens
- Loop's cadence: once daily
- Beats per month: ~30
- **Total monthly tokens = ~750 tokens per month**
- **This is a rough estimate, not exact billing**

## Part 2: Sabotage & Failure Diagnosis

### daily_digest_broken.sh
A broken copy based on `daily_digest.sh` but sabotaged by pointing `$TODO_FILE` at a non-existent path (`C:\Users\dell\Desktop\nonexistent\todos.txt`).

When the scan step fails, the script:
1. Writes a clear line to `progress.md` under today's date: `NEEDS HUMAN: <specific reason>, at <timestamp>`
2. Writes the same failure reason to `digest.log`
3. Exits with a non-zero exit code (exit 1)

This implements Concept 14's rule: an unattended loop must leave a visible, readable trace of failure, not fail quietly.

### Failure signs observed:
- `progress.md`: `2026-08-23 | NEEDS HUMAN: TODO scan file not found: C:\Users\dell\Desktop\nonexistent\todos.txt, at 2026-08-23`
- `digest.log`: `2026-08-23 | Failure: TODO scan file not found: C:\Users\dell\Desktop\nonexistent\todos.txt`
- Exit code: 1

### FAILURE_TEST.md
Documents the sabotage method (option a: pointing at a non-existent file/directory).

## Part 3: Diagnose from the Spine Alone

### DIAGNOSIS.md
Written using ONLY `progress.md` and `digest.log` (without re-running the broken script or reading source code). Answers:
- **What failed?**: The TODO file scan step
- **When did it fail?**: `2026-08-23 | Failure: TODO scan file not found: C:\Users\dell\Desktop\nonexistent\todos.txt`
- **Clear 'needs a human' signal?**: Yes - the progress.md explicitly states `NEEDS HUMAN: TODO scan file not found`, no guessing required

## Usage

```bash
# Run the normal digest
./daily_digest.sh

# Run the broken version (will fail with visible trace)
./daily_digest_broken.sh
```