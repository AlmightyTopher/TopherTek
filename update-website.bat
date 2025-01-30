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
timeout /t 15 >nul

:: Open website and auto-refresh in the default browser
echo Opening updated website...
start "" "https://tophertek.pages.dev"

:: OPTIONAL: Open Cloudflare Pages dashboard to monitor the deployment
echo Opening Cloudflare dashboard...
start "" "https://dash.cloudflare.com/"

:: OPTIONAL: Open GitHub repository to verify updates
echo Opening GitHub repository...
start "" "https://github.com/AlmightyTopher/TopherTek"

:: Play notification sound to alert you that it's done
echo 
echo ===================================
echo   ✅ Website Updated Successfully!
echo ===================================
pause
exit
