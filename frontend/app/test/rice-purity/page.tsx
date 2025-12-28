import { Metadata } from 'next';
import RicePurityClientPage from './RicePurityClientPage';

export const metadata: Metadata = {
    title: '2026 Rice Purity Test | Test Archive',
    description: 'The 2026 Gen Z Edition of the famous 100-question purity test. Digital sins, modern dating, and more.',
    openGraph: {
        title: '2026 Rice Purity Test - Gen Z Edition',
        description: 'The updated 2026 Gen Z Edition. Find out your purity archetype immediately.',
        images: ['/images/rice-purity-hero.png'],
    },
};

export default function Page() {
    return <RicePurityClientPage />;
}
