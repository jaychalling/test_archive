import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import { mentalAgeQuestions } from "@/data/mentalAgeQuestions";
import { ChevronLeft, ChevronRight, CheckCircle2, Baby } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const MentalAgeTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [actualAge, setActualAge] = useState<number>(25);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = mentalAgeQuestions.length;
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const allQuestionsAnswered = answeredCount === totalQuestions;

  const handleAnswer = (questionId: number, optionIndex: number) => {
    if (isTransitioning) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));

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
    localStorage.setItem('mentalAgeAnswers', JSON.stringify(answers));
    localStorage.setItem('mentalAgeActualAge', actualAge.toString());
    navigate('/test/mental-age-test/result/');
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Mental Age Test', path: '/test/mental-age-test/' },
  ]);

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      <SEOHead
        title="Mental Age Test - How Old Is Your Mind Really?"
        description="Is your mind older or younger than your years? Take this fun mental age quiz to find out! Based on maturity, wisdom & playfulness. Instant results!"
        path="/test/mental-age-test/"
        jsonLd={breadcrumbSchema}
      />

      {!testStarted ? (
        <>
          <Header />
          <main className="flex-1 flex items-center justify-center px-4 py-8">
            <div className="max-w-lg mx-auto test-card text-center animate-scale-in">
              <div className="flex justify-center mb-4">
                <Baby className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Mental Age Test</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Discover your psychological age!
                <br />
                Your mental age reflects your maturity, wisdom, and approach to life.
              </p>

              <div className="bg-muted/50 p-6 rounded-lg mb-6 text-left">
                <h2 className="font-semibold text-lg mb-3">Before You Start</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    What's your actual age?
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={actualAge}
                    onChange={(e) => setActualAge(Math.max(10, Math.min(100, parseInt(e.target.value) || 25)))}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="bg-muted/50 p-6 rounded-lg mb-8 text-left">
                <h2 className="font-semibold text-lg mb-3">Test Instructions</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                    <span>You will answer {totalQuestions} questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                    <span>Choose the response that best describes you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                    <span>Takes approximately 5-7 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                    <span>Answer honestly for the most accurate result</span>
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
              <Baby className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Mental Age</span>
            </Link>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1}/{totalQuestions}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="px-4 py-2">
            <ProgressBar current={answeredCount} total={totalQuestions} />
          </div>

          {/* Main Content */}
          <main className="flex-1 flex flex-col justify-center px-4 py-6">
            <div className="max-w-lg mx-auto w-full">
              <div
                className={cn(
                  "transition-all duration-300",
                  isTransitioning ? "opacity-0 transform translate-x-4" : "opacity-100 transform translate-x-0"
                )}
              >
                {(() => {
                  const question = mentalAgeQuestions[currentQuestion];
                  return (
                    <div className="text-center">
                      <p className="text-xl sm:text-2xl text-foreground leading-relaxed mb-8 font-medium">
                        {question.text}
                      </p>

                      <div className="space-y-3">
                        {question.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswer(question.id, index)}
                            disabled={isTransitioning}
                            className={cn(
                              "w-full p-4 rounded-xl border-2 transition-all duration-200 text-left",
                              answers[question.id] === index
                                ? "border-primary bg-primary/10 text-foreground"
                                : "border-border bg-background hover:border-primary/50 text-foreground"
                            )}
                          >
                            {option.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </main>

          {/* Bottom Navigation */}
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

export default MentalAgeTest;
