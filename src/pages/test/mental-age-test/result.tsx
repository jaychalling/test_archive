import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema, createFAQSchema } from "@/components/SEOHead";
import {
  calculateMentalAge,
  getResultBand,
  mentalAgeFAQs,
  mentalAgeCelebrities,
} from "@/data/mentalAgeQuestions";
import ScoreDistributionChart from "@/components/ScoreDistributionChart";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import CelebrityComparison from "@/components/CelebrityComparison";
import RecommendedTests from "@/components/RecommendedTests";
import { CheckCircle2, RotateCcw, Share2, Baby } from "lucide-react";
import { cn } from "@/lib/utils";

const MentalAgeTestResult = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [actualAge, setActualAge] = useState<number>(25);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAnswers = localStorage.getItem('mentalAgeAnswers');
    const savedAge = localStorage.getItem('mentalAgeActualAge');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
      if (savedAge) {
        setActualAge(parseInt(savedAge));
      }
      setLoading(false);
    } else {
      navigate('/test/mental-age-test/');
    }
  }, [navigate]);

  const handleReset = () => {
    localStorage.removeItem('mentalAgeAnswers');
    localStorage.removeItem('mentalAgeActualAge');
    navigate('/test/mental-age-test/');
  };

  const handleShare = async () => {
    const mentalAge = calculateMentalAge(answers, actualAge);
    const resultBand = getResultBand(mentalAge);
    const ageDiff = mentalAge - actualAge;

    const shareText = `My Mental Age Test Results

${resultBand.emoji} My mental age is ${mentalAge} years old!
(Actual age: ${actualAge})

${ageDiff > 0 ? `I'm ${ageDiff} years wiser than my age!` : ageDiff < 0 ? `I'm ${Math.abs(ageDiff)} years younger at heart!` : `My mental age matches my actual age!`}

Type: ${resultBand.label}

Take the test: ${window.location.origin}/test/mental-age-test/`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mental Age Test Results",
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
          <p className="text-muted-foreground">Calculating your mental age...</p>
        </div>
      </div>
    );
  }

  const mentalAge = calculateMentalAge(answers, actualAge);
  const resultBand = getResultBand(mentalAge);
  const ageDiff = mentalAge - actualAge;

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Mental Age Test', path: '/test/mental-age-test/' },
    { name: 'Results', path: '/test/mental-age-test/result/' },
  ]);
  const faqSchema = createFAQSchema(mentalAgeFAQs);

  return (
    <div className="min-h-screen gradient-hero">
      <SEOHead
        title={`Your Mental Age: ${mentalAge} Years Old - Results`}
        description={`Your mental age is ${mentalAge}! See what this reveals about your maturity, wisdom, and approach to life.`}
        path="/test/mental-age-test/result/"
        jsonLd={[breadcrumbSchema, faqSchema]}
      />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="test-card text-center animate-scale-in">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-5xl">
                {resultBand.emoji}
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-muted-foreground mb-3">
              Your Mental Age Is
            </h2>
            <div className="text-7xl md:text-8xl font-extrabold mb-4 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              {mentalAge}
            </div>
            <p className="text-xl text-muted-foreground mb-6">years old</p>

            {/* Age Comparison */}
            <div className="inline-flex items-center gap-4 p-4 rounded-xl bg-muted/50 mb-8">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Actual Age</p>
                <p className="text-2xl font-bold text-foreground">{actualAge}</p>
              </div>
              <div className="text-3xl">
                {ageDiff > 0 ? '→' : ageDiff < 0 ? '←' : '='}
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Mental Age</p>
                <p className="text-2xl font-bold text-primary">{mentalAge}</p>
              </div>
              <div className={cn(
                "px-3 py-1 rounded-full text-sm font-medium",
                ageDiff > 0 ? "bg-amber-500/20 text-amber-600" :
                ageDiff < 0 ? "bg-green-500/20 text-green-600" :
                "bg-blue-500/20 text-blue-600"
              )}>
                {ageDiff > 0 ? `+${ageDiff} years` : ageDiff < 0 ? `${ageDiff} years` : 'Perfect match!'}
              </div>
            </div>

            {/* Result Type */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">{resultBand.label}</h3>
              {resultBand.meaning.map((paragraph, idx) => (
                <p key={idx} className="text-base text-muted-foreground leading-relaxed mb-3 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Score Distribution */}
            <ScoreDistributionChart
              userScore={mentalAge}
              maxScore={80}
              testName="Mental Age"
              colorClass="bg-gradient-to-r from-primary to-purple-500"
              customLabels={{ low: "10", mid: "45", high: "80" }}
            />
          </div>

          {/* Celebrity Comparison */}
          <div className="test-card">
            <CelebrityComparison
              userScore={mentalAge}
              celebrities={mentalAgeCelebrities}
              maxScore={80}
              title="Famous People with Similar Mental Ages"
            />
          </div>

          {/* Traits Section */}
          <div className="test-card">
            <h3 className="text-2xl font-bold text-foreground mb-6">Your Key Traits</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {resultBand.traits.map((trait, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <span className="text-primary text-lg">•</span>
                  <span className="text-foreground">{trait}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths & Growth Areas */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="test-card">
              <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">Your Strengths</h3>
              <ul className="space-y-3">
                {resultBand.strengths.map((strength, idx) => (
                  <li key={idx} className="text-sm text-foreground flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            <div className="test-card">
              <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4">Growth Opportunities</h3>
              <ul className="space-y-3">
                {resultBand.growthAreas.map((area, idx) => (
                  <li key={idx} className="text-sm text-foreground flex items-start gap-3">
                    <span className="text-amber-500 text-lg">→</span>
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* What Affects Mental Age */}
          <div className="test-card">
            <h3 className="text-2xl font-bold text-foreground mb-6">What Influences Mental Age?</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-blue-500/10">
                <div className="text-2xl mb-2">🧠</div>
                <h4 className="font-semibold text-foreground mb-1">Life Experiences</h4>
                <p className="text-sm text-muted-foreground">Challenges overcome and lessons learned shape maturity.</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-500/10">
                <div className="text-2xl mb-2">💭</div>
                <h4 className="font-semibold text-foreground mb-1">Self-Reflection</h4>
                <p className="text-sm text-muted-foreground">Introspection and learning from mistakes builds wisdom.</p>
              </div>
              <div className="p-4 rounded-xl bg-green-500/10">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-semibold text-foreground mb-1">Responsibility</h4>
                <p className="text-sm text-muted-foreground">Taking ownership of decisions increases mental maturity.</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-500/10">
                <div className="text-2xl mb-2">😄</div>
                <h4 className="font-semibold text-foreground mb-1">Playfulness</h4>
                <p className="text-sm text-muted-foreground">Maintaining joy and wonder keeps the mind young.</p>
              </div>
              <div className="p-4 rounded-xl bg-rose-500/10">
                <div className="text-2xl mb-2">🤝</div>
                <h4 className="font-semibold text-foreground mb-1">Relationships</h4>
                <p className="text-sm text-muted-foreground">Connections with diverse people broaden perspective.</p>
              </div>
              <div className="p-4 rounded-xl bg-cyan-500/10">
                <div className="text-2xl mb-2">📚</div>
                <h4 className="font-semibold text-foreground mb-1">Continuous Learning</h4>
                <p className="text-sm text-muted-foreground">Curiosity and growth mindset balance mental age.</p>
              </div>
            </div>
          </div>

          {/* Recommended Tests */}
          <div className="test-card">
            <RecommendedTests
              tests={[
                {
                  title: "Big Five Personality Test",
                  description: "Discover your personality traits across 5 major dimensions including emotional stability.",
                  url: "/test/big-five-test",
                  icon: "🧬",
                  reason: "Understand the personality traits that shape your mental age"
                },
                {
                  title: "Emotional Intelligence Test",
                  description: "Measure your ability to understand and manage emotions in yourself and others.",
                  url: "/test/emotional-intelligence-test",
                  icon: "🧠",
                  reason: "Emotional intelligence strongly correlates with mental maturity"
                },
                {
                  title: "Self-Esteem Test",
                  description: "Discover how you truly feel about yourself and your self-worth.",
                  url: "/test/self-esteem-test",
                  icon: "💪",
                  reason: "Self-perception affects how maturely we approach life"
                }
              ]}
              subtitle="Explore more aspects of your psychological profile"
            />
          </div>

          {/* FAQ Section */}
          <div className="test-card">
            <CollapsibleFAQ faqs={[...resultBand.faqs.map(f => ({ question: f.q, answer: f.a })), ...mentalAgeFAQs]} />
          </div>

          {/* Disclaimer */}
          <div className="test-card bg-muted/30">
            <h3 className="text-xl font-bold text-foreground mb-4">About This Test</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                This mental age test is designed for entertainment and self-reflection purposes.
                It measures tendencies in maturity, playfulness, wisdom, curiosity, and responsibility
                to estimate a psychological age that may differ from your chronological age.
              </p>
              <p>
                Mental age is a fun concept but not a clinical measure. Your results can vary based on
                your current mood, recent experiences, and how you interpret the questions. For genuine
                concerns about psychological development, please consult a qualified mental health professional.
              </p>
              <p className="font-medium text-foreground">
                Remember: There's no "right" mental age. Both youthful spirits and wise souls have their unique value!
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

export default MentalAgeTestResult;
