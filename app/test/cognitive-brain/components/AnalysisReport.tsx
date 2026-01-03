import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, Copy, RefreshCw, LayoutGrid, Share2 } from 'lucide-react';
import BrainMap from './BrainMap';
import { RESULT_PROFILES, getProfileKey, ScoreLevel, ResultProfile } from '../data/results';

export interface AnalysisReportProps {
    scores: {
        frontal: ScoreLevel;
        temporal: ScoreLevel;
        parietal: ScoreLevel;
        brainAge: number;
        // Just in case we need raw scores later, but for now we derive display from levels
        rawScores?: { frontal: number, temporal: number, parietal: number };
    };
    onRetake: () => void;
}

export default function AnalysisReport({ scores, onRetake }: AnalysisReportProps) {
    const [profile, setProfile] = useState<ResultProfile | null>(null);

    useEffect(() => {
        // Find the matching profile based on the score pattern
        const key = getProfileKey(scores.frontal, scores.temporal, scores.parietal);
        setProfile(RESULT_PROFILES[key] || RESULT_PROFILES['default']);
    }, [scores]);

    if (!profile) return <div className="p-10 text-center text-indigo-600 font-bold animate-pulse">Running advanced analysis...</div>;

    // Mock raw scores if not provided (for fallback compatibility)
    const raw = scores.rawScores || {
        frontal: scores.frontal === 'High' ? 85 : scores.frontal === 'Mid' ? 50 : 25,
        temporal: scores.temporal === 'High' ? 85 : scores.temporal === 'Mid' ? 50 : 25,
        parietal: scores.parietal === 'High' ? 85 : scores.parietal === 'Mid' ? 50 : 25,
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-black text-center text-indigo-900 mb-2">Assessment Complete</h1>
            <p className="text-center text-gray-600 mb-8">Here is your cognitive brain health analysis.</p>

            {/* 1. Brain Visualization & Age */}
            <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 text-center">
                <div className="mb-4">
                    <span className="text-gray-500 font-semibold mr-2">Estimated Brain Age:</span>
                    {/* Emphasized Brain Age */}
                    <span className={`text-5xl font-black ${scores.brainAge > 50 ? 'text-red-500' : 'text-indigo-600'}`}>
                        {scores.brainAge} <span className="text-2xl">yrs</span>
                    </span>
                </div>

                <BrainMap scores={scores} />

                {/* Legend */}
                <div className="flex justify-center gap-6 text-sm font-bold text-gray-600 mt-4">
                    <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-500 mr-2 shadow-sm"></span>Optimal</div>
                    <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-yellow-500 mr-2 shadow-sm"></span>Average</div>
                    <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-500 mr-2 shadow-sm"></span>Needs Care</div>
                </div>
            </div>

            {/* 2. Detailed Domain Scores with Progress Bars */}
            <div className="bg-white rounded-3xl shadow-lg p-6 mb-8 space-y-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Domain Analysis</h2>

                <ScoreItem label="Frontal Lobe" detail="(Attention & Executive)" level={scores.frontal} raw={raw.frontal} />
                <ScoreItem label="Temporal Lobe" detail="(Memory & Language)" level={scores.temporal} raw={raw.temporal} />
                <ScoreItem label="Parietal Lobe" detail="(Visuospatial)" level={scores.parietal} raw={raw.parietal} />
            </div>

            {/* 3. Detailed Summary Opinion (The new part) */}
            <div className="bg-indigo-50 rounded-3xl shadow-inner p-8 mb-8 border-2 border-indigo-100">
                <h2 className="text-xl font-bold text-indigo-900 mb-1 text-center">Summary Opinion</h2>
                {/* Dynamic Profile Title */}
                <h3 className="text-2xl font-black text-indigo-600 mb-6 text-center">"{profile.title}"</h3>

                <p className="text-gray-700 leading-relaxed mb-6 text-lg">{profile.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                        <h4 className="font-bold text-green-700 mb-2 flex items-center"><span className="text-xl mr-2">✓</span> Strengths</h4>
                        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                            {profile.strengths.map(s => <li key={s}>{s}</li>)}
                        </ul>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                        <h4 className="font-bold text-red-700 mb-2 flex items-center"><span className="text-xl mr-2">!</span> Areas for Growth</h4>
                        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                            {profile.weaknesses.map(w => <li key={w}>{w}</li>)}
                        </ul>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border-l-4 border-indigo-500 shadow-sm">
                    <h4 className="font-bold text-indigo-900 mb-2 flex items-center">💡 Actionable Advice:</h4>
                    <p className="text-gray-700 italic leading-relaxed">{profile.advice}</p>
                </div>
            </div>

            {/* 4. Standard Action Buttons */}
            <div className="space-y-4 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => {
                            const testUrl = window.location.origin + window.location.pathname;
                            if (navigator.share) {
                                navigator.share({ title: 'Cognitive Brain Test', text: 'Check your brain health age!', url: testUrl });
                            } else {
                                navigator.clipboard.writeText(testUrl);
                                alert('Test link copied!');
                            }
                        }}
                        className="w-full py-4 rounded-2xl bg-indigo-50 text-indigo-700 font-bold text-lg hover:bg-indigo-100 transition-all flex items-center justify-center gap-2 shadow-sm border border-indigo-100"
                    >
                        <Share2 size={20} />
                        Share Test
                    </button>
                    <button
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({ title: 'My Brain Test Result', text: `My brain health age is estimated at ${scores.brainAge}.`, url: window.location.href });
                            } else {
                                navigator.clipboard.writeText(window.location.href);
                                alert('Result link copied!');
                            }
                        }}
                        className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold text-lg hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                        <Copy size={20} />
                        Share Result
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={onRetake}
                        className="w-full py-4 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={20} />
                        Retake
                    </button>
                    <Link href="/" className="w-full">
                        <button
                            className="w-full py-4 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                        >
                            <LayoutGrid size={20} />
                            Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Helper Component for Score Items with Progress Bar
function ScoreItem({ label, detail, level, raw }: { label: string, detail: string, level: ScoreLevel, raw: number }) {
    const colorClass = level === 'High' ? 'bg-green-500' : level === 'Mid' ? 'bg-yellow-500' : 'bg-red-500';
    const textClass = level === 'High' ? 'text-green-700' : level === 'Mid' ? 'text-yellow-700' : 'text-red-700';

    return (
        <div>
            <div className="flex justify-between items-end mb-2">
                <div>
                    <span className="font-bold text-lg text-gray-800">{label}</span>
                    <span className="text-sm text-gray-500 ml-2">{detail}</span>
                </div>
                <span className={`font-bold ${textClass}`}>{level}</span>
            </div>
            {/* Progress Bar Background */}
            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner flex">
                {/* Progress Bar Fill */}
                <div
                    className={`h-full ${colorClass} transition-all duration-1000 ease-out`}
                    style={{ width: `${Math.max(raw, 10)}%` }} // Ensure at least a little bit shows
                />
            </div>
        </div>
    );
}
