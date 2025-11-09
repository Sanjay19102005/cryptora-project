@echo off
color 0A
echo ========================================
echo    CRYPTORA - Starting Servers
echo ========================================
echo.
echo Starting Backend Server (Port 5000)...
start "CRYPTORA Backend" cmd /k "cd /d E:\tnpolice\backend && set NODE_ENV=development && npm start"
timeout /t 5
echo.
echo Starting Frontend Server (Port 3000)...
start "CRYPTORA Frontend" cmd /k "cd /d E:\tnpolice && npm run dev"
echo.
echo ========================================
echo Both servers are starting!
echo ========================================
echo Backend API: http://localhost:5000/api/health
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause >nul

