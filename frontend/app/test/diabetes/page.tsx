import type { Metadata } from 'next';
import DiabetesClientPage from './DiabetesClientPage';
import { generateTestMetadata } from '@/utils/metadata';
import { fetchTestDetails } from '@/utils/api';

export const dynamic = 'force-dynamic';

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    return generateTestMetadata({
        searchParams,
        testType: 'diabetes',
        baseTitle: "Type 2 Diabetes Risk Test: Assess Your Risk",
        description: "Assess your diabetes risk based on your dietary habits and lifestyle. Check it in just 3 minutes.",
        getResultTitle: (res: string) => "Diabetes Risk Analysis Completed"
    });
}

export default async function Page() {
    const testData = await fetchTestDetails('diabetes');

    // Handle error or loading state if needed.
    // Ideally redirect to 404 or show error.
    if (!testData || !testData.questions) {
         return (
             <div className="min-h-screen flex items-center justify-center">
                 <p>Failed to load test data. Please try again later.</p>
             </div>
         );
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Quiz',
        name: testData.info.title,
        description: testData.info.description,
        url: `https://www.test-archive.com/test/diabetes`,
        mainEntity: {
            '@type': 'Question',
            name: 'Diabetes Risk Analysis',
        }
    };

    return (
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <h1 className="sr-only">{testData.info.title}</h1>
            <DiabetesClientPage questions={testData.questions} />
        </section>
    );
}
