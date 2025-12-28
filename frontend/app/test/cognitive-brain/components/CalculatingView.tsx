import React, { useEffect } from 'react';

export default function CalculatingView({ onFinish }: { onFinish: () => void }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 1000); // Small delay for effect
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center animate-pulse">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Analyzing Brain Functions...</h2>
            <p className="text-slate-500">Calculating your cognitive profile</p>
        </div>
    );
}
