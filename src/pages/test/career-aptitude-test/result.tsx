import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema, createFAQSchema } from "@/components/SEOHead";
import {
  careerQuestions,
  AnswerValue,
  hollandTypeDescriptions,
  testBackground,
  calculateTopTypes,
  careerAptitudeFAQs,
  careerAptitudeCelebrities,
} from "@/data/careerAptitudeQuestions";
import {
  CheckCircle2,
  RotateCcw,
  Share2,
  BookOpen,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  Briefcase,
  History,
  AlertCircle,
  Target,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import ScoreDistributionChart from "@/components/ScoreDistributionChart";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import CelebrityComparison from "@/components/CelebrityComparison";
import RecommendedTests from "@/components/RecommendedTests";
import ShareResultCard from "@/components/ShareResultCard";
import { buildShareUrl } from "@/lib/share";

const CareerAptitudeTestResult = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAnswers = localStorage.getItem('careerAptitudeAnswers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
      setLoading(false);
    } else {
      navigate('/test/career-aptitude-test/');
    }
  }, [navigate]);

  const handleReset = () => {
    localStorage.removeItem('careerAptitudeAnswers');
    navigate('/test/career-aptitude-test/');
  };

  const handleShare = async () => {
    const topTypes = calculateTopTypes(answers);
    const top3 = topTypes.slice(0, 3);
    const hollandCode = top3.map(t => t.code).join('');
    const shareUrl = buildShareUrl("career-aptitude-test", hollandCode);

    const shareText = `My Career Aptitude Test Results

Holland Code: ${hollandCode}

1st: ${hollandTypeDescriptions[top3[0].code].nameKo}
2nd: ${hollandTypeDescriptions[top3[1].code].nameKo}
3rd: ${hollandTypeDescriptions[top3[2].code].nameKo}

Take the test at Test-Archive.com`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Career Aptitude Test Results",
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(shareText + `\n${shareUrl}`);
      alert("Results copied to clipboard!");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const topTypes = calculateTopTypes(answers);
  const top3 = topTypes.slice(0, 3);
  const hollandCode = top3.map(t => t.code).join('');
  const primaryType = hollandTypeDescriptions[top3[0].code];
  const totalQuestions = careerQuestions.length;

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Career Aptitude Test", path: "/test/career-aptitude-test/" },
    { name: "Results", path: "/test/career-aptitude-test/result/" },
  ]);
  const faqSchema = createFAQSchema(careerAptitudeFAQs);

  return (
    <div className="min-h-screen gradient-hero">
      <SEOHead
        title={`${primaryType.nameKo} - Career Aptitude Test Results | Test-Archive.com`}
        description={`Your Holland Code is ${hollandCode}. ${primaryType.description}`}
        path="/test/career-aptitude-test/result/"
        jsonLd={[breadcrumbSchema, faqSchema]}
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
          {/* Result Hero Section */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <Target className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-muted-foreground mb-3">
            Your Career Aptitude Results
          </h2>
          <div className="text-6xl md:text-7xl font-extrabold mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {hollandCode}
          </div>
          <p className="text-xl leading-relaxed text-foreground max-w-3xl mx-auto mb-2 font-medium">
            Holland Interest Code
          </p>
          <p className="text-lg text-muted-foreground mb-12">
            {primaryType.description}
          </p>

          {/* Top 3 Type Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {top3.map((type, index) => {
              const typeInfo = hollandTypeDescriptions[type.code];
              const maxScore = totalQuestions / 6 * 5; // 5 questions per type * max 5 points
              const percentage = Math.round((type.score / maxScore) * 100);

              return (
                <div
                  key={type.code}
                  className={cn(
                    "p-5 rounded-xl text-left",
                    index === 0 && "ring-2 ring-primary bg-primary/5"
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {index === 0 && <Award className="w-5 h-5 text-primary" />}
                    <span className="text-sm font-semibold text-muted-foreground">
                      Rank {index + 1}
                    </span>
                  </div>
                  <div className={cn("text-2xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent", typeInfo.color)}>
                    {typeInfo.nameKo}
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">{typeInfo.name}</div>
                  <div className="w-full bg-muted rounded-full h-2 mb-2">
                    <div
                      className={cn("h-2 rounded-full bg-gradient-to-r", typeInfo.color)}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{percentage}% Match</p>
                </div>
              );
            })}
          </div>

          {/* Score Distribution Chart */}
          <div className="mb-12">
            <ScoreDistributionChart
              userScore={top3[0].score}
              maxScore={totalQuestions / 6 * 5}
              testName="Career Aptitude Test"
              colorClass={primaryType.color.replace("from-", "bg-").replace(" to-", "")}
            />
          </div>

          {/* Primary Type Detailed Analysis */}
          <div className="text-left">
            <h3 className="text-2xl font-bold mb-6">Primary Type: {primaryType.nameKo}</h3>

            {/* Description */}
            <div className="p-8 rounded-xl bg-primary/5 border border-primary/10 mb-8">
              <p className="text-lg text-foreground leading-relaxed font-normal">{primaryType.description}</p>
            </div>

            {/* Detailed Analysis */}
            <div className="text-left p-8 rounded-xl bg-primary/5 border border-primary/10 mb-8">
              <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary" />
                <span className="text-foreground">What This Means</span>
              </h3>
              <p className="text-base text-foreground leading-relaxed font-normal">{primaryType.detailedDescription}</p>
            </div>

            {/* Theoretical Background */}
            <div className="p-6 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-8">
              <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <span className="text-foreground">Theoretical Background</span>
              </h3>
              <p className="text-base text-foreground leading-relaxed font-normal">{primaryType.theoreticalBackground}</p>
            </div>

            {/* Celebrity Comparison */}
            <div className="mb-8">
              <CelebrityComparison
                userScore={top3[0].score}
                celebrities={careerAptitudeCelebrities}
                maxScore={totalQuestions / 6 * 5}
                title="Your Career Profile is Similar To..."
              />
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
                  {primaryType.strengths.map((strength, index) => (
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
                  {primaryType.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground leading-relaxed">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Suitable Careers */}
            <div className="text-left p-6 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-8">
              <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-blue-700 dark:text-blue-400">
                <Briefcase className="w-6 h-6" />
                <span>Suitable Career Fields</span>
              </h3>
              <ul className="space-y-4">
                {primaryType.careerExamples.map((career, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground leading-relaxed">{career}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* All Types Summary */}
            <div className="p-6 rounded-xl bg-muted/30 border border-border mb-8">
              <h4 className="text-xl font-bold mb-6 text-foreground">Your Career Interest Profile</h4>
              <div className="space-y-4">
                {top3.map((type, index) => {
                  const typeInfo = hollandTypeDescriptions[type.code];
                  return (
                    <div key={type.code} className="border-b border-border pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-muted-foreground">
                            Rank {index + 1}
                          </span>
                          <span className="font-semibold">{typeInfo.nameKo}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{typeInfo.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommended Tests */}
            <div className="mb-8">
              <RecommendedTests
                tests={[
                  {
                    title: "Big Five Personality Test",
                    description: "Explore your personality across five major dimensions and understand how you approach work.",
                    url: "/test/big-five-test",
                    icon: "🎭",
                    reason: "Career aptitude combined with personality traits provides complete career guidance"
                  },
                  {
                    title: "16 Personality Types Test",
                    description: "Discover your personality type and how it influences your career preferences and work style.",
                    url: "/test/16-personality-test",
                    icon: "🧩",
                    reason: "Understanding your type helps align career choices with natural preferences"
                  },
                  {
                    title: "Emotional Intelligence Test",
                    description: "Measure your ability to recognize and manage emotions in professional settings.",
                    url: "/test/emotional-intelligence-test",
                    icon: "🧠",
                    reason: "High EQ is crucial for success in most career paths, especially people-oriented ones"
                  }
                ]}
                subtitle="Complete your career profile with these complementary assessments"
              />
            </div>

            {/* FAQ Section */}
            <div className="mb-8">
              <CollapsibleFAQ faqs={careerAptitudeFAQs} />
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
          </div>

          <ShareResultCard
            slug="career-aptitude-test"
            shareValue={hollandCode}
            shareLabel={`Holland Code ${hollandCode}`}
            testName="Career Aptitude Test"
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

export default CareerAptitudeTestResult;
