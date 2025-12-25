import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class MockDB:
    def __init__(self):
        # Mock Data Structure simulating Google Sheets
        self.data = {
            'Tests': {
                'diabetes': {
                    'id': 'diabetes',
                    'title': '내 몸이 보내는 신호, 당뇨 위험도 정밀 진단',
                    'subtitle': '2025년형 정밀 분석',
                    'description': '단순 점수 계산이 아닙니다.\n증상, 식습관, 유전 요인을 종합 분석하여\n당신의 \'위험 유형\'을 찾아드립니다.',
                    'features': [
                        '병원 기록 없는 100% 익명 테스트',
                        '총 20문항의 병리학적 알고리즘 적용',
                        '유형별 맞춤 관리 솔루션 무료 제공'
                    ],
                    'category': 'Health',
                    'active': True,
                    'theme_color': '#2563eb'
                },
                'stress': {
                    'id': 'stress',
                    'title': '직장인 번아웃/스트레스 진단',
                    'subtitle': '마음 건강 체크',
                    'description': '최근 무기력하거나 지치셨나요?\n간단한 자가진단으로 현재 스트레스 수준을\n확인해보세요.',
                    'features': [
                        '심리학 기반의 스트레스 척도',
                        '즉각적인 기분 전환 팁 제공',
                        '익명성 보장'
                    ],
                    'category': 'Mental',
                    'active': True,
                    'theme_color': '#10b981'
                }
            },
            'Questions': {
                'diabetes': [
                    {'q': '연령대를 선택해주세요.', 'options': ['40세 미만', '40세~50세', '50세~60세', '60세 이상'], 'scores': [0, 1, 2, 3]},
                    {'q': '성별을 선택해주세요.', 'options': ['남성', '여성'], 'scores': [1, 0]},
                    {'q': '가족 중에 당뇨병 환자가 있나요?', 'options': ['없음', '부모님 중 한 분', '부모님 두 분 모두', '형제/자매'], 'scores': [0, 3, 5, 2]},
                    {'q': '현재 고혈압 약을 복용 중이신가요?', 'options': ['아니오', '네'], 'scores': [0, 2]},
                    {'q': '평소 운동을 얼마나 하시나요?', 'options': ['거의 안 함', '주 1~2회', '주 3회 이상'], 'scores': [3, 1, 0]},
                    # Mocking 5 questions for brevity, though user image said 20. 
                    # Real app would have full set.
                ],
                'stress': [
                    {'q': '최근 잠을 잘 주무시나요?', 'options': ['양호함', '가끔 설침', '불면증 시달림'], 'scores': [0, 3, 5]},
                    {'q': '일할 때 집중이 잘 되나요?', 'options': ['매우 잘됨', '보통', '전혀 안됨'], 'scores': [0, 2, 5]},
                    {'q': '퇴근 후 무기력함을 느끼나요?', 'options': ['활기참', '가끔 피곤', '매우 지침'], 'scores': [0, 2, 5]}
                ]
            },
            'Results': {
                'diabetes': [
                     {
                        'min': 0, 'max': 3, 
                        'title': '건강한 상태입니다!', 
                        'desc': '현재 당뇨 위험이 매우 낮습니다. 규칙적인 생활을 유지하세요.',
                        'risk_level': '낮음'
                    },
                    {
                        'min': 4, 'max': 7, 
                        'title': '주의가 필요합니다.', 
                        'desc': '당뇨 전단계일 수 있습니다. 식습관 개선과 운동이 필요합니다.',
                        'risk_level': '보통'
                    },
                    {
                        'min': 8, 'max': 100, 
                        'title': '위험한 상태입니다.', 
                        'desc': '전문의와 상담을 권장합니다. 즉각적인 관리가 필요합니다.',
                        'risk_level': '높음'
                    }
                ],
                'stress': [
                    {
                        'min': 0, 'max': 5, 
                        'title': '안정적인 상태', 
                        'desc': '스트레스 관리가 잘 되고 있습니다.',
                        'risk_level': '낮음'
                    },
                    {
                        'min': 6, 'max': 100, 
                        'title': '번아웃 주의', 
                        'desc': '휴식이 필요합니다. 잠시 일을 내려놓으세요.',
                        'risk_level': '높음'
                    }
                ]
            }
        }

    def get_all_tests(self):
        """Returns a list of active tests."""
        active_tests = []
        for test_id, test in self.data['Tests'].items():
            if test.get('active'):
                active_tests.append(test)
        logger.info(f"Fetched {len(active_tests)} active tests.")
        return active_tests

    def get_test_data(self, test_id):
        """Returns test metadata and questions."""
        test_info = self.data['Tests'].get(test_id)
        questions = self.data['Questions'].get(test_id)
        
        if not test_info or not questions:
            logger.warning(f"Test data not found for id: {test_id}")
            return None
            
        return {
            'info': test_info,
            'questions': questions
        }

    def get_result(self, test_id, score):
        """Returns the result based on score."""
        results = self.data['Results'].get(test_id)
        if not results:
            logger.warning(f"No results definition for id: {test_id}")
            return None
            
        try:
            score = int(score)
        except ValueError:
            logger.error(f"Invalid score format: {score}")
            return None

        # Sort results just in case logic requires order, but here we check range
        for res in results:
            if res['min'] <= score <= res['max']:
                return res
        
        # Fallback if out of bound (should define a catch-all usually)
        return results[-1] if results else None

# Singleton instance
db = MockDB()
