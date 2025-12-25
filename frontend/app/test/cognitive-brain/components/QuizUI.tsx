"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { QUESTIONS, calculateResult, COGNITIVE_BLUEPRINT } from '../questions';
import BrainMap from './BrainMap';
import DigitSpanTask from './DigitSpanTask';
import RotationTask from './RotationTask';
import GoNoGoTask from './GoNoGoTask';
import { MEMORY_POOL, LOGIC_POOL, SOCIAL_POOL } from '../data/pools';
import TrailMakingTask from './TrailMakingTask';

export default function QuizUI() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string | number>>({});
    const [showResult, setShowResult] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [targetWords, setTargetWords] = useState<string[]>([]);
    const [sequentialScore, setSequentialScore] = useState(0);
    const [poolData, setPoolData] = useState<any>(null);

    const recognitionOptions = useMemo(() => {
        if (targetWords.length === 0) return [];
        const correct = targetWords[0];
        const allWords = MEMORY_POOL.flat();
        const distractors = allWords.filter(w => !targetWords.includes(w)).sort(() => 0.5 - Math.random()).slice(0, 3);
        return [correct, ...distractors].sort(() => 0.5 - Math.random());
    }, [targetWords]);

    const currentQuestion = QUESTIONS[currentStep];

    useEffect(() => {
        if (currentQuestion?.id === 7 && targetWords.length === 0) {
            const selectedSet = MEMORY_POOL[Math.floor(Math.random() * MEMORY_POOL.length)];
            setTargetWords(selectedSet);
        }
    }, [currentQuestion, targetWords]);

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

    useEffect(() => {
        if (!currentQuestion?.timeLimit && timeLeft === null) return;
        if (currentQuestion?.timeLimit && timeLeft === null) {
            setTimeLeft(currentQuestion.timeLimit);
        }
        if (timeLeft === 0) {
            handleAnswer("");
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
        const q9Answer = answers[9] as string;
        const q9Correct = targetWords.some(w => w.toLowerCase() === q9Answer?.trim().toLowerCase());
        const q10Answer = answers[10] as string;
        const q10Correct = targetWords.includes(q10Answer);
        const memoryScore = (q9Correct ? 1 : 0) + (q10Correct ? 1 : 0);
        const result = calculateResult(answers, memoryScore, sequentialScore);

        return (
            <div className="flex flex-col items-center justify-center p-6 min-h-screen bg-white text-gray-800">
                <h1 className="text-3xl font-bold mb-6 text-purple-700">Assessment Complete</h1>
                <BrainMap scores={result.scores} className="mb-8" />

                <div className="bg-gray-100 p-6 rounded-2xl max-w-md w-full mb-8">
                    <div className="flex justify-between items-center mb-4 border-b pb-4">
                        <span className="text-xl font-bold">Estimated Brain Age</span>
                        <span className="text-3xl font-black text-purple-600">{result.brainAge} yrs</span>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span>Frontal (Attention/Exec)</span>
                            <span className={getColor(result.scores.frontal)}>{result.scores.frontal}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Temporal (Memory/Lang)</span>
                            <span className={getColor(result.scores.temporal)}>{result.scores.temporal}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Parietal (Visuospatial)</span>
                            <span className={getColor(result.scores.parietal)}>{result.scores.parietal}</span>
                        </div>
                    </div>
                </div>

                <div className="text-center p-6 bg-purple-50 rounded-xl max-w-md w-full border border-purple-100">
                    <h3 className="font-bold text-lg mb-2 text-purple-900">Summary Opinion</h3>
                    <p className="text-purple-800 mb-3 font-semibold">Profile: {result.profileType}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {result.profileType === 'Healthy' && "Your overall cognitive function is well-balanced and healthy."}
                        {result.profileType === 'Amnestic' && "Memory domain is slightly lower. Better note-taking and memory aid habits are recommended."}
                        {result.profileType === 'Dysexecutive' && "Executive function is slightly declined. Try breaking down complex tasks into smaller stages."}
                        {result.profileType === 'Visuospatial' && "Visuospatial perception is relatively weaker. Take care when navigating or driving."}
                        {result.profileType === 'Mixed' && "Overall cognitive management is advised. Regular brain training or puzzles may help."}
                    </p>
                </div>

                <button onClick={() => window.location.reload()} className="mt-8 px-10 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-colors">
                    Retake Test
                </button>
            </div>
        );
    }

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

    if (currentQuestion.type === 'trail-making') {
        const config = COGNITIVE_BLUEPRINT[currentQuestion.id] as any;
        const variant = config?.variant || 'A';
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

    if (currentQuestion.type === 'visual-memory') {
        return (
            <QuestionLayout q={currentQuestion} currentStep={currentStep} total={QUESTIONS.length}>
                <div className="text-center p-8 bg-indigo-50 rounded-3xl border-2 border-indigo-100 mb-8">
                    <h3 className="text-indigo-400 font-bold mb-4 animate-pulse">Memorize!</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {targetWords.map((word, i) => (
                            <span key={i} className="text-3xl font-black text-indigo-700 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                                {word}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="text-center text-indigo-400 font-medium">
                    Words will disappear shortly.
                </div>
            </QuestionLayout>
        );
    }

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

    if (currentQuestion.type === 'go-no-go') {
        const config = COGNITIVE_BLUEPRINT[currentQuestion.id] as any;
        const duration = config?.durationSec || 30;
        const interval = config?.intervalMs || 800;
        return (
            <QuestionLayout q={currentQuestion} currentStep={currentStep} total={QUESTIONS.length}>
                <GoNoGoTask
                    durationSec={duration}
                    intervalMs={interval}
                    targetCategory="Food"
                    onComplete={(score) => {
                        handleAnswer(score);
                    }}
                />
            </QuestionLayout>
        );
    }

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
                            className="w-full p-4 text-left bg-white border border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all font-medium text-lg focus:outline-none"
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </QuestionLayout>
        );
    }

    if (currentQuestion.id === 4 || currentQuestion.id === 5) {
        return (
            <QuestionLayout q={currentQuestion} currentStep={currentStep} total={QUESTIONS.length}>
                <div className="text-center text-4xl font-black text-indigo-600 mb-8 p-10 bg-indigo-50 rounded-full w-48 h-48 flex items-center justify-center mx-auto border-4 border-indigo-200 shadow-lg">
                    {timeLeft}s
                </div>
                {timeLeft === 0 ? (
                    <div className="animate-fade-in">
                        <label className="block text-gray-700 font-bold mb-2">How many did you write?</label>
                        <input
                            type="number"
                            className="w-full p-4 text-2xl border-2 border-indigo-200 rounded-xl focus:border-indigo-500 outline-none text-center mb-4"
                            placeholder="0"
                            autoFocus
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
                            Complete
                        </button>
                    </div>
                ) : (
                    <div className="text-center p-8 bg-gray-100 rounded-xl text-gray-500">
                        The input field will appear after the timer ends.
                    </div>
                )}
            </QuestionLayout>
        );
    }

    const displayQ = poolData ? { ...currentQuestion, text: poolData.text || currentQuestion.text, subText: poolData.subText || poolData.q || currentQuestion.subText } : currentQuestion;
    return (
        <QuestionLayout q={displayQ} currentStep={currentStep} total={QUESTIONS.length}>
            <input
                type="text"
                className="w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:border-indigo-500 outline-none mb-6"
                placeholder="Enter your answer"
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
                Next
            </button>
        </QuestionLayout>
    );
}

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
