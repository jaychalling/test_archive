import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema, createFAQSchema } from "@/components/SEOHead";
import {
  BdsmAnswerValue,
  BdsmResult,
  bdsmTraitDescriptions,
  testBackground,
  bdsmFAQs,
  bdsmCelebrities,
} from "@/data/bdsmTestQuestions";
import { CheckCircle2, RotateCcw, Share2, BookOpen, Brain, Heart, MessageCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import ScoreDistributionChart from "@/components/ScoreDistributionChart";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import CelebrityComparison from "@/components/CelebrityComparison";
import RecommendedTests from "@/components/RecommendedTests";
import { bdsmQuestions } from "@/data/bdsmTestQuestions";

const calculateResults = (answers: Record<number, BdsmAnswerValue>): BdsmResult => {
  const categories = ["dominant", "submissive", "sadism", "masochism", "switch"] as const;
  const result: BdsmResult = {
    dominant: 0,
    submissive: 0,
    sadism: 0,
    masochism: 0,
    switch: 0,
  };

  categories.forEach((category) => {
    const categoryQuestions = bdsmQuestions.filter((q) => q.category === category);
    const totalScore = categoryQuestions.reduce((sum, q) => sum + (answers[q.id] || 3), 0);
    const maxScore = categoryQuestions.length * 5;
    result[category] = Math.round((totalScore / maxScore) * 100);
  });

  return result;
};

const getMainTrait = (result: BdsmResult): string => {
  const entries = Object.entries(result) as [keyof BdsmResult, number][];
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
};

const getSecondaryTrait = (result: BdsmResult): string => {
  const entries = Object.entries(result) as [keyof BdsmResult, number][];
  entries.sort((a, b) => b[1] - a[1]);
  return entries[1][0];
};

const BdsmTestResult = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, BdsmAnswerValue>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAnswers = localStorage.getItem('bdsmTestAnswers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
      setLoading(false);
    } else {
      navigate('/test/bdsm-test/');
    }
  }, [navigate]);

  const handleReset = () => {
    localStorage.removeItem('bdsmTestAnswers');
    navigate('/test/bdsm-test/');
  };

  const handleShare = async () => {
    const result = calculateResults(answers);
    const mainTrait = getMainTrait(result);
    const mainTraitName = bdsmTraitDescriptions[mainTrait].name;

    const shareText = `My BDSM Test Result: ${mainTraitName}\n\nDominant: ${result.dominant}%\nSubmissive: ${result.submissive}%\nSadism: ${result.sadism}%\nMasochism: ${result.masochism}%\nSwitch: ${result.switch}%`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "BDSM Test Result",
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
    { name: 'BDSM Test', path: '/test/bdsm-test/' },
  ]);
  const faqSchema = createFAQSchema(bdsmFAQs);

  if (loading) {
    return <div>Loading...</div>;
  }

  const result = calculateResults(answers);
  const mainTrait = getMainTrait(result);
  const secondaryTrait = getSecondaryTrait(result);
  const mainTraitInfo = bdsmTraitDescriptions[mainTrait];
  const secondaryTraitInfo = bdsmTraitDescriptions[secondaryTrait];

  const traitColors: Record<string, string> = {
    dominant: "bg-red-500",
    submissive: "bg-blue-500",
    sadism: "bg-orange-500",
    masochism: "bg-purple-500",
    switch: "bg-green-500",
  };

  const traitTextColors: Record<string, string> = {
    dominant: "text-red-600",
    submissive: "text-blue-600",
    sadism: "text-orange-600",
    masochism: "text-purple-600",
    switch: "text-green-600",
  };

  const traitBgColors: Record<string, string> = {
    dominant: "bg-red-500/10",
    submissive: "bg-blue-500/10",
    sadism: "bg-orange-500/10",
    masochism: "bg-purple-500/10",
    switch: "bg-green-500/10",
  };

  return (
    <div className="min-h-screen gradient-hero">
      <SEOHead
        title="Your BDSM Profile - BDSM Test Results"
        description="See your BDSM test results and what they mean. Understand your preferences in relationship dynamics."
        path="/test/bdsm-test/result/"
        jsonLd={[breadcrumbSchema, faqSchema]}
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-muted-foreground mb-3">
            Your BDSM Profile Results
          </h2>
          <div className={cn("text-6xl md:text-7xl font-extrabold mb-3 bg-gradient-to-r bg-clip-text text-transparent",
            mainTrait === "dominant" ? "from-red-400 to-red-600" :
            mainTrait === "submissive" ? "from-blue-400 to-blue-600" :
            mainTrait === "sadism" ? "from-orange-400 to-orange-600" :
            mainTrait === "masochism" ? "from-purple-400 to-purple-600" :
            "from-green-400 to-green-600"
          )}>
            {mainTraitInfo.name}
          </div>
          <p className="text-lg text-muted-foreground mb-2">
            {mainTraitInfo.nameEn}
          </p>
          <p className="text-xl leading-relaxed text-foreground max-w-3xl mx-auto mb-12 font-medium">
            {mainTraitInfo.description}
          </p>

          {/* Secondary Trait */}
          <div className="p-4 rounded-lg bg-muted/30 mb-6">
            <div className="text-sm text-muted-foreground mb-1">Secondary Trait</div>
            <div className="font-semibold text-foreground">{secondaryTraitInfo.name}</div>
            <p className="text-xs text-muted-foreground mt-1">{secondaryTraitInfo.description}</p>
          </div>

          {/* Score Bars */}
          <div className="space-y-4 mb-8">
            {(Object.entries(result) as [keyof BdsmResult, number][])
              .sort((a, b) => b[1] - a[1])
              .map(([trait, score]) => (
                <div key={trait} className="text-left">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-foreground">
                      {bdsmTraitDescriptions[trait].name}
                    </span>
                    <span className="text-sm text-muted-foreground">{score}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-500", traitColors[trait])}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>

          {/* Score Distribution Chart */}
          <div className="mb-8">
            <ScoreDistributionChart
              userScore={result[mainTrait]}
              maxScore={100}
              testName="BDSM Test"
              colorClass={traitColors[mainTrait]}
            />
          </div>

          {/* Detailed Description */}
          <div className={cn("text-left p-8 rounded-xl mb-8", traitBgColors[mainTrait])}>
            <h3 className={cn("text-2xl font-bold mb-5 flex items-center gap-3", traitTextColors[mainTrait])}>
              <BookOpen className="w-6 h-6" />
              <span>What This Means</span>
            </h3>
            <p className="text-base text-foreground leading-relaxed font-normal">
              {mainTraitInfo.detailedDescription}
            </p>
          </div>

          {/* Psychological Background */}
          <div className="text-left p-8 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-8">
            <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
              <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <span className="text-foreground">Psychological Background</span>
            </h3>
            <p className="text-base text-foreground leading-relaxed font-normal">
              {mainTraitInfo.psychologicalBackground}
            </p>
          </div>

          {/* Characteristics */}
          <div className="text-left p-6 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-8">
            <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-cyan-700 dark:text-cyan-400">
              <CheckCircle2 className="w-6 h-6" />
              <span>Key Characteristics</span>
            </h3>
            <ul className="grid md:grid-cols-2 gap-3">
              {mainTraitInfo.characteristics.map((char, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground leading-relaxed">{char}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Healthy Practices & Communication Tips */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="text-left p-6 rounded-xl bg-green-500/10 border border-green-500/20">
              <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-green-700 dark:text-green-400">
                <Heart className="w-6 h-6" />
                <span>Healthy Practices</span>
              </h3>
              <ul className="space-y-3">
                {mainTraitInfo.healthyPractices.map((practice, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground leading-relaxed">{practice}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-left p-6 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
              <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-indigo-700 dark:text-indigo-400">
                <MessageCircle className="w-6 h-6" />
                <span>Communication Tips</span>
              </h3>
              <ul className="space-y-3">
                {mainTraitInfo.communicationTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Celebrity Comparison */}
          <div className="mb-8">
            <CelebrityComparison
              userScore={result[mainTrait]}
              celebrities={bdsmCelebrities}
              maxScore={100}
              title="Your Profile is Similar To..."
            />
          </div>

          {/* Recommended Tests */}
          <div className="mb-8">
            <RecommendedTests
              tests={[
                {
                  title: "Attachment Style Test",
                  description: "Discover your attachment patterns in relationships and how they affect your emotional bonds.",
                  url: "/test/attachment-style-test",
                  icon: "❤️",
                  reason: "BDSM preferences often correlate with attachment styles in relationships"
                },
                {
                  title: "Communication Style Test",
                  description: "Understand how you express yourself and communicate with others in different situations.",
                  url: "/test/communication-style-test",
                  icon: "💬",
                  reason: "Effective communication is essential for healthy BDSM dynamics"
                },
                {
                  title: "Moral Alignment Test",
                  description: "Explore your ethical and moral framework based on the D&D alignment system.",
                  url: "/test/moral-alignment-test",
                  icon: "⚖️",
                  reason: "Understanding your moral compass helps navigate consent and boundaries"
                }
              ]}
              subtitle="Based on your BDSM profile, these tests provide deeper insights into your relationship dynamics"
            />
          </div>

          {/* FAQ Section */}
          <div className="mb-8">
            <CollapsibleFAQ faqs={bdsmFAQs} title="Frequently Asked Questions" />
          </div>

          {/* Test Background */}
          <div className="text-left p-6 rounded-xl bg-muted/30 border border-border mb-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-primary" />
              <span className="text-foreground">About This Test</span>
            </h3>
            <div className="space-y-5">
              <div>
                <h4 className="font-bold text-base mb-2 text-foreground">Introduction</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {testBackground.about}
                </p>
              </div>
              <div>
                <h4 className="font-bold text-base mb-2 text-foreground">Consent and Safety</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {testBackground.consent}
                </p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-lg">
                <h4 className="font-bold text-base mb-2 flex items-center gap-2 text-amber-700 dark:text-amber-400">
                  <AlertCircle className="w-5 h-5" />
                  <span>Important Note</span>
                </h4>
                <p className="text-sm text-foreground leading-relaxed">
                  {testBackground.disclaimer}
                </p>
                <p className="text-sm text-foreground leading-relaxed mt-2">
                  For entertainment purposes only. Not a therapeutic or diagnostic assessment.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button onClick={handleReset} variant="outline" size="lg" className="gap-2 min-w-[160px]">
              <RotateCcw className="w-5 h-5" />
              <span className="font-semibold">Retake Test</span>
            </Button>
            <Button onClick={handleShare} size="lg" className="gap-2 min-w-[160px]">
              <Share2 className="w-5 h-5" />
              <span className="font-semibold">Share Results</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BdsmTestResult;
