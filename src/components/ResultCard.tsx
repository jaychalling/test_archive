import { Button } from "@/components/ui/button";
import { RotateCcw, Share2, CheckCircle2, BookOpen, Lightbulb, History } from "lucide-react";
import { getScoreRange, testBackground } from "@/data/ricePurityQuestions";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  score: number;
  onReset: () => void;
}

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-600", border: "border-emerald-500" },
  green: { bg: "bg-green-500/10", text: "text-green-600", border: "border-green-500" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-600", border: "border-blue-500" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-600", border: "border-amber-500" },
  orange: { bg: "bg-orange-500/10", text: "text-orange-600", border: "border-orange-500" },
  red: { bg: "bg-red-500/10", text: "text-red-600", border: "border-red-500" },
};

const ResultCard = ({ score, onReset }: ResultCardProps) => {
  const scoreRange = getScoreRange(score);
  const colors = colorClasses[scoreRange.color] || colorClasses.blue;

  const handleShare = async () => {
    const shareText = `나의 Rice Purity Test 점수: ${score}점! ${scoreRange.title} ${scoreRange.emoji}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Rice Purity Test 결과',
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      alert('결과가 클립보드에 복사되었습니다!');
    }
  };

  return (
    <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
      {/* Score Display */}
      <div className="text-6xl mb-4">{scoreRange.emoji}</div>

      <div className="mb-6">
        <div className="text-7xl font-display font-bold text-gradient mb-2">
          {score}
        </div>
        <div className="text-sm text-muted-foreground">/ 100</div>
      </div>

      <h2 className="font-display text-2xl font-semibold text-foreground mb-1">
        {scoreRange.title}
      </h2>
      <p className={cn("text-lg font-medium mb-2", colors.text)}>
        {scoreRange.titleKo}
      </p>
      <p className="text-muted-foreground mb-8">
        {scoreRange.description}
      </p>

      {/* Detailed Description */}
      <div className={cn("text-left p-6 rounded-xl mb-6", colors.bg)}>
        <h3 className={cn("font-semibold mb-4 text-lg flex items-center gap-2", colors.text)}>
          <BookOpen className="w-5 h-5" />
          상세 분석
        </h3>
        <p className="text-foreground leading-relaxed">
          {scoreRange.detailedDescription}
        </p>
      </div>

      {/* Interpretation */}
      <div className="text-left p-6 rounded-xl bg-purple-500/10 mb-6">
        <h3 className="font-semibold text-purple-600 mb-4 text-lg flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          결과 해석
        </h3>
        <p className="text-foreground leading-relaxed">
          {scoreRange.interpretation}
        </p>
      </div>

      {/* Characteristics & Tips */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="text-left p-5 rounded-xl bg-blue-500/10">
          <h3 className="font-semibold text-blue-600 mb-4">일반적인 특성</h3>
          <ul className="space-y-2">
            {scoreRange.commonCharacteristics.map((char, idx) => (
              <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                {char}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-left p-5 rounded-xl bg-green-500/10">
          <h3 className="font-semibold text-green-600 mb-4">라이프스타일 팁</h3>
          <ul className="space-y-2">
            {scoreRange.lifestyleTips.map((tip, idx) => (
              <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Test Background */}
      <div className="text-left p-6 rounded-xl bg-muted/30 mb-8">
        <h3 className="font-semibold text-foreground mb-4 text-lg flex items-center gap-2">
          <History className="w-5 h-5" />
          Rice Purity Test에 대하여
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">역사</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {testBackground.history}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">목적</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {testBackground.purpose}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <h4 className="font-medium text-amber-600 mb-2">참고사항</h4>
            <p className="text-sm text-foreground leading-relaxed">
              {testBackground.disclaimer}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <Button
          onClick={onReset}
          variant="outline"
          className="gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          다시하기
        </Button>
        <Button
          onClick={handleShare}
          className="gap-2 gradient-primary border-0"
        >
          <Share2 className="w-4 h-4" />
          공유하기
        </Button>
      </div>
    </div>
  );
};

export default ResultCard;
