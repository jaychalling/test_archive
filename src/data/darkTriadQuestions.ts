export type DarkTriadTrait = "narcissism" | "machiavellianism" | "psychopathy";

export interface DarkTriadQuestion {
  id: number;
  text: string;
  trait: DarkTriadTrait;
}

// 5-point scale
export type AnswerValue = 1 | 2 | 3 | 4 | 5;

export const answerOptions: { value: AnswerValue; label: string }[] = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

// 27 questions - 9 per trait
export const darkTriadQuestions: DarkTriadQuestion[] = [
  // Narcissism (1-9)
  {
    id: 1,
    text: "I tend to want others to admire me.",
    trait: "narcissism",
  },
  {
    id: 2,
    text: "I tend to seek prestige or status.",
    trait: "narcissism",
  },
  {
    id: 3,
    text: "I tend to expect special favors from others.",
    trait: "narcissism",
  },
  {
    id: 4,
    text: "I like to get acquainted with important people.",
    trait: "narcissism",
  },
  {
    id: 5,
    text: "I feel that I deserve more respect than the average person.",
    trait: "narcissism",
  },
  {
    id: 6,
    text: "I am likely to show off if I get the chance.",
    trait: "narcissism",
  },
  {
    id: 7,
    text: "I have been compared to famous people.",
    trait: "narcissism",
  },
  {
    id: 8,
    text: "I insist on getting the respect that is due to me.",
    trait: "narcissism",
  },
  {
    id: 9,
    text: "I know that I am special because everyone keeps telling me so.",
    trait: "narcissism",
  },

  // Machiavellianism (10-18)
  {
    id: 10,
    text: "It's not wise to tell your secrets.",
    trait: "machiavellianism",
  },
  {
    id: 11,
    text: "I like to use clever manipulation to get my way.",
    trait: "machiavellianism",
  },
  {
    id: 12,
    text: "Whatever it takes, you must get the important people on your side.",
    trait: "machiavellianism",
  },
  {
    id: 13,
    text: "Avoid direct conflict with others because they may be useful in the future.",
    trait: "machiavellianism",
  },
  {
    id: 14,
    text: "It's wise to keep track of information that you can use against people later.",
    trait: "machiavellianism",
  },
  {
    id: 15,
    text: "You should wait for the right time to get back at people.",
    trait: "machiavellianism",
  },
  {
    id: 16,
    text: "There are things you should hide from other people to preserve your reputation.",
    trait: "machiavellianism",
  },
  {
    id: 17,
    text: "Make sure your plans benefit yourself, not others.",
    trait: "machiavellianism",
  },
  {
    id: 18,
    text: "Most people can be manipulated.",
    trait: "machiavellianism",
  },

  // Psychopathy (19-27)
  {
    id: 19,
    text: "People often say I'm out of control.",
    trait: "psychopathy",
  },
  {
    id: 20,
    text: "I tend to fight against authorities and their rules.",
    trait: "psychopathy",
  },
  {
    id: 21,
    text: "I have never gotten into trouble with the law.",
    trait: "psychopathy",
  },
  {
    id: 22,
    text: "I enjoy having sex with people I hardly know.",
    trait: "psychopathy",
  },
  {
    id: 23,
    text: "I'll say anything to get what I want.",
    trait: "psychopathy",
  },
  {
    id: 24,
    text: "I tend to lack remorse.",
    trait: "psychopathy",
  },
  {
    id: 25,
    text: "I tend to be callous or insensitive.",
    trait: "psychopathy",
  },
  {
    id: 26,
    text: "I tend to be cynical.",
    trait: "psychopathy",
  },
  {
    id: 27,
    text: "I tend to not be too concerned with morality or the morality of my actions.",
    trait: "psychopathy",
  },
];

// Trait descriptions
export interface DarkTriadTraitInfo {
  name: string;
  subtitle: string;
  color: string;
  bgColor: string;
  textColor: string;
  description: string;
  scientificBackground: string;
  highDescription: string;
  moderateDescription: string;
  lowDescription: string;
  highTraits: string[];
  lowTraits: string[];
  healthyExpression: string[];
  warningSignsHigh: string[];
  workplaceImplications: string;
  relationshipImplications: string;
  famousExamples: { name: string; note: string }[];
}

export const darkTriadDescriptions: Record<DarkTriadTrait, DarkTriadTraitInfo> = {
  narcissism: {
    name: "Narcissism",
    subtitle: "Self-Focus & Grandiosity",
    color: "bg-rose-500",
    bgColor: "from-rose-500/10 to-pink-500/10",
    textColor: "text-rose-500",
    description: "The tendency toward self-admiration, desire for attention, and sense of superiority over others.",
    scientificBackground: "Narcissism in the Dark Triad context refers to subclinical narcissistic traits, distinct from Narcissistic Personality Disorder. Research by Paulhus and Williams (2002) identified it as characterized by grandiosity, entitlement, dominance, and superiority. Unlike clinical NPD, subclinical narcissism can manifest as confidence and ambition. Studies show moderate narcissism correlates with leadership emergence, while extreme levels predict relationship difficulties and exploitative behavior.",
    highDescription: "You show elevated narcissistic tendencies. You likely have strong self-confidence and enjoy being the center of attention. While this can drive ambition and leadership, be mindful of how your need for admiration affects your relationships. High narcissism can sometimes blind us to others' needs and perspectives.",
    moderateDescription: "You show moderate narcissistic traits, suggesting a healthy level of self-confidence without excessive self-focus. You can appreciate recognition without constantly seeking it, and you balance self-interest with consideration for others.",
    lowDescription: "You show low narcissistic tendencies. You tend to be humble and may prioritize others' needs over recognition for yourself. While this can make you well-liked, ensure you're also advocating for yourself when appropriate.",
    highTraits: [
      "Strong self-confidence and self-belief",
      "Comfortable in leadership roles",
      "Enjoys recognition and admiration",
      "Ambitious and goal-oriented",
      "Charismatic and socially skilled",
      "May expect special treatment"
    ],
    lowTraits: [
      "Humble and self-effacing",
      "Comfortable letting others shine",
      "May undervalue own contributions",
      "Prefers collaboration over competition",
      "Values others' opinions highly",
      "May struggle with self-promotion"
    ],
    healthyExpression: [
      "Confidence that doesn't require constant external validation",
      "Leadership that elevates others, not just yourself",
      "Celebrating achievements while remaining open to feedback",
      "Balancing self-advocacy with genuine interest in others"
    ],
    warningSignsHigh: [
      "Difficulty accepting criticism or feedback",
      "Exploiting relationships for personal gain",
      "Inability to recognize others' perspectives",
      "Frequent conflicts due to entitlement"
    ],
    workplaceImplications: "High narcissism can drive career ambition and help you emerge as a leader. However, it may also create conflicts with colleagues who feel undervalued. The key is channeling confidence into collaborative success rather than personal glory at others' expense.",
    relationshipImplications: "In relationships, narcissistic tendencies can manifest as needing constant admiration or struggling when your partner receives attention. Healthy relationships require genuine interest in your partner's experiences and needs, not just your own.",
    famousExamples: [
      { name: "Steve Jobs", note: "Channeled grandiosity into visionary leadership" },
      { name: "Madonna", note: "Used self-confidence to build an iconic career" }
    ]
  },
  machiavellianism: {
    name: "Machiavellianism",
    subtitle: "Strategic Manipulation",
    color: "bg-violet-500",
    bgColor: "from-violet-500/10 to-purple-500/10",
    textColor: "text-violet-500",
    description: "The tendency toward strategic thinking, manipulation, and prioritizing personal gain through calculated social tactics.",
    scientificBackground: "Named after Niccolò Machiavelli's political philosophy, this trait involves strategic manipulation and cynical worldview. Christie and Geis (1970) developed the original Mach-IV scale. Research shows Machiavellians excel at reading social situations and exploiting them, but score lower on emotional intelligence tests. They tend to be pragmatic rather than idealistic, viewing manipulation as a necessary tool. Moderate levels correlate with negotiation success and political acumen.",
    highDescription: "You show elevated Machiavellian tendencies. You're likely skilled at reading social situations and strategically navigating them. While this can be advantageous in competitive environments, be cautious of becoming too calculating - genuine connections require vulnerability that strategic thinking can undermine.",
    moderateDescription: "You show moderate Machiavellian traits, suggesting you can be strategic when needed without being primarily manipulative. You understand social dynamics and can navigate complex situations while maintaining genuine relationships.",
    lowDescription: "You show low Machiavellian tendencies. You tend to be straightforward and trusting, preferring honest interactions over strategic maneuvering. While this authenticity is valuable, be aware that others may not always share your transparency.",
    highTraits: [
      "Strategic and calculating in social situations",
      "Skilled at reading people's motivations",
      "Pragmatic and goal-oriented",
      "Maintains emotional distance",
      "Patient in pursuing long-term goals",
      "Adaptable in approach based on situation"
    ],
    lowTraits: [
      "Transparent and straightforward",
      "Trusts others by default",
      "Values honesty over strategy",
      "May struggle in political environments",
      "Prefers direct communication",
      "Emotionally open with others"
    ],
    healthyExpression: [
      "Strategic thinking that doesn't harm others",
      "Negotiation skills used for mutual benefit",
      "Political awareness without exploitation",
      "Protecting yourself while respecting others' autonomy"
    ],
    warningSignsHigh: [
      "Viewing all relationships as transactional",
      "Chronic distrust of others' motives",
      "Using deception as a primary tool",
      "Inability to form genuine connections"
    ],
    workplaceImplications: "Machiavellian traits can help you navigate office politics and negotiate effectively. However, if colleagues perceive you as manipulative, you may face trust issues. The most successful approach combines strategic awareness with genuine collaboration.",
    relationshipImplications: "High Machiavellianism can make it difficult to form deep, trusting relationships. Partners may sense your strategic approach and feel unable to fully trust you. Genuine intimacy requires dropping the calculating mindset.",
    famousExamples: [
      { name: "Frank Underwood (House of Cards)", note: "Fictional example of extreme strategic manipulation" },
      { name: "Machiavelli himself", note: "Political philosopher who advocated strategic pragmatism" }
    ]
  },
  psychopathy: {
    name: "Psychopathy",
    subtitle: "Emotional Detachment",
    color: "bg-slate-500",
    bgColor: "from-slate-500/10 to-gray-500/10",
    textColor: "text-slate-500",
    description: "The tendency toward emotional detachment, impulsivity, and reduced empathy or remorse for actions that harm others.",
    scientificBackground: "Subclinical psychopathy in the Dark Triad differs from clinical psychopathy (ASPD). It includes reduced empathy, thrill-seeking, and emotional detachment. Hare's research distinguishes primary psychopathy (emotional deficits) from secondary (impulsive, anxious). Subclinical levels may correlate with fearlessness that helps in high-pressure careers. However, the reduced empathy and remorse can significantly impact relationships and ethical decision-making.",
    highDescription: "You show elevated psychopathic tendencies. You likely remain calm under pressure and aren't easily swayed by emotions. While this can be advantageous in crisis situations, be mindful that reduced empathy can harm your relationships and lead to decisions that negatively impact others.",
    moderateDescription: "You show moderate psychopathic traits, suggesting you can be emotionally resilient without being cold. You balance logical thinking with empathy, able to make tough decisions while still considering their impact on others.",
    lowDescription: "You show low psychopathic tendencies, indicating high empathy and emotional sensitivity. You deeply consider how your actions affect others and may feel strong remorse when you cause harm. This emotional awareness enriches your relationships.",
    highTraits: [
      "Calm under pressure and stress",
      "Makes decisions without emotional interference",
      "Thrill-seeking and risk-tolerant",
      "Charismatic and charming on surface",
      "Low anxiety and fear response",
      "Quick to act and adapt"
    ],
    lowTraits: [
      "Highly empathetic and sensitive",
      "Strong moral conscience",
      "Feels deep remorse for mistakes",
      "Risk-averse and cautious",
      "Considers others' feelings in decisions",
      "May struggle with tough decisions"
    ],
    healthyExpression: [
      "Emotional resilience without coldness",
      "Courage and composure in crises",
      "Objective decision-making that still considers ethics",
      "Appropriate boundaries without emotional detachment"
    ],
    warningSignsHigh: [
      "Consistently disregarding others' feelings",
      "Pattern of lying or deceiving others",
      "Lack of remorse for harmful actions",
      "Impulsive behavior with negative consequences"
    ],
    workplaceImplications: "Low anxiety and emotional resilience can help in high-pressure careers like surgery, emergency response, or leadership. However, if colleagues perceive you as cold or uncaring, it can undermine teamwork and trust.",
    relationshipImplications: "Reduced empathy makes it difficult to understand and respond to partners' emotional needs. Healthy relationships require emotional attunement that high psychopathy traits can impair.",
    famousExamples: [
      { name: "Surgeon or test pilot", note: "Careers where emotional detachment can be adaptive" },
      { name: "James Bond (fictional)", note: "Coolness under pressure, thrill-seeking" }
    ]
  },
};

export const traitOrder: DarkTriadTrait[] = ["narcissism", "machiavellianism", "psychopathy"];

export interface DarkTriadResult {
  narcissism: number; // 0-100
  machiavellianism: number; // 0-100
  psychopathy: number; // 0-100
}

export const calculateResults = (answers: Record<number, AnswerValue>): DarkTriadResult => {
  const traitScores: Record<DarkTriadTrait, { sum: number; count: number }> = {
    narcissism: { sum: 0, count: 0 },
    machiavellianism: { sum: 0, count: 0 },
    psychopathy: { sum: 0, count: 0 },
  };

  darkTriadQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      // Question 21 is reverse-scored
      const score = question.id === 21 ? 6 - answer : answer;
      traitScores[question.trait].sum += score;
      traitScores[question.trait].count++;
    }
  });

  const calculatePercentage = (sum: number, count: number): number => {
    if (count === 0) return 50;
    const maxPossible = count * 5;
    const minPossible = count * 1;
    return Math.round(((sum - minPossible) / (maxPossible - minPossible)) * 100);
  };

  return {
    narcissism: calculatePercentage(traitScores.narcissism.sum, traitScores.narcissism.count),
    machiavellianism: calculatePercentage(traitScores.machiavellianism.sum, traitScores.machiavellianism.count),
    psychopathy: calculatePercentage(traitScores.psychopathy.sum, traitScores.psychopathy.count),
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

export const darkTriadFAQs = [
  {
    question: "What is the Dark Triad?",
    answer: "The Dark Triad refers to three personality traits that have a 'dark' or antisocial quality: Narcissism (self-admiration and grandiosity), Machiavellianism (strategic manipulation and cynicism), and Psychopathy (emotional detachment and impulsivity). These traits exist on a spectrum, and most people have some level of each. The concept was introduced by Paulhus and Williams in 2002."
  },
  {
    question: "Does a high score mean I'm a bad person?",
    answer: "Not at all. The Dark Triad measures subclinical traits - normal variations that exist in everyone to some degree. Having elevated traits doesn't make you 'bad'; it means you may have certain tendencies that can be both adaptive and maladaptive depending on context. Self-awareness about these traits allows you to channel them constructively."
  },
  {
    question: "Can Dark Triad traits be beneficial?",
    answer: "Yes, in moderation and specific contexts. Narcissism can drive confidence and ambition. Machiavellianism can help in negotiation and strategic planning. Psychopathy's emotional detachment can be useful in high-pressure situations requiring calm decision-making. The key is balance and ethical application."
  },
  {
    question: "Are these traits the same as personality disorders?",
    answer: "No. The Dark Triad measures subclinical traits - normal personality variations. Clinical disorders like Narcissistic Personality Disorder or Antisocial Personality Disorder involve extreme, inflexible patterns that significantly impair functioning. Most people with elevated Dark Triad scores don't have clinical disorders."
  },
  {
    question: "Can Dark Triad traits change over time?",
    answer: "Yes. While these traits show some stability, they can shift based on life experiences, therapy, and intentional personal development. Research shows that increased self-awareness and empathy training can moderate these traits. Major life events can also influence their expression."
  },
  {
    question: "How accurate is this test?",
    answer: "This test is based on research measures but adapted for entertainment and self-reflection. For clinical assessment, you'd need validated instruments administered by professionals. Your results here offer interesting insights but should not be taken as a clinical diagnosis."
  }
];

export const darkTriadCelebrities = [
  {
    name: "Gordon Ramsay",
    score: 55,
    description: "Known for direct, harsh feedback but also genuine passion for mentoring - moderate Dark Triad traits.",
    avatar: "👨‍🍳"
  },
  {
    name: "Mr. Rogers",
    score: 15,
    description: "Exemplified empathy, humility, and genuine care for others - very low Dark Triad traits.",
    avatar: "🎭"
  },
  {
    name: "Jordan Belfort",
    score: 85,
    description: "The 'Wolf of Wall Street' - high narcissism, manipulation, and disregard for consequences.",
    avatar: "🐺"
  },
  {
    name: "Oprah Winfrey",
    score: 35,
    description: "Ambitious and confident but channels it into empowering others - balanced traits.",
    avatar: "👑"
  },
  {
    name: "Walter White (Breaking Bad)",
    score: 75,
    description: "Fictional character showing pride, manipulation, and emotional coldness developing over time.",
    avatar: "⚗️"
  },
  {
    name: "Keanu Reeves",
    score: 20,
    description: "Known for exceptional humility, kindness, and genuine care for others.",
    avatar: "🎬"
  }
];

// Overall Dark Triad assessment
export interface DarkTriadProfile {
  overallScore: number;
  primaryTrait: DarkTriadTrait;
  summary: string;
  interpretation: string;
}

export const getDarkTriadProfile = (result: DarkTriadResult): DarkTriadProfile => {
  const overallScore = Math.round((result.narcissism + result.machiavellianism + result.psychopathy) / 3);

  const traits: { trait: DarkTriadTrait; score: number }[] = [
    { trait: "narcissism", score: result.narcissism },
    { trait: "machiavellianism", score: result.machiavellianism },
    { trait: "psychopathy", score: result.psychopathy },
  ];
  const primaryTrait = traits.sort((a, b) => b.score - a.score)[0].trait;

  let summary = "";
  let interpretation = "";

  if (overallScore < 30) {
    summary = "You show low Dark Triad traits overall. You tend to be empathetic, straightforward, and considerate of others.";
    interpretation = "Your low scores suggest a genuinely caring and humble personality. You likely prioritize others' wellbeing and prefer honest interactions over strategic maneuvering. While this makes you trustworthy and likeable, ensure you're also advocating for your own needs and interests when appropriate.";
  } else if (overallScore < 50) {
    summary = "You show moderate Dark Triad traits - a balanced profile that can adapt to different situations.";
    interpretation = "Your moderate scores indicate a balanced personality. You can be strategic when needed without being primarily manipulative. You have healthy self-confidence without excessive narcissism. You can make tough decisions while still considering their impact on others. This balance serves you well in navigating life's complexities.";
  } else if (overallScore < 70) {
    summary = "You show elevated Dark Triad traits, suggesting a more self-focused and strategic approach to life.";
    interpretation = "Your elevated scores indicate tendencies toward self-focus, strategic thinking, and emotional resilience. While these traits can drive success in competitive environments, be mindful of their impact on your relationships. Genuine connections require vulnerability and empathy that high Dark Triad traits can undermine.";
  } else {
    summary = "You show high Dark Triad traits overall, indicating strong self-focus, strategic thinking, and emotional detachment.";
    interpretation = "Your high scores suggest a significantly self-focused and strategic personality. While this can be advantageous in certain contexts, it may create challenges in forming genuine relationships and making ethical decisions. Consider how your approach affects others and whether it truly serves your long-term interests.";
  }

  return { overallScore, primaryTrait, summary, interpretation };
};
