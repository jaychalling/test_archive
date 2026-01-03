import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'What Does My Rice Purity Score Mean? - Score Interpretation',
    description: 'Understand what your Rice Purity Test score really means. From 100 to 0, learn how to interpret your results and what they say about your experiences.',
    openGraph: {
        title: 'What Does My Rice Purity Score Mean?',
        description: 'Deep dive into interpreting your Rice Purity Test score.',
    },
};

const interpretations = [
    {
        range: '100-98',
        title: 'The Saint',
        interpretation: 'You\'ve lived an extremely sheltered life. This is rare and often indicates a very protected upbringing, strong religious background, or simply being very young. Nothing wrong with this - you have plenty of time to experience life at your own pace.',
        advice: 'Don\'t feel pressured to change. Your score reflects your journey, and everyone\'s path is different.',
    },
    {
        range: '97-85',
        title: 'The Innocent',
        interpretation: 'You\'ve had minimal exposure to risky or adult experiences. This is common among younger test-takers, those in strict households, or introverts. You may have focused more on academics or hobbies than social experimentation.',
        advice: 'You\'re curious enough to take this test, which shows openness. Explore at your own comfort level.',
    },
    {
        range: '84-65',
        title: 'The Average',
        interpretation: 'This is where most people fall. You\'ve had a relatively normal mix of experiences - some dating, maybe tried alcohol, been to parties. You\'re neither extremely sheltered nor extremely experienced.',
        advice: 'You\'re right in the middle, which is perfectly normal. Most of your peers are probably in this range too.',
    },
    {
        range: '64-45',
        title: 'The Experienced',
        interpretation: 'You\'ve been through quite a bit. College life, active social scene, or simply a more adventurous personality has led to many checked boxes. You likely have interesting stories to tell.',
        advice: 'Your experiences have shaped who you are. As long as you\'ve been safe and consensual, there\'s nothing to regret.',
    },
    {
        range: '44-20',
        title: 'The Veteran',
        interpretation: 'You\'ve seen and done a lot. Very few experiences on the test are unfamiliar to you. This often comes with age, an active party/social life, or a particularly eventful period of your life.',
        advice: 'Wisdom comes from experience. Use what you\'ve learned to help others navigate similar situations.',
    },
    {
        range: '19-0',
        title: 'The Legend',
        interpretation: 'You\'ve basically completed the test. Either you\'ve lived an exceptionally wild life, or you\'re exaggerating a bit. Either way, you\'ve got stories that could fill a book.',
        advice: 'If genuine, make sure you\'re staying safe. If not, consider what image you\'re projecting and why.',
    },
];

export default function WhatScoresMeanPage() {
    return (
        <main className="min-h-screen bg-white">
            <section className="bg-gradient-to-b from-pink-50 to-white py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        What Does My Score Mean?
                    </h1>
                    <p className="text-lg text-gray-600">
                        A deeper look at what your Rice Purity score says about your life experiences.
                    </p>
                </div>
            </section>

            {/* Important Note */}
            <section className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h2 className="font-bold text-yellow-800 mb-2">Important Reminder</h2>
                    <p className="text-yellow-700">
                        Your Rice Purity score is NOT a measure of your worth, morality, or character.
                        It simply reflects certain life experiences. A high score doesn&apos;t make you &quot;better,&quot;
                        and a low score doesn&apos;t make you &quot;worse.&quot; It&apos;s just a fun self-assessment.
                    </p>
                </div>
            </section>

            {/* Interpretations */}
            <section className="max-w-4xl mx-auto px-4 py-8">
                <div className="space-y-8">
                    {interpretations.map((item, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-4 text-white">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold">{item.title}</h2>
                                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                        Score: {item.range}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="mb-4">
                                    <h3 className="font-semibold text-gray-900 mb-2">Interpretation:</h3>
                                    <p className="text-gray-600">{item.interpretation}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-gray-900 mb-2">Advice:</h3>
                                    <p className="text-gray-600">{item.advice}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Myth vs Fact */}
            <section className="bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Misconceptions</h2>
                    <div className="space-y-4">
                        <div className="bg-white rounded-lg p-6 border border-gray-200">
                            <div className="flex gap-4">
                                <span className="text-red-500 font-bold">Myth:</span>
                                <span className="text-gray-600">&quot;A low score means you&apos;re a bad person.&quot;</span>
                            </div>
                            <div className="flex gap-4 mt-2">
                                <span className="text-green-500 font-bold">Fact:</span>
                                <span className="text-gray-600">Your score only reflects experiences, not character or morality.</span>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg p-6 border border-gray-200">
                            <div className="flex gap-4">
                                <span className="text-red-500 font-bold">Myth:</span>
                                <span className="text-gray-600">&quot;You should aim for a high/low score.&quot;</span>
                            </div>
                            <div className="flex gap-4 mt-2">
                                <span className="text-green-500 font-bold">Fact:</span>
                                <span className="text-gray-600">There&apos;s no target. Just answer honestly for an accurate self-assessment.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-4 py-12 text-center">
                <Link
                    href="/test/rice-purity/quiz"
                    className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-lg"
                >
                    Discover Your Score
                </Link>
            </section>
        </main>
    );
}
