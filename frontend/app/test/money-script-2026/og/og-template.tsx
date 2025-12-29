import { ImageResponse } from 'next/og';

// Define local types/data to avoid importing complex files with React components (Icons)
type MoneyScriptType = 'Avoidance' | 'Worship' | 'Status' | 'Vigilance';

const OG_RESULTS: Record<string, { title: string; archetype: string; colorHex: string }> = {
    Avoidance: {
        title: 'Money Avoidance',
        archetype: 'The Ascetic / Renouncer',
        colorHex: '#a8a29e', // stone-400
    },
    Worship: {
        title: 'Money Worship',
        archetype: 'The Dreamer / Alchemist',
        colorHex: '#f59e0b', // amber-500
    },
    Status: {
        title: 'Money Status',
        archetype: 'The Aristocrat / Performer',
        colorHex: '#c084fc', // purple-400
    },
    Vigilance: {
        title: 'Money Vigilance',
        archetype: 'The Guardian / Steward',
        colorHex: '#34d399', // emerald-400
    },
};

export function handleMoneyScriptRequest(
    res: string | null,
    renderDefault: (sub: string, title: string, color: string, icon: string) => ImageResponse
) {
    // 1. 결과가 없으면 기본 썸네일
    if (!res) {
        return renderDefault(
            '2026 FINANCIAL PSYCHOLOGY',
            'Money Script Test',
            '#ef4444', // red-500
            '🔥'
        );
    }

    // 2. 결과 디코딩
    let resultCode: string;
    try {
        resultCode = atob(res);
    } catch {
        return renderDefault('ERROR', 'Invalid Result', '#991b1b', '⚠️');
    }

    const result = OG_RESULTS[resultCode];

    if (!result) {
        return renderDefault('ERROR', 'Unknown Result', '#991b1b', '⚠️');
    }

    // 3. 결과 템플릿 렌더링
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
                    backgroundColor: '#171717', // neutral-900
                    backgroundImage: 'linear-gradient(to bottom right, #450a0a, #171717)',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Decoration */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 20, background: 'linear-gradient(to right, #7f1d1d, #d97706, #7f1d1d)' }} />

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 20,
                    }}
                >
                    <div
                        style={{
                            fontSize: 32,
                            fontWeight: 'bold',
                            color: '#e7e5e4', // stone-200
                            textTransform: 'uppercase',
                            letterSpacing: 4,
                        }}
                    >
                        My Financial Archetype
                    </div>

                    <div
                        style={{
                            fontSize: 72,
                            fontWeight: 900,
                            color: result.colorHex,
                            textAlign: 'center',
                            textShadow: '0 0 40px rgba(0,0,0,0.5)',
                        }}
                    >
                        {result.title}
                    </div>

                    <div
                        style={{
                            fontSize: 36,
                            color: '#a8a29e', // stone-400
                            fontStyle: 'italic',
                        }}
                    >
                        "{result.archetype}"
                    </div>

                    <div
                        style={{
                            marginTop: 40,
                            padding: '10px 30px',
                            backgroundColor: '#262626',
                            borderRadius: 20,
                            border: '1px solid #404040',
                            color: '#ef4444',
                            fontSize: 24,
                            fontWeight: 'bold',
                        }}
                    >
                        2026 Red Horse Forecast Included
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
