# Rebuilds published_hashes.json from all existing live posts
$SiteDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$LivePath = Join-Path $SiteDir "posts.json"
$HashPath = Join-Path $SiteDir "published_hashes.json"
$live = Get-Content $LivePath -Raw -Encoding UTF8 | ConvertFrom-Json
$hashes = @($live.posts | ForEach-Object { $_.concept_hash } | Where-Object { $_ } | Sort-Object -Unique)
Write-Host "Rebuilding hash registry from $($live.posts.Count) live posts..."
Write-Host "Unique hashes found: $($hashes.Count)"
$obj = [PSCustomObject]@{ hashes = $hashes }
$obj | ConvertTo-Json -Depth 5 | Set-Content $HashPath -Encoding UTF8
Write-Host "Done. Hash registry rebuilt."
