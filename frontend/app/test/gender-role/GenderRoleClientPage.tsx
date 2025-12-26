'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { MODULES, QuestionItem, Module, TEST_META } from './questions';
import Landing from './components/Landing';
import QuestionCard from './components/QuestionCard';
import AnalysisReport from './components/AnalysisReport';

type ViewSate = 'landing' | 'quiz' | 'analyzing' | 'result';

interface Step {
    module: Module;
    item: QuestionItem;
}

export default function GenderRoleClientPage() {
    const [viewState, setViewState] = useState<ViewSate>('landing');
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Flatten logic to linear steps
    const steps = useMemo(() => {
        const flat: Step[] = [];
        MODULES.forEach(module => {
            module.items.forEach(item => {
                flat.push({ module, item });
            });
        });
        return flat;
    }, []);

    const totalSteps = steps.length;
    const currentStep = steps[currentStepIndex];
    const progress = ((currentStepIndex + 1) / totalSteps) * 100;

    // Scroll to top on step change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentStepIndex, viewState]);

    const handleStart = () => {
        setViewState('quiz');
        setCurrentStepIndex(0);
        setAnswers({});
    };

    const handleAnswer = (key: string, value: number) => {
        if (isTransitioning) return;
        setAnswers(prev => ({ ...prev, [key]: value }));

        const { module, item } = currentStep;

        if (module.responseType === 'Likert_5') {
            setTimeout(() => handleNext(), 250);
        } else if (module.responseType === 'Scenario_Dual_Rating') {
            // Check if this completes the scenario
            // We need to check against the state that includes the current key
            // Since 'answers' is stale, we check if all OTHER actions are already in 'answers'
            const allOtherActionsAnswered = item.actions?.every(action => {
                const actionKey = `${item.id}_${action.subId}`;
                if (actionKey === key) return true; // checking the one we just answered
                return answers[actionKey] !== undefined;
            }) ?? false;

            if (allOtherActionsAnswered) {
                setTimeout(() => handleNext(), 250);
            }
        }
    };

    const canProceed = () => {
        if (!currentStep) return false;
        const { module, item } = currentStep;

        if (module.responseType === 'Scenario_Dual_Rating') {
            // Check if both A and B are answered
            // Assuming actions always exist for scenario
            return item.actions?.every(action => answers[`${item.id}_${action.subId}`] !== undefined) ?? false;
        }

        // Simple Likert
        return answers[item.id.toString()] !== undefined;
    };

    const handleNext = () => {
        if (currentStepIndex < totalSteps - 1) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentStepIndex(prev => {
                    if (prev >= totalSteps - 1) return prev;
                    return prev + 1;
                });
                setIsTransitioning(false);
            }, 300);
        } else {
            finishTest();
        }
    };

    const handlePrev = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(prev => prev - 1);
        }
    };

    const finishTest = () => {
        setViewState('analyzing');
        setTimeout(() => {
            setViewState('result');
        }, 1500); // Fake loading time
    };

    if (viewState === 'landing') {
        return <Landing onStart={handleStart} />;
    }

    if (viewState === 'analyzing') {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                <p className="text-slate-600 dark:text-slate-300 font-medium animate-pulse">
                    Analyzing your responses...
                </p>
            </div>
        );
    }

    if (viewState === 'result') {
        return (
            <AnalysisReport
                answers={answers}
                onRestart={() => setViewState('landing')}
            />
        );
    }

    if (!currentStep) return null;

    // Quiz View
    return (
        <div className="max-w-2xl mx-auto px-4 py-4 flex flex-col">
            {/* Header / Progress */}
            <div className="mb-4 space-y-2 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10 py-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-end mb-2">
                    <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-none">
                        {TEST_META.title}
                    </h1>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                        <span>{currentStepIndex + 1} / {totalSteps}</span>
                    </div>
                </div>

                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-slate-900 dark:bg-white transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Question Content */}
            <div className={`flex-1 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                <QuestionCard
                    module={currentStep.module}
                    item={currentStep.item}
                    answers={answers}
                    onAnswer={handleAnswer}
                />
            </div>

            {/* Navigation */}
            <div className="pt-8 pb-12">
                <button
                    onClick={handlePrev}
                    disabled={currentStepIndex === 0}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${currentStepIndex === 0
                        ? 'text-slate-300 cursor-not-allowed opacity-0'
                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                        }`}
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous Step
                </button>
            </div>
        </div >
    );
}
