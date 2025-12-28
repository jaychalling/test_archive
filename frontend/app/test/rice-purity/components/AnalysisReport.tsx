'use client';

import React, { useEffect, useState } from 'react';
import { Share2, Copy, RefreshCw, LayoutGrid, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface AnalysisReportProps {
    score: number;
    onRetake: () => void;
}

// 4.1 Archetypes
// 4.1 Archetypes
const getArchetype = (score: number) => {
    if (score >= 98) return { title: "The Saint", desc: "Did you just fall from heaven? Where are your wings?", roast: "You're either a newborn or a liar.", color: "text-indigo-600", bg: "bg-indigo-50", image: "/images/rice-saint.png" };
    if (score >= 90) return { title: "The Goody Two-Shoes", desc: "Mom's favorite child. Your craziest memory is sleeping in?", roast: "The only 'high' you've ever felt is from sugar.", color: "text-blue-600", bg: "bg-blue-50", image: "/images/rice-goody.png" };
    if (score >= 77) return { title: "The Normie", desc: "Perfectly balanced. You have a life, but you're not in jail.", roast: "You're the vanilla ice cream of humans.", color: "text-teal-600", bg: "bg-teal-50", image: "/images/rice-normie.png" };
    if (score >= 45) return { title: "The Life Explorer", desc: "You've seen some things. A true connoisseur of bad decisions.", roast: "Your memoir would need a 'Rated R' sticker.", color: "text-amber-600", bg: "bg-amber-50", image: "/images/rice-explorer.png" };
    if (score >= 30) return { title: "The Rebel", desc: "Police meeting when? Your life is a Netflix series.", roast: "Every parent's nightmare, every friend's entertainment.", color: "text-orange-600", bg: "bg-orange-50", image: "/images/rice-rebel.png" };
    return { title: "The Devil Child", desc: "How are you not in prison? You are a walking red flag.", roast: "We're scared to even look at you.", color: "text-rose-600", bg: "bg-rose-50", image: "/images/rice-devil.png" };
};

export default function AnalysisReport({ score, onRetake }: AnalysisReportProps) {
    const archetype = getArchetype(score);
    const [copied, setCopied] = useState(false);
    const resultUrl = typeof window !== 'undefined'
        ? `${window.location.origin}${window.location.pathname}?res=${score}`
        : '';

    // Benchmarking Data
    const averageScore = 64; // Global/US average roughly

    return (
        <div className="max-w-2xl mx-auto space-y-8 pb-12">
            {/* Score Card */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                <div className={`p-8 text-center ${archetype.bg}`}>
                    <h2 className="text-xl font-bold text-slate-500 uppercase tracking-widest mb-2">Rice Purity Score</h2>
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`text-8xl font-black ${archetype.color} mb-6`}
                    >
                        {score}
                    </motion.div>

                    {/* Result Image */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="relative w-48 h-48 mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg border-4 border-white"
                    >
                        <Image
                            src={archetype.image}
                            alt={archetype.title}
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    <div className="space-y-2">
                        <h3 className={`text-3xl font-bold ${archetype.color}`}>{archetype.title}</h3>
                        <p className="text-slate-700 text-lg font-medium">{archetype.desc}</p>
                    </div>
                </div>

                {/* Roast & Benchmark */}
                <div className="p-8 space-y-8">
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">🔥</span>
                            <span className="font-bold text-slate-900">Roast</span>
                        </div>
                        <p className="text-slate-600 italic text-lg">"{archetype.roast}"</p>
                    </div>

                    {/* Static Benchmark Graph */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-slate-800 flex items-center gap-2">
                            <span className="w-1 h-6 bg-slate-800 rounded-full"></span>
                            Reality Check
                        </h4>
                        <div className="relative h-12 bg-slate-100 rounded-full overflow-hidden flex items-center">
                            {/* Average Marker */}
                            <div className="absolute top-0 bottom-0 w-1 bg-slate-400 z-10" style={{ left: `${averageScore}%` }} />
                            <div className="absolute top-1 text-xs font-bold text-slate-400 z-10 -translate-x-1/2" style={{ left: `${averageScore}%` }}>
                                Avg {averageScore}
                            </div>

                            {/* User Score Bar */}
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${score}%` }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className={`h-full ${score > averageScore ? 'bg-indigo-400' : 'bg-rose-400'} rounded-r-full relative`}
                            >
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white font-bold text-sm">You</span>
                            </motion.div>
                        </div>
                        <p className="text-xs text-slate-400 text-center">
                            Comparison based on global university averages.
                        </p>
                    </div>
                </div>
            </div>

            {/* Warning / Disclaimer again for safety */}
            <div className="flex gap-2 items-start p-4 bg-amber-50 rounded-xl text-amber-800 text-sm">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <p>Remember, this score is for fun. A lower score means more experience, but it doesn't define your worth.</p>
            </div>

            {/* Standard 4-Button Action Grid */}
            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={() => {
                        const testUrl = window.location.origin + window.location.pathname;
                        if (navigator.share) {
                            navigator.share({
                                title: 'Rice Purity Test',
                                text: `I got a ${score} (${archetype.title}). ${archetype.roast}`,
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
                        const shareText = `My Rice Purity Score: ${score}\nType: ${archetype.title}\n"${archetype.roast}"\nTake the test: ${resultUrl}`;
                        if (navigator.share) {
                            navigator.share({ title: 'My Purity Score', text: shareText, url: resultUrl });
                        } else {
                            navigator.clipboard.writeText(shareText);
                            alert('Result copied to clipboard!');
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
    );
}
