export interface SelfEsteemQuestion {
  id: number;
  text: string;
  // Positive = higher self-esteem, Negative = lower self-esteem
  scoreDirection: "positive" | "negative";
}

// 4-point scale options (following Rosenberg Self-Esteem Scale format)
export type AnswerValue = 1 | 2 | 3 | 4;

export const answerOptions: { value: AnswerValue; label: string }[] = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Agree" },
  { value: 4, label: "Strongly Agree" },
];

// Based on Rosenberg Self-Esteem Scale with additional questions for entertainment value
export const selfEsteemQuestions: SelfEsteemQuestion[] = [
  // === Core Rosenberg Self-Esteem Scale (10 items) ===
  {
    id: 1,
    text: "I feel that I'm a person of worth, at least on an equal plane with others.",
    scoreDirection: "positive",
  },
  {
    id: 2,
    text: "I feel that I have a number of good qualities.",
    scoreDirection: "positive",
  },
  {
    id: 3,
    text: "All in all, I am inclined to feel that I am a failure.",
    scoreDirection: "negative",
  },
  {
    id: 4,
    text: "I am able to do things as well as most other people.",
    scoreDirection: "positive",
  },
  {
    id: 5,
    text: "I feel I do not have much to be proud of.",
    scoreDirection: "negative",
  },
  {
    id: 6,
    text: "I take a positive attitude toward myself.",
    scoreDirection: "positive",
  },
  {
    id: 7,
    text: "On the whole, I am satisfied with myself.",
    scoreDirection: "positive",
  },
  {
    id: 8,
    text: "I wish I could have more respect for myself.",
    scoreDirection: "negative",
  },
  {
    id: 9,
    text: "I certainly feel useless at times.",
    scoreDirection: "negative",
  },
  {
    id: 10,
    text: "At times I think I am no good at all.",
    scoreDirection: "negative",
  },

  // === Additional Self-Perception Questions (10 items) ===
  {
    id: 11,
    text: "I feel confident in my ability to handle new challenges.",
    scoreDirection: "positive",
  },
  {
    id: 12,
    text: "I often doubt my decisions after I make them.",
    scoreDirection: "negative",
  },
  {
    id: 13,
    text: "I feel comfortable being myself around others.",
    scoreDirection: "positive",
  },
  {
    id: 14,
    text: "I frequently compare myself unfavorably to others.",
    scoreDirection: "negative",
  },
  {
    id: 15,
    text: "I believe I deserve good things in life.",
    scoreDirection: "positive",
  },
  {
    id: 16,
    text: "I often feel like I'm not good enough.",
    scoreDirection: "negative",
  },
  {
    id: 17,
    text: "I'm generally proud of my accomplishments.",
    scoreDirection: "positive",
  },
  {
    id: 18,
    text: "I have a hard time accepting compliments from others.",
    scoreDirection: "negative",
  },
  {
    id: 19,
    text: "I trust my own judgment and opinions.",
    scoreDirection: "positive",
  },
  {
    id: 20,
    text: "I worry a lot about what others think of me.",
    scoreDirection: "negative",
  },

  // === Social Confidence Questions (5 items) ===
  {
    id: 21,
    text: "I feel comfortable expressing my opinions in group settings.",
    scoreDirection: "positive",
  },
  {
    id: 22,
    text: "I avoid speaking up because I fear others will judge me.",
    scoreDirection: "negative",
  },
  {
    id: 23,
    text: "I feel valued and appreciated by people in my life.",
    scoreDirection: "positive",
  },
  {
    id: 24,
    text: "I often feel inferior to my peers.",
    scoreDirection: "negative",
  },
  {
    id: 25,
    text: "I believe my voice and perspective matter.",
    scoreDirection: "positive",
  },
];

export interface SelfEsteemResult {
  totalScore: number;
  percentage: number;
  level: "Very Low" | "Low" | "Moderate" | "High" | "Very High";
}

export type SelfEsteemLevel = "Very Low" | "Low" | "Moderate" | "High" | "Very High";

interface SelfEsteemDescription {
  label: string;
  shortDescription: string;
  meaning: string[];
  traits: string[];
  advice: string[];
  faqs: { question: string; answer: string }[];
}

export const selfEsteemDescriptions: Record<SelfEsteemLevel, SelfEsteemDescription> = {
  "Very High": {
    label: "Very High Self-Esteem",
    shortDescription: "You have strong self-confidence and a positive self-image.",
    meaning: [
      "Your responses indicate a very healthy sense of self-worth and confidence. You typically feel good about yourself, trust your abilities, and don't rely heavily on external validation. This level of self-esteem is associated with resilience, life satisfaction, and the ability to pursue goals confidently.",
      "People with very high self-esteem tend to recover quickly from setbacks, maintain positive outlooks even during challenges, and feel comfortable being authentic. They're often willing to take risks because they trust in their ability to handle outcomes.",
    ],
    traits: [
      "Strong sense of personal worth and capability",
      "Comfortable with who you are, flaws and all",
      "Resilient when facing criticism or setbacks",
      "Willing to take on new challenges confidently",
      "Able to celebrate your successes without arrogance",
      "Comfortable setting and maintaining boundaries",
      "Generally optimistic about your future",
      "Don't rely excessively on others' approval",
    ],
    advice: [
      "Continue nurturing your self-esteem through self-care, goal-setting, and maintaining supportive relationships",
      "Be mindful not to let high self-esteem tip into arrogance—stay open to feedback and growth",
      "Use your confidence to support others who may be struggling with their own self-worth",
      "Remember that everyone has occasional doubts—even very high self-esteem fluctuates with circumstances",
    ],
    faqs: [
      {
        question: "Is it possible to have too much self-esteem?",
        answer: "Very high self-esteem is generally positive, but it becomes problematic if it turns into narcissism (inability to accept criticism, lack of empathy). Healthy high self-esteem includes humility and openness to growth.",
      },
      {
        question: "How can I maintain this level of self-esteem?",
        answer: "Continue practices that support mental health: regular self-reflection, maintaining relationships, pursuing meaningful goals, and being kind to yourself during difficulties. Self-esteem requires ongoing nurturing.",
      },
      {
        question: "Why do I still have moments of self-doubt?",
        answer: "Everyone experiences occasional self-doubt, regardless of overall self-esteem level. It's a normal human response to uncertainty or challenges. What matters is how quickly you recover and whether doubt becomes a persistent pattern.",
      },
    ],
  },
  High: {
    label: "High Self-Esteem",
    shortDescription: "You have solid self-confidence with occasional moments of doubt.",
    meaning: [
      "Your responses show healthy self-esteem with realistic self-perception. You generally feel positive about yourself and your abilities, though you're not immune to occasional self-doubt or criticism. This is actually a very balanced and healthy level of self-esteem.",
      "People with high self-esteem tend to approach life with confidence while remaining grounded and open to feedback. They can acknowledge their weaknesses without being consumed by them and celebrate strengths without excessive pride.",
    ],
    traits: [
      "Generally positive self-image with realistic self-awareness",
      "Comfortable with yourself most of the time",
      "Able to handle criticism without falling apart",
      "Willing to try new things despite some nervousness",
      "Can acknowledge both strengths and weaknesses",
      "Usually bounce back from setbacks reasonably well",
      "Value yourself while staying humble",
    ],
    advice: [
      "Continue building on your solid foundation by challenging yourself with new experiences",
      "When self-doubt arises, remind yourself of past successes and capabilities",
      "Practice self-compassion during difficult times—treat yourself as you would a good friend",
      "Maintain activities and relationships that reinforce your sense of worth",
    ],
    faqs: [
      {
        question: "How can I move from high to very high self-esteem?",
        answer: "Focus on areas where you still experience self-doubt. Challenge negative self-talk, set and achieve small goals, and practice self-compassion. Remember that very high isn't necessarily better—high self-esteem is already very healthy.",
      },
      {
        question: "Is it normal to have fluctuations in self-esteem?",
        answer: "Absolutely. Self-esteem naturally varies based on circumstances, stress levels, and life events. What matters is your baseline level and ability to recover when self-esteem dips temporarily.",
      },
      {
        question: "Why do I still care about others' opinions?",
        answer: "Caring about others' perspectives is normal and even healthy—it's part of being social. Problems only arise when others' opinions override your own self-knowledge or when you seek constant validation.",
      },
    ],
  },
  Moderate: {
    label: "Moderate Self-Esteem",
    shortDescription: "Your self-esteem varies depending on circumstances and feedback from others.",
    meaning: [
      "Your responses indicate that your self-esteem is situational—sometimes solid, sometimes shaky. You may feel confident in familiar areas but doubt yourself in new situations. External validation likely plays a significant role in how you feel about yourself.",
      "This level of self-esteem is common and means you're in a good position to strengthen your self-worth. You have some foundation to build on but would benefit from developing more consistent internal validation.",
    ],
    traits: [
      "Self-confidence varies depending on the situation",
      "Success boosts your self-worth significantly",
      "Criticism or failure can hit hard",
      "You often look to others for validation",
      "Comfortable in some areas, insecure in others",
      "May experience imposter syndrome at times",
      "Self-worth can feel fragile or uncertain",
    ],
    advice: [
      "Work on developing internal validation—recognize your own worth independent of external feedback",
      "Challenge negative self-talk by examining evidence objectively",
      "Set small, achievable goals to build confidence gradually",
      "Practice self-compassion, especially when things don't go as planned",
      "Consider journaling about your strengths and accomplishments",
      "Limit comparison to others—everyone's journey is different",
    ],
    faqs: [
      {
        question: "How can I make my self-esteem more stable?",
        answer: "Focus on building self-esteem from internal sources rather than external validation. Practice self-compassion, acknowledge your accomplishments, challenge negative thoughts, and engage in activities that make you feel competent.",
      },
      {
        question: "Why does my confidence fluctuate so much?",
        answer: "Fluctuating self-esteem often stems from basing your worth on external factors (achievements, others' opinions). Building internal self-worth—valuing yourself regardless of circumstances—creates more stability.",
      },
      {
        question: "Should I seek professional help?",
        answer: "If moderate self-esteem is impacting your quality of life, relationships, or ability to pursue goals, therapy can be very helpful. A therapist can help you identify patterns and build lasting self-confidence.",
      },
    ],
  },
  Low: {
    label: "Low Self-Esteem",
    shortDescription: "You frequently doubt yourself and your worth.",
    meaning: [
      "Your responses suggest persistent struggles with self-worth and self-confidence. You may often feel inadequate, worry excessively about others' opinions, or have difficulty acknowledging your positive qualities. This level of self-esteem can significantly impact your well-being and life satisfaction.",
      "Low self-esteem often develops from past experiences, relationships, or persistent negative self-talk. The good news is that self-esteem is not fixed—with effort and often professional support, it can improve substantially.",
    ],
    traits: [
      "Frequent self-doubt and self-criticism",
      "Difficulty accepting compliments or praise",
      "Tendency to focus on perceived failures or flaws",
      "Heavy reliance on others' validation",
      "Avoiding challenges due to fear of failure",
      "Uncomfortable being the center of attention",
      "Comparing yourself unfavorably to others",
      "May tolerate poor treatment from others",
    ],
    advice: [
      "Seriously consider working with a therapist or counselor—professional support can be transformative",
      "Start small: challenge one negative thought per day with evidence-based alternatives",
      "Practice self-compassion—speak to yourself as kindly as you would to a loved one",
      "Engage in activities where you can experience competence and accomplishment",
      "Limit exposure to social media and other comparison triggers",
      "Build a support network of people who appreciate and value you",
    ],
    faqs: [
      {
        question: "Can low self-esteem be improved?",
        answer: "Yes, absolutely. While it takes time and effort, self-esteem can be significantly improved through therapy, self-compassion practices, challenging negative thoughts, and building competence in areas you care about.",
      },
      {
        question: "Why do I have low self-esteem?",
        answer: "Low self-esteem often stems from childhood experiences, past relationships, trauma, persistent criticism, or bullying. Sometimes it develops from unrealistic standards or comparing yourself to others. Understanding the roots can help in addressing it.",
      },
      {
        question: "How long does it take to improve self-esteem?",
        answer: "There's no set timeline—it varies by person and circumstances. With consistent effort and possibly professional help, many people notice improvements within months. The key is patience and self-compassion throughout the process.",
      },
      {
        question: "Should I fake confidence?",
        answer: "Rather than faking confidence, work on building genuine self-worth. However, 'acting as if' (behaving confidently even when unsure) can sometimes help—just don't rely on it as your only strategy. Address the underlying beliefs.",
      },
    ],
  },
  "Very Low": {
    label: "Very Low Self-Esteem",
    shortDescription: "You experience persistent negative feelings about yourself and your worth.",
    meaning: [
      "Your responses indicate severe struggles with self-worth that may be significantly impacting your daily life, relationships, and well-being. You likely experience frequent negative self-talk, feel unworthy of good things, and may avoid opportunities due to believing you'll fail or aren't good enough.",
      "Very low self-esteem at this level often interferes with pursuing goals, forming healthy relationships, and experiencing life satisfaction. It's important to know that you're not alone in feeling this way, and that with proper support, meaningful improvement is possible.",
    ],
    traits: [
      "Persistent feelings of inadequacy or worthlessness",
      "Severe self-criticism and negative self-talk",
      "Extreme sensitivity to criticism or perceived rejection",
      "Avoiding challenges or new experiences entirely",
      "Difficulty believing positive things about yourself",
      "May accept mistreatment or stay in harmful situations",
      "Constant comparison to others, always feeling inferior",
      "Possible connection to depression or anxiety",
    ],
    advice: [
      "Seeking professional help is strongly recommended—therapy can provide crucial support and tools",
      "Be very gentle with yourself; healing takes time and isn't linear",
      "Start with the smallest steps: one positive affirmation, one small accomplishment at a time",
      "Reach out to trusted friends or family members for support",
      "If you're experiencing thoughts of self-harm, contact a crisis helpline immediately",
      "Remember that your current feelings don't reflect your actual worth as a person",
      "Consider whether depression or anxiety might be contributing factors worth addressing",
    ],
    faqs: [
      {
        question: "Is very low self-esteem a sign of a mental health condition?",
        answer: "Very low self-esteem often co-occurs with depression, anxiety, or other mental health conditions, though it's not a diagnosis itself. A mental health professional can help determine if underlying conditions are contributing and provide appropriate treatment.",
      },
      {
        question: "Can I recover from very low self-esteem?",
        answer: "Yes, recovery is absolutely possible, though it typically requires professional support and dedicated effort. Many people who've experienced very low self-esteem go on to develop healthy self-worth. The journey is individual and non-linear.",
      },
      {
        question: "Where should I start?",
        answer: "Start by finding a therapist or counselor. In the meantime, practice basic self-care (sleep, nutrition, gentle movement), challenge one negative thought per day, and reach out to supportive people. Small steps matter.",
      },
      {
        question: "What if I can't afford therapy?",
        answer: "Look for sliding-scale therapy, community mental health centers, online resources, support groups, or employee assistance programs. Books on self-compassion and cognitive behavioral therapy can also help. Don't give up—resources exist.",
      },
      {
        question: "Is this test accurate enough to tell me I have very low self-esteem?",
        answer: "This test provides general insights but isn't a clinical diagnosis. If your results concern you, consider it a sign to seek professional evaluation. A therapist can provide a more comprehensive assessment and personalized support.",
      },
    ],
  },
};

// Celebrity comparisons (note: these are estimates for entertainment)
export const selfEsteemCelebrities = {
  "Very High": [
    { name: "Oprah Winfrey", description: "Confident self-belief despite humble beginnings" },
    { name: "Dwayne 'The Rock' Johnson", description: "Strong self-confidence and positive attitude" },
  ],
  High: [
    { name: "Emma Watson", description: "Confident yet humble and self-aware" },
    { name: "Keanu Reeves", description: "Quiet confidence without arrogance" },
  ],
  Moderate: [
    { name: "Jennifer Lawrence", description: "Confident in work, openly admits insecurities" },
    { name: "Ryan Gosling", description: "Balanced self-perception" },
  ],
  Low: [
    { name: "Many child stars", description: "Often struggle after early fame" },
    { name: "Various artists", description: "Create from place of self-doubt" },
  ],
  "Very Low": [
    { name: "Various celebrities with documented struggles", description: "Often hidden behind public persona" },
  ],
};
