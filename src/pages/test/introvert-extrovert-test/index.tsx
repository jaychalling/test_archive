import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import {
  introvertExtrovertQuestions,
  answerOptions,
  AnswerValue,
  IntrovertExtrovertResult,
  PersonalityType,
  PersonalityDimension,
  getPersonalityType,
  dimensionDescriptions,
  personalityTypeDescriptions,
  dimensionOrder,
  typeColors,
  typeTextColors,
  typeBgColors,
} from "@/data/introvertExtrovertQuestions";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Share2, Users2, Zap, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const calculateResults = (answers: Record<number, AnswerValue>): IntrovertExtrovertResult => {
  const dimensionScores: Record<PersonalityDimension, { sum: number; count: number }> = {
    energyRecharge: { sum: 0, count: 0 },
    socialPreference: { sum: 0, count: 0 },
    stimulationSeeking: { sum: 0, count: 0 },
    focusDirection: { sum: 0, count: 0 },
    communicationStyle: { sum: 0, count: 0 },
  };

  introvertExtrovertQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      // reversed 문항은 점수를 반전 (내향적 문항이므로)
      const score = question.reversed ? 6 - answer : answer;
      dimensionScores[question.dimension].sum += score;
      dimensionScores[question.dimension].count++;
    }
  });

  // 각 차원별 점수 계산 (0-100)
  const calculatePercentage = (sum: number, count: number): number => {
    if (count === 0) return 50;
    const maxPossible = count * 5;
    const minPossible = count * 1;
    return Math.round(((sum - minPossible) / (maxPossible - minPossible)) * 100);
  };

  const dimensionScoresResult: Record<PersonalityDimension, number> = {
    energyRecharge: calculatePercentage(dimensionScores.energyRecharge.sum, dimensionScores.energyRecharge.count),
    socialPreference: calculatePercentage(dimensionScores.socialPreference.sum, dimensionScores.socialPreference.count),
    stimulationSeeking: calculatePercentage(dimensionScores.stimulationSeeking.sum, dimensionScores.stimulationSeeking.count),
    focusDirection: calculatePercentage(dimensionScores.focusDirection.sum, dimensionScores.focusDirection.count),
    communicationStyle: calculatePercentage(dimensionScores.communicationStyle.sum, dimensionScores.communicationStyle.count),
  };

  // 전체 외향성 점수 (모든 차원의 평균)
  const totalScore = Math.round(
    (dimensionScoresResult.energyRecharge +
      dimensionScoresResult.socialPreference +
      dimensionScoresResult.stimulationSeeking +
      dimensionScoresResult.focusDirection +
      dimensionScoresResult.communicationStyle) / 5
  );

  return {
    extroversionScore: totalScore,
    personalityType: getPersonalityType(totalScore),
    dimensionScores: dimensionScoresResult,
  };
};

const IntrovertExtrovertTest = () => {
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = introvertExtrovertQuestions.length;
  const currentQuestionData = introvertExtrovertQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const allQuestionsAnswered = answeredCount === totalQuestions;

  const handleAnswer = (questionId: number, value: AnswerValue) => {
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
    const typeInfo = personalityTypeDescriptions[result.personalityType];

    const shareText = `나의 내향/외향성 테스트 결과

유형: ${typeInfo.name} (${typeInfo.nameEn})
외향성 점수: ${result.extroversionScore}%

${typeInfo.description}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "내향/외향성 테스트 결과",
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
    const typeInfo = personalityTypeDescriptions[result.personalityType];

    // 스펙트럼 위치 계산
    const spectrumPosition = result.extroversionScore;

    // 모든 유형 순서대로
    const allTypes: PersonalityType[] = [
      "strongIntrovert",
      "introvert",
      "ambivert",
      "extrovert",
      "strongExtrovert",
    ];

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
              <Users2 className="w-6 h-6 text-primary" />
              <h2 className="font-display text-2xl font-semibold text-foreground">
                당신의 성격 유형
              </h2>
            </div>

            {/* Primary Type */}
            <div className={cn("p-6 rounded-xl bg-gradient-to-br mb-6", typeBgColors[result.personalityType])}>
              <div className="text-sm text-muted-foreground mb-1">당신의 유형</div>
              <div className={cn("text-3xl font-display font-bold mb-2", typeTextColors[result.personalityType])}>
                {typeInfo.name}
              </div>
              <div className="text-sm text-muted-foreground mb-3">
                {typeInfo.nameEn}
              </div>
              <p className="text-sm text-foreground">
                {typeInfo.description}
              </p>
            </div>

            {/* Extroversion Score */}
            <div className="p-4 rounded-lg bg-muted/30 mb-6">
              <div className="text-sm text-muted-foreground mb-2">외향성 점수</div>
              <div className={cn("text-4xl font-bold mb-2", typeTextColors[result.personalityType])}>
                {result.extroversionScore}%
              </div>
              <div className="text-xs text-muted-foreground">
                0% = 완전 내향 / 100% = 완전 외향
              </div>
            </div>

            {/* Spectrum Bar */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-foreground mb-4">내향-외향 스펙트럼</h3>
              <div className="relative">
                {/* Spectrum background */}
                <div className="h-8 rounded-full overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-orange-500">
                  {/* Type zones */}
                  <div className="absolute inset-0 flex">
                    <div className="w-[25%] border-r border-white/20" />
                    <div className="w-[15%] border-r border-white/20" />
                    <div className="w-[20%] border-r border-white/20" />
                    <div className="w-[15%] border-r border-white/20" />
                    <div className="w-[25%]" />
                  </div>
                </div>

                {/* Position indicator */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-foreground shadow-lg z-10"
                  style={{ left: `${spectrumPosition}%` }}
                />

                {/* Labels */}
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>내향형</span>
                  <span>양향형</span>
                  <span>외향형</span>
                </div>
              </div>
            </div>

            {/* Dimension Scores */}
            <div className="space-y-3 mb-8">
              <h3 className="text-sm font-medium text-foreground text-left mb-3">
                차원별 점수
              </h3>
              {dimensionOrder.map((dimension) => {
                const score = result.dimensionScores[dimension];
                const info = dimensionDescriptions[dimension];

                return (
                  <div key={dimension} className="text-left">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-foreground">
                        {info.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {score}%
                      </span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-indigo-500 to-orange-500"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {info.description}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Characteristics */}
            <div className="text-left p-4 rounded-lg bg-muted/20 mb-6">
              <h3 className="font-semibold text-foreground mb-3">
                {typeInfo.name}의 특징
              </h3>
              <ul className="space-y-2">
                {typeInfo.characteristics.map((char, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className={typeTextColors[result.personalityType]}>-</span>
                    {char}
                  </li>
                ))}
              </ul>
            </div>

            {/* Energy Tips */}
            <div className={cn("text-left p-4 rounded-lg mb-6", `${typeColors[result.personalityType].replace('bg-', 'bg-')}/10`)}>
              <div className="flex items-center gap-2 mb-3">
                <Zap className={cn("w-5 h-5", typeTextColors[result.personalityType])} />
                <h3 className="font-semibold text-foreground">에너지 관리 팁</h3>
              </div>
              <ul className="space-y-2">
                {typeInfo.energyTips.map((tip, idx) => (
                  <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                    <CheckCircle2 className={cn("w-4 h-4 mt-0.5 flex-shrink-0", typeTextColors[result.personalityType])} />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Strengths & Watch Points */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-lg bg-green-500/10 text-left">
                <h3 className="font-semibold text-green-600 mb-3">강점</h3>
                <ul className="space-y-2">
                  {typeInfo.strengths.map((strength, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-amber-500/10 text-left">
                <h3 className="font-semibold text-amber-600 mb-3">주의할 점</h3>
                <ul className="space-y-2">
                  {typeInfo.watchPoints.map((point, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Type Overview */}
            <div className="text-left p-4 rounded-lg bg-muted/10 mb-6">
              <h3 className="font-semibold text-foreground mb-3">5가지 성격 유형</h3>
              <div className="space-y-2">
                {allTypes.map((type) => {
                  const info = personalityTypeDescriptions[type];
                  const ranges: Record<PersonalityType, string> = {
                    strongIntrovert: "0-25%",
                    introvert: "26-40%",
                    ambivert: "41-60%",
                    extrovert: "61-75%",
                    strongExtrovert: "76-100%",
                  };

                  return (
                    <div
                      key={type}
                      className={cn(
                        "p-3 rounded-lg border-l-4 transition-all",
                        result.personalityType === type
                          ? `${typeColors[type].replace('bg-', 'border-')} bg-muted/30`
                          : "border-transparent bg-muted/10"
                      )}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className={cn("w-2 h-2 rounded-full", typeColors[type])} />
                        <span className={cn("font-medium text-sm", result.personalityType === type && typeTextColors[type])}>
                          {info.name}
                        </span>
                        <span className="text-xs text-muted-foreground">({info.nameEn})</span>
                        <span className="text-xs text-muted-foreground ml-auto">{ranges[type]}</span>
                      </div>
                    </div>
                  );
                })}
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
              <Users2 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              내향/외향성 테스트
            </h1>
            <p className="text-muted-foreground">
              각 문항에 대해 자신에게 얼마나 해당되는지 선택하세요.
              <br />
              내향-외향 스펙트럼에서 당신의 위치를 알아봅니다.
            </p>
          </div>

          {/* Progress */}
          <div className="bg-background/80 backdrop-blur-md py-4 mb-6 -mx-4 px-4">
            <ProgressBar current={answeredCount} total={totalQuestions} />
            {/* 현재 질문 번호 / 전체 질문 수 */}
            <div className="text-center mt-3">
              <span className="text-sm font-medium text-foreground">
                {currentQuestion + 1}
              </span>
              <span className="text-sm text-muted-foreground">
                {" "}/ {totalQuestions}
              </span>
            </div>
          </div>

          {/* Single Question Display */}
          <div className="min-h-[280px] flex items-center justify-center mb-8">
            <div
              className={cn(
                "test-card w-full transition-all duration-300",
                isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              )}
            >
              <div className="flex gap-3 mb-6">
                <span className="text-lg font-semibold text-primary min-w-[36px]">
                  Q{currentQuestion + 1}.
                </span>
                <span className="text-lg text-foreground leading-relaxed">
                  {currentQuestionData.text}
                </span>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                {answerOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(currentQuestionData.id, option.value)}
                    disabled={isTransitioning}
                    className={cn(
                      "px-5 py-2.5 text-sm rounded-full border-2 transition-all duration-200 font-medium",
                      answers[currentQuestionData.id] === option.value
                        ? "border-primary bg-primary text-primary-foreground scale-105"
                        : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mb-8">
            <Button
              onClick={handlePrevQuestion}
              variant="outline"
              disabled={currentQuestion === 0 || isTransitioning}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              이전
            </Button>

            <div className="flex gap-1">
              {introvertExtrovertQuestions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isTransitioning) {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setCurrentQuestion(index);
                        setIsTransitioning(false);
                      }, 150);
                    }
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-200",
                    currentQuestion === index
                      ? "bg-primary w-4"
                      : answers[introvertExtrovertQuestions[index].id] !== undefined
                        ? "bg-primary/50"
                        : "bg-muted-foreground/30"
                  )}
                />
              ))}
            </div>

            <Button
              onClick={handleNextQuestion}
              variant="outline"
              disabled={currentQuestion === totalQuestions - 1 || isTransitioning}
              className="gap-2"
            >
              다음
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Submit Button - 마지막 질문에서 답변 완료 시 표시 */}
          {isLastQuestion && answers[currentQuestionData.id] !== undefined && (
            <div className="text-center pb-12 animate-fade-in">
              <Button
                onClick={handleSubmit}
                size="lg"
                disabled={!allQuestionsAnswered}
                className="gradient-primary border-0 gap-2 px-8 shadow-elevated hover:shadow-card transition-all duration-300 disabled:opacity-50"
              >
                <CheckCircle2 className="w-5 h-5" />
                결과 보기
              </Button>
              {!allQuestionsAnswered && (
                <p className="text-xs text-muted-foreground mt-3">
                  {answeredCount}/{totalQuestions}개 질문 응답 완료
                  <br />
                  모든 질문에 답변해주세요.
                </p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default IntrovertExtrovertTest;
