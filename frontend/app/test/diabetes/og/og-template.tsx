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

export function handleDiabetesRequest(res: string | null, renderDefault: Function) {
    if (!res) return renderDefault('Diabetes Risk Test', 'Check your metabolic health.', '#16a34a', '⚕️');

    const score = res.length > 0 ? res.split('').reduce((a, b) => a + (parseInt(b) || 0), 0) / (res.length || 1) : 0;

    let title = "Healthy / Optimal";
    let color = "#16a34a";
    let label = "Safe Status";
    let icon = "✅";
    if (score > 2.2) { title = "High Risk Level"; color = "#dc2626"; label = "Danger Alert"; }
    else if (score > 1.2) { title = "Warning Level"; color = "#d97706"; label = "Health Warning"; }

    if (score > 2.2) icon = "🚨";
    else if (score > 1.2) icon = "⚠️";

    return renderHealthResult(title, label, color, "Diabetes Risk Analysis", icon);
}
