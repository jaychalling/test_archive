'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import QuizUI, { QUESTIONS } from './components/QuizUI';
import AnalysisReport from './components/AnalysisReport';

function DiabetesTestContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const resParam = searchParams.get('res');

    const handleFinish = (resultString: string) => {
        router.push(`/test/diabetes?res=${resultString}`);
    };

    const restart = () => {
        router.push('/test/diabetes');
    };

    // 결과 데이터 복원 로직
    const getReconstructedAnswers = () => {
        if (!resParam) return [];

        try {
            return resParam.split('').map((optIdxChar, qIdx) => {
                const q = QUESTIONS[qIdx];
                // 안전 장치: 질문 데이터가 없거나 옵션 인덱스가 유효하지 않은 경우 방어
                if (!q) return null;

                const optIdx = parseInt(optIdxChar, 10);
                const opt = q.options[optIdx] || q.options[0]; // 기본값 설정

                return {
                    id: q.id,
                    type: q.type,
                    text: q.text,
                    selectedLabel: `${q.text} — ${opt.label}`,
                    score: opt.score,
                    weight: q.weight,
                    weightedScore: opt.score * q.weight
                };
            }).filter(item => item !== null); // null 제거
        } catch (e) {
            console.error("Error reconstructing answers", e);
            return [];
        }
    };

    if (resParam) {
        const reconstructedAnswers = getReconstructedAnswers();
        // 복원된 데이터가 없으면(유효하지 않은 URL 등) 퀴즈로 리다이렉트하거나 에러 처리 가능
        // 여기서는 그냥 보여주되 리포트 컴포넌트가 처리하도록 함.

        return (
            <AnalysisReport answers={reconstructedAnswers} onRestart={restart} />
        );
    }

    return (
        <QuizUI onFinish={handleFinish} />
    );
}

export default function DiabetesTestPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">Loading test...</div>}>
            <DiabetesTestContent />
        </Suspense>
    );
}
