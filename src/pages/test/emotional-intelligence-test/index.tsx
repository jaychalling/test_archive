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
            {/* Result Title */}
            <div className="flex justify-center mb-4">
              <Brain className="w-16 h-16 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Your Emotional Intelligence Results</h2>
            <div className={cn("text-5xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent", result.color)}>
              {result.nameKo}
            </div>
            <div className="text-4xl font-bold mb-4 text-primary">{score} / 100</div>
            <p className="text-lg text-muted-foreground mb-8">{result.description}</p>

            {/* Detailed Analysis */}
            <div className="text-left p-6 rounded-xl bg-primary/5 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Detailed Analysis
              </h3>
              <p className="text-muted-foreground leading-relaxed">{result.detailedDescription}</p>
            </div>

            {/* Scientific Background */}
            <div className="text-left p-6 rounded-xl bg-purple-500/10 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Scientific Background
              </h3>
              <p className="text-muted-foreground leading-relaxed">{result.scientificBackground}</p>
            </div>

            {/* Strengths and Weaknesses */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Strengths */}
              <div className="p-5 rounded-xl bg-green-500/10 text-left">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-700 dark:text-green-400">
                  <TrendingUp className="w-5 h-5" />
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses (Areas for Improvement) */}
              <div className="p-5 rounded-xl bg-orange-500/10 text-left">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-orange-700 dark:text-orange-400">
                  <TrendingDown className="w-5 h-5" />
                  Areas for Improvement
                </h3>
                <ul className="space-y-2">
                  {result.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Real-World Examples */}
            <div className="text-left p-6 rounded-xl bg-blue-500/10 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-700 dark:text-blue-400">
                <Users className="w-5 h-5" />
                Real-World Examples
              </h3>
              <ul className="space-y-3">
                {result.realWorldExamples.map((example, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Heart className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{example}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Test Background Information */}
            <div className="text-left p-6 rounded-xl bg-muted/30 mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <History className="w-5 h-5 text-primary" />
                About the Emotional Intelligence Test
              </h3>

              <div className="mb-4">
                <h4 className="font-semibold text-lg mb-2">History</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{testBackground.history}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-lg mb-2">Purpose</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{testBackground.purpose}</p>
              </div>

              <div className="bg-amber-500/10 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-2 flex items-center gap-2 text-amber-700 dark:text-amber-400">
                  <AlertCircle className="w-5 h-5" />
                  Note
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{testBackground.disclaimer}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={handleReset} variant="outline" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Retake
              </Button>
              <Button onClick={handleShare} className="gap-2">
                <Share2 className="w-4 h-4" />
                Share Results
              </Button>
            </div>

            {/* Other Test Recommendations */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-xl font-semibold mb-6">Try Other Tests</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/test/big-five-test"
                  className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left"
                >
                  <h4 className="font-semibold mb-2">Big Five Personality Test</h4>
                  <p className="text-sm text-muted-foreground">Analyze 5 personality traits</p>
                </Link>
                <Link
                  to="/test/attachment-style-test"
                  className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left"
                >
                  <h4 className="font-semibold mb-2">Attachment Style Test</h4>
                  <p className="text-sm text-muted-foreground">Discover your attachment style in relationships</p>
                </Link>
                <Link
                  to="/test/introvert-extrovert-test"
                  className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left"
                >
                  <h4 className="font-semibold mb-2">Introvert/Extrovert Test</h4>
                  <p className="text-sm text-muted-foreground">Discover your energy recharge style</p>
                </Link>
              </div>
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
