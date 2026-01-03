import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Average Rice Purity Test Scores by Age, Gender & Generation',
    description: 'See average Rice Purity Test scores broken down by age group, gender, and generation. Find out how your score compares to others.',
    openGraph: {
        title: 'Average Rice Purity Test Scores',
        description: 'How does your score compare? See averages by age, gender, and generation.',
    },
};

const ageData = [
    { age: '14-17', average: 85, label: 'High School' },
    { age: '18-21', average: 63, label: 'College Age' },
    { age: '22-25', average: 52, label: 'Post-College' },
    { age: '26-30', average: 45, label: 'Late 20s' },
    { age: '31-40', average: 38, label: '30s' },
    { age: '40+', average: 32, label: '40+' },
];

const generationData = [
    { gen: 'Gen Z (1997-2012)', average: 68, note: 'More open about experiences' },
    { gen: 'Millennials (1981-1996)', average: 55, note: 'College party era' },
    { gen: 'Gen X (1965-1980)', average: 48, note: 'The wild years' },
    { gen: 'Boomers (1946-1964)', average: 42, note: 'More life experiences' },
];

export default function AverageScoresPage() {
    return (
        <main className="min-h-screen bg-white">
            <section className="bg-gradient-to-b from-pink-50 to-white py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Average Rice Purity Test Scores
                    </h1>
                    <p className="text-lg text-gray-600">
                        The overall average score is <strong className="text-pink-600">63</strong>.
                        See how different groups compare.
                    </p>
                </div>
            </section>

            {/* Big Number */}
            <section className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-pink-50 rounded-2xl p-8 text-center">
                    <div className="text-6xl font-bold text-pink-600 mb-2">63</div>
                    <div className="text-xl text-gray-600">Overall Average Score</div>
                    <div className="text-gray-500 mt-2">Based on millions of test takers worldwide</div>
                </div>
            </section>

            {/* By Age */}
            <section className="max-w-4xl mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Average Score by Age</h2>
                <div className="space-y-4">
                    {ageData.map((item) => (
                        <div key={item.age} className="flex items-center gap-4">
                            <div className="w-24 text-gray-600">{item.age}</div>
                            <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                                <div
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full"
                                    style={{ width: `${item.average}%` }}
                                />
                                <div className="absolute inset-0 flex items-center justify-end pr-4">
                                    <span className="font-bold text-gray-900">{item.average}</span>
                                </div>
                            </div>
                            <div className="w-28 text-sm text-gray-500">{item.label}</div>
                        </div>
                    ))}
                </div>
                <p className="text-gray-500 text-sm mt-4">
                    * Scores tend to decrease with age as people accumulate more life experiences.
                </p>
            </section>

            {/* By Gender */}
            <section className="bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Average Score by Gender</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                            <div className="text-4xl mb-2">👨</div>
                            <div className="text-4xl font-bold text-blue-600">58</div>
                            <div className="text-gray-600">Male Average</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                            <div className="text-4xl mb-2">👩</div>
                            <div className="text-4xl font-bold text-pink-600">67</div>
                            <div className="text-gray-600">Female Average</div>
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm mt-4 text-center">
                        * Historical data suggests women tend to score slightly higher on average.
                    </p>
                </div>
            </section>

            {/* By Generation */}
            <section className="max-w-4xl mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Average Score by Generation</h2>
                <div className="grid gap-4">
                    {generationData.map((item) => (
                        <div key={item.gen} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                            <div>
                                <div className="font-semibold text-gray-900">{item.gen}</div>
                                <div className="text-sm text-gray-500">{item.note}</div>
                            </div>
                            <div className="text-3xl font-bold text-pink-600">{item.average}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-4 py-12 text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Where Do You Fall?</h2>
                <Link
                    href="/test/rice-purity/quiz"
                    className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-lg"
                >
                    Find Out Your Score
                </Link>
            </section>
        </main>
    );
}
