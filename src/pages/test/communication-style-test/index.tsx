import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  communicationQuestions,
  answerOptions,
  AnswerValue,
  CommunicationStyle,
  communicationStyleDescriptions,
  testBackground,
  calculateCommunicationStyle,
  communicationStyleFAQs,
  communicationStyleCelebrities,
} from "@/data/communicationStyleQuestions";
import {
  CheckCircle2,
  RotateCcw,
  Share2,
  BookOpen,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  MessageSquare,
  History,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Target,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import ProgressBar from "@/components/ProgressBar";
import ScoreDistributionChart from "@/components/ScoreDistributionChart";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import CelebrityComparison from "@/components/CelebrityComparison";
import RecommendedTests from "@/components/RecommendedTests";

const CommunicationStyleTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = communicationQuestions.length;
  const currentQuestionData = communicationQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const allQuestionsAnswered = answeredCount === totalQuestions;

  const handleAnswer = (questionId: number, value: AnswerValue) => {
    if (isTransitioning) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // Automatically move to the next question if not the last question
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
    localStorage.setItem('communicationStyleAnswers', JSON.stringify(answers));
    navigate('/test/communication-style-test/result/');
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setCurrentQuestion(0);
    setTestStarted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = async () => {
    const result = calculateCommunicationStyle(answers);
    const styleInfo = communicationStyleDescriptions[result.style];

    const shareText = `My Communication Style Test Result

Primary Style: ${styleInfo.nameKo}

${styleInfo.description}

Take the test at Test-Archive.com`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Communication Style Test Result",
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(shareText + `\n${window.location.href}`);
      alert("Result copied to clipboard!");
    }
  };

  // Result screen
  if (showResults) {
    const result = calculateCommunicationStyle(answers);
    const dominantStyle = communicationStyleDescriptions[result.style];

    const breadcrumbSchema = createBreadcrumbSchema([
      { name: "Home", item: "/" },
      { name: "Communication Style Test", item: "/test/communication-style-test" },
      { name: "Result", item: "/test/communication-style-test/result" },
    ]);

    // Sort by score
    const sortedStyles = (Object.entries(result.scores) as [CommunicationStyle, number][])
      .sort((a, b) => b[1] - a[1]);

    return (
      <div className="min-h-screen gradient-hero">
        <SEOHead
          title={`${dominantStyle.nameKo} - Communication Style Test Result | Test-Archive.com`}
          description={`Your primary communication style is ${dominantStyle.nameKo}. ${dominantStyle.description}`}
          canonicalUrl="/test/communication-style-test"
          schema={breadcrumbSchema}
        />
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
            {/* Result Hero Section */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <MessageSquare className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-muted-foreground mb-3">Your Communication Style Results</h2>
            <div className={cn("text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r bg-clip-text text-transparent", dominantStyle.color)}>
              {dominantStyle.nameKo}
            </div>
            <p className="text-xl leading-relaxed text-foreground max-w-3xl mx-auto mb-12 font-medium">{dominantStyle.description}</p>

            {/* Score Distribution Chart */}
            <div className="mb-12">
              <ScoreDistributionChart
                userScore={result.scores[result.style]}
                maxScore={100}
                testName="Communication Style Test"
                colorClass={dominantStyle.color.replace("from-", "bg-").replace(" to-", "")}
              />
            </div>

            {/* 4 Style Score Chart */}
            <div className="mb-12 p-8 rounded-xl bg-muted/30 border border-border">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Communication Style Profile</h3>
              <div className="space-y-4">
                {sortedStyles.map(([style, score], index) => {
                  const styleInfo = communicationStyleDescriptions[style];
                  const isDominant = style === result.style;
                  return (
                    <div key={style} className="text-left">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {isDominant && <Target className="w-4 h-4 text-primary" />}
                          <span className={cn("font-semibold", isDominant && "text-primary")}>
                            {styleInfo.nameKo}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">{score}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div
                          className={cn("h-3 rounded-full bg-gradient-to-r transition-all", styleInfo.color)}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Analysis of Primary Style */}
            <div className="text-left">
              {/* Detailed Description */}
              <div className="p-8 rounded-xl bg-primary/5 border border-primary/10 mb-8">
                <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-primary" />
                  <span className="text-foreground">What This Means</span>
                </h3>
                <p className="text-base text-foreground leading-relaxed font-normal">{dominantStyle.detailedDescription}</p>
              </div>

              {/* Celebrity Comparison */}
              <div className="mb-8">
                <CelebrityComparison
                  userScore={result.scores[result.style]}
                  celebrities={communicationStyleCelebrities}
                  maxScore={100}
                />
              </div>

              {/* Psychological Background */}
              <div className="p-8 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-8">
                <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
                  <Lightbulb className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  <span className="text-foreground">Psychological Background</span>
                </h3>
                <p className="text-base text-foreground leading-relaxed font-normal">{dominantStyle.psychologicalBackground}</p>
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
                    {dominantStyle.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground leading-relaxed">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="p-6 rounded-xl bg-orange-500/10 border border-orange-500/20 text-left">
                  <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-orange-700 dark:text-orange-400">
                    <TrendingDown className="w-6 h-6" />
                    <span>Areas to Develop</span>
                  </h3>
                  <ul className="space-y-3">
                    {dominantStyle.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground leading-relaxed">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Improvement Tips */}
              <div className="p-6 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-8 text-left">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-blue-700 dark:text-blue-400">
                  <Sparkles className="w-6 h-6" />
                  <span>Communication Improvement Tips</span>
                </h3>
                <ul className="space-y-4">
                  {dominantStyle.improvementTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Real-World Examples */}
              <div className="p-6 rounded-xl bg-muted/30 border border-border mb-8 text-left">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  <span className="text-foreground">Real-World Examples</span>
                </h3>
                <ul className="space-y-4">
                  {dominantStyle.exampleSituations.map((example, index) => (
                    <li key={index} className="text-sm text-foreground p-4 bg-muted/50 rounded-lg leading-relaxed">
                      {example}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Tests */}
              <div className="mb-8">
                <RecommendedTests
                  tests={[
                    {
                      title: "Emotional Intelligence Test",
                      description: "Measure your ability to recognize and manage emotions in yourself and others.",
                      url: "/test/emotional-intelligence-test",
                      icon: "🧠",
                      reason: "Communication style is deeply connected to emotional intelligence"
                    },
                    {
                      title: "Attachment Style Test",
                      description: "Discover your attachment patterns in relationships and how they affect your emotional bonds.",
                      url: "/test/attachment-style-test",
                      icon: "❤️",
                      reason: "Attachment styles heavily influence communication patterns"
                    },
                    {
                      title: "Love Language Test",
                      description: "Understand how you prefer to give and receive love in relationships.",
                      url: "/test/love-language-test",
                      icon: "💕",
                      reason: "Communication and love languages work together in relationships"
                    }
                  ]}
                  subtitle="Based on your communication style, these tests provide deeper insights"
                />
              </div>

              {/* FAQ Section */}
              <div className="mb-8">
                <CollapsibleFAQ faqs={communicationStyleFAQs} />
              </div>

              {/* Test Background Information */}
              <div className="p-6 rounded-xl bg-muted/30 border border-border mb-8 text-left">
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

  // Question screen
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Communication Style Test", item: "/test/communication-style-test" },
  ]);

  return (
    <div className="min-h-screen gradient-hero">
      <SEOHead
        title="Communication Style Test - Analyze Your Communication Approach | Test-Archive.com"
        description="Discover your communication style. Identify whether you're assertive, passive, aggressive, or passive-aggressive, and find more effective communication methods."
        canonicalUrl="/test/communication-style-test"
        schema={breadcrumbSchema}
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        {/* Landing screen or question screen */}
        {!testStarted ? (
          <div className="test-card text-center animate-scale-in max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <MessageSquare className="w-20 h-20 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Communication Style Test</h1>
            <p className="text-lg text-muted-foreground mb-8">
              A test to identify your communication approach.
              <br />
              Discover your primary tendency among Assertive, Passive, Aggressive, and Passive-Aggressive styles.
            </p>

            <div className="bg-muted/50 p-6 rounded-lg mb-8 text-left">
              <h2 className="font-semibold text-lg mb-3">Test Instructions</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                  <span>You will answer {totalQuestions} questions in total</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                  <span>Please honestly select your typical communication approach</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                  <span>Takes approximately 5 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                  <span>Results will show your primary communication style and improvement tips</span>
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

              {/* Navigation buttons */}
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
                  : `${totalQuestions - answeredCount} question${totalQuestions - answeredCount > 1 ? 's' : ''} remaining`}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CommunicationStyleTest;
