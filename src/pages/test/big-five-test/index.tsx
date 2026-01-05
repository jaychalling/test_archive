import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import {
  bigFiveQuestions,
  answerOptions,
  AnswerValue,
  BigFiveResult,
  BigFiveTrait,
  bigFiveDescriptions,
  traitColors,
  traitTextColors,
  traitBgColors,
  traitOrder,
  getScoreLevel,
  scoreLevelLabels,
  getPersonalityProfile,
} from "@/data/bigFiveQuestions";
import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle2, RotateCcw, Share2, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const calculateResults = (answers: Record<number, AnswerValue>): BigFiveResult => {
  const traitScores: Record<BigFiveTrait, { sum: number; count: number }> = {
    openness: { sum: 0, count: 0 },
    conscientiousness: { sum: 0, count: 0 },
    extraversion: { sum: 0, count: 0 },
    agreeableness: { sum: 0, count: 0 },
    neuroticism: { sum: 0, count: 0 },
  };

  bigFiveQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      // 역코딩 문항 처리
      const score = question.reversed ? 6 - answer : answer;
      traitScores[question.trait].sum += score;
      traitScores[question.trait].count++;
    }
  });

  // 0-100 점수로 변환 (각 특성당 10문항, 각 1-5점)
  const calculatePercentage = (sum: number, count: number): number => {
    if (count === 0) return 50;
    const maxPossible = count * 5;
    const minPossible = count * 1;
    return Math.round(((sum - minPossible) / (maxPossible - minPossible)) * 100);
  };

  return {
    openness: calculatePercentage(traitScores.openness.sum, traitScores.openness.count),
    conscientiousness: calculatePercentage(traitScores.conscientiousness.sum, traitScores.conscientiousness.count),
    extraversion: calculatePercentage(traitScores.extraversion.sum, traitScores.extraversion.count),
    agreeableness: calculatePercentage(traitScores.agreeableness.sum, traitScores.agreeableness.count),
    neuroticism: calculatePercentage(traitScores.neuroticism.sum, traitScores.neuroticism.count),
  };
};

const BigFiveTest = () => {
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = bigFiveQuestions.length;
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const allQuestionsAnswered = answeredCount === totalQuestions;

  const handleAnswer = (questionId: number, value: AnswerValue) => {
    if (isTransitioning) return; // 중복 클릭 방지

    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // 마지막 질문이 아니면 0.1초 후 다음 질문으로 이동
    if (!isLastQuestion) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setIsTransitioning(false);
      }, 100);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev - 1);
        setIsTransitioning(false);
      }, 100);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setIsTransitioning(false);
      }, 100);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setCurrentQuestion(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = async () => {
    const result = calculateResults(answers);
    const profile = getPersonalityProfile(result);

    const shareText = `나의 Big Five 성격 테스트 결과

${profile.summary}

개방성: ${result.openness}% (${scoreLevelLabels[getScoreLevel(result.openness)]})
성실성: ${result.conscientiousness}% (${scoreLevelLabels[getScoreLevel(result.conscientiousness)]})
외향성: ${result.extraversion}% (${scoreLevelLabels[getScoreLevel(result.extraversion)]})
친화성: ${result.agreeableness}% (${scoreLevelLabels[getScoreLevel(result.agreeableness)]})
신경증: ${result.neuroticism}% (${scoreLevelLabels[getScoreLevel(result.neuroticism)]})`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Big Five 성격 테스트 결과",
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
    const profile = getPersonalityProfile(result);

    // 레이더 차트 데이터 계산
    const radarPoints = traitOrder.map((trait, index) => {
      const angle = (Math.PI * 2 * index) / 5 - Math.PI / 2;
      const value = result[trait] / 100;
      const x = 50 + 40 * value * Math.cos(angle);
      const y = 50 + 40 * value * Math.sin(angle);
      return { x, y, trait, value: result[trait] };
    });

    const radarPath = radarPoints.map((point, i) => (i === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`)).join(" ") + " Z";

    // 배경 그리드 포인트
    const gridLevels = [0.25, 0.5, 0.75, 1];
    const gridPaths = gridLevels.map((level) => {
      const points = traitOrder.map((_, index) => {
        const angle = (Math.PI * 2 * index) / 5 - Math.PI / 2;
        const x = 50 + 40 * level * Math.cos(angle);
        const y = 50 + 40 * level * Math.sin(angle);
        return { x, y };
      });
      return points.map((point, i) => (i === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`)).join(" ") + " Z";
    });

    // 축 라인
    const axisLines = traitOrder.map((_, index) => {
      const angle = (Math.PI * 2 * index) / 5 - Math.PI / 2;
      return {
        x2: 50 + 40 * Math.cos(angle),
        y2: 50 + 40 * Math.sin(angle),
      };
    });

    // 라벨 위치
    const labelPositions = traitOrder.map((trait, index) => {
      const angle = (Math.PI * 2 * index) / 5 - Math.PI / 2;
      const x = 50 + 50 * Math.cos(angle);
      const y = 50 + 50 * Math.sin(angle);
      return { x, y, trait };
    });

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

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="test-card text-center animate-scale-in">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Brain className="w-8 h-8 text-primary" />
                <h1 className="font-display text-3xl font-bold text-foreground">
                  당신의 Big Five 성격 프로필
                </h1>
              </div>

              {/* Summary */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 mb-6">
                <p className="text-lg text-foreground font-medium mb-4">{profile.summary}</p>
                <p className="text-sm text-muted-foreground">{profile.detailedSummary}</p>
              </div>

              {/* Radar Chart */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-foreground mb-4">성격 특성 레이더 차트</h2>
                <div className="relative w-full max-w-[300px] mx-auto aspect-square">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {gridPaths.map((path, i) => (
                      <path key={i} d={path} fill="none" stroke="currentColor" strokeWidth="0.3" className="text-border" />
                    ))}
                    {axisLines.map((line, i) => (
                      <line key={i} x1="50" y1="50" x2={line.x2} y2={line.y2} stroke="currentColor" strokeWidth="0.3" className="text-border" />
                    ))}
                    <path d={radarPath} fill="hsl(var(--primary))" fillOpacity="0.3" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                    {radarPoints.map((point, i) => (
                      <circle key={i} cx={point.x} cy={point.y} r="2" fill="hsl(var(--primary))" />
                    ))}
                  </svg>
                  {labelPositions.map((pos, i) => (
                    <div
                      key={i}
                      className="absolute text-xs font-medium text-foreground transform -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    >
                      {bigFiveDescriptions[pos.trait].name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Score Bars */}
              <div className="space-y-4 mb-8">
                <h2 className="text-lg font-semibold text-foreground text-left mb-3">특성별 점수</h2>
                {traitOrder.map((trait) => {
                  const score = result[trait];
                  const level = getScoreLevel(score);
                  const info = bigFiveDescriptions[trait];
                  return (
                    <div key={trait} className="text-left">
                      <div className="flex justify-between items-center mb-1">
                        <span className={cn("text-sm font-medium", traitTextColors[trait])}>
                          {info.name} ({info.nameEn})
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {score}% ({scoreLevelLabels[level]})
                        </span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full transition-all duration-500", traitColors[trait])} style={{ width: `${score}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Overall Interpretation - E-E-A-T Content */}
            <div className="test-card">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">종합 분석 리포트</h2>
              <div className="prose prose-sm max-w-none text-foreground">
                {profile.overallInterpretation.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4 text-sm leading-relaxed text-muted-foreground">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Detailed Trait Analysis */}
            <div className="test-card">
              <h2 className="font-display text-xl font-semibold text-foreground mb-6">특성별 상세 분석</h2>
              <div className="space-y-8">
                {traitOrder.map((trait) => {
                  const score = result[trait];
                  const level = getScoreLevel(score);
                  const info = bigFiveDescriptions[trait];
                  const description = level === "high" ? info.highDescription : level === "low" ? info.lowDescription : info.mediumDescription;
                  const traits = level === "high" || (level === "medium" && score >= 50) ? info.highTraits : info.lowTraits;

                  return (
                    <div key={trait} className={cn("p-6 rounded-xl bg-gradient-to-br", traitBgColors[trait])}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={cn("w-4 h-4 rounded-full", traitColors[trait])} />
                        <h3 className={cn("text-lg font-semibold", traitTextColors[trait])}>
                          {info.name} ({info.nameEn})
                        </h3>
                        <span className="text-sm text-muted-foreground ml-auto">
                          {score}% - {scoreLevelLabels[level]}
                        </span>
                      </div>

                      {/* Scientific Background */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-foreground mb-2">과학적 배경</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{info.scientificBackground}</p>
                      </div>

                      {/* Personal Description */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-foreground mb-2">당신의 {info.name}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                      </div>

                      {/* Traits List */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-foreground mb-2">주요 특징</h4>
                        <ul className="space-y-1">
                          {traits.map((t, idx) => (
                            <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                              <span className={traitTextColors[trait]}>•</span>
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Facets */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-foreground mb-2">하위 요인 (Facets)</h4>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {info.facets.map((facet, idx) => (
                            <div key={idx} className="p-2 bg-background/50 rounded-lg">
                              <span className="text-xs font-medium text-foreground">{facet.name}</span>
                              <p className="text-xs text-muted-foreground">{facet.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Career Implications */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-foreground mb-2">커리어 함의</h4>
                        <ul className="space-y-1">
                          {(level === "high" || (level === "medium" && score >= 50) ? info.careerImplications.high : info.careerImplications.low).slice(0, 3).map((item, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className={traitTextColors[trait]}>→</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Relationship Implications */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-foreground mb-2">관계에서의 의미</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {level === "high" || (level === "medium" && score >= 50) ? info.relationshipImplications.high : info.relationshipImplications.low}
                        </p>
                      </div>

                      {/* Growth Strategies */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-foreground mb-2">성장 전략</h4>
                        <ul className="space-y-1">
                          {(level === "high" || (level === "medium" && score >= 50) ? info.growthStrategies.high : info.growthStrategies.low).map((strategy, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-green-500">✓</span>
                              {strategy}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Research Findings */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">관련 연구 결과</h4>
                        <ul className="space-y-1">
                          {info.researchFindings.slice(0, 3).map((finding, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground italic flex items-start gap-2">
                              <span className="text-blue-500">📚</span>
                              {finding}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Strengths & Growth Areas */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="test-card">
                <h2 className="font-display text-lg font-semibold text-green-600 mb-4">당신의 강점</h2>
                <ul className="space-y-3">
                  {profile.strengths.map((strength, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="test-card">
                <h2 className="font-display text-lg font-semibold text-amber-600 mb-4">성장 영역</h2>
                <ul className="space-y-3">
                  {profile.growthAreas.map((area, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-3">
                      <span className="text-amber-500 text-lg">→</span>
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Disclaimer and References */}
            <div className="test-card bg-muted/30">
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">참고 사항</h2>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  <strong>테스트 신뢰도:</strong> 이 테스트는 Costa와 McCrae(1992)의 NEO-PI-R 모델을 기반으로 설계되었으며,
                  Big Five 성격 모델은 현대 심리학에서 가장 과학적으로 검증된 성격 평가 프레임워크 중 하나입니다.
                </p>
                <p>
                  <strong>제한 사항:</strong> 이 결과는 자기 보고식 평가에 기반하므로, 응답 시점의 기분이나 상황에 따라 달라질 수 있습니다.
                  정확한 성격 평가를 위해서는 전문 심리학자와의 상담을 권장합니다.
                </p>
                <p>
                  <strong>활용 방법:</strong> 이 결과는 자기 이해와 성장을 위한 참고 자료로 활용하세요.
                  성격은 고정된 것이 아니며, 의식적인 노력과 경험을 통해 발전할 수 있습니다.
                </p>
                <div className="pt-4 border-t border-border/50">
                  <h3 className="font-semibold text-foreground mb-2">주요 참고 문헌</h3>
                  <ul className="space-y-1 text-xs">
                    <li>• Costa, P. T., & McCrae, R. R. (1992). Revised NEO Personality Inventory (NEO-PI-R) and NEO Five-Factor Inventory (NEO-FFI) professional manual.</li>
                    <li>• Roberts, B. W., et al. (2006). Patterns of mean-level change in personality traits across the life course.</li>
                    <li>• Barrick, M. R., & Mount, M. K. (1991). The Big Five personality dimensions and job performance.</li>
                    <li>• Steel, P., Schmidt, J., & Shultz, J. (2008). Refining the relationship between personality and subjective well-being.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button onClick={handleReset} variant="outline" size="lg" className="gap-2">
                <RotateCcw className="w-5 h-5" />
                다시하기
              </Button>
              <Button onClick={handleShare} size="lg" className="gap-2 gradient-primary border-0">
                <Share2 className="w-5 h-5" />
                결과 공유하기
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      {/* Top Bar */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">테스트 목록</span>
        </Link>
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-foreground">Big Five</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {currentQuestion + 1}/{totalQuestions}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-2">
        <ProgressBar current={answeredCount} total={totalQuestions} />
      </div>

      {/* Main Content - Flex Grow to fill space */}
      <main className="flex-1 flex flex-col justify-center px-4 py-6">
        <div className="max-w-lg mx-auto w-full">
          {/* Question Card */}
          <div
            className={cn(
              "transition-all duration-300",
              isTransitioning ? "opacity-0 transform translate-x-4" : "opacity-100 transform translate-x-0"
            )}
          >
            {(() => {
              const question = bigFiveQuestions[currentQuestion];
              return (
                <div className="text-center">
                  <p className="text-xl sm:text-2xl text-foreground leading-relaxed mb-12 font-medium">
                    {question.text}
                  </p>

                  {/* Scale */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>전혀 아니다</span>
                      <span>매우 그렇다</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      {answerOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer(question.id, option.value)}
                          disabled={isTransitioning}
                          className={cn(
                            "flex-1 aspect-square max-w-16 rounded-full border-2 transition-all duration-200 font-semibold text-xl",
                            answers[question.id] === option.value
                              ? "border-primary bg-primary text-primary-foreground shadow-lg scale-110"
                              : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          {option.value}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </main>

      {/* Bottom Navigation - Fixed at bottom */}
      <div className="px-4 py-4 border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-lg mx-auto flex justify-between items-center">
          <Button
            onClick={handlePrevQuestion}
            variant="ghost"
            size="lg"
            disabled={currentQuestion === 0 || isTransitioning}
            className="gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            이전
          </Button>

          {isLastQuestion && allQuestionsAnswered ? (
            <Button
              onClick={handleSubmit}
              size="lg"
              className="gradient-primary border-0 gap-2 px-8"
            >
              <CheckCircle2 className="w-5 h-5" />
              결과 보기
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              variant="ghost"
              size="lg"
              disabled={currentQuestion === totalQuestions - 1 || isTransitioning}
              className="gap-2"
            >
              다음
              <ChevronRight className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BigFiveTest;
