import os
import sys

# Add the current directory to the path so we can import services
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.append(current_dir)

from flask import Flask, request, jsonify, abort
from services.db_supabase import init_db, db as database_client
import services.db_supabase # For re-accessing the global variable
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Enable CORS for frontend requests

# Initialize DB
init_db()

# DB Getter helper to handle the global variable access
def get_db():
    return services.db_supabase.db

# API Route: Get All Tests
@app.route('/api/tests', methods=['GET'])
def get_tests():
    db = get_db()
    if not db: return jsonify({"error": "Database Connection Error"}), 500
    
    tests = db.get_all_tests()
    return jsonify(tests)

# API Route: Get Test Details (Info + Questions)
@app.route('/api/tests/<test_id>', methods=['GET'])
def get_test_details(test_id):
    db = get_db()
    if not db: return jsonify({"error": "Database Connection Error"}), 500

    data = db.get_test_data(test_id)
    if not data:
        return jsonify({"error": "Test not found"}), 404

    return jsonify(data)

# API Route: Get Result
@app.route('/api/result/<test_id>', methods=['GET'])
def get_result(test_id):
    db = get_db()
    if not db: return jsonify({"error": "Database Connection Error"}), 500

    score = request.args.get('score')
    if score is None:
        return jsonify({"error": "Score is missing"}), 400
    
    # Get Result Content
    result_data = db.get_result(test_id, score)
    
    if not result_data:
        return jsonify({"error": "Result not found"}), 404
        
    return jsonify(result_data)

# Health Check
@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "message": "Backend API is running"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
