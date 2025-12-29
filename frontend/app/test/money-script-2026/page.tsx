import { Suspense } from 'react';
import { generateTestMetadata } from '@/utils/metadata';
// Client component import
import MoneyScriptClientPage from './MoneyScriptClientPage';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    return generateTestMetadata({
        searchParams,
        testType: 'money-script-2026',
        baseTitle: 'Money Script & 2026 Financial Psychology Test',
        description: "This test analyzes financial behavioral patterns for self-reflection. It is not financial advice or a guarantee of future economic outcomes. Use these insights as a starting point for better money management.",
    });
}

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MoneyScriptClientPage />
        </Suspense>
    );
}
