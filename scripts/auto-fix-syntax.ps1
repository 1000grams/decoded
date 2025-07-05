$excludeDirs = @('node_modules', 'build', 'public')

Get-ChildItem -Path . -Include *.js,*.jsx -Recurse | Where-Object {
    $fullPath = $_.FullName.ToLower()
    -not ($excludeDirs | ForEach-Object { $fullPath -like "*\$_\*" })
} | ForEach-Object {
    $filePath = $_.FullName
    $lines = Get-Content -Path $filePath

    # Fix "mport" typo and remove broken regex lines
    $fixedLines = $lines | ForEach-Object {
        if ($_ -match '^\s*mport\s') {
            $_ -replace '^\s*mport', 'import'
        } elseif ($_ -match '^\s*/\s*$') {
            # Remove lines that are just a slash
            $null
        } else {
            $_
        }
    }

    Set-Content -Path $filePath -Value $fixedLines
}

Write-Host "✔ Automated syntax fixes applied. Now run:"
Write-Host "  npx eslint . --fix"
Write-Host "  npm run build"