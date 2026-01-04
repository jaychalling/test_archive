import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import {
  personalityQuestions,
  AnswerChoice,
  PersonalityType,
  PersonalityResult,
  DimensionScore,
  Dimension,
  personalityTypeInfo,
  dimensionInfo,
  typeColors,
  typeTextColors,
  typeBgColors,
  typeGroups,
  getTypeGroup,
} from "@/data/personalityTypeQuestions";
import { ArrowLeft, CheckCircle2, RotateCcw, Share2, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const calculateResults = (answers: Record<number, AnswerChoice>): PersonalityResult => {
  const dimensionScores: Record<Dimension, { poleA: number; poleB: number }> = {
    EI: { poleA: 0, poleB: 0 },
    SN: { poleA: 0, poleB: 0 },
    TF: { poleA: 0, poleB: 0 },
    JP: { poleA: 0, poleB: 0 },
  };

  // 각 답변에 따라 점수 계산
  personalityQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer === "A") {
      dimensionScores[question.dimension].poleA++;
    } else if (answer === "B") {
      dimensionScores[question.dimension].poleB++;
    }
  });

  // 각 차원별 점수 계산
  const calculateDimensionScore = (dimension: Dimension): DimensionScore => {
    const scores = dimensionScores[dimension];
    const total = scores.poleA + scores.poleB;
    const percentageA = total > 0 ? Math.round((scores.poleA / total) * 100) : 50;
    const percentageB = total > 0 ? Math.round((scores.poleB / total) * 100) : 50;

    return {
      dimension,
      poleA: scores.poleA,
      poleB: scores.poleB,
      percentageA,
      percentageB,
      dominant: scores.poleA >= scores.poleB ? "A" : "B",
    };
  };

  const EI = calculateDimensionScore("EI");
  const SN = calculateDimensionScore("SN");
  const TF = calculateDimensionScore("TF");
  const JP = calculateDimensionScore("JP");

  // 4글자 유형 코드 생성
  const typeCode = (
    (EI.dominant === "A" ? "E" : "I") +
    (SN.dominant === "A" ? "S" : "N") +
    (TF.dominant === "A" ? "T" : "F") +
    (JP.dominant === "A" ? "J" : "P")
  ) as PersonalityType;

  return {
    typeCode,
    dimensionScores: { EI, SN, TF, JP },
  };
};

const SixteenPersonalityTest = () => {
  const [answers, setAnswers] = useState<Record<number, AnswerChoice>>({});
  const [showResults, setShowResults] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = personalityQuestions.length;

  const handleAnswer = (questionId: number, choice: AnswerChoice) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: choice,
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
    const typeInfo = personalityTypeInfo[result.typeCode];
    const { EI, SN, TF, JP } = result.dimensionScores;

    const shareText = `나의 16가지 성격 유형 테스트 결과

유형: ${result.typeCode} - ${typeInfo.name}
별명: ${typeInfo.nickname}

차원별 결과:
- 에너지 방향: E ${EI.percentageA}% / I ${EI.percentageB}%
- 정보 수집: S ${SN.percentageA}% / N ${SN.percentageB}%
- 의사결정: T ${TF.percentageA}% / F ${TF.percentageB}%
- 생활 양식: J ${JP.percentageA}% / P ${JP.percentageB}%

${typeInfo.description}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "16가지 성격 유형 테스트 결과",
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
    const typeInfo = personalityTypeInfo[result.typeCode];
    const group = getTypeGroup(result.typeCode);
    const groupInfo = typeGroups[group];
    const { EI, SN, TF, JP } = result.dimensionScores;

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
              <Layers className="w-6 h-6 text-primary" />
              <h2 className="font-display text-2xl font-semibold text-foreground">
                당신의 성격 유형 결과
              </h2>
            </div>

            {/* Main Type Display */}
            <div className={cn("p-8 rounded-xl bg-gradient-to-br mb-6", typeBgColors[result.typeCode])}>
              <div className="text-6xl font-bold mb-3">
                <span className={typeTextColors[result.typeCode]}>{result.typeCode}</span>
              </div>
              <h3 className={cn("text-xl font-semibold mb-2", typeTextColors[result.typeCode])}>
                {typeInfo.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {typeInfo.nickname}
              </p>
              <div className={cn("inline-block px-3 py-1 rounded-full text-xs font-medium", `bg-${groupInfo.color}-500/20`, `text-${groupInfo.color}-600`)}>
                {groupInfo.name} - {groupInfo.description}
              </div>
            </div>

            {/* Description */}
            <div className="p-4 rounded-lg bg-muted/50 mb-6 text-left">
              <p className="text-foreground">{typeInfo.description}</p>
            </div>

            {/* Dimension Bars */}
            <div className="space-y-4 mb-8">
              <h3 className="text-sm font-medium text-foreground text-left mb-4">
                차원별 성향 비율
              </h3>

              {/* E/I */}
              <div className="text-left">
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span className={cn("font-medium", EI.dominant === "A" ? "text-primary" : "text-muted-foreground")}>
                    E 외향 {EI.percentageA}%
                  </span>
                  <span className="text-xs text-muted-foreground">{dimensionInfo.EI.name}</span>
                  <span className={cn("font-medium", EI.dominant === "B" ? "text-primary" : "text-muted-foreground")}>
                    {EI.percentageB}% 내향 I
                  </span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden flex">
                  <div
                    className={cn(
                      "h-full transition-all duration-500",
                      EI.dominant === "A" ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                    style={{ width: `${EI.percentageA}%` }}
                  />
                  <div
                    className={cn(
                      "h-full transition-all duration-500",
                      EI.dominant === "B" ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                    style={{ width: `${EI.percentageB}%` }}
                  />
                </div>
              </div>

              {/* S/N */}
              <div className="text-left">
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span className={cn("font-medium", SN.dominant === "A" ? "text-primary" : "text-muted-foreground")}>
                    S 감각 {SN.percentageA}%
                  </span>
                  <span className="text-xs text-muted-foreground">{dimensionInfo.SN.name}</span>
                  <span className={cn("font-medium", SN.dominant === "B" ? "text-primary" : "text-muted-foreground")}>
                    {SN.percentageB}% 직관 N
                  </span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden flex">
                  <div
                    className={cn(
                      "h-full transition-all duration-500",
                      SN.dominant === "A" ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                    style={{ width: `${SN.percentageA}%` }}
                  />
                  <div
                    className={cn(
                      "h-full transition-all duration-500",
                      SN.dominant === "B" ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                    style={{ width: `${SN.percentageB}%` }}
                  />
                </div>
              </div>

              {/* T/F */}
              <div className="text-left">
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span className={cn("font-medium", TF.dominant === "A" ? "text-primary" : "text-muted-foreground")}>
                    T 사고 {TF.percentageA}%
                  </span>
                  <span className="text-xs text-muted-foreground">{dimensionInfo.TF.name}</span>
                  <span className={cn("font-medium", TF.dominant === "B" ? "text-primary" : "text-muted-foreground")}>
                    {TF.percentageB}% 감정 F
                  </span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden flex">
                  <div
                    className={cn(
                      "h-full transition-all duration-500",
                      TF.dominant === "A" ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                    style={{ width: `${TF.percentageA}%` }}
                  />
                  <div
                    className={cn(
                      "h-full transition-all duration-500",
                      TF.dominant === "B" ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                    style={{ width: `${TF.percentageB}%` }}
                  />
                </div>
              </div>

              {/* J/P */}
              <div className="text-left">
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span className={cn("font-medium", JP.dominant === "A" ? "text-primary" : "text-muted-foreground")}>
                    J 판단 {JP.percentageA}%
                  </span>
                  <span className="text-xs text-muted-foreground">{dimensionInfo.JP.name}</span>
                  <span className={cn("font-medium", JP.dominant === "B" ? "text-primary" : "text-muted-foreground")}>
                    {JP.percentageB}% 인식 P
                  </span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden flex">
                  <div
                    className={cn(
                      "h-full transition-all duration-500",
                      JP.dominant === "A" ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                    style={{ width: `${JP.percentageA}%` }}
                  />
                  <div
                    className={cn(
                      "h-full transition-all duration-500",
                      JP.dominant === "B" ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                    style={{ width: `${JP.percentageB}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Characteristics */}
            <div className="p-4 rounded-lg bg-muted/50 mb-6 text-left">
              <h4 className="text-sm font-semibold mb-3 text-foreground">주요 특성</h4>
              <ul className="space-y-1.5">
                {typeInfo.characteristics.map((char, idx) => (
                  <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                    <span className={typeTextColors[result.typeCode]}>-</span>
                    {char}
                  </li>
                ))}
              </ul>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-green-500/10 text-left">
                <h4 className="font-semibold text-green-600 mb-3">강점</h4>
                <ul className="space-y-1.5">
                  {typeInfo.strengths.map((strength, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-amber-500/10 text-left">
                <h4 className="font-semibold text-amber-600 mb-3">약점</h4>
                <ul className="space-y-1.5">
                  {typeInfo.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-amber-500">-</span>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Careers */}
            <div className={cn("p-4 rounded-lg bg-gradient-to-br mb-6 text-left", typeBgColors[result.typeCode])}>
              <h4 className={cn("font-semibold mb-3", typeTextColors[result.typeCode])}>어울리는 직업군</h4>
              <div className="flex flex-wrap gap-2">
                {typeInfo.careers.map((career, idx) => (
                  <span
                    key={idx}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm",
                      typeColors[result.typeCode],
                      "text-white"
                    )}
                  >
                    {career}
                  </span>
                ))}
              </div>
            </div>

            {/* Dimension Details */}
            <div className="space-y-4 mb-8 text-left">
              <h3 className="text-sm font-medium text-foreground mb-3">
                차원별 상세 설명
              </h3>
              {(["EI", "SN", "TF", "JP"] as Dimension[]).map((dim) => {
                const score = result.dimensionScores[dim];
                const info = dimensionInfo[dim];
                const dominant = score.dominant === "A" ? info.poleA : info.poleB;

                return (
                  <div key={dim} className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-primary">{dominant.code}</span>
                      <span className="text-sm font-medium text-foreground">{dominant.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{dominant.description}</p>
                  </div>
                );
              })}
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
            <div className="flex items-center justify-center gap-2 mb-3">
              <Layers className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              16가지 성격 유형 테스트
            </h1>
            <p className="text-muted-foreground">
              각 질문에서 자신에게 더 가까운 문장을 선택하세요.
              <br />
              16가지 성격 유형 중 당신의 유형을 찾습니다.
            </p>
          </div>

          {/* Dimension Overview */}
          <div className="test-card mb-6">
            <h3 className="text-sm font-medium text-foreground mb-3">측정하는 4가지 차원</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-primary/10 text-center">
                <div className="font-medium text-primary">E / I</div>
                <div className="text-muted-foreground">에너지 방향</div>
              </div>
              <div className="p-2 rounded-lg bg-primary/10 text-center">
                <div className="font-medium text-primary">S / N</div>
                <div className="text-muted-foreground">정보 수집</div>
              </div>
              <div className="p-2 rounded-lg bg-primary/10 text-center">
                <div className="font-medium text-primary">T / F</div>
                <div className="text-muted-foreground">의사결정</div>
              </div>
              <div className="p-2 rounded-lg bg-primary/10 text-center">
                <div className="font-medium text-primary">J / P</div>
                <div className="text-muted-foreground">생활 양식</div>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md py-4 mb-6 -mx-4 px-4">
            <ProgressBar current={answeredCount} total={totalQuestions} />
          </div>

          {/* Questions */}
          <div className="space-y-4 mb-8">
            {personalityQuestions.map((question, index) => (
              <div
                key={question.id}
                className="test-card animate-fade-in"
                style={{ animationDelay: `${Math.min(index * 20, 500)}ms` }}
              >
                <div className="flex gap-3 mb-4">
                  <span className="text-xs font-medium text-muted-foreground min-w-[28px]">
                    {index + 1}.
                  </span>
                  <span className="text-xs text-muted-foreground">
                    더 가까운 문장을 선택하세요
                  </span>
                </div>

                <div className="space-y-2 ml-8">
                  <button
                    onClick={() => handleAnswer(question.id, "A")}
                    className={cn(
                      "w-full p-3 text-left text-sm rounded-lg border transition-all duration-200",
                      answers[question.id] === "A"
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span className="font-medium mr-2">A.</span>
                    {question.optionA.text}
                  </button>
                  <button
                    onClick={() => handleAnswer(question.id, "B")}
                    className={cn(
                      "w-full p-3 text-left text-sm rounded-lg border transition-all duration-200",
                      answers[question.id] === "B"
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span className="font-medium mr-2">B.</span>
                    {question.optionB.text}
                  </button>
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

export default SixteenPersonalityTest;
