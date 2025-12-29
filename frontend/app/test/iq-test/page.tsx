import type { Metadata } from 'next';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import IQTestClientPage from './IQTestClientPage';
import { calculateResult } from './questions';
import { generateTestMetadata } from '@/utils/metadata';

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    return generateTestMetadata({
        searchParams,
        testType: 'iq-test',
        baseTitle: "2025 Free IQ Test | Scientific Intelligence Assessment",
        description: "Take our comprehensive 50-question IQ test based on Wechsler model and Mensa-style Raven matrices. Test your Verbal, Numerical, and Spatial reasoning abilities.",
        getResultTitle: (res: string) => {
            const result = calculateResult(res);
            return `IQ Score: ${result.iqScore} - ${result.category.label}`;
        },
        getResultDescription: (res: string) => {
            const result = calculateResult(res);
            return `My IQ is ${result.iqScore} (${result.category.label}, ${result.category.percentile}). Take the 2025 Free IQ Test to discover your cognitive abilities!`;
        }
    });
}

export default async function Page({ searchParams }: Props) {
    const params = await searchParams;
    const isPreview = params.preview === 'true';

    // Block access to IQ test while in development
    if (!isPreview) {
        redirect('/');
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Quiz',
        name: "2025 Free IQ Test",
        description: "Comprehensive 50-question IQ test based on Wechsler (WAIS) model and Mensa-style Raven matrices. Measures Verbal, Numerical, and Spatial reasoning abilities.",
        url: `https://www.test-archive.com/test/iq-test`,
        educationalLevel: 'General',
        numberOfQuestions: 50,
        timeRequired: 'PT30M',
        mainEntity: {
            '@type': 'Question',
            name: 'Intelligence Quotient Assessment',
        }
    };

    return (
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <h1 className="sr-only">2025 Free IQ Test - Scientific Intelligence Assessment</h1>
            <Suspense fallback={null}>
                <IQTestClientPage />
            </Suspense>
        </section>
    );
}
