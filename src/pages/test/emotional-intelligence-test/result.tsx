import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  eqQuestions,
  AnswerValue,
  EQLevel,
  eqResultDescriptions,
  testBackground,
  eqFAQs,
  eqCelebrities,
} from "@/data/emotionalIntelligenceQuestions";
import {
  CheckCircle2,
  RotateCcw,
  Share2,
  BookOpen,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  Users,
  History,
  AlertCircle,
  Brain,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ScoreDistributionChart from "@/components/ScoreDistributionChart";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import CelebrityComparison from "@/components/CelebrityComparison";
import RecommendedTests from "@/components/RecommendedTests";

const calculateEQLevel = (answers: Record<number, AnswerValue>): { level: EQLevel; score: number } => {
  let totalScore = 0;
  let answeredCount = 0;

  eqQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      totalScore += answer;
      answeredCount++;
    }
  });

  const maxPossible = answeredCount * 5;
  const minPossible = answeredCount * 1;
  const score = Math.round(((totalScore - minPossible) / (maxPossible - minPossible)) * 100);

  let level: EQLevel;
  if (score >= 80) level = 'veryHigh';
  else if (score >= 60) level = 'high';
  else if (score >= 40) level = 'average';
  else if (score >= 20) level = 'low';
  else level = 'veryLow';

  return { level, score };
};

const EmotionalIntelligenceTestResult = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAnswers = localStorage.getItem('eqTestAnswers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
      setLoading(false);
    } else {
      navigate('/test/emotional-intelligence-test/');
    }
  }, [navigate]);

  const handleReset = () => {
    localStorage.removeItem('eqTestAnswers');
    navigate('/test/emotional-intelligence-test/');
  };

  const handleShare = async () => {
    const { level, score } = calculateEQLevel(answers);
    const result = eqResultDescriptions[level];

    const shareText = `My Emotional Intelligence Test Results

Level: ${result.nameKo}
Score: ${score}/100

${result.description}

Take the test at Test-Archive.com`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Emotional Intelligence Test Results",
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(shareText + `\n${window.location.href}`);
      alert("Results copied to clipboard!");
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

  const { level, score } = calculateEQLevel(answers);
  const result = eqResultDescriptions[level];

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Emotional Intelligence Test", item: "/test/emotional-intelligence-test" },
    { name: "Results", item: "/test/emotional-intelligence-test/result" },
  ]);

  return (
    <div className="min-h-screen gradient-hero">
      <SEOHead
        title={`${result.nameKo} - Emotional Intelligence Test Results | Test-Archive.com`}
        description={`Your emotional intelligence level is ${result.nameKo}. ${result.description}`}
        canonicalUrl="/test/emotional-intelligence-test"
        schema={breadcrumbSchema}
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
          {/* Result Hero Section */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <Brain className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-muted-foreground mb-3">
            Your Emotional Intelligence Results
          </h2>
          <div className={cn(
            "text-6xl md:text-7xl font-extrabold mb-3 bg-gradient-to-r bg-clip-text text-transparent",
            result.color
          )}>
            {result.nameKo}
          </div>
          <div className="inline-flex items-baseline gap-2 mb-6">
            <span className="text-5xl font-bold text-primary">{score}</span>
            <span className="text-2xl font-semibold text-muted-foreground">/ 100</span>
          </div>
          <p className="text-xl leading-relaxed text-foreground max-w-3xl mx-auto mb-12 font-medium">
            {result.description}
          </p>

          {/* Score Distribution Chart */}
          <div className="mb-12">
            <ScoreDistributionChart
              userScore={score}
              maxScore={100}
              testName="Emotional Intelligence Test"
              colorClass={result.color.replace("from-", "bg-").replace(" to-", "")}
            />
          </div>

          {/* Detailed Analysis */}
          <div className="text-left p-8 rounded-xl bg-primary/5 border border-primary/10 mb-8">
            <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-primary" />
              <span className="text-foreground">What This Means</span>
            </h3>
            <p className="text-base text-foreground leading-relaxed font-normal">
              {result.detailedDescription}
            </p>
          </div>

          {/* Celebrity Comparison */}
          <div className="mb-8">
            <CelebrityComparison
              userScore={score}
              celebrities={eqCelebrities}
              maxScore={100}
            />
          </div>

          {/* Scientific Background */}
          <div className="text-left p-8 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-8">
            <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <span className="text-foreground">Scientific Background</span>
            </h3>
            <p className="text-base text-foreground leading-relaxed font-normal">
              {result.scientificBackground}
            </p>
          </div>

          {/* Strengths and Weaknesses */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Strengths */}
            <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20 text-left">
              <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-green-700 dark:text-green-400">
                <TrendingUp className="w-6 h-6" />
                <span>Your Strengths</span>
              </h3>
              <ul className="space-y-3">
                {result.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground leading-relaxed">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses (Areas for Improvement) */}
            <div className="p-6 rounded-xl bg-orange-500/10 border border-orange-500/20 text-left">
              <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-orange-700 dark:text-orange-400">
                <TrendingDown className="w-6 h-6" />
                <span>Areas to Develop</span>
              </h3>
              <ul className="space-y-3">
                {result.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground leading-relaxed">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Real-World Examples */}
          <div className="text-left p-6 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-8">
            <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-blue-700 dark:text-blue-400">
              <Users className="w-6 h-6" />
              <span>People With This Profile</span>
            </h3>
            <ul className="space-y-4">
              {result.realWorldExamples.map((example, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                    <Heart className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm text-foreground leading-relaxed">{example}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Tests */}
          <div className="mb-8">
            <RecommendedTests
              tests={[
                {
                  title: "Communication Style Test",
                  description: "Understand how you express emotions and communicate with others in different situations.",
                  url: "/test/communication-style-test",
                  icon: "💬",
                  reason: "Perfect complement to understand your emotional expression patterns"
                },
                {
                  title: "Attachment Style Test",
                  description: "Discover your attachment patterns in relationships and how they affect your emotional bonds.",
                  url: "/test/attachment-style-test",
                  icon: "❤️",
                  reason: "Emotional intelligence strongly influences attachment behaviors"
                },
                {
                  title: "Big Five Personality Test",
                  description: "Explore your personality across five major dimensions including emotional stability.",
                  url: "/test/big-five-test",
                  icon: "🎭",
                  reason: "EQ correlates with several Big Five personality traits"
                }
              ]}
              subtitle="Based on your emotional intelligence profile, these tests provide deeper insights"
            />
          </div>

          {/* FAQ Section */}
          <div className="mb-8">
            <CollapsibleFAQ faqs={eqFAQs} />
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

export default EmotionalIntelligenceTestResult;
