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
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import ProgressBar from "@/components/ProgressBar";

const CommunicationStyleTest = () => {
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [showResults, setShowResults] = useState(false);
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
            {/* Result title */}
            <div className="flex justify-center mb-4">
              <MessageSquare className="w-16 h-16 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Your Communication Style</h2>
            <div className={cn("text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent", dominantStyle.color)}>
              {dominantStyle.nameKo}
            </div>
            <p className="text-lg text-muted-foreground mb-8">{dominantStyle.description}</p>

            {/* 4 Style Score Chart */}
            <div className="mb-8 p-6 rounded-xl bg-muted/30">
              <h3 className="text-xl font-semibold mb-6">Communication Style Profile</h3>
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
              <h3 className="text-2xl font-bold mb-6">Detailed Analysis of Primary Style</h3>

              {/* Detailed Description */}
              <div className="p-6 rounded-xl bg-primary/5 mb-6">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Detailed Analysis
                </h4>
                <p className="text-muted-foreground leading-relaxed">{dominantStyle.detailedDescription}</p>
              </div>

              {/* Psychological Background */}
              <div className="p-6 rounded-xl bg-purple-500/10 mb-6">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  Psychological Background
                </h4>
                <p className="text-muted-foreground leading-relaxed">{dominantStyle.psychologicalBackground}</p>
              </div>

              {/* Strengths and Weaknesses */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {/* Strengths */}
                <div className="p-5 rounded-xl bg-green-500/10">
                  <h4 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-700 dark:text-green-400">
                    <TrendingUp className="w-5 h-5" />
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {dominantStyle.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="p-5 rounded-xl bg-orange-500/10">
                  <h4 className="text-xl font-semibold mb-4 flex items-center gap-2 text-orange-700 dark:text-orange-400">
                    <TrendingDown className="w-5 h-5" />
                    Areas to Watch
                  </h4>
                  <ul className="space-y-2">
                    {dominantStyle.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Improvement Tips */}
              <div className="p-6 rounded-xl bg-blue-500/10 mb-6">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-700 dark:text-blue-400">
                  <Sparkles className="w-5 h-5" />
                  Communication Improvement Tips
                </h4>
                <ul className="space-y-3">
                  {dominantStyle.improvementTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Real-World Examples */}
              <div className="p-6 rounded-xl bg-muted/30 mb-6">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Real-World Examples
                </h4>
                <ul className="space-y-3">
                  {dominantStyle.exampleSituations.map((example, index) => (
                    <li key={index} className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-lg">
                      {example}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Test Background Information */}
              <div className="p-6 rounded-xl bg-muted/30 mb-8">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <History className="w-5 h-5 text-primary" />
                  About Communication Style Theory
                </h4>

                <div className="mb-4">
                  <h5 className="font-semibold text-lg mb-2">History</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">{testBackground.history}</p>
                </div>

                <div className="mb-4">
                  <h5 className="font-semibold text-lg mb-2">Purpose</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">{testBackground.purpose}</p>
                </div>

                <div className="bg-amber-500/10 p-4 rounded-lg">
                  <h5 className="font-semibold text-lg mb-2 flex items-center gap-2 text-amber-700 dark:text-amber-400">
                    <AlertCircle className="w-5 h-5" />
                    Disclaimer
                  </h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">{testBackground.disclaimer}</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={handleReset} variant="outline" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Retake Test
              </Button>
              <Button onClick={handleShare} className="gap-2">
                <Share2 className="w-4 h-4" />
                Share Results
              </Button>
            </div>

            {/* Related Tests */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-xl font-semibold mb-6">Try Other Tests</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/test/emotional-intelligence-test"
                  className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left"
                >
                  <h4 className="font-semibold mb-2">Emotional Intelligence Test</h4>
                  <p className="text-sm text-muted-foreground">Measure your emotional management abilities</p>
                </Link>
                <Link
                  to="/test/attachment-style-test"
                  className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left"
                >
                  <h4 className="font-semibold mb-2">Attachment Style Test</h4>
                  <p className="text-sm text-muted-foreground">Discover your attachment style in relationships</p>
                </Link>
                <Link
                  to="/test/big-five-test"
                  className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left"
                >
                  <h4 className="font-semibold mb-2">Big Five Personality Test</h4>
                  <p className="text-sm text-muted-foreground">Analyze your 5 personality traits</p>
                </Link>
              </div>
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
