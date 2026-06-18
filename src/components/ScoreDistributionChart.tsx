import { TrendingUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPercentile, getTestStatistics, type TestStatistics } from "@/lib/percentile";

interface ScoreDistributionChartProps {
  userScore: number;
  maxScore: number;
  testName: string;
  colorClass?: string;
  /**
   * Lower bound of the score scale (default 0). Tests whose scale does not start
   * at zero (e.g. mental age 10-80) MUST pass it so the percentile here matches
   * the shared OG card (which normalizes (score-min)/(max-min)).
   */
  minScore?: number;
  /** optional axis labels (e.g. mental-age 10/45/80); currently informational */
  customLabels?: { low: string; mid: string; high: string };
  /** optional per-call distribution override (informational; engine uses testStatistics) */
  distributionMean?: number;
  distributionStdDev?: number;
}

const getAverageScore = (minScore: number, maxScore: number, stats: TestStatistics): number => {
  // mean back on the raw scale: min + meanPercent% of the (max-min) span
  return Math.round(minScore + (maxScore - minScore) * (stats.meanPercent / 100));
};

const ScoreDistributionChart = ({
  userScore,
  maxScore,
  testName,
  colorClass = "bg-primary",
  minScore = 0,
}: ScoreDistributionChartProps) => {
  const stats = getTestStatistics(testName);
  const span = maxScore - minScore;
  const userPercentage = ((userScore - minScore) / span) * 100;
  const averageScore = getAverageScore(minScore, maxScore, stats);
  const averagePercentage = ((averageScore - minScore) / span) * 100;
  const percentile = getPercentile(userScore, maxScore, stats, minScore);

  const isAboveAverage = userScore > averageScore;
  const scoreDifference = Math.abs(userScore - averageScore);

  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold text-foreground">How You Compare</h3>
      </div>

      <div className="space-y-6">
        {/* User Score Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">Your Score</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                You
              </span>
            </div>
            <span className="text-lg font-bold text-primary">
              {userScore} / {maxScore}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-1000 ease-out", colorClass)}
              style={{ width: `${userPercentage}%` }}
            />
          </div>
        </div>

        {/* Average Score Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Global Average</span>
            </div>
            <span className="text-sm font-semibold text-muted-foreground">
              {averageScore} / {maxScore}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-muted-foreground/40 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${averagePercentage}%` }}
            />
          </div>
        </div>

        {/* Comparison Message */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-start gap-3">
            <div className={cn(
              "p-2 rounded-lg flex-shrink-0",
              isAboveAverage ? "bg-green-500/10" : "bg-blue-500/10"
            )}>
              <TrendingUp className={cn(
                "w-5 h-5",
                isAboveAverage ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"
              )} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground mb-1">
                {isAboveAverage ? (
                  <>You scored <span className="text-green-600 dark:text-green-400">above average</span>!</>
                ) : (
                  <>You're in the <span className="text-blue-600 dark:text-blue-400">average range</span></>
                )}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your score is{" "}
                <span className="font-semibold text-foreground">{scoreDifference} points</span>{" "}
                {isAboveAverage ? "higher" : "lower"} than the global average.
                You performed better than approximately{" "}
                <span className="font-semibold text-foreground">{percentile}%</span> of test-takers.
              </p>
            </div>
          </div>
        </div>

        {/* Percentile Badge */}
        <div className="flex items-center justify-center">
          <div className="px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{percentile}th</div>
              <div className="text-xs font-medium text-muted-foreground">Percentile</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreDistributionChart;
