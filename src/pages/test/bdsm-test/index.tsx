import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import {
  bdsmQuestions,
  BdsmAnswerValue,
  BdsmResult,
  bdsmTraitDescriptions,
} from "@/data/bdsmTestQuestions";
import { ArrowLeft, CheckCircle2, RotateCcw, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const calculateResults = (answers: Record<number, BdsmAnswerValue>): BdsmResult => {
  const categories = ["dominant", "submissive", "sadism", "masochism", "switch"] as const;
  const result: BdsmResult = {
    dominant: 0,
    submissive: 0,
    sadism: 0,
    masochism: 0,
    switch: 0,
  };

  categories.forEach((category) => {
    const categoryQuestions = bdsmQuestions.filter((q) => q.category === category);
    const totalScore = categoryQuestions.reduce((sum, q) => sum + (answers[q.id] || 3), 0);
    const maxScore = categoryQuestions.length * 5;
    result[category] = Math.round((totalScore / maxScore) * 100);
  });

  return result;
};

const getMainTrait = (result: BdsmResult): string => {
  const entries = Object.entries(result) as [keyof BdsmResult, number][];
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
};

const getSecondaryTrait = (result: BdsmResult): string => {
  const entries = Object.entries(result) as [keyof BdsmResult, number][];
  entries.sort((a, b) => b[1] - a[1]);
  return entries[1][0];
};

const BdsmTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, BdsmAnswerValue>>({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = bdsmQuestions.length;
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const allQuestionsAnswered = answeredCount === totalQuestions;

  const handleAnswer = (questionId: number, value: BdsmAnswerValue) => {
    if (isTransitioning) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // 마지막 질문이 아니면 0.1초 후 다음 질문으로 이동
    if (!isLastQuestion) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setIsTransitioning(false);
      }, 100);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev - 1);
        setIsTransitioning(false);
      }, 100);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setIsTransitioning(false);
      }, 100);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setCurrentQuestion(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = async () => {
    const result = calculateResults(answers);
    const mainTrait = getMainTrait(result);
    const mainTraitName = bdsmTraitDescriptions[mainTrait].name;

    const shareText = `나의 성향 테스트 결과: ${mainTraitName}\n\nDominant: ${result.dominant}%\nSubmissive: ${result.submissive}%\nSadism: ${result.sadism}%\nMasochism: ${result.masochism}%\nSwitch: ${result.switch}%`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "BDSM 성향 테스트 결과",
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      alert("결과가 클립보드에 복사되었습니다!");
    }
  };

  if (showResults) {
    const result = calculateResults(answers);
    const mainTrait = getMainTrait(result);
    const secondaryTrait = getSecondaryTrait(result);
    const mainTraitInfo = bdsmTraitDescriptions[mainTrait];
    const secondaryTraitInfo = bdsmTraitDescriptions[secondaryTrait];

    const traitColors: Record<string, string> = {
      dominant: "bg-red-500",
      submissive: "bg-blue-500",
      sadism: "bg-orange-500",
      masochism: "bg-purple-500",
      switch: "bg-green-500",
    };

    return (
      <div className="min-h-screen gradient-hero">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            테스트 목록으로
          </Link>

          <div className="test-card text-center animate-scale-in max-w-lg mx-auto">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
              당신의 성향 분석 결과
            </h2>
            <div className="text-3xl font-display font-bold text-gradient mb-2">
              {mainTraitInfo.name}
            </div>
            <p className="text-muted-foreground mb-6 text-sm">
              {mainTraitInfo.description}
            </p>

            {/* Secondary Trait */}
            <div className="p-4 rounded-lg bg-muted/30 mb-6">
              <div className="text-sm text-muted-foreground mb-1">보조 성향</div>
              <div className="font-semibold text-foreground">{secondaryTraitInfo.name}</div>
              <p className="text-xs text-muted-foreground mt-1">{secondaryTraitInfo.description}</p>
            </div>

            {/* Score Bars */}
            <div className="space-y-4 mb-8">
              {(Object.entries(result) as [keyof BdsmResult, number][])
                .sort((a, b) => b[1] - a[1])
                .map(([trait, score]) => (
                  <div key={trait} className="text-left">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-foreground">
                        {bdsmTraitDescriptions[trait].name}
                      </span>
                      <span className="text-sm text-muted-foreground">{score}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full transition-all duration-500", traitColors[trait])}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex gap-3 justify-center">
              <Button onClick={handleReset} variant="outline" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                다시하기
              </Button>
              <Button
                onClick={handleShare}
                className="gap-2 gradient-primary border-0"
              >
                <Share2 className="w-4 h-4" />
                공유하기
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const question = bdsmQuestions[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* 상단 바 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/95 backdrop-blur-sm">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-semibold text-foreground">BDSM 성향 테스트</h1>
        <span className="text-sm text-muted-foreground min-w-[48px] text-right">
          {currentQuestion + 1}/{totalQuestions}
        </span>
      </div>

      {/* 프로그레스 바 */}
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* 질문 영역 - 중앙 배치 */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div
          className={cn(
            "transition-all duration-300",
            isTransitioning ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
          )}
        >
          {/* 질문 텍스트 */}
          <p className="text-xl md:text-2xl font-medium text-foreground text-center leading-relaxed mb-12">
            {question.text}
          </p>

          {/* 5점 척도 */}
          <div className="max-w-md mx-auto w-full">
            {/* 양끝 라벨 */}
            <div className="flex justify-between mb-3 px-2">
              <span className="text-xs text-muted-foreground">전혀 아니다</span>
              <span className="text-xs text-muted-foreground">매우 그렇다</span>
            </div>

            {/* 1~5 원형 버튼 */}
            <div className="flex justify-center gap-3">
              {([1, 2, 3, 4, 5] as BdsmAnswerValue[]).map((value) => (
                <button
                  key={value}
                  onClick={() => handleAnswer(question.id, value)}
                  className={cn(
                    "flex-1 aspect-square max-w-16 rounded-full border-2 flex items-center justify-center text-lg font-medium transition-all duration-200",
                    answers[question.id] === value
                      ? "border-primary bg-primary text-primary-foreground scale-110"
                      : "border-border bg-background hover:border-primary/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 고정 네비게이션 */}
      <div className="flex items-center justify-between px-4 py-4 border-t border-border bg-background/95 backdrop-blur-sm">
        <Button
          onClick={handlePrevQuestion}
          variant="ghost"
          disabled={currentQuestion === 0}
          className="gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          이전
        </Button>

        {isLastQuestion && allQuestionsAnswered ? (
          <Button
            onClick={handleSubmit}
            className="gradient-primary border-0 gap-2 px-6"
          >
            <CheckCircle2 className="w-4 h-4" />
            결과 보기
          </Button>
        ) : (
          <Button
            onClick={handleNextQuestion}
            variant="ghost"
            disabled={isLastQuestion}
            className="gap-1"
          >
            다음
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default BdsmTest;
