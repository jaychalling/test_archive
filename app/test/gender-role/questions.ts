export type ResponseType = 'Likert_5' | 'Scenario_Dual_Rating';

export interface LikertOption {
    value: number;
    text: string;
}

export interface QuestionItem {
    id: number;
    category: string;
    trait?: string; // For M1
    text?: string;
    reverseScore?: boolean;
    scenarioContext?: string; // For M2
    actions?: { subId: string; category: string; text: string }[]; // For M2
}

export interface Module {
    moduleId: string;
    title: string;
    description: string;
    responseType: ResponseType;
    options?: LikertOption[]; // For Likert modules
    scale?: string; // For M2 display
    items: QuestionItem[];
}

export const TEST_META = {
    id: "GRT_2026",
    version: "2.0.0",
    title: "2026 GENDER ROLE TEST",
    year: 2026,
    lastUpdated: "2026-01-15",
    author: "Test-Archive.com Research Team",
    totalQuestions: 32,
    estimatedTime: "5-7 min"
};

export const INTRODUCTION = {
    landingTitle: "2026 GENDER ROLE TEST",
    landingSubtitle: "Analyze your Masculinity & Femininity levels based on modern psychology (GGDP Model).",
    purpose: {
        header: "About This Test",
        body: "Most 'Gender Role Tests' online rely on outdated stereotypes from the 1970s. The 2026 GENDER ROLE TEST is different. We utilize the modern 'Big Two' theory (Agency & Communion) to accurately measure your personality traits beyond biological sex."
    },
    theoreticalBackground: {
        header: "How It Works",
        body: "We analyze two core dimensions: 'Instrumentality' (often associated with masculinity) and 'Expressiveness' (often associated with femininity). Unlike old tests, we also measure your 'Situational Flexibility'—the key to mental wellness in 2026."
    },
    whatYouWillGet: [
        "Your exact % of Masculinity (Agency) and Femininity (Communion).",
        "Your Personality Type (e.g., The All-Rounder, The Strategist).",
        "A personalized 'Gender Adaptability' score.",
        "Mental wellness advice based on your results."
    ]
};

export const MODULES: Module[] = [
    {
        moduleId: "M1",
        title: "Part 1: Core Personality Traits",
        description: "Assess your primary mode of interaction with the world. Be honest; there are no right or wrong answers.",
        responseType: "Likert_5",
        options: [
            { value: 1, text: "Strongly Disagree" },
            { value: 2, text: "Disagree" },
            { value: 3, text: "Neutral" },
            { value: 4, "text": "Agree" },
            { value: 5, "text": "Strongly Agree" }
        ],
        items: [
            { id: 1, category: "Agency", trait: "Assertiveness", text: "I express my opinions confidently." },
            { id: 2, category: "Agency", trait: "Assertiveness", text: "I act decisively to achieve my goals." },
            { id: 3, category: "Agency", trait: "Assertiveness", text: "I hold my ground effectively under pressure." },
            { id: 4, category: "Agency", trait: "Assertiveness", text: "I am comfortable taking on leadership roles." },
            { id: 5, category: "Agency", trait: "Assertiveness", text: "I am independent and have strong convictions." },
            { id: 6, category: "Agency", trait: "Competence", text: "I handle tasks efficiently." },
            { id: 7, category: "Agency", trait: "Competence", text: "I analyze problems logically to find solutions." },
            { id: 8, category: "Agency", trait: "Competence", text: "I persist until I finish what I start." },
            { id: 9, category: "Agency", trait: "Competence", text: "I am ambitious and achievement-oriented." },
            { id: 10, category: "Agency", trait: "Competence", text: "I am confident in my abilities." },
            { id: 11, category: "Communion", trait: "Warmth", text: "I deeply empathize with others' emotions." },
            { id: 12, category: "Communion", trait: "Warmth", text: "I take good care of the people around me." },
            { id: 13, category: "Communion", trait: "Warmth", text: "I treat people with warmth and affection." },
            { id: 14, category: "Communion", trait: "Warmth", text: "I am eager to help those in trouble." },
            { id: 15, category: "Communion", trait: "Warmth", text: "I enjoy being friendly and approachable." },
            { id: 16, category: "Communion", trait: "Morality", text: "I always keep my promises." },
            { id: 17, category: "Communion", trait: "Morality", text: "I strive to be fair and honest in everything I do." },
            { id: 18, category: "Communion", trait: "Morality", text: "I am considered a trustworthy person." },
            { id: 19, category: "Communion", trait: "Morality", text: "I try to maintain peace in conflict situations." },
            { id: 20, category: "Communion", trait: "Morality", text: "I prioritize the team's or family's well-being over my own." }
        ]
    },
    {
        moduleId: "M2",
        title: "Part 2: Situational Response",
        description: "How do you react in different contexts? Rate how likely you are to take EACH action.",
        responseType: "Scenario_Dual_Rating",
        scale: "1 (Unlikely) to 5 (Very Likely)",
        items: [
            {
                id: 21,
                category: "Scenario",
                scenarioContext: "A critical project deadline is approaching, but the plan is failing, and the team is in chaos.",
                actions: [
                    {
                        subId: "A",
                        category: "Agency_Action",
                        text: "Step in to redistribute roles and take control of the situation."
                    },
                    {
                        subId: "B",
                        category: "Communion_Action",
                        text: "Listen to team members' struggles and encourage them to boost morale."
                    }
                ]
            },
            {
                id: 22,
                category: "Scenario",
                scenarioContext: "A close friend is extremely depressed after a breakup.",
                actions: [
                    {
                        subId: "A",
                        category: "Agency_Action",
                        text: "Analyze the cause of the problem and offer realistic advice."
                    },
                    {
                        subId: "B",
                        category: "Communion_Action",
                        text: "Stay by their side silently and empathize with their sadness."
                    }
                ]
            }
        ]
    },
    {
        moduleId: "M3",
        title: "Part 3: Values & Lifestyle",
        description: "Assess your current stress levels regarding social expectations.",
        responseType: "Likert_5",
        options: [
            { value: 1, text: "Strongly Disagree" },
            { value: 2, text: "Disagree" },
            { value: 3, text: "Neutral" },
            { value: 4, "text": "Agree" },
            { value: 5, "text": "Strongly Agree" }
        ],
        items: [
            {
                id: 23,
                category: "Stress_Achievement",
                text: "I feel I am only valuable if I am successful and wealthy."
            },
            {
                id: 24,
                category: "Stress_Emotion",
                text: "I find it difficult to show my weakness or emotions to others."
            },
            {
                id: 25,
                category: "Stress_RoleConflict",
                text: "I feel guilty about not spending enough time with loved ones due to work/study."
            },
            {
                id: 26,
                category: "Stress_Norms",
                text: "I worry about not fitting into traditional gender expectations ('Manly' or 'Womanly')."
            },
            {
                id: 27,
                category: "Stereotype",
                reverseScore: true,
                text: "I believe there are distinct, fixed roles for men and women."
            },
            {
                id: 28,
                category: "Transcendence",
                text: "Leadership is a capability unrelated to gender."
            },
            {
                id: 29,
                category: "Flexibility_Awareness",
                text: "I can be both tough and gentle depending on the situation."
            },
            {
                id: 30,
                category: "Self_Identity",
                text: "Being 'myself' is more important than following social norms."
            }
        ]
    }
];
