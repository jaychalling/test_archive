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
    | { type: 'pool-select'; poolId: 'MEMORY' | 'LOGIC_SYLLOGISM' | 'LOGIC_ANALOGY' | 'SOCIAL' }
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

// 20 Questions Blueprint
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
export const QUESTIONS: Question[] = [
    // --- Part 1: Attention & Working Memory (Frontal/Parietal) ---
    {
        id: 1, type: 'digit-span', domain: 'Attention',
        text: "Q1. Digit Span (Forward)",
        subText: "Pay close attention to the numbers appearing one by one, and enter them in the same order as shown.",
    },
    {
        id: 2, type: 'digit-span', domain: 'Executive',
        text: "Q2. Digit Span (Backward)",
        subText: "This time, enter the numbers in reverse order.",
    },
    {
        id: 3, type: 'count-input', domain: 'Attention',
        text: "Q3. Selective Attention (Find Letters)",
        subText: "How many times does the letter 'Z' appear in the text below?\n\nT B Z N M K E Z W O Q R Z V I L Y Z L Z V N S H Z W S U Z",
        correctAnswer: "6",
        timeLimit: 10
    },

    // --- Part 2: Executive & Speed (Frontal) ---
    {
        id: 4, type: 'count-input', domain: 'Language',
        text: "Q4. Verbal Fluency (Phonemic)",
        subText: "Write down as many words as possible starting with the letter 'S' for 1 minute (e.g., Sun, Star).\n\nHow many did you write? (Number only)",
        timeLimit: 60,
        correctAnswer: "10"
    },
    {
        id: 5, type: 'count-input', domain: 'Language',
        text: "Q5. Verbal Fluency (Semantic)",
        subText: "Write down as many 'Animals' as possible for 1 minute (e.g., Tiger, Dog).\n\nHow many did you write? (Number only)",
        timeLimit: 60,
        correctAnswer: "10"
    },
    {
        id: 6, type: 'trail-making', domain: 'Executive',
        text: "Q6. Trail Making Task",
        subText: "Quickly connect them in order: 1 -> A -> 2 -> B.",
    },

    // --- Part 3: Memory (Temporal) ---
    {
        id: 7, type: 'visual-memory', domain: 'Memory',
        text: "Q7. Word Recall (Registration)",
        subText: "Memorize these 5 words for 5 seconds. They will disappear shortly.",
        timeLimit: 5
    },
    {
        id: 8, type: 'text-input', domain: 'Memory',
        text: "Q8. Interference Task",
        subText: "Forget the words you just saw and remember these: Desk, Archer, Bird\n\nBesides 'Bird', is there any other 'Animal' you remember? (If none, enter X)",
        correctAnswer: ["Archer", "archer"]
    },
    {
        id: 9, type: 'memory-recall', domain: 'Memory',
        text: "Q9. Delayed Recall (Retrieval)",
        subText: "Enter one word you remember from the very first list (Q7).",
    },
    {
        id: 10, type: 'memory-recognition', domain: 'Memory',
        text: "Q10. Recognition Memory",
        subText: "Which of the following was in the list from Q7?",
    },

    // --- Part 4: Visuospatial (Parietal/Occipital) ---
    {
        id: 11, type: 'mental-rotation', domain: 'Visuospatial',
        text: "Q11. Mental Rotation",
        subText: "If you rotate the 'R' on the left 90° clockwise, which one matches?",
        options: ["R_90", "R_180", "R_Mirrored", "R_Normal"],
        correctAnswer: "R_90"
    },
    {
        id: 12, type: 'choice', domain: 'Visuospatial',
        text: "Q12. Matrix Reasoning",
        subText: "○ → ○○ / □ → [ ? ]",
        options: ["□", "□□", "□□□", "○□"],
        correctAnswer: "□□"
    },
    {
        id: 13, type: 'choice', domain: 'Visuospatial',
        text: "Q13. Weight Comparison",
        subText: "If ● = ▲▲,\nthen [ ? ] = ● + ▲▲",
        options: ["▲▲▲", "●●", "●▲", "▲"],
        correctAnswer: "●●"
    },

    // --- Part 5: Language & Reasoning (Temporal/Frontal) ---
    {
        id: 14, type: 'text-input', domain: 'Language',
        text: "Q14. Object Naming",
        subText: "What device is used to lock or open a door, usually operated by a key?",
        correctAnswer: ["Lock", "lock", "Latch", "latch"]
    },
    {
        id: 15, type: 'text-input', domain: 'Logic',
        text: "Q15. Similarities",
        subText: "What is the commonality between 'Train' and 'Bicycle'?",
        correctAnswer: ["Transportation", "Vehicle", "Transport", "Travel", "Move"]
    },
    {
        id: 16, type: 'text-input', domain: 'Logic',
        text: "Q16. Verbal Analogy",
        subText: "Bird : Air = Fish : [ ? ]",
        correctAnswer: ["Water", "Sea", "Ocean", "River", "Underwater"]
    },

    // --- Part 6: Social Cognition (Frontal) ---
    {
        id: 17, type: 'choice', domain: 'Social',
        text: "Q17. Theory of Mind (False Belief)",
        subText: "Mike put a chocolate in the cupboard and went out. His mother moved it to the fridge. Where will Mike look for it first?",
        options: ["Fridge", "Cupboard", "Table", "Doesn't know"],
        correctAnswer: "Cupboard"
    },
    {
        id: 18, type: 'choice', domain: 'Social',
        text: "Q18. Faux Pas Recognition",
        subText: "Ann bought a new dress. Her friend Lisa said, 'I really hate that style of dress.' Lisa didn't know Ann had bought it.\n\nDid Lisa intentionally try to hurt Ann's feelings?",
        options: ["Yes", "No"],
        correctAnswer: "No"
    },

    // --- Part 7: Logic & Inhibition (Frontal) ---
    {
        id: 19, type: 'go-no-go', domain: 'Executive',
        text: "Q19. Inhibitory Control (Go/No-Go)",
        subText: "When words appear, press the button ONLY if it is 'Food'.",
    },
    {
        id: 20, type: 'choice', domain: 'Logic',
        text: "Q20. Syllogism",
        subText: "'All mammals breathe oxygen. Sharks breathe oxygen. Therefore, sharks are mammals.'\nIs this conclusion true?",
        options: ["True", "False"],
        correctAnswer: "False"
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
        if (ans === undefined || ans === null) return;

        let isCorrect = false;
        const normalizedAnswer = typeof ans === 'string' ? ans.toLowerCase().trim() : ans;

        if (q.type === 'count-input') {
            const count = typeof ans === 'string' ? parseInt(ans) : ans as number;
            if (q.id === 3 && count === 6) isCorrect = true;
            if ((q.id === 4 || q.id === 5) && count >= 8) isCorrect = true;
        } else if (q.id === 6 && q.type === 'trail-making') {
            const score = ans as number;
            if (score > 50) isCorrect = true;
        } else if (q.correctAnswer) {
            if (Array.isArray(q.correctAnswer)) {
                isCorrect = q.correctAnswer.some(a => a.toLowerCase() === (normalizedAnswer as string));
            } else {
                isCorrect = String(normalizedAnswer) === (q.correctAnswer as string).toLowerCase();
            }
        }

        if (isCorrect) {
            if ([3, 4, 5, 6, 17, 18, 19, 20].includes(q.id)) frontalScore++;
            if ([8, 14, 15, 16].includes(q.id)) temporalScore++;
            if ([11, 12, 13].includes(q.id)) parietalScore++;
            rawScore++;
        }
    });

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
            attention: frontalScore > 5 ? "Excellent" : "Needs Attention",
            memory: temporalScore > 4 ? "Excellent" : "Suspected decline",
            executive: frontalScore > 5 ? "Excellent" : "Low Executive",
            visuospatial: parietalScore > 2 ? "Excellent" : "Spatial impairment"
        },
        profileType
    };
}
