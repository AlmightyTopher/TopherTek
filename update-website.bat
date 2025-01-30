@echo off
cd /d "C:\Users\dogma\OneDrive\Documents\Website"

echo ===================================
echo   🔄 Auto-Updating Website (GitHub)
echo ===================================

:: Pull latest changes from GitHub to prevent merge conflicts
echo Pulling latest updates from GitHub...
git pull origin main
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ ERROR: Git pull failed. Check your network or repo access.
    pause
    exit /b %ERRORLEVEL%
)

:: Add all changes and commit
echo Adding and committing changes...
git add .
git commit -m "Auto-update website"

:: Push changes to GitHub
echo Pushing changes to GitHub...
git push origin main
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ ERROR: Git push failed. Check your GitHub authentication.
    pause
    exit /b %ERRORLEVEL%
)

echo ===================================
echo   ⏳ Waiting for Cloudflare Deployment
echo ===================================
timeout /t 10 >nul

:: Clear browser cache (for Chrome & Edge)
echo Clearing browser cache...
RunDll32.exe InetCpl.cpl,ClearMyTracksByProcess 8
ipconfig /flushdns

:: Open website in browser
echo Opening website...
start "" "https://tophertek.pages.dev"

:: Open Cloudflare Pages dashboard
echo Opening Cloudflare dashboard...
start "" "https://dash.cloudflare.com/"

:: Open GitHub repository
echo Opening GitHub repository...
start "" "https://github.com/AlmightyTopher/TopherTek"

:: Play notification sound
echo 
echo ===================================
echo   ✅ Website Updated Successfully!
echo ===================================
pause
exit
