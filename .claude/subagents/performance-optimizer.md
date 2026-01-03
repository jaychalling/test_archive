# Performance Optimizer Subagent

> Core Web Vitals 최적화 및 Lighthouse 점수 향상 전문.

## 성능 목표

| 지표 | 목표 | 측정 방법 |
|------|------|-----------|
| **Lighthouse Performance** | 90점 이상 | Chrome DevTools |
| **LCP** (Largest Contentful Paint) | < 2.5초 | Web Vitals |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Web Vitals |
| **INP** (Interaction to Next Paint) | < 200ms | Web Vitals |

---

## 최적화 체크리스트

### 1. 이미지 최적화

- [ ] `next/image` 컴포넌트 사용
- [ ] 히어로 이미지에 `priority` 속성 적용
- [ ] 적절한 `sizes` 속성 설정
- [ ] WebP/AVIF 자동 변환 활용
- [ ] Lazy loading 적용 (히어로 제외)

```typescript
// Good
import Image from 'next/image';

<Image
  src="/hero.png"
  alt="Hero"
  width={1200}
  height={630}
  priority // LCP 최적화
  sizes="(max-width: 768px) 100vw, 1200px"
/>

// Bad
<img src="/hero.png" alt="Hero" />
```

### 2. 폰트 최적화

- [ ] `next/font` 사용
- [ ] 폰트 서브셋팅 적용
- [ ] Critical 폰트만 preload
- [ ] `display: swap` 설정

```typescript
// Good
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Bad
<link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet" />
```

### 3. Framer Motion 최적화

- [ ] `transform`, `opacity`만 사용하는 애니메이션
- [ ] `will-change` 최소화
- [ ] `layout` 애니메이션 신중히 사용
- [ ] 복잡한 애니메이션은 `layoutId` 활용

```typescript
// Good - GPU 가속 속성만 사용
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// Bad - 레이아웃 변경 유발
const badAnimation = {
  initial: { width: 0, height: 0 },
  animate: { width: 100, height: 100 },
};
```

### 4. 컴포넌트 최적화

- [ ] `next/dynamic`으로 lazy loading
- [ ] React.memo로 불필요한 리렌더링 방지
- [ ] useMemo/useCallback 적절히 사용
- [ ] 번들 사이즈 분석

```typescript
// 무거운 컴포넌트 lazy loading
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false,
});
```

### 5. CSS 최적화

- [ ] Critical CSS 인라인
- [ ] 미사용 CSS 제거
- [ ] Tailwind CSS purge 설정 확인

---

## 측정 방법

### Lighthouse 실행

```bash
# Chrome DevTools에서
1. F12 → Lighthouse 탭
2. "Analyze page load" 클릭
3. Performance 점수 확인

# CLI로 실행
npx lighthouse http://localhost:3000/rice-purity-test --output=html
```

### Web Vitals 측정

```typescript
// 개발 중 측정
import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric);
    // { name: 'LCP', value: 2100, rating: 'good' }
  });
}
```

---

## 문제 해결 가이드

### LCP > 2.5s

**원인 분석**:
1. 히어로 이미지 크기가 큼
2. 폰트 로딩 지연
3. 서버 응답 시간 느림

**해결 방법**:
```typescript
// 1. 이미지 priority 추가
<Image src="/hero.png" priority />

// 2. 폰트 preload
const font = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

// 3. 서버 컴포넌트 활용
// page.tsx를 서버 컴포넌트로 유지
```

### CLS > 0.1

**원인 분석**:
1. 이미지 크기 미지정
2. 동적 콘텐츠 삽입
3. 폰트 로딩으로 레이아웃 변경

**해결 방법**:
```typescript
// 1. 이미지에 width/height 명시
<Image src="/img.png" width={300} height={200} />

// 2. 플레이스홀더 사용
{loading ? <Skeleton className="h-48" /> : <Content />}

// 3. 폰트 display: swap
```

### INP > 200ms

**원인 분석**:
1. 무거운 이벤트 핸들러
2. 메인 스레드 블로킹
3. 복잡한 상태 업데이트

**해결 방법**:
```typescript
// 1. 이벤트 핸들러 최적화
const handleClick = useCallback(() => {
  // 가벼운 작업만
}, []);

// 2. 무거운 작업 분리
const handleSubmit = async () => {
  // UI 업데이트 먼저
  setLoading(true);

  // 무거운 작업은 다음 틱에
  await new Promise(r => setTimeout(r, 0));
  await heavyCalculation();
};
```

---

## 출력 형식

### 분석 결과

```
┌─────────────────────────────────────────────────┐
│ PERFORMANCE ANALYSIS: rice-purity-test          │
├─────────────────────────────────────────────────┤
│ Lighthouse Performance: 87 ⚠️ (목표: 90+)       │
│ LCP: 2.8s ⚠️ (목표: < 2.5s)                      │
│ CLS: 0.05 ✅ (목표: < 0.1)                       │
│ INP: 150ms ✅ (목표: < 200ms)                    │
├─────────────────────────────────────────────────┤
│ 문제 발견: 2개                                   │
│ 1. 히어로 이미지 priority 누락                   │
│ 2. 폰트 로딩 최적화 필요                         │
└─────────────────────────────────────────────────┘
```

### 최적화 적용 후

```
┌─────────────────────────────────────────────────┐
│ PERFORMANCE OPTIMIZATION COMPLETE               │
├─────────────────────────────────────────────────┤
│ Before → After                                  │
│ ───────────────────────────────────────────────│
│ Lighthouse:  87 → 93 (+6) ✅                    │
│ LCP:        2.8s → 2.1s (-0.7s) ✅              │
│ CLS:        0.05 → 0.03 ✅                      │
│ INP:        150ms → 120ms ✅                    │
├─────────────────────────────────────────────────┤
│ 적용된 최적화:                                   │
│ ✅ 히어로 이미지 priority 추가                   │
│ ✅ next/font로 폰트 최적화                       │
│ ✅ 불필요한 CSS 제거                             │
└─────────────────────────────────────────────────┘
```

---

## 사용법

```bash
# 성능 분석
rice-purity-test 성능 분석해줘

# 최적화 적용
Lighthouse 90 이상 나오게 최적화해줘

# 특정 지표 개선
LCP 2.5초 이하로 줄여줘
```

---

## 스펙 참조

- [performance-spec.md](../specs/performance-spec.md)
- [CLAUDE.md Performance Goals](../../CLAUDE.md)
