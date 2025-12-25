import type { Metadata } from 'next';
import BodyAgeClientPage from './BodyAgeClientPage';
import { generateTestMetadata } from '@/utils/metadata';

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    return generateTestMetadata({
        searchParams,
        testType: 'body-age',
        baseTitle: "Body Age Test: Discover Your Biological Age",
        description: "Compare your actual age with your body's biological age. Find out how you're aging!",
        getResultTitle: (res: string) => "Check my Body Age Report!"
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
