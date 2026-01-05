import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  loveLanguageQuestions,
  LoveLanguage,
  LoveLanguageResult,
  loveLanguageDescriptions,
} from "@/data/loveLanguageQuestions";
import { ArrowLeft, CheckCircle2, RotateCcw, Share2, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type AnswerChoice = "A" | "B";

const calculateResults = (answers: Record<number, AnswerChoice>): LoveLanguageResult => {
  const result: LoveLanguageResult = {
    wordsOfAffirmation: 0,
    actsOfService: 0,
    receivingGifts: 0,
    qualityTime: 0,
    physicalTouch: 0,
  };

  loveLanguageQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer === "A") {
      result[question.optionA.language]++;
    } else if (answer === "B") {
      result[question.optionB.language]++;
    }
  });

  return result;
};

const getRankedLanguages = (result: LoveLanguageResult): { language: LoveLanguage; score: number }[] => {
  const entries = Object.entries(result) as [LoveLanguage, number][];
  return entries
    .map(([language, score]) => ({ language, score }))
    .sort((a, b) => b.score - a.score);
};

const languageColors: Record<LoveLanguage, string> = {
  wordsOfAffirmation: "bg-pink-500",
  actsOfService: "bg-blue-500",
  receivingGifts: "bg-amber-500",
  qualityTime: "bg-green-500",
  physicalTouch: "bg-purple-500",
};

const LoveLanguageTest = () => {
  const [answers, setAnswers] = useState<Record<number, AnswerChoice>>({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCompleteButton, setShowCompleteButton] = useState(false);

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
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setCurrentQuestion(0);
    setShowCompleteButton(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = async () => {
    const result = calculateResults(answers);
    const ranked = getRankedLanguages(result);
    const primaryLanguage = loveLanguageDescriptions[ranked[0].language];
    const secondaryLanguage = loveLanguageDescriptions[ranked[1].language];

    const shareText = `My Affection Style Test Result\n\n1st: ${primaryLanguage.name} (${ranked[0].score} points)\n2nd: ${secondaryLanguage.name} (${ranked[1].score} points)\n\nWords of Affirmation: ${result.wordsOfAffirmation}\nActs of Service: ${result.actsOfService}\nReceiving Gifts: ${result.receivingGifts}\nQuality Time: ${result.qualityTime}\nPhysical Touch: ${result.physicalTouch}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Affection Style Test Result",
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      alert("Result copied to clipboard!");
    }
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Love Language Test', path: '/test/love-language-test/' },
  ]);

  if (showResults) {
    const result = calculateResults(answers);
    const ranked = getRankedLanguages(result);
    const primaryLanguage = ranked[0];
    const secondaryLanguage = ranked[1];
    const primaryInfo = loveLanguageDescriptions[primaryLanguage.language];
    const secondaryInfo = loveLanguageDescriptions[secondaryLanguage.language];
    const maxScore = 12; // 각 언어는 최대 12점 (30문제에서 각 언어가 12번 등장)

    return (
      <div className="min-h-screen gradient-hero">
        <SEOHead
          title="Your Love Language - Affection Style Results"
          description="See your love language results and learn how you express affection. Improve your relationships with this insight."
          path="/test/love-language-test/"
          jsonLd={breadcrumbSchema}
        />
        <Header />
        <main className="container mx-auto px-4 py-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tests
          </Link>

          <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-pink-500" />
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Your Affection Style
              </h2>
            </div>

            {/* Primary Language */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 mb-6">
              <div className="text-sm text-muted-foreground mb-1">Primary Love Language</div>
              <div className="text-3xl font-display font-bold text-gradient mb-2">
                {primaryInfo.name}
              </div>
              <div className="text-sm text-muted-foreground mb-3">
                {primaryInfo.nameEn}
              </div>
              <p className="text-sm text-foreground">
                {primaryInfo.description}
              </p>
            </div>

            {/* Secondary Language */}
            <div className="p-4 rounded-lg bg-muted/30 mb-6">
              <div className="text-sm text-muted-foreground mb-1">Secondary Love Language</div>
              <div className="font-semibold text-foreground text-lg">
                {secondaryInfo.name}
              </div>
              <div className="text-xs text-muted-foreground mb-2">
                {secondaryInfo.nameEn}
              </div>
              <p className="text-xs text-muted-foreground">
                {secondaryInfo.description}
              </p>
            </div>

            {/* Score Bars */}
            <div className="space-y-4 mb-8">
              <h3 className="text-sm font-medium text-foreground text-left mb-3">
                Scores by Language
              </h3>
              {ranked.map(({ language, score }) => (
                <div key={language} className="text-left">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-foreground">
                      {loveLanguageDescriptions[language].name}
                    </span>
                    <span className="text-sm text-muted-foreground">{score} pts</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-500", languageColors[language])}
                      style={{ width: `${(score / maxScore) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Primary Language Details */}
            <div className="text-left p-4 rounded-lg bg-muted/20 mb-6">
              <h3 className="font-semibold text-foreground mb-3">
                Characteristics of {primaryInfo.name}
              </h3>
              <ul className="space-y-2">
                {primaryInfo.characteristics.map((char, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-pink-500 mt-1">•</span>
                    {char}
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-3 rounded-lg bg-pink-500/10">
                <div className="text-xs font-medium text-pink-600 mb-1">Tip</div>
                <p className="text-sm text-foreground">{primaryInfo.tips}</p>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="text-left p-6 rounded-xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 mb-6">
              <h3 className="font-semibold text-pink-600 mb-4 text-lg">{primaryInfo.name} - In-Depth Analysis</h3>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                {primaryInfo.detailedDescription}
              </p>
            </div>

            {/* Scientific Background */}
            <div className="text-left p-6 rounded-xl bg-blue-500/10 mb-6">
              <h3 className="font-semibold text-blue-600 mb-4 text-lg">Scientific Background</h3>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                {primaryInfo.scientificBackground}
              </p>
            </div>

            {/* Expression Methods */}
            <div className="text-left p-6 rounded-xl bg-green-500/10 mb-6">
              <h3 className="font-semibold text-green-600 mb-4 text-lg">How to Express {primaryInfo.name}</h3>
              <ul className="space-y-2">
                {primaryInfo.expressionMethods.map((method, idx) => (
                  <li key={idx} className="text-sm text-foreground flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-green-600">{idx + 1}</span>
                    </span>
                    {method}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recognition Signs */}
            <div className="text-left p-6 rounded-xl bg-amber-500/10 mb-6">
              <h3 className="font-semibold text-amber-600 mb-4 text-lg">How to Recognize It</h3>
              <ul className="space-y-2">
                {primaryInfo.recognitionSigns.map((sign, idx) => (
                  <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    {sign}
                  </li>
                ))}
              </ul>
            </div>

            {/* Partnership Tips */}
            <div className="text-left p-6 rounded-xl bg-purple-500/10 mb-6">
              <h3 className="font-semibold text-purple-600 mb-4 text-lg">Tips for Partners</h3>
              <ul className="space-y-2">
                {primaryInfo.partnershipTips.map((tip, idx) => (
                  <li key={idx} className="text-sm text-foreground flex items-start gap-3">
                    <Heart className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 justify-center">
              <Button onClick={handleReset} variant="outline" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Retake
              </Button>
              <Button
                onClick={handleShare}
                className="gap-2 gradient-primary border-0"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero">
      <SEOHead
        title="Love Language Test - 5 Affection Styles"
        description="Discover your primary love language with this 30-question test. Learn how you prefer to give and receive love. For entertainment purposes only."
        path="/test/love-language-test/"
        jsonLd={breadcrumbSchema}
      />
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
            <div className="flex items-center justify-center gap-2 mb-3">
              <Heart className="w-8 h-8 text-pink-500" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Affection Style Test
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
                  "w-full p-4 text-left text-sm rounded-lg border-2 transition-all duration-200",
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
                  "w-full p-4 text-left text-sm rounded-lg border-2 transition-all duration-200",
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
      </main>
    </div>
  );
};

export default LoveLanguageTest;
