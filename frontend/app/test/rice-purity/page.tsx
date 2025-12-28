import RicePurityClientPage from './RicePurityClientPage';
import type { Metadata } from 'next';
import { generateTestMetadata } from '@/utils/metadata';

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    return generateTestMetadata({
        searchParams,
        testType: 'rice-purity',
        baseTitle: '2026 Rice Purity Test | Test Archive',
        description: 'The 2026 Gen Z Edition of the famous 100-question purity test. Digital sins, modern dating, and more.',
        getResultTitle: (res) => {
            const score = Number.parseInt(res, 10);
            if (Number.isNaN(score)) return 'Rice Purity Result';
            if (score >= 98) return 'The Saint';
            if (score >= 90) return 'The Goody Two-Shoes';
            if (score >= 77) return 'The Normie';
            if (score >= 45) return 'The Life Explorer';
            if (score >= 30) return 'The Rebel';
            return 'The Devil Child';
        }
    });
}

import { Suspense } from 'react';

export default function Page() {
    return (
        <Suspense fallback={null}>
            <RicePurityClientPage />
        </Suspense>
    );
}
