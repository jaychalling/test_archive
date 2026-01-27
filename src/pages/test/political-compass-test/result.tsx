import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  AnswerValue,
  politicalCompassQuestions,
  getQuadrant,
  quadrantDescriptions,
  testBackground,
  politicalCompassFAQs,
  politicalCompassCelebrities,
} from "@/data/politicalCompassQuestions";
import { CheckCircle2, RotateCcw, Share2, Compass, BookOpen, History, Users, AlertCircle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import ScoreDistributionChart from "@/components/ScoreDistributionChart";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import CelebrityComparison from "@/components/CelebrityComparison";
import RecommendedTests from "@/components/RecommendedTests";

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

const PoliticalCompassResultPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAnswers = localStorage.getItem('politicalCompassAnswers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
      setLoading(false);
    } else {
      navigate('/test/political-compass-test/');
    }
  }, [navigate]);

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

  const handleReset = () => {
    localStorage.removeItem('politicalCompassAnswers');
    navigate('/test/political-compass-test/');
  };

  const handleShare = async () => {
    const result = calculateResult();
    const quadrant = getQuadrant(result.economic, result.social);
    const quadrantInfo = quadrantDescriptions[quadrant];
    const shareText = `My Political Compass: ${quadrantInfo.name}\nEconomic: ${result.economic > 0 ? "Right" : "Left"} (${result.economic.toFixed(1)})\nSocial: ${result.social > 0 ? "Authoritarian" : "Libertarian"} (${result.social.toFixed(1)})`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Political Compass Test Result",
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
    { name: 'Results', path: '/test/political-compass-test/result/' },
  ]);

  if (loading) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

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
        path="/test/political-compass-test/result/"
        jsonLd={breadcrumbSchema}
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
          {/* Result Hero Section */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <Compass className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-muted-foreground mb-3">
            Your Political Orientation
          </h2>
          <div className={cn("text-6xl md:text-7xl font-extrabold mb-3 bg-gradient-to-r bg-clip-text text-transparent", colors.text.replace("text-", "from-") + " to-" + colors.text.replace("text-", "").replace("-600", "-500"))}>
            {quadrantInfo.name}
          </div>
          <p className="text-lg text-muted-foreground mb-2">
            {quadrantInfo.nameEn}
          </p>
          <p className="text-xl leading-relaxed text-foreground max-w-3xl mx-auto mb-12 font-medium">{quadrantInfo.description}</p>

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

          {/* Scores with Visual Bars */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 mb-12">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold text-foreground">Your Position on the Compass</h3>
            </div>

            <div className="space-y-6">
              {/* Economic Axis */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">Economic Axis</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                      You
                    </span>
                  </div>
                  <span className="text-lg font-bold text-primary">
                    {result.economic > 0 ? "Right" : "Left"} ({result.economic.toFixed(1)})
                  </span>
                </div>
                <div className="relative w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 z-10" />
                  <div
                    className={cn("absolute h-full rounded-full transition-all duration-1000 ease-out",
                      result.economic > 0 ? "bg-blue-500/60" : "bg-red-500/60"
                    )}
                    style={{
                      left: result.economic > 0 ? '50%' : `${((result.economic + 10) / 20) * 100}%`,
                      width: `${(Math.abs(result.economic) / 10) * 50}%`
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Left (-10)</span>
                  <span>Center (0)</span>
                  <span>Right (+10)</span>
                </div>
              </div>

              {/* Social Axis */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">Social Axis</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                      You
                    </span>
                  </div>
                  <span className="text-lg font-bold text-primary">
                    {result.social > 0 ? "Authoritarian" : "Libertarian"} ({result.social.toFixed(1)})
                  </span>
                </div>
                <div className="relative w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 z-10" />
                  <div
                    className={cn("absolute h-full rounded-full transition-all duration-1000 ease-out",
                      result.social > 0 ? "bg-purple-500/60" : "bg-green-500/60"
                    )}
                    style={{
                      left: result.social > 0 ? '50%' : `${((result.social + 10) / 20) * 100}%`,
                      width: `${(Math.abs(result.social) / 10) * 50}%`
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Libertarian (-10)</span>
                  <span>Center (0)</span>
                  <span>Authoritarian (+10)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div className={cn("text-left p-8 rounded-xl mb-8", colors.bg)}>
            <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-primary" />
              <span className="text-foreground">What This Means</span>
            </h3>
            <p className="text-base text-foreground leading-relaxed font-normal">
              {quadrantInfo.detailedDescription}
            </p>
          </div>

          {/* Celebrity Comparison */}
          <div className="mb-8">
            <CelebrityComparison
              userScore={50 + (result.economic * 2.5) + (result.social * 2.5)} // Normalize to 0-100 scale
              celebrities={politicalCompassCelebrities.filter(c => c.quadrant === quadrantType)}
              maxScore={100}
              title="Political Figures in Your Quadrant"
            />
          </div>

          {/* Historical Background */}
          <div className="text-left p-8 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-8">
            <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
              <History className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <span className="text-foreground">Historical Background</span>
            </h3>
            <p className="text-base text-foreground leading-relaxed font-normal">
              {quadrantInfo.historicalBackground}
            </p>
          </div>

          {/* Key Policies & Famous Examples */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="text-left p-6 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <h3 className="text-xl font-bold mb-5 text-cyan-700 dark:text-cyan-400">Key Policies/Values</h3>
              <ul className="space-y-3">
                {quadrantInfo.keyPolicies.map((policy, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground leading-relaxed">{policy}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-left p-6 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
              <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-indigo-700 dark:text-indigo-400">
                <Users className="w-6 h-6" />
                <span>Notable Figures</span>
              </h3>
              <ul className="space-y-3">
                {quadrantInfo.famousExamples.map((example, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center mt-0.5">
                      <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <span className="text-sm text-foreground leading-relaxed">{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="text-left p-6 rounded-xl bg-green-500/10 border border-green-500/20">
              <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-green-700 dark:text-green-400">
                <TrendingUp className="w-6 h-6" />
                <span>Strengths</span>
              </h3>
              <ul className="space-y-3">
                {quadrantInfo.strengthsAndWeaknesses.strengths.map((strength, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground leading-relaxed">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-left p-6 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-orange-700 dark:text-orange-400">
                <AlertCircle className="w-6 h-6" />
                <span>Weaknesses/Criticisms</span>
              </h3>
              <ul className="space-y-3">
                {quadrantInfo.strengthsAndWeaknesses.weaknesses.map((weakness, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground leading-relaxed">{weakness}</span>
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
                  description: "Discover your ethical alignment based on the classic D&D system. See if you're lawful, chaotic, good, or evil.",
                  url: "/test/moral-alignment-test",
                  icon: "⚖️",
                  reason: "Political values often correlate with moral frameworks and ethical principles"
                },
                {
                  title: "Enneagram Test",
                  description: "Explore your personality type through the nine Enneagram types and understand your core motivations.",
                  url: "/test/enneagram-test",
                  icon: "🔮",
                  reason: "Your Enneagram type can influence your political worldview and values"
                },
                {
                  title: "Big Five Personality Test",
                  description: "Assess your personality across five major dimensions: openness, conscientiousness, extraversion, agreeableness, and neuroticism.",
                  url: "/test/big-five-test",
                  icon: "🎭",
                  reason: "Research shows personality traits strongly predict political orientation"
                }
              ]}
              subtitle="Based on your political orientation, these tests provide deeper insights into your worldview"
            />
          </div>

          {/* FAQ Section */}
          <div className="mb-8">
            <CollapsibleFAQ faqs={politicalCompassFAQs} />
          </div>

          {/* Test Background */}
          <div className="text-left p-6 rounded-xl bg-muted/30 border border-border mb-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <History className="w-6 h-6 text-primary" />
              <span className="text-foreground">About This Test</span>
            </h3>
            <div className="space-y-5">
              <div>
                <h4 className="font-semibold text-base mb-2 text-foreground">History</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{testBackground.history}</p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-lg">
                <h4 className="font-semibold text-base mb-2 flex items-center gap-2 text-amber-700 dark:text-amber-400">
                  <AlertCircle className="w-5 h-5" />
                  <span>Important Note</span>
                </h4>
                <p className="text-sm text-foreground leading-relaxed">{testBackground.disclaimer}</p>
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

export default PoliticalCompassResultPage;
