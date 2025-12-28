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
        getResultTitle: () => '2026 Gender Role Test Result'
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
            <Suspense fallback={<div>Loading...</div>}>
                <GenderRoleClientPage />
            </Suspense>
        </section>
    );
}
