import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  enneagramQuestions,
  answerOptions,
  AnswerValue,
} from "@/data/enneagramQuestions";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const EnneagramTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showViewResultButton, setShowViewResultButton] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = enneagramQuestions.length;

  const handleAnswer = (questionId: number, value: AnswerValue) => {
    if (isTransitioning) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // 마지막 질문인 경우 결과 보기 버튼 표시
    if (currentQuestion === totalQuestions - 1) {
      setShowViewResultButton(true);
    } else {
      // 0.1초 후 자동으로 다음 질문으로 이동
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
        setShowViewResultButton(false);
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
    localStorage.setItem('enneagramAnswers', JSON.stringify(answers));
    navigate('/test/enneagram-test/result/');
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Enneagram Test', path: '/test/enneagram-test/' },
  ]);

  const question = enneagramQuestions[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Enneagram Test - Find Your Type (1-9)"
        description="Discover your Enneagram type among 9 personality types. Learn about your core motivations, fears, and desires. For entertainment purposes only."
        path="/test/enneagram-test/"
        jsonLd={breadcrumbSchema}
      />
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-background/95 backdrop-blur-sm">
        <div></div>
        <h1 className="font-medium text-foreground">Enneagram Test</h1>
        <span className="text-sm text-muted-foreground min-w-[48px] text-right">
          {currentQuestion + 1}/{totalQuestions}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question Area - Centered */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div
          className={cn(
            "transition-all duration-300",
            isTransitioning ? "opacity-0 transform translate-x-4" : "opacity-100 transform translate-x-0"
          )}
        >
          {/* Question Number */}
          <div className="text-center mb-4">
            <span className="text-sm font-medium text-primary">
              Q{currentQuestion + 1}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-xl md:text-2xl font-medium text-foreground text-center leading-relaxed mb-12">
            {question.text}
          </h2>

          {/* 5-Point Scale */}
          <div className="max-w-md mx-auto">
            {/* Labels */}
            <div className="flex justify-between mb-3 px-2">
              <span className="text-xs text-muted-foreground">Strongly Disagree</span>
              <span className="text-xs text-muted-foreground">Strongly Agree</span>
            </div>

            {/* Scale Buttons */}
            <div className="flex gap-3 justify-center">
              {answerOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(question.id, option.value)}
                  className={cn(
                    "flex-1 aspect-square max-w-16 rounded-full border-2 transition-all duration-200 flex items-center justify-center text-lg font-medium",
                    answers[question.id] === option.value
                      ? "border-primary bg-primary text-primary-foreground scale-110 shadow-lg"
                      : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {option.value}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Fixed */}
      <div className="border-t bg-background/95 backdrop-blur-sm px-4 py-4 pb-safe">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <Button
            onClick={handlePrevQuestion}
            variant="outline"
            disabled={currentQuestion === 0}
            className="gap-2 min-w-[100px]"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {showViewResultButton ? (
            <Button
              onClick={handleSubmit}
              disabled={answeredCount < totalQuestions}
              className="gradient-primary border-0 gap-2 px-6 shadow-elevated hover:shadow-card transition-all duration-300 disabled:opacity-50"
            >
              <CheckCircle2 className="w-5 h-5" />
              View Results
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              variant="outline"
              disabled={currentQuestion === totalQuestions - 1 || !answers[question.id]}
              className="gap-2 min-w-[100px]"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnneagramTest;
