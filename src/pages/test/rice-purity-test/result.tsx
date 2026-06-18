import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema, createFAQSchema } from "@/components/SEOHead";
import {
  getScoreRange,
  testBackground,
  ricePurityFAQs,
  ricePurityCelebrities
} from "@/data/ricePurityQuestions";
import {
  CheckCircle2,
  RotateCcw,
  BookOpen,
  Lightbulb,
  History,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import ScoreDistributionChart from "@/components/ScoreDistributionChart";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import CelebrityComparison from "@/components/CelebrityComparison";
import RecommendedTests from "@/components/RecommendedTests";
import ShareBait from "@/components/ShareBait";
import FriendComparison from "@/components/FriendComparison";
import { getViralResult } from "@/lib/viral";
import { readStoredFriendRef } from "@/lib/friendRef";

const colorClasses: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-600", border: "border-emerald-500/20", gradient: "from-emerald-400 to-teal-500" },
  green: { bg: "bg-green-500/10", text: "text-green-600", border: "border-green-500/20", gradient: "from-green-400 to-emerald-500" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-600", border: "border-blue-500/20", gradient: "from-blue-400 to-cyan-500" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-600", border: "border-amber-500/20", gradient: "from-amber-400 to-orange-500" },
  orange: { bg: "bg-orange-500/10", text: "text-orange-600", border: "border-orange-500/20", gradient: "from-orange-400 to-red-500" },
  red: { bg: "bg-red-500/10", text: "text-red-600", border: "border-red-500/20", gradient: "from-red-400 to-pink-500" },
};

const RicePurityTestResult = () => {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAnswers = localStorage.getItem('ricePurityAnswers');
    if (savedAnswers) {
      const parsedAnswers = JSON.parse(savedAnswers);
      setCheckedItems(new Set(parsedAnswers));
      setLoading(false);
    } else {
      navigate('/test/rice-purity/');
    }
  }, [navigate]);

  const calculateScore = () => {
    return 100 - checkedItems.size;
  };

  const handleReset = () => {
    localStorage.removeItem('ricePurityAnswers');
    navigate('/test/rice-purity/');
  };

  if (loading) {
    return <div className="min-h-screen gradient-hero theme-purity flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading results...</p>
      </div>
    </div>;
  }

  const score = calculateScore();
  const scoreRange = getScoreRange(score);
  const colors = colorClasses[scoreRange.color] || colorClasses.blue;

  // VIRAL: persona + one-liner + social-comparison pill (single source: _shareConfig)
  const viral = getViralResult("rice-purity", score, 100);
  // LOOP CLOSER: did this visitor arrive from a friend's shared link?
  const friend = readStoredFriendRef();

  const resultBreadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Rice Purity Test", path: "/test/rice-purity/" },
    { name: "Results", path: "/test/rice-purity/result/" },
  ]);

  const faqSchema = createFAQSchema(
    ricePurityFAQs.map(faq => ({ question: faq.question, answer: faq.answer }))
  );

  return (
    <div className="min-h-screen gradient-hero theme-purity">
      <SEOHead
        title="Your Rice Purity Score — See What It Actually Means"
        description={`Your Rice Purity score is ${score}/100. See how you compare to others and what your number really says about you.`}
        path="/test/rice-purity/result/"
        ogImage={viral.ogImageUrl}
        jsonLd={[resultBreadcrumbSchema, faqSchema]}
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
          {/* LOOP CLOSER: comparison vs the friend who shared this */}
          {friend && (
            <FriendComparison
              friend={friend}
              yourDisplay={`${score}/100`}
              yourPersona={viral.personaTitle ?? scoreRange.title}
              ownSlug="rice-purity"
              ownValue={score}
              sameTest={friend.slug === "rice-purity"}
              className="mb-8"
            />
          )}

          {/* Result Hero Section */}
          <div className="flex justify-center mb-6">
            <div className="text-8xl">{viral.personaEmoji ?? scoreRange.emoji}</div>
          </div>
          <h2 className="text-2xl font-semibold text-muted-foreground mb-3">
            Your Rice Purity Test Results
          </h2>
          {/* (1) identity persona label */}
          <div className={cn(
            "text-5xl md:text-6xl font-extrabold mb-3 bg-gradient-to-r bg-clip-text text-transparent",
            colors.gradient
          )}>
            {viral.personaTitle ?? scoreRange.title}
          </div>
          {/* (2) big score */}
          <div className="inline-flex items-baseline gap-2 mb-4">
            <span className="text-5xl font-bold text-primary">{score}</span>
            <span className="text-2xl font-semibold text-muted-foreground">/ 100</span>
          </div>
          {/* (3) social-comparison framing — the #1 share trigger */}
          {viral.comparison && (
            <div className="mb-6 flex justify-center">
              <span className="inline-block rounded-full bg-foreground px-5 py-2 text-sm font-extrabold uppercase tracking-wide text-background shadow-md">
                {viral.comparison}
              </span>
            </div>
          )}
          <p className="text-xl leading-relaxed text-foreground max-w-3xl mx-auto mb-8 font-medium">
            {scoreRange.description}
          </p>

          {/* EMOTIONAL-PEAK share CTA — right at the reveal, above the analysis */}
          <ShareBait
            slug="rice-purity"
            testName="Rice Purity Test"
            viral={viral}
            headline={`${score}/100`}
            className="mb-12 max-w-2xl mx-auto"
          />

          {/* Score Distribution Chart */}
          <div className="mb-12">
            <ScoreDistributionChart
              userScore={score}
              maxScore={100}
              testName="Rice Purity Test"
              colorClass={colors.gradient.replace("from-", "bg-").replace(" to-", "")}
            />
          </div>

          {/* Detailed Analysis */}
          <div className={cn("text-left p-8 rounded-xl border mb-8", colors.bg, colors.border)}>
            <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
              <BookOpen className={cn("w-6 h-6", colors.text)} />
              <span className="text-foreground">What This Means</span>
            </h3>
            <p className="text-base text-foreground leading-relaxed font-normal mb-4">
              {scoreRange.detailedDescription}
            </p>
          </div>

          {/* Celebrity/Archetype Comparison */}
          <div className="mb-8">
            <CelebrityComparison
              userScore={score}
              celebrities={ricePurityCelebrities}
              maxScore={100}
              title="Your Score Compared to Others"
            />
          </div>

          {/* Interpretation */}
          <div className="text-left p-8 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-8">
            <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <span className="text-foreground">Interpretation</span>
            </h3>
            <p className="text-base text-foreground leading-relaxed font-normal">
              {scoreRange.interpretation}
            </p>
          </div>

          {/* Characteristics & Tips */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Common Characteristics */}
            <div className="p-6 rounded-xl bg-blue-500/10 border border-blue-500/20 text-left">
              <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-blue-700 dark:text-blue-400">
                <CheckCircle2 className="w-6 h-6" />
                <span>Common Characteristics</span>
              </h3>
              <ul className="space-y-3">
                {scoreRange.commonCharacteristics.map((char, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground leading-relaxed">{char}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lifestyle Tips */}
            <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20 text-left">
              <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-green-700 dark:text-green-400">
                <Lightbulb className="w-6 h-6" />
                <span>Lifestyle Tips</span>
              </h3>
              <ul className="space-y-3">
                {scoreRange.lifestyleTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground leading-relaxed">{tip}</span>
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
                  title: "Moral Alignment Test",
                  description: "Discover your ethical stance and moral compass through the classic D&D alignment system.",
                  url: "/test/moral-alignment-test",
                  icon: "⚖️",
                  reason: "Your experiences shape your moral perspective and values"
                },
                {
                  title: "BDSM Test",
                  description: "Explore your preferences and comfort levels across different relationship dynamics.",
                  url: "/test/bdsm-test",
                  icon: "🔗",
                  reason: "Understanding your boundaries and preferences in intimate contexts"
                },
                {
                  title: "Attachment Style Test",
                  description: "Understand your emotional patterns and how you form connections in relationships.",
                  url: "/test/attachment-style-test",
                  icon: "❤️",
                  reason: "Your relationship experiences influence your attachment patterns"
                }
              ]}
              subtitle="Based on your life experiences, these tests provide deeper insights"
            />
          </div>

          {/* FAQ Section */}
          <div className="mb-8">
            <CollapsibleFAQ faqs={ricePurityFAQs} />
          </div>

          {/* Test Background Information */}
          <div className="text-left p-6 rounded-xl bg-muted/30 border border-border mb-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <History className="w-6 h-6 text-primary" />
              <span className="text-foreground">About This Test</span>
            </h3>

            <div className="space-y-5">
              <div>
                <h4 className="font-bold text-base mb-2 text-foreground">History</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{testBackground.history}</p>
              </div>

              <div>
                <h4 className="font-bold text-base mb-2 text-foreground">Purpose</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{testBackground.purpose}</p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-lg">
                <h4 className="font-bold text-base mb-2 flex items-center gap-2 text-amber-700 dark:text-amber-400">
                  <AlertCircle className="w-5 h-5" />
                  <span>Important Note</span>
                </h4>
                <p className="text-sm text-foreground leading-relaxed">{testBackground.disclaimer}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons — ShareBait at the reveal is the single canonical
              share path; legacy ShareResultCard + bottom Share button removed so
              every friend receives the SAME OG card / text / URL. */}
          <div className="flex justify-center pt-4">
            <Button onClick={handleReset} variant="outline" size="lg" className="gap-2 min-w-[160px]">
              <RotateCcw className="w-5 h-5" />
              <span className="font-semibold">Retake Test</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RicePurityTestResult;
