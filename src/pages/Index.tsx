import Header from "@/components/Header";
import TestCard from "@/components/TestCard";
import { SEOHead, createWebSiteSchema } from "@/components/SEOHead";
import { Sparkles, Compass, Heart, HeartHandshake, Users, Brain, Circle, Layers, Scale, Users2, Lightbulb, Briefcase, MessageSquare } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen gradient-hero">
      <SEOHead
        title="Test Archive - Free Online Personality Tests"
        description="Take free online personality tests including Rice Purity Test, Big Five, 16 Personalities, Enneagram, and more. Discover insights about yourself. For entertainment only."
        path="/"
        jsonLd={createWebSiteSchema()}
      />
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Discover yourself through fun tests
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Test <span className="text-gradient">Archive</span>
          </h1>

          <p className="text-lg text-muted-foreground">
            A collection of fun and insightful personality tests.<br />
            Learn more about yourself.
          </p>
        </section>

        {/* Test Grid */}
        <section className="max-w-4xl mx-auto">
          <h2 className="font-display text-xl font-semibold text-foreground mb-6">
            Popular Tests
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestCard
              title="Rice Purity Test"
              description="Measure your purity score on a scale of 100. Find out how innocent you are."
              questionCount={100}
              duration="5-7 min"
              path="/test/rice-purity"
              icon={<Sparkles className="w-6 h-6" />}
              iconBgColor="bg-pink-500"
            />
            <TestCard
              title="Political Spectrum Test"
              description="Map your political views on a 2D spectrum with economic left/right and social authoritarian/libertarian axes."
              questionCount={22}
              duration="2-5 min"
              path="/test/political-compass-test"
              icon={<Compass className="w-6 h-6" />}
              iconBgColor="bg-blue-600"
            />
            <TestCard
              title="BDSM Test"
              description="An adult self-assessment test. Explore your preferences in relationship dynamics."
              questionCount={25}
              duration="2-5 min"
              path="/test/bdsm-test"
              icon={<Heart className="w-6 h-6" />}
              iconBgColor="bg-rose-700"
            />
            <TestCard
              title="Affection Style Test"
              description="Discover how you prefer to express and receive love through 5 different styles."
              questionCount={30}
              duration="2-5 min"
              path="/test/love-language-test"
              icon={<HeartHandshake className="w-6 h-6" />}
              iconBgColor="bg-red-400"
            />
            <TestCard
              title="Attachment Style Test"
              description="Analyze your attachment style in relationships. Find your type based on anxiety and avoidance axes."
              questionCount={24}
              duration="2-5 min"
              path="/test/attachment-style-test"
              icon={<Users className="w-6 h-6" />}
              iconBgColor="bg-teal-500"
            />
            <TestCard
              title="Big Five Personality Test"
              description="The most widely used personality model in psychology (OCEAN). Measures openness, conscientiousness, extraversion, agreeableness, and neuroticism."
              questionCount={50}
              duration="5-7 min"
              path="/test/big-five-test"
              icon={<Brain className="w-6 h-6" />}
              iconBgColor="bg-indigo-500"
            />
            <TestCard
              title="Enneagram Test"
              description="Discover your core motivations, fears, and desires through 9 personality types. Includes wing type analysis."
              questionCount={36}
              duration="2-5 min"
              path="/test/enneagram-test"
              icon={<Circle className="w-6 h-6" />}
              iconBgColor="bg-purple-600"
            />
            <TestCard
              title="16 Personalities Test"
              description="Find your type among 16 personalities by analyzing 4 dimensions: energy, information, decisions, and lifestyle."
              questionCount={40}
              duration="2-5 min"
              path="/test/16-personality-test"
              icon={<Layers className="w-6 h-6" />}
              iconBgColor="bg-emerald-500"
            />
            <TestCard
              title="Moral Alignment Test"
              description="Find your moral alignment among 9 types based on order vs chaos and good vs evil axes."
              questionCount={24}
              duration="2-5 min"
              path="/test/moral-alignment-test"
              icon={<Scale className="w-6 h-6" />}
              iconBgColor="bg-amber-500"
            />
            <TestCard
              title="Introvert/Extrovert Test"
              description="Find your position on the introvert-extrovert spectrum. Analyze 5 factors including energy recharge style and social preferences."
              questionCount={20}
              duration="1-2 min"
              path="/test/introvert-extrovert-test"
              icon={<Users2 className="w-6 h-6" />}
              iconBgColor="bg-orange-500"
            />
            <TestCard
              title="Emotional Intelligence Test"
              description="Measure your EQ across 5 areas: self-awareness, self-regulation, motivation, empathy, and social skills."
              questionCount={25}
              duration="5-7 min"
              path="/test/emotional-intelligence-test"
              icon={<Lightbulb className="w-6 h-6" />}
              iconBgColor="bg-cyan-500"
            />
            <TestCard
              title="Career Aptitude Test"
              description="Discover your ideal career path with Holland's RIASEC model. Find which of 6 types fits you best."
              questionCount={30}
              duration="5 min"
              path="/test/career-aptitude-test"
              icon={<Briefcase className="w-6 h-6" />}
              iconBgColor="bg-green-600"
            />
            <TestCard
              title="Communication Style Test"
              description="Identify your communication pattern: assertive, passive, aggressive, or passive-aggressive."
              questionCount={28}
              duration="5 min"
              path="/test/communication-style-test"
              icon={<MessageSquare className="w-6 h-6" />}
              iconBgColor="bg-violet-500"
            />
          </div>
        </section>

        {/* Coming Soon */}
        <section className="max-w-4xl mx-auto mt-16">
          <div className="text-center py-12 border-2 border-dashed border-border rounded-2xl">
            <p className="text-muted-foreground">
              More tests coming soon ✨
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2026 Test Archive. All tests are for entertainment purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
