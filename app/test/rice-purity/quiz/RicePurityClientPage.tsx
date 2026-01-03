'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Landing from './components/Landing';
import QuizUI from './components/QuizUI';
import AnalysisReport from './components/AnalysisReport';

export default function RicePurityClientPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [step, setStep] = useState<'landing' | 'quiz' | 'result'>('landing');
    const [score, setScore] = useState(100);

    // URL에서 결과 복구 (공유 링크 지원) - 필수 기능
    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        let res = searchParams.get('res');
        if (!res) return;

        // Decode if Base64
        if (/[a-zA-Z]/.test(res)) {
            try {
                res = atob(res);
            } catch { /* use raw */ }
        }

        const parsedScore = Number.parseInt(res, 10);
        if (Number.isNaN(parsedScore)) return;
        setScore(parsedScore);
        setStep('result');
    }, [searchParams]);
    /* eslint-enable react-hooks/set-state-in-effect */

    const handleStart = () => {
        setStep('quiz');
        window.scrollTo(0, 0);
    };

    const handleComplete = (finalScore: number) => {
        setScore(finalScore);
        const encoded = btoa(finalScore.toString());
        router.push(`?res=${encoded}`, { scroll: false });
        setStep('result');
        window.scrollTo(0, 0);
    };

    const handleRetake = () => {
        setScore(100);
        router.push(window.location.pathname, { scroll: false });
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
