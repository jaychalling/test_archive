import Header from "@/components/Header";
import { SEOHead } from "@/components/SEOHead";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Terms of Service - Test Archive"
        description="Read the Terms of Service for Test Archive. Understand your rights and responsibilities when using our personality tests."
        path="/terms/"
      />
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
          Terms of Service
        </h1>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm text-muted-foreground">
            Last updated: January 24, 2026
          </p>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>
              Welcome to Test Archive. By accessing or using our website at test-archive.com (the "Site"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Site.
            </p>
            <p>
              We reserve the right to modify these Terms at any time. Your continued use of the Site following any changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">2. Description of Services</h2>
            <p>
              Test Archive provides online personality tests and quizzes for entertainment and self-discovery purposes. Our services include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Various personality assessments and quizzes</li>
              <li>Result pages with explanations and insights</li>
              <li>Sharing functionality for test results</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">3. Entertainment Purpose Disclaimer</h2>
            <p className="font-medium text-foreground">
              IMPORTANT: All tests, quizzes, and assessments on Test Archive are provided solely for entertainment and general informational purposes.
            </p>
            <p>
              Our tests are NOT intended to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide medical, psychological, or psychiatric diagnosis</li>
              <li>Replace professional mental health services</li>
              <li>Offer legal, financial, or professional advice</li>
              <li>Serve as clinical or diagnostic tools</li>
            </ul>
            <p>
              If you have concerns about your mental health, relationships, or well-being, please consult a qualified healthcare professional, licensed therapist, or appropriate specialist.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">4. User Conduct</h2>
            <p>When using our Site, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Site only for lawful purposes</li>
              <li>Not attempt to interfere with or disrupt the Site's functionality</li>
              <li>Not use automated systems (bots, scrapers) without permission</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
              <li>Not misrepresent your identity or affiliation</li>
              <li>Not use the Site to harass, abuse, or harm others</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">5. Intellectual Property</h2>
            <p>
              All content on Test Archive, including but not limited to text, graphics, logos, images, and software, is the property of Test Archive or its content suppliers and is protected by intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works of, publicly display, or commercially exploit any content from the Site without our prior written permission.
            </p>
            <p>
              Some of our tests are based on established psychological frameworks that are in the public domain. However, our specific implementations, designs, and presentations are proprietary.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">6. Privacy</h2>
            <p>
              Your use of the Site is also governed by our{" "}
              <a href="/privacy/" className="text-primary hover:underline">
                Privacy Policy
              </a>
              , which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our data practices.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">7. Third-Party Content and Advertising</h2>
            <p>
              Our Site may display advertisements from third-party advertisers, including Google AdSense. We are not responsible for the content, accuracy, or opinions expressed in such advertisements.
            </p>
            <p>
              The Site may also contain links to third-party websites. We do not control and are not responsible for the content or practices of these external sites.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">8. Disclaimer of Warranties</h2>
            <p>
              THE SITE AND ALL CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p>
              We do not warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The Site will be uninterrupted or error-free</li>
              <li>Test results will be accurate, complete, or applicable to you</li>
              <li>Any defects will be corrected</li>
              <li>The Site is free of viruses or harmful components</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">9. Limitation of Liability</h2>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY LAW, TEST ARCHIVE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATED TO YOUR USE OF THE SITE.
            </p>
            <p>
              IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED ONE HUNDRED DOLLARS ($100).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">10. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Test Archive, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorneys' fees) arising out of your use of the Site or violation of these Terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">11. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles. Any disputes arising under these Terms shall be resolved in the appropriate courts located in the United States.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">12. Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">13. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="font-medium text-foreground">
              Email: legal@test-archive.com
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2026 Test Archive. All tests are for entertainment purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default Terms;
