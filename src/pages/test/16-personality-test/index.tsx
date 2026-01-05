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
} from "@/data/personalityTypeQuestions";
import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle2, RotateCcw, Share2, Layers } from "lucide-react";
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
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tests
          </Link>

          <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Layers className="w-6 h-6 text-primary" />
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Your Personality Type Result
              </h2>
            </div>

            {/* Main Type Display */}
            <div className={cn("p-8 rounded-xl bg-gradient-to-br mb-6", typeBgColors[result.typeCode])}>
              <div className="text-6xl font-bold mb-3">
                <span className={typeTextColors[result.typeCode]}>{result.typeCode}</span>
              </div>
              <h3 className={cn("text-xl font-semibold mb-2", typeTextColors[result.typeCode])}>
                {typeInfo.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {typeInfo.nickname}
              </p>
              <div className={cn("inline-block px-3 py-1 rounded-full text-xs font-medium", `bg-${groupInfo.color}-500/20`, `text-${groupInfo.color}-600`)}>
                {groupInfo.name} - {groupInfo.description}
              </div>
            </div>

            {/* Description */}
            <div className="p-4 rounded-lg bg-muted/50 mb-6 text-left">
              <p className="text-foreground">{typeInfo.description}</p>
            </div>

            {/* Detailed Description */}
            {typeInfo.detailedDescription && (
              <div className="p-5 rounded-lg bg-muted/50 mb-6 text-left">
                <h4 className="font-semibold text-foreground mb-3 text-lg">{result.typeCode} Type In-Depth Analysis</h4>
                <p className="text-foreground leading-relaxed">{typeInfo.detailedDescription}</p>
              </div>
            )}

            {/* Scientific Background */}
            {typeInfo.scientificBackground && (
              <div className="p-5 rounded-lg bg-blue-500/10 mb-6 text-left">
                <h4 className="font-semibold text-blue-600 mb-3 text-lg">Scientific Background</h4>
                <p className="text-foreground leading-relaxed">{typeInfo.scientificBackground}</p>
              </div>
            )}

            {/* Cognitive Functions */}
            {typeInfo.cognitiveFunctions && (
              <div className="p-5 rounded-lg bg-purple-500/10 mb-6 text-left">
                <h4 className="font-semibold text-purple-600 mb-3 text-lg">Cognitive Function Stack</h4>
                <div className="grid md:grid-cols-2 gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-background/50">
                    <span className="text-xs text-muted-foreground">Dominant Function</span>
                    <p className="font-medium text-foreground">{typeInfo.cognitiveFunctions.dominant}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50">
                    <span className="text-xs text-muted-foreground">Auxiliary Function</span>
                    <p className="font-medium text-foreground">{typeInfo.cognitiveFunctions.auxiliary}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50">
                    <span className="text-xs text-muted-foreground">Tertiary Function</span>
                    <p className="font-medium text-foreground">{typeInfo.cognitiveFunctions.tertiary}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50">
                    <span className="text-xs text-muted-foreground">Inferior Function</span>
                    <p className="font-medium text-foreground">{typeInfo.cognitiveFunctions.inferior}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{typeInfo.cognitiveFunctions.description}</p>
              </div>
            )}

            {/* Dimension Bars */}
            <div className="space-y-4 mb-8">
              <h3 className="text-sm font-medium text-foreground text-left mb-4">
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
            <div className="p-4 rounded-lg bg-muted/50 mb-6 text-left">
              <h4 className="text-sm font-semibold mb-3 text-foreground">Key Characteristics</h4>
              <ul className="space-y-1.5">
                {typeInfo.characteristics.map((char, idx) => (
                  <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                    <span className={typeTextColors[result.typeCode]}>-</span>
                    {char}
                  </li>
                ))}
              </ul>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-green-500/10 text-left">
                <h4 className="font-semibold text-green-600 mb-3">Strengths</h4>
                <ul className="space-y-1.5">
                  {typeInfo.strengths.map((strength, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-amber-500/10 text-left">
                <h4 className="font-semibold text-amber-600 mb-3">Weaknesses</h4>
                <ul className="space-y-1.5">
                  {typeInfo.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-amber-500">-</span>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Careers */}
            <div className={cn("p-4 rounded-lg bg-gradient-to-br mb-6 text-left", typeBgColors[result.typeCode])}>
              <h4 className={cn("font-semibold mb-3", typeTextColors[result.typeCode])}>Suitable Careers</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {typeInfo.careers.map((career, idx) => (
                  <span
                    key={idx}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm",
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
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {typeInfo.relationshipStyle && (
                  <div className="p-4 rounded-lg bg-rose-500/10 text-left">
                    <h4 className="font-semibold text-rose-600 mb-3">Relationship Style</h4>
                    <p className="text-sm text-foreground leading-relaxed">{typeInfo.relationshipStyle}</p>
                  </div>
                )}
                {typeInfo.communicationStyle && (
                  <div className="p-4 rounded-lg bg-cyan-500/10 text-left">
                    <h4 className="font-semibold text-cyan-600 mb-3">Communication Style</h4>
                    <p className="text-sm text-foreground leading-relaxed">{typeInfo.communicationStyle}</p>
                  </div>
                )}
              </div>
            )}

            {/* Growth Strategies */}
            {typeInfo.growthStrategies && typeInfo.growthStrategies.length > 0 && (
              <div className="p-5 rounded-lg bg-emerald-500/10 mb-6 text-left">
                <h4 className="font-semibold text-emerald-600 mb-3">Growth Advice</h4>
                <ul className="space-y-2">
                  {typeInfo.growthStrategies.map((strategy, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">{idx + 1}.</span>
                      {strategy}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stress Response */}
            {typeInfo.stressResponse && (
              <div className="p-5 rounded-lg bg-orange-500/10 mb-6 text-left">
                <h4 className="font-semibold text-orange-600 mb-3">Stress Response</h4>
                <p className="text-sm text-foreground leading-relaxed">{typeInfo.stressResponse}</p>
              </div>
            )}

            {/* Compatible & Challenging Types */}
            {(typeInfo.compatibleTypes || typeInfo.challengingTypes) && (
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {typeInfo.compatibleTypes && typeInfo.compatibleTypes.length > 0 && (
                  <div className="p-4 rounded-lg bg-green-500/10 text-left">
                    <h4 className="font-semibold text-green-600 mb-3">Compatible Types</h4>
                    <div className="flex flex-wrap gap-2">
                      {typeInfo.compatibleTypes.map((type, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-full text-sm bg-green-500 text-white font-medium">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {typeInfo.challengingTypes && typeInfo.challengingTypes.length > 0 && (
                  <div className="p-4 rounded-lg bg-red-500/10 text-left">
                    <h4 className="font-semibold text-red-600 mb-3">Challenging Combinations</h4>
                    <div className="flex flex-wrap gap-2">
                      {typeInfo.challengingTypes.map((type, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-full text-sm bg-red-500/80 text-white font-medium">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Famous People */}
            {typeInfo.famousPeople && typeInfo.famousPeople.length > 0 && (
              <div className="p-4 rounded-lg bg-indigo-500/10 mb-6 text-left">
                <h4 className="font-semibold text-indigo-600 mb-3">Famous People of the Same Type</h4>
                <div className="flex flex-wrap gap-2">
                  {typeInfo.famousPeople.map((person, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full text-sm bg-indigo-500/20 text-indigo-700 border border-indigo-500/30">
                      {person}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Dimension Details */}
            <div className="space-y-4 mb-8 text-left">
              <h3 className="text-sm font-medium text-foreground mb-3">
                Detailed Dimension Descriptions
              </h3>
              {(["EI", "SN", "TF", "JP"] as Dimension[]).map((dim) => {
                const score = result.dimensionScores[dim];
                const info = dimensionInfo[dim];
                const dominant = score.dominant === "A" ? info.poleA : info.poleB;

                return (
                  <div key={dim} className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-primary">{dominant.code}</span>
                      <span className="text-sm font-medium text-foreground">{dominant.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{dominant.description}</p>
                  </div>
                );
              })}
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
        title="16 Personalities Test - Find Your Type"
        description="Discover your personality type among 16 types. Analyze 4 dimensions: energy, information, decisions, and lifestyle. For entertainment purposes only."
        path="/test/16-personality-test/"
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
