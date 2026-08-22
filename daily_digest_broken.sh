# Sabotaged daily digest - points at non-existent TODO file
$BASE_DIR = "C:\Users\dell\Desktop\programming files\loop engineering projects\7_break-it-on-purpose"
$LOGFILE = Join-Path $BASE_DIR "digest.log"
$PROGRESS_FILE = Join-Path $BASE_DIR "progress.md"
$COST_LOG = Join-Path $BASE_DIR "cost_log.md"
# SABOTAGE: Point at a non-existent TODO file so the scan step fails
$TODO_FILE = "C:\Users\dell\Desktop\nonexistent\todos.txt"

Write-Output "DEBUG: TODO_FILE=$TODO_FILE"
Write-Output "DEBUG: BaseDir=$BASE_DIR"
Write-Output "DEBUG: Test-Path TODO_FILE=(Test-Path $TODO_FILE)"
Write-Output "DEBUG: BaseDir exists=(Test-Path $BASE_DIR)"

if (-not (Test-Path $BASE_DIR)) { New-Item -ItemType Directory -Path $BASE_DIR -Force | Out-Null }

"" >> $LOGFILE
"" >> $PROGRESS_FILE
"" >> $COST_LOG

$TODAY = (Get-Date).ToString("yyyy-MM-dd")
$PROGRESS_ENTRY = $TODAY + " | digest running"

# --- Scan for TODOs (sabotaged) ---
$FAILURE = $false

if (Test-Path $TODO_FILE) {
    Write-Output "DEBUG: TODO file exists, processing TODOs"
    $content = Get-Content $TODO_FILE
    $TODO_COUNT = ($content | Where-Object { $_ -match '^TODO:' }).Count
    $NEW_TODOS = ($content | Where-Object { $_ -match '^TODO: NEW:' }).Count
    $BEAT_NOTE = "$NEW_TODOS new TODOs found"
    
    # Write normal cost entry
    $RUN_TIMESTAMP = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    $CL1 = "- **Run**: $RUN_TIMESTAMP"
    $CL2 = "- **Tokens read (est.)**: ~" + [int]$READ_CHARS / 4
    $CL3 = "- **Tokens written (est.)**: ~" + [int]$WRITE_CHARS / 4
    $CL4 = "- **Beat note**: $BEAT_NOTE"
    $CL1 >> $COST_LOG
    $CL2 >> $COST_LOG
    $CL3 >> $COST_LOG
    $CL4 >> $COST_LOG
    "" >> $COST_LOG
} else {
    Write-Output "DEBUG: TODO file does NOT exist - should trigger failure"
    # Scan step FAILED - file does not exist
    $FAILURE_REASON = "TODO scan file not found: $TODO_FILE"
    $NEEDS_HUMAN = "NEEDS HUMAN: $FAILURE_REASON, at $TODAY"
    # Write NEEDS HUMAN signal to progress.md
    $NEEDS_HUMAN_ENTRY = "$TODAY | $NEEDS_HUMAN"
    $NEEDS_HUMAN_ENTRY >> $PROGRESS_FILE
    # Write failure reason to digest.log
    "$TODAY | Failure: $FAILURE_REASON" >> $LOGFILE
}

# Update progress.md (only if scan did not fail)
if (-not $FAILURE) {
    $PROGRESS_ENTRY >> $PROGRESS_FILE
    # Log to digest.log (only if scan succeeded)
    $RUN_TIMESTAMP = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    "$RUN_TIMESTAMP | Beat processed: $BEAT_NOTE" >> $LOGFILE
}

# Exit with non-zero exit code if scan failed
if ($FAILURE) {
    exit 1
}

exit 0