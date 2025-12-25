// Frontend API Utility

// Determine base URL based on environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

export interface TestInfo {
    id: string;
    title: string;
    description: string;
    category: string;
    duration: string;
    participants: string;
    isFeatured: boolean;
    image: string;
    icon?: string;
    isDisabled?: boolean;
}

export interface QuestionOption {
    label: string;
    score: number;
}

export interface Question {
    id: number;
    text: string;
    type: string;
    weight: number;
    options: QuestionOption[];
}

export interface TestDetails {
    info: TestInfo;
    questions: Question[];
}

export interface ResultData {
    result_title: string;
    result_desc: string;
    risk_level?: string;
}

export async function fetchTests(): Promise<TestInfo[]> {
    try {
        // Use relative path for Next.js to handle rewrites in Vercel
        // or full URL for local dev if backend is on a different port
        const url = typeof window === 'undefined' ? `${API_BASE_URL}/api/tests` : '/api/tests';

        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch tests');
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching tests:", error);
        return [];
    }
}

export async function fetchTestDetails(testId: string): Promise<TestDetails | null> {
    try {
        const url = typeof window === 'undefined' ? `${API_BASE_URL}/api/tests/${testId}` : `/api/tests/${testId}`;
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) {
            return null;
        }
        return res.json();
    } catch (error) {
        console.error(`Error fetching details for ${testId}:`, error);
        return null;
    }
}

export async function fetchResult(testId: string, score: number): Promise<ResultData | null> {
    try {
        const url = typeof window === 'undefined' ? `${API_BASE_URL}/api/result/${testId}?score=${score}` : `/api/result/${testId}?score=${score}`;
        const res = await fetch(url);
        if (!res.ok) {
            return null;
        }
        return res.json();
    } catch (error) {
        console.error(`Error fetching result for ${testId}:`, error);
        return null;
    }
}
