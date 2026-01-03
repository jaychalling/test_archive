import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Rice Purity Test Score Ranges & Meanings - Complete Guide',
    description: 'Understand what your Rice Purity Test score means. From 100 (pure) to 0 (experienced), learn the meaning behind each score range.',
    openGraph: {
        title: 'Rice Purity Test Score Ranges & Meanings',
        description: 'Complete guide to understanding your Rice Purity Test score.',
    },
};

const scoreRanges = [
    {
        range: '100-98',
        title: 'Pure as Snow',
        emoji: '😇',
        color: 'green',
        description: 'You are incredibly innocent and have experienced very few of the activities on the test.',
        traits: ['Very sheltered upbringing', 'Limited social experiences', 'Traditional values'],
        percentage: '~2%',
    },
    {
        range: '97-94',
        title: 'Very Innocent',
        emoji: '🌸',
        color: 'emerald',
        description: 'You have had minimal exposure to risky or adult experiences.',
        traits: ['Conservative lifestyle', 'Rule follower', 'Close family ties'],
        percentage: '~5%',
    },
    {
        range: '93-77',
        title: 'Average',
        emoji: '😊',
        color: 'blue',
        description: 'This is where most people fall. You have had some experiences but nothing extreme.',
        traits: ['Normal social life', 'Some dating experience', 'Tried some things'],
        percentage: '~45%',
    },
    {
        range: '76-45',
        title: 'Experienced',
        emoji: '😎',
        color: 'yellow',
        description: 'You have had a fair amount of life experiences and are more adventurous than average.',
        traits: ['Active social life', 'Experimented', 'Lived a little'],
        percentage: '~35%',
    },
    {
        range: '44-9',
        title: 'Very Experienced',
        emoji: '🔥',
        color: 'orange',
        description: 'You have done most things on the test. Very few experiences remain unchecked.',
        traits: ['Wild past', 'Many stories to tell', 'Seen a lot'],
        percentage: '~10%',
    },
    {
        range: '8-0',
        title: 'Veteran',
        emoji: '👹',
        color: 'red',
        description: 'You have checked almost everything. You have lived life to the extreme.',
        traits: ['Nothing left unchecked', 'Extreme experiences', 'Legendary status'],
        percentage: '~3%',
    },
];

export default function ScoresPage() {
    return (
        <main className="min-h-screen bg-white">
            <section className="bg-gradient-to-b from-pink-50 to-white py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Rice Purity Test Score Meanings
                    </h1>
                    <p className="text-lg text-gray-600">
                        Your score ranges from 0-100. The higher your score, the more &quot;pure&quot; you are.
                    </p>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-4 py-12">
                <div className="space-y-8">
                    {scoreRanges.map((range) => (
                        <div
                            key={range.range}
                            className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <span className="text-4xl">{range.emoji}</span>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">{range.title}</h2>
                                        <p className="text-gray-500">Score: {range.range}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-pink-600">{range.percentage}</div>
                                    <div className="text-sm text-gray-500">of people</div>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">{range.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {range.traits.map((trait) => (
                                    <span
                                        key={trait}
                                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                    >
                                        {trait}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">How Scoring Works</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="text-3xl font-bold text-pink-600 mb-2">100</div>
                            <div className="text-gray-600">Start with 100 points</div>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="text-3xl font-bold text-pink-600 mb-2">-1</div>
                            <div className="text-gray-600">Lose 1 point per checked item</div>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <div className="text-3xl font-bold text-pink-600 mb-2">= Score</div>
                            <div className="text-gray-600">Your final purity score</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-4 py-12 text-center">
                <Link
                    href="/test/rice-purity/quiz"
                    className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-lg"
                >
                    Take the Test Now
                </Link>
            </section>
        </main>
    );
}
