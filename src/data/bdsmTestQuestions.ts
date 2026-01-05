export interface BdsmQuestion {
  id: number;
  text: string;
  category: "dominant" | "submissive" | "sadism" | "masochism" | "switch";
}

export const bdsmQuestions: BdsmQuestion[] = [
  // Dominant trait questions (5)
  {
    id: 1,
    text: "I prefer to take the lead in relationships.",
    category: "dominant",
  },
  {
    id: 2,
    text: "I feel satisfied when my partner follows my decisions.",
    category: "dominant",
  },
  {
    id: 3,
    text: "I feel comfortable making plans and guiding my partner.",
    category: "dominant",
  },
  {
    id: 4,
    text: "I find joy in protecting and caring for my partner.",
    category: "dominant",
  },
  {
    id: 5,
    text: "I like to set rules and want them to be followed.",
    category: "dominant",
  },

  // Submissive trait questions (5)
  {
    id: 6,
    text: "I feel comfortable letting someone I trust make decisions.",
    category: "submissive",
  },
  {
    id: 7,
    text: "I feel secure following my partner's directions.",
    category: "submissive",
  },
  {
    id: 8,
    text: "I find great fulfillment in pleasing my partner.",
    category: "submissive",
  },
  {
    id: 9,
    text: "I like the feeling of depending on and being protected by someone.",
    category: "submissive",
  },
  {
    id: 10,
    text: "Following rules set by my partner feels natural to me.",
    category: "submissive",
  },

  // Sadism trait questions (5)
  {
    id: 11,
    text: "I enjoy eliciting reactions from my partner.",
    category: "sadism",
  },
  {
    id: 12,
    text: "I find it interesting to appropriately create tension in my partner.",
    category: "sadism",
  },
  {
    id: 13,
    text: "I'm interested in exploring my partner's limits.",
    category: "sadism",
  },
  {
    id: 14,
    text: "I feel satisfied when my partner experiences strong emotions because of me.",
    category: "sadism",
  },
  {
    id: 15,
    text: "I enjoy giving my partner a bit of stimulation.",
    category: "sadism",
  },

  // Masochism trait questions (5)
  {
    id: 16,
    text: "I'm drawn to intense sensory experiences.",
    category: "masochism",
  },
  {
    id: 17,
    text: "I feel excitement from moderate tension or pressure.",
    category: "masochism",
  },
  {
    id: 18,
    text: "I become more engaged when there's a challenge to overcome.",
    category: "masochism",
  },
  {
    id: 19,
    text: "I like the sense of release that comes after intense stimulation.",
    category: "masochism",
  },
  {
    id: 20,
    text: "I'm interested in experiences that test my limits.",
    category: "masochism",
  },

  // Switch trait questions (5)
  {
    id: 21,
    text: "I enjoy both leading and following roles depending on the situation.",
    category: "switch",
  },
  {
    id: 22,
    text: "I want to have diverse experiences by switching roles.",
    category: "switch",
  },
  {
    id: 23,
    text: "My role naturally changes depending on my partner.",
    category: "switch",
  },
  {
    id: 24,
    text: "Being fixed in just one role feels constraining to me.",
    category: "switch",
  },
  {
    id: 25,
    text: "The exchange of control itself is interesting to me.",
    category: "switch",
  },
];

export type BdsmAnswerValue = 1 | 2 | 3 | 4 | 5;

export const bdsmAnswerOptions: { value: BdsmAnswerValue; label: string }[] = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

export interface BdsmResult {
  dominant: number;
  submissive: number;
  sadism: number;
  masochism: number;
  switch: number;
}

export interface BdsmTraitInfo {
  name: string;
  nameEn: string;
  description: string;
  detailedDescription: string;
  psychologicalBackground: string;
  characteristics: string[];
  healthyPractices: string[];
  communicationTips: string[];
  color: string;
}

export const bdsmTraitDescriptions: Record<string, BdsmTraitInfo> = {
  dominant: {
    name: "Dominant",
    nameEn: "Dominant",
    description: "Prefers to take the lead and guide in relationships. Finds satisfaction in protecting and caring for their partner, making decisions, and providing direction.",
    detailedDescription: "The Dominant trait is a preference for having leadership and initiative in relationships. People with this trait find deep satisfaction in leading, protecting, and caring for their partner. The core of being a Dominant is not simply 'control' but 'responsible care.' In healthy Dominant relationships, the partner's safety, comfort, and boundaries are the top priority, based on trust and consent. Many Dominants tend to take leadership roles in everyday life as well and enjoy making and executing plans. They invest in their partner's growth and development and provide structure and stability in the relationship.",
    psychologicalBackground: "According to psychological research, the Dominant trait is a natural personality characteristic that appears among healthy adults. This trait is related to self-efficacy, responsibility, and the desire to care for others, and is distinct from unstable pursuit of power. People with healthy Dominant tendencies generally show high emotional stability and empathy. In BDSM research, Dominant participants reported above-average subjective well-being and relationship satisfaction. What's important is that this trait is psychologically healthy when expressed within mutually consensual relationships.",
    characteristics: [
      "Prefers taking initiative and setting direction in relationships",
      "Strong sense of responsibility for partner's safety and well-being",
      "Enjoys making plans and creating structure",
      "Invests in partner's growth and development",
      "Clear communication and expectation setting",
      "Finds satisfaction in protector and mentor roles"
    ],
    healthyPractices: [
      "Always practice prior consent and boundary respect",
      "Establish and respect safewords",
      "Actively listen to partner's feedback",
      "Provide sufficient aftercare",
      "Recognize and respect your own limits",
      "Maintain ongoing communication and check-ins"
    ],
    communicationTips: [
      "Have clear conversations about expectations and boundaries",
      "Carefully observe partner's feelings and reactions",
      "Provide constructive feedback, not criticism",
      "Always have debriefing time after activities",
      "Ensure your partner can stop at any time"
    ],
    color: "red"
  },
  submissive: {
    name: "Submissive",
    nameEn: "Submissive",
    description: "Finds comfort in entrusting control to a trusted partner. Finds fulfillment in pleasing their partner and meeting their expectations.",
    detailedDescription: "The Submissive trait is feeling comfort and satisfaction in giving control to a trusted partner. This is not a sign of weakness or dependency, but a choice based on trust. Submissives often carry many responsibilities in everyday life and enjoy letting go of that burden in their relationships. The core of this trait is 'intimacy through trust and vulnerability.' In healthy Submissive relationships, clear boundaries, mutual respect, and consent that can be withdrawn at any time are essential. Many Submissives find deep fulfillment in pleasing their partner and meeting their expectations.",
    psychologicalBackground: "Psychological research shows that people with Submissive tendencies are psychologically healthy and not related to self-esteem or mental health issues. In fact, studies reveal that people participating in consensual BDSM relationships report higher subjective well-being than the general population. The Submissive trait is related to desires for trust, vulnerability, and intimacy, and is common in people with secure attachment styles. What's important is that this is a voluntary choice and can have positive psychological effects when expressed within healthy relationships.",
    characteristics: [
      "Prefers giving control to a trustworthy partner",
      "Finds satisfaction in pleasing partner and meeting expectations",
      "Enjoys following instructions and providing service",
      "Feels secure with structure and guidelines in relationships",
      "Seeks intimacy through deep trust and vulnerability",
      "Experiences liberation from responsibilities"
    ],
    healthyPractices: [
      "Know your boundaries clearly and express them",
      "Always have and use a safeword",
      "Remember you can stop at any time if uncomfortable",
      "Take time to verify your partner's trustworthiness",
      "Request aftercare",
      "Regularly check in on your feelings and experiences"
    ],
    communicationTips: [
      "Clearly state what you want and don't want",
      "Express discomfort or concerns immediately",
      "Discuss expectations and limits before activities",
      "Share your experiences and feelings after activities",
      "Don't be ashamed of your needs"
    ],
    color: "blue"
  },
  sadism: {
    name: "Sadist",
    nameEn: "Sadist",
    description: "Enjoys giving stimulation to their partner and observing their reactions. Interested in exploring partner's limits and eliciting intense emotions.",
    detailedDescription: "The Sadist trait is finding pleasure in providing stimulation or sensations to a partner in a consensual situation and observing their reactions. Healthy sadism presupposes the partner's consent and enjoyment, and derives satisfaction from empathy and connection with the intense sensations and emotions the partner experiences. This trait is interested in exploring the partner's limits, providing new experiences, and eliciting intense emotional responses. The core of being a Sadist is responsibility for the partner's well-being, and confirming that the partner is enjoying the experience is essential.",
    psychologicalBackground: "Sadism in the context of consensual BDSM is distinct from clinical sadistic disorder. Research shows that people practicing consensual BDSM sadism show equal or better results on mental health indicators compared to the general population. They tend to show high empathy, communication skills, and sensitivity to partner reactions. Neuroscientific research shows that providing stimulation to a partner in intimate relationships and observing their reactions activates the brain's reward system. The key difference is consent, empathy, and concern for the partner's safety.",
    characteristics: [
      "Finds pleasure in observing partner's reactions and emotions",
      "Enjoys providing new sensations and experiences",
      "Carefully explores partner's limits",
      "Seeks intense emotional connection",
      "High responsibility for partner's safety",
      "Develops creative and imaginative scenarios"
    ],
    healthyPractices: [
      "Always obtain clear prior consent",
      "Establish safewords and respect them immediately",
      "Explore partner's limits gradually",
      "Educate yourself about physical safety",
      "Carefully observe partner's non-verbal signals",
      "Provide sufficient aftercare"
    ],
    communicationTips: [
      "Discuss specific limits before activities",
      "Create an environment where partner can comfortably give feedback",
      "Check in regularly during activities",
      "Talk about the experience after activities",
      "Respect partner's feelings and experiences"
    ],
    color: "orange"
  },
  masochism: {
    name: "Masochist",
    nameEn: "Masochist",
    description: "Drawn to intense sensory experiences and challenging situations. Enjoys testing their limits and the sense of release that comes from the process.",
    detailedDescription: "The Masochist trait is feeling pleasure and release through intense sensory experiences, challenges, and limit exploration. People with this trait enjoy the endorphin release and sense of liberation that comes after appropriate tension, pressure, or sensory stimulation. The core of masochism is self-choice and control - the masochist always has the authority to choose the experience, set limits, and stop when desired. Many people find stress relief, mindfulness, and opportunities for self-discovery through this experience. Intense physical experiences can often lead to meditative states or 'subspace.'",
    psychologicalBackground: "Psychological research has revealed that masochism in consensual contexts is not related to mental health issues. Rather, studies report that BDSM participants show high levels of subjective well-being, self-awareness, and relationship satisfaction. Endorphins and adrenaline released after physical stimulation can create a state similar to a natural 'runner's high.' Additionally, such experiences have the effect of focusing on the 'present moment,' similar to mindfulness practice. What's important is that this is a voluntary and consensual experience that can be stopped at any time.",
    characteristics: [
      "Curiosity about intense sensory experiences",
      "Enjoys exploring and expanding own limits",
      "Seeks release and peace after tension",
      "Mindfulness and present focus through physical experience",
      "Uses experience as a tool for self-discovery and growth",
      "Seeks deep connection with trusted partner"
    ],
    healthyPractices: [
      "Know your limits clearly and express them",
      "Always have a safeword ready",
      "Only experience with a trusted partner",
      "Carefully observe your body and emotions",
      "Get sufficient aftercare",
      "Educate yourself about physical safety"
    ],
    communicationTips: [
      "Clearly express what you want and don't want",
      "Communicate discomfort or concerns immediately",
      "Talk sufficiently with partner before and after experiences",
      "Share your feelings and physical responses",
      "Give feedback on both positive experiences and areas for improvement"
    ],
    color: "purple"
  },
  switch: {
    name: "Switch",
    nameEn: "Switch",
    description: "Flexibly moves between leading and following roles depending on the situation and partner. Enjoys rich relationship dynamics through diverse role experiences.",
    detailedDescription: "The Switch trait is flexibly moving between Dominant and Submissive roles depending on situation, partner, and mood. Switches experience and enjoy both sides of relationship dynamics, developing deeper understanding and empathy for their partner through this. The advantage of this trait is flexibility that can adapt to various partners and situations. Switches often feel excitement and pleasure from role switching itself, feeling that unpredictable dynamics add vitality to the relationship. Because they've experienced both roles, they can better understand and empathize with their partner's perspective.",
    psychologicalBackground: "The Switch trait reflects psychological flexibility and adaptability. Research shows that Switches feel comfortable in various situations and have a self-concept not bound to fixed roles. They naturally experience role transitions in relationships, which can be a sign of mental agility and empathy. Switch participants often report high levels of communication skills and relationship satisfaction within the BDSM community. By having both experiences, they can better understand their partner's perspective and create more balanced relationship dynamics.",
    characteristics: [
      "Enjoys both Dominant and Submissive roles",
      "Flexible role switching depending on situation and partner",
      "Deep understanding and empathy for both perspectives",
      "Curiosity about diverse experiences and dynamics",
      "Excitement and pleasure from role switching itself",
      "Seeks balanced relationship dynamics"
    ],
    healthyPractices: [
      "Clearly communicate about your current desired role",
      "Discuss sufficiently with partner when switching roles",
      "Clearly set boundaries in both roles",
      "Respect partner's preferences and limits",
      "Allow sufficient adjustment time after role switching",
      "Follow safety rules in both roles"
    ],
    communicationTips: [
      "Be honest about your current mood and desired role",
      "Establish role switching signals with partner",
      "Discuss expectations and limits in each role",
      "Express when role switching doesn't feel natural",
      "Share what you've learned from both experiences"
    ],
    color: "green"
  },
};

// BDSM Test Background Information
export const testBackground = {
  about: "This test is a self-reflection tool for exploring individual relationship dynamic tendencies. BDSM (Bondage/Discipline, Dominance/Submission, Sadism/Masochism) is a term encompassing various relationship dynamics practiced among consenting adults. The important thing is that all activities must be based on full consent between adults.",
  consent: "The core of healthy BDSM relationships is the principles of SSC (Safe, Sane, Consensual) and RACK (Risk-Aware Consensual Kink). All activities should be discussed in advance, safewords should be established, and any participant should be able to stop at any time. Aftercare is essential after all activities.",
  disclaimer: "This test is for fun and self-exploration and is not a psychological diagnostic tool. Test results are for reference only, and defining your identity or relationship style is a personal choice. All sexual/relational activities should be conducted with full consent between legal adults."
};
