import { ScoreLevel } from './components/BrainMap';

export type QuestionType =
    | 'choice'
    | 'text-input'
    | 'visual-memory'
    | 'mental-rotation'
    | 'count-input'
    | 'memory-recall'
    | 'memory-recognition'
    | 'sequential-memory'
    | 'digit-span'
    | 'trail-making'
    | 'go-no-go';

export type QuestionConfig =
    | { type: 'digit-span'; length: number; variant: 'forward' | 'backward' }
    | { type: 'trail-making'; variant: 'A' | 'B'; nodeCount: number }
    | { type: 'mental-rotation'; difficulty: 'easy' | 'hard' }
    | { type: 'go-no-go'; durationSec: number; intervalMs: number }
    | { type: 'pool-select'; poolId: 'MEMORY' | 'LOGIC' | 'SOCIAL' }
    // Maintaining compatibility with static types for hybrid approach until full refactor
    | { type: 'legacy'; legacyData: Question };

export interface Question {
    id: number;
    type: QuestionType;
    text: string;
    subText?: string;
    options?: string[];
    correctAnswer?: string | string[];
    image?: string;
    timeLimit?: number;
    domain: 'Attention' | 'Memory' | 'Executive' | 'Visuospatial' | 'Language' | 'Logic' | 'Social';
}

// 20개 문항의 '청사진(Blueprint)' 정의
// For now, we will map this back to the QUESTIONS array structure dynamically or use it directly.
// To keep compatibility with existing QuizUI while we transition, we will maintain the QUESTIONS array
// but update specific questions to use the new types where implemented.

export const COGNITIVE_BLUEPRINT: Record<number, QuestionConfig> = {
    1: { type: 'digit-span', length: 5, variant: 'forward' },
    2: { type: 'digit-span', length: 3, variant: 'backward' },
    6: { type: 'trail-making', variant: 'B', nodeCount: 8 },
    11: { type: 'mental-rotation', difficulty: 'hard' },
    19: { type: 'go-no-go', durationSec: 30, intervalMs: 800 },
    15: { type: 'pool-select', poolId: 'LOGIC_ANALOGY' },
    16: { type: 'pool-select', poolId: 'LOGIC_ANALOGY' },
    17: { type: 'pool-select', poolId: 'SOCIAL' },
    18: { type: 'pool-select', poolId: 'SOCIAL' },
    20: { type: 'pool-select', poolId: 'LOGIC_SYLLOGISM' },
};

// Legacy QUESTIONS array (Hybrid State)
// We will modify Q6 here to use 'trail-making' type so QuizUI picks it up.
export const QUESTIONS: Question[] = [
    // --- Part 1: Attention & Working Memory (Frontal/Parietal) ---
    {
        id: 1, type: 'digit-span', domain: 'Attention',
        text: "Q1. 숫자 따라하기 (순방향)",
        subText: "화면에 하나씩 나타나는 숫자를 집중해서 보시고,\n보여드린 순서 그대로 입력해주세요.",
    },
    {
        id: 2, type: 'digit-span', domain: 'Executive',
        text: "Q2. 숫자 거꾸로 말하기 (역방향)",
        subText: "이번에는 숫자가 나타나면,\n반대 순서로 입력해주세요.",
    },
    {
        id: 3, type: 'count-input', domain: 'Attention',
        text: "Q3. 선택적 주의력 (글자 찾기)",
        subText: "T B Z N M K E Z W O Q R Z V I L Y Z L Z V N S H Z W S U Z\n위 글자들 중에서 'Z'가 총 몇 번 나옵니까?",
        correctAnswer: "6"
    },

    // --- Part 2: Executive & Speed (Frontal) ---
    {
        id: 4, type: 'count-input', domain: 'Language',
        text: "Q4. 언어 유창성 (음소)",
        subText: "1분 동안 'ㅅ(시옷)'으로 시작하는 단어를 종이에 적으세요. (예: 사랑, 사과)\n\n몇 개를 적으셨나요? (숫자만 입력)",
        timeLimit: 60,
        correctAnswer: "10"
    },
    {
        id: 5, type: 'count-input', domain: 'Language',
        text: "Q5. 언어 유창성 (의미)",
        subText: "1분 동안 '동물'을 종이에 적으세요. (예: 호랑이, 개)\n\n몇 개를 적으셨나요? (숫자만 입력)",
        timeLimit: 60,
        correctAnswer: "10"
    },
    {
        id: 6, type: 'trail-making', domain: 'Executive', // Changed Type
        text: "Q6. 선 잇기 (Trail Making)",
        subText: "1 -> ㄱ -> 2 -> ㄴ 순서대로 빠르게 연결하세요.",
        // Options not needed, handled by component
    },

    // --- Part 3: Memory (Temporal) ---
    {
        id: 7, type: 'visual-memory', domain: 'Memory',
        text: "Q7. 단어 기억하기 (등록)",
        subText: "다음 단어 5개를 5초 동안 외우세요. 잠시 후 사라집니다.",
        timeLimit: 5
    },
    {
        id: 8, type: 'text-input', domain: 'Memory',
        text: "Q8. 간섭 과제",
        subText: "방금 본 단어는 잊고, 다음 단어들을 기억하세요: 책상, 사수, 새\n\n'새' 외에 기억나는 '동물'이 있나요? (없으면 X)",
        correctAnswer: "사수"
    },
    {
        id: 9, type: 'memory-recall', domain: 'Memory',
        text: "Q9. 지연 회상 (Retrieval)",
        subText: "아까 맨 처음(Q7) 외웠던 5개 단어 중, 생각나는 것 하나를 입력하세요.",
    },
    {
        id: 10, type: 'memory-recognition', domain: 'Memory',
        text: "Q10. 재인 기억 (Recognition)",
        subText: "다음 중 Q7에서 외웠던 단어는 무엇입니까?",
    },

    // --- Part 4: Visuospatial (Parietal/Occipital) ---
    {
        id: 11, type: 'mental-rotation', domain: 'Visuospatial',
        text: "Q11. 멘탈 로테이션",
        subText: "왼쪽 'R'을 시계방향 90도 회전하면?",
        options: ["R_90", "R_180", "R_Mirrored", "R_Normal"],
        correctAnswer: "R_90"
    },
    {
        id: 12, type: 'choice', domain: 'Visuospatial',
        text: "Q12. 행렬 추리",
        subText: "○ → ○○ / □ → [ ? ]",
        options: ["□", "□□", "□□□", "○□"],
        correctAnswer: "□□"
    },
    {
        id: 13, type: 'choice', domain: 'Visuospatial',
        text: "Q13. 무게 비교",
        subText: "● = ▲▲ 일 때,\n[ ? ] = ● + ▲▲",
        options: ["▲▲▲", "●●", "●▲", "▲"],
        correctAnswer: "●●"
    },

    // --- Part 5: Language & Reasoning (Temporal/Frontal) ---
    {
        id: 14, type: 'text-input', domain: 'Language',
        text: "Q14. 이름 대기",
        subText: "문을 잠그거나 여는 데 사용하며, 보통 열쇠로 작동하는 장치는?",
        correctAnswer: "자물쇠"
    },
    {
        id: 15, type: 'text-input', domain: 'Logic',
        text: "Q15. 공통성 찾기",
        subText: "'기차'와 '자전거'의 공통점은?",
        correctAnswer: ["운송수단", "탈것", "교통수단", "이동수단"]
    },
    {
        id: 16, type: 'text-input', domain: 'Logic',
        text: "Q16. 언어 유추",
        subText: "새 : 공중 = 물고기 : [ ? ]",
        correctAnswer: ["물", "수중", "바다", "강"]
    },

    // --- Part 6: Social Cognition (Frontal) ---
    {
        id: 17, type: 'choice', domain: 'Social',
        text: "Q17. 마음 이론 (틀린 믿음)",
        subText: "철수는 초콜릿을 찬장에 넣고 나갔습니다. 그 사이 엄마가 냉장고로 옮겼습니다. 돌아온 철수는 초콜릿을 찾으러 어디로 갈까요?",
        options: ["냉장고", "찬장", "식탁", "모른다"],
        correctAnswer: "찬장"
    },
    {
        id: 18, type: 'choice', domain: 'Social',
        text: "Q18. 실언(Faux Pas) 인식",
        subText: "영희는 새 드레스를 샀습니다. 친구 미수가 와서 '나 그 스타일 드레스 진짜 싫어해'라고 말했습니다. 미수는 영희가 그 드레스를 샀다는 걸 몰랐습니다.\n\n미수는 일부러 영희의 기분을 상하게 하려 했습니까?",
        options: ["예", "아니오"],
        correctAnswer: "아니오"
    },

    // --- Part 7: Logic & Inhibition (Frontal) ---
    {
        id: 19, type: 'go-no-go', domain: 'Executive',
        text: "Q19. 억제 제어 (Go/No-Go)",
        subText: "화면에 단어가 나타나면, '음식'일 때만 버튼을 누르세요.",
    },
    {
        id: 20, type: 'choice', domain: 'Logic',
        text: "Q20. 삼단 논법",
        subText: "'모든 포유류는 산소로 숨을 쉰다. 상어는 산소로 숨을 쉰다. 그러므로 상어는 포유류이다.'\n이 결론은 참입니까?",
        options: ["참", "거짓"],
        correctAnswer: "거짓"
    }
];

export interface CognitiveResult {
    totalScore: number;
    brainAge: number;
    scores: {
        frontal: ScoreLevel;
        temporal: ScoreLevel;
        parietal: ScoreLevel;
    };
    details: {
        attention: string;
        memory: string;
        executive: string;
        visuospatial: string;
    };
    profileType: 'Healthy' | 'Amnestic' | 'Dysexecutive' | 'Visuospatial' | 'Mixed';
}

export function calculateResult(answers: Record<number, string | number>, memoryCorrectCount: number, sequentialCorrectCount: number): CognitiveResult {
    let rawScore = 0;

    let frontalScore = 0;
    const frontalTotal = 10;
    let temporalScore = 0;
    const temporalTotal = 7;
    let parietalScore = 0;
    const parietalTotal = 3;

    QUESTIONS.forEach(q => {
        const ans = answers[q.id];
        if (!ans) return;

        let isCorrect = false;

        // Custom Scoring Logic per Question
        if (q.type === 'count-input') {
            const count = typeof ans === 'string' ? parseInt(ans) : ans as number;
            // Q4/Q5 Fluency: > 8 is good point
            if (q.id === 3 && count === 6) isCorrect = true; // Z counting
            if ((q.id === 4 || q.id === 5) && count >= 8) isCorrect = true;
        } else if (q.id === 6 && q.type === 'trail-making') {
            const score = ans as number; // TrailMaking returns Score (0-100) or simple Points?
            // Let's assume onComplete returns a calculated "Points" for now or we map it. 
            // Implementation Plan says: "Score = Math.max(0, 100 - duration/1000)" in Component.
            // Here we need simple Right/Wrong or Scaled.
            // Let's assume if score > 50 it is "Right".
            if (score > 50) isCorrect = true;
        } else if (q.correctAnswer) {
            if (Array.isArray(q.correctAnswer)) {
                isCorrect = q.correctAnswer.some(a => a === ans);
            } else {
                isCorrect = ans === q.correctAnswer;
            }
        }

        // Dynamic Scoring Handled externally:
        // Q1/Q2 (Sequential)
        // Q9/Q10 (Memory)

        if (isCorrect) {
            if ([3, 4, 5, 6, 17, 18, 19, 20].includes(q.id)) frontalScore++;
            if ([8, 14, 15, 16].includes(q.id)) temporalScore++;
            if ([11, 12, 13].includes(q.id)) parietalScore++;
            rawScore++;
        }
    });

    // Add Dynamic Scores
    temporalScore += memoryCorrectCount;
    rawScore += memoryCorrectCount;

    frontalScore += sequentialCorrectCount;
    rawScore += sequentialCorrectCount;

    const frontalRatio = frontalScore / frontalTotal;
    const temporalRatio = temporalScore / temporalTotal;
    const parietalRatio = parietalScore / parietalTotal;

    const getLevel = (ratio: number): ScoreLevel => ratio > 0.7 ? 'High' : ratio > 0.4 ? 'Mid' : 'Low';

    const scores = {
        frontal: getLevel(frontalRatio),
        temporal: getLevel(temporalRatio),
        parietal: getLevel(parietalRatio)
    };

    // Profile Logic
    let profileType: CognitiveResult['profileType'] = 'Healthy';
    if (scores.temporal === 'Low' && scores.frontal === 'High') profileType = 'Amnestic';
    else if (scores.frontal === 'Low' && scores.temporal === 'High') profileType = 'Dysexecutive';
    else if (scores.parietal === 'Low') profileType = 'Visuospatial';
    else if (rawScore < 10) profileType = 'Mixed';

    return {
        totalScore: Math.round((rawScore / 20) * 100),
        brainAge: 30 + (20 - rawScore) * 2,
        scores,
        details: {
            attention: frontalScore > 5 ? "우수" : "주의 필요",
            memory: temporalScore > 4 ? "우수" : "기억력 감퇴 의심",
            executive: frontalScore > 5 ? "우수" : "관리 부족",
            visuospatial: parietalScore > 2 ? "우수" : "공간 지각 저하"
        },
        profileType
    };
}
