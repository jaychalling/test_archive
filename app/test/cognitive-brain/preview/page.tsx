"use client";
import React from 'react';
import AnalysisReport from '../components/AnalysisReport';
import { ScoreLevel } from '../data/results';

export default function PreviewPage() {
    // low-high-high -> "The Distracted Genius"
    const mockScores = {
        frontal: 'Low' as ScoreLevel,
        temporal: 'High' as ScoreLevel,
        parietal: 'High' as ScoreLevel,
        brainAge: 42,
        rawScores: { frontal: 35, temporal: 92, parietal: 88 }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <h1 className="text-center text-2xl font-bold mb-5 text-gray-400">Component Preview Mode</h1>
            <AnalysisReport scores={mockScores} onRetake={() => console.log("Retake clicked")} />
        </div>
    );
}
