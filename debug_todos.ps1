$TODO_FILE = 'C:\Users\dell\Desktop\programming files\loop engineering projects\7_break-it-on-purpose\todos.txt'
$content = Get-Content $TODO_FILE
Write-Output 'Lines:'
foreach ($line in $content) {
    Write-Output $line
}
$todoCount = ($content | Where-Object { $_ -match '^TODO:' }).Count
$newTodos = ($content | Where-Object { $_ -match '^TODO: NEW:' }).Count
Write-Output 'TODO_COUNT: ' + $todoCount
Write-Output 'NEW_TODOS: ' + $newTodos