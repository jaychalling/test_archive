"use client";

import React from 'react';
import { RefreshCw, AlertTriangle, Activity, Utensils, HeartPulse, Copy, MessageCircle, LayoutGrid, Share2 } from 'lucide-react';
import Link from 'next/link';

interface AnalysisReportProps {
    answers: any[];
    onRestart: () => void;
}

export default function AnalysisReport({ answers, onRestart }: AnalysisReportProps) {
    // 1. Calculate Total Score
    const totalScore = answers.reduce((acc, curr) => acc + curr.weightedScore, 0);

    // 2. Category Scores
    const symptomScore = answers.filter(a => a.type === 'symptom').reduce((acc, curr) => acc + curr.score, 0);
    const habitScore = answers.filter(a => a.type === 'habit').reduce((acc, curr) => acc + curr.score, 0);

    // 3. Filter Risk Factors
    const riskFactors = answers.filter(a => a.score >= 4);

    // Determine Grade
    let grade = { title: '', color: '', bg: '', summary: '' };
    if (totalScore <= 35) {
        grade = {
            title: 'Optimal (Healthy)',
            color: 'text-green-600',
            bg: 'bg-green-50',
            summary: 'Your metabolic health appears stable. Keep up your current healthy habits.'
        };
    } else if (totalScore <= 70) {
        grade = {
            title: 'Warning (Pre-diabetes)',
            color: 'text-yellow-600',
            bg: 'bg-yellow-50',
            summary: 'Signs of insulin resistance detected. Lifestyle changes are highly recommended.'
        };
    } else {
        grade = {
            title: 'Danger (High Risk)',
            color: 'text-red-600',
            bg: 'bg-red-50',
            summary: 'Significant risk markers found. Professional medical consultation is advised.'
        };
    }



    // Section 1: Symptom Analysis
    const getSymptomAnalysis = () => {
        let text = "Based on your reported physical responses, here is the analysis:\n\n";

        // Thirst / Urine (ID 1, 2)
        const thirst = answers.find(a => a.id === 1)?.score || 0;
        const urine = answers.find(a => a.id === 2)?.score || 0;

        if (thirst >= 3 || urine >= 3) {
            text += "⚠️ [Hyperglycemia Warning] You are reporting distinct symptoms of 'Polydipsia (excessive thirst)' and 'Polyuria (frequent urination)'. These are classic signs that your kidneys are trying to flush out excess glucose from your blood. This osmotic effect suggests your blood sugar levels might be exceeding the renal threshold (~180mg/dL). Immediate monitoring is recommended.\n\n";
        } else {
            text += "✅ [Stable Hydration] Fortunately, no significant signs of excessive thirst or urination were reported. This suggests your blood glucose is likely being maintained within a range that doesn't trigger osmotic diuresis. However, the absence of symptoms does not guarantee perfect health, so continue to monitor.\n\n";
        }

        // Weight Loss / Numbness (ID 4, 9)
        const weightLoss = answers.find(a => a.id === 4)?.score || 0;
        const numbness = answers.find(a => a.id === 9)?.score || 0;

        if (weightLoss >= 4) {
            text += "⚠️ [Metabolic Alert] Unexplained weight loss is a critical sign. It implies that your body cannot utilize glucose effectively due to a lack of insulin, forcing it to burn muscle and fat for energy instead. This is a hallmark of significant insulin deficiency.\n\n";
        }
        if (numbness >= 3) {
            text += "⚠️ [Neuropathy Risk] Frequent tingling or numbness in extremities can be an early sign of diabetic neuropathy, caused by long-term high blood sugar affecting nerve fibers.\n\n";
        }

        return text;
    };

    // Section 2: Lifestyle & Habits
    const getLifestyleAnalysis = () => {
        let text = "Here is an audit of your dietary and lifestyle habits:\n\n";

        // Carbs (ID 6)
        const carb = answers.find(a => a.id === 6)?.score || 0;
        if (carb >= 4) {
            text += "🍞 [Carbohydrate Overload] Your intake of refined carbohydrates (white rice, bread, pasta) is quite high. These foods cause rapid 'Blood Sugar Spikes' within 30 minutes of eating. Repeated spikes exhaust the beta cells in your pancreas, accelerating insulin resistance.\n\n";
        } else {
            text += "🥗 [Dietary Balance] You seem to be managing your refined carbohydrate intake well. Keeping 'Low GI' foods as staples is the best strategy to protect your pancreas.\n\n";
        }

        // Late Night / Alcohol (ID 16, 17)
        const nightFood = answers.find(a => a.id === 16)?.score || 0;
        if (nightFood >= 3) {
            text += "🌙 [Late-Night Eating] Consuming food late at night significantly disrupts metabolic rhythm. Insulin sensitivity drops at night, meaning calories consumed then are more likely to be stored as visceral fat, which releases inflammatory markers that worsen diabetes risk.\n\n";
        }

        return text;
    };

    // Section 3: Genetics & Environment
    const getGeneticAnalysis = () => {
        let text = "Analysis of your genetic background and environmental stress:\n\n";

        const familyHistory = answers.find(a => a.id === 5)?.score || 0;
        if (familyHistory >= 3) {
            text += "🧬 [Genetic Predisposition] A family history of diabetes is a strong risk factor. If one parent has diabetes, the risk increases by 15-20%; if both, it jumps to 30-50%. Genetics loads the gun, but lifestyle pulls the trigger. You need stricter management than the average person.\n\n";
        } else {
            text += "🛡️ [Environmental Focus] While you reported no strong family history, remember that Type 2 diabetes is largely a 'lifestyle disease'. Environmental factors often outweigh genetics.\n\n";
        }

        return text;
    };


    return (
        <div className="max-w-2xl mx-auto py-12 px-6 animate-in fade-in duration-700 font-sans">

            {/* Header Section */}
            <div className={`${grade.bg} rounded-3xl p-8 text-center mb-8 shadow-lg relative overflow-hidden`}>
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-current to-transparent opacity-20" />

                <div className="inline-block px-3 py-1 bg-white/60 rounded-full text-xs font-bold tracking-widest mb-4 uppercase text-slate-500">
                    Health Assessment Result
                </div>

                <h1 className={`text-4xl md:text-5xl font-black mb-2 ${grade.color} tracking-tight`}>
                    {grade.title}
                </h1>
                <p className="text-lg font-bold text-slate-700 mb-4">{grade.summary}</p>

                <div className="inline-block bg-white px-6 py-2 rounded-full shadow-sm text-sm text-slate-500 border border-slate-100">
                    Risk Score: <span className={`font-bold ${grade.color}`}>{totalScore.toFixed(0)}</span> / 140
                </div>
            </div>

            {/* Analysis Sections */}
            <div className="space-y-6 mb-10">

                {/* 1. Body Signal Analysis */}
                <section className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-2 mb-3 font-bold text-slate-900 text-lg">
                        <HeartPulse className="w-5 h-5 text-red-500" /> Physical Signals
                    </div>
                    <div className="text-slate-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                        {getSymptomAnalysis()}
                        {symptomScore > 10 ?
                            "💡 [Pro Tip] Your physical symptoms are pronounced. This is likely not just fatigue. We strongly recommend visiting a clinic for an 'HbA1c' test." :
                            "💡 [Pro Tip] Symptoms are often silent in early stages (Pre-diabetes). Regular check-ups are your best defense."}
                    </div>
                </section>

                {/* 2. Lifestyle Analysis */}
                <section className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-2 mb-3 font-bold text-slate-900 text-lg">
                        <Utensils className="w-5 h-5 text-blue-500" /> Lifestyle & Diet Audit
                    </div>
                    <div className="text-slate-600 leading-relaxed text-sm md:text-base whitespace-pre-line mb-4">
                        {getLifestyleAnalysis()}
                    </div>
                    <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                        <h4 className="font-bold text-slate-800 mb-2 text-sm">Actionable Solutions</h4>
                        <ul className="list-disc list-inside space-y-2 text-sm text-slate-600">
                            <li><strong>Meal Sequencing:</strong> Eat Fiber (Veg) → Protein → Carbs.</li>
                            <li><strong>15-Min Walk:</strong> Walking right after meals can lower blood sugar spikes by 30%.</li>
                            {habitScore > 15 && <li><strong>Intermittent Fasting:</strong> Try to stop eating after 8 PM to give your pancreas a rest.</li>}
                        </ul>
                    </div>
                </section>

                {/* 3. Genetics Analysis */}
                <section className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-2 mb-3 font-bold text-slate-900 text-lg">
                        <Activity className="w-5 h-5 text-purple-500" /> Genetics & Risk Factors
                    </div>
                    <div className="text-slate-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                        {getGeneticAnalysis()}
                    </div>
                </section>

                {/* 4. Risk Factors Badge */}
                {riskFactors.length > 0 && (
                    <section className="bg-red-50/50 border border-red-100 p-5 rounded-2xl">
                        <div className="flex items-center gap-2 mb-2 font-bold text-red-800">
                            <AlertTriangle className="w-4 h-4 text-red-600" /> Critical Attention Needed
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {riskFactors.map((item, idx) => (
                                <div key={idx} className="bg-white text-red-600 py-2 px-3 rounded-lg text-sm font-medium border border-red-100 shadow-sm">
                                    {item.text}
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-red-600/80">
                            Prioritize improving these factors first.
                        </p>
                    </section>
                )}
            </div>

            {/* --- Share & Actions (Standardized 4-Button Grid) --- */}
            <div className="pt-8 border-t border-slate-100 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => {
                            const testUrl = window.location.origin + window.location.pathname;
                            if (navigator.share) {
                                navigator.share({ title: 'Diabetes Risk Test', text: 'Analyze your metabolic health.', url: testUrl });
                            } else {
                                navigator.clipboard.writeText(testUrl);
                                alert('Test link copied!');
                            }
                        }}
                        className="w-full py-4 rounded-2xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-100 font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                        <Share2 size={20} />
                        Share Test
                    </button>
                    <button
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({ title: 'My Diabetes Test Result', text: `My risk score is ${totalScore.toFixed(0)}. Check yours!`, url: window.location.href });
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
    );
}
