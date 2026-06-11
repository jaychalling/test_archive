/**
 * Ad rendering policy (AdSense policy protection).
 *
 * Sensitive/adult-themed tests must NEVER render ad components on their
 * test or result pages. Any future ad component MUST call isAdExcludedPath()
 * (or check ADS_EXCLUDED_TEST_SLUGS) before rendering.
 *
 * NOTE: Per business rules in CLAUDE.md, test (question) pages never show ads
 * regardless of this list — this list additionally excludes the result pages
 * of sensitive tests.
 */

export const ADS_EXCLUDED_TEST_SLUGS = [
  'bdsm-test',
  'dark-triad-test',
  'toxic-trait-test',
] as const;

export type AdsExcludedTestSlug = (typeof ADS_EXCLUDED_TEST_SLUGS)[number];

/** Returns true if ads must not be rendered for the given pathname. */
export const isAdExcludedPath = (pathname: string): boolean =>
  ADS_EXCLUDED_TEST_SLUGS.some((slug) => pathname.includes(`/test/${slug}`));
