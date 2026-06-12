import { useState } from "react";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import { Code2, Check, Copy } from "lucide-react";

/**
 * Embed widget page — lets bloggers/teachers/newsletters drop any of our tests
 * into their own site with one snippet. The credit link under the iframe is the
 * natural-backlink engine.
 */

const BASE = "https://www.test-archive.com";

const embeddableTests = [
  { slug: "rice-purity", name: "Rice Purity Test", height: 760 },
  { slug: "political-compass-test", name: "Political Compass Test", height: 760 },
  { slug: "16-personality-test", name: "16 Personalities Test", height: 760 },
  { slug: "big-five-test", name: "Big Five Personality Test", height: 760 },
  { slug: "mental-age-test", name: "Mental Age Test", height: 760 },
  { slug: "love-language-test", name: "Love Language Test", height: 760 },
  { slug: "attachment-style-test", name: "Attachment Style Test", height: 760 },
  { slug: "enneagram-test", name: "Enneagram Test", height: 760 },
  { slug: "moral-alignment-test", name: "Moral Alignment Test", height: 760 },
  { slug: "introvert-extrovert-test", name: "Introvert vs Extrovert Test", height: 760 },
];

const snippetFor = (slug: string, name: string, height: number) =>
  `<iframe src="${BASE}/test/${slug}/" title="${name}" loading="lazy" style="width:100%;height:${height}px;border:1px solid #e2e8f0;border-radius:12px;"></iframe>
<p style="font-size:13px;margin-top:6px;">Quiz: <a href="${BASE}/test/${slug}/">${name}</a> by <a href="${BASE}/">Test Archive</a></p>`;

const EmbedATest = () => {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const copySnippet = async (slug: string, name: string, height: number) => {
    try {
      await navigator.clipboard.writeText(snippetFor(slug, name, height));
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Embed a Test", path: "/embed-a-test/" },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Embed a Free Personality Test on Your Website"
        description="Add a free interactive quiz to your blog, newsletter, or classroom page with one copy-paste snippet. No sign-up, no API key — pick a test and embed it."
        path="/embed-a-test/"
        jsonLd={[breadcrumbSchema]}
      />
      <Header />

      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <Code2 className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Embed a Test on Your Site</h1>
            <p className="text-lg text-muted-foreground">
              Running a blog, newsletter, or classroom page? Drop any of our interactive tests into
              your post with one snippet — free, no sign-up, no API key. Just keep the small credit
              line under the quiz.
            </p>
          </div>

          <div className="space-y-6">
            {embeddableTests.map((t) => (
              <div key={t.slug} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h2 className="font-semibold">{t.name}</h2>
                  <button
                    onClick={() => copySnippet(t.slug, t.name, t.height)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:border-primary/40 transition-colors cursor-pointer"
                  >
                    {copiedSlug === t.slug ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-primary" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy snippet
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-xs bg-muted/50 border border-border rounded-lg p-3 overflow-x-auto whitespace-pre-wrap break-all text-muted-foreground">
                  {snippetFor(t.slug, t.name, t.height)}
                </pre>
              </div>
            ))}
          </div>

          <div className="mt-12 p-5 rounded-xl bg-muted/30 border border-border">
            <h2 className="font-semibold mb-2">Embed terms (the short version)</h2>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
              <li>Free for blogs, newsletters, classrooms, and non-commercial pages.</li>
              <li>Keep the credit line with links intact — that's the whole deal.</li>
              <li>Don't present the tests as clinical or diagnostic tools; they are for entertainment and self-reflection.</li>
              <li>We may update tests over time; embeds always show the latest version automatically.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmbedATest;
