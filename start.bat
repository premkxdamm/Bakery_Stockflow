@echo off
title Bakery Items Inventory Management System
cls
echo ========================================================
echo   7M Hackathon - Bakery Items Inventory Management
echo ========================================================
echo.
echo [1/2] Starting Spring Boot Backend API (Port 8081)...
start "Bakery Backend (Spring Boot: 8081)" cmd /k "cd /d "%~dp0backend" && mvnw.cmd spring-boot:run"

echo [2/2] Starting React Vite Frontend (Port 5173)...
start "Bakery Frontend (React: 5173)" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo ========================================================
echo  Both services have been launched in dedicated windows!
echo.
echo  Frontend UI:   http://localhost:5173
echo  Backend Health: http://localhost:8081/api/health
echo  Backend Stats:  http://localhost:8081/api/dashboard/stats
echo.
echo  To stop the servers, simply close their command windows
echo  or double-click "stop.bat".
echo ========================================================
pause
