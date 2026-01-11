import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  anxietyCalmQuestions,
  AnswerValue,
  AnxietyCalmResult,
  AnxietyTendency,
  tendencyDescriptions,
  anxietyCalmCelebrities,
} from "@/data/anxietyCalmQuestions";
import { CheckCircle2, RotateCcw, Share2, Brain, AlertCircle } from "lucide-react";
import ScoreDistributionChart from "@/components/ScoreDistributionChart";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import CelebrityComparison from "@/components/CelebrityComparison";
import RecommendedTests from "@/components/RecommendedTests";
import { cn } from "@/lib/utils";

const calculateResults = (answers: Record<number, AnswerValue>): AnxietyCalmResult => {
  let totalScore = 0;

  anxietyCalmQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      // If scoreDirection is "calm": higher answer = more calm (1-5 points)
      // If scoreDirection is "anxious": higher answer = more anxious, so reverse (5-1 points)
      if (question.scoreDirection === "calm") {
        totalScore += answer;
      } else {
        totalScore += 6 - answer; // Reverse: 1→5, 2→4, 3→3, 4→2, 5→1
      }
    }
  });

  // Calculate percentage: totalScore ranges from 30-150
  // Percentage = ((totalScore - 30) / 120) * 100
  const percentage = Math.round(((totalScore - 30) / 120) * 100);

  // Determine tendency based on percentage
  let tendency: AnxietyTendency;
  if (percentage >= 75) {
    tendency = "Very Calm";
  } else if (percentage >= 60) {
    tendency = "Calm";
  } else if (percentage >= 40) {
    tendency = "Balanced";
  } else if (percentage >= 25) {
    tendency = "Anxious";
  } else {
    tendency = "Very Anxious";
  }

  return {
    totalScore,
    percentage: Math.max(0, Math.min(100, percentage)),
    tendency,
  };
};

const tendencyColors: Record<AnxietyTendency, string> = {
  "Very Calm": "bg-emerald-500",
  "Calm": "bg-teal-500",
  "Balanced": "bg-indigo-500",
  "Anxious": "bg-amber-500",
  "Very Anxious": "bg-rose-500",
};

const tendencyTextColors: Record<AnxietyTendency, string> = {
  "Very Calm": "text-emerald-500",
  "Calm": "text-teal-500",
  "Balanced": "text-indigo-500",
  "Anxious": "text-amber-500",
  "Very Anxious": "text-rose-500",
};

const tendencyGradients: Record<AnxietyTendency, string> = {
  "Very Calm": "from-emerald-400 to-teal-500",
  "Calm": "from-teal-400 to-cyan-500",
  "Balanced": "from-indigo-400 to-purple-500",
  "Anxious": "from-amber-400 to-orange-500",
  "Very Anxious": "from-rose-400 to-red-500",
};

const AnxietyCalmTestResult = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});

  useEffect(() => {
    const saved = localStorage.getItem('anxietyCalmAnswers');
    if (!saved) {
      navigate('/test/anxiety-calm-test/');
      return;
    }
    setAnswers(JSON.parse(saved));
  }, [navigate]);

  const handleReset = () => {
    localStorage.removeItem('anxietyCalmAnswers');
    navigate('/test/anxiety-calm-test/');
  };

  const handleShare = async () => {
    const result = calculateResults(answers);
    const description = tendencyDescriptions[result.tendency];

    const shareText = `My Anxiety vs Calm Test Result

Score: ${result.percentage}/100
Level: ${description.label}

${description.shortDescription}

Take the test at Test Archive!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Anxiety vs Calm Test Result",
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
    { name: 'Anxiety vs Calm Test', path: '/test/anxiety-calm-test/' },
    { name: 'Results', path: '/test/anxiety-calm-test/result/' },
  ]);

  if (Object.keys(answers).length === 0) {
    return null;
  }

  const result = calculateResults(answers);
  const description = tendencyDescriptions[result.level];

    return (
      <div className="min-h-screen gradient-hero">
        <SEOHead
          title="Your Anxiety vs Calm Result - Test Results"
          description="Understand your stress response style and anxiety tendencies. This is for entertainment and self-reflection only."
          path="/test/anxiety-calm-test/"
          jsonLd={breadcrumbSchema}
        />
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
            {/* PROMINENT DISCLAIMER */}
            <div className="mb-8 p-6 rounded-xl bg-blue-500/10 border-2 border-blue-500/30">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-base text-foreground font-semibold mb-2">
                    Important: This test is for entertainment and self-reflection only.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This test measures personality tendencies, <strong>NOT clinical anxiety disorders</strong>.
                    It cannot diagnose mental health conditions. If you experience persistent anxiety that
                    interferes with daily life, please consult a qualified mental health professional.
                  </p>
                </div>
              </div>
            </div>

            {/* Result Hero Section */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/10 flex items-center justify-center">
                <Brain className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-muted-foreground mb-3">
              Your Stress Response Style
            </h2>
            <div className={cn(
              "text-6xl md:text-7xl font-extrabold mb-3 bg-gradient-to-r bg-clip-text text-transparent",
              tendencyGradients[result.tendency]
            )}>
              {description.label}
            </div>
            <div className="text-xl text-muted-foreground mb-6">
              Tendency Score: {result.percentage}%
            </div>
            <p className="text-xl leading-relaxed text-foreground max-w-3xl mx-auto mb-8 font-medium">
              {description.shortDescription}
            </p>

            {/* Additional Strong Disclaimer for Very Anxious */}
            {result.tendency === "Very Anxious" && (
              <div className="mb-8 p-6 rounded-xl bg-rose-500/10 border-2 border-rose-500/30">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-base text-foreground font-bold mb-2">
                      Please Consider Professional Support
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Your responses suggest you may be experiencing significant anxiety that could benefit
                      from professional help. Anxiety at this level is very treatable with proper support.
                      Please consider consulting a mental health professional who can provide personalized
                      assessment and evidence-based treatment options.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Score Bar */}
            <div className="mb-8">
              <div className="text-sm text-muted-foreground mb-2">Your Calm-Anxiety Spectrum Position</div>
              <div className="relative h-8 bg-gradient-to-r from-rose-200 via-indigo-200 to-emerald-200 dark:from-rose-900 dark:via-indigo-900 dark:to-emerald-900 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "absolute top-0 h-full w-1 transform -translate-x-1/2 transition-all duration-500",
                    tendencyColors[result.tendency]
                  )}
                  style={{ left: `${result.percentage}%` }}
                >
                  <div className="w-4 h-4 rounded-full bg-current absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white shadow-lg" />
                </div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Very Anxious</span>
                <span>Balanced</span>
                <span>Very Calm</span>
              </div>
            </div>

            {/* Score Distribution Chart */}
            <div className="mb-12">
              <ScoreDistributionChart
                userScore={result.percentage}
                maxScore={100}
                testName="Anxiety vs Calm Test"
                colorClass={tendencyColors[result.tendency]}
                distributionMean={50}
                distributionStdDev={15}
              />
            </div>

            {/* Reminder About Normal Worry */}
            <div className="mb-8 p-4 rounded-lg bg-muted/30 border border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Remember:</strong> Some worry is normal and healthy. This test measures tendencies, not disorders.
                Everyone experiences anxiety sometimes—it's a natural human response designed to keep us safe.
              </p>
            </div>

            {/* What This Typically Means */}
            <div className="text-left p-6 rounded-xl bg-primary/5 border border-primary/10 mb-8">
              <h3 className="text-2xl font-bold mb-5 text-foreground">What This Typically Means</h3>
              <div className="space-y-4">
                {description.meaning.map((paragraph, idx) => (
                  <p key={idx} className="text-base text-foreground leading-relaxed font-normal">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Common Traits */}
            <div className={cn(
              "text-left p-6 rounded-xl mb-8",
              result.tendency === "Very Calm" && "bg-emerald-500/10 border border-emerald-500/20",
              result.tendency === "Calm" && "bg-teal-500/10 border border-teal-500/20",
              result.tendency === "Balanced" && "bg-indigo-500/10 border border-indigo-500/20",
              result.tendency === "Anxious" && "bg-amber-500/10 border border-amber-500/20",
              result.tendency === "Very Anxious" && "bg-rose-500/10 border border-rose-500/20"
            )}>
              <h3 className="text-2xl font-bold text-foreground mb-5">
                Common Characteristics
              </h3>
              <ul className="space-y-3">
                {description.traits.map((trait, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className={cn("w-5 h-5 flex-shrink-0 mt-0.5", tendencyTextColors[result.tendency])} />
                    <span className="text-base text-foreground leading-relaxed font-normal">{trait}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Celebrity Comparison */}
            {anxietyCalmCelebrities[result.tendency] && (
              <div className="mb-8">
                <CelebrityComparison
                  userScore={result.percentage}
                  celebrities={anxietyCalmCelebrities[result.tendency].map(c => ({
                    name: c.name,
                    score: result.percentage, // Use same score for display purposes
                    description: c.description,
                    avatar: undefined
                  }))}
                  maxScore={100}
                  title="Public Figures With Similar Tendencies"
                />
              </div>
            )}

            {/* Advice & Recommendations */}
            <div className="text-left p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-5">Suggestions & Advice</h3>
              <ul className="space-y-3">
                {description.advice.map((advice, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-blue-700 dark:text-blue-400">{idx + 1}</span>
                    </span>
                    <span className="text-base text-foreground leading-relaxed font-normal">{advice}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ Section */}
            <div className="mb-8">
              <CollapsibleFAQ
                faqs={description.faqs.map(faq => ({
                  question: faq.question,
                  answer: faq.answer
                }))}
              />
            </div>

            {/* All Tendency Levels Overview */}
            <div className="text-left p-6 rounded-xl bg-muted/20 border border-border mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-5">Understanding the Tendency Spectrum</h3>
              <div className="space-y-3">
                {(Object.entries(tendencyDescriptions) as [AnxietyTendency, typeof tendencyDescriptions["Balanced"]][])
                  .reverse() // Show Very Calm → Very Anxious order
                  .map(([tendency, info]) => (
                  <div
                    key={tendency}
                    className={cn(
                      "p-4 rounded-lg border-l-4 transition-all",
                      result.tendency === tendency
                        ? `${tendencyColors[tendency].replace('bg-', 'border-')} bg-muted/30`
                        : "border-transparent bg-muted/10"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={cn("w-3 h-3 rounded-full", tendencyColors[tendency])} />
                      <span className={cn("font-bold text-base", result.tendency === tendency && tendencyTextColors[tendency])}>
                        {info.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground ml-5">
                      {info.shortDescription}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Scientific Note */}
            <div className="text-left p-6 rounded-xl bg-teal-500/10 border border-teal-500/20 mb-8">
              <h3 className="text-2xl font-bold text-teal-700 dark:text-teal-400 mb-4">About This Test</h3>
              <p className="text-base text-foreground leading-relaxed font-normal">
                This test assesses personality tendencies related to worry, stress response, and emotional regulation.
                It is based on common characteristics associated with anxious and calm temperaments, but it is <strong>not
                a clinical diagnostic tool</strong>. Anxiety exists on a spectrum, and everyone's experience is unique.
                Your results reflect general patterns in how you tend to respond to stress and uncertainty.
              </p>
              <p className="text-base text-foreground leading-relaxed font-normal mt-4">
                <strong>Note:</strong> Clinical anxiety disorders (such as Generalized Anxiety Disorder, Social Anxiety,
                Panic Disorder, etc.) require professional diagnosis and often involve persistent symptoms that significantly
                interfere with daily functioning. If your worry feels uncontrollable, causes significant distress, or limits
                your activities, please consult a qualified mental health professional for proper evaluation and support.
              </p>
            </div>

            {/* Recommended Tests */}
            <div className="mb-8">
              <RecommendedTests
                tests={[
                  {
                    title: "Introvert/Extrovert Test",
                    description: "Discover your social energy style and how you recharge.",
                    url: "/test/introvert-extrovert-test",
                    icon: "👥",
                    reason: "Social preferences often relate to stress responses and anxiety"
                  },
                  {
                    title: "Big Five Personality Test",
                    description: "Comprehensive personality assessment across five key dimensions.",
                    url: "/test/big-five-test",
                    icon: "🎭",
                    reason: "Neuroticism dimension directly relates to anxiety tendencies"
                  },
                  {
                    title: "Emotional Intelligence Test",
                    description: "Measure your ability to recognize and manage emotions effectively.",
                    url: "/test/emotional-intelligence-test",
                    icon: "🧠",
                    reason: "Higher emotional awareness helps manage anxiety and stress"
                  }
                ]}
                subtitle="Based on your stress response style, these tests provide additional self-insight"
              />
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

export default AnxietyCalmTestResult;
