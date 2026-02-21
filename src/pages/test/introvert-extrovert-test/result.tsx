import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema, createFAQSchema } from "@/components/SEOHead";
import {
  introvertExtrovertQuestions,
  AnswerValue,
  IntrovertExtrovertResult,
  PersonalityType,
  PersonalityDimension,
  getPersonalityType,
  dimensionDescriptions,
  personalityTypeDescriptions,
  dimensionOrder,
  typeColors,
  typeTextColors,
  typeBgColors,
  introvertExtrovertFAQs,
  introvertExtrovertCelebrities,
} from "@/data/introvertExtrovertQuestions";
import { CheckCircle2, RotateCcw, Share2, Users2, Zap, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import ScoreDistributionChart from "@/components/ScoreDistributionChart";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import CelebrityComparison from "@/components/CelebrityComparison";
import RecommendedTests from "@/components/RecommendedTests";

const calculateResults = (answers: Record<number, AnswerValue>): IntrovertExtrovertResult => {
  const dimensionScores: Record<PersonalityDimension, { sum: number; count: number }> = {
    energyRecharge: { sum: 0, count: 0 },
    socialPreference: { sum: 0, count: 0 },
    stimulationSeeking: { sum: 0, count: 0 },
    focusDirection: { sum: 0, count: 0 },
    communicationStyle: { sum: 0, count: 0 },
  };

  introvertExtrovertQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      // reversed 문항은 점수를 반전 (내향적 문항이므로)
      const score = question.reversed ? 6 - answer : answer;
      dimensionScores[question.dimension].sum += score;
      dimensionScores[question.dimension].count++;
    }
  });

  // 각 차원별 점수 계산 (0-100)
  const calculatePercentage = (sum: number, count: number): number => {
    if (count === 0) return 50;
    const maxPossible = count * 5;
    const minPossible = count * 1;
    return Math.round(((sum - minPossible) / (maxPossible - minPossible)) * 100);
  };

  const dimensionScoresResult: Record<PersonalityDimension, number> = {
    energyRecharge: calculatePercentage(dimensionScores.energyRecharge.sum, dimensionScores.energyRecharge.count),
    socialPreference: calculatePercentage(dimensionScores.socialPreference.sum, dimensionScores.socialPreference.count),
    stimulationSeeking: calculatePercentage(dimensionScores.stimulationSeeking.sum, dimensionScores.stimulationSeeking.count),
    focusDirection: calculatePercentage(dimensionScores.focusDirection.sum, dimensionScores.focusDirection.count),
    communicationStyle: calculatePercentage(dimensionScores.communicationStyle.sum, dimensionScores.communicationStyle.count),
  };

  // 전체 외향성 점수 (모든 차원의 평균)
  const totalScore = Math.round(
    (dimensionScoresResult.energyRecharge +
      dimensionScoresResult.socialPreference +
      dimensionScoresResult.stimulationSeeking +
      dimensionScoresResult.focusDirection +
      dimensionScoresResult.communicationStyle) / 5
  );

  return {
    extroversionScore: totalScore,
    personalityType: getPersonalityType(totalScore),
    dimensionScores: dimensionScoresResult,
  };
};

const IntrovertExtrovertTestResult = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAnswers = localStorage.getItem('introvertExtrovertAnswers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
      setLoading(false);
    } else {
      navigate('/test/introvert-extrovert-test/');
    }
  }, [navigate]);

  const handleReset = () => {
    localStorage.removeItem('introvertExtrovertAnswers');
    navigate('/test/introvert-extrovert-test/');
  };

  const handleShare = async () => {
    const result = calculateResults(answers);
    const typeInfo = personalityTypeDescriptions[result.personalityType];

    const shareText = `My Introvert/Extrovert Test Results

Type: ${typeInfo.nameEn}
Extroversion Score: ${result.extroversionScore}%

${typeInfo.description}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Introvert/Extrovert Test Results",
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
    { name: 'Introvert/Extrovert Test', path: '/test/introvert-extrovert-test/' },
  ]);
  const faqSchema = createFAQSchema(introvertExtrovertFAQs);

  if (loading) {
    return <div>Loading...</div>;
  }

  const result = calculateResults(answers);
  const typeInfo = personalityTypeDescriptions[result.personalityType];

  // Spectrum position calculation
  const spectrumPosition = result.extroversionScore;

  // 모든 유형 순서대로
  const allTypes: PersonalityType[] = [
    "strongIntrovert",
    "introvert",
    "ambivert",
    "extrovert",
    "strongExtrovert",
  ];

  return (
    <div className="min-h-screen gradient-hero">
      <SEOHead
        title="Your Introvert/Extrovert Profile"
        description="See where you fall on the introvert-extrovert spectrum. Understand your energy recharge style and social preferences."
        path="/test/introvert-extrovert-test/result/"
        jsonLd={[breadcrumbSchema, faqSchema]}
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
          {/* Hero Section - Improved Typography */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Users2 className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-semibold text-muted-foreground">
              Your Personality Type
            </h2>
          </div>

          {/* Primary Type */}
          <div className={cn("p-8 rounded-xl bg-gradient-to-br mb-6", typeBgColors[result.personalityType])}>
            <div className="text-sm text-muted-foreground mb-2">Your Type</div>
            <div className={cn("text-5xl md:text-6xl font-extrabold mb-3", typeTextColors[result.personalityType])}>
              {typeInfo.name}
            </div>
            <div className="text-base text-muted-foreground mb-4">
              {typeInfo.nameEn}
            </div>
            <p className="text-lg leading-relaxed text-foreground max-w-3xl mx-auto font-medium">
              {typeInfo.description}
            </p>
          </div>

          {/* Extroversion Score */}
          <div className="p-6 rounded-lg bg-muted/30 mb-8">
            <div className="text-sm text-muted-foreground mb-3">Extroversion Score</div>
            <div className="inline-flex items-baseline gap-2 mb-3">
              <span className={cn("text-5xl font-bold", typeTextColors[result.personalityType])}>
                {result.extroversionScore}
              </span>
              <span className="text-2xl font-semibold text-muted-foreground">%</span>
            </div>
            <div className="text-sm text-muted-foreground">
              0% = Full Introvert / 100% = Full Extrovert
            </div>
          </div>

          {/* Score Distribution Chart */}
          <div className="mb-8">
            <ScoreDistributionChart
              userScore={result.extroversionScore}
              maxScore={100}
              testName="Introvert-Extrovert Test"
              colorClass={typeColors[result.personalityType].replace("bg-", "bg-")}
            />
          </div>

          {/* Spectrum Bar */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-foreground mb-4">Introvert-Extrovert Spectrum</h3>
            <div className="relative">
              {/* Spectrum background */}
              <div className="h-8 rounded-full overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-orange-500">
                {/* Type zones */}
                <div className="absolute inset-0 flex">
                  <div className="w-[25%] border-r border-white/20" />
                  <div className="w-[15%] border-r border-white/20" />
                  <div className="w-[20%] border-r border-white/20" />
                  <div className="w-[15%] border-r border-white/20" />
                  <div className="w-[25%]" />
                </div>
              </div>

              {/* Position indicator */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-foreground shadow-lg z-10"
                style={{ left: `${spectrumPosition}%` }}
              />

              {/* Labels */}
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Introvert</span>
                <span>Ambivert</span>
                <span>Extrovert</span>
              </div>
            </div>
          </div>

          {/* Dimension Scores */}
          <div className="space-y-3 mb-8">
            <h3 className="text-xl font-bold text-foreground text-left mb-5">
              Dimension Scores
            </h3>
            {dimensionOrder.map((dimension) => {
              const score = result.dimensionScores[dimension];
              const info = dimensionDescriptions[dimension];

              return (
                <div key={dimension} className="text-left">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-foreground">
                      {info.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {score}%
                    </span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-indigo-500 to-orange-500"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {info.description}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Characteristics */}
          <div className="text-left p-6 rounded-lg bg-muted/20 mb-8">
            <h3 className="text-xl font-bold text-foreground mb-5">
              Characteristics of {typeInfo.name}
            </h3>
            <ul className="space-y-2">
              {typeInfo.characteristics.map((char, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className={typeTextColors[result.personalityType]}>-</span>
                  {char}
                </li>
              ))}
            </ul>
          </div>

          {/* Energy Tips */}
          <div className={cn("text-left p-6 rounded-lg mb-8", `${typeColors[result.personalityType].replace('bg-', 'bg-')}/10`)}>
            <div className="flex items-center gap-3 mb-5">
              <Zap className={cn("w-6 h-6", typeTextColors[result.personalityType])} />
              <h3 className="text-xl font-bold text-foreground">Energy Management Tips</h3>
            </div>
            <ul className="space-y-2">
              {typeInfo.energyTips.map((tip, idx) => (
                <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                  <CheckCircle2 className={cn("w-4 h-4 mt-0.5 flex-shrink-0", typeTextColors[result.personalityType])} />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Strengths & Watch Points */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="p-6 rounded-lg bg-green-500/10 text-left">
              <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-5">Strengths</h3>
              <ul className="space-y-2">
                {typeInfo.strengths.map((strength, idx) => (
                  <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-lg bg-amber-500/10 text-left">
              <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-5">Watch Points</h3>
              <ul className="space-y-2">
                {typeInfo.watchPoints.map((point, idx) => (
                  <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Detailed Description */}
          <div className={cn("text-left p-8 rounded-xl mb-8", `${typeColors[result.personalityType].replace('bg-', 'bg-')}/10`)}>
            <h3 className={cn("text-2xl font-bold mb-5", typeTextColors[result.personalityType])}>
              {typeInfo.name} Detailed Analysis
            </h3>
            <p className="text-base text-foreground leading-relaxed whitespace-pre-line">
              {typeInfo.detailedDescription}
            </p>
          </div>

          {/* Celebrity Comparison */}
          <div className="mb-8">
            <CelebrityComparison
              userScore={result.extroversionScore}
              celebrities={introvertExtrovertCelebrities}
              maxScore={100}
            />
          </div>

          {/* Scientific Background */}
          <div className="text-left p-8 rounded-xl bg-blue-500/10 mb-8">
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-5">Scientific Background</h3>
            <p className="text-base text-foreground leading-relaxed whitespace-pre-line">
              {typeInfo.scientificBackground}
            </p>
          </div>

          {/* Career Suggestions & Social Tips */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="p-6 rounded-xl bg-purple-500/10 text-left">
              <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-5">Recommended Careers/Fields</h3>
              <ul className="space-y-2">
                {typeInfo.careerSuggestions.map((career, idx) => (
                  <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                    <span className="text-purple-500 font-bold">•</span>
                    {career}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-cyan-500/10 text-left">
              <h3 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mb-5">Social Interaction Tips</h3>
              <ul className="space-y-2">
                {typeInfo.socialTips.map((tip, idx) => (
                  <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-cyan-500 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Tests */}
          <div className="mb-8">
            <RecommendedTests
              tests={[
                {
                  title: "Big Five Personality Test",
                  description: "Explore your personality across five major dimensions including openness, conscientiousness, extraversion, agreeableness, and neuroticism.",
                  url: "/test/big-five-test",
                  icon: "🎭",
                  reason: "Provides deeper insights into your extraversion and other personality traits"
                },
                {
                  title: "Enneagram Test",
                  description: "Discover your core personality type among 9 distinct patterns and understand your motivations and fears.",
                  url: "/test/enneagram-test",
                  icon: "⭕",
                  reason: "Complements introvert-extrovert understanding with core motivations"
                },
                {
                  title: "Communication Style Test",
                  description: "Understand how you express yourself and interact with others in different situations.",
                  url: "/test/communication-style-test",
                  icon: "💬",
                  reason: "Learn how your introversion-extroversion affects your communication patterns"
                }
              ]}
              subtitle="Based on your introvert-extrovert profile, these tests provide complementary insights"
            />
          </div>

          {/* FAQ Section */}
          <div className="mb-8">
            <CollapsibleFAQ faqs={introvertExtrovertFAQs} />
          </div>

          {/* Type Overview */}
          <div className="text-left p-6 rounded-lg bg-muted/10 mb-8">
            <h3 className="text-xl font-bold text-foreground mb-5">5 Personality Types</h3>
            <div className="space-y-2">
              {allTypes.map((type) => {
                const info = personalityTypeDescriptions[type];
                const ranges: Record<PersonalityType, string> = {
                  strongIntrovert: "0-25%",
                  introvert: "26-40%",
                  ambivert: "41-60%",
                  extrovert: "61-75%",
                  strongExtrovert: "76-100%",
                };

                return (
                  <div
                    key={type}
                    className={cn(
                      "p-3 rounded-lg border-l-4 transition-all",
                      result.personalityType === type
                        ? `${typeColors[type].replace('bg-', 'border-')} bg-muted/30`
                        : "border-transparent bg-muted/10"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={cn("w-2 h-2 rounded-full", typeColors[type])} />
                      <span className={cn("font-medium text-sm", result.personalityType === type && typeTextColors[type])}>
                        {info.name}
                      </span>
                      <span className="text-xs text-muted-foreground">({info.nameEn})</span>
                      <span className="text-xs text-muted-foreground ml-auto">{ranges[type]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button onClick={handleReset} variant="outline" size="lg" className="gap-2 min-w-[160px]">
              <RotateCcw className="w-5 h-5" />
              <span className="font-semibold">Retake Test</span>
            </Button>
            <Button
              onClick={handleShare}
              size="lg"
              className="gap-2 min-w-[160px] gradient-primary border-0"
            >
              <Share2 className="w-5 h-5" />
              <span className="font-semibold">Share Results</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IntrovertExtrovertTestResult;
