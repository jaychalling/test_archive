'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Landing from './components/Landing';
import QuizUI from './components/QuizUI';
import AnalysisReport from './components/AnalysisReport';
import { ScoreLevel } from './data/results';

export default function CognitiveClientPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [step, setStep] = useState<'landing' | 'quiz' | 'result'>('landing');
    const [resultData, setResultData] = useState<any>(null);

    // Parse URL result
    useEffect(() => {
        let res = searchParams.get('res');
        if (res) {
            try {
                // Decode if Base64
                if (res.length > 5 && (/[a-zA-Z]/.test(res)) && !res.includes('-')) {
                    try {
                        res = atob(res);
                    } catch { /* use raw */ }
                }

                // Format: "BrainAge-Frontal-Temporal-Parietal"
                // e.g. "28-High-Mid-High"
                const parts = res.split('-');
                if (parts.length >= 4) {
                    const brainAge = parseInt(parts[0], 10);
                    const frontal = parts[1] as ScoreLevel;
                    const temporal = parts[2] as ScoreLevel;
                    const parietal = parts[3] as ScoreLevel;

                    const rawScores = {
                        frontal: frontal === 'High' ? 88 : frontal === 'Mid' ? 55 : 30,
                        temporal: temporal === 'High' ? 88 : temporal === 'Mid' ? 55 : 30,
                        parietal: parietal === 'High' ? 88 : parietal === 'Mid' ? 55 : 30,
                    };

                    setResultData({
                        brainAge,
                        frontal,
                        temporal,
                        parietal,
                        rawScores
                    });
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

    const handleFinish = (resultString: string, data: any) => {
        const encoded = btoa(resultString);
        router.push(`?res=${encoded}`, { scroll: false });
        setResultData(data);
        setStep('result');
        window.scrollTo(0, 0);
    };

    const handleRetake = () => {
        router.push(window.location.pathname, { scroll: false });
        setStep('landing');
        setResultData(null);
        window.scrollTo(0, 0);
    };

    return (
        <main className="min-h-screen bg-white py-8 px-4 font-sans">
            <div className="max-w-4xl mx-auto">
                {step === 'landing' && <Landing onStart={handleStart} />}
                {step === 'quiz' && <QuizUI onFinish={handleFinish} />}
                {step === 'result' && resultData && (
                    <AnalysisReport
                        scores={{
                            frontal: resultData.frontal,
                            temporal: resultData.temporal,
                            parietal: resultData.parietal,
                            brainAge: resultData.brainAge,
                            rawScores: resultData.rawScores
                        }}
                        onRetake={handleRetake}
                    />
                )}
            </div>
        </main>
    );
}
