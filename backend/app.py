import os
import sys

# Add the current directory to the path so we can import services
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.append(current_dir)

from flask import Flask, render_template, request, jsonify, abort
from services.db_supabase import init_db, db as database_client
import services.db_supabase # For re-accessing the global variable

app = Flask(__name__)

# Initialize DB
init_db()

# DB Getter helper to handle the global variable access
def get_db():
    return services.db_supabase.db

# Route: Main Lobby
@app.route('/')
def main():
    db = get_db()
    if not db: return "Database Connection Error", 500
    
    tests = db.get_all_tests()
    return render_template('main.html', tests=tests)

# Route: Quiz Page (SPA)
@app.route('/test/<test_id>')
def test_page(test_id):
    db = get_db()
    if not db: return "Database Connection Error", 500

    data = db.get_test_data(test_id)
    if not data:
        abort(404)
    # Passed as separate variables to template
    return render_template('test.html', 
                         test_info=data['info'], 
                         questions=data['questions'])

# Route: Result Page
@app.route('/result/<test_id>')
def result(test_id):
    db = get_db()
    if not db: return "Database Connection Error", 500

    score = request.args.get('score')
    if score is None:
        return "Score is missing", 400
    
    # Get Result Content
    result_data = db.get_result(test_id, score)
    
    # Get Test Info for Headers (Reuse get_test_data efficient fetch if possible, or simple fetch)
    # Ideally we just need title, so re-fetching test_data is okay or we could optimize
    test_data = db.get_test_data(test_id) 
    
    if not result_data or not test_data:
        return "Result not found", 404
        
    return render_template('result.html', result=result_data, test=test_data['info'])

if __name__ == '__main__':
    app.run(debug=True, port=5000)
