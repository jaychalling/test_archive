# Performance Specification

> Core Web Vitals 목표 및 최적화 가이드.

## 성능 목표

| 지표 | 목표 | Good | Needs Improvement | Poor |
|------|------|------|-------------------|------|
| **LCP** | < 2.5s | ≤ 2.5s | 2.5s - 4.0s | > 4.0s |
| **CLS** | < 0.1 | ≤ 0.1 | 0.1 - 0.25 | > 0.25 |
| **INP** | < 200ms | ≤ 200ms | 200ms - 500ms | > 500ms |
| **Lighthouse** | 90+ | 90-100 | 50-89 | < 50 |

---

## LCP (Largest Contentful Paint) 최적화

### 목표
< 2.5초

### 주요 요소
- 히어로 이미지
- 제목 텍스트
- 큰 블록 요소

### 최적화 전략

1. **이미지 최적화**
```typescript
// Good
<Image
  src="/hero.png"
  priority  // LCP 요소에 필수
  sizes="(max-width: 768px) 100vw, 1200px"
/>
```

2. **폰트 최적화**
```typescript
// next/font 사용
import { Inter } from 'next/font/google';
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});
```

3. **서버 컴포넌트 활용**
- page.tsx를 서버 컴포넌트로 유지
- 클라이언트 컴포넌트 최소화

---

## CLS (Cumulative Layout Shift) 최적화

### 목표
< 0.1

### 주요 원인
- 이미지 크기 미지정
- 동적 콘텐츠 삽입
- 폰트 로딩

### 최적화 전략

1. **이미지 크기 명시**
```typescript
// Good
<Image src="/img.png" width={300} height={200} />

// Bad
<img src="/img.png" />
```

2. **플레이스홀더 사용**
```typescript
{loading ? <Skeleton className="h-48 w-full" /> : <Content />}
```

3. **폰트 display: swap**
```typescript
const font = Inter({
  display: 'swap',  // 폰트 로딩 중 fallback 표시
});
```

---

## INP (Interaction to Next Paint) 최적화

### 목표
< 200ms

### 주요 원인
- 무거운 이벤트 핸들러
- 메인 스레드 블로킹
- 복잡한 상태 업데이트

### 최적화 전략

1. **이벤트 핸들러 최적화**
```typescript
// Good - useCallback으로 메모이제이션
const handleClick = useCallback(() => {
  // 가벼운 작업
}, []);

// Bad - 매 렌더링마다 새 함수 생성
const handleClick = () => { ... };
```

2. **무거운 작업 분리**
```typescript
const handleSubmit = async () => {
  // UI 업데이트 먼저
  setLoading(true);

  // 무거운 작업은 다음 틱에
  await new Promise(r => setTimeout(r, 0));
  await heavyCalculation();
};
```

3. **React 최적화**
```typescript
// React.memo로 불필요한 리렌더링 방지
const MemoizedComponent = React.memo(Component);

// useMemo로 계산 결과 캐싱
const result = useMemo(() => calculate(data), [data]);
```

---

## Framer Motion 최적화

### GPU 가속 속성만 사용

```typescript
// Good - GPU 가속
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// Bad - 레이아웃 변경
const badAnimation = {
  initial: { width: 0, height: 0 },
  animate: { width: 100, height: 100 },
};
```

### will-change 최소화

```typescript
// 애니메이션 완료 후 will-change 제거
<motion.div
  animate={{ opacity: 1 }}
  onAnimationComplete={() => {
    // will-change 자동 제거됨
  }}
/>
```

### layout 애니메이션 주의

```typescript
// layout 애니메이션은 리플로우 발생
// 꼭 필요한 경우에만 사용
<motion.div layout>
  {/* 레이아웃 변경 시에만 */}
</motion.div>
```

---

## 측정 방법

### Lighthouse

```bash
# Chrome DevTools
F12 → Lighthouse 탭 → Analyze page load

# CLI
npx lighthouse http://localhost:3000/test --output=html
```

### Web Vitals

```typescript
import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric);
    // { name: 'LCP', value: 2100, rating: 'good' }
  });
}
```

---

## 번들 사이즈 분석

```bash
# 번들 분석
npm install @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

# 실행
ANALYZE=true npm run build
```

---

## 체크리스트

### 이미지

- [ ] `next/image` 사용
- [ ] 히어로에 `priority` 속성
- [ ] 적절한 `sizes` 설정
- [ ] lazy loading (히어로 제외)

### 폰트

- [ ] `next/font` 사용
- [ ] 서브셋팅 적용
- [ ] `display: swap`

### 컴포넌트

- [ ] 무거운 컴포넌트 lazy loading
- [ ] React.memo 적용
- [ ] useMemo/useCallback 적절히 사용

### 애니메이션

- [ ] `transform`, `opacity`만 사용
- [ ] `will-change` 최소화
- [ ] `layout` 신중히 사용
