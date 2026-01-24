import Header from "@/components/Header";
import { SEOHead } from "@/components/SEOHead";
import { Mail, MessageSquare, Clock, AlertCircle } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Contact Us - Test Archive"
        description="Get in touch with Test Archive. We'd love to hear your feedback, questions, or suggestions about our personality tests."
        path="/contact/"
      />
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions, feedback, or suggestions? We'd love to hear from you.
          </p>
        </section>

        {/* Contact Methods */}
        <section className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="font-semibold text-foreground mb-2">General Inquiries</h2>
            <p className="text-sm text-muted-foreground mb-3">
              For general questions, feedback, or suggestions about our tests.
            </p>
            <a
              href="mailto:hello@test-archive.com"
              className="text-primary hover:underline font-medium"
            >
              hello@test-archive.com
            </a>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-green-500" />
            </div>
            <h2 className="font-semibold text-foreground mb-2">Response Time</h2>
            <p className="text-sm text-muted-foreground mb-3">
              We typically respond to inquiries within 1-3 business days.
            </p>
            <span className="text-muted-foreground text-sm">
              Monday - Friday, 9 AM - 6 PM (EST)
            </span>
          </div>
        </section>

        {/* Email Categories */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            How Can We Help?
          </h2>
          <div className="bg-card rounded-xl border border-border divide-y divide-border">
            <div className="p-6">
              <h3 className="font-semibold text-foreground mb-2">Feedback & Suggestions</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Have ideas for new tests or ways to improve existing ones? We're always looking to make Test Archive better.
              </p>
              <a href="mailto:feedback@test-archive.com" className="text-primary hover:underline text-sm">
                feedback@test-archive.com
              </a>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-foreground mb-2">Technical Issues</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Experiencing bugs or technical problems? Please include your browser, device, and a description of the issue.
              </p>
              <a href="mailto:support@test-archive.com" className="text-primary hover:underline text-sm">
                support@test-archive.com
              </a>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-foreground mb-2">Business & Partnerships</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Interested in collaboration or partnership opportunities? Let's talk.
              </p>
              <a href="mailto:business@test-archive.com" className="text-primary hover:underline text-sm">
                business@test-archive.com
              </a>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-foreground mb-2">Privacy Concerns</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Questions about your data or privacy? Please review our Privacy Policy first.
              </p>
              <a href="mailto:privacy@test-archive.com" className="text-primary hover:underline text-sm">
                privacy@test-archive.com
              </a>
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="mb-12">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 flex gap-4">
            <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Please Note</h3>
              <p className="text-sm text-muted-foreground">
                Test Archive provides personality tests for entertainment purposes only. We cannot provide medical, psychological, or professional advice. If you're experiencing mental health concerns, please reach out to a qualified healthcare professional or contact a mental health helpline in your area.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Link */}
        <section className="text-center bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8">
          <h2 className="font-display text-xl font-bold text-foreground mb-3">
            Looking for Quick Answers?
          </h2>
          <p className="text-muted-foreground mb-4">
            Many common questions are answered on our test result pages. Each test includes a detailed FAQ section.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Browse Tests
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

export default Contact;
