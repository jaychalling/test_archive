import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema, createFAQSchema } from "@/components/SEOHead";
import {
  loveLanguageQuestions,
  LoveLanguage,
  LoveLanguageResult,
  loveLanguageDescriptions,
  loveLanguageFAQs,
  loveLanguageCelebrities,
} from "@/data/loveLanguageQuestions";
import { CheckCircle2, RotateCcw, Share2, Heart, BookOpen, Lightbulb } from "lucide-react";
import ScoreDistributionChart from "@/components/ScoreDistributionChart";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import CelebrityComparison from "@/components/CelebrityComparison";
import RecommendedTests from "@/components/RecommendedTests";
import ShareResultCard from "@/components/ShareResultCard";
import { buildShareUrl } from "@/lib/share";
import { cn } from "@/lib/utils";

type AnswerChoice = "A" | "B";

const calculateResults = (answers: Record<number, AnswerChoice>): LoveLanguageResult => {
  const result: LoveLanguageResult = {
    wordsOfAffirmation: 0,
    actsOfService: 0,
    receivingGifts: 0,
    qualityTime: 0,
    physicalTouch: 0,
  };

  loveLanguageQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer === "A") {
      result[question.optionA.language]++;
    } else if (answer === "B") {
      result[question.optionB.language]++;
    }
  });

  return result;
};

const getRankedLanguages = (result: LoveLanguageResult): { language: LoveLanguage; score: number }[] => {
  const entries = Object.entries(result) as [LoveLanguage, number][];
  return entries
    .map(([language, score]) => ({ language, score }))
    .sort((a, b) => b.score - a.score);
};

const languageColors: Record<LoveLanguage, string> = {
  wordsOfAffirmation: "bg-pink-500",
  actsOfService: "bg-blue-500",
  receivingGifts: "bg-amber-500",
  qualityTime: "bg-green-500",
  physicalTouch: "bg-purple-500",
};

const LoveLanguageResultPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerChoice>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAnswers = localStorage.getItem('loveLanguageAnswers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
      setLoading(false);
    } else {
      navigate('/test/love-language-test/');
    }
  }, [navigate]);

  const handleReset = () => {
    localStorage.removeItem('loveLanguageAnswers');
    navigate('/test/love-language-test/');
  };

  const handleShare = async () => {
    const result = calculateResults(answers);
    const ranked = getRankedLanguages(result);
    const primaryLanguage = loveLanguageDescriptions[ranked[0].language];
    const secondaryLanguage = loveLanguageDescriptions[ranked[1].language];

    const shareText = `My Love Language Test Result\n\n1st: ${primaryLanguage.name} (${ranked[0].score} points)\n2nd: ${secondaryLanguage.name} (${ranked[1].score} points)\n\nWords of Affirmation: ${result.wordsOfAffirmation}\nActs of Service: ${result.actsOfService}\nReceiving Gifts: ${result.receivingGifts}\nQuality Time: ${result.qualityTime}\nPhysical Touch: ${result.physicalTouch}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Love Language Test Result",
          text: shareText,
          url: buildShareUrl("love-language-test", ranked[0].language),
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
    { name: 'Love Language Test', path: '/test/love-language-test/' },
    { name: 'Results', path: '/test/love-language-test/result/' },
  ]);
  const faqSchema = createFAQSchema(loveLanguageFAQs);

  if (loading) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  const result = calculateResults(answers);
  const ranked = getRankedLanguages(result);
  const primaryLanguage = ranked[0];
  const secondaryLanguage = ranked[1];
  const primaryInfo = loveLanguageDescriptions[primaryLanguage.language];
  const secondaryInfo = loveLanguageDescriptions[secondaryLanguage.language];
  const maxScore = 12; // 각 언어는 최대 12점 (30문제에서 각 언어가 12번 등장)

  return (
    <div className="min-h-screen gradient-hero">
      <SEOHead
        title="Your Love Language Test Results"
        description="See your love language results and learn how you express affection. Improve your relationships with this insight."
        path="/test/love-language-test/result/"
        jsonLd={[breadcrumbSchema, faqSchema]}
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
          {/* Result Hero Section */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/10 flex items-center justify-center">
              <Heart className="w-10 h-10 text-pink-500" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-muted-foreground mb-3">
            Your Love Language Results
          </h2>

          {/* Primary Language */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 mb-6">
            <div className="text-sm text-muted-foreground mb-2">Primary Love Language</div>
            <div className="text-5xl md:text-6xl font-extrabold mb-2 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              {primaryInfo.name}
            </div>
            <div className="text-lg text-muted-foreground mb-4 font-medium">
              {primaryInfo.nameEn}
            </div>
            <p className="text-base text-foreground leading-relaxed font-normal max-w-2xl mx-auto">
              {primaryInfo.description}
            </p>
          </div>

          {/* Secondary Language */}
          <div className="p-4 rounded-lg bg-muted/30 mb-6">
            <div className="text-sm text-muted-foreground mb-1">Secondary Love Language</div>
            <div className="font-semibold text-foreground text-lg">
              {secondaryInfo.name}
            </div>
            <div className="text-xs text-muted-foreground mb-2">
              {secondaryInfo.nameEn}
            </div>
            <p className="text-xs text-muted-foreground">
              {secondaryInfo.description}
            </p>
          </div>

          {/* Score Bars */}
          <div className="space-y-4 mb-8">
            <h3 className="text-base font-bold text-foreground text-left mb-3">
              Scores by Language
            </h3>
            {ranked.map(({ language, score }) => (
              <div key={language} className="text-left">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-foreground">
                    {loveLanguageDescriptions[language].name}
                  </span>
                  <span className="text-sm text-muted-foreground">{score} pts</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all duration-500", languageColors[language])}
                    style={{ width: `${(score / maxScore) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Score Distribution Chart */}
          <div className="mb-8">
            <ScoreDistributionChart
              userScore={primaryLanguage.score}
              maxScore={maxScore}
              testName="Love Language Test"
              colorClass="bg-pink-500"
            />
          </div>

          {/* Primary Language Details */}
          <div className="text-left p-6 rounded-xl bg-muted/30 border border-border mb-8">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-primary" />
              <span>Characteristics of {primaryInfo.name}</span>
            </h3>
            <ul className="space-y-3 mb-6">
              {primaryInfo.characteristics.map((char, idx) => (
                <li key={idx} className="text-sm text-foreground flex items-start gap-3 font-normal leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                  {char}
                </li>
              ))}
            </ul>
            <div className="mt-4 p-4 rounded-lg bg-pink-500/10 border border-pink-500/20">
              <div className="text-sm font-semibold text-pink-600 dark:text-pink-400 mb-2">Tip</div>
              <p className="text-sm text-foreground font-normal leading-relaxed">{primaryInfo.tips}</p>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="text-left p-6 rounded-xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 mb-8">
            <h3 className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-5 flex items-center gap-3">
              <Lightbulb className="w-6 h-6" />
              <span>{primaryInfo.name} - In-Depth Analysis</span>
            </h3>
            <p className="text-base text-foreground leading-relaxed whitespace-pre-line font-normal">
              {primaryInfo.detailedDescription}
            </p>
          </div>

          {/* Celebrity Comparison */}
          <div className="mb-8">
            <CelebrityComparison
              userScore={primaryLanguage.score}
              celebrities={loveLanguageCelebrities}
              maxScore={maxScore}
              title="Love Language Profiles Similar to Yours"
            />
          </div>

          {/* Scientific Background */}
          <div className="text-left p-6 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-8">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">Scientific Background</h3>
            <p className="text-base text-foreground leading-relaxed whitespace-pre-line font-normal">
              {primaryInfo.scientificBackground}
            </p>
          </div>

          {/* Expression Methods */}
          <div className="text-left p-6 rounded-xl bg-green-500/10 border border-green-500/20 mb-8">
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-5">How to Express {primaryInfo.name}</h3>
            <ul className="space-y-3">
              {primaryInfo.expressionMethods.map((method, idx) => (
                <li key={idx} className="text-sm text-foreground flex items-start gap-3 font-normal leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-green-600 dark:text-green-400">{idx + 1}</span>
                  </span>
                  {method}
                </li>
              ))}
            </ul>
          </div>

          {/* Recognition Signs */}
          <div className="text-left p-6 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-8">
            <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-5">How to Recognize It</h3>
            <ul className="space-y-3">
              {primaryInfo.recognitionSigns.map((sign, idx) => (
                <li key={idx} className="text-sm text-foreground flex items-start gap-3 font-normal leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  {sign}
                </li>
              ))}
            </ul>
          </div>

          {/* Partnership Tips */}
          <div className="text-left p-6 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-8">
            <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-5">Tips for Partners</h3>
            <ul className="space-y-3">
              {primaryInfo.partnershipTips.map((tip, idx) => (
                <li key={idx} className="text-sm text-foreground flex items-start gap-3 font-normal leading-relaxed">
                  <Heart className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                  {tip}
                </li>
              ))}
            </ul>
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
                  reason: "Love languages and attachment styles work together to shape relationship dynamics"
                },
                {
                  title: "Emotional Intelligence Test",
                  description: "Assess your ability to recognize and manage emotions in yourself and others.",
                  url: "/test/emotional-intelligence-test",
                  icon: "🧠",
                  reason: "High EQ helps you communicate your love language needs effectively"
                },
                {
                  title: "Communication Style Test",
                  description: "Understand how you express yourself and interact with others in different situations.",
                  url: "/test/communication-style-test",
                  icon: "💬",
                  reason: "Better communication helps partners understand each other's love languages"
                }
              ]}
              subtitle="Understanding how you give and receive love works best with these complementary insights"
            />
          </div>

          {/* FAQ Section */}
          <div className="mb-8">
            <CollapsibleFAQ faqs={loveLanguageFAQs} />
          </div>

          {/* Share Result Card */}
          <ShareResultCard
            slug="love-language-test"
            shareValue={primaryLanguage.language}
            shareLabel={primaryInfo.name}
            testName="Love Language Test"
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

export default LoveLanguageResultPage;
