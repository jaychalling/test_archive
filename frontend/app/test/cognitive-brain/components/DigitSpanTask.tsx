import { useState, useEffect, useRef } from 'react';

interface Props {
    length: number;
    variant: 'forward' | 'backward';
    onComplete: (isCorrect: boolean) => void;
}

export default function DigitSpanTask({ length, variant, onComplete }: Props) {
    const [sequence, setSequence] = useState<string[]>([]);
    const [displayDigit, setDisplayDigit] = useState<string | null>(null);
    const [status, setStatus] = useState<'IDLE' | 'PLAYING' | 'INPUT'>('IDLE');
    const [userInput, setUserInput] = useState('');

    // 1. Initialize & Start Game
    useEffect(() => {
        startNewGame();
    }, [length, variant]);

    const startNewGame = () => {
        setStatus('IDLE');
        setUserInput('');

        // Generate Random Sequence
        const newSequence = Array.from({ length }, () => Math.floor(Math.random() * 10).toString());
        setSequence(newSequence);

        // Start Playback after short delay
        setTimeout(() => {
            playSequence(newSequence);
        }, 1000);
    };

    // 2. Play Sequence Logic
    const playSequence = (seq: string[]) => {
        setStatus('PLAYING');
        let i = 0;

        const interval = setInterval(() => {
            // Show digit
            setDisplayDigit(seq[i]);

            // Hide digit (Blink effect) after 800ms
            setTimeout(() => {
                setDisplayDigit(null);
            }, 800);

            i++;
            if (i >= seq.length) {
                clearInterval(interval);
                // Delay before showing input to ensure last blink finishes
                setTimeout(() => {
                    setStatus('INPUT');
                }, 1000);
            }
        }, 1200); // 1.2s total cycle per digit
    };

    // 3. Handle Input
    const handleSubmit = () => {
        let target = sequence.join('');
        if (variant === 'backward') {
            target = [...sequence].reverse().join('');
        }

        const isCorrect = userInput === target;
        onComplete(isCorrect);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[300px] w-full max-w-md mx-auto">

            {/* Phase 1: Memorization */}
            {status !== 'INPUT' && (
                <div className="flex flex-col items-center">
                    <h3 className="text-gray-500 mb-8 animate-pulse text-lg">
                        {status === 'IDLE' ? 'Get ready...' : 'Memorize the numbers...'}
                    </h3>
                    <div className={`text-9xl font-black text-indigo-600 transition-all transform duration-200 
            ${displayDigit ? 'scale-110 opacity-100' : 'scale-90 opacity-0'}`}>
                        {displayDigit || "_"}
                    </div>
                </div>
            )}

            {/* Phase 2: Input */}
            {status === 'INPUT' && (
                <div className="w-full animate-fade-in-up">
                    <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                        {variant === 'forward' ? 'Enter in order' : 'Enter in reverse order'}
                    </h3>

                    <input
                        type="tel"
                        pattern="[0-9]*"
                        maxLength={length}
                        className="w-full p-4 text-4xl text-center tracking-[1em] border-2 border-indigo-200 rounded-2xl focus:border-indigo-600 outline-none mb-6 font-mono"
                        placeholder="-"
                        autoFocus
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value.replace(/[^0-9]/g, ''))}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    />

                    <button
                        onClick={handleSubmit}
                        className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors focus:outline-none"
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}
