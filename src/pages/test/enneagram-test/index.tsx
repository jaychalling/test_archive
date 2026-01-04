import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import {
  enneagramQuestions,
  answerOptions,
  AnswerValue,
  EnneagramType,
  EnneagramResult,
  enneagramTypeInfo,
  typeColors,
  typeTextColors,
  typeBgColors,
  typeOrder,
  getWing,
  getCenter,
  centerInfo,
} from "@/data/enneagramQuestions";
import { ArrowLeft, CheckCircle2, RotateCcw, Share2, Circle } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const calculateResults = (answers: Record<number, AnswerValue>): EnneagramResult => {
  const typeScores: Record<EnneagramType, { sum: number; count: number }> = {
    1: { sum: 0, count: 0 },
    2: { sum: 0, count: 0 },
    3: { sum: 0, count: 0 },
    4: { sum: 0, count: 0 },
    5: { sum: 0, count: 0 },
    6: { sum: 0, count: 0 },
    7: { sum: 0, count: 0 },
    8: { sum: 0, count: 0 },
    9: { sum: 0, count: 0 },
  };

  enneagramQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      typeScores[question.type].sum += answer;
      typeScores[question.type].count++;
    }
  });

  // 0-100 점수로 변환 (각 유형당 4문항, 각 1-5점)
  const calculatePercentage = (sum: number, count: number): number => {
    if (count === 0) return 0;
    const maxPossible = count * 5;
    const minPossible = count * 1;
    return Math.round(((sum - minPossible) / (maxPossible - minPossible)) * 100);
  };

  const scores = {} as Record<EnneagramType, number>;
  (Object.keys(typeScores) as unknown as EnneagramType[]).forEach((type) => {
    const numType = Number(type) as EnneagramType;
    scores[numType] = calculatePercentage(typeScores[numType].sum, typeScores[numType].count);
  });

  // 가장 높은 점수를 가진 유형 찾기
  let mainType: EnneagramType = 1;
  let maxScore = scores[1];
  (Object.keys(scores) as unknown as EnneagramType[]).forEach((type) => {
    const numType = Number(type) as EnneagramType;
    if (scores[numType] > maxScore) {
      maxScore = scores[numType];
      mainType = numType;
    }
  });

  const wing = getWing(mainType, scores);

  return {
    scores,
    mainType,
    wing,
  };
};

const EnneagramTest = () => {
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [showResults, setShowResults] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = enneagramQuestions.length;

  const handleAnswer = (questionId: number, value: AnswerValue) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
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
    const result = calculateResults(answers);
    const mainInfo = enneagramTypeInfo[result.mainType];
    const wingText = result.wing ? `w${result.wing}` : "";

    const shareText = `나의 에니어그램 테스트 결과

주요 유형: ${mainInfo.name} - ${mainInfo.title}${wingText ? ` (날개: ${wingText})` : ""}

핵심 동기: ${mainInfo.coreMotivation}
핵심 두려움: ${mainInfo.coreFear}

성장 방향: ${mainInfo.growthDirection}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "에니어그램 테스트 결과",
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
    const result = calculateResults(answers);
    const mainInfo = enneagramTypeInfo[result.mainType];
    const wingInfo = result.wing ? enneagramTypeInfo[result.wing] : null;
    const center = getCenter(result.mainType);
    const centerData = centerInfo[center];

    // 에니어그램 원형 다이어그램 좌표 계산
    const circleRadius = 38;
    const centerX = 50;
    const centerY = 50;

    const getTypePosition = (type: EnneagramType) => {
      // 9가 상단(12시 방향)에 오도록 배치
      const index = typeOrder.indexOf(type);
      const angle = (index * 2 * Math.PI) / 9 - Math.PI / 2;
      return {
        x: centerX + circleRadius * Math.cos(angle),
        y: centerY + circleRadius * Math.sin(angle),
      };
    };

    // 에니어그램 연결선 (내부 삼각형과 육각형)
    const innerConnections = [
      [3, 6, 9], // 삼각형
      [1, 4, 2, 8, 5, 7, 1], // 육각형 (헥사드)
    ];

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

          <div className="test-card text-center animate-scale-in max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Circle className="w-6 h-6 text-primary" />
              <h2 className="font-display text-2xl font-semibold text-foreground">
                당신의 에니어그램 결과
              </h2>
            </div>

            {/* Main Type */}
            <div className={cn("p-6 rounded-xl bg-gradient-to-br mb-6", typeBgColors[result.mainType])}>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl", typeColors[result.mainType])}>
                  {result.mainType}
                </div>
                <div className="text-left">
                  <p className={cn("text-xl font-bold", typeTextColors[result.mainType])}>
                    {mainInfo.title}
                  </p>
                  {result.wing && (
                    <p className="text-sm text-muted-foreground">
                      날개: {result.wing}w ({wingInfo?.title.split(" ")[0]})
                    </p>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                센터: {centerData.name} - 핵심 감정: {centerData.emotion}
              </p>
            </div>

            {/* Enneagram Circle Diagram */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-foreground mb-4">에니어그램 다이어그램</h3>
              <div className="relative w-full max-w-[280px] mx-auto aspect-square">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Outer circle */}
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r={circleRadius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-border"
                  />

                  {/* Inner connections - Triangle (3-6-9) */}
                  <path
                    d={innerConnections[0]
                      .map((type, i) => {
                        const pos = getTypePosition(type as EnneagramType);
                        return i === 0 ? `M ${pos.x} ${pos.y}` : `L ${pos.x} ${pos.y}`;
                      })
                      .join(" ") + " Z"}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.3"
                    className="text-muted-foreground/50"
                  />

                  {/* Inner connections - Hexad (1-4-2-8-5-7-1) */}
                  <path
                    d={innerConnections[1]
                      .map((type, i) => {
                        const pos = getTypePosition(type as EnneagramType);
                        return i === 0 ? `M ${pos.x} ${pos.y}` : `L ${pos.x} ${pos.y}`;
                      })
                      .join(" ")}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.3"
                    className="text-muted-foreground/50"
                  />

                  {/* Type circles */}
                  {typeOrder.map((type) => {
                    const pos = getTypePosition(type);
                    const isMainType = type === result.mainType;
                    const isWing = type === result.wing;
                    const score = result.scores[type];

                    return (
                      <g key={type}>
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={isMainType ? 6 : isWing ? 5 : 4}
                          className={cn(
                            isMainType
                              ? typeColors[type].replace("bg-", "fill-")
                              : isWing
                              ? typeColors[type].replace("bg-", "fill-") + "/70"
                              : "fill-muted"
                          )}
                        />
                        <text
                          x={pos.x}
                          y={pos.y}
                          textAnchor="middle"
                          dominantBaseline="central"
                          className={cn(
                            "text-[5px] font-bold",
                            isMainType || isWing ? "fill-white" : "fill-muted-foreground"
                          )}
                        >
                          {type}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Labels outside the circle */}
                {typeOrder.map((type) => {
                  const index = typeOrder.indexOf(type);
                  const angle = (index * 2 * Math.PI) / 9 - Math.PI / 2;
                  const labelRadius = 48;
                  const x = 50 + labelRadius * Math.cos(angle);
                  const y = 50 + labelRadius * Math.sin(angle);
                  const isMainType = type === result.mainType;

                  return (
                    <div
                      key={type}
                      className={cn(
                        "absolute text-[10px] transform -translate-x-1/2 -translate-y-1/2",
                        isMainType ? "font-bold" : "text-muted-foreground"
                      )}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                      }}
                    >
                      <span className={isMainType ? typeTextColors[type] : ""}>
                        {enneagramTypeInfo[type].title.split(" ")[0]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Score Bars */}
            <div className="space-y-3 mb-8">
              <h3 className="text-sm font-medium text-foreground text-left mb-3">
                유형별 점수
              </h3>
              {([1, 2, 3, 4, 5, 6, 7, 8, 9] as EnneagramType[]).map((type) => {
                const score = result.scores[type];
                const info = enneagramTypeInfo[type];
                const isMainType = type === result.mainType;
                const isWing = type === result.wing;

                return (
                  <div key={type} className="text-left">
                    <div className="flex justify-between items-center mb-1">
                      <span className={cn(
                        "text-sm font-medium",
                        isMainType ? typeTextColors[type] : "text-foreground"
                      )}>
                        {info.name} {info.title.split(" ")[0]}
                        {isMainType && " (주 유형)"}
                        {isWing && " (날개)"}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {score}%
                      </span>
                    </div>
                    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          isMainType || isWing ? typeColors[type] : "bg-muted-foreground/30"
                        )}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Main Type Details */}
            <div className="space-y-4 mb-8 text-left">
              <h3 className="text-sm font-medium text-foreground mb-3">
                {mainInfo.name} 상세 정보
              </h3>

              {/* Core Motivation, Fear, Desire */}
              <div className="grid gap-3">
                <div className={cn("p-4 rounded-lg bg-gradient-to-br", typeBgColors[result.mainType])}>
                  <h4 className={cn("text-sm font-semibold mb-2", typeTextColors[result.mainType])}>
                    핵심 동기
                  </h4>
                  <p className="text-sm text-foreground">{mainInfo.coreMotivation}</p>
                </div>
                <div className={cn("p-4 rounded-lg bg-gradient-to-br", typeBgColors[result.mainType])}>
                  <h4 className={cn("text-sm font-semibold mb-2", typeTextColors[result.mainType])}>
                    핵심 두려움
                  </h4>
                  <p className="text-sm text-foreground">{mainInfo.coreFear}</p>
                </div>
                <div className={cn("p-4 rounded-lg bg-gradient-to-br", typeBgColors[result.mainType])}>
                  <h4 className={cn("text-sm font-semibold mb-2", typeTextColors[result.mainType])}>
                    핵심 욕구
                  </h4>
                  <p className="text-sm text-foreground">{mainInfo.coreDesire}</p>
                </div>
              </div>

              {/* Characteristics */}
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="text-sm font-semibold mb-3 text-foreground">주요 특성</h4>
                <ul className="space-y-1.5">
                  {mainInfo.characteristics.map((char, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                      <span className={typeTextColors[result.mainType]}>-</span>
                      {char}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Strengths & Challenges */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-green-500/10">
                  <h4 className="font-semibold text-green-600 mb-3">강점</h4>
                  <ul className="space-y-1.5">
                    {mainInfo.strengths.map((strength, idx) => (
                      <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-amber-500/10">
                  <h4 className="font-semibold text-amber-600 mb-3">도전 과제</h4>
                  <ul className="space-y-1.5">
                    {mainInfo.challenges.map((challenge, idx) => (
                      <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                        <span className="text-amber-500">-</span>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Growth & Stress Directions */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-blue-500/10">
                  <h4 className="font-semibold text-blue-600 mb-2">성장 방향</h4>
                  <p className="text-sm text-foreground">{mainInfo.growthDirection}</p>
                </div>
                <div className="p-4 rounded-lg bg-rose-500/10">
                  <h4 className="font-semibold text-rose-600 mb-2">스트레스 방향</h4>
                  <p className="text-sm text-foreground">{mainInfo.stressDirection}</p>
                </div>
              </div>
            </div>

            {/* Wing Info */}
            {wingInfo && (
              <div className="mb-8 text-left">
                <h3 className="text-sm font-medium text-foreground mb-3">
                  날개: {wingInfo.name} ({wingInfo.title})
                </h3>
                <div className={cn("p-4 rounded-lg bg-gradient-to-br", typeBgColors[result.wing!])}>
                  <p className="text-sm text-foreground mb-3">
                    날개는 주요 유형에 인접한 유형 중 더 강한 영향을 미치는 유형입니다.
                    당신의 {mainInfo.name} 성격에 {wingInfo.name}의 특성이 보완적으로 나타납니다.
                  </p>
                  <ul className="space-y-1">
                    {wingInfo.characteristics.slice(0, 2).map((char, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className={typeTextColors[result.wing!]}>-</span>
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

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
            <div className="flex items-center justify-center gap-2 mb-3">
              <Circle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              에니어그램 테스트
            </h1>
            <p className="text-muted-foreground">
              각 문항에 대해 자신에게 얼마나 해당되는지 선택하세요.
              <br />
              9가지 에니어그램 유형 중 당신의 주요 유형과 날개를 찾습니다.
            </p>
          </div>

          {/* Type Overview */}
          <div className="test-card mb-6">
            <h3 className="text-sm font-medium text-foreground mb-3">9가지 에니어그램 유형</h3>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {([1, 2, 3, 4, 5, 6, 7, 8, 9] as EnneagramType[]).map((type) => (
                <div key={type} className={cn("p-2 rounded-lg text-center", `${typeColors[type].replace('bg-', 'bg-')}/10`)}>
                  <div className={cn("font-medium", typeTextColors[type])}>
                    {type}. {enneagramTypeInfo[type].title.split(" ")[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md py-4 mb-6 -mx-4 px-4">
            <ProgressBar current={answeredCount} total={totalQuestions} />
          </div>

          {/* Questions */}
          <div className="space-y-4 mb-8">
            {enneagramQuestions.map((question, index) => (
              <div
                key={question.id}
                className="test-card animate-fade-in"
                style={{ animationDelay: `${Math.min(index * 20, 500)}ms` }}
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

export default EnneagramTest;
