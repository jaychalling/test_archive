'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Droplet, Activity, HeartPulse } from 'lucide-react';

interface LandingProps {
    onStart: () => void;
}

export default function Landing({ onStart }: LandingProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 max-w-2xl mx-auto px-4">
            <div className="space-y-4 w-full">
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl mb-8 group">
                    <Image
                        src="/images/diabetes-hero.png"
                        alt="Diabetes Risk Test Hero"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end justify-center pb-8">
                        <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg tracking-tight">
                            Diabetes Risk Test
                        </h1>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-blue-600 font-bold uppercase tracking-widest text-sm">
                    <Droplet size={16} />
                    <span>Health Assessment</span>
                </div>

                <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-lg mx-auto">
                    Assess your risk factors for Type 2 Diabetes based on lifestyle, family history, and physical indicators.
                </p>

                <div className="grid grid-cols-3 gap-4 text-xs font-bold text-slate-400 py-4 max-w-md mx-auto">
                    <div className="flex flex-col items-center gap-1">
                        <span className="p-2 bg-blue-50 rounded-full text-blue-600"><Activity size={16} /></span>
                        Lifestyle
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="p-2 bg-blue-50 rounded-full text-blue-600"><HeartPulse size={16} /></span>
                        History
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="p-2 bg-blue-50 rounded-full text-blue-600"><ArrowRight size={16} /></span>
                        Checkup
                    </div>
                </div>
            </div>

            <button
                onClick={onStart}
                className="group relative px-10 py-5 rounded-2xl bg-blue-600 text-white font-bold text-xl shadow-xl shadow-blue-200 hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-3"
            >
                Start Health Check
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-xs text-slate-400 mt-8">
                Takes approximately 3 minutes • 10 Questions
            </p>
        </div>
    );
}
