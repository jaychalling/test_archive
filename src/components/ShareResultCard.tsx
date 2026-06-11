import { useState } from 'react';
import { Share2, Link2, Download, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { buildShareUrl, buildOgImageUrl } from '@/lib/share';

export interface ShareResultCardProps {
  /** route slug, e.g. "rice-purity", "16-personality-test" */
  slug: string;
  /** score number or result key (camelCase ok — normalized automatically) */
  shareValue: string | number;
  /** human-readable result, e.g. "43/100 — Adventurous" or "INTJ — The Mastermind" */
  shareLabel: string;
  /** test display name, e.g. "Rice Purity Test" */
  testName: string;
  className?: string;
}

/**
 * Share block: score-card preview + social share buttons.
 * The shared URL is /s/{slug}/{value}/ so SNS crawlers render the
 * generated card image while humans get redirected to the test.
 */
const ShareResultCard = ({ slug, shareValue, shareLabel, testName, className }: ShareResultCardProps) => {
  const [copied, setCopied] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const shareUrl = buildShareUrl(slug, shareValue);
  const ogImageUrl = buildOgImageUrl(slug, shareValue);
  const shareText = `My ${testName} result: ${shareLabel} — can you beat it?`;

  const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title: `${testName} Result`, text: shareText, url: shareUrl });
    } catch {
      // user cancelled — ignore
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  const enc = encodeURIComponent;
  const socialLinks = [
    { name: 'X', href: `https://twitter.com/intent/tweet?text=${enc(shareText)}&url=${enc(shareUrl)}` },
    { name: 'WhatsApp', href: `https://wa.me/?text=${enc(`${shareText} ${shareUrl}`)}` },
    { name: 'Reddit', href: `https://www.reddit.com/submit?url=${enc(shareUrl)}&title=${enc(shareText)}` },
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}` },
  ];

  return (
    <div className={`rounded-2xl border bg-card p-6 shadow-sm ${className ?? ''}`}>
      <h2 className="text-xl font-bold mb-1 text-center">Share Your Result</h2>
      <p className="text-sm text-muted-foreground text-center mb-4">
        Your friends see this card — not your answers.
      </p>

      {!imgFailed && (
        <a href={shareUrl} target="_blank" rel="noopener noreferrer" className="block mb-4">
          <img
            src={ogImageUrl}
            alt={`${testName} score card: ${shareLabel}`}
            width={1200}
            height={630}
            loading="lazy"
            className="w-full rounded-xl border shadow-md"
            onError={() => setImgFailed(true)}
          />
        </a>
      )}

      <div className="flex flex-wrap justify-center gap-2">
        {canNativeShare && (
          <Button onClick={handleNativeShare} className="gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        )}
        {socialLinks.map((s) => (
          <Button key={s.name} variant="outline" asChild>
            <a href={s.href} target="_blank" rel="noopener noreferrer">
              {s.name}
            </a>
          </Button>
        ))}
        <Button variant="outline" onClick={handleCopy} className="gap-2">
          {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy Link'}
        </Button>
        <Button variant="outline" asChild className="gap-2">
          <a href={ogImageUrl} download={`${slug}-result.png`}>
            <Download className="w-4 h-4" />
            Download Card
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ShareResultCard;
