'use client';

import React from 'react';
import { ArrowRight, Brain, Clock, Target, Lightbulb } from 'lucide-react';

interface LandingProps {
    onStart: () => void;
}

export default function Landing({ onStart }: LandingProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 max-w-2xl mx-auto px-4 py-12">
            <div className="space-y-6 w-full">
                {/* Hero Section */}
                <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl mb-8 bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-24 h-24 mb-4 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                            <Brain className="w-12 h-12 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-lg tracking-tight">
                            2025 Free IQ Test
                        </h1>
                        <p className="text-lg text-white/80 mt-2 font-medium">
                            Scientific Intelligence Assessment
                        </p>
                    </div>
                </div>

                {/* Badge */}
                <div className="flex items-center justify-center gap-2 text-indigo-600 font-bold uppercase tracking-widest text-sm">
                    <Brain size={16} />
                    <span>50 Questions - Full Assessment</span>
                </div>

                {/* Description */}
                <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-lg mx-auto">
                    Based on Wechsler (WAIS) model and Mensa-style Raven matrices.
                    Test your Verbal, Numerical, and Spatial reasoning abilities.
                </p>

                {/* Feature Grid */}
                <div className="grid grid-cols-3 gap-4 text-xs font-bold text-slate-400 py-6 max-w-md mx-auto">
                    <div className="flex flex-col items-center gap-2">
                        <span className="p-3 bg-indigo-50 rounded-full text-indigo-600">
                            <Lightbulb size={18} />
                        </span>
                        <span>Verbal</span>
                        <span className="text-indigo-600">15 Q</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="p-3 bg-purple-50 rounded-full text-purple-600">
                            <Target size={18} />
                        </span>
                        <span>Numerical</span>
                        <span className="text-purple-600">15 Q</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="p-3 bg-blue-50 rounded-full text-blue-600">
                            <Brain size={18} />
                        </span>
                        <span>Spatial</span>
                        <span className="text-blue-600">20 Q</span>
                    </div>
                </div>

                {/* Scientific Badges */}
                <div className="flex flex-wrap justify-center gap-2 text-xs">
                    <span className="px-3 py-1 bg-slate-100 rounded-full text-slate-600">CHC Theory Based</span>
                    <span className="px-3 py-1 bg-slate-100 rounded-full text-slate-600">Wechsler Model</span>
                    <span className="px-3 py-1 bg-slate-100 rounded-full text-slate-600">Mensa Style</span>
                </div>
            </div>

            {/* CTA Button */}
            <button
                onClick={onStart}
                className="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xl shadow-xl shadow-indigo-200 hover:scale-105 transition-all flex items-center gap-3"
            >
                Start IQ Test
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Footer Info */}
            <div className="flex items-center gap-4 text-xs text-slate-400 mt-8">
                <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>20-30 minutes</span>
                </div>
                <span>|</span>
                <span>50 Questions</span>
                <span>|</span>
                <span>Free</span>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-slate-400 max-w-md">
                This test is designed for entertainment and self-assessment purposes.
                For clinical IQ evaluation, please consult a licensed psychologist.
            </p>
        </div>
    );
}
