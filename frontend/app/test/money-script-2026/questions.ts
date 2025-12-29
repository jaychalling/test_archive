import { Flame, Coins, Shield, Crown, Lock } from 'lucide-react';

// --- Types ---
export type MoneyScriptType = 'Avoidance' | 'Worship' | 'Status' | 'Vigilance';

export interface Question {
    id: number;
    text: string;
    category: MoneyScriptType;
}

export interface ResultData {
    type: MoneyScriptType;
    title: string;
    archetype: string;
    description: string;
    forecast2026: string;
    risk: string;
    aiStrategy: string;
    assetClass: string;
    color: string;
    icon: any; // Using any to avoid complex icon type issues in data file
}

// --- Data ---
export const QUESTIONS: Question[] = [
    // Avoidance (9)
    { id: 1, text: "I do not deserve a lot of money when others have less than me.", category: 'Avoidance' },
    { id: 2, text: "Rich people are greedy.", category: 'Avoidance' },
    { id: 3, text: "It is not right to have more money than you need.", category: 'Avoidance' },
    { id: 4, text: "People get rich by taking advantage of others.", category: 'Avoidance' },
    { id: 5, text: "Good people should not care about money.", category: 'Avoidance' },
    { id: 6, text: "It is hard to be rich and be a good person.", category: 'Avoidance' },
    { id: 7, text: "Most rich people do not deserve their money.", category: 'Avoidance' },
    { id: 8, text: "There is virtue in living with less money.", category: 'Avoidance' },
    { id: 9, text: "I do not deserve money.", category: 'Avoidance' },
    // Worship (9)
    { id: 10, text: "Things would get better if I had more money.", category: 'Worship' },
    { id: 11, text: "More money will make you happier.", category: 'Worship' },
    { id: 12, text: "Money would solve all my problems.", category: 'Worship' },
    { id: 13, text: "There will never be enough money.", category: 'Worship' },
    { id: 14, text: "Money buys freedom.", category: 'Worship' },
    { id: 15, text: "It is hard to be poor and happy.", category: 'Worship' },
    { id: 16, text: "Money is what gives life meaning.", category: 'Worship' },
    { id: 17, text: "You can have love or money, but not both.", category: 'Worship' },
    { id: 18, text: "I feel anxious when I don't have money.", category: 'Worship' },
    // Status (9)
    { id: 19, text: "Your self-worth is determined by your net worth.", category: 'Status' },
    { id: 20, text: "If something is not considered the 'best,' it is not worth buying.", category: 'Status' },
    { id: 21, text: "People are only as successful as the amount of money they earn.", category: 'Status' },
    { id: 22, text: "I will not buy something unless it is new (e.g., new car, new house).", category: 'Status' },
    { id: 23, text: "Poor people are lazy.", category: 'Status' },
    { id: 24, text: "It is okay to keep secrets from your spouse about money.", category: 'Status' },
    { id: 25, text: "If someone asked how much I earn, I would say more than I actually do.", category: 'Status' },
    { id: 26, text: "I buy things to impress others.", category: 'Status' },
    { id: 27, text: "I feel superior when I buy expensive things.", category: 'Status' },
    // Vigilance (9)
    { id: 28, text: "You should not tell others how much money you have or make.", category: 'Vigilance' },
    { id: 29, text: "It is wrong to ask others how much they make.", category: 'Vigilance' },
    { id: 30, text: "Money should be saved, not spent.", category: 'Vigilance' },
    { id: 31, text: "It is important to save for a rainy day.", category: 'Vigilance' },
    { id: 32, text: "People should work for their money and not be given financial handouts.", category: 'Vigilance' },
    { id: 33, text: "I would be a nervous wreck if I did not have an emergency fund.", category: 'Vigilance' },
    { id: 34, text: "If you cannot pay cash for something, you should not buy it.", category: 'Vigilance' },
    { id: 35, text: "If someone asked how much I earn, I would say less than I actually do.", category: 'Vigilance' },
    { id: 36, text: "I worry excessively about being poor.", category: 'Vigilance' },
];

export const RESULTS: Record<MoneyScriptType, ResultData> = {
    Avoidance: {
        type: 'Avoidance',
        title: 'Money Avoidance',
        archetype: 'The Ascetic / Renouncer',
        description: "You believe money is bad or that you don't deserve it. You might sabotage your financial success to avoid the 'evil' of wealth.",
        forecast2026: "In the 'Red Horse' year of 2026, intense competition and wealth polarization may deepen your aversion. You risk missing out on necessary wealth protection strategies.",
        risk: "Sabotage & Underearning (unconscious rejection of opportunities).",
        aiStrategy: "Use 'Agentic AI' to automate savings and investing. Remove the 'guilt' from the decision-making process by letting algorithms handle the growth.",
        assetClass: "Ironbank (Stable, Ethical, Defense-heavy)",
        color: "text-stone-400",
        icon: Shield,
    },
    Worship: {
        type: 'Worship',
        title: 'Money Worship',
        archetype: 'The Dreamer / Alchemist',
        description: "You believe money is the key to happiness and the solution to all problems. However, you are prone to the 'hedonic treadmill'—never satisfied.",
        forecast2026: "The flashy 'Fire' economy of 2026 (AI booms, crypto spikes) will tempt you. You are at high risk of chasing bubbles and suffering from 'Fire Melting Metal' (wealth destruction).",
        risk: "Overspending & Speculative Gambling.",
        aiStrategy: "Set up AI 'Circuit Breakers' (spending limits, cooling-off periods). Use AI to visualize long-term compounding vs. short-term thrills.",
        assetClass: "Phoenix Rising (High Growth, Volatile, but Managed)",
        color: "text-amber-500",
        icon: Flame,
    },
    Status: {
        type: 'Status',
        title: 'Money Status',
        archetype: 'The Aristocrat / Performer',
        description: "You equate your self-worth with your net worth. You use money to impress others and validate your success.",
        forecast2026: "2026 is a year of 'Yang-Myung' (Bright Sun)—everything is visible. Social comparison will be at an all-time high. You risk debt to maintain an image.",
        risk: "Overleveraging & Social Comparison Anxiety.",
        aiStrategy: "Use AI to track 'Net Worth' privately, not 'Spending'. Shift gamification from consumption to accumulation.",
        assetClass: "Goldworthy (Prestige, Legacy, Tangible Assets)",
        color: "text-purple-400",
        icon: Crown,
    },
    Vigilance: {
        type: 'Vigilance',
        title: 'Money Vigilance',
        archetype: 'The Guardian / Steward',
        description: "You are alert, watchful, and concerned about your financial health. You value saving but may be too anxious to enjoy your money.",
        forecast2026: "Inflation in 2026 threatens cash hoarders. Your safety net (Cash) might burn up (Fire melts Metal). You need to take calculated risks.",
        risk: "Opportunity Cost & Inflation Erosion.",
        aiStrategy: "Use AI to simulate 'Safe Scenarios'. Let data prove to you that investing is safer than hoarding cash in an inflationary environment.",
        assetClass: "Onyx Shield (Hedged, Diversified, Risk-Managed)",
        color: "text-emerald-400",
        icon: Lock,
    },
};

export function calculateResult(answers: number[]): string {
    // answers array: [score1, score2, ..., score36]
    // QUESTIONS order: 0-8 (Avoidance), 9-17 (Worship), 18-26 (Status), 27-35 (Vigilance)

    const scores: Record<MoneyScriptType, number> = {
        Avoidance: 0,
        Worship: 0,
        Status: 0,
        Vigilance: 0,
    };

    answers.forEach((score, index) => {
        const category = QUESTIONS[index].category;
        scores[category] += score;
    });

    let maxScore = -1;
    let maxType: MoneyScriptType = 'Avoidance';

    (Object.keys(scores) as MoneyScriptType[]).forEach(type => {
        if (scores[type] > maxScore) {
            maxScore = scores[type];
            maxType = type;
        }
    });

    return maxType;
}
