import Header from "@/components/Header";
import { SEOHead } from "@/components/SEOHead";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Privacy Policy - Test Archive"
        description="Learn how Test Archive collects, uses, and protects your personal information. Your privacy matters to us."
        path="/privacy/"
      />
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm text-muted-foreground">
            Last updated: January 24, 2026
          </p>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
            <p>
              Welcome to Test Archive ("we," "our," or "us"). We are committed to protecting your privacy and ensuring a safe online experience. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website test-archive.com (the "Site").
            </p>
            <p>
              Please read this Privacy Policy carefully. By accessing or using the Site, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">2. Information We Collect</h2>

            <h3 className="text-lg font-medium text-foreground">2.1 Information You Provide</h3>
            <p>
              When you take our personality tests, we may collect the answers you provide during the tests. This information is processed locally in your browser and stored temporarily in your browser's local storage to display your results.
            </p>

            <h3 className="text-lg font-medium text-foreground">2.2 Automatically Collected Information</h3>
            <p>We automatically collect certain information when you visit the Site, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Device information (browser type, operating system, device type)</li>
              <li>IP address and approximate geographic location</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Clickstream data and browsing patterns</li>
            </ul>

            <h3 className="text-lg font-medium text-foreground">2.3 Cookies and Tracking Technologies</h3>
            <p>
              We use cookies and similar tracking technologies to enhance your experience. These include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential cookies:</strong> Required for the Site to function properly</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our Site</li>
              <li><strong>Advertising cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">3. How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and maintain our services</li>
              <li>Display your test results</li>
              <li>Improve and optimize our Site</li>
              <li>Analyze usage patterns and trends</li>
              <li>Display personalized advertisements</li>
              <li>Protect against fraud and unauthorized access</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">4. Third-Party Services</h2>

            <h3 className="text-lg font-medium text-foreground">4.1 Google AdSense</h3>
            <p>
              We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to our Site or other websites. You can opt out of personalized advertising by visiting{" "}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Google's Ads Settings
              </a>.
            </p>

            <h3 className="text-lg font-medium text-foreground">4.2 Google Analytics</h3>
            <p>
              We use Google Analytics to analyze Site traffic and usage patterns. Google Analytics collects data anonymously and reports website trends without identifying individual visitors. You can learn more about Google Analytics and opt out by visiting{" "}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Google Analytics Opt-out Browser Add-on
              </a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">5. Data Storage and Security</h2>
            <p>
              Your test answers are stored locally in your browser's local storage and are not transmitted to our servers. We implement appropriate technical and organizational measures to protect the information we collect through automated means.
            </p>
            <p>
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">6. Your Rights and Choices</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access:</strong> Request a copy of the information we hold about you</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Opt-out:</strong> Opt out of personalized advertising</li>
              <li><strong>Cookies:</strong> Manage cookie preferences through your browser settings</li>
            </ul>
            <p>
              To clear your test data, you can clear your browser's local storage or use your browser's privacy settings.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">7. Children's Privacy</h2>
            <p>
              Our Site is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">8. International Users</h2>
            <p>
              Our Site is operated from the United States. If you access the Site from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States where our servers are located.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">9. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of the Site after any changes constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">10. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <p className="font-medium text-foreground">
              Email: privacy@test-archive.com
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

export default Privacy;
