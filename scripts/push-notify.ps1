# git push + Windows toast (K). Includes own pushes.
param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]]$GitPushArgs
)

if ($GitPushArgs.Count -eq 0) {
  $GitPushArgs = @('origin', 'main')
}

git push @GitPushArgs
$exit = $LASTEXITCODE

if ($exit -eq 0) {
  $target = $GitPushArgs -join ' '
  Add-Type -AssemblyName System.Windows.Forms
  $icon = New-Object System.Windows.Forms.NotifyIcon
  $icon.Icon = [System.Drawing.SystemIcons]::Information
  $icon.Visible = $true
  $icon.ShowBalloonTip(
    5000,
    'Git push done',
    "Pushed: $target",
    [System.Windows.Forms.ToolTipIcon]::Info
  )
  Start-Sleep -Seconds 3
  $icon.Dispose()
}

exit $exit
