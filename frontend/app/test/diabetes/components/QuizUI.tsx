'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export const QUESTIONS = [
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
];

interface QuizUIProps {
    onFinish: (resultString: string) => void;
}

export default function QuizUI({ onFinish }: QuizUIProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAnswer = (optionIdx: number) => {
        if (isTransitioning || isAnalyzing) return;

        const newIndices = [...selectedIndices, optionIdx];
        setSelectedIndices(newIndices);

        if (currentQuestionIndex < QUESTIONS.length - 1) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentQuestionIndex((prev) => prev + 1);
                setIsTransitioning(false);
            }, 300);
        } else {
            setIsAnalyzing(true);
            setTimeout(() => {
                const resString = newIndices.join('');
                onFinish(resString);
            }, 3000);
        }
    };

    if (isAnalyzing) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 animate-in fade-in duration-500">
                <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-6" />
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Analyzing your health data...</h2>
                <p className="text-slate-500">Checking symptoms against medical standards.</p>
            </div>
        );
    }

    const currentQ = QUESTIONS[currentQuestionIndex];

    // Safety check
    if (!currentQ) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50">Finalizing results...</div>;
    }

    const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

    return (
        <div className="min-h-[80vh] bg-gray-50 flex flex-col font-sans">
            <header className="px-6 py-3 flex flex-col items-center sticky top-0 bg-gray-50 z-10 transition-colors border-b border-gray-100">
                <div className="flex items-center justify-between w-full mb-2">
                    <Link href="/" className="p-2 -ml-2 hover:bg-white rounded-full transition-colors text-slate-600">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-base font-bold text-slate-900 uppercase tracking-tight">Type 2 Diabetes Risk Test</h1>
                    <div className="w-8"></div>
                </div>

                <div className="w-full">
                    <div className="flex justify-between text-xs font-bold text-slate-400 mb-1 uppercase tracking-widest">
                        <span>Question {currentQuestionIndex + 1}</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-blue-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>
            </header>

            <main className="flex-grow flex flex-col justify-center px-6 py-4 max-w-2xl mx-auto w-full">

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 leading-tight">
                            {currentQ.text}
                        </h2>

                        <div className="space-y-3">
                            {currentQ.options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(idx)}
                                    className="w-full bg-white p-4 rounded-xl border border-gray-200 text-left hover:border-blue-500 hover:shadow-md transition-all group flex items-center justify-between"
                                >
                                    <span className="font-medium text-slate-700 group-hover:text-blue-700">{opt.label}</span>
                                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="mt-8 pt-6 border-t border-gray-200 text-slate-500 text-sm">
                    <h3 className="font-bold text-slate-700 mb-2">Why this question?</h3>
                    <p>This assessment follows standard medical screening guidelines for Type 2 Diabetes risk factors including genetics, lifestyle, and symptoms. Note: This result is for informational purposes only and is not a medical diagnosis.</p>
                </div>
            </main>
        </div>
    );
}
