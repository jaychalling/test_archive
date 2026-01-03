import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Rice Purity Test Questions Explained - All 100 Questions',
    description: 'Complete breakdown of all 100 Rice Purity Test questions. Understand what each question means, why it\'s asked, and how it affects your score.',
    openGraph: {
        title: 'Rice Purity Test Questions Explained - All 100 Questions',
        description: 'Complete breakdown of all 100 Rice Purity Test questions with explanations.',
        type: 'article',
    },
};

const questionCategories = [
    {
        id: 'social',
        title: 'Social & Dating',
        anchor: 'social-dating',
        description: 'Questions about relationships, dating, and social experiences.',
        questionRange: '1-20',
        examples: ['Held hands romantically', 'Been on a date', 'Been in a relationship'],
    },
    {
        id: 'romantic',
        title: 'Romantic & Physical',
        anchor: 'romantic-physical',
        description: 'Questions about romantic and physical intimacy levels.',
        questionRange: '21-40',
        examples: ['Kissed on the lips', 'French kissed', 'Cuddled overnight'],
    },
    {
        id: 'party',
        title: 'Party & Social Life',
        anchor: 'party-social',
        description: 'Questions about parties, social gatherings, and nightlife.',
        questionRange: '41-55',
        examples: ['Been to a party', 'Danced at a club', 'Played drinking games'],
    },
    {
        id: 'substances',
        title: 'Substances & Experimentation',
        anchor: 'substances',
        description: 'Questions about alcohol, tobacco, and other substances.',
        questionRange: '56-70',
        examples: ['Tried alcohol', 'Been drunk', 'Tried smoking'],
    },
    {
        id: 'rules',
        title: 'Rules & Authority',
        anchor: 'rules-authority',
        description: 'Questions about breaking rules, authority, and boundaries.',
        questionRange: '71-85',
        examples: ['Lied to parents', 'Skipped class', 'Been in trouble at school'],
    },
    {
        id: 'extreme',
        title: 'Extreme Experiences',
        anchor: 'extreme',
        description: 'Questions about more serious or extreme life experiences.',
        questionRange: '86-100',
        examples: ['Been arrested', 'Been to court', 'Done something illegal'],
    },
];

export default function QuestionsPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero */}
            <section className="bg-gradient-to-b from-pink-50 to-white py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Rice Purity Test Questions Explained
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        The Rice Purity Test contains 100 questions across 6 categories.
                        Each question you check reduces your score by 1 point.
                    </p>
                    <Link
                        href="/test/rice-purity/quiz"
                        className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg"
                    >
                        Take the Test
                    </Link>
                </div>
            </section>

            {/* Anchor Navigation */}
            <nav className="sticky top-0 bg-white border-b border-gray-200 py-4 z-10">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex flex-wrap gap-2">
                        {questionCategories.map((cat) => (
                            <a
                                key={cat.id}
                                href={`#${cat.anchor}`}
                                className="px-3 py-1 text-sm bg-gray-100 hover:bg-pink-100 text-gray-700 hover:text-pink-700 rounded-full transition-colors"
                            >
                                {cat.title}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Question Categories */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                {questionCategories.map((category, index) => (
                    <section
                        key={category.id}
                        id={category.anchor}
                        className="mb-16 scroll-mt-20"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-4xl font-bold text-pink-200">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {category.title}
                                </h2>
                                <p className="text-gray-500">
                                    Questions {category.questionRange}
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-600 mb-6">
                            {category.description}
                        </p>

                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="font-semibold text-gray-900 mb-3">Example Questions:</h3>
                            <ul className="space-y-2">
                                {category.examples.map((example, i) => (
                                    <li key={i} className="flex items-center gap-2 text-gray-600">
                                        <span className="w-2 h-2 bg-pink-400 rounded-full" />
                                        {example}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-4">
                            <Link
                                href="/test/rice-purity/scores"
                                className="text-pink-600 hover:text-pink-700 text-sm font-medium"
                            >
                                See how these questions affect your score →
                            </Link>
                        </div>
                    </section>
                ))}
            </div>

            {/* CTA */}
            <section className="bg-pink-50 py-12">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Ready to take the test?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Answer all 100 questions honestly to get your purity score.
                    </p>
                    <Link
                        href="/test/rice-purity/quiz"
                        className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-lg"
                    >
                        Start the Test
                    </Link>
                </div>
            </section>
        </main>
    );
}
