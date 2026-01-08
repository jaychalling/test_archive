import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  loveCompatibilityQuestions,
  AnswerValue,
  CompatibilityResult,
  CompatibilityLevel,
  compatibilityDescriptions,
  compatibilityCelebrities,
} from "@/data/loveCompatibilityQuestions";
import { CheckCircle2, ChevronLeft, ChevronRight, RotateCcw, Share2, Heart } from "lucide-react";
import ScoreDistributionChart from "@/components/ScoreDistributionChart";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import CelebrityComparison from "@/components/CelebrityComparison";
import RecommendedTests from "@/components/RecommendedTests";
import { cn } from "@/lib/utils";

const calculateResults = (answers: Record<number, AnswerValue>): CompatibilityResult => {
  const categoryScores = {
    communication: 0,
    values: 0,
    emotional: 0,
    lifestyle: 0,
    conflict: 0,
  };

  const categoryCounts = {
    communication: 0,
    values: 0,
    emotional: 0,
    lifestyle: 0,
    conflict: 0,
  };

  // Calculate sum for each category
  loveCompatibilityQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      categoryScores[question.category] += answer;
      categoryCounts[question.category]++;
    }
  });

  // Convert to percentage: ((avgScore - 1) / 4) * 100
  const categoryPercentages: CompatibilityResult["categoryScores"] = {
    communication: 0,
    values: 0,
    emotional: 0,
    lifestyle: 0,
    conflict: 0,
  };

  let totalPercentage = 0;
  let categoryCount = 0;

  Object.keys(categoryScores).forEach((key) => {
    const category = key as keyof typeof categoryScores;
    if (categoryCounts[category] > 0) {
      const avgScore = categoryScores[category] / categoryCounts[category];
      categoryPercentages[category] = Math.round(((avgScore - 1) / 4) * 100);
      totalPercentage += categoryPercentages[category];
      categoryCount++;
    }
  });

  // Overall score = average of all category scores
  const overallScore = categoryCount > 0 ? Math.round(totalPercentage / categoryCount) : 0;

  // Determine compatibility level
  let compatibilityLevel: CompatibilityLevel;
  if (overallScore >= 80) {
    compatibilityLevel = "Excellent";
  } else if (overallScore >= 65) {
    compatibilityLevel = "High";
  } else if (overallScore >= 50) {
    compatibilityLevel = "Good";
  } else if (overallScore >= 35) {
    compatibilityLevel = "Moderate";
  } else {
    compatibilityLevel = "Low";
  }

  return {
    overallScore,
    categoryScores: categoryPercentages,
    compatibilityLevel,
  };
};

const levelColors: Record<CompatibilityLevel, string> = {
  Excellent: "from-pink-500 to-rose-500",
  High: "from-pink-400 to-rose-400",
  Good: "from-pink-500 to-purple-500",
  Moderate: "from-amber-500 to-orange-500",
  Low: "from-slate-400 to-slate-500",
};

const levelBgColors: Record<CompatibilityLevel, string> = {
  Excellent: "from-pink-500/10 to-rose-500/10",
  High: "from-pink-500/10 to-purple-500/10",
  Good: "from-purple-500/10 to-indigo-500/10",
  Moderate: "from-amber-500/10 to-orange-500/10",
  Low: "from-slate-500/10 to-slate-600/10",
};

const categoryLabels = {
  communication: "Communication",
  values: "Values & Goals",
  emotional: "Emotional Connection",
  lifestyle: "Lifestyle & Interests",
  conflict: "Conflict Resolution",
};

const categoryColors = {
  communication: "bg-blue-500",
  values: "bg-green-500",
  emotional: "bg-pink-500",
  lifestyle: "bg-purple-500",
  conflict: "bg-orange-500",
};

const LoveCompatibilityTest = () => {
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCompleteButton, setShowCompleteButton] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = loveCompatibilityQuestions.length;
  const currentQuestionData = loveCompatibilityQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const allAnswered = answeredCount === totalQuestions;

  // Show complete button when last question is answered
  useEffect(() => {
    if (isLastQuestion && answers[currentQuestionData.id] !== undefined) {
      setShowCompleteButton(true);
    }
  }, [isLastQuestion, answers, currentQuestionData.id]);

  const handleAnswer = (questionId: number, value: AnswerValue) => {
    if (isTransitioning) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // Auto-advance to next question unless it's the last question
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
    setShowCompleteButton(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = async () => {
    const result = calculateResults(answers);
    const levelInfo = compatibilityDescriptions[result.compatibilityLevel];

    const shareText = `My Love Compatibility Test Result

Compatibility Level: ${result.compatibilityLevel} (${result.overallScore}%)
Communication: ${result.categoryScores.communication}%
Values & Goals: ${result.categoryScores.values}%
Emotional Connection: ${result.categoryScores.emotional}%
Lifestyle: ${result.categoryScores.lifestyle}%
Conflict Resolution: ${result.categoryScores.conflict}%

${levelInfo.shortDescription}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Love Compatibility Test Result",
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
    { name: 'Love Compatibility Test', path: '/test/love-compatibility-test/' },
  ]);

  if (showResults) {
    const result = calculateResults(answers);
    const levelInfo = compatibilityDescriptions[result.compatibilityLevel];

    return (
      <div className="min-h-screen gradient-hero">
        <SEOHead
          title="Your Love Compatibility - Test Results"
          description="Understand your relationship compatibility across communication, values, emotional connection, lifestyle, and conflict resolution."
          path="/test/love-compatibility-test/"
          jsonLd={breadcrumbSchema}
        />
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
            {/* Result Hero Section */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center">
                <Heart className="w-10 h-10 text-pink-500" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-muted-foreground mb-3">
              Your Love Compatibility Results
            </h2>
            <div className={cn(
              "text-6xl md:text-7xl font-extrabold mb-3 bg-gradient-to-r bg-clip-text text-transparent",
              levelColors[result.compatibilityLevel]
            )}>
              {result.overallScore}%
            </div>
            <div className="text-2xl font-bold text-foreground mb-3">
              {levelInfo.label}
            </div>
            <p className="text-xl leading-relaxed text-foreground max-w-3xl mx-auto mb-12 font-medium">
              {levelInfo.shortDescription}
            </p>

            {/* Category Breakdown */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-foreground mb-6">Category Breakdown</h3>
              <div className="grid gap-4">
                {Object.entries(result.categoryScores).map(([category, score]) => (
                  <div key={category} className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-foreground">
                        {categoryLabels[category as keyof typeof categoryLabels]}
                      </div>
                      <div className="text-lg font-bold text-foreground">{score}%</div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          categoryColors[category as keyof typeof categoryColors]
                        )}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Score Distribution Chart */}
            <div className="mb-12">
              <ScoreDistributionChart
                userScore={result.overallScore}
                maxScore={100}
                testName="Love Compatibility Test"
                colorClass="bg-pink-500"
              />
            </div>

            {/* What This Means */}
            <div className={cn(
              "text-left p-6 rounded-xl mb-8 bg-gradient-to-br",
              levelBgColors[result.compatibilityLevel]
            )}>
              <h3 className="text-2xl font-bold text-foreground mb-5">What This Typically Means</h3>
              <div className="space-y-4">
                {levelInfo.meaning.map((paragraph, idx) => (
                  <p key={idx} className="text-base text-foreground leading-relaxed font-normal">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Common Traits */}
            <div className="text-left p-6 rounded-xl bg-primary/5 border border-primary/10 mb-8">
              <h3 className="text-2xl font-bold mb-5 text-foreground">
                Common Traits
              </h3>
              <ul className="space-y-3">
                {levelInfo.traits.map((trait, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-pink-500" />
                    <span className="text-base text-foreground leading-relaxed font-normal">{trait}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Celebrity Comparison */}
            <div className="mb-8">
              <CelebrityComparison
                userScore={0}
                celebrities={compatibilityCelebrities[result.compatibilityLevel].map(c => ({
                  name: c.name,
                  score: 85,
                  description: c.description,
                }))}
                maxScore={100}
                title="Celebrity Couples With Similar Compatibility"
              />
            </div>

            {/* Relationship Advice */}
            <div className="text-left p-6 rounded-xl bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/20 mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-5">Relationship Advice</h3>
              <ul className="space-y-3">
                {levelInfo.advice.map((advice, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-rose-500" />
                    <span className="text-base text-foreground leading-relaxed font-normal">{advice}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Tests */}
            <div className="mb-8">
              <RecommendedTests
                tests={[
                  {
                    title: "Love Language Test",
                    description: "Discover how you prefer to give and receive love in relationships.",
                    url: "/test/love-language-test",
                    icon: "💕",
                    reason: "Understanding your love language complements compatibility awareness"
                  },
                  {
                    title: "Attachment Style Test",
                    description: "Find your attachment pattern and how it affects your relationships.",
                    url: "/test/attachment-style-test",
                    icon: "💝",
                    reason: "Attachment style deeply influences relationship compatibility"
                  },
                  {
                    title: "Communication Style Test",
                    description: "Understand your communication patterns and how they impact relationships.",
                    url: "/test/communication-style-test",
                    icon: "💬",
                    reason: "Effective communication is essential for lasting compatibility"
                  }
                ]}
                subtitle="Based on your compatibility results, these tests provide deeper relationship insights"
              />
            </div>

            {/* FAQ Section */}
            <div className="mb-8">
              <CollapsibleFAQ faqs={levelInfo.faqs} />
            </div>

            {/* Disclaimer */}
            <div className="text-center p-4 rounded-lg bg-muted/30 mb-8">
              <p className="text-sm text-muted-foreground">
                <strong>Disclaimer:</strong> This test is for entertainment purposes only.
                Real relationship compatibility involves many factors beyond a questionnaire,
                including mutual effort, timing, and shared experiences. Use these insights as
                a starting point for self-reflection, not as definitive relationship advice.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button onClick={handleReset} variant="outline" size="lg" className="gap-2 min-w-[160px]">
                <RotateCcw className="w-5 h-5" />
                <span className="font-semibold">Retake Test</span>
              </Button>
              <Button
                onClick={handleShare}
                size="lg"
                className="gap-2 min-w-[160px] bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
              >
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
        title="Love Compatibility Test - Find Your Relationship Readiness | Test Archive"
        description="Discover your love compatibility across communication, values, emotional connection, lifestyle, and conflict resolution. For entertainment purposes only."
        path="/test/love-compatibility-test/"
        jsonLd={breadcrumbSchema}
      />
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-background/95 backdrop-blur-sm">
        <div></div>
        <h1 className="font-semibold text-foreground">Love Compatibility Test</h1>
        <span className="text-sm text-muted-foreground min-w-[48px] text-right">
          {currentQuestion + 1}/{totalQuestions}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question area */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div
          className={cn(
            "transition-all duration-300",
            isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          )}
        >
          <div className="text-center">
            <span className="inline-block text-sm font-medium text-pink-500 mb-4">
              Q{currentQuestion + 1}
            </span>
            <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
              {currentQuestionData.text}
            </p>
            <div className="mt-4">
              <span className="inline-block px-3 py-1 bg-muted/50 rounded-full text-xs text-muted-foreground">
                {categoryLabels[currentQuestionData.category]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5-point scale */}
      <div className="px-6 pb-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-3">
          <span>Strongly Disagree</span>
          <span>Strongly Agree</span>
        </div>
        <div className="flex justify-center gap-3">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => handleAnswer(currentQuestionData.id, value as AnswerValue)}
              className={cn(
                "flex-1 aspect-square max-w-16 rounded-full border-2 flex items-center justify-center text-lg font-medium transition-all duration-200",
                answers[currentQuestionData.id] === value
                  ? "border-pink-500 bg-pink-500 text-white scale-110"
                  : "border-border hover:border-pink-500/50 text-muted-foreground hover:text-foreground hover:scale-105"
              )}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="border-t bg-background/95 backdrop-blur-sm px-4 py-4 pb-safe">
        <div className="flex gap-3">
          <Button
            onClick={handlePrevQuestion}
            variant="outline"
            disabled={currentQuestion === 0}
            className="flex-1 gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {isLastQuestion && allAnswered ? (
            <Button
              onClick={handleSubmit}
              className="flex-1 gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 border-0"
            >
              <CheckCircle2 className="w-4 h-4" />
              View Results
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              variant="outline"
              disabled={currentQuestion === totalQuestions - 1 || answers[currentQuestionData.id] === undefined}
              className="flex-1 gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Unanswered questions notice */}
        {isLastQuestion && !allAnswered && (
          <p className="text-xs text-muted-foreground text-center mt-3">
            {answeredCount}/{totalQuestions} questions answered - Please answer all questions
          </p>
        )}
      </div>
    </div>
  );
};

export default LoveCompatibilityTest;
