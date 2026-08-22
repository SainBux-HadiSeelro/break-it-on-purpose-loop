$BASE_DIR = "C:\Users\dell\Desktop\programming files\loop engineering projects\7_break-it-on-purpose"
$LOGFILE = Join-Path $BASE_DIR "digest.log"
$PROGRESS_FILE = Join-Path $BASE_DIR "progress.md"
$COST_LOG = Join-Path $BASE_DIR "cost_log.md"
$TODO_FILE = Join-Path $BASE_DIR "todos.txt"

if (-not (Test-Path $BASE_DIR)) { New-Item -ItemType Directory -Path $BASE_DIR -Force | Out-Null }

"" >> $LOGFILE
"" >> $PROGRESS_FILE
"" >> $COST_LOG
"" >> $TODO_FILE

$TODAY = (Get-Date).ToString("yyyy-MM-dd")
$PROGRESS_ENTRY = $TODAY + " | digest running"

$content = Get-Content $TODO_FILE
if ($content -ne $null -and $content.Count -gt 0) {
    $TODO_COUNT = ($content | Where-Object { $_ -match '^TODO:' }).Count
    $NEW_TODOS = ($content | Where-Object { $_ -match '^TODO: NEW:' }).Count
} else {
    $TODO_COUNT = 0
    $NEW_TODOS = 0
}

$BEAT_NOTE = "$NEW_TODOS new TODOs found"

if (Test-Path $TODO_FILE) {
    $LINES = Get-Content $TODO_FILE -Encoding Unicode
    $FILE_CHARS = ($LINES | Measure-Object -Character).Total
    $READ_CHARS = $FILE_CHARS
} else {
    $READ_CHARS = 0
}
$WRITE_CHARS = $NEW_TODOS + 100

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

$PROGRESS_ENTRY >> $PROGRESS_FILE

$RUN_TIMESTAMP + " | Beat processed: " + $BEAT_NOTE >> $LOGFILE