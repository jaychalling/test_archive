'use client';

import React, { useState } from 'react';
import { ChevronRight, BrainCircuit, Activity } from 'lucide-react';

import { QUESTIONS } from '../questions';

export default function QuizUI({ onFinish }: { onFinish: (res: string) => void }) {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // 진행 상태 안전 장치 (transition lock)
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleAnswer = (idx: number) => {
        // 더블 클릭 방지 및 분석 중 클릭 방지
        if (isTransitioning || isAnalyzing) return;

        setIsTransitioning(true);
        const newAnswers = [...answers, idx];
        setAnswers(newAnswers);

        // 약간의 딜레이 후 다음 문제로 넘어감 (UX)
        setTimeout(() => {
            if (step < QUESTIONS.length - 1) {
                setStep(step + 1);
                window.scrollTo(0, 0);
                setIsTransitioning(false);
            } else {
                // MANDATORY: 3-second Analyzing Animation
                setIsAnalyzing(true);
                setTimeout(() => {
                    onFinish(newAnswers.join(''));
                }, 3000);
            }
        }, 250); // 짧은 딜레이로 터치 반응감 제공
    };

    if (isAnalyzing) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6 animate-in fade-in duration-700">
                <div className="relative w-24 h-24 mb-8">
                    <div className="absolute inset-0 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                        <BrainCircuit className="w-10 h-10 text-blue-600" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-slate-900">Analyzing Your Soul Frequency...</h2>
                <p className="text-slate-500">Synchronizing with K-Pop Hunter Database.</p>
                <div className="mt-6 flex gap-2 justify-center"><Activity className="animate-bounce text-blue-400" /></div>
            </div>
        );
    }

    const currentQ = QUESTIONS[step];
    // 방어 코드
    if (!currentQ) return <div className="p-10 text-center">Loading Question...</div>;

    return (
        <div className="max-w-md mx-auto px-6 py-12 min-h-[80vh]">
            <div className="mb-6">
                <h1 className="text-xl font-bold text-slate-900">K-Pop Demon Hunter Character Test</h1>
            </div>

            <div className="mb-8">
                <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
                    <span>Question {step + 1}</span>
                    <span>{Math.round(((step + 1) / QUESTIONS.length) * 100)}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 transition-all duration-300 ease-out" style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} />
                </div>
            </div>

            <div key={step} className="animate-in slide-in-from-right-4 duration-300"> {/* 문제 변경 시 애니메이션 효과 */}
                <h2 className="text-2xl font-bold text-slate-900 mb-8 leading-tight">{currentQ.text}</h2>
                <div className="grid gap-3">
                    {currentQ.options.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => handleAnswer(i)}
                            disabled={isTransitioning}
                            className="w-full p-5 text-left border border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 active:scale-[0.98] transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-slate-700 group-hover:text-blue-900">{opt.label}</span>
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 text-slate-500 text-sm">
                <h3 className="font-bold text-slate-700 mb-2">About this Test</h3>
                <p>This psychological test is designed based on Jungian archetypes reinterpreted through K-Pop group dynamics. It analyzes your subconscious behavioral patterns to determine which Demon Hunter character best represents your soul.</p>
            </div>
        </div>
    );
}
