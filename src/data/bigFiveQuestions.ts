export type BigFiveTrait =
  | "openness"
  | "conscientiousness"
  | "extraversion"
  | "agreeableness"
  | "neuroticism";

export interface BigFiveQuestion {
  id: number;
  text: string;
  trait: BigFiveTrait;
  reversed: boolean; // true if the question is negatively worded
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

// 10 questions per trait, mix of positive/negative items
export const bigFiveQuestions: BigFiveQuestion[] = [
  // === Openness - 10 items ===
  {
    id: 1,
    text: "I enjoy trying new ideas or experiences.",
    trait: "openness",
    reversed: false,
  },
  {
    id: 2,
    text: "I have a strong interest in art and aesthetic things.",
    trait: "openness",
    reversed: false,
  },
  {
    id: 3,
    text: "I have a vivid imagination.",
    trait: "openness",
    reversed: false,
  },
  {
    id: 4,
    text: "I am interested in abstract concepts and philosophical thinking.",
    trait: "openness",
    reversed: false,
  },
  {
    id: 5,
    text: "I try to look at things from different perspectives.",
    trait: "openness",
    reversed: false,
  },
  {
    id: 6,
    text: "I enjoy learning new things.",
    trait: "openness",
    reversed: false,
  },
  {
    id: 7,
    text: "I feel more comfortable sticking to traditional methods.",
    trait: "openness",
    reversed: true,
  },
  {
    id: 8,
    text: "I prefer familiar things over change.",
    trait: "openness",
    reversed: true,
  },
  {
    id: 9,
    text: "I am interested in creative activities (writing, drawing, music, etc.).",
    trait: "openness",
    reversed: false,
  },
  {
    id: 10,
    text: "I only consider practical and realistic things as important.",
    trait: "openness",
    reversed: true,
  },

  // === Conscientiousness - 10 items ===
  {
    id: 11,
    text: "I tend to plan and prepare things in advance.",
    trait: "conscientiousness",
    reversed: false,
  },
  {
    id: 12,
    text: "I complete assigned tasks responsibly to the end.",
    trait: "conscientiousness",
    reversed: false,
  },
  {
    id: 13,
    text: "I organize things well and try to keep them tidy.",
    trait: "conscientiousness",
    reversed: false,
  },
  {
    id: 14,
    text: "I set goals and work hard to achieve them.",
    trait: "conscientiousness",
    reversed: false,
  },
  {
    id: 15,
    text: "I tend to be punctual with appointments.",
    trait: "conscientiousness",
    reversed: false,
  },
  {
    id: 16,
    text: "I have a tendency to procrastinate until the last moment.",
    trait: "conscientiousness",
    reversed: true,
  },
  {
    id: 17,
    text: "I value rules and principles.",
    trait: "conscientiousness",
    reversed: false,
  },
  {
    id: 18,
    text: "I often lose things or forget where I put them.",
    trait: "conscientiousness",
    reversed: true,
  },
  {
    id: 19,
    text: "I pay attention to details.",
    trait: "conscientiousness",
    reversed: false,
  },
  {
    id: 20,
    text: "I tend to take my time with things unless they are urgent.",
    trait: "conscientiousness",
    reversed: true,
  },

  // === Extraversion - 10 items ===
  {
    id: 21,
    text: "I enjoy socializing with people.",
    trait: "extraversion",
    reversed: false,
  },
  {
    id: 22,
    text: "I tend to actively lead conversations at parties or gatherings.",
    trait: "extraversion",
    reversed: false,
  },
  {
    id: 23,
    text: "I like meeting new people.",
    trait: "extraversion",
    reversed: false,
  },
  {
    id: 24,
    text: "I am energetic and active.",
    trait: "extraversion",
    reversed: false,
  },
  {
    id: 25,
    text: "I tend to express my emotions actively.",
    trait: "extraversion",
    reversed: false,
  },
  {
    id: 26,
    text: "I prefer being with people rather than being alone.",
    trait: "extraversion",
    reversed: false,
  },
  {
    id: 27,
    text: "I tend to be quiet at gatherings.",
    trait: "extraversion",
    reversed: true,
  },
  {
    id: 28,
    text: "I find it difficult to start conversations with strangers.",
    trait: "extraversion",
    reversed: true,
  },
  {
    id: 29,
    text: "I tend to feel nervous in social situations.",
    trait: "extraversion",
    reversed: true,
  },
  {
    id: 30,
    text: "I prefer spending time quietly at home.",
    trait: "extraversion",
    reversed: true,
  },

  // === Agreeableness - 10 items ===
  {
    id: 31,
    text: "I empathize well with other people's feelings.",
    trait: "agreeableness",
    reversed: false,
  },
  {
    id: 32,
    text: "I find joy in helping people.",
    trait: "agreeableness",
    reversed: false,
  },
  {
    id: 33,
    text: "I respect and listen to others' opinions.",
    trait: "agreeableness",
    reversed: false,
  },
  {
    id: 34,
    text: "In conflict situations, I try to reconcile.",
    trait: "agreeableness",
    reversed: false,
  },
  {
    id: 35,
    text: "I tend to trust people by default.",
    trait: "agreeableness",
    reversed: false,
  },
  {
    id: 36,
    text: "I prefer cooperation over competition.",
    trait: "agreeableness",
    reversed: false,
  },
  {
    id: 37,
    text: "I tend to be critical of other people's behavior.",
    trait: "agreeableness",
    reversed: true,
  },
  {
    id: 38,
    text: "I can be somewhat aggressive if it's for my own benefit.",
    trait: "agreeableness",
    reversed: true,
  },
  {
    id: 39,
    text: "I enjoy arguments or often rebut others.",
    trait: "agreeableness",
    reversed: true,
  },
  {
    id: 40,
    text: "I tend not to be interested in other people's problems.",
    trait: "agreeableness",
    reversed: true,
  },

  // === Neuroticism - 10 items ===
  {
    id: 41,
    text: "I tend to worry a lot even about small things.",
    trait: "neuroticism",
    reversed: false,
  },
  {
    id: 42,
    text: "When stressed, I easily feel overwhelmed.",
    trait: "neuroticism",
    reversed: false,
  },
  {
    id: 43,
    text: "My mood changes frequently.",
    trait: "neuroticism",
    reversed: false,
  },
  {
    id: 44,
    text: "I often get caught up in negative thoughts.",
    trait: "neuroticism",
    reversed: false,
  },
  {
    id: 45,
    text: "I tend to get anxious or nervous easily.",
    trait: "neuroticism",
    reversed: false,
  },
  {
    id: 46,
    text: "I often feel depressed.",
    trait: "neuroticism",
    reversed: false,
  },
  {
    id: 47,
    text: "I am generally calm and peaceful.",
    trait: "neuroticism",
    reversed: true,
  },
  {
    id: 48,
    text: "I tend to remain calm even in difficult situations.",
    trait: "neuroticism",
    reversed: true,
  },
  {
    id: 49,
    text: "I feel emotionally stable.",
    trait: "neuroticism",
    reversed: true,
  },
  {
    id: 50,
    text: "I tend to recover quickly from stressful situations.",
    trait: "neuroticism",
    reversed: true,
  },
];

export interface BigFiveResult {
  openness: number; // 0-100
  conscientiousness: number; // 0-100
  extraversion: number; // 0-100
  agreeableness: number; // 0-100
  neuroticism: number; // 0-100
}

export type ScoreLevel = "low" | "medium" | "high";

export const getScoreLevel = (score: number): ScoreLevel => {
  if (score < 40) return "low";
  if (score < 60) return "medium";
  return "high";
};

export const scoreLevelLabels: Record<ScoreLevel, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

// E-E-A-T based detailed trait descriptions
export interface DetailedTraitInfo {
  name: string;
  nameEn: string;
  shortDescription: string;
  scientificBackground: string;
  highDescription: string;
  lowDescription: string;
  mediumDescription: string;
  highTraits: string[];
  lowTraits: string[];
  careerImplications: {
    high: string[];
    low: string[];
  };
  relationshipImplications: {
    high: string;
    low: string;
  };
  growthStrategies: {
    high: string[];
    low: string[];
  };
  facets: {
    name: string;
    description: string;
  }[];
  researchFindings: string[];
  color: string;
}

export const bigFiveDescriptions: Record<BigFiveTrait, DetailedTraitInfo> = {
  openness: {
    name: "Openness",
    nameEn: "Openness to Experience",
    shortDescription: "Represents an open attitude toward new experiences, imagination, creativity, and intellectual curiosity.",
    scientificBackground: "Openness to Experience is one of the most complex and debated factors in the Big Five personality model. According to Costa and McCrae (1992), this trait measures how open an individual is to new ideas, artistic experiences, imagination, and intellectual curiosity. Neuroscience research shows that high openness is related to activation of the dopamine system, which is connected to novelty-seeking behavior. DeYoung (2015) describes openness as a general tendency toward 'cognitive exploration,' characterized by active exploration of information and ideas.",
    highDescription: "With high openness, you are someone with strong intellectual curiosity who enjoys creative thinking. You have an open mind toward new experiences and ideas, and you like exploring abstract concepts and complex problems. You are likely to have interest in various fields such as art, literature, and philosophy, preferring to challenge traditional methods and find innovative solutions. Research shows that highly open people find greater satisfaction in creative jobs and tend to adapt better to multicultural experiences.",
    lowDescription: "With low openness, you are someone who prefers a practical and realistic approach. You feel more comfortable with proven methods and familiar environments, valuing stability and consistency over sudden changes. This is not a negative trait - in fact, a practical approach is very valuable in many situations. You prefer concrete facts and clear information, focusing on practical applications rather than abstract theories. You tend to excel in roles that provide stability and maintain established processes within organizations.",
    mediumDescription: "With moderate openness, you are someone who maintains a balance between new experiences and the familiar. Depending on the situation, you may explore innovative ideas or stick to proven methods. This flexibility allows you to adapt well to various environments. Having both creativity and practicality, you may be skilled at applying new ideas to reality.",
    highTraits: [
      "Possesses rich imagination and creative thinking ability",
      "Actively pursues new experiences and challenges",
      "Has deep sensitivity to aesthetic experiences such as art, music, and literature",
      "Tries to accept and understand diverse perspectives and values",
      "Has strong intrinsic motivation for intellectual exploration and learning",
      "Enjoys exploring abstract concepts and complex ideas",
      "Prefers challenging traditions and finding new solutions"
    ],
    lowTraits: [
      "Prefers proven methods and traditional approaches",
      "Judges situations from a practical and realistic perspective",
      "Prefers concrete and clear information over abstract concepts",
      "Feels more comfortable in stable and predictable environments",
      "Values maintaining the status quo and consistency over change",
      "Prefers situations with clear structure and rules",
      "Focuses on practical results and applications"
    ],
    careerImplications: {
      high: [
        "Can achieve excellent results in art, design, and creative fields",
        "Likely to make innovative discoveries in research, academia, and science",
        "Suitable for roles requiring creativity such as marketing, advertising, and branding",
        "Shows strength in consulting, strategic planning, and complex problem-solving positions",
        "Gets motivated in innovative environments like startups and ventures"
      ],
      low: [
        "Suitable for fields requiring accuracy and consistency such as accounting, finance, and auditing",
        "Shows strength in roles requiring standardized procedures like quality management and process management",
        "Suitable for positions where maintaining stable systems is important, such as administration and operations management",
        "Can demonstrate meticulousness in law and compliance-related work",
        "Excels in roles following established processes like manufacturing and production management"
      ]
    },
    relationshipImplications: {
      high: "You value exploring new experiences and activities together in relationships. You enjoy traveling to new places with your partner, trying new hobbies, or having deep conversations. You feel greater satisfaction in relationships that provide intellectual stimulation and emotional depth, supporting your partner's growth and change. However, you may sometimes tend to seek novelty over routine stability, which can create conflict when your partner desires stability.",
      low: "You value stability, predictability, and consistency in relationships. You prefer maintaining reliable routines and established patterns with your partner. You feel secure spending time with your partner in familiar activities and environments, preferring gradual development over sudden changes. You show strength in practical problem-solving and realistic planning, providing a stable foundation for the relationship."
    },
    growthStrategies: {
      high: [
        "Try creating concrete plans to realistically execute creative ideas",
        "Sometimes recognize and utilize the value of proven methods",
        "Recognize the importance of routine and create appropriate structure",
        "Maintain enthusiasm for new things while practicing focusing through to completion"
      ],
      low: [
        "Try something new (food, place, activity) once a week",
        "Practice looking at problems from different perspectives - try asking 'what if...'",
        "Expose yourself to various cultural experiences like art, music, and literature",
        "Step out of your comfort zone and learn new skills or hobbies"
      ]
    },
    facets: [
      { name: "Fantasy", description: "Has a rich inner world and imagination, exploring possibilities beyond reality." },
      { name: "Aesthetics", description: "Deeply responds to and appreciates the beauty of art, music, and nature." },
      { name: "Feelings", description: "Recognizes and explores own emotions, open to various emotional experiences." },
      { name: "Actions", description: "Enjoys trying new activities, places, and foods." },
      { name: "Ideas", description: "Interested in abstract concepts, philosophical discussions, and intellectual puzzles." },
      { name: "Values", description: "Challenges traditional values and explores various moral and political perspectives." }
    ],
    researchFindings: [
      "High openness shows strong correlation with creative achievement and artistic interest (Feist, 1998)",
      "Openness is the trait most highly correlated with intelligence among the Big Five (DeYoung et al., 2005)",
      "Highly open people experience greater effects from meditation and mindfulness practice (Campanella et al., 2014)",
      "This trait tends to remain relatively stable with age (Roberts et al., 2006)",
      "High openness shows positive correlation with adaptability in multicultural environments (Huang et al., 2005)"
    ],
    color: "purple",
  },
  conscientiousness: {
    name: "Conscientiousness",
    nameEn: "Conscientiousness",
    shortDescription: "Represents organizational skills, responsibility, self-discipline, and goal-orientation.",
    scientificBackground: "Conscientiousness is a personality trait encompassing self-control, organization, reliability, and goal-directed behavior. According to Roberts et al. (2014) meta-analysis, conscientiousness shows the strongest correlation with job success, academic achievement, healthy lifestyle, and longevity. Neurologically, conscientiousness is related to prefrontal cortex function, which is responsible for planning, decision-making, and impulse control. Developmental psychology research reports that conscientiousness tends to gradually increase after one's 20s.",
    highDescription: "With high conscientiousness, you are systematic and reliable. You set goals and work steadily to achieve them, with a strong sense of responsibility and good at keeping promises. You enjoy making plans and executing them, paying attention to details. Research shows that high conscientiousness has strong positive correlations with job success, academic achievement, and healthy lifestyle. You are likely to be a trusted member of any organization, with the ability to steadily progress toward long-term goals.",
    lowDescription: "With low conscientiousness, you are flexible and adaptable. You prefer responding flexibly to situations rather than following strict plans, making spontaneous decisions well. This can be an advantage in situations requiring creativity and innovation. Being less constrained by rules and structure, you are freer to explore new possibilities. However, you may have difficulty achieving long-term goals or completing tedious tasks, so external structure or system support can be effective.",
    mediumDescription: "With moderate conscientiousness, you have a balanced approach that can work organizationally when needed while maintaining flexibility. You approach important goals systematically while also being able to make spontaneous decisions depending on the situation. This balance helps you adapt to various situations.",
    highTraits: [
      "Handles work with a systematic and organized approach",
      "Completes assigned tasks with strong responsibility",
      "Sets clear goals and works steadily toward achievement",
      "Thoroughly keeps time appointments and deadlines",
      "Pays attention to details and minimizes errors",
      "Controls current impulses considering long-term results",
      "Prefers making plans and executing them step by step"
    ],
    lowTraits: [
      "Prefers being flexible and adapting to situations",
      "Values situational judgment over strict rules",
      "Feels comfortable with spontaneous decisions and free schedules",
      "Keeps various possibilities open and leaves room for choice",
      "Free from perfectionist pressure",
      "Functions better in creative and unstructured environments",
      "Tends to approach things in a relaxed, go-with-the-flow manner"
    ],
    careerImplications: {
      high: [
        "Excellent in roles requiring organizational skills like project management and operations management",
        "Suitable for fields requiring accuracy and meticulousness like accounting, finance, and law",
        "Shows strength in professions where high standards and safety are important, like medicine and engineering",
        "Likely to receive trust and respect in leadership and management roles",
        "Successfully completes long-term projects in research and academic fields"
      ],
      low: [
        "Can express freely in art, music, and creative fields",
        "Demonstrates adaptability in fast-changing environments like startups and ventures",
        "Suitable for roles requiring immediate judgment like crisis response and emergency management",
        "Shows strength in roles requiring flexible approaches like consulting and sales",
        "Suitable for innovative roles where creative problem-solving is important"
      ]
    },
    relationshipImplications: {
      high: "You provide reliability and consistency in relationships. You keep promises, act responsibly, and are a stable presence your partner can depend on. You also value setting goals and growing together in relationships. However, you may sometimes apply high standards to your partner causing conflict, and may miss out on spontaneous pleasures. Developing flexibility in relationships can be helpful.",
      low: "You provide spontaneity and fun in relationships. You enjoy impromptu dates or unexpected adventures, with strength in keeping relationships light and enjoyable. You tend to accept your partner's imperfections without criticism. However, it's important to manage expectations about long-term plans or commitments, and when your partner wants stability, recognizing this and making effort may be needed."
    },
    growthStrategies: {
      high: [
        "Sometimes try putting down plans and enjoying spontaneous moments",
        "Remind yourself that it's okay not to be perfect",
        "Consciously try not to apply excessive standards to others",
        "Intentionally include time for play and rest in your schedule"
      ],
      low: [
        "Start with small goals to experience the satisfaction of achievement",
        "Use external tools like to-do lists or calendar apps",
        "Set reminders for important appointments and deadlines",
        "Share goals with an accountable partner or mentor"
      ]
    },
    facets: [
      { name: "Competence", description: "Belief in one's abilities and effectiveness, the ability to actually perform well." },
      { name: "Order", description: "Tendency to maintain a neat and organized environment." },
      { name: "Dutifulness", description: "Strong ethical sense of obligation to keep duties and promises." },
      { name: "Achievement Striving", description: "Tendency to set high goals and work to achieve them." },
      { name: "Self-Discipline", description: "Ability to complete boring or difficult tasks to the end." },
      { name: "Deliberation", description: "Tendency to think carefully before acting and consider consequences." }
    ],
    researchFindings: [
      "Conscientiousness is the strongest personality trait predicting job success (Barrick & Mount, 1991)",
      "High conscientiousness is associated with longer lifespan (Friedman et al., 1993)",
      "Conscientiousness shows strong positive correlation with academic achievement (Poropat, 2009)",
      "This trait tends to gradually increase after one's 20s (Roberts et al., 2006)",
      "Conscientiousness is related to healthy lifestyle and lower risk behaviors (Bogg & Roberts, 2004)"
    ],
    color: "blue",
  },
  extraversion: {
    name: "Extraversion",
    nameEn: "Extraversion",
    shortDescription: "Represents sociability, energy, positive emotion expression, and stimulation-seeking.",
    scientificBackground: "Extraversion is the most widely known trait in the Big Five model, including preference for social interaction, experience of positive emotions, energy, and stimulation-seeking. According to Eysenck's (1967) arousal theory, extraverted people have lower baseline arousal levels and thus tend to seek more external stimulation. Watson and Clark's (1997) research shows that extraversion is closely related to Positive Affectivity. Brain imaging studies suggest that extraversion is related to sensitivity of the reward system.",
    highDescription: "With high extraversion, you are sociable and energetic. You gain energy from being with people and enjoy conversation and forming new relationships. You express emotions actively and tend to naturally become the center of gatherings. Research shows that extraverts experience positive emotions more frequently and have wider social support networks. You likely show excellent performance in team environments and can naturally exert influence in leadership roles.",
    lowDescription: "With low extraversion, you are introverted and thoughtful. You recharge your energy from time alone and prefer a small number of deep relationships. This is different from shyness or social anxiety - you simply prefer quiet and calm environments. You excel at tasks requiring deep thinking and concentration, with excellent listening and observation abilities. Research shows that introverted people show higher productivity when working alone and have strengths in developing deep expertise.",
    mediumDescription: "With moderate extraversion, you show characteristics of an 'ambivert.' Depending on the situation, you may act socially or enjoy time alone. This flexibility is a great strength in adapting to various social situations. You know how to expend energy when needed while also appropriately taking time to recharge.",
    highTraits: [
      "Gains energy from being with people",
      "Leads conversations and easily forms new relationships",
      "Expresses emotions actively and enthusiastically",
      "Prefers active and stimulating environments",
      "Naturally takes on central roles at gatherings",
      "Maintains an optimistic and enthusiastic attitude",
      "Feels comfortable in various social situations"
    ],
    lowTraits: [
      "Recharges energy from time alone",
      "Prefers a small number of deep relationships",
      "Prefers listening and observing over talking",
      "Functions better in quiet and calm environments",
      "Tends to think carefully before speaking",
      "Excels at individual work requiring concentration",
      "Values privacy and personal space"
    ],
    careerImplications: {
      high: [
        "Suitable for roles where relationships are important like sales, marketing, and PR",
        "Shows strength in leadership and management roles that involve leading teams",
        "Suitable for fields requiring presentations like education, lectures, and presentations",
        "Thrives in active environments like event planning and entertainment",
        "Suitable for entrepreneurship and business development where networking is important"
      ],
      low: [
        "Suitable for roles requiring deep concentration like research and analysis",
        "Shows strength in independent work like writing, editing, and programming",
        "Suitable for fields requiring detailed work like accounting and data analysis",
        "Suitable for roles expressing individual creativity like art and design",
        "Suitable for fields requiring deep expertise like R&D and technical specialists"
      ]
    },
    relationshipImplications: {
      high: "You value active social activities and shared experiences in relationships. You enjoy frequently gathering with friends, going out together, and meeting new people with your partner. You actively express emotions and bring passion and vitality to relationships. However, it's important to understand and respect when your partner wants quiet time. Also, consciously making time for deep one-on-one conversations can add depth to relationships.",
      low: "You value depth and intimacy in relationships. You focus on a small number of deep relationships, cherishing quiet time together with your partner. You have excellent listening ability and deepen relationships through thoughtful conversations. However, practicing more actively expressing your feelings and thoughts can help communication with your partner. Effort to participate together when your partner wants social activities is also positive for the relationship."
    },
    growthStrategies: {
      high: [
        "Intentionally make time for reflection alone",
        "Recognize and practice the value of deep one-on-one conversations",
        "Pause and listen to others before speaking",
        "Develop hobbies or activities you can do alone"
      ],
      low: [
        "Start with comfortable small gatherings to build social muscles",
        "Join groups or communities that share your interests",
        "Practice expressing your thoughts and opinions more actively",
        "Sometimes participate in social activities despite energy consumption"
      ]
    },
    facets: [
      { name: "Warmth", description: "Easily expresses friendliness and affection toward others." },
      { name: "Gregariousness", description: "Prefers and enjoys being with other people." },
      { name: "Assertiveness", description: "Tendency to express opinions and take initiative in groups." },
      { name: "Activity", description: "High energy level and preference for staying busy." },
      { name: "Excitement-Seeking", description: "Tendency to seek excitement and stimulating experiences." },
      { name: "Positive Emotions", description: "Frequently experiences positive feelings like joy, happiness, and enthusiasm." }
    ],
    researchFindings: [
      "Extraversion is the personality trait most strongly correlated with subjective well-being (Steel et al., 2008)",
      "Extraverted leaders are more effective with passive teams, while introverted leaders are more effective with proactive teams (Grant et al., 2011)",
      "Extraversion and introversion are related to differences in optimal arousal levels (Eysenck, 1967)",
      "Introverted people respond more to internal motivation than external rewards (Depue & Collins, 1999)",
      "Ambiversion (moderate extraversion) may be most effective for sales performance (Grant, 2013)"
    ],
    color: "amber",
  },
  agreeableness: {
    name: "Agreeableness",
    nameEn: "Agreeableness",
    shortDescription: "Represents cooperativeness, trust, altruism, and consideration for others.",
    scientificBackground: "Agreeableness is a personality trait representing an individual's interpersonal orientation, including cooperativeness, trust, altruism, and modesty. From an evolutionary psychology perspective, agreeableness can be seen as an adaptation to the social demands of group living. According to Graziano and Eisenberg (1997), high agreeableness is related to prosocial behavior, low aggression, and better interpersonal relationships. Neuroscience research shows that agreeableness is related to mirror neuron system activity, which is connected to empathy ability.",
    highDescription: "With high agreeableness, you are warm and considerate. You respond sensitively to others' feelings and needs, finding joy in cooperating and helping. You pursue harmony over conflict and easily form trusting relationships with people. Research shows that high agreeableness has strong positive correlations with teamwork, relationship satisfaction, and prosocial behavior. You promote cooperation and create a positive atmosphere within organizations.",
    lowDescription: "With low agreeableness, you are independent and analytical in your thinking. You evaluate situations from a critical perspective and can make difficult decisions when needed. This is not coldness but objectivity. You show strength in competitive environments and can clearly assert your position. Research shows that low agreeableness is related to negotiation ability, critical thinking, and ability to make difficult decisions in leadership roles.",
    mediumDescription: "With moderate agreeableness, you maintain balance between cooperation and competition, between consideration for others and self-assertion. Depending on the situation, you may act cooperatively or firmly maintain your position when needed. This flexibility allows you to adapt well to various interpersonal situations.",
    highTraits: [
      "Empathizes sensitively with others' feelings and needs",
      "Finds genuine joy in helping and cooperating",
      "Basically trusts people and expects the best",
      "Pursues harmony and reconciliation over conflict",
      "Modest and doesn't boast about oneself",
      "Respects others' perspectives and opinions",
      "Prioritizes team and group benefits over personal gain"
    ],
    lowTraits: [
      "Takes an independent and competitive approach",
      "Evaluates situations from a critical and analytical perspective",
      "Clearly expresses own opinions and positions",
      "Can make difficult decisions when needed",
      "Recognizes self-interest and asserts it in negotiations",
      "Verifies information with a skeptical attitude",
      "Tends to stick to principles rather than compromise"
    ],
    careerImplications: {
      high: [
        "Suitable for care fields like nursing, social work, and counseling",
        "Shows strength in roles where relationships are important like HR and customer service",
        "Suitable for fields helping others' growth like education and mentoring",
        "Shows excellent performance in team-based cooperative environments",
        "Demonstrates ability in mediation and conflict resolution roles"
      ],
      low: [
        "Can make difficult decisions in management and leadership roles",
        "Shows strength in negotiation, contracts, and legal fields",
        "Suitable for roles requiring critical perspective like criticism, editing, and quality control",
        "Achieves results in competitive environments like sales and trading",
        "Suitable for fields requiring objective judgment like investigation and research"
      ]
    },
    relationshipImplications: {
      high: "You prioritize your partner's needs and happiness in relationships, striving to create harmonious and peaceful relationships. With excellent empathy ability, you understand and support your partner's feelings well. You may tend to avoid conflict, sometimes not expressing your own needs. For healthy relationships, it may help to practice setting your own boundaries and expressing your opinions when needed.",
      low: "You communicate directly and honestly in relationships. You clearly express your opinions and needs, maintaining personal independence in relationships as well. You may sometimes appear critical to your partner, so it's important to consider their feelings when giving feedback. Paying more attention to your partner's emotional needs and practicing expressing empathy can add depth to relationships."
    },
    growthStrategies: {
      high: [
        "Practice recognizing and expressing your own needs and boundaries",
        "Recognize that it's okay not to try to please everyone",
        "Remember that sometimes saying 'no' is necessary for healthy relationships",
        "Practice critical thinking and giving constructive feedback"
      ],
      low: [
        "Practice looking at situations from others' perspectives",
        "Recognize and practice the value of cooperation and teamwork",
        "Consider others' feelings when delivering criticism",
        "Practice giving people chances to build trust"
      ]
    },
    facets: [
      { name: "Trust", description: "Tendency to believe others are honest and have good intentions." },
      { name: "Straightforwardness", description: "Tendency to act truthfully and without deception." },
      { name: "Altruism", description: "Tendency to help others and care about their welfare." },
      { name: "Compliance", description: "Tendency to avoid conflict and yield in disputes." },
      { name: "Modesty", description: "Tendency to avoid self-promotion and act humbly." },
      { name: "Tender-Mindedness", description: "Tendency to empathize and sympathize with others' needs." }
    ],
    researchFindings: [
      "Agreeableness shows strong positive correlation with relationship satisfaction (Malouff et al., 2010)",
      "High agreeableness has positive impact on team performance (Bell, 2007)",
      "Low agreeableness is associated with higher income and leadership positions (Judge et al., 2012)",
      "Agreeableness is the strongest predictor of prosocial behavior (Graziano et al., 2007)",
      "Women on average show higher agreeableness than men (Costa et al., 2001)"
    ],
    color: "green",
  },
  neuroticism: {
    name: "Neuroticism",
    nameEn: "Neuroticism",
    shortDescription: "Represents emotional instability, anxiety, and sensitivity to stress.",
    scientificBackground: "Neuroticism is a personality trait representing the tendency to experience negative emotions, including anxiety, depression, anger, and self-consciousness. This trait is sometimes measured inversely as 'Emotional Stability.' According to Gray's (1970) reinforcement sensitivity theory, people high in neuroticism have a more active Behavioral Inhibition System (BIS), making them more sensitive to threat and punishment signals. Neuroscience research shows that neuroticism is related to amygdala reactivity and the stress hormone system.",
    highDescription: "With high neuroticism, you are emotionally sensitive and perceptive. You react strongly to stress or threats and may experience worry and anxiety more frequently. This is not a weakness but your unique characteristic. High neuroticism means excellent danger detection ability, which was an important adaptive function evolutionarily. You experience deep emotions and may show strength in artistic or creative expression. You have high self-awareness and understand your emotional state well.",
    lowDescription: "With low neuroticism, you are emotionally stable and calm. You maintain composure even in stressful situations and recover quickly from negative emotions. You can make cool-headed judgments in crisis situations and maintain performance under pressure. Research shows that low neuroticism has positive correlations with overall life satisfaction, stress coping ability, and physical health. You are a stable and predictable presence, providing comfort to those around you.",
    mediumDescription: "With moderate neuroticism, you have an appropriate level of emotional responsiveness. You respond to stress without being overly overwhelmed, experiencing emotions while also being able to regulate them appropriately. This balance helps you recognize emotional signals while functioning effectively.",
    highTraits: [
      "Has high depth and intensity of emotions",
      "Quickly detects risks and potential problems",
      "Has high self-awareness and observes inner states well",
      "Has sensitive and careful observation abilities",
      "May have excellent empathy ability",
      "Can add depth to artistic and creative expression",
      "Maintains high standards with perfectionist tendencies"
    ],
    lowTraits: [
      "Emotionally stable and calm",
      "Maintains composure even in stressful situations",
      "Recovers quickly from negative emotions",
      "Doesn't frequently experience worry or anxiety",
      "Maintains performance under pressure",
      "Has an optimistic and positive outlook",
      "Has a confident and stable self-image"
    ],
    careerImplications: {
      high: [
        "Can utilize emotional depth in creative fields (writing, art, music)",
        "Can demonstrate empathy ability in counseling and therapy fields",
        "May be suitable for roles predicting problems like quality control and risk assessment",
        "May show strength in fields requiring careful attention like research and analysis",
        "Functions better in structured and predictable environments"
      ],
      low: [
        "Suitable for high-pressure roles like crisis management and emergency response",
        "Makes stable decisions in leadership and management roles",
        "Shows strength in high-stress situations like negotiation and trading",
        "Suitable for high-risk occupations like military, police, and firefighting",
        "Maintains stability in volatile environments (startups, investments)"
      ]
    },
    relationshipImplications: {
      high: "You pursue deep emotional connection in relationships. You respond sensitively to your partner's emotional changes, striving to form intimate bonds. Sometimes worry or anxiety may affect relationships, so it's important to honestly share your feelings with your partner and ask for support when needed. Developing stress management skills can help you function more stably in relationships as well. Clearly communicate your needs to your partner.",
      low: "You provide stability and calmness in relationships. You can be a solid support when your partner is going through tough times. However, being less emotionally responsive may be perceived as indifference by your partner, so consciously expressing emotions and practicing responding to your partner's emotional needs can be helpful. Effort to respect and understand your partner's emotional experiences deepens relationships."
    },
    growthStrategies: {
      high: [
        "Develop emotion regulation ability through mindfulness and meditation",
        "Recognize and restructure negative thought patterns through cognitive-behavioral techniques (CBT)",
        "Increase stress resistance through regular exercise and sufficient sleep",
        "Share emotions with trusted people and receive social support",
        "Reduce self-criticism and practice self-compassion",
        "Set designated worry time and practice postponing worries outside that time"
      ],
      low: [
        "Practice empathizing more with others' emotional experiences",
        "More consciously recognize and express your own emotions",
        "Recognize how emotions influence decision-making",
        "Pay more attention to the emotional needs of your partner or close ones"
      ]
    },
    facets: [
      { name: "Anxiety", description: "Tendency to frequently experience worry, tension, and unease." },
      { name: "Angry Hostility", description: "Tendency to respond with anger to frustration or injustice." },
      { name: "Depression", description: "Tendency to experience sadness, guilt, and loneliness." },
      { name: "Self-Consciousness", description: "Tendency to feel shy or embarrassed in front of others." },
      { name: "Impulsiveness", description: "Tendency to have difficulty controlling temptation or impulses." },
      { name: "Vulnerability", description: "Tendency to be overwhelmed by stress and have difficulty coping." }
    ],
    researchFindings: [
      "Neuroticism is the strongest personality predictor of depression and anxiety disorders (Lahey, 2009)",
      "Low neuroticism is related to overall happiness and life satisfaction (Steel et al., 2008)",
      "Neuroticism can be reduced through mindfulness training (Keng et al., 2011)",
      "High neuroticism is related to stress-related health problems (Suls & Bunde, 2005)",
      "Cognitive-behavioral therapy (CBT) is effective in alleviating neurotic tendencies (Quilty et al., 2008)"
    ],
    color: "rose",
  },
};

export const traitColors: Record<BigFiveTrait, string> = {
  openness: "bg-purple-500",
  conscientiousness: "bg-blue-500",
  extraversion: "bg-amber-500",
  agreeableness: "bg-green-500",
  neuroticism: "bg-rose-500",
};

export const traitTextColors: Record<BigFiveTrait, string> = {
  openness: "text-purple-500",
  conscientiousness: "text-blue-500",
  extraversion: "text-amber-500",
  agreeableness: "text-green-500",
  neuroticism: "text-rose-500",
};

export const traitBgColors: Record<BigFiveTrait, string> = {
  openness: "from-purple-500/10 to-violet-500/10",
  conscientiousness: "from-blue-500/10 to-cyan-500/10",
  extraversion: "from-amber-500/10 to-orange-500/10",
  agreeableness: "from-green-500/10 to-emerald-500/10",
  neuroticism: "from-rose-500/10 to-pink-500/10",
};

export const traitOrder: BigFiveTrait[] = [
  "openness",
  "conscientiousness",
  "extraversion",
  "agreeableness",
  "neuroticism",
];

// Result profile type
export interface PersonalityProfile {
  summary: string;
  detailedSummary: string;
  strengths: string[];
  growthAreas: string[];
  dominantTraits: BigFiveTrait[];
  overallInterpretation: string;
}

export const getPersonalityProfile = (result: BigFiveResult): PersonalityProfile => {
  const traits: { trait: BigFiveTrait; score: number }[] = [
    { trait: "openness", score: result.openness },
    { trait: "conscientiousness", score: result.conscientiousness },
    { trait: "extraversion", score: result.extraversion },
    { trait: "agreeableness", score: result.agreeableness },
    { trait: "neuroticism", score: result.neuroticism },
  ];

  const sortedTraits = [...traits].sort((a, b) => b.score - a.score);
  const highestTrait = sortedTraits[0];
  const secondHighest = sortedTraits[1];
  const lowestTrait = sortedTraits[4];

  // Dominant traits (60% or above)
  const dominantTraits = traits.filter(t => t.score >= 60).map(t => t.trait);

  const summaries: Record<string, string> = {
    openness: "You are a creative and curious explorer type. You are open to new experiences and ideas, with rich artistic sensitivity.",
    conscientiousness: "You are a systematic and goal-oriented achiever type. You have a strong sense of responsibility, are reliable, and pursue tasks methodically.",
    extraversion: "You are a sociable and active energizer type. You enjoy mingling with people and radiate positive energy.",
    agreeableness: "You are a warm and cooperative harmonious type. You have deep consideration for others and excellent empathy ability.",
    neuroticism: "You are a sensitive emotional type with rich sensibility. You experience deep emotions and respond sensitively to your surroundings.",
  };

  // Detailed summary generation
  const detailedSummaries: Record<string, string> = {
    openness: `You are classified as a type where Openness is most prominent in the Big Five personality model. This assessment is based on the NEO-PI-R test developed by Costa and McCrae in the 1990s. Highly open people prefer exploring new perspectives and ideas rather than settling for traditional methods. Research shows that people with this trait particularly excel in art, science, and innovation fields, and also have excellent adaptability in multicultural environments.`,
    conscientiousness: `You are classified as a type where Conscientiousness is most prominent in the Big Five personality model. In psychological research, conscientiousness is known as the strongest personality trait predicting job success and academic achievement (Barrick & Mount, 1991). People with high conscientiousness show excellent ability in goal setting, planning, and execution, and tend to be recognized as trusted members within organizations.`,
    extraversion: `You are classified as a type where Extraversion is most prominent in the Big Five personality model. According to Eysenck's arousal theory, extraverted people have lower baseline arousal levels and gain energy from external stimulation and social interaction. Research shows that extraversion is the personality trait most strongly correlated with subjective well-being (Steel et al., 2008), showing strength in leadership roles and people-centered occupations.`,
    agreeableness: `You are classified as a type where Agreeableness is most prominent in the Big Five personality model. Agreeableness is a trait that includes cooperativeness, empathy ability, and altruism, having great impact on relationship quality and teamwork. According to Graziano and Eisenberg (1997), high agreeableness is the strongest predictor of prosocial behavior and also shows strong positive correlation with relationship satisfaction.`,
    neuroticism: `You are classified as a type where Neuroticism is most prominent in the Big Five personality model. This means being emotionally sensitive and perceptive, which is not necessarily a negative trait. High neuroticism is related to danger detection ability, self-awareness, and deep emotional experience. What's important is learning how to understand and effectively manage this trait.`,
  };

  const strengths: string[] = [];
  const growthAreas: string[] = [];

  // Strengths based on high traits
  if (result.openness >= 60) {
    strengths.push("Solves problems with creative thinking and innovative ideas");
    strengths.push("Seizes growth opportunities with an open attitude toward new experiences");
  }
  if (result.conscientiousness >= 60) {
    strengths.push("Achieves goals with excellent organizational skills and planning");
    strengths.push("Contributes to teams with high responsibility and reliability");
  }
  if (result.extraversion >= 60) {
    strengths.push("Leads cooperation with smooth interpersonal relations and communication skills");
    strengths.push("Brings vitality to teams with positive energy and leadership");
  }
  if (result.agreeableness >= 60) {
    strengths.push("Forms deep relationships with excellent empathy ability");
    strengths.push("Creates a harmonious environment with cooperativeness and consideration");
  }
  if (result.neuroticism <= 40) {
    strengths.push("Maintains composure even in stressful situations with emotional stability");
    strengths.push("Provides trust in crisis situations with calm demeanor");
  }

  // Growth areas
  if (result.openness <= 40) {
    growthAreas.push("Try having a more open attitude toward new experiences - you can start by trying one new thing per week");
  }
  if (result.conscientiousness <= 40) {
    growthAreas.push("Develop habits of goal setting and planning - start with small goals to experience a sense of achievement");
  }
  if (result.extraversion <= 40) {
    growthAreas.push("Gradually increase social interactions - starting with comfortable small gatherings is effective");
  }
  if (result.agreeableness <= 40) {
    growthAreas.push("Practice thinking from others' perspectives - empathy ability can be developed through practice");
  }
  if (result.neuroticism >= 60) {
    growthAreas.push("Develop stress management and emotion regulation skills - mindfulness or meditation is effective");
    growthAreas.push("Learn how to restructure negative thought patterns through cognitive-behavioral techniques (CBT)");
  }

  if (strengths.length === 0) {
    strengths.push("Adapts to various situations with balanced personality traits");
    strengths.push("Responds flexibly with a non-extreme approach");
  }

  if (growthAreas.length === 0) {
    growthAreas.push("While maintaining your current balanced personality, try consciously exercising needed traits in specific situations");
    growthAreas.push("Further develop your strengths to enhance expertise");
  }

  // Generate overall interpretation
  const overallInterpretation = generateOverallInterpretation(result, highestTrait.trait, secondHighest.trait);

  return {
    summary: summaries[highestTrait.trait],
    detailedSummary: detailedSummaries[highestTrait.trait],
    strengths: strengths.slice(0, 4),
    growthAreas: growthAreas.slice(0, 3),
    dominantTraits,
    overallInterpretation,
  };
};

// E-E-A-T based overall interpretation generation
function generateOverallInterpretation(result: BigFiveResult, highest: BigFiveTrait, secondHighest: BigFiveTrait): string {
  const interpretations: string[] = [];

  // Introduction
  interpretations.push(`We provide a comprehensive analysis of your personality profile based on your Big Five personality test results. This test is based on the NEO-PI-R model developed by Costa and McCrae (1992), one of the most scientifically validated personality assessment tools in modern psychology. The reliability and validity of this model have been proven through decades of research, showing consistent results across various cultures worldwide.`);

  // Interpretation based on trait combinations
  if (result.openness >= 60 && result.conscientiousness >= 60) {
    interpretations.push(`You show a rare combination of both high Openness and Conscientiousness. This means you have creative ideas while also having the ability to systematically execute them. Research shows that this combination has a strong correlation with success in innovative projects. You are a 'visionary executor' type, with excellent ability to turn ideas into reality.`);
  }

  if (result.extraversion >= 60 && result.agreeableness >= 60) {
    interpretations.push(`You show a combination of both high Extraversion and Agreeableness. This means a sociable yet cooperative personality, showing particular strengths in interpersonal relationships. This combination of traits predicts excellent performance in team leadership, customer relations, and mediation roles. People are likely to feel both comfort and energy when with you.`);
  }

  if (result.neuroticism <= 40 && result.conscientiousness >= 60) {
    interpretations.push(`You show both emotionally stable and conscientious traits. This combination is one of the personality profiles showing the strongest correlation with career success. You can calmly execute plans even in stressful situations, with excellent ability to steadily progress toward long-term goals. You can particularly demonstrate strengths in leadership roles or high-pressure environments.`);
  }

  if (result.openness >= 60 && result.extraversion <= 40) {
    interpretations.push(`You show both high Openness and introverted traits. This is a 'contemplative creator' type combining deep thinking with creativity. You likely develop ideas in solitary time and show excellent results in independent creative activities. You can demonstrate strengths in fields requiring both concentration and creativity, such as writing, research, and art.`);
  }

  // Interpretation for balanced profile
  const allMedium = Object.values(result).every(score => score >= 40 && score <= 60);
  if (allMedium) {
    interpretations.push(`You show a balanced personality profile with all traits in the middle range. This means you are not extreme and can flexibly adapt to situations. You can demonstrate adaptability in various environments and roles, and can also cooperate smoothly with people of different personality types. This flexibility can be a great strength in the complex and demanding modern society.`);
  }

  // Conclusion
  interpretations.push(`Personality is not fixed but can develop through experience and conscious effort. Research shows that Big Five traits tend to gradually change with age (Roberts et al., 2006) and can also be adjusted through intentional practice and environmental changes. Use these results as a tool for self-understanding, but don't accept them as a framework limiting your potential. We hope this information helps you make better life decisions by understanding and utilizing your personality traits.`);

  return interpretations.join('\n\n');
}
