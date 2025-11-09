@echo off
echo Starting CRYPTORA Backend Server...
start cmd /k "cd backend && npm run dev"
timeout /t 3
echo Starting CRYPTORA Frontend Server...
start cmd /k "npm run dev"
echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause >nul

