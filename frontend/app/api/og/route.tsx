import { ImageResponse } from 'next/og';

import { handleRicePurityRequest } from '../../test/rice-purity/og/og-template';
import { handleGenderRoleRequest } from '../../test/gender-role/og/og-template';
import { handleKPopRequest } from '../../test/kpop-hunter/og/og-template';
import { handleCognitiveRequest } from '../../test/cognitive-brain/og/og-template';
import { handleDiabetesRequest } from '../../test/diabetes/og/og-template';
import { handleBodyAgeRequest } from '../../test/body-age/og/og-template';
import { handleIQTestRequest } from '../../test/iq-test/og/og-template';
import { handleMoneyScriptRequest } from '../../test/money-script-2026/og/og-template';

// Base64 이미지가 크기 때문에 Node.js 런타임 사용 (Edge는 4MB 제한 걸릴 수 있음)
export const runtime = 'nodejs';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type') || 'default';
        const res = searchParams.get('res'); // Result code (optional)

        // Helper for default/fallback rendering
        const renderDefault = (sub: string, title: string, color: string, icon: string) => {
            return new ImageResponse(
                (
                    <div
                        style={{
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            fontFamily: 'sans-serif',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: `${color}20`,
                                borderRadius: '50%',
                                padding: 20,
                                marginBottom: 40,
                            }}
                        >
                            <span style={{ fontSize: 60 }}>{icon}</span>
                        </div>
                        <div
                            style={{
                                fontSize: 24,
                                fontWeight: 'bold',
                                color: color,
                                textTransform: 'uppercase',
                                marginBottom: 20,
                            }}
                        >
                            {sub}
                        </div>
                        <div
                            style={{
                                fontSize: 60,
                                fontWeight: 900,
                                color: '#1f2937',
                                textAlign: 'center',
                                lineHeight: 1.2,
                                padding: '0 40px',
                            }}
                        >
                            {title}
                        </div>
                        <div style={{ marginTop: 40, display: 'flex', alignItems: 'center' }}>
                            <img src="https://www.test-archive.com/logo.png" width="40" height="40" style={{ marginRight: 15 }} />
                            <span style={{ fontSize: 24, color: '#6b7280', fontWeight: 'bold' }}>Test Archive</span>
                        </div>
                    </div>
                ),
                {
                    width: 1200,
                    height: 630,
                }
            );
        };

        // 1. K-Pop Hunter Logic
        if (type === 'kpop-hunter') {
            return handleKPopRequest(res, renderDefault);
        }

        // 8. Money Script 2026 Logic
        if (type === 'money-script-2026') {
            return handleMoneyScriptRequest(res, renderDefault);
        }

        // 2. Diabetes Logic
        if (type === 'diabetes') {
            return handleDiabetesRequest(res, renderDefault);
        }

        // 3. Body Age Logic
        if (type === 'body-age') {
            return handleBodyAgeRequest(res, renderDefault);
        }

        // 4. Cognitive Brain Logic
        if (type === 'cognitive-brain') {
            return handleCognitiveRequest(res, renderDefault);
        }

        // 5. Rice Purity Logic
        if (type === 'rice-purity') {
            const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
            return await handleRicePurityRequest(res, renderDefault, origin);
        }

        // 6. Gender Role Logic
        if (type === 'gender-role') {
            const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
            return handleGenderRoleRequest(res, renderDefault, origin);
        }

        // 7. IQ Test Logic
        if (type === 'iq-test') {
            return handleIQTestRequest(res, renderDefault);
        }

        return new Response('Test type not found', { status: 404 });

    } catch (e: any) {
        console.error("OG Generation Error:", e);
        return new Response(`Failed to generate image: ${e.message}`, { status: 500 });
    }
}
