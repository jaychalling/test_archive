

import type { Metadata } from 'next';
import BodyAgeClientPage from './BodyAgeClientPage';
import { generateTestMetadata } from '@/utils/metadata';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
    return generateTestMetadata({
        searchParams,
        testType: 'body-age',
        baseTitle: "Biological Age Test | Vitality Check",
        description: "Analyze your lifestyle, flexibility, and cardio health to estimate your biological age.",
        getResultTitle: (res) => `My Biological Age is...`
    });
}

export default function Page() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Quiz',
        name: "Body Age Test",
        description: "Discover your biological age with simple questions. Compare it with your actual age.",
        url: `https://www.test-archive.com/test/body-age`,
        mainEntity: {
            '@type': 'Question',
            name: 'Body Age Analysis',
        }
    };

    return (
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <h1 className="sr-only">Body Age Test</h1>
            <BodyAgeClientPage />
        </section>
    );
}
