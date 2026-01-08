// IMPORTANT: This test measures personality tendencies, NOT clinical anxiety disorders
// Use softening language and avoid medical diagnosis terminology

export interface AnxietyCalmQuestion {
  id: number;
  text: string;
  // Higher score = more calm/relaxed tendency
  // Lower score = more anxious/worried tendency
  scoreDirection: "calm" | "anxious";
}

// 5-point scale options
export type AnswerValue = 1 | 2 | 3 | 4 | 5;

export const answerOptions: { value: AnswerValue; label: string }[] = [
  { value: 1, label: "Never" },
  { value: 2, label: "Rarely" },
  { value: 3, label: "Sometimes" },
  { value: 4, label: "Often" },
  { value: 5, label: "Very Often" },
];

export const anxietyCalmQuestions: AnxietyCalmQuestion[] = [
  // === Worry & Rumination Tendencies (6 questions) ===
  {
    id: 1,
    text: "I find myself worrying about things that haven't happened yet.",
    scoreDirection: "anxious",
  },
  {
    id: 2,
    text: "I replay conversations or events in my head, analyzing what I said or did.",
    scoreDirection: "anxious",
  },
  {
    id: 3,
    text: "When faced with uncertainty, I tend to imagine the worst-case scenario.",
    scoreDirection: "anxious",
  },
  {
    id: 4,
    text: "I can easily let go of things I cannot control.",
    scoreDirection: "calm",
  },
  {
    id: 5,
    text: "My mind often races with multiple thoughts at once, making it hard to focus.",
    scoreDirection: "anxious",
  },
  {
    id: 6,
    text: "I tend to stay present and not dwell on past mistakes or future worries.",
    scoreDirection: "calm",
  },

  // === Physical Stress Responses (5 questions) ===
  {
    id: 7,
    text: "I notice physical tension in my body (tight shoulders, clenched jaw, etc.) during stressful times.",
    scoreDirection: "anxious",
  },
  {
    id: 8,
    text: "My heart rate increases or my breathing becomes shallow when I'm under pressure.",
    scoreDirection: "anxious",
  },
  {
    id: 9,
    text: "I have trouble falling asleep because my mind won't stop thinking.",
    scoreDirection: "anxious",
  },
  {
    id: 10,
    text: "I feel physically relaxed and at ease most of the time.",
    scoreDirection: "calm",
  },
  {
    id: 11,
    text: "I experience stomach discomfort or headaches when stressed.",
    scoreDirection: "anxious",
  },

  // === Decision-Making & Perfectionism (5 questions) ===
  {
    id: 12,
    text: "I struggle to make decisions because I worry about making the wrong choice.",
    scoreDirection: "anxious",
  },
  {
    id: 13,
    text: "I set very high standards for myself and feel distressed when I don't meet them.",
    scoreDirection: "anxious",
  },
  {
    id: 14,
    text: "I can make decisions relatively easily without excessive second-guessing.",
    scoreDirection: "calm",
  },
  {
    id: 15,
    text: "I tend to procrastinate because I'm worried about not doing things perfectly.",
    scoreDirection: "anxious",
  },
  {
    id: 16,
    text: "I'm comfortable with 'good enough' rather than needing everything to be perfect.",
    scoreDirection: "calm",
  },

  // === Social Anxiety Tendencies (5 questions) ===
  {
    id: 17,
    text: "I worry about what others think of me in social situations.",
    scoreDirection: "anxious",
  },
  {
    id: 18,
    text: "I feel nervous or uncomfortable when meeting new people.",
    scoreDirection: "anxious",
  },
  {
    id: 19,
    text: "I feel at ease in most social settings and enjoy meeting new people.",
    scoreDirection: "calm",
  },
  {
    id: 20,
    text: "I avoid speaking up in groups because I'm concerned about how I'll be perceived.",
    scoreDirection: "anxious",
  },
  {
    id: 21,
    text: "I can express myself confidently without excessive worry about judgment.",
    scoreDirection: "calm",
  },

  // === Emotional Regulation (5 questions) ===
  {
    id: 22,
    text: "Small setbacks or changes in plans can significantly affect my mood.",
    scoreDirection: "anxious",
  },
  {
    id: 23,
    text: "I feel overwhelmed easily when multiple things demand my attention.",
    scoreDirection: "anxious",
  },
  {
    id: 24,
    text: "I generally stay calm and composed, even when things don't go as planned.",
    scoreDirection: "calm",
  },
  {
    id: 25,
    text: "I adapt easily to unexpected changes or challenges.",
    scoreDirection: "calm",
  },
  {
    id: 26,
    text: "I often feel restless or on edge without a specific reason.",
    scoreDirection: "anxious",
  },

  // === Coping & Recovery (4 questions) ===
  {
    id: 27,
    text: "After a stressful event, I bounce back to feeling calm relatively quickly.",
    scoreDirection: "calm",
  },
  {
    id: 28,
    text: "I have effective strategies to manage stress when it arises.",
    scoreDirection: "calm",
  },
  {
    id: 29,
    text: "Stressful situations stay with me for a long time, affecting my mood for days.",
    scoreDirection: "anxious",
  },
  {
    id: 30,
    text: "I find it easy to relax and unwind when I have free time.",
    scoreDirection: "calm",
  },
];

export interface AnxietyCalmResult {
  totalScore: number;
  percentage: number;
  tendency: "Very Calm" | "Calm" | "Balanced" | "Anxious" | "Very Anxious";
}

export type AnxietyTendency = "Very Calm" | "Calm" | "Balanced" | "Anxious" | "Very Anxious";

interface TendencyDescription {
  label: string;
  shortDescription: string;
  meaning: string[];
  traits: string[];
  advice: string[];
  faqs: { question: string; answer: string }[];
}

export const tendencyDescriptions: Record<AnxietyTendency, TendencyDescription> = {
  "Very Calm": {
    label: "Very Calm Temperament",
    shortDescription: "You tend to remain relaxed and composed in most situations.",
    meaning: [
      "Your responses suggest you have a naturally calm and resilient temperament. You typically don't get rattled by uncertainty, can let go of worries easily, and tend to stay present rather than ruminating on the past or future. This calm approach often helps you navigate challenges with clarity and composure.",
      "People with very calm temperaments often serve as stabilizing forces in stressful situations. They tend to make decisions without excessive worry, adapt well to change, and recover quickly from setbacks. This doesn't mean you never experience stress—just that you typically manage it well and return to baseline quickly.",
    ],
    traits: [
      "Generally relaxed and at ease in daily life",
      "Don't tend to overthink or ruminate excessively",
      "Comfortable with uncertainty and change",
      "Can make decisions without excessive second-guessing",
      "Physical body stays relatively relaxed, even under pressure",
      "Sleep typically isn't disrupted by racing thoughts",
      "Bounce back quickly from stressful events",
      "Able to stay present rather than worrying about the future",
    ],
    advice: [
      "Your calm nature is a strength—continue nurturing it through practices that support well-being",
      "Be aware that your calm approach might make it harder to empathize with more anxious individuals—practice patience",
      "Don't dismiss concerns just because they don't stress you personally—others may need different processing time",
      "Maintain healthy habits (sleep, exercise, social connection) that support your natural resilience",
      "Consider whether you might sometimes under-react to situations that warrant concern or preparation",
    ],
    faqs: [
      {
        question: "Is being very calm always a good thing?",
        answer: "Generally yes, but extreme calmness could sometimes mean under-reacting to real problems or dismissing valid concerns. The goal is balanced responsiveness—calm enough to think clearly, but alert enough to recognize when action is needed.",
      },
      {
        question: "Why am I so much calmer than others?",
        answer: "Calm temperament can stem from genetics, upbringing, learned coping strategies, or life experiences. Some people naturally have less reactive nervous systems. It's also possible you've developed strong emotional regulation skills over time.",
      },
      {
        question: "Should I help anxious people become calmer?",
        answer: "You can support others by modeling calm responses and sharing strategies that work for you, but avoid dismissing their feelings or suggesting they just 'relax.' Anxiety often has deeper roots that require understanding, not simplistic advice.",
      },
    ],
  },
  Calm: {
    label: "Calm Temperament",
    shortDescription: "You generally stay composed with occasional moments of worry or stress.",
    meaning: [
      "Your responses indicate you typically maintain composure and don't get overwhelmed easily. You may experience occasional worry or stress, but it doesn't dominate your experience or significantly disrupt your life. You've likely developed effective ways to manage stress when it arises.",
      "This balanced calm is quite healthy—you can respond to genuine stressors while not creating unnecessary anxiety. You're probably someone others describe as 'level-headed' or 'grounded,' able to provide perspective during challenging times.",
    ],
    traits: [
      "Generally calm with occasional stressed moments",
      "Can manage worry without it spiraling",
      "Comfortable making decisions, though may sometimes second-guess",
      "Physically relaxed most of the time",
      "Sleep is usually good, with rare nights of racing thoughts",
      "Adapt reasonably well to unexpected changes",
      "Have some effective stress management strategies",
    ],
    advice: [
      "Continue practices that maintain your general calmness (exercise, sleep, social connection, etc.)",
      "When you do experience worry, use it as information rather than letting it escalate",
      "Develop additional coping strategies for the specific situations that do trigger stress",
      "Remember that some anxiety is normal and even useful—it's about balance, not elimination",
    ],
    faqs: [
      {
        question: "How can I become even calmer?",
        answer: "Consider practices like meditation, mindfulness, regular exercise, and ensuring adequate sleep. However, remember that some stress is normal—the goal isn't to eliminate all worry but to manage it well.",
      },
      {
        question: "Why do I sometimes feel anxious if I'm generally calm?",
        answer: "Everyone experiences occasional anxiety—it's a normal human emotion designed to alert us to potential problems. Your calm temperament means these moments don't define your experience or spiral out of control.",
      },
      {
        question: "Is my calmness just denial or avoidance?",
        answer: "True calmness involves acknowledging reality while maintaining composure. If you're avoiding problems or suppressing legitimate concerns, that's different. Reflect honestly: are you addressing challenges, or just not thinking about them?",
      },
    ],
  },
  Balanced: {
    label: "Balanced Temperament",
    shortDescription: "You experience a healthy mix of calm and concerned responses depending on the situation.",
    meaning: [
      "Your responses show a balanced temperament where you experience both calm periods and anxious ones. This is actually very normal—most people fall somewhere in this middle range. You're neither extremely chill nor constantly worried, but instead responsive to your circumstances.",
      "This balanced approach means you can be alert to genuine concerns while also able to relax when appropriate. You might notice your stress levels fluctuate based on what's happening in your life, which is a healthy, adaptive response.",
    ],
    traits: [
      "Stress levels vary depending on circumstances",
      "Can be calm in familiar situations, more anxious in new ones",
      "Sometimes overthink, sometimes let things go easily",
      "Physical stress responses appear during genuinely stressful times",
      "Sleep quality varies with life stressors",
      "Some situations feel comfortable, others generate worry",
    ],
    advice: [
      "Pay attention to patterns—what situations trigger anxiety versus calm? Understanding your triggers helps manage them",
      "Develop a toolkit of coping strategies for when worry does arise (breathing exercises, perspective-taking, problem-solving)",
      "Practice distinguishing between productive concern (motivates helpful action) and unproductive worry (just creates distress)",
      "Build stress management into your routine before you need it, not just when overwhelmed",
      "Remember that some anxiety is normal and can even be helpful in motivating preparation and caution",
    ],
    faqs: [
      {
        question: "Is being balanced the same as being 'normal'?",
        answer: "Most people do fall in the balanced range, experiencing both calm and worried periods. This adaptability—responding to situations appropriately rather than being stuck in one mode—is generally healthy.",
      },
      {
        question: "Should I try to become calmer?",
        answer: "If your current anxiety level isn't interfering with your life, you may be fine as is. If worry is causing distress or limiting your activities, working on stress management skills could help. It's about functioning, not reaching an arbitrary 'calm' standard.",
      },
      {
        question: "Why am I calm sometimes and anxious other times?",
        answer: "This variability is normal. Stress responses depend on the situation, your resources at the time (tired? well-rested?), and whether the stressor feels controllable. Inconsistency doesn't mean something's wrong with you.",
      },
    ],
  },
  Anxious: {
    label: "Anxious Temperament",
    shortDescription: "You frequently experience worry and find it challenging to stay calm.",
    meaning: [
      "Your responses indicate you tend toward worry and may frequently feel stressed, on edge, or mentally preoccupied. You might experience racing thoughts, physical tension, or difficulty relaxing even when there's no immediate threat. This anxious tendency may be impacting your daily comfort and well-being.",
      "Having an anxious temperament doesn't mean you're broken or weak—many people experience persistent worry. However, if this level of anxiety is causing distress or limiting your life, developing better coping strategies or seeking professional support could significantly improve your quality of life.",
    ],
    traits: [
      "Frequent worry about various aspects of life",
      "Tendency to expect worst-case scenarios",
      "Rumination over past events or future possibilities",
      "Physical manifestations of stress (tension, sleep issues, etc.)",
      "Difficulty making decisions due to worry about outcomes",
      "Perfectionist tendencies that create stress",
      "Social situations may feel uncomfortable or draining",
      "Stress lingers after challenging events",
    ],
    advice: [
      "Consider working with a therapist who specializes in anxiety—professional support can be transformative",
      "Learn and practice evidence-based anxiety management techniques (cognitive restructuring, breathing exercises, progressive muscle relaxation)",
      "Examine whether your worry is producing helpful action or just creating suffering—shift toward productive problem-solving",
      "Limit caffeine and ensure adequate sleep, as both significantly affect anxiety levels",
      "Build a regular stress-relief practice into your routine (exercise, meditation, creative outlets)",
      "Challenge catastrophic thinking by examining evidence for and against your worries",
    ],
    faqs: [
      {
        question: "Is my anxiety a disorder that needs treatment?",
        answer: "This test can't diagnose clinical anxiety disorders. However, if worry is significantly impacting your daily functioning, relationships, or well-being, consulting a mental health professional is recommended. They can determine if you meet criteria for an anxiety disorder and suggest appropriate treatment.",
      },
      {
        question: "Can anxious people become calmer?",
        answer: "Yes, absolutely. While some temperament is innate, anxiety management skills can be learned. Therapy (especially CBT), medication when appropriate, lifestyle changes, and stress management practices can all reduce anxiety levels significantly.",
      },
      {
        question: "Why am I so anxious when others seem calm?",
        answer: "Anxiety stems from a combination of genetics, brain chemistry, life experiences, learned patterns, and current stressors. Some people naturally have more reactive nervous systems. Comparing yourself to others isn't helpful—focus on your own growth.",
      },
      {
        question: "What's the difference between normal worry and anxiety that needs help?",
        answer: "Seek help if worry is: persistent and hard to control, disproportionate to actual risk, causing significant distress, interfering with work/relationships/activities, or accompanied by physical symptoms that concern you.",
      },
    ],
  },
  "Very Anxious": {
    label: "Very Anxious Temperament",
    shortDescription: "You experience persistent, intense worry that significantly affects your daily life.",
    meaning: [
      "Your responses suggest you experience high levels of worry and stress that likely interfere with your daily functioning and quality of life. You may feel constantly on edge, struggle with racing thoughts, experience significant physical symptoms of stress, and find it very difficult to relax or feel calm.",
      "This level of persistent worry is not something you should navigate alone. While some anxiety is normal, chronic, intense anxiety that disrupts your life often benefits significantly from professional treatment. Many people with similar experiences find substantial relief through therapy, lifestyle changes, and sometimes medication.",
    ],
    traits: [
      "Persistent, hard-to-control worry across multiple life areas",
      "Frequent catastrophic thinking and worst-case scenarios",
      "Constant mental rumination and racing thoughts",
      "Significant physical symptoms (tension, sleep disruption, stomach issues, etc.)",
      "Difficulty making even small decisions due to worry",
      "Avoidance of situations that trigger anxiety",
      "Perfectionism that creates severe stress",
      "Very little time spent feeling genuinely calm or relaxed",
    ],
    advice: [
      "Strongly consider seeking help from a mental health professional—anxiety at this level is very treatable with proper support",
      "Talk to your doctor about your symptoms; they can rule out medical causes and discuss treatment options including therapy and medication",
      "Start with small, manageable steps: one coping technique, one challenging situation at a time",
      "Be very gentle with yourself—chronic anxiety is exhausting, and healing takes time",
      "Connect with others who understand (support groups, online communities) while working on professional treatment",
      "Prioritize basic self-care even when it feels hard: sleep, nutrition, gentle movement",
      "If you experience panic attacks or anxiety that feels unmanageable, crisis resources are available",
    ],
    faqs: [
      {
        question: "Do I have an anxiety disorder?",
        answer: "This test can't diagnose mental health conditions, but your responses suggest anxiety is significantly impacting your life. A mental health professional can provide a proper assessment. Common treatable anxiety disorders include Generalized Anxiety Disorder, Social Anxiety, and Panic Disorder.",
      },
      {
        question: "Can I get better, or is this just how I am?",
        answer: "Anxiety disorders are among the most treatable mental health conditions. Many people with severe anxiety achieve significant improvement through therapy (especially Cognitive Behavioral Therapy), medication when appropriate, and lifestyle changes. You don't have to feel this way forever.",
      },
      {
        question: "What type of professional should I see?",
        answer: "Start with either a therapist (psychologist, licensed counselor, or social worker who specializes in anxiety) or your primary care doctor. Your doctor can rule out physical causes and refer you to mental health specialists. Psychiatrists can prescribe medication if needed.",
      },
      {
        question: "What if I can't afford treatment?",
        answer: "Options include: sliding-scale therapy clinics, community mental health centers, employee assistance programs, online therapy platforms (often cheaper), university training clinics, support groups, and evidence-based self-help resources. Don't let cost prevent you from seeking help—affordable options exist.",
      },
      {
        question: "How do I know if I need medication?",
        answer: "Only a psychiatrist or doctor can determine if medication is appropriate. Generally, medication is considered when: anxiety is severe, interfering significantly with functioning, hasn't improved with therapy alone, or is accompanied by other conditions. Many people benefit from a combination of therapy and medication.",
      },
      {
        question: "Is this test saying I'm mentally ill?",
        answer: "This test identifies personality tendencies related to worry and stress. Whether it constitutes a clinical anxiety disorder requires professional evaluation. What matters most is whether your anxiety level is causing you distress or limiting your life—if so, support is available and effective.",
      },
    ],
  },
};

// Celebrity comparisons (note: these are estimates for entertainment purposes)
export const anxietyCalmCelebrities = {
  "Very Calm": [
    { name: "Morgan Freeman", description: "Known for composed, unflappable demeanor" },
    { name: "Keanu Reeves", description: "Maintains calm presence despite intense situations" },
  ],
  Calm: [
    { name: "Tom Hanks", description: "Generally even-keeled and grounded" },
    { name: "Jennifer Aniston", description: "Balanced approach to life stressors" },
  ],
  Balanced: [
    { name: "Most people", description: "Experience both calm and anxious periods" },
    { name: "Various public figures", description: "Normal mix of stress and calm" },
  ],
  Anxious: [
    { name: "Emma Stone", description: "Has spoken openly about anxiety struggles" },
    { name: "Ryan Reynolds", description: "Has discussed experiencing anxiety" },
  ],
  "Very Anxious": [
    { name: "Many performers and creatives", description: "Often create from place of anxiety" },
    { name: "Various celebrities", description: "Have documented struggles with anxiety disorders" },
  ],
};
