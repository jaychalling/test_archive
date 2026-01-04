import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import {
  attachmentStyleQuestions,
  answerOptions,
  AnswerValue,
  AttachmentStyle,
  AttachmentResult,
  attachmentStyleDescriptions,
} from "@/data/attachmentStyleQuestions";
import { ArrowLeft, CheckCircle2, RotateCcw, Share2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const calculateResults = (answers: Record<number, AnswerValue>): AttachmentResult => {
  let anxietySum = 0;
  let avoidanceSum = 0;
  let anxietyMaxPossible = 0;
  let avoidanceMaxPossible = 0;

  attachmentStyleQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      // 각 질문의 가중치에 따라 점수 계산
      // 5점 척도이므로 (answer - 3)을 사용하여 -2 ~ +2 범위로 변환
      const normalizedAnswer = answer - 3;

      if (question.anxietyWeight !== 0) {
        anxietySum += normalizedAnswer * question.anxietyWeight;
        anxietyMaxPossible += 2 * Math.abs(question.anxietyWeight);
      }
      if (question.avoidanceWeight !== 0) {
        avoidanceSum += normalizedAnswer * question.avoidanceWeight;
        avoidanceMaxPossible += 2 * Math.abs(question.avoidanceWeight);
      }
    }
  });

  // 0-100 점수로 변환
  const anxietyScore = Math.round(((anxietySum + anxietyMaxPossible) / (2 * anxietyMaxPossible)) * 100);
  const avoidanceScore = Math.round(((avoidanceSum + avoidanceMaxPossible) / (2 * avoidanceMaxPossible)) * 100);

  // 애착 유형 결정
  let primaryStyle: AttachmentStyle;
  const anxietyThreshold = 50;
  const avoidanceThreshold = 50;

  if (anxietyScore < anxietyThreshold && avoidanceScore < avoidanceThreshold) {
    primaryStyle = "secure";
  } else if (anxietyScore >= anxietyThreshold && avoidanceScore < avoidanceThreshold) {
    primaryStyle = "anxious";
  } else if (anxietyScore < anxietyThreshold && avoidanceScore >= avoidanceThreshold) {
    primaryStyle = "avoidant";
  } else {
    primaryStyle = "fearfulAvoidant";
  }

  return {
    anxietyScore: Math.max(0, Math.min(100, anxietyScore)),
    avoidanceScore: Math.max(0, Math.min(100, avoidanceScore)),
    primaryStyle,
  };
};

const styleColors: Record<AttachmentStyle, string> = {
  secure: "bg-green-500",
  anxious: "bg-amber-500",
  avoidant: "bg-blue-500",
  fearfulAvoidant: "bg-purple-500",
};

const styleTextColors: Record<AttachmentStyle, string> = {
  secure: "text-green-500",
  anxious: "text-amber-500",
  avoidant: "text-blue-500",
  fearfulAvoidant: "text-purple-500",
};

const styleBgColors: Record<AttachmentStyle, string> = {
  secure: "from-green-500/10 to-emerald-500/10",
  anxious: "from-amber-500/10 to-orange-500/10",
  avoidant: "from-blue-500/10 to-cyan-500/10",
  fearfulAvoidant: "from-purple-500/10 to-pink-500/10",
};

const AttachmentStyleTest = () => {
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [showResults, setShowResults] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = attachmentStyleQuestions.length;

  const handleAnswer = (questionId: number, value: AnswerValue) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = async () => {
    const result = calculateResults(answers);
    const styleInfo = attachmentStyleDescriptions[result.primaryStyle];

    const shareText = `나의 애착 유형 테스트 결과

유형: ${styleInfo.name} (${styleInfo.nameEn})
불안 수준: ${result.anxietyScore}%
회피 수준: ${result.avoidanceScore}%

${styleInfo.description}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "애착 유형 테스트 결과",
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
    const styleInfo = attachmentStyleDescriptions[result.primaryStyle];

    // 매트릭스 위치 계산 (불안 = X축, 회피 = Y축)
    const dotX = result.anxietyScore;
    const dotY = result.avoidanceScore;

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
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="font-display text-2xl font-semibold text-foreground">
                당신의 애착 유형
              </h2>
            </div>

            {/* Primary Style */}
            <div className={cn("p-6 rounded-xl bg-gradient-to-br mb-6", styleBgColors[result.primaryStyle])}>
              <div className="text-sm text-muted-foreground mb-1">주요 애착 유형</div>
              <div className={cn("text-3xl font-display font-bold mb-2", styleTextColors[result.primaryStyle])}>
                {styleInfo.name}
              </div>
              <div className="text-sm text-muted-foreground mb-3">
                {styleInfo.nameEn}
              </div>
              <p className="text-sm text-foreground">
                {styleInfo.description}
              </p>
            </div>

            {/* Score Bars */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="text-sm text-muted-foreground mb-2">불안 수준</div>
                <div className="text-2xl font-bold text-amber-500 mb-2">{result.anxietyScore}%</div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${result.anxietyScore}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {result.anxietyScore < 30 ? "낮음" : result.anxietyScore < 70 ? "보통" : "높음"}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="text-sm text-muted-foreground mb-2">회피 수준</div>
                <div className="text-2xl font-bold text-blue-500 mb-2">{result.avoidanceScore}%</div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${result.avoidanceScore}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {result.avoidanceScore < 30 ? "낮음" : result.avoidanceScore < 70 ? "보통" : "높음"}
                </div>
              </div>
            </div>

            {/* 2x2 Matrix */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-foreground mb-4">애착 유형 매트릭스</h3>
              <div className="relative w-full aspect-square max-w-[300px] mx-auto">
                {/* Background quadrants */}
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                  <div className="bg-green-500/20 rounded-tl-lg flex items-center justify-center text-xs text-muted-foreground p-2 text-center">
                    안정형
                    <br />
                    <span className="text-[10px]">(낮은 불안, 낮은 회피)</span>
                  </div>
                  <div className="bg-blue-500/20 rounded-tr-lg flex items-center justify-center text-xs text-muted-foreground p-2 text-center">
                    회피형
                    <br />
                    <span className="text-[10px]">(낮은 불안, 높은 회피)</span>
                  </div>
                  <div className="bg-amber-500/20 rounded-bl-lg flex items-center justify-center text-xs text-muted-foreground p-2 text-center">
                    불안형
                    <br />
                    <span className="text-[10px]">(높은 불안, 낮은 회피)</span>
                  </div>
                  <div className="bg-purple-500/20 rounded-br-lg flex items-center justify-center text-xs text-muted-foreground p-2 text-center">
                    두려움-회피형
                    <br />
                    <span className="text-[10px]">(높은 불안, 높은 회피)</span>
                  </div>
                </div>

                {/* Axes */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

                {/* Axis labels */}
                <div className="absolute left-1/2 -top-6 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
                  낮은 회피
                </div>
                <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
                  높은 회피
                </div>
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full text-xs text-muted-foreground whitespace-nowrap">
                  낮은 불안
                </div>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full text-xs text-muted-foreground whitespace-nowrap">
                  높은 불안
                </div>

                {/* Result dot */}
                <div
                  className={cn(
                    "absolute w-4 h-4 rounded-full shadow-lg border-2 border-white transform -translate-x-1/2 -translate-y-1/2 z-10",
                    styleColors[result.primaryStyle]
                  )}
                  style={{
                    left: `${dotX}%`,
                    top: `${dotY}%`,
                  }}
                />
              </div>
            </div>

            {/* Characteristics */}
            <div className="text-left p-4 rounded-lg bg-muted/20 mb-6">
              <h3 className="font-semibold text-foreground mb-3">
                {styleInfo.name}의 특징
              </h3>
              <ul className="space-y-2 mb-4">
                {styleInfo.characteristics.map((char, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className={styleTextColors[result.primaryStyle]}>•</span>
                    {char}
                  </li>
                ))}
              </ul>

              <h4 className="font-medium text-foreground mb-2 mt-4">관계에서의 모습</h4>
              <p className="text-sm text-muted-foreground mb-4">{styleInfo.inRelationship}</p>
            </div>

            {/* Advice */}
            <div className={cn("text-left p-4 rounded-lg mb-6", `${styleColors[result.primaryStyle].replace('bg-', 'bg-')}/10`)}>
              <h3 className="font-semibold text-foreground mb-3">관계 조언</h3>
              <ul className="space-y-2">
                {styleInfo.advice.map((advice, idx) => (
                  <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                    <CheckCircle2 className={cn("w-4 h-4 mt-0.5 flex-shrink-0", styleTextColors[result.primaryStyle])} />
                    {advice}
                  </li>
                ))}
              </ul>
            </div>

            {/* Type Overview */}
            <div className="text-left p-4 rounded-lg bg-muted/10 mb-6">
              <h3 className="font-semibold text-foreground mb-3">4가지 애착 유형</h3>
              <div className="space-y-3">
                {(Object.entries(attachmentStyleDescriptions) as [AttachmentStyle, typeof attachmentStyleDescriptions.secure][]).map(([style, info]) => (
                  <div
                    key={style}
                    className={cn(
                      "p-3 rounded-lg border-l-4 transition-all",
                      result.primaryStyle === style
                        ? `${styleColors[style].replace('bg-', 'border-')} bg-muted/30`
                        : "border-transparent bg-muted/10"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={cn("w-2 h-2 rounded-full", styleColors[style])} />
                      <span className={cn("font-medium text-sm", result.primaryStyle === style && styleTextColors[style])}>
                        {info.name}
                      </span>
                      <span className="text-xs text-muted-foreground">({info.nameEn})</span>
                    </div>
                    <p className="text-xs text-muted-foreground ml-4">
                      {style === "secure" && "낮은 불안 + 낮은 회피"}
                      {style === "anxious" && "높은 불안 + 낮은 회피"}
                      {style === "avoidant" && "낮은 불안 + 높은 회피"}
                      {style === "fearfulAvoidant" && "높은 불안 + 높은 회피"}
                    </p>
                  </div>
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
            <div className="flex items-center justify-center gap-2 mb-3">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              애착 유형 테스트
            </h1>
            <p className="text-muted-foreground">
              각 문항에 대해 자신에게 얼마나 해당되는지 선택하세요.
              <br />
              관계에서의 애착 유형을 알아봅니다.
            </p>
          </div>

          {/* Progress */}
          <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md py-4 mb-6 -mx-4 px-4">
            <ProgressBar current={answeredCount} total={totalQuestions} />
          </div>

          {/* Questions */}
          <div className="space-y-4 mb-8">
            {attachmentStyleQuestions.map((question, index) => (
              <div
                key={question.id}
                className="test-card animate-fade-in"
                style={{ animationDelay: `${Math.min(index * 30, 500)}ms` }}
              >
                <div className="flex gap-3 mb-4">
                  <span className="text-xs font-medium text-muted-foreground min-w-[28px]">
                    {index + 1}.
                  </span>
                  <span className="text-sm text-foreground">{question.text}</span>
                </div>

                <div className="flex flex-wrap gap-2 ml-8">
                  {answerOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(question.id, option.value)}
                      className={cn(
                        "px-3 py-1.5 text-xs rounded-full border transition-all duration-200",
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
            ))}
          </div>

          {/* Submit Button */}
          <div className="text-center pb-12">
            <Button
              onClick={handleSubmit}
              size="lg"
              disabled={answeredCount < totalQuestions}
              className="gradient-primary border-0 gap-2 px-8 shadow-elevated hover:shadow-card transition-all duration-300 disabled:opacity-50"
            >
              <CheckCircle2 className="w-5 h-5" />
              결과 확인하기
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              {answeredCount}/{totalQuestions}개 질문 응답 완료
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AttachmentStyleTest;
