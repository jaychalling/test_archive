/**
 * /api/og?slug={test}&value={score|typeKey}
 * Renders a 1200x630 share card PNG via @vercel/og (Edge runtime).
 * All rendered text comes from the whitelist in _shareConfig.ts.
 */
import { ImageResponse } from '@vercel/og';
import { resolveShare } from './_shareConfig.js';

export const config = { runtime: 'edge' };

const headingFontSize = (text: string): number => {
  if (text.length <= 4) return 200;
  if (text.length <= 8) return 150;
  if (text.length <= 14) return 104;
  if (text.length <= 20) return 84;
  return 64;
};

export default function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const share = resolveShare(searchParams.get('slug'), searchParams.get('value'));

  if (!share) {
    return new Response('Not found', { status: 404 });
  }

  const [c1, c2] = share.theme;
  const fontSize = headingFontSize(share.heading);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundImage: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
          color: '#ffffff',
          padding: '56px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: -160,
            right: -120,
            width: 460,
            height: 460,
            borderRadius: 9999,
            background: 'rgba(255,255,255,0.08)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -200,
            left: -140,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: 'rgba(255,255,255,0.06)',
            display: 'flex',
          }}
        />

        {/* test name */}
        <div
          style={{
            display: 'flex',
            fontSize: 34,
            fontWeight: 600,
            letterSpacing: 6,
            textTransform: 'uppercase',
            opacity: 0.9,
            marginTop: 8,
          }}
        >
          {share.testName}
        </div>

        {/* main result */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              fontWeight: 800,
              lineHeight: 1.05,
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize, textShadow: '0 6px 24px rgba(0,0,0,0.25)' }}>
              {share.heading}
            </span>
            {share.headingSuffix ? (
              <span style={{ fontSize: Math.round(fontSize * 0.32), opacity: 0.75, marginLeft: 12 }}>
                {share.headingSuffix}
              </span>
            ) : null}
          </div>
          {share.subline ? (
            <div
              style={{
                display: 'flex',
                marginTop: 28,
                fontSize: 40,
                fontWeight: 600,
                padding: '12px 40px',
                borderRadius: 9999,
                background: 'rgba(255,255,255,0.16)',
                border: '1px solid rgba(255,255,255,0.28)',
              }}
            >
              {share.subline}
            </div>
          ) : null}
        </div>

        {/* footer: CTA + branding */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', fontSize: 34, fontWeight: 700 }}>
            {`${share.cta} →`}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 28,
              fontWeight: 600,
              opacity: 0.85,
            }}
          >
            test-archive.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=31536000, immutable',
      },
    }
  );
}
