'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Coins, Shield, Crown, RefreshCcw, Share2, AlertTriangle, TrendingUp, Cpu, Lock, Home } from 'lucide-react';
import Link from 'next/link';
import { RESULTS, MoneyScriptType } from '../questions';

interface Props {
    resultCode: string; // "Avoidance", "Worship", etc.
}

export default function AnalysisReport({ resultCode }: Props) {
    const result = RESULTS[resultCode as MoneyScriptType];

    if (!result) {
        return <div className="text-white text-center p-8">Invalid Result Code</div>;
    }

    const { icon: Icon } = result;

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Money Script & 2026 Psychology',
                    text: `My 2026 Financial Archetype is: ${result.title}. What's yours?`,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Share failed', err);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-stone-100 font-sans p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-4xl mx-auto"
            >
                {/* Header */}
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/30 border border-red-800/50 text-red-400 text-xs font-bold tracking-wider uppercase mb-4">
                        2026 Financial Psychology Report
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black mb-2">
                        <span className={result.color}>{result.title}</span>
                    </h2>
                    <h3 className="text-xl md:text-2xl text-stone-400 font-serif italic">
                        "{result.archetype}"
                    </h3>
                </header>

                {/* Main Card */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Left: Archetype Info */}
                    <div className="bg-neutral-800/50 border border-neutral-700 rounded-3xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Icon className={`w-32 h-32 ${result.color}`} />
                        </div>
                        <h4 className="text-lg font-bold text-stone-300 mb-4 flex items-center gap-2">
                            <Cpu className="w-5 h-5" /> Archetype Analysis
                        </h4>
                        <p className="text-stone-400 leading-relaxed text-lg">
                            {result.description}
                        </p>
                    </div>

                    {/* Right: 2026 Forecast */}
                    <div className="bg-gradient-to-br from-red-950 to-neutral-900 border border-red-900/30 rounded-3xl p-8 relative">
                        <h4 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                            <Flame className="w-5 h-5" /> 2026 Red Horse Forecast
                        </h4>
                        <p className="text-stone-300 leading-relaxed">
                            {result.forecast2026}
                        </p>
                    </div>
                </div>

                {/* Strategy Section */}
                <div className="bg-neutral-800/30 border border-neutral-700 rounded-3xl p-8 mb-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <h5 className="flex items-center gap-2 text-amber-500 font-bold mb-3 text-sm uppercase tracking-wider">
                                <AlertTriangle className="w-4 h-4" /> Major Risk
                            </h5>
                            <p className="text-stone-300 text-sm">{result.risk}</p>
                        </div>
                        <div>
                            <h5 className="flex items-center gap-2 text-cyan-400 font-bold mb-3 text-sm uppercase tracking-wider">
                                <Cpu className="w-4 h-4" /> AI Strategy
                            </h5>
                            <p className="text-stone-300 text-sm">{result.aiStrategy}</p>
                        </div>
                        <div>
                            <h5 className="flex items-center gap-2 text-emerald-400 font-bold mb-3 text-sm uppercase tracking-wider">
                                <Coins className="w-4 h-4" /> Recommended Asset
                            </h5>
                            <p className="text-stone-300 font-serif text-lg italic text-white/90">{result.assetClass}</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto mb-16">
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.origin + window.location.pathname);
                            alert('Test Link Copied!');
                        }}
                        className="px-4 py-3 rounded-xl bg-neutral-800 text-stone-300 hover:bg-neutral-700 transition-colors font-bold flex items-center justify-center gap-2 text-sm"
                    >
                        <Share2 className="w-4 h-4" /> Share Test
                    </button>

                    <button
                        onClick={handleShare}
                        className="px-4 py-3 rounded-xl bg-red-900 text-white hover:bg-red-800 transition-colors font-bold flex items-center justify-center gap-2 text-sm"
                    >
                        <TrendingUp className="w-4 h-4" /> Share Result
                    </button>

                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-3 rounded-xl bg-neutral-800 text-stone-300 hover:bg-neutral-700 transition-colors font-bold flex items-center justify-center gap-2 text-sm"
                    >
                        <RefreshCcw className="w-4 h-4" /> Retest
                    </button>

                    <Link
                        href="/"
                        className="px-4 py-3 rounded-xl bg-stone-100 text-neutral-900 hover:bg-white transition-colors font-bold flex items-center justify-center gap-2 text-sm"
                    >
                        <Home className="w-4 h-4" /> Home
                    </Link>
                </div>

                {/* Sources */}
                <footer className="border-t border-neutral-800 pt-8 text-center text-stone-600">
                    <h6 className="text-xs font-bold uppercase mb-4 tracking-widest">Sources & References</h6>
                    <ul className="text-xs space-y-2 max-w-lg mx-auto">
                        <li>Klontz, B., & Britt, S. L. (2012). How clients' money scripts predict their financial behaviors.</li>
                        <li>Goldman Sachs. (2024). The Global Economy in 2026: Sturdy Growth.</li>
                        <li>Morgan Stanley. (2024). 2026 Economic Outlook: Moderate Growth.</li>
                        <li>Microsoft. (2025). AI Transformation in Financial Services 2026.</li>
                    </ul>
                </footer>
            </motion.div>
        </div>
    );
}
