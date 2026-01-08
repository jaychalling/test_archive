import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  attachmentStyleQuestions,
  AnswerValue,
} from "@/data/attachmentStyleQuestions";
import { CheckCircle2, ChevronLeft, ChevronRight, Link2 } from "lucide-react";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";

const AttachmentStyleTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCompleteButton, setShowCompleteButton] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = attachmentStyleQuestions.length;
  const currentQuestionData = attachmentStyleQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const allAnswered = answeredCount === totalQuestions;

  // 마지막 질문 답변 후 결과 보기 버튼 표시
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

    // 마지막 질문이 아닌 경우에만 자동으로 다음 질문으로 이동
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
    localStorage.setItem('attachmentStyleAnswers', JSON.stringify(answers));
    navigate('/test/attachment-style-test/result/');
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Attachment Style Test', path: '/test/attachment-style-test/' },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Attachment Style Test - Find Your Pattern"
        description="Discover your attachment style in relationships. Are you secure, anxious, avoidant, or fearful-avoidant? For entertainment purposes only."
        path="/test/attachment-style-test/"
        jsonLd={breadcrumbSchema}
      />

      {!testStarted ? (
        <>
          <Header />
          <main className="flex-1 flex items-center justify-center px-4 py-8">
            <div className="max-w-lg mx-auto test-card text-center animate-scale-in">
              <div className="flex justify-center mb-4">
                <Link2 className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Attachment Style Test</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Discover your attachment pattern in relationships.
                <br />
                Are you secure, anxious, avoidant, or fearful-avoidant?
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
                    <span>Results show your attachment style with detailed analysis</span>
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
      {/* 상단 바 */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-background/95 backdrop-blur-sm">
        <div></div>
        <h1 className="font-semibold text-foreground">Attachment Style Test</h1>
        <span className="text-sm text-muted-foreground min-w-[48px] text-right">
          {currentQuestion + 1}/{totalQuestions}
        </span>
      </div>

      {/* 프로그레스 바 */}
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* 질문 영역 */}
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

      {/* 5점 척도 */}
      <div className="px-6 pb-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-3">
          <span>Strongly Disagree</span>
          <span>Strongly Agree</span>
        </div>
        <div className="flex justify-center gap-3">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => handleAnswer(currentQuestionData.id, value as AnswerValue)}
              className={cn(
                "flex-1 aspect-square max-w-16 rounded-full border-2 flex items-center justify-center text-lg font-medium transition-all duration-200",
                answers[currentQuestionData.id] === value
                  ? "border-primary bg-primary text-primary-foreground scale-110"
                  : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground hover:scale-105"
              )}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {/* 하단 네비게이션 */}
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
              className="flex-1 gap-2 gradient-primary border-0"
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

        {/* 미응답 질문 안내 */}
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

export default AttachmentStyleTest;
