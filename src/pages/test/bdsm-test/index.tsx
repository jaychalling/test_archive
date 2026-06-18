import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { captureFriendRefFromUrl } from "@/lib/friendRef";
import { trackStartFromShare } from "@/lib/analytics";
import { SEOHead, createBreadcrumbSchema, createQuizSchema, createFAQSchema } from "@/components/SEOHead";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import {
  bdsmQuestions,
  bdsmFAQs,
  BdsmAnswerValue,
} from "@/data/bdsmTestQuestions";
import { CheckCircle2, ChevronLeft, ChevronRight, Heart, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const BdsmTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, BdsmAnswerValue>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = bdsmQuestions.length;
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const allQuestionsAnswered = answeredCount === totalQuestions;

  // LOOP CLOSER: capture a friend ref from the shared link + log start-from-share.
  useEffect(() => {
    const ref = captureFriendRefFromUrl();
    if (ref) trackStartFromShare("bdsm-test", ref.slug);
  }, []);

  const handleAnswer = (questionId: number, value: BdsmAnswerValue) => {
    if (isTransitioning) return;
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
    localStorage.setItem('bdsmTestAnswers', JSON.stringify(answers));
    navigate('/test/bdsm-test/result/');
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'BDSM Test', path: '/test/bdsm-test/' },
  ]);

  const quizSchema = createQuizSchema({
    name: "BDSM Test - Free Quiz to Discover Your Type",
    description: "Take the free BDSM Test online! Find out if you're dominant, submissive, switch or more. Quick 25-question quiz with instant results. Adults only.",
    path: "/test/bdsm-test/",
    numberOfQuestions: totalQuestions,
    timeRequired: "PT5M",
  });

  const faqSchema = createFAQSchema(bdsmFAQs);

  const question = bdsmQuestions[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="BDSM Test - Free Quiz to Discover Your Type"
        description="Take the free BDSM Test online! Find out if you're dominant, submissive, switch or more. Quick 25-question quiz with instant results. Adults only."
        path="/test/bdsm-test/"
        jsonLd={[breadcrumbSchema, quizSchema, faqSchema]}
      />

      {!testStarted ? (
        <>
          <Header />
          <main className="flex-1 flex items-center justify-center px-4 py-8">
            <div className="max-w-lg mx-auto test-card text-center animate-scale-in">
              <div className="flex justify-center mb-4">
                <Heart className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">BDSM Test</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Explore your relationship dynamics preferences.
                <br />
                Discover your tendencies across different BDSM archetypes.
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
                    <span>For adults only. Answer honestly for accurate results</span>
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

              <p className="text-xs text-muted-foreground mt-6">
                For entertainment purposes only. Not a therapeutic or diagnostic assessment.
              </p>
            </div>
          </main>

          {/* SEO content section — crawlable copy, FAQ, and internal links */}
          <section className="px-4 pb-16">
            <div className="max-w-2xl mx-auto space-y-10">
              <div>
                <h2 className="text-2xl font-bold mb-4">What Is This Free BDSM Test?</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  This free BDSM test is a 25-question quiz that maps your preferences across the
                  core BDSM archetypes — Dominant, Submissive, Switch, Sadist, and Masochist. Unlike
                  a simple yes/no checklist, each statement is rated on a five-point scale, so your
                  results reflect how strongly each tendency shows up rather than forcing you into a
                  single box.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The BDSM quiz takes about five minutes, requires no sign-up, and shows your full
                  archetype breakdown instantly. Your answers stay on your device — nothing is
                  uploaded or stored on our servers.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">How Your Results Are Scored</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Each question feeds one or more archetype scales. At the end of the quiz you get a
                  percentage for every archetype plus a primary profile such as Gentle Switch,
                  Pure Dominant, or Balanced Explorer. Most people score across several archetypes —
                  that is normal, and it is what makes the result more useful than a one-word label.
                </p>
              </div>

              <CollapsibleFAQ faqs={bdsmFAQs} title="BDSM Test FAQ" />

              <div>
                <h2 className="text-2xl font-bold mb-4">More Tests to Try</h2>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { to: "/test/love-language-test/", label: "Love Language Test" },
                    { to: "/test/attachment-style-test/", label: "Attachment Style Test" },
                    { to: "/test/toxic-trait-test/", label: "Toxic Trait Test" },
                  ].map((t) => (
                    <Link
                      key={t.to}
                      to={t.to}
                      className="flex items-center justify-between gap-2 p-4 rounded-lg border border-border bg-card hover:border-primary/40 transition-colors cursor-pointer"
                    >
                      <span className="font-medium text-sm">{t.label}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
      {/* 상단 바 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/95 backdrop-blur-sm">
        <div></div>
        <h1 className="font-semibold text-foreground">BDSM Test</h1>
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

      {/* 질문 영역 - 중앙 배치 */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div
          className={cn(
            "transition-all duration-300",
            isTransitioning ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
          )}
        >
          {/* 질문 텍스트 */}
          <p className="text-2xl md:text-3xl font-medium text-foreground text-center leading-loose mb-12">
            {question.text}
          </p>

          {/* 5점 척도 */}
          <div className="max-w-md mx-auto w-full">
            {/* 양끝 라벨 */}
            <div className="flex justify-between mb-3 px-2">
              <span className="text-xs text-muted-foreground">Strongly Disagree</span>
              <span className="text-xs text-muted-foreground">Strongly Agree</span>
            </div>

            {/* 1~5 원형 버튼 */}
            <div className="flex justify-center gap-3">
              {([1, 2, 3, 4, 5] as BdsmAnswerValue[]).map((value) => (
                <button
                  key={value}
                  onClick={() => handleAnswer(question.id, value)}
                  className={cn(
                    "flex-1 aspect-square max-w-16 rounded-full border-2 flex items-center justify-center text-lg font-medium transition-all duration-200",
                    answers[question.id] === value
                      ? "border-primary bg-primary text-primary-foreground scale-110"
                      : "border-border bg-background hover:border-primary/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 고정 네비게이션 */}
      <div className="flex items-center justify-between px-4 py-4 border-t border-border bg-background/95 backdrop-blur-sm">
        <Button
          onClick={handlePrevQuestion}
          variant="ghost"
          disabled={currentQuestion === 0}
          className="gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        {isLastQuestion && allQuestionsAnswered ? (
          <Button
            onClick={handleSubmit}
            className="gradient-primary border-0 gap-2 px-6"
          >
            <CheckCircle2 className="w-4 h-4" />
            View Results
          </Button>
        ) : (
          <Button
            onClick={handleNextQuestion}
            variant="ghost"
            disabled={isLastQuestion}
            className="gap-1"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
        </>
      )}
    </div>
  );
};

export default BdsmTest;
