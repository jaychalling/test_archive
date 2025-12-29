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
        description: "This 2026 edition of the Rice Purity Test is an updated version of the historical internet tradition, specifically recalibrated to reflect modern lifestyle and contemporary experiences. This test is for entertainment purposes only and includes mature themes. It is not a clinical assessment or a judgment of your character or moral standing.",
        getResultTitle: (res) => {
            const score = Number.parseInt(res, 10);
            if (Number.isNaN(score)) return '2026 Rice Purity Test';
            if (score >= 98) return "The Last Saint On Internet 😇";
            if (score >= 30) return "My 2026 Purity Result 💀";
            return "Who's more 'cooked' than me? 👹";
        },
        getResultDescription: (res) => {
            const score = Number.parseInt(res, 10);
            if (Number.isNaN(score)) return "What's your 2026 purity score? Prove me wrong.";
            if (score >= 98) return "Am I too innocent for 2026? Only 2 points deducted. 😂 The last remaining Saint on the internet. Prove me wrong!";
            if (score >= 77) return `My 2026 Purity score is ${score}. I'm officially a Normie. What's yours? Can you beat me?`;
            return `My 2026 Purity score is ${score}, which is lower than my GPA. 💀 Who's more 'cooked' than me? Bring it on! 🔥`;
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
