/**
 * Percentile engine — single source for the social-comparison framing.
 *
 * Extracted from ScoreDistributionChart.tsx so the result hero, the share text,
 * and the OG card all derive the SAME "top X% / better than X% of people" number.
 * The OG image (Edge runtime) re-implements the identical math inline in
 * api/_shareConfig.ts (it cannot import from src) — keep the two in sync.
 */

export interface TestStatistics {
  /** mean as a percentage of max score */
  meanPercent: number;
  /** standard deviation as a percentage of max score */
  stdDevPercent: number;
  sampleNote?: string;
}

export const testStatistics: Record<string, TestStatistics> = {
  'rice-purity': { meanPercent: 53, stdDevPercent: 12.5, sampleNote: 'Based on 500K+ responses' },
  'big-five': { meanPercent: 55, stdDevPercent: 15 },
  'emotional-intelligence': { meanPercent: 77, stdDevPercent: 12 },
  'introvert-extrovert': { meanPercent: 50, stdDevPercent: 15 },
  'political-compass': { meanPercent: 50, stdDevPercent: 20 },
  'attachment-style': { meanPercent: 55, stdDevPercent: 18 },
  'love-language': { meanPercent: 50, stdDevPercent: 15 },
  bdsm: { meanPercent: 50, stdDevPercent: 20 },
  'moral-alignment': { meanPercent: 55, stdDevPercent: 18 },
  'communication-style': { meanPercent: 52, stdDevPercent: 16 },
  'career-aptitude': { meanPercent: 50, stdDevPercent: 15 },
  enneagram: { meanPercent: 50, stdDevPercent: 18 },
  '16-personality': { meanPercent: 50, stdDevPercent: 15 },
  // mental age scale 10-80; population mean ~36 (mid-30s). Calibrated on the
  // (score-min)/(max-min) normalized scale so mental age 36 reads ~50th pct:
  // (36-10)/(80-10)*100 = 37 -> meanPercent 37. MUST match api/_shareConfig.ts.
  'mental-age': { meanPercent: 37, stdDevPercent: 20 },
};

export const defaultStatistics: TestStatistics = { meanPercent: 60, stdDevPercent: 15 };

export const getTestStatistics = (testName: string): TestStatistics => {
  const normalizedName = testName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/\//g, '-')
    .replace(/-test$/, '')
    .replace(/-personality$/, '');

  if (testStatistics[normalizedName]) return testStatistics[normalizedName];

  for (const key of Object.keys(testStatistics)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return testStatistics[key];
    }
  }
  return defaultStatistics;
};

/**
 * Standard-normal CDF percentile (erf approximation), clamped 1-99.
 *
 * `minScore` defaults to 0 (the common case). Tests whose scale does not start
 * at zero (e.g. mental age 10-80) MUST pass their real min so the score is
 * normalized as (score-min)/(max-min)*100 — the same formula used by
 * percentileFromStats in api/_shareConfig.ts. Keeping these two in lock-step is
 * what makes the on-screen hero percentile === the shared OG card percentile.
 */
export const getPercentile = (
  score: number,
  maxScore: number,
  stats: TestStatistics,
  minScore = 0,
): number => {
  const normalizedScore = ((score - minScore) / (maxScore - minScore)) * 100;
  const zScore = (normalizedScore - stats.meanPercent) / stats.stdDevPercent;

  const erf = (x: number): number => {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);

    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  };

  const percentile = Math.round(((1 + erf(zScore / Math.sqrt(2))) / 2) * 100);
  return Math.max(1, Math.min(99, percentile));
};
