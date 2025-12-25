import type { Metadata } from 'next';
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
        baseTitle: "K-Pop Demon Hunters: Soul Character Test",
        description: "Find your soul character among the legendary Demon Hunters! 20 personality questions with in-depth analysis.",
        getResultTitle: (res: string) => {
            const charKey = calculateResult(res);
            const info = CHAR_MAP[charKey] || CHAR_MAP.R;
            return `I'm ${info.name}! Who are you?`;
        }
    });
}

export default function Page() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Quiz',
        name: "K-Pop Demon Hunters Character Test",
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
            <KPopClientPage />
        </section>
    );
}
