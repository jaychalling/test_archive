import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  AnswerValue,
  calculateResults,
  darkTriadDescriptions,
  traitOrder,
  getScoreLevel,
  scoreLevelLabels,
  getDarkTriadProfile,
  darkTriadFAQs,
  darkTriadCelebrities,
} from "@/data/darkTriadQuestions";
import ScoreDistributionChart from "@/components/ScoreDistributionChart";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import CelebrityComparison from "@/components/CelebrityComparison";
import RecommendedTests from "@/components/RecommendedTests";
import { CheckCircle2, RotateCcw, Share2, Skull, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const DarkTriadTestResult = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAnswers = localStorage.getItem('darkTriadAnswers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
      setLoading(false);
    } else {
      navigate('/test/dark-triad-test/');
    }
  }, [navigate]);

  const handleReset = () => {
    localStorage.removeItem('darkTriadAnswers');
    navigate('/test/dark-triad-test/');
  };

  const handleShare = async () => {
    const result = calculateResults(answers);
    const profile = getDarkTriadProfile(result);

    const shareText = `My Dark Triad Test Results

Overall: ${profile.overallScore}% Dark Triad
Primary Trait: ${darkTriadDescriptions[profile.primaryTrait].name}

Narcissism: ${result.narcissism}%
Machiavellianism: ${result.machiavellianism}%
Psychopathy: ${result.psychopathy}%

Take the test: ${window.location.origin}/test/dark-triad-test/`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Dark Triad Test Results",
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
          <p className="text-muted-foreground">Analyzing your dark traits...</p>
        </div>
      </div>
    );
  }

  const result = calculateResults(answers);
  const profile = getDarkTriadProfile(result);

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Dark Triad Test', path: '/test/dark-triad-test/' },
    { name: 'Results', path: '/test/dark-triad-test/result/' },
  ]);

  return (
    <div className="min-h-screen gradient-hero">
      <SEOHead
        title={`Your Dark Triad Score: ${profile.overallScore}% - Results`}
        description={`Your Dark Triad results reveal your levels of Narcissism, Machiavellianism, and Psychopathy. See what your personality shadow looks like.`}
        path="/test/dark-triad-test/result/"
        jsonLd={breadcrumbSchema}
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="test-card text-center animate-scale-in">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-800/20 to-slate-600/10 flex items-center justify-center">
                <Skull className="w-10 h-10 text-slate-600" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-muted-foreground mb-3">
              Your Dark Triad Score
            </h2>
            <div className="text-6xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent">
              {profile.overallScore}%
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              Primary Trait: <span className={darkTriadDescriptions[profile.primaryTrait].textColor + " font-semibold"}>{darkTriadDescriptions[profile.primaryTrait].name}</span>
            </p>

            {/* Summary */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-slate-500/10 to-slate-700/10 mb-8 text-left">
              <p className="text-lg text-foreground font-medium mb-4">{profile.summary}</p>
              <p className="text-base text-muted-foreground leading-relaxed">{profile.interpretation}</p>
            </div>

            {/* Triangle Visualization */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Your Dark Triad Profile</h3>
              <div className="relative w-full max-w-[300px] mx-auto aspect-square">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Background triangle */}
                  <path d="M50 10 L90 85 L10 85 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
                  {/* Grid lines */}
                  <path d="M50 30 L75 67.5 L25 67.5 Z" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-border" />
                  <path d="M50 50 L60 50 L55 57.5 Z" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-border" />
                  {/* Data triangle */}
                  {(() => {
                    const n = result.narcissism / 100;
                    const m = result.machiavellianism / 100;
                    const p = result.psychopathy / 100;
                    // Top (Narcissism), Bottom-right (Machiavellianism), Bottom-left (Psychopathy)
                    const nx = 50 + (n - 0.5) * 0;
                    const ny = 10 + (1 - n) * 37.5;
                    const mx = 90 - (1 - m) * 40;
                    const my = 85 - (1 - m) * 37.5;
                    const px = 10 + (1 - p) * 40;
                    const py = 85 - (1 - p) * 37.5;
                    return (
                      <>
                        <path d={`M${50} ${10 + (1-n)*37.5} L${90 - (1-m)*40} ${85 - (1-m)*37.5} L${10 + (1-p)*40} ${85 - (1-p)*37.5} Z`}
                          fill="hsl(var(--primary))" fillOpacity="0.3" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                        <circle cx={50} cy={10 + (1-n)*37.5} r="3" fill="rgb(244 63 94)" />
                        <circle cx={90 - (1-m)*40} cy={85 - (1-m)*37.5} r="3" fill="rgb(139 92 246)" />
                        <circle cx={10 + (1-p)*40} cy={85 - (1-p)*37.5} r="3" fill="rgb(100 116 139)" />
                      </>
                    );
                  })()}
                </svg>
                {/* Labels */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-xs font-medium text-rose-500">Narcissism</div>
                <div className="absolute bottom-0 right-2 text-xs font-medium text-violet-500">Machiavellianism</div>
                <div className="absolute bottom-0 left-2 text-xs font-medium text-slate-500">Psychopathy</div>
              </div>
            </div>

            {/* Score Bars */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-bold text-foreground text-left mb-3">Trait Scores</h3>
              {traitOrder.map((trait) => {
                const score = result[trait];
                const level = getScoreLevel(score);
                const info = darkTriadDescriptions[trait];
                return (
                  <div key={trait} className="text-left">
                    <div className="flex justify-between items-center mb-1">
                      <span className={cn("text-sm font-medium", info.textColor)}>
                        {info.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {score}% ({scoreLevelLabels[level]})
                      </span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full transition-all duration-500", info.color)} style={{ width: `${score}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Score Distribution */}
            <ScoreDistributionChart
              userScore={profile.overallScore}
              maxScore={100}
              testName="Dark Triad"
              colorClass="bg-gradient-to-r from-slate-600 to-slate-800"
            />
          </div>

          {/* Celebrity Comparison */}
          <div className="test-card">
            <CelebrityComparison
              userScore={profile.overallScore}
              celebrities={darkTriadCelebrities}
              maxScore={100}
              title="Famous Personalities by Dark Triad Level"
            />
          </div>

          {/* Detailed Trait Analysis */}
          <div className="test-card">
            <h3 className="text-2xl font-bold text-foreground mb-6">Detailed Trait Analysis</h3>
            <div className="space-y-8">
              {traitOrder.map((trait) => {
                const score = result[trait];
                const level = getScoreLevel(score);
                const info = darkTriadDescriptions[trait];
                const description = level === "high" ? info.highDescription : level === "low" ? info.lowDescription : info.moderateDescription;
                const traits = level === "high" ? info.highTraits : info.lowTraits;

                return (
                  <div key={trait} className={cn("p-6 rounded-xl bg-gradient-to-br", info.bgColor)}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={cn("w-4 h-4 rounded-full", info.color)} />
                      <h4 className={cn("text-xl font-bold", info.textColor)}>
                        {info.name}
                      </h4>
                      <span className="text-sm text-muted-foreground ml-auto font-semibold">
                        {score}% - {scoreLevelLabels[level]}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 italic">{info.subtitle}</p>

                    {/* Description */}
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-foreground mb-2">Your Level</h5>
                      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                    </div>

                    {/* Scientific Background */}
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-foreground mb-2">Scientific Background</h5>
                      <p className="text-sm text-muted-foreground leading-relaxed">{info.scientificBackground}</p>
                    </div>

                    {/* Traits */}
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-foreground mb-2">Typical Characteristics</h5>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {traits.map((t, idx) => (
                          <div key={idx} className="text-sm text-foreground flex items-start gap-2">
                            <span className={info.textColor}>•</span>
                            {t}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Implications */}
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div className="p-3 bg-background/50 rounded-lg">
                        <h5 className="text-xs font-semibold text-foreground mb-1">Workplace</h5>
                        <p className="text-xs text-muted-foreground">{info.workplaceImplications}</p>
                      </div>
                      <div className="p-3 bg-background/50 rounded-lg">
                        <h5 className="text-xs font-semibold text-foreground mb-1">Relationships</h5>
                        <p className="text-xs text-muted-foreground">{info.relationshipImplications}</p>
                      </div>
                    </div>

                    {/* Healthy Expression vs Warning Signs */}
                    {level !== "low" && (
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-semibold text-green-600 mb-2">Healthy Expression</h5>
                          <ul className="space-y-1">
                            {info.healthyExpression.map((item, idx) => (
                              <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                                <CheckCircle2 className="w-3 h-3 mt-0.5 text-green-500" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-amber-600 mb-2">Warning Signs</h5>
                          <ul className="space-y-1">
                            {info.warningSignsHigh.map((item, idx) => (
                              <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                                <AlertTriangle className="w-3 h-3 mt-0.5 text-amber-500" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
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
                  title: "Big Five Personality Test",
                  description: "Measure your personality across 5 major dimensions including Agreeableness and Neuroticism.",
                  url: "/test/big-five-test",
                  icon: "🧬",
                  reason: "Dark Triad traits often correlate with low Agreeableness - see your full profile"
                },
                {
                  title: "Emotional Intelligence Test",
                  description: "Measure your ability to understand and manage emotions in yourself and others.",
                  url: "/test/emotional-intelligence-test",
                  icon: "🧠",
                  reason: "Explore your empathy and emotional awareness - the counterbalance to Dark Triad traits"
                },
                {
                  title: "Moral Alignment Test",
                  description: "Discover where you fall on the spectrum of lawful vs chaotic, good vs evil.",
                  url: "/test/moral-alignment-test",
                  icon: "⚖️",
                  reason: "See how your Dark Triad traits align with your moral compass"
                }
              ]}
              subtitle="Explore more dimensions of your personality"
            />
          </div>

          {/* FAQ Section */}
          <div className="test-card">
            <CollapsibleFAQ faqs={darkTriadFAQs} />
          </div>

          {/* Disclaimer */}
          <div className="test-card bg-muted/30">
            <h3 className="text-xl font-bold text-foreground mb-4">Important Notes</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">About This Test:</strong> This test measures subclinical Dark Triad traits -
                normal personality variations that exist in everyone to some degree. It is based on research by Paulhus and Williams (2002)
                but adapted for entertainment and self-reflection purposes.
              </p>
              <p>
                <strong className="text-foreground">Not a Diagnosis:</strong> Elevated scores do not indicate personality disorders.
                Clinical conditions like Narcissistic Personality Disorder require professional assessment.
                This test cannot diagnose any mental health condition.
              </p>
              <p>
                <strong className="text-foreground">Context Matters:</strong> These traits can be adaptive in certain contexts.
                Self-awareness about your tendencies allows you to channel them constructively.
                If you're concerned about any aspect of your personality, consider speaking with a mental health professional.
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

export default DarkTriadTestResult;
