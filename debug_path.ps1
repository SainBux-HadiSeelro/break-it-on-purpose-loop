$TODO_FILE = 'C:\Users\dell\Desktop\nonexistent\todos.txt'
Write-Output "Test-Path result: " + (Test-Path $TODO_FILE)
if (Test-Path $TODO_FILE) {
    Write-Output "File exists - would process TODOs"
} else {
    Write-Output "File does NOT exist - should trigger failure"
}