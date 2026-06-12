import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import { BarChart3, Link2, Check, ArrowRight } from "lucide-react";

/**
 * Linkable statistics asset — aggregated population norms for the tests we run.
 * Numbers follow the project's data-integrity reference (.claude/skills/statistical-data),
 * which curates published research and large-scale survey figures.
 */

interface StatRow {
  label: string;
  value: string;
  pct?: number; // 0-100 bar width when visualizable
}

interface StatSection {
  id: string;
  title: string;
  source: string;
  note?: string;
  rows: StatRow[];
  testPath: string;
  testLabel: string;
}

const sections: StatSection[] = [
  {
    id: "rice-purity",
    title: "Rice Purity Score — Averages",
    source: "Aggregated from informal large-scale polls and campus surveys (self-reported)",
    note: "Scores count life experiences, so averages fall steadily with age.",
    rows: [
      { label: "Global average (all takers)", value: "≈ 64", pct: 64 },
      { label: "High school students", value: "≈ 90+", pct: 90 },
      { label: "Under 25", value: "85–91", pct: 88 },
      { label: "College / young adults", value: "70–80", pct: 75 },
      { label: "Men (US, all ages)", value: "≈ 56", pct: 56 },
      { label: "Women (US, all ages)", value: "≈ 60", pct: 60 },
    ],
    testPath: "/test/rice-purity/",
    testLabel: "Rice Purity Test",
  },
  {
    id: "16-types",
    title: "16 Personality Types — Population Share",
    source: "Published type-distribution estimates (US population samples)",
    rows: [
      { label: "ISFJ — most common type", value: "13.8%", pct: 13.8 },
      { label: "ESFJ", value: "12.0%", pct: 12 },
      { label: "ISTJ", value: "11.6%", pct: 11.6 },
      { label: "ISFP", value: "8.8%", pct: 8.8 },
      { label: "ESFP", value: "8.5%", pct: 8.5 },
      { label: "ENFP — most common intuitive type", value: "8.1%", pct: 8.1 },
      { label: "INFP", value: "4.4%", pct: 4.4 },
      { label: "INTJ", value: "2.1%", pct: 2.1 },
      { label: "ENTJ", value: "1.8%", pct: 1.8 },
      { label: "INFJ — rarest type", value: "1.5%", pct: 1.5 },
    ],
    testPath: "/test/16-personality-test/",
    testLabel: "16 Personalities Test",
  },
  {
    id: "attachment",
    title: "Attachment Styles — Distribution",
    source: "Ranges across published attachment research samples",
    rows: [
      { label: "Secure", value: "50–65%", pct: 58 },
      { label: "Avoidant (dismissive)", value: "15–25%", pct: 20 },
      { label: "Anxious (preoccupied)", value: "5–20%", pct: 13 },
      { label: "Fearful-avoidant", value: "5–24%", pct: 14 },
    ],
    testPath: "/test/attachment-style-test/",
    testLabel: "Attachment Style Test",
  },
  {
    id: "enneagram",
    title: "Enneagram Types — Population Share",
    source: "Published enneagram survey estimates",
    rows: [
      { label: "Type 1 — Reformer", value: "16.3%", pct: 16.3 },
      { label: "Type 9 — Peacemaker", value: "16.2%", pct: 16.2 },
      { label: "Type 6 — Loyalist", value: "16.1%", pct: 16.1 },
      { label: "Type 3 — Achiever", value: "≈ 10%", pct: 10 },
      { label: "Type 4 — Individualist", value: "≈ 10%", pct: 10 },
      { label: "Type 7 — Enthusiast", value: "9%", pct: 9 },
      { label: "Type 2 — Helper", value: "8.5%", pct: 8.5 },
      { label: "Type 8 — Challenger", value: "6.3%", pct: 6.3 },
      { label: "Type 5 — Investigator (rarest)", value: "4.8%", pct: 4.8 },
    ],
    testPath: "/test/enneagram-test/",
    testLabel: "Enneagram Test",
  },
  {
    id: "love-language",
    title: "Love Languages — How Common Is Each?",
    source: "Large-scale love-language survey results",
    rows: [
      { label: "Quality Time — most common", value: "38–40%", pct: 39 },
      { label: "Physical Touch", value: "24%", pct: 24 },
      { label: "Words of Affirmation", value: "19%", pct: 19 },
      { label: "Acts of Service", value: "16%", pct: 16 },
      { label: "Receiving Gifts — least common", value: "10%", pct: 10 },
    ],
    testPath: "/test/love-language-test/",
    testLabel: "Love Language Test",
  },
  {
    id: "introvert-extrovert",
    title: "Introverts, Extroverts, and Ambiverts",
    source: "Personality research on the introversion–extraversion spectrum",
    note: "Most people are neither extreme — the middle of the spectrum is the majority.",
    rows: [
      { label: "Ambiverts (middle of spectrum)", value: "68–77%", pct: 72 },
      { label: "Clear extroverts", value: "12–16%", pct: 14 },
      { label: "Clear introverts", value: "5–16%", pct: 11 },
    ],
    testPath: "/test/introvert-extrovert-test/",
    testLabel: "Introvert vs Extrovert Test",
  },
  {
    id: "eq",
    title: "Emotional Intelligence (EQ)",
    source: "Standardized EQ assessment norms",
    rows: [
      { label: "Population with high EQ", value: "≈ 36%", pct: 36 },
      { label: "Top performers with high EQ", value: "≈ 90%", pct: 90 },
      { label: "Standard score distribution", value: "Mean 100, SD 15" },
    ],
    testPath: "/test/emotional-intelligence-test/",
    testLabel: "Emotional Intelligence Test",
  },
];

const PAGE_URL = "https://www.test-archive.com/stats/";

const Stats = () => {
  const [copied, setCopied] = useState(false);

  const copyCitation = async () => {
    try {
      await navigator.clipboard.writeText(
        `Personality Test Statistics & Population Norms — Test Archive: ${PAGE_URL}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Statistics", path: "/stats/" },
  ]);

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Personality Test Statistics & Population Norms",
    description:
      "Aggregated population distributions and averages for popular personality and lifestyle tests: rice purity scores by age, 16 personality type frequencies, attachment styles, enneagram types, love languages, and more.",
    url: PAGE_URL,
    creator: { "@type": "Organization", name: "Test Archive" },
    license: "https://www.test-archive.com/terms/",
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Personality Test Statistics & Population Norms (2026)"
        description="How rare is your personality type? Average rice purity score by age, 16-type population share, attachment style and love language distributions — all in one reference page."
        path="/stats/"
        jsonLd={[breadcrumbSchema, datasetSchema]}
      />
      <Header />

      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <BarChart3 className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Personality Test Statistics &amp; Population Norms
            </h1>
            <p className="text-lg text-muted-foreground">
              How common is your result? The reference numbers behind every test on this site,
              aggregated from published research and large-scale surveys.
            </p>
          </div>

          {/* Cite box — invite the link */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <button
              onClick={copyCitation}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium hover:border-primary/40 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-primary" /> : <Link2 className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy citation link"}
            </button>
            <span className="text-xs text-muted-foreground">
              Writers &amp; researchers: you're welcome to cite this page.
            </span>
          </div>

          <div className="space-y-12">
            {sections.map((s) => (
              <section key={s.id} id={s.id}>
                <h2 className="text-2xl font-bold mb-1">{s.title}</h2>
                <p className="text-xs text-muted-foreground mb-4">{s.source}</p>
                {s.note && (
                  <p className="text-sm text-muted-foreground mb-4">{s.note}</p>
                )}

                <div className="rounded-xl border border-border bg-card divide-y divide-border">
                  {s.rows.map((r) => (
                    <div key={r.label} className="px-4 py-3">
                      <div className="flex items-center justify-between gap-4 mb-1.5">
                        <span className="text-sm font-medium">{r.label}</span>
                        <span className="text-sm font-semibold text-primary whitespace-nowrap">{r.value}</span>
                      </div>
                      {typeof r.pct === "number" && (
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary/70"
                            style={{ width: `${Math.min(100, r.pct)}%` }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <Link
                  to={s.testPath}
                  className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-primary hover:underline cursor-pointer"
                >
                  See where you land — {s.testLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </section>
            ))}
          </div>

          <div className="mt-14 p-5 rounded-xl bg-muted/30 border border-border">
            <h2 className="font-semibold mb-2">About these numbers</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Figures on this page aggregate published research, standardized assessment norms, and
              large-scale survey results; where formal research is unavailable (such as rice purity
              averages), we rely on widely reported informal polls and label them as such. All
              values are population-level estimates, not guarantees about any individual — and the
              tests on this site are for entertainment and self-reflection, not clinical assessment.
              Last reviewed: June 2026.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Stats;
