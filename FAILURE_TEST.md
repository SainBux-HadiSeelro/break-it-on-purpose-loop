Failure Test Documentation
==========================

Script: daily_digest_broken.sh
Sabotage method: (a) point it at a file or directory that does not exist,
so the scan step fails

Description:
The daily_digest_broken.sh script was created as a broken copy of daily_digest.sh.
The sabotage consists of setting $TODO_FILE to a non-existent path:
  $TODO_FILE = "C:\Users\dell\Desktop\nonexistent\todos.txt"

When the script runs, the Test-Path check for $TODO_FILE returns $false because
the file or directory does not exist. The script then:
1. Writes a "NEEDS HUMAN" signal to progress.md under today's date
2. Writes the failure reason to digest.log
3. Exits with a non-zero exit code (exit 1)

This differs from the normal daily_digest.sh which expects the TODO file to exist
at $BASE_DIR/todos.txt.

Failure signs observed:
- progress.md: "NEEDS HUMAN: TODO scan file not found: C:\Users\dell\Desktop\nonexistent\todos.txt, at 2026-08-23"
- digest.log: "Failure: TODO scan file not found: C:\Users\dell\Desktop\nonexistent\todos.txt"
- Exit code: 1 (non-zero)