'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Landing from './components/Landing';
import QuizUI, { QUESTIONS } from './components/QuizUI';
import BodyAgeReport, { AnswerRecord } from './components/BodyAgeReport';

export default function BodyAgeClientPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [step, setStep] = useState<'landing' | 'quiz' | 'result'>('landing');
    const [resultData, setResultData] = useState<{ ageGap: number, realAge: number, answers: AnswerRecord[] } | null>(null);

    const processResult = (resultString: string) => {
        const [ageStr, indicesStr] = resultString.split('-');
        const realAge = parseInt(ageStr);
        const indices = indicesStr.split('').map(Number);

        let totalPenalty = 0;
        const processedAnswers: AnswerRecord[] = indices.map((optIdx, qIdx) => {
            const q = QUESTIONS[qIdx];
            const opt = q.options[optIdx];
            totalPenalty += opt.score;
            return {
                id: q.id,
                category: q.category,
                score: opt.score,
                label: opt.label
            };
        });

        // Simplified Age Gap Logic: totalPenalty / 5 - 5 (Center at 0)
        const ageGap = Math.round(totalPenalty / 5) - 5;

        return { ageGap, realAge, answers: processedAnswers };
    };

    useEffect(() => {
        const res = searchParams.get('res');
        if (res && res.includes('-')) {
            const data = processResult(res);
            setResultData(data);
            setStep('result');
        }
    }, [searchParams]);

    const handleStart = () => {
        setStep('quiz');
        window.scrollTo(0, 0);
    };

    const handleFinish = (resultString: string) => {
        router.push(`?res=${resultString}`, { scroll: false });
        const data = processResult(resultString);
        setResultData(data);
        setStep('result');
        window.scrollTo(0, 0);
    };

    const handleRestart = () => {
        router.push(window.location.pathname, { scroll: false });
        setStep('landing');
        setResultData(null);
        window.scrollTo(0, 0);
    };

    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto">
                {step === 'landing' && <Landing onStart={handleStart} />}
                {step === 'quiz' && <QuizUI onFinish={handleFinish} />}
                {step === 'result' && resultData && (
                    <BodyAgeReport
                        ageGap={resultData.ageGap}
                        score={resultData.realAge}
                        realAge={resultData.realAge}
                        answers={resultData.answers}
                        onRestart={handleRestart}
                    />
                )}
            </div>
        </main>
    );
}
