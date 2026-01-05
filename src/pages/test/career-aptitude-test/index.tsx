import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  careerQuestions,
  answerOptions,
  AnswerValue,
  HollandCode,
  hollandTypeDescriptions,
  testBackground,
  calculateTopTypes,
} from "@/data/careerAptitudeQuestions";
import {
  CheckCircle2,
  RotateCcw,
  Share2,
  BookOpen,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  Briefcase,
  History,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Target,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import ProgressBar from "@/components/ProgressBar";

const CareerAptitudeTest = () => {
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = careerQuestions.length;
  const currentQuestionData = careerQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const allQuestionsAnswered = answeredCount === totalQuestions;

  const handleAnswer = (questionId: number, value: AnswerValue) => {
    if (isTransitioning) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // Automatically move to next question if not the last one
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
    const topTypes = calculateTopTypes(answers);
    const top3 = topTypes.slice(0, 3);
    const hollandCode = top3.map(t => t.code).join('');

    const shareText = `My Career Aptitude Test Results

Holland Code: ${hollandCode}

1st: ${hollandTypeDescriptions[top3[0].code].nameKo}
2nd: ${hollandTypeDescriptions[top3[1].code].nameKo}
3rd: ${hollandTypeDescriptions[top3[2].code].nameKo}

Take the test at Test-Archive.com`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Career Aptitude Test Results",
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

  // Results screen
  if (showResults) {
    const topTypes = calculateTopTypes(answers);
    const top3 = topTypes.slice(0, 3);
    const hollandCode = top3.map(t => t.code).join('');
    const primaryType = hollandTypeDescriptions[top3[0].code];

    const breadcrumbSchema = createBreadcrumbSchema([
      { name: "Home", item: "/" },
      { name: "Career Aptitude Test", item: "/test/career-aptitude-test" },
      { name: "Results", item: "/test/career-aptitude-test/result" },
    ]);

    return (
      <div className="min-h-screen gradient-hero">
        <SEOHead
          title={`${primaryType.nameKo} - Career Aptitude Test Results | Test-Archive.com`}
          description={`Your Holland Code is ${hollandCode}. ${primaryType.description}`}
          canonicalUrl="/test/career-aptitude-test"
          schema={breadcrumbSchema}
        />
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
            {/* Result Title */}
            <div className="flex justify-center mb-4">
              <Target className="w-16 h-16 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Your Career Aptitude Results</h2>
            <div className="text-5xl font-bold mb-4 text-primary">{hollandCode}</div>
            <p className="text-lg text-muted-foreground mb-8">Holland Interest Code</p>

            {/* Top 3 Type Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {top3.map((type, index) => {
                const typeInfo = hollandTypeDescriptions[type.code];
                const maxScore = totalQuestions / 6 * 5; // 5 questions per type * max 5 points
                const percentage = Math.round((type.score / maxScore) * 100);

                return (
                  <div
                    key={type.code}
                    className={cn(
                      "p-5 rounded-xl text-left",
                      index === 0 && "ring-2 ring-primary bg-primary/5"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {index === 0 && <Award className="w-5 h-5 text-primary" />}
                      <span className="text-sm font-semibold text-muted-foreground">
                        Rank {index + 1}
                      </span>
                    </div>
                    <div className={cn("text-2xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent", typeInfo.color)}>
                      {typeInfo.nameKo}
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">{typeInfo.name}</div>
                    <div className="w-full bg-muted rounded-full h-2 mb-2">
                      <div
                        className={cn("h-2 rounded-full bg-gradient-to-r", typeInfo.color)}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{percentage}% Match</p>
                  </div>
                );
              })}
            </div>

            {/* Primary Type Detailed Analysis */}
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-4">Primary Type: {primaryType.nameKo}</h3>

              {/* Description */}
              <div className="p-6 rounded-xl bg-primary/5 mb-6">
                <p className="text-lg text-muted-foreground leading-relaxed">{primaryType.description}</p>
              </div>

              {/* Detailed Analysis */}
              <div className="p-6 rounded-xl bg-muted/30 mb-6">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Detailed Analysis
                </h4>
                <p className="text-muted-foreground leading-relaxed">{primaryType.detailedDescription}</p>
              </div>

              {/* Theoretical Background */}
              <div className="p-6 rounded-xl bg-purple-500/10 mb-6">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  Theoretical Background
                </h4>
                <p className="text-muted-foreground leading-relaxed">{primaryType.theoreticalBackground}</p>
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
                    {primaryType.strengths.map((strength, index) => (
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
                    Points to Consider
                  </h4>
                  <ul className="space-y-2">
                    {primaryType.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Suitable Careers */}
              <div className="p-6 rounded-xl bg-blue-500/10 mb-6">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-700 dark:text-blue-400">
                  <Briefcase className="w-5 h-5" />
                  Suitable Career Fields
                </h4>
                <ul className="space-y-3">
                  {primaryType.careerExamples.map((career, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{career}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* All Types Summary */}
              <div className="p-6 rounded-xl bg-muted/30 mb-6">
                <h4 className="text-xl font-semibold mb-4">Your Career Interest Profile</h4>
                <div className="space-y-4">
                  {top3.map((type, index) => {
                    const typeInfo = hollandTypeDescriptions[type.code];
                    return (
                      <div key={type.code} className="border-b border-border pb-4 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-muted-foreground">
                              Rank {index + 1}
                            </span>
                            <span className="font-semibold">{typeInfo.nameKo}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{typeInfo.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Test Background Information */}
              <div className="p-6 rounded-xl bg-muted/30 mb-8">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <History className="w-5 h-5 text-primary" />
                  About Holland's Career Aptitude Theory
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
                    Important Note
                  </h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">{testBackground.disclaimer}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
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

            {/* Other Test Recommendations */}
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
                  to="/test/big-five-test"
                  className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left"
                >
                  <h4 className="font-semibold mb-2">Big Five Personality Test</h4>
                  <p className="text-sm text-muted-foreground">Analyze five personality traits</p>
                </Link>
                <Link
                  to="/test/16-personality-test"
                  className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left"
                >
                  <h4 className="font-semibold mb-2">16 Personality Types Test</h4>
                  <p className="text-sm text-muted-foreground">Discover your personality type</p>
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
    { name: "Career Aptitude Test", item: "/test/career-aptitude-test" },
  ]);

  return (
    <div className="min-h-screen gradient-hero">
      <SEOHead
        title="Career Aptitude Test (Holland RIASEC) - Find Your Ideal Career | Test-Archive.com"
        description="Discover your ideal career field with our Holland RIASEC model-based career aptitude test. Which type are you: Realistic, Investigative, Artistic, Social, Enterprising, or Conventional?"
        canonicalUrl="/test/career-aptitude-test"
        schema={breadcrumbSchema}
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        {/* Start screen or question screen */}
        {!testStarted ? (
          <div className="test-card text-center animate-scale-in max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <Briefcase className="w-20 h-20 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Career Aptitude Test</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Identify your career interests and aptitudes based on Holland's RIASEC theory.
              <br />
              Find which of the six types (Realistic, Investigative, Artistic, Social, Enterprising, Conventional) best matches you.
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
                  <span>Honestly indicate your level of interest in each activity</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                  <span>Takes approximately 5 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                  <span>Results will show your Holland code and suitable career fields</span>
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
                <p className="text-sm text-muted-foreground mt-2">How interested are you in this activity?</p>
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

              {/* 네비게이션 버튼 */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handlePrevQuestion}
                  disabled={currentQuestion === 0 || isTransitioning}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  이전
                </Button>

                {isLastQuestion ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!allQuestionsAnswered || isTransitioning}
                    className="gap-2"
                  >
                    결과 보기
                    <CheckCircle2 className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={handleNextQuestion}
                    disabled={isTransitioning}
                    className="gap-2"
                  >
                    다음
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <p className="text-sm text-muted-foreground text-center mt-4">
                {allQuestionsAnswered
                  ? "모든 질문에 답했습니다. 결과를 확인하세요!"
                  : `${totalQuestions - answeredCount}개의 질문이 남았습니다`}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CareerAptitudeTest;
