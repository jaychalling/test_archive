export interface LoveCompatibilityQuestion {
  id: number;
  text: string;
  category: "communication" | "values" | "emotional" | "lifestyle" | "conflict";
}

// 5-point scale options
export type AnswerValue = 1 | 2 | 3 | 4 | 5;

export const answerOptions: { value: AnswerValue; label: string }[] = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

export const loveCompatibilityQuestions: LoveCompatibilityQuestion[] = [
  // === Communication (6 questions) ===
  {
    id: 1,
    text: "I prefer to discuss problems openly and immediately rather than avoiding conflict.",
    category: "communication",
  },
  {
    id: 2,
    text: "I feel comfortable expressing my feelings and emotions to my partner.",
    category: "communication",
  },
  {
    id: 3,
    text: "I need frequent verbal affirmation and reassurance in relationships.",
    category: "communication",
  },
  {
    id: 4,
    text: "I prefer long, deep conversations over small talk.",
    category: "communication",
  },
  {
    id: 5,
    text: "I like to check in with my partner throughout the day via text or calls.",
    category: "communication",
  },
  {
    id: 6,
    text: "I am direct and straightforward when communicating my needs.",
    category: "communication",
  },

  // === Values & Goals (6 questions) ===
  {
    id: 7,
    text: "Having children is an important life goal for me.",
    category: "values",
  },
  {
    id: 8,
    text: "Career success and professional achievement are top priorities in my life.",
    category: "values",
  },
  {
    id: 9,
    text: "Financial security is more important to me than spontaneous adventures.",
    category: "values",
  },
  {
    id: 10,
    text: "I value traditional family structures and gender roles.",
    category: "values",
  },
  {
    id: 11,
    text: "Personal growth and self-improvement are essential to my happiness.",
    category: "values",
  },
  {
    id: 12,
    text: "I prefer living in one place long-term rather than frequently moving for opportunities.",
    category: "values",
  },

  // === Emotional Connection (6 questions) ===
  {
    id: 13,
    text: "I need a lot of physical affection (hugs, cuddles, hand-holding) from my partner.",
    category: "emotional",
  },
  {
    id: 14,
    text: "I want to share almost everything with my partner, including passwords and accounts.",
    category: "emotional",
  },
  {
    id: 15,
    text: "I prefer spending most of my free time with my partner rather than separately.",
    category: "emotional",
  },
  {
    id: 16,
    text: "I need alone time to recharge, even when in a relationship.",
    category: "emotional",
  },
  {
    id: 17,
    text: "Emotional intimacy is more important to me than physical intimacy.",
    category: "emotional",
  },
  {
    id: 18,
    text: "I tend to wear my heart on my sleeve and show emotions easily.",
    category: "emotional",
  },

  // === Lifestyle & Interests (6 questions) ===
  {
    id: 19,
    text: "I prefer staying in and having quiet nights at home over going out.",
    category: "lifestyle",
  },
  {
    id: 20,
    text: "I like to maintain close friendships and spend time with friends regularly.",
    category: "lifestyle",
  },
  {
    id: 21,
    text: "I enjoy trying new activities and experiences frequently.",
    category: "lifestyle",
  },
  {
    id: 22,
    text: "Health and fitness are important parts of my daily routine.",
    category: "lifestyle",
  },
  {
    id: 23,
    text: "I prefer structure and routine over spontaneity in daily life.",
    category: "lifestyle",
  },
  {
    id: 24,
    text: "Shared hobbies and interests are essential in a romantic relationship.",
    category: "lifestyle",
  },

  // === Conflict Resolution (6 questions) ===
  {
    id: 25,
    text: "During arguments, I prefer to take time alone to cool down before discussing.",
    category: "conflict",
  },
  {
    id: 26,
    text: "I tend to apologize quickly, even if I'm not entirely at fault.",
    category: "conflict",
  },
  {
    id: 27,
    text: "I believe in addressing every issue, no matter how small.",
    category: "conflict",
  },
  {
    id: 28,
    text: "I can easily forgive and move on from past conflicts.",
    category: "conflict",
  },
  {
    id: 29,
    text: "I prefer compromise over winning arguments.",
    category: "conflict",
  },
  {
    id: 30,
    text: "I need my partner to validate my feelings during disagreements.",
    category: "conflict",
  },
];

export interface CompatibilityResult {
  overallScore: number;
  categoryScores: {
    communication: number;
    values: number;
    emotional: number;
    lifestyle: number;
    conflict: number;
  };
  compatibilityLevel: "Low" | "Moderate" | "Good" | "High" | "Excellent";
}

export type CompatibilityLevel = "Low" | "Moderate" | "Good" | "High" | "Excellent";

interface CompatibilityDescription {
  label: string;
  shortDescription: string;
  meaning: string[];
  traits: string[];
  advice: string[];
  faqs: { question: string; answer: string }[];
}

export const compatibilityDescriptions: Record<CompatibilityLevel, CompatibilityDescription> = {
  Excellent: {
    label: "Excellent Compatibility",
    shortDescription: "You demonstrate strong relationship-ready qualities across all key areas.",
    meaning: [
      "Your responses indicate you have well-developed relationship skills and clear self-awareness about what you want in a partnership. This doesn't guarantee a perfect relationship, but it suggests you're equipped with qualities that tend to support healthy, lasting connections.",
      "People with this compatibility profile often approach relationships with balance—knowing when to compromise and when to maintain boundaries, valuing both togetherness and independence, and having realistic expectations about partnership.",
    ],
    traits: [
      "Strong communication skills and emotional intelligence",
      "Clear values and life goals with room for flexibility",
      "Balanced need for intimacy and personal space",
      "Healthy conflict resolution approaches",
      "Self-awareness about relationship needs and patterns",
      "Realistic expectations about partnership dynamics",
      "Willingness to grow and adapt within relationships",
    ],
    advice: [
      "Remember that compatibility is about finding someone whose relationship style meshes well with yours, not about finding someone identical to you",
      "Continue developing self-awareness—the more you understand yourself, the better you can communicate your needs",
      "Look for partners who share your core values while complementing your personality",
      "Maintain the balance you've cultivated between independence and partnership",
    ],
    faqs: [
      {
        question: "Does this mean I'll definitely find a compatible partner?",
        answer: "High compatibility indicates you have qualities that support healthy relationships, but finding the right person still involves timing, circumstances, and mutual effort. Use this as a guide to understand what you bring to relationships and what to look for in a partner.",
      },
      {
        question: "Should I only date people with similar scores?",
        answer: "Not necessarily. Compatibility is about complementary qualities, not identical traits. Someone with different strengths can balance yours, as long as core values and relationship goals align.",
      },
      {
        question: "How can I maintain this level of relationship readiness?",
        answer: "Continue working on self-awareness, communication skills, and emotional regulation. Maintain your friendships and interests outside of romantic relationships, and stay open to personal growth.",
      },
    ],
  },
  High: {
    label: "High Compatibility",
    shortDescription: "You show strong relationship potential with some areas for continued growth.",
    meaning: [
      "Your responses reveal solid relationship foundations with room for development in certain areas. This is actually quite common—most people have strong skills in some relationship dimensions while working on others.",
      "This profile suggests you typically navigate relationships well and have good instincts about partnership dynamics. The areas where you scored lower aren't weaknesses; they're opportunities for self-reflection and growth.",
    ],
    traits: [
      "Good communication abilities with occasional challenges",
      "Clear sense of personal values and priorities",
      "Generally healthy approach to emotional connection",
      "Willingness to work through conflicts constructively",
      "Some flexibility in lifestyle preferences",
      "Growing self-awareness about relationship patterns",
    ],
    advice: [
      "Identify which compatibility category scored lowest and reflect on why—this is your growth opportunity",
      "Consider whether your relationship expectations are realistic or might need adjustment",
      "Work on balancing your needs with a partner's needs in areas where you tend to be rigid",
      "Remember that compatible partners don't have to match perfectly—complementary differences can strengthen relationships",
    ],
    faqs: [
      {
        question: "What does it mean if one category scored much lower?",
        answer: "Everyone has relationship strengths and challenges. A lower category score highlights an area where you might experience tension with partners. Use this awareness to communicate openly about these topics early in relationships.",
      },
      {
        question: "Can I improve my compatibility?",
        answer: "Absolutely. Relationship skills can be developed through self-reflection, therapy, reading, and practice. The fact that you're taking this test shows you're already invested in understanding yourself better.",
      },
      {
        question: "How important is compatibility really?",
        answer: "Compatibility matters, but it's not everything. Mutual respect, shared values, attraction, and commitment all play crucial roles. Think of compatibility as a foundation—helpful, but not the whole house.",
      },
    ],
  },
  Good: {
    label: "Good Compatibility",
    shortDescription: "You have a solid foundation with opportunities to develop relationship skills further.",
    meaning: [
      "Your responses show you have some strengths in relationships but may encounter challenges in certain areas. This is perfectly normal—relationships are complex, and most people are works in progress.",
      "This score suggests you're aware of what you want but might benefit from exploring why certain relationship aspects feel challenging. Often, our relationship patterns stem from past experiences or learned behaviors that can be examined and adjusted.",
    ],
    traits: [
      "Some clear relationship strengths and preferences",
      "Areas of uncertainty about relationship needs",
      "Mix of healthy and potentially challenging patterns",
      "Capacity for growth in emotional awareness",
      "Recognition that relationships require work",
    ],
    advice: [
      "Reflect on which areas feel most challenging and consider whether past experiences might be influencing your current relationship approach",
      "Work on developing clearer boundaries and communication around your needs",
      "Consider exploring relationship books, podcasts, or even therapy to build skills in your lower-scoring areas",
      "Be patient with yourself—relationship skills develop over time and through experience",
      "Look for partners who are also committed to growth and open communication",
    ],
    faqs: [
      {
        question: "Does this mean I'm not ready for a relationship?",
        answer: "Not at all. Most people enter relationships while still developing their relationship skills. The key is being willing to learn, communicate, and grow alongside a partner.",
      },
      {
        question: "Why might my scores be lower in certain areas?",
        answer: "Lower scores often reflect either lack of experience, past relationship patterns, or areas where your needs are unclear. This awareness is valuable—it tells you what to pay attention to in future relationships.",
      },
      {
        question: "How can I work on my compatibility?",
        answer: "Start with self-reflection about your relationship patterns and needs. Consider whether your expectations are realistic, work on communication skills, and be open to feedback from trusted friends or a therapist.",
      },
    ],
  },
  Moderate: {
    label: "Moderate Compatibility",
    shortDescription: "Your relationship approach shows both strengths and areas needing attention.",
    meaning: [
      "Your responses suggest some uncertainty or conflicting patterns in how you approach relationships. You might find yourself wanting closeness but pulling away, or saying you value communication but struggling to actually talk about difficult topics.",
      "This isn't a judgment—it often reflects that you're in a transitional phase, perhaps recovering from past relationships or still figuring out what you truly want in a partnership. Many people score in this range and go on to have fulfilling relationships once they gain clarity.",
    ],
    traits: [
      "Inconsistent relationship patterns or expectations",
      "Some difficulty identifying or communicating needs",
      "Mix of healthy and potentially problematic approaches",
      "Possible influence from past relationship wounds",
      "Capacity for growth with focused effort",
    ],
    advice: [
      "Take time for serious self-reflection before pursuing serious relationships—understanding yourself is crucial",
      "Consider working with a therapist to explore relationship patterns and past experiences",
      "Practice communicating your needs clearly, even when it feels uncomfortable",
      "Work on identifying your true values versus what you think you should want",
      "Be honest with potential partners about where you are in your growth journey",
    ],
    faqs: [
      {
        question: "Should I avoid relationships until I improve?",
        answer: "That depends on what you're looking for. Casual dating can be part of self-discovery, but serious commitment might benefit from first working on self-awareness. Be honest with potential partners about where you are.",
      },
      {
        question: "Why are my relationship patterns inconsistent?",
        answer: "Inconsistency often stems from conflicting desires (like wanting intimacy but fearing vulnerability) or from not fully processing past relationship experiences. Professional guidance can help untangle these patterns.",
      },
      {
        question: "Can I still find a good partner with this score?",
        answer: "Yes, but the relationship quality will depend on both partners' willingness to work on themselves and communicate openly. Look for patient, emotionally mature partners who are also committed to growth.",
      },
    ],
  },
  Low: {
    label: "Low Compatibility",
    shortDescription: "Your responses suggest significant challenges or uncertainty about relationships.",
    meaning: [
      "Your answers indicate substantial confusion, unrealistic expectations, or potentially problematic patterns in how you approach relationships. This doesn't mean you're incapable of love or partnership—it means there's important inner work to do first.",
      "Low scores often reflect either very limited relationship experience, significant past trauma, or fundamental uncertainty about what you want. These are all valid reasons to pause and invest in self-understanding before pursuing serious romantic commitment.",
    ],
    traits: [
      "Unclear or unrealistic relationship expectations",
      "Difficulty with emotional intimacy or communication",
      "Possible unresolved past relationship trauma",
      "Conflicting needs or values",
      "Potential patterns that could harm relationships",
    ],
    advice: [
      "Strongly consider working with a therapist to explore your relationship patterns and past experiences",
      "Focus on building a strong sense of self and clear personal boundaries before pursuing serious relationships",
      "Work on developing communication and emotional regulation skills",
      "Be very honest with yourself about whether you're ready for the vulnerability that healthy relationships require",
      "If you do date, be upfront about where you are in your personal growth journey",
      "Invest time in friendships and self-development before romantic pursuits",
    ],
    faqs: [
      {
        question: "Does this mean I'm broken or unlovable?",
        answer: "Absolutely not. It means you have work to do on yourself before you can fully show up in a healthy relationship. Many people with low initial scores develop strong, loving partnerships after focusing on personal growth.",
      },
      {
        question: "How long will it take to improve?",
        answer: "There's no set timeline. Personal growth is individual and depends on your commitment to the process. Therapy, self-reflection, and lived experience all contribute. The important thing is to start.",
      },
      {
        question: "Can I date while working on myself?",
        answer: "Casual dating can be part of learning, but be cautious about serious commitments until you've addressed major issues. Be honest with potential partners, and avoid relationships when you know you're not emotionally available.",
      },
      {
        question: "What should I focus on first?",
        answer: "Start with understanding yourself—your needs, boundaries, values, and patterns. Often, professional therapy is the most effective route. Work on communication skills and emotional awareness as foundations for future relationships.",
      },
    ],
  },
};

// Celebrity comparisons
export const compatibilityCelebrities = {
  Excellent: [
    { name: "Barack & Michelle Obama", description: "Strong communication and shared values" },
    { name: "Ryan Reynolds & Blake Lively", description: "Complementary personalities with humor" },
  ],
  High: [
    { name: "Tom Hanks & Rita Wilson", description: "Long-term commitment and mutual respect" },
    { name: "Will Smith & Jada Pinkett Smith", description: "Open communication about challenges" },
  ],
  Good: [
    { name: "David & Victoria Beckham", description: "Different personalities, shared goals" },
    { name: "John Legend & Chrissy Teigen", description: "Balancing career and family" },
  ],
  Moderate: [
    { name: "Ben Affleck & Jennifer Lopez", description: "Complex relationship dynamics" },
    { name: "Justin Bieber & Hailey Baldwin", description: "Growth within relationship" },
  ],
  Low: [
    { name: "Various reality TV couples", description: "Often show incompatible patterns" },
    { name: "Many whirlwind celebrity romances", description: "Lack of foundation" },
  ],
};
