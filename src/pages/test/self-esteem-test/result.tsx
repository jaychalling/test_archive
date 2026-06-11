import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  selfEsteemQuestions,
  AnswerValue,
  SelfEsteemResult,
  SelfEsteemLevel,
  selfEsteemDescriptions,
  selfEsteemCelebrities,
} from "@/data/selfEsteemQuestions";
import { CheckCircle2, RotateCcw, Share2, Award, AlertCircle } from "lucide-react";
import ScoreDistributionChart from "@/components/ScoreDistributionChart";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import CelebrityComparison from "@/components/CelebrityComparison";
import RecommendedTests from "@/components/RecommendedTests";
import { cn } from "@/lib/utils";
import ShareResultCard from "@/components/ShareResultCard";
import { buildShareUrl } from "@/lib/share";

const calculateResults = (answers: Record<number, AnswerValue>): SelfEsteemResult => {
  let totalScore = 0;

  selfEsteemQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      // Calculate score based on direction
      if (question.scoreDirection === "positive") {
        // For positive questions: 1-4 points directly
        totalScore += answer;
      } else {
        // For negative questions: reverse scoring (1=4pts, 2=3pts, 3=2pts, 4=1pt)
        totalScore += 5 - answer;
      }
    }
  });

  // Calculate percentage (max score is 100)
  const percentage = totalScore;

  // Determine self-esteem level
  let level: SelfEsteemLevel;
  if (percentage >= 80) {
    level = "Very High";
  } else if (percentage >= 65) {
    level = "High";
  } else if (percentage >= 45) {
    level = "Moderate";
  } else if (percentage >= 25) {
    level = "Low";
  } else {
    level = "Very Low";
  }

  return {
    totalScore,
    percentage,
    level,
  };
};

const levelColors: Record<SelfEsteemLevel, string> = {
  "Very High": "bg-emerald-500",
  "High": "bg-teal-500",
  "Moderate": "bg-blue-500",
  "Low": "bg-amber-500",
  "Very Low": "bg-red-500",
};

const levelTextColors: Record<SelfEsteemLevel, string> = {
  "Very High": "text-emerald-500",
  "High": "text-teal-500",
  "Moderate": "text-blue-500",
  "Low": "text-amber-500",
  "Very Low": "text-red-500",
};

const levelGradients: Record<SelfEsteemLevel, string> = {
  "Very High": "from-emerald-400 to-teal-500",
  "High": "from-teal-400 to-cyan-500",
  "Moderate": "from-blue-400 to-indigo-500",
  "Low": "from-amber-400 to-orange-500",
  "Very Low": "from-red-400 to-rose-500",
};

const SelfEsteemTestResult = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});

  useEffect(() => {
    const saved = localStorage.getItem('selfEsteemAnswers');
    if (!saved) {
      navigate('/test/self-esteem-test/');
      return;
    }
    setAnswers(JSON.parse(saved));
  }, [navigate]);

  const handleReset = () => {
    localStorage.removeItem('selfEsteemAnswers');
    navigate('/test/self-esteem-test/');
  };

  const handleShare = async () => {
    const result = calculateResults(answers);
    const description = selfEsteemDescriptions[result.level];
    const shareUrl = buildShareUrl("self-esteem-test", Math.round(result.percentage));

    const shareText = `My Self-Esteem Test Result

Score: ${result.percentage}/100
Level: ${description.label}

${description.shortDescription}

Take the test at Test Archive!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Self-Esteem Test Result",
          text: shareText,
          url: shareUrl,
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
    { name: 'Self-Esteem Test', path: '/test/self-esteem-test/' },
    { name: 'Results', path: '/test/self-esteem-test/result/' },
  ]);

  if (Object.keys(answers).length === 0) {
    return null;
  }

  const result = calculateResults(answers);
  const description = selfEsteemDescriptions[result.level];

    return (
      <div className="min-h-screen gradient-hero">
        <SEOHead
          title="Your Self-Esteem Test Results"
          description="Understand your self-esteem level and get personalized insights for building healthy self-confidence."
          path="/test/self-esteem-test/result/"
          jsonLd={breadcrumbSchema}
        />
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
            {/* Disclaimer Banner */}
            <div className="mb-8 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-left text-amber-800 dark:text-amber-200">
                <strong>Important:</strong> This test is for entertainment and self-reflection purposes only. It is not a clinical diagnosis.
                If you're experiencing persistent low self-worth or emotional distress, please consult a mental health professional.
              </p>
            </div>

            {/* Result Hero Section */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center">
                <Award className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-muted-foreground mb-3">
              Your Self-Esteem Results
            </h2>
            <div className={cn(
              "text-6xl md:text-7xl font-extrabold mb-3 bg-gradient-to-r bg-clip-text text-transparent",
              levelGradients[result.level]
            )}>
              {result.percentage}
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">
              {description.label}
            </div>
            <p className="text-xl leading-relaxed text-muted-foreground max-w-3xl mx-auto mb-12">
              {description.shortDescription}
            </p>

            {/* Score Bar */}
            <div className="mb-8 p-6 rounded-xl bg-muted/20">
              <div className="text-sm text-muted-foreground mb-2">Self-Esteem Score</div>
              <div className="text-4xl font-bold mb-4">
                <span className={levelTextColors[result.level]}>{result.percentage}</span>
                <span className="text-2xl text-muted-foreground"> / 100</span>
              </div>
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-1000", levelColors[result.level])}
                  style={{ width: `${result.percentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Very Low</span>
                <span>Low</span>
                <span>Moderate</span>
                <span>High</span>
                <span>Very High</span>
              </div>
            </div>

            {/* Score Distribution Chart */}
            <div className="mb-12">
              <ScoreDistributionChart
                userScore={result.percentage}
                maxScore={100}
                testName="Self-Esteem Test"
                colorClass={levelColors[result.level]}
              />
            </div>

            {/* What This Typically Means */}
            <div className="text-left p-6 rounded-xl bg-primary/5 border border-primary/10 mb-8">
              <h3 className="text-2xl font-bold mb-5 text-foreground">
                What This Typically Means
              </h3>
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
              result.level === "Very High" && "bg-emerald-500/10 border border-emerald-500/20",
              result.level === "High" && "bg-teal-500/10 border border-teal-500/20",
              result.level === "Moderate" && "bg-blue-500/10 border border-blue-500/20",
              result.level === "Low" && "bg-amber-500/10 border border-amber-500/20",
              result.level === "Very Low" && "bg-red-500/10 border border-red-500/20"
            )}>
              <h3 className="text-2xl font-bold mb-5 text-foreground">
                Common Traits & Behaviors
              </h3>
              <ul className="space-y-3">
                {description.traits.map((trait, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className={cn("w-5 h-5 flex-shrink-0 mt-0.5", levelTextColors[result.level])} />
                    <span className="text-base text-foreground leading-relaxed font-normal">{trait}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Advice & Recommendations */}
            <div className="text-left p-6 rounded-xl bg-indigo-500/10 border border-indigo-500/20 mb-8">
              <h3 className="text-2xl font-bold mb-5 text-indigo-700 dark:text-indigo-400">
                Advice & Recommendations
              </h3>
              <ul className="space-y-3">
                {description.advice.map((advice, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-indigo-700 dark:text-indigo-400">{idx + 1}</span>
                    </span>
                    <span className="text-base text-foreground leading-relaxed font-normal">{advice}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Celebrity Comparison */}
            {selfEsteemCelebrities[result.level] && selfEsteemCelebrities[result.level].length > 0 && (
              <div className="mb-8">
                <CelebrityComparison
                  userScore={0}
                  celebrities={selfEsteemCelebrities[result.level].map(c => ({
                    name: c.name,
                    score: result.percentage,
                    description: c.description,
                    avatar: ""
                  }))}
                  maxScore={100}
                  title="Notable Figures with Similar Self-Esteem Patterns"
                />
              </div>
            )}

            {/* Understanding Self-Esteem Levels */}
            <div className="text-left p-6 rounded-xl bg-muted/20 border border-border mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-5">Understanding Self-Esteem Levels</h3>
              <div className="space-y-3">
                {(Object.entries(selfEsteemDescriptions) as [SelfEsteemLevel, typeof selfEsteemDescriptions["Very High"]][]).map(([level, info]) => (
                  <div
                    key={level}
                    className={cn(
                      "p-4 rounded-lg border-l-4 transition-all",
                      result.level === level
                        ? `${levelColors[level].replace('bg-', 'border-')} bg-muted/30`
                        : "border-transparent bg-muted/10"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={cn("w-3 h-3 rounded-full", levelColors[level])} />
                      <span className={cn("font-bold text-base", result.level === level && levelTextColors[level])}>
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

            {/* Scientific Background */}
            <div className="text-left p-6 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-8">
              <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-5">About Self-Esteem</h3>
              <p className="text-base text-foreground leading-relaxed font-normal mb-4">
                Self-esteem refers to your overall sense of personal worth and value. It influences how you think, feel, and behave in daily life.
                This test is based on the Rosenberg Self-Esteem Scale, one of the most widely used measures in social science research.
              </p>
              <p className="text-base text-foreground leading-relaxed font-normal">
                While self-esteem tends to be relatively stable, it can fluctuate based on life circumstances, relationships, and personal experiences.
                The good news is that self-esteem can be improved through self-reflection, challenging negative thoughts, building competence, and often
                with the help of therapy or counseling.
              </p>
            </div>

            {/* Recommended Tests */}
            <div className="mb-8">
              <RecommendedTests
                tests={[
                  {
                    title: "Big Five Test",
                    description: "Discover your personality traits across five key dimensions that often correlate with self-esteem.",
                    url: "/test/big-five-test",
                    icon: "🧩",
                    reason: "Understanding your personality helps contextualize your self-esteem patterns"
                  },
                  {
                    title: "Emotional Intelligence Test",
                    description: "Assess your ability to understand and manage emotions, which strongly relates to self-esteem.",
                    url: "/test/emotional-intelligence-test",
                    icon: "🧠",
                    reason: "High emotional intelligence supports healthy self-esteem development"
                  },
                  {
                    title: "Introvert/Extrovert Test",
                    description: "Learn about your social energy preferences and how they relate to self-perception.",
                    url: "/test/introvert-extrovert-test",
                    icon: "👥",
                    reason: "Understanding your natural tendencies helps build authentic self-worth"
                  }
                ]}
                subtitle="Based on your self-esteem results, these tests provide complementary insights"
              />
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

            <ShareResultCard
              slug="self-esteem-test"
              shareValue={Math.round(result.percentage)}
              shareLabel={`${Math.round(result.percentage)}/100 — ${description.label}`}
              testName="Self-Esteem Test"
              className="mt-8"
            />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button onClick={handleReset} variant="outline" size="lg" className="gap-2 min-w-[160px]">
                <RotateCcw className="w-5 h-5" />
                <span className="font-semibold">Retake Test</span>
              </Button>
              <Button
                onClick={handleShare}
                size="lg"
                className="gap-2 min-w-[160px] bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
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

export default SelfEsteemTestResult;
