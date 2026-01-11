export interface MentalAgeQuestion {
  id: number;
  text: string;
  category: "maturity" | "playfulness" | "wisdom" | "curiosity" | "responsibility";
  options: {
    text: string;
    agePoints: number; // Points that affect mental age calculation
  }[];
}

export const mentalAgeQuestions: MentalAgeQuestion[] = [
  // Maturity questions (1-6)
  {
    id: 1,
    text: "When someone criticizes you unfairly, how do you usually react?",
    category: "maturity",
    options: [
      { text: "I get angry and argue back immediately", agePoints: -5 },
      { text: "I feel hurt but try to ignore it", agePoints: 0 },
      { text: "I consider if there's any truth to it before responding", agePoints: 5 },
      { text: "I calmly explain my perspective and move on", agePoints: 10 },
    ],
  },
  {
    id: 2,
    text: "How do you handle unexpected changes to your plans?",
    category: "maturity",
    options: [
      { text: "I get frustrated and have trouble adapting", agePoints: -5 },
      { text: "I complain but eventually adjust", agePoints: 0 },
      { text: "I take a moment to reassess and adapt", agePoints: 5 },
      { text: "I embrace change as part of life", agePoints: 10 },
    ],
  },
  {
    id: 3,
    text: "When you make a mistake, what's your first response?",
    category: "maturity",
    options: [
      { text: "I try to hide it or blame others", agePoints: -10 },
      { text: "I feel embarrassed and dwell on it", agePoints: -5 },
      { text: "I acknowledge it and try to fix it", agePoints: 5 },
      { text: "I own it, learn from it, and move forward", agePoints: 10 },
    ],
  },
  {
    id: 4,
    text: "How do you typically handle disagreements with friends or family?",
    category: "maturity",
    options: [
      { text: "I avoid the conflict entirely", agePoints: -5 },
      { text: "I insist on being right", agePoints: -5 },
      { text: "I try to find a compromise", agePoints: 5 },
      { text: "I listen first, then share my perspective calmly", agePoints: 10 },
    ],
  },
  {
    id: 5,
    text: "When facing a major life decision, how do you approach it?",
    category: "maturity",
    options: [
      { text: "I let others decide for me", agePoints: -10 },
      { text: "I go with my gut feeling", agePoints: 0 },
      { text: "I research and weigh pros and cons", agePoints: 5 },
      { text: "I consider long-term consequences and seek advice", agePoints: 10 },
    ],
  },
  {
    id: 6,
    text: "How do you react when things don't go your way?",
    category: "maturity",
    options: [
      { text: "I throw a fit or sulk", agePoints: -10 },
      { text: "I feel disappointed for a while", agePoints: 0 },
      { text: "I look for alternative solutions", agePoints: 5 },
      { text: "I accept it and focus on what I can control", agePoints: 10 },
    ],
  },

  // Playfulness questions (7-12)
  {
    id: 7,
    text: "How often do you engage in playful activities or games?",
    category: "playfulness",
    options: [
      { text: "Almost never - I'm too busy for that", agePoints: 10 },
      { text: "Rarely - only on special occasions", agePoints: 5 },
      { text: "Sometimes - when the mood strikes", agePoints: 0 },
      { text: "Often - I love having fun!", agePoints: -5 },
    ],
  },
  {
    id: 8,
    text: "When was the last time you did something spontaneous and silly?",
    category: "playfulness",
    options: [
      { text: "I can't remember - that's not my style", agePoints: 10 },
      { text: "Months ago", agePoints: 5 },
      { text: "Within the last few weeks", agePoints: 0 },
      { text: "Just recently - I do it all the time!", agePoints: -5 },
    ],
  },
  {
    id: 9,
    text: "How do you feel about cartoon shows or animated movies?",
    category: "playfulness",
    options: [
      { text: "They're only for kids", agePoints: 10 },
      { text: "I occasionally watch them with family", agePoints: 5 },
      { text: "I enjoy some of them", agePoints: 0 },
      { text: "I love them and watch them regularly!", agePoints: -10 },
    ],
  },
  {
    id: 10,
    text: "If someone challenges you to a silly dance-off, what would you do?",
    category: "playfulness",
    options: [
      { text: "Absolutely not - too embarrassing", agePoints: 10 },
      { text: "Maybe if no one else is watching", agePoints: 5 },
      { text: "I'd give it a try!", agePoints: 0 },
      { text: "I'd go all in and have a blast!", agePoints: -10 },
    ],
  },
  {
    id: 11,
    text: "How do you feel about theme parks and amusement rides?",
    category: "playfulness",
    options: [
      { text: "Not interested - they're for kids", agePoints: 10 },
      { text: "I can tolerate them for others", agePoints: 5 },
      { text: "I enjoy them occasionally", agePoints: 0 },
      { text: "I absolutely love them!", agePoints: -10 },
    ],
  },
  {
    id: 12,
    text: "When you see a puddle on the ground, what's your instinct?",
    category: "playfulness",
    options: [
      { text: "Walk around it carefully", agePoints: 10 },
      { text: "Step over it", agePoints: 5 },
      { text: "Maybe splash a little if no one's watching", agePoints: 0 },
      { text: "Jump right in!", agePoints: -10 },
    ],
  },

  // Wisdom questions (13-18)
  {
    id: 13,
    text: "How would you describe your approach to learning from past experiences?",
    category: "wisdom",
    options: [
      { text: "I tend to repeat the same mistakes", agePoints: -10 },
      { text: "I sometimes learn, sometimes forget", agePoints: 0 },
      { text: "I actively try to apply lessons learned", agePoints: 5 },
      { text: "I deeply reflect on experiences and grow from them", agePoints: 10 },
    ],
  },
  {
    id: 14,
    text: "When someone shares a different viewpoint, how do you respond?",
    category: "wisdom",
    options: [
      { text: "I dismiss it if it doesn't match mine", agePoints: -10 },
      { text: "I listen but rarely change my mind", agePoints: 0 },
      { text: "I consider it thoughtfully", agePoints: 5 },
      { text: "I appreciate the opportunity to learn something new", agePoints: 10 },
    ],
  },
  {
    id: 15,
    text: "How do you handle uncertain or ambiguous situations?",
    category: "wisdom",
    options: [
      { text: "I panic and need immediate answers", agePoints: -10 },
      { text: "I feel anxious but try to cope", agePoints: 0 },
      { text: "I'm comfortable with some uncertainty", agePoints: 5 },
      { text: "I embrace ambiguity as part of life's complexity", agePoints: 10 },
    ],
  },
  {
    id: 16,
    text: "What's your relationship with your past self?",
    category: "wisdom",
    options: [
      { text: "I regret many past decisions", agePoints: -5 },
      { text: "I try not to think about the past", agePoints: 0 },
      { text: "I appreciate how far I've come", agePoints: 5 },
      { text: "I have compassion for my younger self and their journey", agePoints: 10 },
    ],
  },
  {
    id: 17,
    text: "How do you view failure?",
    category: "wisdom",
    options: [
      { text: "As something to be avoided at all costs", agePoints: -10 },
      { text: "As embarrassing but sometimes unavoidable", agePoints: 0 },
      { text: "As a learning opportunity", agePoints: 5 },
      { text: "As essential for growth and success", agePoints: 10 },
    ],
  },
  {
    id: 18,
    text: "When giving advice to others, what approach do you take?",
    category: "wisdom",
    options: [
      { text: "I tell them exactly what to do", agePoints: -5 },
      { text: "I share what worked for me", agePoints: 0 },
      { text: "I help them explore their options", agePoints: 5 },
      { text: "I ask questions to help them find their own answers", agePoints: 10 },
    ],
  },

  // Curiosity questions (19-24)
  {
    id: 19,
    text: "How do you react when you encounter something you don't understand?",
    category: "curiosity",
    options: [
      { text: "I ignore it - not my problem", agePoints: 10 },
      { text: "I might look into it if I have time", agePoints: 5 },
      { text: "I'm curious and want to learn more", agePoints: 0 },
      { text: "I get excited and dive deep into understanding it!", agePoints: -5 },
    ],
  },
  {
    id: 20,
    text: "When was the last time you tried learning something completely new?",
    category: "curiosity",
    options: [
      { text: "I can't remember - I stick to what I know", agePoints: 10 },
      { text: "A while ago", agePoints: 5 },
      { text: "Recently - I try to keep learning", agePoints: 0 },
      { text: "I'm always learning something new!", agePoints: -5 },
    ],
  },
  {
    id: 21,
    text: "How do you feel about asking questions?",
    category: "curiosity",
    options: [
      { text: "I avoid it - I don't want to seem dumb", agePoints: 5 },
      { text: "I ask when absolutely necessary", agePoints: 0 },
      { text: "I'm comfortable asking questions", agePoints: -5 },
      { text: "I love asking questions - there's always more to learn!", agePoints: -10 },
    ],
  },
  {
    id: 22,
    text: "What's your attitude toward new technology or trends?",
    category: "curiosity",
    options: [
      { text: "I avoid them - the old ways work fine", agePoints: 10 },
      { text: "I eventually adopt them when necessary", agePoints: 5 },
      { text: "I'm open to trying new things", agePoints: 0 },
      { text: "I'm excited to explore and experiment!", agePoints: -5 },
    ],
  },
  {
    id: 23,
    text: "How would you describe your sense of wonder about the world?",
    category: "curiosity",
    options: [
      { text: "I've seen it all - nothing surprises me", agePoints: 10 },
      { text: "Some things still interest me", agePoints: 5 },
      { text: "I find many things fascinating", agePoints: 0 },
      { text: "I'm constantly amazed by the world!", agePoints: -10 },
    ],
  },
  {
    id: 24,
    text: "When you meet someone new, how interested are you in their story?",
    category: "curiosity",
    options: [
      { text: "Not very - I keep conversations surface-level", agePoints: 5 },
      { text: "Somewhat - if they seem interesting", agePoints: 0 },
      { text: "Usually curious about their experiences", agePoints: -5 },
      { text: "Very! Everyone has a fascinating story to tell", agePoints: -10 },
    ],
  },

  // Responsibility questions (25-30)
  {
    id: 25,
    text: "How do you approach your financial decisions?",
    category: "responsibility",
    options: [
      { text: "I spend without much thought", agePoints: -10 },
      { text: "I try to be careful but often overspend", agePoints: 0 },
      { text: "I budget and plan my expenses", agePoints: 5 },
      { text: "I have long-term financial plans and stick to them", agePoints: 10 },
    ],
  },
  {
    id: 26,
    text: "How reliable are you when you make a commitment?",
    category: "responsibility",
    options: [
      { text: "I often cancel or forget", agePoints: -10 },
      { text: "I try my best but sometimes fall through", agePoints: 0 },
      { text: "I'm generally reliable", agePoints: 5 },
      { text: "My word is my bond - I always follow through", agePoints: 10 },
    ],
  },
  {
    id: 27,
    text: "How do you take care of your health?",
    category: "responsibility",
    options: [
      { text: "I don't think about it much", agePoints: -10 },
      { text: "I try when I remember", agePoints: 0 },
      { text: "I maintain healthy habits most of the time", agePoints: 5 },
      { text: "Health is a priority - I'm proactive about it", agePoints: 10 },
    ],
  },
  {
    id: 28,
    text: "When you have tasks to complete, how do you manage them?",
    category: "responsibility",
    options: [
      { text: "I procrastinate until the last minute", agePoints: -10 },
      { text: "I struggle but eventually get things done", agePoints: 0 },
      { text: "I use lists and stay organized", agePoints: 5 },
      { text: "I plan ahead and complete tasks systematically", agePoints: 10 },
    ],
  },
  {
    id: 29,
    text: "How do you contribute to your household or living space?",
    category: "responsibility",
    options: [
      { text: "I leave things for others to handle", agePoints: -10 },
      { text: "I help when asked", agePoints: 0 },
      { text: "I take responsibility for my share", agePoints: 5 },
      { text: "I proactively maintain and improve our space", agePoints: 10 },
    ],
  },
  {
    id: 30,
    text: "How do you balance work/studies with personal life?",
    category: "responsibility",
    options: [
      { text: "I struggle to manage either well", agePoints: -10 },
      { text: "One often suffers for the other", agePoints: 0 },
      { text: "I try to maintain a reasonable balance", agePoints: 5 },
      { text: "I've developed strategies for healthy work-life balance", agePoints: 10 },
    ],
  },
];

// Mental age result bands
export interface MentalAgeResultBand {
  minAge: number;
  maxAge: number;
  label: string;
  emoji: string;
  meaning: string[];
  traits: string[];
  strengths: string[];
  growthAreas: string[];
  faqs: { q: string; a: string }[];
}

export const mentalAgeResultBands: MentalAgeResultBand[] = [
  {
    minAge: 0,
    maxAge: 15,
    label: "Young at Heart",
    emoji: "🧒",
    meaning: [
      "Your mental age reflects a youthful, carefree spirit! You tend to approach life with enthusiasm, spontaneity, and a refreshing sense of wonder.",
      "This doesn't mean you're immature - rather, you've maintained that childlike ability to find joy in simple things and embrace the moment.",
      "Your playful nature can be a gift, bringing lightness to serious situations and helping others relax and have fun."
    ],
    traits: [
      "Spontaneous and fun-loving",
      "Open to new experiences",
      "Quick to forgive and move on",
      "Enthusiastic about interests",
      "Creative and imaginative",
      "Lives in the present moment",
      "Brings energy to social situations"
    ],
    strengths: [
      "Natural ability to find joy and wonder",
      "Creativity and imaginative thinking",
      "Resilience through optimism",
      "Connecting with others through play"
    ],
    growthAreas: [
      "Developing long-term planning skills",
      "Building consistency in responsibilities",
      "Learning to delay gratification when needed",
      "Balancing spontaneity with stability"
    ],
    faqs: [
      { q: "Is having a young mental age bad?", a: "Not at all! A younger mental age often indicates creativity, optimism, and openness. The key is balancing youthful enthusiasm with practical responsibilities when needed." },
      { q: "Can mental age change over time?", a: "Your mental age can fluctuate based on life experiences, personal growth, and circumstances. It's not fixed and reflects your current mindset." },
      { q: "Why am I so playful compared to others my age?", a: "Playfulness is a valuable trait linked to creativity and stress resilience. You may have maintained this quality while others became more 'serious' with age - both paths have value." }
    ]
  },
  {
    minAge: 16,
    maxAge: 25,
    label: "Emerging Adult",
    emoji: "🌱",
    meaning: [
      "Your mental age reflects someone in an exciting phase of self-discovery and growth. You balance curiosity about the world with developing practical skills.",
      "You're learning to navigate adult responsibilities while still maintaining youthful energy and openness to new possibilities.",
      "This is a dynamic mental space where you're forming your identity and values while building the foundations for your future."
    ],
    traits: [
      "Curious and eager to learn",
      "Developing sense of independence",
      "Open to different perspectives",
      "Balancing fun with responsibility",
      "Building confidence in decisions",
      "Forming meaningful relationships",
      "Exploring identity and values"
    ],
    strengths: [
      "Adaptability to change",
      "Enthusiasm for new experiences",
      "Growing self-awareness",
      "Energy and motivation for goals"
    ],
    growthAreas: [
      "Building emotional regulation skills",
      "Developing financial literacy",
      "Creating sustainable habits",
      "Finding work-life balance"
    ],
    faqs: [
      { q: "Is this mental age typical for my actual age?", a: "This range is common for people in their teens through late twenties, but mental age doesn't need to match chronological age. It reflects your current mindset and approach to life." },
      { q: "How can I develop more maturity?", a: "Maturity develops through experience, reflection, and intentional growth. Taking on responsibilities, learning from mistakes, and seeking diverse perspectives all contribute." },
      { q: "Is it okay to still feel unsure about things?", a: "Absolutely! Uncertainty is normal and even healthy. Being open about not having all the answers shows wisdom and creates space for growth." }
    ]
  },
  {
    minAge: 26,
    maxAge: 40,
    label: "Balanced Adult",
    emoji: "⚖️",
    meaning: [
      "Your mental age reflects a healthy balance between youthful enthusiasm and mature wisdom. You've learned important life lessons while maintaining openness to joy and new experiences.",
      "You approach challenges with a blend of practicality and creativity, knowing when to be serious and when to lighten up.",
      "This balanced perspective allows you to navigate life's complexities while still appreciating its simple pleasures."
    ],
    traits: [
      "Balances responsibility with enjoyment",
      "Thoughtful decision-maker",
      "Maintains meaningful relationships",
      "Learns from experience",
      "Adapts to change with resilience",
      "Values both achievement and wellbeing",
      "Growing emotional intelligence"
    ],
    strengths: [
      "Ability to see multiple perspectives",
      "Balancing short and long-term thinking",
      "Building stable relationships",
      "Making informed decisions"
    ],
    growthAreas: [
      "Avoiding becoming too set in ways",
      "Maintaining curiosity and openness",
      "Continuing personal growth",
      "Deepening self-understanding"
    ],
    faqs: [
      { q: "How did I achieve this balanced mental age?", a: "This balance typically comes from a combination of life experiences, self-reflection, and intentional personal development. You've likely learned valuable lessons while staying open to growth." },
      { q: "Can I become 'too mature'?", a: "It's possible to lose touch with playfulness and spontaneity. A truly balanced approach includes making room for joy, creativity, and lightheartedness alongside responsibilities." },
      { q: "What's next in my development?", a: "Continue growing your wisdom while protecting your sense of wonder. The journey of personal development never truly ends - there's always deeper understanding to gain." }
    ]
  },
  {
    minAge: 41,
    maxAge: 55,
    label: "Seasoned Wisdom",
    emoji: "🦉",
    meaning: [
      "Your mental age reflects the wisdom that comes from life experience and deep reflection. You've developed a mature perspective that allows you to navigate challenges with grace.",
      "You understand that life is complex and have made peace with uncertainty. You offer stability and insight to those around you.",
      "This wisdom doesn't mean you've stopped growing - rather, you've developed a solid foundation from which to continue learning and evolving."
    ],
    traits: [
      "Thoughtful and considered in responses",
      "Patient with processes and people",
      "Values quality over quantity",
      "Offers guidance without judgment",
      "Comfortable with ambiguity",
      "Takes responsibility seriously",
      "Appreciates life's deeper meanings"
    ],
    strengths: [
      "Providing calm in crises",
      "Offering valuable perspective",
      "Building lasting relationships",
      "Making wise decisions"
    ],
    growthAreas: [
      "Staying connected to youthful energy",
      "Remaining open to new ideas",
      "Embracing change positively",
      "Avoiding rigidity in thinking"
    ],
    faqs: [
      { q: "Does high mental age mean I'm old-fashioned?", a: "Not necessarily! Mental maturity is about wisdom and perspective, not being outdated. You can be wise while still embracing new ideas and experiences." },
      { q: "How do I stay youthful while being mature?", a: "Make intentional space for play, curiosity, and spontaneity. Wisdom includes knowing when to be serious and when to embrace your inner child." },
      { q: "Should I try to lower my mental age?", a: "It's not about lowering or raising - it's about balance. If you feel too serious, consciously add more playfulness. Your wisdom is valuable; just ensure it doesn't become rigidity." }
    ]
  },
  {
    minAge: 56,
    maxAge: 100,
    label: "Elder Sage",
    emoji: "🧙",
    meaning: [
      "Your mental age reflects deep wisdom and a mature perspective that comes from extensive life reflection. You approach situations with patience and understanding that many aspire to.",
      "You've likely learned that most things aren't worth worrying about, and you focus your energy on what truly matters.",
      "Your perspective can be incredibly valuable to others, offering guidance and stability in uncertain times."
    ],
    traits: [
      "Deeply patient and understanding",
      "Focuses on what truly matters",
      "Offers wisdom without ego",
      "Comfortable with mortality and change",
      "Values meaningful connections",
      "Has made peace with the past",
      "Appreciates life's simple pleasures"
    ],
    strengths: [
      "Providing profound perspective",
      "Remaining calm under any circumstances",
      "Offering unconditional acceptance",
      "Sharing hard-earned wisdom"
    ],
    growthAreas: [
      "Staying engaged with the changing world",
      "Connecting with younger perspectives",
      "Embracing new experiences",
      "Maintaining physical and mental activity"
    ],
    faqs: [
      { q: "Is having such a high mental age unusual?", a: "It's less common but reflects a highly developed sense of wisdom and perspective. This can come from intense life experiences or deep personal reflection." },
      { q: "Am I too serious for my actual age?", a: "Your mental age reflects wisdom, not necessarily seriousness. Ensure you're making space for joy and lightness alongside your mature perspective." },
      { q: "How can I connect with people of different mental ages?", a: "Your wisdom allows you to appreciate all perspectives. Stay curious about others' experiences and share your insights with humility rather than authority." }
    ]
  }
];

export const mentalAgeFAQs = [
  {
    question: "What does mental age mean?",
    answer: "Mental age refers to your psychological and emotional maturity level, which may differ from your chronological (actual) age. It reflects how you think, react to situations, and approach life's challenges. Someone might be 30 years old chronologically but have a mental age of 25 or 45 depending on their life experiences, personality, and mindset."
  },
  {
    question: "Is mental age the same as intelligence?",
    answer: "No, mental age is not about intelligence or IQ. It measures emotional maturity, wisdom, responsibility, and life approach rather than cognitive abilities. A person with a younger mental age can be highly intelligent, while someone with an older mental age might not have exceptional academic abilities. They measure different aspects of human psychology."
  },
  {
    question: "Can my mental age change?",
    answer: "Absolutely! Mental age is not fixed and can change based on life experiences, personal growth, therapy, and intentional development. Major life events, challenges overcome, and conscious efforts to mature can shift your mental age over time. It's a reflection of your current state, not a permanent label."
  },
  {
    question: "Is it better to have a higher or lower mental age?",
    answer: "Neither is inherently better! A balanced mental age that allows for both wisdom and playfulness is often ideal. Lower mental ages bring creativity and joy, while higher bring wisdom and stability. The key is having appropriate responses for different situations - knowing when to be serious and when to embrace fun."
  },
  {
    question: "Why doesn't my mental age match my actual age?",
    answer: "Mental and chronological ages often differ because life experiences affect us uniquely. Early responsibilities might increase mental age, while a protected environment might keep it younger. Neither is wrong - it simply reflects your unique journey and personality. What matters is self-awareness about your tendencies."
  },
  {
    question: "How accurate is this test?",
    answer: "This test provides an entertaining estimate based on your responses about behavior and attitudes. It's designed for self-reflection and fun, not clinical assessment. For genuine concerns about emotional or psychological development, please consult a qualified mental health professional."
  }
];

export const mentalAgeCelebrities = [
  {
    name: "Keanu Reeves",
    score: 52,
    description: "Known for his wisdom, humility, and thoughtful approach to life despite Hollywood success.",
    avatar: "🎬"
  },
  {
    name: "Robin Williams",
    score: 22,
    description: "Maintained incredible playfulness and childlike wonder throughout his life and career.",
    avatar: "🎭"
  },
  {
    name: "Dalai Lama",
    score: 70,
    description: "Embodies deep wisdom and spiritual maturity while maintaining warmth and humor.",
    avatar: "☸️"
  },
  {
    name: "Dwayne Johnson",
    score: 35,
    description: "Balances professional responsibility with playful personality and positivity.",
    avatar: "💪"
  },
  {
    name: "Betty White",
    score: 28,
    description: "Maintained youthful spirit and humor well into her 90s - forever young at heart.",
    avatar: "🌟"
  },
  {
    name: "Michelle Obama",
    score: 45,
    description: "Combines wisdom and gravitas with warmth and ability to connect across generations.",
    avatar: "👑"
  }
];

// Calculate mental age based on answers
export const calculateMentalAge = (answers: Record<number, number>, actualAge: number): number => {
  let totalPoints = 0;

  Object.entries(answers).forEach(([questionId, optionIndex]) => {
    const question = mentalAgeQuestions.find(q => q.id === parseInt(questionId));
    if (question && question.options[optionIndex]) {
      totalPoints += question.options[optionIndex].agePoints;
    }
  });

  // Base mental age starts at actual age, modified by points
  // Points range from about -150 to +150, scaled to adjust age by up to 20 years
  const ageModifier = totalPoints / 7.5; // Dividing by 7.5 scales ±150 to ±20

  let mentalAge = actualAge + ageModifier;

  // Clamp between 10 and 80
  mentalAge = Math.max(10, Math.min(80, mentalAge));

  return Math.round(mentalAge);
};

export const getResultBand = (mentalAge: number): MentalAgeResultBand => {
  for (const band of mentalAgeResultBands) {
    if (mentalAge >= band.minAge && mentalAge <= band.maxAge) {
      return band;
    }
  }
  return mentalAgeResultBands[mentalAgeResultBands.length - 1];
};
