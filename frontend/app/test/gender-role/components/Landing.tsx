'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Users, Scale, Infinity as InfinityIcon } from 'lucide-react';
import { INTRODUCTION, TEST_META } from '../questions';

interface LandingProps {
    onStart: () => void;
}

export default function Landing({ onStart }: LandingProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 max-w-2xl mx-auto px-4">
            <div className="space-y-4 w-full">
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl mb-8 group">
                    <Image
                        src="/gender-role/hero.png"
                        alt="Gender Role Test Hero"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end justify-center pb-8">
                        <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg tracking-tight">
                            {INTRODUCTION.landingTitle || "2026 Gender Role Test"}
                        </h1>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-indigo-600 font-bold uppercase tracking-widest text-sm">
                    <Users size={16} />
                    <span>Psychological Analysis</span>
                </div>

                <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-lg mx-auto">
                    {INTRODUCTION.landingSubtitle || "Analyze your Masculinity, Femininity, and Situational Flexibility based on modern psychological models."}
                </p>

                <div className="grid grid-cols-3 gap-4 text-xs font-bold text-slate-400 py-4 max-w-md mx-auto">
                    <div className="flex flex-col items-center gap-1">
                        <span className="p-2 bg-indigo-50 rounded-full text-indigo-600"><Scale size={16} /></span>
                        Balance
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="p-2 bg-indigo-50 rounded-full text-indigo-600"><InfinityIcon size={16} /></span>
                        Flexibility
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="p-2 bg-indigo-50 rounded-full text-indigo-600"><ArrowRight size={16} /></span>
                        Insight
                    </div>
                </div>
            </div>

            <button
                onClick={onStart}
                className="group relative px-10 py-5 rounded-2xl bg-slate-900 text-white font-bold text-xl shadow-xl hover:bg-black hover:scale-105 transition-all flex items-center gap-3"
            >
                Start Analysis
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-xs text-slate-400 mt-8">
                {TEST_META.estimatedTime} • {TEST_META.totalQuestions} Questions
            </p>
        </div>
    );
}
