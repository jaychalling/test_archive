import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.test-archive.com';

    // 테스트 목록 (rice-purity 제외 - 별도 클러스터)
    const tests = ['kpop-hunter', 'gender-role', 'diabetes', 'body-age', 'iq-test', 'money-script-2026', 'cognitive-brain'];

    const testUrls = tests.map((test) => ({
        url: `${baseUrl}/test/${test}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Rice Purity 클러스터 (SEO 구조)
    const ricePurityCluster = [
        { url: `${baseUrl}/test/rice-purity`, priority: 0.9 },           // Entry
        { url: `${baseUrl}/test/rice-purity/quiz`, priority: 0.8 },      // Quiz
        { url: `${baseUrl}/test/rice-purity/questions`, priority: 0.7 }, // Supporting
        { url: `${baseUrl}/test/rice-purity/scores`, priority: 0.7 },    // Depth
        { url: `${baseUrl}/test/rice-purity/history`, priority: 0.6 },   // Depth
        { url: `${baseUrl}/test/rice-purity/average-scores`, priority: 0.7 }, // Depth
        { url: `${baseUrl}/test/rice-purity/comparison`, priority: 0.6 }, // Depth
        { url: `${baseUrl}/test/rice-purity/faq`, priority: 0.7 },       // Depth
        { url: `${baseUrl}/test/rice-purity/what-scores-mean`, priority: 0.6 }, // Depth
        { url: `${baseUrl}/test/rice-purity/guide`, priority: 0.7 },     // Glue-SEO
    ].map((page) => ({
        ...page,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...testUrls,
        ...ricePurityCluster,
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.5,
        },
    ];
}
