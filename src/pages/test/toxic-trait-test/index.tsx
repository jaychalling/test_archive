import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  toxicTraitQuestions,
  answerOptions,
  AnswerValue,
} from "@/data/toxicTraitQuestions";
import { ChevronLeft, ChevronRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const ToxicTraitTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = toxicTraitQuestions.length;
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const allQuestionsAnswered = answeredCount === totalQuestions;

  const handleAnswer = (questionId: number, value: AnswerValue) => {
    if (isTransitioning) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
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
    localStorage.setItem('toxicTraitAnswers', JSON.stringify(answers));
    navigate('/test/toxic-trait-test/result/');
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Toxic Trait Test', path: '/test/toxic-trait-test/' },
  ]);

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      <SEOHead
        title="What's Your Toxic Trait? Take the Quiz (30 Questions)"
        description="Everyone has toxic traits they don't see. Discover your hidden patterns in jealousy, passive aggression, control, negativity, and more."
        path="/test/toxic-trait-test/"
        jsonLd={breadcrumbSchema}
      />

      {!testStarted ? (
        <>
          <Header />
          <main className="flex-1 flex items-center justify-center px-4 py-8">
            <div className="max-w-lg mx-auto test-card text-center animate-scale-in">
              <div className="flex justify-center mb-4">
                <AlertCircle className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Toxic Trait Test</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Everyone has toxic traits - what are yours?
                <br />
                Self-awareness is the first step to growth.
              </p>

              <div className="bg-muted/50 p-6 rounded-lg mb-8 text-left">
                <h2 className="font-semibold text-lg mb-3">Traits We'll Explore</h2>
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500">💚</span>
                    <span>Jealousy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500">😤</span>
                    <span>Passive Aggression</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500">🎮</span>
                    <span>Control</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">☁️</span>
                    <span>Negativity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-500">👤</span>
                    <span>Self-Centeredness</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-rose-500">🎭</span>
                    <span>Dishonesty</span>
                  </div>
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
                    <span>Rate how often each statement applies to you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                    <span>Takes approximately 5 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                    <span>Be honest - growth starts with self-awareness!</span>
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
              <AlertCircle className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Toxic Traits</span>
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
                  const question = toxicTraitQuestions[currentQuestion];
                  return (
                    <div className="text-center">
                      <p className="text-xl sm:text-2xl text-foreground leading-relaxed mb-10 font-medium">
                        {question.text}
                      </p>

                      {/* Scale */}
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Never</span>
                          <span>Always</span>
                        </div>
                        <div className="flex justify-center gap-3">
                          {answerOptions.map((option) => (
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
                              {option.value}
                            </button>
                          ))}
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground px-2">
                          {answerOptions.map((option) => (
                            <span key={option.value} className="w-12 text-center">{option.label}</span>
                          ))}
                        </div>
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

export default ToxicTraitTest;
