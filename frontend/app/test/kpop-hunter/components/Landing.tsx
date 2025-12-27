'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Music, Zap, Star } from 'lucide-react';

interface LandingProps {
    onStart: () => void;
}

export default function Landing({ onStart }: LandingProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 max-w-2xl mx-auto px-4">
            <div className="space-y-4 w-full">
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl mb-8 group">
                    <Image
                        src="/images/kpop-hero.png"
                        alt="K-Pop Hunter Test Hero"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent flex items-end justify-center pb-8">
                        <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg tracking-tight">
                            K-Pop Hunter Character Test
                        </h1>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-pink-500 font-bold uppercase tracking-widest text-sm">
                    <Music size={16} />
                    <span>Soul Character Match</span>
                </div>

                <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-lg mx-auto">
                    Find your soul character among the legendary Demon Hunters! Based on your personality, combat style, and hidden powers.
                </p>

                <div className="grid grid-cols-3 gap-4 text-xs font-bold text-slate-400 py-4 max-w-md mx-auto">
                    <div className="flex flex-col items-center gap-1">
                        <span className="p-2 bg-pink-50 rounded-full text-pink-500"><Star size={16} /></span>
                        Personality
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="p-2 bg-pink-50 rounded-full text-pink-500"><Zap size={16} /></span>
                        Combat
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="p-2 bg-pink-50 rounded-full text-pink-500"><ArrowRight size={16} /></span>
                        Destiny
                    </div>
                </div>
            </div>

            <button
                onClick={onStart}
                className="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xl shadow-xl shadow-purple-200 hover:scale-105 transition-all flex items-center gap-3"
            >
                Start Hunt
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-xs text-slate-400 mt-8">
                Takes approximately 5 minutes • 12 Questions
            </p>
        </div>
    );
}
