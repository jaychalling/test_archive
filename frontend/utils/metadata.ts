import type { Metadata } from 'next';

type TestType = 'kpop-hunter' | 'diabetes' | 'body-age' | 'cognitive-brain' | 'rice-purity' | 'gender-role' | 'iq-test' | 'money-script-2026';

interface MetadataConfig {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
    testType: TestType;
    baseTitle: string;
    description: string;
    // 결과가 있을 때 타이틀/설명을 동적으로 생성하는 함수 (옵션)
    getResultTitle?: (res: string) => string;
    getResultDescription?: (res: string) => string;
}

export async function generateTestMetadata({
    searchParams,
    testType,
    baseTitle,
    description,
    getResultTitle,
    getResultDescription
}: MetadataConfig): Promise<Metadata> {
    const resolvedSearchParams = await searchParams;
    const resParam = resolvedSearchParams.res as string;
    let res = resParam;
    if (resParam) {
        // More robust Base64 check: contains letters/numbers/+/= and no spaces
        if (/^[A-Za-z0-9+/]+={0,2}$/.test(resParam) && /[a-zA-Z]/.test(resParam)) {
            try {
                // Ensure it's not a hyphen-separated cognitive/body-age raw result
                if (!resParam.includes('-')) {
                    res = atob(resParam);
                }
            } catch {
                // ignore
            }
        }
    }

    const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
        || (process.env.NODE_ENV === 'production' ? 'https://www.test-archive.com' : (vercelUrl || 'http://localhost:3000'));

    let title = baseTitle;
    let finalDescription = description;
    let isResult = false;

    if (res) {
        if (getResultTitle) {
            title = getResultTitle(res);
        } else {
            title = `${baseTitle} Result`;
        }
        if (getResultDescription) {
            finalDescription = getResultDescription(res);
        }
        isResult = true;
    }

    const finalTitle = isResult ? `My Result: ${title}` : title;
    const ogImageUrl = resParam
        ? `${siteUrl}/api/og?type=${testType}&res=${encodeURIComponent(resParam)}`
        : `${siteUrl}/api/og?type=${testType}`;

    return {
        title: finalTitle,
        description: finalDescription,
        openGraph: {
            title: title,
            description: finalDescription,
            url: `${siteUrl}/test/${testType}`,
            siteName: 'Test Archive',
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: finalTitle,
                },
            ],
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            images: [ogImageUrl],
        },
        alternates: {
            canonical: `${siteUrl}/test/${testType}`,
        }
    };
}
