# Upload ONLY to the explicitly approved new Amigos repository.
# No existing GitHub repositories or Render services are read or modified by this script.
$ErrorActionPreference = 'Stop'
$target = 'https://github.com/ahmadwaseembutt2005-eng/amigos-superadmin.git'
Set-Location -LiteralPath $PSScriptRoot

function Require-GitSuccess([string]$explanation) {
    if ($LASTEXITCODE -ne 0) { throw "$explanation (git exit code $LASTEXITCODE)." }
}

if (-not (Test-Path -LiteralPath '.\package.json')) {
    throw 'package.json is missing. Extract the ZIP fully and run UPLOAD_TO_GITHUB.cmd from the extracted folder.'
}
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    throw 'Git for Windows is not installed or is not on PATH: https://git-scm.com/download/win'
}

if (-not (Test-Path -LiteralPath '.git')) {
    & git init
    Require-GitSuccess 'Unable to initialize local Git repository'
}
# Verify that this folder, and not any existing parent repository, is the working root.
$existingRoot = & git rev-parse --show-toplevel
Require-GitSuccess 'Unable to confirm local repository root'
$current = [System.IO.Path]::GetFullPath((Get-Location).Path).TrimEnd('\', '/')
$root = [System.IO.Path]::GetFullPath(($existingRoot | Select-Object -First 1)).TrimEnd('\', '/')
if ($root -ne $current) { throw "Refusing to work inside another repository: $root" }

# Use 'git remote' rather than 'git remote get-url origin': the latter prints a
# PowerShell native error for missing remotes and broke the earlier launcher.
$remotes = @(& git remote)
Require-GitSuccess 'Unable to list remotes'
if ($remotes -contains 'origin') {
    $origin = (& git remote get-url origin | Select-Object -First 1).Trim()
    Require-GitSuccess 'Unable to read origin'
    if ($origin -ne $target -and $origin -ne 'https://github.com/ahmadwaseembutt2005-eng/amigos-superadmin') {
        throw "Safety stop: 'origin' points somewhere else ($origin). Nothing has been pushed."
    }
} else {
    & git remote add origin $target
    Require-GitSuccess 'Unable to connect to approved GitHub repository'
}

& git branch -M main
Require-GitSuccess 'Unable to select main branch'
& git add --all
Require-GitSuccess 'Unable to stage files'

& git diff --cached --quiet
if ($LASTEXITCODE -eq 1) {
    & git commit -m 'Add Amigos Mexican Grill V2 demo site and Render config'
    Require-GitSuccess 'Commit failed. Set Git user.name and user.email and retry'
} elseif ($LASTEXITCODE -ne 0) {
    throw "Unable to check staged files (git exit code $LASTEXITCODE)."
}

Write-Host "Pushing ONLY to $target" -ForegroundColor Cyan
& git push -u origin main
Require-GitSuccess 'Push failed. Sign in to GitHub as an account with write access to amigos-superadmin and retry'
Write-Host 'SUCCESS: Amigos V2 source uploaded to the NEW amigos-superadmin repository.' -ForegroundColor Green
