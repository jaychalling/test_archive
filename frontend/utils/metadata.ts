import type { Metadata } from 'next';

type TestType = 'kpop-hunter' | 'diabetes' | 'body-age' | 'cognitive-brain';

interface MetadataConfig {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
    testType: TestType;
    baseTitle: string;
    description: string;
    // 결과가 있을 때 타이틀을 동적으로 생성하는 함수 (옵션)
    getResultTitle?: (res: string) => string;
}

export async function generateTestMetadata({
    searchParams,
    testType,
    baseTitle,
    description,
    getResultTitle
}: MetadataConfig): Promise<Metadata> {
    const resolvedSearchParams = await searchParams;
    const res = resolvedSearchParams.res as string;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.test-archive.com';

    let title = baseTitle;
    let isResult = false;

    if (res) {
        if (getResultTitle) {
            title = getResultTitle(res);
        } else {
            // 기본 결과 타이틀 (커스텀 로직이 없는 경우)
            title = `${baseTitle} Result`;
        }
        isResult = true;
    }

    const finalTitle = isResult ? `My Result: ${title}` : title;
    const ogImageUrl = res
        ? `${siteUrl}/api/og?type=${testType}&res=${res}`
        : `${siteUrl}/api/og?type=${testType}`;

    return {
        title: finalTitle,
        description: description,
        openGraph: {
            title: title, // OG 타이틀은 "My Result:" 접두어 없이 깔끔하게
            description: description,
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
