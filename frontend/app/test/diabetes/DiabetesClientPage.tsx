'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Landing from './components/Landing';
import QuizUI, { QUESTIONS } from './components/QuizUI';
import AnalysisReport from './components/AnalysisReport';

export default function DiabetesClientPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [step, setStep] = useState<'landing' | 'quiz' | 'result'>('landing');
    const [resultData, setResultData] = useState<any[]>([]);

    // Handle initial result from URL
    useEffect(() => {
        const res = searchParams.get('res');
        if (res && res.length === QUESTIONS.length) {
            const indices = res.split('').map(Number);
            const processed = indices.map((optIdx, qIdx) => {
                const q = QUESTIONS[qIdx];
                const opt = q.options[optIdx];
                return {
                    ...q,
                    selectedOption: opt,
                    score: opt.score,
                    weightedScore: opt.score * q.weight
                };
            });
            setResultData(processed);
            setStep('result');
        }
    }, [searchParams]);

    const handleStart = () => {
        setStep('quiz');
        window.scrollTo(0, 0);
    };

    const handleFinish = (resultString: string) => {
        // Sync with URL for shareability
        router.push(`?res=${resultString}`, { scroll: false });

        const indices = resultString.split('').map(Number);
        const processed = indices.map((optIdx, qIdx) => {
            const q = QUESTIONS[qIdx];
            const opt = q.options[optIdx];
            return {
                ...q,
                selectedOption: opt,
                score: opt.score,
                weightedScore: opt.score * q.weight
            };
        });
        setResultData(processed);
        setStep('result');
        window.scrollTo(0, 0);
    };

    const handleRestart = () => {
        router.push(window.location.pathname, { scroll: false });
        setStep('landing');
        setResultData([]);
        window.scrollTo(0, 0);
    };

    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto">
                {step === 'landing' && <Landing onStart={handleStart} />}
                {step === 'quiz' && <QuizUI onFinish={handleFinish} />}
                {step === 'result' && <AnalysisReport answers={resultData} onRestart={handleRestart} />}
            </div>
        </main>
    );
}
