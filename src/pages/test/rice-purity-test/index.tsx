import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  ricePurityQuestions,
  getScoreRange,
  testBackground,
  ricePurityFAQs,
  ricePurityCelebrities
} from "@/data/ricePurityQuestions";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  RotateCcw,
  Share2,
  BookOpen,
  Lightbulb,
  History,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import ScoreDistributionChart from "@/components/ScoreDistributionChart";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import CelebrityComparison from "@/components/CelebrityComparison";
import RecommendedTests from "@/components/RecommendedTests";

const RicePurityTest = () => {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalQuestions = ricePurityQuestions.length;

  const handleAnswer = (isYes: boolean) => {
    if (isTransitioning) return;
    // Update checked items
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (isYes) {
        newSet.add(currentQuestion);
      } else {
        newSet.delete(currentQuestion);
      }
      return newSet;
    });

    // Mark question as answered
    setAnsweredQuestions((prev) => {
      const newSet = new Set(prev);
      newSet.add(currentQuestion);
      return newSet;
    });

    // Auto-advance to next question after 0.1s
    if (currentQuestion < totalQuestions - 1) {
      setTimeout(() => {
        goToNext();
      }, 100);
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setIsTransitioning(false);
      }, 100);
    }
  };

  const goToNext = () => {
    if (currentQuestion < totalQuestions - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setIsTransitioning(false);
      }, 100);
    }
  };

  const calculateScore = () => {
    return 100 - checkedItems.size;
  };

  const handleSubmit = () => {
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setCheckedItems(new Set());
    setAnsweredQuestions(new Set());
    setCurrentQuestion(0);
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const isFirstQuestion = currentQuestion === 0;
  const currentQuestionAnswered = answeredQuestions.has(currentQuestion);
  const allQuestionsAnswered = answeredQuestions.size === totalQuestions;

  const handleShare = async () => {
    const score = calculateScore();
    const scoreRange = getScoreRange(score);

    const shareText = `My Rice Purity Test Results

Score: ${score}/100
${scoreRange.title} ${scoreRange.emoji}

${scoreRange.description}

Take the test at Test-Archive.com`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Rice Purity Test Results",
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(shareText + `\n${window.location.href}`);
      alert("Results copied to clipboard!");
    }
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Rice Purity Test', path: '/test/rice-purity/' },
  ]);

  // Color mapping for different score ranges
  const colorClasses: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-600", border: "border-emerald-500/20", gradient: "from-emerald-400 to-teal-500" },
    green: { bg: "bg-green-500/10", text: "text-green-600", border: "border-green-500/20", gradient: "from-green-400 to-emerald-500" },
    blue: { bg: "bg-blue-500/10", text: "text-blue-600", border: "border-blue-500/20", gradient: "from-blue-400 to-cyan-500" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-600", border: "border-amber-500/20", gradient: "from-amber-400 to-orange-500" },
    orange: { bg: "bg-orange-500/10", text: "text-orange-600", border: "border-orange-500/20", gradient: "from-orange-400 to-red-500" },
    red: { bg: "bg-red-500/10", text: "text-red-600", border: "border-red-500/20", gradient: "from-red-400 to-pink-500" },
  };

  if (showResults) {
    const score = calculateScore();
    const scoreRange = getScoreRange(score);
    const colors = colorClasses[scoreRange.color] || colorClasses.blue;

    const resultBreadcrumbSchema = createBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Rice Purity Test", path: "/test/rice-purity/" },
      { name: "Results", path: "/test/rice-purity/result" },
    ]);

    return (
      <div className="min-h-screen gradient-hero theme-purity">
        <SEOHead
          title={`${scoreRange.title} - Rice Purity Test Results | Test-Archive.com`}
          description={`Your Rice Purity score is ${score}/100. ${scoreRange.description}`}
          path="/test/rice-purity/"
          jsonLd={resultBreadcrumbSchema}
        />
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
            {/* Result Hero Section */}
            <div className="flex justify-center mb-6">
              <div className="text-8xl">{scoreRange.emoji}</div>
            </div>
            <h2 className="text-2xl font-semibold text-muted-foreground mb-3">
              Your Rice Purity Test Results
            </h2>
            <div className={cn(
              "text-6xl md:text-7xl font-extrabold mb-3 bg-gradient-to-r bg-clip-text text-transparent",
              colors.gradient
            )}>
              {scoreRange.title}
            </div>
            <div className="inline-flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-bold text-primary">{score}</span>
              <span className="text-2xl font-semibold text-muted-foreground">/ 100</span>
            </div>
            <p className="text-xl leading-relaxed text-foreground max-w-3xl mx-auto mb-12 font-medium">
              {scoreRange.description}
            </p>

            {/* Score Distribution Chart */}
            <div className="mb-12">
              <ScoreDistributionChart
                userScore={score}
                maxScore={100}
                testName="Rice Purity Test"
                colorClass={colors.gradient.replace("from-", "bg-").replace(" to-", "")}
              />
            </div>

            {/* Detailed Analysis */}
            <div className={cn("text-left p-8 rounded-xl border mb-8", colors.bg, colors.border)}>
              <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
                <BookOpen className={cn("w-6 h-6", colors.text)} />
                <span className="text-foreground">What This Means</span>
              </h3>
              <p className="text-base text-foreground leading-relaxed font-normal mb-4">
                {scoreRange.detailedDescription}
              </p>
            </div>

            {/* Celebrity/Archetype Comparison */}
            <div className="mb-8">
              <CelebrityComparison
                userScore={score}
                celebrities={ricePurityCelebrities}
                maxScore={100}
                title="Your Score Compared to Others"
              />
            </div>

            {/* Interpretation */}
            <div className="text-left p-8 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-8">
              <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <span className="text-foreground">Interpretation</span>
              </h3>
              <p className="text-base text-foreground leading-relaxed font-normal">
                {scoreRange.interpretation}
              </p>
            </div>

            {/* Characteristics & Tips */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Common Characteristics */}
              <div className="p-6 rounded-xl bg-blue-500/10 border border-blue-500/20 text-left">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-blue-700 dark:text-blue-400">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Common Characteristics</span>
                </h3>
                <ul className="space-y-3">
                  {scoreRange.commonCharacteristics.map((char, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground leading-relaxed">{char}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lifestyle Tips */}
              <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20 text-left">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-green-700 dark:text-green-400">
                  <Lightbulb className="w-6 h-6" />
                  <span>Lifestyle Tips</span>
                </h3>
                <ul className="space-y-3">
                  {scoreRange.lifestyleTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommended Tests */}
            <div className="mb-8">
              <RecommendedTests
                tests={[
                  {
                    title: "Moral Alignment Test",
                    description: "Discover your ethical stance and moral compass through the classic D&D alignment system.",
                    url: "/test/moral-alignment-test",
                    icon: "⚖️",
                    reason: "Your experiences shape your moral perspective and values"
                  },
                  {
                    title: "BDSM Test",
                    description: "Explore your preferences and comfort levels across different relationship dynamics.",
                    url: "/test/bdsm-test",
                    icon: "🔗",
                    reason: "Understanding your boundaries and preferences in intimate contexts"
                  },
                  {
                    title: "Attachment Style Test",
                    description: "Understand your emotional patterns and how you form connections in relationships.",
                    url: "/test/attachment-style-test",
                    icon: "❤️",
                    reason: "Your relationship experiences influence your attachment patterns"
                  }
                ]}
                subtitle="Based on your life experiences, these tests provide deeper insights"
              />
            </div>

            {/* FAQ Section */}
            <div className="mb-8">
              <CollapsibleFAQ faqs={ricePurityFAQs} />
            </div>

            {/* Test Background Information */}
            <div className="text-left p-6 rounded-xl bg-muted/30 border border-border mb-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <History className="w-6 h-6 text-primary" />
                <span className="text-foreground">About This Test</span>
              </h3>

              <div className="space-y-5">
                <div>
                  <h4 className="font-bold text-base mb-2 text-foreground">History</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{testBackground.history}</p>
                </div>

                <div>
                  <h4 className="font-bold text-base mb-2 text-foreground">Purpose</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{testBackground.purpose}</p>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-lg">
                  <h4 className="font-bold text-base mb-2 flex items-center gap-2 text-amber-700 dark:text-amber-400">
                    <AlertCircle className="w-5 h-5" />
                    <span>Important Note</span>
                  </h4>
                  <p className="text-sm text-foreground leading-relaxed">{testBackground.disclaimer}</p>
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
    <div className="min-h-screen gradient-hero theme-purity">
      <SEOHead
        title="Original Rice Purity Test - 100 Questions"
        description="Take the Original Rice Purity Test with 100 questions. Check your purity score and see what it means. The classic innocence test for entertainment."
        path="/test/rice-purity/"
        jsonLd={breadcrumbSchema}
      />
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Rice Purity Test
            </h1>
            <p className="text-muted-foreground">
              Answer each question with "Yes" or "No".
            </p>
          </div>

          {/* Progress */}
          <div className="bg-background/80 backdrop-blur-md py-4 mb-6 -mx-4 px-4">
            <ProgressBar current={answeredQuestions.size} total={totalQuestions} />
          </div>

          {/* Question Number */}
          <div className="text-center mb-6">
            <span className="text-lg font-medium text-foreground">
              {currentQuestion + 1} / {totalQuestions}
            </span>
          </div>

          {/* Question Card */}
          <div className="test-card mb-8">
            <div
              className={`transition-opacity duration-150 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="py-8 px-4 text-center">
                <p className="text-xl md:text-2xl font-medium text-foreground mb-8">
                  {ricePurityQuestions[currentQuestion]}
                </p>

                {/* Yes/No Buttons */}
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() => handleAnswer(true)}
                    size="lg"
                    variant={checkedItems.has(currentQuestion) && currentQuestionAnswered ? "default" : "outline"}
                    className={`min-w-[120px] ${
                      checkedItems.has(currentQuestion) && currentQuestionAnswered
                        ? "bg-green-500 hover:bg-green-600 border-green-500"
                        : "hover:bg-green-50 hover:border-green-500 hover:text-green-600"
                    }`}
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={() => handleAnswer(false)}
                    size="lg"
                    variant={!checkedItems.has(currentQuestion) && currentQuestionAnswered ? "default" : "outline"}
                    className={`min-w-[120px] ${
                      !checkedItems.has(currentQuestion) && currentQuestionAnswered
                        ? "bg-red-500 hover:bg-red-600 border-red-500"
                        : "hover:bg-red-50 hover:border-red-500 hover:text-red-600"
                    }`}
                  >
                    No
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pb-12">
            <Button
              onClick={goToPrevious}
              disabled={isFirstQuestion}
              variant="outline"
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            {isLastQuestion && currentQuestionAnswered ? (
              <Button
                onClick={handleSubmit}
                className="gradient-primary border-0 gap-2 px-8 shadow-elevated hover:shadow-card transition-all duration-300"
              >
                <CheckCircle2 className="w-5 h-5" />
                View Results
              </Button>
            ) : (
              <Button
                onClick={goToNext}
                disabled={isLastQuestion}
                variant="outline"
                className="gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Progress Info */}
          <div className="text-center pb-8">
            <p className="text-xs text-muted-foreground">
              {answeredQuestions.size} questions answered · {checkedItems.size} items selected
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RicePurityTest;
