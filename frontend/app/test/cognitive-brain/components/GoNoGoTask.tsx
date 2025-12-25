import { useState, useEffect, useRef } from 'react';

interface Props {
    durationSec: number;
    intervalMs: number;
    targetCategory: string; // e.g. "음식"
    onComplete: (score: number) => void;
}

const WORDS = [
    // Targets (Food)
    { text: "사과", category: "음식" }, { text: "빵", category: "음식" },
    { text: "우유", category: "음식" }, { text: "포도", category: "음식" },
    { text: "피자", category: "음식" }, { text: "국수", category: "음식" },
    { text: "치킨", category: "음식" }, { text: "김치", category: "음식" },
    // Distractors (Non-Food)
    { text: "책상", category: "가구" }, { text: "의자", category: "가구" },
    { text: "하늘", category: "자연" }, { text: "구름", category: "자연" },
    { text: "연필", category: "문구" }, { text: "노트", category: "문구" },
    { text: "가방", category: "잡화" }, { text: "신발", category: "잡화" },
];

export default function GoNoGoTask({ durationSec, intervalMs = 800, targetCategory = "음식", onComplete }: Props) {
    const [currentWord, setCurrentWord] = useState<{ text: string, category: string } | null>(null);
    const [timeLeft, setTimeLeft] = useState(durationSec);
    const [gameStatus, setGameStatus] = useState<'READY' | 'PLAYING' | 'FINISHED'>('READY');
    const [feedback, setFeedback] = useState<'HIT' | 'FALSE_ALARM' | null>(null);

    const scoreRef = useRef({ hits: 0, falseAlarms: 0, misses: 0, totalTargets: 0 });
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const currentWordRef = useRef<{ text: string, category: string } | null>(null);
    const respondedRef = useRef(false);

    // Start Game Lgoic
    const startGame = () => {
        setGameStatus('PLAYING');
        scoreRef.current = { hits: 0, falseAlarms: 0, misses: 0, totalTargets: 0 };

        // Main Loop
        runStream();

        // Countdown Timer
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    endGame();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const runStream = () => {
        let tick = 0;

        intervalRef.current = setInterval(() => {
            // 1. Process Previous Word (Miss Check)
            if (currentWordRef.current && currentWordRef.current.category === targetCategory && !respondedRef.current) {
                scoreRef.current.misses++;
                // Optional: Visual Miss feedback? Maybe too distracting.
            }

            // 2. Pick New Word
            const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
            setCurrentWord(randomWord);
            currentWordRef.current = randomWord;
            respondedRef.current = false;

            if (randomWord.category === targetCategory) {
                scoreRef.current.totalTargets++;
            }

            setFeedback(null); // Reset feedback

        }, intervalMs);
    };

    const endGame = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (intervalRef.current) clearInterval(intervalRef.current);
        setGameStatus('FINISHED');
        setCurrentWord(null);

        // Calculate Final Score (Accuracy %)
        // Basic Formula: (Hits - FalseAlarms) / TotalTargets * 100
        // But prevent negative
        const { hits, falseAlarms, totalTargets } = scoreRef.current;
        let finalScore = 0;

        if (totalTargets > 0) {
            const rawScore = ((hits - falseAlarms) / totalTargets) * 100;
            finalScore = Math.max(0, Math.min(100, Math.round(rawScore)));
        }

        setTimeout(() => onComplete(finalScore), 1000);
    };

    // User Action Handler
    const handleAction = () => {
        if (gameStatus !== 'PLAYING' || respondedRef.current || !currentWordRef.current) return;

        respondedRef.current = true;

        if (currentWordRef.current.category === targetCategory) {
            setFeedback('HIT');
            scoreRef.current.hits++;
        } else {
            setFeedback('FALSE_ALARM');
            scoreRef.current.falseAlarms++;
        }
    };

    // Keyboard Event
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                handleAction();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameStatus]);

    // Clean up
    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto h-[400px]">
            {gameStatus === 'READY' && (
                <div className="text-center">
                    <h3 className="text-xl font-bold mb-4">준비되셨나요?</h3>
                    <p className="mb-8 text-gray-600">
                        화면에 <b>'{targetCategory}'</b>(이)가 나타나면<br />
                        버튼을 누르거나 스페이스바를 치세요!
                    </p>
                    <button
                        onClick={startGame}
                        className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700"
                    >
                        시작하기
                    </button>
                </div>
            )}

            {gameStatus === 'PLAYING' && (
                <div className="flex flex-col items-center w-full">
                    <div className="mb-4 text-gray-400 font-mono">남은 시간: {timeLeft}초</div>

                    {/* Word Display Area */}
                    <div className={`relative flex items-center justify-center w-64 h-64 bg-gray-50 rounded-3xl border-4 shadow-lg mb-8 transition-colors duration-100
                ${feedback === 'HIT' ? 'border-green-400 bg-green-50' : ''}
                ${feedback === 'FALSE_ALARM' ? 'border-red-400 bg-red-50' : 'border-gray-200'}
            `}>
                        {currentWord && (
                            <span className="text-5xl font-black text-gray-800 animate-pop-in">
                                {currentWord.text}
                            </span>
                        )}
                    </div>

                    {/* Action Button (Mobile Friendly) */}
                    <button
                        onClick={handleAction}
                        className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-bold text-xl active:bg-indigo-800 touch-manipulation shadow-md"
                    >
                        누르기 (Space)
                    </button>
                </div>
            )}

            {gameStatus === 'FINISHED' && (
                <div className="text-2xl font-bold animate-bounce text-indigo-600">
                    완료!
                </div>
            )}
        </div>
    );
}
