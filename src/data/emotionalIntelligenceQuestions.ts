// Emotional Intelligence Test Questions
// Based on psychological research on emotional intelligence and the five-factor model

export interface EQQuestion {
  id: number;
  text: string;
  category: 'selfAwareness' | 'selfRegulation' | 'motivation' | 'empathy' | 'socialSkills';
}

export type AnswerValue = 1 | 2 | 3 | 4 | 5;

export const answerOptions: { value: AnswerValue; label: string }[] = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

export type EQLevel = 'veryLow' | 'low' | 'average' | 'high' | 'veryHigh';

export interface EQResultInfo {
  name: string;
  nameKo: string;
  description: string;
  detailedDescription: string;
  scientificBackground: string;
  strengths: string[];
  weaknesses: string[];
  realWorldExamples: string[];
  color: string;
}

export const testBackground = {
  history: "Emotional Intelligence (EI) was first proposed in 1990 by psychologists Peter Salovey and John Mayer, and was popularized through Daniel Goleman's 1995 book. Emotional intelligence refers to the ability to recognize, understand, and manage emotions in yourself and others, and has a significant impact on personal success and happiness independent of IQ.",
  purpose: "This test evaluates your emotional intelligence level across five key areas: self-awareness, self-regulation, motivation, empathy, and social skills. The results will help you understand your emotional management abilities and identify areas for improvement.",
  disclaimer: "This test is provided for entertainment and self-understanding purposes only. It cannot replace professional psychological assessment or diagnosis, and results should be used for reference only.",
};

export const eqQuestions: EQQuestion[] = [
  // Self-Awareness
  { id: 1, text: "I can accurately recognize and distinguish my emotions.", category: 'selfAwareness' },
  { id: 2, text: "I understand which situations trigger specific emotions in me.", category: 'selfAwareness' },
  { id: 3, text: "I honestly acknowledge my strengths and weaknesses.", category: 'selfAwareness' },
  { id: 4, text: "I understand how my emotions influence my behavior.", category: 'selfAwareness' },
  { id: 5, text: "When stressed, I can accurately identify the cause.", category: 'selfAwareness' },

  // Self-Regulation
  { id: 6, text: "Even when angry, I can calm down without acting impulsively.", category: 'selfRegulation' },
  { id: 7, text: "I remain calm in stressful situations.", category: 'selfRegulation' },
  { id: 8, text: "I know how to express negative emotions constructively.", category: 'selfRegulation' },
  { id: 9, text: "I can adapt flexibly when plans change.", category: 'selfRegulation' },
  { id: 10, text: "I can accept mistakes or failures and start over.", category: 'selfRegulation' },

  // Motivation
  { id: 11, text: "I can motivate myself to achieve goals.", category: 'motivation' },
  { id: 12, text: "I persist through difficult tasks without giving up.", category: 'motivation' },
  { id: 13, text: "I find satisfaction in work itself, even without external rewards.", category: 'motivation' },
  { id: 14, text: "I can delay immediate gratification for long-term goals.", category: 'motivation' },
  { id: 15, text: "I view failures as learning opportunities and accept them positively.", category: 'motivation' },

  // Empathy
  { id: 16, text: "I easily notice other people's emotions.", category: 'empathy' },
  { id: 17, text: "I make an effort to think from others' perspectives and understand them.", category: 'empathy' },
  { id: 18, text: "I can sense people's moods even when they don't express them.", category: 'empathy' },
  { id: 19, text: "I genuinely empathize with others' difficulties.", category: 'empathy' },
  { id: 20, text: "I respond sensitively to others' emotions.", category: 'empathy' },

  // Social Skills
  { id: 21, text: "I can easily connect with diverse people.", category: 'socialSkills' },
  { id: 22, text: "I effectively mediate conflicts and find solutions.", category: 'socialSkills' },
  { id: 23, text: "I facilitate cooperation when working in teams.", category: 'socialSkills' },
  { id: 24, text: "I have no difficulty influencing and persuading others.", category: 'socialSkills' },
  { id: 25, text: "I communicate effectively and convey my opinions clearly.", category: 'socialSkills' },
];

export const eqResultDescriptions: Record<EQLevel, EQResultInfo> = {
  veryHigh: {
    name: "Very High EQ",
    nameKo: "Very High Emotional Intelligence",
    description: "You have exceptional emotional intelligence and excel at understanding and managing emotions in yourself and others.",
    detailedDescription: "You possess outstanding ability to accurately recognize and effectively manage your emotions. You maintain composure in stressful situations and make rational decisions without being overwhelmed by emotions. You are highly sensitive to others' emotions and needs, with excellent empathy skills. You are skilled at building trust and exerting positive influence in relationships. You constructively resolve conflicts and demonstrate leadership in facilitating teamwork. Your self-motivation abilities are exceptional, allowing you to steadily progress toward goals and maintain a positive attitude even in difficult circumstances. Your high emotional intelligence is a valuable asset for both personal and professional success.",
    scientificBackground: "Psychological research shows that high emotional intelligence strongly correlates with professional success, leadership effectiveness, mental health, and relationship satisfaction. Daniel Goleman's research suggests that emotional intelligence predicts workplace performance better than traditional IQ. Neuroscience research reveals that people with high emotional intelligence have more developed connections between the prefrontal cortex and limbic system, leading to more effective emotion regulation and decision-making.",
    strengths: [
      "Excellent self-awareness clearly understands your emotions and behavioral patterns",
      "Effectively regulates emotions and maintains composure even under stress and pressure",
      "Sensitively perceives others' emotions and responds appropriately, forming deep relationships",
      "Outstanding ability to resolve conflicts constructively and create collaborative environments",
      "Excellent self-motivation abilities enable continuous effort toward goals"
    ],
    weaknesses: [
      "May be overly sensitive to others' emotions, leading to emotional fatigue",
      "May feel others' problems as your own and struggle with boundary setting",
      "May sacrifice your own needs in trying to harmonize all situations",
      "May hide your true emotions by over-regulating emotional expression"
    ],
    realWorldExamples: [
      "A manager who identifies team members' strengths and motivates them to successfully lead projects",
      "A counselor who understands and empathizes with patients' emotional pain, forming effective therapeutic relationships",
      "A sales professional who identifies hidden customer needs and builds trust relationships, achieving high performance"
    ],
    color: "from-emerald-400 to-teal-500",
  },
  high: {
    name: "High EQ",
    nameKo: "High Emotional Intelligence",
    description: "You have high emotional intelligence and understand and manage emotions well in most situations.",
    detailedDescription: "You recognize your emotions well and manage them effectively in most cases. You are sensitive to others' emotions and make efforts to empathize and understand them. You are skilled at building trust and creating positive interactions in relationships. You generally maintain composure in stressful situations and handle emotions constructively rather than being overwhelmed by them. When conflicts arise, you seek solutions and value teamwork. You are good at self-motivation, though sometimes you may need external encouragement. Overall, your emotional intelligence positively influences your personal and professional relationships.",
    scientificBackground: "Emotional intelligence research shows that this ability can be developed through learning and training. People with high emotional intelligence tend to perform better at work, cope better with stress, and maintain more satisfying relationships. According to Peter Salovey and John Mayer's ability model, emotional intelligence consists of four dimensions: emotion perception, using emotions in thinking, understanding emotions, and managing emotions.",
    strengths: [
      "Well aware of your emotional state and understand its causes",
      "Appropriately regulate and express emotions in most situations",
      "Empathize with others' emotions and form supportive relationships",
      "Handle conflicts constructively and find solutions",
      "Continuously work toward goals while maintaining a positive attitude"
    ],
    weaknesses: [
      "May struggle with emotion regulation in very high-stress situations",
      "May prioritize others' emotions over your own, leading to burnout",
      "May find it difficult to express complex emotional states",
      "Motivation may decrease under sustained pressure"
    ],
    realWorldExamples: [
      "A professional who communicates smoothly with team members and creates a collaborative atmosphere",
      "A teacher who understands students' individual difficulties and teaches with encouragement",
      "A trusted friend who listens to friends' concerns and provides appropriate advice"
    ],
    color: "from-blue-400 to-cyan-500",
  },
  average: {
    name: "Average EQ",
    nameKo: "Average Emotional Intelligence",
    description: "You have average emotional intelligence, and the effectiveness of emotion management varies depending on the situation.",
    detailedDescription: "You have an average level of emotional intelligence. While you recognize your emotions to some extent, you may feel confused in complex emotional states. Your emotion regulation ability varies by situation, and you may be overwhelmed by emotions when stress is high. You try to understand others' emotions, but sometimes you may struggle to fully empathize from their perspective due to being trapped in your own viewpoint. You generally get along fine in relationships, but may avoid or respond defensively in conflict situations. Your motivation is greatly influenced by external factors, and you may easily lose motivation when difficulties arise. Developing your emotional intelligence can significantly improve your relationships and quality of life.",
    scientificBackground: "Emotional intelligence is not a fixed trait but a developable ability. Research shows that emotional intelligence can be enhanced through mindfulness training, emotion recognition practice, empathy development, and accepting feedback. People with average emotional intelligence can improve self-awareness, self-regulation, and social skills through intentional effort and practice, leading to positive changes in various areas of life.",
    strengths: [
      "Possess basic emotion recognition abilities",
      "Can appropriately regulate emotions in calm situations",
      "Maintain good relationships with familiar people",
      "Well motivated when clear goals are present"
    ],
    weaknesses: [
      "Difficulty accurately identifying and expressing complex emotional states",
      "May react emotionally or be overwhelmed in stressful situations",
      "May miss or misunderstand others' subtle emotional signals",
      "May avoid conflicts or respond ineffectively",
      "May struggle with self-motivation for long-term goals"
    ],
    realWorldExamples: [
      "A professional who handles routine tasks well but experiences significant stress in crisis situations",
      "Someone who gets along well with close friends but struggles to form relationships with new people",
      "A student who works hard when goals are clear but gives up easily when difficulties arise"
    ],
    color: "from-amber-400 to-orange-500",
  },
  low: {
    name: "Low EQ",
    nameKo: "Low Emotional Intelligence",
    description: "You are experiencing difficulties in emotional intelligence areas and need to improve emotion recognition and management.",
    detailedDescription: "You are experiencing considerable difficulty recognizing and managing your emotions. You find it hard to identify the causes of emotions and may be confused about why you feel certain ways. Emotion regulation is difficult, leading to impulsive reactions or suppressing emotions that later explode. Understanding others' emotions is also challenging, and you may unintentionally hurt or cause misunderstandings. Conflicts frequently occur in relationships, and you don't know how to resolve them well. Self-motivation is also difficult, and you struggle to set or achieve goals. However, all these areas can be improved through learning and practice. Professional help or emotional intelligence training programs can be very beneficial.",
    scientificBackground: "Low emotional intelligence can stem from various factors. Environments where emotional expression was suppressed or ignored in childhood, lack of healthy models for handling emotions, and traumatic experiences can all have an impact. However, neuroplasticity research shows that the brain can change even in adulthood, and emotion recognition and regulation abilities can be developed through intentional training. Cognitive behavioral therapy, mindfulness meditation, and emotion recognition training have been proven as effective intervention methods.",
    strengths: [
      "Possess willingness to acknowledge difficulties and desire for improvement",
      "Great room for emotional intelligence development with high growth potential through effort",
      "May be less swayed by emotions, enabling objective judgment",
      "May have a straightforward and honest communication style"
    ],
    weaknesses: [
      "Great difficulty accurately recognizing and naming your emotions",
      "Difficult emotion regulation leads to impulsive reactions or emotion suppression",
      "Difficulty understanding others' emotions and needs leads to frequent relationship conflicts",
      "Cannot cope effectively with stress and pressure, feeling overwhelmed",
      "Difficult self-motivation and lack of sustained effort toward goals"
    ],
    realWorldExamples: [
      "A professional who frequently clashes with colleagues due to emotional reactions",
      "Someone experiencing depression and anxiety due to not understanding their emotions",
      "Someone who repeatedly fails to form and maintain intimate relationships"
    ],
    color: "from-rose-400 to-pink-500",
  },
  veryLow: {
    name: "Very Low EQ",
    nameKo: "Very Low Emotional Intelligence",
    description: "You are experiencing serious difficulties in emotional intelligence areas and may need professional help.",
    detailedDescription: "You are experiencing considerable difficulty in almost all areas of emotional intelligence. You barely recognize your emotions or simply categorize all emotions as 'good' or 'bad'. You don't understand how emotions affect behavior, leaving you confused about your reactions. Emotion regulation is very difficult, causing excessive reactions to minor stimuli or completely shutting down emotions. You barely perceive others' emotions and find it difficult to understand what empathy means. Relationships are very challenging, with continuous problems in interactions with people. These difficulties can seriously affect your quality of life. However, there is hope. You can systematically develop emotional intelligence with help from professional counselors or psychotherapists, and many people have experienced significant changes through this process.",
    scientificBackground: "Very low emotional intelligence can seriously affect daily functioning and mental health. It may be associated with depression, anxiety disorders, and relationship problems. However, research shows these difficulties can be overcome through intensive psychotherapy and skills training. Dialectical behavior therapy (DBT), acceptance and commitment therapy (ACT), and emotion-focused therapy are effective for developing emotion recognition and regulation abilities. Neuroscience research shows that these therapies can actually strengthen the brain's emotion regulation circuits.",
    strengths: [
      "Possess courage to face and acknowledge difficulties",
      "Great potential for growth if willing to seek help and change",
      "Less judgment influenced by emotions may enable highly logical decisions",
      "Possibility of experiencing dramatic life improvements through emotional intelligence development"
    ],
    weaknesses: [
      "Barely recognize or understand your emotions with great difficulty",
      "Very difficult emotion regulation may lead to extreme reactions",
      "Cannot understand others' emotions at all, making relationship formation very difficult",
      "High likelihood of experiencing chronic stress and emotional difficulties",
      "Self-motivation is nearly impossible, frequently feeling powerless"
    ],
    realWorldExamples: [
      "Someone who repeatedly loses jobs and relationships due to emotional outbursts",
      "Someone suffering from chronic depression due to completely not understanding their emotions",
      "Someone socially isolated due to ignoring or not understanding others' emotions"
    ],
    color: "from-gray-400 to-slate-500",
  },
};

// FAQ Data for Result Page
export const eqFAQs = [
  {
    question: "Is this score good or bad?",
    answer: "There's no absolute 'good' or 'bad' EQ score. Emotional intelligence exists on a spectrum, and everyone has room for growth. A score above 70 is generally considered high, 50-70 is average, and below 50 indicates areas where focused development could be beneficial. What matters most is understanding your current level and working to improve it."
  },
  {
    question: "Can I improve my emotional intelligence?",
    answer: "Absolutely! Unlike IQ, which is relatively stable, emotional intelligence can be developed throughout your life. Research shows that with practice, self-reflection, mindfulness, and sometimes professional guidance, people can significantly improve their EQ. Key areas to work on include self-awareness, active listening, empathy practice, and emotional regulation techniques like meditation or journaling."
  },
  {
    question: "How accurate is this test?",
    answer: "This test is designed for entertainment and self-reflection purposes. While it's based on established EQ theory and research, it's not a clinical assessment. For a comprehensive evaluation, consider taking validated assessments like the MSCEIT (Mayer-Salovey-Caruso Emotional Intelligence Test) or consulting with a psychologist. This test provides a general indication of your emotional intelligence tendencies."
  },
  {
    question: "Should I retake the test?",
    answer: "If you felt rushed or distracted during the test, retaking it when you're more focused might give you more accurate results. However, avoid retaking it immediately just to get a 'better' score - that defeats the purpose of honest self-assessment. Consider retaking it after 3-6 months of working on your emotional intelligence to track your progress."
  },
  {
    question: "What if I scored lower than expected?",
    answer: "A lower score isn't a judgment of your worth as a person. It simply highlights areas where you can grow. Many highly successful people started with lower emotional intelligence and developed it over time. Use this as motivation to learn more about emotions, practice empathy, and develop better emotional regulation skills. Consider it an opportunity for personal development."
  },
  {
    question: "How does EQ affect my daily life?",
    answer: "Emotional intelligence impacts virtually every aspect of life - from personal relationships and workplace success to mental health and stress management. High EQ helps you navigate conflicts, build stronger relationships, make better decisions under pressure, lead teams effectively, and maintain emotional well-being. It's one of the strongest predictors of life satisfaction and career success."
  }
];

// Celebrity Comparisons for Result Page
export const eqCelebrities = [
  {
    name: "Oprah Winfrey",
    score: 92,
    description: "Known for exceptional empathy, emotional awareness, and ability to connect with people from all backgrounds.",
    avatar: "👑"
  },
  {
    name: "Barack Obama",
    score: 88,
    description: "Demonstrates high emotional regulation, empathy, and social skills in leadership and communication.",
    avatar: "🎖️"
  },
  {
    name: "Brené Brown",
    score: 90,
    description: "Researcher and author specializing in vulnerability, empathy, and emotional courage.",
    avatar: "📚"
  },
  {
    name: "Daniel Goleman",
    score: 95,
    description: "Author of 'Emotional Intelligence' and pioneer in EQ research and popularization.",
    avatar: "🧠"
  },
  {
    name: "Malala Yousafzai",
    score: 87,
    description: "Shows remarkable emotional resilience, empathy for others, and self-motivation despite adversity.",
    avatar: "🕊️"
  },
  {
    name: "Fred Rogers",
    score: 93,
    description: "Mr. Rogers exemplified empathy, emotional awareness, and ability to connect with children and adults.",
    avatar: "🎭"
  },
  {
    name: "Nelson Mandela",
    score: 91,
    description: "Demonstrated exceptional emotional regulation, forgiveness, and social awareness throughout his life.",
    avatar: "✊"
  },
  {
    name: "Michelle Obama",
    score: 89,
    description: "Known for authentic communication, emotional intelligence in public life, and empowering leadership.",
    avatar: "💪"
  }
];
