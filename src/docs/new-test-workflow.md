# 새 테스트 생성 워크플로우 가이드

이 가이드는 Google E-E-A-T 가이드라인을 준수하는 새로운 심리 테스트를 생성하는 전체 워크플로우를 설명합니다.

---

## 목차
1. [개요](#개요)
2. [사전 준비](#사전-준비)
3. [Step 1: 데이터 파일 생성](#step-1-데이터-파일-생성)
4. [Step 2: E-E-A-T 콘텐츠 작성](#step-2-e-e-a-t-콘텐츠-작성)
5. [Step 3: 질문 페이지 생성 (index.tsx)](#step-3-질문-페이지-생성-indextsx)
6. [Step 4: 결과 페이지 생성 (result.tsx)](#step-4-결과-페이지-생성-resulttsx)
7. [Step 5: 라우팅 및 Sitemap 설정](#step-5-라우팅-및-sitemap-설정)
8. [Step 6: 반성회 프로세스 실행](#step-6-반성회-프로세스-실행)
9. [Step 7: 커밋 및 배포](#step-7-커밋-및-배포)

---

## 개요

### E-E-A-T란?
- **E**xperience (경험): 실제 경험에 기반한 콘텐츠
- **E**xpertise (전문성): 전문적 지식과 이론 근거
- **A**uthoritativeness (권위): 신뢰할 수 있는 출처
- **T**rustworthiness (신뢰성): 균형 잡힌 시각, 면책 조항

### 필수 파일 구조 (2024년 업데이트)
```
src/
├── data/
│   └── [testName]Questions.ts         # 질문 + 결과 데이터 + FAQ + 유명인
├── pages/test/
│   └── [test-name]-test/
│       ├── index.tsx                  # 질문 페이지 (Question Page)
│       └── result.tsx                 # 결과 페이지 (Result Page) ⭐ NEW
├── components/
│   ├── ScoreDistributionChart.tsx     # Tier A 컴포넌트
│   ├── CollapsibleFAQ.tsx             # Tier A 컴포넌트
│   ├── CelebrityComparison.tsx        # Tier A 컴포넌트
│   └── RecommendedTests.tsx           # Tier A 컴포넌트
├── templates/
│   ├── eeat-data-template.ts          # 데이터 인터페이스 참조
│   └── eeat-result-sections.tsx       # UI 컴포넌트 참조
└── agents/
    ├── eeat-content-agent.md          # 콘텐츠 생성 가이드
    └── retrospective-agent.md         # 반성회 프로세스
```

### 페이지 구조 패턴 ⭐ 중요
```
질문 페이지: /test/{slug}/         → index.tsx
결과 페이지: /test/{slug}/result/  → result.tsx

예시:
- /test/big-five-test/         → 질문 페이지
- /test/big-five-test/result/  → 결과 페이지
```

### localStorage 키 규칙
```typescript
// 테스트별 고유 키 사용
localStorage.setItem('[testName]Answers', JSON.stringify(answers));

// 예시:
- bigFiveAnswers
- eqTestAnswers
- ricePurityAnswers
- enneagramAnswers
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

// 8. FAQ 데이터 (Tier A 필수) ⭐ NEW
export const exampleFAQs = [
  {
    question: "이 점수가 좋은 건가요?",
    answer: "절대적으로 좋거나 나쁜 점수는 없습니다. 각 결과는 고유한 강점과 약점을 가지고 있으며..."
  },
  {
    question: "결과를 개선할 수 있나요?",
    answer: "네, 자기 인식과 의식적인 노력을 통해..."
  },
  // 최소 6개 권장
];

// 9. 유명인 비교 데이터 (Tier A 필수) ⭐ NEW
export const exampleCelebrities = [
  {
    name: "Elon Musk",
    score: 85,
    description: "혁신적 사고와 위험 감수를 보여주는...",
    avatar: "🚀"
  },
  // 최소 6-8개 권장
];
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

## Step 3: 질문 페이지 생성 (index.tsx)

### 3.1 파일 생성
```bash
src/pages/test/[test-name]-test/index.tsx
```

### 3.2 기본 구조 (질문 페이지 Only) ⭐
```tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  exampleQuestions,
  answerOptions,
  AnswerValue,
} from "@/data/exampleTestQuestions";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Brain, // 테스트에 맞는 아이콘 선택
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import ProgressBar from "@/components/ProgressBar";

const ExampleTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = exampleQuestions.length;
  const currentQuestionData = exampleQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const allQuestionsAnswered = answeredCount === totalQuestions;

  // 답변 처리 (자동 다음 질문 이동)
  const handleAnswer = (questionId: number, value: AnswerValue) => {
    if (isTransitioning) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // 마지막 질문이 아니면 자동으로 다음 질문으로 이동
    if (!isLastQuestion) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setIsTransitioning(false);
      }, 100);
    }
  };

  // 이전 질문
  const handlePrevQuestion = () => {
    if (currentQuestion > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev - 1);
        setIsTransitioning(false);
      }, 100);
    }
  };

  // 다음 질문
  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setIsTransitioning(false);
      }, 100);
    }
  };

  // 제출 (localStorage 저장 + 결과 페이지로 이동) ⭐ 중요
  const handleSubmit = () => {
    localStorage.setItem('exampleTestAnswers', JSON.stringify(answers));
    navigate('/test/example-test/result/');
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Example Test", item: "/test/example-test" },
  ]);

  return (
    <div className="min-h-screen gradient-hero">
      <SEOHead
        title="Example Test - Test Description | Test-Archive.com"
        description="Test description for SEO..."
        canonicalUrl="/test/example-test"
        schema={breadcrumbSchema}
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        {/* 시작 화면 또는 질문 화면 */}
        {!testStarted ? (
          <div className="test-card text-center animate-scale-in max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <Brain className="w-20 h-20 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Example Test</h1>
            <p className="text-lg text-muted-foreground mb-8">
              테스트 설명...
            </p>

            <div className="bg-muted/50 p-6 rounded-lg mb-8 text-left">
              <h2 className="font-semibold text-lg mb-3">Test Instructions</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                  <span>You will answer {totalQuestions} questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                  <span>Answer honestly</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                  <span>Takes approximately 5-7 minutes</span>
                </li>
              </ul>
            </div>

            <Button
              size="lg"
              onClick={() => setTestStarted(true)}
              className="text-lg px-8"
            >
              Start Test
            </Button>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <ProgressBar current={answeredCount} total={totalQuestions} />

            <div className={cn("test-card animate-scale-in", isTransitioning && "opacity-50")}>
              <div className="mb-6">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} / {totalQuestions}
                </span>
                <h2 className="text-2xl font-bold mt-2">{currentQuestionData.text}</h2>
              </div>

              <div className="space-y-3">
                {answerOptions.map((option) => {
                  const isSelected = answers[currentQuestionData.id] === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(currentQuestionData.id, option.value)}
                      disabled={isTransitioning}
                      className={cn(
                        "w-full p-4 rounded-lg border-2 text-left transition-all",
                        "hover:border-primary hover:bg-primary/5",
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card",
                        isTransitioning && "cursor-not-allowed opacity-50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                            isSelected
                              ? "border-primary bg-primary"
                              : "border-muted-foreground"
                          )}
                        >
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                          )}
                        </div>
                        <span className="font-medium">{option.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 네비게이션 버튼 */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handlePrevQuestion}
                  disabled={currentQuestion === 0 || isTransitioning}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                {isLastQuestion ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!allQuestionsAnswered || isTransitioning}
                    className="gap-2"
                  >
                    View Results
                    <CheckCircle2 className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={handleNextQuestion}
                    disabled={isTransitioning}
                    className="gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <p className="text-sm text-muted-foreground text-center mt-4">
                {allQuestionsAnswered
                  ? "All questions answered. Check your results!"
                  : `${totalQuestions - answeredCount} questions remaining`}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ExampleTest;
```

### 3.3 핵심 포인트
- ✅ 결과 페이지 로직 **완전 제거** (더 이상 `showResults` 상태 없음)
- ✅ `handleSubmit()`에서 localStorage 저장 후 `/test/{slug}/result/`로 이동
- ✅ 질문 UI만 포함
- ✅ ProgressBar 사용
- ✅ 자동 다음 질문 이동

---

## Step 4: 결과 페이지 생성 (result.tsx)

### 4.1 파일 생성 ⭐
```bash
src/pages/test/[test-name]-test/result.tsx
```

### 4.2 기본 구조 (결과 페이지 Only)
```tsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  exampleQuestions,
  resultDescriptions,
  testBackground,
  exampleFAQs,
  exampleCelebrities,
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
  History,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
// Tier A 컴포넌트
import ScoreDistributionChart from "@/components/ScoreDistributionChart";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import CelebrityComparison from "@/components/CelebrityComparison";
import RecommendedTests from "@/components/RecommendedTests";

const ExampleTestResult = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);

  // localStorage에서 답변 로드 ⭐ 중요
  useEffect(() => {
    const savedAnswers = localStorage.getItem('exampleTestAnswers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
      setLoading(false);
    } else {
      // 답변이 없으면 질문 페이지로 리다이렉트
      navigate('/test/example-test/');
    }
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // 결과 계산
  const calculateResult = () => {
    // ... 점수 계산 로직
    return {
      type: "typeA",
      score: 85,
    };
  };

  const { type, score } = calculateResult();
  const result = resultDescriptions[type];

  // 다시하기 (localStorage 삭제)
  const handleReset = () => {
    localStorage.removeItem('exampleTestAnswers');
    navigate('/test/example-test/');
  };

  // 공유하기
  const handleShare = () => {
    const shareData = {
      title: `Example Test - ${result.name}`,
      text: `I got ${result.name} on the Example Test!`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Example Test", item: "/test/example-test" },
    { name: "Results", item: "/test/example-test/result" },
  ]);

  return (
    <div className="min-h-screen gradient-hero">
      <SEOHead
        title={`${result.name} - Example Test Result | Test-Archive.com`}
        description={result.description}
        canonicalUrl="/test/example-test/result"
        schema={breadcrumbSchema}
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        {/* 뒤로가기 */}
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Tests
        </Link>

        <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
          {/* 결과 히어로 */}
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Your Result</h2>
          <div className={cn("text-6xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r bg-clip-text text-transparent", result.color)}>
            {result.nameKo}
          </div>
          <p className="text-lg text-muted-foreground mb-12">{result.description}</p>

          {/* Score Distribution Chart (Tier A) */}
          <div className="mb-12">
            <ScoreDistributionChart
              userScore={score}
              maxScore={125}
              testName="Example Test"
              colorClass={result.color.replace("from-", "bg-").replace(" to-", "")}
            />
          </div>

          {/* Celebrity Comparison (Tier A) */}
          <div className="mb-12">
            <CelebrityComparison
              userScore={score}
              celebrities={exampleCelebrities}
              maxScore={125}
              title="Your Score is Similar To..."
            />
          </div>

          {/* E-E-A-T 섹션들 */}
          <div className="text-left">
            {/* 상세 분석 */}
            <div className="p-8 rounded-xl bg-primary/5 border border-primary/10 mb-8">
              <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary" />
                <span className="text-foreground">What This Means</span>
              </h3>
              <p className="text-base text-foreground leading-relaxed font-normal">
                {result.detailedDescription}
              </p>
            </div>

            {/* 과학적 배경 */}
            <div className="p-6 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-8">
              <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <span className="text-foreground">Scientific Background</span>
              </h3>
              <p className="text-base text-foreground leading-relaxed font-normal">
                {result.scientificBackground}
              </p>
            </div>

            {/* 강점/약점 */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-green-700 dark:text-green-400">
                  <TrendingUp className="w-6 h-6" />
                  <span>Strengths</span>
                </h3>
                <ul className="space-y-3">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-orange-700 dark:text-orange-400">
                  <TrendingDown className="w-6 h-6" />
                  <span>Areas to Develop</span>
                </h3>
                <ul className="space-y-3">
                  {result.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground leading-relaxed">{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommended Tests (Tier A) */}
            <div className="mb-8">
              <RecommendedTests
                tests={[
                  {
                    title: "Related Test 1",
                    description: "Description...",
                    url: "/test/related-test-1",
                    icon: "🎭",
                    reason: "Reason why this is recommended"
                  },
                  // ... 2 more
                ]}
                subtitle="Complete your profile with these tests"
              />
            </div>

            {/* FAQ (Tier A) */}
            <div className="mb-8">
              <CollapsibleFAQ faqs={exampleFAQs} />
            </div>

            {/* 테스트 배경 */}
            <div className="p-6 rounded-xl bg-muted/30 border border-border mb-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <History className="w-6 h-6 text-primary" />
                <span className="text-foreground">About This Test</span>
              </h3>
              <div className="space-y-5">
                <div>
                  <h4 className="font-bold text-base mb-2 text-foreground">History</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {testBackground.history}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-base mb-2 text-foreground">Purpose</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {testBackground.purpose}
                  </p>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-lg">
                  <h4 className="font-bold text-base mb-2 flex items-center gap-2 text-amber-700 dark:text-amber-400">
                    <AlertCircle className="w-5 h-5" />
                    <span>Disclaimer</span>
                  </h4>
                  <p className="text-sm text-foreground leading-relaxed">
                    {testBackground.disclaimer}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button onClick={handleReset} variant="outline" size="lg" className="gap-2 min-w-[160px]">
              <RotateCcw className="w-5 h-5" />
              <span className="font-semibold">Retake Test</span>
            </Button>
            <Button onClick={handleShare} size="lg" className="gap-2 min-w-[160px]">
              <Share2 className="w-5 h-5" />
              <span className="font-semibold">Share Results</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExampleTestResult;
```

### 4.3 핵심 포인트
- ✅ `useEffect`로 localStorage에서 답변 로드
- ✅ 답변이 없으면 자동으로 질문 페이지로 리다이렉트
- ✅ 4개의 Tier A 컴포넌트 필수 포함:
  - ScoreDistributionChart
  - CelebrityComparison
  - CollapsibleFAQ
  - RecommendedTests
- ✅ E-E-A-T 섹션 모두 포함
- ✅ 타이포그래피 계층 구조 준수:
  - Hero: text-6xl md:text-7xl font-extrabold
  - H2: text-2xl font-semibold
  - H3: text-2xl font-bold
  - H4: text-xl font-bold
  - Body: text-base font-normal leading-relaxed

---

## Step 5: 라우팅 및 Sitemap 설정

### 5.1 App.tsx에 라우트 추가 ⭐
```tsx
// src/App.tsx
import ExampleTest from "./pages/test/example-test";
import ExampleTestResult from "./pages/test/example-test/result";

// Routes 내에 추가 (2개의 라우트 필요!)
<Route path="/test/example-test" element={<ExampleTest />} />
<Route path="/test/example-test/result" element={<ExampleTestResult />} />
```

### 5.2 sitemap.xml 업데이트 ⭐
```xml
<!-- public/sitemap.xml -->
<!-- 테스트 페이지 -->
<url>
  <loc>https://www.test-archive.com/test/example-test/</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>

<!-- 결과 페이지 (priority 낮음) -->
<url>
  <loc>https://www.test-archive.com/test/example-test/result/</loc>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

### 5.3 테스트 목록에 추가
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

## Step 6: 반성회 프로세스 실행

### 6.1 빌드 검증
```bash
npm run build
npm run lint
```

### 6.2 Tier A 컴포넌트 체크리스트 ⭐ NEW
- [ ] ScoreDistributionChart 포함
- [ ] CelebrityComparison 포함 (6-8개 유명인/아키타입)
- [ ] CollapsibleFAQ 포함 (6개 FAQ)
- [ ] RecommendedTests 포함 (3개 추천 테스트)

### 6.3 E-E-A-T 체크리스트
- [ ] detailedDescription 500자 이상
- [ ] background 300자 이상
- [ ] strengths 4개 이상
- [ ] weaknesses 4개 이상
- [ ] realWorldExamples 3개 이상
- [ ] testBackground 존재
- [ ] disclaimer 포함

### 6.4 페이지 분리 체크리스트 ⭐ NEW
- [ ] index.tsx는 질문 페이지만 포함
- [ ] result.tsx는 결과 페이지만 포함
- [ ] localStorage 키가 고유함
- [ ] handleSubmit()에서 localStorage 저장 후 navigate
- [ ] result.tsx에서 useEffect로 localStorage 로드
- [ ] 답변 없으면 질문 페이지로 리다이렉트
- [ ] App.tsx에 2개 라우트 추가
- [ ] sitemap.xml에 2개 URL 추가

### 6.5 UI/UX 체크리스트
- [ ] max-w-4xl 컨테이너
- [ ] md:grid-cols-2 반응형
- [ ] 적절한 아이콘 사용
- [ ] 색상 일관성
- [ ] 타이포그래피 계층 준수

### 6.6 문제 발견 시
1. 원인 분석
2. 즉시 수정
3. 재검증

자세한 내용: `src/agents/retrospective-agent.md` 참조

---

## Step 7: 커밋 및 배포

### 7.1 커밋 ⭐ Updated
```bash
git add .
git commit -m "feat: Add [TestName] test with Tier A components

- Add question data with FAQ and celebrity comparisons
- Create question page (index.tsx) and result page (result.tsx)
- Implement E-E-A-T compliant content
- Add Tier A components (ScoreDistribution, FAQ, Celebrity, Recommended)
- Configure localStorage for result persistence
- Add 2 routes to App.tsx
- Update sitemap.xml with 2 URLs

🤖 Generated with Claude Code"
```

### 7.2 배포
```bash
# Vercel 자동 배포 (main 브랜치 푸시 시)
git push origin main

# 또는 수동 배포
npm run build
npm run deploy
```

---

## 체크리스트 요약 ⭐ Updated

### 필수 완료 항목
- [ ] 데이터 파일 생성 (`src/data/[testName]Questions.ts`)
  - [ ] 질문 데이터
  - [ ] 결과 인터페이스 (E-E-A-T 필드)
  - [ ] FAQ 데이터 (6개)
  - [ ] 유명인/아키타입 데이터 (6-8개)
- [ ] 질문 페이지 생성 (`src/pages/test/[test-name]-test/index.tsx`)
  - [ ] 질문 UI만 포함
  - [ ] localStorage 저장 후 결과 페이지로 navigate
- [ ] 결과 페이지 생성 (`src/pages/test/[test-name]-test/result.tsx`)
  - [ ] localStorage에서 답변 로드
  - [ ] 4개 Tier A 컴포넌트 포함
  - [ ] E-E-A-T 섹션 포함
  - [ ] 타이포그래피 계층 준수
- [ ] 라우팅 설정
  - [ ] App.tsx에 2개 라우트 추가
  - [ ] sitemap.xml에 2개 URL 추가
- [ ] 테스트 목록 추가 (Index.tsx)
- [ ] 빌드 성공 확인 (`npm run build`)
- [ ] 반성회 프로세스 완료
- [ ] 커밋 및 배포

---

## 참조 문서
- [eeat-data-template.ts](../templates/eeat-data-template.ts) - 데이터 인터페이스
- [eeat-result-sections.tsx](../templates/eeat-result-sections.tsx) - UI 컴포넌트
- [eeat-content-agent.md](../agents/eeat-content-agent.md) - 콘텐츠 생성 가이드
- [retrospective-agent.md](../agents/retrospective-agent.md) - 반성회 프로세스
