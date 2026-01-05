import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  bdsmQuestions,
  BdsmAnswerValue,
  BdsmResult,
  bdsmTraitDescriptions,
  testBackground,
  bdsmFAQs,
  bdsmCelebrities,
} from "@/data/bdsmTestQuestions";
import { CheckCircle2, RotateCcw, Share2, ChevronLeft, ChevronRight, BookOpen, Brain, Heart, MessageCircle, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import ScoreDistributionChart from "@/components/ScoreDistributionChart";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import CelebrityComparison from "@/components/CelebrityComparison";
import RecommendedTests from "@/components/RecommendedTests";

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

    const shareText = `My BDSM Test Result: ${mainTraitName}\n\nDominant: ${result.dominant}%\nSubmissive: ${result.submissive}%\nSadism: ${result.sadism}%\nMasochism: ${result.masochism}%\nSwitch: ${result.switch}%`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "BDSM Test Result",
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
    { name: 'BDSM Test', path: '/test/bdsm-test/' },
  ]);

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

    const traitTextColors: Record<string, string> = {
      dominant: "text-red-600",
      submissive: "text-blue-600",
      sadism: "text-orange-600",
      masochism: "text-purple-600",
      switch: "text-green-600",
    };

    const traitBgColors: Record<string, string> = {
      dominant: "bg-red-500/10",
      submissive: "bg-blue-500/10",
      sadism: "bg-orange-500/10",
      masochism: "bg-purple-500/10",
      switch: "bg-green-500/10",
    };

    return (
      <div className="min-h-screen gradient-hero">
        <SEOHead
          title="Your BDSM Profile - BDSM Test Results"
          description="See your BDSM test results and what they mean. Understand your preferences in relationship dynamics."
          path="/test/bdsm-test/"
          jsonLd={breadcrumbSchema}
        />
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-muted-foreground mb-3">
              Your BDSM Profile Results
            </h2>
            <div className={cn("text-6xl md:text-7xl font-extrabold mb-3 bg-gradient-to-r bg-clip-text text-transparent",
              mainTrait === "dominant" ? "from-red-400 to-red-600" :
              mainTrait === "submissive" ? "from-blue-400 to-blue-600" :
              mainTrait === "sadism" ? "from-orange-400 to-orange-600" :
              mainTrait === "masochism" ? "from-purple-400 to-purple-600" :
              "from-green-400 to-green-600"
            )}>
              {mainTraitInfo.name}
            </div>
            <p className="text-lg text-muted-foreground mb-2">
              {mainTraitInfo.nameEn}
            </p>
            <p className="text-xl leading-relaxed text-foreground max-w-3xl mx-auto mb-12 font-medium">
              {mainTraitInfo.description}
            </p>

            {/* Secondary Trait */}
            <div className="p-4 rounded-lg bg-muted/30 mb-6">
              <div className="text-sm text-muted-foreground mb-1">Secondary Trait</div>
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

            {/* Score Distribution Chart */}
            <div className="mb-8">
              <ScoreDistributionChart
                userScore={result[mainTrait]}
                maxScore={100}
                testName="BDSM Test"
                colorClass={traitColors[mainTrait]}
              />
            </div>

            {/* Detailed Description */}
            <div className={cn("text-left p-8 rounded-xl mb-8", traitBgColors[mainTrait])}>
              <h3 className={cn("text-2xl font-bold mb-5 flex items-center gap-3", traitTextColors[mainTrait])}>
                <BookOpen className="w-6 h-6" />
                <span>What This Means</span>
              </h3>
              <p className="text-base text-foreground leading-relaxed font-normal">
                {mainTraitInfo.detailedDescription}
              </p>
            </div>

            {/* Psychological Background */}
            <div className="text-left p-8 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-8">
              <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
                <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <span className="text-foreground">Psychological Background</span>
              </h3>
              <p className="text-base text-foreground leading-relaxed font-normal">
                {mainTraitInfo.psychologicalBackground}
              </p>
            </div>

            {/* Characteristics */}
            <div className="text-left p-6 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-8">
              <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-cyan-700 dark:text-cyan-400">
                <CheckCircle2 className="w-6 h-6" />
                <span>Key Characteristics</span>
              </h3>
              <ul className="grid md:grid-cols-2 gap-3">
                {mainTraitInfo.characteristics.map((char, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground leading-relaxed">{char}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Healthy Practices & Communication Tips */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="text-left p-6 rounded-xl bg-green-500/10 border border-green-500/20">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-green-700 dark:text-green-400">
                  <Heart className="w-6 h-6" />
                  <span>Healthy Practices</span>
                </h3>
                <ul className="space-y-3">
                  {mainTraitInfo.healthyPractices.map((practice, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground leading-relaxed">{practice}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-left p-6 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-indigo-700 dark:text-indigo-400">
                  <MessageCircle className="w-6 h-6" />
                  <span>Communication Tips</span>
                </h3>
                <ul className="space-y-3">
                  {mainTraitInfo.communicationTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Celebrity Comparison */}
            <div className="mb-8">
              <CelebrityComparison
                userScore={result[mainTrait]}
                celebrities={bdsmCelebrities}
                maxScore={100}
                title="Your Profile is Similar To..."
              />
            </div>

            {/* Recommended Tests */}
            <div className="mb-8">
              <RecommendedTests
                tests={[
                  {
                    title: "Attachment Style Test",
                    description: "Discover your attachment patterns in relationships and how they affect your emotional bonds.",
                    url: "/test/attachment-style-test",
                    icon: "❤️",
                    reason: "BDSM preferences often correlate with attachment styles in relationships"
                  },
                  {
                    title: "Communication Style Test",
                    description: "Understand how you express yourself and communicate with others in different situations.",
                    url: "/test/communication-style-test",
                    icon: "💬",
                    reason: "Effective communication is essential for healthy BDSM dynamics"
                  },
                  {
                    title: "Moral Alignment Test",
                    description: "Explore your ethical and moral framework based on the D&D alignment system.",
                    url: "/test/moral-alignment-test",
                    icon: "⚖️",
                    reason: "Understanding your moral compass helps navigate consent and boundaries"
                  }
                ]}
                subtitle="Based on your BDSM profile, these tests provide deeper insights into your relationship dynamics"
              />
            </div>

            {/* FAQ Section */}
            <div className="mb-8">
              <CollapsibleFAQ faqs={bdsmFAQs} title="Frequently Asked Questions" />
            </div>

            {/* Test Background */}
            <div className="text-left p-6 rounded-xl bg-muted/30 border border-border mb-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary" />
                <span className="text-foreground">About This Test</span>
              </h3>
              <div className="space-y-5">
                <div>
                  <h4 className="font-bold text-base mb-2 text-foreground">Introduction</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {testBackground.about}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-base mb-2 text-foreground">Consent and Safety</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {testBackground.consent}
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

  const question = bdsmQuestions[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="BDSM Test - Discover Your Preferences"
        description="Take the BDSM Test to explore your relationship dynamics preferences. A self-assessment test for adults. For entertainment purposes only."
        path="/test/bdsm-test/"
        jsonLd={breadcrumbSchema}
      />
      {/* 상단 바 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/95 backdrop-blur-sm">
        <div></div>
        <h1 className="font-semibold text-foreground">BDSM Test</h1>
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
              <span className="text-xs text-muted-foreground">Strongly Disagree</span>
              <span className="text-xs text-muted-foreground">Strongly Agree</span>
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
          Previous
        </Button>

        {isLastQuestion && allQuestionsAnswered ? (
          <Button
            onClick={handleSubmit}
            className="gradient-primary border-0 gap-2 px-6"
          >
            <CheckCircle2 className="w-4 h-4" />
            View Results
          </Button>
        ) : (
          <Button
            onClick={handleNextQuestion}
            variant="ghost"
            disabled={isLastQuestion}
            className="gap-1"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default BdsmTest;
