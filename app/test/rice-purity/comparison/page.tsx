import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Rice Purity Test Score Comparison - Compare Your Results',
    description: 'Compare your Rice Purity Test score with friends, different age groups, and various demographics. See where you stand.',
    openGraph: {
        title: 'Rice Purity Test Score Comparison',
        description: 'Compare your score with friends and see where you stand.',
    },
};

const comparisonScenarios = [
    {
        title: 'College Freshmen',
        score: 78,
        description: 'First-year students typically have higher scores, still building experiences.',
    },
    {
        title: 'College Seniors',
        score: 54,
        description: 'Four years of college life tends to lower scores significantly.',
    },
    {
        title: 'Urban Dwellers',
        score: 55,
        description: 'City living often provides more opportunities for varied experiences.',
    },
    {
        title: 'Suburban/Rural',
        score: 68,
        description: 'Smaller communities tend to have slightly higher average scores.',
    },
    {
        title: 'Party-Goers',
        score: 42,
        description: 'Those who frequently attend parties score notably lower.',
    },
    {
        title: 'Homebodies',
        score: 82,
        description: 'People who prefer staying in maintain higher purity scores.',
    },
];

export default function ComparisonPage() {
    return (
        <main className="min-h-screen bg-white">
            <section className="bg-gradient-to-b from-pink-50 to-white py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Score Comparison
                    </h1>
                    <p className="text-lg text-gray-600">
                        See how different groups compare on the Rice Purity Test.
                    </p>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="max-w-4xl mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Score by Lifestyle</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-pink-50">
                                <th className="text-left p-4 font-semibold text-gray-900">Group</th>
                                <th className="text-center p-4 font-semibold text-gray-900">Avg Score</th>
                                <th className="text-left p-4 font-semibold text-gray-900">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonScenarios.map((scenario, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-4 font-medium text-gray-900">{scenario.title}</td>
                                    <td className="p-4 text-center">
                                        <span className="inline-block px-3 py-1 bg-pink-100 text-pink-700 rounded-full font-bold">
                                            {scenario.score}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-600">{scenario.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Before/After Comparison */}
            <section className="bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Before &amp; After College</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
                            <div className="text-gray-500 mb-2">Before College</div>
                            <div className="text-5xl font-bold text-green-600 mb-2">82</div>
                            <div className="text-gray-600">Average freshman score</div>
                        </div>
                        <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
                            <div className="text-gray-500 mb-2">After College</div>
                            <div className="text-5xl font-bold text-orange-600 mb-2">51</div>
                            <div className="text-gray-600">Average senior score</div>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <div className="inline-block bg-pink-100 px-6 py-3 rounded-full">
                            <span className="text-pink-700 font-bold">-31 points</span>
                            <span className="text-gray-600 ml-2">average drop during college</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Comparison Prompt */}
            <section className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-8 text-white text-center">
                    <h2 className="text-2xl font-bold mb-4">Compare With Friends</h2>
                    <p className="mb-6 opacity-90">
                        Take the test and share your score. See who among your friends is the most &quot;pure&quot;!
                    </p>
                    <Link
                        href="/test/rice-purity/quiz"
                        className="inline-block bg-white text-pink-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100"
                    >
                        Get Your Score
                    </Link>
                </div>
            </section>
        </main>
    );
}
