'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, TrendingUp } from 'lucide-react';

interface Props {
    onStart: () => void;
}

export default function Landing({ onStart }: Props) {
    return (
        <div className="min-h-screen bg-neutral-900 text-stone-100 font-sans selection:bg-red-900 selection:text-white flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full bg-neutral-800/50 backdrop-blur-md border border-neutral-700 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900 via-amber-600 to-red-900"></div>

                <div className="flex justify-center mb-8">
                    <div className="p-4 rounded-full bg-neutral-900 border border-neutral-700 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                        <Flame className="w-12 h-12 text-red-600" />
                    </div>
                </div>

                <h1 className="text-3xl md:text-5xl font-black text-center mb-6 tracking-tight bg-gradient-to-br from-stone-100 to-stone-500 bg-clip-text text-transparent">
                    Money Script<br />& 2026 Psychology
                </h1>

                <p className="text-lg text-stone-400 text-center mb-10 leading-relaxed font-light">
                    2026 is the year of the <span className="text-red-500 font-semibold">Red Horse (Fire)</span>.
                    A time of volatility, intensity, and transformation.<br /><br />
                    Is your unconscious "Money Script" ready for this heat?
                    Discover your financial archetype and how to survive the coming wealth shift.
                </p>

                <div className="flex justify-center">
                    <button
                        onClick={onStart}
                        className="group relative px-8 py-4 bg-red-900 hover:bg-red-800 text-white text-lg font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(153,27,27,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Begin Analysis <TrendingUp className="w-5 h-5" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-700 text-center">
                    <p className="text-xs text-stone-500 uppercase tracking-widest">
                        Based on Klontz Money Script Inventory
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
