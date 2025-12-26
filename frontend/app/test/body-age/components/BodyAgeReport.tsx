'use client';

import React from 'react';
import {
    Copy, RefreshCw, AlertTriangle,
    Moon, Utensils, Activity, ArrowRight, MessageCircle, LayoutGrid, Share2
} from 'lucide-react';
import Link from 'next/link';

// --- Types ---
export interface AnswerRecord {
    id: number;
    category: string;
    score: number;
    label: string;
}

interface BodyAgeReportProps {
    ageGap: number;        // 신체나이 차이 (예: +3, -2)
    score: number;         // 실제 나이 (Real Age)로 재활용하거나 별도 prop으로 전달. 
    // 여기서는 편의상 score prop을 realAge로 사용한다고 가정하고 수정. 
    // 하지만 타입 명확성을 위해 realAge prop을 추가하는 것이 좋음.
    // 기존 코드와의 호환성을 위해 score를 realAge로 간주하거나, 
    // BodyAgeUI에서 넘겨줄 때 의미를 바꿈.
    realAge?: number;      // 새로 추가 (Optional for backward compatibility)
    answers: AnswerRecord[]; // 사용자가 선택한 답변 리스트 (상세 분석용)
    onRestart: () => void; // 재검사 함수
}

export default function BodyAgeReport({ ageGap, score, realAge, answers, onRestart }: BodyAgeReportProps) {

    // Fallback: If realAge is not passed, use 30 or assume score contains it.
    // In previous step, I set setFinalScore(realAge). So 'score' prop holds realAge.
    const actualAge = realAge || score || 30;
    const bodyAge = actualAge + ageGap;

    // 1. 등급 판정 (Grade Logic)
    const getGrade = (gap: number) => {
        if (gap <= -3) return {
            title: 'Youthful (Slow Aging)',
            color: 'text-green-600',
            bg: 'bg-green-50',
            border: 'border-green-100',
            summary: `Great! Your biological age is ${bodyAge}, which is ${Math.abs(gap)} years younger than your actual age.`
        };
        if (gap <= 2) return {
            title: 'Normal (Healthy)',
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-blue-100',
            summary: `You are healthy. Your biological age ${bodyAge} is similar to your actual age.`
        };
        return {
            title: 'Accelerated (Fast Aging)',
            color: 'text-red-600',
            bg: 'bg-red-50',
            border: 'border-red-100',
            summary: `Warning. Your biological age is ${bodyAge}, which is ${gap} years older than your actual age.`
        };
    };

    const grade = getGrade(ageGap);

    // 2. 위험 요인 추출 (점수가 높은 항목만)
    const riskFactors = answers ? answers.filter(a => a.score >= 4) : [];

    // 3. 섹션별 분석 텍스트 생성기
    const getSectionAnalysis = (categories: string[]) => {
        if (!answers || answers.length === 0) return "Detailed analysis is available when you take the test directly.";

        const relevant = answers.filter(a => categories.includes(a.category));
        const sectionScore = relevant.reduce((acc, curr) => acc + curr.score, 0);

        // 카테고리별 맞춤 조언
        if (categories.includes('Sleep')) {
            if (sectionScore >= 5) return "⚠️ [Chronic Sleep Debt] Your sleep quality is concerning. Lack of deep sleep blocks 'autophagy' (cellular cleaning), leading to faster aging.";
            return "✅ [Good Regeneration] Your sleep patterns support healthy cellular regeneration.";
        }
        if (categories.includes('Diet')) {
            if (sectionScore >= 6) return "⚠️ [Glycation Warning] High intake of sugar/processed food causes 'Glycation', making blood vessels stiff. This is a primary aging factor.";
            return "🥗 [Clean Fuel] Your diet is rich in nutrients and low in inflammatory foods. Keep it up!";
        }
        if (categories.includes('Exercise')) {
            if (sectionScore >= 5) return "⚠️ [Sedentary Risk] Lack of muscle stimulation reduces mitochondrial efficiency. You need more movement to boost vitality.";
            return "💪 [Active Vitality] Your activity levels are excellent for maintaining muscle mass.";
        }
        return "";
    };



    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 font-sans animate-in fade-in duration-500">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">

                {/* --- Header Section --- */}
                <div className={`${grade.bg} p-10 text-center border-b ${grade.border}`}>
                    <h1 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Biological Age Result</h1>

                    <div className="flex items-center justify-center gap-6 mb-6">
                        <div className="flex flex-col">
                            <span className="text-sm text-slate-500 font-bold uppercase">Actual Age</span>
                            <span className="text-4xl font-bold text-slate-400">{actualAge}</span>
                        </div>
                        <div className="text-2xl text-slate-300">→</div>
                        <div className="flex flex-col">
                            <span className="text-sm text-slate-500 font-bold uppercase">Body Age</span>
                            <span className={`text-6xl font-black tracking-tighter ${grade.color}`}>
                                {bodyAge}
                            </span>
                        </div>
                    </div>

                    <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold bg-white/60 border ${grade.border} ${grade.color} mb-4`}>
                        {grade.title}
                    </div>
                    <p className="text-slate-700 text-lg max-w-lg mx-auto leading-relaxed">{grade.summary}</p>
                </div>

                {/* --- Body Section --- */}
                <div className="p-6 md:p-10 space-y-10">

                    {/* 1. Sleep & Stress */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-indigo-100 rounded-xl text-indigo-600"><Moon className="w-6 h-6" /></div>
                            <h2 className="text-xl font-bold text-slate-800">01. Cellular Regeneration</h2>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-slate-600 leading-relaxed whitespace-pre-line">
                            {getSectionAnalysis(['Sleep', 'Stress'])}
                        </div>
                    </section>

                    {/* 2. Diet & Metabolic */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-600"><Utensils className="w-6 h-6" /></div>
                            <h2 className="text-xl font-bold text-slate-800">02. Metabolic Aging</h2>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-slate-600 leading-relaxed whitespace-pre-line">
                            {getSectionAnalysis(['Diet'])}
                            {/* Actionable Tip Box */}
                            <div className="mt-4 p-4 bg-white rounded-xl border border-emerald-100 shadow-sm flex gap-3">
                                <div className="shrink-0 pt-1"><ArrowRight className="w-4 h-4 text-emerald-500" /></div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-sm mb-1">Anti-Aging Pro Tip</h4>
                                    <p className="text-xs text-slate-500">Reduce 'Added Sugars' (Soda, Cake) to zero for 2 weeks. Skin quality often improves visibly.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 3. Physical Vitality */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-orange-100 rounded-xl text-orange-600"><Activity className="w-6 h-6" /></div>
                            <h2 className="text-xl font-bold text-slate-800">03. Physical Vitality</h2>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-slate-600 leading-relaxed whitespace-pre-line">
                            {getSectionAnalysis(['Exercise', 'Habit', 'Health'])}
                        </div>
                    </section>

                    {/* 4. Risk Factors Badge (조건부 렌더링) */}
                    {riskFactors.length > 0 && (
                        <section className="bg-red-50 rounded-2xl p-6 border border-red-100">
                            <div className="flex items-center gap-2 mb-4 text-red-700 font-bold">
                                <AlertTriangle className="w-5 h-5" />
                                <span>Critical Attention Needed</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                {riskFactors.map((item, idx) => (
                                    <div key={idx} className="bg-white text-red-600 py-3 px-4 rounded-xl text-sm font-medium border border-red-100 shadow-sm flex items-start gap-2">
                                        <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4 text-xs text-red-500 font-medium">
                                These habits contribute most to your aging score. Prioritize improving these first.
                            </p>
                        </section>
                    )}

                    {/* --- Share & Actions (Standardized 4-Button Grid) --- */}
                    <div className="pt-8 border-t border-slate-100 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => {
                                    const testUrl = window.location.origin + window.location.pathname;
                                    if (navigator.share) {
                                        navigator.share({ title: 'Body Age Test', text: 'Check your biological age!', url: testUrl });
                                    } else {
                                        navigator.clipboard.writeText(testUrl);
                                        alert('Test link copied!');
                                    }
                                }}
                                className="w-full py-4 rounded-2xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100 font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-sm"
                            >
                                <Share2 size={20} />
                                Share Test
                            </button>
                            <button
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator.share({ title: 'My Body Age Result', text: `My biological age is ${bodyAge}. Check yours!`, url: window.location.href });
                                    } else {
                                        navigator.clipboard.writeText(window.location.href);
                                        alert('Result link copied!');
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
                                onClick={onRestart}
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
                </div>
            </div>
        </div>
    );
}
