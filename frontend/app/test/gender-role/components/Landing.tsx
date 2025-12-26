import React from 'react';
import { INTRODUCTION, TEST_META } from '../questions';

interface LandingProps {
    onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
    return (
        <div className="max-w-2xl mx-auto px-4 py-12 flex flex-col gap-8 animate-fade-in text-slate-800 dark:text-slate-100">
            <div className="text-center space-y-4">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full dark:bg-primary/20">
                    Updated for {TEST_META.year}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 pb-2">
                    {INTRODUCTION.landingTitle}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                    {INTRODUCTION.landingSubtitle}
                </p>

                <div className="flex flex-col items-center gap-4 pt-6 pb-2">
                    <button
                        onClick={onStart}
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-slate-900 rounded-full hover:bg-slate-800 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 shadow-lg hover:shadow-xl"
                    >
                        Start Analysis
                        <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </button>
                    <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-4 font-medium">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {TEST_META.estimatedTime}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                            {TEST_META.totalQuestions} Questions
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-y-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                        {INTRODUCTION.purpose.header}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                        {INTRODUCTION.purpose.body}
                    </p>
                </div>

                <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                        {INTRODUCTION.theoreticalBackground.header}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                        {INTRODUCTION.theoreticalBackground.body}
                    </p>
                </div>

                <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">What You Will Get</h2>
                    <ul className="grid gap-2">
                        {INTRODUCTION.whatYouWillGet.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 text-sm">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="flex justify-center pb-4 opacity-80">
                <button
                    onClick={onStart}
                    className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 underline underline-offset-4 text-sm font-medium transition-colors"
                >
                    Start Analysis Now
                </button>
            </div>
        </div>
    );
};

export default Landing;
