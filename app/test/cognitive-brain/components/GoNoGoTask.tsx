import { useState, useEffect, useRef } from 'react';

interface Props {
    durationSec: number;
    intervalMs: number;
    targetCategory: string; // e.g. "Food"
    onComplete: (score: number) => void;
}

const WORDS = [
    // Targets (Food)
    { text: "Apple", category: "Food" }, { text: "Bread", category: "Food" },
    { text: "Milk", category: "Food" }, { text: "Grape", category: "Food" },
    { text: "Pizza", category: "Food" }, { text: "Cookies", category: "Food" },
    { text: "Chicken", category: "Food" }, { text: "Burger", category: "Food" },
    // Distractors (Non-Food)
    { text: "Table", category: "Furniture" }, { text: "Chair", category: "Furniture" },
    { text: "Sky", category: "Nature" }, { text: "Cloud", category: "Nature" },
    { text: "Pencil", category: "Stationery" }, { text: "Notebook", category: "Stationery" },
    { text: "Bag", category: "Items" }, { text: "Shoes", category: "Items" },
];

export default function GoNoGoTask({ durationSec, intervalMs = 800, targetCategory = "Food", onComplete }: Props) {
    const [currentWord, setCurrentWord] = useState<{ text: string, category: string } | null>(null);
    const [timeLeft, setTimeLeft] = useState(durationSec);
    const [gameStatus, setGameStatus] = useState<'READY' | 'PLAYING' | 'FINISHED'>('READY');
    const [feedback, setFeedback] = useState<'HIT' | 'FALSE_ALARM' | null>(null);

    const scoreRef = useRef({ hits: 0, falseAlarms: 0, misses: 0, totalTargets: 0 });
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const currentWordRef = useRef<{ text: string, category: string } | null>(null);
    const respondedRef = useRef(false);

    // Start Game Logic
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
        intervalRef.current = setInterval(() => {
            // 1. Process Previous Word (Miss Check)
            if (currentWordRef.current && currentWordRef.current.category === targetCategory && !respondedRef.current) {
                scoreRef.current.misses++;
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
                    <h3 className="text-xl font-bold mb-4">Are you ready?</h3>
                    <p className="mb-8 text-gray-600">
                        When <b>'{targetCategory}'</b> appears on the screen,<br />
                        press the button or the Space key!
                    </p>
                    <button
                        onClick={startGame}
                        className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700"
                    >
                        Start Game
                    </button>
                </div>
            )}

            {gameStatus === 'PLAYING' && (
                <div className="flex flex-col items-center w-full">
                    <div className="mb-4 text-gray-400 font-mono">Time Left: {timeLeft}s</div>

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
                        className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-bold text-xl active:bg-indigo-800 touch-manipulation shadow-md focus:outline-none"
                    >
                        PRESS (Space)
                    </button>
                </div>
            )}

            {gameStatus === 'FINISHED' && (
                <div className="text-2xl font-bold animate-bounce text-indigo-600">
                    Finished!
                </div>
            )}
        </div>
    );
}
