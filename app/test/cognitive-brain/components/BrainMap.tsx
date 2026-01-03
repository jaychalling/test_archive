import React from 'react';
import { ScoreLevel } from '../data/results';

interface BrainMapProps {
    scores: {
        frontal: ScoreLevel;
        temporal: ScoreLevel;
        parietal: ScoreLevel;
    };
    className?: string;
}

// 🎨 색상 팔레트 & 라벨 정의
const COLOR_MAP = {
    High: { color: '#22c55e', label: 'Optimal' },    // Green
    Mid: { color: '#eab308', label: 'Average' },     // Yellow
    Low: { color: '#ef4444', label: 'Needs Care' },  // Red
};

export default function BrainMap({ scores, className = "" }: BrainMapProps) {
    // Helper to colorize png using CSS mask
    const renderLobe = (lobe: 'frontal' | 'parietal' | 'temporal', level: ScoreLevel, zIndex: number) => {
        const color = COLOR_MAP[level].color;
        const imagePath = `/cognitive-brain/layers/${lobe}.png`;

        return (
            <div
                className="absolute top-0 left-0 w-full h-full transition-all duration-700 hover:scale-105"
                style={{ zIndex }}
            >
                {/* Layer 1: Base Grayscale Image */}
                <img
                    src={imagePath}
                    alt={lobe}
                    className="absolute top-0 left-0 w-full h-full object-contain mix-blend-normal opacity-90"
                />

                {/* Layer 2: Color Overlay */}
                <div
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                        backgroundColor: color,
                        maskImage: `url(${imagePath})`,
                        maskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskImage: `url(${imagePath})`,
                        WebkitMaskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        mixBlendMode: 'multiply',
                        opacity: 0.7,
                        filter: level === 'High' ? 'brightness(1.2)' : 'brightness(1.0)'
                    }}
                />

                {/* Optional: Glow for High scores */}
                {level === 'High' && (
                    <div
                        className="absolute top-0 left-0 w-full h-full animate-pulse-slow pointer-events-none"
                        style={{
                            boxShadow: `inset 0 0 20px ${color}`,
                            maskImage: `url(${imagePath})`,
                            maskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskImage: `url(${imagePath})`,
                            WebkitMaskSize: 'contain',
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center',
                            mixBlendMode: 'screen',
                            opacity: 0.4
                        }}
                    />
                )}
            </div>
        );
    };

    // Helper to get evaluation label
    const getEval = (level: ScoreLevel) => COLOR_MAP[level].label;

    return (
        <div className={`relative w-full max-w-[400px] mx-auto aspect-[4/3] ${className}`}>
            {/* Render Lobes in appropriate Z-order: Parietal < Temporal < Frontal */}
            {renderLobe('parietal', scores.parietal, 10)}
            {renderLobe('temporal', scores.temporal, 20)}
            {renderLobe('frontal', scores.frontal, 30)}

            {/* Labels overlay */}
            <div className="absolute inset-0 pointer-events-none z-50">
                {/* 1. Parietal - Moved to Left (Top-Back) */}
                <div className="absolute top-[25%] left-[20%] -translate-x-1/2 flex flex-col items-center animate-fade-in-up">
                    <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-indigo-50 flex flex-col items-center min-w-[110px]">
                        <span className="text-slate-800 font-black text-sm uppercase tracking-wide mb-0.5">Parietal</span>
                        <span className={`text-xs font-bold ${scores.parietal === 'High' ? 'text-green-600' : scores.parietal === 'Mid' ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                            is {getEval(scores.parietal)}
                        </span>
                    </div>
                </div>

                {/* 2. Frontal - Moved to Right (Front) */}
                <div className="absolute top-[30%] right-[15%] flex flex-col items-center animate-fade-in-up delay-100">
                    <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-indigo-50 flex flex-col items-center min-w-[110px]">
                        <span className="text-slate-800 font-black text-sm uppercase tracking-wide mb-0.5">Frontal</span>
                        <span className={`text-xs font-bold ${scores.frontal === 'High' ? 'text-green-600' : scores.frontal === 'Mid' ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                            is {getEval(scores.frontal)}
                        </span>
                    </div>
                </div>

                {/* 3. Temporal - Bottom Center */}
                <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 flex flex-col items-center animate-fade-in-up delay-200">
                    <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-indigo-50 flex flex-col items-center min-w-[110px]">
                        <span className="text-slate-800 font-black text-sm uppercase tracking-wide mb-0.5">Temporal</span>
                        <span className={`text-xs font-bold ${scores.temporal === 'High' ? 'text-green-600' : scores.temporal === 'Mid' ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                            is {getEval(scores.temporal)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
