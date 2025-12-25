import type { Metadata } from 'next';
import KPopClientPage from './KPopClientPage';

export const metadata: Metadata = {
    title: "K-Pop Demon Hunters Character Test (Personality Test)",
    description: "Lumi, Mira, Mystery Lion... Which K-Demon Hunter character resonates with your soul? Find out with this 20-question in-depth psychological analysis.",
    keywords: ["K-Pop Demon Hunters", "Personality Test", "MBTI", "Character Test", "Psychological Test", "K-Drama"],
    openGraph: {
        title: "K-Pop Demon Hunters Character Test (Personality Test)",
        description: "Lumi, Mira, Mystery Lion... Which K-Demon Hunter character resonates with your soul?",
        type: 'website',
    },
    alternates: {
        canonical: 'https://www.test-archive.com/test/kpop-hunter',
    }
};

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

export default function Page() {
    return (
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <h1 className="sr-only">K-Pop Demon Hunters Character Test</h1>
            <p className="sr-only">Lumi, Mira, Mystery Lion... Which K-Demon Hunter character resonates with your soul? Find out with this 20-question in-depth psychological analysis.</p>
            <KPopClientPage />
        </section>
    );
}
