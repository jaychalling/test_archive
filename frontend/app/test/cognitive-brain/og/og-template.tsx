import { ImageResponse } from 'next/og';

// Simplified SVG for OG (Satori supports basic SVG)
function renderBrainSVG(scores: { frontal: string, temporal: string, parietal: string }) {
    const getColor = (lvl: string) => {
        if (lvl === 'High') return '#22c55e';
        if (lvl === 'Mid') return '#eab308';
        return '#ef4444';
    };

    return (
        <svg width="200" height="200" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
            <path d="M150,250 C100,250 50,200 50,150 C50,80 120,30 200,30 C250,30 280,60 290,100 L200,250 Z" fill={getColor(scores.frontal)} stroke="white" strokeWidth="4" />
            <path d="M200,30 C300,30 400,80 420,150 C440,220 380,280 300,280 L290,100 Z" fill={getColor(scores.parietal)} stroke="white" strokeWidth="4" />
            <path d="M150,250 L200,250 L300,280 C250,350 150,350 120,300 Z" fill={getColor(scores.temporal)} stroke="white" strokeWidth="4" />
            <path d="M300,280 C350,280 380,320 360,360 C320,390 280,360 280,340 Z" fill="#cbd5e1" />
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
    const totalScore = parts[0] || '?';
    const frontal = parts[1] || 'Mid';
    const temporal = parts[2] || 'Mid';
    const parietal = parts[3] || 'Mid';

    const numericScore = Number.parseInt(totalScore, 10);
    let profileLabel = 'Balanced Profile';
    let profileColor = '#6366f1';
    if (!Number.isNaN(numericScore)) {
        if (numericScore >= 85) { profileLabel = 'Peak Performance'; profileColor = '#22c55e'; }
        else if (numericScore >= 70) { profileLabel = 'Stable Focus'; profileColor = '#eab308'; }
        else { profileLabel = 'Needs Recharge'; profileColor = '#ef4444'; }
    }

    return new ImageResponse(
        (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '40px' }}>
                <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: '40px', border: '1px solid #e2e8f0', padding: '60px' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '50%' }}>
                        <div style={{ display: 'flex', fontSize: 20, fontWeight: 'bold', color: profileColor, backgroundColor: `${profileColor}15`, padding: '8px 24px', borderRadius: 999, marginBottom: 24 }}>{profileLabel}</div>
                        <div style={{ display: 'flex', fontSize: 24, fontWeight: 'bold', color: '#7c3aed', backgroundColor: '#f3e8ff', padding: '10px 30px', borderRadius: '100px', marginBottom: 30 }}>Cognitive Brain Profile</div>
                        <div style={{ display: 'flex', fontSize: 90, fontWeight: 900, color: '#1e293b', marginBottom: 10 }}>{totalScore} <span style={{ fontSize: 40, marginTop: 40, marginLeft: 10, color: '#94a3b8' }}>점</span></div>
                        <div style={{ display: 'flex', fontSize: 32, fontWeight: 'bold', color: '#64748b' }}>뇌 건강 정밀 분석 결과</div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%' }}>
                        <div style={{ display: 'flex', transform: 'scale(1.5)' }}>
                            {renderBrainSVG({ frontal, temporal, parietal })}
                        </div>
                        <div style={{ display: 'flex', marginTop: 40, gap: 20 }}>
                            <div style={{ display: 'flex', color: '#1e293b', fontWeight: 'bold', fontSize: 24 }}>전두엽: {frontal}</div>
                            <div style={{ display: 'flex', color: '#1e293b', fontWeight: 'bold', fontSize: 24 }}>측두엽: {temporal}</div>
                            <div style={{ display: 'flex', color: '#1e293b', fontWeight: 'bold', fontSize: 24 }}>두정엽: {parietal}</div>
                        </div>
                    </div>

                    <div style={{ position: 'absolute', bottom: 40, left: 60, fontSize: 20, color: '#94a3b8', fontWeight: 'bold' }}>www.test-archive.com</div>
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}
