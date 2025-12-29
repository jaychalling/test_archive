import { ImageResponse } from 'next/og';
import { calculateResult, IQ_CATEGORIES } from '../questions';

function renderIQResult(iqScore: number, category: string, percentile: string) {
    // Color based on IQ category
    const getColor = () => {
        if (iqScore >= 145) return '#f59e0b'; // amber
        if (iqScore >= 130) return '#7c3aed'; // purple
        if (iqScore >= 115) return '#3b82f6'; // blue
        if (iqScore >= 100) return '#10b981'; // green
        if (iqScore >= 85) return '#64748b'; // slate
        return '#94a3b8'; // light slate
    };

    const color = getColor();

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
                    background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a8a 100%)',
                    padding: '40px',
                }}
            >
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        borderRadius: '40px',
                        border: '1px solid #e2e8f0',
                        position: 'relative',
                    }}
                >
                    {/* Top Badge */}
                    <div
                        style={{
                            display: 'flex',
                            fontSize: 22,
                            fontWeight: 'bold',
                            color: '#64748b',
                            backgroundColor: '#f1f5f9',
                            padding: '10px 30px',
                            borderRadius: '50px',
                            marginBottom: 30,
                            textTransform: 'uppercase',
                            letterSpacing: '3px',
                        }}
                    >
                        IQ Test Result
                    </div>

                    {/* IQ Score */}
                    <div
                        style={{
                            display: 'flex',
                            fontSize: 180,
                            fontWeight: 900,
                            color: color,
                            letterSpacing: '-5px',
                            textShadow: '4px 4px 0px rgba(0,0,0,0.1)',
                            marginBottom: 10,
                        }}
                    >
                        {iqScore}
                    </div>

                    {/* Category */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            backgroundColor: '#f8fafc',
                            padding: '15px 40px',
                            borderRadius: '20px',
                            border: '2px solid #e2e8f0',
                            marginBottom: 20,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                fontSize: 36,
                                fontWeight: 'bold',
                                color: color,
                            }}
                        >
                            {category}
                        </div>
                    </div>

                    {/* Percentile */}
                    <div
                        style={{
                            display: 'flex',
                            fontSize: 24,
                            fontWeight: 'bold',
                            color: '#64748b',
                        }}
                    >
                        {percentile} of population
                    </div>

                    {/* Footer */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 30,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 15,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                fontSize: 18,
                                color: '#94a3b8',
                                fontWeight: 'bold',
                            }}
                        >
                            2025 Free IQ Test
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                width: 4,
                                height: 4,
                                backgroundColor: '#cbd5e1',
                                borderRadius: '50%',
                            }}
                        />
                        <div
                            style={{
                                display: 'flex',
                                fontSize: 18,
                                color: '#94a3b8',
                                fontWeight: 'bold',
                            }}
                        >
                            www.test-archive.com
                        </div>
                    </div>
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}

function renderDefaultIQ() {
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
                    background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a8a 100%)',
                    padding: '40px',
                }}
            >
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        borderRadius: '40px',
                    }}
                >
                    {/* Brain Icon Placeholder */}
                    <div
                        style={{
                            display: 'flex',
                            width: 120,
                            height: 120,
                            backgroundColor: '#eef2ff',
                            borderRadius: '60px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 30,
                            fontSize: 60,
                        }}
                    >
                        IQ
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            display: 'flex',
                            fontSize: 72,
                            fontWeight: 900,
                            color: '#1e1b4b',
                            marginBottom: 20,
                            letterSpacing: '-2px',
                        }}
                    >
                        2025 Free IQ Test
                    </div>

                    {/* Subtitle */}
                    <div
                        style={{
                            display: 'flex',
                            fontSize: 28,
                            fontWeight: 'bold',
                            color: '#64748b',
                            marginBottom: 40,
                        }}
                    >
                        Scientific Intelligence Assessment
                    </div>

                    {/* Features */}
                    <div
                        style={{
                            display: 'flex',
                            gap: 20,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                backgroundColor: '#eef2ff',
                                padding: '12px 24px',
                                borderRadius: '12px',
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: '#4f46e5',
                            }}
                        >
                            50 Questions
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                backgroundColor: '#f5f3ff',
                                padding: '12px 24px',
                                borderRadius: '12px',
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: '#7c3aed',
                            }}
                        >
                            Verbal + Numerical + Spatial
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                backgroundColor: '#eff6ff',
                                padding: '12px 24px',
                                borderRadius: '12px',
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: '#3b82f6',
                            }}
                        >
                            Free
                        </div>
                    </div>

                    {/* Footer */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 30,
                            display: 'flex',
                            fontSize: 18,
                            color: '#94a3b8',
                            fontWeight: 'bold',
                        }}
                    >
                        www.test-archive.com
                    </div>
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}

export function handleIQTestRequest(res: string | null, renderDefault: Function) {
    if (!res) {
        return renderDefaultIQ();
    }

    let decodedRes = res;
    try {
        // Check if Base64 encoded
        if (/^[A-Za-z0-9+/]+={0,2}$/.test(res) && /[a-zA-Z]/.test(res)) {
            decodedRes = atob(res);
        }
    } catch {
        // fallback to original
    }

    const result = calculateResult(decodedRes);

    return renderIQResult(
        result.iqScore,
        result.category.label,
        result.category.percentile
    );
}
