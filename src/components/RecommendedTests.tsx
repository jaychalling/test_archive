import { Link } from "react-router-dom";
import { Users, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecommendedTest {
  title: string;
  description: string;
  url: string;
  icon?: string;
  reason?: string;
}

interface RecommendedTestsProps {
  tests: RecommendedTest[];
  title?: string;
  subtitle?: string;
}

const RecommendedTests = ({
  tests,
  title = "People Like You Also Took...",
  subtitle
}: RecommendedTestsProps) => {
  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
        </div>
        {subtitle && (
          <p className="text-sm text-muted-foreground ml-7">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid gap-4 mb-6">
        {tests.map((test, index) => (
          <Link
            key={index}
            to={test.url}
            className="group p-4 rounded-lg bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {test.icon || "📊"}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {test.title}
                  </h4>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  {test.description}
                </p>
                {test.reason && (
                  <div className="flex items-start gap-2 mt-2">
                    <Sparkles className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-primary font-medium">
                      {test.reason}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">85%</span> of users with your profile found these tests insightful
          </p>
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              Browse All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecommendedTests;
