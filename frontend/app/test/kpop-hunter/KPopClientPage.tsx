'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import QuizUI from './components/QuizUI';
import AnalysisReport from './components/AnalysisReport';

function HunterTestContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const res = searchParams.get('res');

    // Finish handler: Convert results to URL params
    const handleFinish = (resString: string) => {
        router.push(`/test/kpop-hunter?res=${resString}`);
    };

    const handleRestart = () => {
        router.push('/test/kpop-hunter');
    };

    return (
        <main className="min-h-screen bg-white">
            {res ? (
                <AnalysisReport res={res} onRestart={handleRestart} />
            ) : (
                <QuizUI onFinish={handleFinish} />
            )}
        </main>
    );
}

export default function HunterTestPage() {
    return (
        <Suspense fallback={<div className="flex justify-center py-20">Loading Database...</div>}>
            <HunterTestContent />
        </Suspense>
    );
}
