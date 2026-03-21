# ============================================================
# DevBridge Kerala — Auto Post on Startup
# Posts 5 CANDIDATE + 5 COMPANY per login. No templates.
# ============================================================
$ErrorActionPreference = "Stop"
$SiteDir  = $PSScriptRoot
$LivePath = Join-Path $SiteDir "posts.json"
$BankPath = Join-Path $SiteDir "posts_bank.json"
$LogPath  = Join-Path $SiteDir "auto_post_log.txt"

function Log($msg) { 
    $ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$ts  $msg" | Add-Content -Path $LogPath -Encoding UTF8 
    Write-Host "$ts  $msg"
}

Log "=== Auto-Post Started ==="
$today = (Get-Date).ToString("yyyy-MM-dd")

if (-not (Test-Path $BankPath)) {
    Log "ERROR: posts_bank.json not found."
    exit 1
}

$bank = Get-Content $BankPath -Raw -Encoding UTF8 | ConvertFrom-Json
$live = Get-Content $LivePath  -Raw -Encoding UTF8 | ConvertFrom-Json

# Select 10 Candidate and 10 Company posts (total 20 per startup batch)
$candidatePostsSelected = @($bank.candidate | Where-Object { $_.published -eq $false } | Select-Object -First 10)
$companyPostsSelected = @($bank.company | Where-Object { $_.published -eq $false } | Select-Object -First 10)

if ($candidatePostsSelected.Count -eq 0 -and $companyPostsSelected.Count -eq 0) {
    Log "WARN: Bank empty or all published. Ask Antigravity to refill."
    exit 0
}

$allToPost = $toPostC + $toPostCo
$nextId = if ($live.posts.Count -gt 0) { ($live.posts | Measure-Object -Property id -Maximum).Maximum + 1 } else { 1 }

foreach ($p in $allToPost) {
    # Mark as published in bank (memory)
    $p.published = $true
    
    # Create the live object
    $newPost = [PSCustomObject]@{
        id = $nextId++
        published = $true
        concept_hash = $p.concept_hash
        title = $p.title
        date = $today
        tags = $p.tags
        seo_keywords = $p.seo_keywords
        body = $p.body
    }
    
    $live.posts += $newPost
    Log "Posted [$($newPost.tags[0])]: $($newPost.title)"
}

# Update the bank with the published status
$bank | ConvertTo-Json -Depth 10 | Set-Content $BankPath -Encoding UTF8
$live | ConvertTo-Json -Depth 10 | Set-Content $LivePath -Encoding UTF8

# Git operations
Set-Location $SiteDir
$status = git status --porcelain
if ($status) {
    git add posts.json posts_bank.json
    git commit -m "auto-post ${today}: 5 candidate + 5 company"
    git push
    Log "SUCCESS: Deployed to live site."
} else {
    Log "No changes detected."
}

Log "=== Auto-Post Finished ==="
