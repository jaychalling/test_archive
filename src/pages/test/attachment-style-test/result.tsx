import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema, createFAQSchema } from "@/components/SEOHead";
import {
  attachmentStyleQuestions,
  AnswerValue,
  AttachmentStyle,
  AttachmentResult,
  attachmentStyleDescriptions,
  attachmentStyleFAQs,
  attachmentStyleCelebrities,
} from "@/data/attachmentStyleQuestions";
import { CheckCircle2, RotateCcw, Share2, Heart } from "lucide-react";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import CelebrityComparison from "@/components/CelebrityComparison";
import RecommendedTests from "@/components/RecommendedTests";
import ScoreDistributionChart from "@/components/ScoreDistributionChart";
import { cn } from "@/lib/utils";

const calculateResults = (answers: Record<number, AnswerValue>): AttachmentResult => {
  let anxietySum = 0;
  let avoidanceSum = 0;
  let anxietyMaxPossible = 0;
  let avoidanceMaxPossible = 0;

  attachmentStyleQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      const normalizedAnswer = answer - 3;

      if (question.anxietyWeight !== 0) {
        anxietySum += normalizedAnswer * question.anxietyWeight;
        anxietyMaxPossible += 2 * Math.abs(question.anxietyWeight);
      }
      if (question.avoidanceWeight !== 0) {
        avoidanceSum += normalizedAnswer * question.avoidanceWeight;
        avoidanceMaxPossible += 2 * Math.abs(question.avoidanceWeight);
      }
    }
  });

  const anxietyScore = Math.round(((anxietySum + anxietyMaxPossible) / (2 * anxietyMaxPossible)) * 100);
  const avoidanceScore = Math.round(((avoidanceSum + avoidanceMaxPossible) / (2 * avoidanceMaxPossible)) * 100);

  let primaryStyle: AttachmentStyle;
  const anxietyThreshold = 50;
  const avoidanceThreshold = 50;

  if (anxietyScore < anxietyThreshold && avoidanceScore < avoidanceThreshold) {
    primaryStyle = "secure";
  } else if (anxietyScore >= anxietyThreshold && avoidanceScore < avoidanceThreshold) {
    primaryStyle = "anxious";
  } else if (anxietyScore < anxietyThreshold && avoidanceScore >= avoidanceThreshold) {
    primaryStyle = "avoidant";
  } else {
    primaryStyle = "fearfulAvoidant";
  }

  return {
    anxietyScore: Math.max(0, Math.min(100, anxietyScore)),
    avoidanceScore: Math.max(0, Math.min(100, avoidanceScore)),
    primaryStyle,
  };
};

const styleColors: Record<AttachmentStyle, string> = {
  secure: "bg-green-500",
  anxious: "bg-amber-500",
  avoidant: "bg-blue-500",
  fearfulAvoidant: "bg-purple-500",
};

const styleTextColors: Record<AttachmentStyle, string> = {
  secure: "text-green-500",
  anxious: "text-amber-500",
  avoidant: "text-blue-500",
  fearfulAvoidant: "text-purple-500",
};

const AttachmentStyleTestResult = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAnswers = localStorage.getItem('attachmentStyleAnswers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
      setLoading(false);
    } else {
      navigate('/test/attachment-style-test/');
    }
  }, [navigate]);

  const handleReset = () => {
    localStorage.removeItem('attachmentStyleAnswers');
    navigate('/test/attachment-style-test/');
  };

  const handleShare = async () => {
    const result = calculateResults(answers);
    const styleInfo = attachmentStyleDescriptions[result.primaryStyle];

    const shareText = `My Attachment Style Test Result

Type: ${styleInfo.name} (${styleInfo.nameEn})
Anxiety Level: ${result.anxietyScore}%
Avoidance Level: ${result.avoidanceScore}%

${styleInfo.description}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Attachment Style Test Result",
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

  if (loading) {
    return <div className="min-h-screen gradient-hero flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading results...</p>
      </div>
    </div>;
  }

  const result = calculateResults(answers);
  const styleInfo = attachmentStyleDescriptions[result.primaryStyle];

  const dotX = result.anxietyScore;
  const dotY = result.avoidanceScore;

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Attachment Style Test', path: '/test/attachment-style-test/' },
  ]);
  const faqSchema = createFAQSchema(attachmentStyleFAQs);

  return (
    <div className="min-h-screen gradient-hero">
      <SEOHead
        title="Your Attachment Style - Test Results"
        description="Understand your attachment style and how it affects your relationships. See your anxiety and avoidance levels."
        path="/test/attachment-style-test/"
        jsonLd={[breadcrumbSchema, faqSchema]}
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
          {/* Result Hero Section */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <Heart className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-muted-foreground mb-3">
            Your Attachment Style Results
          </h2>
          <div className={cn(
            "text-6xl md:text-7xl font-extrabold mb-3 bg-gradient-to-r bg-clip-text text-transparent",
            result.primaryStyle === "secure" && "from-emerald-400 to-teal-500",
            result.primaryStyle === "anxious" && "from-amber-400 to-orange-500",
            result.primaryStyle === "avoidant" && "from-blue-400 to-cyan-500",
            result.primaryStyle === "fearfulAvoidant" && "from-purple-400 to-pink-500"
          )}>
            {styleInfo.name}
          </div>
          <div className="text-xl text-muted-foreground mb-6">
            {styleInfo.nameEn}
          </div>
          <p className="text-xl leading-relaxed text-foreground max-w-3xl mx-auto mb-12 font-medium">
            {styleInfo.description}
          </p>

          {/* Score Bars */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="text-sm text-muted-foreground mb-2">Anxiety Level</div>
              <div className="text-2xl font-bold text-amber-500 mb-2">{result.anxietyScore}%</div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${result.anxietyScore}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {result.anxietyScore < 30 ? "Low" : result.anxietyScore < 70 ? "Medium" : "High"}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="text-sm text-muted-foreground mb-2">Avoidance Level</div>
              <div className="text-2xl font-bold text-blue-500 mb-2">{result.avoidanceScore}%</div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${result.avoidanceScore}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {result.avoidanceScore < 30 ? "Low" : result.avoidanceScore < 70 ? "Medium" : "High"}
              </div>
            </div>
          </div>

          {/* Score Distribution Chart */}
          <div className="mb-12">
            <ScoreDistributionChart
              userScore={result.anxietyScore}
              maxScore={100}
              testName="Attachment Style Test"
              colorClass={
                result.primaryStyle === "secure" ? "bg-emerald-500" :
                result.primaryStyle === "anxious" ? "bg-amber-500" :
                result.primaryStyle === "avoidant" ? "bg-blue-500" :
                "bg-purple-500"
              }
            />
          </div>

          {/* 2x2 Matrix */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-foreground mb-4">Attachment Style Matrix</h3>
            <div className="relative w-full aspect-square max-w-[300px] mx-auto">
              {/* Background quadrants */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                <div className="bg-green-500/20 rounded-tl-lg flex items-center justify-center text-xs text-muted-foreground p-2 text-center">
                  Secure
                  <br />
                  <span className="text-[10px]">(Low Anxiety, Low Avoidance)</span>
                </div>
                <div className="bg-blue-500/20 rounded-tr-lg flex items-center justify-center text-xs text-muted-foreground p-2 text-center">
                  Avoidant
                  <br />
                  <span className="text-[10px]">(Low Anxiety, High Avoidance)</span>
                </div>
                <div className="bg-amber-500/20 rounded-bl-lg flex items-center justify-center text-xs text-muted-foreground p-2 text-center">
                  Anxious
                  <br />
                  <span className="text-[10px]">(High Anxiety, Low Avoidance)</span>
                </div>
                <div className="bg-purple-500/20 rounded-br-lg flex items-center justify-center text-xs text-muted-foreground p-2 text-center">
                  Fearful-Avoidant
                  <br />
                  <span className="text-[10px]">(High Anxiety, High Avoidance)</span>
                </div>
              </div>

              {/* Axes */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

              {/* Axis labels */}
              <div className="absolute left-1/2 -top-6 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
                Low Avoidance
              </div>
              <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
                High Avoidance
              </div>
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full text-xs text-muted-foreground whitespace-nowrap">
                Low Anxiety
              </div>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full text-xs text-muted-foreground whitespace-nowrap">
                High Anxiety
              </div>

              {/* Result dot */}
              <div
                className={cn(
                  "absolute w-4 h-4 rounded-full shadow-lg border-2 border-white transform -translate-x-1/2 -translate-y-1/2 z-10",
                  styleColors[result.primaryStyle]
                )}
                style={{
                  left: `${dotX}%`,
                  top: `${dotY}%`,
                }}
              />
            </div>
          </div>

          {/* Characteristics */}
          <div className="text-left p-6 rounded-xl bg-primary/5 border border-primary/10 mb-8">
            <h3 className="text-2xl font-bold mb-5 text-foreground">
              Characteristics of {styleInfo.name}
            </h3>
            <ul className="space-y-3 mb-6">
              {styleInfo.characteristics.map((char, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className={cn("w-5 h-5 flex-shrink-0 mt-0.5", styleTextColors[result.primaryStyle])} />
                  <span className="text-base text-foreground leading-relaxed font-normal">{char}</span>
                </li>
              ))}
            </ul>

            <h4 className="text-xl font-bold text-foreground mb-3 mt-6">In Relationships</h4>
            <p className="text-base text-foreground leading-relaxed font-normal">{styleInfo.inRelationship}</p>
          </div>

          {/* Celebrity Comparison */}
          <div className="mb-8">
            <CelebrityComparison
              userScore={0}
              celebrities={attachmentStyleCelebrities.filter(c => c.attachmentStyle === result.primaryStyle).map(c => ({
                name: c.name,
                score: 85,
                description: c.description,
                avatar: c.avatar
              }))}
              maxScore={100}
              title="Characters With Similar Attachment Style"
            />
          </div>

          {/* Advice */}
          <div className={cn("text-left p-6 rounded-xl mb-8", `${styleColors[result.primaryStyle].replace('bg-', 'bg-')}/10`)}>
            <h3 className="text-2xl font-bold text-foreground mb-5">Relationship Advice</h3>
            <ul className="space-y-3">
              {styleInfo.advice.map((advice, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className={cn("w-5 h-5 mt-0.5 flex-shrink-0", styleTextColors[result.primaryStyle])} />
                  <span className="text-base text-foreground leading-relaxed font-normal">{advice}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Type Overview */}
          <div className="text-left p-6 rounded-xl bg-muted/20 border border-border mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-5">The Four Attachment Styles</h3>
            <div className="space-y-3">
              {(Object.entries(attachmentStyleDescriptions) as [AttachmentStyle, typeof attachmentStyleDescriptions.secure][]).map(([style, info]) => (
                <div
                  key={style}
                  className={cn(
                    "p-4 rounded-lg border-l-4 transition-all",
                    result.primaryStyle === style
                      ? `${styleColors[style].replace('bg-', 'border-')} bg-muted/30`
                      : "border-transparent bg-muted/10"
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={cn("w-3 h-3 rounded-full", styleColors[style])} />
                    <span className={cn("font-bold text-base", result.primaryStyle === style && styleTextColors[style])}>
                      {info.name}
                    </span>
                    <span className="text-sm text-muted-foreground">({info.nameEn})</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-5">
                    {style === "secure" && "Low Anxiety + Low Avoidance"}
                    {style === "anxious" && "High Anxiety + Low Avoidance"}
                    {style === "avoidant" && "Low Anxiety + High Avoidance"}
                    {style === "fearfulAvoidant" && "High Anxiety + High Avoidance"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Description */}
          <div className="text-left p-6 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 mb-8">
            <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-5">{styleInfo.name} - In-Depth Analysis</h3>
            <p className="text-base text-foreground leading-relaxed whitespace-pre-line font-normal">
              {styleInfo.detailedDescription}
            </p>
          </div>

          {/* Scientific Background */}
          <div className="text-left p-6 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-8">
            <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-5">Scientific Background</h3>
            <p className="text-base text-foreground leading-relaxed whitespace-pre-line font-normal">
              {styleInfo.scientificBackground}
            </p>
          </div>

          {/* Communication Tips */}
          <div className="text-left p-6 rounded-xl bg-teal-500/10 border border-teal-500/20 mb-8">
            <h3 className="text-2xl font-bold text-teal-700 dark:text-teal-400 mb-5">Communication Tips</h3>
            <ul className="space-y-3">
              {styleInfo.communicationTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold text-teal-700 dark:text-teal-400">{idx + 1}</span>
                  </span>
                  <span className="text-base text-foreground leading-relaxed font-normal">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Healing Strategies */}
          <div className="text-left p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-8">
            <h3 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-5">Healing Strategies</h3>
            <ul className="space-y-3">
              {styleInfo.healingStrategies.map((strategy, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-base text-foreground leading-relaxed font-normal">{strategy}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Compatible & Challenging Styles */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="text-left p-6 rounded-xl bg-green-500/10 border border-green-500/20">
              <h4 className="text-xl font-bold text-green-700 dark:text-green-400 mb-4">Compatible Styles</h4>
              <div className="flex flex-wrap gap-2">
                {styleInfo.compatibleStyles.map((style) => (
                  <span
                    key={style}
                    className="px-3 py-1.5 bg-green-500/20 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold"
                  >
                    {attachmentStyleDescriptions[style].name}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-left p-6 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <h4 className="text-xl font-bold text-orange-700 dark:text-orange-400 mb-4">Challenging Styles</h4>
              <div className="flex flex-wrap gap-2">
                {styleInfo.challengingStyles.map((style) => (
                  <span
                    key={style}
                    className="px-3 py-1.5 bg-orange-500/20 text-orange-700 dark:text-orange-300 rounded-full text-sm font-semibold"
                  >
                    {attachmentStyleDescriptions[style].name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Tests */}
          <div className="mb-8">
            <RecommendedTests
              tests={[
                {
                  title: "Love Language Test",
                  description: "Discover how you prefer to give and receive love in relationships, complementing your attachment style.",
                  url: "/test/love-language-test",
                  icon: "💕",
                  reason: "Understanding your love language enhances attachment-aware communication"
                },
                {
                  title: "Emotional Intelligence Test",
                  description: "Measure your ability to recognize and manage emotions in yourself and others.",
                  url: "/test/emotional-intelligence-test",
                  icon: "🧠",
                  reason: "High EQ helps develop more secure attachment patterns"
                },
                {
                  title: "Communication Style Test",
                  description: "Understand your communication patterns and how they impact your relationships.",
                  url: "/test/communication-style-test",
                  icon: "💬",
                  reason: "Effective communication is key to healing insecure attachment"
                }
              ]}
              subtitle="Based on your attachment style, these tests provide deeper relationship insights"
            />
          </div>

          {/* FAQ Section */}
          <div className="mb-8">
            <CollapsibleFAQ faqs={attachmentStyleFAQs} />
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
};

export default AttachmentStyleTestResult;
