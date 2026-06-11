/**
 * Helpers for the viral share loop.
 * Share URLs point at /s/{slug}/{value}/ — a crawler-facing page (api/s.ts)
 * that shows a generated score card (api/og.tsx) and redirects humans to the test.
 */

export const SHARE_BASE_URL = 'https://www.test-archive.com';

/** camelCase / snake_case result keys -> kebab-case URL values (e.g. fearfulAvoidant -> fearful-avoidant) */
export const toShareValue = (value: string | number): string =>
  String(value)
    .trim()
    .replace(/_/g, '-')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();

export const buildShareUrl = (slug: string, value: string | number): string =>
  `${SHARE_BASE_URL}/s/${slug}/${encodeURIComponent(toShareValue(value))}/`;

export const buildOgImageUrl = (slug: string, value: string | number): string =>
  `${SHARE_BASE_URL}/api/og?slug=${encodeURIComponent(slug)}&value=${encodeURIComponent(toShareValue(value))}`;
