import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema, createFAQSchema } from "@/components/SEOHead";
import {
  AnswerValue,
  CommunicationStyle,
  communicationStyleDescriptions,
  testBackground,
  calculateCommunicationStyle,
  communicationStyleFAQs,
  communicationStyleCelebrities,
} from "@/data/communicationStyleQuestions";
import {
  CheckCircle2,
  RotateCcw,
  Share2,
  BookOpen,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  MessageSquare,
  History,
  AlertCircle,
  Target,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import ScoreDistributionChart from "@/components/ScoreDistributionChart";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import CelebrityComparison from "@/components/CelebrityComparison";
import RecommendedTests from "@/components/RecommendedTests";
import ShareResultCard from "@/components/ShareResultCard";
import { buildShareUrl } from "@/lib/share";

const CommunicationStyleTestResult = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAnswers = localStorage.getItem('communicationStyleAnswers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
      setLoading(false);
    } else {
      navigate('/test/communication-style-test/');
    }
  }, [navigate]);

  const handleReset = () => {
    localStorage.removeItem('communicationStyleAnswers');
    navigate('/test/communication-style-test/');
  };

  const handleShare = async () => {
    const result = calculateCommunicationStyle(answers);
    const styleInfo = communicationStyleDescriptions[result.style];
    const shareUrl = buildShareUrl("communication-style-test", result.style);

    const shareText = `My Communication Style Test Result

Primary Style: ${styleInfo.nameKo}

${styleInfo.description}

Take the test at Test-Archive.com`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Communication Style Test Result",
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(shareText + `\n${shareUrl}`);
      alert("Result copied to clipboard!");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const result = calculateCommunicationStyle(answers);
  const dominantStyle = communicationStyleDescriptions[result.style];

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Communication Style Test", path: "/test/communication-style-test/" },
    { name: "Result", path: "/test/communication-style-test/result/" },
  ]);
  const faqSchema = createFAQSchema(communicationStyleFAQs);

  // Sort by score
  const sortedStyles = (Object.entries(result.scores) as [CommunicationStyle, number][])
    .sort((a, b) => b[1] - a[1]);

  return (
    <div className="min-h-screen gradient-hero">
      <SEOHead
        title={`${dominantStyle.nameKo} - Communication Style Test Result | Test-Archive.com`}
        description={`Your primary communication style is ${dominantStyle.nameKo}. ${dominantStyle.description}`}
        path="/test/communication-style-test/result/"
        jsonLd={[breadcrumbSchema, faqSchema]}
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
          {/* Result Hero Section */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <MessageSquare className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-muted-foreground mb-3">Your Communication Style Results</h2>
          <div className={cn("text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r bg-clip-text text-transparent", dominantStyle.color)}>
            {dominantStyle.nameKo}
          </div>
          <p className="text-xl leading-relaxed text-foreground max-w-3xl mx-auto mb-12 font-medium">{dominantStyle.description}</p>

          {/* Score Distribution Chart */}
          <div className="mb-12">
            <ScoreDistributionChart
              userScore={result.scores[result.style]}
              maxScore={100}
              testName="Communication Style Test"
              colorClass={dominantStyle.color.replace("from-", "bg-").replace(" to-", "")}
            />
          </div>

          {/* 4 Style Score Chart */}
          <div className="mb-12 p-8 rounded-xl bg-muted/30 border border-border">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Communication Style Profile</h3>
            <div className="space-y-4">
              {sortedStyles.map(([style, score], index) => {
                const styleInfo = communicationStyleDescriptions[style];
                const isDominant = style === result.style;
                return (
                  <div key={style} className="text-left">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {isDominant && <Target className="w-4 h-4 text-primary" />}
                        <span className={cn("font-semibold", isDominant && "text-primary")}>
                          {styleInfo.nameKo}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">{score}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className={cn("h-3 rounded-full bg-gradient-to-r transition-all", styleInfo.color)}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Analysis of Primary Style */}
          <div className="text-left">
            {/* Detailed Description */}
            <div className="p-8 rounded-xl bg-primary/5 border border-primary/10 mb-8">
              <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary" />
                <span className="text-foreground">What This Means</span>
              </h3>
              <p className="text-base text-foreground leading-relaxed font-normal">{dominantStyle.detailedDescription}</p>
            </div>

            {/* Celebrity Comparison */}
            <div className="mb-8">
              <CelebrityComparison
                userScore={result.scores[result.style]}
                celebrities={communicationStyleCelebrities}
                maxScore={100}
              />
            </div>

            {/* Psychological Background */}
            <div className="p-8 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-8">
              <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <span className="text-foreground">Psychological Background</span>
              </h3>
              <p className="text-base text-foreground leading-relaxed font-normal">{dominantStyle.psychologicalBackground}</p>
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
                  {dominantStyle.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground leading-relaxed">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="p-6 rounded-xl bg-orange-500/10 border border-orange-500/20 text-left">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-orange-700 dark:text-orange-400">
                  <TrendingDown className="w-6 h-6" />
                  <span>Areas to Develop</span>
                </h3>
                <ul className="space-y-3">
                  {dominantStyle.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground leading-relaxed">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Improvement Tips */}
            <div className="p-6 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-8 text-left">
              <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-blue-700 dark:text-blue-400">
                <Sparkles className="w-6 h-6" />
                <span>Communication Improvement Tips</span>
              </h3>
              <ul className="space-y-4">
                {dominantStyle.improvementTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Real-World Examples */}
            <div className="p-6 rounded-xl bg-muted/30 border border-border mb-8 text-left">
              <h3 className="text-xl font-bold mb-5 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-primary" />
                <span className="text-foreground">Real-World Examples</span>
              </h3>
              <ul className="space-y-4">
                {dominantStyle.exampleSituations.map((example, index) => (
                  <li key={index} className="text-sm text-foreground p-4 bg-muted/50 rounded-lg leading-relaxed">
                    {example}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Tests */}
            <div className="mb-8">
              <RecommendedTests
                tests={[
                  {
                    title: "Emotional Intelligence Test",
                    description: "Measure your ability to recognize and manage emotions in yourself and others.",
                    url: "/test/emotional-intelligence-test",
                    icon: "🧠",
                    reason: "Communication style is deeply connected to emotional intelligence"
                  },
                  {
                    title: "Attachment Style Test",
                    description: "Discover your attachment patterns in relationships and how they affect your emotional bonds.",
                    url: "/test/attachment-style-test",
                    icon: "❤️",
                    reason: "Attachment styles heavily influence communication patterns"
                  },
                  {
                    title: "Love Language Test",
                    description: "Understand how you prefer to give and receive love in relationships.",
                    url: "/test/love-language-test",
                    icon: "💕",
                    reason: "Communication and love languages work together in relationships"
                  }
                ]}
                subtitle="Based on your communication style, these tests provide deeper insights"
              />
            </div>

            {/* FAQ Section */}
            <div className="mb-8">
              <CollapsibleFAQ faqs={communicationStyleFAQs} />
            </div>

            {/* Test Background Information */}
            <div className="p-6 rounded-xl bg-muted/30 border border-border mb-8 text-left">
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
          </div>

          <ShareResultCard
            slug="communication-style-test"
            shareValue={result.style}
            shareLabel={dominantStyle.nameKo}
            testName="Communication Style Test"
            className="mt-8"
          />

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

export default CommunicationStyleTestResult;
