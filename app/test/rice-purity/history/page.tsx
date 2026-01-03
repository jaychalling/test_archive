import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'History of the Rice Purity Test - From 1924 to Today',
    description: 'Learn about the origins of the Rice Purity Test at Rice University in 1924 and how it evolved into a viral internet phenomenon.',
    openGraph: {
        title: 'History of the Rice Purity Test',
        description: 'From Rice University 1924 to viral internet phenomenon.',
    },
};

const timeline = [
    { year: '1924', event: 'Rice Purity Test created at Rice University, Houston, Texas', detail: 'Originally designed for incoming freshmen to bond and track their college experiences.' },
    { year: '1930s-1980s', event: 'Test remains a Rice University tradition', detail: 'Passed down through generations of students, administered on paper.' },
    { year: '1990s', event: 'Test spreads to other universities', detail: 'Other colleges create their own versions, maintaining the core concept.' },
    { year: '2000s', event: 'Internet adoption begins', detail: 'The test moves online, allowing wider access beyond campus.' },
    { year: '2010s', event: 'Social media makes it viral', detail: 'Platforms like Facebook and Twitter turn it into a shareable phenomenon.' },
    { year: '2020s', event: 'TikTok and Gen Z revival', detail: 'New generation discovers the test, creating memes and challenges around scores.' },
    { year: '2024', event: '100th anniversary', detail: 'The Rice Purity Test celebrates a century of existence.' },
    { year: '2026', event: 'Updated questions for modern life', detail: 'New version includes questions about streaming, social media, and modern dating.' },
];

export default function HistoryPage() {
    return (
        <main className="min-h-screen bg-white">
            <section className="bg-gradient-to-b from-pink-50 to-white py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        History of the Rice Purity Test
                    </h1>
                    <p className="text-lg text-gray-600">
                        A 100-year journey from college tradition to internet phenomenon.
                    </p>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-pink-50 rounded-xl p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Origin</h2>
                        <p className="text-gray-600">
                            The Rice Purity Test was created at <strong>Rice University</strong> in Houston, Texas in 1924.
                            It was designed as a way for incoming freshmen to bond with each other and to track their
                            personal growth during their college years.
                        </p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Purpose</h2>
                        <p className="text-gray-600">
                            The test was never meant to judge or shame anyone. Its original purpose was to create
                            <strong> conversation starters</strong> and help students realize that everyone has different
                            life experiences.
                        </p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-8">Timeline</h2>
                <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-pink-200" />
                    <div className="space-y-8">
                        {timeline.map((item, index) => (
                            <div key={index} className="relative pl-12">
                                <div className="absolute left-2 top-1 w-5 h-5 bg-pink-500 rounded-full border-4 border-white" />
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                    <div className="text-pink-600 font-bold text-lg">{item.year}</div>
                                    <div className="font-semibold text-gray-900">{item.event}</div>
                                    <div className="text-gray-600 text-sm mt-1">{item.detail}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Fun Facts</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <span className="text-2xl">🎓</span>
                            <p className="mt-2 text-gray-600">Rice University is a private research university founded in 1912</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <span className="text-2xl">📝</span>
                            <p className="mt-2 text-gray-600">The original test was administered on paper during orientation week</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <span className="text-2xl">🌍</span>
                            <p className="mt-2 text-gray-600">Millions of people worldwide have now taken some version of the test</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <span className="text-2xl">📱</span>
                            <p className="mt-2 text-gray-600">The test went viral on TikTok in 2020, reaching a new generation</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-4 py-12 text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Be Part of History</h2>
                <Link
                    href="/test/rice-purity/quiz"
                    className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-lg"
                >
                    Take the 2026 Edition
                </Link>
            </section>
        </main>
    );
}
