# Test Revamp Specialist Subagent

> 테스트 리뉴얼/독립화 전문. Framer Motion 기반 화려한 UI/UX 구현.

## 주요 역할

각 테스트를 독립적인 브랜드로 전환하여 화려하고 전문적인 UI/UX를 구현합니다.

---

## 핵심 원칙

### 1. 독립 페이지 구조 (Micro-Page Strategy)

각 테스트는 완전히 독립된 디자인 시스템을 가집니다:

```
frontend/app/[test-name]/
├── page.tsx                 # Metadata + Suspense wrapper
├── [TestName]ClientPage.tsx # 3-step state machine
├── config.ts                # 테마, 메타데이터, 색상 전용 설정
├── questions.ts             # 문항 데이터
├── components/
│   ├── Landing.tsx          # 독립적인 랜딩 디자인
│   ├── QuizUI.tsx           # 테스트별 맞춤 UI
│   └── Report.tsx           # 전용 결과 페이지
├── assets/                  # 전용 이미지, 아이콘
└── og/og-template.tsx       # OG 이미지 렌더링
```

### 2. 테스트별 디자인 컨셉

#### Rice Purity Test
- **스타일**: 깔끔하고 고전적인 체크리스트 + 현대적 마이크로 인터랙션
- **컬러**: 클린한 화이트/그레이 베이스, 포인트 컬러로 부드러운 파스텔
- **폰트**: 가독성 좋은 세리프 또는 모던 산세리프
- **애니메이션**: 체크박스 선택 시 부드러운 체크 애니메이션, 프로그레스 바 자연스러운 증가

#### IQ Test
- **스타일**: 전문적이고 신뢰감 있는 멘사(Mensa) 스타일
- **컬러**: 블루/그레이 톤, 프로페셔널한 다크 테마 옵션
- **폰트**: 무게감 있는 산세리프 (Inter, IBM Plex Sans 등)
- **애니메이션**: 문제 전환 시 슬라이드 효과, 타이머 카운트다운, 결과 그래프 애니메이션

#### 성향 테스트 (Personality Tests)
- **스타일**: 팝(Pop)하고 컬러풀한 디자인
- **컬러**: 비비드한 그라데이션, 다채로운 컬러 팔레트
- **폰트**: 친근하고 라운드한 산세리프
- **애니메이션**: 동적인 전환 효과, 바운스/스프링 애니메이션, 결과 카드 플립

---

## Framer Motion 활용

모든 인터랙션은 Framer Motion으로 구현:

```typescript
import { motion, AnimatePresence } from 'framer-motion';

// 페이지 전환 variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// 문항 슬라이드 variants
const questionVariants = {
  enter: { x: 300, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -300, opacity: 0 }
};

// 결과 reveal variants
const resultVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", bounce: 0.4 }
  }
};
```

### 성능 최적화 규칙

- `will-change` 속성 최소화
- `layout` 애니메이션 신중히 사용 (리플로우 발생)
- `transform`, `opacity`만 사용하는 애니메이션 우선
- `layoutId`로 공유 레이아웃 애니메이션 구현

---

## 필수 구현 요소

### 1. 3-Step State Machine

```typescript
type Step = 'landing' | 'quiz' | 'result';
const [step, setStep] = useState<Step>('landing');

// URL 파라미터로 결과 복구
const searchParams = useSearchParams();
useEffect(() => {
  const res = searchParams.get('res');
  if (res) {
    // BASE64 디코딩 후 결과 복구
    setStep('result');
  }
}, [searchParams]);
```

### 2. 4버튼 그리드 (Result Page)

```tsx
<div className="grid grid-cols-2 gap-4">
  {/* 상단 */}
  <Button onClick={shareTest}>Share Test</Button>
  <Button onClick={shareResult}>Share Result</Button>

  {/* 하단 */}
  <Button onClick={retake}>Retake</Button>
  <Button onClick={goHome}>Home</Button>
</div>
```

### 3. 프로그레스 바 + 300ms 트랜지션

```tsx
// 프로그레스 바
<div className="w-full bg-gray-200 rounded-full h-2">
  <motion.div
    className="bg-primary h-2 rounded-full"
    initial={{ width: 0 }}
    animate={{ width: `${progress}%` }}
    transition={{ duration: 0.3 }}
  />
</div>

// 문항 전환 (300ms)
<AnimatePresence mode="wait">
  <motion.div
    key={currentQuestion}
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.3 }}
  >
    {/* 문항 내용 */}
  </motion.div>
</AnimatePresence>
```

---

## High Engagement UI (체류시간 최적화) ★★★

> **핵심 원칙**: 체류시간은 "결과 확인"이 아니라 "결과 탐색"의 결과다.
> UI 요소를 아껴 쓰는 시대는 끝났다. 더 많은 UI 요소 사용은 **전략 자산**이다.

### Result Page UI Block (5종 이상 필수)

**Core Blocks**
- **ScoreBlock**: 큰 점수 + 카운트업 애니메이션
- **InsightCard**: 결과 해석, 맥락 설명
- **Callout**: 한 줄 핵심 요약
- **ComparisonTable**: 점수대별 비교

**Engagement Blocks**
- **PersonaCard**: "당신의 유형은 X입니다"
- **ScoreBreakdown**: 카테고리별 시각화
- **RankingBlock**: "상위 X%에 해당"
- **Pros / Cons Grid**: 결과의 장단점

**Action Blocks**
- **ShareCard**: 공유 버튼 + 미리보기
- **RelatedTestCards**: 관련 테스트 추천

### Result Page 권장 구조

```tsx
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {/* 1. 메인 점수 - ScoreBlock */}
  <ScoreBlock score={85} label="Your Purity Score" />

  {/* 2. 유형 해석 - PersonaCard */}
  <PersonaCard
    type="Moderately Pure"
    description="You've experienced a fair amount..."
  />

  {/* 3. 카테고리 분석 - ScoreBreakdown */}
  <ScoreBreakdown categories={categoryScores} />

  {/* 4. 순위 비교 - RankingBlock */}
  <RankingBlock percentile={72} />

  {/* 5. 상세 해석 - InsightCard x 2~3 */}
  <InsightCard title="What this means" content="..." />
  <InsightCard title="Compared to average" content="..." />

  {/* 6. 점수대별 비교 - ComparisonTable */}
  <ComparisonTable ranges={scoreRanges} currentScore={85} />

  {/* 7. 공유 + 4버튼 그리드 */}
  <ShareCard result={result} />
  <div className="grid grid-cols-2 gap-4">
    <Button>Share Test</Button>
    <Button>Share Result</Button>
    <Button>Retake</Button>
    <Button>Home</Button>
  </div>

  {/* 8. 관련 테스트 추천 */}
  <RelatedTestCards tests={relatedTests} />
</motion.div>
```

### 순차 등장 애니메이션

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // 순차 등장
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};
```

### 점수 카운트업 애니메이션

```typescript
const ScoreBlock = ({ score }: { score: number }) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const start = Date.now();
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayScore(Math.floor(progress * score));
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [score]);

  return (
    <motion.div
      className="text-center py-8"
      variants={itemVariants}
    >
      <p className="text-6xl font-bold text-primary">{displayScore}</p>
      <p className="text-gray-500">Your Purity Score</p>
    </motion.div>
  );
};
```

### 체류시간 최적화 체크리스트

배포 전 반드시 확인:

- [ ] Result 페이지에 UI Block 5종 이상
- [ ] 스크롤 중 최소 5회 이상 "멈출 포인트"
- [ ] 숫자/표/비교 블록 최소 3개
- [ ] 사용자가 자기 결과를 해석할 수 있는 섹션
- [ ] 페이지 상·중·하 시각 밀도 차이
- [ ] 4버튼 그리드 구현
- [ ] 관련 테스트 추천 카드

---

## 파일 생성 규칙

새 테스트 생성 시 반드시 다음 파일들을 생성:

### 1. page.tsx

```typescript
import { generateTestMetadata } from '@/utils/metadata';
import { Suspense } from 'react';
import TestClientPage from './TestClientPage';

export const metadata = generateTestMetadata({
  testId: 'test-name',
  title: 'Test Title',
  description: 'Test description',
});

export default function TestPage() {
  return (
    <Suspense fallback={<Loading />}>
      <TestClientPage />
    </Suspense>
  );
}
```

### 2. config.ts

```typescript
export const config = {
  theme: {
    primary: '#3B82F6',
    secondary: '#10B981',
    background: '#F9FAFB',
    text: '#111827',
  },
  fonts: {
    heading: 'Playfair Display',
    body: 'Inter',
  },
  animations: {
    duration: 300,
    easing: 'easeInOut',
  },
};
```

### 3. questions.ts

```typescript
export interface Question {
  id: number;
  text: string;
  options?: string[];
}

export const questions: Question[] = [
  { id: 1, text: "Question 1" },
  // ...
];
```

---

## 필수 업데이트 파일

테스트 추가/수정 시 다음 파일들도 업데이트:

1. **frontend/app/sitemap.ts**: 새 라우트 추가
2. **frontend/app/api/og/route.tsx**: OG 핸들러 추가
3. **next.config.js** (필요시): 리다이렉트 규칙

---

## 작업 프로세스

테스트 리뉴얼 작업 시 다음 순서로 진행:

1. **계획 읽기**: `docs/project_revamp_plan.md`에서 해당 테스트의 디자인 컨셉 확인
2. **파일 구조 생성**: 독립 디렉토리 및 필수 파일 생성
3. **config.ts 작성**: 테스트별 테마, 컬러, 폰트 정의
4. **Landing 구현**: 디자인 컨셉에 맞는 랜딩 페이지
5. **QuizUI 구현**: Framer Motion 애니메이션 + 프로그레스 바
6. **Report 구현**: 결과 페이지 + 4버튼 그리드 + 공유 기능
7. **OG 이미지**: 동적 썸네일 생성
8. **sitemap/OG 라우터 업데이트**

---

## 기존 CLAUDE.md 규칙 준수

다음 Core Rules는 계속 유지:

- **3-Step State Machine**: `'landing' | 'quiz' | 'result'`
- **URL 기반 결과 공유**: `?res=[BASE64]`
- **Metadata**: `generateTestMetadata` 사용
- **OG Images**: `.png`/`.jpg` 사용 (`.webp` 금지)
- **Result Page**: 4버튼 그리드 필수
- **Quiz UX**: 선택 후 자동 진행 (300ms), 프로그레스 바
- **Separation of Concerns**: 데이터 ↔ UI 분리

---

## 트리거 키워드

다음 키워드가 포함된 요청 시 자동 호출:

- 리뉴얼
- 독립
- 개편
- 마이그레이션
- Framer Motion
- 성능 최적화

---

## 출력 형식

### 작업 완료

```
┌─────────────────────────────────────────────────┐
│ TEST REVAMP COMPLETE: rice-purity-test          │
├─────────────────────────────────────────────────┤
│ 생성된 파일:                                     │
│ ✅ page.tsx                                      │
│ ✅ RicePurityClientPage.tsx                      │
│ ✅ config.ts                                     │
│ ✅ questions.ts                                  │
│ ✅ components/Landing.tsx                        │
│ ✅ components/QuizUI.tsx                         │
│ ✅ components/Report.tsx                         │
│ ✅ og/og-template.tsx                            │
├─────────────────────────────────────────────────┤
│ 업데이트된 파일:                                 │
│ ✅ frontend/app/sitemap.ts                       │
│ ✅ frontend/app/api/og/route.tsx                 │
├─────────────────────────────────────────────────┤
│ 적용된 디자인:                                   │
│ • 스타일: 클린/미니멀                            │
│ • 컬러: 화이트/그레이 + 파스텔 포인트            │
│ • 애니메이션: Framer Motion 페이드/슬라이드      │
├─────────────────────────────────────────────────┤
│ 다음 단계: quality-gate-checker 실행 권장        │
└─────────────────────────────────────────────────┘
```

---

## 스펙 참조

- [project_revamp_plan.md](../../docs/project_revamp_plan.md)
- [CLAUDE.md Core Rules](../../CLAUDE.md)
- [quality-gate-checker.md](./quality-gate-checker.md)
- [performance-optimizer.md](./performance-optimizer.md)
