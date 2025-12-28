import { ImageResponse } from 'next/og';
// Import assets from local test folder
import { CHAR_IMAGES } from '../kpop-assets';
import { calculateResult } from '../questions';

const KPOP_CHARS: Record<string, { name: string; title: string; color: string; keywords: string[]; imgName: string }> = {
    R: { name: "Rumi", title: "Responsible Leader", color: "#e11d48", keywords: ["#SelfSacrifice", "#MoodMaker", "#IronWill"], imgName: "rumi.png" },
    M: { name: "Mira", title: "Rational Perfectionist", color: "#334155", keywords: ["#LogicKing", "#Tsundere", "#ProblemSolver"], imgName: "mira.png" },
    Z: { name: "Zoey", title: "Lovely Healer", color: "#0d9488", keywords: ["#Sensitivity", "#SocialButterfly", "#Intuition"], imgName: "zoey.jpg" },
    J: { name: "Jinu", title: "Effort-driven Genius", color: "#4f46e5", keywords: ["#Achievement", "#GlassHeart", "#Diligence"], imgName: "jinu.jpg" },
    D: { name: "Derpy & Sussie", title: "Creative Free Spirit", color: "#f97316", keywords: ["#4thDimension", "#IdeaBank", "#MyWay"], imgName: "derpy_and_sussie.png" },
    B: { name: "Baby Saja", title: "Strategic Ambitious Cutie", color: "#ec4899", keywords: ["#TwistCharm", "#SocialSkills", "#Pragmatic"], imgName: "baby_saja.png" },
    Y: { name: "Mystery Saja", title: "Enigmatic Observer", color: "#7c3aed", keywords: ["#Mysterious", "#Insight", "#LonerByChoice"], imgName: "mystery_saja.png" },
    A: { name: "Abby Saja", title: "Confident Action-Taker", color: "#dc2626", keywords: ["#Confidence", "#Simplicity", "#Loyalty"], imgName: "abby_saja.jpg" },
};

function renderKPopResult(char: any) {
    return new ImageResponse(
        (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '40px' }}>
                <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9', borderRadius: '40px', border: '1px solid #e2e8f0' }}>

                    {/* Badge */}
                    <div style={{ display: 'flex', fontSize: 20, fontWeight: 'bold', color: '#64748b', backgroundColor: 'white', padding: '8px 24px', borderRadius: '50px', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '2px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                        Your Soul Character
                    </div>

                    {/* Name */}
                    <div style={{ display: 'flex', fontSize: 80, fontWeight: 900, color: char.color, marginBottom: 10, letterSpacing: '-2px', textShadow: '2px 2px 0px rgba(0,0,0,0.1)' }}>
                        {char.name}
                    </div>

                    {/* Title */}
                    <div style={{ display: 'flex', fontSize: 32, fontWeight: 'bold', color: '#334155', marginBottom: 30, textAlign: 'center' }}>
                        {char.title}
                    </div>

                    {/* Image */}
                    <div style={{ display: 'flex', width: 240, height: 240, borderRadius: 120, border: '8px solid white', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', overflow: 'hidden', marginBottom: 30, backgroundColor: char.color }}>
                        {char.img ? (
                            <img src={char.img} width="240" height="240" style={{ objectFit: 'cover' }} alt={char.name} />
                        ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 80 }}>?</div>
                        )}
                    </div>

                    {/* Keywords */}
                    <div style={{ display: 'flex', gap: 15, flexWrap: 'wrap', justifyContent: 'center' }}>
                        {char.keywords.map((tag: string) => (
                            <div key={tag} style={{ display: 'flex', backgroundColor: 'white', padding: '10px 24px', borderRadius: '16px', fontSize: 22, fontWeight: 'bold', color: '#475569', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                                {tag}
                            </div>
                        ))}
                    </div>

                    <div style={{ position: 'absolute', bottom: 30, fontSize: 18, color: '#94a3b8', fontWeight: 'bold' }}>www.test-archive.com</div>
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}

export function handleKPopRequest(res: string | null, renderDefault: Function) {
    if (!res) {
        return renderDefault('K-POP CHARACTER TEST', 'Who is Your Soulmate?', '#f472b6', '🎵');
    }
    const charKey = calculateResult(res);
    const charData = KPOP_CHARS[charKey] || KPOP_CHARS.R;

    const rawBase64 = CHAR_IMAGES[charData.imgName];

    const imgSrc = rawBase64
        ? (rawBase64.startsWith('data:') ? rawBase64 : `data:image/png;base64,${rawBase64}`)
        : null;

    const char = { ...charData, img: imgSrc };
    return renderKPopResult(char);
}
