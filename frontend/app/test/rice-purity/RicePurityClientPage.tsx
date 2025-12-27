'use client';

import React, { useState } from 'react';
import Landing from './components/Landing';
import QuizUI from './components/QuizUI';
import AnalysisReport from './components/AnalysisReport';

export default function RicePurityClientPage() {
    const [step, setStep] = useState<'landing' | 'quiz' | 'result'>('landing');
    const [score, setScore] = useState(100);

    const handleStart = () => {
        setStep('quiz');
        window.scrollTo(0, 0);
    };

    const handleComplete = (finalScore: number) => {
        setScore(finalScore);
        setStep('result');
        window.scrollTo(0, 0);
    };

    const handleRetake = () => {
        setScore(100);
        setStep('landing');
        window.scrollTo(0, 0);
    };

    return (
        <main className="min-h-screen bg-white py-8 px-4 font-sans">
            <div className="max-w-4xl mx-auto">
                {step === 'landing' && <Landing onStart={handleStart} />}
                {step === 'quiz' && <QuizUI onComplete={handleComplete} />}
                {step === 'result' && <AnalysisReport score={score} onRetake={handleRetake} />}
            </div>
        </main>
    );
}
