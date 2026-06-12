import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { SEOHead, createBreadcrumbSchema, createQuizSchema, createFAQSchema } from "@/components/SEOHead";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import {
  ricePurityQuestions,
  ricePurityFAQs,
  scoreRanges,
} from "@/data/ricePurityQuestions";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const RicePurityTest = () => {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

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
    localStorage.setItem('ricePurityAnswers', JSON.stringify(Array.from(checkedItems)));
    navigate('/test/rice-purity/result/');
  };

  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const isFirstQuestion = currentQuestion === 0;
  const currentQuestionAnswered = answeredQuestions.has(currentQuestion);
  const allQuestionsAnswered = answeredQuestions.size === totalQuestions;

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Rice Purity Test', path: '/test/rice-purity/' },
  ]);

  const quizSchema = createQuizSchema({
    name: "Rice Purity Test - Official 100 Questions | Check Your Score",
    description: "Take the official Rice Purity Test with all 100 original questions! See your innocence score instantly. The classic college purity test - free & anonymous.",
    path: "/test/rice-purity/",
    numberOfQuestions: totalQuestions,
    timeRequired: "PT7M",
  });

  return (
    <div className="min-h-screen gradient-hero theme-purity">
      <SEOHead
        title="Rice Purity Test - Official 100 Questions | Check Your Score"
        description="Take the official Rice Purity Test with all 100 original questions! See your innocence score instantly. The classic college purity test - free & anonymous."
        path="/test/rice-purity/"
        jsonLd={[breadcrumbSchema, quizSchema, createFAQSchema(ricePurityFAQs)]}
      />
      <Header />

      <main className="container mx-auto px-4 py-8">
        {!testStarted ? (
          <>
          <div className="max-w-2xl mx-auto test-card text-center animate-scale-in">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Rice Purity Test</h1>
            <p className="text-lg text-muted-foreground mb-8">
              The classic innocence test with 100 questions.
              <br />
              Check off the experiences you've had and discover your purity score.
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
                  <span>Answer "Yes" if you've done it, "No" if you haven't</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                  <span>Takes approximately 5-7 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                  <span>Your score = 100 minus the number of "Yes" answers</span>
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

          {/* SEO content section — crawlable copy, score meaning, FAQ, internal links */}
          <section className="pt-12 pb-8">
            <div className="max-w-2xl mx-auto space-y-10">
              <div>
                <h2 className="text-2xl font-bold mb-4">What Is the Rice Purity Test?</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  The Rice Purity Test is a 100-question self-survey that started at Rice University
                  as a bonding activity for new students. You simply check off the life experiences
                  you have had — covering everything from holding hands to run-ins with the law —
                  and your rice purity score is 100 minus the number of items you checked. A higher
                  score means fewer experiences; a lower score means more.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This version keeps the classic 100 questions, takes about 5–7 minutes, and shows
                  your score instantly with a detailed interpretation of what your range typically
                  means. No sign-up, and your answers never leave your device.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">What Your Rice Purity Score Means</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  There is no "good" or "bad" rice purity score — most people land somewhere in the
                  middle, and scores naturally drop with age as life simply happens. The ranges
                  below show how results are typically read:
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-left">
                  {scoreRanges.map((r) => (
                    <div key={r.minScore} className="p-4 rounded-lg border border-border bg-card">
                      <h3 className="font-semibold mb-1">{r.minScore}–{r.maxScore}: {r.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {r.interpretation.slice(0, 120)}
                        {r.interpretation.length > 120 ? "…" : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <CollapsibleFAQ faqs={ricePurityFAQs} title="Rice Purity Test FAQ" />

              <div>
                <h2 className="text-2xl font-bold mb-4">More Tests to Try</h2>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { to: "/test/toxic-trait-test/", label: "Toxic Trait Test" },
                    { to: "/test/mental-age-test/", label: "Mental Age Test" },
                    { to: "/test/love-language-test/", label: "Love Language Test" },
                  ].map((t) => (
                    <Link
                      key={t.to}
                      to={t.to}
                      className="flex items-center justify-between gap-2 p-4 rounded-lg border border-border bg-card hover:border-primary/40 transition-colors cursor-pointer"
                    >
                      <span className="font-medium text-sm">{t.label}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
          </>
        ) : (
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
                <p className="text-2xl md:text-3xl font-medium text-foreground leading-loose mb-8">
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
        )}
      </main>
    </div>
  );
};

export default RicePurityTest;
