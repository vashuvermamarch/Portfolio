@echo off
echo ===================================================
echo Starting Portfolio Development Servers
echo ===================================================

echo Starting Django Backend Server...
start "Django Backend" cmd /k "cd portfolio-backend && .\venv\Scripts\activate && python manage.py runserver"

echo Starting Vite Frontend Server...
start "Vite Frontend" cmd /k "cd portfolio-frontend && npm run dev"

echo.
echo Both servers are starting up in separate windows!
echo - Frontend will be at: http://localhost:5173
echo - Backend API will be at: http://localhost:8000
echo.
echo NOTE: Remember to add your Gmail App Password to settings.py!
echo ===================================================
pause
