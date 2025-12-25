import React from 'react';

// 점수 등급 타입 정의
export type ScoreLevel = 'High' | 'Mid' | 'Low';

interface BrainMapProps {
    scores: {
        frontal: ScoreLevel;   // 전두엽 (주의력, 집행, 논리, 사회)
        temporal: ScoreLevel;  // 측두엽 (기억, 언어)
        parietal: ScoreLevel;  // 두정엽/후두엽 (시공간)
    };
    className?: string;
}

// 등급별 색상 매핑 (Tailwind 색상 코드 활용 가능)
const COLOR_MAP = {
    High: '#22c55e', // Green-500 (건강)
    Mid: '#eab308',  // Yellow-500 (보통)
    Low: '#ef4444',  // Red-500 (주의)
};

export default function BrainMap({ scores, className = "" }: BrainMapProps) {
    return (
        <div className={`relative w-full max-w-[400px] mx-auto ${className}`}>
            <svg
                viewBox="0 0 500 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto drop-shadow-xl"
            >
                {/* 1. 전두엽 (Frontal Lobe) */}
                <path
                    id="frontal-lobe"
                    d="M150,250 C100,250 50,200 50,150 C50,80 120,30 200,30 C250,30 280,60 290,100 L200,250 Z"
                    fill={COLOR_MAP[scores.frontal]}
                    stroke="white"
                    strokeWidth="4"
                    className="transition-colors duration-500 ease-in-out hover:opacity-90"
                />
                <text x="130" y="150" fill="white" fontSize="20" fontWeight="bold" className="pointer-events-none">Frontal</text>

                {/* 2. 두정엽 & 후두엽 (Parietal & Occipital) */}
                <path
                    id="parietal-lobe"
                    d="M200,30 C300,30 400,80 420,150 C440,220 380,280 300,280 L290,100 Z"
                    fill={COLOR_MAP[scores.parietal]}
                    stroke="white"
                    strokeWidth="4"
                    className="transition-colors duration-500 ease-in-out hover:opacity-90"
                />
                <text x="330" y="150" fill="white" fontSize="20" fontWeight="bold" className="pointer-events-none">Parietal</text>

                {/* 3. 측두엽 (Temporal Lobe) */}
                <path
                    id="temporal-lobe"
                    d="M150,250 L200,250 L300,280 C250,350 150,350 120,300 Z"
                    fill={COLOR_MAP[scores.temporal]}
                    stroke="white"
                    strokeWidth="4"
                    className="transition-colors duration-500 ease-in-out hover:opacity-90"
                />
                <text x="180" y="300" fill="white" fontSize="20" fontWeight="bold" className="pointer-events-none">Temporal</text>

                {/* 소뇌/뇌간 (장식용, 회색 고정) */}
                <path
                    d="M300,280 C350,280 380,320 360,360 C320,390 280,360 280,340 Z"
                    fill="#cbd5e1"
                />
            </svg>

            {/* 범례 (Legend) */}
            <div className="flex justify-center gap-4 mt-4 text-xs font-bold text-gray-600">
                <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500"></span>Good</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-500"></span>Avg</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500"></span>Poor</div>
            </div>
        </div>
    );
}
