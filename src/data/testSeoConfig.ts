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
};

export const getTestSeoConfig = (testSlug: string): TestSeoConfig | undefined => {
  return testSeoConfigs[testSlug];
};
