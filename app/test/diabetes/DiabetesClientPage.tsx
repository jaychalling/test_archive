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
        let res = searchParams.get('res');
        if (res) {
            try {
                // Try to decode Base64 if it looks like one
                if (res.length > 20 && !res.includes('0') && !res.includes('1') && !res.includes('2')) {
                    // actually simple check: if it's strictly numbers, it's old format.
                }
                // More robust check: try atob first
                try {
                    const decoded = atob(res);
                    if (decoded.length >= QUESTIONS.length) {
                        res = decoded;
                    }
                } catch {
                    // fallback to raw if atob fails
                }

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
            } catch (e) {
                console.error("Failed to decode result", e);
            }
        }
    }, [searchParams]);

    const handleStart = () => {
        setStep('quiz');
        window.scrollTo(0, 0);
    };

    const handleFinish = (resultString: string) => {
        // Sync with URL for shareability - use Base64 encoding
        const encodedRes = btoa(resultString);
        router.push(`?res=${encodedRes}`, { scroll: false });

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
