'use client';

import React, { useState } from 'react';
import { ChevronRight, BrainCircuit, Activity, Lightbulb, Calculator, Shapes } from 'lucide-react';
import { QUESTIONS } from '../questions';
import { PatternRenderer } from './ShapeRenderer';

export default function QuizUI({ onFinish }: { onFinish: (res: string) => void }) {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleAnswer = (idx: number) => {
        if (isTransitioning || isAnalyzing) return;

        setIsTransitioning(true);
        const newAnswers = [...answers, idx];
        setAnswers(newAnswers);

        setTimeout(() => {
            if (step < QUESTIONS.length - 1) {
                setStep(step + 1);
                window.scrollTo(0, 0);
                setIsTransitioning(false);
            } else {
                setIsAnalyzing(true);
                setTimeout(() => {
                    onFinish(newAnswers.join(''));
                }, 3000);
            }
        }, 250);
    };

    if (isAnalyzing) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6 animate-in fade-in duration-700">
                <div className="relative w-24 h-24 mb-8">
                    <div className="absolute inset-0 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                        <BrainCircuit className="w-10 h-10 text-indigo-600" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-slate-900">Calculating Your IQ Score...</h2>
                <p className="text-slate-500">Analyzing cognitive performance across all domains.</p>
                <div className="mt-6 flex gap-2 justify-center">
                    <Activity className="animate-bounce text-indigo-400" />
                </div>
            </div>
        );
    }

    const currentQ = QUESTIONS[step];
    if (!currentQ) return <div className="p-10 text-center">Loading Question...</div>;

    // Section info
    const getSectionInfo = (section: string) => {
        switch (section) {
            case 'verbal':
                return { icon: Lightbulb, label: 'Verbal Reasoning', color: 'text-indigo-600', bg: 'bg-indigo-50' };
            case 'numerical':
                return { icon: Calculator, label: 'Numerical Ability', color: 'text-purple-600', bg: 'bg-purple-50' };
            case 'spatial':
                return { icon: Shapes, label: 'Spatial Reasoning', color: 'text-blue-600', bg: 'bg-blue-50' };
            default:
                return { icon: BrainCircuit, label: 'IQ Test', color: 'text-slate-600', bg: 'bg-slate-50' };
        }
    };

    const sectionInfo = getSectionInfo(currentQ.section);
    const SectionIcon = sectionInfo.icon;

    // Calculate section progress
    const verbalEnd = 15;
    const numericalEnd = 30;
    const spatialEnd = 50;

    let sectionProgress = 0;
    let sectionTotal = 0;
    let sectionNumber = 0;

    if (step < verbalEnd) {
        sectionProgress = step + 1;
        sectionTotal = 15;
        sectionNumber = step + 1;
    } else if (step < numericalEnd) {
        sectionProgress = step - verbalEnd + 1;
        sectionTotal = 15;
        sectionNumber = step - verbalEnd + 1;
    } else {
        sectionProgress = step - numericalEnd + 1;
        sectionTotal = 20;
        sectionNumber = step - numericalEnd + 1;
    }

    return (
        <div className="max-w-md mx-auto px-6 py-6 min-h-[60vh]">
            {/* Header */}
            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-base font-bold text-slate-900">2025 Free IQ Test</h1>
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${sectionInfo.bg} ${sectionInfo.color}`}>
                        {sectionInfo.label}
                    </span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
                <div className="flex justify-between text-xs font-bold text-slate-400 mb-1 uppercase tracking-widest">
                    <span className="flex items-center gap-1">
                        <SectionIcon size={12} />
                        Q{sectionNumber} of {sectionTotal}
                    </span>
                    <span>Overall: {step + 1}/50 ({Math.round(((step + 1) / QUESTIONS.length) * 100)}%)</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 transition-all duration-300 ease-out"
                        style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                    />
                </div>
                {/* Section mini-progress */}
                <div className="mt-2 flex gap-1">
                    <div className={`h-1 flex-1 rounded-full ${step >= 0 ? 'bg-indigo-200' : 'bg-slate-100'}`}>
                        <div
                            className="h-full bg-indigo-500 rounded-full transition-all"
                            style={{ width: step < 15 ? `${(step + 1) / 15 * 100}%` : '100%' }}
                        />
                    </div>
                    <div className={`h-1 flex-1 rounded-full ${step >= 15 ? 'bg-purple-200' : 'bg-slate-100'}`}>
                        <div
                            className="h-full bg-purple-500 rounded-full transition-all"
                            style={{ width: step >= 15 && step < 30 ? `${(step - 14) / 15 * 100}%` : step >= 30 ? '100%' : '0%' }}
                        />
                    </div>
                    <div className={`h-1 flex-1 rounded-full ${step >= 30 ? 'bg-blue-200' : 'bg-slate-100'}`}>
                        <div
                            className="h-full bg-blue-500 rounded-full transition-all"
                            style={{ width: step >= 30 ? `${(step - 29) / 20 * 100}%` : '0%' }}
                        />
                    </div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Verbal</span>
                    <span>Numerical</span>
                    <span>Spatial</span>
                </div>
            </div>

            {/* Question */}
            <div key={step} className="animate-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold ${sectionInfo.color}`}>
                        Difficulty: {'*'.repeat(currentQ.difficulty)}{'*'.repeat(5 - currentQ.difficulty).split('').map(() => ' ').join('')}
                    </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-6 leading-tight whitespace-pre-line">
                    {currentQ.text}
                </h2>

                {/* Visual Pattern (if exists) */}
                {currentQ.visualPattern && (
                    <div className="mb-6">
                        <PatternRenderer pattern={currentQ.visualPattern} />
                    </div>
                )}
                {!currentQ.visualPattern && currentQ.section === 'spatial' && (
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-700">
                        Debug: No visual pattern for Q{currentQ.id}
                    </div>
                )}

                {/* 4-Button Grid */}
                <div className="grid grid-cols-1 gap-3">
                    {currentQ.options.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => handleAnswer(i)}
                            disabled={isTransitioning}
                            className="w-full p-4 text-left border border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 active:scale-[0.98] transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600">
                                        {String.fromCharCode(65 + i)}
                                    </span>
                                    <span className="font-medium text-slate-700 group-hover:text-indigo-900">
                                        {opt.label}
                                    </span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-transform group-hover:translate-x-1" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Footer Info */}
            <div className="mt-8 pt-6 border-t border-slate-100 text-slate-500 text-sm">
                <h3 className="font-bold text-slate-700 mb-2">About This Section</h3>
                <p>
                    {currentQ.section === 'verbal' && 'Verbal reasoning measures your ability to understand and use language, including vocabulary, analogies, and logical deductions.'}
                    {currentQ.section === 'numerical' && 'Numerical ability tests your quantitative reasoning, mathematical skills, and pattern recognition with numbers.'}
                    {currentQ.section === 'spatial' && 'Spatial reasoning evaluates your ability to visualize and manipulate shapes, patterns, and spatial relationships.'}
                </p>
            </div>
        </div>
    );
}
