import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import {
  politicalCompassQuestions,
  answerOptions,
  AnswerValue,
} from "@/data/politicalCompassQuestions";
import { ArrowLeft, CheckCircle2, RotateCcw, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CompassResult {
  economic: number; // -10 ~ +10 (Left ~ Right)
  social: number; // -10 ~ +10 (Libertarian ~ Authoritarian)
}

const getQuadrantLabel = (economic: number, social: number): string => {
  const isLeft = economic < 0;
  const isAuthoritarian = social > 0;

  if (isLeft && isAuthoritarian) return "좌파 권위주의";
  if (!isLeft && isAuthoritarian) return "우파 권위주의";
  if (isLeft && !isAuthoritarian) return "좌파 자유주의";
  return "우파 자유주의";
};

const getQuadrantDescription = (economic: number, social: number): string => {
  const isLeft = economic < 0;
  const isAuthoritarian = social > 0;

  if (isLeft && isAuthoritarian) {
    return "국가 주도의 경제 개입과 강력한 중앙 권력을 선호합니다. 평등을 위한 정부의 적극적인 역할을 지지합니다.";
  }
  if (!isLeft && isAuthoritarian) {
    return "자유 시장 경제와 전통적 가치, 강력한 국가 권위를 지지합니다. 질서와 안정을 중시합니다.";
  }
  if (isLeft && !isAuthoritarian) {
    return "경제적 평등과 개인의 자유를 모두 중시합니다. 진보적 가치와 사회적 자유를 지지합니다.";
  }
  return "자유 시장 경제와 개인의 자유를 모두 중시합니다. 정부의 개입을 최소화하고 개인의 권리를 존중합니다.";
};

const PoliticalCompassTest = () => {
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [showResults, setShowResults] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = politicalCompassQuestions.length;

  const handleAnswer = (questionId: number, value: AnswerValue) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const calculateResult = (): CompassResult => {
    let economicScore = 0;
    let socialScore = 0;

    const economicQuestions = politicalCompassQuestions.filter(
      (q) => q.category === "economic"
    );
    const socialQuestions = politicalCompassQuestions.filter(
      (q) => q.category === "social"
    );

    economicQuestions.forEach((q) => {
      economicScore += answers[q.id] || 0;
    });

    socialQuestions.forEach((q) => {
      socialScore += answers[q.id] || 0;
    });

    // Normalize to -10 ~ +10 scale
    const maxEconomicScore = economicQuestions.length * 2;
    const maxSocialScore = socialQuestions.length * 2;

    return {
      economic: (economicScore / maxEconomicScore) * 10,
      social: (socialScore / maxSocialScore) * 10,
    };
  };

  const handleSubmit = () => {
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = async () => {
    const result = calculateResult();
    const quadrant = getQuadrantLabel(result.economic, result.social);
    const shareText = `나의 정치 성향: ${quadrant}\n경제: ${result.economic > 0 ? "우파" : "좌파"} (${result.economic.toFixed(1)})\n사회: ${result.social > 0 ? "권위주의" : "자유주의"} (${result.social.toFixed(1)})`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Political Compass Test 결과",
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      alert("결과가 클립보드에 복사되었습니다!");
    }
  };

  if (showResults) {
    const result = calculateResult();
    const quadrant = getQuadrantLabel(result.economic, result.social);
    const description = getQuadrantDescription(result.economic, result.social);

    // Calculate position for the dot (convert from -10~10 to 0~100%)
    const dotX = ((result.economic + 10) / 20) * 100;
    const dotY = ((result.social + 10) / 20) * 100;

    return (
      <div className="min-h-screen gradient-hero">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            테스트 목록으로
          </Link>

          <div className="test-card text-center animate-scale-in max-w-lg mx-auto">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
              당신의 정치 성향
            </h2>
            <div className="text-3xl font-display font-bold text-gradient mb-4">
              {quadrant}
            </div>
            <p className="text-muted-foreground mb-8 text-sm">{description}</p>

            {/* Compass Chart */}
            <div className="relative w-full aspect-square max-w-[300px] mx-auto mb-8">
              {/* Background quadrants */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                <div className="bg-red-500/20 rounded-tl-lg flex items-center justify-center text-xs text-muted-foreground">
                  좌파 권위주의
                </div>
                <div className="bg-blue-500/20 rounded-tr-lg flex items-center justify-center text-xs text-muted-foreground">
                  우파 권위주의
                </div>
                <div className="bg-green-500/20 rounded-bl-lg flex items-center justify-center text-xs text-muted-foreground">
                  좌파 자유주의
                </div>
                <div className="bg-purple-500/20 rounded-br-lg flex items-center justify-center text-xs text-muted-foreground">
                  우파 자유주의
                </div>
              </div>

              {/* Axes */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

              {/* Axis labels */}
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full text-xs text-muted-foreground">
                좌파
              </div>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full text-xs text-muted-foreground">
                우파
              </div>
              <div className="absolute left-1/2 -top-2 -translate-x-1/2 -translate-y-full text-xs text-muted-foreground">
                권위주의
              </div>
              <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 translate-y-full text-xs text-muted-foreground">
                자유주의
              </div>

              {/* Result dot */}
              <div
                className="absolute w-4 h-4 bg-primary rounded-full shadow-lg border-2 border-white transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{
                  left: `${dotX}%`,
                  top: `${dotY}%`,
                }}
              />
            </div>

            {/* Scores */}
            <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="text-muted-foreground mb-1">경제 (좌/우)</div>
                <div className="font-semibold">
                  {result.economic > 0 ? "우파" : "좌파"} (
                  {result.economic.toFixed(1)})
                </div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="text-muted-foreground mb-1">
                  사회 (권위/자유)
                </div>
                <div className="font-semibold">
                  {result.social > 0 ? "권위주의" : "자유주의"} (
                  {result.social.toFixed(1)})
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Button onClick={handleReset} variant="outline" className="gap-2">
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
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          테스트 목록으로
        </Link>

        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Political Compass Test
            </h1>
            <p className="text-muted-foreground">
              각 질문에 대한 동의 정도를 선택하세요. 정치적 성향을 2차원
              좌표로 분석합니다.
            </p>
          </div>

          {/* Progress */}
          <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md py-4 mb-6 -mx-4 px-4">
            <ProgressBar current={answeredCount} total={totalQuestions} />
          </div>

          {/* Questions */}
          <div className="space-y-4 mb-8">
            {politicalCompassQuestions.map((question, index) => (
              <div
                key={question.id}
                className="test-card animate-fade-in"
                style={{ animationDelay: `${Math.min(index * 30, 500)}ms` }}
              >
                <div className="flex gap-3 mb-4">
                  <span className="text-xs font-medium text-muted-foreground min-w-[28px]">
                    {index + 1}.
                  </span>
                  <span className="text-sm text-foreground">{question.text}</span>
                </div>

                <div className="flex flex-wrap gap-2 ml-8">
                  {answerOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(question.id, option.value)}
                      className={cn(
                        "px-3 py-1.5 text-xs rounded-full border transition-all duration-200",
                        answers[question.id] === option.value
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="text-center pb-12">
            <Button
              onClick={handleSubmit}
              size="lg"
              disabled={answeredCount < totalQuestions}
              className="gradient-primary border-0 gap-2 px-8 shadow-elevated hover:shadow-card transition-all duration-300 disabled:opacity-50"
            >
              <CheckCircle2 className="w-5 h-5" />
              결과 확인하기
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              {answeredCount}/{totalQuestions}개 질문 응답 완료
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PoliticalCompassTest;
