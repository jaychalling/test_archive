'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, AlertTriangle, CheckSquare } from 'lucide-react';
import Link from 'next/link';

interface LandingProps {
    onStart: () => void;
}

export default function Landing({ onStart }: LandingProps) {
    const [agreed, setAgreed] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 max-w-2xl mx-auto px-4">
            <div className="space-y-4">
                <div className="relative w-full aspect-square md:aspect-video rounded-3xl overflow-hidden shadow-2xl mb-8 group">
                    <Image
                        src="/rice-purity/hero-2026.jpg"
                        alt="Rice Purity Test Hero"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                </div>

                <p className="text-xl text-slate-600 font-medium leading-relaxed">
                    The 100-question test, <span className="text-slate-900 font-bold">updated for 2026</span>.<br />
                    From digital sins to modern romance. Are you a <span className="text-indigo-600 font-bold">Saint</span> or a <span className="text-rose-600 font-bold">Rebel</span>?
                </p>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-left space-y-3">
                    <div className="flex items-center gap-2 text-amber-700 font-bold text-lg">
                        <AlertTriangle size={24} />
                        Disclaimer
                    </div>
                    <p className="text-amber-900/80 text-sm leading-relaxed">
                        This test is for <span className="font-bold">entertainment purposes only</span>.
                        It contains mature themes including alcohol, drugs, and sexual content.
                        It is not a judgment of your character or moral standing.
                        This is a historical internet tradition, intended for fun.
                    </p>
                    <label className="flex items-start gap-3 pt-2 cursor-pointer group">
                        <div className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${agreed ? 'bg-amber-600 border-amber-600' : 'border-amber-400 bg-white'}`}>
                            {agreed && <CheckSquare size={14} className="text-white" />}
                        </div>
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                        />
                        <span className={`text-sm font-medium transition-colors ${agreed ? 'text-amber-900' : 'text-amber-700/70'}`}>
                            I understand this is for fun and I am comfortable with mature themes.
                        </span>
                    </label>
                </div>
            </div>

            <button
                onClick={onStart}
                disabled={!agreed}
                className={`group relative px-8 py-4 rounded-2xl font-bold text-xl transition-all shadow-lg flex items-center gap-3
                    ${agreed
                        ? 'bg-gradient-to-r from-red-600 to-indigo-700 text-white hover:scale-105 hover:shadow-xl'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
            >
                Start Test
                <ArrowRight size={24} className={agreed ? "group-hover:translate-x-1 transition-transform" : ""} />
            </button>

            <p className="text-xs text-slate-400 mt-8">
                Based on the Rice University tradition • 100 Questions
            </p>
        </div>
    );
}
