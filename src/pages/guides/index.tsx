import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import { guides } from "@/data/guides";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

const GuidesHub = () => {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides/" },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Guides - What Your Test Results Really Mean"
        description="Score meanings, averages, and plain-language explainers behind every test on Test Archive. Understand your results before (or after) you take the quiz."
        path="/guides/"
        jsonLd={[breadcrumbSchema]}
      />
      <Header />

      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Guides</h1>
            <p className="text-lg text-muted-foreground">
              What the scores, types, and quadrants actually mean — in plain language.
            </p>
          </div>

          <div className="grid gap-4">
            {guides.map((g) => (
              <Link
                key={g.slug}
                to={`/guides/${g.slug}/`}
                className="group p-6 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    <BookOpen className="w-3.5 h-3.5" />
                    {g.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {g.readMinutes} min
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {g.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {g.seoDescription}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read guide
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuidesHub;
