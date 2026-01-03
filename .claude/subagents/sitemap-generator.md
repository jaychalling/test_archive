# Sitemap Generator Subagent

> sitemap.ts 자동 생성 및 검증.

## 주요 역할

새 테스트 추가 시 `frontend/app/sitemap.ts`를 업데이트합니다.

---

## sitemap.ts 구조

```typescript
// frontend/app/sitemap.ts
import { MetadataRoute } from 'next';

const BASE_URL = 'https://test-archive.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const tests = [
    'rice-purity-test',
    'iq-test',
    'personality-test',
    // 새 테스트 추가
  ];

  const testUrls = tests.map((test) => ({
    url: `${BASE_URL}/${test}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...testUrls,
  ];
}
```

---

## 검증 체크리스트

- [ ] 새 테스트 ID가 tests 배열에 포함
- [ ] URL 형식 정확
- [ ] priority 설정 (테스트: 0.8, 홈: 1.0)
- [ ] changeFrequency 설정

---

## 업데이트 방법

```typescript
// 새 테스트 추가 시
const tests = [
  'rice-purity-test',
  'iq-test',
  'personality-test',
  'new-test-name', // ← 추가
];
```

---

## 출력 형식

```
┌─────────────────────────────────────────────────┐
│ SITEMAP UPDATE: rice-purity-test                │
├─────────────────────────────────────────────────┤
│ File: frontend/app/sitemap.ts                   │
│ Status: UPDATED ✅                               │
│                                                 │
│ Added:                                          │
│ • /rice-purity-test (priority: 0.8)             │
│                                                 │
│ Total URLs: 5                                   │
└─────────────────────────────────────────────────┘
```

---

## 스펙 참조

- [CLAUDE.md New Test Checklist](../../CLAUDE.md)
