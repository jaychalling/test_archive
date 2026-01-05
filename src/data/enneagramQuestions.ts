export type EnneagramType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface EnneagramQuestion {
  id: number;
  text: string;
  type: EnneagramType;
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

// 4 questions per type, 36 questions total
export const enneagramQuestions: EnneagramQuestion[] = [
  // === Type 1 (The Reformer) - 4 questions ===
  {
    id: 1,
    text: "I feel a strong sense of duty to always do what is right.",
    type: 1,
  },
  {
    id: 2,
    text: "Even small mistakes bother me, and I feel anxious if I don't do things perfectly.",
    type: 1,
  },
  {
    id: 3,
    text: "I get upset when others break rules or are careless.",
    type: 1,
  },
  {
    id: 4,
    text: "I hold high standards for both myself and others.",
    type: 1,
  },

  // === Type 2 (The Helper) - 4 questions ===
  {
    id: 5,
    text: "I feel happiest and most fulfilled when helping others.",
    type: 2,
  },
  {
    id: 6,
    text: "I am good at sensing other people's feelings and needs.",
    type: 2,
  },
  {
    id: 7,
    text: "Being needed by others is important to me.",
    type: 2,
  },
  {
    id: 8,
    text: "I feel hurt when I am not appreciated for what I give.",
    type: 2,
  },

  // === Type 3 (The Achiever) - 4 questions ===
  {
    id: 9,
    text: "Success and recognition are very important to me.",
    type: 3,
  },
  {
    id: 10,
    text: "I work efficiently to achieve my goals.",
    type: 3,
  },
  {
    id: 11,
    text: "I care a lot about how I appear to others.",
    type: 3,
  },
  {
    id: 12,
    text: "Failure is difficult for me to accept.",
    type: 3,
  },

  // === Type 4 (The Individualist) - 4 questions ===
  {
    id: 13,
    text: "I feel different from others, and this is part of my identity.",
    type: 4,
  },
  {
    id: 14,
    text: "Deep emotions and my inner world are very important to me.",
    type: 4,
  },
  {
    id: 15,
    text: "I am not satisfied with things that are ordinary or mundane.",
    type: 4,
  },
  {
    id: 16,
    text: "I often experience feelings like melancholy or longing.",
    type: 4,
  },

  // === Type 5 (The Investigator) - 4 questions ===
  {
    id: 17,
    text: "Accumulating knowledge and understanding is most important to me.",
    type: 5,
  },
  {
    id: 18,
    text: "I need time and space alone.",
    type: 5,
  },
  {
    id: 19,
    text: "I trust logic and analysis more than emotions.",
    type: 5,
  },
  {
    id: 20,
    text: "I prefer to step back and observe as an outsider.",
    type: 5,
  },

  // === Type 6 (The Loyalist) - 4 questions ===
  {
    id: 21,
    text: "I tend to prepare in advance for the worst-case scenario.",
    type: 6,
  },
  {
    id: 22,
    text: "Being loyal to trustworthy people or organizations is important to me.",
    type: 6,
  },
  {
    id: 23,
    text: "I consider various possibilities and risks before making a decision.",
    type: 6,
  },
  {
    id: 24,
    text: "I struggle between doubt and trust regarding authority figures or systems.",
    type: 6,
  },

  // === Type 7 (The Enthusiast) - 4 questions ===
  {
    id: 25,
    text: "I enjoy exploring new experiences and possibilities.",
    type: 7,
  },
  {
    id: 26,
    text: "I want to avoid boredom and restrictions.",
    type: 7,
  },
  {
    id: 27,
    text: "Thinking about future plans and ideas excites me.",
    type: 7,
  },
  {
    id: 28,
    text: "I try to focus on the positive rather than negative emotions.",
    type: 7,
  },

  // === Type 8 (The Challenger) - 4 questions ===
  {
    id: 29,
    text: "I act strong and confident.",
    type: 8,
  },
  {
    id: 30,
    text: "I cannot stand by when I see injustice or bullying of the weak.",
    type: 8,
  },
  {
    id: 31,
    text: "I feel comfortable being in control and taking charge of situations.",
    type: 8,
  },
  {
    id: 32,
    text: "I feel that showing weakness is dangerous.",
    type: 8,
  },

  // === Type 9 (The Peacemaker) - 4 questions ===
  {
    id: 33,
    text: "I want to avoid conflict and maintain a peaceful atmosphere.",
    type: 9,
  },
  {
    id: 34,
    text: "I easily understand and accept other people's perspectives.",
    type: 9,
  },
  {
    id: 35,
    text: "I find it difficult to make important decisions or tend to postpone them.",
    type: 9,
  },
  {
    id: 36,
    text: "I prefer what everyone can agree on rather than my own opinion.",
    type: 9,
  },
];

export interface EnneagramResult {
  scores: Record<EnneagramType, number>; // Score per type (0-100)
  mainType: EnneagramType;
  wing: EnneagramType | null;
}

export interface EnneagramTypeInfo {
  name: string;
  nameEn: string;
  title: string;
  coreMotivation: string;
  coreFear: string;
  coreDesire: string;
  growthDirection: string;
  stressDirection: string;
  characteristics: string[];
  strengths: string[];
  challenges: string[];
  color: string;
  detailedDescription: string;
  scientificBackground: string;
  relationshipPattern: string;
  workStyle: string;
  growthStrategies: string[];
  famousPeople: string[];
}

export const enneagramTypeInfo: Record<EnneagramType, EnneagramTypeInfo> = {
  1: {
    name: "Type 1",
    nameEn: "Type 1",
    title: "The Reformer",
    coreMotivation: "Pursuing what is right and good, wanting to make a better world",
    coreFear: "Being corrupt or flawed, being criticized",
    coreDesire: "Achieving perfection, integrity, and balance",
    growthDirection: "Integration to Type 7 - Embracing spontaneity and joy",
    stressDirection: "Disintegration to Type 4 - Becoming depressed and self-critical",
    characteristics: [
      "Principled with a strong sense of purpose",
      "Excellent self-control",
      "High moral standards",
      "Strives for improvement and development",
    ],
    strengths: [
      "Honest and trustworthy",
      "Strong sense of responsibility",
      "Fair and ethical",
      "Diligent and hardworking",
    ],
    challenges: [
      "Overly critical attitude",
      "Stress from perfectionism",
      "Tendency to suppress anger",
      "Lack of flexibility",
    ],
    color: "slate",
    detailedDescription: "Type 1 Reformers are driven by an inner 'critic' voice and have a strong desire to make the world a better place. They have high standards for righteousness and morality, applying these standards to both themselves and others. They often internalized the message from childhood that they must be 'good,' which leads to suppressing instinctual desires and anger. According to Enneagram researchers Don Riso and Russ Hudson, healthy Type 1s are wise and discerning, demonstrating patience and acceptance alongside high ethical standards. Historically, many social reformers, educators, and ethicists belong to this type.",
    scientificBackground: "The Enneagram was developed into its modern form by Oscar Ichazo in the 1960s and was established as a psychological system by Claudio Naranjo. Type 1 belongs to the 'Body Center,' with anger as the core emotion. From a neuroscientific perspective, Type 1 is associated with strong activation of the prefrontal cortex, which is involved in moral judgment and impulse control. Research shows that people with high conscientiousness and perfectionist tendencies tend to exhibit anxiety and obsessive traits, which aligns with Type 1's psychological patterns.",
    relationshipPattern: "Type 1s are reliable and committed partners in relationships. They keep their promises, fulfill their responsibilities, and work to improve relationships. However, they may have excessive expectations of their partners or become critical, and conflicts may arise from their insistence on 'the right way.' Healthy Type 1s learn to accept their partner's imperfections and express their anger in healthy ways.",
    workStyle: "Type 1s are recognized for accurate and systematic work. They value quality and ethical standards and pay attention to details. As leaders, they provide clear expectations and fair treatment, but perfectionism can stress themselves and their teams. They excel in quality control, editing, law, and education fields.",
    growthStrategies: [
      "Recognize and gently address the inner critic voice",
      "Acknowledge anger and express it in healthy ways",
      "Recognize the value of 'good enough' over perfection",
      "Make time for fun and play",
      "Become more forgiving toward yourself and others"
    ],
    famousPeople: ["Gandhi", "Nelson Mandela", "Margaret Thatcher", "Hillary Clinton", "Al Gore"],
  },
  2: {
    name: "Type 2",
    nameEn: "Type 2",
    title: "The Helper",
    coreMotivation: "Wanting to be loved and needed",
    coreFear: "Being unloved and unwanted",
    coreDesire: "Receiving unconditional love",
    growthDirection: "Integration to Type 4 - Discovering self-awareness and authenticity",
    stressDirection: "Disintegration to Type 8 - Becoming aggressive and domineering",
    characteristics: [
      "Warm and caring",
      "Sensitive to others' needs",
      "Relationship-focused",
      "Motivated by praise and appreciation",
    ],
    strengths: [
      "Excellent empathy",
      "Generous and kind",
      "Ability to connect people",
      "Devoted and supportive",
    ],
    challenges: [
      "Ignoring own needs",
      "Over-involvement in others' lives",
      "Providing conditional help",
      "Fear of rejection",
    ],
    color: "rose",
    detailedDescription: "Type 2 Helpers form their identity through the self-image of being 'the loving person.' They excel at sensing and meeting others' needs, which validates their self-worth. However, they struggle to recognize and express their own needs, which can lead to unconsciously forming 'give and take' relationships. According to Enneagram experts, the core issue for Type 2 is the belief that they must give love first to be loved. Healthy Type 2s demonstrate true altruism, helping others purely without expecting anything in return.",
    scientificBackground: "Type 2 belongs to the 'Heart Center,' with shame as the core emotion. Psychologically, Type 2 may be associated with 'insecure-ambivalent attachment' from attachment theory. They likely experienced conditional love in childhood, developing the belief that they must become indispensable to others to be loved. Research shows that caregiving behavior is related to oxytocin, and Type 2s may be particularly sensitive to this neurochemical reward system.",
    relationshipPattern: "Type 2s are warm and generous partners in relationships. They excel at anticipating and meeting their partner's needs, forming deep emotional connections. However, they may suppress their own needs and explode later, and may unconsciously foster their partner's dependency. For healthy relationships, they need to recognize that their own needs are also important.",
    workStyle: "Type 2s shine in people-centered roles at work. They help with team harmony, attend to colleagues' needs, and create a positive atmosphere. However, they may have difficulty saying 'no' and become overloaded, and resentment may build if they don't feel appreciated. They excel in nursing, education, counseling, and service fields.",
    growthStrategies: [
      "Recognize and express your own needs and feelings",
      "Acknowledge your worth without needing rewards for helping",
      "Practice setting boundaries and saying 'no'",
      "Have alone time and practice self-care",
      "Practice giving purely without hidden motives"
    ],
    famousPeople: ["Mother Teresa", "Elvis Presley", "Dorothy Day", "Stevie Wonder", "Anne Hathaway"],
  },
  3: {
    name: "Type 3",
    nameEn: "Type 3",
    title: "The Achiever",
    coreMotivation: "Wanting to be valuable and successful",
    coreFear: "Being worthless and a failure",
    coreDesire: "Being valuable and recognized",
    growthDirection: "Integration to Type 6 - Finding loyalty and genuine connection",
    stressDirection: "Disintegration to Type 9 - Becoming apathetic and directionless",
    characteristics: [
      "Goal-oriented and ambitious",
      "Highly adaptable",
      "Image-conscious",
      "Efficient and productive",
    ],
    strengths: [
      "Drive and determination",
      "Excellent communication skills",
      "Leadership and motivation ability",
      "Positive and energetic",
    ],
    challenges: [
      "Workaholic tendencies",
      "May lose touch with true self",
      "Over-reliance on others' evaluation",
      "Suppresses emotions",
    ],
    color: "amber",
    detailedDescription: "Type 3 Achievers are the most goal-oriented and adaptable type in the Enneagram. They have a strong desire for success and recognition, striving to achieve what is most valued in their environment. Type 3 belongs to the 'Heart Center' but, paradoxically, tends to focus on image and achievement rather than their true feelings. They often internalized the message in childhood that 'what you do' is more important than 'who you are.' Healthy Type 3s connect with their true worth and are driven by internal motivation, inspiring others. Unhealthy Type 3s fall into self-deception and obsess over external symbols of success.",
    scientificBackground: "Type 3 belongs to the 'Heart Center,' with shame as the core emotion. However, Type 3 tries to cover this shame with achievement and success. Psychologically, Type 3 is likely to experience 'Impostor Syndrome' and may suffer from the gap between their true inner self and the image they present to others. From the perspective of Self-Determination Theory, Type 3 tends to rely on external motivation, making it difficult to feel genuine satisfaction. Neuroscientifically, achievement and recognition rewards activate the dopamine system, explaining Type 3's endless pursuit of achievement.",
    relationshipPattern: "Type 3s appear as attractive and impressive partners in relationships. They are confident and energetic, wanting to present a successful image with their partner. However, they may prioritize work over relationships and try to show only a perfect image while hiding their true feelings. Healthy Type 3s learn to reveal their vulnerability to their partners and believe they can be loved regardless of their achievements. It's important for them to trust that their partner loves their true self, not just their accomplishments.",
    workStyle: "Type 3s are recognized as high performers at work. They excel at goal setting and achievement, with the ability to motivate and lead teams. They are efficient and productive, able to perform whatever role is needed for success in any situation. However, they are prone to workaholism and may cross ethical boundaries in competitive environments. They excel in sales, marketing, leadership roles, entrepreneurship, and entertainment fields.",
    growthStrategies: [
      "Recognize your worth independent of achievements",
      "Practice recognizing and expressing genuine feelings",
      "Accept failure as a learning opportunity",
      "Find work-life balance",
      "Pursue inner satisfaction over external recognition"
    ],
    famousPeople: ["Oprah Winfrey", "Tom Cruise", "Taylor Swift", "Muhammad Ali", "Trump"],
  },
  4: {
    name: "Type 4",
    nameEn: "Type 4",
    title: "The Individualist",
    coreMotivation: "Wanting to find identity and express uniqueness",
    coreFear: "Having no identity or being ordinary",
    coreDesire: "Finding and expressing the true self",
    growthDirection: "Integration to Type 1 - Gaining discipline and objectivity",
    stressDirection: "Disintegration to Type 2 - Becoming overly dependent",
    characteristics: [
      "Emotionally sensitive and expressive",
      "Original and creative",
      "Experiences deep emotions",
      "Pursues authenticity",
    ],
    strengths: [
      "Deep empathy",
      "Creativity and artistic sense",
      "Authenticity and honesty",
      "Emotional depth",
    ],
    challenges: [
      "Melancholy and sadness",
      "Self-absorption and self-pity",
      "Jealousy and comparison",
      "Mood swings",
    ],
    color: "purple",
    detailedDescription: "Type 4 Individualists are the type that pursues the deepest emotions and unique identity in the Enneagram. They feel fundamentally different from others and consider this uniqueness the core of their identity. Type 4 experiences the full spectrum of emotions, particularly drawn to bittersweet feelings like melancholy and longing. They often experienced feeling abandoned or misunderstood in childhood, internalizing a sense of 'something lacking.' Healthy Type 4s express their emotional depth in creative and meaningful ways and deeply empathize with others' suffering. Unhealthy Type 4s fall into self-pity, reject ordinariness, and become isolated.",
    scientificBackground: "Type 4 belongs to the 'Heart Center,' with shame as the core emotion. Type 4 experiences this shame as a feeling that 'something is wrong with me.' Psychologically, Type 4 may have tendencies toward mood disorders or depression, related to their preference for emotional intensity and depth. From object relations theory, Type 4 may have internalized early experiences of loss or separation. Interestingly, research shows that creative people report stronger emotional experiences than the general population, which may explain Type 4's artistic inclinations. Enneagram experts also call Type 4 'The Romantic,' characterized by tension between idealizing the past and dissatisfaction with the present.",
    relationshipPattern: "Type 4s yearn for deep and meaningful connections in relationships. They have no interest in superficial relationships, wanting profound exchanges of the soul. They can be very romantic and expressive with partners, but may exhibit a pattern of 'pushing away when close, pulling in when distant.' They pursue ideal love and become disappointed when real relationships don't meet this ideal. Healthy Type 4s accept that imperfect love can also be beautiful and enjoy connections in the present moment.",
    workStyle: "Type 4s shine in roles where they can express creativity and authenticity at work. They prefer environments where self-expression is possible and unique perspectives are valued. They are not motivated by repetitive or ordinary work, pursuing meaning and beauty. They excel in art, design, writing, counseling, and education fields. However, mood swings can affect work consistency, and they may react sensitively to criticism.",
    growthStrategies: [
      "Focus on the present moment and practice gratitude",
      "Practice observing emotions without getting swept away",
      "Discover beauty in the ordinary",
      "Transform self-pity into self-compassion",
      "Find commonalities with others"
    ],
    famousPeople: ["Frida Kahlo", "Edgar Allan Poe", "Bob Dylan", "Julia Roberts", "Kim Min-hee"],
  },
  5: {
    name: "Type 5",
    nameEn: "Type 5",
    title: "The Investigator",
    coreMotivation: "Wanting to accumulate knowledge and understand the world",
    coreFear: "Being incompetent and useless",
    coreDesire: "Being competent and knowledgeable",
    growthDirection: "Integration to Type 8 - Gaining confidence and ability to act",
    stressDirection: "Disintegration to Type 7 - Becoming scattered and impulsive",
    characteristics: [
      "Analytical and insightful",
      "Independent and self-sufficient",
      "Intellectually curious",
      "Observer-like attitude",
    ],
    strengths: [
      "Excellent analytical ability",
      "Objective and clear-headed",
      "Focus and patience",
      "Intellectual depth",
    ],
    challenges: [
      "Emotional distance",
      "Excessive isolation",
      "Leaning toward observation over action",
      "Fear of energy depletion",
    ],
    color: "blue",
    detailedDescription: "Type 5 Investigators are the most analytical and intellectual type in the Enneagram. They find deep satisfaction in observing and understanding the world, seeking to protect themselves by accumulating knowledge. Type 5 feels that their internal resources (energy, time, emotions) are limited, cherishing and conserving them. They often developed an observer-like attitude in childhood to secure their own space and autonomy in intrusive or overwhelming environments. Healthy Type 5s solve complex problems with deep insight and objective analysis, offering innovative ideas. Unhealthy Type 5s become increasingly isolated from reality, trapped in their own world of thought.",
    scientificBackground: "Type 5 belongs to the 'Head Center,' with fear as the core emotion. Type 5 tries to manage this fear through knowledge and understanding. Psychologically, Type 5 may be associated with schizoid personality traits, characterized by withdrawal into inner world and emotional distance. However, this is not pathological, and many Type 5s are highly functional introverted people. From a neuroscience perspective, Type 5 may be associated with high activation of the prefrontal cortex, which is involved in analytical thinking and planning. According to Enneagram researchers, Type 5's 'greed' is not about material things but about knowledge and understanding.",
    relationshipPattern: "Type 5s need deep trust and space in relationships. They prefer a few deep relationships over superficial socializing and value intellectual connection. They are loyal and reliable to their partners but struggle to express emotional intimacy. Alone time is essential, which can be misinterpreted as lack of interest in the partner. Healthy Type 5s can safely share their feelings and find a balance of maintaining personal space within relationships.",
    workStyle: "Type 5s are recognized for their specialized knowledge and analytical skills at work. They prefer working independently and need uninterrupted time for concentration. They solve complex problems, conduct in-depth research, and provide objective perspectives. Environments with many meetings or team activities can drain their energy. They excel in research, science, technology, strategic analysis, and writing fields.",
    growthStrategies: [
      "Move from gathering knowledge to taking action",
      "Connect more with body and emotions",
      "Develop relationship skills by spending time with others",
      "Free yourself from the pressure of needing to know everything",
      "Trust that your energy is sufficient"
    ],
    famousPeople: ["Albert Einstein", "Stephen Hawking", "Bill Gates", "Tim Burton", "Jodie Foster"],
  },
  6: {
    name: "Type 6",
    nameEn: "Type 6",
    title: "The Loyalist",
    coreMotivation: "Wanting to create a safe and supportive environment",
    coreFear: "Being left without support or guidance",
    coreDesire: "Having security and certainty",
    growthDirection: "Integration to Type 9 - Gaining peace and trust",
    stressDirection: "Disintegration to Type 3 - Becoming competitive and arrogant",
    characteristics: [
      "Responsible and reliable",
      "Anticipates and prepares for risks",
      "Loyal and devoted",
      "Repeatedly questions and verifies",
    ],
    strengths: [
      "Loyalty and commitment",
      "Problem-solving ability",
      "Crisis management ability",
      "Cooperative and supportive",
    ],
    challenges: [
      "Anxiety and worry",
      "Doubt and distrust",
      "Imagining worst-case scenarios",
      "Decision paralysis",
    ],
    color: "teal",
    detailedDescription: "Type 6 Loyalists are the most complex and diverse type in the Enneagram. They seek safety and certainty, remaining loyal to trustworthy people and systems. Type 6 has 'fear' as the core emotion, and depending on how they cope with it, they are divided into 'phobic' Type 6 (retreating from fear) and 'counterphobic' Type 6 (charging toward fear). They often grew up in unstable or unpredictable environments, developing the ability to anticipate and prepare for worst-case scenarios. Healthy Type 6s are courageous, loyal, and champions who fight for others.",
    scientificBackground: "Type 6 belongs to the 'Head Center,' with fear as the core emotion. Type 6 tries to manage fear through thinking, which manifests as constant scenario analysis and risk assessment. Psychologically, Type 6 may be associated with Generalized Anxiety Disorder. From attachment theory, Type 6 may be related to 'insecure-avoidant' or 'insecure-ambivalent' attachment. Neuroscientifically, Type 6 may be associated with high activation of the amygdala, which is involved in threat detection and anxiety response. Interestingly, Type 6 is estimated to be one of the most common types in the general population.",
    relationshipPattern: "Type 6s are loyal and committed partners in relationships. It takes time to build trust, but once trusted, they are highly devoted and protective. However, doubts and tests of the partner can complicate relationships. Ambivalent feelings about authority can also appear in intimate relationships. Healthy Type 6s trust themselves and their partners, committing to relationships despite anxiety. A stable and predictable partner is helpful.",
    workStyle: "Type 6s are responsible and reliable team players at work. They excel at anticipating and preparing for risks and are loyal to teams and organizations. They function best in environments with clear expectations and structure. However, making decisions can be difficult, and excessive worry can hinder productivity. They excel in crisis management, law, medicine, and safety-related fields.",
    growthStrategies: [
      "Acknowledge anxiety but cultivate courage to act",
      "Trust your own intuition and judgment",
      "See both worst-case and best-case scenarios in balance",
      "Find inner guidance rather than external authority",
      "Practice mindfulness focusing on the present moment"
    ],
    famousPeople: ["Robert F. Kennedy", "Tom Hanks", "Ellen DeGeneres", "Julia Roberts", "Bruce Springsteen"],
  },
  7: {
    name: "Type 7",
    nameEn: "Type 7",
    title: "The Enthusiast",
    coreMotivation: "Wanting to be happy, free, and have diverse experiences",
    coreFear: "Suffering, being restricted, and becoming bored",
    coreDesire: "Being satisfied and fulfilled",
    growthDirection: "Integration to Type 5 - Gaining depth and focus",
    stressDirection: "Disintegration to Type 1 - Becoming critical and perfectionistic",
    characteristics: [
      "Enthusiastic and energetic",
      "Versatile and creative",
      "Future-oriented",
      "Optimistic and cheerful",
    ],
    strengths: [
      "Positive energy",
      "Creativity and ideas",
      "Adaptability and flexibility",
      "Fun and inspiring",
    ],
    challenges: [
      "Difficulty keeping promises",
      "Lack of depth",
      "Avoiding pain",
      "Scattered and lacking focus",
    ],
    color: "orange",
    detailedDescription: "Type 7 Enthusiasts are the most passionate and adventure-loving type in the Enneagram. They are drawn to new experiences, ideas, and possibilities, wanting to enjoy life to the fullest. Type 7's core strategy is to avoid pain and limitations and focus on the positive. In childhood, they may have developed a strategy of keeping their minds busy and entertained to avoid the caregiver's emotional absence or painful experiences. Healthy Type 7s are fully immersed in the present moment, experience deep joy, and inspire others. Unhealthy Type 7s constantly seek the next stimulus and live superficially.",
    scientificBackground: "Type 7 belongs to the 'Head Center,' with fear as the core emotion. However, Type 7 covers this fear with future possibilities and plans. Psychologically, Type 7 may be associated with attention deficit patterns or manic tendencies. In the Enneagram, Type 7's 'gluttony' is not about food but about experiences. From a neuroscience perspective, Type 7 may be associated with high activation of the dopamine system, which is involved in desire for novelty and reward-seeking behavior. From positive psychology, Type 7 pursues positive emotions but needs to learn that true happiness comes from meaning and engagement, not accumulation of pleasure.",
    relationshipPattern: "Type 7s are fun and energetic partners in relationships. They enjoy exploring new experiences together and create an optimistic atmosphere. However, they may try to escape when relationships become 'boring' or difficult. They tend to avoid deep emotional conversations or conflicts and may prioritize their own freedom over their partner's needs. Healthy Type 7s learn that depth and commitment in relationships bring true satisfaction and stay together through difficult times.",
    workStyle: "Type 7s bring creative and innovative ideas at work. They can pursue multiple projects simultaneously and infuse teams with energy and optimism. However, they have difficulty focusing on one thing and may miss details or follow-up work. They get bored in repetitive or restrictive environments. They excel in planning, marketing, entertainment, travel, and startup fields.",
    growthStrategies: [
      "Focus on one thing and complete it",
      "Experience and process uncomfortable emotions",
      "Enjoy the fullness of the present moment",
      "Practice depth and commitment in relationships",
      "Recognize that more isn't always better"
    ],
    famousPeople: ["Robin Williams", "Jim Carrey", "Steven Spielberg", "Richard Branson", "Cameron Diaz"],
  },
  8: {
    name: "Type 8",
    nameEn: "Type 8",
    title: "The Challenger",
    coreMotivation: "Wanting to protect and control self and others",
    coreFear: "Being controlled or hurt",
    coreDesire: "Protecting self and maintaining control",
    growthDirection: "Integration to Type 2 - Gaining gentleness and caring",
    stressDirection: "Disintegration to Type 5 - Becoming isolated and secretive",
    characteristics: [
      "Strong and confident",
      "Decisive",
      "Direct and frank",
      "Protective and just",
    ],
    strengths: [
      "Leadership and decisiveness",
      "Courage and confidence",
      "Sense of justice",
      "Protective power",
    ],
    challenges: [
      "Excessive force",
      "Difficulty showing vulnerability",
      "Anger management",
      "Can intimidate others",
    ],
    color: "red",
    detailedDescription: "Type 8 Challengers are the most powerful and decisive type in the Enneagram. They have a strong instinct to protect themselves and loved ones, making their presence clearly felt in the world. Type 8 fears being controlled or vulnerable, building a strong exterior to avoid this. They often had to protect themselves in childhood or received the message that 'you must be strong to survive.' Healthy Type 8s use their power to protect the weak and realize justice, showing generosity and warmth. Unhealthy Type 8s become domineering and destructive, intimidating and controlling others.",
    scientificBackground: "Type 8 belongs to the 'Body Center,' with anger as the core emotion. However, while Type 1 and Type 9 suppress or forget anger, Type 8 expresses it directly. Psychologically, Type 8 can be confused with antisocial or narcissistic traits, but healthy Type 8s have a deep sense of justice and protective instincts. In the Enneagram, Type 8's 'lust' is not sexual but an intense desire for life. Neuroscientifically, Type 8 may be associated with high activation of testosterone and adrenaline systems, which are involved in dominance and aggression.",
    relationshipPattern: "Type 8s are protective and devoted partners in relationships. They fight for their partners and provide safety with their strong presence. However, they may become domineering and infringe on their partner's autonomy, finding it difficult to show vulnerability. They can become overwhelming in conflict situations and may express anger excessively. Healthy Type 8s show tenderness to their partners and learn that vulnerability can be a strength.",
    workStyle: "Type 8s naturally emerge as leaders at work. They are decisive, willing to take responsibility, and excel at leading teams and achieving goals. They perform best in roles with authority and autonomy. However, they may become overly domineering or disregard others' opinions. They excel as entrepreneurs, executives, politicians, lawyers, and in crisis management fields.",
    growthStrategies: [
      "Learn that showing vulnerability is safe",
      "Delegate control to others",
      "Recognize emotions behind anger",
      "Accept that gentleness is also a form of strength",
      "Listen to partners' and team members' perspectives"
    ],
    famousPeople: ["Martin Luther King Jr.", "Churchill", "Frank Sinatra", "Pink", "Russell Crowe"],
  },
  9: {
    name: "Type 9",
    nameEn: "Type 9",
    title: "The Peacemaker",
    coreMotivation: "Wanting to maintain inner peace and harmony",
    coreFear: "Being separated and caught in conflict",
    coreDesire: "Maintaining peace and harmony",
    growthDirection: "Integration to Type 3 - Gaining self-development and drive",
    stressDirection: "Disintegration to Type 6 - Becoming anxious and dependent",
    characteristics: [
      "Peaceful and accepting",
      "Excellent at mediation",
      "Patient",
      "Understands various perspectives",
    ],
    strengths: [
      "Mediation and harmony skills",
      "Accepting and open",
      "Provides stability",
      "Empathy and understanding",
    ],
    challenges: [
      "Lack of assertiveness",
      "Decision avoidance",
      "Passive-aggression",
      "Forgetting oneself",
    ],
    color: "green",
    detailedDescription: "Type 9 Peacemakers are the most peaceful and accepting type in the Enneagram. They pursue harmony internally and externally, avoiding conflict and trying to understand everyone. Type 9 can easily accept and merge with others' perspectives, but in this process, they can easily lose their own voice and desires. They often received the message in childhood to 'not cause problems' or felt that their presence wasn't important. Healthy Type 9s have the ability to bring peace while asserting their own existence and opinions. Unhealthy Type 9s become lethargic, ignore important things, and become 'asleep' in life.",
    scientificBackground: "Type 9 belongs to the 'Body Center,' with anger as the core emotion. However, Type 9 manages anger through 'narcotizing' - numbing or forgetting anger and other uncomfortable feelings. Psychologically, Type 9 may be associated with dissociation tendencies or self-invalidation. In the Enneagram, Type 9's 'sloth' is not physical but indifference to one's own needs and existence. Interestingly, Type 9 is located at the top of the Enneagram symbol and is called the 'harmonizer' because they have some characteristics of all other types. Research shows that Type 9 tends to have high social desirability and conforming behavior.",
    relationshipPattern: "Type 9s are accepting and stable partners in relationships. They adapt to their partner's needs, minimize conflict, and create a comfortable atmosphere. However, by not expressing their own needs and opinions, partners may find it difficult to know their true selves. Conflict avoidance can cause unresolved problems to pile up and may manifest as passive-aggression. Healthy Type 9s recognize that their own existence is also important and grow relationships through healthy conflict.",
    workStyle: "Type 9s contribute to creating a harmonious team environment at work. They can understand and mediate various perspectives and are stable and reliable colleagues. However, they may have difficulty prioritizing and may postpone or avoid important decisions. They may 'fall asleep' in environments with pressure or much conflict. They excel in mediation, counseling, HR, healthcare, and arts fields.",
    growthStrategies: [
      "Recognize and express your own desires and opinions",
      "Address conflict healthily rather than avoiding it",
      "Set priorities and take action",
      "Experience all emotions including anger",
      "Recognize your own existence and importance"
    ],
    famousPeople: ["Dalai Lama", "Abraham Lincoln", "Ronald Reagan", "Keanu Reeves", "Bill Murray"],
  },
};

export const typeColors: Record<EnneagramType, string> = {
  1: "bg-slate-500",
  2: "bg-rose-500",
  3: "bg-amber-500",
  4: "bg-purple-500",
  5: "bg-blue-500",
  6: "bg-teal-500",
  7: "bg-orange-500",
  8: "bg-red-500",
  9: "bg-green-500",
};

export const typeTextColors: Record<EnneagramType, string> = {
  1: "text-slate-500",
  2: "text-rose-500",
  3: "text-amber-500",
  4: "text-purple-500",
  5: "text-blue-500",
  6: "text-teal-500",
  7: "text-orange-500",
  8: "text-red-500",
  9: "text-green-500",
};

export const typeBgColors: Record<EnneagramType, string> = {
  1: "from-slate-500/10 to-gray-500/10",
  2: "from-rose-500/10 to-pink-500/10",
  3: "from-amber-500/10 to-yellow-500/10",
  4: "from-purple-500/10 to-violet-500/10",
  5: "from-blue-500/10 to-cyan-500/10",
  6: "from-teal-500/10 to-emerald-500/10",
  7: "from-orange-500/10 to-amber-500/10",
  8: "from-red-500/10 to-rose-500/10",
  9: "from-green-500/10 to-emerald-500/10",
};

// Wing calculation - higher score among adjacent types
export const getWing = (
  mainType: EnneagramType,
  scores: Record<EnneagramType, number>
): EnneagramType | null => {
  // Adjacent types (1-9 are connected in a circle)
  const leftWing = mainType === 1 ? 9 : (mainType - 1) as EnneagramType;
  const rightWing = mainType === 9 ? 1 : (mainType + 1) as EnneagramType;

  const leftScore = scores[leftWing];
  const rightScore = scores[rightWing];

  // If score difference is too small, consider no wing
  if (Math.abs(leftScore - rightScore) < 5) {
    return null;
  }

  return leftScore > rightScore ? leftWing : rightWing;
};

// Enneagram type order (for circular diagram)
export const typeOrder: EnneagramType[] = [9, 1, 2, 3, 4, 5, 6, 7, 8];

// Center groups
export const centers = {
  body: [8, 9, 1] as EnneagramType[], // Body Center (Anger)
  heart: [2, 3, 4] as EnneagramType[], // Heart Center (Shame)
  head: [5, 6, 7] as EnneagramType[], // Head Center (Fear)
};

export const centerInfo = {
  body: {
    name: "Body Center",
    emotion: "Anger",
    description: "Interacts with the world based on instincts and physical sensations.",
  },
  heart: {
    name: "Heart Center",
    emotion: "Shame",
    description: "Interacts with the world based on emotions and relationships.",
  },
  head: {
    name: "Head Center",
    emotion: "Fear",
    description: "Interacts with the world based on thoughts and analysis.",
  },
};

export const getCenter = (type: EnneagramType): "body" | "heart" | "head" => {
  if (centers.body.includes(type)) return "body";
  if (centers.heart.includes(type)) return "heart";
  return "head";
};

// FAQ Data for Result Page
export const enneagramFAQs = [
  {
    question: "Can my Enneagram type change over time?",
    answer: "No, your core Enneagram type typically remains stable throughout your life. However, you can develop healthier expressions of your type, integrate characteristics from your growth direction, and strengthen or shift your wing. What changes is not your type itself, but your level of health and development within that type."
  },
  {
    question: "What are wings and how do they affect my personality?",
    answer: "Wings are the two types adjacent to your core type on the Enneagram circle. Most people lean toward one wing, which adds flavor and nuance to their main type. For example, a Type 4 with a 3 wing (4w3) will be more ambitious and image-conscious than a Type 4 with a 5 wing (4w5), who tends to be more withdrawn and intellectual."
  },
  {
    question: "What do stress and growth arrows mean?",
    answer: "The Enneagram arrows show how each type behaves under stress (disintegration) and when growing (integration). Under stress, you may take on the negative qualities of your stress point. When healthy and growing, you integrate the positive qualities of your growth point. For example, Type 1 moves to 7 in growth (becoming more spontaneous) and to 4 in stress (becoming moody)."
  },
  {
    question: "How accurate is this test?",
    answer: "This test is designed for entertainment and self-reflection purposes. While based on Enneagram theory, it's a simplified assessment. For a more accurate typing, consider reading detailed type descriptions, taking multiple tests, consulting with an Enneagram coach, or doing deeper self-reflection. Many people find their type through a combination of testing and studying the system."
  },
  {
    question: "I scored high on multiple types. Is that normal?",
    answer: "Yes, it's completely normal to score high on several types, especially if they're connected by arrows or wings. The Enneagram is a spectrum, and we all have access to all nine types to some degree. However, one type typically resonates as your 'home base' - the one that describes your core motivations and fears most accurately."
  },
  {
    question: "Can I use this for relationships or hiring decisions?",
    answer: "The Enneagram is best used for personal growth and self-understanding, not for making decisions about others. While it can provide insights into relationship dynamics and communication styles, it shouldn't be used to judge, stereotype, or make hiring decisions. Every type has strengths and challenges, and individuals vary widely within their type."
  }
];

// Celebrity Comparisons for Result Page
export const enneagramCelebrities = [
  {
    name: "Mahatma Gandhi",
    score: 1,
    description: "Type 1 - The Reformer. Known for principled nonviolent resistance and pursuit of justice and moral integrity.",
    avatar: "⚖️"
  },
  {
    name: "Mother Teresa",
    score: 2,
    description: "Type 2 - The Helper. Devoted her life to serving others and caring for the poor and sick.",
    avatar: "❤️"
  },
  {
    name: "Oprah Winfrey",
    score: 3,
    description: "Type 3 - The Achiever. Highly successful media mogul known for achievement, charisma, and personal brand.",
    avatar: "👑"
  },
  {
    name: "Frida Kahlo",
    score: 4,
    description: "Type 4 - The Individualist. Expressed deep emotions and unique identity through intensely personal art.",
    avatar: "🎨"
  },
  {
    name: "Albert Einstein",
    score: 5,
    description: "Type 5 - The Investigator. Brilliant theoretical physicist who revolutionized science through deep analytical thinking.",
    avatar: "🧠"
  },
  {
    name: "Tom Hanks",
    score: 6,
    description: "Type 6 - The Loyalist. Known for loyalty, reliability, and playing trustworthy 'everyman' characters.",
    avatar: "🎭"
  },
  {
    name: "Robin Williams",
    score: 7,
    description: "Type 7 - The Enthusiast. Energetic comedian who brought joy and explored countless creative possibilities.",
    avatar: "🎪"
  },
  {
    name: "Martin Luther King Jr.",
    score: 8,
    description: "Type 8 - The Challenger. Powerful leader who fought for justice and protected the vulnerable with strength.",
    avatar: "✊"
  },
  {
    name: "Keanu Reeves",
    score: 9,
    description: "Type 9 - The Peacemaker. Known for being peaceful, humble, and avoiding conflict while maintaining harmony.",
    avatar: "🕊️"
  }
];
