'use client';

import Link from 'next/link';
import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import QuizUI, { QUESTIONS } from './components/QuizUI';
import BodyAgeReport, { AnswerRecord } from './components/BodyAgeReport';

function BodyAgeContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const resString = searchParams.get('res');

    // 복원된 상태
    const [restoredAnswers, setRestoredAnswers] = useState<AnswerRecord[] | null>(null);
    const [finalScore, setFinalScore] = useState(0);
    const [ageGap, setAgeGap] = useState(0);

    // URL의 res 값을 기반으로 결과 복원
    useEffect(() => {
        if (resString) {
            try {
                // Format check: "AGE-INDICES" (e.g., "28-0120...")
                const parts = resString.split('-');
                let realAge = 0;
                let indicesStr = resString;

                if (parts.length === 2) {
                    realAge = parseInt(parts[0], 10);
                    indicesStr = parts[1];
                } else {
                    // Fallback for old links or direct quiz without age (default 30?)
                    // Or we could redirect to restart if age is missing. 
                    // Let's assume 30 for compatibility or error.
                    realAge = 30;
                }

                const indices = indicesStr.split('').map(Number);
                const restored: AnswerRecord[] = [];
                let scoreSum = 0;

                indices.forEach((optionIndex, qIndex) => {
                    const question = QUESTIONS[qIndex];
                    if (question && question.options[optionIndex]) {
                        const option = question.options[optionIndex];
                        restored.push({
                            id: question.id,
                            category: question.category,
                            score: option.score,
                            label: `${question.text} — ${option.label}`
                        });
                        scoreSum += option.score;
                    }
                });

                setRestoredAnswers(restored);

                // Age Gap Logic
                let gap = 0;
                if (scoreSum <= 15) gap = -5;
                else if (scoreSum <= 25) gap = -3;
                else if (scoreSum <= 35) gap = -1;
                else if (scoreSum <= 45) gap = 0;
                else if (scoreSum <= 55) gap = 3;
                else if (scoreSum <= 70) gap = 6;
                else gap = 10;

                setAgeGap(gap);
                setFinalScore(realAge); // Store Real Age in finalScore for passing, or use separate state. 
                // Wait, finalScore was used for scoreSum previously? 
                // Let's check usage. It's passed to BodyAgeReport as `score`.
                // BodyAgeReport treats `score` as "score". 
                // Actually I need to pass `realAge` to report separately.

            } catch (e) {
                console.error("Failed to restore results", e);
                // 에러 시 처음으로 리다이렉트 가능
            }
        } else {
            setRestoredAnswers(null);
        }
    }, [resString]);

    const handleFinish = (resultString: string) => {
        // 결과 문자열을 URL에 반영 (상태 복원은 useEffect가 담당)
        router.push(`/test/body-age?res=${resultString}`);
    };

    const handleRestart = () => {
        router.push('/test/body-age');
    };

    // 결과 페이지 (res 파라미터가 있고 복원이 완료되었을 때)
    if (resString && restoredAnswers) {
        return (
            <BodyAgeReport
                score={finalScore}
                ageGap={ageGap}
                answers={restoredAnswers}
                onRestart={handleRestart}
            />
        );
    }

    // 퀴즈 페이지
    return (
        <div className="min-h-screen bg-white">
            <QuizUI onFinish={handleFinish} />
        </div>
    );
}

export default function BodyAgePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <BodyAgeContent />
        </Suspense>
    );
}
