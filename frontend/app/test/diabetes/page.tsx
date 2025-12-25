import type { Metadata } from 'next';
import DiabetesClientPage from './DiabetesClientPage';

export const metadata: Metadata = {
    title: "Type 2 Diabetes Risk Test",
    description: "Assess your diabetes risk based on your dietary habits and lifestyle. Check it in just 3 minutes.",
    keywords: ["Diabetes", "Self-Diagnosis", "Health Test", "Type 2 Diabetes", "Health Checkup"],
    openGraph: {
        title: "Type 2 Diabetes Risk Test",
        description: "Assess your diabetes risk based on your dietary habits and lifestyle. Check it in just 3 minutes.",
        type: 'website',
    },
    alternates: {
        canonical: 'https://www.test-archive.com/test/diabetes',
    }
};

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

export default function Page() {
    return (
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <h1 className="sr-only">Type 2 Diabetes Risk Test</h1>
            <p className="sr-only">Assess your diabetes risk based on your dietary habits and lifestyle. Check it in just 3 minutes.</p>
            <DiabetesClientPage />
        </section>
    );
}
