@echo off
title Stop Bakery Inventory Servers
cls
echo Stopping servers on port 8081 and 5173...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8081 ^| findstr LISTENING') do (
    echo Stopping Backend process %%a...
    taskkill /F /PID %%a >nul 2>&1
)

for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5173 ^| findstr LISTENING') do (
    echo Stopping Frontend process %%a...
    taskkill /F /PID %%a >nul 2>&1
)

echo.
echo All Bakery servers stopped cleanly.
timeout /t 3
