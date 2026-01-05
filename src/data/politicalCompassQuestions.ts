export interface PoliticalCompassQuestion {
  id: number;
  text: string;
  category: "economic" | "social";
}

export type QuadrantType = "leftAuthoritarian" | "rightAuthoritarian" | "leftLibertarian" | "rightLibertarian";

export interface QuadrantInfo {
  name: string;
  nameEn: string;
  description: string;
  detailedDescription: string;
  historicalBackground: string;
  keyPolicies: string[];
  famousExamples: string[];
  strengthsAndWeaknesses: {
    strengths: string[];
    weaknesses: string[];
  };
  color: string;
}

export const quadrantDescriptions: Record<QuadrantType, QuadrantInfo> = {
  leftAuthoritarian: {
    name: "Left Authoritarian",
    nameEn: "Left Authoritarian",
    description: "Favors state-led economic intervention and strong central power. Supports an active government role in achieving equality.",
    detailedDescription: "Left Authoritarianism is a political orientation that economically favors state control and redistribution, while socially emphasizing strong central power and collectivist values. People in this quadrant believe the government should actively intervene to address economic inequality, but also think individual freedoms can be partially limited for social order and collective goals. Historically, this political orientation appeared in socialist states and communist regimes. In modern times, authoritarian elements can also appear in some social democratic parties.",
    historicalBackground: "The historical origins of Left Authoritarianism can be traced to 19th-century Marxism-Leninism. The Soviet Union, China, and Cuba are representative historical examples of this quadrant. These countries featured nationalization of means of production, centrally planned economies, and one-party dictatorships. During the mid-20th century, a significant portion of the world's population lived under such systems. Today, purely left-authoritarian states are rare, but some countries exhibit a mix of authoritarian governance and socialist economic policies.",
    keyPolicies: [
      "Nationalization and state control of major industries",
      "Centrally planned economy or strong government regulation",
      "Progressive taxation for wealth redistribution",
      "Universal welfare and expansion of public services",
      "State control of media and information",
      "Restriction of individual freedoms for collective goals"
    ],
    famousExamples: [
      "Vladimir Lenin (Soviet Union)",
      "Mao Zedong (China)",
      "Fidel Castro (Cuba)",
      "Joseph Stalin (Soviet Union)",
      "Clement Attlee (UK - moderate left authoritarianism)"
    ],
    strengthsAndWeaknesses: {
      strengths: [
        "Can focus on reducing economic inequality",
        "Rapid industrialization and development possible",
        "Universal education and healthcare provision possible",
        "Can pursue a unified national vision",
        "Quick response in crisis situations"
      ],
      weaknesses: [
        "Potential violation of individual freedoms and rights",
        "Economic inefficiency may occur",
        "Risk of power abuse and corruption",
        "May inhibit innovation and creativity",
        "Tendency to suppress dissenting opinions"
      ]
    },
    color: "red"
  },
  rightAuthoritarian: {
    name: "Right Authoritarian",
    nameEn: "Right Authoritarian",
    description: "Supports free market economy, traditional values, and strong state authority. Values order and stability.",
    detailedDescription: "Right Authoritarianism is a political orientation that economically supports free markets and private property rights, while socially emphasizing traditional values, strong state power, and social order. People in this quadrant believe in the efficiency of market economy, but also think a strong government is necessary to maintain social stability and traditional values. Historically, fascism, military dictatorships, and some conservative monarchies fall into this quadrant. In modern times, some right-wing populist parties or authoritarian capitalist regimes may exhibit this orientation.",
    historicalBackground: "Historical examples of Right Authoritarianism include 20th-century fascism (Mussolini in Italy, Franco in Spain), military dictatorships (Pinochet in Chile, Park Chung-hee in Korea), and modern authoritarian capitalist states. These maintained capitalist economic systems while restricting political freedoms and emphasizing traditional values and nationalism. During the Cold War, many right-authoritarian regimes received support in the name of anti-communism.",
    keyPolicies: [
      "Free market economy and business-friendly policies",
      "Protection of traditional family and religious values",
      "Strong national defense and law enforcement",
      "Strict immigration policies",
      "Emphasis on nationalism and patriotism",
      "Harsh punishment for crimes"
    ],
    famousExamples: [
      "Augusto Pinochet (Chile)",
      "Francisco Franco (Spain)",
      "Park Chung-hee (South Korea)",
      "Lee Kuan Yew (Singapore)",
      "Viktor Orban (Hungary)"
    ],
    strengthsAndWeaknesses: {
      strengths: [
        "Can focus on economic growth and development",
        "Maintains social stability and order",
        "Rapid policy decision-making and implementation",
        "Preserves traditional values and culture",
        "Strengthens national identity"
      ],
      weaknesses: [
        "Human rights violations and political oppression",
        "Economic inequality may worsen",
        "Corruption due to power concentration",
        "Disregard for minority rights",
        "Weakening of democratic institutions"
      ]
    },
    color: "blue"
  },
  leftLibertarian: {
    name: "Left Libertarian",
    nameEn: "Left Libertarian",
    description: "Values both economic equality and individual freedom. Supports progressive values and social liberties.",
    detailedDescription: "Left Libertarianism is a political orientation that pursues economic equality and redistribution while believing that individual freedoms and rights should be maximally guaranteed socially. People in this quadrant see capitalism as causing inequality, but also reject authoritarian solutions. Cooperatives, participatory democracy, environmentalism, and social justice movements are associated with this orientation. Historically, anarchism, libertarian socialism, and green politics fall into this quadrant, and in modern times, progressive social democracy or green parties show this orientation.",
    historicalBackground: "The ideological origins of Left Libertarianism can be found in anarchism, libertarian socialism, and communism. Pierre-Joseph Proudhon, Mikhail Bakunin, and Peter Kropotkin were early theorists of this ideology. In the 20th century, the anarcho-syndicalist experiment in Catalonia during the Spanish Civil War drew attention. The New Left movement of the 1960s, the rise of green politics in the 1970s-80s, and recent Occupy Movement and climate justice movements continue this tradition.",
    keyPolicies: [
      "Wealth redistribution and pursuit of economic equality",
      "Maximizing individual social freedoms",
      "Environmental protection and sustainable development",
      "Respect for minority rights and diversity",
      "Participatory democracy and decentralization",
      "Support for cooperatives and worker-owned enterprises"
    ],
    famousExamples: [
      "Noam Chomsky (USA)",
      "Bernie Sanders (USA)",
      "Jeremy Corbyn (UK)",
      "George Orwell (UK)",
      "Greta Thunberg (Sweden - environmental movement)"
    ],
    strengthsAndWeaknesses: {
      strengths: [
        "Simultaneously pursues economic equality and individual freedom",
        "Concern for environment and social justice",
        "Participatory and inclusive political culture",
        "Protection of diversity and minority rights",
        "Checks on corporate power"
      ],
      weaknesses: [
        "Questions about feasibility",
        "Difficulty with large-scale organization and implementation",
        "Possible decrease in economic efficiency",
        "Policy priority conflicts",
        "Resistance to radical change"
      ]
    },
    color: "green"
  },
  rightLibertarian: {
    name: "Right Libertarian",
    nameEn: "Right Libertarian",
    description: "Values both free market economy and individual freedom. Minimizes government intervention and respects individual rights.",
    detailedDescription: "Right Libertarianism (Libertarianism) is a political orientation that supports a completely free market and private property rights economically, while also believing that individual freedom should be maximally guaranteed socially. People in this quadrant believe in minimizing the role of government and that individuals and markets can solve problems on their own. Libertarianism, classical liberalism, and anarcho-capitalism fall into this orientation. In modern times, libertarian parties or some conservative liberal parties show this orientation.",
    historicalBackground: "The ideological origins of Right Libertarianism can be found in the classical liberalism of John Locke, Adam Smith, and Frederic Bastiat. In the 20th century, Friedrich Hayek, Milton Friedman, and Ayn Rand developed this ideology. The Libertarian Party was founded in the United States in the 1970s, and politicians like Ron Paul popularized this ideology. This ideology is also popular among tech entrepreneurs in Silicon Valley.",
    keyPolicies: [
      "Minimal government and low taxes",
      "Complete free market economy",
      "Individual freedom and privacy protection",
      "Free access to drugs, firearms, etc.",
      "Deregulation and privatization",
      "Strengthening voluntary contracts and private property rights"
    ],
    famousExamples: [
      "Friedrich Hayek (Austria)",
      "Milton Friedman (USA)",
      "Ron Paul (USA)",
      "Ayn Rand (USA)",
      "Elon Musk (USA/South Africa)"
    ],
    strengthsAndWeaknesses: {
      strengths: [
        "Emphasis on individual freedom and responsibility",
        "Maximizes market efficiency",
        "Promotes innovation and entrepreneurship",
        "Prevents government power abuse",
        "Guarantees freedom of individual choice"
      ],
      weaknesses: [
        "May worsen economic inequality",
        "Lack of social safety net",
        "Difficulty responding to market failures",
        "Difficulty solving environmental problems",
        "Public goods provision issues"
      ]
    },
    color: "purple"
  }
};

export const getQuadrant = (economic: number, social: number): QuadrantType => {
  const isLeft = economic < 0;
  const isAuthoritarian = social > 0;

  if (isLeft && isAuthoritarian) return "leftAuthoritarian";
  if (!isLeft && isAuthoritarian) return "rightAuthoritarian";
  if (isLeft && !isAuthoritarian) return "leftLibertarian";
  return "rightLibertarian";
};

// Political Compass Test Background
export const testBackground = {
  history: "The Political Compass test was created in 2001 by British political journalists. They sought to overcome the limitations of the simple left-right spectrum and more accurately measure political orientation by separating economic and social/authoritarian dimensions. This two-dimensional model was influenced by Hans Eysenck's 1950s research and is currently one of the most widely used political orientation measurement tools worldwide.",
  disclaimer: "This test was created for educational and self-understanding purposes and is not an official political classification. Political views are complex and influenced by various factors, and cannot be fully explained by a simple two-dimensional model. Do not take the test results as absolute, and use them as a starting point to explore your own political views."
};

export const politicalCompassQuestions: PoliticalCompassQuestion[] = [
  // Economic questions (Economic: Left/Right)
  // Agree = Right (+), Disagree = Left (-)
  {
    id: 1,
    text: "The market economy can regulate itself without government intervention.",
    category: "economic",
  },
  {
    id: 2,
    text: "Reducing regulations on large corporations will boost economic growth.",
    category: "economic",
  },
  {
    id: 3,
    text: "Minimum wage laws actually reduce employment.",
    category: "economic",
  },
  {
    id: 4,
    text: "Public services like healthcare and education should be privatized.",
    category: "economic",
  },
  {
    id: 5,
    text: "Raising taxes on the wealthy hinders economic development.",
    category: "economic",
  },
  {
    id: 6,
    text: "Expanding welfare programs reduces individuals' motivation to work.",
    category: "economic",
  },
  {
    id: 7,
    text: "Labor unions weaken business competitiveness.",
    category: "economic",
  },
  {
    id: 8,
    text: "Private property rights should never be violated under any circumstances.",
    category: "economic",
  },
  {
    id: 9,
    text: "Free trade benefits all nations.",
    category: "economic",
  },
  {
    id: 10,
    text: "Profit generation is more important than corporate social responsibility.",
    category: "economic",
  },

  // Social/Authority questions (Social: Authoritarian/Libertarian)
  // Agree = Authoritarian (+), Disagree = Libertarian (-)
  {
    id: 11,
    text: "Individual freedom can be partially restricted for social stability.",
    category: "social",
  },
  {
    id: 12,
    text: "Government surveillance of citizens' communications is necessary for national security.",
    category: "social",
  },
  {
    id: 13,
    text: "It is important to preserve traditional family values.",
    category: "social",
  },
  {
    id: 14,
    text: "Punishments for crimes should be strengthened.",
    category: "social",
  },
  {
    id: 15,
    text: "Budgets for the military and police should be increased.",
    category: "social",
  },
  {
    id: 16,
    text: "Patriotism education should be strengthened in schools.",
    category: "social",
  },
  {
    id: 17,
    text: "Freedom of the press can be restricted for national interests.",
    category: "social",
  },
  {
    id: 18,
    text: "Religious values should be reflected in laws.",
    category: "social",
  },
  {
    id: 19,
    text: "A strong leader can be more effective than democratic procedures.",
    category: "social",
  },
  {
    id: 20,
    text: "Drug use should be strictly punished as a crime, not a personal choice.",
    category: "social",
  },
  {
    id: 21,
    text: "Immigration should be strictly limited.",
    category: "social",
  },
  {
    id: 22,
    text: "Assemblies and protests can be restricted for social order.",
    category: "social",
  },
];

export type AnswerValue = -2 | -1 | 0 | 1 | 2;

export const answerOptions: { value: AnswerValue; label: string }[] = [
  { value: -2, label: "Strongly Disagree" },
  { value: -1, label: "Disagree" },
  { value: 0, label: "Neutral" },
  { value: 1, label: "Agree" },
  { value: 2, label: "Strongly Agree" },
];

// FAQ Data for Result Page
export const politicalCompassFAQs = [
  {
    question: "How accurate is this test?",
    answer: "This test is designed for entertainment and self-reflection purposes. While it's based on established political compass theory, it's a simplified model. Political views are complex and multidimensional, so this 2D chart can't capture all nuances. For deeper political analysis, consider reading political theory and engaging in diverse perspectives."
  },
  {
    question: "Can my political views change over time?",
    answer: "Absolutely! Political views often evolve with life experiences, education, changing circumstances, and exposure to new ideas. Many people find their position on the compass shifts as they age, experience different economic conditions, or engage with diverse communities. It's healthy and normal for political views to develop over time."
  },
  {
    question: "What do the quadrants actually mean?",
    answer: "The compass has two axes: Economic (left favors equality/redistribution, right favors free markets) and Social (authoritarian favors order/tradition, libertarian favors personal freedom). The four quadrants represent combinations: Left-Authoritarian (socialist state control), Right-Authoritarian (traditional conservatism with capitalism), Left-Libertarian (progressive social values with economic equality), and Right-Libertarian (free markets with personal freedom)."
  },
  {
    question: "Why am I not in the center?",
    answer: "Very few people land exactly in the center because most of us have at least some preferences on economic and social issues. The center represents a perfectly balanced moderate position, which is statistically uncommon. Being off-center doesn't mean you're extreme - most people cluster in moderate positions within their quadrants."
  },
  {
    question: "Does this test show political party alignment?",
    answer: "Not directly. Political parties vary by country and contain diverse factions. In the US, for example, Democrats generally lean left-libertarian to left-authoritarian, while Republicans lean right-authoritarian to right-libertarian. However, individual politicians and voters within each party can be anywhere on the compass. Use this test to understand your values, not to choose a party."
  },
  {
    question: "What if my results don't match my identity?",
    answer: "Political identity is complex and often influenced by cultural, familial, and social factors beyond ideology. You might identify as conservative but score libertarian, or consider yourself liberal but score more authoritarian than expected. This disconnect can reveal differences between your core values and your political label. Use this as an opportunity to explore why certain values resonate with you."
  }
];

// Celebrity/Political Figure Comparisons for Result Page
export const politicalCompassCelebrities = [
  {
    name: "Bernie Sanders",
    score: 65, // Approximate position: economic -6, social -4 = normalized to 65
    description: "U.S. Senator advocating democratic socialism, universal healthcare, and progressive economic policies.",
    avatar: "🌹",
    quadrant: "leftLibertarian" as QuadrantType
  },
  {
    name: "Margaret Thatcher",
    score: 75, // Approximate position: economic +5, social +3 = normalized to 75
    description: "Former UK Prime Minister known for free-market economics and strong conservative governance.",
    avatar: "👑",
    quadrant: "rightAuthoritarian" as QuadrantType
  },
  {
    name: "Noam Chomsky",
    score: 55, // Approximate position: economic -7, social -6 = normalized to 55
    description: "Linguist and political activist advocating libertarian socialism and anti-authoritarianism.",
    avatar: "📚",
    quadrant: "leftLibertarian" as QuadrantType
  },
  {
    name: "Milton Friedman",
    score: 85, // Approximate position: economic +7, social -5 = normalized to 85
    description: "Economist championing free-market capitalism and minimal government intervention.",
    avatar: "💰",
    quadrant: "rightLibertarian" as QuadrantType
  },
  {
    name: "Nelson Mandela",
    score: 50, // Approximate position: economic -4, social -3 = normalized to 50
    description: "South African leader who fought apartheid while promoting reconciliation and social justice.",
    avatar: "✊",
    quadrant: "leftLibertarian" as QuadrantType
  },
  {
    name: "Winston Churchill",
    score: 70, // Approximate position: economic +2, social +4 = normalized to 70
    description: "British Prime Minister known for wartime leadership and traditional conservative values.",
    avatar: "🎩",
    quadrant: "rightAuthoritarian" as QuadrantType
  },
  {
    name: "AOC (Alexandria Ocasio-Cortez)",
    score: 60, // Approximate position: economic -6, social -5 = normalized to 60
    description: "U.S. Representative advocating progressive policies, climate action, and economic justice.",
    avatar: "💚",
    quadrant: "leftLibertarian" as QuadrantType
  },
  {
    name: "Ron Paul",
    score: 90, // Approximate position: economic +8, social -6 = normalized to 90
    description: "Former U.S. Representative promoting libertarianism, minimal government, and personal freedom.",
    avatar: "🗽",
    quadrant: "rightLibertarian" as QuadrantType
  }
];
