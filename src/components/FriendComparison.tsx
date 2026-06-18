import { Swords } from "lucide-react";
import type { FriendRef } from "@/lib/friendRef";
import { resolveShare } from "../../api/_shareConfig";

interface FriendComparisonProps {
  friend: FriendRef;
  /** the recipient's own display result, e.g. "23/100" or "Dominant" */
  yourDisplay: string;
  /** the recipient's own persona title, if any */
  yourPersona?: string;
  /** true when friend and recipient took the SAME test (direct comparison) */
  sameTest: boolean;
  /**
   * The recipient's own share slug + value. When provided, the recipient's
   * display label + persona are resolved from the SAME _shareConfig whitelist
   * used for the friend side (via resolveShare), so casing/labels can never
   * drift between the two sides (e.g. bdsm "Sadist" vs a page-local "Sadism").
   * Falls back to yourDisplay/yourPersona for tests not in the whitelist.
   */
  ownSlug?: string;
  ownValue?: string | number;
  className?: string;
}

/**
 * LOOP CLOSER banner shown at the TOP of a recipient's result when they arrived
 * from a friend's shared link. "Your friend was X — you are Y." This is the
 * payoff that makes the recipient want to re-share, closing the viral loop.
 */
const FriendComparison = ({
  friend,
  yourDisplay,
  yourPersona,
  sameTest,
  ownSlug,
  ownValue,
  className,
}: FriendComparisonProps) => {
  if (!sameTest) return null;

  // Resolve the recipient's own label/persona from the SAME whitelist as the
  // friend side so the two columns can never disagree on casing/labels.
  const ownResolved =
    ownSlug != null && ownValue != null
      ? resolveShare(ownSlug, String(ownValue))
      : null;
  const yourDisplayLabel = ownResolved
    ? `${ownResolved.heading}${ownResolved.headingSuffix ?? ""}`
    : yourDisplay;
  const yourPersonaLabel = ownResolved?.personaTitle ?? yourPersona;

  return (
    <div
      className={`rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 to-primary/5 p-5 ${
        className ?? ""
      }`}
    >
      <div className="mb-3 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wide text-primary">
        <Swords className="h-4 w-4" />
        You vs. Your Friend
      </div>
      <div className="flex items-stretch justify-center gap-3 text-center">
        <div className="flex-1 rounded-xl bg-muted/40 p-4">
          <div className="text-xs font-medium text-muted-foreground">Your Friend</div>
          <div className="text-2xl font-extrabold text-foreground">{friend.display}</div>
          {friend.personaTitle && (
            <div className="mt-1 text-xs text-muted-foreground">{friend.personaTitle}</div>
          )}
        </div>
        <div className="flex items-center text-2xl font-black text-muted-foreground">vs</div>
        <div className="flex-1 rounded-xl bg-primary/15 p-4 ring-1 ring-primary/30">
          <div className="text-xs font-medium text-primary">You</div>
          <div className="text-2xl font-extrabold text-foreground">{yourDisplayLabel}</div>
          {yourPersonaLabel && (
            <div className="mt-1 text-xs text-muted-foreground">{yourPersonaLabel}</div>
          )}
        </div>
      </div>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        Now send yours back and settle it.
      </p>
    </div>
  );
};

export default FriendComparison;
