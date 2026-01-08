#!/bin/bash
# Quick launcher for keyword research on Linux/Mac

echo "========================================="
echo "Google Ads Keyword Research"
echo "========================================="
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
    echo ""
    echo "Installing dependencies..."
    source venv/bin/activate
    pip install -r requirements.txt
else
    source venv/bin/activate
fi

echo ""
echo "Running keyword research..."
echo ""
python keyword_research.py

echo ""
echo ""
echo "Running analysis..."
echo ""
python analyze_results.py

echo ""
echo "========================================="
echo "Done! Check results/ directory for output"
echo "========================================="
