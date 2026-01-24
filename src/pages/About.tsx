import Header from "@/components/Header";
import { SEOHead } from "@/components/SEOHead";
import { ClipboardCheck, Target, Users, Shield, Sparkles } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="About Us - Test Archive"
        description="Learn about Test Archive, your trusted source for fun and insightful personality tests. Discover who we are and our mission."
        path="/about/"
      />
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6">
            <ClipboardCheck className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            About Test <span className="text-gradient">Archive</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your destination for fun, insightful personality tests that help you discover more about yourself.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-card rounded-2xl border border-border p-8 md:p-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Target className="w-6 h-6 text-primary" />
              Our Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              At Test Archive, we believe that self-discovery should be accessible, enjoyable, and meaningful. Our mission is to provide high-quality personality tests that offer genuine insights while being fun to take.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We curate and develop tests based on established psychological frameworks and research, adapting them into engaging experiences that anyone can enjoy. Whether you're curious about your personality type, attachment style, or emotional intelligence, we've got a test for you.
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Diverse Test Collection</h3>
              <p className="text-sm text-muted-foreground">
                From the Rice Purity Test to the Big Five Personality assessment, we offer a wide range of tests covering personality, relationships, career, and more.
              </p>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Privacy-Focused</h3>
              <p className="text-sm text-muted-foreground">
                Your test answers are stored locally in your browser. We don't collect or store your personal test responses on our servers.
              </p>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Research-Based</h3>
              <p className="text-sm text-muted-foreground">
                Our tests are inspired by established psychological models like the Big Five, Enneagram, Holland's RIASEC, and attachment theory.
              </p>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                <ClipboardCheck className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Detailed Results</h3>
              <p className="text-sm text-muted-foreground">
                Get comprehensive results with explanations, traits, and insights that help you understand your scores in context.
              </p>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 md:p-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Our Approach
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">Quality over quantity:</strong> We focus on providing well-designed tests with meaningful results rather than churning out low-quality content.
              </p>
              <p>
                <strong className="text-foreground">Entertainment with insight:</strong> While our tests are designed to be fun and engaging, they're also based on real psychological concepts and research.
              </p>
              <p>
                <strong className="text-foreground">User experience first:</strong> We've designed our platform to be clean, fast, and distraction-free, so you can focus on discovering more about yourself.
              </p>
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="mb-16">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
            <h2 className="font-semibold text-foreground mb-2">Important Notice</h2>
            <p className="text-sm text-muted-foreground">
              All tests on Test Archive are provided for entertainment and self-discovery purposes only. They are not intended to diagnose, treat, or provide medical, psychological, or professional advice. If you have concerns about your mental health or well-being, please consult a qualified healthcare professional.
            </p>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-muted-foreground mb-6">
            Have questions, feedback, or suggestions? We'd love to hear from you.
          </p>
          <a
            href="/contact/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </a>
        </section>
      </main>

      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2026 Test Archive. All tests are for entertainment purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
