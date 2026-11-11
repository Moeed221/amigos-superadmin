@echo off
setlocal
cd /d "%~dp0"
echo =============================================================
echo Uploading ONLY to ahmadwaseembutt2005-eng/amigos-superadmin
 echo =============================================================
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0PUBLISH_TO_GITHUB.ps1"
if errorlevel 1 (
  echo.
  echo ERROR: Upload did not complete. Please share the message above.
) else (
  echo.
  echo SUCCESS: Files uploaded to the new amigos-superadmin repository.
)
echo.
pause
