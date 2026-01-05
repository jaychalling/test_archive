// 16 Personality Types Test (16 Personality Style Test)
// 4 Dimensions: E/I, S/N, T/F, J/P

export type Dimension = "EI" | "SN" | "TF" | "JP";

export interface PersonalityQuestion {
  id: number;
  dimension: Dimension;
  optionA: {
    text: string;
    type: "E" | "S" | "T" | "J"; // Type of the first option
  };
  optionB: {
    text: string;
    type: "I" | "N" | "F" | "P"; // Type of the second option
  };
}

export type AnswerChoice = "A" | "B";

// 40 questions (10 per dimension)
export const personalityQuestions: PersonalityQuestion[] = [
  // === E/I (Extraversion/Introversion) - Energy Direction 10 questions ===
  {
    id: 1,
    dimension: "EI",
    optionA: {
      text: "I feel energized when socializing with people.",
      type: "E",
    },
    optionB: {
      text: "I feel energized when I have time alone.",
      type: "I",
    },
  },
  {
    id: 2,
    dimension: "EI",
    optionA: {
      text: "I tend to organize my thoughts while talking.",
      type: "E",
    },
    optionB: {
      text: "I tend to think thoroughly before speaking.",
      type: "I",
    },
  },
  {
    id: 3,
    dimension: "EI",
    optionA: {
      text: "I prefer having a wide variety of friendships.",
      type: "E",
    },
    optionB: {
      text: "I prefer having deep connections with a small number of friends.",
      type: "I",
    },
  },
  {
    id: 4,
    dimension: "EI",
    optionA: {
      text: "I feel energized when attending parties or gatherings.",
      type: "E",
    },
    optionB: {
      text: "After parties or gatherings, I want to rest alone.",
      type: "I",
    },
  },
  {
    id: 5,
    dimension: "EI",
    optionA: {
      text: "I enjoy meeting new people.",
      type: "E",
    },
    optionB: {
      text: "I feel more comfortable spending time with people I already know.",
      type: "I",
    },
  },
  {
    id: 6,
    dimension: "EI",
    optionA: {
      text: "I tend to act first and think later.",
      type: "E",
    },
    optionB: {
      text: "I tend to think thoroughly before acting.",
      type: "I",
    },
  },
  {
    id: 7,
    dimension: "EI",
    optionA: {
      text: "I tend to actively lead conversations.",
      type: "E",
    },
    optionB: {
      text: "I tend to listen to conversations and speak only when necessary.",
      type: "I",
    },
  },
  {
    id: 8,
    dimension: "EI",
    optionA: {
      text: "I am interested in people and activities in the external world.",
      type: "E",
    },
    optionB: {
      text: "I am interested in thoughts and emotions in my inner world.",
      type: "I",
    },
  },
  {
    id: 9,
    dimension: "EI",
    optionA: {
      text: "I am more productive when working in groups.",
      type: "E",
    },
    optionB: {
      text: "I concentrate better when working alone.",
      type: "I",
    },
  },
  {
    id: 10,
    dimension: "EI",
    optionA: {
      text: "I tend to express my thoughts verbally right away.",
      type: "E",
    },
    optionB: {
      text: "I feel more comfortable expressing my thoughts in writing.",
      type: "I",
    },
  },

  // === S/N (Sensing/Intuition) - Information Gathering 10 questions ===
  {
    id: 11,
    dimension: "SN",
    optionA: {
      text: "I focus on present facts and concrete information.",
      type: "S",
    },
    optionB: {
      text: "I focus on future possibilities and meanings.",
      type: "N",
    },
  },
  {
    id: 12,
    dimension: "SN",
    optionA: {
      text: "I tend to trust what I have directly experienced.",
      type: "S",
    },
    optionB: {
      text: "I tend to trust my intuition or inspiration.",
      type: "N",
    },
  },
  {
    id: 13,
    dimension: "SN",
    optionA: {
      text: "I am good at grasping details and specifics.",
      type: "S",
    },
    optionB: {
      text: "I am good at grasping the big picture and patterns.",
      type: "N",
    },
  },
  {
    id: 14,
    dimension: "SN",
    optionA: {
      text: "I prefer practical and realistic approaches.",
      type: "S",
    },
    optionB: {
      text: "I prefer creative and innovative approaches.",
      type: "N",
    },
  },
  {
    id: 15,
    dimension: "SN",
    optionA: {
      text: "I think it is safer to follow proven methods.",
      type: "S",
    },
    optionB: {
      text: "I think it is fun to try new methods.",
      type: "N",
    },
  },
  {
    id: 16,
    dimension: "SN",
    optionA: {
      text: "I prefer handling tasks step by step in order.",
      type: "S",
    },
    optionB: {
      text: "I prefer handling tasks flexibly following my intuition.",
      type: "N",
    },
  },
  {
    id: 17,
    dimension: "SN",
    optionA: {
      text: "I prefer factual and clear information.",
      type: "S",
    },
    optionB: {
      text: "I prefer metaphorical and abstract concepts.",
      type: "N",
    },
  },
  {
    id: 18,
    dimension: "SN",
    optionA: {
      text: "I pay attention to what is happening now.",
      type: "S",
    },
    optionB: {
      text: "I pay attention to what could happen in the future.",
      type: "N",
    },
  },
  {
    id: 19,
    dimension: "SN",
    optionA: {
      text: "I like explaining with specific examples and cases.",
      type: "S",
    },
    optionB: {
      text: "I like explaining with concepts and theories.",
      type: "N",
    },
  },
  {
    id: 20,
    dimension: "SN",
    optionA: {
      text: "I feel comfortable in familiar and stable environments.",
      type: "S",
    },
    optionB: {
      text: "I am stimulated by change and new challenges.",
      type: "N",
    },
  },

  // === T/F (Thinking/Feeling) - Decision Making 10 questions ===
  {
    id: 21,
    dimension: "TF",
    optionA: {
      text: "I make decisions based on logic and analysis.",
      type: "T",
    },
    optionB: {
      text: "I make decisions based on values and emotions.",
      type: "F",
    },
  },
  {
    id: 22,
    dimension: "TF",
    optionA: {
      text: "I think objective facts are important.",
      type: "T",
    },
    optionB: {
      text: "I think people's feelings are important.",
      type: "F",
    },
  },
  {
    id: 23,
    dimension: "TF",
    optionA: {
      text: "I value fairness and principles.",
      type: "T",
    },
    optionB: {
      text: "I value harmony and consideration.",
      type: "F",
    },
  },
  {
    id: 24,
    dimension: "TF",
    optionA: {
      text: "I take criticism as constructive feedback.",
      type: "T",
    },
    optionB: {
      text: "I tend to take criticism personally.",
      type: "F",
    },
  },
  {
    id: 25,
    dimension: "TF",
    optionA: {
      text: "Understanding with the head is more important.",
      type: "T",
    },
    optionB: {
      text: "Empathizing with the heart is more important.",
      type: "F",
    },
  },
  {
    id: 26,
    dimension: "TF",
    optionA: {
      text: "I express my opinions honestly and directly.",
      type: "T",
    },
    optionB: {
      text: "I speak gently, considering the other person's feelings.",
      type: "F",
    },
  },
  {
    id: 27,
    dimension: "TF",
    optionA: {
      text: "Winning the argument is important.",
      type: "T",
    },
    optionB: {
      text: "Maintaining the relationship is more important.",
      type: "F",
    },
  },
  {
    id: 28,
    dimension: "TF",
    optionA: {
      text: "I focus on problem solving.",
      type: "T",
    },
    optionB: {
      text: "I focus on emotional support.",
      type: "F",
    },
  },
  {
    id: 29,
    dimension: "TF",
    optionA: {
      text: "I prioritize work efficiency.",
      type: "T",
    },
    optionB: {
      text: "I prioritize people's satisfaction.",
      type: "F",
    },
  },
  {
    id: 30,
    dimension: "TF",
    optionA: {
      text: "I am told I am cool and objective.",
      type: "T",
    },
    optionB: {
      text: "I am told I am warm and kind.",
      type: "F",
    },
  },

  // === J/P (Judging/Perceiving) - Lifestyle 10 questions ===
  {
    id: 31,
    dimension: "JP",
    optionA: {
      text: "I like making plans and following through with them.",
      type: "J",
    },
    optionB: {
      text: "I like responding flexibly to situations.",
      type: "P",
    },
  },
  {
    id: 32,
    dimension: "JP",
    optionA: {
      text: "I feel more comfortable finishing work before deadlines.",
      type: "J",
    },
    optionB: {
      text: "My concentration peaks right before deadlines.",
      type: "P",
    },
  },
  {
    id: 33,
    dimension: "JP",
    optionA: {
      text: "I feel at ease when things are well organized.",
      type: "J",
    },
    optionB: {
      text: "I am okay with some level of messiness.",
      type: "P",
    },
  },
  {
    id: 34,
    dimension: "JP",
    optionA: {
      text: "I prefer making decisions quickly and moving forward.",
      type: "J",
    },
    optionB: {
      text: "I tend to keep options open and delay decisions.",
      type: "P",
    },
  },
  {
    id: 35,
    dimension: "JP",
    optionA: {
      text: "I feel secure with schedules and rules.",
      type: "J",
    },
    optionB: {
      text: "I feel constrained by schedules and rules.",
      type: "P",
    },
  },
  {
    id: 36,
    dimension: "JP",
    optionA: {
      text: "I set goals and systematically work toward achieving them.",
      type: "J",
    },
    optionB: {
      text: "I freely explore wherever my interests lead me.",
      type: "P",
    },
  },
  {
    id: 37,
    dimension: "JP",
    optionA: {
      text: "Once I start something, I need to see it through to the end.",
      type: "J",
    },
    optionB: {
      text: "I find it fun to work on multiple things simultaneously.",
      type: "P",
    },
  },
  {
    id: 38,
    dimension: "JP",
    optionA: {
      text: "I prefer a predictable and stable life.",
      type: "J",
    },
    optionB: {
      text: "I prefer a spontaneous and varied life.",
      type: "P",
    },
  },
  {
    id: 39,
    dimension: "JP",
    optionA: {
      text: "I always arrive on time for appointments.",
      type: "J",
    },
    optionB: {
      text: "I am sometimes late for appointments.",
      type: "P",
    },
  },
  {
    id: 40,
    dimension: "JP",
    optionA: {
      text: "I like making to-do lists and checking them off.",
      type: "J",
    },
    optionB: {
      text: "I handle tasks naturally without to-do lists.",
      type: "P",
    },
  },
];

// 16 Personality Type Information
export type PersonalityType =
  | "ISTJ" | "ISFJ" | "INFJ" | "INTJ"
  | "ISTP" | "ISFP" | "INFP" | "INTP"
  | "ESTP" | "ESFP" | "ENFP" | "ENTP"
  | "ESTJ" | "ESFJ" | "ENFJ" | "ENTJ";

export interface PersonalityTypeInfo {
  type: PersonalityType;
  name: string;
  nickname: string;
  emoji: string;
  description: string;
  detailedDescription: string;
  scientificBackground: string;
  cognitiveFunctions: {
    dominant: string;
    auxiliary: string;
    tertiary: string;
    inferior: string;
    description: string;
  };
  characteristics: string[];
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  careerDescription: string;
  relationshipStyle: string;
  communicationStyle: string;
  growthStrategies: string[];
  stressResponse: string;
  famousPeople: string[];
  compatibleTypes: PersonalityType[];
  challengingTypes: PersonalityType[];
}

export const personalityTypeInfo: Record<PersonalityType, PersonalityTypeInfo> = {
  ISTJ: {
    type: "ISTJ",
    name: "The Logistician",
    nickname: "The Inspector",
    emoji: "",
    description: "Fact-based thinkers with a strong sense of responsibility and caution. Realists who value tradition and order, diligently carrying out their duties.",
    detailedDescription: "ISTJ is one of the most common personality types, comprising about 11-14% of the general population. They are the backbone of organizations and society, quietly fulfilling their obligations and creating stable environments. ISTJs value past experiences and proven methods, preferring certainty over novelty. Their strong sense of responsibility and reliability makes them invaluable assets in any organization. According to Carl Jung's psychological types, ISTJs use Introverted Sensing (Si) as their dominant function, allowing them to remember past experiences in detail and apply them to current situations.",
    scientificBackground: "The ISTJ type is one of the most well-researched types in the MBTI (Myers-Briggs Type Indicator). Developed by Isabel Briggs Myers and Katharine Cook Briggs based on Carl Jung's psychological types theory, this system has evolved since the 1940s. Research shows that ISTJs demonstrate high job satisfaction and organizational loyalty, performing best in structured environments. From a neuroscience perspective, introverted sensing dominant types tend to show higher activation in hippocampus-related memory processing areas.",
    cognitiveFunctions: {
      dominant: "Introverted Sensing (Si)",
      auxiliary: "Extraverted Thinking (Te)",
      tertiary: "Introverted Feeling (Fi)",
      inferior: "Extraverted Intuition (Ne)",
      description: "ISTJs use Introverted Sensing (Si) to remember and compare past experiences and facts in detail. Their auxiliary function, Extraverted Thinking (Te), helps them build efficient systems and make logical decisions. Their tertiary function, Introverted Feeling (Fi), forms strong personal values, while their inferior function, Extraverted Intuition (Ne), may cause difficulty in exploring new possibilities."
    },
    characteristics: [
      "Reliable and highly responsible",
      "Handles work systematically and organizationally",
      "Respects rules and traditions",
      "Makes judgments based on facts and reality",
      "Patient and consistent",
      "Excellent memory for details",
      "Prefers clear expectations and procedures"
    ],
    strengths: [
      "Outstanding focus and perseverance",
      "Accurate and meticulous work handling",
      "Keeps promises thoroughly",
      "Stable and trustworthy",
      "Strong work ethic and dedication",
      "Practical problem-solving abilities"
    ],
    weaknesses: [
      "Takes time to adapt to change",
      "May struggle with emotional expression",
      "Can lack flexibility",
      "May overlook others' feelings",
      "Can be skeptical of new ideas"
    ],
    careers: ["Accountant", "Lawyer", "Civil Servant", "Banker", "Military Officer", "Engineer", "Doctor", "Dentist", "Judge", "Police Officer"],
    careerDescription: "ISTJs excel in environments with clear rules and procedures. They particularly shine in jobs requiring accuracy and responsibility, performing well in roles that maintain organizational stability. Many ISTJs build successful careers in law, finance, healthcare, and administration.",
    relationshipStyle: "ISTJs are loyal and dedicated partners in relationships. They express love through actions rather than words, keeping promises and providing practical support. While they may struggle with emotional expression, they offer deep trust and stability to those they open up to. They value traditional roles and expectations, seeking long-term, stable relationships.",
    communicationStyle: "They prefer direct, fact-based communication. They value clear, specific information delivery over unnecessary emotional expression. They listen well but speak only after careful consideration.",
    growthStrategies: [
      "Practice recognizing and expressing emotions",
      "Sometimes try unproven new methods",
      "Pay more attention to others' emotional needs",
      "Participate in spontaneous activities to develop flexibility",
      "Accept that it's okay not to be perfect"
    ],
    stressResponse: "When stressed, ISTJs may become more fixated on rules and procedures. In extreme stress, their inferior function Extraverted Intuition (Ne) may manifest negatively, causing them to imagine terrible future scenarios or worry about unrealistic catastrophes. Returning to familiar activities and routines helps relieve stress.",
    famousPeople: ["Warren Buffett", "Angela Merkel", "George Washington", "Denzel Washington"],
    compatibleTypes: ["ESTP", "ESFP", "ISTJ", "ISFJ"],
    challengingTypes: ["ENFP", "ENTP", "INFP", "INTP"],
  },
  ISFJ: {
    type: "ISFJ",
    name: "The Defender",
    nickname: "The Protector",
    emoji: "",
    description: "Warm and devoted, they enjoy caring for those around them. They find joy in quietly fulfilling responsibilities and providing practical help.",
    detailedDescription: "ISFJ is one of the most common personality types, comprising about 13% of the general population. True to their 'Defender' nickname, they devotedly care for family, friends, and colleagues. ISFJs are sensitive to others' needs and find deep satisfaction in providing practical help. They are quiet but strong, capable of bravely standing up for those they protect when needed. They value tradition and stability, playing a role in maintaining the foundations of society.",
    scientificBackground: "ISFJ is classified as the most altruistic type in MBTI research. According to psychological studies, ISFJs show higher levels of empathy and prosocial behavior compared to other types. Their dominant Introverted Sensing (Si) allows them to remember past experiences in detail and use them to care for others. Neuroscientifically, high empathy is associated with mirror neuron system activation.",
    cognitiveFunctions: {
      dominant: "Introverted Sensing (Si)",
      auxiliary: "Extraverted Feeling (Fe)",
      tertiary: "Introverted Thinking (Ti)",
      inferior: "Extraverted Intuition (Ne)",
      description: "ISFJs use Introverted Sensing (Si) to remember past experiences and details and apply them to the present. Their auxiliary function, Extraverted Feeling (Fe), helps them empathize with others and seek harmony. Their tertiary function, Introverted Thinking (Ti), enables logical analysis, while their inferior function, Extraverted Intuition (Ne), may cause difficulty in exploring new possibilities."
    },
    characteristics: [
      "Enjoys caring for and looking after others",
      "Highly responsible and sincere",
      "Values tradition and stability",
      "Observant and attentive to details",
      "Humble and quiet",
      "Excellent memory for important dates and details",
      "Finds joy in providing practical help"
    ],
    strengths: [
      "Excellent memory and attention to detail",
      "Deep consideration for others",
      "Reliable and dedicated",
      "Practical problem-solving abilities",
      "Ability to create harmonious environments",
      "Patience and perseverance"
    ],
    weaknesses: [
      "Tendency to neglect their own needs",
      "Difficulty accepting change",
      "Can be sensitive to criticism",
      "Difficulty saying no",
      "Potential for excessive self-sacrifice"
    ],
    careers: ["Nurse", "Social Worker", "Teacher", "Administrator", "Librarian", "Dietitian", "Kindergarten Teacher", "Counselor", "Physical Therapist", "Dental Hygienist"],
    careerDescription: "ISFJs feel highly satisfied in jobs where they can directly help and care for others. They excel in healthcare, education, and social welfare fields, and also do well in organizational support roles. They perform best in stable environments with clear expectations.",
    relationshipStyle: "ISFJs are warm and devoted partners in relationships. They sensitively identify their partner's needs and provide practical support. They express love through actions and cherish anniversaries and special moments. Their tendency to avoid conflict may make it difficult to express their own needs.",
    communicationStyle: "They communicate gently and considerately. They speak with attention to the other person's feelings, delivering feedback in positive ways rather than direct criticism. They listen well and strive to make others feel comfortable.",
    growthStrategies: [
      "Practice recognizing and expressing your own needs and feelings",
      "Recognize that sometimes saying 'no' is healthy",
      "View change as an opportunity for growth rather than a threat",
      "Accept that it's okay not to be perfect",
      "Intentionally make time for self-care"
    ],
    stressResponse: "When stressed, ISFJs may excessively try to care for others or, conversely, completely withdraw. In extreme stress, their inferior function Extraverted Intuition (Ne) may manifest negatively, causing them to imagine worst-case scenarios and become consumed by fear about the future.",
    famousPeople: ["Mother Teresa", "Kate Middleton", "Beyonce", "Anne Hathaway"],
    compatibleTypes: ["ESTP", "ESFP", "ISFJ", "ISTJ"],
    challengingTypes: ["ENTP", "ENFP", "INTP", "INFP"],
  },
  INFJ: {
    type: "INFJ",
    name: "The Advocate",
    nickname: "The Counselor",
    emoji: "",
    description: "Idealists with deep insight who quietly exert influence. They value humanitarian causes and seek a meaningful life.",
    detailedDescription: "INFJ is the rarest personality type, comprising only about 1-3% of the general population. True to their 'Advocate' nickname, they quietly but powerfully work for causes they believe in. INFJs deeply understand others' emotions and motivations through outstanding intuition and possess insight into complex human nature. They are idealists yet practical activists, taking concrete steps to make the world a better place. According to Carl Jung's psychological types, INFJs use Introverted Intuition (Ni) as their dominant function, allowing them to foresee future possibilities and gain deep insights.",
    scientificBackground: "INFJ is the most studied rare type in MBTI research. According to psychological studies, INFJs show high levels of empathy and intuitive insight, which is neuroscientifically related to unique connection patterns between the prefrontal cortex and limbic system. Research shows INFJs have high job satisfaction in counseling, education, and creative fields, performing best when doing meaningful work. Their intuitive judgment ability shows excellence in pattern recognition and future prediction, manifesting as the ability to grasp the essence of complex situations.",
    cognitiveFunctions: {
      dominant: "Introverted Intuition (Ni)",
      auxiliary: "Extraverted Feeling (Fe)",
      tertiary: "Introverted Thinking (Ti)",
      inferior: "Extraverted Sensing (Se)",
      description: "INFJs use Introverted Intuition (Ni) to recognize future possibilities and patterns and gain deep insights. Their auxiliary function, Extraverted Feeling (Fe), helps them empathize with others and pursue harmonious relationships. Their tertiary function, Introverted Thinking (Ti), enables logical analysis and building consistent systems. Their inferior function, Extraverted Sensing (Se), may cause difficulty in fully focusing on the present moment and sensory experiences."
    },
    characteristics: [
      "Deep insight and intuition",
      "Idealistic and principled",
      "Desire to help others",
      "Creative and inspiring vision",
      "Quiet but firm determination",
      "Ability to understand complex emotions",
      "Future-oriented thinking"
    ],
    strengths: [
      "Outstanding empathy ability",
      "Deep insight and intuition",
      "Strong principles and values",
      "Creative problem-solving",
      "Dedicated and passionate",
      "Ability to present inspiring visions"
    ],
    weaknesses: [
      "May have unrealistic expectations",
      "Sensitive to criticism",
      "Perfectionist tendencies",
      "Vulnerable to burnout",
      "May have difficulty making decisions"
    ],
    careers: ["Counselor", "Psychologist", "Writer", "Artist", "Professor", "Religious Leader", "Social Worker", "HR Professional", "Non-profit Activist"],
    careerDescription: "INFJs thrive in jobs where they can positively impact others through meaningful work. They excel in counseling, education, creative, and social change fields, showing the highest dedication when working for organizations aligned with their values. They particularly shine in roles requiring deep thinking and creativity.",
    relationshipStyle: "INFJs seek deep and meaningful connections in relationships. They prefer a few deep relationships over superficial ones and intuitively understand their partner's emotions and needs. They are dedicated and loyal partners but may struggle to express their own needs. They have high expectations for ideal relationships and value genuine understanding and emotional intimacy.",
    communicationStyle: "They prefer thoughtful and meaningful communication. They enjoy discussing deep topics rather than superficial conversations and use metaphors and symbols to express complex concepts. They listen well and excel at grasping hidden meanings in others' words.",
    growthStrategies: [
      "Practice accepting imperfect reality",
      "Recognize and express your own needs and limits",
      "Practice mindfulness to focus more on the present moment",
      "View criticism as an opportunity for growth rather than personal attack",
      "Accept that you cannot save everyone"
    ],
    stressResponse: "When stressed, INFJs may become more fixated on their vision or completely withdraw from others. In extreme stress, their inferior function Extraverted Sensing (Se) may manifest negatively, showing impulsive sensation-seeking (overeating, overspending, etc.) or excessive obsession with details. Rest and alone time are essential for recovery.",
    famousPeople: ["Nelson Mandela", "Martin Luther King Jr.", "Carl Jung", "Nicole Kidman"],
    compatibleTypes: ["ENFP", "ENTP", "INFJ", "INTJ"],
    challengingTypes: ["ESTP", "ESFP", "ISTP", "ESTJ"],
  },
  INTJ: {
    type: "INTJ",
    name: "The Architect",
    nickname: "The Mastermind",
    emoji: "",
    description: "Independent and analytical strategists with high standards and clear vision. They value knowledge and competence while pursuing efficiency.",
    detailedDescription: "INTJ is a rare type comprising about 2-4% of the general population. Called 'Strategist' or 'Architect,' they excel at understanding complex systems and making long-term plans. INTJs have a deep thirst for knowledge, constantly striving to improve themselves and their environment. They cannot tolerate inefficiency and pursue excellence according to their own high standards. They are independent and self-assured, not easily swayed by others' opinions. According to Carl Jung's psychological types, INTJs use Introverted Intuition (Ni) as their dominant function to foresee the future and build strategic visions.",
    scientificBackground: "INTJ is classified as the most strategic and independent type in MBTI research. According to psychological studies, INTJs show high levels of analytical thinking and long-term planning ability, which is related to high activation of the prefrontal cortex. Research shows INTJs achieve high success in science, technology, and strategy fields, performing best when working independently. Their systemic thinking ability shows excellence in breaking down complex problems and finding efficient solutions.",
    cognitiveFunctions: {
      dominant: "Introverted Intuition (Ni)",
      auxiliary: "Extraverted Thinking (Te)",
      tertiary: "Introverted Feeling (Fi)",
      inferior: "Extraverted Sensing (Se)",
      description: "INTJs use Introverted Intuition (Ni) to recognize future patterns and build long-term visions. Their auxiliary function, Extraverted Thinking (Te), helps them design efficient systems and logically achieve goals. Their tertiary function, Introverted Feeling (Fi), forms deep personal values, while their inferior function, Extraverted Sensing (Se), may cause difficulty in fully immersing in present sensory experiences."
    },
    characteristics: [
      "Strategic thinking and long-term vision",
      "Independent and self-assured",
      "Rich intellectual curiosity",
      "High standards and expectations",
      "Pursues efficiency and improvement",
      "Logical and analytical approach",
      "Systemic thinking ability"
    ],
    strengths: [
      "Outstanding analytical and strategic thinking",
      "Independent problem-solving ability",
      "High personal standards and goals",
      "Continuous self-improvement",
      "Ability to understand complex systems",
      "Long-term planning ability"
    ],
    weaknesses: [
      "Excessive perfectionism",
      "May struggle with emotional expression",
      "Can be critical of others",
      "May ignore social norms",
      "May lack patience"
    ],
    careers: ["Scientist", "Strategy Consultant", "Programmer", "Investment Analyst", "Doctor", "Architect", "Systems Engineer", "Researcher", "CEO"],
    careerDescription: "INTJs excel in roles solving complex problems and designing systems. They prefer environments where they can work independently with intellectual challenges. They show outstanding performance in science, technology, strategy, and research fields, and also succeed in leadership roles where they can realize their vision.",
    relationshipStyle: "INTJs value intellectual connection and mutual growth in relationships. They maintain only a few deep relationships and have little interest in superficial social activities. They are loyal and dedicated to partners but may appear indifferent due to difficulty with emotional expression. They prefer partners who can intellectually stimulate each other, respecting mutual independence and personal space.",
    communicationStyle: "They prefer direct and logical communication. They dislike unnecessary emotional expression or roundabout ways, quickly grasping and delivering the core message. They express their opinions with confidence and enjoy logical debates. Sometimes they may come across as rude due to being too direct.",
    growthStrategies: [
      "Practice considering others' emotions and perspectives more",
      "Recognize that it's important to act even if not perfect",
      "Practice expressing and sharing emotions",
      "Accept that you cannot control everything",
      "Practice mindfulness to enjoy the present moment"
    ],
    stressResponse: "When stressed, INTJs may withdraw and isolate themselves further. In extreme stress, their inferior function Extraverted Sensing (Se) may manifest negatively, showing impulsive sensation-seeking (excessive drinking, eating, spending) or obsessive fixation on details. Intellectual activities and alone time help recovery.",
    famousPeople: ["Elon Musk", "Mark Zuckerberg", "Isaac Newton", "Friedrich Nietzsche"],
    compatibleTypes: ["ENFP", "ENTP", "INTJ", "INFJ"],
    challengingTypes: ["ESFP", "ESFJ", "ISFP", "ISFJ"],
  },
  ISTP: {
    type: "ISTP",
    name: "The Virtuoso",
    nickname: "The Craftsman",
    emoji: "",
    description: "Logical and practical problem solvers. Curious and hands-on, they stay calm in crisis situations.",
    detailedDescription: "ISTP comprises about 4-6% of the general population. Called 'Craftsman' or 'Virtuoso,' they enjoy making and fixing things with their hands. ISTPs quickly understand how things work through excellent observation and analysis skills, excelling at practical problem-solving. They are remarkably calm in crisis situations with outstanding quick judgment and action abilities. They value freedom and independence, disliking excessive rules or constraints. According to Carl Jung's psychological types, ISTPs use Introverted Thinking (Ti) as their dominant function, excelling at logical analysis and problem-solving.",
    scientificBackground: "ISTP is classified as one of the most practical and action-oriented types in MBTI research. According to psychological studies, ISTPs show high levels of spatial perception and mechanical reasoning ability, which is related to specific parietal lobe activation. Research shows ISTPs demonstrate excellent composure and quick decision-making in crisis situations, associated with efficient autonomic nervous system regulation. They show high job satisfaction in technical and mechanical fields.",
    cognitiveFunctions: {
      dominant: "Introverted Thinking (Ti)",
      auxiliary: "Extraverted Sensing (Se)",
      tertiary: "Introverted Intuition (Ni)",
      inferior: "Extraverted Feeling (Fe)",
      description: "ISTPs use Introverted Thinking (Ti) to logically analyze and understand how things work. Their auxiliary function, Extraverted Sensing (Se), makes them sensitively aware of environmental details and quick to react. Their tertiary function, Introverted Intuition (Ni), provides insight for problem-solving, while their inferior function, Extraverted Feeling (Fe), may cause difficulty understanding others' emotions and maintaining harmonious relationships."
    },
    characteristics: [
      "Logical and analytical thinking",
      "Practical problem-solving ability",
      "Highly adaptable",
      "Calm in crisis situations",
      "Independent and free-spirited",
      "Excellent manual dexterity",
      "Focused on the present moment"
    ],
    strengths: [
      "Outstanding technical ability",
      "Crisis management skills",
      "Flexible and highly adaptable",
      "Excellent observation skills",
      "Practical problem-solving",
      "Calm and cool judgment"
    ],
    weaknesses: [
      "Difficulty expressing emotions",
      "Reluctant to make long-term commitments",
      "May appear cold",
      "Can be rebellious toward rules",
      "Low tolerance for boredom"
    ],
    careers: ["Engineer", "Mechanic", "Pilot", "Chef", "Athlete", "Police Officer", "Firefighter", "Surgeon", "Forensic Scientist", "Construction Technician"],
    careerDescription: "ISTPs find satisfaction in work where they can use their hands to actually make or fix things. They excel in jobs requiring technical expertise and immediate problem-solving. Their composure in crisis situations is a valuable quality in emergency services, healthcare, and law enforcement. They prefer environments where they can work independently.",
    relationshipStyle: "ISTPs value independence and personal space in relationships. They express love through actions rather than words and enjoy providing practical help. While they may appear indifferent due to difficulty with emotional expression, they are loyal to those they open up to. They build intimacy through sharing activities together.",
    communicationStyle: "They prefer concise and direct communication. They dislike unnecessary emotional expression or long explanations, quickly delivering the core message. They prefer showing through action rather than words and focus on practical information exchange.",
    growthStrategies: [
      "Practice recognizing and expressing emotions",
      "Practice making long-term plans and commitments",
      "Pay more attention to others' emotional needs",
      "Recognize that sometimes routine and structure can be helpful",
      "Pause and think before making impulsive decisions"
    ],
    stressResponse: "When stressed, ISTPs may withdraw further or engage in risky activities. In extreme stress, their inferior function Extraverted Feeling (Fe) may manifest negatively, showing emotional outbursts, blaming others, or hypersensitivity in relationships. Physical activity and alone time help recovery.",
    famousPeople: ["Michael Jordan", "Tom Cruise", "Clint Eastwood", "Bruce Lee"],
    compatibleTypes: ["ESTJ", "ENTJ", "ISTP", "ESTP"],
    challengingTypes: ["ENFJ", "ESFJ", "INFJ", "ISFJ"],
  },
  ISFP: {
    type: "ISFP",
    name: "The Adventurer",
    nickname: "The Composer",
    emoji: "",
    description: "A gentle and emotional artist type. They enjoy the present moment and quietly express themselves according to their own values.",
    detailedDescription: "ISFP comprises about 5-9% of the general population. Called 'Artist' or 'Adventurer,' they are deeply drawn to sensory experiences and aesthetic beauty. ISFPs fully experience and enjoy the present moment, expressing the world in their own unique way. Though quiet, they have strong inner values and firmly resist anything that violates these values. They accept others as they are without judgment, showing deep respect for all living beings. According to Carl Jung's psychological types, ISFPs use Introverted Feeling (Fi) as their dominant function to pursue deep personal values and authenticity.",
    scientificBackground: "ISFP is classified as one of the most artistic and sensory types in MBTI research. According to psychological studies, ISFPs show high levels of aesthetic sensitivity and sensory perception ability, related to right-brain activation patterns. Research shows ISFPs have high job satisfaction in art, design, and caregiving fields, performing best when doing work aligned with their values. Their empathy and focus on the present enable deep connections with animals, nature, and others.",
    cognitiveFunctions: {
      dominant: "Introverted Feeling (Fi)",
      auxiliary: "Extraverted Sensing (Se)",
      tertiary: "Introverted Intuition (Ni)",
      inferior: "Extraverted Thinking (Te)",
      description: "ISFPs use Introverted Feeling (Fi) to develop deep personal values and pursue authenticity. Their auxiliary function, Extraverted Sensing (Se), helps them fully enjoy present sensory experiences and respond sensitively to the environment. Their tertiary function, Introverted Intuition (Ni), provides insight into the future, while their inferior function, Extraverted Thinking (Te), may cause difficulty with objective analysis and systematic organization."
    },
    characteristics: [
      "Emotional and artistic sensibility",
      "Flexible and open-minded",
      "Enjoys the present moment",
      "Values personal principles",
      "Quiet and kind",
      "Non-judgmental of others",
      "Love for nature and animals"
    ],
    strengths: [
      "Outstanding aesthetic sense",
      "Flexible and highly adaptable",
      "Considerate of others",
      "Practical creativity",
      "Ability to focus on the present moment",
      "Authenticity and sincerity"
    ],
    weaknesses: [
      "Difficulty making plans",
      "Sensitive to criticism",
      "Tendency to avoid conflict",
      "May lack assertiveness",
      "Difficulty with long-term planning"
    ],
    careers: ["Artist", "Designer", "Musician", "Fashion Designer", "Nurse", "Veterinarian", "Photographer", "Physical Therapist", "Landscape Designer", "Chef"],
    careerDescription: "ISFPs thrive in jobs allowing creative self-expression and sensory experiences. They excel in art, design, music, and fashion fields and also find satisfaction in caring for others or animals. They prefer flexible environments where their personal values are respected.",
    relationshipStyle: "ISFPs are warm and considerate partners in relationships. They express love through actions rather than words and enjoy sharing sensory experiences with their partner. They value harmonious relationships but do not compromise on their values. They seek deep emotional connection and desire genuine understanding and acceptance.",
    communicationStyle: "They communicate gently and non-judgmentally. They prefer expressing themselves through actions or artistic expression rather than words. They tend to avoid conflict, quietly stepping back rather than direct confrontation. They listen well and empathize with others' feelings.",
    growthStrategies: [
      "Practice expressing your opinions and needs more actively",
      "Practice setting long-term goals and planning",
      "Accept constructive criticism as an opportunity for growth",
      "Recognize that sometimes confronting conflict is necessary rather than avoiding it",
      "Develop logical analysis and objective evaluation abilities"
    ],
    stressResponse: "When stressed, ISFPs may withdraw to their own space or overreact to criticism. In extreme stress, their inferior function Extraverted Thinking (Te) may manifest negatively, becoming overly critical or showing controlling behavior. Time in nature or creative activities help recovery.",
    famousPeople: ["Michael Jackson", "Audrey Hepburn", "Bob Dylan", "Rihanna"],
    compatibleTypes: ["ESFJ", "ENFJ", "ISFP", "ESFP"],
    challengingTypes: ["ENTJ", "ESTJ", "INTJ", "ENTP"],
  },
  INFP: {
    type: "INFP",
    name: "The Mediator",
    nickname: "The Healer",
    emoji: "",
    description: "An idealistic and highly empathetic dreamer. They seek their true self and want to help others and make the world a better place.",
    detailedDescription: "INFP comprises about 4-5% of the general population. Called 'Healer' or 'Mediator,' they have deep idealism and a strong moral compass. INFPs have rich inner worlds with outstanding imagination and creativity. They believe in the goodness within everyone and have a desire to make the world a better place. They highly value authenticity and self-identity, striving to live according to their values. According to Carl Jung's psychological types, INFPs use Introverted Feeling (Fi) as their dominant function to pursue deep personal values and authenticity.",
    scientificBackground: "INFP is classified as one of the most idealistic and empathetic types in MBTI research. According to psychological studies, INFPs show high levels of emotional depth and creative thinking, related to limbic system and creativity-related brain region activation. Research shows INFPs have high job satisfaction in writing, art, counseling, and social change fields, performing best when doing meaningful work. Their empathy enables deep understanding and connection with others' feelings.",
    cognitiveFunctions: {
      dominant: "Introverted Feeling (Fi)",
      auxiliary: "Extraverted Intuition (Ne)",
      tertiary: "Introverted Sensing (Si)",
      inferior: "Extraverted Thinking (Te)",
      description: "INFPs use Introverted Feeling (Fi) to develop deep personal values and pursue authenticity. Their auxiliary function, Extraverted Intuition (Ne), helps them explore various possibilities and make creative connections. Their tertiary function, Introverted Sensing (Si), helps them find meaning from past experiences, while their inferior function, Extraverted Thinking (Te), may cause difficulty with objective analysis and efficient organization."
    },
    characteristics: [
      "Deep empathy and idealism",
      "Creative and imaginative",
      "Strong internal values",
      "Desire for self-expression",
      "Seeks harmony and peace",
      "Values authenticity and self-identity",
      "Deep emotional experiences"
    ],
    strengths: [
      "Outstanding empathy ability",
      "Creative and original",
      "Strong principles and authenticity",
      "Deep dedication and passion",
      "Writing and self-expression abilities",
      "Ability to understand others' feelings"
    ],
    weaknesses: [
      "Unrealistic expectations",
      "Self-critical tendencies",
      "Boredom with routine tasks",
      "Difficulty in conflict situations",
      "Can be overwhelmed by emotions"
    ],
    careers: ["Writer", "Counselor", "Social Activist", "Artist", "Musician", "Teacher", "Graphic Designer", "Filmmaker", "Librarian", "Translator"],
    careerDescription: "INFPs thrive in jobs allowing creative self-expression and meaningful contribution. They excel in writing, art, counseling, and social movement fields, showing the highest dedication when working for organizations aligned with their values. They prefer environments with independence and creative freedom.",
    relationshipStyle: "INFPs seek deep and meaningful connections in relationships. They have high expectations for ideal relationships and seek the perfect 'soulmate.' They are loyal and dedicated partners, deeply empathizing with their partner's emotions and needs. However, they may avoid conflict and struggle to express their own needs.",
    communicationStyle: "They prefer thoughtful and emotionally deep communication. They express themselves through metaphors, symbols, and stories, and are skilled at communicating through writing. They prefer harmonious conversation environments while tending to avoid conflict. They enjoy conversations about deep topics but may feel awkward with superficial small talk.",
    growthStrategies: [
      "Practice having realistic expectations",
      "Practice self-acceptance rather than self-criticism",
      "Recognize that sometimes action is more important than perfect planning",
      "Learn to face conflict in healthy ways",
      "Develop logical analysis and objective evaluation abilities"
    ],
    stressResponse: "When stressed, INFPs may withdraw into their inner world or become pessimistic. In extreme stress, their inferior function Extraverted Thinking (Te) may manifest negatively, becoming overly critical or cynical and obsessing over small matters. Creative activities and time in nature help recovery.",
    famousPeople: ["William Shakespeare", "J.R.R. Tolkien", "Edgar Allan Poe", "Princess Diana"],
    compatibleTypes: ["ENFJ", "ENTJ", "INFP", "ENFP"],
    challengingTypes: ["ESTJ", "ESTP", "ISTJ", "ISTP"],
  },
  INTP: {
    type: "INTP",
    name: "The Logician",
    nickname: "The Thinker",
    emoji: "",
    description: "An analytical and objective thinker. They enjoy logically solving complex problems and have a thirst for knowledge and understanding.",
    detailedDescription: "INTP comprises about 3-5% of the general population. Called 'Logician' or 'Thinker,' they have an endless thirst for intellectual inquiry. INTPs enjoy analyzing complex problems and building theoretical models, showing passion for finding answers to 'why' questions. They are famous for original thinking and innovative ideas, challenging existing assumptions and presenting new perspectives. They highly value intellectual honesty and pursue logical consistency. According to Carl Jung's psychological types, INTPs use Introverted Thinking (Ti) as their dominant function to pursue logical analysis and systematic understanding.",
    scientificBackground: "INTP is classified as the most analytical and theory-oriented type in MBTI research. According to psychological studies, INTPs show high levels of abstract thinking and pattern recognition ability, related to specific prefrontal cortex activation. Research shows INTPs achieve high success in science, technology, philosophy, and mathematics fields, performing best when independently solving complex problems. Their innovative thinking has led paradigm shifts in multiple fields.",
    cognitiveFunctions: {
      dominant: "Introverted Thinking (Ti)",
      auxiliary: "Extraverted Intuition (Ne)",
      tertiary: "Introverted Sensing (Si)",
      inferior: "Extraverted Feeling (Fe)",
      description: "INTPs use Introverted Thinking (Ti) to pursue logical consistency and accuracy and analyze complex systems. Their auxiliary function, Extraverted Intuition (Ne), helps them explore various possibilities and connections and generate innovative ideas. Their tertiary function, Introverted Sensing (Si), helps them collect data from past experiences, while their inferior function, Extraverted Feeling (Fe), may cause difficulty in recognizing others' emotions and maintaining social harmony."
    },
    characteristics: [
      "Logical and analytical thinking",
      "Strong intellectual curiosity",
      "Original ideas",
      "Independent and autonomous",
      "Interest in theories and systems",
      "Skilled with abstract concepts",
      "Open-minded and objective"
    ],
    strengths: [
      "Outstanding analytical ability",
      "Creative problem-solving",
      "Objective and logical",
      "Continuous desire for learning",
      "Innovative thinking ability",
      "Ability to understand complex systems"
    ],
    weaknesses: [
      "Awkwardness in social situations",
      "Difficulty expressing emotions",
      "May lack execution ability",
      "May miss details",
      "Decisions delayed by pursuit of perfect theory"
    ],
    careers: ["Scientist", "Philosopher", "Programmer", "Mathematician", "Professor", "Systems Analyst", "Software Developer", "Data Scientist", "Researcher", "Architect"],
    careerDescription: "INTPs thrive in jobs analyzing complex problems and building theoretical models. They excel in science, technology, philosophy, and research fields, preferring environments where they can think deeply and independently. They feel high satisfaction in jobs with intellectual stimulation and learning opportunities.",
    relationshipStyle: "INTPs value intellectual connection and mutual understanding in relationships. Though they struggle with emotional expression, they are loyal and dedicated to those they open up to. They need independent space and time, preferring partners who can intellectually stimulate each other. They prefer logical communication over emotional demands.",
    communicationStyle: "They prefer logical and precise communication. They enjoy explaining complex ideas but feel awkward with emotional expression or small talk. They enjoy debates and intellectual exchange, valuing logical consistency of ideas. Sometimes they may feel lacking in emotional connection due to being too analytical.",
    growthStrategies: [
      "Practice putting ideas into actual execution",
      "Practice recognizing and expressing emotions",
      "Recognize the importance of social interaction",
      "Practice making decisions even when not perfect",
      "Pay more attention to others' emotional needs"
    ],
    stressResponse: "When stressed, INTPs may become more absorbed in analysis or socially withdraw. In extreme stress, their inferior function Extraverted Feeling (Fe) may manifest negatively, showing emotional outbursts, hypersensitivity to others, or excessive need for recognition. Alone time and intellectual activities help recovery.",
    famousPeople: ["Albert Einstein", "Bill Gates", "Charles Darwin", "Abraham Lincoln"],
    compatibleTypes: ["ENTJ", "ESTJ", "INTP", "ENTP"],
    challengingTypes: ["ESFJ", "ENFJ", "ISFJ", "ESFP"],
  },
  ESTP: {
    type: "ESTP",
    name: "The Entrepreneur",
    nickname: "The Dynamo",
    emoji: "",
    description: "An active and realistic problem solver. They focus on the present moment, take risks, and pursue new experiences.",
    detailedDescription: "ESTP comprises about 4-5% of the general population. Called 'Entrepreneur' or 'Dynamo,' they are action-oriented and realistic problem solvers. ESTPs live fully in the present moment, seeking new experiences and adventure. With excellent observation and quick judgment, they stay calm in crisis situations and have charisma that captivates people. They value action over theory, approaching life with a 'just do it' attitude. According to Carl Jung's psychological types, ESTPs use Extraverted Sensing (Se) as their dominant function to respond sensitively to the current environment and take immediate action.",
    scientificBackground: "ESTP is classified as the most action-oriented and adventurous type in MBTI research. According to psychological studies, ESTPs show high levels of sensation-seeking and risk-taking tendencies, related to dopamine reward system activation. Research shows ESTPs demonstrate outstanding composure and quick decision-making in fast-paced environments, associated with efficient autonomic nervous system regulation. They show high job satisfaction in sales, emergency services, and sports.",
    cognitiveFunctions: {
      dominant: "Extraverted Sensing (Se)",
      auxiliary: "Introverted Thinking (Ti)",
      tertiary: "Extraverted Feeling (Fe)",
      inferior: "Introverted Intuition (Ni)",
      description: "ESTPs use Extraverted Sensing (Se) to keenly perceive environmental details and react immediately. Their auxiliary function, Introverted Thinking (Ti), helps them logically analyze situations and find practical solutions. Their tertiary function, Extraverted Feeling (Fe), helps them read social situations and exude charm, while their inferior function, Introverted Intuition (Ni), may cause difficulty predicting long-term consequences."
    },
    characteristics: [
      "Active and energetic",
      "Realistic and practical",
      "Risk-taking adventurer",
      "Sociable and charming",
      "Quick situational judgment",
      "Focused on the present moment",
      "Highly adaptable"
    ],
    strengths: [
      "Outstanding negotiation ability",
      "Crisis management skills",
      "Realistic problem-solving",
      "Sociable and persuasive",
      "Quick action",
      "Observation and situational awareness"
    ],
    weaknesses: [
      "Impulsive decisions",
      "Tendency to ignore rules",
      "Difficulty with long-term planning",
      "May be insensitive to emotional issues",
      "Low tolerance for boredom"
    ],
    careers: ["Entrepreneur", "Sales Professional", "Paramedic", "Athlete", "Actor", "Police Officer", "Firefighter", "Pilot", "Real Estate Agent", "Marketer"],
    careerDescription: "ESTPs thrive in jobs requiring quick action and immediate problem-solving. They excel in sales, emergency services, sports, and entertainment, preferring environments with people interaction and exciting challenges. They prefer active roles over sitting at desks.",
    relationshipStyle: "ESTPs are fun and exciting partners in relationships. They enjoy sharing new experiences and adventures together. They focus on the present moment and express affection in practical ways. However, they may struggle with long-term planning or deep emotional conversations and dislike feeling constrained.",
    communicationStyle: "They have a direct and lively communication style. They lead conversations with humor and wit, having the ability to captivate people. They prefer practical information and may get bored with abstract or theoretical conversations. They prefer showing through action rather than words.",
    growthStrategies: [
      "Practice making decisions considering long-term consequences",
      "Pay more attention to others' feelings",
      "Pause and think before acting impulsively",
      "Recognize the value of deep relationships and emotional intimacy",
      "Accept the importance of routine and consistency"
    ],
    stressResponse: "When stressed, ESTPs may become more impulsive or engage in risky behavior. In extreme stress, their inferior function Introverted Intuition (Ni) may manifest negatively, experiencing pessimistic future predictions, conspiracy-theory thinking, or existential concerns about meaninglessness. Physical activity and new experiences help recovery.",
    famousPeople: ["Donald Trump", "Madonna", "Ernest Hemingway", "Jack Nicklaus"],
    compatibleTypes: ["ISTJ", "ISFJ", "ESTP", "ESFP"],
    challengingTypes: ["INFJ", "INTJ", "INFP", "ENFJ"],
  },
  ESFP: {
    type: "ESFP",
    name: "The Entertainer",
    nickname: "The Performer",
    emoji: "",
    description: "A bright and sociable entertainer type. They enjoy the present moment and love bringing joy to those around them.",
    detailedDescription: "ESFP comprises about 4-9% of the general population. Called 'Entertainer' or 'Performer,' they pursue life's pleasures and enjoy sharing that joy with those around them. ESFPs fully experience the present moment and have the ability to become the center of any party. Their natural sociability and warm personality draw people in, making everyone feel comfortable. They are practical yet fun-seeking, believing life is meant to be enjoyed. According to Carl Jung's psychological types, ESFPs use Extraverted Sensing (Se) as their dominant function to fully enjoy present sensory experiences.",
    scientificBackground: "ESFP is classified as the most sociable and pleasure-seeking type in MBTI research. According to psychological studies, ESFPs show high levels of extraversion and positive affect, related to reward-related brain region activation. Research shows ESFPs have high job satisfaction in environments with direct people interaction, excelling in entertainment, service, and sales fields. Their social ability shows excellence in forming and maintaining social bonds.",
    cognitiveFunctions: {
      dominant: "Extraverted Sensing (Se)",
      auxiliary: "Introverted Feeling (Fi)",
      tertiary: "Extraverted Thinking (Te)",
      inferior: "Introverted Intuition (Ni)",
      description: "ESFPs use Extraverted Sensing (Se) to respond sensitively to sensory details in the current environment and enjoy experiences. Their auxiliary function, Introverted Feeling (Fi), helps them form deep personal values and pursue authenticity. Their tertiary function, Extraverted Thinking (Te), enables practical problem-solving, while their inferior function, Introverted Intuition (Ni), may cause difficulty predicting the future and making long-term plans."
    },
    characteristics: [
      "Bright and positive energy",
      "Sociable and friendly",
      "Enjoys the present moment",
      "Flexible and highly adaptable",
      "Practical and realistic",
      "Ability to make others happy",
      "Spontaneous and improvisational"
    ],
    strengths: [
      "Outstanding sociability",
      "Positive energy",
      "Practical problem-solving",
      "Flexible coping ability",
      "Ability to connect with people",
      "Ability to focus on the present"
    ],
    weaknesses: [
      "Difficulty with long-term planning",
      "Sensitive to criticism",
      "Impulsive decisions",
      "Low tolerance for boredom",
      "Conflict avoidance tendency"
    ],
    careers: ["Entertainer", "Event Planner", "Sales Professional", "Tour Guide", "PR Specialist", "Chef", "Host/MC", "Teacher", "Flight Attendant", "Photographer"],
    careerDescription: "ESFPs thrive in jobs with direct people interaction and bringing joy. They excel in entertainment, service, sales, and event fields, preferring lively environments with lots of change. They feel high satisfaction in roles with new challenges every day rather than repetitive, monotonous work.",
    relationshipStyle: "ESFPs are fun and affectionate partners in relationships. They enjoy the present moment together and love making their partner happy. They express love in practical ways and enjoy special experiences and surprises. However, they may struggle with deep emotional conversations or long-term planning and tend to avoid conflict.",
    communicationStyle: "They have a lively and expressive communication style. They tell stories vividly and make conversations enjoyable with humor and wit. They focus on direct experiences and sensory details, preferring real stories over abstract theories.",
    growthStrategies: [
      "Practice setting long-term goals and plans",
      "Consider future benefits rather than immediate gratification",
      "Accept constructive criticism as an opportunity for growth",
      "Recognize that sometimes confronting conflict is necessary",
      "Take time for deep inner exploration and self-reflection"
    ],
    stressResponse: "When stressed, ESFPs may seek more pleasure or engage in impulsive behavior. In extreme stress, their inferior function Introverted Intuition (Ni) may manifest negatively, showing pessimistic future predictions, existential anxiety, or obsession with hidden meanings. Time with friends and enjoyable activities help recovery.",
    famousPeople: ["Marilyn Monroe", "Justin Bieber", "Adele", "Elton John"],
    compatibleTypes: ["ISTJ", "ISFJ", "ESFP", "ESTP"],
    challengingTypes: ["INTJ", "INFJ", "INTP", "ENTJ"],
  },
  ENFP: {
    type: "ENFP",
    name: "The Campaigner",
    nickname: "The Champion",
    emoji: "",
    description: "A passionate and creative free spirit. They enjoy exploring possibilities and love inspiring others.",
    detailedDescription: "ENFP comprises about 6-8% of the general population. Called 'Campaigner' or 'Champion,' they live in a world of possibilities and ideas. ENFPs inspire those around them with outstanding imagination and passion, constantly interested in new ideas and projects. They seek deep connections with people and believe in everyone's potential. They value freedom and self-expression, disliking being constrained by rules and restrictions. According to Carl Jung's psychological types, ENFPs use Extraverted Intuition (Ne) as their dominant function to constantly explore new possibilities and connections.",
    scientificBackground: "ENFP is classified as the most passionate and possibility-oriented type in MBTI research. According to psychological studies, ENFPs show high levels of openness and creative thinking, related to active connections between the prefrontal cortex and default mode network. Research shows ENFPs have high job satisfaction in creative and social fields, performing best when interacting with various projects and people. Their passion and inspiring ability show excellence in leadership and motivation.",
    cognitiveFunctions: {
      dominant: "Extraverted Intuition (Ne)",
      auxiliary: "Introverted Feeling (Fi)",
      tertiary: "Extraverted Thinking (Te)",
      inferior: "Introverted Sensing (Si)",
      description: "ENFPs use Extraverted Intuition (Ne) to explore possibilities and patterns and make creative connections. Their auxiliary function, Introverted Feeling (Fi), helps them develop deep personal values and pursue authenticity. Their tertiary function, Extraverted Thinking (Te), helps realize ideas, while their inferior function, Introverted Sensing (Si), may cause difficulty focusing on details and routines."
    },
    characteristics: [
      "Passionate and creative",
      "Curious and exploratory",
      "Values connections with people",
      "Free and flexible",
      "Idealistic and optimistic",
      "Inspiring ability",
      "Open mind toward possibilities"
    ],
    strengths: [
      "Outstanding creativity",
      "Passionate communication ability",
      "Adaptability and flexibility",
      "Inspires others",
      "Ability to connect people",
      "Optimistic energy"
    ],
    weaknesses: [
      "Difficulty maintaining focus",
      "Overly idealistic",
      "May miss details",
      "Tendency to delay decisions",
      "Difficulty completing projects to the end"
    ],
    careers: ["Consultant", "Journalist", "Marketer", "Actor", "Counselor", "Writer", "Entrepreneur", "PR Specialist", "Coach", "Teacher"],
    careerDescription: "ENFPs thrive in jobs combining creativity and human relationships. They excel in marketing, consulting, counseling, and creative fields, preferring environments with various projects and people interaction. They feel high satisfaction in roles exploring and realizing new ideas rather than routine, repetitive work.",
    relationshipStyle: "ENFPs are passionate and romantic partners in relationships. They seek deep emotional connection and actively support their partner's growth and dreams. They love sharing various experiences and bringing newness and fun to relationships. However, when initial passion fades, they may seek new things or tend to avoid conflict.",
    communicationStyle: "They have a passionate and inspiring communication style. They talk excitedly about ideas and possibilities and have the ability to get people to join their vision. They value personal and emotional connection and enjoy open conversations about various topics.",
    growthStrategies: [
      "Practice completing started projects to the end",
      "Pay more attention to details and practical aspects",
      "Practice having realistic expectations rather than excessive idealism",
      "Practice making choices without delaying decisions",
      "Recognize the value of routine and consistency"
    ],
    stressResponse: "When stressed, ENFPs may become more scattered or jump between multiple projects. In extreme stress, their inferior function Introverted Sensing (Si) may manifest negatively, showing obsession with past failures, excessive worry about health issues, or compulsions about details. Creative activities and time with positive people help recovery.",
    famousPeople: ["Robin Williams", "Will Smith", "Mark Twain", "Walt Disney"],
    compatibleTypes: ["INTJ", "INFJ", "ENFP", "ENTP"],
    challengingTypes: ["ISTJ", "ISFJ", "ESTJ", "ISTP"],
  },
  ENTP: {
    type: "ENTP",
    name: "The Debater",
    nickname: "The Visionary",
    emoji: "",
    description: "A creative and strategic thinker who loves debate. They explore new ideas and possibilities and enjoy intellectual discussion.",
    detailedDescription: "ENTP comprises about 2-5% of the general population. Called 'Debater' or 'Visionary,' they love intellectual challenges and debate. ENTPs enjoy challenging existing ideas and assumptions, presenting new perspectives and solutions. Famous for quick thinking and wit, they can persuasively argue any position. They seek innovation and change, disliking complacency with the status quo. According to Carl Jung's psychological types, ENTPs use Extraverted Intuition (Ne) as their dominant function to explore possibilities and make creative connections.",
    scientificBackground: "ENTP is classified as the most innovative and debate-oriented type in MBTI research. According to psychological studies, ENTPs show high levels of openness and rapid cognitive flexibility, related to active prefrontal cortex activity. Research shows ENTPs achieve high success in entrepreneurship, innovation, and debate-related fields, performing best in environments with intellectual stimulation and challenge. Their debate ability stems from critical thinking and the ability to adopt diverse perspectives.",
    cognitiveFunctions: {
      dominant: "Extraverted Intuition (Ne)",
      auxiliary: "Introverted Thinking (Ti)",
      tertiary: "Extraverted Feeling (Fe)",
      inferior: "Introverted Sensing (Si)",
      description: "ENTPs use Extraverted Intuition (Ne) to explore possibilities and patterns and generate creative ideas. Their auxiliary function, Introverted Thinking (Ti), helps them pursue logical consistency and analyze ideas. Their tertiary function, Extraverted Feeling (Fe), helps them read social situations and be persuasive, while their inferior function, Introverted Sensing (Si), may cause difficulty focusing on details and routines."
    },
    characteristics: [
      "Creative and original thinking",
      "Strong intellectual curiosity",
      "Enjoys debate and discussion",
      "Quick situational awareness",
      "Flexible and highly adaptable",
      "Challenges existing assumptions",
      "Wit and sense of humor"
    ],
    strengths: [
      "Outstanding idea generation",
      "Quick analysis and problem-solving",
      "Persuasive communication",
      "Active toward new challenges",
      "Innovative thinking",
      "Ability to adopt diverse perspectives"
    ],
    weaknesses: [
      "Difficulty completing projects",
      "Rebellious toward rules and authority",
      "May be insensitive to emotional issues",
      "May appear argumentative",
      "May ignore details and routines"
    ],
    careers: ["Lawyer", "Entrepreneur", "Consultant", "Inventor", "Director", "Marketer", "Investment Analyst", "Political Commentator", "Product Developer", "Startup Founder"],
    careerDescription: "ENTPs thrive in jobs where innovation and idea generation are important. They excel in entrepreneurship, law, consulting, and marketing, preferring environments with intellectual challenge and variety. They feel high satisfaction in roles solving new problems and driving innovation rather than routine, repetitive work.",
    relationshipStyle: "ENTPs are intellectual and interesting partners in relationships. They enjoy deep conversations and debates and love exploring new ideas with their partner. They value independence and support their partner's growth. However, they may be insensitive to emotional needs, and their debate-loving tendency can lead to conflicts.",
    communicationStyle: "They have a witty and argumentative communication style. They enjoy debating and challenging ideas and can persuasively argue any position. They lead conversations with quick wit and humor but may sometimes appear too provocative or argumentative.",
    growthStrategies: [
      "Practice completing started projects to the end",
      "Pay more attention to others' emotional needs",
      "Recognize that sometimes listening is needed rather than debate",
      "Pay attention to details and practical aspects",
      "Recognize the value of consistency and reliability"
    ],
    stressResponse: "When stressed, ENTPs may become more argumentative or jump between multiple ideas. In extreme stress, their inferior function Introverted Sensing (Si) may manifest negatively, showing obsession with past details, excessive worry about health issues, or closed and defensive attitudes. Intellectual debate and new experiences help recovery.",
    famousPeople: ["Thomas Edison", "Benjamin Franklin", "Socrates", "Tom Hanks"],
    compatibleTypes: ["INTJ", "INFJ", "ENTP", "ENFP"],
    challengingTypes: ["ISFJ", "ISTJ", "ESFJ", "ISFP"],
  },
  ESTJ: {
    type: "ESTJ",
    name: "The Executive",
    nickname: "The Supervisor",
    emoji: "",
    description: "An organized and responsible manager type. They value tradition and order, systematically driving toward goal achievement.",
    detailedDescription: "ESTJ comprises about 8-12% of the general population. Called 'Executive' or 'Supervisor,' they value order and organization. ESTJs prefer clear rules and procedures, systematically driving toward goal achievement. They are responsible, reliable, and dedicated to community and organization. They respect tradition and established methods, contributing to maintaining social order. They have a direct and straightforward communication style. According to Carl Jung's psychological types, ESTJs use Extraverted Thinking (Te) as their dominant function to build efficient systems and achieve goals.",
    scientificBackground: "ESTJ is classified as the most organized and management-oriented type in MBTI research. According to psychological studies, ESTJs show high levels of responsibility and order-seeking tendencies, related to executive function area activation in the prefrontal cortex. Research shows ESTJs achieve high success in business, law, military, and administration fields, performing best in environments with clear structure and expectations. Their leadership ability greatly contributes to organizational efficiency and productivity improvement.",
    cognitiveFunctions: {
      dominant: "Extraverted Thinking (Te)",
      auxiliary: "Introverted Sensing (Si)",
      tertiary: "Extraverted Intuition (Ne)",
      inferior: "Introverted Feeling (Fi)",
      description: "ESTJs use Extraverted Thinking (Te) to build efficient systems and make logical decisions. Their auxiliary function, Introverted Sensing (Si), helps them value past experiences and traditions and remember details. Their tertiary function, Extraverted Intuition (Ne), helps explore new possibilities but is limited, while their inferior function, Introverted Feeling (Fi), may cause difficulty understanding deep emotions in themselves and others."
    },
    characteristics: [
      "Organized and systematic",
      "Highly responsible and reliable",
      "Values tradition and rules",
      "Direct and straightforward",
      "Goal-oriented and practical",
      "Dedicated to community",
      "Decisive leadership"
    ],
    strengths: [
      "Outstanding organizational and management ability",
      "Reliable and responsible",
      "Decisive leadership",
      "Efficient work handling",
      "Clear communication",
      "Focus on goal achievement"
    ],
    weaknesses: [
      "May lack flexibility",
      "May be overly authoritative",
      "Difficulty with emotional expression",
      "Difficulty accepting change",
      "May overlook others' feelings"
    ],
    careers: ["Executive", "Military Officer", "Judge", "Bank President", "Accountant", "Project Manager", "Police Officer", "School Administrator", "Insurance Broker", "Politician"],
    careerDescription: "ESTJs thrive in jobs requiring organization and management. They excel in business, law, military, administration, and finance fields, preferring environments with clear rules and procedures. They feel high satisfaction in leadership roles with responsibility, excelling at improving organizational efficiency.",
    relationshipStyle: "ESTJs are loyal and dedicated partners in relationships. They value family and tradition, seeking stable and predictable relationships. They express love in practical ways and work hard for their partner and family. However, they may struggle with emotional expression and appear overly controlling.",
    communicationStyle: "They have a direct and clear communication style. They speak logically based on facts, disliking roundabout expressions. They express their opinions with confidence and clearly convey expectations and instructions. Sometimes they may come across as rude due to being too direct.",
    growthStrategies: [
      "Pay more attention to others' emotions and perspectives",
      "Recognize that sometimes new methods can also be effective",
      "Practice developing flexibility and adapting to change",
      "Practice expressing and sharing emotions",
      "Recognize the value of cooperation over control"
    ],
    stressResponse: "When stressed, ESTJs may become more controlling or critical. In extreme stress, their inferior function Introverted Feeling (Fi) may manifest negatively, showing emotional outbursts, self-doubt, or hypersensitivity to feeling unappreciated. Systematic activities and time with trusted people help recovery.",
    famousPeople: ["Hillary Clinton", "Henry Ford", "Michelle Obama", "George W. Bush"],
    compatibleTypes: ["ISTP", "ISFP", "ESTJ", "ISTJ"],
    challengingTypes: ["INFP", "ENFP", "INFJ", "INTP"],
  },
  ESFJ: {
    type: "ESFJ",
    name: "The Consul",
    nickname: "The Provider",
    emoji: "",
    description: "A warm and sociable caregiver type. They value harmonious relationships and find joy in helping and supporting others.",
    detailedDescription: "ESFJ is one of the most common types, comprising about 9-13% of the general population. Called 'Consul' or 'Provider,' they excel at caring for others and maintaining harmonious relationships. ESFJs value social harmony and have the ability to brighten any gathering's atmosphere. They respond sensitively to others' needs and find deep satisfaction in providing practical help. They respect tradition and social expectations, wanting to contribute to the community. According to Carl Jung's psychological types, ESFJs use Extraverted Feeling (Fe) as their dominant function to empathize with others' emotions and create harmonious environments.",
    scientificBackground: "ESFJ is classified as the most sociable and caregiving-oriented type in MBTI research. According to psychological studies, ESFJs show high levels of empathy and prosocial behavior, related to active mirror neuron system and limbic system activity. Research shows ESFJs have high job satisfaction in service, education, healthcare, and social welfare fields, performing best when directly interacting with and helping others. Their social harmony ability greatly contributes to teamwork and organizational culture improvement.",
    cognitiveFunctions: {
      dominant: "Extraverted Feeling (Fe)",
      auxiliary: "Introverted Sensing (Si)",
      tertiary: "Extraverted Intuition (Ne)",
      inferior: "Introverted Thinking (Ti)",
      description: "ESFJs use Extraverted Feeling (Fe) to empathize with others' emotions and pursue social harmony. Their auxiliary function, Introverted Sensing (Si), helps them value past experiences and traditions and remember details. Their tertiary function, Extraverted Intuition (Ne), helps explore new possibilities but is limited, while their inferior function, Introverted Thinking (Ti), may cause difficulty with logical analysis and objective evaluation."
    },
    characteristics: [
      "Warm and kind",
      "Sociable and cooperative",
      "Highly responsible",
      "Sensitive to others' needs",
      "Values tradition and harmony",
      "Community-oriented",
      "Loyal and dedicated"
    ],
    strengths: [
      "Outstanding interpersonal relationship abilities",
      "Organizational skills and responsibility",
      "Ability to care for others",
      "Creating positive atmospheres",
      "Providing practical help",
      "Forming strong social bonds"
    ],
    weaknesses: [
      "Sensitive to criticism",
      "Dependent on others' approval",
      "Difficulty accepting change",
      "Neglects own needs",
      "Stressed in conflict situations"
    ],
    careers: ["Teacher", "Nurse", "HR Professional", "Event Planner", "Social Worker", "Sales Professional", "Hotel Manager", "Administrative Assistant", "Counselor", "Healthcare Administrator"],
    careerDescription: "ESFJs thrive in jobs where they can directly help and care for others. They excel in education, healthcare, service, and HR fields, feeling high satisfaction in roles creating harmonious environments through people interaction. They prefer environments where teamwork is important and expectations are clear.",
    relationshipStyle: "ESFJs are warm and dedicated partners in relationships. They carefully attend to their partner's needs and provide practical support. They value traditional relationship forms and family values, cherishing anniversaries and special moments. However, they may be easily hurt when their partner's appreciation is lacking and may prioritize others' needs over their own.",
    communicationStyle: "They have a warm and considerate communication style. They speak gently considering others' feelings and provide positive, encouraging feedback. They value social etiquette and appropriate behavior, striving to make everyone feel comfortable.",
    growthStrategies: [
      "Practice recognizing and expressing your own needs and feelings",
      "Recognize that sometimes criticism is an opportunity for growth",
      "Know your own worth without others' approval",
      "View change as opportunity rather than threat",
      "Develop logical analysis abilities"
    ],
    stressResponse: "When stressed, ESFJs may try to care for others excessively or worry too much. In extreme stress, their inferior function Introverted Thinking (Ti) may manifest negatively, becoming overly critical or cynical and trying to find logical flaws. Time with loved ones and routine activities help recovery.",
    famousPeople: ["Taylor Swift", "Jennifer Garner", "Hugh Jackman", "Jennifer Lopez"],
    compatibleTypes: ["ISTP", "ISFP", "ESFJ", "ISFJ"],
    challengingTypes: ["INTP", "INTJ", "ENTP", "INFP"],
  },
  ENFJ: {
    type: "ENFJ",
    name: "The Protagonist",
    nickname: "The Teacher",
    emoji: "",
    description: "A charismatic and inspiring leader type. They are deeply interested in others' growth and development, working toward an ideal world.",
    detailedDescription: "ENFJ comprises about 2-5% of the general population. Called 'Protagonist' or 'Teacher,' they have deep passion for helping others grow and develop. ENFJs are charismatic leaders, excellent at getting people to join their vision and drawing out their highest potential. With strong empathy, they intuitively understand others' emotions and needs, actively working for an ideal society. They value harmony and cooperation, having the ability to make everyone feel valued. According to Carl Jung's psychological types, ENFJs use Extraverted Feeling (Fe) as their dominant function to deeply connect with others and pursue group harmony.",
    scientificBackground: "ENFJ is classified as the most charismatic and influential type in MBTI research. According to psychological studies, ENFJs show high levels of empathy and social intelligence, related to efficient connections between the prefrontal cortex and limbic system. Research shows ENFJs achieve high success in education, counseling, and leadership fields, performing best when helping others grow and sharing vision. Their leadership style shows high correlation with transformational leadership, positively impacting organizational and individual growth.",
    cognitiveFunctions: {
      dominant: "Extraverted Feeling (Fe)",
      auxiliary: "Introverted Intuition (Ni)",
      tertiary: "Extraverted Sensing (Se)",
      inferior: "Introverted Thinking (Ti)",
      description: "ENFJs use Extraverted Feeling (Fe) to empathize with others' emotions and form harmonious relationships. Their auxiliary function, Introverted Intuition (Ni), helps them recognize future possibilities and patterns and build vision. Their tertiary function, Extraverted Sensing (Se), helps with awareness of current situations but is limited, while their inferior function, Introverted Thinking (Ti), may cause difficulty with objective analysis and logical criticism."
    },
    characteristics: [
      "Charismatic and influential",
      "Interest in others' growth",
      "Outstanding empathy ability",
      "Idealistic and passionate",
      "Excellent communication skills",
      "Vision-oriented",
      "Ability to motivate people"
    ],
    strengths: [
      "Outstanding leadership",
      "Deep empathy ability",
      "Inspiring communication ability",
      "Ability to motivate others",
      "Ability to present and realize vision",
      "Conflict resolution and mediation ability"
    ],
    weaknesses: [
      "Takes on others' problems too much",
      "Sensitive to criticism",
      "Neglects own needs",
      "Overly idealistic",
      "May appear manipulative"
    ],
    careers: ["Teacher", "Counselor", "Politician", "Marketing Manager", "HR Professional", "Writer", "Non-profit Director", "Executive Coach", "Religious Leader", "Social Worker"],
    careerDescription: "ENFJs thrive in jobs helping others grow and develop. They excel in education, counseling, leadership, and social change fields, feeling high satisfaction in roles where they can share vision and inspire people. They perform best in cooperative environments with meaningful goals.",
    relationshipStyle: "ENFJs are dedicated and supportive partners in relationships. They deeply invest in their partner's growth and happiness, actively working to make the relationship better. They seek deep emotional connection and encourage their partner to reach their full potential. However, they may neglect their own needs or try to change their partner.",
    communicationStyle: "They have a warm and inspiring communication style. They are good at encouraging and motivating people, delivering complex ideas in understandable ways. They speak passionately about vision and possibilities, making everyone feel heard and valued.",
    growthStrategies: [
      "Recognize and respect your own needs and limits",
      "Sometimes accept that others' problems are their own",
      "Accept criticism as feedback rather than personal attack",
      "Develop logical analysis and objective evaluation abilities",
      "Accept that you cannot please everyone"
    ],
    stressResponse: "When stressed, ENFJs may try to care for others more or try to satisfy everyone. In extreme stress, their inferior function Introverted Thinking (Ti) may manifest negatively, becoming overly critical or cynical and showing compulsive analysis of details. Meaningful activities and time with trusted people help recovery.",
    famousPeople: ["Barack Obama", "Oprah Winfrey", "Martin Luther King Jr.", "Ben Affleck"],
    compatibleTypes: ["INFP", "ISFP", "ENFJ", "INFJ"],
    challengingTypes: ["ISTP", "INTP", "ESTP", "ISTJ"],
  },
  ENTJ: {
    type: "ENTJ",
    name: "The Commander",
    nickname: "The Field Marshal",
    emoji: "",
    description: "A confident and strategic leader type. They set high goals and excel at leading people to achieve them.",
    detailedDescription: "ENTJ comprises about 2-5% of the general population. Called 'Commander' or 'Field Marshal,' they are natural leaders, excellent at setting vision and organizing and leading people to realize it. ENTJs have high goals and ambition, pursuing efficiency and results. They are not afraid of challenges and do not hesitate to make difficult decisions. They solve complex problems with logical and strategic thinking, confidently pursuing their vision. According to Carl Jung's psychological types, ENTJs use Extraverted Thinking (Te) as their dominant function to build efficient systems and achieve goals.",
    scientificBackground: "ENTJ is classified as the most strategic and leadership-oriented type in MBTI research. According to psychological studies, ENTJs show high levels of achievement motivation and strategic thinking, related to executive function area activation in the prefrontal cortex. Research shows ENTJs achieve high success in business, law, politics, and entrepreneurship fields, performing best in leadership roles with high responsibility. Their leadership style shows characteristics of transformational leadership, greatly contributing to organizational growth and innovation.",
    cognitiveFunctions: {
      dominant: "Extraverted Thinking (Te)",
      auxiliary: "Introverted Intuition (Ni)",
      tertiary: "Extraverted Sensing (Se)",
      inferior: "Introverted Feeling (Fi)",
      description: "ENTJs use Extraverted Thinking (Te) to build efficient systems and achieve goals. Their auxiliary function, Introverted Intuition (Ni), helps them recognize future possibilities and patterns and build long-term vision. Their tertiary function, Extraverted Sensing (Se), helps with awareness of current situations but is limited, while their inferior function, Introverted Feeling (Fi), may cause difficulty understanding deep emotions in themselves and others."
    },
    characteristics: [
      "Confident and decisive",
      "Strategic and vision-oriented",
      "Values efficiency and results",
      "Direct and straightforward",
      "Outstanding leadership",
      "Not afraid of challenges",
      "Goal-oriented with ambition"
    ],
    strengths: [
      "Outstanding strategic thinking",
      "Strong leadership",
      "Decisive decision-making",
      "Focus on goal achievement",
      "Efficient organizational management",
      "Confident communication"
    ],
    weaknesses: [
      "Can be overly critical",
      "Tendency to ignore emotions",
      "May lack patience",
      "May appear authoritative",
      "Difficulty with work-life balance"
    ],
    careers: ["CEO", "Lawyer", "Management Consultant", "Investment Banker", "Politician", "Business Owner", "University President", "Judge", "Military General", "Startup Founder"],
    careerDescription: "ENTJs thrive in jobs requiring leadership and strategic thinking. They excel in business, law, politics, finance, and entrepreneurship fields, feeling highest satisfaction in positions with high responsibility and authority. They prefer organizations with challenging environments and growth opportunities, ultimately pursuing top leadership positions.",
    relationshipStyle: "ENTJs are loyal and dedicated partners in relationships. They approach relationships like goals, working to make them better. They support their partner's growth and pursue achievement together. However, they may struggle with emotional expression and appear cold due to overly logical approaches, sometimes prioritizing work over relationships.",
    communicationStyle: "They have a direct and confident communication style. They clearly express their ideas and opinions, persuasively conveying their vision. They value efficiency, quickly delivering the core message and disliking roundabout expressions. Sometimes they may intimidate others by being too direct.",
    growthStrategies: [
      "Pay more attention to others' emotions and perspectives",
      "Recognize that sometimes going slowly is faster",
      "Recognize the importance of work-life balance",
      "Accept that you cannot control everything",
      "Recognize that showing vulnerability can also be a strength"
    ],
    stressResponse: "When stressed, ENTJs may become more controlling or absorbed in work. In extreme stress, their inferior function Introverted Feeling (Fi) may manifest negatively, showing emotional outbursts, self-doubt, or hypersensitivity to feeling unappreciated. Physical activities like exercise and achievement-oriented activities help recovery.",
    famousPeople: ["Steve Jobs", "Margaret Thatcher", "Franklin D. Roosevelt", "Gordon Ramsay"],
    compatibleTypes: ["INTP", "ISTP", "ENTJ", "INTJ"],
    challengingTypes: ["ISFP", "INFP", "ISFJ", "ESFP"],
  },
};

// Dimension Information
export interface DimensionInfo {
  code: Dimension;
  name: string;
  poleA: { code: string; name: string; description: string };
  poleB: { code: string; name: string; description: string };
}

export const dimensionInfo: Record<Dimension, DimensionInfo> = {
  EI: {
    code: "EI",
    name: "Energy Direction",
    poleA: {
      code: "E",
      name: "Extraversion (E)",
      description: "Gains energy from the external world, enjoys interacting with people.",
    },
    poleB: {
      code: "I",
      name: "Introversion (I)",
      description: "Gains energy from the inner world, enjoys alone time and deep thinking.",
    },
  },
  SN: {
    code: "SN",
    name: "Information Gathering",
    poleA: {
      code: "S",
      name: "Sensing (S)",
      description: "Focuses on present concrete facts and details through the five senses.",
    },
    poleB: {
      code: "N",
      name: "Intuition (N)",
      description: "Captures future possibilities and patterns through intuition and insight.",
    },
  },
  TF: {
    code: "TF",
    name: "Decision Making",
    poleA: {
      code: "T",
      name: "Thinking (T)",
      description: "Makes rational decisions based on logic and objective analysis.",
    },
    poleB: {
      code: "F",
      name: "Feeling (F)",
      description: "Makes decisions considering values, emotions, and impact on others.",
    },
  },
  JP: {
    code: "JP",
    name: "Lifestyle",
    poleA: {
      code: "J",
      name: "Judging (J)",
      description: "Lives in a planned and systematic way, prefers making decisions quickly.",
    },
    poleB: {
      code: "P",
      name: "Perceiving (P)",
      description: "Lives flexibly and openly, prefers keeping options open.",
    },
  },
};

// Types for result calculation
export interface DimensionScore {
  dimension: Dimension;
  poleA: number; // E, S, T, J score
  poleB: number; // I, N, F, P score
  percentageA: number;
  percentageB: number;
  dominant: "A" | "B";
}

export interface PersonalityResult {
  typeCode: PersonalityType;
  dimensionScores: {
    EI: DimensionScore;
    SN: DimensionScore;
    TF: DimensionScore;
    JP: DimensionScore;
  };
}

// Color definitions
export const typeColors: Record<string, string> = {
  // Analysts (NT)
  INTJ: "bg-purple-500",
  INTP: "bg-purple-500",
  ENTJ: "bg-purple-500",
  ENTP: "bg-purple-500",
  // Diplomats (NF)
  INFJ: "bg-green-500",
  INFP: "bg-green-500",
  ENFJ: "bg-green-500",
  ENFP: "bg-green-500",
  // Sentinels (SJ)
  ISTJ: "bg-blue-500",
  ISFJ: "bg-blue-500",
  ESTJ: "bg-blue-500",
  ESFJ: "bg-blue-500",
  // Explorers (SP)
  ISTP: "bg-amber-500",
  ISFP: "bg-amber-500",
  ESTP: "bg-amber-500",
  ESFP: "bg-amber-500",
};

export const typeTextColors: Record<string, string> = {
  INTJ: "text-purple-500",
  INTP: "text-purple-500",
  ENTJ: "text-purple-500",
  ENTP: "text-purple-500",
  INFJ: "text-green-500",
  INFP: "text-green-500",
  ENFJ: "text-green-500",
  ENFP: "text-green-500",
  ISTJ: "text-blue-500",
  ISFJ: "text-blue-500",
  ESTJ: "text-blue-500",
  ESFJ: "text-blue-500",
  ISTP: "text-amber-500",
  ISFP: "text-amber-500",
  ESTP: "text-amber-500",
  ESFP: "text-amber-500",
};

export const typeBgColors: Record<string, string> = {
  INTJ: "from-purple-500/10 to-violet-500/10",
  INTP: "from-purple-500/10 to-violet-500/10",
  ENTJ: "from-purple-500/10 to-violet-500/10",
  ENTP: "from-purple-500/10 to-violet-500/10",
  INFJ: "from-green-500/10 to-emerald-500/10",
  INFP: "from-green-500/10 to-emerald-500/10",
  ENFJ: "from-green-500/10 to-emerald-500/10",
  ENFP: "from-green-500/10 to-emerald-500/10",
  ISTJ: "from-blue-500/10 to-cyan-500/10",
  ISFJ: "from-blue-500/10 to-cyan-500/10",
  ESTJ: "from-blue-500/10 to-cyan-500/10",
  ESFJ: "from-blue-500/10 to-cyan-500/10",
  ISTP: "from-amber-500/10 to-orange-500/10",
  ISFP: "from-amber-500/10 to-orange-500/10",
  ESTP: "from-amber-500/10 to-orange-500/10",
  ESFP: "from-amber-500/10 to-orange-500/10",
};

// Type Groups
export const typeGroups = {
  analysts: {
    name: "Analysts",
    description: "Intuitive and thinking-oriented",
    types: ["INTJ", "INTP", "ENTJ", "ENTP"] as PersonalityType[],
    color: "purple",
  },
  diplomats: {
    name: "Diplomats",
    description: "Intuitive and feeling-oriented",
    types: ["INFJ", "INFP", "ENFJ", "ENFP"] as PersonalityType[],
    color: "green",
  },
  sentinels: {
    name: "Sentinels",
    description: "Sensing and judging-oriented",
    types: ["ISTJ", "ISFJ", "ESTJ", "ESFJ"] as PersonalityType[],
    color: "blue",
  },
  explorers: {
    name: "Explorers",
    description: "Sensing and perceiving-oriented",
    types: ["ISTP", "ISFP", "ESTP", "ESFP"] as PersonalityType[],
    color: "amber",
  },
};

export const getTypeGroup = (type: PersonalityType): keyof typeof typeGroups => {
  if (typeGroups.analysts.types.includes(type)) return "analysts";
  if (typeGroups.diplomats.types.includes(type)) return "diplomats";
  if (typeGroups.sentinels.types.includes(type)) return "sentinels";
  return "explorers";
};
