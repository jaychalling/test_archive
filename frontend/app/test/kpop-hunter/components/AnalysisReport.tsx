'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Share2, RefreshCw, Heart, Star, AlertCircle, Sparkles, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QUESTIONS, calculateResult } from '../questions';

// Character Images
import rumiImg from './rumi.webp';
import zoeyImg from './zoey.jpg';
import miraImg from './mira.webp';
import jinuImg from './jinu.jpg';
import derpyImg from './derpy_and_sussie.webp';
import babyImg from './baby_saja.webp';
import mysteryImg from './mystery_saja.webp';
import abbyImg from './abby_saja.jpg';

// Define Character Data Type
interface CharInfo {
    name: string;
    title: string;      // Character Archetype Title
    keywords: string[]; // 3 Key Personality Tags
    desc: string;       // Detailed "You are..." description
    strength: string;   // Main Strength
    weakness: string;   // Weakness/Blind spot
    synergy: { best: string; worst: string }; // Relationship Chemistry
    color: string;
    bg: string;
    image: any;         // Changed to any for Next.js Image object
}

// Character Data: Translated to English with Psychological Nuances
const CHAR_DATA: Record<string, CharInfo> = {
    R: {
        name: "Rumi",
        title: "The Responsible & Passionate Leader",
        keywords: ["#SelfSacrifice", "#MoodMaker", "#IronWill"],
        desc: "Like Rumi, you are the 'eldest sibling' type who thinks, 'I have to carry it all.' You are the sun to those around you, bright and energetic, but inside, you may carry hidden burdens or anxiety. You are a devoted type who willingly sacrifices yourself for the team.",
        strength: "Overwhelming energy and leadership that positively changes the surroundings.",
        weakness: "You might face burnout by bottling things up without showing it.",
        synergy: { best: "Mira (Realistic Advisor)", worst: "Jinu (Emotional Avoider)" },
        color: "text-rose-600",
        bg: "bg-rose-50",
        image: rumiImg
    },
    M: {
        name: "Mira",
        title: "The Rational Perfectionist",
        keywords: ["#LogicKing", "#Tsundere", "#ProblemSolver"],
        desc: "For you, 'comfort' is not empty words but a 'solution'. Like Mira, you excel at analyzing situations and finding the most efficient answers rather than being swayed by emotions. You might be misunderstood as cold, but you actually take care of your people the most surely.",
        strength: "Calmness and analytical skills that do not panic in any crisis.",
        weakness: "Direct speech might unintentionally hurt others.",
        synergy: { best: "Zoey (Emotional Melter)", worst: "Derpy (Unpredictable Chaos)" },
        color: "text-slate-700",
        bg: "bg-slate-100",
        image: miraImg
    },
    Z: {
        name: "Zoey",
        title: "The Lovely Healer with 200% Empathy",
        keywords: ["#Sensitivity", "#SocialButterfly", "#Intuition"],
        desc: "Like Zoey, you are a delicate soul who notices others' emotions like a ghost. You rely on 'gut feeling' rather than logic, and have the ability to soften the atmosphere. People feel comfortable around you and tend to confess their secrets.",
        strength: "Undeniable loveliness and excellent empathy skills.",
        weakness: "Hard to refuse requests, leading to losses or high emotional exhaustion.",
        synergy: { best: "Mira (Realistic Protector)", worst: "Mystery Saja (Hard to read)" },
        color: "text-teal-600",
        bg: "bg-teal-50",
        image: zoeyImg
    },
    J: {
        name: "Jinu",
        title: "The Effort-driven Genius Seeking Recognition",
        keywords: ["#Achievement", "#GlassHeart", "#Diligence"],
        desc: "You look relaxed on the outside, but like a swan, you paddle desperately underwater. Like Jinu, you have a strong desire to prove your worth and tend to be bound by past mistakes or regrets. However, the responsibility to finish what you start is your weapon.",
        strength: "Growth drive that constantly whips oneself towards high goals.",
        weakness: "Self-esteem easily wavers because you care too much about others' eyes.",
        synergy: { best: "Derpy (Clears your mind)", worst: "Rumi (Too bright/burdening)" },
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        image: jinuImg
    },
    D: {
        name: "Derpy & Sussie",
        title: "The Creative Free Spirit",
        keywords: ["#4thDimension", "#IdeaBank", "#MyWay"],
        desc: "You possess a unique charm that refuses to be ordinary. When others see 'A', you think of 'Z'. Like Derpy and Sussie, you may seem distracted, but you are like a Joker who solves problems in extraordinary ways at critical moments.",
        strength: "Flexible thinking and humor that breaks stereotypes.",
        weakness: "Hard to endure systematic repetitive work or being bound by rules.",
        synergy: { best: "Jinu (Diligently takes care)", worst: "Mira (Nags a lot)" },
        color: "text-orange-500",
        bg: "bg-orange-50",
        image: derpyImg
    },
    B: {
        name: "Baby Saja",
        title: "The Strategic & Ambitious Cutie",
        keywords: ["#TwistCharm", "#SocialSkills", "#Pragmatic"],
        desc: "You hide a sharp mind behind an innocent face. Like Baby Saja, you know exactly how to use your charm (cuteness, kindness) to gain benefits. You seem docile on the outside, but you are actually the quickest calculator and have great ambition.",
        strength: "Efficiency to get maximum results with minimum effort.",
        weakness: "You may lose trust if your calculating side is discovered.",
        synergy: { best: "Abby Saja (Does as told)", worst: "Zoey (Notices lies)" },
        color: "text-pink-500",
        bg: "bg-pink-50",
        image: babyImg
    },
    Y: {
        name: "Mystery Saja",
        title: "The Enigmatic Solitary Observer",
        keywords: ["#Mysterious", "#Insight", "#LonerByChoice"],
        desc: "You enjoy reducing words and observing the situation. Like Mystery Saja, you don't easily reveal your inner thoughts, so you often hear that you are 'mysterious'. However, your inner world is deep and firm, so you are not easily swayed by others' evaluations.",
        strength: "Deep insight penetrating the essence and independence.",
        weakness: "Lack of communication often leads to unintentional misunderstandings.",
        synergy: { best: "Abby Saja (Simple comfort)", worst: "Zoey (Keeps talking)" },
        color: "text-violet-600",
        bg: "bg-violet-50",
        image: mysteryImg
    },
    A: {
        name: "Abby Saja",
        title: "The Confident Action-Taker",
        keywords: ["#Confidence", "#Simplicity", "#Loyalty"],
        desc: "You hate complications! You are a doer whose body moves before thinking. Like Abby Saja, you are full of self-love and confidence, so you are not afraid of failure. Sometimes being too simple is a problem, but thanks to that honest and grudge-free personality, you are a character that cannot be hated.",
        strength: "Unstoppable drive that gives courage to those around you.",
        weakness: "Sometimes missing details or making mistakes due to hasty decisions.",
        synergy: { best: "Mystery Saja (Listens silently)", worst: "Mira (Attacks with logic)" },
        color: "text-red-600",
        bg: "bg-red-50",
        image: abbyImg
    }
};

export default function AnalysisReport({ res, onRestart }: { res: string; onRestart: () => void }) {
    // Logic: scores are now calculated via the utility
    const charKey = calculateResult(res);
    const char = CHAR_DATA[charKey] || CHAR_DATA.R;

    const handleShare = async (type: 'test' | 'result') => {
        const url = type === 'test'
            ? window.location.origin + window.location.pathname
            : window.location.href;

        const text = type === 'test'
            ? "Discover your K-Pop Demon Hunter Soul Character!"
            : `I am ${char.name} (${char.title})! Find your soul character.`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'K-Pop Hunter Character Test',
                    text: text,
                    url: url
                });
            } catch (e) {
                console.error('Share failed', e);
            }
        } else {
            await navigator.clipboard.writeText(url);
            alert("Link copied! Share with friends!");
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-6 animate-in fade-in duration-700 font-sans">

            {/* 1. Main Character Card */}
            <div className={`${char.bg} rounded-3xl p-8 text-center mb-8 shadow-lg relative overflow-hidden`}>
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-current to-transparent opacity-20" />

                <div className="inline-block px-3 py-1 bg-white/60 rounded-full text-xs font-bold tracking-widest mb-4 uppercase text-slate-500">
                    Your Soul Character
                </div>

                <h1 className={`text-4xl md:text-5xl font-black mb-2 ${char.color} tracking-tight`}>
                    {char.name}
                </h1>
                <p className="text-lg font-bold text-slate-700 mb-6">{char.title}</p>

                {/* Character Image */}
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full border-4 border-white shadow-md overflow-hidden bg-white group">
                    <Image
                        src={char.image}
                        alt={char.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        placeholder="blur"
                    />
                </div>

                {/* Keywords */}
                <div className="flex justify-center gap-2 mb-2 flex-wrap">
                    {char.keywords.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-white rounded-lg text-sm font-semibold text-slate-600 shadow-sm border border-slate-100">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* 2. Personality Analysis Section */}
            <div className="space-y-6 mb-10">
                <section className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-2 mb-3 font-bold text-slate-900 text-lg">
                        <Sparkles className="w-5 h-5 text-yellow-500" /> Personality Analysis
                    </div>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                        {char.desc}
                    </p>
                </section>

                {/* Strength & Weakness Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <section className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl">
                        <div className="flex items-center gap-2 mb-2 font-bold text-blue-800">
                            <Star className="w-4 h-4 text-blue-600" /> Your Strength
                        </div>
                        <p className="text-slate-600 text-sm">{char.strength}</p>
                    </section>

                    <section className="bg-red-50/50 border border-red-100 p-5 rounded-2xl">
                        <div className="flex items-center gap-2 mb-2 font-bold text-red-800">
                            <AlertCircle className="w-4 h-4 text-red-600" /> Watch Out
                        </div>
                        <p className="text-slate-600 text-sm">{char.weakness}</p>
                    </section>
                </div>

                {/* 3. Chemistry Section */}
                <section className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-4 font-bold text-slate-900">
                        <Heart className="w-4 h-4 text-pink-500" /> Relationship Synergy
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 bg-white p-4 rounded-xl border border-green-100 text-center shadow-sm">
                            <div className="text-xs font-bold text-green-600 mb-1 uppercase">Best Match</div>
                            <div className="text-slate-800 font-medium text-sm">{char.synergy.best}</div>
                        </div>
                        <div className="flex-1 bg-white p-4 rounded-xl border border-red-100 text-center shadow-sm">
                            <div className="text-xs font-bold text-red-500 mb-1 uppercase">Not Good</div>
                            <div className="text-slate-800 font-medium text-sm">{char.synergy.worst}</div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Action Buttons */}
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
    );
}
