import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  enneagramQuestions,
  answerOptions,
  AnswerValue,
  EnneagramType,
  EnneagramResult,
  enneagramTypeInfo,
  typeColors,
  typeTextColors,
  typeBgColors,
  typeOrder,
  getWing,
  getCenter,
  centerInfo,
  enneagramFAQs,
  enneagramCelebrities,
} from "@/data/enneagramQuestions";
import { ChevronLeft, ChevronRight, CheckCircle2, RotateCcw, Share2, Circle } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import ScoreDistributionChart from "@/components/ScoreDistributionChart";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import CelebrityComparison from "@/components/CelebrityComparison";
import RecommendedTests from "@/components/RecommendedTests";

const calculateResults = (answers: Record<number, AnswerValue>): EnneagramResult => {
  const typeScores: Record<EnneagramType, { sum: number; count: number }> = {
    1: { sum: 0, count: 0 },
    2: { sum: 0, count: 0 },
    3: { sum: 0, count: 0 },
    4: { sum: 0, count: 0 },
    5: { sum: 0, count: 0 },
    6: { sum: 0, count: 0 },
    7: { sum: 0, count: 0 },
    8: { sum: 0, count: 0 },
    9: { sum: 0, count: 0 },
  };

  enneagramQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      typeScores[question.type].sum += answer;
      typeScores[question.type].count++;
    }
  });

  // 0-100 점수로 변환 (각 유형당 4문항, 각 1-5점)
  const calculatePercentage = (sum: number, count: number): number => {
    if (count === 0) return 0;
    const maxPossible = count * 5;
    const minPossible = count * 1;
    return Math.round(((sum - minPossible) / (maxPossible - minPossible)) * 100);
  };

  const scores = {} as Record<EnneagramType, number>;
  (Object.keys(typeScores) as unknown as EnneagramType[]).forEach((type) => {
    const numType = Number(type) as EnneagramType;
    scores[numType] = calculatePercentage(typeScores[numType].sum, typeScores[numType].count);
  });

  // 가장 높은 점수를 가진 유형 찾기
  let mainType: EnneagramType = 1;
  let maxScore = scores[1];
  (Object.keys(scores) as unknown as EnneagramType[]).forEach((type) => {
    const numType = Number(type) as EnneagramType;
    if (scores[numType] > maxScore) {
      maxScore = scores[numType];
      mainType = numType;
    }
  });

  const wing = getWing(mainType, scores);

  return {
    scores,
    mainType,
    wing,
  };
};

const EnneagramTest = () => {
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showViewResultButton, setShowViewResultButton] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = enneagramQuestions.length;

  const handleAnswer = (questionId: number, value: AnswerValue) => {
    if (isTransitioning) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // 마지막 질문인 경우 결과 보기 버튼 표시
    if (currentQuestion === totalQuestions - 1) {
      setShowViewResultButton(true);
    } else {
      // 0.1초 후 자동으로 다음 질문으로 이동
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
        setShowViewResultButton(false);
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
    setShowViewResultButton(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = async () => {
    const result = calculateResults(answers);
    const mainInfo = enneagramTypeInfo[result.mainType];
    const wingText = result.wing ? `w${result.wing}` : "";

    const shareText = `My Enneagram Test Results

Main Type: ${mainInfo.name} - ${mainInfo.title}${wingText ? ` (Wing: ${wingText})` : ""}

Core Motivation: ${mainInfo.coreMotivation}
Core Fear: ${mainInfo.coreFear}

Growth Direction: ${mainInfo.growthDirection}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Enneagram Test Results",
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
    { name: 'Enneagram Test', path: '/test/enneagram-test/' },
  ]);

  if (showResults) {
    const result = calculateResults(answers);
    const mainInfo = enneagramTypeInfo[result.mainType];
    const wingInfo = result.wing ? enneagramTypeInfo[result.wing] : null;
    const center = getCenter(result.mainType);
    const centerData = centerInfo[center];

    // 에니어그램 원형 다이어그램 좌표 계산
    const circleRadius = 38;
    const centerX = 50;
    const centerY = 50;

    const getTypePosition = (type: EnneagramType) => {
      // 9가 상단(12시 방향)에 오도록 배치
      const index = typeOrder.indexOf(type);
      const angle = (index * 2 * Math.PI) / 9 - Math.PI / 2;
      return {
        x: centerX + circleRadius * Math.cos(angle),
        y: centerY + circleRadius * Math.sin(angle),
      };
    };

    // 에니어그램 연결선 (내부 삼각형과 육각형)
    const innerConnections = [
      [3, 6, 9], // 삼각형
      [1, 4, 2, 8, 5, 7, 1], // 육각형 (헥사드)
    ];

    return (
      <div className="min-h-screen gradient-hero">
        <SEOHead
          title="Your Enneagram Type - Test Results"
          description="See your Enneagram type and wing. Understand your core motivations and how to grow."
          path="/test/enneagram-test/"
          jsonLd={breadcrumbSchema}
        />
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Circle className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-muted-foreground">
                Your Enneagram Results
              </h2>
            </div>

            {/* Main Type Hero */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className={cn("w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg", typeColors[result.mainType])}>
                  {result.mainType}
                </div>
                <div className="text-left">
                  <p className={cn("text-5xl md:text-6xl font-extrabold", typeTextColors[result.mainType])}>
                    {mainInfo.title}
                  </p>
                  {result.wing && (
                    <p className="text-lg text-muted-foreground font-medium mt-1">
                      Wing: {result.wing} ({wingInfo?.title.split(" ")[0]})
                    </p>
                  )}
                </div>
              </div>
              <p className="text-lg text-muted-foreground font-medium">
                {centerData.name} - Core Emotion: {centerData.emotion}
              </p>
            </div>

            {/* Enneagram Circle Diagram */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-foreground mb-4">Enneagram Diagram</h3>
              <div className="relative w-full max-w-[280px] mx-auto aspect-square">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Outer circle */}
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r={circleRadius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-border"
                  />

                  {/* Inner connections - Triangle (3-6-9) */}
                  <path
                    d={innerConnections[0]
                      .map((type, i) => {
                        const pos = getTypePosition(type as EnneagramType);
                        return i === 0 ? `M ${pos.x} ${pos.y}` : `L ${pos.x} ${pos.y}`;
                      })
                      .join(" ") + " Z"}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.3"
                    className="text-muted-foreground/50"
                  />

                  {/* Inner connections - Hexad (1-4-2-8-5-7-1) */}
                  <path
                    d={innerConnections[1]
                      .map((type, i) => {
                        const pos = getTypePosition(type as EnneagramType);
                        return i === 0 ? `M ${pos.x} ${pos.y}` : `L ${pos.x} ${pos.y}`;
                      })
                      .join(" ")}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.3"
                    className="text-muted-foreground/50"
                  />

                  {/* Type circles */}
                  {typeOrder.map((type) => {
                    const pos = getTypePosition(type);
                    const isMainType = type === result.mainType;
                    const isWing = type === result.wing;
                    const score = result.scores[type];

                    return (
                      <g key={type}>
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={isMainType ? 6 : isWing ? 5 : 4}
                          className={cn(
                            isMainType
                              ? typeColors[type].replace("bg-", "fill-")
                              : isWing
                              ? typeColors[type].replace("bg-", "fill-") + "/70"
                              : "fill-muted"
                          )}
                        />
                        <text
                          x={pos.x}
                          y={pos.y}
                          textAnchor="middle"
                          dominantBaseline="central"
                          className={cn(
                            "text-[5px] font-bold",
                            isMainType || isWing ? "fill-white" : "fill-muted-foreground"
                          )}
                        >
                          {type}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Labels outside the circle */}
                {typeOrder.map((type) => {
                  const index = typeOrder.indexOf(type);
                  const angle = (index * 2 * Math.PI) / 9 - Math.PI / 2;
                  const labelRadius = 48;
                  const x = 50 + labelRadius * Math.cos(angle);
                  const y = 50 + labelRadius * Math.sin(angle);
                  const isMainType = type === result.mainType;

                  return (
                    <div
                      key={type}
                      className={cn(
                        "absolute text-[10px] transform -translate-x-1/2 -translate-y-1/2",
                        isMainType ? "font-bold" : "text-muted-foreground"
                      )}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                      }}
                    >
                      <span className={isMainType ? typeTextColors[type] : ""}>
                        {enneagramTypeInfo[type].title.split(" ")[0]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Score Distribution Chart */}
            <div className="mb-8">
              <ScoreDistributionChart
                userScore={result.scores[result.mainType]}
                maxScore={100}
                testName="Enneagram Test"
                colorClass={typeColors[result.mainType].replace("bg-", "bg-")}
              />
            </div>

            {/* Score Bars */}
            <div className="space-y-3 mb-8">
              <h3 className="text-xl font-bold text-foreground text-left mb-4">
                Scores by Type
              </h3>
              {([1, 2, 3, 4, 5, 6, 7, 8, 9] as EnneagramType[]).map((type) => {
                const score = result.scores[type];
                const info = enneagramTypeInfo[type];
                const isMainType = type === result.mainType;
                const isWing = type === result.wing;

                return (
                  <div key={type} className="text-left">
                    <div className="flex justify-between items-center mb-1">
                      <span className={cn(
                        "text-sm font-medium",
                        isMainType ? typeTextColors[type] : "text-foreground"
                      )}>
                        {info.name} {info.title.split(" ")[0]}
                        {isMainType && " (Main Type)"}
                        {isWing && " (Wing)"}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {score}%
                      </span>
                    </div>
                    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          isMainType || isWing ? typeColors[type] : "bg-muted-foreground/30"
                        )}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Celebrity Comparison */}
            <div className="mb-8">
              <CelebrityComparison
                userScore={result.mainType}
                celebrities={enneagramCelebrities}
                maxScore={9}
                title="Famous People With Your Type"
              />
            </div>

            {/* Main Type Details */}
            <div className="space-y-4 mb-8 text-left">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {mainInfo.name} Details
              </h3>

              {/* Core Motivation, Fear, Desire */}
              <div className="grid gap-3">
                <div className={cn("p-4 rounded-lg bg-gradient-to-br", typeBgColors[result.mainType])}>
                  <h4 className={cn("text-base font-semibold mb-2", typeTextColors[result.mainType])}>
                    Core Motivation
                  </h4>
                  <p className="text-sm text-foreground leading-relaxed">{mainInfo.coreMotivation}</p>
                </div>
                <div className={cn("p-4 rounded-lg bg-gradient-to-br", typeBgColors[result.mainType])}>
                  <h4 className={cn("text-base font-semibold mb-2", typeTextColors[result.mainType])}>
                    Core Fear
                  </h4>
                  <p className="text-sm text-foreground leading-relaxed">{mainInfo.coreFear}</p>
                </div>
                <div className={cn("p-4 rounded-lg bg-gradient-to-br", typeBgColors[result.mainType])}>
                  <h4 className={cn("text-base font-semibold mb-2", typeTextColors[result.mainType])}>
                    Core Desire
                  </h4>
                  <p className="text-sm text-foreground leading-relaxed">{mainInfo.coreDesire}</p>
                </div>
              </div>

              {/* Characteristics */}
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="text-base font-semibold mb-3 text-foreground">Key Characteristics</h4>
                <ul className="space-y-1.5">
                  {mainInfo.characteristics.map((char, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                      <span className={typeTextColors[result.mainType]}>-</span>
                      {char}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Strengths & Challenges */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-green-500/10">
                  <h4 className="text-lg font-bold text-green-600 dark:text-green-400 mb-3">Strengths</h4>
                  <ul className="space-y-1.5">
                    {mainInfo.strengths.map((strength, idx) => (
                      <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-amber-500/10">
                  <h4 className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-3">Challenges</h4>
                  <ul className="space-y-1.5">
                    {mainInfo.challenges.map((challenge, idx) => (
                      <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                        <span className="text-amber-500">-</span>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Growth & Stress Directions */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-blue-500/10">
                  <h4 className="text-base font-semibold text-blue-600 dark:text-blue-400 mb-2">Growth Direction</h4>
                  <p className="text-sm text-foreground leading-relaxed">{mainInfo.growthDirection}</p>
                </div>
                <div className="p-4 rounded-lg bg-rose-500/10">
                  <h4 className="text-base font-semibold text-rose-600 dark:text-rose-400 mb-2">Stress Direction</h4>
                  <p className="text-sm text-foreground leading-relaxed">{mainInfo.stressDirection}</p>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
                <h4 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">{mainInfo.title} In-Depth Analysis</h4>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                  {mainInfo.detailedDescription}
                </p>
              </div>

              {/* Scientific Background */}
              <div className="p-6 rounded-xl bg-blue-500/10">
                <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">Psychological Background</h4>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                  {mainInfo.scientificBackground}
                </p>
              </div>

              {/* Relationship Pattern */}
              <div className="p-6 rounded-xl bg-rose-500/10">
                <h4 className="text-xl font-bold text-rose-600 dark:text-rose-400 mb-4">Relationship Pattern</h4>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                  {mainInfo.relationshipPattern}
                </p>
              </div>

              {/* Work Style */}
              <div className="p-6 rounded-xl bg-teal-500/10">
                <h4 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-4">Work Style</h4>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                  {mainInfo.workStyle}
                </p>
              </div>

              {/* Growth Strategies */}
              <div className="p-6 rounded-xl bg-emerald-500/10">
                <h4 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">Growth Strategies</h4>
                <ul className="space-y-2">
                  {mainInfo.growthStrategies.map((strategy, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-emerald-600">{idx + 1}</span>
                      </span>
                      {strategy}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Famous People */}
              <div className="p-6 rounded-xl bg-purple-500/10">
                <h4 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-4">Famous People</h4>
                <div className="flex flex-wrap gap-2">
                  {mainInfo.famousPeople.map((person, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-purple-500/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
                    >
                      {person}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended Tests */}
            <div className="mb-8">
              <RecommendedTests
                tests={[
                  {
                    title: "Big Five Personality Test",
                    description: "Explore your personality across five major dimensions (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism).",
                    url: "/test/big-five-test",
                    icon: "🎭",
                    reason: "Complements Enneagram by measuring personality traits scientifically"
                  },
                  {
                    title: "16 Personality Style Test",
                    description: "Discover your personality type based on cognitive functions and preferences in how you perceive and judge the world.",
                    url: "/test/16-personality-test",
                    icon: "🧩",
                    reason: "Another comprehensive personality framework for deeper self-understanding"
                  },
                  {
                    title: "Moral Alignment Test",
                    description: "Find your moral alignment on the spectrum of Good vs. Evil and Lawful vs. Chaotic based on D&D.",
                    url: "/test/moral-alignment-test",
                    icon: "⚖️",
                    reason: "Explores your values and ethical decision-making patterns"
                  }
                ]}
                subtitle="Deepen your self-understanding with these complementary personality assessments"
              />
            </div>

            {/* FAQ Section */}
            <div className="mb-8">
              <CollapsibleFAQ faqs={enneagramFAQs} />
            </div>

            {/* Wing Info */}
            {wingInfo && (
              <div className="mb-8 text-left">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Wing: {wingInfo.name} ({wingInfo.title})
                </h3>
                <div className={cn("p-4 rounded-lg bg-gradient-to-br", typeBgColors[result.wing!])}>
                  <p className="text-sm text-foreground mb-3">
                    The wing is the adjacent type that has a stronger influence on your main type.
                    Your {mainInfo.name} personality is complemented by the characteristics of {wingInfo.name}.
                  </p>
                  <ul className="space-y-1">
                    {wingInfo.characteristics.slice(0, 2).map((char, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className={typeTextColors[result.wing!]}>-</span>
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

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

  const question = enneagramQuestions[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Enneagram Test - Find Your Type (1-9)"
        description="Discover your Enneagram type among 9 personality types. Learn about your core motivations, fears, and desires. For entertainment purposes only."
        path="/test/enneagram-test/"
        jsonLd={breadcrumbSchema}
      />
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-background/95 backdrop-blur-sm">
        <div></div>
        <h1 className="font-medium text-foreground">Enneagram Test</h1>
        <span className="text-sm text-muted-foreground min-w-[48px] text-right">
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
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div
          className={cn(
            "transition-all duration-300",
            isTransitioning ? "opacity-0 transform translate-x-4" : "opacity-100 transform translate-x-0"
          )}
        >
          {/* Question Number */}
          <div className="text-center mb-4">
            <span className="text-sm font-medium text-primary">
              Q{currentQuestion + 1}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-xl md:text-2xl font-medium text-foreground text-center leading-relaxed mb-12">
            {question.text}
          </h2>

          {/* 5-Point Scale */}
          <div className="max-w-md mx-auto">
            {/* Labels */}
            <div className="flex justify-between mb-3 px-2">
              <span className="text-xs text-muted-foreground">Strongly Disagree</span>
              <span className="text-xs text-muted-foreground">Strongly Agree</span>
            </div>

            {/* Scale Buttons */}
            <div className="flex gap-3 justify-center">
              {answerOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(question.id, option.value)}
                  className={cn(
                    "flex-1 aspect-square max-w-16 rounded-full border-2 transition-all duration-200 flex items-center justify-center text-lg font-medium",
                    answers[question.id] === option.value
                      ? "border-primary bg-primary text-primary-foreground scale-110 shadow-lg"
                      : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {option.value}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Fixed */}
      <div className="border-t bg-background/95 backdrop-blur-sm px-4 py-4 pb-safe">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <Button
            onClick={handlePrevQuestion}
            variant="outline"
            disabled={currentQuestion === 0}
            className="gap-2 min-w-[100px]"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {showViewResultButton ? (
            <Button
              onClick={handleSubmit}
              disabled={answeredCount < totalQuestions}
              className="gradient-primary border-0 gap-2 px-6 shadow-elevated hover:shadow-card transition-all duration-300 disabled:opacity-50"
            >
              <CheckCircle2 className="w-5 h-5" />
              View Results
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              variant="outline"
              disabled={currentQuestion === totalQuestions - 1 || !answers[question.id]}
              className="gap-2 min-w-[100px]"
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

export default EnneagramTest;
