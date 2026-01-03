'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Landing from './components/Landing';
import QuizUI from './components/QuizUI';
import AnalysisReport from './components/AnalysisReport';

export default function MoneyScriptClientPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [step, setStep] = useState<'landing' | 'quiz' | 'result'>('landing');
    const [resultCode, setResultCode] = useState<string>('Avoidance');

    useEffect(() => {
        let res = searchParams.get('res');
        if (!res) {
            setStep('landing');
            return;
        }

        // Decode if Base64
        try {
            // Check if it looks like base64 (simple check)
            // Note: searchParams automatically decodes URI components, so '+' becomes ' ' if not encoded properly in URL.
            // But if we generated URL with encodeURIComponent, searchParams.get will give us back the '+' correctly.

            // If the string has spaces, it might be due to '+' substitution. We can try to fix it.
            if (res.includes(' ')) {
                res = res.replace(/ /g, '+');
            }

            if (/^[A-Za-z0-9+/=]+$/.test(res) && res.length % 4 === 0) {
                const decoded = atob(res);
                // If decoded is one of the valid types (simple validation)
                if (['Avoidance', 'Worship', 'Status', 'Vigilance'].includes(decoded)) {
                    res = decoded;
                }
            }
        } catch (e) {
            // If decode fails, assume raw or invalid, but we'll try to use it if it matches a type
        }

        // Final validation
        if (['Avoidance', 'Worship', 'Status', 'Vigilance'].includes(res)) {
            setResultCode(res);
            setStep('result');
        } else {
            // If invalid result, go to landing
            setStep('landing');
        }

    }, [searchParams]);

    const handleStart = () => {
        setStep('quiz');
        window.scrollTo(0, 0);
    };

    const handleFinish = (result: string) => {
        setResultCode(result);
        const encoded = btoa(result);
        // Important: Encode URL component to preserve '+' and other chars
        router.push(`?res=${encodeURIComponent(encoded)}`, { scroll: false });
        setStep('result');
        window.scrollTo(0, 0);
    };

    const handleRetake = () => {
        router.push(window.location.pathname, { scroll: false });
        setStep('landing');
        window.scrollTo(0, 0);
    };

    return (
        <main className="min-h-screen bg-neutral-900 text-stone-100 font-sans">
            <div className="max-w-4xl mx-auto">
                {step === 'landing' && <Landing onStart={handleStart} />}
                {step === 'quiz' && <QuizUI onFinish={handleFinish} />}
                {step === 'result' && <AnalysisReport resultCode={resultCode} />}
            </div>
        </main>
    );
}
