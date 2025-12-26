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

                    {/* Display Area */}
                    <div className="w-full p-6 text-4xl text-center tracking-[0.5em] border-2 border-indigo-200 rounded-2xl bg-indigo-50 min-h-[88px] flex items-center justify-center font-mono mb-8 text-slate-800 shadow-inner">
                        {userInput.split('').map((char, idx) => (
                            <span key={idx} className="animate-fade-in">{char}</span>
                        ))}
                        {userInput.length === 0 && <span className="text-indigo-200 select-none text-2xl tracking-normal">Touch numbers</span>}
                    </div>

                    {/* Numeric Keypad */}
                    <div className="grid grid-cols-3 gap-3 mb-6 w-full max-w-[320px] mx-auto select-none">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <button
                                key={num}
                                onClick={() => setUserInput(prev => (prev.length < length ? prev + num : prev))}
                                className="h-16 rounded-2xl bg-white border-b-4 border-slate-200 active:border-b-0 active:translate-y-1 text-2xl font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center"
                            >
                                {num}
                            </button>
                        ))}
                        <button
                            onClick={() => setUserInput(prev => prev.slice(0, -1))}
                            className="h-16 rounded-2xl bg-red-50 border-b-4 border-red-200 active:border-b-0 active:translate-y-1 text-red-500 font-bold shadow-sm hover:bg-red-100 transition-all flex items-center justify-center"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"></path></svg>
                        </button>
                        <button
                            onClick={() => setUserInput(prev => (prev.length < length ? prev + "0" : prev))}
                            className="h-16 rounded-2xl bg-white border-b-4 border-slate-200 active:border-b-0 active:translate-y-1 text-2xl font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center"
                        >
                            0
                        </button>
                        <button
                            onClick={handleSubmit}
                            className={`h-16 rounded-2xl border-b-4 active:border-b-0 active:translate-y-1 text-xl font-bold shadow-sm transition-all flex items-center justify-center
                                ${userInput.length > 0 ? 'bg-indigo-600 border-indigo-800 text-white hover:bg-indigo-700' : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'}
                             `}
                            disabled={userInput.length === 0}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
