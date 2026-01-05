export interface MoralAlignmentQuestion {
  id: number;
  text: string;
  axis: "goodEvil" | "lawfulChaotic";
  direction: 1 | -1; // 1 = Agree means Good/Lawful, -1 = Agree means Evil/Chaotic
}

export const moralAlignmentQuestions: MoralAlignmentQuestion[] = [
  // Good/Evil axis questions (Altruism vs Selfishness, Moral attitudes)
  // direction 1: Agree = Good(+), direction -1: Agree = Evil(-)
  {
    id: 1,
    text: "Helping others is valuable in itself, even without expecting anything in return.",
    axis: "goodEvil",
    direction: 1,
  },
  {
    id: 2,
    text: "Sometimes using others for your purposes can be justified.",
    axis: "goodEvil",
    direction: -1,
  },
  {
    id: 3,
    text: "If a stranger is in trouble, I would help them even if it means delaying my schedule.",
    axis: "goodEvil",
    direction: 1,
  },
  {
    id: 4,
    text: "The world is survival of the fittest, and the strong surviving is the law of nature.",
    axis: "goodEvil",
    direction: -1,
  },
  {
    id: 5,
    text: "All life has equal dignity.",
    axis: "goodEvil",
    direction: 1,
  },
  {
    id: 6,
    text: "Revenge is justified, and those who harm me should be paid back.",
    axis: "goodEvil",
    direction: -1,
  },
  {
    id: 7,
    text: "When I see others suffering, my heart aches and I feel empathy.",
    axis: "goodEvil",
    direction: 1,
  },
  {
    id: 8,
    text: "It is natural to push competitors aside for my own success.",
    axis: "goodEvil",
    direction: -1,
  },
  {
    id: 9,
    text: "Forgiveness is a virtue and is better than holding grudges.",
    axis: "goodEvil",
    direction: 1,
  },
  {
    id: 10,
    text: "If the outcome is good, it's okay if someone gets hurt in the process.",
    axis: "goodEvil",
    direction: -1,
  },
  {
    id: 11,
    text: "Protecting the weak is a duty of society.",
    axis: "goodEvil",
    direction: 1,
  },
  {
    id: 12,
    text: "Trust is just a weakness to be exploited.",
    axis: "goodEvil",
    direction: -1,
  },

  // Lawful/Chaotic axis questions (Rules/Order vs Freedom/Individualism)
  // direction 1: Agree = Lawful(+), direction -1: Agree = Chaotic(-)
  {
    id: 13,
    text: "Laws and rules must be followed to maintain social order.",
    axis: "lawfulChaotic",
    direction: 1,
  },
  {
    id: 14,
    text: "Flexible judgment according to the situation is more important than rules.",
    axis: "lawfulChaotic",
    direction: -1,
  },
  {
    id: 15,
    text: "Promises should be kept no matter what the circumstances.",
    axis: "lawfulChaotic",
    direction: 1,
  },
  {
    id: 16,
    text: "Questioning authority is a characteristic of a healthy society.",
    axis: "lawfulChaotic",
    direction: -1,
  },
  {
    id: 17,
    text: "Traditions and customs should be respected and not easily changed.",
    axis: "lawfulChaotic",
    direction: 1,
  },
  {
    id: 18,
    text: "Individual freedom takes priority over social norms.",
    axis: "lawfulChaotic",
    direction: -1,
  },
  {
    id: 19,
    text: "Decisions of an organization or group should take precedence over individual opinions.",
    axis: "lawfulChaotic",
    direction: 1,
  },
  {
    id: 20,
    text: "Sometimes breaking the rules can be the right thing to do.",
    axis: "lawfulChaotic",
    direction: -1,
  },
  {
    id: 21,
    text: "Organizations with clear hierarchies are efficient.",
    axis: "lawfulChaotic",
    direction: 1,
  },
  {
    id: 22,
    text: "I act according to my own moral standards and don't follow others' standards.",
    axis: "lawfulChaotic",
    direction: -1,
  },
  {
    id: 23,
    text: "Making plans and acting according to them is important.",
    axis: "lawfulChaotic",
    direction: 1,
  },
  {
    id: 24,
    text: "I am not afraid of spontaneous decisions and change.",
    axis: "lawfulChaotic",
    direction: -1,
  },
];

export type AnswerValue = 1 | 2 | 3 | 4 | 5;

export const answerOptions: { value: AnswerValue; label: string }[] = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

export type AlignmentType =
  | "lawfulGood"
  | "neutralGood"
  | "chaoticGood"
  | "lawfulNeutral"
  | "trueNeutral"
  | "chaoticNeutral"
  | "lawfulEvil"
  | "neutralEvil"
  | "chaoticEvil";

export interface AlignmentInfo {
  name: string;
  nameKo: string;
  nickname: string;
  description: string;
  detailedDescription: string;
  philosophicalBackground: string;
  traits: string[];
  strengths: string[];
  weaknesses: string[];
  realWorldExamples: string[];
  examples: string[];
  color: string;
}

export const testBackground = {
  history: "The Moral Alignment System was first introduced in the Dungeons & Dragons (D&D) role-playing game, created by Gary Gygax and Dave Arneson in 1974. Initially, it started with a single axis of 'Lawful,' 'Neutral,' and 'Chaotic,' but in 1977, with AD&D (Advanced Dungeons & Dragons) 1st Edition, the 'Good' and 'Evil' axis was added, completing the current nine-alignment system. This system has been used as a tool to define the moral and ethical perspectives of characters, and over the past 50 years has influenced countless fantasy media and popular culture.",
  purpose: "This test analyzes your moral values and behavioral tendencies based on the D&D alignment system. The 'Good and Evil' axis measures the spectrum between altruism and selfishness, mercy and cruelty, while the 'Lawful and Chaotic' axis measures respect for rules and tradition versus preference for personal freedom and flexibility. Through this, you can understand what decisions you tend to make in various situations and what values underlie those decisions.",
  disclaimer: "This test is for fun and self-reflection and is not a psychological or ethical diagnostic tool. The D&D alignment system is a simplified model for fantasy role-playing, and actual human morality and ethics are much more complex and can change depending on the situation. Please do not take the results as absolute, but use them as a starting point for exploring your own values.",
};

// FAQ Data for Result Page
export const moralAlignmentFAQs = [
  {
    question: "Can my alignment change over time?",
    answer: "Absolutely! Your moral alignment isn't fixed - it can shift based on life experiences, personal growth, and changing values. Many people find their alignment evolves as they mature, face new challenges, or reconsider their beliefs. It's perfectly normal to retake this test in a few months and get a different result if your perspectives have changed."
  },
  {
    question: "Is one alignment better than another?",
    answer: "No alignment is inherently 'better' in the D&D system - they're simply different approaches to morality and order. Each alignment has its own strengths and weaknesses. In real life, most successful societies value 'Good' alignments over 'Evil' ones, but the Law vs Chaos axis is more about personal preference. What matters most is how you use your tendencies to contribute positively to the world around you."
  },
  {
    question: "What's the difference between True Neutral and not caring?",
    answer: "True Neutral can mean several things: actively seeking balance (like a druid maintaining nature's equilibrium), being pragmatic and situation-dependent, or simply not viewing the world through a good/evil lens. 'Not caring' would be more apathetic, while True Neutral people often care deeply - they just don't see morality as black and white. Some True Neutrals are actually very thoughtful and principled, just in a different way."
  },
  {
    question: "Why did I get a different result than expected?",
    answer: "There's often a gap between how we see ourselves and how we actually behave. We might aspire to be one alignment while our actual choices reflect another. Also, this test measures tendencies across many situations - you might be Lawful in some contexts and Chaotic in others. Consider the result as feedback about your overall patterns rather than an absolute definition of who you are."
  },
  {
    question: "How does this relate to real-world ethics?",
    answer: "The D&D alignment system is a simplified model created for a fantasy game, not a comprehensive ethical framework. Real-world morality is far more complex and nuanced. However, it can be a useful starting point for self-reflection about your values regarding authority, rules, personal freedom, altruism, and self-interest. Use it as a conversation starter, not as a definitive moral guide."
  },
  {
    question: "Can I be on the border between two alignments?",
    answer: "Yes! The alignment system uses numerical axes, so scoring close to 0 on either axis means you're near the border. For example, if your Good/Evil score is +2, you're only slightly Good-leaning and might exhibit both Good and Neutral behaviors. Real people are complex and rarely fit perfectly into one box - the system is just a framework for understanding general tendencies."
  }
];

// Celebrity/Character Comparisons for Result Page
export const moralAlignmentCelebrities = [
  {
    name: "Superman",
    alignment: "Lawful Good",
    score: 95,
    description: "The ultimate boy scout - follows rules, protects the innocent, and embodies truth and justice.",
    avatar: "🦸"
  },
  {
    name: "Spider-Man",
    alignment: "Neutral Good",
    score: 85,
    description: "Does whatever a spider can to help people, bending rules when necessary to save lives.",
    avatar: "🕷️"
  },
  {
    name: "Robin Hood",
    alignment: "Chaotic Good",
    score: 80,
    description: "Steals from the rich to give to the poor - breaks laws to fight injustice and help the oppressed.",
    avatar: "🏹"
  },
  {
    name: "Judge Dredd",
    alignment: "Lawful Neutral",
    score: 90,
    description: "I am the law! Enforces rules with absolute consistency, regardless of circumstance or sympathy.",
    avatar: "⚖️"
  },
  {
    name: "The Punisher",
    alignment: "Chaotic Neutral",
    score: 50,
    description: "Operates outside the law, motivated by personal vengeance rather than clear moral principles.",
    avatar: "💀"
  },
  {
    name: "Deadpool",
    alignment: "Chaotic Neutral",
    score: 55,
    description: "Unpredictable mercenary who does whatever he wants - sometimes heroic, sometimes selfish, always chaotic.",
    avatar: "🎭"
  },
  {
    name: "Darth Vader",
    alignment: "Lawful Evil",
    score: 20,
    description: "Serves the Empire's rigid hierarchy and order, using power systematically to dominate others.",
    avatar: "⚔️"
  },
  {
    name: "The Joker",
    alignment: "Chaotic Evil",
    score: 5,
    description: "Agent of chaos who rejects all rules and morality, finding joy in destruction and mayhem.",
    avatar: "🃏"
  }
];

export const alignmentData: Record<AlignmentType, AlignmentInfo> = {
  lawfulGood: {
    name: "Lawful Good",
    nameKo: "Lawful Good",
    nickname: "The Crusader",
    description:
      "A guardian of order and good. You respect laws and rules while helping others and pursuing justice. You value honor and duty, protect the weak, and fight against evil.",
    detailedDescription:
      "The Lawful Good alignment is considered the most heroic and noble type in the moral alignment system. People with this alignment believe the greatest good is achieved when firm moral principles and social order are in harmony. For them, laws and rules are not mere constraints but essential tools to ensure fairness and justice. People with a Lawful Good alignment have a strong sense of mission that their actions should contribute to the greater good. They consider it their duty to keep promises, fulfill responsibilities, and protect others. These individuals often take on leadership roles because they apply consistent and fair standards and strive to treat everyone equally. However, this alignment can sometimes lead to inflexible thinking and internal conflict when law and morality clash in complex situations.",
    philosophicalBackground:
      "The Lawful Good alignment is closely related to Deontology in Western philosophy. It particularly resonates with Immanuel Kant's Categorical Imperative - 'Act only according to that maxim whereby you can at the same time will that it should become a universal law.' In Eastern philosophy, it is similar to Confucian concepts of Ren (benevolence) and Li (propriety), the harmony between love for humanity and social etiquette. The virtues of the guardian class in Plato's ideal Republic - wisdom, courage, and temperance in harmony - are also connected to this alignment. Historical honor codes like chivalry, bushido, and noblesse oblige are cultural expressions of the Lawful Good alignment.",
    traits: [
      "Strong sense of justice",
      "Follows rules and laws",
      "Protects the weak",
      "Values honor",
      "Strong sense of responsibility",
    ],
    strengths: [
      "Provides stability to those around you with reliable and consistent behavior",
      "Has a strong moral compass that doesn't waver even in difficult decisions",
      "Demonstrates fair leadership in teams or organizations",
      "Builds long-term trust relationships by valuing promises and responsibilities",
      "Willing to sacrifice for social justice and the common good",
    ],
    weaknesses: [
      "Obsession with rules may cause you to miss situational nuances",
      "Black-and-white thinking makes it difficult to handle gray area problems",
      "May face dilemmas about following unjust laws or rules",
      "May appear self-righteous by not understanding others' different moral standards",
    ],
    realWorldExamples: [
      "Human rights lawyers or public interest activists - efforts to realize justice within the legal system",
      "Firefighters or rescue workers - dedication to saving others from danger while following discipline",
      "Honest public officials or judges - upholding social justice through fair law enforcement",
    ],
    examples: ["Superman", "Captain America", "Gandalf", "Aragorn"],
    color: "from-yellow-400 to-blue-500",
  },
  neutralGood: {
    name: "Neutral Good",
    nameKo: "Neutral Good",
    nickname: "The Benefactor",
    description:
      "A person who purely pursues good. Whether through law or freedom, you choose the method that can do the most good. You try to do good things flexibly.",
    detailedDescription:
      "The Neutral Good alignment best represents 'pure goodness.' What matters most to people with this alignment is producing good outcomes, whether through the law or by circumventing it. They are not bound by ideology or systems and make decisions purely based on 'what will bring the most good?' People with a Neutral Good alignment show remarkable adaptability. They may cooperate with authority as the situation demands, and if necessary, ignore rules. This flexibility allows them to do good effectively in various environments and among different people. They extend a helping hand to those in need without prejudice, regardless of the recipient's background or situation. However, this pragmatic approach can sometimes appear inconsistent and may conflict with principled people.",
    philosophicalBackground:
      "The Neutral Good alignment is most closely related philosophically to Utilitarianism. The principle of 'the greatest happiness for the greatest number' as advocated by Jeremy Bentham and John Stuart Mill well expresses the core of this alignment. If the outcome is good, the means become secondary. The influence of Virtue Ethics can also be seen, connected to Aristotle's virtue of the 'golden mean,' the wisdom to avoid extremes and choose appropriate action according to the situation. The Buddhist Bodhisattva concept - using skillful means to save all beings - shares a similar philosophical foundation with this alignment.",
    traits: [
      "Altruistic",
      "Flexible thinking",
      "Practical good deeds",
      "Helps without prejudice",
      "Result-oriented good deeds",
    ],
    strengths: [
      "Creativity in finding ways to do good in any situation",
      "Open-mindedness not bound by ideology or prejudice",
      "Ability to collaborate effectively with people from various backgrounds",
      "Creates real change with practical, result-oriented approach",
      "Maintains core values while flexibly adapting to situations",
    ],
    weaknesses: [
      "May have difficulty gaining trust as you appear to lack consistent principles",
      "Risk of falling into the logic that the end justifies the means",
      "May be criticized by both rule-oriented and freedom-oriented people",
      "Tendency to focus on immediate problem-solving rather than long-term system building",
    ],
    realWorldExamples: [
      "Doctors Without Borders activists - dedication to going where help is needed, transcending political boundaries",
      "Anonymous donors or philanthropists - pure goodwill that gives unconditionally",
      "Emergency rescuers who break rules to save lives in crisis situations",
    ],
    examples: ["Spider-Man", "Gandalf", "Dumbledore", "Frodo"],
    color: "from-green-400 to-emerald-500",
  },
  chaoticGood: {
    name: "Chaotic Good",
    nameKo: "Chaotic Good",
    nickname: "The Rebel",
    description:
      "A person who loves freedom but has a good heart. You stand against oppressive rules or unjust authority and do what's right in your own way.",
    detailedDescription:
      "The Chaotic Good alignment is a dynamic type that combines freedom and goodness. People with this alignment believe personal freedom is the most precious value, and at the same time, that freedom should be used to help others. They fight against oppressive laws, corrupt authorities, and unjust social systems, sometimes using illegal means to realize justice. People with a Chaotic Good alignment have a strong personal conscience. Their moral compass comes not from external laws or rules but from inner goodness. They believe 'just because a rule says it's right doesn't make it right, and just because the law forbids it doesn't make it wrong.' This tendency makes them natural anti-establishment heroes, but can also make them appear unpredictable and difficult to deal with. They are closer to independent actors than team players.",
    philosophicalBackground:
      "The Chaotic Good alignment is closely connected to the ideals of Anarchism. It particularly resonates with the vision of a society based on mutual aid and voluntary cooperation as advocated by Pierre-Joseph Proudhon and Peter Kropotkin. Henry David Thoreau's 'Civil Disobedience' - the duty of conscientious resistance to unjust laws - is also a philosophical foundation of this alignment. Existentialist philosophy, especially Sartre's proposition 'Man is condemned to be free' and the resulting ethics of responsibility, is also related. Liberation theology and traditions of resistance movements are also connected to this alignment.",
    traits: [
      "Loves freedom",
      "Rebels against authority",
      "Follows personal conscience",
      "Stands on the side of the weak",
      "Creative problem solving",
    ],
    strengths: [
      "Courage and determination to fight against injustice",
      "Ability to find creative and unconventional solutions",
      "Passionate advocacy for individual rights and freedom",
      "Leading social change by questioning authority",
      "Living an authentic life true to one's beliefs",
    ],
    weaknesses: [
      "Ignoring rules and order may cause chaos",
      "May have difficulty with teamwork and long-term planning",
      "Impulsive actions may lead to unintended consequences",
      "May become isolated from continuous conflict with authorities",
    ],
    realWorldExamples: [
      "Civil rights activists or peaceful resisters - conscious disobedience to unjust laws",
      "Whistleblowers - courage to break rules to expose organizational wrongdoing",
      "Social entrepreneurs or activists who break tradition and lead innovation",
    ],
    examples: ["Robin Hood", "Han Solo", "Jack Sparrow", "Star-Lord"],
    color: "from-orange-400 to-red-400",
  },
  lawfulNeutral: {
    name: "Lawful Neutral",
    nameKo: "Lawful Neutral",
    nickname: "The Judge",
    description:
      "A person who values order and rules themselves. You believe maintaining law and systems is more important than good or evil, applying fair and consistent standards.",
    detailedDescription:
      "The Lawful Neutral alignment is a type that values law, rules, and systems for their own sake. For people with this alignment, order is not a tool for judging good or evil but an end in itself. They believe society can only function properly on consistent rules and systems, applying rules regardless of personal feelings or circumstances. People with a Lawful Neutral alignment show remarkable consistency and fairness. They treat friends and enemies by the same standard and are not swayed by personal gain or sympathy. These characteristics make them excellent bureaucrats, judges, and enforcers, but can also make them appear cold and impersonal. They believe 'the law is the law' and follow rules even when this leads to harsh consequences.",
    philosophicalBackground:
      "The Lawful Neutral alignment is deeply related to Legal Positivism. Hans Kelsen's Pure Theory of Law - the theory that law exists as its own normative system separate from morality - well explains this alignment. Also, Max Weber's ideal type of bureaucracy - impersonal, rule-based rational organization - is a social expression of this alignment. In the East, it is similar to Legalist thought, particularly Han Feizi's governance theory based on 'law, methods, and power.' The Stoic philosophy concept of submission to reason and natural law is also related.",
    traits: [
      "Values law and order",
      "Consistent behavior",
      "Pursues fairness",
      "Faithful to duty",
      "Systematic thinking",
    ],
    strengths: [
      "Unwavering consistency and reliability in any situation",
      "Ability to make fair judgments without personal bias",
      "Efficiently manages complex systems and procedures",
      "Contributes to organizations with predictable and stable behavior",
      "Thoroughly fulfills responsibilities and duties",
    ],
    weaknesses: [
      "Blind obedience to rules may lead to unethical outcomes",
      "May appear harsh by not allowing human warmth or exceptions",
      "Tendency to follow rules that are unjust or outdated",
      "Lack of creativity and flexibility may resist change",
    ],
    realWorldExamples: [
      "Judges who only seek fair verdicts - belief that all people are equal before the law",
      "Public officials who strictly follow regulations - prioritizing procedures over personal judgment",
      "Soldiers or police - unconditional obedience to orders and discipline",
    ],
    examples: ["RoboCop", "Judge Dredd", "Spock", "Nick Fury"],
    color: "from-blue-400 to-indigo-500",
  },
  trueNeutral: {
    name: "True Neutral",
    nameKo: "True Neutral",
    nickname: "The Observer",
    description:
      "A person who seeks balance or doesn't lean toward either side. You act flexibly according to the situation and try to avoid extreme choices.",
    detailedDescription:
      "The True Neutral alignment is a unique type positioned at the very center of the moral alignment system. People with this alignment don't strongly lean toward good or evil, order or chaos. They may seek balance, simply not care about such moral classifications, or tend to make the most practical choice according to the situation. True Neutral alignment can stem from several different motivations. Some maintain neutrality intentionally, believing in maintaining the balance of the universe. Others avoid moral judgments themselves or focus only on their own affairs without interfering in others' problems. Still others are extremely pragmatic, making the most rational choice in each situation, which results in a neutral pattern. This tendency can make them objective observers or mediators, but can also make them appear indecisive or indifferent.",
    philosophicalBackground:
      "The True Neutral alignment is deeply related to Taoist concepts of Wu Wei (non-action) and naturalness. Laozi's concept that 'The Tao does not distinguish between good and evil, treating all things equally' well expresses this alignment. It is also connected to the Stoic concept of ataraxia - maintaining equanimity and not being disturbed by external events. The Buddhist concept of the Middle Way, avoiding extremes and taking a balanced path, is also similar. In modern philosophy, it can be related to moral relativism or value neutralism.",
    traits: [
      "Seeks balance",
      "Neutral perspective",
      "Practical approach",
      "Suspended judgment",
      "Respects the natural order",
    ],
    strengths: [
      "Ability to view situations objectively without bias",
      "Stability not swept up in extreme ideologies or emotions",
      "Effectively performs the role of mediator in conflict situations",
      "Ability to understand and empathize with various perspectives",
      "Pragmatism that adapts flexibly to situations",
    ],
    weaknesses: [
      "May appear indecisive by not taking a position at crucial moments",
      "May be seen as indifferent or avoidant of moral issues",
      "May have difficulty forming deep relationships without strong convictions",
      "May remain a bystander by not acting in crisis situations",
    ],
    realWorldExamples: [
      "Scholars or researchers who prioritize objectivity - suspending value judgments and dealing only with facts",
      "Humanitarian workers in conflict zones - neutrality that helps all victims without taking sides",
      "Hermits living in harmony with nature - life removed from society's debates about good and evil",
    ],
    examples: ["Treebeard", "Ents", "Professor Snape", "Doctor Manhattan"],
    color: "from-gray-400 to-slate-500",
  },
  chaoticNeutral: {
    name: "Chaotic Neutral",
    nameKo: "Chaotic Neutral",
    nickname: "The Free Spirit",
    description:
      "A person who prioritizes personal freedom above all. You refuse to be bound by any authority or rules, acting according to your desires and whims.",
    detailedDescription:
      "The Chaotic Neutral alignment is a type that values personal freedom as the supreme value. People with this alignment refuse to be bound by any authority, rules, or tradition, acting only according to their desires and whims. For them, good and evil are relative concepts, and what matters is that their freedom is not infringed upon. People with a Chaotic Neutral alignment are unpredictable and whimsical. They may form an alliance today and become an enemy tomorrow, feeling no guilt about it. Their loyalty is only to themselves, and relationships with others are maintained only as long as they benefit them. This tendency makes them truly free spirits, but can also make them appear untrustworthy and dangerous. They are often associated with adventurer, wanderer, and trickster archetypes.",
    philosophicalBackground:
      "The Chaotic Neutral alignment is philosophically connected to Max Stirner's Egoism. In 'The Unique and Its Property,' Stirner argued that individuals should be free from all social and moral norms. Nietzsche's concept of the 'Ubermensch' - a being who transcends existing morality and creates their own values - is also partially related. The existentialist concept of radical freedom, Sartre's proposition that 'Hell is other people' and emphasis on the absolute freedom of the individual, is also connected. Trickster archetypes like Hermes in Greek mythology or Loki in Norse mythology well represent this alignment.",
    traits: [
      "Extreme individualism",
      "Unpredictable",
      "Dislikes constraints",
      "Free-spirited",
      "Impulsive behavior",
    ],
    strengths: [
      "Remarkable survival ability to adapt in any situation",
      "Independence that doesn't succumb to social pressure or expectations",
      "Creative and unconventional way of thinking",
      "Fearless openness to new experiences and adventures",
      "Authenticity of living as one's true self",
    ],
    weaknesses: [
      "Difficulty maintaining relationships due to being unreliable and unpredictable",
      "Difficulty keeping long-term plans or promises",
      "Impulsive decisions may harm yourself and others",
      "May become isolated or make many enemies due to extreme individualism",
    ],
    realWorldExamples: [
      "Wanderers or nomads traveling the world - a free life not settling anywhere",
      "Avant-garde artists who ignore genre and style - creation that rejects all rules",
      "Independent lifestyle individuals who don't follow social expectations or traditions",
    ],
    examples: ["Jack Sparrow", "Catwoman", "Deadpool", "Rocky"],
    color: "from-purple-400 to-pink-500",
  },
  lawfulEvil: {
    name: "Lawful Evil",
    nameKo: "Lawful Evil",
    nickname: "The Dominator",
    description:
      "A person who uses systems and rules to pursue their own interests. You exploit loopholes in the law or create rules that favor yourself to dominate others.",
    detailedDescription:
      "The Lawful Evil alignment is a type that uses systems and rules as tools for their own power and benefit. People with this alignment value law and order, but use them not for good but to strengthen their dominance and control others. They exploit legal loopholes, create rules that favor themselves, or exploit legally within existing systems. People with a Lawful Evil alignment are cold, calculating, and make long-term plans. They prefer systematic domination over impulsive violence and can be generous to subordinates as long as they recognize their authority. They value honor codes or contracts, not for trust, but because they can manipulate more effectively in a predictable environment. This tendency is commonly seen in dictators, corrupt politicians, and crime organization bosses.",
    philosophicalBackground:
      "The Lawful Evil alignment is deeply related to Machiavellianism. The principles advocated in Niccolo Machiavelli's 'The Prince' - 'the end justifies the means,' 'it is better to be feared than loved' - well explain this alignment. Thomas Hobbes's social contract theory - the idea that a powerful sovereign must have absolute power to prevent chaos - can also connect to this alignment if misused. Historically, it is related to totalitarian ideologies, particularly the justification of systematic oppression through law and systems. Applying 'survival of the fittest' logic from Social Darwinism to justify power is also connected to this alignment.",
    traits: [
      "Systematic wrongdoing",
      "Pursuit of power",
      "Uses rules",
      "Cold and calculating",
      "Organized domination",
    ],
    strengths: [
      "Strategic thinking that makes and executes long-term plans",
      "Ability to efficiently build and manage organizations",
      "Negotiation and deal-making possible through predictable and consistent behavior",
      "Cool judgment not swayed by emotions",
      "Patience and endurance to wait for one's goals",
    ],
    weaknesses: [
      "Viewing others only as tools eventually leads to isolation",
      "Obsession with rules may block creative solutions",
      "Ruthlessness may cause even loyal subordinates to betray",
      "Obsession with power may lead to self-destructive decisions",
    ],
    realWorldExamples: [
      "Corrupt businesspeople who exploit within legal boundaries - legal but unethical profit pursuit",
      "Dictators who systematically abuse power - justifying oppression through legislation",
      "Organized crime bosses - running criminal operations under strict hierarchy and rules",
    ],
    examples: ["Darth Vader", "Magneto", "Thanos", "Kingpin"],
    color: "from-red-600 to-purple-700",
  },
  neutralEvil: {
    name: "Neutral Evil",
    nameKo: "Neutral Evil",
    nickname: "The Villain",
    description:
      "A person who purely pursues self-interest. Whether good or evil, law or chaos, you choose only what benefits yourself.",
    detailedDescription:
      "The Neutral Evil alignment is the type that best represents 'pure selfishness.' For people with this alignment, the only criterion of value is whether it benefits them. They may follow or break the law, cooperate or betray. Everything depends on making the most advantageous choice for themselves in any situation. People with a Neutral Evil alignment are not bound by ideology or principles. They are not loyal to organizations or systems like Lawful Evil, nor do they enjoy destruction itself like Chaotic Evil. Their goal is simply to maximize their own interests and power, using any method to achieve this. This pure pragmatic evil can make them the most dangerous and unpredictable enemies. They can be your ally today and sell you out tomorrow, feeling no conflict about it.",
    philosophicalBackground:
      "The Neutral Evil alignment is connected to an extreme form of Ethical Egoism. If Ayn Rand's Objectivist philosophy is distorted and taken to extremes, it approaches this alignment. Also, this is like living out the 'state of nature' as described by Hobbes - the war of all against all. Psychologically, it is associated with characteristics of the Dark Triad - narcissism, Machiavellianism, and psychopathy. The realist international relations theory of the Cold War era - the idea that nations pursue only their own interests - can also be seen as a political expression of this alignment.",
    traits: [
      "Extreme selfishness",
      "Will use any means necessary",
      "No loyalty",
      "Unafraid of betrayal",
      "Practical evil",
    ],
    strengths: [
      "Adaptability and practicality to survive in any situation",
      "Cool judgment not constrained by ideology or emotions",
      "Ability to seize opportunities and act quickly",
      "Flexibility to cooperate with various forces as needed",
      "Excellent self-preservation instincts that avoid danger well",
    ],
    weaknesses: [
      "Difficulty gaining true allies because you trust and are trusted by no one",
      "Past betrayals accumulate, eventually making enemies of everyone",
      "Fundamental isolation from lack of human connection",
      "Vulnerable in crisis situations without loyal supporters",
    ],
    realWorldExamples: [
      "Mercenaries or spies who belong to no side and only follow profit",
      "Corrupt insiders who prioritize personal gain over organizational interests",
      "Information brokers or intermediaries who can sell anyone out",
    ],
    examples: ["Voldemort", "Sauron", "Saruman", "Palpatine"],
    color: "from-gray-700 to-red-800",
  },
  chaoticEvil: {
    name: "Chaotic Evil",
    nameKo: "Chaotic Evil",
    nickname: "The Destroyer",
    description:
      "A person who enjoys destruction and chaos itself. You recognize no rules or morality, acting indiscriminately according to your desires and impulses.",
    detailedDescription:
      "The Chaotic Evil alignment is the most destructive and dangerous type in the moral alignment system. People with this alignment reject all rules, order, and morality, acting indiscriminately according to their desires and impulses. For them, destruction and chaos are pleasures in themselves, and others' suffering is not a concern or is even a source of pleasure. People with a Chaotic Evil alignment are extremely unpredictable. They may commit violence without reason, betray allies, and choose destruction even if it harms themselves. Unlike Lawful Evil, they don't make long-term plans, and unlike Neutral Evil, they don't calculate benefits. They move according to momentary impulses and desires, making them the most difficult enemies to deal with. In extreme cases, they are satisfied simply standing on the ashes of everything they've burned.",
    philosophicalBackground:
      "The Chaotic Evil alignment is connected to extreme Nihilism. Interpreting Nietzsche's declaration that 'God is dead' as moral anarchy approaches this alignment. The philosophy of the Marquis de Sade - the logic that since nature allows destruction and cruelty, humans should too - is also related. Psychologically, it is connected to antisocial personality disorder, particularly impulsive control failure and complete lack of empathy. In mythology and religion, gods of chaos who bring the end of the world - Norse Surtr, Greek Eris, Hindu Kali (destructive aspect) - represent this archetype.",
    traits: [
      "Pursues disorder and destruction",
      "Unpredictable violence",
      "Complete rejection of rules",
      "Impulsive wrongdoing",
      "Enjoys chaos itself",
    ],
    strengths: [
      "Completely unpredictable, making it difficult for enemies to prepare",
      "Boldness to act without fear or consideration of consequences",
      "Freedom not bound by any rules or constraints",
      "Destructive creativity that shakes existing order",
      "Thrives in chaos, surviving when others collapse",
    ],
    weaknesses: [
      "Lack of long-term planning ability makes sustained success difficult",
      "Impulsive behavior leads to self-destructive consequences",
      "Unable to maintain alliances, always fighting alone",
      "Becoming everyone's enemy, eventually brought down by united enemies",
    ],
    realWorldExamples: [
      "Terrorists who enjoy violence without reason - destruction itself is the goal",
      "Serial offenders who commit indiscriminate crimes - complete rejection of social norms",
      "Agitators who deliberately create chaos - finding pleasure in the collapse of order",
    ],
    examples: ["The Joker", "Chaos Gods", "Ramsay Bolton", "Carnage"],
    color: "from-red-700 to-black",
  },
};
