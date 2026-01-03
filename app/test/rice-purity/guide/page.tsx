import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Complete Rice Purity Test Guide - Everything You Need to Know',
    description: 'The ultimate guide to the Rice Purity Test. Learn about the test, understand scores, see statistics, and find answers to all your questions.',
    openGraph: {
        title: 'Complete Rice Purity Test Guide',
        description: 'Everything you need to know about the Rice Purity Test in one place.',
    },
};

const resources = [
    {
        title: 'Take the Test',
        description: 'Answer 100 questions to get your purity score',
        href: '/test/rice-purity/quiz',
        icon: '📝',
        primary: true,
    },
    {
        title: 'Score Meanings',
        description: 'Understand what each score range means',
        href: '/test/rice-purity/scores',
        icon: '📊',
    },
    {
        title: 'Average Scores',
        description: 'See how you compare to others',
        href: '/test/rice-purity/average-scores',
        icon: '📈',
    },
    {
        title: 'Test History',
        description: 'Learn about the 100-year history',
        href: '/test/rice-purity/history',
        icon: '📚',
    },
    {
        title: 'Compare Scores',
        description: 'Compare across demographics',
        href: '/test/rice-purity/comparison',
        icon: '⚖️',
    },
    {
        title: 'FAQ',
        description: 'Common questions answered',
        href: '/test/rice-purity/faq',
        icon: '❓',
    },
    {
        title: 'Score Interpretation',
        description: 'Deep dive into what scores mean',
        href: '/test/rice-purity/what-scores-mean',
        icon: '🔍',
    },
    {
        title: 'All Questions',
        description: 'Browse all 100 questions by category',
        href: '/test/rice-purity/questions',
        icon: '📋',
    },
];

export default function GuidePage() {
    return (
        <main className="min-h-screen bg-white">
            <section className="bg-gradient-to-b from-pink-50 to-white py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Complete Rice Purity Test Guide
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Everything you need to know about the Rice Purity Test, all in one place.
                        From taking the test to understanding your score.
                    </p>
                </div>
            </section>

            {/* Quick Start */}
            <section className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-8 text-white text-center">
                    <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="mb-6 opacity-90">
                        Take the official 2026 Rice Purity Test and discover your score in just 5 minutes.
                    </p>
                    <Link
                        href="/test/rice-purity/quiz"
                        className="inline-block bg-white text-pink-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100"
                    >
                        Start the Test →
                    </Link>
                </div>
            </section>

            {/* All Resources */}
            <section className="max-w-4xl mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                    Explore All Resources
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {resources.map((resource) => (
                        <Link
                            key={resource.href}
                            href={resource.href}
                            className={`block p-6 rounded-xl border transition-all hover:shadow-lg ${
                                resource.primary
                                    ? 'bg-pink-50 border-pink-200 hover:border-pink-300'
                                    : 'bg-white border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            <div className="flex items-start gap-4">
                                <span className="text-3xl">{resource.icon}</span>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                                    <p className="text-gray-600 text-sm mt-1">{resource.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Quick Facts */}
            <section className="bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Quick Facts</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-3xl font-bold text-pink-600">100</div>
                            <div className="text-gray-600">Questions</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-pink-600">1924</div>
                            <div className="text-gray-600">Year Created</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-pink-600">63</div>
                            <div className="text-gray-600">Average Score</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-pink-600">5 min</div>
                            <div className="text-gray-600">To Complete</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Data Sources */}
            <section className="max-w-4xl mx-auto px-4 py-12">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Data Sources</h2>
                <div className="text-sm text-gray-600 space-y-2">
                    <p>• Rice University Archives - Historical information about the test origin</p>
                    <p>• Aggregated anonymous test data - Statistical averages and distributions</p>
                    <p>• Academic research on generational differences in behavior</p>
                </div>
                <div className="mt-6 text-sm text-gray-500">
                    <strong>Last Updated:</strong> January 2026
                </div>
            </section>
        </main>
    );
}
