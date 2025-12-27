import { Metadata } from 'next';
import RicePurityClientPage from './RicePurityClientPage';

export const metadata: Metadata = {
    title: 'Rice Purity Test | Test Archive',
    description: 'The original 100-question purity test. Are you a saint or a rebel? Check your innocence score now.',
    openGraph: {
        title: 'Rice Purity Test - What is your score?',
        description: 'The famous 100-question test. Find out your purity archetype immediately.',
        images: ['/images/rice-purity-hero.png'],
    },
};

export default function Page() {
    return <RicePurityClientPage />;
}
