import { Suspense } from 'react';
import { generateTestMetadata } from '@/utils/metadata';
import MoneyScriptClientPage from './MoneyScriptClientPage';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    return generateTestMetadata({
        searchParams,
        testType: 'money-script-2026',
        baseTitle: 'Money Script & 2026 Financial Psychology Test',
        description: 'Discover your unconscious beliefs about money and how they align with the 2026 "Red Horse" economy.',
    });
}

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MoneyScriptClientPage />
        </Suspense>
    );
}
