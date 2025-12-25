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
            {
                'id': 'diabetes',
                'title': 'Type 2 Diabetes Risk Test',
                'description': 'Assess your risk factors for Type 2 Diabetes based on lifestyle and family history.',
                'category': 'Health',
                'duration': '3 min',
                'participants': '1.2k',
                'isFeatured': False,
                'image': 'bg-blue-600',
                'icon': '🩸'
            },
            {
                'id': 'cognitive-brain',
                'title': 'Cognitive Brain Test',
                'description': '전두엽, 측두엽, 두정엽의 기능을 20가지 정밀 문항으로 분석하여 뇌 건강 나이를 측정합니다.',
                'category': 'Health',
                'duration': '10 min',
                'participants': 'New',
                'isFeatured': True,
                'image': 'bg-indigo-700',
                'icon': '⚡'
            },
            {
                'id': 'kpop-hunter',
                'title': 'K-Pop Hunter Character Test',
                'description': 'Find your soul character among the legendary Demon Hunters! Based on your personality and choices.',
                'category': 'Fun',
                'duration': '5 min',
                'participants': '15.4k',
                'isFeatured': False,
                'image': 'bg-pink-600',
                'icon': '📝'
            }
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
                        'id': item.get('id'), # Assuming DB has ID
                        'text': item['question_text'],
                        'type': item.get('type', 'general'),
                        'weight': item.get('weight', 1.0),
                        'options': item.get('options_json', []) # Assuming new DB structure stores full options JSON
                    })
                    # Fallback if DB structure is old
                    if not item.get('options_json'):
                        # Convert old format to new format if needed, but for now assuming new mock structure
                        pass

                return {'info': test_response.data, 'questions': mapped_questions}
        except Exception as e:
            logger.error(f"Error fetching details: {e}")
            
        # MOCK FALLBACK (Minimal for verification)
        if test_id == 'diabetes':
            return {
                'info': {'id': 'diabetes', 'title': 'Type 2 Diabetes Risk Test'},
                'questions': [
                    {
                        "id": 1,
                        "text": "Do you feel thirsty even after drinking water recently?",
                        "type": "symptom",
                        "weight": 1.5,
                        "options": [
                            { "label": "No", "score": 0 },
                            { "label": "Sometimes", "score": 2 },
                            { "label": "Often", "score": 3 },
                            { "label": "Always thirsty", "score": 5 }
                        ]
                    },
                    {
                        "id": 2,
                        "text": "Do you urinate frequently (more than 8 times a day) or wake up at night to use the bathroom?",
                        "type": "symptom",
                        "weight": 1.5,
                        "options": [
                            { "label": "No", "score": 0 },
                            { "label": "Slightly increased", "score": 2 },
                            { "label": "Frequently", "score": 3 },
                            { "label": "Wake up at night", "score": 5 }
                        ]
                    },
                    {
                        "id": 3,
                        "text": "Do you experience uncontrollable drowsiness or fatigue after meals?",
                        "type": "habit",
                        "weight": 1.2,
                        "options": [
                            { "label": "No", "score": 0 },
                            { "label": "Occasionally", "score": 2 },
                            { "label": "Frequently", "score": 3 },
                            { "label": "Every meal", "score": 4 }
                        ]
                    },
                    {
                        "id": 4,
                        "text": "Have you experienced rapid weight loss without any specific diet?",
                        "type": "symptom",
                        "weight": 2.0,
                        "options": [
                            { "label": "No change", "score": 0 },
                            { "label": "Slight decrease", "score": 2 },
                            { "label": "Noticeable decrease", "score": 4 },
                            { "label": "Rapid loss", "score": 5 }
                        ]
                    },
                    {
                        "id": 5,
                        "text": "Has anyone in your immediate family (parents, siblings) been diagnosed with diabetes?",
                        "type": "genetic",
                        "weight": 2.0,
                        "options": [
                            { "label": "No", "score": 0 },
                            { "label": "Not sure", "score": 1 },
                            { "label": "Yes (1 person)", "score": 3 },
                            { "label": "Yes (2 or more)", "score": 5 }
                        ]
                    },
                    {
                        "id": 6,
                        "text": "Is your diet mainly composed of refined carbohydrates (white rice, noodles, bread)?",
                        "type": "habit",
                        "weight": 1.2,
                        "options": [
                            { "label": "Whole grains mostly", "score": 0 },
                            { "label": "Mixed", "score": 2 },
                            { "label": "High carbs (5+ times/week)", "score": 4 },
                            { "label": "Almost every meal", "score": 5 }
                        ]
                    },
                    {
                        "id": 7,
                        "text": "Do wounds or cuts take longer to heal than before?",
                        "type": "symptom",
                        "weight": 1.5,
                        "options": [
                            { "label": "Normal healing", "score": 0 },
                            { "label": "Slightly slower", "score": 2 },
                            { "label": "Noticeably slower", "score": 3 },
                            { "label": "Rarely heal", "score": 5 }
                        ]
                    },
                    {
                        "id": 8,
                        "text": "Is your average sleep duration less than 6 hours or irregular?",
                        "type": "stress",
                        "weight": 1.0,
                        "options": [
                            { "label": "Regular sleep", "score": 0 },
                            { "label": "Sometimes irregular", "score": 2 },
                            { "label": "Often irregular", "score": 3 },
                            { "label": "Severe lack of sleep", "score": 4 }
                        ]
                    },
                    {
                        "id": 9,
                        "text": "Do you feel numbness or tingling in your hands or feet?",
                        "type": "symptom",
                        "weight": 1.8,
                        "options": [
                            { "label": "No", "score": 0 },
                            { "label": "Occasionally", "score": 2 },
                            { "label": "Frequently", "score": 3 },
                            { "label": "Daily", "score": 5 }
                        ]
                    },
                    {
                        "id": 10,
                        "text": "Do you consider yourself to have abdominal obesity (visceral fat)?",
                        "type": "habit",
                        "weight": 1.5,
                        "options": [
                            { "label": "No", "score": 0 },
                            { "label": "A little", "score": 2 },
                            { "label": "Yes", "score": 3 },
                            { "label": "Significantly", "score": 5 }
                        ]
                    },
                    {
                        "id": 11,
                        "text": "Have you noticed your vision becoming blurry or dim recently?",
                        "type": "symptom",
                        "weight": 1.2,
                        "options": [
                            { "label": "No", "score": 0 },
                            { "label": "Sometimes", "score": 2 },
                            { "label": "Often", "score": 3 },
                            { "label": "Persistent", "score": 5 }
                        ]
                    },
                    {
                        "id": 12,
                        "text": "How often do you engage in exercise that makes you sweat for at least 30 minutes?",
                        "type": "habit",
                        "weight": 1.0,
                        "options": [
                            { "label": "3+ times/week", "score": 0 },
                            { "label": "1-2 times/week", "score": 2 },
                            { "label": "Rarely", "score": 4 },
                            { "label": "Never", "score": 5 }
                        ]
                    },
                    {
                        "id": 13,
                        "text": "Do you feel hungry again shortly after eating, or crave sweets?",
                        "type": "habit",
                        "weight": 1.2,
                        "options": [
                            { "label": "No", "score": 0 },
                            { "label": "Sometimes", "score": 2 },
                            { "label": "Often", "score": 3 },
                            { "label": "Always", "score": 4 }
                        ]
                    },
                    {
                        "id": 14,
                        "text": "Are you taking medication for hypertension (high blood pressure) or hyperlipidemia?",
                        "type": "genetic",
                        "weight": 1.5,
                        "options": [
                            { "label": "No", "score": 0 },
                            { "label": "Borderline", "score": 2 },
                            { "label": "Yes (One)", "score": 3 },
                            { "label": "Yes (Both)", "score": 5 }
                        ]
                    },
                    {
                        "id": 15,
                        "text": "Are you currently experiencing extreme stress or fatigue?",
                        "type": "stress",
                        "weight": 1.0,
                        "options": [
                            { "label": "Manageable", "score": 0 },
                            { "label": "Sometimes", "score": 1 },
                            { "label": "Often", "score": 3 },
                            { "label": "Always", "score": 4 }
                        ]
                    },
                    {
                        "id": 16,
                        "text": "How often do you eat late-night snacks (after 10 PM)?",
                        "type": "habit",
                        "weight": 1.2,
                        "options": [
                            { "label": "Never", "score": 0 },
                            { "label": "Once a week", "score": 2 },
                            { "label": "2-3 times/week", "score": 3 },
                            { "label": "Almost daily", "score": 5 }
                        ]
                    },
                    {
                        "id": 17,
                        "text": "How often do you consume alcohol?",
                        "type": "habit",
                        "weight": 1.0,
                        "options": [
                            { "label": "None", "score": 0 },
                            { "label": "1-2 times/month", "score": 1 },
                            { "label": "1-2 times/week", "score": 2 },
                            { "label": "3+ times/week", "score": 4 }
        ]
                    },
                    {
                        "id": 18,
                        "text": "Do you suffer from chronic lethargy or full-body fatigue?",
                        "type": "stress",
                        "weight": 1.0,
                        "options": [
                            { "label": "No", "score": 0 },
                            { "label": "Sometimes", "score": 2 },
                            { "label": "Often", "score": 3 },
                            { "label": "Always", "score": 4 }
                        ]
                    },
                    {
                        "id": 19,
                        "text": "Do you have dry skin or itchiness?",
                        "type": "symptom",
                        "weight": 1.0,
                        "options": [
                            { "label": "No", "score": 0 },
                            { "label": "Sometimes", "score": 1 },
                            { "label": "Often", "score": 2 },
                            { "label": "Severe", "score": 3 }
                        ]
                    },
                    {
                        "id": 20,
                        "text": "What is your age group?",
                        "type": "genetic",
                        "weight": 1.0,
                        "options": [
                            { "label": "Under 30", "score": 0 },
                            { "label": "40s", "score": 2 },
                            { "label": "50s", "score": 3 },
                            { "label": "Over 60", "score": 4 }
                        ]
                    }
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
