@echo off
REM Quick launcher for keyword research on Windows

echo =========================================
echo Google Ads Keyword Research
echo =========================================
echo.

REM Check if virtual environment exists
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
    echo.
    echo Installing dependencies...
    call venv\Scripts\activate.bat
    pip install -r requirements.txt
) else (
    call venv\Scripts\activate.bat
)

echo.
echo Running keyword research...
echo.
python keyword_research.py

echo.
echo.
echo Running analysis...
echo.
python analyze_results.py

echo.
echo =========================================
echo Done! Check results/ directory for output
echo =========================================
pause
