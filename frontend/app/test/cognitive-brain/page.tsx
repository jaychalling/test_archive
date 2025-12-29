import type { Metadata } from 'next';
import { generateTestMetadata } from '@/utils/metadata';
import CognitiveClientPage from './CognitiveClientPage';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
    return generateTestMetadata({
        searchParams,
        testType: 'cognitive-brain',
        baseTitle: "Cognitive Brain Test | Precision Assessment",
        description: "This assessment is designed for self-estimation of cognitive traits and should not be used as a clinical psychological evaluation. Results may vary based on environmental factors and testing conditions.",
        getResultTitle: (res) => {
            const parts = res.split('-');
            const age = parts[0] || '??';
            return `My Brain Age is ${age}... Is this a sign? 🧠`;
        },
        getResultDescription: (res) => {
            const parts = res.split('-');
            const age = parts[0] || '??';
            return `My brain health score is based on ${age} yrs... Is this a sign to stop scrolling? 🧠 Check your cognitive performance and see your real profile now!`;
        }
    });
}

import { Suspense } from 'react';

export default function Page() {
    return (
        <Suspense fallback={null}>
            <CognitiveClientPage />
        </Suspense>
    );
}
