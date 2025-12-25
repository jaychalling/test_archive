import os
from supabase import create_client, Client
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class SupabaseDB:
    def __init__(self):
        url: str = os.getenv("SUPABASE_URL")
        key: str = os.getenv("SUPABASE_KEY")
        
        # Fallback for dev without keys or partial setup
        self.supabase = None
        if url and key and "your_" not in url:
            try:
                self.supabase = create_client(url, key)
            except Exception as e:
                logger.error(f"Supabase init invalid: {e}")

    def get_all_tests(self):
        """Fetches active tests. Returns Mock if DB fails or empty."""
        try:
            if self.supabase:
                response = self.supabase.table('tests')\
                    .select('*')\
                    .eq('is_active', True)\
                    .execute()
                
                # Icon Fallback Logic
                data = response.data
                for item in data:
                    if 'icon' not in item or not item['icon']:
                        # Assign default icon based on id/title simply for demo
                        if 'diabetes' in item['id']: item['icon'] = '🩸'
                        elif 'brain' in item['id']: item['icon'] = '⚡'
                        else: item['icon'] = '📝' 
                return data
        except Exception as e:
            logger.error(f"Error fetching existing tests: {e}")
        
        # MOCK FALLBACK (If DB is empty or fails)
        return [
            {'id': 'diabetes', 'title': 'Diabetes Risk', 'description': 'Analyze your health signs.', 'icon': '🩸'},
            {'id': 'reaction', 'title': 'Reaction Time', 'description': 'Test your visual reflexes.', 'icon': '⚡'},
            {'id': 'memory', 'title': 'Visual Memory', 'description': 'Remember the pattern.', 'icon': '🧩'}
        ]

    def get_test_data(self, test_id):
        """Fetches test metadata and ordered questions. Returns Mock if fails."""
        try:
            if self.supabase:
                # 1. Get Test Info
                test_response = self.supabase.table('tests').select('*').eq('id', test_id).single().execute()
                if not test_response.data: return None
                
                # 2. Get Questions
                q_response = self.supabase.table('questions').select('*').eq('test_id', test_id).order('q_order').execute()
                
                mapped_questions = []
                for item in q_response.data:
                    mapped_questions.append({
                        'q': item['question_text'],
                        'options': item['options'],
                        'scores': item['scores']
                    })
                return {'info': test_response.data, 'questions': mapped_questions}
        except Exception as e:
            logger.error(f"Error fetching details: {e}")
            
        # MOCK FALLBACK (Minimal for verification)
        if test_id == 'diabetes':
            return {
                'info': {'id': 'diabetes', 'title': 'Diabetes Risk'},
                'questions': [
                    {'q': 'Age Group?', 'options': ['<40', '40-50', '50+'], 'scores': [0,1,2]},
                    {'q': 'Family History?', 'options': ['No', 'Yes'], 'scores': [0,5]}
                ]
            }
        return None

    def get_result(self, test_id, score):
        try:
            if self.supabase:
                score = int(score)
                response = self.supabase.table('results')\
                    .select('*')\
                    .eq('test_id', test_id)\
                    .lte('min_score', score)\
                    .gte('max_score', score)\
                    .single()\
                    .execute()
                return response.data
        except Exception as e:
            logger.error(f"Error result: {e}")
        
        # MOCK FALLBACK
        return {'result_title': 'Analysis Complete', 'result_desc': 'This is a mocked result.', 'risk_level': 'Unknown'}

db = None
def init_db():
    global db
    db = SupabaseDB()
