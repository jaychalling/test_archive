'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS, calculateResult } from '../questions';

interface Props {
    onFinish: (result: string) => void;
}

export default function QuizUI({ onFinish }: Props) {
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);

    // Safety check for empty questions
    if (!QUESTIONS || QUESTIONS.length === 0) {
        return <div>Error: No questions found.</div>;
    }

    const currentQ = QUESTIONS[currentQIndex];

    const handleAnswer = (score: number) => {
        const newAnswers = [...answers, score];
        setAnswers(newAnswers);

        if (currentQIndex < QUESTIONS.length - 1) {
            // Slight delay for better UX
            setTimeout(() => {
                setCurrentQIndex(prev => prev + 1);
            }, 200);
        } else {
            // Finish
            const resultType = calculateResult(newAnswers);
            onFinish(resultType);
        }
    };

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
                    <span className="uppercase tracking-wider text-xs">{currentQ.category} Check</span>
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
                            {currentQ.text}
                        </h2>
                    </motion.div>
                </AnimatePresence>

                <div className="grid grid-cols-6 gap-2 md:gap-4">
                    {[1, 2, 3, 4, 5, 6].map((score) => (
                        <button
                            key={score}
                            onClick={() => handleAnswer(score)}
                            className={`
                                relative aspect-square rounded-xl md:rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center group
                                ${score <= 3
                                    ? 'border-neutral-700 hover:border-stone-500 hover:bg-neutral-800 text-stone-400'
                                    : 'border-red-900/30 hover:border-red-500 hover:bg-red-900/20 text-red-100'}
                            `}
                        >
                            <span className={`text-lg md:text-2xl font-bold ${score >= 5 ? 'text-red-500' : 'text-stone-300'}`}>
                                {score}
                            </span>
                            <span className="absolute bottom-2 text-[0.6rem] md:text-xs uppercase font-bold tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity text-center px-1">
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
