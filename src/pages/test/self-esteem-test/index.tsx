import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEOHead, createBreadcrumbSchema, createQuizSchema } from "@/components/SEOHead";
import {
  selfEsteemQuestions,
  answerOptions,
  AnswerValue,
} from "@/data/selfEsteemQuestions";
import { CheckCircle2, ChevronLeft, ChevronRight, Award } from "lucide-react";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";

const SelfEsteemTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCompleteButton, setShowCompleteButton] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = selfEsteemQuestions.length;
  const currentQuestionData = selfEsteemQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const allAnswered = answeredCount === totalQuestions;

  // Show complete button when last question is answered
  useEffect(() => {
    if (isLastQuestion && answers[currentQuestionData.id] !== undefined) {
      setShowCompleteButton(true);
    }
  }, [isLastQuestion, answers, currentQuestionData.id]);

  const handleAnswer = (questionId: number, value: AnswerValue) => {
    if (isTransitioning) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // Auto-advance to next question (except on last question)
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
    localStorage.setItem('selfEsteemAnswers', JSON.stringify(answers));
    navigate('/test/self-esteem-test/result/');
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Self-Esteem Test', path: '/test/self-esteem-test/' },
  ]);

  const quizSchema = createQuizSchema({
    name: "Self-Esteem Test - Measure Your Self-Confidence",
    description: "Discover your self-esteem level with this validated psychological assessment. Based on the Rosenberg Self-Esteem Scale. For entertainment purposes only.",
    path: "/test/self-esteem-test/",
    numberOfQuestions: totalQuestions,
    timeRequired: "PT5M",
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Self-Esteem Test - Measure Your Self-Confidence | Test Archive"
        description="Discover your self-esteem level with this validated psychological assessment. Based on the Rosenberg Self-Esteem Scale. For entertainment purposes only."
        path="/test/self-esteem-test/"
        jsonLd={[breadcrumbSchema, quizSchema]}
      />

      {!testStarted ? (
        <>
          <Header />
          <main className="flex-1 flex items-center justify-center px-4 py-8">
            <div className="max-w-lg mx-auto test-card text-center animate-scale-in">
              <div className="flex justify-center mb-4">
                <Award className="w-16 h-16 text-emerald-500" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Self-Esteem Test</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Measure your self-esteem and self-confidence level.
                <br />
                Based on the well-known Rosenberg Self-Esteem Scale.
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
                    <span>Results show your self-esteem score with interpretation</span>
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
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-background/95 backdrop-blur-sm">
        <div></div>
        <h1 className="font-semibold text-foreground">Self-Esteem Test</h1>
        <span className="text-sm text-muted-foreground min-w-[48px] text-right">
          {currentQuestion + 1}/{totalQuestions}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question Area */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div
          className={cn(
            "transition-all duration-300",
            isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          )}
        >
          <div className="text-center">
            <span className="inline-block text-sm font-medium text-primary mb-4">
              Q{currentQuestion + 1}
            </span>
            <p className="text-2xl md:text-3xl font-medium text-foreground leading-loose">
              {currentQuestionData.text}
            </p>
          </div>
        </div>
      </div>

      {/* 4-Point Likert Scale */}
      <div className="px-6 pb-6">
        <div className="max-w-sm mx-auto w-full">
          <div className="flex justify-between mb-3 px-2">
            <span className="text-xs text-muted-foreground">Strongly Disagree</span>
            <span className="text-xs text-muted-foreground">Strongly Agree</span>
          </div>
          <div className="flex justify-center gap-4">
            {answerOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(currentQuestionData.id, option.value)}
                className={cn(
                  "flex-1 aspect-square max-w-16 rounded-full border-2 flex items-center justify-center text-lg font-medium transition-all duration-200",
                  answers[currentQuestionData.id] === option.value
                    ? "border-emerald-500 bg-emerald-500 text-white scale-110"
                    : "border-border bg-background hover:border-emerald-500/50 text-muted-foreground hover:text-foreground"
                )}
              >
                {option.value}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t bg-background/95 backdrop-blur-sm px-4 py-4 pb-safe">
        <div className="flex gap-3">
          <Button
            onClick={handlePrevQuestion}
            variant="outline"
            disabled={currentQuestion === 0}
            className="flex-1 gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {isLastQuestion && allAnswered ? (
            <Button
              onClick={handleSubmit}
              className="flex-1 gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 border-0"
            >
              <CheckCircle2 className="w-4 h-4" />
              View Results
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              variant="outline"
              disabled={currentQuestion === totalQuestions - 1 || answers[currentQuestionData.id] === undefined}
              className="flex-1 gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Unanswered Questions Notice */}
        {isLastQuestion && !allAnswered && (
          <p className="text-xs text-muted-foreground text-center mt-3">
            {answeredCount}/{totalQuestions} questions answered - Please answer all questions
          </p>
        )}
      </div>
        </>
      )}
    </div>
  );
};

export default SelfEsteemTest;
