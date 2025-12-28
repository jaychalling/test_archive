import { ImageResponse } from 'next/og';

const COLOR_MAP = {
    High: { color: '#22c55e', label: 'Optimal', bg: '#f0fdf4' },
    Mid: { color: '#eab308', label: 'Average', bg: '#fefce8' },
    Low: { color: '#ef4444', label: 'Needs Care', bg: '#fef2f2' },
};

function DomainCard({ lobe, level }: { lobe: string, level: string }) {
    const config = COLOR_MAP[level as keyof typeof COLOR_MAP] || COLOR_MAP.Mid;
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: config.bg,
            padding: '24px 32px',
            borderRadius: '32px',
            border: `2px solid ${config.color}30`,
            minWidth: '220px',
            flex: 1
        }}>
            <span style={{ fontSize: 18, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 10 }}>{lobe}</span>
            <span style={{ fontSize: 32, fontWeight: 900, color: config.color }}>{config.label}</span>
        </div>
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
                <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', borderRadius: '48px', border: '1px solid #e2e8f0', padding: '50px', position: 'relative', boxShadow: '0 25px 60px rgba(0,0,0,0.08)' }}>

                    {/* Header */}
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontSize: 48, fontWeight: 950, color: '#1e1b4b', marginBottom: 8, letterSpacing: '-1px' }}>Cognitive Profile</div>
                            <div style={{ fontSize: 22, color: '#64748b', fontWeight: 600 }}>Precision Brain Health Analysis</div>
                        </div>
                        <div style={{ display: 'flex', fontSize: 24, fontWeight: 900, color: 'white', backgroundColor: '#7c3aed', padding: '14px 36px', borderRadius: '100px', transform: 'rotate(2deg)', boxShadow: '0 10px 20px rgba(124, 58, 237, 0.3)' }}>
                            Stop Scrolling? 🧠
                        </div>
                    </div>

                    {/* Main Content Area: Split */}
                    <div style={{ display: 'flex', flex: 1, width: '100%', alignItems: 'center', gap: 40 }}>

                        {/* Left: Big Age */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 0.8, backgroundColor: '#f1f5f9', borderRadius: '40px', padding: '40px 30px' }}>
                            <span style={{ fontSize: 22, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 10 }}>Brain Age</span>
                            <div style={{ display: 'flex', alignItems: 'baseline' }}>
                                <span style={{ fontSize: 130, fontWeight: 950, color: ageColor, letterSpacing: '-4px' }}>{totalAge}</span>
                                <span style={{ fontSize: 40, fontWeight: 900, color: ageColor, marginLeft: 10 }}>yrs</span>
                            </div>
                        </div>

                        {/* Right: Detailed Domain Scores */}
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1.2, gap: 16 }}>
                            <DomainCard lobe="Frontal Lobe" level={frontal} />
                            <DomainCard lobe="Temporal Lobe" level={temporal} />
                            <DomainCard lobe="Parietal Lobe" level={parietal} />
                        </div>
                    </div>

                    {/* Watermark */}
                    <div style={{ position: 'absolute', bottom: 40, right: 60, fontSize: 20, color: '#cbd5e1', fontWeight: 800, letterSpacing: '1px' }}>WWW.TEST-ARCHIVE.COM</div>
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}

