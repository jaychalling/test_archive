/**
 * Shared whitelist config for the viral share loop.
 * Used by api/og.tsx (score card image) and api/s.ts (crawler share page).
 *
 * SECURITY: every value rendered into HTML/images MUST come from this file
 * (or be a clamped integer). No free-text from the URL is ever rendered.
 */

/**
 * VIRAL share-bait layer (element #1 persona, #3 social comparison, #4 one-liner).
 * Everything here is server-whitelisted text — no free input is ever rendered.
 *
 * `persona`     : identity label (noun + emoji) shown ABOVE the score/label.
 * `quip`        : punchy, slightly provocative one-liner for share text.
 * `framing`     : how the comparison pill is phrased -> "{word} THAN {n} OF 100 PEOPLE".
 *   - 'high'    -> n = percentile        (flatter a high score, e.g. word "PURER")
 *   - 'low'     -> n = 100 - percentile  (low score is the flex, e.g. word "MORE UNHINGED")
 *   `word` is the FULL comparative phrase ("PURER", "MORE UNHINGED", "WISER").
 *   Type tests instead use a prevalence map -> "RARER THAN {100-prevalence}% OF PEOPLE".
 */
export interface Persona {
  title: string;
  emoji: string;
}
export interface ViralBand {
  persona: Persona;
  quip: string;
  /**
   * Optional per-band override for the comparison pill so EVERY band gets a
   * FLATTERING line (a high purity score brags "PURER THAN X", a low one brags
   * "MORE UNHINGED THAN X"). Falls back to the test-level `framing` when unset.
   */
  pill?: { direction: 'high' | 'low'; word: string };
}

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
  /** percentile model (normal CDF) for the social-comparison pill */
  stats?: { meanPercent: number; stdDevPercent: number };
  /** comparison framing for the pill */
  framing?: { direction: 'high' | 'low'; word: string };
  /** band.from -> viral persona + one-liner (keyed by the same band threshold) */
  viral?: Record<number, ViralBand>;
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
  /** normalized key -> rough population prevalence % (for the rarity pill) */
  prevalence?: Record<string, number>;
  /** normalized key -> viral persona + one-liner */
  viral?: Record<string, ViralBand>;
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
    // higher = purer; mean 53, sd 12.5 (matches ScoreDistributionChart "rice-purity")
    stats: { meanPercent: 53, stdDevPercent: 12.5 },
    // default: low score is the flex in dorm/friend group chats
    framing: { direction: 'low', word: 'MORE UNHINGED' },
    viral: {
      // high scores flex "PURER"; low scores flex "UNHINGED" — always flattering
      81: { persona: { title: 'The Untouched Saint', emoji: '😇' }, quip: 'Purer than 91 of 100 people. My mom is so proud and my friends are concerned.', pill: { direction: 'high', word: 'PURER' } },
      61: { persona: { title: 'The Quiet Good Kid', emoji: '🙂' }, quip: 'Mostly innocent. A couple of footnotes I will be taking to the grave.', pill: { direction: 'high', word: 'PURER' } },
      41: { persona: { title: 'The Balanced Veteran', emoji: '😏' }, quip: 'Lived a little, regret nothing, screenshot this.' },
      21: { persona: { title: 'The Certified Menace', emoji: '😈' }, quip: 'The test took psychic damage grading this one.' },
      0:  { persona: { title: 'The Living Legend', emoji: '🔥' }, quip: 'The test filed a restraining order. Beat my score, I dare you.' },
    },
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
    // rough population prevalence (rarity pill = "rarer than 100-prevalence% of people")
    prevalence: { dominant: 21, submissive: 16, sadism: 10, masochism: 12, switch: 41 },
    viral: {
      dominant:   { persona: { title: 'The One In Charge', emoji: '🔥' }, quip: 'Result: Dominant. Surprising literally no one in this group chat.' },
      submissive: { persona: { title: 'The Devoted', emoji: '🎀' }, quip: 'Got Submissive. Yes, I will be screenshotting this for a certain someone.' },
      sadism:     { persona: { title: 'The Instigator', emoji: '😈' }, quip: 'Sadist. The smile makes sense now.' },
      masochism:  { persona: { title: 'The Brave One', emoji: '⛓️' }, quip: "Masochist. Pain is just spicy attention, apparently." },
      switch:     { persona: { title: 'The Switch', emoji: '🔀' }, quip: 'Got Switch. I contain multitudes (and a few accessories).' },
    },
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
    bands: [
      { from: 61, label: 'Old Soul' },
      { from: 41, label: 'Seasoned' },
      { from: 26, label: 'Functioning Adult' },
      { from: 16, label: 'Young at Heart' },
      { from: 10, label: 'Forever Young' },
    ],
    // mental age scale 10-80, population mean ~36 (mid-30s). Calibrated on the
    // (score-min)/(max-min) normalized scale so mental age 36 reads ~50th pct.
    // MUST match testStatistics['mental-age'] in src/lib/percentile.ts.
    stats: { meanPercent: 37, stdDevPercent: 20 },
    // default: a LOW mental age is the funny flex -> "MORE YOUTHFUL than X of 100"
    framing: { direction: 'low', word: 'MORE YOUTHFUL' },
    viral: {
      // high ages flex "WISER"; low/young ages flex "YOUTHFUL" — always flattering
      61: { persona: { title: 'The Ancient One', emoji: '🦉' }, quip: 'Mental age 64. Born tired, raised on disappointment.', pill: { direction: 'high', word: 'WISER' } },
      41: { persona: { title: 'The Old Soul', emoji: '📚' }, quip: 'Mentally I have been 45 since birth. Tea is at 6.', pill: { direction: 'high', word: 'WISER' } },
      26: { persona: { title: 'The Functioning Adult', emoji: '☕' }, quip: 'Certified adult. I have a folder for receipts and everything.' },
      16: { persona: { title: 'The Chaos Gremlin', emoji: '🎮' }, quip: 'Mental age 19. Legally an adult, spiritually unsupervised.' },
      10: { persona: { title: 'The Eternal Child', emoji: '🧸' }, quip: 'Mental age 13. I am legally an adult and emotionally a Capri-Sun.' },
    },
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
  /** VIRAL: identity persona title (element #1), e.g. "The Living Legend" */
  personaTitle?: string;
  /** VIRAL: persona emoji */
  personaEmoji?: string;
  /** VIRAL: punchy one-liner (element #4) — whitelisted, never user input */
  quip?: string;
  /** VIRAL: social-comparison pill text (element #3), e.g. "MORE UNHINGED THAN 91 OF 100 PEOPLE" */
  comparison?: string;
}

// erf-based normal CDF percentile, clamped 1-99. Mirrors src/lib/percentile.ts
// (kept inline so the Edge bundle has zero cross-imports). Returns "% of people
// you scored higher than" on the raw 0-100 normalized scale.
function percentileFromStats(
  normalizedScore: number,
  stats: { meanPercent: number; stdDevPercent: number },
): number {
  const z = (normalizedScore - stats.meanPercent) / stats.stdDevPercent;
  const erf = (x: number): number => {
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
    const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    const t = 1 / (1 + p * x);
    const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  };
  const pct = Math.round((1 + erf(z / Math.sqrt(2))) / 2 * 100);
  return Math.max(1, Math.min(99, pct));
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
export function resolveShare(
  slugRaw: string | null,
  valueRaw: string | null,
  /** optional pre-computed percentile (clamped int) passed as &p= from the client */
  pRaw?: string | null,
): ResolvedShare | null {
  if (!slugRaw || !valueRaw) return null;
  const slug = normalize(slugRaw);
  const test = SHARE_TESTS[slug];
  if (!test) return null;

  let value: string;
  let heading: string;
  let headingSuffix: string | undefined;
  let subline: string | undefined;
  let title: string;
  let personaTitle: string | undefined;
  let personaEmoji: string | undefined;
  let quip: string | undefined;
  let comparison: string | undefined;
  // the resolved percentile (1-99) baked into &p= on both shareUrl + ogImageUrl
  // so the crawler card recomputes nothing and matches what the hero showed.
  let percentile: number | undefined;

  // optional &p= override (clamped int 1-99); else computed below
  const pOverride =
    pRaw != null && /^\d{1,3}$/.test(pRaw)
      ? Math.max(1, Math.min(99, Number.parseInt(pRaw, 10)))
      : undefined;

  if (test.kind === 'score') {
    const parsed = Number.parseInt(valueRaw, 10);
    if (!Number.isFinite(parsed)) return null;
    const score = Math.min(test.max, Math.max(test.min, parsed));
    value = String(score);
    heading = String(score);
    headingSuffix = test.suffix;
    const band = test.bands?.find((b) => score >= b.from);
    subline = band?.label;
    title = test.shareTitle.replace('{value}', String(score));

    // VIRAL: persona + quip keyed by the band threshold
    const vband = band ? test.viral?.[band.from] : undefined;
    if (vband) {
      personaTitle = vband.persona.title;
      personaEmoji = vband.persona.emoji;
      quip = vband.quip;
    }
    // VIRAL: comparison pill — per-band override wins, else test-level framing.
    // Always picks the FLATTERING direction so people want to share.
    // Compute the percentile from the SAME (score-min)/(max-min) normalization
    // used by src/lib/percentile.ts, then bake it into &p= so the OG card and the
    // on-screen hero agree exactly (no independent recompute on the crawler side).
    if (test.stats) {
      const normalized = ((score - test.min) / (test.max - test.min)) * 100;
      percentile = pOverride ?? percentileFromStats(normalized, test.stats);
    }
    const framing = vband?.pill ?? test.framing;
    if (framing && percentile != null) {
      const n = framing.direction === 'low' ? 100 - percentile : percentile;
      // `word` is the full comparative phrase (e.g. "PURER", "MORE UNHINGED")
      comparison = `${framing.word} THAN ${n} OF 100 PEOPLE`;
    }
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

    // VIRAL: persona + quip + rarity pill for type tests
    if (test.viral?.[value]) {
      personaTitle = test.viral[value].persona.title;
      personaEmoji = test.viral[value].persona.emoji;
      quip = test.viral[value].quip;
    }
    if (test.prevalence?.[value] != null) {
      const prev = Math.max(1, Math.min(99, Math.round(test.prevalence[value])));
      // Direction must follow ACTUAL prevalence: a COMMON type can't be "rarer
      // than 59% of people". Compare against the median prevalence across this
      // test's types — at/above median => common, below => genuinely uncommon.
      const all = Object.values(test.prevalence).map((p) => Math.max(1, Math.min(99, Math.round(p))));
      const sorted = [...all].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      const median = sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
      // n = share of people who are NOT this type (correct for either direction)
      const n = 100 - prev;
      comparison =
        prev >= median
          ? `MORE COMMON THAN ${n}% OF PEOPLE`
          : `RARER THAN ${n}% OF PEOPLE`;
    }
  }

  // Bake the resolved percentile into &p= on BOTH the share landing URL and the
  // OG image URL so /api/og and /api/s render the EXACT number the hero showed
  // (no independent recompute on the crawler side).
  const pSuffix = percentile != null ? `&p=${percentile}` : '';
  const shareUrl = `${BASE_URL}/s/${slug}/${value}/${percentile != null ? `?p=${percentile}` : ''}`;

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
    shareUrl,
    // trailing slash avoids Vercel's trailingSlash 308 redirect on og:image fetches
    ogImageUrl: `${BASE_URL}/api/og/?slug=${slug}&value=${encodeURIComponent(value)}${pSuffix}`,
    personaTitle,
    personaEmoji,
    quip,
    comparison,
  };
}

export const isKnownSlug = (slug: string | null): boolean =>
  !!slug && Object.prototype.hasOwnProperty.call(SHARE_TESTS, normalize(slug));
