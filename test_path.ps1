$TODO_FILE = 'C:\Users\dell\Desktop\nonexistent\todos.txt'
$result = Test-Path $TODO_FILE
Write-Output "Test-Path result: $result"
if (-not $result) {
    Write-Output "File does not exist - failure should be triggered"
}