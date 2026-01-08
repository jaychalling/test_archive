import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  personalityQuestions,
  AnswerChoice,
  PersonalityType,
  PersonalityResult,
  DimensionScore,
  Dimension,
  personalityTypeInfo,
  dimensionInfo,
  typeColors,
  typeTextColors,
  typeBgColors,
  typeGroups,
  getTypeGroup,
  personalityTypeFAQs,
  personalityTypeCelebrities,
} from "@/data/personalityTypeQuestions";
import { ChevronLeft, ChevronRight, CheckCircle2, RotateCcw, Share2, Layers, BookOpen, Lightbulb } from "lucide-react";
import ScoreDistributionChart from "@/components/ScoreDistributionChart";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import CelebrityComparison from "@/components/CelebrityComparison";
import RecommendedTests from "@/components/RecommendedTests";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const calculateResults = (answers: Record<number, AnswerChoice>): PersonalityResult => {
  const dimensionScores: Record<Dimension, { poleA: number; poleB: number }> = {
    EI: { poleA: 0, poleB: 0 },
    SN: { poleA: 0, poleB: 0 },
    TF: { poleA: 0, poleB: 0 },
    JP: { poleA: 0, poleB: 0 },
  };

  // 각 답변에 따라 점수 계산
  personalityQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer === "A") {
      dimensionScores[question.dimension].poleA++;
    } else if (answer === "B") {
      dimensionScores[question.dimension].poleB++;
    }
  });

  // 각 차원별 점수 계산
  const calculateDimensionScore = (dimension: Dimension): DimensionScore => {
    const scores = dimensionScores[dimension];
    const total = scores.poleA + scores.poleB;
    const percentageA = total > 0 ? Math.round((scores.poleA / total) * 100) : 50;
    const percentageB = total > 0 ? Math.round((scores.poleB / total) * 100) : 50;

    return {
      dimension,
      poleA: scores.poleA,
      poleB: scores.poleB,
      percentageA,
      percentageB,
      dominant: scores.poleA >= scores.poleB ? "A" : "B",
    };
  };

  const EI = calculateDimensionScore("EI");
  const SN = calculateDimensionScore("SN");
  const TF = calculateDimensionScore("TF");
  const JP = calculateDimensionScore("JP");

  // 4글자 유형 코드 생성
  const typeCode = (
    (EI.dominant === "A" ? "E" : "I") +
    (SN.dominant === "A" ? "S" : "N") +
    (TF.dominant === "A" ? "T" : "F") +
    (JP.dominant === "A" ? "J" : "P")
  ) as PersonalityType;

  return {
    typeCode,
    dimensionScores: { EI, SN, TF, JP },
  };
};

const SixteenPersonalityTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerChoice>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCompleteButton, setShowCompleteButton] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = personalityQuestions.length;
  const currentQ = personalityQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const allAnswered = answeredCount === totalQuestions;

  // Check if all questions are answered to show complete button
  useEffect(() => {
    if (allAnswered && isLastQuestion) {
      setShowCompleteButton(true);
    }
  }, [allAnswered, isLastQuestion]);

  const handleAnswer = (questionId: number, choice: AnswerChoice) => {
    if (isTransitioning) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: choice,
    }));

    // Auto-advance to next question after 0.1 seconds
    if (!isLastQuestion) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setIsTransitioning(false);
      }, 100);
    } else {
      // Last question answered
      setShowCompleteButton(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev - 1);
        setIsTransitioning(false);
      }, 100);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setIsTransitioning(false);
      }, 100);
    }
  };

  const handleSubmit = () => {
    localStorage.setItem('personalityTypeAnswers', JSON.stringify(answers));
    navigate('/test/16-personality-test/result/');
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', path: '/', },
    { name: '16 Personality Test', path: '/test/16-personality-test/' },
  ]);

  return (
    <div className="min-h-screen gradient-hero">
      <SEOHead
        title="16 Personalities Test - Find Your Type"
        description="Discover your personality type among 16 types. Analyze 4 dimensions: energy, information, decisions, and lifestyle. For entertainment purposes only."
        path="/test/16-personality-test/"
        jsonLd={breadcrumbSchema}
      />
      <Header />

      <main className="container mx-auto px-4 py-8">
        {!testStarted ? (
          <div className="max-w-lg mx-auto test-card text-center animate-scale-in">
            <div className="flex justify-center mb-4">
              <Layers className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">16 Personality Test</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover your personality type among 16 types.
              <br />
              Analyze 4 dimensions: Energy, Information, Decisions, Lifestyle.
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
                  <span>Choose between two options (A or B) for each question</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                  <span>Takes approximately 5-7 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                  <span>Results reveal your 4-letter type code (e.g., INTJ, ENFP)</span>
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
        ) : (
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Layers className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              16 Personality Type Test
            </h1>
            <p className="text-muted-foreground">
              For each question, select the statement that best describes you.
              <br />
              Find your personality type among 16 types.
            </p>
          </div>

          {/* Dimension Overview */}
          <div className="test-card mb-6">
            <h3 className="text-sm font-medium text-foreground mb-3">4 Dimensions Measured</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-primary/10 text-center">
                <div className="font-medium text-primary">E / I</div>
                <div className="text-muted-foreground">Energy Direction</div>
              </div>
              <div className="p-2 rounded-lg bg-primary/10 text-center">
                <div className="font-medium text-primary">S / N</div>
                <div className="text-muted-foreground">Information Gathering</div>
              </div>
              <div className="p-2 rounded-lg bg-primary/10 text-center">
                <div className="font-medium text-primary">T / F</div>
                <div className="text-muted-foreground">Decision Making</div>
              </div>
              <div className="p-2 rounded-lg bg-primary/10 text-center">
                <div className="font-medium text-primary">J / P</div>
                <div className="text-muted-foreground">Lifestyle</div>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-background/80 backdrop-blur-md py-4 mb-6 rounded-lg">
            <ProgressBar current={answeredCount} total={totalQuestions} />
            <div className="text-center mt-2">
              <span className="text-sm font-medium text-foreground">
                {currentQuestion + 1}
              </span>
              <span className="text-sm text-muted-foreground">
                {" "}/{" "}{totalQuestions}
              </span>
            </div>
          </div>

          {/* Single Question Display */}
          <div className="min-h-[300px] relative">
            <div
              className={cn(
                "test-card transition-all duration-300",
                isTransitioning ? "opacity-0 transform translate-x-4" : "opacity-100 transform translate-x-0"
              )}
            >
              <div className="flex gap-3 mb-6">
                <span className="text-lg font-semibold text-primary min-w-[40px]">
                  Q{currentQuestion + 1}.
                </span>
                <span className="text-sm text-muted-foreground">
                  Select the statement that best describes you
                </span>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleAnswer(currentQ.id, "A")}
                  disabled={isTransitioning}
                  className={cn(
                    "w-full p-5 text-left text-lg rounded-xl border-2 transition-all duration-200 leading-relaxed",
                    answers[currentQ.id] === "A"
                      ? "border-primary bg-primary/10 text-foreground shadow-md"
                      : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <span className="font-semibold text-primary mr-3">A.</span>
                  {currentQ.optionA.text}
                </button>
                <button
                  onClick={() => handleAnswer(currentQ.id, "B")}
                  disabled={isTransitioning}
                  className={cn(
                    "w-full p-5 text-left text-lg rounded-xl border-2 transition-all duration-200 leading-relaxed",
                    answers[currentQ.id] === "B"
                      ? "border-primary bg-primary/10 text-foreground shadow-md"
                      : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <span className="font-semibold text-primary mr-3">B.</span>
                  {currentQ.optionB.text}
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-6 mb-8">
            <Button
              onClick={handlePrevious}
              variant="outline"
              disabled={currentQuestion === 0 || isTransitioning}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex gap-1">
              {personalityQuestions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (!isTransitioning) {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setCurrentQuestion(idx);
                        setIsTransitioning(false);
                      }, 150);
                    }
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-200",
                    idx === currentQuestion
                      ? "bg-primary w-4"
                      : answers[personalityQuestions[idx].id]
                      ? "bg-primary/50"
                      : "bg-muted-foreground/30"
                  )}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              variant="outline"
              disabled={currentQuestion === totalQuestions - 1 || isTransitioning}
              className="gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Submit Button - Show when all answered or on last question with answer */}
          {showCompleteButton && (
            <div className="text-center pb-12 animate-fade-in">
              <Button
                onClick={handleSubmit}
                size="lg"
                disabled={answeredCount < totalQuestions}
                className="gradient-primary border-0 gap-2 px-8 shadow-elevated hover:shadow-card transition-all duration-300 disabled:opacity-50"
              >
                <CheckCircle2 className="w-5 h-5" />
                View Results
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                {answeredCount}/{totalQuestions} questions answered
              </p>
            </div>
          )}
        </div>
        )}
      </main>
    </div>
  );
};

export default SixteenPersonalityTest;
