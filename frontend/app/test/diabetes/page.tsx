

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
        description: "This test is for educational and awareness purposes only. It does not provide a medical diagnosis or professional healthcare advice. Please consult a medical professional for health-related concerns.",
        getResultTitle: (res: string) => "High Risk Level detected! 🚨",
        getResultDescription: (res: string) => "High Risk Level detected. 🚨 Time to change my lifestyle. Check your diabetes risk in just 3 minutes."
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
            <Suspense fallback={null}>
                <DiabetesClientPage />
            </Suspense>
        </section>
    );
}
