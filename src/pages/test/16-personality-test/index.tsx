import { useState, useEffect } from "react";
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
  const [answers, setAnswers] = useState<Record<number, AnswerChoice>>({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCompleteButton, setShowCompleteButton] = useState(false);

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
    const typeInfo = personalityTypeInfo[result.typeCode];
    const { EI, SN, TF, JP } = result.dimensionScores;

    const shareText = `My 16 Personality Type Test Results

Type: ${result.typeCode} - ${typeInfo.name}
Nickname: ${typeInfo.nickname}

Dimension Results:
- Energy Direction: E ${EI.percentageA}% / I ${EI.percentageB}%
- Information Gathering: S ${SN.percentageA}% / N ${SN.percentageB}%
- Decision Making: T ${TF.percentageA}% / F ${TF.percentageB}%
- Lifestyle: J ${JP.percentageA}% / P ${JP.percentageB}%

${typeInfo.description}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "16 Personality Type Test Results",
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
    { name: '16 Personality Test', path: '/test/16-personality-test/' },
  ]);

  if (showResults) {
    const result = calculateResults(answers);
    const typeInfo = personalityTypeInfo[result.typeCode];
    const group = getTypeGroup(result.typeCode);
    const groupInfo = typeGroups[group];
    const { EI, SN, TF, JP } = result.dimensionScores;

    return (
      <div className="min-h-screen gradient-hero">
        <SEOHead
          title="Your 16 Personality Type - Test Results"
          description="See your 16 personality type result. Understand your cognitive functions and preferences."
          path="/test/16-personality-test/"
          jsonLd={breadcrumbSchema}
        />
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
            {/* Result Hero Section */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <Layers className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-muted-foreground mb-3">
              Your Personality Type Result
            </h2>

            {/* Main Type Display */}
            <div className={cn("p-8 rounded-xl bg-gradient-to-br mb-6", typeBgColors[result.typeCode])}>
              <div className="text-6xl md:text-7xl font-extrabold mb-3">
                <span className={typeTextColors[result.typeCode]}>{result.typeCode}</span>
              </div>
              <h3 className={cn("text-2xl font-bold mb-2", typeTextColors[result.typeCode])}>
                {typeInfo.name}
              </h3>
              <p className="text-base text-muted-foreground mb-4 font-medium">
                {typeInfo.nickname}
              </p>
              <div className={cn("inline-block px-3 py-1 rounded-full text-xs font-medium", `bg-${groupInfo.color}-500/20`, `text-${groupInfo.color}-600`)}>
                {groupInfo.name} - {groupInfo.description}
              </div>
            </div>

            {/* Description */}
            <div className="p-6 rounded-lg bg-muted/50 mb-8 text-left">
              <p className="text-xl leading-relaxed text-foreground font-medium">{typeInfo.description}</p>
            </div>

            {/* Type Distribution Chart - adapted for personality types */}
            <div className="mb-12">
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
                  <Layers className="w-6 h-6 text-primary" />
                  <span className="text-foreground">Your Type in Context</span>
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-foreground">Your Type: {result.typeCode}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                          You
                        </span>
                      </div>
                    </div>
                    <div className={cn("p-4 rounded-lg", typeBgColors[result.typeCode])}>
                      <p className="text-sm text-foreground leading-relaxed">
                        <span className="font-semibold">{groupInfo.name}</span> - {typeInfo.description}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Your personality type represents approximately{" "}
                      <span className="font-semibold text-foreground">
                        {result.typeCode === "INFJ" ? "1-3%" : result.typeCode === "INTJ" || result.typeCode === "ENTJ" || result.typeCode === "ENFJ" ? "2-5%" : result.typeCode === "INTP" || result.typeCode === "ENTP" || result.typeCode === "INFP" || result.typeCode === "ENFP" ? "3-5%" : result.typeCode === "ISTP" || result.typeCode === "ESTP" || result.typeCode === "ESFP" ? "4-6%" : result.typeCode === "ISFP" ? "5-9%" : result.typeCode === "ESTJ" ? "8-12%" : result.typeCode === "ESFJ" || result.typeCode === "ISFJ" ? "9-13%" : "11-14%"}
                      </span>{" "}
                      of the general population, making it {result.typeCode === "INFJ" ? "the rarest" : result.typeCode === "ISTJ" || result.typeCode === "ISFJ" || result.typeCode === "ESFJ" ? "one of the most common" : result.typeCode === "INTJ" || result.typeCode === "ENTJ" || result.typeCode === "ENFJ" || result.typeCode === "INTP" || result.typeCode === "ENTP" ? "relatively rare" : "moderately common"} personality type.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Description */}
            {typeInfo.detailedDescription && (
              <div className="p-6 rounded-lg bg-muted/50 mb-8 text-left">
                <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-primary" />
                  <span className="text-foreground">{result.typeCode} Type In-Depth Analysis</span>
                </h3>
                <p className="text-base text-foreground leading-relaxed font-normal">{typeInfo.detailedDescription}</p>
              </div>
            )}

            {/* Scientific Background */}
            {typeInfo.scientificBackground && (
              <div className="p-6 rounded-lg bg-purple-500/10 border border-purple-500/20 mb-8 text-left">
                <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
                  <Lightbulb className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  <span className="text-foreground">Scientific Background</span>
                </h3>
                <p className="text-base text-foreground leading-relaxed font-normal">{typeInfo.scientificBackground}</p>
              </div>
            )}

            {/* Celebrity Comparison */}
            <div className="mb-8">
              <CelebrityComparison
                userScore={0}
                celebrities={personalityTypeCelebrities.filter(c => c.type === result.typeCode).concat(
                  personalityTypeCelebrities.filter(c => c.type !== result.typeCode).slice(0, 3)
                ).map(c => ({
                  name: c.name,
                  score: c.type === result.typeCode ? 100 : 85,
                  description: c.description,
                  avatar: c.avatar
                }))}
                maxScore={100}
                title={`Famous ${result.typeCode} Personalities`}
              />
            </div>

            {/* Cognitive Functions */}
            {typeInfo.cognitiveFunctions && (
              <div className="p-6 rounded-lg bg-indigo-500/10 border border-indigo-500/20 mb-8 text-left">
                <h3 className="text-2xl font-bold mb-5 text-indigo-700 dark:text-indigo-400">Cognitive Function Stack</h3>
                <div className="grid md:grid-cols-2 gap-3 mb-4">
                  <div className="p-4 rounded-lg bg-background/50 border border-border">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Dominant Function</span>
                    <p className="font-semibold text-base text-foreground mt-1">{typeInfo.cognitiveFunctions.dominant}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-background/50 border border-border">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Auxiliary Function</span>
                    <p className="font-semibold text-base text-foreground mt-1">{typeInfo.cognitiveFunctions.auxiliary}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-background/50 border border-border">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tertiary Function</span>
                    <p className="font-semibold text-base text-foreground mt-1">{typeInfo.cognitiveFunctions.tertiary}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-background/50 border border-border">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Inferior Function</span>
                    <p className="font-semibold text-base text-foreground mt-1">{typeInfo.cognitiveFunctions.inferior}</p>
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{typeInfo.cognitiveFunctions.description}</p>
              </div>
            )}

            {/* Dimension Bars */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-bold text-foreground text-left mb-5">
                Dimension Preference Ratios
              </h3>

              {/* E/I */}
              <div className="text-left">
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span className={cn("font-medium", EI.dominant === "A" ? "text-primary" : "text-muted-foreground")}>
                    E Extroversion {EI.percentageA}%
                  </span>
                  <span className="text-xs text-muted-foreground">{dimensionInfo.EI.name}</span>
                  <span className={cn("font-medium", EI.dominant === "B" ? "text-primary" : "text-muted-foreground")}>
                    {EI.percentageB}% Introversion I
                  </span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden flex">
                  <div
                    className={cn(
                      "h-full transition-all duration-500",
                      EI.dominant === "A" ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                    style={{ width: `${EI.percentageA}%` }}
                  />
                  <div
                    className={cn(
                      "h-full transition-all duration-500",
                      EI.dominant === "B" ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                    style={{ width: `${EI.percentageB}%` }}
                  />
                </div>
              </div>

              {/* S/N */}
              <div className="text-left">
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span className={cn("font-medium", SN.dominant === "A" ? "text-primary" : "text-muted-foreground")}>
                    S Sensing {SN.percentageA}%
                  </span>
                  <span className="text-xs text-muted-foreground">{dimensionInfo.SN.name}</span>
                  <span className={cn("font-medium", SN.dominant === "B" ? "text-primary" : "text-muted-foreground")}>
                    {SN.percentageB}% Intuition N
                  </span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden flex">
                  <div
                    className={cn(
                      "h-full transition-all duration-500",
                      SN.dominant === "A" ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                    style={{ width: `${SN.percentageA}%` }}
                  />
                  <div
                    className={cn(
                      "h-full transition-all duration-500",
                      SN.dominant === "B" ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                    style={{ width: `${SN.percentageB}%` }}
                  />
                </div>
              </div>

              {/* T/F */}
              <div className="text-left">
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span className={cn("font-medium", TF.dominant === "A" ? "text-primary" : "text-muted-foreground")}>
                    T Thinking {TF.percentageA}%
                  </span>
                  <span className="text-xs text-muted-foreground">{dimensionInfo.TF.name}</span>
                  <span className={cn("font-medium", TF.dominant === "B" ? "text-primary" : "text-muted-foreground")}>
                    {TF.percentageB}% Feeling F
                  </span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden flex">
                  <div
                    className={cn(
                      "h-full transition-all duration-500",
                      TF.dominant === "A" ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                    style={{ width: `${TF.percentageA}%` }}
                  />
                  <div
                    className={cn(
                      "h-full transition-all duration-500",
                      TF.dominant === "B" ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                    style={{ width: `${TF.percentageB}%` }}
                  />
                </div>
              </div>

              {/* J/P */}
              <div className="text-left">
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span className={cn("font-medium", JP.dominant === "A" ? "text-primary" : "text-muted-foreground")}>
                    J Judging {JP.percentageA}%
                  </span>
                  <span className="text-xs text-muted-foreground">{dimensionInfo.JP.name}</span>
                  <span className={cn("font-medium", JP.dominant === "B" ? "text-primary" : "text-muted-foreground")}>
                    {JP.percentageB}% Perceiving P
                  </span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden flex">
                  <div
                    className={cn(
                      "h-full transition-all duration-500",
                      JP.dominant === "A" ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                    style={{ width: `${JP.percentageA}%` }}
                  />
                  <div
                    className={cn(
                      "h-full transition-all duration-500",
                      JP.dominant === "B" ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                    style={{ width: `${JP.percentageB}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Characteristics */}
            <div className="p-6 rounded-lg bg-muted/50 mb-8 text-left">
              <h3 className="text-xl font-bold mb-4 text-foreground">Key Characteristics</h3>
              <ul className="space-y-2.5">
                {typeInfo.characteristics.map((char, idx) => (
                  <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                    <span className={cn("font-bold", typeTextColors[result.typeCode])}>•</span>
                    <span className="leading-relaxed">{char}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-lg bg-green-500/10 border border-green-500/20 text-left">
                <h3 className="text-xl font-bold mb-5 text-green-700 dark:text-green-400">Strengths</h3>
                <ul className="space-y-3">
                  {typeInfo.strengths.map((strength, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span className="leading-relaxed">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-lg bg-orange-500/10 border border-orange-500/20 text-left">
                <h3 className="text-xl font-bold mb-5 text-orange-700 dark:text-orange-400">Areas to Develop</h3>
                <ul className="space-y-3">
                  {typeInfo.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-3">
                      <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                      <span className="leading-relaxed">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Careers */}
            <div className={cn("p-6 rounded-lg bg-gradient-to-br border mb-8 text-left", typeBgColors[result.typeCode], "border-primary/20")}>
              <h3 className={cn("text-xl font-bold mb-4", typeTextColors[result.typeCode])}>Suitable Careers</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {typeInfo.careers.map((career, idx) => (
                  <span
                    key={idx}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium",
                      typeColors[result.typeCode],
                      "text-white"
                    )}
                  >
                    {career}
                  </span>
                ))}
              </div>
              {typeInfo.careerDescription && (
                <p className="text-sm text-foreground leading-relaxed">{typeInfo.careerDescription}</p>
              )}
            </div>

            {/* Relationship & Communication Style */}
            {(typeInfo.relationshipStyle || typeInfo.communicationStyle) && (
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {typeInfo.relationshipStyle && (
                  <div className="p-6 rounded-lg bg-rose-500/10 border border-rose-500/20 text-left">
                    <h3 className="text-xl font-bold text-rose-700 dark:text-rose-400 mb-4">Relationship Style</h3>
                    <p className="text-sm text-foreground leading-relaxed">{typeInfo.relationshipStyle}</p>
                  </div>
                )}
                {typeInfo.communicationStyle && (
                  <div className="p-6 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-left">
                    <h3 className="text-xl font-bold text-cyan-700 dark:text-cyan-400 mb-4">Communication Style</h3>
                    <p className="text-sm text-foreground leading-relaxed">{typeInfo.communicationStyle}</p>
                  </div>
                )}
              </div>
            )}

            {/* Growth Strategies */}
            {typeInfo.growthStrategies && typeInfo.growthStrategies.length > 0 && (
              <div className="p-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-8 text-left">
                <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-4">Growth Advice</h3>
                <ul className="space-y-3">
                  {typeInfo.growthStrategies.map((strategy, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold flex-shrink-0">{idx + 1}.</span>
                      <span className="leading-relaxed">{strategy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stress Response */}
            {typeInfo.stressResponse && (
              <div className="p-6 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-8 text-left">
                <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400 mb-4">Stress Response</h3>
                <p className="text-sm text-foreground leading-relaxed">{typeInfo.stressResponse}</p>
              </div>
            )}

            {/* Recommended Tests */}
            <div className="mb-8">
              <RecommendedTests
                tests={[
                  {
                    title: "Big Five Personality Test",
                    description: "Explore your personality across five major dimensions: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.",
                    url: "/test/big-five-test",
                    icon: "🎭",
                    reason: "Provides a complementary scientific perspective on your personality traits"
                  },
                  {
                    title: "Enneagram Test",
                    description: "Discover your core motivations and fears through the nine Enneagram personality types.",
                    url: "/test/enneagram-test",
                    icon: "⭐",
                    reason: "Offers deeper insight into your core motivations and growth path"
                  },
                  {
                    title: "Career Aptitude Test",
                    description: "Find careers that match your skills, interests, and personality strengths.",
                    url: "/test/career-aptitude-test",
                    icon: "💼",
                    reason: "Helps you apply your personality type insights to career planning"
                  }
                ]}
                subtitle="Based on your personality type, these tests provide deeper insights"
              />
            </div>

            {/* FAQ Section */}
            <div className="mb-8">
              <CollapsibleFAQ faqs={personalityTypeFAQs} />
            </div>

            {/* Compatible & Challenging Types */}
            {(typeInfo.compatibleTypes || typeInfo.challengingTypes) && (
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {typeInfo.compatibleTypes && typeInfo.compatibleTypes.length > 0 && (
                  <div className="p-6 rounded-lg bg-green-500/10 border border-green-500/20 text-left">
                    <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-4">Compatible Types</h3>
                    <div className="flex flex-wrap gap-2">
                      {typeInfo.compatibleTypes.map((type, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-full text-sm bg-green-500 text-white font-medium">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {typeInfo.challengingTypes && typeInfo.challengingTypes.length > 0 && (
                  <div className="p-6 rounded-lg bg-red-500/10 border border-red-500/20 text-left">
                    <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-4">Challenging Combinations</h3>
                    <div className="flex flex-wrap gap-2">
                      {typeInfo.challengingTypes.map((type, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-full text-sm bg-red-500/80 text-white font-medium">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Dimension Details */}
            <div className="space-y-4 mb-8 text-left">
              <h3 className="text-xl font-bold text-foreground mb-5">
                Detailed Dimension Descriptions
              </h3>
              {(["EI", "SN", "TF", "JP"] as Dimension[]).map((dim) => {
                const score = result.dimensionScores[dim];
                const info = dimensionInfo[dim];
                const dominant = score.dominant === "A" ? info.poleA : info.poleB;

                return (
                  <div key={dim} className="p-5 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-lg text-primary">{dominant.code}</span>
                      <span className="text-base font-semibold text-foreground">{dominant.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{dominant.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button onClick={handleReset} variant="outline" size="lg" className="gap-2 min-w-[160px]">
                <RotateCcw className="w-5 h-5" />
                <span className="font-semibold">Retake Test</span>
              </Button>
              <Button
                onClick={handleShare}
                size="lg"
                className="gap-2 min-w-[160px]"
              >
                <Share2 className="w-5 h-5" />
                <span className="font-semibold">Share Results</span>
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
        title="16 Personalities Test - Find Your Type"
        description="Discover your personality type among 16 types. Analyze 4 dimensions: energy, information, decisions, and lifestyle. For entertainment purposes only."
        path="/test/16-personality-test/"
        jsonLd={breadcrumbSchema}
      />
      <Header />

      <main className="container mx-auto px-4 py-8">
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
                    "w-full p-4 text-left text-base rounded-xl border-2 transition-all duration-200",
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
                    "w-full p-4 text-left text-base rounded-xl border-2 transition-all duration-200",
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
      </main>
    </div>
  );
};

export default SixteenPersonalityTest;
