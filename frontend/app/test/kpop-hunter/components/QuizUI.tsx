'use client';

import React, { useState } from 'react';
import { ChevronRight, BrainCircuit, Activity } from 'lucide-react';

interface Option {
    label: string;
    weights: Record<string, number>;
}

interface Question {
    id: number;
    text: string;
    options: Option[];
}

// 8 Characters Code: 
// R: Rumi, Z: Zoey, M: Mira, J: Jinu, D: Derpy & Sussie, B: Baby Saja, Y: Mystery Saja, A: Abby Saja

export const QUESTIONS: Question[] = [
    {
        id: 1, text: "When you arrive at the practice room first, what do you do?",
        options: [
            { label: "Check my condition in the mirror and take a selfie.", weights: { R: 3, B: 1 } },
            { label: "Turn on the speakers and repeat the song to practice.", weights: { M: 3, J: 1 } },
            { label: "Clean the floor or tidy up to make a pleasant environment.", weights: { Z: 3, A: 1 } },
            { label: "Do unique stretches or act goofy in the corner.", weights: { D: 3, Y: 1 } }
        ]
    },
    {
        id: 2, text: "If you are so nervous before your debut that your hands shake, what's your solution?",
        options: [
            { label: "Ask members for a hug and seek their support.", weights: { B: 3, R: 1 } },
            { label: "Take deep breaths and review the practice notes.", weights: { J: 3, M: 1 } },
            { label: "Look at the stage lights and imagine dominating the audience.", weights: { R: 3, A: 1 } },
            { label: "Stare blankly into space to control my mind.", weights: { Y: 3, D: 1 } }
        ]
    },
    {
        id: 3, text: "When the choreographer points out your mistakes, how do you react?",
        options: [
            { label: "Acknowledge it immediately and practice until it's perfect.", weights: { M: 3, J: 1 } },
            { label: "Ask for the reason and find an efficient way to fix it.", weights: { J: 3, Z: 1 } },
            { label: "Feel slightly defensive but vow to prove myself with skill.", weights: { A: 3, R: 1 } },
            { label: "Turn the embarrassment into laughter to brighten the mood.", weights: { D: 3, B: 1 } }
        ]
    },
    {
        id: 4, text: "What if you are the designated cleaner but no one helps you?",
        options: [
            { label: "Clean it all alone while grumbling like a 'Tsundere'.", weights: { Z: 3, J: 1 } },
            { label: "Call everyone out and lead them to clean up.", weights: { A: 3, R: 1 } },
            { label: "Whimper or stare intently until they help.", weights: { B: 3, D: 1 } },
            { label: "Don't care and just tidily organize my own space.", weights: { Y: 3, M: 1 } }
        ]
    },
    {
        id: 5, text: "Suddenly, a low-level demon appears! What is your first reaction?",
        options: [
            { label: "Instinctively step forward and hide my friends behind me.", weights: { A: 3, J: 1 } },
            { label: "Quickly scan for the demon's type and weaknesses.", weights: { M: 3, Y: 1 } },
            { label: "Smile brightly and pull out something that could be a weapon.", weights: { R: 3, D: 1 } },
            { label: "Calmly look around and secure an escape route first.", weights: { J: 3, Z: 1 } }
        ]
    },
    {
        id: 6, text: "What if you witness a comrade collapsing during battle?",
        options: [
            { label: "Stay by their side while teary-eyed and help them heal.", weights: { B: 3, J: 1 } },
            { label: "Quickly approach them as if indifferent and give first aid.", weights: { Z: 3, M: 1 } },
            { label: "Block the enemy's attack with my whole body to protect them.", weights: { J: 3, A: 1 } },
            { label: "Become enraged and launch an overwhelming attack on the enemy.", weights: { A: 3, R: 1 } }
        ]
    },
    {
        id: 7, text: "What kind of combat style suits you best?",
        options: [
            { label: "Suppressing enemies with flashy and hot firepower.", weights: { R: 3, A: 1 } },
            { label: "Precisely striking weaknesses from an unseen place.", weights: { M: 3, Y: 1 } },
            { label: "Confusing enemies with unpredictable movements.", weights: { Y: 3, D: 1 } },
            { label: "Linked attacks through perfect harmony with comrades.", weights: { D: 3, R: 1 } }
        ]
    },
    {
        id: 8, text: "How do you behave when a fan's gift is not your style?",
        options: [
            { label: "Grateful for the fan's heart, take a photo and post it.", weights: { R: 3, B: 1 } },
            { label: "Say thank you briefly but put it in the most visible spot.", weights: { Z: 3, A: 1 } },
            { label: "Politely thank them and keep it carefully.", weights: { J: 3, M: 1 } },
            { label: "So happy that I play with that gift all day long.", weights: { B: 3, D: 1 } }
        ]
    },
    {
        id: 9, text: "What if a groundless malicious post about you is uploaded?",
        options: [
            { label: "Ignore it and immerse myself more in practice.", weights: { M: 3, Z: 1 } },
            { label: "Pretend not to care but get hurt deep inside.", weights: { Y: 3, B: 1 } },
            { label: "Coolly brush it off with a witty meme or comment.", weights: { D: 3, R: 1 } },
            { label: "Angry, but heal my heart by reading fans' support comments.", weights: { A: 3, J: 1 } }
        ]
    },
    {
        id: 10, text: "What is the perfect way to spend your time alone on a day off?",
        options: [
            { label: "Enjoying contemplation in a quiet forest or place.", weights: { Y: 3, M: 1 } },
            { label: "Rolling around in bed, sleeping or eating sweets.", weights: { B: 3, D: 1 } },
            { label: "Spending time cooking or fixing things yourself.", weights: { Z: 3, J: 1 } },
            { label: "Playing games all day or binge-watching anime.", weights: { D: 3, R: 1 } }
        ]
    },
    {
        id: 11, text: "What is your role when a conflict of opinion occurs in the team?",
        options: [
            { label: "Listen silently to everyone and mediate in the middle.", weights: { J: 3, B: 1 } },
            { label: "Brighten the mood and encourage reconciliation.", weights: { R: 3, D: 1 } },
            { label: "Logically suggest the most efficient solution.", weights: { M: 3, Z: 1 } },
            { label: "Consistently assert my opinion and exercise leadership.", weights: { A: 3, Y: 1 } }
        ]
    },
    {
        id: 12, text: "What are the conditions for a 'true hero' in your opinion?",
        options: [
            { label: "Hot courage to sacrifice for comrades.", weights: { A: 3, R: 1 } },
            { label: "Solid trust shown through actions rather than words.", weights: { J: 3, Z: 1 } },
            { label: "Positivity and hope that are not lost in any situation.", weights: { R: 3, B: 1 } },
            { label: "Deep wisdom and mystery that sees through the world.", weights: { Y: 3, M: 1 } }
        ]
    },
    {
        id: 13, text: "When the stage costume is so flashy that it's embarrassing?",
        options: [
            { label: "Love it! I am the main character of this area!", weights: { D: 3, R: 1 } },
            { label: "Make a more charismatic expression so as not to be overwhelmed.", weights: { M: 3, A: 1 } },
            { label: "A bit shy but relieved if members say it's pretty.", weights: { Z: 3, J: 1 } },
            { label: "Keep fiddling with it because it's unfamiliar.", weights: { B: 3, Y: 1 } }
        ]
    },
    {
        id: 14, text: "How do you want to use the reward after defeating a demon?",
        options: [
            { label: "Host a meat party for members who have worked hard.", weights: { Z: 3, A: 1 } },
            { label: "Upgrade the headquarters' equipment for the next battle.", weights: { J: 3, M: 1 } },
            { label: "Buy a cute accessory that I wanted to have.", weights: { B: 3, D: 1 } },
            { label: "Donate it to those in need.", weights: { R: 3, Y: 1 } }
        ]
    },
    {
        id: 15, text: "If you appear on a variety show, what fixed role do you want?",
        options: [
            { label: "An 'unpredictable variety genius'.", weights: { D: 3, Y: 1 } },
            { label: "A 'passionate person' with tireless energy.", weights: { R: 3, A: 1 } },
            { label: "A 'mysterious person' with an unknowable charm.", weights: { Y: 3, M: 1 } },
            { label: "A 'sincere worker' who does anything silently.", weights: { J: 3, Z: 1 } }
        ]
    },
    {
        id: 16, text: "What if someone accidentally ruins your precious merch?",
        options: [
            { label: "Get teary-eyed because it's so upsetting.", weights: { B: 3, D: 1 } },
            { label: "Get very angry and demand responsible compensation.", weights: { A: 3, M: 1 } },
            { label: "Pretend to be fine but feel bad all day.", weights: { Z: 3, J: 1 } },
            { label: "Calmly find a way to repair it first.", weights: { M: 3, J: 1 } }
        ]
    },
    {
        id: 17, text: "If a forbidden room in headquarters is slightly open?",
        options: [
            { label: "Never enter and quietly report to headquarters.", weights: { Y: 3, J: 1 } },
            { label: "Can't resist curiosity and sneak a peek inside.", weights: { D: 3, B: 1 } },
            { label: "Tell members and suggest checking it together.", weights: { J: 3, R: 1 } },
            { label: "Ignore it if it's not my business and pass by.", weights: { M: 3, Z: 1 } }
        ]
    },
    {
        id: 18, text: "What is the situation you fear the most?",
        options: [
            { label: "Comrades being put in danger because of me.", weights: { B: 3, J: 1 } },
            { label: "Not being noticed by anyone on stage.", weights: { R: 3, D: 1 } },
            { label: "My pride collapsing and showing a weak side.", weights: { A: 3, M: 1 } },
            { label: "Staying in place without any progress.", weights: { M: 3, Z: 1 } }
        ]
    },
    {
        id: 19, text: "When peace comes after all the fighting, what do you want to do?",
        options: [
            { label: "Travel with members to meet fans around the world.", weights: { R: 3, D: 1 } },
            { label: "Live in seclusion where no one knows me.", weights: { Y: 3, M: 1 } },
            { label: "Become an instructor to train junior hunters.", weights: { J: 3, A: 1 } },
            { label: "Open a normal cafe and grill meat every day.", weights: { Z: 3, B: 1 } }
        ]
    },
    {
        id: 20, text: "How would you describe your charm in one word?",
        options: [
            { label: "Unquenchable Passion.", weights: { R: 4 } },
            { label: "Flawless Perfection.", weights: { M: 4 } },
            { label: "Unexpected Warmth.", weights: { Z: 4 } },
            { label: "Unpredictable Uniqueness.", weights: { D: 4 } }
        ]
    }
];

export default function QuizUI({ onFinish }: { onFinish: (res: string) => void }) {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // 진행 상태 안전 장치 (transition lock)
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleAnswer = (idx: number) => {
        // 더블 클릭 방지 및 분석 중 클릭 방지
        if (isTransitioning || isAnalyzing) return;

        setIsTransitioning(true);
        const newAnswers = [...answers, idx];
        setAnswers(newAnswers);

        // 약간의 딜레이 후 다음 문제로 넘어감 (UX)
        setTimeout(() => {
            if (step < QUESTIONS.length - 1) {
                setStep(step + 1);
                window.scrollTo(0, 0);
                setIsTransitioning(false);
            } else {
                // MANDATORY: 3-second Analyzing Animation
                setIsAnalyzing(true);
                setTimeout(() => {
                    onFinish(newAnswers.join(''));
                }, 3000);
            }
        }, 250); // 짧은 딜레이로 터치 반응감 제공
    };

    if (isAnalyzing) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6 animate-in fade-in duration-700">
                <div className="relative w-24 h-24 mb-8">
                    <div className="absolute inset-0 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                        <BrainCircuit className="w-10 h-10 text-blue-600" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-slate-900">Analyzing Your Soul Frequency...</h2>
                <p className="text-slate-500">Synchronizing with K-Pop Hunter Database.</p>
                <div className="mt-6 flex gap-2 justify-center"><Activity className="animate-bounce text-blue-400" /></div>
            </div>
        );
    }

    const currentQ = QUESTIONS[step];
    // 방어 코드
    if (!currentQ) return <div className="p-10 text-center">Loading Question...</div>;

    return (
        <div className="max-w-md mx-auto px-6 py-12 min-h-[80vh]">
            <div className="mb-6">
                <h1 className="text-xl font-bold text-slate-900">K-Pop Demon Hunter Character Test</h1>
            </div>

            <div className="mb-8">
                <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
                    <span>Question {step + 1}</span>
                    <span>{Math.round(((step + 1) / QUESTIONS.length) * 100)}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 transition-all duration-300 ease-out" style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} />
                </div>
            </div>

            <div className="animate-in slide-in-from-right-4 duration-300 key={step}"> {/* 문제 변경 시 애니메이션 효과 */}
                <h2 className="text-2xl font-bold text-slate-900 mb-8 leading-tight">{currentQ.text}</h2>
                <div className="grid gap-3">
                    {currentQ.options.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => handleAnswer(i)}
                            disabled={isTransitioning}
                            className="w-full p-5 text-left border border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 active:scale-[0.98] transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-slate-700 group-hover:text-blue-900">{opt.label}</span>
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 text-slate-500 text-sm">
                <h3 className="font-bold text-slate-700 mb-2">About this Test</h3>
                <p>This psychological test is designed based on Jungian archetypes reinterpreted through K-Pop group dynamics. It analyzes your subconscious behavioral patterns to determine which Demon Hunter character best represents your soul.</p>
            </div>
        </div>
    );
}
