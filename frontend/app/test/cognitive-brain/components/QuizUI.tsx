"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { QUESTIONS, calculateResult, COGNITIVE_BLUEPRINT } from '../questions';
import BrainMap from './BrainMap';
import DigitSpanTask from './DigitSpanTask';
import RotationTask from './RotationTask';
import GoNoGoTask from './GoNoGoTask';
import { MEMORY_POOL, LOGIC_POOL, SOCIAL_POOL } from '../data/pools';
import TrailMakingTask from './TrailMakingTask';

// Local WORD_POOL removed, using MEMORY_POOL from data/pools.ts

export default function QuizUI() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string | number>>({});
    const [showResult, setShowResult] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [targetWords, setTargetWords] = useState<string[]>([]);

    // Dynamic Tasks Scoring
    const [sequentialScore, setSequentialScore] = useState(0);
    const [poolData, setPoolData] = useState<any>(null);

    // Q10 Recognition Options (Memoized to stay constant during render)
    const recognitionOptions = useMemo(() => {
        if (targetWords.length === 0) return [];
        // Pick 1 correct
        const correct = targetWords[0];
        // Combine all words from all MEMORY_POOL sets as distractors
        const allWords = MEMORY_POOL.flat();
        const distractors = allWords.filter(w => !targetWords.includes(w)).sort(() => 0.5 - Math.random()).slice(0, 3);
        return [correct, ...distractors].sort(() => 0.5 - Math.random());
    }, [targetWords]);

    const currentQuestion = QUESTIONS[currentStep];

    // Persist Q7 Memory Words
    useEffect(() => {
        if (currentQuestion?.id === 7 && targetWords.length === 0) {
            // Randomly pick ONE set from MEMORY_POOL
            const selectedSet = MEMORY_POOL[Math.floor(Math.random() * MEMORY_POOL.length)];
            setTargetWords(selectedSet);
        }
    }, [currentQuestion, targetWords]);

    // Logic/Social Pool Extraction
    useEffect(() => {
        const config = COGNITIVE_BLUEPRINT[currentQuestion?.id] as any;
        if (config?.type === 'pool-select') {
            let selected: any = null;
            if (config.poolId === 'LOGIC_SYLLOGISM') {
                selected = LOGIC_POOL.syllogism[Math.floor(Math.random() * LOGIC_POOL.syllogism.length)];
            } else if (config.poolId === 'LOGIC_ANALOGY') {
                selected = LOGIC_POOL.analogy[Math.floor(Math.random() * LOGIC_POOL.analogy.length)];
            } else if (config.poolId === 'SOCIAL') {
                selected = SOCIAL_POOL[Math.floor(Math.random() * SOCIAL_POOL.length)];
            }
            setPoolData(selected);
        } else {
            setPoolData(null);
        }
    }, [currentQuestion]);

    // Timer Logic (Fluency, Registration)
    useEffect(() => {
        if (!currentQuestion?.timeLimit && timeLeft === null) return;

        // Init timer if question has limit and timer not running
        if (currentQuestion?.timeLimit && timeLeft === null) {
            setTimeLeft(currentQuestion.timeLimit);
        }

        if (timeLeft === 0) {
            handleAnswer(""); // Auto advance
            return;
        }

        if (timeLeft !== null && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [currentQuestion, timeLeft]);



    const handleAnswer = (val: string | number | null, score?: number) => {
        if (score !== undefined) {
            setAnswers(prev => ({ ...prev, [currentQuestion.id]: score }));
        } else if (val !== null) {
            setAnswers(prev => ({ ...prev, [currentQuestion.id]: val }));
        }

        // Reset Timer
        setTimeLeft(null);

        if (currentStep < QUESTIONS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            finishTest();
        }
    };

    const finishTest = () => {
        setShowResult(true);
    };

    if (showResult) {
        // Calculate dynamic memory score (Q9, Q10)
        // Q9: Recall. Check if text input is in targetWords
        const q9Answer = answers[9] as string;
        const q9Correct = targetWords.includes(q9Answer?.trim());

        // Q10: Recognition. Check if choice is in targetWords
        const q10Answer = answers[10] as string;
        const q10Correct = targetWords.includes(q10Answer);

        const memoryScore = (q9Correct ? 1 : 0) + (q10Correct ? 1 : 0);

        // Final Calculation
        const result = calculateResult(answers, memoryScore, sequentialScore);

        // Simple Result View for now (AnalysisReport.tsx will handle this properly later)
        return (
            <div className="flex flex-col items-center justify-center p-6 min-h-screen bg-white text-gray-800">
                <h1 className="text-3xl font-bold mb-6 text-purple-700">분석 완료</h1>
                <BrainMap scores={result.scores} className="mb-8" />

                <div className="bg-gray-100 p-6 rounded-2xl max-w-md w-full mb-8">
                    <div className="flex justify-between items-center mb-4 border-b pb-4">
                        <span className="text-xl font-bold">뇌 나이</span>
                        <span className="text-3xl font-black text-purple-600">{result.brainAge}세</span>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span>전두엽 (주의/집행)</span>
                            <span className={getColor(result.scores.frontal)}>{result.scores.frontal}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>측두엽 (기억/언어)</span>
                            <span className={getColor(result.scores.temporal)}>{result.scores.temporal}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>두정엽 (시공간)</span>
                            <span className={getColor(result.scores.parietal)}>{result.scores.parietal}</span>
                        </div>
                    </div>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <h3 className="font-bold text-lg mb-2">종합 소견</h3>
                    <p className="text-gray-700 mb-2 font-medium">유형: {result.profileType}</p>
                    <p className="text-sm text-gray-500">
                        {result.profileType === 'Healthy' && "전반적인 인지 기능이 균형 잡혀 있습니다."}
                        {result.profileType === 'Amnestic' && "기억력이 다른 영역에 비해 낮습니다. 메모 습관이 필요합니다."}
                        {result.profileType === 'Dysexecutive' && "실행 기능이 다소 저하되었습니다. 복잡한 일을 단계별로 나누어 보세요."}
                        {result.profileType === 'Visuospatial' && "시공간 지각력이 약합니다. 길 찾기나 운전 시 주의하세요."}
                        {result.profileType === 'Mixed' && "전반적인 인지 관리가 필요합니다. 전문가 상담을 권장합니다."}
                    </p>
                </div>

                <button onClick={() => window.location.reload()} className="mt-8 px-8 py-3 bg-gray-900 text-white rounded-full font-bold">
                    다시 하기
                </button>
            </div>
        );
    }

    // --- Render Questions ---

    // 0. Digit Span (Q1, Q2)
    if (currentQuestion.type === 'digit-span') {
        const config = COGNITIVE_BLUEPRINT[currentQuestion.id] as any;
        const length = config?.length || 5;
        const variant = config?.variant || 'forward';

        return (
            <QuestionLayout q={currentQuestion} currentStep={currentStep} total={QUESTIONS.length}>
                <DigitSpanTask
                    length={length}
                    variant={variant}
                    onComplete={(isCorrect) => {
                        handleAnswer(null, isCorrect ? length : 0);
                    }}
                />
            </QuestionLayout>
        );
    }

    // 0.5 Trail Making Task (Q6, etc.)
    if (currentQuestion.type === 'trail-making') {
        const config = COGNITIVE_BLUEPRINT[currentQuestion.id] as any;
        const variant = config?.variant || 'B';
        const nodeCount = config?.nodeCount || 8;

        return (
            <QuestionLayout q={currentQuestion} currentStep={currentStep} total={QUESTIONS.length}>
                <TrailMakingTask
                    variant={variant}
                    nodeCount={nodeCount}
                    onComplete={(score) => {
                        handleAnswer(score);
                    }}
                />
            </QuestionLayout>
        );
    }

    // 1. Memory Registration (Q7)
    if (currentQuestion.type === 'visual-memory') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center animate-fade-in">
                <h2 className="text-2xl font-bold mb-2">기억하세요!</h2>
                <p className="text-gray-500 mb-8">잠시 후 단어들이 사라집니다.</p>

                <div className="grid grid-cols-1 gap-4 text-3xl font-black text-indigo-600 mb-10">
                    {targetWords.map(word => <div key={word} className="animate-pulse">{word}</div>)}
                </div>

                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden max-w-md">
                    <div
                        className="bg-indigo-600 h-full transition-all duration-1000 ease-linear"
                        style={{ width: `${((timeLeft || 0) / 5) * 100}%` }}
                    />
                </div>
            </div>
        );
    }

    // 2. Mental Rotation (Q11)
    if (currentQuestion.type === 'mental-rotation') {
        const config = COGNITIVE_BLUEPRINT[currentQuestion.id] as any;
        const difficulty = config?.difficulty || 'easy';

        return (
            <QuestionLayout q={currentQuestion} currentStep={currentStep} total={QUESTIONS.length}>
                <RotationTask
                    difficulty={difficulty}
                    onComplete={(isCorrect) => {
                        handleAnswer(isCorrect ? "Correct" : "Wrong");
                    }}
                />
            </QuestionLayout>
        );
    }

    // 2.5 Go/No-Go (Q19)
    if (currentQuestion.type === 'go-no-go') {
        const config = COGNITIVE_BLUEPRINT[currentQuestion.id] as any;
        const duration = config?.durationSec || 30;
        const interval = config?.intervalMs || 800;

        return (
            <QuestionLayout q={currentQuestion} currentStep={currentStep} total={QUESTIONS.length}>
                <GoNoGoTask
                    durationSec={duration}
                    intervalMs={interval}
                    targetCategory="음식"
                    onComplete={(score) => {
                        handleAnswer(score);
                    }}
                />
            </QuestionLayout>
        );
    }

    // 3. Choice inputs (Generic + Q10, Q17, etc.)
    if (currentQuestion.type === 'choice' || currentQuestion.type === 'memory-recognition') {
        const optionList = currentQuestion.id === 10 ? recognitionOptions : (poolData?.options || currentQuestion.options);
        const displayQ = poolData ? { ...currentQuestion, text: poolData.text || currentQuestion.text, subText: poolData.subText || poolData.q || currentQuestion.subText } : currentQuestion;

        return (
            <QuestionLayout q={displayQ} currentStep={currentStep} total={QUESTIONS.length}>
                <div className="grid grid-cols-1 gap-3">
                    {optionList?.map((opt: string, idx: number) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(opt)}
                            className="w-full p-4 text-left bg-white border border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all font-medium text-lg"
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </QuestionLayout>
        );
    }

    // 4. Count Input (Fluency Q4, Q5)
    if (currentQuestion.type === 'count-input') {
        return (
            <QuestionLayout q={currentQuestion} currentStep={currentStep} total={QUESTIONS.length}>
                <div className="mb-6 text-center">
                    {timeLeft !== null && (
                        <div className="text-4xl font-black text-red-500 animate-pulse mb-4">
                            {timeLeft}s
                        </div>
                    )}
                    <p className="text-sm text-gray-500">종이나 메모장에 단어를 적으세요.</p>
                </div>

                {timeLeft === 0 ? (
                    <div className="animate-fade-in">
                        <label className="block text-gray-700 font-bold mb-2">몇 개를 적으셨나요?</label>
                        <input
                            type="number"
                            className="w-full p-4 text-2xl border-2 border-indigo-200 rounded-xl focus:border-indigo-500 outline-none text-center mb-4"
                            placeholder="0"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleAnswer(parseInt(e.currentTarget.value) || 0);
                            }}
                        />
                        <button
                            onClick={(e) => {
                                const input = (e.currentTarget.previousSibling as HTMLInputElement).value;
                                handleAnswer(parseInt(input) || 0);
                            }}
                            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700"
                        >
                            입력 완료
                        </button>
                    </div>
                ) : (
                    <div className="text-center p-8 bg-gray-100 rounded-xl text-gray-500">
                        타이머가 종료되면 입력창이 나타납니다.
                    </div>
                )}
            </QuestionLayout>
        );
    }

    // 5. Text Input (Default for Q14, Q15, Q16, etc.)
    const displayQ = poolData ? { ...currentQuestion, text: poolData.text || currentQuestion.text, subText: poolData.subText || poolData.q || currentQuestion.subText } : currentQuestion;

    return (
        <QuestionLayout q={displayQ} currentStep={currentStep} total={QUESTIONS.length}>
            <input
                type="text"
                className="w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:border-indigo-500 outline-none mb-6"
                placeholder="답변을 입력하세요"
                autoFocus
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAnswer(e.currentTarget.value);
                }}
            />
            <button
                onClick={(e) => {
                    const input = (e.currentTarget.previousSibling as HTMLInputElement).value;
                    handleAnswer(input);
                }}
                className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800"
            >
                다음
            </button>
        </QuestionLayout>
    );
}

// Helper Layout
function QuestionLayout({ q, children, currentStep, total }: { q: any, children: React.ReactNode, currentStep: number, total: number }) {
    return (
        <div className="max-w-md w-full mx-auto p-6 min-h-[60vh] flex flex-col">
            <div className="flex items-center gap-2 mb-8">
                <div className="text-sm font-bold text-gray-400">Q{currentStep + 1}/{total}</div>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${((currentStep + 1) / total) * 100}%` }}></div>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2 whitespace-pre-line">{q.text}</h2>
            {q.subText && <p className="text-gray-500 mb-8 whitespace-pre-line leading-relaxed">{q.subText}</p>}

            <div className="flex-1 flex flex-col justify-center">
                {children}
            </div>
        </div>
    );
}

function getColor(level: string) {
    if (level === 'High') return "text-green-600 font-bold";
    if (level === 'Mid') return "text-yellow-600 font-bold";
    return "text-red-600 font-bold";
}
