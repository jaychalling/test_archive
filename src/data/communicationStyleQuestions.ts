// Communication Style Test Questions
// Based on communication theory and interpersonal communication styles

export interface CommunicationQuestion {
  id: number;
  text: string;
  category: 'assertive' | 'passive' | 'aggressive' | 'passiveAggressive';
}

export type AnswerValue = 1 | 2 | 3 | 4 | 5;

export const answerOptions: { value: AnswerValue; label: string }[] = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

export type CommunicationStyle = 'assertive' | 'passive' | 'aggressive' | 'passiveAggressive';

export interface CommunicationStyleInfo {
  name: string;
  nameKo: string;
  description: string;
  detailedDescription: string;
  psychologicalBackground: string;
  strengths: string[];
  weaknesses: string[];
  improvementTips: string[];
  exampleSituations: string[];
  color: string;
}

export const testBackground = {
  history: "Communication style theory developed in the 1970s as psychologists studied interpersonal communication patterns. The foundational work by Robert Alberti and Michael Emmons on assertiveness formed the basis, after which various communication styles were classified and researched. Communication style significantly impacts relationship quality, conflict resolution, and professional success.",
  purpose: "This test identifies your primary communication style. It analyzes your tendencies among Assertive, Passive, Aggressive, and Passive-Aggressive styles to help you find more effective communication methods.",
  disclaimer: "This test is a reference tool for self-understanding and communication improvement. People may use different communication styles depending on the situation, and results represent your general tendencies. It cannot replace professional counseling or therapy.",
};

export const communicationQuestions: CommunicationQuestion[] = [
  // Assertive - Express opinions clearly and respectfully
  { id: 1, text: "I express my opinions clearly and directly.", category: 'assertive' },
  { id: 2, text: "When I disagree with others, I express my thoughts respectfully.", category: 'assertive' },
  { id: 3, text: "When declining requests, I say 'no' firmly but politely.", category: 'assertive' },
  { id: 4, text: "Even in conflict situations, I calmly explain my position.", category: 'assertive' },
  { id: 5, text: "I assert my rights while respecting others' rights.", category: 'assertive' },
  { id: 6, text: "I express emotions honestly without blaming others.", category: 'assertive' },
  { id: 7, text: "When problems arise, I actively discuss to find solutions.", category: 'assertive' },

  // Passive - Tend not to express opinions and accommodate others
  { id: 8, text: "I tend not to express my opinions to avoid conflict.", category: 'passive' },
  { id: 9, text: "It's easier for me to go along with what others want.", category: 'passive' },
  { id: 10, text: "I find it difficult to decline requests even when I don't want to.", category: 'passive' },
  { id: 11, text: "I tend to endure and let things go even when I have complaints.", category: 'passive' },
  { id: 12, text: "I prioritize others' opinions over my own.", category: 'passive' },
  { id: 13, text: "Even when angry, I don't express it and suppress it internally.", category: 'passive' },
  { id: 14, text: "I find it difficult to make eye contact or raise my voice during conversations.", category: 'passive' },

  // Aggressive - Assert opinions forcefully and disregard others
  { id: 15, text: "I tend to strongly assert that my opinion is correct.", category: 'aggressive' },
  { id: 16, text: "I interrupt others to speak first.", category: 'aggressive' },
  { id: 17, text: "When angry, I yell or use blaming words.", category: 'aggressive' },
  { id: 18, text: "I pressure others to get what I want.", category: 'aggressive' },
  { id: 19, text: "I think others' opinions aren't very important.", category: 'aggressive' },
  { id: 20, text: "Winning arguments is important to me.", category: 'aggressive' },
  { id: 21, text: "When others make mistakes, I criticize and point them out.", category: 'aggressive' },

  // Passive-Aggressive - Express dissatisfaction indirectly and in roundabout ways
  { id: 22, text: "When dissatisfied, I show it through actions rather than speaking directly.", category: 'passiveAggressive' },
  { id: 23, text: "When angry, I deliberately delay work or pretend to forget.", category: 'passiveAggressive' },
  { id: 24, text: "I often outwardly agree but inwardly oppose.", category: 'passiveAggressive' },
  { id: 25, text: "I express dissatisfaction through sarcasm or cynical remarks.", category: 'passiveAggressive' },
  { id: 26, text: "I say 'I'm fine' but I'm actually angry.", category: 'passiveAggressive' },
  { id: 27, text: "I resist by breaking promises or showing up late.", category: 'passiveAggressive' },
  { id: 28, text: "Instead of refusing directly, I make excuses.", category: 'passiveAggressive' },
];

export const communicationStyleDescriptions: Record<CommunicationStyle, CommunicationStyleInfo> = {
  assertive: {
    name: "Assertive",
    nameKo: "Assertive Communication",
    description: "The healthiest communication style that expresses thoughts and feelings clearly while respecting others.",
    detailedDescription: "Assertive communication is the most effective and healthy communication style. People with this style express their opinions, needs, and emotions clearly and directly while respecting others' rights and feelings. They maintain composure even in conflict situations and convey their position without blame or attack. They express their feelings using 'I-messages' and listen to others' perspectives. They can decline requests and ask for help when needed. They maintain a confident posture and stable voice tone, making eye contact during conversations. They are problem-solving oriented and strive to find win-win solutions. This communication style is typically exhibited by people with high self-esteem, clear boundaries with others, and excellent emotional regulation abilities.",
    psychologicalBackground: "Assertive communication is a concept systematized by psychologists Robert Alberti and Michael Emmons in the 1970s. Research shows that assertive communication has strong positive correlations with self-esteem, interpersonal relationship satisfaction, and mental health. Assertiveness training is a core element in Cognitive Behavioral Therapy (CBT) and Social Skills Training (SST), and many studies show that assertiveness training improves anxiety, depression, and interpersonal problems. Neuroscience research has revealed that assertive communication is associated with emotional regulation functions in the prefrontal cortex and has the effect of lowering stress hormone levels.",
    strengths: [
      "Minimizes misunderstandings and conflicts through clear and direct communication",
      "Forms healthy relationships by respecting both self and others",
      "Maintains self-esteem by effectively communicating needs and boundaries",
      "Resolves conflicts constructively and finds win-win solutions",
      "Manages stress and anger by expressing emotions appropriately"
    ],
    weaknesses: [
      "May sometimes feel overly direct and make others uncomfortable",
      "People unfamiliar with assertive communication may mistake you for being aggressive",
      "May stick to principles when flexibility is needed depending on the situation",
      "Assertive communication is not welcomed in all cultures"
    ],
    improvementTips: [
      "Adjust your communication style considering cultural context",
      "Observe others' reactions and flexibly modify your approach when necessary",
      "Show empathy by acknowledging others' feelings before direct expression",
      "Continue to refine listening skills and strive to understand others' perspectives"
    ],
    exampleSituations: [
      "When opinions differ in a meeting: \"I have a different perspective. My thoughts are...\"",
      "When receiving an unreasonable request: \"I cannot do that task. How about this alternative approach?\"",
      "When expressing emotions: \"When you didn't keep your promise, I felt disappointed.\"",
      "When receiving praise: \"Thank you. I worked hard to prepare.\""
    ],
    color: "from-green-500 to-emerald-500",
  },
  passive: {
    name: "Passive",
    nameKo: "Passive Communication",
    description: "A communication style that struggles to express opinions or feelings and prioritizes others' needs.",
    detailedDescription: "People with a passive communication style have difficulty expressing their opinions, needs, and emotions. They give up their rights to avoid conflict and prioritize others' needs. They struggle to say 'no' and cannot refuse even unwanted tasks. They tend to suppress complaints or anger rather than expressing them, which accumulates frustration and resentment over time. During conversations, they avoid eye contact, speak softly, and show passive nonverbal signals such as hunching their bodies. They often think others' opinions are more important than their own and typically have low self-esteem. While they may avoid conflict in the short term, in the long term, their needs go unmet, they may be taken advantage of by others, and relationships become imbalanced. Accumulated internal dissatisfaction can lead to problems such as depression, anxiety, and anger outbursts.",
    psychologicalBackground: "Passive communication is associated with low self-esteem, fear of rejection, and anxiety about being criticized. According to developmental psychology research, passive communication patterns can form in environments where childhood opinion expression was suppressed or ignored, or in critical or controlling parenting environments. It can also be associated with social anxiety disorder or depression. Long-term passive communication is linked to increased stress hormones, increased cardiovascular disease risk, and mental health problems. Fortunately, these patterns can be changed through assertiveness training, and many studies have proven its effectiveness.",
    strengths: [
      "Strives to avoid conflict and maintain a harmonious atmosphere",
      "Sensitive to others' needs and considerate",
      "Humble and cooperative, does not create conflict in teams",
      "Listens well to and accepts others' opinions"
    ],
    weaknesses: [
      "Own needs are continually ignored, leading to accumulated frustration and anger",
      "May be taken advantage of or receive unfair treatment from others",
      "Creates imbalance in relationships and makes it difficult to form genuine intimacy",
      "Failure to express opinions leads to misunderstandings and unresolved problems",
      "May experience decreased self-esteem and psychological problems such as depression and anxiety"
    ],
    improvementTips: [
      "Start small: Express preferences in low-pressure situations like ordering coffee",
      "Practice 'I-messages': \"I would like to...\", \"I need...\"",
      "Practice refusing: Practice saying 'no' in front of a mirror",
      "Recognize your rights: You have the right to have opinions and to refuse",
      "Consider assertiveness training programs or counseling"
    ],
    exampleSituations: [
      "When receiving a request: \"Um... well... (doesn't want to but eventually accepts)\"",
      "When opinions differ: \"Oh, yes... that might be right... (inwardly disagrees)\"",
      "When receiving unfair treatment: (says nothing and endures)",
      "When receiving praise: \"No, it's nothing... (undervalues self)\""
    ],
    color: "from-blue-400 to-cyan-400",
  },
  aggressive: {
    name: "Aggressive",
    nameKo: "Aggressive Communication",
    description: "A communication style that forcefully asserts one's opinions while disregarding others' rights or feelings.",
    detailedDescription: "People with an aggressive communication style strongly assert their needs and opinions even while violating others' rights. They ignore or devalue others' opinions and feelings, imposing their own way. They use aggressive language during conversations, such as yelling, blaming, or threatening. They interrupt others, try to speak only for themselves, and consider winning arguments important. They show threatening nonverbal signals such as loud voice, staring, and invasive body posture. While they may get what they want in the short term, in the long term they damage relationships, lose trust, and drive people away. This style often stems from inner anxiety, low self-esteem, need for control, and anger management issues. Many are unaware that they are aggressive and rationalize their behavior as being 'direct' or 'honest.'",
    psychologicalBackground: "Aggressive communication is associated with several psychological factors. Some result from learning by observing aggressive role models in childhood, while others are related to anger management disorders, impulse control problems, and narcissistic personality traits. Research shows that aggressive communication may result from excessive activation of the fight-or-flight response in stressful situations and is associated with amygdala hypersensitivity and decreased regulatory function of the prefrontal cortex. Long-term aggressive communication is associated with destroyed interpersonal relationships, occupational problems, legal issues, and increased cardiovascular disease risk. Anger management programs and cognitive behavioral therapy have been proven as effective intervention methods.",
    strengths: [
      "Communicates opinions clearly and strongly",
      "Makes quick decisions and acts in crisis situations",
      "Expresses needs directly without hiding them",
      "Can defend themselves against others' attacks"
    ],
    weaknesses: [
      "Hurts others and damages relationships",
      "Loses trust and people avoid you",
      "Amplifies conflicts and makes it difficult to find collaborative solutions",
      "May cause legal and occupational problems",
      "May be hiding inner anxiety and low self-esteem"
    ],
    improvementTips: [
      "Learn anger management techniques: deep breathing, timeouts, emotion recognition",
      "Think before speaking: Consider how your words will sound to others",
      "Use 'I-messages': Instead of \"You're wrong,\" say \"I feel...\"",
      "Practice listening: Listen to others fully and try to understand",
      "Seek professional help: Consider anger management programs or counseling"
    ],
    exampleSituations: [
      "When opinions differ: \"That's nonsense! You're completely wrong!\"",
      "When receiving a request: \"Why should I do that? You do it!\"",
      "In conflict situations: (yelling) \"Don't ever do that again! I warned you!\"",
      "When receiving criticism: \"What do you know to tell me what to do?\""
    ],
    color: "from-red-500 to-rose-500",
  },
  passiveAggressive: {
    name: "Passive-Aggressive",
    nameKo: "Passive-Aggressive Communication",
    description: "A style that pretends to comply outwardly but expresses resistance and dissatisfaction indirectly and in roundabout ways.",
    detailedDescription: "People with a passive-aggressive communication style express their dissatisfaction or anger indirectly and in roundabout ways rather than directly. They pretend to agree or comply outwardly, but resist through behaviors such as not keeping promises, delaying work, or repeating 'mistakes.' They express dissatisfaction through sarcastic remarks, cynical humor, or complaining behind people's backs. They send contradictory messages, saying 'I'm fine' while clearly being angry. This style stems from internal conflict between wanting to avoid direct confrontation while simultaneously wanting to express dissatisfaction. It can also manifest as attempts to manipulate or control others. Passive-aggressive behavior destroys trust in relationships, makes conflicts more complex, and prevents genuine resolution. People around you feel confused and frustrated and find it difficult to understand your true intentions.",
    psychologicalBackground: "Passive-aggressive communication develops in environments where direct anger expression was learned to be forbidden or dangerous. These patterns can form from experiences where emotional expression was suppressed or punished in childhood, or when raised under authoritarian or controlling parents. Psychologically, it can be viewed as a coping mechanism for suppressed anger, low assertiveness, and power imbalance situations. In previous versions of the DSM, it was even classified as passive-aggressive personality disorder. These patterns are associated with interpersonal problems, occupational difficulties, and chronic dissatisfaction. Through cognitive behavioral therapy and assertiveness training, one can learn more direct and healthy communication methods.",
    strengths: [
      "Feels comfortable in the short term by avoiding direct conflict",
      "Finds subtle methods of resistance in authoritarian situations",
      "Appears cooperative outwardly, avoiding immediate criticism",
      "Hides true feelings, not showing vulnerability"
    ],
    weaknesses: [
      "Loses trust and relationships are destroyed",
      "Prevents genuine problem solving and prolongs conflicts",
      "People around you feel confused and frustrated",
      "You are also unsatisfied and inner anger continues to accumulate",
      "May be perceived as cowardly or untrustworthy"
    ],
    improvementTips: [
      "Recognize and acknowledge your true feelings",
      "Practice direct communication: Express dissatisfaction in an honest and respectful way",
      "Practice saying directly: \"I am uncomfortable with...\", \"I want...\"",
      "Keep your promises, or if you cannot, refuse clearly in advance",
      "Learn healthy conflict resolution methods through assertiveness training or counseling"
    ],
    exampleSituations: [
      "When receiving a request: \"Yes, I'll do it\" (but keeps postponing or 'forgetting')\"",
      "When angry: \"No, I'm fine\" (but expression and attitude are clearly angry)",
      "When opinions differ: \"You're right, whatever\" (in a sarcastic tone)",
      "In conflict situations: (doesn't respond directly, but complains or gossips behind their back)"
    ],
    color: "from-purple-500 to-pink-500",
  },
};

export const calculateCommunicationStyle = (answers: Record<number, AnswerValue>): { style: CommunicationStyle; scores: Record<CommunicationStyle, number> } => {
  const styleScores: Record<CommunicationStyle, { sum: number; count: number }> = {
    assertive: { sum: 0, count: 0 },
    passive: { sum: 0, count: 0 },
    aggressive: { sum: 0, count: 0 },
    passiveAggressive: { sum: 0, count: 0 },
  };

  communicationQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      styleScores[question.category].sum += answer;
      styleScores[question.category].count++;
    }
  });

  // Calculate average score for each style
  const scores: Record<CommunicationStyle, number> = {
    assertive: styleScores.assertive.count > 0 ? Math.round((styleScores.assertive.sum / styleScores.assertive.count) * 20) : 0,
    passive: styleScores.passive.count > 0 ? Math.round((styleScores.passive.sum / styleScores.passive.count) * 20) : 0,
    aggressive: styleScores.aggressive.count > 0 ? Math.round((styleScores.aggressive.sum / styleScores.aggressive.count) * 20) : 0,
    passiveAggressive: styleScores.passiveAggressive.count > 0 ? Math.round((styleScores.passiveAggressive.sum / styleScores.passiveAggressive.count) * 20) : 0,
  };

  // Find the style with the highest score
  const dominantStyle = (Object.entries(scores) as [CommunicationStyle, number][])
    .reduce((max, [style, score]) => score > max[1] ? [style, score] : max, ['assertive' as CommunicationStyle, 0])[0];

  return { style: dominantStyle, scores };
};

// FAQ Data for Result Page
export const communicationStyleFAQs = [
  {
    question: "Can I change my communication style?",
    answer: "Absolutely! Communication style is a learned behavior, not a fixed personality trait. While you may have developed certain patterns over time, you can learn new communication skills through awareness, practice, and sometimes professional guidance. Assertiveness training, communication workshops, and therapy can all help you develop healthier communication patterns. Start by recognizing your current patterns and consciously practicing new approaches in low-stakes situations."
  },
  {
    question: "Why do I use different communication styles with different people?",
    answer: "It's completely normal to adapt your communication style depending on context, relationship dynamics, and power structures. You might be assertive with friends but passive with authority figures, or vice versa. This flexibility shows social awareness, but if you notice extreme differences or always suppressing your needs in certain relationships, it may indicate areas where boundary-setting or communication skills development would be beneficial."
  },
  {
    question: "Is assertive communication the same as being aggressive?",
    answer: "No, they're fundamentally different. Assertive communication expresses your needs while respecting others' rights and feelings. It's direct but kind, firm but flexible. Aggressive communication violates others' rights, disregards their feelings, and often involves hostility or domination. Think of it this way: assertive says 'I need this,' while aggressive says 'You must give me this or else.'"
  },
  {
    question: "How can I deal with someone who has an aggressive communication style?",
    answer: "Stay calm and don't mirror their aggression. Use assertive techniques: maintain steady eye contact, speak in a calm firm voice, and use 'I' statements. Set clear boundaries ('I'm willing to discuss this when we can speak respectfully'). Don't take their behavior personally - it often reflects their own issues. If the behavior is abusive or creates an unsafe environment, remove yourself from the situation and seek support."
  },
  {
    question: "What if my workplace or culture doesn't value assertive communication?",
    answer: "Cultural context matters significantly in communication. Some cultures value indirect communication, hierarchy, and harmony over directness. In these contexts, adapt your assertiveness to be culturally appropriate - you can still advocate for your needs while using culturally respectful methods. This might mean using more indirect language, involving intermediaries, or choosing timing carefully. The goal is finding ways to honor both your needs and cultural norms."
  },
  {
    question: "How do I help my child develop assertive communication skills?",
    answer: "Model assertive behavior yourself, as children learn most from observation. Encourage them to express feelings using 'I' statements. Teach them it's okay to say no and respect when they set boundaries with you. Role-play challenging social situations. Validate their emotions while guiding them toward respectful expression. Praise them when they communicate assertively, and avoid criticizing or punishing them for expressing their needs appropriately."
  }
];

// Celebrity Comparisons for Result Page
export const communicationStyleCelebrities = [
  {
    name: "Oprah Winfrey",
    score: 85,
    description: "Known for assertive yet empathetic communication, expressing views clearly while creating safe space for others.",
    style: "assertive" as CommunicationStyle,
    avatar: "👑"
  },
  {
    name: "Brené Brown",
    score: 88,
    description: "Demonstrates vulnerable and assertive communication, openly discussing difficult topics with courage and respect.",
    style: "assertive" as CommunicationStyle,
    avatar: "📚"
  },
  {
    name: "Mr. Rogers (Fred Rogers)",
    score: 90,
    description: "Master of gentle assertive communication, expressing important messages with kindness and unwavering respect.",
    style: "assertive" as CommunicationStyle,
    avatar: "🎭"
  },
  {
    name: "Keanu Reeves",
    score: 55,
    description: "Often described as humble and soft-spoken, known for listening more than speaking and avoiding confrontation.",
    style: "passive" as CommunicationStyle,
    avatar: "🎬"
  },
  {
    name: "Steve Jobs",
    score: 40,
    description: "Famous for intense, demanding communication style that often prioritized results over interpersonal harmony.",
    style: "aggressive" as CommunicationStyle,
    avatar: "🍎"
  },
  {
    name: "Gordon Ramsay",
    score: 35,
    description: "Widely known for direct, aggressive communication in professional settings, though reportedly different in private.",
    style: "aggressive" as CommunicationStyle,
    avatar: "👨‍🍳"
  },
  {
    name: "Barack Obama",
    score: 82,
    description: "Exemplifies measured, assertive communication with ability to address conflict while maintaining composure.",
    style: "assertive" as CommunicationStyle,
    avatar: "🎖️"
  },
  {
    name: "Malala Yousafzai",
    score: 87,
    description: "Demonstrates powerful assertive communication, speaking truth to power while maintaining grace and respect.",
    style: "assertive" as CommunicationStyle,
    avatar: "🕊️"
  }
];
