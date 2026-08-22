$BASE_DIR = "C:\Users\dell\Desktop\programming files\loop engineering projects\7_break-it-on-purpose"
$LOGFILE = Join-Path $BASE_DIR "digest.log"
$PROGRESS_FILE = Join-Path $BASE_DIR "progress.md"
$COST_LOG = Join-Path $BASE_DIR "cost_log.md"
$TODO_FILE = Join-Path $BASE_DIR "todos.txt"

if (-not (Test-Path $BASE_DIR)) { New-Item -ItemType Directory -Path $BASE_DIR -Force | Out-Null }

" " >> $LOGFILE
" " >> $PROGRESS_FILE
" " >> $COST_LOG
" " >> $TODO_FILE

$TODAY = (Get-Date).ToString("yyyy-MM-dd")
$PROGRESS_ENTRY = "$TODAY | digest running"

if (Test-Path $TODO_FILE) {
    $TODO_COUNT = (@("`n" + (Get-Content $TODO_FILE)) | Where-Object { $_ -match "^TODO:" }).Count
    $NEW_TODOS = (@("`n" + (Get-Content $TODO_FILE)) | Where-Object { $_ -match "^TODO: NEW:" }).Count
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

$COST_LINE1 = "- **Run**: $RUN_TIMESTAMP"
$COST_LINE2 = "- **Tokens read (est.)**: ~" + [int]($READ_CHARS / 4)
$COST_LINE3 = "- **Tokens written (est.)**: ~" + [int]($WRITE_CHARS / 4)
$COST_LINE4 = "- **Beat note**: $BEAT_NOTE"

$COST_LINE1 >> $COST_LOG
$COST_LINE2 >> $COST_LOG
$COST_LINE3 >> $COST_LOG
$COST_LINE4 >> $COST_LOG
"" >> $COST_LOG

$PROGRESS_ENTRY >> $PROGRESS_FILE

"$RUN_TIMESTAMP | Beat processed: $BEAT_NOTE" >> $LOGFILE