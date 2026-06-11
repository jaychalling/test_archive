import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { SEOHead, createBreadcrumbSchema, createQuizSchema } from "@/components/SEOHead";
import {
  loveLanguageQuestions,
} from "@/data/loveLanguageQuestions";
import { CheckCircle2, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type AnswerChoice = "A" | "B";

const LoveLanguageTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerChoice>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCompleteButton, setShowCompleteButton] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = loveLanguageQuestions.length;
  const currentQuestionData = loveLanguageQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const allQuestionsAnswered = answeredCount === totalQuestions;

  // Check if we should show the complete button
  useEffect(() => {
    if (isLastQuestion && answers[currentQuestionData.id] && allQuestionsAnswered) {
      setShowCompleteButton(true);
    } else {
      setShowCompleteButton(false);
    }
  }, [isLastQuestion, answers, currentQuestionData.id, allQuestionsAnswered]);

  const handleAnswer = (questionId: number, choice: AnswerChoice) => {
    if (isTransitioning) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: choice,
    }));

    // Auto-advance to next question after 0.1 seconds (except for last question)
    if (!isLastQuestion) {
      setTimeout(() => {
        goToNextQuestion();
      }, 100);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setIsTransitioning(false);
      }, 100);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev - 1);
        setIsTransitioning(false);
      }, 100);
    }
  };

  const handleSubmit = () => {
    localStorage.setItem('loveLanguageAnswers', JSON.stringify(answers));
    navigate('/test/love-language-test/result/');
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Love Language Test', path: '/test/love-language-test/' },
  ]);

  const quizSchema = createQuizSchema({
    name: "Love Language Test - 5 Love Languages",
    description: "Discover your primary love language with this 30-question test. Learn how you prefer to give and receive love. For entertainment purposes only.",
    path: "/test/love-language-test/",
    numberOfQuestions: totalQuestions,
    timeRequired: "PT5M",
  });

  return (
    <div className="min-h-screen gradient-hero">
      <SEOHead
        title="Love Language Test - 5 Love Languages"
        description="Discover your primary love language with this 30-question test. Learn how you prefer to give and receive love. For entertainment purposes only."
        path="/test/love-language-test/"
        jsonLd={[breadcrumbSchema, quizSchema]}
      />
      <Header />

      <main className="container mx-auto px-4 py-8">
        {!testStarted ? (
          <div className="max-w-lg mx-auto test-card text-center animate-scale-in">
            <div className="flex justify-center mb-4">
              <Heart className="w-16 h-16 text-pink-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Love Language Test</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover how you prefer to give and receive love.
              <br />
              Find your primary love language among 5 types.
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
                  <span>Choose between two options (A or B) for each question</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                  <span>Takes approximately 5 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                  <span>Results show your ranking across 5 love languages</span>
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
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Heart className="w-8 h-8 text-pink-500" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Love Language Test
            </h1>
            <p className="text-muted-foreground">
              Choose the option you prefer for each question.<br />
              Discover how you express and receive love.
            </p>
          </div>

          {/* Progress */}
          <div className="bg-background/80 backdrop-blur-md py-4 mb-6 -mx-4 px-4">
            <ProgressBar current={answeredCount} total={totalQuestions} />
            <div className="text-center mt-2">
              <span className="text-sm font-medium text-foreground">
                {currentQuestion + 1}
              </span>
              <span className="text-sm text-muted-foreground">
                {" "}/ {totalQuestions}
              </span>
            </div>
          </div>

          {/* Single Question with Fade Animation */}
          <div
            className={cn(
              "test-card transition-all duration-300 ease-in-out",
              isTransitioning ? "opacity-0 transform translate-y-2" : "opacity-100 transform translate-y-0"
            )}
          >
            <div className="text-xs font-medium text-muted-foreground mb-4">
              {currentQuestion + 1}. Which do you prefer?
            </div>

            <div className="grid gap-3">
              <button
                onClick={() => handleAnswer(currentQuestionData.id, "A")}
                className={cn(
                  "w-full p-5 text-left text-base rounded-lg border-2 transition-all duration-200 leading-relaxed",
                  answers[currentQuestionData.id] === "A"
                    ? "border-pink-500 bg-pink-500/10 text-foreground"
                    : "border-border hover:border-pink-500/50 text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="font-medium mr-2">A.</span>
                {currentQuestionData.optionA.text}
              </button>
              <button
                onClick={() => handleAnswer(currentQuestionData.id, "B")}
                className={cn(
                  "w-full p-5 text-left text-base rounded-lg border-2 transition-all duration-200 leading-relaxed",
                  answers[currentQuestionData.id] === "B"
                    ? "border-pink-500 bg-pink-500/10 text-foreground"
                    : "border-border hover:border-pink-500/50 text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="font-medium mr-2">B.</span>
                {currentQuestionData.optionB.text}
              </button>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-6">
            <Button
              onClick={goToPreviousQuestion}
              variant="outline"
              disabled={currentQuestion === 0}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            {showCompleteButton ? (
              <Button
                onClick={handleSubmit}
                className="gradient-primary border-0 gap-2 px-8 shadow-elevated hover:shadow-card transition-all duration-300"
              >
                <CheckCircle2 className="w-5 h-5" />
                View Results
              </Button>
            ) : (
              <Button
                onClick={goToNextQuestion}
                variant="outline"
                disabled={currentQuestion === totalQuestions - 1}
                className="gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Progress Info */}
          <div className="text-center py-8">
            <p className="text-xs text-muted-foreground">
              {answeredCount}/{totalQuestions} questions answered
            </p>
          </div>
        </div>
        )}
      </main>
    </div>
  );
};

export default LoveLanguageTest;
