import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

type Archetype = {
    title: string;
    subtitle: string;
    color: string;
    bg: string;
    imageName: string;
};

const getArchetype = (score: number): Archetype => {
    if (score >= 98) {
        return {
            title: 'The Saint',
            subtitle: 'Pure as snow, almost mythical.',
            color: '#4f46e5',
            bg: '#eef2ff',
            imageName: 'rice-saint.png'
        };
    }
    if (score >= 90) {
        return {
            title: 'The Goody Two-Shoes',
            subtitle: 'Sweet, safe, and wholesome.',
            color: '#2563eb',
            bg: '#eff6ff',
            imageName: 'rice-goody.png'
        };
    }
    if (score >= 77) {
        return {
            title: 'The Normie',
            subtitle: 'Balanced. You have a life.',
            color: '#0f766e',
            bg: '#f0fdfa',
            imageName: 'rice-normie.png'
        };
    }
    if (score >= 45) {
        return {
            title: 'The Life Explorer',
            subtitle: 'A connoisseur of experiences.',
            color: '#d97706',
            bg: '#fffbeb',
            imageName: 'rice-explorer.png'
        };
    }
    if (score >= 30) {
        return {
            title: 'The Rebel',
            subtitle: 'Wild stories, fearless vibes.',
            color: '#ea580c',
            bg: '#fff7ed',
            imageName: 'rice-rebel.png'
        };
    }
    return {
        title: 'The Devil Child',
        subtitle: 'Chaotic energy, iconic chaos.',
        color: '#e11d48',
        bg: '#fff1f2',
        imageName: 'rice-devil.png'
    };
};

function renderRicePurityResult(score: number, archetype: Archetype, imageData: string) {
    return new ImageResponse(
        (
            <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '40px' }}>
                <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'row', gap: 40, alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: '40px', border: '1px solid #e2e8f0', padding: '60px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, width: '55%' }}>
                        <div style={{ display: 'flex', fontSize: 22, fontWeight: 'bold', color: archetype.color, backgroundColor: archetype.bg, padding: '10px 26px', borderRadius: 999, letterSpacing: '2px', textTransform: 'uppercase' }}>
                            Rice Purity Score
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                            <div style={{ display: 'flex', fontSize: 110, fontWeight: 900, color: '#0f172a' }}>{score}</div>
                            <div style={{ display: 'flex', fontSize: 32, fontWeight: 700, color: '#94a3b8' }}>pts</div>
                        </div>
                        <div style={{ display: 'flex', fontSize: 52, fontWeight: 900, color: archetype.color }}>{archetype.title}</div>
                        <div style={{ display: 'flex', fontSize: 26, fontWeight: 500, color: '#475569' }}>{archetype.subtitle}</div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: '40%' }}>
                        <div style={{ display: 'flex', width: 280, height: 280, borderRadius: 32, overflow: 'hidden', border: `8px solid ${archetype.bg}`, boxShadow: '0 20px 40px rgba(15, 23, 42, 0.15)' }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={imageData} width="280" height="280" style={{ objectFit: 'cover' }} alt={archetype.title} />
                        </div>
                        <div style={{ display: 'flex', fontSize: 20, fontWeight: 700, color: '#94a3b8' }}>www.test-archive.com</div>
                    </div>
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}

export async function handleRicePurityRequest(res: string | null, renderDefault: Function, origin: string) {
    if (!res) {
        return renderDefault('RICE PURITY TEST', 'How Pure Are You?', '#6366f1', '🍚');
    }
    const score = Number.parseInt(res, 10);
    if (Number.isNaN(score)) {
        return renderDefault('RICE PURITY TEST', 'How Pure Are You?', '#6366f1', '🍚');
    }
    const archetype = getArchetype(score);

    // Read image file and convert to base64
    try {
        const imagePath = path.join(process.cwd(), 'public', 'images', archetype.imageName);
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;
        return renderRicePurityResult(score, archetype, base64Image);
    } catch (e) {
        console.error(`Failed to load image for archetype ${archetype.title}:`, e);
        // Fallback if image load fails
        return renderDefault('RICE PURITY TEST', 'How Pure Are You?', '#6366f1', '🍚');
    }
}
