import type { Metadata } from 'next';
import GenderRoleClientPage from './GenderRoleClientPage';
// import { generateTestMetadata } from '@/utils/metadata'; // Assuming this might need update, simplified for now

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const resolvedParams = await searchParams;
    const hasResult = resolvedParams?.res;

    const title = hasResult
        ? "Check out my 2026 Gender Role Test Result!"
        : "2026 GENDER ROLE TEST | Test Archive";

    const description = "Analyze your Masculinity, Femininity, and Situational Flexibility based on modern psychology (GGDP Model).";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
            images: ['/gender-role-hero.png'],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['/gender-role-hero.png'],
        }
    };
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
            <GenderRoleClientPage />
        </section>
    );
}
