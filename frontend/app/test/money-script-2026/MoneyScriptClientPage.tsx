'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Coins, Shield, Crown, RefreshCcw, Share2, AlertTriangle, TrendingUp, Cpu, Lock } from 'lucide-react';
import Link from 'next/link';

// --- Types ---
type MoneyScriptType = 'Avoidance' | 'Worship' | 'Status' | 'Vigilance';

interface Question {
    id: number;
    text: string;
    category: MoneyScriptType;
}

interface ResultData {
    type: MoneyScriptType;
    title: string;
    archetype: string;
    description: string;
    forecast2026: string;
    risk: string;
    aiStrategy: string;
    assetClass: string;
    color: string;
    icon: React.ElementType;
}

// --- Data ---
const QUESTIONS: Question[] = [
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

const RESULTS: Record<MoneyScriptType, ResultData> = {
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

export default function MoneyScriptClientPage() {
    const [started, setStarted] = useState(false);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [scores, setScores] = useState<Record<MoneyScriptType, number>>({
        Avoidance: 0,
        Worship: 0,
        Status: 0,
        Vigilance: 0,
    });
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState<ResultData | null>(null);

    const handleStart = () => setStarted(true);

    const handleAnswer = (score: number) => {
        const currentQ = QUESTIONS[currentQIndex];
        setScores(prev => ({
            ...prev,
            [currentQ.category]: prev[currentQ.category] + score
        }));

        if (currentQIndex < QUESTIONS.length - 1) {
            setCurrentQIndex(prev => prev + 1);
        } else {
            calculateResult();
        }
    };

    const calculateResult = () => {
        // Find category with highest score
        let maxScore = -1;
        let maxType: MoneyScriptType = 'Avoidance';

        (Object.keys(scores) as MoneyScriptType[]).forEach(type => {
            if (scores[type] > maxScore) {
                maxScore = scores[type];
                maxType = type;
            }
        });

        setResult(RESULTS[maxType]);
        setShowResult(true);
    };

    const handleRetest = () => {
        setStarted(false);
        setCurrentQIndex(0);
        setScores({ Avoidance: 0, Worship: 0, Status: 0, Vigilance: 0 });
        setShowResult(false);
        setResult(null);
    };

    if (!started) {
        return (
            <div className="min-h-screen bg-neutral-900 text-stone-100 font-sans selection:bg-red-900 selection:text-white flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl w-full bg-neutral-800/50 backdrop-blur-md border border-neutral-700 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900 via-amber-600 to-red-900"></div>

                    <div className="flex justify-center mb-8">
                        <div className="p-4 rounded-full bg-neutral-900 border border-neutral-700 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                            <Flame className="w-12 h-12 text-red-600" />
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-center mb-6 tracking-tight bg-gradient-to-br from-stone-100 to-stone-500 bg-clip-text text-transparent">
                        Money Script<br />& 2026 Psychology
                    </h1>

                    <p className="text-lg text-stone-400 text-center mb-10 leading-relaxed font-light">
                        2026 is the year of the <span className="text-red-500 font-semibold">Red Horse (Fire)</span>.
                        A time of volatility, intensity, and transformation.<br /><br />
                        Is your unconscious "Money Script" ready for this heat?
                        Discover your financial archetype and how to survive the coming wealth shift.
                    </p>

                    <div className="flex justify-center">
                        <button
                            onClick={handleStart}
                            className="group relative px-8 py-4 bg-red-900 hover:bg-red-800 text-white text-lg font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(153,27,27,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Begin Analysis <TrendingUp className="w-5 h-5" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-neutral-700 text-center">
                        <p className="text-xs text-stone-500 uppercase tracking-widest">
                            Based on Klontz Money Script Inventory
                        </p>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (showResult && result) {
        return (
            <div className="min-h-screen bg-neutral-900 text-stone-100 font-sans p-4 md:p-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Header */}
                    <header className="mb-12 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/30 border border-red-800/50 text-red-400 text-xs font-bold tracking-wider uppercase mb-4">
                            2026 Financial Psychology Report
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-2">
                            <span className={result.color}>{result.title}</span>
                        </h2>
                        <h3 className="text-xl md:text-2xl text-stone-400 font-serif italic">
                            "{result.archetype}"
                        </h3>
                    </header>

                    {/* Main Card */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {/* Left: Archetype Info */}
                        <div className="bg-neutral-800/50 border border-neutral-700 rounded-3xl p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <result.icon className={`w-32 h-32 ${result.color}`} />
                            </div>
                            <h4 className="text-lg font-bold text-stone-300 mb-4 flex items-center gap-2">
                                <Cpu className="w-5 h-5" /> Archetype Analysis
                            </h4>
                            <p className="text-stone-400 leading-relaxed text-lg">
                                {result.description}
                            </p>
                        </div>

                        {/* Right: 2026 Forecast */}
                        <div className="bg-gradient-to-br from-red-950 to-neutral-900 border border-red-900/30 rounded-3xl p-8 relative">
                            <h4 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                                <Flame className="w-5 h-5" /> 2026 Red Horse Forecast
                            </h4>
                            <p className="text-stone-300 leading-relaxed">
                                {result.forecast2026}
                            </p>
                        </div>
                    </div>

                    {/* Strategy Section */}
                    <div className="bg-neutral-800/30 border border-neutral-700 rounded-3xl p-8 mb-8">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <h5 className="flex items-center gap-2 text-amber-500 font-bold mb-3 text-sm uppercase tracking-wider">
                                    <AlertTriangle className="w-4 h-4" /> Major Risk
                                </h5>
                                <p className="text-stone-300 text-sm">{result.risk}</p>
                            </div>
                            <div>
                                <h5 className="flex items-center gap-2 text-cyan-400 font-bold mb-3 text-sm uppercase tracking-wider">
                                    <Cpu className="w-4 h-4" /> AI Strategy
                                </h5>
                                <p className="text-stone-300 text-sm">{result.aiStrategy}</p>
                            </div>
                            <div>
                                <h5 className="flex items-center gap-2 text-emerald-400 font-bold mb-3 text-sm uppercase tracking-wider">
                                    <Coins className="w-4 h-4" /> Recommended Asset
                                </h5>
                                <p className="text-stone-300 font-serif text-lg italic text-white/90">{result.assetClass}</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
                        <button
                            onClick={handleRetest}
                            className="px-6 py-3 rounded-xl bg-neutral-800 text-stone-400 hover:bg-neutral-700 transition-colors font-semibold flex items-center justify-center gap-2"
                        >
                            <RefreshCcw className="w-4 h-4" /> Retest
                        </button>
                        <Link
                            href="/"
                            className="px-6 py-3 rounded-xl bg-stone-100 text-neutral-900 hover:bg-white transition-colors font-bold flex items-center justify-center gap-2"
                        >
                            Explore More Tests
                        </Link>
                    </div>

                    {/* Sources */}
                    <footer className="border-t border-neutral-800 pt-8 text-center text-stone-600">
                        <h6 className="text-xs font-bold uppercase mb-4 tracking-widest">Sources & References</h6>
                        <ul className="text-xs space-y-2 max-w-lg mx-auto">
                            <li><a href="#" className="hover:text-stone-400">Klontz, B., & Britt, S. L. (2012). How clients' money scripts predict their financial behaviors.</a></li>
                            <li><a href="#" className="hover:text-stone-400">Goldman Sachs. (2024). The Global Economy in 2026: Sturdy Growth.</a></li>
                            <li><a href="#" className="hover:text-stone-400">Morgan Stanley. (2024). 2026 Economic Outlook: Moderate Growth.</a></li>
                            <li><a href="#" className="hover:text-stone-400">Microsoft. (2025). AI Transformation in Financial Services 2026.</a></li>
                        </ul>
                    </footer>
                </motion.div>
            </div>
        );
    }

    // Question UI
    const progress = ((currentQIndex) / QUESTIONS.length) * 100;

    return (
        <div className="min-h-screen bg-neutral-900 text-stone-100 font-sans flex flex-col items-center justify-center p-4">
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 bg-neutral-800 z-50">
                <motion.div
                    className="h-full bg-gradient-to-r from-red-700 to-amber-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            <div className="max-w-2xl w-full">
                <div className="mb-8 flex justify-between items-end text-stone-500 text-sm font-medium">
                    <span>Question {currentQIndex + 1} / {QUESTIONS.length}</span>
                    <span className="uppercase tracking-wider text-xs">{QUESTIONS[currentQIndex].category} Check</span>
                </div>

                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentQIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="bg-neutral-800/30 border border-neutral-700/50 rounded-3xl p-8 mb-8 backdrop-blur"
                    >
                        <h2 className="text-xl md:text-2xl font-medium leading-relaxed mb-4">
                            {QUESTIONS[currentQIndex].text}
                        </h2>
                    </motion.div>
                </AnimatePresence>

                <div className="grid grid-cols-6 gap-2 md:gap-4">
                    {[1, 2, 3, 4, 5, 6].map((score) => (
                        <button
                            key={score}
                            onClick={() => handleAnswer(score)}
                            className={`
                                aspect-square rounded-xl md:rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center gap-1 group
                                ${score <= 3
                                    ? 'border-neutral-700 hover:border-stone-500 hover:bg-neutral-800 text-stone-400'
                                    : 'border-red-900/30 hover:border-red-500 hover:bg-red-900/20 text-red-100'}
                            `}
                        >
                            <span className={`text-lg md:text-2xl font-bold ${score >= 5 ? 'text-red-500' : 'text-stone-300'}`}>
                                {score}
                            </span>
                            <span className="text-[0.6rem] md:text-xs uppercase font-bold tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity text-center px-1">
                                {score === 1 ? 'Disagree' : score === 6 ? 'Agree' : ''}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="mt-8 flex justify-between text-xs text-stone-600 px-2 uppercase tracking-widest">
                    <span>Strongly Disagree</span>
                    <span>Strongly Agree</span>
                </div>
            </div>
        </div>
    );
}
