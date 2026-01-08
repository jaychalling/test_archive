// Centralized SEO configuration for all tests
export interface TestSeoConfig {
  slug: string;
  title: string;
  resultTitle: string;
  description: string;
  resultDescription: string;
  path: string;
}

export const testSeoConfigs: Record<string, TestSeoConfig> = {
  'rice-purity': {
    slug: 'rice-purity',
    title: 'Original Rice Purity Test - 100 Questions',
    resultTitle: 'Your Rice Purity Score - Original Rice Purity Test',
    description: 'Take the Original Rice Purity Test with 100 questions. Check your purity score and see what it means. The classic innocence test for entertainment.',
    resultDescription: 'See your Rice Purity Test score and what it means. Compare your purity score with others. For entertainment purposes only.',
    path: '/test/rice-purity/',
  },
  'political-compass': {
    slug: 'political-compass-test',
    title: 'Political Compass Test - Where Do You Stand?',
    resultTitle: 'Your Political Orientation - Political Compass Test',
    description: 'Take the Political Compass Test and map your political views on a 2D spectrum with economic and social axes. For entertainment purposes only.',
    resultDescription: 'Discover your political orientation on the compass. See where you stand between left/right and authoritarian/libertarian.',
    path: '/test/political-compass-test/',
  },
  'bdsm': {
    slug: 'bdsm-test',
    title: 'BDSM Test - Discover Your Preferences',
    resultTitle: 'Your BDSM Profile - BDSM Test Results',
    description: 'Take the BDSM Test to explore your relationship dynamics preferences. A self-assessment test for adults. For entertainment purposes only.',
    resultDescription: 'See your BDSM test results and what they mean. Understand your preferences in relationship dynamics.',
    path: '/test/bdsm-test/',
  },
  'love-language': {
    slug: 'love-language-test',
    title: 'Love Language Test - 5 Affection Styles',
    resultTitle: 'Your Love Language - Affection Style Results',
    description: 'Discover your primary love language with this 30-question test. Learn how you prefer to give and receive love. For entertainment purposes only.',
    resultDescription: 'See your love language results and learn how you express affection. Improve your relationships with this insight.',
    path: '/test/love-language-test/',
  },
  'attachment-style': {
    slug: 'attachment-style-test',
    title: 'Attachment Style Test - Find Your Pattern',
    resultTitle: 'Your Attachment Style - Test Results',
    description: 'Discover your attachment style in relationships. Are you secure, anxious, avoidant, or fearful-avoidant? For entertainment purposes only.',
    resultDescription: 'Understand your attachment style and how it affects your relationships. See your anxiety and avoidance levels.',
    path: '/test/attachment-style-test/',
  },
  'big-five': {
    slug: 'big-five-test',
    title: 'Big Five Personality Test (OCEAN) - 50 Questions',
    resultTitle: 'Your Big Five Personality Profile',
    description: 'Take the Big Five Personality Test to measure your Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. For entertainment only.',
    resultDescription: 'See your Big Five personality scores and understand your OCEAN profile. The most research-backed personality model.',
    path: '/test/big-five-test/',
  },
  'enneagram': {
    slug: 'enneagram-test',
    title: 'Enneagram Test - Find Your Type (1-9)',
    resultTitle: 'Your Enneagram Type - Test Results',
    description: 'Discover your Enneagram type among 9 personality types. Learn about your core motivations, fears, and desires. For entertainment purposes only.',
    resultDescription: 'See your Enneagram type and wing. Understand your core motivations and how to grow.',
    path: '/test/enneagram-test/',
  },
  '16-personality': {
    slug: '16-personality-test',
    title: '16 Personalities Test - Find Your Type',
    resultTitle: 'Your 16 Personality Type - Test Results',
    description: 'Discover your personality type among 16 types. Analyze 4 dimensions: energy, information, decisions, and lifestyle. For entertainment purposes only.',
    resultDescription: 'See your 16 personality type result. Understand your cognitive functions and preferences.',
    path: '/test/16-personality-test/',
  },
  'moral-alignment': {
    slug: 'moral-alignment-test',
    title: 'Moral Alignment Test - D&D Alignment Chart',
    resultTitle: 'Your Moral Alignment - Test Results',
    description: 'Find your moral alignment among 9 types. Are you lawful, neutral, or chaotic? Good, neutral, or evil? For entertainment purposes only.',
    resultDescription: 'Discover your D&D-style moral alignment and what it says about your values and ethics.',
    path: '/test/moral-alignment-test/',
  },
  'introvert-extrovert': {
    slug: 'introvert-extrovert-test',
    title: 'Introvert vs Extrovert Test - Find Your Spectrum',
    resultTitle: 'Your Introvert/Extrovert Profile',
    description: 'Are you an introvert or extrovert? Find your position on the spectrum with this 20-question test analyzing 5 key factors. For entertainment only.',
    resultDescription: 'See where you fall on the introvert-extrovert spectrum. Understand your energy recharge style and social preferences.',
    path: '/test/introvert-extrovert-test/',
  },
  'emotional-intelligence': {
    slug: 'emotional-intelligence-test',
    title: 'Emotional Intelligence Test (EQ) - Measure Your Emotional Skills',
    resultTitle: 'Your Emotional Intelligence Score - EQ Test Results',
    description: 'Take the Emotional Intelligence Test to measure your EQ across 5 areas: self-awareness, self-regulation, motivation, empathy, and social skills. For entertainment only.',
    resultDescription: 'See your emotional intelligence scores in all 5 categories. Understand your strengths and areas for growth.',
    path: '/test/emotional-intelligence-test/',
  },
  'career-aptitude': {
    slug: 'career-aptitude-test',
    title: 'Career Aptitude Test - Holland RIASEC Assessment',
    resultTitle: 'Your Career Type - Holland RIASEC Results',
    description: 'Discover your ideal career path with Holland\'s RIASEC model. Find which of 6 types fits you: Realistic, Investigative, Artistic, Social, Enterprising, or Conventional. For entertainment only.',
    resultDescription: 'See your RIASEC career type results. Find careers that match your interests and aptitudes.',
    path: '/test/career-aptitude-test/',
  },
  'communication-style': {
    slug: 'communication-style-test',
    title: 'Communication Style Test - Assertive, Passive, Aggressive, or Passive-Aggressive?',
    resultTitle: 'Your Communication Style - Test Results',
    description: 'Identify your communication pattern with this 28-question test. Are you assertive, passive, aggressive, or passive-aggressive? For entertainment only.',
    resultDescription: 'See your dominant communication style and how it affects your relationships. Learn tips for better communication.',
    path: '/test/communication-style-test/',
  },
  'love-compatibility': {
    slug: 'love-compatibility-test',
    title: 'Love Compatibility Test - Find Your Relationship Readiness',
    resultTitle: 'Your Love Compatibility Score - Relationship Assessment',
    description: 'Assess your relationship readiness across 5 key areas: communication, values, emotional connection, lifestyle, and conflict resolution. For entertainment purposes only.',
    resultDescription: 'See your love compatibility scores in all categories. Understand what you bring to relationships and what to look for in a partner.',
    path: '/test/love-compatibility-test/',
  },
  'self-esteem': {
    slug: 'self-esteem-test',
    title: 'Self-Esteem Test - Measure Your Self-Confidence',
    resultTitle: 'Your Self-Esteem Level - Test Results',
    description: 'Measure your self-confidence and self-perception with this 25-question test based on the Rosenberg Self-Esteem Scale. For entertainment and self-reflection only.',
    resultDescription: 'See your self-esteem level and understand your self-perception patterns. For entertainment only, not a clinical assessment.',
    path: '/test/self-esteem-test/',
  },
  'anxiety-calm': {
    slug: 'anxiety-calm-test',
    title: 'Anxiety vs Calm Test - Discover Your Stress Response Style',
    resultTitle: 'Your Stress Response Tendency - Anxiety vs Calm Results',
    description: 'Discover your stress response style with this 30-question test. Are you naturally calm or do you tend to worry? Measures personality tendencies, not clinical conditions. For entertainment only.',
    resultDescription: 'See where you fall on the anxious-to-calm spectrum. This measures personality tendencies, not anxiety disorders. For entertainment purposes only.',
    path: '/test/anxiety-calm-test/',
  },
};

export const getTestSeoConfig = (testSlug: string): TestSeoConfig | undefined => {
  return testSeoConfigs[testSlug];
};
