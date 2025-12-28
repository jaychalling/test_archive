

import type { Metadata } from 'next';
import BodyAgeClientPage from './BodyAgeClientPage';
import { Suspense } from 'react';
import { generateTestMetadata } from '@/utils/metadata';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
    return generateTestMetadata({
        searchParams,
        testType: 'body-age',
        baseTitle: "Biological Age Test | Vitality Check",
        description: "Analyze your lifestyle, flexibility, and cardio health to estimate your biological age.",
        getResultTitle: (res) => {
            try {
                const [_, ageStr] = res.split('-');
                return `Biologically ${ageStr}... I'm Roasted! 💀`;
            } catch {
                return `Biological Age Result Is Out! 🧟`;
            }
        },
        getResultDescription: (res) => {
            try {
                const [realAge, bioAge] = res.split('-');
                const diff = parseInt(bioAge) - parseInt(realAge);
                if (diff > 0) return `My body is ${diff} years older than me. I need a detox ASAP. 🧟 Chronologically ${realAge}, Biologically ${bioAge}. This test just roasted me!`;
                return `Chronologically ${realAge}, Biologically ${bioAge}. I'm actually staying young! ✨ See your biological age profile now.`;
            } catch {
                return "My body is 5 years older than me. I need a detox ASAP. 🧟 Check your biological age profile now!";
            }
        }
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
            <Suspense fallback={null}>
                <BodyAgeClientPage />
            </Suspense>
        </section>
    );
}
