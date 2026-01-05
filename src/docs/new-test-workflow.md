# 새 테스트 생성 워크플로우 가이드

이 가이드는 Google E-E-A-T 가이드라인을 준수하는 새로운 심리 테스트를 생성하는 전체 워크플로우를 설명합니다.

---

## 목차
1. [개요](#개요)
2. [사전 준비](#사전-준비)
3. [Step 1: 데이터 파일 생성](#step-1-데이터-파일-생성)
4. [Step 2: E-E-A-T 콘텐츠 작성](#step-2-e-e-a-t-콘텐츠-작성)
5. [Step 3: 결과 페이지 컴포넌트 생성](#step-3-결과-페이지-컴포넌트-생성)
6. [Step 4: 라우팅 설정](#step-4-라우팅-설정)
7. [Step 5: 반성회 프로세스 실행](#step-5-반성회-프로세스-실행)
8. [Step 6: 커밋 및 배포](#step-6-커밋-및-배포)

---

## 개요

### E-E-A-T란?
- **E**xperience (경험): 실제 경험에 기반한 콘텐츠
- **E**xpertise (전문성): 전문적 지식과 이론 근거
- **A**uthoritativeness (권위): 신뢰할 수 있는 출처
- **T**rustworthiness (신뢰성): 균형 잡힌 시각, 면책 조항

### 필수 파일 구조
```
src/
├── data/
│   └── [testName]Questions.ts    # 질문 + 결과 데이터
├── pages/test/
│   └── [test-name]-test/
│       └── index.tsx              # 테스트 페이지
├── templates/
│   ├── eeat-data-template.ts      # 데이터 인터페이스 참조
│   └── eeat-result-sections.tsx   # UI 컴포넌트 참조
└── agents/
    ├── eeat-content-agent.md      # 콘텐츠 생성 가이드
    └── retrospective-agent.md     # 반성회 프로세스
```

---

## 사전 준비

### 필요한 정보
1. **테스트 이름**: 영문명, 한글명
2. **테스트 유형**: 심리/가치관/문화/관계
3. **질문 목록**: 20-30개 권장
4. **결과 유형**: 4-16개 (테스트에 따라)
5. **점수 계산 방식**: 축/카테고리 정의

### 참조할 기존 테스트
| 테스트 | 유형 | 결과 수 | 참조 |
|--------|------|---------|------|
| Big Five | 심리 | 5개 특성 | scientificBackground |
| Moral Alignment | 가치관 | 9개 | philosophicalBackground |
| Political Compass | 문화 | 4개 | historicalBackground |
| BDSM | 관계 | 5개 | psychologicalBackground |

---

## Step 1: 데이터 파일 생성

### 1.1 파일 생성
```bash
# 파일 경로
src/data/[testName]Questions.ts
```

### 1.2 기본 구조
```typescript
// src/data/exampleTestQuestions.ts

// 1. 질문 인터페이스
export interface ExampleQuestion {
  id: number;
  text: string;
  category: string;  // 점수 분류 기준
}

// 2. 응답 옵션
export type AnswerValue = 1 | 2 | 3 | 4 | 5;
export const answerOptions: { value: AnswerValue; label: string }[] = [
  { value: 1, label: "전혀 아니다" },
  { value: 2, label: "아니다" },
  { value: 3, label: "보통이다" },
  { value: 4, label: "그렇다" },
  { value: 5, label: "매우 그렇다" },
];

// 3. 결과 타입
export type ResultType = "typeA" | "typeB" | "typeC" | "typeD";

// 4. 결과 인터페이스 (E-E-A-T 포함)
export interface ResultInfo {
  name: string;
  nameKo: string;
  description: string;
  detailedDescription: string;        // 500자 이상
  scientificBackground: string;        // 300자 이상 (유형에 따라 변경)
  strengths: string[];                 // 4-5개
  weaknesses: string[];                // 4-5개
  realWorldExamples: string[];         // 3-4개
  color: string;
}

// 5. 테스트 배경 정보
export const testBackground = {
  history: "...",
  purpose: "...",
  disclaimer: "...",
};

// 6. 질문 데이터
export const exampleQuestions: ExampleQuestion[] = [
  { id: 1, text: "질문 내용...", category: "categoryA" },
  // ...
];

// 7. 결과 데이터
export const resultDescriptions: Record<ResultType, ResultInfo> = {
  typeA: {
    name: "Type A",
    nameKo: "유형 A",
    description: "짧은 설명...",
    detailedDescription: "상세 분석... (500자 이상)",
    scientificBackground: "과학적 배경... (300자 이상)",
    strengths: ["강점1", "강점2", "강점3", "강점4"],
    weaknesses: ["약점1", "약점2", "약점3", "약점4"],
    realWorldExamples: ["예시1", "예시2", "예시3"],
    color: "from-blue-400 to-indigo-500",
  },
  // ... 나머지 유형
};
```

---

## Step 2: E-E-A-T 콘텐츠 작성

### 2.1 에이전트 프롬프트 활용
`src/agents/eeat-content-agent.md` 참조

### 2.2 콘텐츠 기준

#### detailedDescription (500자 이상)
```
포함 내용:
- 핵심 특성 정의
- 행동 패턴
- 사고 방식
- 감정적 특성
- 대인 관계 스타일
- 장단점 균형
```

#### background (300자 이상)
| 테스트 유형 | 필드명 | 포함 내용 |
|------------|--------|---------|
| 심리 | scientificBackground | 심리학 이론, 연구 |
| 가치관 | philosophicalBackground | 철학적 전통, 윤리 |
| 문화 | historicalBackground | 역사적 맥락 |
| 관계 | psychologicalBackground | 심리학, 건강한 표현 |

#### strengths / weaknesses
```
- 4-5개 항목
- 각 1-2문장
- 구체적, 실용적
- 건설적 표현 (약점)
```

#### realWorldExamples
```
- 3-4개 항목
- 실제/가상 인물
- 다양한 분야
- 공감 가능한 예시
```

---

## Step 3: 결과 페이지 컴포넌트 생성

### 3.1 파일 생성
```bash
src/pages/test/[test-name]-test/index.tsx
```

### 3.2 기본 구조
```tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import {
  exampleQuestions,
  answerOptions,
  AnswerValue,
  ResultType,
  resultDescriptions,
  testBackground,
} from "@/data/exampleTestQuestions";
import {
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
  Share2,
  BookOpen,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  Users,
  History,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const ExampleTest = () => {
  // 상태 관리
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // 결과 계산 로직
  const calculateResult = (): ResultType => {
    // 점수 계산 로직
    return "typeA";
  };

  // 결과 화면
  if (showResults) {
    const resultType = calculateResult();
    const result = resultDescriptions[resultType];

    return (
      <div className="min-h-screen gradient-hero">
        <Header />
        <main className="container mx-auto px-4 py-12">
          {/* 뒤로가기 */}
          <Link to="/" className="...">
            <ArrowLeft className="w-4 h-4" />
            테스트 목록으로
          </Link>

          <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
            {/* 결과 제목 */}
            <h2>당신의 결과</h2>
            <div className={cn("text-3xl font-bold", result.color)}>
              {result.name}
            </div>
            <p>{result.description}</p>

            {/* E-E-A-T 섹션들 */}
            {/* 상세 분석 */}
            <div className="text-left p-6 rounded-xl bg-primary/5 mb-6">
              <h3 className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                상세 분석
              </h3>
              <p>{result.detailedDescription}</p>
            </div>

            {/* 배경 정보 */}
            <div className="text-left p-6 rounded-xl bg-purple-500/10 mb-6">
              <h3 className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                과학적 배경
              </h3>
              <p>{result.scientificBackground}</p>
            </div>

            {/* 강점/약점 */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* 강점 */}
              <div className="p-5 rounded-xl bg-green-500/10">
                <h3><TrendingUp /> 강점</h3>
                <ul>
                  {result.strengths.map((s, i) => (
                    <li key={i}><CheckCircle2 /> {s}</li>
                  ))}
                </ul>
              </div>
              {/* 약점 */}
              <div className="p-5 rounded-xl bg-red-500/10">
                <h3><TrendingDown /> 약점</h3>
                <ul>
                  {result.weaknesses.map((w, i) => (
                    <li key={i}><AlertCircle /> {w}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 실제 사례 */}
            <div className="p-6 rounded-xl bg-blue-500/10 mb-6">
              <h3><Users /> 실제 사례</h3>
              <ul>
                {result.realWorldExamples.map((e, i) => (
                  <li key={i}>• {e}</li>
                ))}
              </ul>
            </div>

            {/* 테스트 배경 */}
            <div className="p-6 rounded-xl bg-muted/30 mb-8">
              <h3><History /> 테스트에 대하여</h3>
              <div>
                <h4>역사</h4>
                <p>{testBackground.history}</p>
              </div>
              <div>
                <h4>목적</h4>
                <p>{testBackground.purpose}</p>
              </div>
              <div className="bg-amber-500/10 p-4 rounded-lg">
                <h4><AlertCircle /> 참고사항</h4>
                <p>{testBackground.disclaimer}</p>
              </div>
            </div>

            {/* 버튼들 */}
            <div className="flex gap-3 justify-center">
              <Button variant="outline">다시하기</Button>
              <Button>공유하기</Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // 질문 화면
  return (
    // ... 질문 UI
  );
};

export default ExampleTest;
```

### 3.3 템플릿 컴포넌트 활용 (선택사항)
```tsx
import {
  DetailedDescriptionSection,
  BackgroundSection,
  StrengthsWeaknessesSection,
  RealWorldExamplesSection,
  TestBackgroundSection,
} from "@/templates/eeat-result-sections";

// 사용
<DetailedDescriptionSection
  title={`${result.name} 상세 분석`}
  description={result.detailedDescription}
/>

<BackgroundSection
  title="과학적 배경"
  content={result.scientificBackground}
  variant="scientific"
/>

<StrengthsWeaknessesSection
  strengths={result.strengths}
  weaknesses={result.weaknesses}
/>

<RealWorldExamplesSection examples={result.realWorldExamples} />

<TestBackgroundSection
  history={testBackground.history}
  purpose={testBackground.purpose}
  disclaimer={testBackground.disclaimer}
  testName="예시 테스트"
/>
```

---

## Step 4: 라우팅 설정

### 4.1 App.tsx에 라우트 추가
```tsx
// src/App.tsx
import ExampleTest from "@/pages/test/example-test";

// Routes 내에 추가
<Route path="/test/example-test" element={<ExampleTest />} />
```

### 4.2 테스트 목록에 추가
```tsx
// src/pages/Index.tsx 또는 해당 파일
const tests = [
  // ... 기존 테스트
  {
    id: "example-test",
    name: "예시 테스트",
    description: "테스트 설명...",
    icon: SomeIcon,
    color: "from-blue-500 to-indigo-500",
  },
];
```

---

## Step 5: 반성회 프로세스 실행

### 5.1 빌드 검증
```bash
npm run build
npm run lint
```

### 5.2 E-E-A-T 체크리스트
- [ ] detailedDescription 500자 이상
- [ ] background 300자 이상
- [ ] strengths 4개 이상
- [ ] weaknesses 4개 이상
- [ ] realWorldExamples 3개 이상
- [ ] testBackground 존재
- [ ] disclaimer 포함

### 5.3 UI/UX 체크리스트
- [ ] max-w-4xl 컨테이너
- [ ] md:grid-cols-2 반응형
- [ ] 적절한 아이콘 사용
- [ ] 색상 일관성

### 5.4 문제 발견 시
1. 원인 분석
2. 즉시 수정
3. 재검증

자세한 내용: `src/agents/retrospective-agent.md` 참조

---

## Step 6: 커밋 및 배포

### 6.1 커밋
```bash
git add .
git commit -m "feat: Add [TestName] test with E-E-A-T content

- Add question data and result types
- Implement E-E-A-T compliant result page
- Include test background and disclaimer

🤖 Generated with Claude Code"
```

### 6.2 배포
```bash
# Vercel 자동 배포 (main 브랜치 푸시 시)
git push origin main

# 또는 수동 배포
npm run build
npm run deploy
```

---

## 체크리스트 요약

### 필수 완료 항목
- [ ] 데이터 파일 생성 (`src/data/`)
- [ ] 결과 인터페이스 정의 (E-E-A-T 필드 포함)
- [ ] E-E-A-T 콘텐츠 작성 (기준 충족)
- [ ] testBackground 작성 (disclaimer 포함)
- [ ] 결과 페이지 컴포넌트 생성
- [ ] 라우팅 설정
- [ ] 테스트 목록 추가
- [ ] 빌드 성공 확인
- [ ] 반성회 프로세스 완료
- [ ] 커밋 및 배포

---

## 참조 문서
- [eeat-data-template.ts](../templates/eeat-data-template.ts) - 데이터 인터페이스
- [eeat-result-sections.tsx](../templates/eeat-result-sections.tsx) - UI 컴포넌트
- [eeat-content-agent.md](../agents/eeat-content-agent.md) - 콘텐츠 생성 가이드
- [retrospective-agent.md](../agents/retrospective-agent.md) - 반성회 프로세스
