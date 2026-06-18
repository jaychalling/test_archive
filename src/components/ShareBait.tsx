import { useState } from "react";
import { Share2, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackShareClick } from "@/lib/analytics";
import type { ViralResult } from "@/lib/viral";

interface ShareBaitProps {
  slug: string;
  testName: string;
  viral: ViralResult;
  /** big score/label echoed into share text, e.g. "9/100" or "Switch" */
  headline: string;
  className?: string;
}

// Kakao: no JS key is present in this project yet. Native share + copy cover the
// loop today. To enable Kakao, set VITE_KAKAO_JS_KEY and load the SDK; the guard
// below activates a Kakao button automatically.
// TODO(kakao): add Kakao.Share.sendDefault({ objectType: 'feed', ... }) using viral.ogImageUrl.
const KAKAO_JS_KEY = (import.meta as ImportMeta & { env?: Record<string, string> }).env
  ?.VITE_KAKAO_JS_KEY;

/**
 * The EMOTIONAL-PEAK share bar — rendered directly under the persona/score in
 * the result hero. Mirrors the OG card (persona title + comparison pill) so the
 * recipient recognizes the artifact, and puts a frictionless native-share CTA at
 * the moment of highest emotion (the reveal), challenge-framed to drive the loop.
 */
const ShareBait = ({ slug, testName, viral, headline, className }: ShareBaitProps) => {
  const [copied, setCopied] = useState(false);

  const { personaTitle, personaEmoji, comparison, quip, shareUrl } = viral;
  const canNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  const shareText =
    quip ??
    `My ${testName} result: ${headline} — can you beat it?`;

  const handleNativeShare = async () => {
    trackShareClick(slug, canNativeShare ? "native" : "copy");
    if (canNativeShare) {
      try {
        await navigator.share({
          title: `${testName} — ${personaTitle ?? headline}`,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // user cancelled — ignore
      }
    } else {
      await handleCopy();
    }
  };

  const handleCopy = async () => {
    trackShareClick(slug, "copy");
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  return (
    <div
      className={`rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-center ${
        className ?? ""
      }`}
    >
      {/* comparison pill — the #1 share trigger, mirrors the OG card */}
      {comparison && (
        <div className="mb-4 flex justify-center">
          <span className="inline-block rounded-full bg-foreground px-5 py-2 text-sm font-extrabold uppercase tracking-wide text-background shadow-md">
            {comparison}
          </span>
        </div>
      )}

      {/* one-liner */}
      {quip && (
        <p className="mb-5 text-base font-semibold text-foreground sm:text-lg">
          {personaEmoji ? `${personaEmoji} ` : ""}
          “{quip}”
        </p>
      )}

      <p className="mb-4 text-sm text-muted-foreground">
        Send this to the friend who needs to be humbled. They see the card — not your answers.
      </p>

      <div className="flex flex-wrap justify-center gap-2">
        <Button onClick={handleNativeShare} size="lg" className="gap-2 min-w-[200px]">
          <Share2 className="h-5 w-5" />
          {canNativeShare ? "Challenge a Friend" : "Copy My Result"}
        </Button>
        <Button variant="outline" size="lg" onClick={handleCopy} className="gap-2">
          {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy Link"}
        </Button>
        {KAKAO_JS_KEY && (
          <Button variant="outline" size="lg" onClick={() => trackShareClick(slug, "kakao")}>
            KakaoTalk
          </Button>
        )}
      </div>
    </div>
  );
};

export default ShareBait;
