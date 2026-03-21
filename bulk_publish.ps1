# bulk_publish.ps1 - Run once to publish 9 more candidates + 10 companies
$SiteDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$BankPath = Join-Path $SiteDir "posts_bank.json"
$LivePath  = Join-Path $SiteDir "posts.json"
$today = (Get-Date).ToString("yyyy-MM-dd")

$bank = Get-Content $BankPath -Raw -Encoding UTF8 | ConvertFrom-Json
$live = Get-Content $LivePath -Raw -Encoding UTF8 | ConvertFrom-Json

$unpubCandidate = $bank.posts | Where-Object { $_.published -eq $false -and $_.tags -contains "Candidate" }
$unpubCompany   = $bank.posts | Where-Object { $_.published -eq $false -and $_.tags -contains "Company" }

Write-Host "Unpublished -> Candidate: $($unpubCandidate.Count)  Company: $($unpubCompany.Count)"

$toPublish = @($unpubCandidate | Select-Object -First 9) + @($unpubCompany | Select-Object -First 10)

Write-Host "Publishing $($toPublish.Count) posts..."

foreach ($post in $toPublish) {
    foreach ($p in $bank.posts) {
        if ($p.id -eq $post.id) { $p.published = $true; $p.date = $today; break }
    }
    $post.published = $true
    $post.date = $today
    $live.posts += $post
    Write-Host "  + [$($post.tags[0])] #$($post.id) $($post.title.Substring(0, [Math]::Min(55,$post.title.Length)))"
}

$bank | ConvertTo-Json -Depth 10 | Set-Content $BankPath -Encoding UTF8
$live | ConvertTo-Json -Depth 10 | Set-Content $LivePath -Encoding UTF8
Write-Host "Done. Total live posts: $($live.posts.Count)"
