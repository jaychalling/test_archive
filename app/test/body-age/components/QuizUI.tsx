'use client';

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { AnswerRecord } from './BodyAgeReport';

// ... (imports remain the same)
import { Loader2 } from 'lucide-react';

export interface Option {
    label: string;
    score: number;
}

export interface Question {
    id: number;
    category: string;
    text: string;
    options: Option[];
}

export const QUESTIONS: Question[] = [
    // ... (keep QUESTIONS array content exactly as is, just ensure it is exported)
    {
        id: 1, category: "Sleep",
        text: "How many hours do you sleep on average?",
        options: [
            { label: "7-8 hours (Ideal)", score: 0 },
            { label: "5-6 hours", score: 3 },
            { label: "Less than 5 hours or Irregular", score: 5 },
        ]
    },
    {
        id: 2, category: "Sleep",
        text: "Do you feel refreshed when you wake up?",
        options: [
            { label: "Always fresh", score: 0 },
            { label: "Sometimes tired", score: 2 },
            { label: "Always exhausted", score: 4 },
        ]
    },
    {
        id: 3, category: "Diet",
        text: "How often do you eat breakfast?",
        options: [
            { label: "Every day", score: 0 },
            { label: "Irregularly", score: 2 },
            { label: "Rarely / Never", score: 4 },
        ]
    },
    {
        id: 4, category: "Diet",
        text: "How often do you consume sugary drinks (soda, sweetened coffee)?",
        options: [
            { label: "Almost never", score: 0 },
            { label: "1-2 times a week", score: 2 },
            { label: "Daily", score: 5 },
        ]
    },
    {
        id: 5, category: "Diet",
        text: "How often do you eat processed foods (instant noodles, fast food)?",
        options: [
            { label: "Rarely", score: 0 },
            { label: "1-2 times a week", score: 3 },
            { label: "3+ times a week", score: 5 },
        ]
    },
    {
        id: 6, category: "Diet",
        text: "Do you eat vegetables at every meal?",
        options: [
            { label: "Yes, always", score: 0 },
            { label: "Once a day", score: 2 },
            { label: "Rarely", score: 4 },
        ]
    },
    {
        id: 7, category: "Diet",
        text: "Do you tend to overeat until you feel very full?",
        options: [
            { label: "No, I stop at 80% full", score: 0 },
            { label: "Sometimes", score: 2 },
            { label: "Often", score: 4 },
        ]
    },
    {
        id: 8, category: "Exercise",
        text: "How often do you do cardio exercise (sweating level)?",
        options: [
            { label: "3+ times a week", score: 0 },
            { label: "1-2 times a week", score: 2 },
            { label: "Almost never", score: 5 },
        ]
    },
    {
        id: 9, category: "Exercise",
        text: "How much time do you spend sitting per day?",
        options: [
            { label: "Less than 4 hours", score: 0 },
            { label: "4-8 hours", score: 3 },
            { label: "More than 8 hours", score: 5 },
        ]
    },
    {
        id: 10, category: "Exercise",
        text: "Can you climb 3 flights of stairs without stopping?",
        options: [
            { label: "Easy", score: 0 },
            { label: "A bit breathless", score: 2 },
            { label: "Very difficult / Cannot", score: 5 },
        ]
    },
    {
        id: 11, category: "Habits",
        text: "Do you smoke?",
        options: [
            { label: "No", score: 0 },
            { label: "Past smoker", score: 2 },
            { label: "Yes", score: 10 },
        ]
    },
    {
        id: 12, category: "Habits",
        text: "How often do you drink alcohol?",
        options: [
            { label: "Rarely / Never", score: 0 },
            { label: "1-2 times a week", score: 2 },
            { label: "3+ times a week", score: 5 },
        ]
    },
    {
        id: 13, category: "Habits",
        text: "Do you apply sunscreen daily?",
        options: [
            { label: "Yes, always", score: 0 },
            { label: "Only in summer", score: 3 },
            { label: "No", score: 5 },
        ]
    },
    {
        id: 14, category: "Mental",
        text: "How high is your daily stress level?",
        options: [
            { label: "Low", score: 0 },
            { label: "Moderate", score: 2 },
            { label: "High / Chronic", score: 5 },
        ]
    },
    {
        id: 15, category: "Mental",
        text: "Do you feel you have a clear purpose or hobby in life?",
        options: [
            { label: "Yes, definitely", score: 0 },
            { label: "Not sure", score: 2 },
            { label: "No", score: 4 },
        ]
    },
    {
        id: 16, category: "Social",
        text: "How often do you meet friends or family?",
        options: [
            { label: "Often (Weekly)", score: 0 },
            { label: "Sometimes (Monthly)", score: 2 },
            { label: "Rarely (Alone)", score: 4 },
        ]
    },
    {
        id: 17, category: "Health",
        text: "Do you have regular bowel movements?",
        options: [
            { label: "Yes, daily", score: 0 },
            { label: "Irregular / Constipated", score: 3 },
        ]
    },
    {
        id: 18, category: "Health",
        text: "Do you feel joint pain or back pain regularly?",
        options: [
            { label: "No", score: 0 },
            { label: "Sometimes", score: 2 },
            { label: "Often / Chronic", score: 4 },
        ]
    },
    {
        id: 19, category: "Health",
        text: "How is your dental health (gums)?",
        options: [
            { label: "Healthy", score: 0 },
            { label: "Bleeding sometimes", score: 3 },
            { label: "Bad / Tooth loss", score: 5 },
        ]
    },
    {
        id: 20, category: "Health",
        text: "Overall, do you feel older or younger than your age?",
        options: [
            { label: "Feel younger", score: 0 },
            { label: "Feel same", score: 2 },
            { label: "Feel older", score: 4 },
        ]
    }
];

interface QuizUIProps {
    onFinish: (resultString: string) => void;
}

export default function QuizUI({ onFinish }: QuizUIProps) {
    const [currentStep, setCurrentStep] = useState(-1); // Start at Age Input
    const [age, setAge] = useState<number | ''>('');
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAgeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!age || Number(age) < 10 || Number(age) > 100) {
            alert("Please enter a valid age (10-100).");
            return;
        }
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentStep(0);
            setIsTransitioning(false);
        }, 300);
    };

    const handleAnswer = (optionIdx: number) => {
        if (isTransitioning || isAnalyzing) return; // Prevent double clicks

        const newIndices = [...selectedIndices, optionIdx];
        setSelectedIndices(newIndices);

        if (currentStep < QUESTIONS.length - 1) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentStep(currentStep + 1);
                setIsTransitioning(false);
                window.scrollTo(0, 0);
            }, 300);
        } else {
            // End of Quiz - Start Analyzing
            setIsAnalyzing(true);
            setTimeout(() => {
                const resString = `${age}-${newIndices.join('')}`; // Format: Age-Indices
                onFinish(resString);
            }, 3000); // 3 seconds analysis simulation
        }
    };

    if (isAnalyzing) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white animate-in fade-in duration-700">
                <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-6" />
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Analyzing your biological age...</h2>
                <p className="text-slate-500">Comparing your lifestyle with 30,000+ datasets.</p>
            </div>
        );
    }

    // Step -1: Age Input Screen
    if (currentStep === -1) {
        return (
            <div className="max-w-md mx-auto px-4 py-20 min-h-screen bg-white flex flex-col items-center justify-center animate-in fade-in">
                <div className="w-full text-center">
                    <h1 className="text-2xl font-bold text-slate-900 mb-4">Before we start...</h1>
                    <p className="text-slate-500 mb-8">What is your actual age?</p>

                    <form onSubmit={handleAgeSubmit} className="space-y-6">
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                            placeholder="Enter age (e.g. 30)"
                            className="w-full text-center text-4xl font-bold p-4 border-b-2 border-slate-200 focus:border-indigo-600 focus:outline-none transition-colors"
                            autoFocus
                        />
                        <button
                            type="submit"
                            disabled={!age}
                            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Start Test
                        </button>
                    </form>
                </div>
            </div>
        );
    }
    const progress = ((currentStep + 1) / QUESTIONS.length) * 100;
    const currentQ = QUESTIONS[currentStep];

    // Safety check
    if (!currentQ) {
        return <div className="max-w-md mx-auto px-4 py-20 text-center text-slate-400">Finalizing results...</div>;
    }

    return (
        <div className="max-w-md mx-auto px-4 py-6 min-h-screen bg-white">
            <header className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Body Age Check</h1>
                    <div className="w-8"></div>
                </div>

                <div className="w-full">
                    <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
                        <span>Question {currentStep + 1}</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="bg-indigo-600 h-full transition-all duration-500 ease-out rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </header>

            {/* Question Card */}
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="space-y-2">
                    <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider bg-indigo-50 px-2 py-1 rounded">
                        {currentQ.category}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900 leading-snug">
                        Q{currentQ.id}. {currentQ.text}
                    </h2>
                </div>

                <div className="grid gap-3">
                    {currentQ.options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-sm transition-all duration-200 flex justify-between items-center group bg-white"
                        >
                            <span className="font-medium text-gray-700 group-hover:text-indigo-900">
                                {option.label}
                            </span>
                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500" />
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 text-slate-500 text-sm">
                <h3 className="font-bold text-slate-700 mb-2">Background</h3>
                <p>This test estimates your biological age by analyzing lifestyle habits (diet, exercise, sleep) and physical indicators. It highlights the gap between your chronological age and body condition.</p>
                <div className="mt-4 text-center text-xs text-gray-300">
                    Test Archive &copy; 2025
                </div>
            </div>
        </div>
    );
}
