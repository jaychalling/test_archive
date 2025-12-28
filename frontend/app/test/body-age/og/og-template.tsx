import { ImageResponse } from 'next/og';

function renderHealthResult(title: string, label: string, color: string, sub: string, icon: string) {
    return new ImageResponse(
        (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '40px' }}>
                <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: '40px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', width: 140, height: 140, borderRadius: 32, alignItems: 'center', justifyContent: 'center', fontSize: 72, backgroundColor: `${color}15`, border: `2px solid ${color}40`, marginBottom: 30 }}>
                        {icon}
                    </div>
                    <div style={{ display: 'flex', fontSize: 22, fontWeight: 'bold', color: color, backgroundColor: `${color}10`, padding: '10px 30px', borderRadius: '100px', marginBottom: 40, border: `1px solid ${color}30` }}>{label}</div>
                    <div style={{ display: 'flex', fontSize: 32, fontWeight: 'bold', color: '#64748b', marginBottom: 15 }}>{sub}</div>
                    <div style={{ display: 'flex', fontSize: 84, fontWeight: 900, color: color, marginBottom: 25, textAlign: 'center' }}>{title}</div>
                    <div style={{ position: 'absolute', bottom: 40, fontSize: 18, color: '#cbd5e1', fontWeight: 'bold' }}>www.test-archive.com</div>
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}

export function handleBodyAgeRequest(res: string | null, renderDefault: Function) {
    if (!res) return renderDefault('Body Age Test', 'Discover your biological age.', '#2563eb', '🧪');

    let decodedRes = res;
    try {
        if (/[a-zA-Z]/.test(res)) {
            decodedRes = atob(res);
        }
    } catch {
        // fallback
    }

    let title = "Optimal / Young";
    let color = "#16a34a";
    let label = "Great Status";
    let icon = "🌿";

    if (res.includes('3') || res.includes('4')) { title = "Standard / Moderate"; color = "#d97706"; label = "Aging Alert"; }
    if (res.includes('3') || res.includes('4')) icon = "⏳";

    return renderHealthResult(title, label, color, "Body Aging Result", icon);
}
