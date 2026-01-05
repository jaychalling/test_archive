import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  bigFiveQuestions,
  answerOptions,
  AnswerValue,
} from "@/data/bigFiveQuestions";
import { ChevronLeft, ChevronRight, CheckCircle2, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const BigFiveTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = bigFiveQuestions.length;
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const allQuestionsAnswered = answeredCount === totalQuestions;

  const handleAnswer = (questionId: number, value: AnswerValue) => {
    if (isTransitioning) return; // 중복 클릭 방지

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

  const handleSubmit = () => {
    localStorage.setItem('bigFiveAnswers', JSON.stringify(answers));
    navigate('/test/big-five-test/result/');
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Big Five Test', path: '/test/big-five-test/' },
  ]);

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      <SEOHead
        title="Big Five Personality Test (OCEAN) - 50 Questions"
        description="Take the Big Five Personality Test to measure your Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. For entertainment only."
        path="/test/big-five-test/"
        jsonLd={breadcrumbSchema}
      />
      {/* Top Bar */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-foreground">Big Five</span>
        </div>
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
              const question = bigFiveQuestions[currentQuestion];
              return (
                <div className="text-center">
                  <p className="text-xl sm:text-2xl text-foreground leading-relaxed mb-12 font-medium">
                    {question.text}
                  </p>

                  {/* Scale */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Strongly Disagree</span>
                      <span>Strongly Agree</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      {answerOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer(question.id, option.value)}
                          disabled={isTransitioning}
                          className={cn(
                            "flex-1 aspect-square max-w-16 rounded-full border-2 transition-all duration-200 font-semibold text-xl",
                            answers[question.id] === option.value
                              ? "border-primary bg-primary text-primary-foreground shadow-lg scale-110"
                              : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          {option.value}
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
    </div>
  );
};

export default BigFiveTest;
