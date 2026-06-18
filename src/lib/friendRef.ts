/**
 * LOOP CLOSER: the sender's result is carried into the recipient's session as
 * ?ref=slug:value (set by api/s.ts when bouncing a human to the test). The test
 * question page captures it into sessionStorage; the recipient's result page
 * reads it back to render a "you vs your friend" comparison — closing the loop.
 *
 * Only whitelisted slug+value pairs are ever produced by api/s.ts, but we
 * re-validate against _shareConfig before rendering anything.
 */
import { resolveShare } from "../../api/_shareConfig";

const KEY = "friendRef";

export interface FriendRef {
  slug: string;
  value: string;
  /** persona title of the friend, if known */
  personaTitle?: string;
  /** big heading + suffix, e.g. "9/100" or "Switch" */
  display: string;
}

const parse = (raw: string | null): FriendRef | null => {
  if (!raw) return null;
  const idx = raw.indexOf(":");
  if (idx < 0) return null;
  const slug = raw.slice(0, idx);
  const value = raw.slice(idx + 1);
  const resolved = resolveShare(slug, value);
  if (!resolved) return null;
  return {
    slug: resolved.slug,
    value: resolved.value,
    personaTitle: resolved.personaTitle,
    display: `${resolved.heading}${resolved.headingSuffix ?? ""}`,
  };
};

/**
 * Call on a test question page mount. Captures ?ref= from the URL into
 * sessionStorage (so it survives the localStorage->result navigation) and
 * returns the parsed friend ref if present. Returns null when no valid ref.
 */
export const captureFriendRefFromUrl = (): FriendRef | null => {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("ref");
  if (raw) {
    const ref = parse(raw);
    if (ref) {
      try {
        sessionStorage.setItem(KEY, `${ref.slug}:${ref.value}`);
      } catch {
        /* storage blocked — ignore */
      }
      return ref;
    }
  }
  return readStoredFriendRef();
};

/** Read the captured friend ref (used on the recipient's result page). */
export const readStoredFriendRef = (): FriendRef | null => {
  if (typeof window === "undefined") return null;
  try {
    return parse(sessionStorage.getItem(KEY));
  } catch {
    return null;
  }
};

/** Clear the ref (e.g. after the recipient retakes their own test fresh). */
export const clearFriendRef = (): void => {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
};
