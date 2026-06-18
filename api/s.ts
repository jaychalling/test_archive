/**
 * /s/:slug/:value -> /api/s?slug=...&value=...  (see vercel.json rewrites)
 *
 * Crawler-facing share page: serves OG/Twitter meta pointing at the
 * generated score card (/api/og), then instantly JS-redirects humans to the
 * test page. noindex — these URLs must never enter the search index.
 * All interpolated values come from the whitelist in _shareConfig.ts.
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
  const friendLine = share.personaTitle
    ? `Your friend is ${esc(share.personaTitle)} — ${esc(share.heading)}${esc(share.headingSuffix ?? '')}.`
    : `Your friend scored ${esc(share.heading)}${esc(share.headingSuffix ?? '')}.`;
  const resultLine = esc(
    share.subline ? `${share.heading}${share.headingSuffix ?? ''} · ${share.subline}` : `${share.heading}${share.headingSuffix ?? ''}`
  );

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
<meta property="og:image" content="${share.ogImageUrl}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="Test Archive">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@TestArchive">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${share.ogImageUrl}">
<style>
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
       background:linear-gradient(135deg,${share.theme[0]},${share.theme[1]});
       font-family:system-ui,-apple-system,sans-serif;color:#fff;text-align:center}
  a.btn{display:inline-block;margin-top:20px;padding:14px 32px;border-radius:9999px;
        background:#fff;color:#111;font-weight:700;text-decoration:none}
  .kicker{font-size:18px;font-weight:700;opacity:.95;margin-bottom:6px;
          padding:8px 18px;border-radius:9999px;background:rgba(255,255,255,.18);display:inline-block}
  h1{margin:14px 0 4px;font-size:34px}
  p{opacity:.85}
</style>
</head>
<body>
<main>
  <div class="kicker">${friendLine}</div>
  <h1>${resultLine}</h1>
  <p>What about you? Take the ${esc(share.testName)} and compare&hellip;</p>
  <a class="btn" href="${refTestUrl}">${esc(share.cta)}</a>
</main>
<script>setTimeout(function(){window.location.replace(${JSON.stringify(refTestUrl)});}, 1200);</script>
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
