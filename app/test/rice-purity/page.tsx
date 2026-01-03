import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Rice Purity Test 2026 - Updated Questions for Modern Life',
    description: 'Take the official 2026 Rice Purity Test with updated questions reflecting modern experiences. Find out your purity score and compare with others. A fun self-assessment quiz tradition since 1924.',
    keywords: ['rice purity test', 'purity test', 'rice purity test 2026', 'innocence test', 'purity score'],
    openGraph: {
        title: 'Rice Purity Test 2026 - Updated Questions for Modern Life',
        description: 'Take the official 2026 Rice Purity Test with updated questions reflecting modern experiences.',
        type: 'website',
        url: 'https://www.test-archive.com/test/rice-purity',
    },
};

export default function RicePurityEntryPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
            {/* Hero Section */}
            <section className="max-w-4xl mx-auto px-4 py-16 text-center">
                <div className="inline-block bg-pink-100 text-pink-700 px-4 py-1 rounded-full text-sm font-medium mb-6">
                    Updated for 2026
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Rice Purity Test
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    The classic innocence test, updated with 100 questions reflecting modern life experiences.
                    How pure are you? Find out in just 5 minutes.
                </p>
                <Link
                    href="/test/rice-purity/quiz"
                    className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl"
                >
                    Take the Test →
                </Link>
                <p className="text-sm text-gray-500 mt-4">
                    100 questions • ~5 minutes • Free
                </p>
            </section>

            {/* Quick Stats */}
            <section className="bg-white py-12 border-y border-gray-100">
                <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-8 text-center">
                    <div>
                        <div className="text-3xl font-bold text-pink-600">100</div>
                        <div className="text-gray-600">Questions</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-pink-600">1924</div>
                        <div className="text-gray-600">Origin Year</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-pink-600">63</div>
                        <div className="text-gray-600">Average Score</div>
                    </div>
                </div>
            </section>

            {/* What is Rice Purity Test */}
            <section className="max-w-4xl mx-auto px-4 py-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    What is the Rice Purity Test?
                </h2>
                <div className="prose prose-lg text-gray-600">
                    <p>
                        The Rice Purity Test is a self-assessment survey that originated at Rice University in Houston, Texas.
                        First created in 1924, it was designed as a way for incoming students to bond and track their experiences
                        throughout college.
                    </p>
                    <p className="mt-4">
                        The test consists of 100 yes-or-no questions about various life experiences, ranging from innocent
                        activities to more mature topics. Your final score (0-100) indicates your level of "purity,"
                        with higher scores meaning fewer experiences checked.
                    </p>
                </div>
            </section>

            {/* Score Ranges */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        Score Meanings
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="text-2xl font-bold text-green-600 mb-2">100-98</div>
                            <div className="font-medium text-gray-900">Pure as Snow</div>
                            <p className="text-gray-600 text-sm mt-1">You&apos;re incredibly innocent. Welcome to the internet!</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="text-2xl font-bold text-blue-600 mb-2">97-77</div>
                            <div className="font-medium text-gray-900">Average Joe</div>
                            <p className="text-gray-600 text-sm mt-1">Pretty standard. You&apos;ve had some experiences but nothing wild.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="text-2xl font-bold text-yellow-600 mb-2">76-45</div>
                            <div className="font-medium text-gray-900">Explorer</div>
                            <p className="text-gray-600 text-sm mt-1">You&apos;ve been around. Life has taught you things.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="text-2xl font-bold text-red-600 mb-2">44-0</div>
                            <div className="font-medium text-gray-900">Veteran</div>
                            <p className="text-gray-600 text-sm mt-1">You&apos;ve seen it all. Very few experiences remain unchecked.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-4xl mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Ready to find out your score?
                </h2>
                <p className="text-gray-600 mb-8">
                    Answer honestly for the most accurate result. Your answers are not stored.
                </p>
                <Link
                    href="/test/rice-purity/quiz"
                    className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
                >
                    Start the Test
                </Link>
            </section>

            {/* Disclaimer */}
            <section className="bg-gray-100 py-8">
                <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-500">
                    <p>
                        This test is for entertainment purposes only. It is not a clinical assessment
                        or a judgment of your character or moral standing. Contains mature themes.
                    </p>
                </div>
            </section>
        </main>
    );
}
