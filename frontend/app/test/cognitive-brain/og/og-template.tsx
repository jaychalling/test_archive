import { ImageResponse } from 'next/og';

const COLOR_MAP = {
    High: { color: '#22c55e', label: 'Optimal', bg: '#f0fdf4' },
    Mid: { color: '#eab308', label: 'Average', bg: '#fefce8' },
    Low: { color: '#ef4444', label: 'Needs Care', bg: '#fef2f2' },
};

function BrainBadge({ lobe, level, style }: { lobe: string, level: string, style?: any }) {
    const config = COLOR_MAP[level as keyof typeof COLOR_MAP] || COLOR_MAP.Mid;
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: '12px 20px',
            borderRadius: '24px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            border: '1px solid #f1f5f9',
            minWidth: '140px',
            ...style
        }}>
            <span style={{ fontSize: 14, fontWeight: 900, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 2 }}>{lobe}</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: config.color }}>is {config.label}</span>
        </div>
    );
}

function renderBrainSVG(scores: { frontal: string, temporal: string, parietal: string }) {
    const getColor = (lvl: string) => COLOR_MAP[lvl as keyof typeof COLOR_MAP]?.color || '#cbd5e1';

    return (
        <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Parietal (Back/Top) */}
            <path d="M120 150 C120 80 180 50 240 50 C280 50 320 80 330 130 C340 180 300 220 250 220 L240 150 Z" fill={getColor(scores.parietal)} opacity="0.9" />
            {/* Frontal (Front) */}
            <path d="M240 50 C270 50 320 80 340 130 C360 180 320 240 250 240 L240 50 Z" fill={getColor(scores.frontal)} opacity="0.9" />
            {/* Temporal (Bottom) */}
            <path d="M180 220 C220 220 280 240 280 280 C240 310 160 310 120 280 Z" fill={getColor(scores.temporal)} opacity="0.9" />

            {/* Shadow/Detail lines */}
            <path d="M240 50 L240 220" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
            <path d="M120 150 Q180 150 240 220" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
        </svg>
    );
}

export function handleCognitiveRequest(res: string | null, renderDefault: Function) {
    if (!res) return renderDefault('Cognitive Brain Test', '인지 기능 정밀 평가', '#7c3aed', '🧠');

    let decodedRes = res;
    try {
        if (/[a-zA-Z]/.test(res) && !res.includes('-')) {
            decodedRes = atob(res);
        }
    } catch {
        // fallback
    }

    const parts = decodedRes.split('-');
    const totalAge = parts[0] || '25';
    const frontal = parts[1] || 'High';
    const temporal = parts[2] || 'High';
    const parietal = parts[3] || 'High';

    const numericAge = Number.parseInt(totalAge, 10);
    const ageColor = numericAge > 50 ? '#ef4444' : '#7c3aed';

    return new ImageResponse(
        (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '40px' }}>
                <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', borderRadius: '48px', border: '1px solid #e2e8f0', padding: '40px', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>

                    {/* Header: Assessment Complete */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
                        <div style={{ fontSize: 42, fontWeight: 900, color: '#2e3192', marginBottom: 8 }}>Assessment Complete</div>
                        <div style={{ fontSize: 20, color: '#64748b', fontWeight: 600 }}>Here is your cognitive brain health analysis.</div>
                    </div>

                    {/* Content Area */}
                    <div style={{ display: 'flex', flex: 1, width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>

                        {/* Estimated Brain Age */}
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                            <span style={{ fontSize: 24, fontWeight: 700, color: '#94a3b8', marginRight: 15 }}>Estimated Brain Age:</span>
                            <span style={{ fontSize: 72, fontWeight: 900, color: ageColor }}>{totalAge}</span>
                            <span style={{ fontSize: 32, fontWeight: 900, color: ageColor, marginLeft: 10, marginTop: 20 }}>yrs</span>
                        </div>

                        {/* Brain & Badges Container */}
                        <div style={{ display: 'flex', width: 600, height: 350, position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
                            {/* SVG Brain */}
                            <div style={{ display: 'flex', transform: 'scale(1.1)' }}>
                                {renderBrainSVG({ frontal, temporal, parietal })}
                            </div>

                            {/* Floating Badges */}
                            <BrainBadge lobe="Parietal" level={parietal} style={{ position: 'absolute', top: 60, left: 30 }} />
                            <BrainBadge lobe="Frontal" level={frontal} style={{ position: 'absolute', top: 80, right: 30 }} />
                            <BrainBadge lobe="Temporal" level={temporal} style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)' }} />
                        </div>
                    </div>

                    {/* Legend */}
                    <div style={{ display: 'flex', gap: 30, marginTop: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#22c55e', marginRight: 8 }} />
                            <span style={{ fontSize: 16, fontWeight: 700, color: '#64748b' }}>Optimal</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#eab308', marginRight: 8 }} />
                            <span style={{ fontSize: 16, fontWeight: 700, color: '#64748b' }}>Average</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#ef4444', marginRight: 8 }} />
                            <span style={{ fontSize: 16, fontWeight: 700, color: '#64748b' }}>Needs Care</span>
                        </div>
                    </div>

                    {/* Watermark */}
                    <div style={{ position: 'absolute', bottom: 40, right: 60, fontSize: 18, color: '#cbd5e1', fontWeight: 800 }}>www.test-archive.com</div>
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}
