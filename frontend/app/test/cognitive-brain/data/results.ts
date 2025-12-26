// frontend/app/test/cognitive-brain/data/results.ts

export type ScoreLevel = 'High' | 'Mid' | 'Low';

export interface ResultProfile {
    title: string;       // 결과 타이틀 (예: 언어적 전략가)
    description: string; // 상세 분석 내용
    strengths: string[]; // 강점 3가지
    weaknesses: string[];// 약점 3가지
    advice: string;      // 구체적인 행동 지침
}

/**
 * 프로필 키 생성기
 * 순서: 전두엽(Frontal) - 측두엽(Temporal) - 두정엽(Parietal)
 * 예: "Low-High-Mid"
 */
export const getProfileKey = (f: ScoreLevel, t: ScoreLevel, p: ScoreLevel) => `${f}-${t}-${p}`;

export const RESULT_PROFILES: Record<string, ResultProfile> = {
    // =================================================================
    // 1. 최상위권 유형 (All High)
    // =================================================================
    "High-High-High": {
        title: "The Cognitive Athlete",
        description: "Your brain is functioning at peak performance across all major domains. Your executive control, memory retention, and spatial reasoning are all synchronized efficiently. You likely find it easy to switch tasks, learn new skills, and navigate complex environments.",
        strengths: ["Superior executive function", "Rapid learning & retention", "Complex problem solving"],
        weaknesses: ["Risk of boredom with simple tasks", "Overconfidence"],
        advice: "To maintain this edge, challenge yourself with high-complexity activities like learning a new language or musical instrument. Your brain needs novelty to stay sharp."
    },

    // =================================================================
    // 2. 위험/피로 유형 (All Low or Low dominant)
    // =================================================================
    "Low-Low-Low": {
        title: "Global Cognitive Fatigue",
        description: "Your results indicate significant strain across all cognitive domains. This 'brain fog' pattern is often seen during periods of high stress, sleep deprivation, or burnout. It affects your ability to focus, remember details, and process visual information simultaneously.",
        strengths: ["Resilience (completing the test)", "Self-awareness of fatigue"],
        weaknesses: ["Sustained attention", "Short-term memory", "Processing speed"],
        advice: "Immediate cognitive rest is recommended. Prioritize 7-8 hours of sleep and hydration. If these symptoms persist in daily life, consider consulting a specialist to rule out underlying metabolic issues."
    },
    "Low-Low-Mid": {
        title: "Mental Exhaustion",
        description: "Your executive and memory centers are struggling, though you retain some spatial awareness. You may feel like you're 'going through the motions' without truly processing information.",
        strengths: ["Basic spatial orientation"],
        weaknesses: ["Planning & Organizing", "Recall"],
        advice: "Focus on doing one thing at a time (Monotasking). Your brain is currently overloaded. Use external tools like alarms and notes to offload memory burdens."
    },

    // =================================================================
    // 3. 전두엽 약세 (집행기능/집중력 저하 - ADHD 유사 패턴)
    // =================================================================
    "Low-High-High": {
        title: "The Distracted Genius",
        description: "You have excellent memory and spatial skills, but your 'Brain CEO' (Frontal Lobe) is struggling to direct them. You are likely very smart but prone to procrastination, distraction, or impulsive mistakes.",
        strengths: ["Strong memory retention", "Visualizing complex concepts", "Creativity"],
        weaknesses: ["Impulse control", "Time management", "Starting boring tasks"],
        advice: "Your hardware is great, but the driver is distracted. Use the 'Pomodoro Technique' (25min work, 5min break) to artificially create structure for your frontal lobe."
    },
    "Low-High-Mid": {
        title: "The Impulsive Archivist",
        description: "Your memory (Temporal) is your superpower, but you struggle to organize that information effectively (Frontal). You might remember obscure facts perfectly but forget where you put your keys or what you planned to do today.",
        strengths: ["Fact retention", "Vocabulary"],
        weaknesses: ["Prioritization", "Focus control", "Organization"],
        advice: "Externalize your executive functions. Don't rely on willpower; use checklists, calendars, and reminders. Create a fixed routine to minimize decision fatigue."
    },

    // =================================================================
    // 4. 측두엽 약세 (기억력/언어 저하)
    // =================================================================
    "High-Low-High": {
        title: "The Sharp Forgetter",
        description: "Your logic and spatial skills are razor-sharp, but your memory bank is failing to store or retrieve information. You might solve complex problems easily but struggle to recall names, dates, or words ('Tip of the tongue').",
        strengths: ["Logical deduction", "Spatial navigation", "Focus"],
        weaknesses: ["Verbal memory", "Name recall", "Learning new terms"],
        advice: "This pattern suggests a specific bottleneck in the hippocampus. Practice 'Spaced Repetition' learning. When meeting people, repeat their name 3 times mentally to enforce encoding."
    },
    "Mid-Low-Mid": {
        title: "Memory Gap Profile",
        description: "Your general functioning is average, but your memory score is disproportionately low. You may find yourself frequently asking 'What was I doing?' or relying heavily on others to remember details.",
        strengths: ["General adaptability", "Visual processing"],
        weaknesses: ["Short-term retention", "Word finding"],
        advice: "Engage in aerobic exercise (running, swimming), which is proven to stimulate BDNF (brain fertilizer) specifically in the hippocampus region."
    },

    // =================================================================
    // 5. 두정엽 약세 (시공간/길찾기 저하)
    // =================================================================
    "High-High-Low": {
        title: "The Verbal Commander",
        description: "You are articulate, focused, and have a great memory, but you likely struggle with maps, assembling furniture, or visualizing 3D objects. You rely on words and logic rather than mental images.",
        strengths: ["Verbal communication", "Planning", "Memory"],
        weaknesses: ["Navigation (getting lost)", "Mental rotation", "Hand-eye coordination"],
        advice: "Your brain prefers text over images. When learning, rewrite diagrams into words. To improve, try playing Tetris, Tangram puzzles, or using physical maps instead of GPS."
    },
    "Mid-Mid-Low": {
        title: "The Text-Based Thinker",
        description: "You function well in daily life but have a specific blind spot for spatial tasks. You probably prefer written instructions over diagrams and may feel uncomfortable in new physical environments.",
        strengths: ["Routine execution", "Verbal understanding"],
        weaknesses: ["Estimating distances", "Parking/Driving spatial awareness"],
        advice: "Challenge your parietal lobe by drawing. Try to sketch a map of your neighborhood from memory, then compare it to reality."
    },

    // =================================================================
    // 6. 평균/혼합 유형 (Mixed/Average)
    // =================================================================
    "Mid-Mid-Mid": {
        title: "Balanced Profile",
        description: "Your cognitive profile is well-rounded with no severe deficits. You are functioning adequately in daily life, but there is room for optimization to reach 'High' performance.",
        strengths: ["Stability", "Versatility"],
        weaknesses: ["Lack of a dominant 'superpower'"],
        advice: "Pick one domain to train intensively for 4 weeks. High-intensity interval training (HIIT) combined with cognitive tasks has been shown to boost overall brain plasticity."
    },
    "Mid-High-Mid": {
        title: "The Knowledge Keeper",
        description: "Your memory is your strongest asset, supported by average focus and spatial skills. You are likely a good learner who retains information well once you pay attention to it.",
        strengths: ["Long-term memory", "Learning capacity"],
        weaknesses: ["Processing speed under pressure"],
        advice: "Leverage your memory by teaching others what you know. The act of explaining reinforces your neural pathways and can boost your other domains."
    },

    // Default Fallback (for any missing combinations)
    "default": {
        title: "Mixed Cognitive Profile",
        description: "Your scores show a varied pattern across different brain regions. Some areas are stronger than others, suggesting a unique cognitive fingerprint.",
        strengths: ["Varied based on specific scores"],
        weaknesses: ["Varied based on specific scores"],
        advice: "Review your individual lobe scores above. Maintain a brain-healthy lifestyle with regular exercise, a Mediterranean diet, and consistent sleep patterns."
    }
};
