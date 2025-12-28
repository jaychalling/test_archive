'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ricePurityQuestions } from '../questions';
import { ArrowRight, Check } from 'lucide-react';

interface QuizUIProps {
    onComplete: (score: number) => void;
}

const ITEMS_PER_PAGE = 20;

export default function QuizUI({ onComplete }: QuizUIProps) {
    // 100 boolean answers, default false (unchecked)
    const [answers, setAnswers] = useState<boolean[]>(new Array(100).fill(false));
    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = Math.ceil(ricePurityQuestions.length / ITEMS_PER_PAGE);

    // Calculate current slice
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const currentQuestions = ricePurityQuestions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const toggleAnswer = (globalIndex: number) => {
        const newAnswers = [...answers];
        newAnswers[globalIndex] = !newAnswers[globalIndex];
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Calculate Score: 100 - (number of true answers)
            const checkedCount = answers.filter(a => a).length;
            const finalScore = 100 - checkedCount;
            onComplete(finalScore);
        }
    };

    const progress = ((currentPage + 1) / totalPages) * 100;

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-2 mb-6">
                <h2 className="text-3xl font-black text-slate-800">2026 RICE PURITY TEST</h2>
                <p className="text-slate-500 font-medium">Check all that apply</p>
            </div>

            {/* Progress Bar */}
            <div className="sticky top-4 z-10 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm p-4 border border-slate-100 mb-8">
                <div className="flex justify-between text-sm font-bold text-slate-500 mb-2">
                    <span>Page {currentPage + 1} of {totalPages}</span>
                    <span>{Math.round(progress)}% Complete</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <motion.div
                        className="bg-gradient-to-r from-red-500 to-indigo-600 h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            {/* Questions List */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPage}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="divide-y divide-slate-100"
                    >
                        {currentQuestions.map((q, idx) => {
                            const globalIndex = startIndex + idx;
                            const isChecked = answers[globalIndex];

                            return (
                                <div
                                    key={globalIndex}
                                    onClick={() => toggleAnswer(globalIndex)}
                                    className={`p-5 flex items-start gap-4 cursor-pointer transition-all duration-200 hover:bg-slate-50
                                        ${isChecked ? 'bg-indigo-50/50' : ''}`}
                                >
                                    <div className={`mt-1 w-6 h-6 shrink-0 rounded-lg border-2 transition-all flex items-center justify-center
                                        ${isChecked
                                            ? 'bg-indigo-600 border-indigo-600 shadow-md scale-110'
                                            : 'border-slate-300 bg-white'}`}
                                    >
                                        {isChecked && <Check size={16} className="text-white" />}
                                    </div>
                                    <span className={`text-lg transition-colors ${isChecked ? 'text-indigo-900 font-medium' : 'text-slate-700'}`}>
                                        {globalIndex + 1}. {q}
                                    </span>
                                </div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Control */}
            <div className="flex justify-center pt-4 pb-12">
                <button
                    onClick={handleNext}
                    className="group px-10 py-4 rounded-2xl bg-slate-900 text-white font-bold text-xl shadow-xl hover:bg-black hover:scale-105 transition-all flex items-center gap-3"
                >
                    {currentPage === totalPages - 1 ? 'Calculate Score' : 'Next Page'}
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}
