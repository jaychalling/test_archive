/**
 * Thin GA4 wrapper for the viral loop. Mirrors the index.html guard:
 * events are only fired for real users (skips prerender/e2e via webdriver).
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const enabled = (): boolean =>
  typeof window !== "undefined" &&
  typeof window.gtag === "function" &&
  !navigator.webdriver;

/** A user tapped a share affordance at the result reveal. */
export const trackShareClick = (slug: string, method: string): void => {
  if (!enabled()) return;
  window.gtag!("event", "share_click", { test_slug: slug, method });
};

/** A visitor arrived from a shared link (carries a friend ref) and the test loaded. */
export const trackStartFromShare = (slug: string, refSlug: string): void => {
  if (!enabled()) return;
  window.gtag!("event", "start_from_share", { test_slug: slug, ref_slug: refSlug });
};

export {};
