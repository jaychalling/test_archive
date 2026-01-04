import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import {
  bdsmQuestions,
  bdsmAnswerOptions,
  BdsmAnswerValue,
  BdsmResult,
  bdsmTraitDescriptions,
} from "@/data/bdsmTestQuestions";
import { ArrowLeft, CheckCircle2, RotateCcw, Share2, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
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
  const [answers, setAnswers] = useState<Record<number, BdsmAnswerValue>>({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = bdsmQuestions.length;
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const allQuestionsAnswered = answeredCount === totalQuestions;

  const handleAnswer = (questionId: number, value: BdsmAnswerValue) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // 마지막 질문이 아니면 0.3초 후 다음 질문으로 이동
    if (!isLastQuestion) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev - 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setIsTransitioning(false);
      }, 150);
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

  return (
    <div className="min-h-screen gradient-hero">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          테스트 목록으로
        </Link>

        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              BDSM 성향 테스트
            </h1>
            <p className="text-muted-foreground mb-4">
              자신의 관계 역할 성향을 알아보는 성인용 자기 성향 테스트입니다.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 text-xs">
              <AlertCircle className="w-3 h-3" />
              19세 이상 성인 전용 콘텐츠입니다
            </div>
          </div>

          {/* Progress */}
          <div className="bg-background/80 backdrop-blur-md py-4 mb-6 -mx-4 px-4">
            <ProgressBar current={answeredCount} total={totalQuestions} />
            <p className="text-center text-sm text-muted-foreground mt-2">
              {currentQuestion + 1} / {totalQuestions}
            </p>
          </div>

          {/* Single Question View */}
          <div className="min-h-[300px] flex flex-col justify-center mb-8">
            {(() => {
              const question = bdsmQuestions[currentQuestion];
              return (
                <div
                  key={question.id}
                  className={cn(
                    "test-card transition-all duration-300",
                    isTransitioning ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
                  )}
                >
                  <div className="flex gap-3 mb-6">
                    <span className="text-sm font-medium text-primary min-w-[36px]">
                      Q{currentQuestion + 1}.
                    </span>
                    <span className="text-base text-foreground leading-relaxed">{question.text}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 ml-10">
                    {bdsmAnswerOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer(question.id, option.value)}
                        className={cn(
                          "px-4 py-2 text-sm rounded-full border transition-all duration-200",
                          answers[question.id] === option.value
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pb-12">
            <Button
              onClick={handlePrevQuestion}
              variant="outline"
              disabled={currentQuestion === 0}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              이전
            </Button>

            <p className="text-xs text-muted-foreground">
              {answeredCount}/{totalQuestions}개 응답 완료
            </p>

            {isLastQuestion && allQuestionsAnswered ? (
              <Button
                onClick={handleSubmit}
                className="gradient-primary border-0 gap-2 px-6 shadow-elevated hover:shadow-card transition-all duration-300"
              >
                <CheckCircle2 className="w-4 h-4" />
                결과 보기
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                variant="outline"
                disabled={currentQuestion === totalQuestions - 1}
                className="gap-2"
              >
                다음
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BdsmTest;
