/**
 * Client-side accessor for the VIRAL share-bait layer.
 *
 * SINGLE SOURCE: persona titles, one-liners (quips) and the social-comparison
 * pill all come from api/_shareConfig.ts — the very same module the Edge OG
 * image (api/og.tsx) and the share landing page (api/s.ts) render from. Importing
 * it here guarantees the on-screen reveal and the shared card are identical, so
 * a recipient recognizes the artifact they saw in the chat.
 *
 * _shareConfig.ts is pure data + pure functions (no Edge-only APIs), so it is
 * safe to pull into the browser bundle.
 */
import {
  resolveShare,
  SHARE_TESTS,
  type ResolvedShare,
} from "../../api/_shareConfig";
import { getPercentile, getTestStatistics } from "@/lib/percentile";
import { buildShareUrl, buildOgImageUrl } from "@/lib/share";

export interface ViralResult {
  /** identity persona, e.g. "The Living Legend" */
  personaTitle?: string;
  personaEmoji?: string;
  /** punchy one-liner for share text */
  quip?: string;
  /** social-comparison pill, e.g. "MORE UNHINGED THAN 91 OF 100 PEOPLE" */
  comparison?: string;
  /** persona-coherent hero description (single source, no hardcoded numbers) */
  blurb?: string;
  /** the normalized share value (kebab key / clamped score) */
  value: string;
  /** /s/:slug/:value share-landing URL (+ &p for the OG percentile) */
  shareUrl: string;
  /** dynamic OG card URL for SEOHead ogImage + previews */
  ogImageUrl: string;
}

/**
 * Resolve the viral block for a result.
 *
 * @param slug      share slug, e.g. "rice-purity", "bdsm-test", "mental-age-test"
 * @param value     score number (score tests) or result key (type tests)
 * @param maxScore  used to derive the percentile for score tests (so the &p=
 *                  override fed to the OG card matches the on-screen number)
 */
export function getViralResult(
  slug: string,
  value: string | number,
  maxScore?: number,
): ViralResult {
  // compute a percentile for score tests so og card + hero agree exactly.
  // Normalize with (score-min)/(max-min) — same formula resolveShare/percentileFromStats
  // use — so the &p= we hand to the crawler card matches the on-screen number.
  let p: string | null = null;
  if (typeof value === "number" && maxScore) {
    const stats = getTestStatistics(slug);
    // pull the test's real min from the single-source whitelist (0 for most tests,
    // 10 for mental-age) so non-zero-min tests don't diverge from the card.
    const cfg = SHARE_TESTS[slug];
    const min = cfg && cfg.kind === "score" ? cfg.min : 0;
    p = String(getPercentile(value, maxScore, stats, min));
  }

  // resolveShare bakes &p= into BOTH shareUrl and ogImageUrl when given the
  // override, so both already carry the canonical percentile — no re-append here.
  const resolved: ResolvedShare | null = resolveShare(slug, String(value), p);

  if (!resolved) {
    // value not whitelisted — fall back to plain share URLs, no viral block
    return {
      value: String(value),
      shareUrl: buildShareUrl(slug, value),
      ogImageUrl: buildOgImageUrl(slug, value),
    };
  }

  return {
    personaTitle: resolved.personaTitle,
    personaEmoji: resolved.personaEmoji,
    quip: resolved.quip,
    comparison: resolved.comparison,
    blurb: resolved.blurb,
    value: resolved.value,
    shareUrl: resolved.shareUrl,
    ogImageUrl: resolved.ogImageUrl,
  };
}
