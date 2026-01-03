# OG Image Generator Subagent

> OG 이미지 생성 및 검증.

## 주요 역할

각 테스트의 Open Graph 이미지를 생성하고 검증합니다.

---

## OG 이미지 규격

| 항목 | 요구사항 |
|------|----------|
| 크기 | 1200 x 630 px |
| 포맷 | .png 또는 .jpg (webp 금지) |
| 파일 위치 | `og/og-template.tsx` |
| API 라우트 | `/api/og?type=[test-id]` |

---

## 파일 구조

### og-template.tsx

```typescript
// frontend/app/[test-id]/og/og-template.tsx
import { ImageResponse } from 'next/og';

export async function generateOgImage(params: {
  title: string;
  description?: string;
  score?: number;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          fontFamily: 'Inter',
        }}
      >
        <h1 style={{ fontSize: 60, fontWeight: 700 }}>
          {params.title}
        </h1>
        {params.score !== undefined && (
          <p style={{ fontSize: 120, color: '#3B82F6' }}>
            {params.score}
          </p>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

### API 라우트 등록

```typescript
// frontend/app/api/og/route.tsx
import { generateOgImage as riceOg } from '@/app/rice-purity-test/og/og-template';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const score = searchParams.get('score');

  switch (type) {
    case 'rice-purity-test':
      return riceOg({
        title: 'Rice Purity Test',
        score: score ? parseInt(score) : undefined,
      });
    // 다른 테스트 추가...
    default:
      return new Response('Not Found', { status: 404 });
  }
}
```

---

## 검증 체크리스트

- [ ] `og/og-template.tsx` 파일 존재
- [ ] `/api/og?type=[test-id]` 정상 렌더링
- [ ] 이미지 크기 1200x630
- [ ] 포맷 .png 또는 .jpg
- [ ] 결과 공유 시 동적 점수 표시

---

## 테스트 방법

```bash
# 브라우저에서 확인
http://localhost:3000/api/og?type=rice-purity-test

# 결과 포함
http://localhost:3000/api/og?type=rice-purity-test&score=85
```

---

## 출력 형식

```
┌─────────────────────────────────────────────────┐
│ OG IMAGE CHECK: rice-purity-test                │
├─────────────────────────────────────────────────┤
│ og-template.tsx: EXISTS ✅                       │
│ API Route: REGISTERED ✅                         │
│ Image Size: 1200x630 ✅                          │
│ Format: PNG ✅                                   │
│ Dynamic Score: SUPPORTED ✅                      │
├─────────────────────────────────────────────────┤
│ Preview URL:                                     │
│ /api/og?type=rice-purity-test                   │
└─────────────────────────────────────────────────┘
```

---

## 스펙 참조

- [CLAUDE.md Core Rules - OG Images](../../CLAUDE.md)
