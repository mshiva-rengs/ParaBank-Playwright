<#
.SYNOPSIS
Opens the Parabank demo page in the default or a specified browser.

.DESCRIPTION
This small helper script opens https://parabank.parasoft.com/parabank/index.htm.
By default it launches the system default browser. You can optionally force
Chrome, Firefox or Edge if they are installed. If the requested browser
isn't found the script falls back to the system default.

USAGE
.
  # Open in default browser
  .\open-parabank.ps1

  # Open explicitly in Chrome
  .\open-parabank.ps1 -Browser Chrome

  # Open a different URL
  .\open-parabank.ps1 -Url 'https://example.com'
#>

[CmdletBinding()]
param(
    [string]
    $Url = 'https://parabank.parasoft.com/parabank/index.htm',

    [ValidateSet('Default','Chrome','Firefox','Edge')]
    [string]
    $Browser = 'Default'
)

function Get-BrowserPath {
    param([string]$name, [string[]]$fallbackPaths)
    # Try to find the executable on PATH first
    $cmd = Get-Command $name -ErrorAction SilentlyContinue
    if ($cmd) { return $cmd.Source }

    foreach ($p in $fallbackPaths) {
        if (Test-Path $p) { return $p }
    }
    return $null
}

switch ($Browser) {
    'Chrome' {
        $path = Get-BrowserPath -name 'chrome' -fallbackPaths @(
            "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
            "$env:ProgramFiles(x86)\Google\Chrome\Application\chrome.exe"
        )
        break
    }
    'Firefox' {
        $path = Get-BrowserPath -name 'firefox' -fallbackPaths @(
            "$env:ProgramFiles\Mozilla Firefox\firefox.exe",
            "$env:ProgramFiles(x86)\Mozilla Firefox\firefox.exe"
        )
        break
    }
    'Edge' {
        $path = Get-BrowserPath -name 'msedge' -fallbackPaths @(
            "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
            "$env:ProgramFiles(x86)\Microsoft\Edge\Application\msedge.exe"
        )
        break
    }
    Default {
        $path = $null
    }
}

if ($path) {
    Write-Verbose "Launching browser: $path with URL: $Url"
    try {
        Start-Process -FilePath $path -ArgumentList $Url -ErrorAction Stop
        return
    }
    catch {
        Write-Warning "Failed to start browser at '$path' — falling back to default. ($_ )"
    }
}

# Fallback: open with system default handler
Write-Verbose "Opening URL with system default handler: $Url"
Start-Process -FilePath $Url
