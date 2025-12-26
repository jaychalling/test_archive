import logging

# Basic logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class LocalDB:
    def __init__(self):
        # No external connection needed
        pass

    def get_all_tests(self):
        """Fetches active tests. Returns Mock data."""
        return [
            {'id': 'diabetes', 'title': 'Diabetes Risk', 'description': 'Analyze your health signs.', 'icon': '🩸'},
            {'id': 'reaction', 'title': 'Reaction Time', 'description': 'Test your visual reflexes.', 'icon': '⚡'},
            {'id': 'memory', 'title': 'Visual Memory', 'description': 'Remember the pattern.', 'icon': '🧩'},
            {'id': 'cognitive-brain', 'title': 'Cognitive Brain', 'description': 'Assess your cognitive functions.', 'icon': '🧠'}
        ]

    def get_test_data(self, test_id):
        """Fetches test metadata and ordered questions. Returns Mock data."""
        if test_id == 'diabetes':
            return {
                'info': {'id': 'diabetes', 'title': 'Diabetes Risk'},
                'questions': [
                    {'q': 'Age Group?', 'options': ['<40', '40-50', '50+'], 'scores': [0,1,2]},
                    {'q': 'Family History?', 'options': ['No', 'Yes'], 'scores': [0,5]}
                ]
            }
        
        if test_id == 'cognitive-brain':
            return {
                'info': {'id': 'cognitive-brain', 'title': 'Cognitive Brain'},
                'questions': [
                    {'q': 'How many hours did you sleep last night?', 'options': ['<5 hours', '5-7 hours', '7+ hours'], 'scores': [0, 5, 10]},
                    {'q': 'Can you focus on a task for more than 30 mins?', 'options': ['Rarely', 'Sometimes', 'Always'], 'scores': [0, 5, 10]},
                    {'q': 'Do you often forget where you put things?', 'options': ['Frequently', 'Occasionally', 'Rarely'], 'scores': [0, 5, 10]}
                ]
            }
        
        # Default/Fallback for others to avoid crash if clicked
        return {
            'info': {'id': test_id, 'title': f'{test_id.capitalize()} Test'},
            'questions': [
                {'q': 'Sample Question 1', 'options': ['Option A', 'Option B'], 'scores': [0, 1]}
            ]
        }

    def get_result(self, test_id, score):
        # MOCK FALLBACK
        return {'result_title': 'Analysis Complete', 'result_desc': 'This is a mocked result.', 'risk_level': 'Unknown'}

db = None
def init_db():
    global db
    db = LocalDB()
