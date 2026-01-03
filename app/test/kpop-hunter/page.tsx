import type { Metadata } from 'next';
import { Suspense } from 'react';
import KPopClientPage from './KPopClientPage';
import { calculateResult } from './questions';
import { generateTestMetadata } from '@/utils/metadata';

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Character Mapping for Metadata Title Logic
const CHAR_MAP: Record<string, { name: string; title: string }> = {
    R: { name: "Rumi", title: "Responsible Leader" },
    M: { name: "Mira", title: "Rational Perfectionist" },
    Z: { name: "Zoey", title: "Lovely Healer" },
    J: { name: "Jinu", title: "Effort-driven Genius" },
    D: { name: "Derpy & Sussie", title: "Creative Free Spirit" },
    B: { name: "Baby Saja", title: "Strategic Ambitious Cutie" },
    Y: { name: "Mystery Saja", title: "Enigmatic Observer" },
    A: { name: "Abby Saja", title: "Confident Action-Taker" },
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    return generateTestMetadata({
        searchParams,
        testType: 'kpop-hunter',
        baseTitle: "KDH SOUL MATE TEST | Soul Match",
        description: "This is a gamified personality test created for entertainment. Character assignments are based on fictional RPG scenarios and are intended for fun and social sharing within the K-Pop fandom.",
        getResultTitle: (res: string) => `My KDH Soul Mate is... 💖`,
        getResultDescription: (res: string) => `Found my soul character in the Demon Hunter world. Who are you? Find your match in 20 questions! ✨`
    });
}

export default function Page() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Quiz',
        name: "KDH SOUL MATE TEST",
        description: "Lumi, Mira, Mystery Lion... Which K-Demon Hunter character resonates with your soul? Find out with this 20-question in-depth psychological analysis.",
        url: `https://www.test-archive.com/test/kpop-hunter`,
        mainEntity: {
            '@type': 'Question',
            name: 'Personality Analysis',
        }
    };

    return (
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <h1 className="sr-only">K-Pop Demon Hunters Character Test</h1>
            <Suspense fallback={null}>
                <KPopClientPage />
            </Suspense>
        </section>
    );
}
