'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Landing from './components/Landing';
import QuizUI from './components/QuizUI';
import AnalysisReport from './components/AnalysisReport';

export default function IQTestClientPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [step, setStep] = useState<'landing' | 'quiz' | 'result'>('landing');
    const [resultCode, setResultCode] = useState<string>('');

    useEffect(() => {
        let res = searchParams.get('res');
        if (res) {
            try {
                // Heuristic: if it looks like Base64 (longer and contains non-digits), try to decode
                if (res.length > 5 && (/[a-zA-Z]/.test(res))) {
                    try {
                        res = atob(res);
                    } catch {
                        // ignore and use raw
                    }
                }
                setResultCode(res);
                setStep('result');
            } catch (e) {
                console.error("Failed to process result", e);
            }
        }
    }, [searchParams]);

    const handleStart = () => {
        setStep('quiz');
        window.scrollTo(0, 0);
    };

    const handleFinish = (resultString: string) => {
        const encoded = btoa(resultString);
        router.push(`?res=${encoded}`, { scroll: false });
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
