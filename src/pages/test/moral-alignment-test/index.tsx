import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  moralAlignmentQuestions,
  answerOptions,
  AnswerValue,
  AlignmentType,
  alignmentData,
  testBackground,
  moralAlignmentFAQs,
  moralAlignmentCelebrities,
} from "@/data/moralAlignmentQuestions";
import { ChevronLeft, ChevronRight, CheckCircle2, RotateCcw, Share2, BookOpen, Lightbulb, TrendingUp, TrendingDown, Users, History, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import ScoreDistributionChart from "@/components/ScoreDistributionChart";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import CelebrityComparison from "@/components/CelebrityComparison";
import RecommendedTests from "@/components/RecommendedTests";

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
    { type: "lawfulGood", label: "Lawful Good" },
    { type: "neutralGood", label: "Neutral Good" },
    { type: "chaoticGood", label: "Chaotic Good" },
  ],
  [
    { type: "lawfulNeutral", label: "Lawful Neutral" },
    { type: "trueNeutral", label: "True Neutral" },
    { type: "chaoticNeutral", label: "Chaotic Neutral" },
  ],
  [
    { type: "lawfulEvil", label: "Lawful Evil" },
    { type: "neutralEvil", label: "Neutral Evil" },
    { type: "chaoticEvil", label: "Chaotic Evil" },
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
    const shareText = `My Moral Alignment: ${alignment.name} (${alignment.nickname})\nGood/Evil: ${result.goodEvil.toFixed(1)}\nLawful/Chaotic: ${result.lawfulChaotic.toFixed(1)}\n\nMoral Alignment Test`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Moral Alignment Test Results",
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

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Moral Alignment Test', path: '/test/moral-alignment-test/' },
  ]);

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
        <SEOHead
          title="Your Moral Alignment - Test Results"
          description="Discover your D&D-style moral alignment and what it says about your values and ethics."
          path="/test/moral-alignment-test/"
          jsonLd={breadcrumbSchema}
        />
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
              Your Moral Alignment
            </h2>
            <div
              className={cn(
                "text-6xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r bg-clip-text text-transparent",
                alignment.color
              )}
            >
              {alignment.name}
            </div>
            <div className="text-2xl font-semibold text-muted-foreground mb-2">
              "{alignment.nickname}"
            </div>
            <div className="text-lg text-primary mb-6">
              {alignment.nameKo}
            </div>
            <p className="text-xl leading-relaxed text-foreground max-w-3xl mx-auto mb-12 font-medium">
              {alignment.description}
            </p>

            {/* 3x3 Alignment Grid */}
            <div className="mb-8">
              <div className="text-xs text-muted-foreground mb-2 flex justify-between px-8">
                <span>Lawful</span>
                <span>Chaotic</span>
              </div>
              <div className="relative max-w-[320px] mx-auto">
                <div className="absolute -left-12 top-0 text-xs text-muted-foreground">
                  Good
                </div>
                <div className="absolute -left-12 bottom-0 text-xs text-muted-foreground">
                  Evil
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

            {/* Score Distribution Chart */}
            <div className="mb-12">
              <ScoreDistributionChart
                userScore={Math.round(((result.goodEvil + 10) / 20) * 100)}
                maxScore={100}
                testName="Moral Alignment Test"
                colorClass={alignment.color.replace("from-", "bg-").replace(" to-", "")}
              />
            </div>

            {/* Scores */}
            <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="text-muted-foreground mb-1">Good/Evil Axis</div>
                <div className="font-semibold text-lg">
                  {result.goodEvil > 0 ? "Good" : result.goodEvil < 0 ? "Evil" : "Neutral"}
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
                <div className="text-muted-foreground mb-1">Lawful/Chaotic Axis</div>
                <div className="font-semibold text-lg">
                  {result.lawfulChaotic > 0 ? "Lawful" : result.lawfulChaotic < 0 ? "Chaotic" : "Neutral"}
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
              <h3 className="text-xl font-bold mb-5 text-foreground">Key Characteristics</h3>
              <div className="flex flex-wrap gap-2">
                {alignment.traits.map((trait, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Celebrity Comparison */}
            <div className="mb-8">
              <CelebrityComparison
                userScore={Math.round(((result.goodEvil + 10) / 20) * 100)}
                celebrities={moralAlignmentCelebrities.map(celeb => {
                  // Map alignment names to approximate scores
                  const alignmentScores: Record<string, number> = {
                    "Lawful Good": 95,
                    "Neutral Good": 85,
                    "Chaotic Good": 80,
                    "Lawful Neutral": 90,
                    "True Neutral": 50,
                    "Chaotic Neutral": 55,
                    "Lawful Evil": 20,
                    "Neutral Evil": 15,
                    "Chaotic Evil": 5
                  };
                  return {
                    ...celeb,
                    score: alignmentScores[celeb.alignment] || 50
                  };
                })}
                maxScore={100}
                title="Your Alignment is Similar To..."
              />
            </div>

            {/* Example Characters */}
            <div className="mb-8 text-left">
              <h3 className="text-xl font-bold mb-5 text-foreground">
                Representative Characters
              </h3>
              <div className="flex flex-wrap gap-2">
                {alignment.examples.map((example, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm rounded-full bg-muted text-muted-foreground font-medium"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>

            {/* Detailed Description */}
            <div className="text-left p-8 rounded-xl bg-primary/5 border border-primary/10 mb-8">
              <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary" />
                <span className="text-foreground">What This Means</span>
              </h3>
              <p className="text-base text-foreground leading-relaxed font-normal">
                {alignment.detailedDescription}
              </p>
            </div>

            {/* Philosophical Background */}
            <div className="text-left p-8 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-8">
              <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <span className="text-foreground">Philosophical Background</span>
              </h3>
              <p className="text-base text-foreground leading-relaxed font-normal">
                {alignment.philosophicalBackground}
              </p>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="text-left p-6 rounded-xl bg-green-500/10 border border-green-500/20">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-green-700 dark:text-green-400">
                  <TrendingUp className="w-6 h-6" />
                  <span>Your Strengths</span>
                </h3>
                <ul className="space-y-3">
                  {alignment.strengths.map((strength, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground leading-relaxed">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-left p-6 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-orange-700 dark:text-orange-400">
                  <TrendingDown className="w-6 h-6" />
                  <span>Areas to Develop</span>
                </h3>
                <ul className="space-y-3">
                  {alignment.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground leading-relaxed">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Real World Examples */}
            <div className="text-left p-6 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-8">
              <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-blue-700 dark:text-blue-400">
                <Users className="w-6 h-6" />
                <span>People With This Alignment</span>
              </h3>
              <ul className="space-y-4">
                {alignment.realWorldExamples.map((example, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                      <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm text-foreground leading-relaxed">{example}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Tests */}
            <div className="mb-8">
              <RecommendedTests
                tests={[
                  {
                    title: "Political Compass Test",
                    description: "Discover your political ideology on economic and social axes - a modern complement to moral alignment.",
                    url: "/test/political-compass-test",
                    icon: "🧭",
                    reason: "Political beliefs often align with moral frameworks"
                  },
                  {
                    title: "Enneagram Test",
                    description: "Identify your personality type among 9 core motivations and fears that drive behavior.",
                    url: "/test/enneagram-test",
                    icon: "⭐",
                    reason: "Your Enneagram type often correlates with your moral alignment"
                  },
                  {
                    title: "Big Five Personality Test",
                    description: "Measure your personality across five major dimensions: openness, conscientiousness, extraversion, agreeableness, and neuroticism.",
                    url: "/test/big-five-test",
                    icon: "🎭",
                    reason: "Conscientiousness and agreeableness relate to lawful/chaotic and good/evil axes"
                  }
                ]}
                subtitle="Based on your moral alignment, these tests provide complementary insights"
              />
            </div>

            {/* FAQ Section */}
            <div className="mb-8">
              <CollapsibleFAQ faqs={moralAlignmentFAQs} />
            </div>

            {/* Test Background */}
            <div className="text-left p-6 rounded-xl bg-muted/30 border border-border mb-8">
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
                    <span>Important Note</span>
                  </h4>
                  <p className="text-sm text-foreground leading-relaxed">
                    {testBackground.disclaimer}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
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
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Moral Alignment Test - D&D Alignment Chart"
        description="Find your moral alignment among 9 types. Are you lawful, neutral, or chaotic? Good, neutral, or evil? For entertainment purposes only."
        path="/test/moral-alignment-test/"
        jsonLd={breadcrumbSchema}
      />
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/95 backdrop-blur-sm">
        <div></div>
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
              <span>Strongly Disagree</span>
              <span>Strongly Agree</span>
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
            Previous
          </Button>

          {showCompleteButton && isLastQuestion && answers[currentQuestionData.id] ? (
            <Button
              onClick={handleSubmit}
              className="gradient-primary border-0 gap-2 px-6"
            >
              <CheckCircle2 className="w-5 h-5" />
              View Results
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={goToNextQuestion}
              disabled={isLastQuestion || !answers[currentQuestionData.id]}
              className="gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoralAlignmentTest;
