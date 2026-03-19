// Centralized SEO configuration for all tests
// CTR-optimized meta tags - emotional/identity-based approach
// Rules: No "Discover/Measure", must include You/Your, first description sentence = tension/surprise
// Disclaimer moved to page body, NOT in meta tags

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
    title: 'Rice Purity Test — 100 Questions, Instant Score (2026)',
    resultTitle: 'Your Rice Purity Score — See What It Actually Means',
    description: 'Take the official Rice Purity Test with 100 yes/no questions. Get your purity score instantly, see how you compare, and find out what your number really means.',
    resultDescription: 'Your Rice Purity score is in. See how you compare to others and what your number really says about you.',
    path: '/test/rice-purity/',
  },
  'political-compass': {
    slug: 'political-compass-test',
    title: 'Political Compass Test — Where Do You Actually Stand? (Free)',
    resultTitle: 'Your Political Position — See Where You Actually Land',
    description: 'Free political compass test with 22 questions. See exactly where you fall on the left-right and authoritarian-libertarian spectrum. Takes 3 minutes.',
    resultDescription: 'Your political compass results are ready. See exactly where you fall between left/right and authoritarian/libertarian.',
    path: '/test/political-compass-test/',
  },
  'bdsm': {
    slug: 'bdsm-test',
    title: 'BDSM Test — Find Your Type in 25 Questions (Free)',
    resultTitle: 'Your BDSM Profile — What Your Results Reveal',
    description: 'Free BDSM test with 25 questions. Find out if you lean dominant, submissive, switch, or something else. Instant results with detailed trait breakdown.',
    resultDescription: 'Your BDSM preferences are mapped. See your dominant traits and what they mean for relationship dynamics.',
    path: '/test/bdsm-test/',
  },
  'love-language': {
    slug: 'love-language-test',
    title: "What's Your Real Love Language? (Most People Are Wrong)",
    resultTitle: 'Your Love Language — This Is How You Actually Give Love',
    description: 'You may think you know how you give love — this test often surprises people. Find your true affection style in under 5 minutes.',
    resultDescription: 'Your love language results reveal how you express and receive affection. Many people are surprised by what they find.',
    path: '/test/love-language-test/',
  },
  'attachment-style': {
    slug: 'attachment-style-test',
    title: 'Your Attachment Style Explains Your Relationships — Find Yours',
    resultTitle: 'Your Attachment Style — This Is Why You Love the Way You Do',
    description: "Your pattern affects who you're drawn to and why. Find out whether you're secure, anxious, or avoidant.",
    resultDescription: 'Your attachment style shapes every relationship you have. See your anxiety and avoidance levels and what they mean.',
    path: '/test/attachment-style-test/',
  },
  'big-five': {
    slug: 'big-five-test',
    title: 'What Your Personality Is Really Like — Big Five Test',
    resultTitle: 'Your Big Five Profile — The Traits You May Not See',
    description: "This test shows traits most people don't see in themselves. Get your OCEAN profile with 50 questions.",
    resultDescription: 'Your Big Five personality scores reveal patterns you may have missed. See how you rank on each trait.',
    path: '/test/big-five-test/',
  },
  'enneagram': {
    slug: 'enneagram-test',
    title: 'Your Enneagram Type Reveals What Drives You — Find It',
    resultTitle: 'Your Enneagram Type — Your Core Fears and Motivations',
    description: 'Learn your core fears, motivations, and blind spots. Find which of the 9 Enneagram types fits you best.',
    resultDescription: 'Your Enneagram type explains your deepest motivations. See your type, wing, and growth path.',
    path: '/test/enneagram-test/',
  },
  '16-personality': {
    slug: '16-personality-test',
    title: 'What Personality Type Are You Really? 16 Types Test',
    resultTitle: 'Your 16 Personality Type — See Your True Type',
    description: 'Many people mistype themselves. Find your true personality across four key dimensions.',
    resultDescription: 'Your personality type is revealed. See your cognitive functions and how rare your type actually is.',
    path: '/test/16-personality-test/',
  },
  'moral-alignment': {
    slug: 'moral-alignment-test',
    title: "What's Your True Moral Alignment? Take the Test",
    resultTitle: 'Your Moral Alignment — Where You Really Stand',
    description: 'Are you more lawful, chaotic, good, or neutral than you think? Find where you truly fall on the alignment chart.',
    resultDescription: 'Your moral alignment reveals your ethical instincts. See where you land on the classic 9-type grid.',
    path: '/test/moral-alignment-test/',
  },
  'introvert-extrovert': {
    slug: 'introvert-extrovert-test',
    title: 'Introvert or Extrovert Test — 20 Questions, Instant Result',
    resultTitle: "Your Introvert/Extrovert Score — You're Not What You Think",
    description: "Are you an introvert, extrovert, or ambivert? Take this 20-question test to find where you actually fall on the spectrum. Free and instant results.",
    resultDescription: 'Your position on the introvert-extrovert spectrum is in. Most people land somewhere unexpected.',
    path: '/test/introvert-extrovert-test/',
  },
  'emotional-intelligence': {
    slug: 'emotional-intelligence-test',
    title: 'How Emotionally Intelligent Are You Really?',
    resultTitle: 'Your EQ Score — Strengths and Blind Spots Revealed',
    description: 'This test reveals strengths and blind spots in your emotional skills. See your EQ across five key areas.',
    resultDescription: 'Your emotional intelligence scores are in. See where you excel and where you might be missing signals.',
    path: '/test/emotional-intelligence-test/',
  },
  'career-aptitude': {
    slug: 'career-aptitude-test',
    title: "Why Some Jobs Drain You — And Others Don't (Career Test)",
    resultTitle: 'Your Career Type — Jobs That Actually Fit You',
    description: 'Your personality fits certain careers better than others. Find your RIASEC profile and ideal work environments.',
    resultDescription: 'Your RIASEC career profile shows which work environments energize you — and which ones drain you.',
    path: '/test/career-aptitude-test/',
  },
  'communication-style': {
    slug: 'communication-style-test',
    title: 'Your Communication Style Is Costing You — Find Out How',
    resultTitle: 'Your Communication Style — What Others Actually See',
    description: 'Assertive, passive, or aggressive — your style shapes every interaction. See your pattern and how it affects relationships.',
    resultDescription: 'Your communication style affects every relationship you have. See your dominant pattern and what it costs you.',
    path: '/test/communication-style-test/',
  },
  'love-compatibility': {
    slug: 'love-compatibility-test',
    title: 'Are You Actually Ready for a Relationship?',
    resultTitle: 'Your Relationship Readiness — Gaps You May Be Ignoring',
    description: "This test reveals gaps people ignore until it's too late. See how prepared you are across key relationship factors.",
    resultDescription: "Your relationship readiness scores reveal strengths and blind spots. See what you bring — and what's missing.",
    path: '/test/love-compatibility-test/',
  },
  'self-esteem': {
    slug: 'self-esteem-test',
    title: 'Your Self-Esteem Might Be Lower Than You Think',
    resultTitle: 'Your Self-Esteem Level — The Truth About Your Confidence',
    description: 'Many people misjudge their confidence. See your self-esteem and self-perception in minutes.',
    resultDescription: 'Your self-esteem score reveals patterns in how you see yourself. Many people are surprised by the result.',
    path: '/test/self-esteem-test/',
  },
  'anxiety-calm': {
    slug: 'anxiety-calm-test',
    title: 'Are You Naturally Calm — Or Just Avoiding Stress?',
    resultTitle: 'Your Stress Response Style — What You Do Under Pressure',
    description: 'This test reveals how you respond under pressure. Find your stress response style and hidden tendencies.',
    resultDescription: 'Your position on the calm-to-anxious spectrum is in. See your stress response patterns and what drives them.',
    path: '/test/anxiety-calm-test/',
  },
  'mental-age': {
    slug: 'mental-age-test',
    title: "What's Your Mental Age? It Might Not Be What You Think",
    resultTitle: 'Your Mental Age — Older or Younger Than You Expected?',
    description: 'Your mind ages differently than your body. Most people are surprised by their psychological age.',
    resultDescription: 'Your mental age is in. See what it reveals about your maturity, wisdom, and approach to life.',
    path: '/test/mental-age-test/',
  },
  'dark-triad': {
    slug: 'dark-triad-test',
    title: 'Dark Triad Test — Narcissism, Machiavellianism & Psychopathy',
    resultTitle: 'Your Dark Triad Score — The Traits You May Not See',
    description: 'Free Dark Triad personality test. Measure your narcissism, Machiavellianism, and psychopathy levels. Everyone scores somewhere — see where you fall.',
    resultDescription: 'Your Dark Triad scores reveal personality shadows you might not have seen. See your breakdown.',
    path: '/test/dark-triad-test/',
  },
  'toxic-trait': {
    slug: 'toxic-trait-test',
    title: "What's Your Toxic Trait? (Everyone Has One)",
    resultTitle: 'Your Toxic Trait — What You May Not See in Yourself',
    description: 'Jealousy, passive aggression, control issues — we all have patterns. This test reveals your primary toxic trait.',
    resultDescription: 'Your toxic trait profile shows patterns you may not have recognized. Self-awareness is the first step.',
    path: '/test/toxic-trait-test/',
  },
};

export const getTestSeoConfig = (testSlug: string): TestSeoConfig | undefined => {
  return testSeoConfigs[testSlug];
};
