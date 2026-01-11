export type ToxicTrait =
  | "jealousy"
  | "passive_aggression"
  | "control"
  | "negativity"
  | "self_centeredness"
  | "dishonesty";

export interface ToxicTraitQuestion {
  id: number;
  text: string;
  trait: ToxicTrait;
}

// 5-point scale
export type AnswerValue = 1 | 2 | 3 | 4 | 5;

export const answerOptions: { value: AnswerValue; label: string }[] = [
  { value: 1, label: "Never" },
  { value: 2, label: "Rarely" },
  { value: 3, label: "Sometimes" },
  { value: 4, label: "Often" },
  { value: 5, label: "Always" },
];

// 30 questions - 5 per trait
export const toxicTraitQuestions: ToxicTraitQuestion[] = [
  // Jealousy (1-5)
  {
    id: 1,
    text: "I feel uncomfortable when my friends spend time with other people.",
    trait: "jealousy",
  },
  {
    id: 2,
    text: "I compare myself to others and feel bad when they seem more successful.",
    trait: "jealousy",
  },
  {
    id: 3,
    text: "I check my partner's phone or social media to see who they're talking to.",
    trait: "jealousy",
  },
  {
    id: 4,
    text: "When someone I know achieves something, I feel it takes something away from me.",
    trait: "jealousy",
  },
  {
    id: 5,
    text: "I get upset when my partner talks positively about someone attractive.",
    trait: "jealousy",
  },

  // Passive Aggression (6-10)
  {
    id: 6,
    text: "Instead of saying I'm upset, I give the silent treatment.",
    trait: "passive_aggression",
  },
  {
    id: 7,
    text: "I say 'I'm fine' when I'm actually upset and expect others to figure it out.",
    trait: "passive_aggression",
  },
  {
    id: 8,
    text: "I make sarcastic comments instead of saying what I really mean.",
    trait: "passive_aggression",
  },
  {
    id: 9,
    text: "I procrastinate or 'forget' things when I'm annoyed with someone.",
    trait: "passive_aggression",
  },
  {
    id: 10,
    text: "I compliment people in ways that have a hidden insult.",
    trait: "passive_aggression",
  },

  // Control (11-15)
  {
    id: 11,
    text: "I believe I know the best way to do things and others should follow.",
    trait: "control",
  },
  {
    id: 12,
    text: "I feel anxious when things don't go according to my plan.",
    trait: "control",
  },
  {
    id: 13,
    text: "I give unsolicited advice because I want to help people avoid mistakes.",
    trait: "control",
  },
  {
    id: 14,
    text: "I struggle to delegate tasks because others might not do them right.",
    trait: "control",
  },
  {
    id: 15,
    text: "I get frustrated when people don't take my suggestions.",
    trait: "control",
  },

  // Negativity (16-20)
  {
    id: 16,
    text: "I tend to point out potential problems or what could go wrong.",
    trait: "negativity",
  },
  {
    id: 17,
    text: "I find myself complaining about things more than appreciating them.",
    trait: "negativity",
  },
  {
    id: 18,
    text: "When something good happens, I worry about when it will end.",
    trait: "negativity",
  },
  {
    id: 19,
    text: "I often feel like things won't work out no matter what I do.",
    trait: "negativity",
  },
  {
    id: 20,
    text: "I bring up past failures or problems in conversations.",
    trait: "negativity",
  },

  // Self-Centeredness (21-25)
  {
    id: 21,
    text: "I tend to steer conversations back to topics about me.",
    trait: "self_centeredness",
  },
  {
    id: 22,
    text: "I feel bored when others talk about their problems.",
    trait: "self_centeredness",
  },
  {
    id: 23,
    text: "I expect others to accommodate my preferences and schedule.",
    trait: "self_centeredness",
  },
  {
    id: 24,
    text: "I feel upset when I'm not the center of attention.",
    trait: "self_centeredness",
  },
  {
    id: 25,
    text: "I make decisions based on what's best for me without considering others.",
    trait: "self_centeredness",
  },

  // Dishonesty (26-30)
  {
    id: 26,
    text: "I tell small lies to avoid inconvenience or conflict.",
    trait: "dishonesty",
  },
  {
    id: 27,
    text: "I exaggerate stories to make myself look better.",
    trait: "dishonesty",
  },
  {
    id: 28,
    text: "I hide parts of the truth when it suits me.",
    trait: "dishonesty",
  },
  {
    id: 29,
    text: "I make promises I'm not sure I can keep.",
    trait: "dishonesty",
  },
  {
    id: 30,
    text: "I pretend to agree with people even when I don't.",
    trait: "dishonesty",
  },
];

export interface ToxicTraitInfo {
  name: string;
  emoji: string;
  color: string;
  bgColor: string;
  textColor: string;
  description: string;
  whyItHappens: string;
  howItHurts: string[];
  healthyAlternative: string;
  growthStrategies: string[];
  commonTriggers: string[];
}

export const toxicTraitDescriptions: Record<ToxicTrait, ToxicTraitInfo> = {
  jealousy: {
    name: "Jealousy",
    emoji: "💚",
    color: "bg-emerald-500",
    bgColor: "from-emerald-500/10 to-green-500/10",
    textColor: "text-emerald-600",
    description: "The tendency to feel threatened by others' relationships, successes, or qualities, often leading to possessive or competitive behavior.",
    whyItHappens: "Jealousy often stems from insecurity, fear of abandonment, or low self-esteem. It can be triggered by past experiences of betrayal or loss. At its core, jealousy reflects a fear that we're not enough and that others pose a threat to our relationships or status.",
    howItHurts: [
      "Damages trust in relationships through suspicious behavior",
      "Creates self-fulfilling prophecies by pushing people away",
      "Prevents celebrating others' successes",
      "Leads to controlling or possessive behavior",
      "Causes constant comparison and unhappiness"
    ],
    healthyAlternative: "Practice compersion - the ability to feel joy in others' happiness and success. Recognize that others' achievements don't diminish your own worth. Build self-esteem through personal growth rather than comparison.",
    growthStrategies: [
      "Identify and challenge insecure thoughts",
      "Practice gratitude for what you have",
      "Build your own self-worth through personal achievements",
      "Communicate your insecurities openly rather than acting on jealousy",
      "Celebrate others' wins as practice for abundance mindset"
    ],
    commonTriggers: [
      "Social media comparisons",
      "Partner's friendships with attractive people",
      "Others' career or financial success",
      "Friends spending time with other friends"
    ]
  },
  passive_aggression: {
    name: "Passive Aggression",
    emoji: "😤",
    color: "bg-orange-500",
    bgColor: "from-orange-500/10 to-amber-500/10",
    textColor: "text-orange-600",
    description: "Expressing negative feelings indirectly rather than openly addressing them, through subtle behaviors like sarcasm, the silent treatment, or deliberate inefficiency.",
    whyItHappens: "Passive aggression often develops when direct expression of anger feels unsafe or unacceptable. It may stem from childhood environments where emotions weren't validated, fear of conflict, or feeling powerless. The indirect approach feels safer than confrontation.",
    howItHurts: [
      "Creates confusion and frustration for others",
      "Prevents real issues from being resolved",
      "Erodes trust through indirect communication",
      "Builds resentment on both sides",
      "Teaches others not to trust your words"
    ],
    healthyAlternative: "Practice assertive communication - expressing your needs and feelings directly while respecting others. Say what you mean and mean what you say. Address issues when they're small rather than letting them build.",
    growthStrategies: [
      "Practice 'I feel' statements to express emotions directly",
      "Recognize your passive-aggressive patterns",
      "Address small issues before they become resentments",
      "Learn that conflict can be healthy and productive",
      "Ask for what you need clearly and directly"
    ],
    commonTriggers: [
      "Feeling unheard or dismissed",
      "Power imbalances in relationships",
      "Fear of confrontation",
      "Accumulated small frustrations"
    ]
  },
  control: {
    name: "Control",
    emoji: "🎮",
    color: "bg-blue-500",
    bgColor: "from-blue-500/10 to-indigo-500/10",
    textColor: "text-blue-600",
    description: "The need to manage people, situations, or outcomes, often through micromanagement, unsolicited advice, or difficulty delegating.",
    whyItHappens: "Control issues often arise from anxiety and a fear of uncertainty. Past experiences of chaos or lack of control can create a strong need to manage everything. It can also come from perfectionism or the belief that you know best.",
    howItHurts: [
      "Prevents others from growing and learning",
      "Creates stress and burnout from trying to manage everything",
      "Damages relationships through lack of trust",
      "Makes others feel incompetent or suffocated",
      "Limits flexibility and spontaneity in life"
    ],
    healthyAlternative: "Practice letting go and trusting others. Recognize that different doesn't mean wrong, and that mistakes are part of learning. Focus on controlling what you can - your own actions and reactions.",
    growthStrategies: [
      "Start delegating small tasks and accepting imperfect results",
      "Practice mindfulness to manage anxiety about uncertainty",
      "Ask yourself 'What's the worst that could happen?'",
      "Focus on outcomes rather than methods",
      "Trust that others can handle their own lives"
    ],
    commonTriggers: [
      "Uncertain or ambiguous situations",
      "Working with people who do things differently",
      "High-stakes decisions",
      "Past experiences where loss of control led to harm"
    ]
  },
  negativity: {
    name: "Negativity",
    emoji: "☁️",
    color: "bg-slate-500",
    bgColor: "from-slate-500/10 to-gray-500/10",
    textColor: "text-slate-600",
    description: "The tendency to focus on problems, complaints, and what could go wrong, often bringing down the mood of those around you.",
    whyItHappens: "Negativity can be a learned defense mechanism - if you expect the worst, you won't be disappointed. It may also come from genuine past disappointments, depression, or a neurological tendency toward threat detection.",
    howItHurts: [
      "Drains energy from yourself and others",
      "Creates self-fulfilling prophecies",
      "Pushes positive people away",
      "Prevents enjoying good experiences",
      "Can contribute to depression and anxiety"
    ],
    healthyAlternative: "Practice realistic optimism - acknowledging challenges while also looking for opportunities and solutions. Balance problem-identification with appreciation for what's good.",
    growthStrategies: [
      "Keep a daily gratitude journal",
      "Practice 'yes, and' instead of 'yes, but'",
      "Limit complaining - try going 24 hours without it",
      "For every problem you raise, suggest a solution",
      "Surround yourself with positive people"
    ],
    commonTriggers: [
      "Change or uncertainty",
      "When things don't go as planned",
      "Exposure to negative news or people",
      "Fatigue and stress"
    ]
  },
  self_centeredness: {
    name: "Self-Centeredness",
    emoji: "👤",
    color: "bg-purple-500",
    bgColor: "from-purple-500/10 to-violet-500/10",
    textColor: "text-purple-600",
    description: "The tendency to prioritize your own needs, interests, and experiences above others, often without awareness of how it affects them.",
    whyItHappens: "Some self-focus is healthy, but excessive self-centeredness can develop from insecurity (needing validation), narcissistic tendencies, or simply not having learned to consider others' perspectives. It can also be a response to past neglect.",
    howItHurts: [
      "Makes others feel unimportant and unheard",
      "Creates one-sided relationships",
      "Limits deep emotional connections",
      "Reduces your ability to help and be helped",
      "Can lead to isolation as people pull away"
    ],
    healthyAlternative: "Cultivate genuine curiosity about others. Practice active listening without thinking about what you'll say next. Balance self-care with caring for others.",
    growthStrategies: [
      "Practice asking follow-up questions when others share",
      "Listen fully before responding",
      "Make a conscious effort to remember details about others' lives",
      "Volunteer or help others regularly",
      "Ask 'How does this affect others?' before decisions"
    ],
    commonTriggers: [
      "Stress or personal challenges",
      "Conversations about topics you find boring",
      "When feeling insecure or needing validation",
      "Exciting news about yourself"
    ]
  },
  dishonesty: {
    name: "Dishonesty",
    emoji: "🎭",
    color: "bg-rose-500",
    bgColor: "from-rose-500/10 to-pink-500/10",
    textColor: "text-rose-600",
    description: "The tendency to lie, exaggerate, hide the truth, or make unreliable promises, often to avoid consequences or gain advantage.",
    whyItHappens: "Dishonesty often stems from fear - of conflict, rejection, or consequences. It can also come from low self-esteem (needing to exaggerate), people-pleasing (saying what others want to hear), or simply taking the easy way out.",
    howItHurts: [
      "Destroys trust once discovered",
      "Creates stress from maintaining false stories",
      "Prevents authentic relationships",
      "Damages your reputation over time",
      "Leads to bigger lies to cover smaller ones"
    ],
    healthyAlternative: "Practice radical honesty with compassion. Tell the truth even when it's uncomfortable. Keep promises you make, or don't make them. Build a reputation for reliability.",
    growthStrategies: [
      "Practice saying 'I don't know' or 'I made a mistake'",
      "Only commit to things you can actually do",
      "Choose honesty even in small things",
      "Address the fears that drive your dishonesty",
      "Make amends when you've been dishonest"
    ],
    commonTriggers: [
      "Fear of disappointing others",
      "Desire to avoid conflict",
      "Wanting to appear better than you are",
      "Short-term convenience over long-term trust"
    ]
  },
};

export const traitOrder: ToxicTrait[] = [
  "jealousy",
  "passive_aggression",
  "control",
  "negativity",
  "self_centeredness",
  "dishonesty",
];

export interface ToxicTraitResult {
  jealousy: number;
  passive_aggression: number;
  control: number;
  negativity: number;
  self_centeredness: number;
  dishonesty: number;
}

export const calculateResults = (answers: Record<number, AnswerValue>): ToxicTraitResult => {
  const traitScores: Record<ToxicTrait, { sum: number; count: number }> = {
    jealousy: { sum: 0, count: 0 },
    passive_aggression: { sum: 0, count: 0 },
    control: { sum: 0, count: 0 },
    negativity: { sum: 0, count: 0 },
    self_centeredness: { sum: 0, count: 0 },
    dishonesty: { sum: 0, count: 0 },
  };

  toxicTraitQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      traitScores[question.trait].sum += answer;
      traitScores[question.trait].count++;
    }
  });

  const calculatePercentage = (sum: number, count: number): number => {
    if (count === 0) return 0;
    const maxPossible = count * 5;
    const minPossible = count * 1;
    return Math.round(((sum - minPossible) / (maxPossible - minPossible)) * 100);
  };

  return {
    jealousy: calculatePercentage(traitScores.jealousy.sum, traitScores.jealousy.count),
    passive_aggression: calculatePercentage(traitScores.passive_aggression.sum, traitScores.passive_aggression.count),
    control: calculatePercentage(traitScores.control.sum, traitScores.control.count),
    negativity: calculatePercentage(traitScores.negativity.sum, traitScores.negativity.count),
    self_centeredness: calculatePercentage(traitScores.self_centeredness.sum, traitScores.self_centeredness.count),
    dishonesty: calculatePercentage(traitScores.dishonesty.sum, traitScores.dishonesty.count),
  };
};

export type ScoreLevel = "low" | "moderate" | "high";

export const getScoreLevel = (score: number): ScoreLevel => {
  if (score < 35) return "low";
  if (score < 65) return "moderate";
  return "high";
};

export const scoreLevelLabels: Record<ScoreLevel, string> = {
  low: "Low",
  moderate: "Moderate",
  high: "High",
};

export interface ToxicTraitProfile {
  overallScore: number;
  primaryTrait: ToxicTrait;
  sortedTraits: { trait: ToxicTrait; score: number }[];
  summary: string;
  interpretation: string;
}

export const getToxicTraitProfile = (result: ToxicTraitResult): ToxicTraitProfile => {
  const traits: { trait: ToxicTrait; score: number }[] = [
    { trait: "jealousy", score: result.jealousy },
    { trait: "passive_aggression", score: result.passive_aggression },
    { trait: "control", score: result.control },
    { trait: "negativity", score: result.negativity },
    { trait: "self_centeredness", score: result.self_centeredness },
    { trait: "dishonesty", score: result.dishonesty },
  ];

  const sortedTraits = [...traits].sort((a, b) => b.score - a.score);
  const overallScore = Math.round(traits.reduce((sum, t) => sum + t.score, 0) / traits.length);
  const primaryTrait = sortedTraits[0].trait;

  let summary = "";
  let interpretation = "";

  if (overallScore < 25) {
    summary = "You show very low toxic trait tendencies. You likely approach relationships with openness, honesty, and genuine care for others.";
    interpretation = "Your results suggest a healthy approach to relationships and self-expression. You're able to communicate directly, celebrate others' successes, and maintain healthy boundaries. While everyone has moments they're not proud of, your baseline tendencies are constructive rather than harmful.";
  } else if (overallScore < 45) {
    summary = "You show low to moderate toxic trait levels - fairly typical for most people with room for growth.";
    interpretation = "Like most people, you have some tendencies that could be improved. Your results suggest general self-awareness and healthy relating, with specific areas where old patterns might emerge under stress. Focusing on your highest-scoring trait could lead to meaningful personal growth.";
  } else if (overallScore < 65) {
    summary = "You show moderate toxic trait tendencies. These patterns may be affecting your relationships.";
    interpretation = "Your results suggest some behavioral patterns that could be creating friction in your relationships. The good news is that awareness is the first step to change. Consider which of your highest-scoring traits causes the most problems, and focus your growth efforts there.";
  } else {
    summary = "You show elevated toxic trait tendencies. These patterns are likely affecting your relationships significantly.";
    interpretation = "Your results suggest behavioral patterns that may be causing significant challenges in your relationships. This doesn't make you a 'bad person' - these traits often develop as protection mechanisms or learned behaviors. With self-awareness and effort, you can develop healthier patterns. Consider working with a therapist or counselor on your areas of concern.";
  }

  return { overallScore, primaryTrait, sortedTraits, summary, interpretation };
};

export const toxicTraitFAQs = [
  {
    question: "Does everyone have toxic traits?",
    answer: "Yes! Every person has some behaviors or tendencies that could be considered toxic in certain contexts. The key isn't being 'trait-free' but being self-aware about your patterns and actively working on the ones that cause harm to yourself or others. We all have room for growth."
  },
  {
    question: "Can toxic traits be changed?",
    answer: "Absolutely. Unlike personality disorders, these traits are behavioral patterns that can be modified with awareness, effort, and sometimes professional support. Many people significantly reduce toxic behaviors through therapy, mindfulness practices, and consistent effort. Change takes time but is definitely possible."
  },
  {
    question: "What causes toxic traits to develop?",
    answer: "Toxic traits often develop as coping mechanisms in response to difficult experiences - childhood environments, trauma, insecurity, or learned behaviors from role models. Understanding the origin of your patterns can help you address them more effectively, though it's not an excuse for harmful behavior."
  },
  {
    question: "How do I know if my traits are affecting my relationships?",
    answer: "Signs include: repeated conflicts about similar issues, people pulling away from you, feedback from multiple people about the same behavior, relationships that start well but deteriorate, or feeling like you're always the victim. If you notice patterns in how relationships go wrong, your traits may be contributing."
  },
  {
    question: "Should I share my results with others?",
    answer: "Sharing can be valuable if done constructively - it shows self-awareness and invites accountability. However, be mindful of how you frame it. Don't use results to excuse behavior ('I can't help it, it's just my trait!') but rather to open dialogue about how you want to grow."
  },
  {
    question: "Is this test a clinical assessment?",
    answer: "No. This test is for entertainment and self-reflection purposes only. It's not a clinical tool and cannot diagnose any mental health conditions. If you have concerns about your behavioral patterns or mental health, please consult with a licensed mental health professional."
  }
];

export const toxicTraitCelebrities = [
  {
    name: "Mr. Rogers",
    score: 8,
    description: "Known for genuine kindness, patience, and caring about others. A model of healthy relating.",
    avatar: "🎭"
  },
  {
    name: "Gordon Ramsay",
    score: 52,
    description: "Shows control tendencies and directness that can come across as harsh, but genuine at core.",
    avatar: "👨‍🍳"
  },
  {
    name: "Regina George (Mean Girls)",
    score: 85,
    description: "Fictional character embodying jealousy, manipulation, and passive aggression.",
    avatar: "👑"
  },
  {
    name: "Bob Ross",
    score: 12,
    description: "Embodied positivity, encouragement, and genuine joy in others' success.",
    avatar: "🎨"
  },
  {
    name: "Miranda Priestly (Devil Wears Prada)",
    score: 75,
    description: "Fictional character showing control, negativity, and self-centeredness tendencies.",
    avatar: "👠"
  },
  {
    name: "Ted Lasso",
    score: 15,
    description: "Fictional character known for positivity, genuine care, and healthy communication.",
    avatar: "⚽"
  }
];
