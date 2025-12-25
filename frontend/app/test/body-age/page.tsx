import type { Metadata } from 'next';
import BodyAgeClientPage from './BodyAgeClientPage';

export const metadata: Metadata = {
    title: "Body Age Test",
    description: "Discover your biological age with simple questions. Compare it with your actual age.",
    keywords: ["Body Age", "Health Test", "Self-Diagnosis", "Biological Age"],
    openGraph: {
        title: "Body Age Test",
        description: "Discover your biological age with simple questions. Compare it with your actual age.",
        type: 'website',
    },
    alternates: {
        canonical: 'https://www.test-archive.com/test/body-age',
    }
};

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

export default function Page() {
    return (
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <h1 className="sr-only">Body Age Test</h1>
            <p className="sr-only">Discover your biological age with simple questions. Compare it with your actual age.</p>
            <BodyAgeClientPage />
        </section>
    );
}
