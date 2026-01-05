export type AttachmentStyle = "secure" | "anxious" | "avoidant" | "fearfulAvoidant";

export interface AttachmentQuestion {
  id: number;
  text: string;
  // Positive values indicate high scores on that axis, negative values indicate low scores
  anxietyWeight: number; // Anxiety axis weight (-1 ~ 1)
  avoidanceWeight: number; // Avoidance axis weight (-1 ~ 1)
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

export const attachmentStyleQuestions: AttachmentQuestion[] = [
  // === Anxiety axis questions (high score = high anxiety) ===
  // Sense of security in relationships
  {
    id: 1,
    text: "When my partner doesn't contact me, I get anxious and keep wanting to check.",
    anxietyWeight: 1,
    avoidanceWeight: 0,
  },
  {
    id: 2,
    text: "I often doubt whether my partner truly loves me.",
    anxietyWeight: 1,
    avoidanceWeight: 0,
  },
  {
    id: 3,
    text: "I'm afraid of being rejected or abandoned in relationships.",
    anxietyWeight: 1,
    avoidanceWeight: 0,
  },
  // Feelings when alone
  {
    id: 4,
    text: "I feel a strong sense of emptiness or loneliness when alone.",
    anxietyWeight: 1,
    avoidanceWeight: 0,
  },
  {
    id: 5,
    text: "When apart from my partner, I feel anxious and can't concentrate.",
    anxietyWeight: 1,
    avoidanceWeight: 0,
  },
  // Expectations of partner
  {
    id: 6,
    text: "I expect my partner to fulfill all my emotional needs.",
    anxietyWeight: 1,
    avoidanceWeight: 0,
  },

  // === Avoidance axis questions (high score = high avoidance) ===
  // Attitude toward intimacy
  {
    id: 7,
    text: "I'm uncomfortable getting too close to people.",
    anxietyWeight: 0,
    avoidanceWeight: 1,
  },
  {
    id: 8,
    text: "It's difficult for me to show my deep emotions to others.",
    anxietyWeight: 0,
    avoidanceWeight: 1,
  },
  {
    id: 9,
    text: "I'm not comfortable depending on someone.",
    anxietyWeight: 0,
    avoidanceWeight: 1,
  },
  // Emphasis on independence
  {
    id: 10,
    text: "Personal freedom and independence are more important than relationships.",
    anxietyWeight: 0,
    avoidanceWeight: 1,
  },
  {
    id: 11,
    text: "I feel burdened when my partner wants to spend too much time together.",
    anxietyWeight: 0,
    avoidanceWeight: 1,
  },
  {
    id: 12,
    text: "I consider my alone time and space very important.",
    anxietyWeight: 0,
    avoidanceWeight: 1,
  },

  // === Secure attachment (low anxiety, low avoidance) ===
  {
    id: 13,
    text: "I can easily open up and rely on my partner.",
    anxietyWeight: -0.5,
    avoidanceWeight: -0.5,
  },
  {
    id: 14,
    text: "I feel secure in relationships and trust my partner.",
    anxietyWeight: -0.5,
    avoidanceWeight: -0.5,
  },
  {
    id: 15,
    text: "I believe conflicts can be resolved through conversation.",
    anxietyWeight: -0.5,
    avoidanceWeight: -0.5,
  },

  // === Conflict coping style ===
  {
    id: 16,
    text: "When conflict arises, I worry that my partner will leave me.",
    anxietyWeight: 1,
    avoidanceWeight: 0,
  },
  {
    id: 17,
    text: "When problems arise, I first distance myself and try to sort things out alone.",
    anxietyWeight: 0,
    avoidanceWeight: 1,
  },
  {
    id: 18,
    text: "In conflict situations, I suppress my emotions and act indifferent.",
    anxietyWeight: 0,
    avoidanceWeight: 1,
  },

  // === Fearful-Avoidant (high anxiety + high avoidance) ===
  {
    id: 19,
    text: "I want intimate relationships but am also afraid of them.",
    anxietyWeight: 0.5,
    avoidanceWeight: 0.5,
  },
  {
    id: 20,
    text: "When getting close, I distance myself first fearing I'll get hurt.",
    anxietyWeight: 0.5,
    avoidanceWeight: 0.5,
  },
  {
    id: 21,
    text: "I want to be loved but feel like I don't deserve to be loved.",
    anxietyWeight: 0.5,
    avoidanceWeight: 0.5,
  },
  {
    id: 22,
    text: "I find myself in a push-and-pull pattern in relationships.",
    anxietyWeight: 0.5,
    avoidanceWeight: 0.5,
  },

  // === Additional questions ===
  {
    id: 23,
    text: "I'm sensitive to even small changes in my partner's behavior.",
    anxietyWeight: 1,
    avoidanceWeight: 0,
  },
  {
    id: 24,
    text: "It's hard for me to honestly tell my partner when I'm emotionally struggling.",
    anxietyWeight: 0.3,
    avoidanceWeight: 0.7,
  },
];

export interface AttachmentResult {
  anxietyScore: number; // 0-100
  avoidanceScore: number; // 0-100
  primaryStyle: AttachmentStyle;
}

export interface AttachmentStyleInfo {
  name: string;
  nameEn: string;
  description: string;
  characteristics: string[];
  inRelationship: string;
  advice: string[];
  color: string;
  detailedDescription: string;
  scientificBackground: string;
  communicationTips: string[];
  healingStrategies: string[];
  compatibleStyles: AttachmentStyle[];
  challengingStyles: AttachmentStyle[];
}

export const attachmentStyleDescriptions: Record<AttachmentStyle, AttachmentStyleInfo> = {
  secure: {
    name: "Secure",
    nameEn: "Secure",
    description: "Forms stable relationships based on healthy self-image and trust in others. Can maintain balance between intimacy and independence.",
    characteristics: [
      "Has a positive view of self and others",
      "Can comfortably express and share emotions",
      "Can trust and depend on partner",
      "Feels comfortable even when alone",
      "Tries to resolve conflicts constructively",
    ],
    inRelationship: "Becomes a stable and supportive partner, maintaining good balance between the partner's needs and their own needs. Emotionally stable, serves as a safe base in relationships.",
    advice: [
      "Maintain your current relationship patterns",
      "Understand and support partners with insecure attachment",
      "Keep healthy boundaries while staying open-minded",
    ],
    color: "green",
    detailedDescription: "Secure attachment is considered the healthiest attachment type in John Bowlby and Mary Ainsworth's attachment theory. People with secure attachment likely experienced consistent and responsive caregiving in childhood. They feel worthy of love and believe others can be trusted. In adult relationships, secure types can feel comfortable with intimacy while maintaining independence. Research shows that secure attachment is strongly associated with relationship satisfaction, mental health, and overall quality of life. Interestingly, attachment types are not fixed, and one can develop from insecure to secure attachment through 'earned security.'",
    scientificBackground: "Attachment theory was developed by British psychiatrist John Bowlby in the 1960s and was scientifically validated through Mary Ainsworth's 'Strange Situation' experiment. Secure attachment is related to healthy connections in infant brain development, particularly between the prefrontal cortex and limbic system. Neuroscience research shows that people with secure attachment have more appropriately regulated cortisol responses in stressful situations. In adult attachment research (Adult Attachment Interview, AAI), secure attachment is classified as 'Autonomous,' characterized by coherent and integrated narratives about childhood experiences. Research suggests that about 50-60% of the adult population shows secure attachment, with some variation across cultures.",
    communicationTips: [
      "Serve as a safe base for partners with insecure attachment",
      "Respond consistently to your partner's emotional needs",
      "Don't forget to clearly express your own needs too",
      "Stay calm in conflict situations and find solutions together",
      "Understand your partner's attachment style and try customized communication"
    ],
    healingStrategies: [
      "Consciously maintain your current healthy relationship patterns",
      "Use your emotion regulation abilities even in stressful situations",
      "If your partner has insecure attachment, be patient and supportive",
      "Maintain balance between self-care and relationship care",
      "Grow your relationship through continuous self-reflection"
    ],
    compatibleStyles: ["secure", "anxious", "avoidant"],
    challengingStyles: ["fearfulAvoidant"],
  },
  anxious: {
    name: "Anxious-Preoccupied",
    nameEn: "Anxious-Preoccupied",
    description: "Wants reassurance in relationships and often wants to confirm their partner's love. Has fears of rejection or abandonment.",
    characteristics: [
      "Often worries and feels anxious about relationships",
      "Reacts sensitively to partner's actions",
      "Wants to frequently confirm partner's love and attention",
      "Feels anxious or lonely when alone",
      "Tends to be very dependent on the partner",
    ],
    inRelationship: "Can be a passionate and devoted partner, but sometimes excessive confirmation-seeking and anxiety can burden the relationship. May have mood swings depending on partner's responses.",
    advice: [
      "Develop your sense of self-worth",
      "When feeling anxious, pause before reacting",
      "Develop activities outside the relationship like hobbies or friendships",
      "Meditation or mindfulness practice can help",
      "Express your needs honestly to your partner without blaming",
    ],
    color: "amber",
    detailedDescription: "Anxious attachment (or anxious-preoccupied) has an internal working model that is negative about self but positive about others. It may be related to childhood experiences where caregivers' responses were inconsistent. Sometimes responsive, sometimes not - such parenting patterns form the belief in the child that 'if I try harder, I can be loved.' This pattern persists into adulthood, constantly striving to confirm the partner's love. People with anxious attachment can be very loving and devoted partners, but continuous anxiety about relationships can paradoxically push the partner away.",
    scientificBackground: "Anxious attachment is called 'Preoccupied' in Bartholomew and Horowitz's 4-type adult attachment model. This type is characterized by a negative self-model and positive other-model. Neuroscience research shows that people with anxious attachment tend to be more sensitive to rejection signals, with increased amygdala activation. Additionally, their oxytocin system reactivity may differ. From an evolutionary psychology perspective, anxious attachment may have been adaptive in uncertain environments. Sending more signals to get the caregiver's attention may have helped survival. About 15-20% of the adult population shows anxious attachment.",
    communicationTips: [
      "When feeling anxious, pause and breathe before acting",
      "Express your needs directly to your partner without blame or criticism",
      "Don't assume the worst when your partner's response is delayed",
      "Take a break when emotions are heightened during conflicts",
      "Consciously regulate the frequency of texts or calls"
    ],
    healingStrategies: [
      "Strengthen your relationship with yourself - practice being alone",
      "Recognize that your self-worth doesn't depend on your partner's response",
      "Practice observing anxiety through mindfulness meditation",
      "Explore childhood experiences with a therapist or counselor",
      "Develop support systems outside the relationship (friends, family, hobbies)"
    ],
    compatibleStyles: ["secure"],
    challengingStyles: ["avoidant", "fearfulAvoidant"],
  },
  avoidant: {
    name: "Dismissive-Avoidant",
    nameEn: "Dismissive-Avoidant",
    description: "Values independence and self-sufficiency, uncomfortable with emotional intimacy. Tends to prioritize personal freedom over relationships.",
    characteristics: [
      "Uncomfortable with or avoids emotional intimacy",
      "Highly values independence and self-sufficiency",
      "Suppresses and doesn't express emotions",
      "Reluctant to depend on others",
      "Tries to distance when relationships get close",
    ],
    inRelationship: "May appear cold or distant to partner. Has little emotional expression and tends to withdraw during conflicts, which can make the partner feel lonely.",
    advice: [
      "Practice feeling and expressing emotions",
      "Recognize that showing vulnerability is not a weakness",
      "Try depending on your partner for small things first",
      "Explore why intimacy is uncomfortable through self-reflection",
      "Notice small moments of connection in relationships",
    ],
    color: "blue",
    detailedDescription: "Dismissive-avoidant attachment has an internal working model that is positive about self but negative about others. It may be related to childhood experiences where caregivers were emotionally unavailable, emphasized independence, or suppressed emotional expression. The child learns that their emotional needs won't be met even if expressed, eventually suppressing the needs themselves. As adults, avoidant types are uncomfortable with intimacy and adopt an attitude of 'I'm fine alone.' However, this is not true independence but a defense against vulnerability. Even people with avoidant attachment want connection deep down, but find it difficult to acknowledge.",
    scientificBackground: "Avoidant attachment is classified as 'Dismissing' in Bartholomew and Horowitz's model. This type is characterized by a positive self-model and negative other-model. In Mary Ainsworth's 'Strange Situation' experiment, avoidant infants showed no distress when separated from caregivers, but physiological measurements (heart rate, cortisol) showed stress responses. This demonstrates that emotional suppression is only external and stress is experienced internally. Neuroscience research suggests that avoidant attachment may be associated with deactivation of brain regions related to emotion processing. About 20-25% of the adult population shows avoidant attachment.",
    communicationTips: [
      "Remember that expressing emotions is not a weakness",
      "Reinterpret your partner's requests for intimacy as 'attempts to connect' rather than 'intrusion'",
      "During conflicts, promise to take a break and talk again rather than withdrawing",
      "Practice sharing emotions starting with small things",
      "Explain to your partner that you need alone time, but also express the importance of the relationship"
    ],
    healingStrategies: [
      "Practice feeling and naming emotions - an emotion journal can help",
      "Learn that showing vulnerability can be a strength",
      "Practice depending on others little by little in safe relationships",
      "Explore the connection between childhood experiences and current patterns",
      "Acknowledge fear of intimacy and overcome it in small steps"
    ],
    compatibleStyles: ["secure"],
    challengingStyles: ["anxious", "fearfulAvoidant"],
  },
  fearfulAvoidant: {
    name: "Fearful-Avoidant",
    nameEn: "Fearful-Avoidant",
    description: "Experiences contradictory feelings of wanting intimacy while fearing it. Distances to avoid getting hurt when close, but feels anxious when distant.",
    characteristics: [
      "Wants intimacy but fears it at the same time",
      "Both anxiety and avoidance are high in relationships",
      "May react extremely depending on partner's responses",
      "Relationship patterns are confusing (push-pull)",
      "May have negative views of both self and others",
    ],
    inRelationship: "May experience intense emotions with high relationship fluctuations. The pattern of pushing away when close and approaching when distant may repeat.",
    advice: [
      "Explore past relationship experiences or wounds",
      "Seek deeper self-understanding through professional counseling",
      "Build trust little by little in safe relationships",
      "Recognize your patterns and pause when you notice them",
      "Have compassion for yourself",
    ],
    color: "purple",
    detailedDescription: "Fearful-avoidant attachment (also called disorganized attachment) is the most complex attachment type with both high anxiety and avoidance. This type has negative internal working models of both self and others. It may be related to childhood experiences where caregivers were simultaneously the source of fear and safety. The child faces an unsolvable dilemma where they need to seek comfort, but that very person is also frightening. As adults, these individuals deeply want intimacy but simultaneously fear it. They struggle between the fear of 'getting hurt if I get close' and the fear of 'being abandoned if I become distant.' This leads to 'push-pull' patterns in relationships.",
    scientificBackground: "Fearful-avoidant attachment is related to the 'Disorganized' attachment pattern discovered by Mary Main. This type is primarily associated with caregiver abuse, neglect, or unresolved trauma. Neuroscience research shows that people with disorganized attachment may show hyperactivation of the amygdala and hypoactivation of the prefrontal cortex in stressful situations. This explains difficulties with emotion regulation. This attachment type may also be associated with dissociative experiences. About 5-10% of the adult population shows fearful-avoidant attachment, and this type is more strongly associated with mental health issues compared to other types. However, development toward 'earned security' is possible with professional help.",
    communicationTips: [
      "Recognize your pattern (push-pull) and try to explain it to your partner",
      "Try self-regulation when overwhelming emotions come by pausing",
      "Start with small trust-building - consistent small actions rather than big promises",
      "Avoid extreme reactions during conflicts (complete withdrawal or excessive pursuit)",
      "Try to specifically express the reassurance you need to your partner"
    ],
    healingStrategies: [
      "Explore the past with a professional counselor (especially trauma specialists)",
      "EMDR, Somatic Experiencing, and other therapies can help",
      "Have compassion for yourself - this pattern was a survival strategy",
      "Experience elements of 'secure attachment' in safe relationships",
      "Build emotion regulation skills through mindfulness and body-based practices"
    ],
    compatibleStyles: ["secure"],
    challengingStyles: ["anxious", "avoidant", "fearfulAvoidant"],
  },
};

// FAQ Data for Result Page
export const attachmentStyleFAQs = [
  {
    question: "Can attachment styles change over time?",
    answer: "Yes! Attachment styles are not fixed. While they tend to be relatively stable, research shows that attachment patterns can shift through significant relationships, therapy, or personal development work. This is called 'earned security.' With awareness and effort, people with insecure attachment can develop more secure patterns over time."
  },
  {
    question: "What happens when two incompatible attachment styles date?",
    answer: "Certain attachment style pairings (like anxious-avoidant) can create challenging dynamics, but they're not doomed. The 'anxious-avoidant trap' occurs when the anxious partner's pursuit triggers the avoidant partner's withdrawal, creating a cycle. However, with awareness, communication, and willingness to work on patterns, any pairing can succeed. Understanding each other's attachment needs is key."
  },
  {
    question: "How do I develop a more secure attachment style?",
    answer: "Developing secure attachment involves several steps: (1) Awareness - understand your current patterns, (2) Therapy - working with a therapist trained in attachment theory can be transformative, (3) Safe relationships - experiencing consistent, responsive relationships helps rewire attachment patterns, (4) Self-compassion - treating yourself with kindness rather than judgment, (5) Mindfulness - observing your attachment triggers without reacting impulsively."
  },
  {
    question: "Is this test scientifically accurate?",
    answer: "This test is based on established attachment theory research but is designed for entertainment and self-reflection purposes only. For a clinical assessment, validated instruments like the Adult Attachment Interview (AAI) or Experiences in Close Relationships (ECR) questionnaire administered by a professional are recommended. This test provides general insights into your attachment tendencies."
  },
  {
    question: "Where does attachment style come from?",
    answer: "Attachment styles are primarily formed in early childhood through interactions with primary caregivers. Consistent, responsive caregiving typically leads to secure attachment. Inconsistent caregiving may create anxious attachment. Dismissive or emotionally unavailable caregiving often leads to avoidant patterns. Frightening or chaotic caregiving can result in fearful-avoidant attachment. However, adult experiences can also influence attachment patterns."
  },
  {
    question: "Can I have different attachment styles with different people?",
    answer: "Yes, attachment styles can vary somewhat across different relationships and contexts. You might be more secure with friends than romantic partners, or more anxious with one partner than another. However, most people have a primary attachment style that tends to show up across important relationships. Context and the other person's behavior also influence which attachment patterns get activated."
  }
];

// Celebrity/Character Comparisons for Result Page
// Using fictional characters and archetypes for clearer attachment style examples
export const attachmentStyleCelebrities = [
  {
    name: "Leslie Knope (Parks & Rec)",
    attachmentStyle: "secure" as AttachmentStyle,
    description: "Confident in relationships, expresses needs clearly, maintains healthy friendships while in romantic relationships.",
    avatar: "🌟"
  },
  {
    name: "Rachel Green (Friends, later seasons)",
    attachmentStyle: "secure" as AttachmentStyle,
    description: "Evolved from anxious patterns to secure attachment, comfortable with intimacy and independence.",
    avatar: "☕"
  },
  {
    name: "Romeo & Juliet",
    attachmentStyle: "anxious" as AttachmentStyle,
    description: "Intense fear of separation, desperate need for constant reassurance, relationship becomes all-consuming.",
    avatar: "💔"
  },
  {
    name: "Bella Swan (Twilight)",
    attachmentStyle: "anxious" as AttachmentStyle,
    description: "Extreme fear of abandonment, willing to sacrifice everything for relationship, struggles with self-worth.",
    avatar: "🌙"
  },
  {
    name: "James Bond",
    attachmentStyle: "avoidant" as AttachmentStyle,
    description: "Emotionally distant, commitment-phobic, prioritizes independence over intimacy, difficulty trusting.",
    avatar: "🕶️"
  },
  {
    name: "Elsa (Frozen, before transformation)",
    attachmentStyle: "avoidant" as AttachmentStyle,
    description: "Pushes loved ones away to protect them, difficulty expressing emotions, isolates when stressed.",
    avatar: "❄️"
  },
  {
    name: "Harley Quinn & Joker",
    attachmentStyle: "fearfulAvoidant" as AttachmentStyle,
    description: "Chaotic push-pull dynamic, craves love but fears intimacy, extreme emotional volatility in relationships.",
    avatar: "🃏"
  },
  {
    name: "Fleabag (Fleabag series)",
    attachmentStyle: "fearfulAvoidant" as AttachmentStyle,
    description: "Desires connection but self-sabotages, uses humor to avoid vulnerability, complicated relationship patterns.",
    avatar: "🦊"
  }
];
