import { Star, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Celebrity {
  name: string;
  score: number;
  description: string;
  avatar?: string; // emoji or image URL
}

interface CelebrityComparisonProps {
  userScore: number;
  celebrities: Celebrity[];
  maxScore: number;
  title?: string;
}

const CelebrityComparison = ({
  userScore,
  celebrities,
  maxScore,
  title = "Your Score is Similar To..."
}: CelebrityComparisonProps) => {
  // Find closest celebrity match
  const closestCelebrity = celebrities.reduce((closest, current) => {
    const currentDiff = Math.abs(current.score - userScore);
    const closestDiff = Math.abs(closest.score - userScore);
    return currentDiff < closestDiff ? current : closest;
  });

  // Get other similar celebrities (within 10 points)
  const similarCelebrities = celebrities
    .filter(c => c.name !== closestCelebrity.name && Math.abs(c.score - userScore) <= 10)
    .slice(0, 3);

  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
      <div className="flex items-center gap-2 mb-6">
        <Star className="w-5 h-5 text-amber-600 dark:text-amber-400 fill-amber-600 dark:fill-amber-400" />
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>

      {/* Main Celebrity Match */}
      <div className="mb-6 p-5 rounded-lg bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/20">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-3xl shadow-lg">
              {closestCelebrity.avatar || "⭐"}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-lg font-bold text-foreground">{closestCelebrity.name}</h4>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-semibold">
                Best Match
              </span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                Score: {closestCelebrity.score}/{maxScore}
              </span>
              <span className="text-xs text-muted-foreground">
                (±{Math.abs(closestCelebrity.score - userScore)} from yours)
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {closestCelebrity.description}
            </p>
          </div>
        </div>
      </div>

      {/* Other Similar Profiles */}
      {similarCelebrities.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <h4 className="text-sm font-semibold text-foreground">
              Other Similar Profiles
            </h4>
          </div>

          <div className="grid gap-3">
            {similarCelebrities.map((celebrity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-xl">
                  {celebrity.avatar || "✨"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-sm text-foreground truncate">
                      {celebrity.name}
                    </p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {celebrity.score}/{maxScore}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {celebrity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-6 pt-4 border-t border-amber-500/20">
        <p className="text-xs text-center text-muted-foreground italic">
          Comparisons are for entertainment purposes only and based on estimated scores.
        </p>
      </div>
    </div>
  );
};

export default CelebrityComparison;
