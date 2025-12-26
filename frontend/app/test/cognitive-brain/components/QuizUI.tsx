"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { QUESTIONS, calculateResult, COGNITIVE_BLUEPRINT } from '../questions';
import BrainMap from './BrainMap';
import DigitSpanTask from './DigitSpanTask';
import RotationTask from './RotationTask';
import GoNoGoTask from './GoNoGoTask';
import { MEMORY_POOL, LOGIC_POOL, SOCIAL_POOL } from '../data/pools';
import TrailMakingTask from './TrailMakingTask';
import AnalysisReport from './AnalysisReport';
import { ScoreLevel } from '../data/results';
import { ANIMAL_LIST } from '../data/animals';
import { BrainCircuit, Activity, ChevronRight } from 'lucide-react';

export default function QuizUI() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string | number>>({});
    const [showResult, setShowResult] = useState(false);

    // Safety Locks
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [targetWords, setTargetWords] = useState<string[]>([]);
    const [sequentialScore, setSequentialScore] = useState(0);
    const [poolData, setPoolData] = useState<any>(null);
    const [tempInput, setTempInput] = useState("");
    const [typedWords, setTypedWords] = useState<string[]>([]);
    const [errorMsg, setErrorMsg] = useState("");

    const recognitionOptions = useMemo(() => {
        if (targetWords.length === 0) return [];
        const correct = targetWords[0];
        const allWords = MEMORY_POOL.flat();
        const distractors = allWords.filter(w => !targetWords.includes(w)).sort(() => 0.5 - Math.random()).slice(0, 3);
        return [correct, ...distractors].sort(() => 0.5 - Math.random());
    }, [targetWords]);

    const currentQuestion = QUESTIONS[currentStep];

    // Reset submitting lock when question changes
    useEffect(() => {
        setIsSubmitting(false);
        setIsTransitioning(false);
    }, [currentQuestion]);

    useEffect(() => {
        if (currentQuestion?.id === 7 && targetWords.length === 0) {
            const selectedSet = MEMORY_POOL[Math.floor(Math.random() * MEMORY_POOL.length)];
            setTargetWords(selectedSet);
        }

        // Reset typedWords and tempInput when question changes
        setTempInput("");
        setTypedWords([]);
        setErrorMsg("");
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
            // Only auto-advance if it's a registration question (Q7)
            if (currentQuestion.id === 7) {
                handleAnswer("");
            }
            // Auto-submit for fluency tasks (Q4, Q5)
            if (currentQuestion.id === 4 || currentQuestion.id === 5) {
                handleAnswer(typedWords.length);
            }
            return;
        }
        if (timeLeft !== null && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [currentQuestion, timeLeft]);

    const handleAnswer = (val: string | number | null, score?: number) => {
        if (isSubmitting || isTransitioning) return; // Prevent double submission

        setIsSubmitting(true);
        setIsTransitioning(true);

        if (score !== undefined) {
            setAnswers(prev => ({ ...prev, [currentQuestion!.id]: score }));
        } else if (val !== null) {
            setAnswers(prev => ({ ...prev, [currentQuestion!.id]: val }));
        }

        setTimeout(() => {
            setTimeLeft(null);
            setTempInput(""); // Reset for next input
            setTypedWords([]); // Reset typed words
            setErrorMsg("");

            if (currentStep < QUESTIONS.length - 1) {
                setCurrentStep(prev => prev + 1);
                window.scrollTo(0, 0);
            } else {
                finishTest();
            }
        }, 300);
    };

    const finishTest = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setShowResult(true);
        }, 3000);
    };

    if (showResult || !currentQuestion) {
        // Prepare scores for AnalysisReport
        // If we force-finished (race condition), we might not have all answers, but we will render what we have.

        const q9Answer = answers[9] as string;
        const q9Correct = targetWords.some(w => w.toLowerCase() === q9Answer?.trim().toLowerCase());
        const q10Answer = answers[10] as string;
        const q10Correct = targetWords.includes(q10Answer);
        const memoryScore = (q9Correct ? 1 : 0) + (q10Correct ? 1 : 0);

        // Use the existing calculateResult logic
        const result = calculateResult(answers, memoryScore, sequentialScore);

        // Map to AnalysisReport format
        const reportScores = {
            frontal: result.scores.frontal as ScoreLevel,
            temporal: result.scores.temporal as ScoreLevel,
            parietal: result.scores.parietal as ScoreLevel,
            brainAge: result.brainAge,
            rawScores: {
                frontal: result.scores.frontal === 'High' ? 88 : result.scores.frontal === 'Mid' ? 55 : 30,
                temporal: result.scores.temporal === 'High' ? 88 : result.scores.temporal === 'Mid' ? 55 : 30,
                parietal: result.scores.parietal === 'High' ? 88 : result.scores.parietal === 'Mid' ? 55 : 30,
            }
        };

        return (
            <AnalysisReport
                scores={reportScores}
                onRetake={() => window.location.reload()}
            />
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
                            disabled={isTransitioning}
                            className="w-full p-5 text-left bg-white border border-gray-200 rounded-2xl hover:border-indigo-600 hover:bg-indigo-50 hover:shadow-md active:scale-[0.99] transition-all font-medium text-lg text-slate-700 disabled:opacity-60 disabled:cursor-not-allowed group"
                        >
                            <div className="flex justify-between items-center text-slate-700 group-hover:text-indigo-900 transition-colors">
                                <span>{opt}</span>
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-transform group-hover:translate-x-1" />
                            </div>
                        </button>
                    ))}
                </div>
            </QuestionLayout>
        );
    }

    if (currentQuestion.id === 3) {
        const isDisplayPhase = currentQuestion.id === 3 && (timeLeft !== null && timeLeft > 0);
        const displayQ = isDisplayPhase ? {
            ...currentQuestion,
            text: "Q3. Selective Attention",
            subText: "Observe the characters below carefully."
        } : {
            ...currentQuestion,
            subText: currentQuestion.subText?.split('\n')[0]
        };

        return (
            <QuestionLayout q={displayQ} currentStep={currentStep} total={QUESTIONS.length}>
                <div className="flex flex-col items-center">
                    {/* Display Phase (Timer > 0) */}
                    {timeLeft !== 0 ? (
                        <div className="w-full text-center">
                            {currentQuestion.id === 3 && (
                                <h3 className="text-3xl font-black text-indigo-900 mb-6 animate-pulse">
                                    FIND AND COUNT <span className="text-red-600 text-4xl">'Z'</span>
                                </h3>
                            )}

                            <div className="text-4xl font-black text-indigo-600 mb-8 p-10 bg-indigo-50 rounded-full w-48 h-48 flex items-center justify-center mx-auto border-4 border-indigo-200 shadow-lg" style={{ animationDuration: '3s' }}>
                                {timeLeft}s
                            </div>

                            {currentQuestion.id === 3 && (
                                <div className="p-6 bg-white border-2 border-gray-100 rounded-2xl shadow-sm mb-4">
                                    <p className="text-3xl font-black font-mono tracking-widest text-slate-800 break-all leading-relaxed drop-shadow-sm">
                                        {currentQuestion.subText?.split('\n').filter(l => l.includes('Z')).pop()?.trim()}
                                    </p>
                                </div>
                            )}

                            <p className="text-gray-500 font-medium italic">
                                {currentQuestion.id === 3 ? "" : "Timer is running. Please prepare your answer."}
                            </p>
                        </div>
                    ) : (
                        /* Input Phase (Timer === 0) */
                        <div className="w-full animate-fade-in">
                            <label className="block text-gray-700 font-bold mb-4 text-lg">
                                {currentQuestion.id === 3 ? "How many 'Z' letters were there?" : "How many did you write?"}
                            </label>

                            {/* Display Area */}
                            <div className="w-full p-6 text-4xl text-center tracking-[0.2em] border-2 border-indigo-200 rounded-2xl bg-indigo-50 min-h-[88px] flex items-center justify-center font-mono mb-8 text-slate-800 shadow-inner">
                                {tempInput || <span className="text-indigo-200 select-none text-2xl tracking-normal">Enter number</span>}
                            </div>

                            {/* Numeric Keypad */}
                            <div className="grid grid-cols-3 gap-3 mb-6 w-full max-w-[320px] mx-auto select-none">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setTempInput(prev => (prev.length < 5 ? prev + num : prev))}
                                        className="h-16 rounded-2xl bg-white border-b-4 border-slate-200 active:border-b-0 active:translate-y-1 text-2xl font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center"
                                    >
                                        {num}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setTempInput(prev => prev.slice(0, -1))}
                                    className="h-16 rounded-2xl bg-red-50 border-b-4 border-red-200 active:border-b-0 active:translate-y-1 text-red-500 font-bold shadow-sm hover:bg-red-100 transition-all flex items-center justify-center"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"></path></svg>
                                </button>
                                <button
                                    onClick={() => setTempInput(prev => (prev.length < 5 ? prev + "0" : prev))}
                                    className="h-16 rounded-2xl bg-white border-b-4 border-slate-200 active:border-b-0 active:translate-y-1 text-2xl font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center"
                                >
                                    0
                                </button>
                                <button
                                    onClick={() => handleAnswer(parseInt(tempInput) || 0)}
                                    className={`h-16 rounded-2xl border-b-4 active:border-b-0 active:translate-y-1 text-xl font-bold shadow-sm transition-all flex items-center justify-center
                                        ${tempInput.length > 0 ? 'bg-indigo-600 border-indigo-800 text-white hover:bg-indigo-700' : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'}
                                     `}
                                    disabled={tempInput.length === 0}
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </QuestionLayout>
        );
    }

    if (currentQuestion.id === 4 || currentQuestion.id === 5) {
        return (
            <QuestionLayout q={currentQuestion} currentStep={currentStep} total={QUESTIONS.length}>
                <div className="flex flex-col items-center w-full max-w-lg mx-auto">
                    {/* Timer */}
                    <div className="mb-6">
                        <div className={`text-4xl font-black ${timeLeft && timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-indigo-600'} 
                             bg-indigo-50 rounded-full w-24 h-24 flex items-center justify-center border-4 border-indigo-100 shadow-sm transition-colors`}>
                            {timeLeft}s
                        </div>
                    </div>

                    {/* Input Field */}
                    <div className="w-full relative mb-6">
                        <input
                            type="text"
                            className="w-full p-5 text-xl border-2 border-indigo-200 rounded-2xl focus:border-indigo-600 outline-none shadow-sm transition-all"
                            placeholder="Type a word and press Enter..."
                            autoFocus
                            value={tempInput}
                            onChange={(e) => {
                                setTempInput(e.target.value);
                                setErrorMsg("");
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    e.stopPropagation(); // Stop event bubbling
                                    const val = tempInput.trim();

                                    if (!val) return;

                                    if (currentQuestion.id === 4 && !val.toLowerCase().startsWith('s')) {
                                        setErrorMsg("Word must start with 'S'");
                                        return;
                                    }

                                    if (currentQuestion.id === 5 && !ANIMAL_LIST.includes(val.toLowerCase())) {
                                        setErrorMsg("Not a recognized animal name");
                                        return;
                                    }

                                    if (!typedWords.includes(val)) {
                                        setTypedWords(prev => [val, ...prev]);
                                        setTempInput("");
                                        setErrorMsg("");
                                    } else {
                                        setErrorMsg("Already added!");
                                        setTempInput("");
                                    }
                                }
                            }}
                        />
                        {errorMsg && (
                            <div className="absolute left-0 -bottom-8 text-red-500 text-sm font-bold animate-pulse">
                                {errorMsg}
                            </div>
                        )}
                        <button
                            onClick={() => {
                                const val = tempInput.trim();
                                if (!val) return;

                                if (currentQuestion.id === 4 && !val.toLowerCase().startsWith('s')) {
                                    setErrorMsg("Word must start with 'S'");
                                    return;
                                }

                                if (currentQuestion.id === 5 && !ANIMAL_LIST.includes(val.toLowerCase())) {
                                    setErrorMsg("Not a recognized animal name");
                                    return;
                                }

                                if (!typedWords.includes(val)) {
                                    setTypedWords(prev => [val, ...prev]);
                                    setTempInput("");
                                    setErrorMsg("");
                                } else {
                                    setErrorMsg("Already added!");
                                    setTempInput("");
                                }
                            }}
                            className="absolute right-3 top-3 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors"
                        >
                            Add
                        </button>
                    </div>

                    {/* Word List */}
                    <div className="w-full bg-gray-50 rounded-2xl p-4 min-h-[200px] border border-gray-100 shadow-inner">
                        <div className="flex justify-between items-center mb-4 px-2">
                            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Words Typed</span>
                            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">{typedWords.length}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 content-start">
                            {typedWords.map((word, i) => (
                                <span key={i} className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-slate-700 font-medium shadow-sm animate-fade-in-up">
                                    {word}
                                </span>
                            ))}
                            {typedWords.length === 0 && (
                                <div className="w-full text-center py-10 text-gray-300 italic">
                                    No words added yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </QuestionLayout>
        );
    }

    const displayQ = poolData ? { ...currentQuestion, text: poolData.text || currentQuestion.text, subText: poolData.subText || poolData.q || currentQuestion.subText } : currentQuestion;
    return (
        <QuestionLayout q={displayQ} currentStep={currentStep} total={QUESTIONS.length}>
            <input
                key={currentQuestion.id} // Re-render input on question change
                type="text"
                className="w-full p-5 text-xl border-2 border-indigo-100 rounded-2xl focus:border-indigo-600 outline-none mb-6 shadow-sm transition-all text-center tracking-wide"
                placeholder="Type your answer here..."
                autoFocus
                disabled={isTransitioning}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        const val = e.currentTarget.value;
                        if (val.trim()) handleAnswer(val);
                    }
                }}
            />
            <button
                onClick={(e) => {
                    const inputEl = e.currentTarget.previousSibling as HTMLInputElement;
                    const val = inputEl.value;
                    if (val.trim()) handleAnswer(val);
                }}
                disabled={isTransitioning}
                className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-black active:scale-[0.98] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
            >
                Continue
            </button>
        </QuestionLayout>
    );
}

function QuestionLayout({ q, children, currentStep, total }: { q: any, children: React.ReactNode, currentStep: number, total: number }) {
    return (
        <div className="max-w-md w-full mx-auto p-6 min-h-[60vh] flex flex-col">
            {/* Standard: Title Header */}
            <div className="mb-6 text-center">
                <h1 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Cognitive Brain Test</h1>
            </div>

            {/* Standard: Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
                    <span>Question {currentStep + 1}</span>
                    <span>{Math.round(((currentStep + 1) / total) * 100)}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 transition-all duration-500 ease-out" style={{ width: `${((currentStep + 1) / total) * 100}%` }} />
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2 whitespace-pre-line animate-in slide-in-from-right-4 duration-300 h-full">{q.text}</h2>
            {q.subText && (
                <p className="text-gray-500 mb-8 whitespace-pre-line leading-relaxed animate-in fade-in duration-500">
                    {q.subText}
                </p>
            )}
            <div className="flex-1 flex flex-col justify-center animate-in fade-in duration-500 delay-100">
                {children}
            </div>

            {/* Standard: About Section */}
            <div className="mt-12 pt-8 border-t border-slate-100 text-slate-500 text-xs leading-relaxed animate-in fade-in duration-700 delay-300">
                <h3 className="font-bold text-slate-800 mb-3 text-sm">About This Test: Design & Validation Protocol</h3>
                <p className="mb-4">
                    The &apos;Cognitive Brain Test&apos; is a standardized assessment battery exclusively developed for Test-Archive.
                    It is designed to monitor general cognitive health and aid in the early detection of neurodegenerative conditions.
                    This protocol addresses the limitations of traditional screening tools (such as the MMSE), specifically improving
                    discriminative power and preventing the &quot;Ceiling Effect&quot; often observed in highly educated individuals
                    by incorporating complex executive function tasks.
                </p>

                <div className="space-y-3">
                    <div>
                        <span className="font-bold text-slate-700 block mb-1 uppercase tracking-tight text-[10px]">Methodological References</span>
                        <ul className="list-disc pl-4 space-y-1">
                            <li><span className="font-semibold text-slate-600">Attention & Memory:</span> Based on the Digit Span subtest (WAIS-IV) and the Word List Learning paradigm (RAVLT).</li>
                            <li><span className="font-semibold text-slate-600">Executive Function:</span> Adapts Trail Making B, Verbal Fluency, and Go-No-Go paradigms.</li>
                            <li><span className="font-semibold text-slate-600">Reasoning & Logic:</span> Matrix Reasoning (WAIS-IV) and Theory of Mind tasks.</li>
                        </ul>
                    </div>

                    <div>
                        <span className="font-bold text-slate-700 block mb-1 uppercase tracking-tight text-[10px]">Neuroanatomical Basis</span>
                        <p>
                            Measures functional integrity from the Executive Functions of the Dorsolateral Prefrontal Cortex (DLPFC)
                            to the Memory Encoding capabilities of the Hippocampus.
                        </p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <span className="font-bold text-amber-700 block mb-1 uppercase tracking-tight text-[10px]">Disclaimer</span>
                        <p className="italic">
                            Serves as a screening tool for monitoring brain health; it does not replace a formal medical diagnosis.
                            If results indicate potential impairment, consult a medical professional.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getColor(level: string) {
    if (level === 'High') return "text-green-600 font-bold";
    if (level === 'Mid') return "text-yellow-600 font-bold";
    return "text-red-600 font-bold";
}
