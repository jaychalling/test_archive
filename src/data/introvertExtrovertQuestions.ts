export type PersonalityDimension =
  | "energyRecharge" // How energy is recharged
  | "socialPreference" // Social preference
  | "stimulationSeeking" // Level of stimulation seeking
  | "focusDirection" // Internal vs External focus
  | "communicationStyle"; // Communication style

export interface IntrovertExtrovertQuestion {
  id: number;
  text: string;
  dimension: PersonalityDimension;
  reversed: boolean; // true means introverted question (lower score = more extroverted)
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

// 4 questions per dimension, 20 total
export const introvertExtrovertQuestions: IntrovertExtrovertQuestion[] = [
  // === Energy Recharge - 4 questions ===
  {
    id: 1,
    text: "After a party or gathering, I need time alone.",
    dimension: "energyRecharge",
    reversed: true,
  },
  {
    id: 2,
    text: "I feel energized when socializing with people.",
    dimension: "energyRecharge",
    reversed: false,
  },
  {
    id: 3,
    text: "When I spend too much time alone, I feel bored and anxious.",
    dimension: "energyRecharge",
    reversed: false,
  },
  {
    id: 4,
    text: "When resting, I find it more comfortable to be quiet and alone.",
    dimension: "energyRecharge",
    reversed: true,
  },

  // === Social Preference - 4 questions ===
  {
    id: 5,
    text: "I prefer gatherings with a few close friends over large parties.",
    dimension: "socialPreference",
    reversed: true,
  },
  {
    id: 6,
    text: "I enjoy meeting new people.",
    dimension: "socialPreference",
    reversed: false,
  },
  {
    id: 7,
    text: "A few deep relationships are more important than wide networks.",
    dimension: "socialPreference",
    reversed: true,
  },
  {
    id: 8,
    text: "Networking with various people comes naturally to me.",
    dimension: "socialPreference",
    reversed: false,
  },

  // === Stimulation Seeking - 4 questions ===
  {
    id: 9,
    text: "I concentrate better when working in a quiet and calm environment.",
    dimension: "stimulationSeeking",
    reversed: true,
  },
  {
    id: 10,
    text: "I often seek out new and exciting experiences.",
    dimension: "stimulationSeeking",
    reversed: false,
  },
  {
    id: 11,
    text: "Predictable and familiar situations are more comfortable for me.",
    dimension: "stimulationSeeking",
    reversed: true,
  },
  {
    id: 12,
    text: "I feel good in lively and bustling places.",
    dimension: "stimulationSeeking",
    reversed: false,
  },

  // === Focus Direction (Internal vs External) - 4 questions ===
  {
    id: 13,
    text: "I tend to organize my thoughts before speaking.",
    dimension: "focusDirection",
    reversed: true,
  },
  {
    id: 14,
    text: "I tend to organize my thoughts while talking.",
    dimension: "focusDirection",
    reversed: false,
  },
  {
    id: 15,
    text: "I take time to deeply reflect on my inner world.",
    dimension: "focusDirection",
    reversed: true,
  },
  {
    id: 16,
    text: "I express myself through external activities and actions.",
    dimension: "focusDirection",
    reversed: false,
  },

  // === Communication Style - 4 questions ===
  {
    id: 17,
    text: "In group conversations, I mainly take the listening role.",
    dimension: "communicationStyle",
    reversed: true,
  },
  {
    id: 18,
    text: "I tend to lead conversations and set the mood at gatherings.",
    dimension: "communicationStyle",
    reversed: false,
  },
  {
    id: 19,
    text: "One-on-one conversations are more comfortable than group conversations.",
    dimension: "communicationStyle",
    reversed: true,
  },
  {
    id: 20,
    text: "I find it easy to start conversations with strangers.",
    dimension: "communicationStyle",
    reversed: false,
  },
];

// Result types
export type PersonalityType =
  | "strongIntrovert"
  | "introvert"
  | "ambivert"
  | "extrovert"
  | "strongExtrovert";

export interface IntrovertExtrovertResult {
  extroversionScore: number; // 0-100
  personalityType: PersonalityType;
  dimensionScores: Record<PersonalityDimension, number>;
}

// Determine personality type based on score
export const getPersonalityType = (score: number): PersonalityType => {
  if (score <= 25) return "strongIntrovert";
  if (score <= 40) return "introvert";
  if (score <= 60) return "ambivert";
  if (score <= 75) return "extrovert";
  return "strongExtrovert";
};

export const dimensionDescriptions: Record<PersonalityDimension, {
  name: string;
  nameEn: string;
  description: string;
}> = {
  energyRecharge: {
    name: "Energy Recharge",
    nameEn: "Energy Recharge",
    description: "The degree to which you gain energy from being alone vs. being with people",
  },
  socialPreference: {
    name: "Social Preference",
    nameEn: "Social Preference",
    description: "Preference for small vs. large group gatherings",
  },
  stimulationSeeking: {
    name: "Stimulation Seeking",
    nameEn: "Stimulation Seeking",
    description: "The degree to which you seek new stimulation and excitement",
  },
  focusDirection: {
    name: "Focus Direction",
    nameEn: "Focus Direction",
    description: "The degree to which you focus on your inner world vs. the external world",
  },
  communicationStyle: {
    name: "Communication Style",
    nameEn: "Communication Style",
    description: "Your role and style of communication in conversations",
  },
};

export interface PersonalityTypeInfo {
  name: string;
  nameEn: string;
  description: string;
  characteristics: string[];
  energyTips: string[];
  strengths: string[];
  watchPoints: string[];
  color: string;
  detailedDescription: string;
  scientificBackground: string;
  careerSuggestions: string[];
  socialTips: string[];
}

export const personalityTypeDescriptions: Record<PersonalityType, PersonalityTypeInfo> = {
  strongIntrovert: {
    name: "Strong Introvert",
    nameEn: "Strong Introvert",
    description: "You gain the most energy from time alone. You explore deep thoughts and your inner world, valuing a few meaningful relationships.",
    characteristics: [
      "Alone time is essential",
      "Prefers deep one-on-one conversations",
      "Organizes thoughts thoroughly before speaking",
      "Performs best in quiet environments",
      "Maintains a few deep relationships",
    ],
    energyTips: [
      "Ensure sufficient alone time after social activities",
      "Include time to recharge in quiet spaces in your daily routine",
      "Pre-charge your energy before large gatherings",
      "Create your own sanctuary (home, room, specific place)",
    ],
    strengths: [
      "Deep thinking and insight",
      "Excellent concentration and patience",
      "Superior listening and empathy abilities",
      "Ability to work independently",
      "Forms authentic relationships",
    ],
    watchPoints: [
      "Be careful of excessive isolation",
      "It's important to express your opinions when needed",
      "Keep an open mind to forming new relationships",
      "Sometimes step out of your comfort zone and take on challenges",
    ],
    color: "indigo",
    detailedDescription: "Strong introverts are at the far end of the introversion spectrum. This type finds that social interaction drains energy, and they can only truly recharge through time alone. They have a rich inner world with deep thinking, preferring a few meaningful relationships over superficial ones. Strong introverts perform best in quiet environments and shine in independent work. They think thoroughly before speaking and provide deep insights. As Susan Cain emphasizes in 'Quiet,' introversion is not a weakness but a different strength. Although modern society idealizes extroversion, many creative and successful people are strong introverts.",
    scientificBackground: "The concepts of introversion and extroversion were first proposed by Carl Jung and later scientifically studied by Hans Eysenck. According to Eysenck's theory, introverts have a higher baseline arousal level, making them less dependent on external stimulation. Neuroscience research shows that introverts have higher activity in the prefrontal cortex, and their dopamine reward system has different sensitivity. Additionally, introverts may be more sensitive to acetylcholine pathways, which are related to deep thinking and concentration. Research suggests that approximately 25-40% of the population is classified as introverted, with strong introverts being a minority among them.",
    careerSuggestions: [
      "Writer, Editor, Researcher",
      "Programmer, Data Analyst",
      "Graphic Designer, Artist",
      "Accountant, Financial Analyst",
      "Psychologist (individual counseling)"
    ],
    socialTips: [
      "Pre-charge your energy before attending social gatherings",
      "Quietly step away to recharge when needed",
      "Prefer one-on-one conversations or small group interactions",
      "Recognize and respect your limits",
      "Maintaining contact through texts or emails is also a good method"
    ],
  },
  introvert: {
    name: "Introvert",
    nameEn: "Introvert",
    description: "You value your inner world and feel comfortable when alone or with a few people. You can enjoy social situations, but need time alone to recharge.",
    characteristics: [
      "Need alone time after social activities",
      "Prefer small gatherings over large parties",
      "Enjoy deep conversations",
      "Good at observing and listening",
      "Tend to make decisions carefully",
    ],
    energyTips: [
      "Schedule regular alone time",
      "Adjust the amount of social activity to suit yourself",
      "Monitor your energy level and recognize your limits",
      "Recharge through quiet hobbies or activities",
    ],
    strengths: [
      "Thoughtful and careful decision-making",
      "Listening and observation abilities",
      "Forming deep relationships",
      "Independent work ability",
      "Concentration and perseverance",
    ],
    watchPoints: [
      "Try to express your thoughts more actively",
      "Recognize the importance of networking too",
      "Sometimes challenge yourself with new experiences",
      "Continue practicing social skills",
    ],
    color: "blue",
    detailedDescription: "Introverts are on the introverted side of the extroversion-introversion spectrum, but not as extreme as strong introverts. They can enjoy social interaction, but afterward need time alone to recharge. Introverts prefer deep relationships and enjoy meaningful conversations rather than superficial ones. They have excellent observation skills and tend to act after assessing situations. At work, introverts show outstanding performance in independent tasks and demonstrate deep concentration. They function well in team environments too, but prefer small teams or environments with clear roles. They show strengths in creative problem-solving and analytical thinking, known for careful decision-making. Many successful writers, scientists, and artists are introverts.",
    scientificBackground: "Psychologist Carl Jung defined introversion as a personality trait where psychic energy is directed inward. Modern neuroscience research shows that introverts have more blood flow in the prefrontal cortex, which is related to deep thinking and planning. Hans Eysenck's arousal theory explains that introverts have higher baseline arousal levels, thus needing less external stimulation. Research shows that introverts are less sensitive to the dopamine reward system, making the 'reward' pursuit from social interaction less intense. Twin studies show that about 40-60% of introversion-extroversion is determined by genetic factors.",
    careerSuggestions: [
      "Software Developer, Backend Engineer",
      "Researcher, Scholar, Scientist",
      "Editor, Technical Writer",
      "Accountant, Financial Analyst",
      "Librarian, Archivist",
      "Graphic Designer, UI/UX Designer"
    ],
    socialTips: [
      "Fully charge your energy before social gatherings",
      "Prioritize small gatherings or one-on-one meetings",
      "At networking events, focus on a few deep conversations",
      "Use online communication to maintain relationships",
      "Recognize your limits and take breaks in between when needed",
      "Attending social events with close friends makes it more comfortable"
    ],
  },
  ambivert: {
    name: "Ambivert",
    nameEn: "Ambivert",
    description: "You move flexibly between introversion and extroversion. Depending on the situation, you may be social or want to be alone. This flexibility is a great strength in adapting to various environments.",
    characteristics: [
      "Acts introverted or extroverted depending on the situation",
      "Enjoys both alone time and social time",
      "Gets along well with various types of people",
      "Energy level varies according to the situation",
      "Comfortable with both listening and speaking",
    ],
    energyTips: [
      "Carefully observe your energy patterns",
      "Balance social activities and alone time as needed",
      "Avoid both excessive social activity and isolation",
      "Listen to your current mood and energy level",
    ],
    strengths: [
      "Flexibility to adapt to situations",
      "Ability to connect with various types of people",
      "Balance between listening and speaking",
      "Broad perspectives and understanding",
      "Capable of both collaboration and independent work",
    ],
    watchPoints: [
      "May sometimes feel confused about identity",
      "Take time to identify your true preferences",
      "Don't lose yourself by over-adapting to situations",
      "Create a consistent self-care routine",
    ],
    color: "purple",
    detailedDescription: "Ambiverts are in the middle of the introversion-extroversion spectrum, and research suggests the majority of the population falls into this category. Ambiverts can flexibly demonstrate introverted or extroverted characteristics depending on the situation, which is a great advantage in adapting to various environments. They enjoy social interaction while also valuing time alone, and can gain energy from both. Ambiverts are sometimes called 'relationship chameleons' because they can easily communicate with both introverts and extroverts. At work, ambiverts feel comfortable with both independent work and collaboration, and can perform leadership roles or serve as team members according to the situation. This flexibility is particularly advantageous in professions requiring various interpersonal situations, such as sales, management, and consulting.",
    scientificBackground: "Psychologist Hans Eysenck proposed that personality traits follow a normal distribution, explaining that most people are not extreme introverts or extroverts but somewhere in between. Adam Grant's 2013 study found that ambivert salespeople showed higher performance than introverts or extroverts. This is because ambiverts can adjust speaking and listening according to the situation. From a neuroscience perspective, ambiverts show moderate sensitivity to the dopamine reward system, enabling balanced responses to social stimulation. Some researchers suggest that ambiverts may be the most adaptive personality type.",
    careerSuggestions: [
      "Sales and Business Development",
      "Project Manager, Team Leader",
      "Consultant, Coach",
      "Teacher, Instructor",
      "Marketing Specialist",
      "HR Specialist, Recruiter"
    ],
    socialTips: [
      "Regularly check your energy level",
      "Choose introverted/extroverted mode appropriately according to the situation",
      "Use both characteristics to connect with various people",
      "Balance social activities and alone time",
      "Take time to reflect on what your true preferences are",
      "Avoid both excessive socialization and excessive isolation"
    ],
  },
  extrovert: {
    name: "Extrovert",
    nameEn: "Extrovert",
    description: "You gain energy from interaction with people. You enjoy social activities and like being around various people. While you need time alone too, you feel most energized when with people.",
    characteristics: [
      "Gains energy when with people",
      "Enjoys meeting new people",
      "Leads conversations and creates atmosphere",
      "Organizes thoughts while acting",
      "Pursues various activities and experiences",
    ],
    energyTips: [
      "Plan social activities regularly",
      "Create opportunities to interact with various people",
      "Participate in team projects or collaborative activities",
      "Remember that sometimes you also need time for self-reflection",
    ],
    strengths: [
      "Excellent sociability and networking ability",
      "Spreads positive energy and enthusiasm",
      "Quick decision-making and action",
      "Ability to create team atmosphere",
      "Quick adaptation to new environments",
    ],
    watchPoints: [
      "Sometimes try to focus more on listening",
      "Recognize the value of time alone",
      "Take time for deep reflection",
      "Think once more before speaking",
    ],
    color: "amber",
    detailedDescription: "Extroverts are people who gain energy and recharge through social interaction. They feel energized when with others and thrive in social environments. Extroverts generally enjoy meeting new people, lead conversations, and feel comfortable in group situations. They tend to organize thoughts by expressing them verbally, actively participating in brainstorming sessions or discussions. Extroverts are action-oriented and seek new experiences. They enjoy change and diversity, preferring dynamic environments over routines. At work, extroverts show excellent performance in team environments and are skilled at networking and relationship building. They naturally shine in leadership roles and motivate those around them with positive energy.",
    scientificBackground: "In Carl Jung's original concept, extroversion means psychic energy is directed toward the external world. According to Hans Eysenck's research, extroverts have lower baseline cortical arousal levels, seeking more external stimulation. Neuroscience research shows that extroverts are more sensitive to the dopamine reward system, experiencing more pleasure from social interaction. Extroverts show more activity in the occipital and temporal lobe regions than the prefrontal cortex, which is related to external stimulus processing. Research shows that extroversion has a positive correlation with positive emotions and positively affects happiness and life satisfaction.",
    careerSuggestions: [
      "Sales Representative, Business Development Manager",
      "Event Planner, PR Specialist",
      "Teacher, Trainer, Speaker",
      "Customer Service Manager",
      "Politician, Lobbyist",
      "Entertainer, Broadcaster"
    ],
    socialTips: [
      "Participate in various social groups to expand your network",
      "Respect introverted friends' and colleagues' styles",
      "Consciously maintain balance between speaking and listening in conversations",
      "Intentionally include time for self-reflection in your schedule",
      "Exercise leadership in team projects while respecting other opinions",
      "Be careful not to overwhelm people around you when your energy is overflowing"
    ],
  },
  strongExtrovert: {
    name: "Strong Extrovert",
    nameEn: "Strong Extrovert",
    description: "You gain the most energy through interaction with people. You are energetic and social, spreading positive energy to those around you. You have excellent leadership and communication skills.",
    characteristics: [
      "Most energized when with people",
      "Enjoys large gatherings and networking",
      "Naturally leads conversations and draws attention",
      "Actively seeks new experiences and stimulation",
      "Tends to express thoughts directly in words",
    ],
    energyTips: [
      "Maintain an active social schedule",
      "Participate in leadership roles or team activities",
      "Look for opportunities to meet new people",
      "Occasionally take intentional time alone",
    ],
    strengths: [
      "Strong leadership and influence",
      "Excellent communication skills",
      "High energy and enthusiasm",
      "Quick relationship-forming ability",
      "Adaptability to change",
    ],
    watchPoints: [
      "Listen to others all the way through",
      "Respect introverted people's styles",
      "Deliberately create time for self-reflection",
      "Sometimes slow down and think deeply",
    ],
    color: "orange",
    detailedDescription: "Strong extroverts are at the far end of the extroversion spectrum. This type gains maximum energy through social interaction and feels most alive when with people. They thrive at large gatherings, parties, and networking events, naturally becoming the center of attention. Strong extroverts have excellent charisma and conversation skills that easily attract and inspire people. They actively seek new experiences and stimulation, showing adventurous and spontaneous tendencies. They strongly tend to organize thoughts by expressing them verbally, developing ideas through discussion or conversation rather than thinking quietly alone. At work, strong extroverts excel in leadership roles, having great influence in motivating teams and shaping organizational culture. They often succeed in sales, marketing, entertainment, and political fields.",
    scientificBackground: "According to Hans Eysenck's personality theory, strong extroverts have the lowest baseline cortical arousal levels, seeking the most external stimulation. This allows them to reach optimal arousal levels through social interaction, new experiences, and sensory stimulation. Neuroscience research shows that strong extroverts have very active dopamine reward pathways, experiencing strong pleasure and reward responses from social interaction. Additionally, strong extroverts have more active brain reward centers, the ventral tegmental area (VTA) and nucleus accumbens. Research shows that strong extroversion is associated with high positive emotionality and a tendency to recover quickly even in stressful situations. However, there is also a risk of burnout if alone time is insufficient.",
    careerSuggestions: [
      "CEO, Executive, Entrepreneur",
      "Sales Director, Business Development Executive",
      "Broadcaster, Entertainer, MC",
      "Politician, Diplomat",
      "Event Planner, Promoter",
      "Motivational Speaker, Lecturer"
    ],
    socialTips: [
      "Exercise leadership in various social environments",
      "When working with introverted people, respect their style and give them space",
      "Consciously create opportunities for others to speak in conversations",
      "Include regular alone time in your schedule",
      "Cultivate the habit of pausing and thinking before impulsive decisions",
      "Practice balancing with people who have different energy levels"
    ],
  },
};

export const dimensionOrder: PersonalityDimension[] = [
  "energyRecharge",
  "socialPreference",
  "stimulationSeeking",
  "focusDirection",
  "communicationStyle",
];

export const typeColors: Record<PersonalityType, string> = {
  strongIntrovert: "bg-indigo-500",
  introvert: "bg-blue-500",
  ambivert: "bg-purple-500",
  extrovert: "bg-amber-500",
  strongExtrovert: "bg-orange-500",
};

export const typeTextColors: Record<PersonalityType, string> = {
  strongIntrovert: "text-indigo-500",
  introvert: "text-blue-500",
  ambivert: "text-purple-500",
  extrovert: "text-amber-500",
  strongExtrovert: "text-orange-500",
};

export const typeBgColors: Record<PersonalityType, string> = {
  strongIntrovert: "from-indigo-500/10 to-blue-500/10",
  introvert: "from-blue-500/10 to-cyan-500/10",
  ambivert: "from-purple-500/10 to-pink-500/10",
  extrovert: "from-amber-500/10 to-yellow-500/10",
  strongExtrovert: "from-orange-500/10 to-red-500/10",
};
