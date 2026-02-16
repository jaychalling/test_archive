import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  politicalCompassQuestions,
  answerOptions,
  AnswerValue,
  getQuadrant,
  quadrantDescriptions,
  testBackground,
  politicalCompassFAQs,
  politicalCompassCelebrities,
} from "@/data/politicalCompassQuestions";
import { CheckCircle2, ChevronLeft, ChevronRight, RotateCcw, Share2, Compass, BookOpen, History, Users, AlertCircle, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import ScoreDistributionChart from "@/components/ScoreDistributionChart";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import CelebrityComparison from "@/components/CelebrityComparison";
import RecommendedTests from "@/components/RecommendedTests";

interface CompassResult {
  economic: number; // -10 ~ +10 (Left ~ Right)
  social: number; // -10 ~ +10 (Libertarian ~ Authoritarian)
}

const colorClasses: Record<string, { bg: string; text: string }> = {
  red: { bg: "bg-red-500/10", text: "text-red-600" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-600" },
  green: { bg: "bg-green-500/10", text: "text-green-600" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-600" },
};

const getQuadrantLabel = (economic: number, social: number): string => {
  const quadrant = getQuadrant(economic, social);
  return quadrantDescriptions[quadrant].name;
};

const PoliticalCompassTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = politicalCompassQuestions.length;
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const allQuestionsAnswered = answeredCount === totalQuestions;

  const handleAnswer = (questionId: number, value: AnswerValue) => {
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

  const calculateResult = (): CompassResult => {
    let economicScore = 0;
    let socialScore = 0;

    const economicQuestions = politicalCompassQuestions.filter(
      (q) => q.category === "economic"
    );
    const socialQuestions = politicalCompassQuestions.filter(
      (q) => q.category === "social"
    );

    economicQuestions.forEach((q) => {
      economicScore += answers[q.id] || 0;
    });

    socialQuestions.forEach((q) => {
      socialScore += answers[q.id] || 0;
    });

    // Normalize to -10 ~ +10 scale
    const maxEconomicScore = economicQuestions.length * 2;
    const maxSocialScore = socialQuestions.length * 2;

    return {
      economic: (economicScore / maxEconomicScore) * 10,
      social: (socialScore / maxSocialScore) * 10,
    };
  };
  const handleSubmit = () => {
    localStorage.setItem('politicalCompassAnswers', JSON.stringify(answers));
    navigate('/test/political-compass-test/result/');
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', path: '/', },
    { name: 'Political Compass Test', path: '/test/political-compass-test/'  },
  ]);

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      <SEOHead
        title="Free Political Compass Test - Where Do You Stand on the Spectrum?"
        description="Map your political views on a 2D compass! Are you left or right? Authoritarian or libertarian? Take this quick quiz and see where you land."
        path="/test/political-compass-test/"
        jsonLd={breadcrumbSchema}
      />

      {!testStarted ? (
        <>
          <Header />
          <main className="flex-1 flex items-center justify-center px-4 py-8">
            <div className="max-w-lg mx-auto test-card text-center animate-scale-in">
              <div className="flex justify-center mb-4">
                <Compass className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Political Compass Test</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Map your political views on a 2D spectrum.
                <br />
                Discover where you stand on economic and social axes.
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
                    <span>Rate each statement from strongly disagree to strongly agree</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                    <span>Takes approximately 5 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                    <span>Results show your position on economic (left-right) and social (libertarian-authoritarian) axes</span>
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
          </main>
        </>
      ) : (
        <>
      {/* Top Bar */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
          <Compass className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-foreground">Political Compass</span>
        </Link>
        <span className="text-sm text-muted-foreground">
          {currentQuestion + 1}/{totalQuestions}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-2">
        <ProgressBar current={answeredCount} total={totalQuestions} />
      </div>

      {/* Main Content - Flex Grow to fill space */}
      <main className="flex-1 flex flex-col justify-center px-4 py-6">
        <div className="max-w-lg mx-auto w-full">
          {/* Question Card */}
          <div
            className={cn(
              "transition-all duration-300",
              isTransitioning ? "opacity-0 transform translate-x-4" : "opacity-100 transform translate-x-0"
            )}
          >
            {(() => {
              const question = politicalCompassQuestions[currentQuestion];
              return (
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl text-foreground leading-loose mb-12 font-medium">
                    {question.text}
                  </p>

                  {/* Scale */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Strongly Disagree</span>
                      <span>Strongly Agree</span>
                    </div>
                    <div className="flex justify-center gap-3">
                      {answerOptions.map((option, index) => (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer(question.id, option.value)}
                          disabled={isTransitioning}
                          className={cn(
                            "flex-1 aspect-square max-w-16 rounded-full border-2 transition-all duration-200 font-medium text-lg",
                            answers[question.id] === option.value
                              ? "border-primary bg-primary text-primary-foreground scale-110"
                              : "border-border bg-background hover:border-primary/50 text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </main>

      {/* Bottom Navigation - Fixed at bottom */}
      <div className="px-4 py-4 border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-lg mx-auto flex justify-between items-center">
          <Button
            onClick={handlePrevQuestion}
            variant="ghost"
            size="lg"
            disabled={currentQuestion === 0 || isTransitioning}
            className="gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </Button>

          {isLastQuestion && allQuestionsAnswered ? (
            <Button
              onClick={handleSubmit}
              size="lg"
              className="gradient-primary border-0 gap-2 px-8"
            >
              <CheckCircle2 className="w-5 h-5" />
              View Results
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              variant="ghost"
              size="lg"
              disabled={currentQuestion === totalQuestions - 1 || isTransitioning}
              className="gap-2"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
        </>
      )}
    </div>
  );
};

export default PoliticalCompassTest;
