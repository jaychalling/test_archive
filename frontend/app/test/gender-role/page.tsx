import { Suspense } from 'react';
import GenderRoleClientPage from './GenderRoleClientPage';
import type { Metadata } from 'next';
import { generateTestMetadata } from '@/utils/metadata';

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    return generateTestMetadata({
        searchParams,
        testType: 'gender-role',
        baseTitle: '2026 GENDER ROLE TEST | Test Archive',
        description: 'Analyze your Masculinity, Femininity, and Situational Flexibility based on modern psychology (GGDP Model).',
        getResultTitle: (res: string) => {
            // Need a simple way to get type from res string (Base64 json)
            try {
                const decoded = JSON.parse(atob(res)) as Record<string, number>;
                // Simplified logic to match AnalysisReport thresholds (high >= 3.2)
                // Roughly checking M1 items (Agency: 1,3,5,7,9,11,13,15,17,19), (Communion: 2,4,6,8,10,12,14,16,18,20)
                let sumA = 0, countA = 0, sumC = 0, countC = 0;
                Object.entries(decoded).forEach(([k, v]) => {
                    const id = parseInt(k);
                    if (id <= 20) {
                        if (id % 2 === 1) { sumA += v; countA++; }
                        else { sumC += v; countC++; }
                    }
                });
                const avgA = sumA / countA;
                const avgC = sumC / countC;
                if (avgA >= 3.2 && avgC >= 3.2) return "Found My Role: The All-Rounder! ⚖️";
                if (avgA >= 3.2) return "Found My Role: The Commander! 😎";
                if (avgC >= 3.2) return "Found My Role: The Nurturer! ❤️";
                return "Found My Role: The Observer! 🔍";
            } catch {
                return "Gender Role Analysis Completed";
            }
        },
        getResultDescription: (res: string) => {
            return "Turns out I'm a 'Situational Pro'. ⚖️ Breaking stereotypes since 2026. Discover your unique personality profile!";
        }
    });
}

export default function Page() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Quiz',
        name: "2026 Gender Role Test",
        description: "Analyze your Masculinity & Femininity levels based on modern psychology.",
        url: `https://www.test-archive.com/test/gender-role`,
        mainEntity: {
            '@type': 'Question',
            name: 'Gender Role Analysis',
        }
    };

    return (
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <h1 className="sr-only">2026 Gender Role Test</h1>
            <Suspense fallback={null}>
                <GenderRoleClientPage />
            </Suspense>
        </section>
    );
}
