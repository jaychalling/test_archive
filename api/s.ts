/**
 * /s/:slug/:value -> /api/s?slug=...&value=...  (see vercel.json rewrites)
 *
 * Crawler-facing share page: serves OG/Twitter meta pointing at the generated
 * score card (/api/og), and renders a human-facing landing that shows the
 * FRIEND's result (persona + score + comparison) with a "Can you beat it?"
 * challenge and a CTA into the test. The CTA carries ?ref=slug:value so the
 * recipient's own result page can later render the "you vs your friend"
 * comparison. We do NOT auto-redirect past this payoff — the reward at entry is
 * the main lever that keeps the loop alive. noindex — these URLs must never
 * enter the search index. All interpolated values come from the whitelist in
 * _shareConfig.ts.
 */
import { resolveShare, isKnownSlug, BASE_URL } from './_shareConfig.js';

export const config = { runtime: 'edge' };

const esc = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export default function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const slugRaw = searchParams.get('slug');
  const share = resolveShare(slugRaw, searchParams.get('value'), searchParams.get('p'));

  if (!share) {
    // Unknown value -> the test page; unknown test -> home. Never echo input.
    const target = isKnownSlug(slugRaw)
      ? `${BASE_URL}/test/${slugRaw!.toLowerCase()}/`
      : `${BASE_URL}/`;
    return new Response(null, { status: 302, headers: { Location: target } });
  }

  // LOOP CLOSER: carry the sender's result into the test as ?ref=slug:value so
  // the recipient's own result page can render "you vs your friend". Only the
  // already-whitelisted slug+value are echoed (never raw input).
  const refTestUrl = `${share.testUrl}?ref=${encodeURIComponent(`${share.slug}:${share.value}`)}`;

  const title = esc(share.shareTitle);
  const description = esc(
    `${share.testName} — see how you compare. Free, no signup, instant results on Test Archive.`
  );
  // headline reads like a personal challenge from a friend (emotional hook)
  const friendKicker = share.personaTitle
    ? `Your friend is the ${esc(share.personaTitle)}`
    : `Your friend just took the ${esc(share.testName)}`;
  const resultLine = esc(
    share.subline ? `${share.heading}${share.headingSuffix ?? ''} · ${share.subline}` : `${share.heading}${share.headingSuffix ?? ''}`
  );
  const emojiBlock = share.personaEmoji
    ? `<div class="emoji">${esc(share.personaEmoji)}</div>`
    : '';
  const pillBlock = share.comparison
    ? `<div class="pill">${esc(share.comparison)}</div>`
    : '';
  const quipBlock = share.quip ? `<p class="quip">&ldquo;${esc(share.quip)}&rdquo;</p>` : '';

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="${share.testUrl}">
<meta property="og:type" content="website">
<meta property="og:url" content="${esc(share.shareUrl)}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${esc(share.ogImageUrl)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="Test Archive">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@TestArchive">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${esc(share.ogImageUrl)}">
<style>
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
       background:linear-gradient(135deg,${share.theme[0]},${share.theme[1]});
       font-family:system-ui,-apple-system,sans-serif;color:#fff;text-align:center;
       padding:24px;box-sizing:border-box}
  main{max-width:560px}
  .emoji{font-size:72px;line-height:1;margin-bottom:8px}
  .kicker{font-size:16px;font-weight:700;opacity:.95;margin-bottom:10px;
          padding:8px 18px;border-radius:9999px;background:rgba(255,255,255,.18);display:inline-block}
  h1{margin:12px 0 6px;font-size:40px;line-height:1.1}
  .pill{display:inline-block;margin:14px 0 6px;padding:12px 26px;border-radius:9999px;
        background:#fff;color:#111;font-weight:800;font-size:16px;letter-spacing:.5px;
        text-transform:uppercase;box-shadow:0 8px 28px rgba(0,0,0,.22)}
  .quip{opacity:.92;font-size:18px;font-style:italic;margin:14px auto;max-width:480px}
  .challenge{margin:22px 0 4px;font-size:24px;font-weight:800}
  .sub{opacity:.85;margin:0 0 8px}
  a.btn{display:inline-block;margin-top:18px;padding:16px 40px;border-radius:9999px;
        background:#fff;color:#111;font-weight:800;font-size:18px;text-decoration:none;
        box-shadow:0 8px 28px rgba(0,0,0,.25)}
  .brand{margin-top:28px;font-size:14px;opacity:.75}
</style>
</head>
<body>
<main>
  ${emojiBlock}
  <div class="kicker">${friendKicker}</div>
  <h1>${resultLine}</h1>
  ${pillBlock}
  ${quipBlock}
  <p class="challenge">Can you beat it?</p>
  <p class="sub">Take the ${esc(share.testName)} and see how you stack up &mdash; free, no signup.</p>
  <a class="btn" href="${refTestUrl}">${esc(share.cta)}</a>
  <div class="brand">test-archive.com</div>
</main>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'X-Robots-Tag': 'noindex, follow',
    },
  });
}
