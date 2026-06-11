import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEOHead, createBreadcrumbSchema, createQuizSchema } from "@/components/SEOHead";
import {
  enneagramQuestions,
  answerOptions,
  AnswerValue,
} from "@/data/enneagramQuestions";
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, Home } from "lucide-react";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";

const EnneagramTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showViewResultButton, setShowViewResultButton] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

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

  const quizSchema = createQuizSchema({
    name: 'Free Enneagram Test - Find Your Type (1-9) With Wings',
    description: 'Which of 9 Enneagram types are you? Take this free test to discover your type, wing, and growth path. Understand your core fears, desires & motivations.',
    path: '/test/enneagram-test/',
    numberOfQuestions: totalQuestions,
    timeRequired: 'PT5M',
  });

  const question = enneagramQuestions[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Free Enneagram Test - Find Your Type (1-9) With Wings"
        description="Which of 9 Enneagram types are you? Take this free test to discover your type, wing, and growth path. Understand your core fears, desires & motivations."
        path="/test/enneagram-test/"
        jsonLd={[breadcrumbSchema, quizSchema]}
      />

      {!testStarted ? (
        <>
          <Header />
          <main className="flex-1 flex items-center justify-center px-4 py-8">
            <div className="max-w-lg mx-auto test-card text-center animate-scale-in">
              <div className="flex justify-center mb-4">
                <Circle className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Enneagram Test</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Discover your Enneagram type among 9 personality types.
                <br />
                Learn about your core motivations, fears, and desires.
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
                    <span>Takes approximately 5-7 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                    <span>Results reveal your dominant type and wing patterns</span>
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
      <div className="flex items-center justify-between px-4 py-3 border-b bg-background/95 backdrop-blur-sm">
        <Link to="/" className="p-2 -m-2 hover:opacity-70 transition-opacity">
          <Home className="w-5 h-5 text-muted-foreground" />
        </Link>
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
          <h2 className="text-2xl md:text-3xl font-medium text-foreground text-center leading-loose mb-12">
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
        </>
      )}
    </div>
  );
};

export default EnneagramTest;
