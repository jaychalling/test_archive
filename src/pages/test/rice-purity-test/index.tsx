import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import ResultCard from "@/components/ResultCard";
import { ricePurityQuestions } from "@/data/ricePurityQuestions";
import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

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

  if (showResults) {
    return (
      <div className="min-h-screen gradient-hero theme-purity">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tests
          </Link>

          <ResultCard score={calculateScore()} onReset={handleReset} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero theme-purity">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tests
        </Link>

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
