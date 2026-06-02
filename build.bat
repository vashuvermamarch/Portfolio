@echo off
echo ===================================================
echo Building Portfolio Frontend for Production
echo ===================================================

cd portfolio-frontend
call npm run build
cd ..

echo ===================================================
echo Build complete! The production files are in portfolio-frontend/dist/
echo ===================================================
pause
