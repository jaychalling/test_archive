import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  introvertExtrovertQuestions,
  AnswerValue,
} from "@/data/introvertExtrovertQuestions";
import { CheckCircle2, ChevronLeft, ChevronRight, Users, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const IntrovertExtrovertTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = introvertExtrovertQuestions.length;
  const currentQuestionData = introvertExtrovertQuestions[currentQuestion];
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
    localStorage.setItem('introvertExtrovertAnswers', JSON.stringify(answers));
    navigate('/test/introvert-extrovert-test/result/');
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Introvert/Extrovert Test', path: '/test/introvert-extrovert-test/' },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Introvert vs Extrovert Test - Find Your Spectrum"
        description="Are you an introvert or extrovert? Find your position on the spectrum with this 20-question test analyzing 5 key factors. For entertainment only."
        path="/test/introvert-extrovert-test/"
        jsonLd={breadcrumbSchema}
      />

      {!testStarted ? (
        <>
          <Header />
          <main className="flex-1 flex items-center justify-center px-4 py-8">
            <div className="max-w-lg mx-auto test-card text-center animate-scale-in">
              <div className="flex justify-center mb-4">
                <Users className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Introvert/Extrovert Test</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Discover where you fall on the introvert-extrovert spectrum.
                <br />
                Are you an introvert, extrovert, or ambivert?
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
                    <span>Takes approximately 3-5 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                    <span>Results show your position on the introversion-extraversion scale</span>
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
        <h1 className="font-semibold text-foreground">Introvert/Extrovert Test</h1>
        <span className="text-sm text-muted-foreground min-w-[48px] text-right">
          {currentQuestion + 1}/{totalQuestions}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-100"
          style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Center Question Area */}
      <main className="flex-1 flex flex-col justify-center px-6 py-8">
        <div
          className={cn(
            "transition-all duration-100",
            isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          )}
        >
          {/* Question */}
          <div className="text-center mb-12">
            <p className="text-2xl md:text-3xl font-medium text-foreground leading-loose">
              {currentQuestionData.text}
            </p>
          </div>

          {/* 5-Point Scale */}
          <div className="max-w-md mx-auto">
            {/* Scale Labels */}
            <div className="flex justify-between mb-3 px-2">
              <span className="text-xs text-muted-foreground">Strongly Disagree</span>
              <span className="text-xs text-muted-foreground">Strongly Agree</span>
            </div>

            {/* Scale Buttons */}
            <div className="flex gap-3 justify-center">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleAnswer(currentQuestionData.id, value as AnswerValue)}
                  disabled={isTransitioning}
                  className={cn(
                    "flex-1 aspect-square max-w-16 rounded-full border-2 transition-all duration-100 flex items-center justify-center text-lg font-medium",
                    answers[currentQuestionData.id] === value
                      ? "border-primary bg-primary text-primary-foreground scale-110"
                      : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Fixed Navigation */}
      <div className="border-t bg-background/95 backdrop-blur-sm px-4 py-4">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <Button
            onClick={handlePrevQuestion}
            variant="outline"
            disabled={currentQuestion === 0 || isTransitioning}
            className="flex-1 gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {isLastQuestion && allQuestionsAnswered ? (
            <Button
              onClick={handleSubmit}
              className="flex-1 gap-2 gradient-primary border-0"
            >
              <CheckCircle2 className="w-4 h-4" />
              View Results
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              variant="outline"
              disabled={currentQuestion === totalQuestions - 1 || isTransitioning}
              className="flex-1 gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Unanswered Notice */}
        {isLastQuestion && !allQuestionsAnswered && (
          <p className="text-xs text-muted-foreground text-center mt-3">
            {answeredCount}/{totalQuestions} answered - Please answer all questions
          </p>
        )}
      </div>
        </>
      )}
    </div>
  );
};

export default IntrovertExtrovertTest;
