'use client';

import React from 'react';
import { Share2, RefreshCw, Copy, LayoutGrid, Brain, Lightbulb, Calculator, Shapes, TrendingUp, Award, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { calculateResult, IQResult } from '../questions';

export default function AnalysisReport({ res, onRestart }: { res: string; onRestart: () => void }) {
    const result: IQResult = calculateResult(res);

    // IQ Range display (show as range for uncertainty)
    const iqLow = Math.max(55, result.iqScore - 5);
    const iqHigh = Math.min(160, result.iqScore + 5);

    // Color based on IQ category
    const getCategoryStyle = () => {
        if (result.iqScore >= 145) return { gradient: 'from-amber-500 to-yellow-400', text: 'text-amber-600', bg: 'bg-amber-50' };
        if (result.iqScore >= 130) return { gradient: 'from-purple-600 to-indigo-500', text: 'text-purple-600', bg: 'bg-purple-50' };
        if (result.iqScore >= 115) return { gradient: 'from-blue-600 to-indigo-500', text: 'text-blue-600', bg: 'bg-blue-50' };
        if (result.iqScore >= 100) return { gradient: 'from-green-600 to-teal-500', text: 'text-green-600', bg: 'bg-green-50' };
        if (result.iqScore >= 85) return { gradient: 'from-slate-600 to-slate-500', text: 'text-slate-600', bg: 'bg-slate-50' };
        return { gradient: 'from-slate-500 to-slate-400', text: 'text-slate-500', bg: 'bg-slate-50' };
    };

    const style = getCategoryStyle();

    return (
        <div className="max-w-2xl mx-auto py-12 px-6 animate-in fade-in duration-700 font-sans">

            {/* Main Score Card */}
            <div className={`${style.bg} rounded-3xl p-8 text-center mb-8 shadow-lg relative overflow-hidden`}>
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${style.gradient}`} />

                <div className="inline-block px-3 py-1 bg-white/60 rounded-full text-xs font-bold tracking-widest mb-4 uppercase text-slate-500">
                    Your IQ Score
                </div>

                {/* IQ Number */}
                <div className={`text-7xl md:text-8xl font-black ${style.text} tracking-tight mb-2`}>
                    {result.iqScore}
                </div>
                <div className="text-sm text-slate-500 mb-4">
                    Range: {iqLow} - {iqHigh} (95% confidence)
                </div>

                {/* Category Badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 ${style.bg} border ${style.text.replace('text-', 'border-').replace('600', '200')} rounded-full mb-4`}>
                    <Award size={18} />
                    <span className="font-bold text-lg">{result.category.label}</span>
                </div>

                {/* Percentile */}
                <p className="text-slate-600 font-medium">
                    {result.category.percentile} of population
                </p>
            </div>

            {/* Section Scores */}
            <div className="space-y-6 mb-10">
                <section className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-2 mb-4 font-bold text-slate-900 text-lg">
                        <TrendingUp className="w-5 h-5 text-indigo-500" />
                        Section Performance
                    </div>

                    {/* Verbal */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Lightbulb className="w-4 h-4 text-indigo-500" />
                                <span className="font-semibold text-slate-700">Verbal Reasoning</span>
                            </div>
                            <span className="font-bold text-indigo-600">{result.verbalScore}/15 ({result.verbalPercent}%)</span>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full transition-all duration-1000"
                                style={{ width: `${result.verbalPercent}%` }}
                            />
                        </div>
                    </div>

                    {/* Numerical */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Calculator className="w-4 h-4 text-purple-500" />
                                <span className="font-semibold text-slate-700">Numerical Ability</span>
                            </div>
                            <span className="font-bold text-purple-600">{result.numericalScore}/15 ({result.numericalPercent}%)</span>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-1000"
                                style={{ width: `${result.numericalPercent}%` }}
                            />
                        </div>
                    </div>

                    {/* Spatial */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Shapes className="w-4 h-4 text-blue-500" />
                                <span className="font-semibold text-slate-700">Spatial Reasoning</span>
                            </div>
                            <span className="font-bold text-blue-600">{result.spatialScore}/20 ({result.spatialPercent}%)</span>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000"
                                style={{ width: `${result.spatialPercent}%` }}
                            />
                        </div>
                    </div>
                </section>

                {/* Raw Score Info */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl text-center">
                        <div className="text-3xl font-black text-slate-800">{result.rawScore}</div>
                        <div className="text-xs text-slate-500 uppercase font-bold">Correct Answers</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl text-center">
                        <div className="text-3xl font-black text-slate-800">50</div>
                        <div className="text-xs text-slate-500 uppercase font-bold">Total Questions</div>
                    </div>
                </div>

                {/* Category Description */}
                <section className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-2 mb-3 font-bold text-slate-900 text-lg">
                        <Brain className="w-5 h-5 text-indigo-500" />
                        What This Means
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                        {result.category.description}
                    </p>
                </section>

                {/* Disclaimer */}
                <section className="bg-amber-50/50 border border-amber-100 p-5 rounded-2xl">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                            <div className="font-bold text-amber-800 mb-1">Important Note</div>
                            <p className="text-sm text-amber-700">
                                This is an online assessment for entertainment and self-discovery purposes.
                                For a clinically validated IQ score, please consult a licensed psychologist
                                who can administer standardized tests like WAIS-IV or Stanford-Binet.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* 4-Button Grid (Mandatory) */}
            <div className="pt-8 border-t border-slate-100 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => {
                            const testUrl = window.location.origin + window.location.pathname;
                            if (navigator.share) {
                                navigator.share({
                                    title: '2025 Free IQ Test',
                                    text: 'Test your IQ with this scientific assessment!',
                                    url: testUrl
                                });
                            } else {
                                navigator.clipboard.writeText(testUrl);
                                alert('Test link copied!');
                            }
                        }}
                        className="w-full py-4 rounded-2xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100 font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                        <Share2 size={20} />
                        Share Test
                    </button>
                    <button
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: 'My IQ Test Result',
                                    text: `My IQ Score: ${result.iqScore} (${result.category.label})`,
                                    url: window.location.href
                                });
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
                        onClick={onRestart}
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
