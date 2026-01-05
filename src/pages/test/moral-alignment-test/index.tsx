import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import {
  moralAlignmentQuestions,
  answerOptions,
  AnswerValue,
  AlignmentType,
  alignmentData,
} from "@/data/moralAlignmentQuestions";
import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle2, RotateCcw, Share2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AlignmentResult {
  goodEvil: number; // -10 ~ +10 (Evil ~ Good)
  lawfulChaotic: number; // -10 ~ +10 (Chaotic ~ Lawful)
}

const getAlignmentType = (
  goodEvil: number,
  lawfulChaotic: number
): AlignmentType => {
  // Good/Evil 분류
  let geCategory: "good" | "neutral" | "evil";
  if (goodEvil > 3) geCategory = "good";
  else if (goodEvil < -3) geCategory = "evil";
  else geCategory = "neutral";

  // Lawful/Chaotic 분류
  let lcCategory: "lawful" | "neutral" | "chaotic";
  if (lawfulChaotic > 3) lcCategory = "lawful";
  else if (lawfulChaotic < -3) lcCategory = "chaotic";
  else lcCategory = "neutral";

  // 조합
  if (lcCategory === "lawful" && geCategory === "good") return "lawfulGood";
  if (lcCategory === "neutral" && geCategory === "good") return "neutralGood";
  if (lcCategory === "chaotic" && geCategory === "good") return "chaoticGood";
  if (lcCategory === "lawful" && geCategory === "neutral") return "lawfulNeutral";
  if (lcCategory === "neutral" && geCategory === "neutral") return "trueNeutral";
  if (lcCategory === "chaotic" && geCategory === "neutral") return "chaoticNeutral";
  if (lcCategory === "lawful" && geCategory === "evil") return "lawfulEvil";
  if (lcCategory === "neutral" && geCategory === "evil") return "neutralEvil";
  return "chaoticEvil";
};

const alignmentGrid: { type: AlignmentType; label: string }[][] = [
  [
    { type: "lawfulGood", label: "질서 선" },
    { type: "neutralGood", label: "중립 선" },
    { type: "chaoticGood", label: "혼돈 선" },
  ],
  [
    { type: "lawfulNeutral", label: "질서 중립" },
    { type: "trueNeutral", label: "완전 중립" },
    { type: "chaoticNeutral", label: "혼돈 중립" },
  ],
  [
    { type: "lawfulEvil", label: "질서 악" },
    { type: "neutralEvil", label: "중립 악" },
    { type: "chaoticEvil", label: "혼돈 악" },
  ],
];

const gridColors: Record<AlignmentType, string> = {
  lawfulGood: "bg-yellow-500/30",
  neutralGood: "bg-green-500/30",
  chaoticGood: "bg-orange-500/30",
  lawfulNeutral: "bg-blue-500/30",
  trueNeutral: "bg-gray-500/30",
  chaoticNeutral: "bg-purple-500/30",
  lawfulEvil: "bg-red-700/30",
  neutralEvil: "bg-gray-700/30",
  chaoticEvil: "bg-red-900/30",
};

const MoralAlignmentTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCompleteButton, setShowCompleteButton] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = moralAlignmentQuestions.length;
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const currentQuestionData = moralAlignmentQuestions[currentQuestion];

  const handleAnswer = (questionId: number, value: AnswerValue) => {
    if (isTransitioning) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // 마지막 질문이면 결과 보기 버튼 표시
    if (isLastQuestion) {
      setShowCompleteButton(true);
    } else {
      // 0.1초 후 다음 질문으로 이동
      setTimeout(() => {
        goToNextQuestion();
      }, 100);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setIsTransitioning(false);
      }, 100);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestion > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev - 1);
        setIsTransitioning(false);
        setShowCompleteButton(false);
      }, 100);
    }
  };

  const calculateResult = (): AlignmentResult => {
    let goodEvilScore = 0;
    let lawfulChaoticScore = 0;

    const goodEvilQuestions = moralAlignmentQuestions.filter(
      (q) => q.axis === "goodEvil"
    );
    const lawfulChaoticQuestions = moralAlignmentQuestions.filter(
      (q) => q.axis === "lawfulChaotic"
    );

    // 5점 척도를 -2 ~ +2로 변환 (3이 중립)
    goodEvilQuestions.forEach((q) => {
      const answer = answers[q.id] || 3;
      const normalizedAnswer = (answer - 3) * q.direction;
      goodEvilScore += normalizedAnswer;
    });

    lawfulChaoticQuestions.forEach((q) => {
      const answer = answers[q.id] || 3;
      const normalizedAnswer = (answer - 3) * q.direction;
      lawfulChaoticScore += normalizedAnswer;
    });

    // -10 ~ +10 스케일로 정규화
    const maxGoodEvilScore = goodEvilQuestions.length * 2;
    const maxLawfulChaoticScore = lawfulChaoticQuestions.length * 2;

    return {
      goodEvil: (goodEvilScore / maxGoodEvilScore) * 10,
      lawfulChaotic: (lawfulChaoticScore / maxLawfulChaoticScore) * 10,
    };
  };

  const handleSubmit = () => {
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setCurrentQuestion(0);
    setShowCompleteButton(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = async () => {
    const result = calculateResult();
    const alignmentType = getAlignmentType(result.goodEvil, result.lawfulChaotic);
    const alignment = alignmentData[alignmentType];
    const shareText = `나의 D&D 성향: ${alignment.name} (${alignment.nickname})\n선/악: ${result.goodEvil.toFixed(1)}\n질서/혼돈: ${result.lawfulChaotic.toFixed(1)}\n\nMoral Alignment Test`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Moral Alignment Test 결과",
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
    const result = calculateResult();
    const alignmentType = getAlignmentType(result.goodEvil, result.lawfulChaotic);
    const alignment = alignmentData[alignmentType];

    // 3x3 그리드에서 위치 계산 (0~2 인덱스)
    // lawfulChaotic: +10(Lawful) = 0, -10(Chaotic) = 2
    // goodEvil: +10(Good) = 0, -10(Evil) = 2
    const gridX = Math.round(((result.lawfulChaotic * -1) + 10) / 20 * 2);
    const gridY = Math.round(((result.goodEvil * -1) + 10) / 20 * 2);

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

          <div className="test-card text-center animate-scale-in max-w-2xl mx-auto">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
              당신의 도덕적 성향
            </h2>
            <div
              className={cn(
                "text-3xl font-display font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent",
                alignment.color
              )}
            >
              {alignment.name}
            </div>
            <div className="text-xl text-muted-foreground mb-4">
              "{alignment.nickname}"
            </div>
            <p className="text-muted-foreground mb-8 text-sm max-w-md mx-auto">
              {alignment.description}
            </p>

            {/* 3x3 Alignment Grid */}
            <div className="mb-8">
              <div className="text-xs text-muted-foreground mb-2 flex justify-between px-8">
                <span>Lawful (질서)</span>
                <span>Chaotic (혼돈)</span>
              </div>
              <div className="relative max-w-[320px] mx-auto">
                <div className="absolute -left-16 top-0 text-xs text-muted-foreground">
                  Good (선)
                </div>
                <div className="absolute -left-16 bottom-0 text-xs text-muted-foreground">
                  Evil (악)
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {alignmentGrid.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                      const isSelected = cell.type === alignmentType;
                      return (
                        <div
                          key={cell.type}
                          className={cn(
                            "aspect-square flex items-center justify-center text-xs p-2 rounded transition-all",
                            gridColors[cell.type],
                            isSelected
                              ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105 font-bold"
                              : "opacity-60"
                          )}
                        >
                          <span className="text-center leading-tight">
                            {cell.label}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Scores */}
            <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="text-muted-foreground mb-1">선/악 축</div>
                <div className="font-semibold text-lg">
                  {result.goodEvil > 0 ? "선 (Good)" : result.goodEvil < 0 ? "악 (Evil)" : "중립"}
                </div>
                <div className="text-xs text-muted-foreground">
                  ({result.goodEvil > 0 ? "+" : ""}{result.goodEvil.toFixed(1)})
                </div>
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 via-gray-400 to-green-500"
                    style={{
                      marginLeft: `${((result.goodEvil + 10) / 20) * 100 - 50}%`,
                      width: "50%",
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Evil</span>
                  <span>Good</span>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="text-muted-foreground mb-1">질서/혼돈 축</div>
                <div className="font-semibold text-lg">
                  {result.lawfulChaotic > 0 ? "질서 (Lawful)" : result.lawfulChaotic < 0 ? "혼돈 (Chaotic)" : "중립"}
                </div>
                <div className="text-xs text-muted-foreground">
                  ({result.lawfulChaotic > 0 ? "+" : ""}{result.lawfulChaotic.toFixed(1)})
                </div>
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 via-gray-400 to-blue-500"
                    style={{
                      marginLeft: `${((result.lawfulChaotic + 10) / 20) * 100 - 50}%`,
                      width: "50%",
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Chaotic</span>
                  <span>Lawful</span>
                </div>
              </div>
            </div>

            {/* Traits */}
            <div className="mb-8 text-left">
              <h3 className="font-semibold text-foreground mb-3">주요 특징</h3>
              <div className="flex flex-wrap gap-2">
                {alignment.traits.map((trait, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Example Characters */}
            <div className="mb-8 text-left">
              <h3 className="font-semibold text-foreground mb-3">
                대표적인 캐릭터
              </h3>
              <div className="flex flex-wrap gap-2">
                {alignment.examples.map((example, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                  >
                    {example}
                  </span>
                ))}
              </div>
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
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/95 backdrop-blur-sm">
        <button
          onClick={() => navigate("/")}
          className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-display font-semibold text-foreground">
          Moral Alignment
        </h1>
        <span className="text-sm text-muted-foreground tabular-nums">
          {currentQuestion + 1}/{totalQuestions}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question Area - Centered */}
      <main className="flex-1 flex flex-col justify-center px-6 py-8">
        <div
          className={cn(
            "transition-all duration-300",
            isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
          )}
        >
          {/* Question Text */}
          <p className="text-xl md:text-2xl font-medium text-foreground text-center leading-relaxed mb-12">
            {currentQuestionData.text}
          </p>

          {/* 5-Point Scale */}
          <div className="max-w-md mx-auto">
            {/* Labels */}
            <div className="flex justify-between text-sm text-muted-foreground mb-4">
              <span>전혀 아니다</span>
              <span>매우 그렇다</span>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleAnswer(currentQuestionData.id, value as AnswerValue)}
                  className={cn(
                    "flex-1 aspect-square max-w-16 rounded-full border-2 font-semibold text-lg transition-all duration-200",
                    "flex items-center justify-center",
                    answers[currentQuestionData.id] === value
                      ? "border-primary bg-primary text-primary-foreground scale-110"
                      : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground hover:scale-105"
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation - Fixed */}
      <div className="border-t border-border bg-background/95 backdrop-blur-sm px-4 py-4">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <Button
            variant="outline"
            onClick={goToPrevQuestion}
            disabled={currentQuestion === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            이전
          </Button>

          {showCompleteButton && isLastQuestion && answers[currentQuestionData.id] ? (
            <Button
              onClick={handleSubmit}
              className="gradient-primary border-0 gap-2 px-6"
            >
              <CheckCircle2 className="w-5 h-5" />
              결과 보기
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={goToNextQuestion}
              disabled={isLastQuestion || !answers[currentQuestionData.id]}
              className="gap-2"
            >
              다음
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoralAlignmentTest;
