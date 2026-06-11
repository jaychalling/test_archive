/**
 * Shared whitelist config for the viral share loop.
 * Used by api/og.tsx (score card image) and api/s.ts (crawler share page).
 *
 * SECURITY: every value rendered into HTML/images MUST come from this file
 * (or be a clamped integer). No free-text from the URL is ever rendered.
 */

export interface ScoreTestConfig {
  kind: 'score';
  name: string;
  min: number;
  max: number;
  /** big-number suffix, e.g. "/100" — omitted for mental age */
  suffix?: string;
  /** descending bands: first entry whose `from` <= score wins */
  bands?: { from: number; label: string }[];
  /** "I scored {value}..." template; {value} is replaced */
  shareTitle: string;
  theme: [string, string];
  cta: string;
}

export interface TypeTestConfig {
  kind: 'type';
  name: string;
  /** normalized (kebab-case, lowercase) key -> display */
  labels: Record<string, { label: string; sub?: string }>;
  /** alternative validation for open-but-constrained codes (Holland) */
  pattern?: { regex: string; transform: 'upper'; sub: string };
  /** "I got {label}..." template; {label} is replaced */
  shareTitle: string;
  theme: [string, string];
  cta: string;
}

export type ShareTestConfig = ScoreTestConfig | TypeTestConfig;

const mbti = (nick: string) => ({ sub: nick });

export const SHARE_TESTS: Record<string, ShareTestConfig> = {
  'rice-purity': {
    kind: 'score',
    name: 'Rice Purity Test',
    min: 0,
    max: 100,
    suffix: '/100',
    bands: [
      { from: 81, label: 'Pure' },
      { from: 61, label: 'Innocent' },
      { from: 41, label: 'Adventurous' },
      { from: 21, label: 'Explicit' },
      { from: 0, label: 'Debauched' },
    ],
    shareTitle: 'I scored {value} on the Rice Purity Test!',
    theme: ['#7c3aed', '#db2777'],
    cta: "What's your score?",
  },
  'political-compass-test': {
    kind: 'type',
    name: 'Political Compass Test',
    labels: {
      'left-authoritarian': { label: 'Left Authoritarian' },
      'right-authoritarian': { label: 'Right Authoritarian' },
      'left-libertarian': { label: 'Left Libertarian' },
      'right-libertarian': { label: 'Right Libertarian' },
    },
    shareTitle: 'I got {label} on the Political Compass Test!',
    theme: ['#1e3a8a', '#7c3aed'],
    cta: 'Where do you land?',
  },
  'bdsm-test': {
    kind: 'type',
    name: 'BDSM Test',
    labels: {
      dominant: { label: 'Dominant' },
      submissive: { label: 'Submissive' },
      sadism: { label: 'Sadist' },
      masochism: { label: 'Masochist' },
      switch: { label: 'Switch' },
    },
    shareTitle: 'My BDSM Test result: {label}',
    theme: ['#18181b', '#991b1b'],
    cta: "What's your kink profile?",
  },
  'love-language-test': {
    kind: 'type',
    name: 'Love Language Test',
    labels: {
      'words-of-affirmation': { label: 'Words of Affirmation' },
      'acts-of-service': { label: 'Acts of Service' },
      'receiving-gifts': { label: 'Receiving Gifts' },
      'quality-time': { label: 'Quality Time' },
      'physical-touch': { label: 'Physical Touch' },
    },
    shareTitle: 'My love language is {label}!',
    theme: ['#ec4899', '#8b5cf6'],
    cta: "What's your love language?",
  },
  'attachment-style-test': {
    kind: 'type',
    name: 'Attachment Style Test',
    labels: {
      secure: { label: 'Secure', sub: 'Attachment Style' },
      anxious: { label: 'Anxious', sub: 'Attachment Style' },
      avoidant: { label: 'Avoidant', sub: 'Attachment Style' },
      'fearful-avoidant': { label: 'Fearful-Avoidant', sub: 'Attachment Style' },
    },
    shareTitle: 'I got {label} on the Attachment Style Test!',
    theme: ['#059669', '#0d9488'],
    cta: "What's your attachment style?",
  },
  'big-five-test': {
    kind: 'type',
    name: 'Big Five Personality Test',
    labels: {
      openness: { label: 'Openness', sub: 'Strongest Trait' },
      conscientiousness: { label: 'Conscientiousness', sub: 'Strongest Trait' },
      extraversion: { label: 'Extraversion', sub: 'Strongest Trait' },
      agreeableness: { label: 'Agreeableness', sub: 'Strongest Trait' },
      neuroticism: { label: 'Neuroticism', sub: 'Strongest Trait' },
    },
    shareTitle: 'My strongest Big Five trait is {label}!',
    theme: ['#2563eb', '#7c3aed'],
    cta: "What's your personality profile?",
  },
  'enneagram-test': {
    kind: 'type',
    name: 'Enneagram Test',
    labels: {
      '1': { label: 'Type 1', sub: 'Enneagram' },
      '2': { label: 'Type 2', sub: 'Enneagram' },
      '3': { label: 'Type 3', sub: 'Enneagram' },
      '4': { label: 'Type 4', sub: 'Enneagram' },
      '5': { label: 'Type 5', sub: 'Enneagram' },
      '6': { label: 'Type 6', sub: 'Enneagram' },
      '7': { label: 'Type 7', sub: 'Enneagram' },
      '8': { label: 'Type 8', sub: 'Enneagram' },
      '9': { label: 'Type 9', sub: 'Enneagram' },
    },
    shareTitle: 'I am Enneagram {label}!',
    theme: ['#d97706', '#dc2626'],
    cta: "What's your type?",
  },
  '16-personality-test': {
    kind: 'type',
    name: '16 Personality Test',
    labels: {
      istj: { label: 'ISTJ', ...mbti('The Inspector') },
      isfj: { label: 'ISFJ', ...mbti('The Protector') },
      infj: { label: 'INFJ', ...mbti('The Counselor') },
      intj: { label: 'INTJ', ...mbti('The Mastermind') },
      istp: { label: 'ISTP', ...mbti('The Craftsman') },
      isfp: { label: 'ISFP', ...mbti('The Composer') },
      infp: { label: 'INFP', ...mbti('The Healer') },
      intp: { label: 'INTP', ...mbti('The Thinker') },
      estp: { label: 'ESTP', ...mbti('The Dynamo') },
      esfp: { label: 'ESFP', ...mbti('The Performer') },
      enfp: { label: 'ENFP', ...mbti('The Champion') },
      entp: { label: 'ENTP', ...mbti('The Visionary') },
      estj: { label: 'ESTJ', ...mbti('The Supervisor') },
      esfj: { label: 'ESFJ', ...mbti('The Provider') },
      enfj: { label: 'ENFJ', ...mbti('The Teacher') },
      entj: { label: 'ENTJ', ...mbti('The Field Marshal') },
    },
    shareTitle: 'I got {label} on the 16 Personality Test!',
    theme: ['#6d28d9', '#4f46e5'],
    cta: "What's your type?",
  },
  'moral-alignment-test': {
    kind: 'type',
    name: 'Moral Alignment Test',
    labels: {
      'lawful-good': { label: 'Lawful Good' },
      'neutral-good': { label: 'Neutral Good' },
      'chaotic-good': { label: 'Chaotic Good' },
      'lawful-neutral': { label: 'Lawful Neutral' },
      'true-neutral': { label: 'True Neutral' },
      'chaotic-neutral': { label: 'Chaotic Neutral' },
      'lawful-evil': { label: 'Lawful Evil' },
      'neutral-evil': { label: 'Neutral Evil' },
      'chaotic-evil': { label: 'Chaotic Evil' },
    },
    shareTitle: 'My moral alignment is {label}!',
    theme: ['#334155', '#b45309'],
    cta: "What's your alignment?",
  },
  'introvert-extrovert-test': {
    kind: 'type',
    name: 'Introvert vs Extrovert Test',
    labels: {
      'strong-introvert': { label: 'Strong Introvert' },
      introvert: { label: 'Introvert' },
      ambivert: { label: 'Ambivert' },
      extrovert: { label: 'Extrovert' },
      'strong-extrovert': { label: 'Strong Extrovert' },
    },
    shareTitle: 'I got {label} on the Introvert vs Extrovert Test!',
    theme: ['#4f46e5', '#f97316'],
    cta: 'Which one are you?',
  },
  'emotional-intelligence-test': {
    kind: 'score',
    name: 'Emotional Intelligence Test',
    min: 0,
    max: 100,
    suffix: '/100',
    bands: [
      { from: 80, label: 'Very High EQ' },
      { from: 60, label: 'High EQ' },
      { from: 40, label: 'Average EQ' },
      { from: 20, label: 'Low EQ' },
      { from: 0, label: 'Developing EQ' },
    ],
    shareTitle: 'I scored {value}/100 on the Emotional Intelligence Test!',
    theme: ['#0d9488', '#2563eb'],
    cta: "What's your EQ?",
  },
  'career-aptitude-test': {
    kind: 'type',
    name: 'Career Aptitude Test',
    labels: {},
    pattern: { regex: '^[riasec]{3}$', transform: 'upper', sub: 'Holland Code' },
    shareTitle: 'My Holland Code is {label}!',
    theme: ['#0891b2', '#1d4ed8'],
    cta: "What's your career code?",
  },
  'communication-style-test': {
    kind: 'type',
    name: 'Communication Style Test',
    labels: {
      assertive: { label: 'Assertive' },
      passive: { label: 'Passive' },
      aggressive: { label: 'Aggressive' },
      'passive-aggressive': { label: 'Passive-Aggressive' },
    },
    shareTitle: 'My communication style is {label}!',
    theme: ['#0284c7', '#7c3aed'],
    cta: 'How do you communicate?',
  },
  'love-compatibility-test': {
    kind: 'score',
    name: 'Love Compatibility Test',
    min: 0,
    max: 100,
    suffix: '%',
    bands: [
      { from: 80, label: 'Excellent Compatibility' },
      { from: 65, label: 'High Compatibility' },
      { from: 50, label: 'Good Compatibility' },
      { from: 35, label: 'Moderate Compatibility' },
      { from: 0, label: 'Low Compatibility' },
    ],
    shareTitle: 'We scored {value}% on the Love Compatibility Test!',
    theme: ['#e11d48', '#9d174d'],
    cta: "What's your score?",
  },
  'self-esteem-test': {
    kind: 'score',
    name: 'Self-Esteem Test',
    min: 0,
    max: 100,
    suffix: '/100',
    bands: [
      { from: 80, label: 'Very High' },
      { from: 65, label: 'High' },
      { from: 45, label: 'Moderate' },
      { from: 25, label: 'Low' },
      { from: 0, label: 'Very Low' },
    ],
    shareTitle: 'I scored {value}/100 on the Self-Esteem Test!',
    theme: ['#10b981', '#2563eb'],
    cta: "What's your score?",
  },
  'anxiety-calm-test': {
    kind: 'score',
    name: 'Anxiety vs Calm Test',
    min: 0,
    max: 100,
    suffix: '/100',
    bands: [
      { from: 75, label: 'Very Calm' },
      { from: 60, label: 'Calm' },
      { from: 40, label: 'Balanced' },
      { from: 25, label: 'Anxious' },
      { from: 0, label: 'Very Anxious' },
    ],
    shareTitle: 'I scored {value}/100 on the Anxiety vs Calm Test!',
    theme: ['#0f766e', '#38bdf8'],
    cta: 'How calm are you under stress?',
  },
  'mental-age-test': {
    kind: 'score',
    name: 'Mental Age Test',
    min: 10,
    max: 80,
    shareTitle: 'My mental age is {value}!',
    theme: ['#3b82f6', '#8b5cf6'],
    cta: "What's your mental age?",
  },
  'dark-triad-test': {
    kind: 'type',
    name: 'Dark Triad Test',
    labels: {
      narcissism: { label: 'Narcissism', sub: 'Primary Trait' },
      machiavellianism: { label: 'Machiavellianism', sub: 'Primary Trait' },
      psychopathy: { label: 'Psychopathy', sub: 'Primary Trait' },
    },
    shareTitle: 'My Dark Triad primary trait is {label}!',
    theme: ['#0f172a', '#6b21a8'],
    cta: 'How dark are you?',
  },
  'toxic-trait-test': {
    kind: 'type',
    name: 'Toxic Trait Test',
    labels: {
      jealousy: { label: 'Jealousy', sub: 'Primary Toxic Trait' },
      'passive-aggression': { label: 'Passive Aggression', sub: 'Primary Toxic Trait' },
      control: { label: 'Control', sub: 'Primary Toxic Trait' },
      negativity: { label: 'Negativity', sub: 'Primary Toxic Trait' },
      'self-centeredness': { label: 'Self-Centeredness', sub: 'Primary Toxic Trait' },
      dishonesty: { label: 'Dishonesty', sub: 'Primary Toxic Trait' },
    },
    shareTitle: 'My toxic trait is {label}!',
    theme: ['#be123c', '#7e22ce'],
    cta: "What's your toxic trait?",
  },
};

export const BASE_URL = 'https://www.test-archive.com';

export interface ResolvedShare {
  slug: string;
  testName: string;
  /** normalized value safe to echo into URLs */
  value: string;
  /** big text on the card, e.g. "43" or "INTJ" */
  heading: string;
  /** small suffix next to a score heading, e.g. "/100" */
  headingSuffix?: string;
  /** pill under the heading, e.g. "Adventurous" or "The Mastermind" */
  subline?: string;
  /** human label for og:title, e.g. "43/100" or "Lawful Good" */
  shareTitle: string;
  theme: [string, string];
  cta: string;
  testUrl: string;
  shareUrl: string;
  ogImageUrl: string;
}

const normalize = (raw: string): string =>
  raw
    .trim()
    .replace(/_/g, '-')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();

/**
 * Validate slug + value against the whitelist. Returns null when anything
 * is unknown — callers must treat null as "do not render user input".
 */
export function resolveShare(slugRaw: string | null, valueRaw: string | null): ResolvedShare | null {
  if (!slugRaw || !valueRaw) return null;
  const slug = normalize(slugRaw);
  const test = SHARE_TESTS[slug];
  if (!test) return null;

  let value: string;
  let heading: string;
  let headingSuffix: string | undefined;
  let subline: string | undefined;
  let title: string;

  if (test.kind === 'score') {
    const parsed = Number.parseInt(valueRaw, 10);
    if (!Number.isFinite(parsed)) return null;
    const score = Math.min(test.max, Math.max(test.min, parsed));
    value = String(score);
    heading = String(score);
    headingSuffix = test.suffix;
    subline = test.bands?.find((b) => score >= b.from)?.label;
    title = test.shareTitle.replace('{value}', String(score));
  } else {
    const key = normalize(valueRaw);
    const entry = test.labels[key];
    if (entry) {
      value = key;
      heading = entry.label;
      subline = entry.sub;
      title = test.shareTitle.replace('{label}', entry.label);
    } else if (test.pattern && new RegExp(test.pattern.regex).test(key)) {
      value = key;
      heading = key.toUpperCase();
      subline = test.pattern.sub;
      title = test.shareTitle.replace('{label}', heading);
    } else {
      return null;
    }
  }

  return {
    slug,
    testName: test.name,
    value,
    heading,
    headingSuffix,
    subline,
    shareTitle: title,
    theme: test.theme,
    cta: test.cta,
    testUrl: `${BASE_URL}/test/${slug}/`,
    shareUrl: `${BASE_URL}/s/${slug}/${value}/`,
    ogImageUrl: `${BASE_URL}/api/og?slug=${slug}&value=${encodeURIComponent(value)}`,
  };
}

export const isKnownSlug = (slug: string | null): boolean =>
  !!slug && Object.prototype.hasOwnProperty.call(SHARE_TESTS, normalize(slug));
