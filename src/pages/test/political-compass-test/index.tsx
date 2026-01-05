import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  politicalCompassQuestions,
  answerOptions,
  AnswerValue,
  getQuadrant,
  quadrantDescriptions,
  testBackground,
} from "@/data/politicalCompassQuestions";
import { CheckCircle2, ChevronLeft, ChevronRight, RotateCcw, Share2, Compass, BookOpen, History, Users, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CompassResult {
  economic: number; // -10 ~ +10 (Left ~ Right)
  social: number; // -10 ~ +10 (Libertarian ~ Authoritarian)
}

const colorClasses: Record<string, { bg: string; text: string }> = {
  red: { bg: "bg-red-500/10", text: "text-red-600" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-600" },
  green: { bg: "bg-green-500/10", text: "text-green-600" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-600" },
};

const PoliticalCompassTest = () => {
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = politicalCompassQuestions.length;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  const handleAnswer = (questionId: number, value: AnswerValue) => {
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

  const calculateResult = (): CompassResult => {
    let economicScore = 0;
    let socialScore = 0;

    const economicQuestions = politicalCompassQuestions.filter(
      (q) => q.category === "economic"
    );
    const socialQuestions = politicalCompassQuestions.filter(
      (q) => q.category === "social"
    );

    economicQuestions.forEach((q) => {
      economicScore += answers[q.id] || 0;
    });

    socialQuestions.forEach((q) => {
      socialScore += answers[q.id] || 0;
    });

    // Normalize to -10 ~ +10 scale
    const maxEconomicScore = economicQuestions.length * 2;
    const maxSocialScore = socialQuestions.length * 2;

    return {
      economic: (economicScore / maxEconomicScore) * 10,
      social: (socialScore / maxSocialScore) * 10,
    };
  };

  const handleSubmit = () => {
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setCurrentQuestion(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = async () => {
    const result = calculateResult();
    const quadrant = getQuadrantLabel(result.economic, result.social);
    const shareText = `My Political Spectrum: ${quadrant}\nEconomic: ${result.economic > 0 ? "Right" : "Left"} (${result.economic.toFixed(1)})\nSocial: ${result.social > 0 ? "Authoritarian" : "Libertarian"} (${result.social.toFixed(1)})`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Political Spectrum Test Result",
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
    { name: 'Political Compass Test', path: '/test/political-compass-test/' },
  ]);

  if (showResults) {
    const result = calculateResult();
    const quadrantType = getQuadrant(result.economic, result.social);
    const quadrantInfo = quadrantDescriptions[quadrantType];
    const colors = colorClasses[quadrantInfo.color] || colorClasses.blue;

    // Calculate position for the dot (convert from -10~10 to 0~100%)
    const dotX = ((result.economic + 10) / 20) * 100;
    const dotY = ((result.social + 10) / 20) * 100;

    return (
      <div className="min-h-screen gradient-hero">
        <SEOHead
          title="Your Political Orientation - Political Compass Test"
          description="Discover your political orientation on the compass. See where you stand between left/right and authoritarian/libertarian."
          path="/test/political-compass-test/"
          jsonLd={breadcrumbSchema}
        />
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
              Your Political Orientation
            </h2>
            <div className={cn("text-3xl font-display font-bold mb-2", colors.text)}>
              {quadrantInfo.name}
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {quadrantInfo.nameEn}
            </p>
            <p className="text-muted-foreground mb-8 text-sm">{quadrantInfo.description}</p>

            {/* Compass Chart */}
            <div className="relative w-full aspect-square max-w-[300px] mx-auto mb-8">
              {/* Background quadrants */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                <div className="bg-red-500/20 rounded-tl-lg flex items-center justify-center text-xs text-muted-foreground">
                  Left Authoritarian
                </div>
                <div className="bg-blue-500/20 rounded-tr-lg flex items-center justify-center text-xs text-muted-foreground">
                  Right Authoritarian
                </div>
                <div className="bg-green-500/20 rounded-bl-lg flex items-center justify-center text-xs text-muted-foreground">
                  Left Libertarian
                </div>
                <div className="bg-purple-500/20 rounded-br-lg flex items-center justify-center text-xs text-muted-foreground">
                  Right Libertarian
                </div>
              </div>

              {/* Axes */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

              {/* Axis labels */}
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full text-xs text-muted-foreground">
                Left
              </div>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full text-xs text-muted-foreground">
                Right
              </div>
              <div className="absolute left-1/2 -top-2 -translate-x-1/2 -translate-y-full text-xs text-muted-foreground">
                Authoritarian
              </div>
              <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 translate-y-full text-xs text-muted-foreground">
                Libertarian
              </div>

              {/* Result dot */}
              <div
                className="absolute w-4 h-4 bg-primary rounded-full shadow-lg border-2 border-white transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{
                  left: `${dotX}%`,
                  top: `${dotY}%`,
                }}
              />
            </div>

            {/* Scores */}
            <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="text-muted-foreground mb-1">Economic (Left/Right)</div>
                <div className="font-semibold">
                  {result.economic > 0 ? "Right" : "Left"} (
                  {result.economic.toFixed(1)})
                </div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="text-muted-foreground mb-1">
                  Social (Auth./Lib.)
                </div>
                <div className="font-semibold">
                  {result.social > 0 ? "Authoritarian" : "Libertarian"} (
                  {result.social.toFixed(1)})
                </div>
              </div>
            </div>

            {/* Detailed Description */}
            <div className={cn("text-left p-6 rounded-xl mb-6", colors.bg)}>
              <h3 className={cn("font-semibold mb-4 text-lg flex items-center gap-2", colors.text)}>
                <BookOpen className="w-5 h-5" />
                {quadrantInfo.name} - Detailed Analysis
              </h3>
              <p className="text-foreground leading-relaxed">
                {quadrantInfo.detailedDescription}
              </p>
            </div>

            {/* Historical Background */}
            <div className="text-left p-6 rounded-xl bg-amber-500/10 mb-6">
              <h3 className="font-semibold text-amber-600 mb-4 text-lg flex items-center gap-2">
                <History className="w-5 h-5" />
                Historical Background
              </h3>
              <p className="text-foreground leading-relaxed">
                {quadrantInfo.historicalBackground}
              </p>
            </div>

            {/* Key Policies & Famous Examples */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="text-left p-5 rounded-xl bg-cyan-500/10">
                <h3 className="font-semibold text-cyan-600 mb-4">Key Policies/Values</h3>
                <ul className="space-y-2">
                  {quadrantInfo.keyPolicies.map((policy, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-cyan-500 font-bold">•</span>
                      {policy}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-left p-5 rounded-xl bg-indigo-500/10">
                <h3 className="font-semibold text-indigo-600 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Notable Figures
                </h3>
                <ul className="space-y-2">
                  {quadrantInfo.famousExamples.map((example, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-indigo-500 font-bold">•</span>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="text-left p-5 rounded-xl bg-green-500/10">
                <h3 className="font-semibold text-green-600 mb-4">Strengths</h3>
                <ul className="space-y-2">
                  {quadrantInfo.strengthsAndWeaknesses.strengths.map((strength, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-left p-5 rounded-xl bg-orange-500/10">
                <h3 className="font-semibold text-orange-600 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Weaknesses/Criticisms
                </h3>
                <ul className="space-y-2">
                  {quadrantInfo.strengthsAndWeaknesses.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Test Background */}
            <div className="text-left p-6 rounded-xl bg-muted/30 mb-8">
              <h3 className="font-semibold text-foreground mb-4 text-lg">About the Political Spectrum</h3>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {testBackground.history}
                </p>
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <h4 className="font-medium text-amber-600 mb-2">Note</h4>
                  <p className="text-sm text-foreground leading-relaxed">
                    {testBackground.disclaimer}
                  </p>
                </div>
              </div>
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

  const allQuestionsAnswered = answeredCount === totalQuestions;

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      <SEOHead
        title="Political Compass Test - Where Do You Stand?"
        description="Take the Political Compass Test and map your political views on a 2D spectrum with economic and social axes. For entertainment purposes only."
        path="/test/political-compass-test/"
        jsonLd={breadcrumbSchema}
      />
      {/* Top Bar */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-foreground">Political Spectrum</span>
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
              const question = politicalCompassQuestions[currentQuestion];
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
                      {answerOptions.map((option, index) => (
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
                          {index + 1}
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

export default PoliticalCompassTest;
