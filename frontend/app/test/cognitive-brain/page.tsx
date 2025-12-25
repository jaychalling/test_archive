import type { Metadata } from 'next';
import { generateTestMetadata } from '@/utils/metadata';
import QuizUI from './components/QuizUI';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
    return generateTestMetadata({
        searchParams,
        testType: 'cognitive-brain',
        baseTitle: "Cognitive Brain Test | 인지 기능 정밀 평가",
        description: "전두엽, 측두엽, 두정엽의 기능을 20가지 정밀 문항으로 분석하여 뇌 건강 나이를 측정합니다.",
        getResultTitle: (res) => `나의 뇌 건강 결과는?` // Detailed title logic handled in OG renderer mostly
    });
}

export default function Page() {
    return <QuizUI />;
}
