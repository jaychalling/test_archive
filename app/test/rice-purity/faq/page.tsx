import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Rice Purity Test FAQ - Frequently Asked Questions',
    description: 'Get answers to common questions about the Rice Purity Test. Learn about scoring, history, and what your results mean.',
    openGraph: {
        title: 'Rice Purity Test FAQ',
        description: 'Answers to all your questions about the Rice Purity Test.',
    },
};

const faqs = [
    {
        question: 'What is the Rice Purity Test?',
        answer: 'The Rice Purity Test is a 100-question self-assessment survey that originated at Rice University in 1924. It measures your level of "innocence" based on various life experiences. The higher your score, the more "pure" you are considered.',
    },
    {
        question: 'How is the score calculated?',
        answer: 'You start with 100 points. For each experience you\'ve had (each box you check), you lose 1 point. Your final score is 100 minus the number of experiences checked. So if you check 30 items, your score is 70.',
    },
    {
        question: 'What is a good Rice Purity score?',
        answer: 'There\'s no "good" or "bad" score - it simply reflects your life experiences. The average score is around 63. Scores above 85 are considered "innocent," while scores below 45 indicate many life experiences.',
    },
    {
        question: 'Is the Rice Purity Test anonymous?',
        answer: 'Yes, completely. Your answers are not stored anywhere. The test runs entirely in your browser and no data is saved or transmitted. You can take it privately without worry.',
    },
    {
        question: 'Can I retake the test?',
        answer: 'Yes, you can take the test as many times as you want. Some people retake it yearly to see how their score changes as they gain new experiences.',
    },
    {
        question: 'Why is it called "Rice Purity" Test?',
        answer: 'It\'s named after Rice University in Houston, Texas, where it was created in 1924. The "purity" refers to innocence or lack of certain life experiences.',
    },
    {
        question: 'Is the test appropriate for all ages?',
        answer: 'The test contains questions about mature topics including relationships, substances, and adult situations. It\'s generally intended for ages 18+, though many younger people take it.',
    },
    {
        question: 'Do my answers affect anyone else?',
        answer: 'No. The test is purely for self-reflection and entertainment. Your score doesn\'t impact anything or anyone else.',
    },
    {
        question: 'Why do scores decrease over time?',
        answer: 'As people age, they typically accumulate more life experiences. College students often see the biggest score drops as they encounter new social situations.',
    },
    {
        question: 'Can I compare my score with others?',
        answer: 'Yes! Many people share their scores with friends or on social media. It\'s a popular conversation starter and can be a fun bonding activity.',
    },
];

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-white">
            <section className="bg-gradient-to-b from-pink-50 to-white py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-gray-600">
                        Everything you need to know about the Rice Purity Test.
                    </p>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-4 py-12">
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4">
                                <h2 className="text-lg font-semibold text-gray-900 flex items-start gap-3">
                                    <span className="text-pink-600 font-bold">Q{index + 1}.</span>
                                    {faq.question}
                                </h2>
                            </div>
                            <div className="px-6 py-4">
                                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-pink-50 py-12">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
                    <p className="text-gray-600 mb-6">
                        The best way to understand the test is to take it yourself!
                    </p>
                    <Link
                        href="/test/rice-purity/quiz"
                        className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-lg"
                    >
                        Take the Test
                    </Link>
                </div>
            </section>
        </main>
    );
}
