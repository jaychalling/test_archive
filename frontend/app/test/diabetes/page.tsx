

import type { Metadata } from 'next';
import { Suspense } from 'react';
import DiabetesClientPage from './DiabetesClientPage';
import { generateTestMetadata } from '@/utils/metadata';

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

export default function Page() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Quiz',
        name: "Type 2 Diabetes Risk Test",
        description: "Assess your diabetes risk based on your dietary habits and lifestyle. Check it in just 3 minutes.",
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
            <h1 className="sr-only">Type 2 Diabetes Risk Test</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <DiabetesClientPage />
            </Suspense>
        </section>
    );
}
