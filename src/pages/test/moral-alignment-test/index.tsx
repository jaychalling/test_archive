import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  moralAlignmentQuestions,
  answerOptions,
  AnswerValue,
  AlignmentType,
  alignmentData,
  testBackground,
  moralAlignmentFAQs,
  moralAlignmentCelebrities,
} from "@/data/moralAlignmentQuestions";
import { ChevronLeft, ChevronRight, CheckCircle2, RotateCcw, Share2, BookOpen, Lightbulb, TrendingUp, TrendingDown, Users, History, AlertCircle, Scale, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import ScoreDistributionChart from "@/components/ScoreDistributionChart";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import CelebrityComparison from "@/components/CelebrityComparison";
import RecommendedTests from "@/components/RecommendedTests";

interface AlignmentResult {
  goodEvil: number; // -10 ~ +10 (Evil ~ Good)
  lawfulChaotic: number; // -10 ~ +10 (Chaotic ~ Lawful)
}

const getAlignmentType = (
  goodEvil: number,
  lawfulChaotic: number
): AlignmentType => {
  // Good/Evil 분류
  let geCategory: "good" | "neutral" | "evil";
  if (goodEvil > 3) geCategory = "good";
  else if (goodEvil < -3) geCategory = "evil";
  else geCategory = "neutral";

  // Lawful/Chaotic 분류
  let lcCategory: "lawful" | "neutral" | "chaotic";
  if (lawfulChaotic > 3) lcCategory = "lawful";
  else if (lawfulChaotic < -3) lcCategory = "chaotic";
  else lcCategory = "neutral";

  // 조합
  if (lcCategory === "lawful" && geCategory === "good") return "lawfulGood";
  if (lcCategory === "neutral" && geCategory === "good") return "neutralGood";
  if (lcCategory === "chaotic" && geCategory === "good") return "chaoticGood";
  if (lcCategory === "lawful" && geCategory === "neutral") return "lawfulNeutral";
  if (lcCategory === "neutral" && geCategory === "neutral") return "trueNeutral";
  if (lcCategory === "chaotic" && geCategory === "neutral") return "chaoticNeutral";
  if (lcCategory === "lawful" && geCategory === "evil") return "lawfulEvil";
  if (lcCategory === "neutral" && geCategory === "evil") return "neutralEvil";
  return "chaoticEvil";
};

const alignmentGrid: { type: AlignmentType; label: string }[][] = [
  [
    { type: "lawfulGood", label: "Lawful Good" },
    { type: "neutralGood", label: "Neutral Good" },
    { type: "chaoticGood", label: "Chaotic Good" },
  ],
  [
    { type: "lawfulNeutral", label: "Lawful Neutral" },
    { type: "trueNeutral", label: "True Neutral" },
    { type: "chaoticNeutral", label: "Chaotic Neutral" },
  ],
  [
    { type: "lawfulEvil", label: "Lawful Evil" },
    { type: "neutralEvil", label: "Neutral Evil" },
    { type: "chaoticEvil", label: "Chaotic Evil" },
  ],
];

const gridColors: Record<AlignmentType, string> = {
  lawfulGood: "bg-yellow-500/30",
  neutralGood: "bg-green-500/30",
  chaoticGood: "bg-orange-500/30",
  lawfulNeutral: "bg-blue-500/30",
  trueNeutral: "bg-gray-500/30",
  chaoticNeutral: "bg-purple-500/30",
  lawfulEvil: "bg-red-700/30",
  neutralEvil: "bg-gray-700/30",
  chaoticEvil: "bg-red-900/30",
};

const MoralAlignmentTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCompleteButton, setShowCompleteButton] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = moralAlignmentQuestions.length;
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const currentQuestionData = moralAlignmentQuestions[currentQuestion];

  const handleAnswer = (questionId: number, value: AnswerValue) => {
    if (isTransitioning) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // 마지막 질문이면 결과 보기 버튼 표시
    if (isLastQuestion) {
      setShowCompleteButton(true);
    } else {
      // 0.1초 후 다음 질문으로 이동
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

  const goToPrevQuestion = () => {
    if (currentQuestion > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev - 1);
        setIsTransitioning(false);
        setShowCompleteButton(false);
      }, 100);
    }
  };

  const calculateResult = (): AlignmentResult => {
    let goodEvilScore = 0;
    let lawfulChaoticScore = 0;

    const goodEvilQuestions = moralAlignmentQuestions.filter(
      (q) => q.axis === "goodEvil"
    );
    const lawfulChaoticQuestions = moralAlignmentQuestions.filter(
      (q) => q.axis === "lawfulChaotic"
    );

    // 5점 척도를 -2 ~ +2로 변환 (3이 중립)
    goodEvilQuestions.forEach((q) => {
      const answer = answers[q.id] || 3;
      const normalizedAnswer = (answer - 3) * q.direction;
      goodEvilScore += normalizedAnswer;
    });

    lawfulChaoticQuestions.forEach((q) => {
      const answer = answers[q.id] || 3;
      const normalizedAnswer = (answer - 3) * q.direction;
      lawfulChaoticScore += normalizedAnswer;
    });

    // -10 ~ +10 스케일로 정규화
    const maxGoodEvilScore = goodEvilQuestions.length * 2;
    const maxLawfulChaoticScore = lawfulChaoticQuestions.length * 2;

    return {
      goodEvil: (goodEvilScore / maxGoodEvilScore) * 10,
      lawfulChaotic: (lawfulChaoticScore / maxLawfulChaoticScore) * 10,
    };
  };

  const handleSubmit = () => {
    localStorage.setItem('moralAlignmentAnswers', JSON.stringify(answers));
    navigate('/test/moral-alignment-test/result/');
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', path: '/', },
    { name: 'Moral Alignment Test', path: '/test/moral-alignment-test/' },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Moral Alignment Test - D&D Alignment Chart"
        description="Find your moral alignment among 9 types. Are you lawful, neutral, or chaotic? Good, neutral, or evil? For entertainment purposes only."
        path="/test/moral-alignment-test/"
        jsonLd={breadcrumbSchema}
      />

      {!testStarted ? (
        <>
          <Header />
          <main className="flex-1 flex items-center justify-center px-4 py-8">
            <div className="max-w-lg mx-auto test-card text-center animate-scale-in">
              <div className="flex justify-center mb-4">
                <Scale className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Moral Alignment Test</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Find your moral alignment on the D&D alignment chart.
                <br />
                Are you lawful or chaotic? Good or evil?
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
                    <span>Results show your position on the 9-type alignment chart</span>
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
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/95 backdrop-blur-sm">
        <Link to="/" className="p-2 -m-2 hover:opacity-70 transition-opacity">
          <Home className="w-5 h-5 text-muted-foreground" />
        </Link>
        <h1 className="font-display font-semibold text-foreground">
          Moral Alignment
        </h1>
        <span className="text-sm text-muted-foreground tabular-nums">
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
      <main className="flex-1 flex flex-col justify-center px-6 py-8">
        <div
          className={cn(
            "transition-all duration-300",
            isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
          )}
        >
          {/* Question Text */}
          <p className="text-2xl md:text-3xl font-medium text-foreground text-center leading-loose mb-12">
            {currentQuestionData.text}
          </p>

          {/* 5-Point Scale */}
          <div className="max-w-md mx-auto">
            {/* Labels */}
            <div className="flex justify-between text-sm text-muted-foreground mb-4">
              <span>Strongly Disagree</span>
              <span>Strongly Agree</span>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleAnswer(currentQuestionData.id, value as AnswerValue)}
                  className={cn(
                    "flex-1 aspect-square max-w-16 rounded-full border-2 font-semibold text-lg transition-all duration-200",
                    "flex items-center justify-center",
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
        </div>
      </main>

      {/* Bottom Navigation - Fixed */}
      <div className="border-t border-border bg-background/95 backdrop-blur-sm px-4 py-4">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <Button
            variant="outline"
            onClick={goToPrevQuestion}
            disabled={currentQuestion === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {showCompleteButton && isLastQuestion && answers[currentQuestionData.id] ? (
            <Button
              onClick={handleSubmit}
              className="gradient-primary border-0 gap-2 px-6"
            >
              <CheckCircle2 className="w-5 h-5" />
              View Results
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={goToNextQuestion}
              disabled={isLastQuestion || !answers[currentQuestionData.id]}
              className="gap-2"
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

export default MoralAlignmentTest;
