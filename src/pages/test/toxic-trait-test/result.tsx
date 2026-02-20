import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema, createFAQSchema } from "@/components/SEOHead";
import {
  AnswerValue,
  calculateResults,
  toxicTraitDescriptions,
  traitOrder,
  getScoreLevel,
  scoreLevelLabels,
  getToxicTraitProfile,
  toxicTraitFAQs,
  toxicTraitCelebrities,
} from "@/data/toxicTraitQuestions";
import ScoreDistributionChart from "@/components/ScoreDistributionChart";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import CelebrityComparison from "@/components/CelebrityComparison";
import RecommendedTests from "@/components/RecommendedTests";
import { CheckCircle2, RotateCcw, Share2, AlertCircle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const ToxicTraitTestResult = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAnswers = localStorage.getItem('toxicTraitAnswers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
      setLoading(false);
    } else {
      navigate('/test/toxic-trait-test/');
    }
  }, [navigate]);

  const handleReset = () => {
    localStorage.removeItem('toxicTraitAnswers');
    navigate('/test/toxic-trait-test/');
  };

  const handleShare = async () => {
    const result = calculateResults(answers);
    const profile = getToxicTraitProfile(result);
    const primaryInfo = toxicTraitDescriptions[profile.primaryTrait];

    const shareText = `My Toxic Trait Test Results

${primaryInfo.emoji} Primary Toxic Trait: ${primaryInfo.name}
Overall Score: ${profile.overallScore}%

My Trait Breakdown:
${profile.sortedTraits.map(t => `${toxicTraitDescriptions[t.trait].emoji} ${toxicTraitDescriptions[t.trait].name}: ${t.score}%`).join('\n')}

Take the test: ${window.location.origin}/test/toxic-trait-test/`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Toxic Trait Test Results",
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      alert("Result copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Analyzing your traits...</p>
        </div>
      </div>
    );
  }

  const result = calculateResults(answers);
  const profile = getToxicTraitProfile(result);
  const primaryInfo = toxicTraitDescriptions[profile.primaryTrait];

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Toxic Trait Test', path: '/test/toxic-trait-test/' },
    { name: 'Results', path: '/test/toxic-trait-test/result/' },
  ]);
  const faqSchema = createFAQSchema(toxicTraitFAQs);

  return (
    <div className="min-h-screen gradient-hero">
      <SEOHead
        title={`Your Toxic Trait: ${primaryInfo.name} - Results`}
        description={`Your primary toxic trait is ${primaryInfo.name}. Discover what this means and how to grow from it.`}
        path="/test/toxic-trait-test/result/"
        jsonLd={[breadcrumbSchema, faqSchema]}
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="test-card text-center animate-scale-in">
            <div className="flex justify-center mb-6">
              <div className={cn("w-24 h-24 rounded-full bg-gradient-to-br flex items-center justify-center text-5xl", primaryInfo.bgColor)}>
                {primaryInfo.emoji}
              </div>
            </div>
            <h2 className="text-xl font-semibold text-muted-foreground mb-2">
              Your Primary Toxic Trait
            </h2>
            <div className={cn("text-4xl md:text-5xl font-extrabold mb-2", primaryInfo.textColor)}>
              {primaryInfo.name}
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              Overall Toxicity Score: <span className="font-bold text-foreground">{profile.overallScore}%</span>
            </p>

            {/* Summary */}
            <div className={cn("p-6 rounded-xl bg-gradient-to-br mb-8 text-left", primaryInfo.bgColor)}>
              <p className="text-lg text-foreground font-medium mb-4">{profile.summary}</p>
              <p className="text-base text-muted-foreground leading-relaxed">{profile.interpretation}</p>
            </div>

            {/* Trait Ranking */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Your Toxic Trait Ranking</h3>
              <div className="space-y-3">
                {profile.sortedTraits.map((item, index) => {
                  const info = toxicTraitDescriptions[item.trait];
                  const level = getScoreLevel(item.score);
                  return (
                    <div key={item.trait} className="text-left">
                      <div className="flex justify-between items-center mb-1">
                        <span className={cn("text-sm font-medium flex items-center gap-2", info.textColor)}>
                          <span className="text-lg">{info.emoji}</span>
                          <span>#{index + 1} {info.name}</span>
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {item.score}% ({scoreLevelLabels[level]})
                        </span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full transition-all duration-500", info.color)} style={{ width: `${item.score}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Score Distribution */}
            <ScoreDistributionChart
              userScore={profile.overallScore}
              maxScore={100}
              testName="Toxic Trait Score"
              colorClass={`bg-gradient-to-r ${primaryInfo.bgColor.replace('from-', 'from-').replace('/10', '')}`}
            />
          </div>

          {/* Celebrity Comparison */}
          <div className="test-card">
            <CelebrityComparison
              userScore={profile.overallScore}
              celebrities={toxicTraitCelebrities}
              maxScore={100}
              title="Where You Fall on the Spectrum"
            />
          </div>

          {/* Primary Trait Deep Dive */}
          <div className="test-card">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <span className="text-3xl">{primaryInfo.emoji}</span>
              Understanding Your {primaryInfo.name}
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">What It Looks Like</h4>
                <p className="text-muted-foreground">{primaryInfo.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Why It Happens</h4>
                <p className="text-muted-foreground">{primaryInfo.whyItHappens}</p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">How It Can Hurt</h4>
                <ul className="space-y-2">
                  {primaryInfo.howItHurts.map((item, idx) => (
                    <li key={idx} className="text-muted-foreground flex items-start gap-2">
                      <span className="text-rose-500">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-green-500/10">
                <h4 className="font-semibold text-green-600 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  The Healthy Alternative
                </h4>
                <p className="text-muted-foreground">{primaryInfo.healthyAlternative}</p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Common Triggers</h4>
                <div className="flex flex-wrap gap-2">
                  {primaryInfo.commonTriggers.map((trigger, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground">
                      {trigger}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Growth Strategies */}
          <div className="test-card">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <TrendingUp className="w-7 h-7 text-green-500" />
              Your Growth Path
            </h3>

            <div className="space-y-6">
              {/* Top 3 traits with strategies */}
              {profile.sortedTraits.slice(0, 3).map((item, index) => {
                const info = toxicTraitDescriptions[item.trait];
                if (item.score < 25) return null; // Skip very low traits

                return (
                  <div key={item.trait} className={cn("p-5 rounded-xl bg-gradient-to-br", info.bgColor)}>
                    <h4 className={cn("font-semibold mb-3 flex items-center gap-2", info.textColor)}>
                      <span>{info.emoji}</span>
                      <span>Reducing {info.name} ({item.score}%)</span>
                    </h4>
                    <ul className="space-y-2">
                      {info.growthStrategies.map((strategy, idx) => (
                        <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                          {strategy}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* All Traits Overview */}
          <div className="test-card">
            <h3 className="text-2xl font-bold text-foreground mb-6">All Traits Explained</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {traitOrder.map((trait) => {
                const info = toxicTraitDescriptions[trait];
                const score = result[trait];
                const level = getScoreLevel(score);

                return (
                  <div key={trait} className={cn("p-4 rounded-xl bg-gradient-to-br", info.bgColor)}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={cn("font-semibold flex items-center gap-2", info.textColor)}>
                        <span className="text-xl">{info.emoji}</span>
                        {info.name}
                      </span>
                      <span className="text-sm text-muted-foreground">{score}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{info.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommended Tests */}
          <div className="test-card">
            <RecommendedTests
              tests={[
                {
                  title: "Emotional Intelligence Test",
                  description: "Measure your ability to understand and manage emotions in yourself and others.",
                  url: "/test/emotional-intelligence-test",
                  icon: "🧠",
                  reason: "High EQ helps counterbalance toxic tendencies"
                },
                {
                  title: "Communication Style Test",
                  description: "Discover how you communicate and how it affects your relationships.",
                  url: "/test/communication-style-test",
                  icon: "💬",
                  reason: "Understand how your communication patterns may contribute to toxic dynamics"
                },
                {
                  title: "Attachment Style Test",
                  description: "Explore your attachment patterns in relationships.",
                  url: "/test/attachment-style-test",
                  icon: "🔗",
                  reason: "Toxic traits often connect to attachment patterns"
                }
              ]}
              subtitle="Continue your journey of self-awareness"
            />
          </div>

          {/* FAQ Section */}
          <div className="test-card">
            <CollapsibleFAQ faqs={toxicTraitFAQs} />
          </div>

          {/* Disclaimer */}
          <div className="test-card bg-muted/30">
            <h3 className="text-xl font-bold text-foreground mb-4">Important Reminders</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Everyone has toxic traits.</strong> Having these tendencies doesn't make you a bad person -
                it makes you human. What matters is awareness and the willingness to grow.
              </p>
              <p>
                <strong className="text-foreground">This is not a clinical assessment.</strong> This test is for entertainment and self-reflection.
                It cannot diagnose any mental health conditions. If you're struggling with behavioral patterns that harm yourself or others,
                please consider speaking with a licensed mental health professional.
              </p>
              <p>
                <strong className="text-foreground">Change is possible.</strong> These traits are behavioral patterns, not fixed personality features.
                With awareness, effort, and sometimes professional support, you can develop healthier patterns.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button onClick={handleReset} variant="outline" size="lg" className="gap-2">
              <RotateCcw className="w-5 h-5" />
              Retake Test
            </Button>
            <Button onClick={handleShare} size="lg" className="gap-2 gradient-primary border-0">
              <Share2 className="w-5 h-5" />
              Share Results
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ToxicTraitTestResult;
