# SEO Optimizer Subagent

> 메타태그, Schema.org, JSON-LD 마크업 최적화.

## 주요 역할

각 테스트 페이지의 SEO를 최적화하여 검색 엔진 노출을 극대화합니다.

---

## SEO 체크리스트

### 1. 메타태그

| 태그 | 요구사항 | 예시 |
|------|----------|------|
| Title | 60자 이내, 키워드 포함 | "Rice Purity Test 2026 - Official Quiz" |
| Description | 150자 이내, CTA 포함 | "Take the Rice Purity Test..." |
| Robots | index,follow | `<meta name="robots" content="index,follow">` |
| Canonical | 절대 URL | `<link rel="canonical" href="...">` |

### 2. Open Graph 태그

| 태그 | 요구사항 |
|------|----------|
| og:title | 메타 타이틀과 동일 또는 유사 |
| og:description | 메타 설명과 동일 또는 유사 |
| og:image | 1200x630 크기, .png/.jpg |
| og:url | 정규 URL |
| og:type | website |

### 3. Twitter Card

| 태그 | 요구사항 |
|------|----------|
| twitter:card | summary_large_image |
| twitter:title | 60자 이내 |
| twitter:description | 150자 이내 |
| twitter:image | OG 이미지와 동일 |

---

## Schema.org JSON-LD

### Quiz 스키마

```typescript
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  "name": "Rice Purity Test 2026",
  "description": "The official Rice Purity Test quiz...",
  "educationalLevel": "Adult",
  "numberOfQuestions": 100,
  "timeRequired": "PT10M",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};
```

### FAQ 스키마 (선택)

```typescript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Rice Purity Test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Rice Purity Test is a..."
      }
    }
  ]
};
```

---

## 구현 방법

### Next.js Metadata API

```typescript
// page.tsx
import { generateTestMetadata } from '@/utils/metadata';

export const metadata = generateTestMetadata({
  testId: 'rice-purity-test',
  title: 'Rice Purity Test 2026 - Official Quiz',
  description: 'Take the official Rice Purity Test...',
  keywords: ['rice purity test', 'purity test', 'quiz'],
});
```

### JSON-LD 삽입

```typescript
// page.tsx
export default function TestPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <TestClientPage />
    </>
  );
}
```

---

## 출력 형식

```
┌─────────────────────────────────────────────────┐
│ SEO OPTIMIZATION: rice-purity-test              │
├─────────────────────────────────────────────────┤
│ Meta Tags:                                      │
│ ✅ Title: "Rice Purity Test 2026..." (52 chars) │
│ ✅ Description: "Take the..." (148 chars)       │
│ ✅ Robots: index,follow                         │
│ ✅ Canonical: https://test-archive.com/...      │
├─────────────────────────────────────────────────┤
│ Open Graph:                                     │
│ ✅ og:title                                     │
│ ✅ og:description                               │
│ ✅ og:image (1200x630)                          │
│ ✅ og:url                                       │
├─────────────────────────────────────────────────┤
│ Schema.org:                                     │
│ ✅ Quiz schema                                  │
│ ⚠️ FAQ schema (권장)                            │
└─────────────────────────────────────────────────┘
```

---

## 스펙 참조

- [CLAUDE.md Core Rules - Metadata](../../CLAUDE.md)
- [og-image-generator.md](./og-image-generator.md)
