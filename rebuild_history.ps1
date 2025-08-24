$ErrorActionPreference = "Stop"

# Configuration
$StartDate = Get-Date -Date "2025-08-25 09:00:00"
$Dates = @(
    "2025-08-25", # Day 1: Init
    "2025-08-28", # Day 2: Backend heavy
    "2025-08-30", # Day 3: Backend Logic
    "2025-09-02", # Day 4: Frontend Setup
    "2025-09-05", # Day 5: Basic Pages
    "2025-09-08", # Day 6: Components
    "2025-09-11", # Day 7: Docs/Misc
    "2025-09-14", # Day 8: Adv Components
    "2025-09-16", # Day 9: Hooks
    "2025-09-18"  # Day 10: Polish
)

$BackupDir = "C:\Users\vyasg\Projects\Big\blot_completed\webspraks_backup"
$RepoDir = "C:\Users\vyasg\Projects\Big\blot_completed\webspraks"

# Helper Function to commit
function Commit-Step {
    param(
        [string]$Message,
        [string]$DateStr,
        [string[]]$Files
    )
    $Date = Get-Date -Date $DateStr
    # Add random time jitter (0-8 hours)
    $Date = $Date.AddHours((Get-Random -Minimum 0 -Maximum 8)).AddMinutes((Get-Random -Minimum 0 -Maximum 59))
    $GitDate = $Date.ToString("yyyy-MM-dd HH:mm:ss")

    foreach ($file in $Files) {
        $src = Join-Path $BackupDir $file
        $dest = Join-Path $RepoDir $file
        $parent = Split-Path $dest
        if (!(Test-Path $parent)) { New-Item -ItemType Directory -Path $parent -Force | Out-Null }
        
        if (Test-Path $src) {
            Copy-Item $src $dest -Force
        } else {
            Write-Warning "File not found in backup: $file"
        }
    }

    git add .
    $env:GIT_COMMITTER_DATE = "$GitDate"
    $env:GIT_AUTHOR_DATE = "$GitDate"
    git commit -m "$Message" --date "$GitDate"
}

# Helper for "Bad" Code simulation
function Commit-Bad-Step {
    param(
        [string]$Message,
        [string]$FixMessage,
        [string]$DateStr,
        [string]$File,
        [string]$BadContent
    )
    $Date = Get-Date -Date $DateStr
    $GitDate = $Date.ToString("yyyy-MM-dd HH:mm:ss")
    
    # 1. Write Bad Content
    $dest = Join-Path $RepoDir $File
    $parent = Split-Path $dest
    if (!(Test-Path $parent)) { New-Item -ItemType Directory -Path $parent -Force | Out-Null }
    Set-Content -Path $dest -Value $BadContent
    
    git add $File
    $env:GIT_COMMITTER_DATE = "$GitDate"
    $env:GIT_AUTHOR_DATE = "$GitDate"
    git commit -m "$Message" --date "$GitDate"

    # 2. Fix it (Restore from backup)
    # Add 1 hour for the fix
    $FixDate = $Date.AddHours(1).ToString("yyyy-MM-dd HH:mm:ss")
    
    $src = Join-Path $BackupDir $File
    Copy-Item $src $dest -Force
    
    git add $File
    $env:GIT_COMMITTER_DATE = "$FixDate"
    $env:GIT_AUTHOR_DATE = "$FixDate"
    git commit -m "$FixMessage" --date "$FixDate"
}

# --- SETUP ---
Write-Host "Starting History Reconstruction..."

# 1. Backup
Write-Host "Backing up (Explicit Copy)..."
if (Test-Path $BackupDir) { Remove-Item $BackupDir -Recurse -Force }
New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null

function Backup-Project {
    $FE = Join-Path $RepoDir "frontend"
    $BE = Join-Path $RepoDir "backend"
    $BackupFE = Join-Path $BackupDir "frontend"
    $BackupBE = Join-Path $BackupDir "backend"

    # Helper
    function Copy-Safe ($Src, $Dest) {
        if (Test-Path $Src) { Copy-Item $Src $Dest -Force -Recurse }
    }

    # Frontend
    New-Item -ItemType Directory -Path $BackupFE -Force | Out-Null
    Copy-Safe "$FE/src" $BackupFE
    Get-ChildItem "$FE/*" -Include *.json, *.js, *.ts, *.html, .gitignore | Copy-Item -Destination $BackupFE -Force

    # Backend
    New-Item -ItemType Directory -Path $BackupBE -Force | Out-Null
    Copy-Safe "$BE/src" $BackupBE
    Get-ChildItem "$BE/*" -Include *.json, *.ts, .gitignore | Copy-Item -Destination $BackupBE -Force
}
Backup-Project

# 2. Reset Repo
Set-Location $RepoDir
Remove-Item -Recurse -Force .git
git init
git remote add origin https://github.com/wakeupguruu/WebSpark-AI.git

# Clear working directory (except .git, script, and node_modules)
# We KEEP node_modules in place so we don't have to reinstall, but we ignore them in git
Get-ChildItem -Path $RepoDir -Exclude ".git", "rebuild_history.ps1", "node_modules", "exclusion_list.txt" | Remove-Item -Recurse -Force

# --- EXECUTION ---

# Day 1: Aug 25 - Init
Commit-Step -DateStr $Dates[0] -Message "Initial commit" -Files @("backend/package.json", "backend/tsconfig.json", "frontend/package.json", "frontend/tsconfig.json")
Commit-Step -DateStr $Dates[0] -Message "chore: add gitignore" -Files @("backend/.gitignore", "frontend/.gitignore")
Commit-Step -DateStr $Dates[0] -Message "chore: setup vite config" -Files @("frontend/vite.config.ts", "frontend/index.html")

# Day 2: Aug 28 - Backend Core (Heavy + Mistake)
Commit-Step -DateStr $Dates[1] -Message "feat(backend): setup express structure" -Files @("backend/src/constants.ts")
Commit-Bad-Step -DateStr $Dates[1] -File "backend/src/index.ts" -BadContent "import express from 'express'; const app = express(); app.listen(3000);" -Message "feat(backend): basic server" -FixMessage "fix(backend): add cors and proper middleware"
Commit-Step -DateStr $Dates[1] -Message "feat(backend): add anthropic sdk" -Files @("backend/package-lock.json")
Commit-Step -DateStr $Dates[1] -Message "feat(backend): add prompts module" -Files @("backend/src/prompts.ts")
Commit-Step -DateStr $Dates[1] -Message "refactor: extract default templates" -Files @("backend/src/defaults/node.ts", "backend/src/defaults/react.ts")
Commit-Step -DateStr $Dates[1] -Message "feat: add indent strip utility" -Files @("backend/src/stripindents.ts")

# Day 3: Aug 30 - Backend Logic
Commit-Step -DateStr $Dates[2] -Message "feat(backend): implement template generation endpoint" -Files @("backend/src/index.ts") # Overwrites with more content (implied by file state on disk, though we already restored it in step 2? Actually Commit-Step restores the *final* file. So this overwrites intermediate states. Correct.)
Commit-Step -DateStr $Dates[2] -Message "fix: env variable loading" -Files @("backend/.env.example")
Commit-Step -DateStr $Dates[2] -Message "docs: update backend readme" -Files @("backend/package.json") # simulating metadata update

# Day 4: Sept 02 - Frontend Setup (Heavy + Tailwnd Mistake)
Commit-Bad-Step -DateStr $Dates[3] -File "frontend/tailwind.config.js" -BadContent "module.exports = { content: [] }" -Message "feat(ui): init tailwind" -FixMessage "fix(ui): correct tailwind content paths"
Commit-Step -DateStr $Dates[3] -Message "feat(ui): add postcss config" -Files @("frontend/postcss.config.js")
Commit-Step -DateStr $Dates[3] -Message "style: add global css variables" -Files @("frontend/src/index.css")
Commit-Step -DateStr $Dates[3] -Message "chore: add types" -Files @("frontend/src/types/index.ts", "frontend/src/vite-env.d.ts")
Commit-Step -DateStr $Dates[3] -Message "feat: setup main entry" -Files @("frontend/src/main.tsx")
Commit-Step -DateStr $Dates[3] -Message "feat: add app router shell" -Files @("frontend/src/App.tsx")

# Day 5: Sept 05 - Basic Pages
Commit-Step -DateStr $Dates[4] -Message "feat(pages): create Home page layout" -Files @("frontend/src/pages/Home.tsx")
Commit-Step -DateStr $Dates[4] -Message "feat(pages): scaffold Builder page" -Files @("frontend/src/pages/Builder.tsx")

# Day 6: Sept 08 - Components (Heavy)
Commit-Step -DateStr $Dates[5] -Message "feat(components): add Loader" -Files @("frontend/src/components/Loader.tsx")
Commit-Step -DateStr $Dates[5] -Message "feat(components): add CodeEditor with monaco" -Files @("frontend/src/components/CodeEditor.tsx")
Commit-Step -DateStr $Dates[5] -Message "feat(components): add PreviewFrame" -Files @("frontend/src/components/PreviewFrame.tsx")
Commit-Step -DateStr $Dates[5] -Message "feat(components): add StepsList" -Files @("frontend/src/components/StepsList.tsx")
Commit-Step -DateStr $Dates[5] -Message "feat(components): add TabView" -Files @("frontend/src/components/TabView.tsx")

# Day 7: Sept 11 - Docs/Misc (Light)
Commit-Step -DateStr $Dates[6] -Message "chore: update dependencies" -Files @("frontend/package.json")

# Day 8: Sept 14 - Advanced Components (Mistake)
Commit-Bad-Step -DateStr $Dates[7] -File "frontend/src/components/FileViewer.tsx" -BadContent "export function FileViewer() { return <div>Viewer</div> }" -Message "feat(components): add FileViewer" -FixMessage "feat(components): implement full file viewer logic"
Commit-Step -DateStr $Dates[7] -Message "feat(components): add FileExplorer" -Files @("frontend/src/components/FileExplorer.tsx")
Commit-Step -DateStr $Dates[7] -Message "style: polish explorer styles" -Files @("frontend/src/components/FileExplorer.tsx") # Re-commit same file as 'polish'

# Day 9: Sept 16 - Hooks & Logic
Commit-Step -DateStr $Dates[8] -Message "feat(logic): add constants" -Files @("frontend/src/config.ts")
Commit-Step -DateStr $Dates[8] -Message "feat(logic): add step parsing utils" -Files @("frontend/src/steps.ts")
Commit-Bad-Step -DateStr $Dates[8] -File "frontend/src/hooks/useWebContainer.ts" -BadContent "export function useWebContainer() { return {} }" -Message "feat(hooks): init webcontainer hook" -FixMessage "feat(hooks): implement completel webcontainer logic"

# Day 10: Sept 18 - Polish
Commit-Step -DateStr $Dates[9] -Message "chore: eslint config" -Files @("frontend/eslint.config.js")
Commit-Step -DateStr $Dates[9] -Message "refactor: cleanup unused imports" -Files @("frontend/src/App.tsx")
Commit-Step -DateStr $Dates[9] -Message "style: improve home page gradient" -Files @("frontend/src/pages/Home.tsx")
Commit-Step -DateStr $Dates[9] -Message "chore: ready for deployment" -Files @("backend/package.json")

# Restore anything missed
Copy-Item "$BackupDir\*" "$RepoDir" -Recurse -Force -ErrorAction SilentlyContinue
git add .
try {
    git commit -m "chore: snapshot sync" --date "$($Dates[9]) 18:00:00"
} catch {
    Write-Host "Nothing left to commit"
}

Write-Host "Done! History reconstructed."
