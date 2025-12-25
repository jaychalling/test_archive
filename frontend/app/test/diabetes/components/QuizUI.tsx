'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import type { Question } from '@/utils/api';

interface QuizUIProps {
    questions: Question[];
    onFinish: (resultString: string) => void;
}

export default function QuizUI({ questions, onFinish }: QuizUIProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAnswer = (optionIdx: number) => {
        if (isTransitioning || isAnalyzing) return;

        const newIndices = [...selectedIndices, optionIdx];
        setSelectedIndices(newIndices);

        if (currentQuestionIndex < questions.length - 1) {
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
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 animate-in fade-in duration-700">
                <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-6" />
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Analyzing your health data...</h2>
                <p className="text-slate-500">Checking symptoms against medical standards.</p>
            </div>
        );
    }

    const currentQ = questions[currentQuestionIndex];

    // Safety check
    if (!currentQ) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50">Finalizing results...</div>;
    }

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <header className="px-6 py-4 flex items-center justify-between sticky top-0 bg-gray-50 z-10 transition-colors">
                <Link href="/" className="p-2 -ml-2 hover:bg-white rounded-full transition-colors text-slate-600">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="text-sm font-bold text-slate-400">
                    Question {currentQuestionIndex + 1} / {questions.length}
                </div>
                <div className="w-8"></div>
            </header>

            <div className="w-full bg-gray-200 h-1.5">
                <motion.div
                    className="h-full bg-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            <main className="flex-grow flex flex-col justify-center px-6 py-8 max-w-2xl mx-auto w-full">
                <div className="mb-4 text-center">
                    <h1 className="text-xl font-bold text-slate-800">Type 2 Diabetes Risk Test</h1>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 leading-tight">
                            {currentQ.text}
                        </h2>

                        <div className="space-y-4">
                            {currentQ.options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(idx)}
                                    className="w-full bg-white p-5 rounded-xl border border-gray-200 text-left hover:border-blue-500 hover:shadow-md transition-all group flex items-center justify-between"
                                >
                                    <span className="font-medium text-slate-700 group-hover:text-blue-700">{opt.label}</span>
                                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="mt-12 pt-8 border-t border-gray-200 text-slate-500 text-sm">
                    <h3 className="font-bold text-slate-700 mb-2">Why this question?</h3>
                    <p>This assessment follows standard medical screening guidelines for Type 2 Diabetes risk factors including genetics, lifestyle, and symptoms. Note: This result is for informational purposes only and is not a medical diagnosis.</p>
                </div>
            </main>
        </div>
    );
}
