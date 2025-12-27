'use client';

import React, { useState } from 'react';
import Landing from './components/Landing';
import QuizUI from './components/QuizUI';

export default function CognitiveClientPage() {
    const [step, setStep] = useState<'landing' | 'quiz'>('landing');

    const handleStart = () => {
        setStep('quiz');
        window.scrollTo(0, 0);
    };

    return (
        <main className="min-h-screen bg-white py-8 px-4 font-sans">
            <div className="max-w-4xl mx-auto">
                {step === 'landing' && <Landing onStart={handleStart} />}
                {step === 'quiz' && <QuizUI />}
            </div>
        </main>
    );
}
