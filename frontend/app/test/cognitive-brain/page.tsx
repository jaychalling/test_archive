import type { Metadata } from 'next';
import { generateTestMetadata } from '@/utils/metadata';
import CognitiveClientPage from './CognitiveClientPage';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
    return generateTestMetadata({
        searchParams,
        testType: 'cognitive-brain',
        baseTitle: "Cognitive Brain Test | Precision Assessment",
        description: "Analyzes frontal, temporal, and parietal functions with 20 precision tests to estimate your brain health age.",
        getResultTitle: (res) => `My Brain Health Result is...`
    });
}

import { Suspense } from 'react';

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CognitiveClientPage />
        </Suspense>
    );
}
