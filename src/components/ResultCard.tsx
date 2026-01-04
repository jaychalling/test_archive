import { Button } from "@/components/ui/button";
import { RotateCcw, Share2 } from "lucide-react";

interface ResultCardProps {
  score: number;
  onReset: () => void;
}

const getScoreMessage = (score: number): { title: string; description: string; emoji: string } => {
  if (score >= 97) return { title: "Pure as Snow", description: "당신은 정말 순수하군요!", emoji: "😇" };
  if (score >= 94) return { title: "Very Pure", description: "매우 깨끗한 영혼의 소유자입니다.", emoji: "😊" };
  if (score >= 77) return { title: "Average", description: "평범한 경험을 가지고 있네요.", emoji: "🙂" };
  if (score >= 45) return { title: "Experienced", description: "꽤 다양한 경험을 해보셨군요.", emoji: "😏" };
  if (score >= 9) return { title: "Wild One", description: "자유로운 영혼이시네요!", emoji: "🔥" };
  return { title: "Legendary", description: "전설적인 경험의 소유자!", emoji: "👑" };
};

const ResultCard = ({ score, onReset }: ResultCardProps) => {
  const { title, description, emoji } = getScoreMessage(score);

  const handleShare = async () => {
    const shareText = `나의 Rice Purity Test 점수: ${score}점! ${title} ${emoji}`;
    
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
    <div className="test-card text-center animate-scale-in max-w-md mx-auto">
      <div className="text-6xl mb-4">{emoji}</div>
      
      <div className="mb-6">
        <div className="text-7xl font-display font-bold text-gradient mb-2">
          {score}
        </div>
        <div className="text-sm text-muted-foreground">/ 100</div>
      </div>
      
      <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
        {title}
      </h2>
      <p className="text-muted-foreground mb-8">
        {description}
      </p>
      
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
