'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Landing from './components/Landing';
import QuestionCard from './components/QuestionCard';
import AnalysisReport from './components/AnalysisReport';
import { MODULES, TEST_META } from './questions';

export default function GenderRoleClientPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [step, setStep] = useState<'landing' | 'quiz' | 'result'>('landing');
    const [currentModuleIdx, setCurrentModuleIdx] = useState(0);
    const [currentItemIdx, setCurrentItemIdx] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});

    useEffect(() => {
        const res = searchParams.get('res');
        if (res) {
            try {
                const decoded = JSON.parse(atob(res));
                setAnswers(decoded);
                setStep('result');
            } catch (e) {
                console.error("Failed to decode result", e);
            }
        }
    }, [searchParams]);

    const handleStart = () => {
        setStep('quiz');
        window.scrollTo(0, 0);
    };

    const handleAnswer = (key: string, value: number) => {
        const newAnswers = { ...answers, [key]: value };
        setAnswers(newAnswers);

        const currentModule = MODULES[currentModuleIdx];

        // If it's a Likert module, we auto-advance when answered.
        // If it's a Scenario module, we might need to check if all actions are answered?
        // Actually, let's keep it simple: manual "Next" button for scenarios?
        // No, current QuestionCard doesn't have a "Next" button.

        const isScenario = currentModule.responseType === 'Scenario_Dual_Rating';

        if (isScenario) {
            // For scenarios, we wait for all actions to be filled.
            const allActionsAnswered = currentModule.items[currentItemIdx].actions?.every(
                action => newAnswers[`${currentModule.items[currentItemIdx].id}_${action.subId}`] !== undefined
            );
            if (!allActionsAnswered) return;
        }

        // Advance logic
        setTimeout(() => {
            if (currentItemIdx < currentModule.items.length - 1) {
                setCurrentItemIdx(currentItemIdx + 1);
                window.scrollTo(0, 0);
            } else if (currentModuleIdx < MODULES.length - 1) {
                setCurrentModuleIdx(currentModuleIdx + 1);
                setCurrentItemIdx(0);
                window.scrollTo(0, 0);
            } else {
                // Finish
                const resString = btoa(JSON.stringify(newAnswers));
                router.push(`?res=${encodeURIComponent(resString)}`, { scroll: false });
                setStep('result');
                window.scrollTo(0, 0);
            }
        }, 400);
    };

    const handleRestart = () => {
        router.push(window.location.pathname, { scroll: false });
        setStep('landing');
        setAnswers({});
        setCurrentModuleIdx(0);
        setCurrentItemIdx(0);
        window.scrollTo(0, 0);
    };

    const currentModule = MODULES[currentModuleIdx];
    const currentItem = currentModule?.items[currentItemIdx];

    return (
        <main className="min-h-screen bg-white py-8 px-4 font-sans">
            <div className="max-w-4xl mx-auto">
                {step === 'landing' && <Landing onStart={handleStart} />}

                {step === 'quiz' && currentItem && (
                    <div className="space-y-8">
                        {/* Progress */}
                        <div className="max-w-2xl mx-auto">
                            <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
                                <span>Part {currentModuleIdx + 1}</span>
                                <span>{Math.round(((currentModuleIdx * 10 + currentItemIdx) / 32) * 100)}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-600 transition-all duration-500"
                                    style={{ width: `${((currentModuleIdx * 10 + currentItemIdx) / 32) * 100}%` }}
                                />
                            </div>
                        </div>

                        <QuestionCard
                            module={currentModule}
                            item={currentItem}
                            answers={answers}
                            onAnswer={handleAnswer}
                        />
                    </div>
                )}

                {step === 'result' && <AnalysisReport answers={answers} onRestart={handleRestart} />}
            </div>
        </main>
    );
}
