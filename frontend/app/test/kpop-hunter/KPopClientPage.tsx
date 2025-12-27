'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Landing from './components/Landing';
import QuizUI from './components/QuizUI';
import AnalysisReport from './components/AnalysisReport';

export default function KPopClientPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [step, setStep] = useState<'landing' | 'quiz' | 'result'>('landing');
    const [resultCode, setResultCode] = useState<string>('');

    useEffect(() => {
        const res = searchParams.get('res');
        if (res) {
            setResultCode(res);
            setStep('result');
        }
    }, [searchParams]);

    const handleStart = () => {
        setStep('quiz');
        window.scrollTo(0, 0);
    };

    const handleFinish = (resultString: string) => {
        router.push(`?res=${resultString}`, { scroll: false });
        setResultCode(resultString);
        setStep('result');
        window.scrollTo(0, 0);
    };

    const handleRestart = () => {
        router.push(window.location.pathname, { scroll: false });
        setStep('landing');
        setResultCode('');
        window.scrollTo(0, 0);
    };

    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto">
                {step === 'landing' && <Landing onStart={handleStart} />}
                {step === 'quiz' && <QuizUI onFinish={handleFinish} />}
                {step === 'result' && <AnalysisReport res={resultCode} onRestart={handleRestart} />}
            </div>
        </main>
    );
}
