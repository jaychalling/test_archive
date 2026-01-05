import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  eqQuestions,
  answerOptions,
  AnswerValue,
  EQLevel,
  eqResultDescriptions,
  testBackground,
  eqFAQs,
  eqCelebrities,
} from "@/data/emotionalIntelligenceQuestions";
import {
  CheckCircle2,
  RotateCcw,
  Share2,
  BookOpen,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  Users,
  History,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Brain,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import ProgressBar from "@/components/ProgressBar";
import ScoreDistributionChart from "@/components/ScoreDistributionChart";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import CelebrityComparison from "@/components/CelebrityComparison";
import RecommendedTests from "@/components/RecommendedTests";

const calculateEQLevel = (answers: Record<number, AnswerValue>): { level: EQLevel; score: number } => {
  let totalScore = 0;
  let answeredCount = 0;

  eqQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      totalScore += answer;
      answeredCount++;
    }
  });

  // 점수를 0-100 스케일로 변환
  const maxPossible = answeredCount * 5;
  const minPossible = answeredCount * 1;
  const score = Math.round(((totalScore - minPossible) / (maxPossible - minPossible)) * 100);

  // EQ 레벨 결정
  let level: EQLevel;
  if (score >= 80) level = 'veryHigh';
  else if (score >= 60) level = 'high';
  else if (score >= 40) level = 'average';
  else if (score >= 20) level = 'low';
  else level = 'veryLow';

  return { level, score };
};

const EmotionalIntelligenceTest = () => {
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = eqQuestions.length;
  const currentQuestionData = eqQuestions[currentQuestion];
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
    setTestStarted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = async () => {
    const { level, score } = calculateEQLevel(answers);
    const result = eqResultDescriptions[level];

    const shareText = `My Emotional Intelligence Test Results

Level: ${result.nameKo}
Score: ${score}/100

${result.description}

Take the test at Test-Archive.com`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Emotional Intelligence Test Results",
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

  // 결과 화면
  if (showResults) {
    const { level, score } = calculateEQLevel(answers);
    const result = eqResultDescriptions[level];

    const breadcrumbSchema = createBreadcrumbSchema([
      { name: "Home", item: "/" },
      { name: "Emotional Intelligence Test", item: "/test/emotional-intelligence-test" },
      { name: "Results", item: "/test/emotional-intelligence-test/result" },
    ]);

    return (
      <div className="min-h-screen gradient-hero">
        <SEOHead
          title={`${result.nameKo} - Emotional Intelligence Test Results | Test-Archive.com`}
          description={`Your emotional intelligence level is ${result.nameKo}. ${result.description}`}
          canonicalUrl="/test/emotional-intelligence-test"
          schema={breadcrumbSchema}
        />
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
            {/* Result Hero Section */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <Brain className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-muted-foreground mb-3">
              Your Emotional Intelligence Results
            </h2>
            <div className={cn(
              "text-6xl md:text-7xl font-extrabold mb-3 bg-gradient-to-r bg-clip-text text-transparent",
              result.color
            )}>
              {result.nameKo}
            </div>
            <div className="inline-flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-bold text-primary">{score}</span>
              <span className="text-2xl font-semibold text-muted-foreground">/ 100</span>
            </div>
            <p className="text-xl leading-relaxed text-foreground max-w-3xl mx-auto mb-12 font-medium">
              {result.description}
            </p>

            {/* Score Distribution Chart */}
            <div className="mb-12">
              <ScoreDistributionChart
                userScore={score}
                maxScore={100}
                testName="Emotional Intelligence Test"
                colorClass={result.color.replace("from-", "bg-").replace(" to-", "")}
              />
            </div>

            {/* Detailed Analysis */}
            <div className="text-left p-8 rounded-xl bg-primary/5 border border-primary/10 mb-8">
              <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary" />
                <span className="text-foreground">What This Means</span>
              </h3>
              <p className="text-base text-foreground leading-relaxed font-normal">
                {result.detailedDescription}
              </p>
            </div>

            {/* Celebrity Comparison */}
            <div className="mb-8">
              <CelebrityComparison
                userScore={score}
                celebrities={eqCelebrities}
                maxScore={100}
              />
            </div>

            {/* Scientific Background */}
            <div className="text-left p-8 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-8">
              <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <span className="text-foreground">Scientific Background</span>
              </h3>
              <p className="text-base text-foreground leading-relaxed font-normal">
                {result.scientificBackground}
              </p>
            </div>

            {/* Strengths and Weaknesses */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Strengths */}
              <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20 text-left">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-green-700 dark:text-green-400">
                  <TrendingUp className="w-6 h-6" />
                  <span>Your Strengths</span>
                </h3>
                <ul className="space-y-3">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground leading-relaxed">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses (Areas for Improvement) */}
              <div className="p-6 rounded-xl bg-orange-500/10 border border-orange-500/20 text-left">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-orange-700 dark:text-orange-400">
                  <TrendingDown className="w-6 h-6" />
                  <span>Areas to Develop</span>
                </h3>
                <ul className="space-y-3">
                  {result.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground leading-relaxed">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Real-World Examples */}
            <div className="text-left p-6 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-8">
              <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-blue-700 dark:text-blue-400">
                <Users className="w-6 h-6" />
                <span>People With This Profile</span>
              </h3>
              <ul className="space-y-4">
                {result.realWorldExamples.map((example, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                      <Heart className="w-4 h-4 text-blue-600 dark:text-blue-400" />
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
                    title: "Communication Style Test",
                    description: "Understand how you express emotions and communicate with others in different situations.",
                    url: "/test/communication-style-test",
                    icon: "💬",
                    reason: "Perfect complement to understand your emotional expression patterns"
                  },
                  {
                    title: "Attachment Style Test",
                    description: "Discover your attachment patterns in relationships and how they affect your emotional bonds.",
                    url: "/test/attachment-style-test",
                    icon: "❤️",
                    reason: "Emotional intelligence strongly influences attachment behaviors"
                  },
                  {
                    title: "Big Five Personality Test",
                    description: "Explore your personality across five major dimensions including emotional stability.",
                    url: "/test/big-five-test",
                    icon: "🎭",
                    reason: "EQ correlates with several Big Five personality traits"
                  }
                ]}
                subtitle="Based on your emotional intelligence profile, these tests provide deeper insights"
              />
            </div>

            {/* FAQ Section */}
            <div className="mb-8">
              <CollapsibleFAQ faqs={eqFAQs} />
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

  // Question Screen
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Emotional Intelligence Test", item: "/test/emotional-intelligence-test" },
  ]);

  return (
    <div className="min-h-screen gradient-hero">
      <SEOHead
        title="Emotional Intelligence Test (EQ Test) - Measure Your Emotional Intelligence | Test-Archive.com"
        description="Assess your ability to recognize and manage emotions in yourself and others with the Emotional Intelligence (EQ) Test. Measures 5 areas: self-awareness, self-regulation, motivation, empathy, and social skills."
        canonicalUrl="/test/emotional-intelligence-test"
        schema={breadcrumbSchema}
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        {/* Start Screen or Question Screen */}
        {!testStarted ? (
          <div className="test-card text-center animate-scale-in max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <Brain className="w-20 h-20 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Emotional Intelligence Test</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Emotional Intelligence is the ability to recognize, understand, and manage emotions in yourself and others.
              <br />
              This test evaluates 5 areas: self-awareness, self-regulation, motivation, empathy, and social skills.
            </p>

            <div className="bg-muted/50 p-6 rounded-lg mb-8 text-left">
              <h2 className="font-semibold text-lg mb-3">Test Instructions</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                  <span>You will answer {totalQuestions} questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                  <span>Answer each question as honestly as possible</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                  <span>Takes approximately 5-7 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                  <span>There are no right or wrong answers - choose what reflects your typical behavior</span>
                </li>
              </ul>
            </div>

            <Button
              size="lg"
              onClick={() => setTestStarted(true)}
              className="text-lg px-8"
            >
              Start Test
            </Button>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <ProgressBar current={answeredCount} total={totalQuestions} />

            <div className={cn("test-card animate-scale-in", isTransitioning && "opacity-50")}>
              <div className="mb-6">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} / {totalQuestions}
                </span>
                <h2 className="text-2xl font-bold mt-2">{currentQuestionData.text}</h2>
              </div>

              <div className="space-y-3">
                {answerOptions.map((option) => {
                  const isSelected = answers[currentQuestionData.id] === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(currentQuestionData.id, option.value)}
                      disabled={isTransitioning}
                      className={cn(
                        "w-full p-4 rounded-lg border-2 text-left transition-all",
                        "hover:border-primary hover:bg-primary/5",
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card",
                        isTransitioning && "cursor-not-allowed opacity-50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                            isSelected
                              ? "border-primary bg-primary"
                              : "border-muted-foreground"
                          )}
                        >
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                          )}
                        </div>
                        <span className="font-medium">{option.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handlePrevQuestion}
                  disabled={currentQuestion === 0 || isTransitioning}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                {isLastQuestion ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!allQuestionsAnswered || isTransitioning}
                    className="gap-2"
                  >
                    View Results
                    <CheckCircle2 className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={handleNextQuestion}
                    disabled={isTransitioning}
                    className="gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <p className="text-sm text-muted-foreground text-center mt-4">
                {allQuestionsAnswered
                  ? "All questions answered. Check your results!"
                  : `${totalQuestions - answeredCount} questions remaining`}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EmotionalIntelligenceTest;
