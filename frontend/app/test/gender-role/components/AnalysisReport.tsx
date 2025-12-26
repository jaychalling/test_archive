import React, { useMemo } from 'react';
import { Share2, Copy, RefreshCw, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { MODULES } from '../questions';

interface AnalysisReportProps {
    answers: Record<string, number>;
    onRestart: () => void;
}

export const AnalysisReport: React.FC<AnalysisReportProps> = ({ answers, onRestart }) => {
    const results = useMemo(() => {
        // Helper to get average of items in a category for a specific module
        const getAvg = (moduleId: string, category: string, subId?: string) => {
            const module = MODULES.find(m => m.moduleId === moduleId);
            if (!module) return 0;

            const items = module.items.filter(i =>
                (subId ? true : i.category === category) // For M2 we might need custom logic
            );

            let sum = 0; // Fix: Initialize with 0
            let count = 0; // Fix: Initialize with 0

            // M1 Logic
            if (moduleId === 'M1') {
                const targetItems = module.items.filter(i => i.category === category);
                if (targetItems.length === 0) return 0;
                targetItems.forEach(item => {
                    sum += answers[item.id.toString()] || 3;
                    count++;
                });
                return count > 0 ? sum / count : 0;
            }

            // M2 Logic (Flexibility)
            if (moduleId === 'M2') {
                // Flexibility = Average of ALL ratings in M2 (Agency Actions AND Communion Actions)
                // Assumption: High score on *available* adaptive behaviors = flexibility
                module.items.forEach(item => {
                    item.actions?.forEach(action => {
                        sum += answers[`${item.id}_${action.subId}`] || 3;
                        count++;
                    });
                });
                return count > 0 ? sum / count : 0;
            }

            return 0;
        };

        // Calculate Scores
        const agencyScore = getAvg('M1', 'Agency');
        const communionScore = getAvg('M1', 'Communion');
        const flexibilityScore = getAvg('M2', 'Flexibility'); // Category doesn't matter for my custom logic above

        // Percentages (1-5 scale to 0-100%)
        const agencyPct = Math.max(0, Math.min(100, (agencyScore - 1) / 4 * 100));
        const communionPct = Math.max(0, Math.min(100, (communionScore - 1) / 4 * 100));
        const flexibilityPct = Math.max(0, Math.min(100, (flexibilityScore - 1) / 4 * 100));

        // Determine Type
        let type = "The Balancer";
        let desc = "You maintain a balanced approach to life.";

        // Thresholds (Midpoint is 3, but let's say 3.5 is "High" for better differentiation?)
        // Actually standard is Median split. Let's use 3.0 as neutral.
        const highA = agencyScore >= 3.2;
        const highC = communionScore >= 3.2;

        if (highA && highC) {
            type = "The All-Rounder (Androgynous)";
            desc = "You possess high levels of both Agency and Communion. You are adaptable, assertive when needed, and nurturing when required. This is often linked to high mental resilience.";
        } else if (highA && !highC) {
            type = "The Commander (Agentic)";
            desc = "You are driven, competitive, and task-oriented. You excel at achieving goals but may sometimes overlook the emotional needs of others.";
        } else if (!highA && highC) {
            type = "The Nurturer (Communal)";
            desc = "You are warm, empathetic, and relationship-focused. You prioritize harmony and caring for others, sometimes at the expense of your own needs.";
        } else {
            type = "The Observer (Undifferentiated)";
            desc = "You tend to avoid strong displays of dominance or excessive emotionality. You may prefer a low-profile approach to social interactions.";
        }

        // Stress Analysis (M3)
        const stressors: string[] = [];
        const m3 = MODULES.find(m => m.moduleId === 'M3');
        m3?.items.slice(0, 4).forEach(item => { // First 4 are stress items
            const score = answers[item.id.toString()] || 3;
            if (score >= 4 && item.text) {
                stressors.push(item.text);
            }
        });

        return {
            agencyScore,
            communionScore,
            agencyPct,
            communionPct,
            flexibilityPct,
            type,
            desc,
            stressors
        };
    }, [answers]);

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in pb-12">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Analysis Complete</h2>
                <p className="text-slate-600 dark:text-slate-300">Here is your Gender Role Profile for 2026</p>
            </div>

            {/* Main Type Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 shadow-xl text-center space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />

                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-300">Your Personality Type</h3>
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white leading-tight break-words">
                    {results.type}
                </h1>
                <p className="text-slate-300 text-lg max-w-lg mx-auto leading-relaxed">
                    {results.desc}
                </p>
            </div>

            {/* Scores Grid */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-4">
                    <div className="flex justify-between items-center">
                        <h4 className="font-bold text-slate-700 dark:text-slate-200">Masculinity (Agency)</h4>
                        <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{Math.round(results.agencyPct)}%</span>
                    </div>
                    <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${results.agencyPct}%` }} />
                    </div>
                    <p className="text-xs text-slate-500">Assertiveness, Independence, Competence</p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-4">
                    <div className="flex justify-between items-center">
                        <h4 className="font-bold text-slate-700 dark:text-slate-200">Femininity (Communion)</h4>
                        <span className="font-mono font-bold text-pink-600 dark:text-pink-400">{Math.round(results.communionPct)}%</span>
                    </div>
                    <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-pink-500 rounded-full transition-all duration-1000" style={{ width: `${results.communionPct}%` }} />
                    </div>
                    <p className="text-xs text-slate-500">Empathy, Warmth, Morality</p>
                </div>
            </div>

            {/* Flexibility Score */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-lg">Gender Adaptability (Flexibility)</h4>
                        <p className="text-sm text-slate-500">Ability to switch between tough and tender responses.</p>
                    </div>
                    <div className={`text-2xl font-bold ${results.flexibilityPct > 70 ? 'text-green-500' : 'text-yellow-500'}`}>
                        {Math.round(results.flexibilityPct)}
                    </div>
                </div>
                <div className="h-6 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden relative">
                    <div
                        className={`h-full rounded-full transition-all duration-1000 ${results.flexibilityPct > 70 ? 'bg-green-500' : 'bg-yellow-500'}`}
                        style={{ width: `${results.flexibilityPct}%` }}
                    />
                </div>
            </div>

            {/* Stress Factors */}
            {results.stressors.length > 0 && (
                <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30 space-y-3">
                    <h4 className="font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
                        <span>⚠️</span> Identified Stressors
                    </h4>
                    <p className="text-sm text-red-600 dark:text-red-300">
                        You indicated high agreement with the following stress factors:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-red-700 dark:text-red-300">
                        {results.stressors.map((s, i) => (
                            <li key={i}>{s}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* --- Share & Actions (Standardized 4-Button Grid) --- */}
            <div className="pt-8 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => {
                            const testUrl = window.location.origin + window.location.pathname;
                            if (navigator.share) {
                                navigator.share({ title: '2026 Gender Role Test', text: 'Analyze your Masculinity & Femininity levels.', url: testUrl });
                            } else {
                                navigator.clipboard.writeText(testUrl);
                                alert('Test link copied!');
                            }
                        }}
                        className="w-full py-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 border border-blue-100 dark:border-blue-900/30 font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                        <Share2 size={20} />
                        Share Test
                    </button>
                    <button
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({ title: 'My Gender Role Test Result', text: `My Gender Role Type is: ${results.type}. Check yours!`, url: window.location.href });
                            } else {
                                navigator.clipboard.writeText(window.location.href);
                                alert('Result link copied!');
                            }
                        }}
                        className="w-full py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                        <Copy size={20} />
                        Share Result
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={onRestart}
                        className="w-full py-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={20} />
                        Retake
                    </button>
                    <Link href="/" className="w-full">
                        <button
                            className="w-full py-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                        >
                            <LayoutGrid size={20} />
                            Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AnalysisReport;
