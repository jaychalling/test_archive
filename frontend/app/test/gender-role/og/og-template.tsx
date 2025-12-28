import { ImageResponse } from 'next/og';


const MINIMAL_MODULES = [
    {
        moduleId: "M1",
        items: [
            { id: 1, category: "Agency" },
            { id: 2, category: "Agency" },
            { id: 3, category: "Agency" },
            { id: 4, category: "Agency" },
            { id: 5, category: "Agency" },
            { id: 6, category: "Agency" },
            { id: 7, category: "Agency" },
            { id: 8, category: "Agency" },
            { id: 9, category: "Agency" },
            { id: 10, category: "Agency" },
            { id: 11, category: "Communion" },
            { id: 12, category: "Communion" },
            { id: 13, category: "Communion" },
            { id: 14, category: "Communion" },
            { id: 15, category: "Communion" },
            { id: 16, category: "Communion" },
            { id: 17, category: "Communion" },
            { id: 18, category: "Communion" },
            { id: 19, category: "Communion" },
            { id: 20, category: "Communion" }
        ]
    },
    {
        moduleId: "M2",
        items: [
            {
                id: 21,
                actions: [{ subId: "A" }, { subId: "B" }]
            },
            {
                id: 22,
                actions: [{ subId: "A" }, { subId: "B" }]
            }
        ]
    }
];

type ResultStyle = {
    title: string;
    subtitle: string;
    color: string;
    bg: string;
    icon: string;
};

const RESULT_STYLES: Record<string, ResultStyle> = {
    'The All-Rounder (Androgynous)': {
        title: 'The All-Rounder',
        subtitle: 'High Agency + High Communion',
        color: '#2563eb',
        bg: '#eff6ff',
        icon: '⚖️'
    },
    'The Commander (Agentic)': {
        title: 'The Commander',
        subtitle: 'High Agency, Low Communion',
        color: '#dc2626',
        bg: '#fef2f2',
        icon: '🛡️'
    },
    'The Nurturer (Communal)': {
        title: 'The Nurturer',
        subtitle: 'High Communion, Low Agency',
        color: '#db2777',
        bg: '#fdf2f8',
        icon: '💗'
    },
    'The Observer (Undifferentiated)': {
        title: 'The Observer',
        subtitle: 'Balanced but Reserved',
        color: '#0f766e',
        bg: '#f0fdfa',
        icon: '🧭'
    }
};

const getAverage = (answers: Record<string, number>, moduleId: string, category: string) => {
    const module = MINIMAL_MODULES.find((m) => m.moduleId === moduleId);
    if (!module) return 0;

    if (moduleId === 'M1') {
        const items = module.items.filter((item: any) => item.category === category);
        if (items.length === 0) return 0;
        const total = items.reduce((sum, item: any) => sum + (answers[item.id.toString()] ?? 3), 0);
        return total / items.length;
    }

    if (moduleId === 'M2') {
        const actions = module.items.flatMap((item: any) => item.actions ?? []);
        if (actions.length === 0) return 0;
        let total = 0;
        module.items.forEach((item: any) => {
            item.actions?.forEach((action: any) => {
                total += answers[`${item.id}_${action.subId}`] ?? 3;
            });
        });
        return total / actions.length;
    }

    return 0;
};

const getResult = (answers: Record<string, number>) => {
    const agencyScore = getAverage(answers, 'M1', 'Agency');
    const communionScore = getAverage(answers, 'M1', 'Communion');
    const flexibilityScore = getAverage(answers, 'M2', 'Flexibility');

    const agencyPct = Math.max(0, Math.min(100, (agencyScore - 1) / 4 * 100));
    const communionPct = Math.max(0, Math.min(100, (communionScore - 1) / 4 * 100));
    const flexibilityPct = Math.max(0, Math.min(100, (flexibilityScore - 1) / 4 * 100));

    const highA = agencyScore >= 3.2;
    const highC = communionScore >= 3.2;

    let type = 'The Observer (Undifferentiated)';
    if (highA && highC) {
        type = 'The All-Rounder (Androgynous)';
    } else if (highA && !highC) {
        type = 'The Commander (Agentic)';
    } else if (!highA && highC) {
        type = 'The Nurturer (Communal)';
    }

    return {
        type,
        agencyPct,
        communionPct,
        flexibilityPct
    };
};

const safeDecode = (res: string) => {
    try {
        return JSON.parse(Buffer.from(res, 'base64').toString('utf8')) as Record<string, number>;
    } catch {
        return null;
    }
};

export function handleGenderRoleRequest(res: string | null, renderDefault: Function, origin: string) {
    if (!res) return renderDefault('Gender Role Test', 'Masculinity · Femininity · Flexibility', '#2563eb', '⚥');

    const decoded = safeDecode(res);
    if (!decoded) return renderDefault('Gender Role Test', 'Masculinity · Femininity · Flexibility', '#2563eb', '⚥');

    const result = getResult(decoded);
    const style = RESULT_STYLES[result.type] || RESULT_STYLES['The Observer (Undifferentiated)'];

    return new ImageResponse(
        (
            <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '40px' }}>
                <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: '40px', border: '1px solid #e2e8f0', padding: '60px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '60%' }}>
                        <div style={{ display: 'flex', fontSize: 20, fontWeight: 'bold', color: style.color, backgroundColor: style.bg, padding: '10px 24px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '2px' }}>
                            2026 Gender Role Test
                        </div>
                        <div style={{ display: 'flex', fontSize: 64, fontWeight: 900, color: '#0f172a' }}>{style.title}</div>
                        <div style={{ display: 'flex', fontSize: 26, fontWeight: 600, color: '#475569' }}>{style.subtitle}</div>

                        <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', padding: '16px 20px', borderRadius: 20, border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', minWidth: 160 }}>
                                <div style={{ display: 'flex', fontSize: 16, fontWeight: 700, color: '#475569', marginBottom: 6 }}>Agency</div>
                                <div style={{ display: 'flex', fontSize: 28, fontWeight: 800, color: '#2563eb' }}>{Math.round(result.agencyPct)}%</div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', padding: '16px 20px', borderRadius: 20, border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', minWidth: 160 }}>
                                <div style={{ display: 'flex', fontSize: 16, fontWeight: 700, color: '#475569', marginBottom: 6 }}>Communion</div>
                                <div style={{ display: 'flex', fontSize: 28, fontWeight: 800, color: '#db2777' }}>{Math.round(result.communionPct)}%</div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', padding: '16px 20px', borderRadius: 20, border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', minWidth: 160 }}>
                                <div style={{ display: 'flex', fontSize: 16, fontWeight: 700, color: '#475569', marginBottom: 6 }}>Flexibility</div>
                                <div style={{ display: 'flex', fontSize: 28, fontWeight: 800, color: '#16a34a' }}>{Math.round(result.flexibilityPct)}%</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '35%', position: 'relative' }}>
                        <div style={{ display: 'flex', position: 'absolute', top: -30, fontSize: 22, fontWeight: 900, color: 'white', backgroundColor: '#0f172a', padding: '10px 24px', borderRadius: '100px', transform: 'rotate(-3deg)', zIndex: 10 }}>
                            Stereotypes? ⚖️
                        </div>
                        <div style={{ display: 'flex', width: 240, height: 240, borderRadius: 32, alignItems: 'center', justifyContent: 'center', backgroundColor: style.bg, fontSize: 120 }}>
                            {style.icon}
                        </div>
                        <div style={{ display: 'flex', fontSize: 20, fontWeight: 700, color: '#94a3b8' }}>www.test-archive.com</div>
                    </div>
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}
