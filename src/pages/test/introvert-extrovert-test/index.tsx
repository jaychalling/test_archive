import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import {
  introvertExtrovertQuestions,
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
import { ArrowLeft, CheckCircle2, RotateCcw, Share2, Users2, Zap, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
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
    const typeInfo = personalityTypeDescriptions[result.personalityType];

    const shareText = `My Introvert/Extrovert Test Results

Type: ${typeInfo.nameEn}
Extroversion Score: ${result.extroversionScore}%

${typeInfo.description}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Introvert/Extrovert Test Results",
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      alert("Result copied to clipboard!");
    }
  };

  if (showResults) {
    const result = calculateResults(answers);
    const typeInfo = personalityTypeDescriptions[result.personalityType];

    // Spectrum position calculation
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
            Back to Tests
          </Link>

          <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users2 className="w-6 h-6 text-primary" />
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Your Personality Type
              </h2>
            </div>

            {/* Primary Type */}
            <div className={cn("p-6 rounded-xl bg-gradient-to-br mb-6", typeBgColors[result.personalityType])}>
              <div className="text-sm text-muted-foreground mb-1">Your Type</div>
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
              <div className="text-sm text-muted-foreground mb-2">Extroversion Score</div>
              <div className={cn("text-4xl font-bold mb-2", typeTextColors[result.personalityType])}>
                {result.extroversionScore}%
              </div>
              <div className="text-xs text-muted-foreground">
                0% = Full Introvert / 100% = Full Extrovert
              </div>
            </div>

            {/* Spectrum Bar */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-foreground mb-4">Introvert-Extrovert Spectrum</h3>
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
                  <span>Introvert</span>
                  <span>Ambivert</span>
                  <span>Extrovert</span>
                </div>
              </div>
            </div>

            {/* Dimension Scores */}
            <div className="space-y-3 mb-8">
              <h3 className="text-sm font-medium text-foreground text-left mb-3">
                Dimension Scores
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
                Characteristics of {typeInfo.name}
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
                <h3 className="font-semibold text-foreground">Energy Management Tips</h3>
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
                <h3 className="font-semibold text-green-600 mb-3">Strengths</h3>
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
                <h3 className="font-semibold text-amber-600 mb-3">Watch Points</h3>
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

            {/* Detailed Description */}
            <div className={cn("text-left p-6 rounded-xl mb-6", `${typeColors[result.personalityType].replace('bg-', 'bg-')}/10`)}>
              <h3 className={cn("font-semibold mb-4 text-lg", typeTextColors[result.personalityType])}>
                {typeInfo.name} Detailed Analysis
              </h3>
              <p className="text-foreground leading-relaxed whitespace-pre-line">
                {typeInfo.detailedDescription}
              </p>
            </div>

            {/* Scientific Background */}
            <div className="text-left p-6 rounded-xl bg-blue-500/10 mb-6">
              <h3 className="font-semibold text-blue-600 mb-4 text-lg">Scientific Background</h3>
              <p className="text-foreground leading-relaxed whitespace-pre-line">
                {typeInfo.scientificBackground}
              </p>
            </div>

            {/* Career Suggestions & Social Tips */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="p-5 rounded-xl bg-purple-500/10 text-left">
                <h3 className="font-semibold text-purple-600 mb-4">Recommended Careers/Fields</h3>
                <ul className="space-y-2">
                  {typeInfo.careerSuggestions.map((career, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-purple-500 font-bold">•</span>
                      {career}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 rounded-xl bg-cyan-500/10 text-left">
                <h3 className="font-semibold text-cyan-600 mb-4">Social Interaction Tips</h3>
                <ul className="space-y-2">
                  {typeInfo.socialTips.map((tip, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-cyan-500 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Type Overview */}
            <div className="text-left p-4 rounded-lg bg-muted/10 mb-6">
              <h3 className="font-semibold text-foreground mb-3">5 Personality Types</h3>
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
                Retake
              </Button>
              <Button
                onClick={handleShare}
                className="gap-2 gradient-primary border-0"
              >
                <Share2 className="w-4 h-4" />
                Share
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
      <div className="flex items-center justify-between px-4 py-3 border-b bg-background/95 backdrop-blur-sm">
        <Link
          to="/"
          className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-semibold text-foreground">Introvert/Extrovert Test</h1>
        <span className="text-sm text-muted-foreground min-w-[48px] text-right">
          {currentQuestion + 1}/{totalQuestions}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-100"
          style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Center Question Area */}
      <main className="flex-1 flex flex-col justify-center px-6 py-8">
        <div
          className={cn(
            "transition-all duration-100",
            isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          )}
        >
          {/* Question */}
          <div className="text-center mb-12">
            <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
              {currentQuestionData.text}
            </p>
          </div>

          {/* 5-Point Scale */}
          <div className="max-w-md mx-auto">
            {/* Scale Labels */}
            <div className="flex justify-between mb-3 px-2">
              <span className="text-xs text-muted-foreground">Strongly Disagree</span>
              <span className="text-xs text-muted-foreground">Strongly Agree</span>
            </div>

            {/* Scale Buttons */}
            <div className="flex gap-3 justify-center">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleAnswer(currentQuestionData.id, value as AnswerValue)}
                  disabled={isTransitioning}
                  className={cn(
                    "flex-1 aspect-square max-w-16 rounded-full border-2 transition-all duration-100 flex items-center justify-center text-lg font-medium",
                    answers[currentQuestionData.id] === value
                      ? "border-primary bg-primary text-primary-foreground scale-110"
                      : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Fixed Navigation */}
      <div className="border-t bg-background/95 backdrop-blur-sm px-4 py-4">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <Button
            onClick={handlePrevQuestion}
            variant="outline"
            disabled={currentQuestion === 0 || isTransitioning}
            className="flex-1 gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {isLastQuestion && allQuestionsAnswered ? (
            <Button
              onClick={handleSubmit}
              className="flex-1 gap-2 gradient-primary border-0"
            >
              <CheckCircle2 className="w-4 h-4" />
              View Results
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              variant="outline"
              disabled={currentQuestion === totalQuestions - 1 || isTransitioning}
              className="flex-1 gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Unanswered Notice */}
        {isLastQuestion && !allQuestionsAnswered && (
          <p className="text-xs text-muted-foreground text-center mt-3">
            {answeredCount}/{totalQuestions} answered - Please answer all questions
          </p>
        )}
      </div>
    </div>
  );
};

export default IntrovertExtrovertTest;
