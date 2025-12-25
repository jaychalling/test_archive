"use client";

import React from 'react';
import { RefreshCw, AlertTriangle, Activity, Utensils, HeartPulse, Share2, Copy } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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

    // --- Dynamic Text Generation (English) ---
    const handleShare = async (type: 'test' | 'result') => {
        const baseUrl = window.location.origin + window.location.pathname;
        let shareData = {
            title: 'Test Archive Analysis',
            text: '',
            url: ''
        };

        if (type === 'test') {
            shareData.text = 'Take this simple test to check your diabetes risk!';
            shareData.url = baseUrl;
        } else {
            shareData.text = `I scored ${totalScore.toFixed(0)} on Test Archive. Check your risk now!`;
            shareData.url = window.location.href;
        }

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareData.url);
                alert('Link copied to clipboard!');
            }
        } catch (err) {
            console.error('Share failed:', err);
        }
    };

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
        <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

                {/* Header Section */}
                <div className={`${grade.bg} p-8 text-center border-b border-gray-100`}>
                    <h1 className="text-xl font-medium text-gray-500 mb-2">Test Archive Analysis</h1>
                    <div className={`text-4xl md:text-5xl font-bold ${grade.color} mb-4`}>
                        {grade.title}
                    </div>
                    <p className="text-slate-700 text-lg">{grade.summary}</p>
                    <div className="mt-6 inline-block bg-white px-6 py-2 rounded-full shadow-sm text-sm text-slate-500 border border-gray-200">
                        Risk Score: <span className={`font-bold ${grade.color}`}>{totalScore.toFixed(0)}</span> / 140
                    </div>
                </div>

                <div className="p-8 space-y-10">

                    {/* 1. Body Signal Analysis */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-red-100 rounded-lg text-red-600"><HeartPulse /></div>
                            <h2 className="text-2xl font-bold text-slate-800">01. Physical Signals</h2>
                        </div>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50 p-6 rounded-xl">
                            {getSymptomAnalysis()}
                            {symptomScore > 10 ?
                                "💡 [Pro Tip] Your physical symptoms are pronounced. This is likely not just fatigue. We strongly recommend visiting a clinic for an 'HbA1c' test." :
                                "💡 [Pro Tip] Symptoms are often silent in early stages (Pre-diabetes). Regular check-ups are your best defense."}
                        </div>
                    </section>

                    {/* 2. Lifestyle Analysis */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Utensils /></div>
                            <h2 className="text-2xl font-bold text-slate-800">02. Lifestyle & Diet Audit</h2>
                        </div>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50 p-6 rounded-xl">
                            {getLifestyleAnalysis()}
                            <div className="mt-4 p-4 bg-white rounded-lg border border-blue-100 shadow-sm">
                                <h4 className="font-bold text-slate-800 mb-2">🔥 Actionable Solutions</h4>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li><strong>Meal Sequencing:</strong> Eat Fiber (Veg) ➜ Protein ➜ Carbs.</li>
                                    <li><strong>15-Min Walk:</strong> Walking right after meals can lower blood sugar spikes by 30%.</li>
                                    {habitScore > 15 && <li><strong>Intermittent Fasting:</strong> Try to stop eating after 8 PM to give your pancreas a rest.</li>}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 3. Genetics Analysis */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><Activity /></div>
                            <h2 className="text-2xl font-bold text-slate-800">03. Genetics & Risk Factors</h2>
                        </div>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50 p-6 rounded-xl">
                            {getGeneticAnalysis()}
                        </div>
                    </section>

                    {/* 4. Risk Factors Badge */}
                    {riskFactors.length > 0 && (
                        <section className="bg-red-50 rounded-xl p-6 border border-red-100">
                            <div className="flex items-center gap-2 mb-4 text-red-700 font-bold">
                                <AlertTriangle className="w-5 h-5" />
                                <span>Critical Attention Needed</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {riskFactors.map((item, idx) => (
                                    <div key={idx} className="bg-white text-red-600 py-2 px-3 rounded-lg text-sm font-medium border border-red-100 shadow-sm whitespace-normal h-auto text-left break-words">
                                        {item.text}
                                    </div>
                                ))}
                            </div>
                            <p className="mt-3 text-sm text-red-600/80">
                                The items above are the primary contributors to your risk score. Prioritize improving these factors first.
                            </p>
                        </section>
                    )}



                    {/* --- Share & Actions --- */}
                    <div className="pt-8 border-t border-slate-100 space-y-4">
                        {/* Share Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                onClick={() => handleShare('test')}
                                variant="secondary"
                                className="h-14 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100 rounded-xl font-bold gap-2"
                            >
                                <Share2 className="w-4 h-4" /> Share Test
                            </Button>
                            <Button
                                onClick={() => handleShare('result')}
                                className="h-14 bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-bold gap-2"
                            >
                                <Copy className="w-4 h-4" /> Share Result
                            </Button>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            <Link href="/" className="block">
                                <Button variant="outline" className="w-full h-12 rounded-xl border-slate-200">
                                    Home
                                </Button>
                            </Link>
                            <Button
                                onClick={onRestart}
                                variant="outline"
                                className="w-full h-12 rounded-xl border-slate-200 gap-2"
                            >
                                <RefreshCw className="w-4 h-4" /> Retake
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
