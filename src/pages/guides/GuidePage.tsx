import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import CollapsibleFAQ from "@/components/CollapsibleFAQ";
import { SEOHead, createBreadcrumbSchema, createFAQSchema } from "@/components/SEOHead";
import { getGuide, guides } from "@/data/guides";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import NotFound from "@/pages/NotFound";

const GuidePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? getGuide(slug) : undefined;

  if (!guide) return <NotFound />;

  const path = `/guides/${guide.slug}/`;

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides/" },
    { name: guide.title, path },
  ]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.seoDescription,
    datePublished: guide.datePublished,
    author: { "@type": "Organization", name: "Test Archive" },
    publisher: { "@type": "Organization", name: "Test Archive" },
    mainEntityOfPage: `https://www.test-archive.com${path}`,
  };

  const faqSchema = createFAQSchema(guide.faqs);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title={guide.seoTitle}
        description={guide.seoDescription}
        path={path}
        ogType="article"
        jsonLd={[breadcrumbSchema, articleSchema, faqSchema]}
      />
      <Header />

      <main className="flex-1 container mx-auto px-4 py-10">
        <article className="max-w-2xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/guides/" className="hover:text-primary transition-colors">Guides</Link>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                <BookOpen className="w-3.5 h-3.5" />
                {guide.category}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {guide.readMinutes} min read
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{guide.title}</h1>
          </div>

          {/* Intro */}
          <div className="space-y-4 mb-10">
            {guide.intro.map((p, i) => (
              <p key={i} className="text-lg text-muted-foreground leading-relaxed">{p}</p>
            ))}
          </div>

          {/* Sections */}
          <div className="space-y-10 mb-10">
            {guide.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-2xl font-bold mb-4">{s.heading}</h2>
                <div className="space-y-4">
                  {s.paragraphs.map((p, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* CTA */}
          <div className="p-6 rounded-xl border border-primary/30 bg-primary/5 text-center mb-10">
            <p className="text-muted-foreground mb-4">{guide.cta.line}</p>
            <Button asChild size="lg">
              <Link to={guide.cta.testPath} className="gap-2">
                {guide.cta.testLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* FAQ */}
          <div className="mb-10">
            <CollapsibleFAQ faqs={guide.faqs} title="Frequently Asked Questions" />
          </div>

          {/* Related */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Keep Exploring</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {guide.related.map((r) => (
                <Link
                  key={r.to}
                  to={r.to}
                  className="flex items-center justify-between gap-2 p-4 rounded-lg border border-border bg-card hover:border-primary/40 transition-colors cursor-pointer"
                >
                  <span className="font-medium text-sm">{r.label}</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-10">
            For entertainment and self-reflection purposes only. Not a clinical, diagnostic, or professional assessment.
          </p>
        </article>
      </main>
    </div>
  );
};

export default GuidePage;
