'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Dna, Activity, Heart } from 'lucide-react';

interface LandingProps {
    onStart: () => void;
}

export default function Landing({ onStart }: LandingProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 max-w-2xl mx-auto px-4">
            <div className="space-y-4 w-full">
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl mb-8 group">
                    <Image
                        src="/body-age/hero.png"
                        alt="Body Age Test Hero"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent flex items-end justify-center pb-8">
                        <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg tracking-tight">
                            Biological Age Test
                        </h1>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-indigo-600 font-bold uppercase tracking-widest text-sm">
                    <Dna size={16} />
                    <span>Vitality Check</span>
                </div>

                <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-lg mx-auto">
                    Discover if your body is aging faster or slower than your chronological age through lifestyle and flexibility markers.
                </p>

                <div className="grid grid-cols-3 gap-4 text-xs font-bold text-slate-400 py-4 max-w-md mx-auto">
                    <div className="flex flex-col items-center gap-1">
                        <span className="p-2 bg-indigo-50 rounded-full text-indigo-600"><Activity size={16} /></span>
                        Metabolism
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="p-2 bg-indigo-50 rounded-full text-indigo-600"><Heart size={16} /></span>
                        Cardio
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="p-2 bg-indigo-50 rounded-full text-indigo-600"><ArrowRight size={16} /></span>
                        Flexibility
                    </div>
                </div>
            </div>

            <button
                onClick={onStart}
                className="group relative px-10 py-5 rounded-2xl bg-indigo-600 text-white font-bold text-xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 transition-all flex items-center gap-3"
            >
                Calculate Body Age
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-xs text-slate-400 mt-8">
                Takes approximately 4 minutes • 12 Questions
            </p>
        </div>
    );
}
