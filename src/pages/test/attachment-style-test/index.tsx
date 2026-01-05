import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SEOHead, createBreadcrumbSchema } from "@/components/SEOHead";
import {
  attachmentStyleQuestions,
  AnswerValue,
  AttachmentStyle,
  AttachmentResult,
  attachmentStyleDescriptions,
} from "@/data/attachmentStyleQuestions";
import { CheckCircle2, ChevronLeft, ChevronRight, RotateCcw, Share2, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const calculateResults = (answers: Record<number, AnswerValue>): AttachmentResult => {
  let anxietySum = 0;
  let avoidanceSum = 0;
  let anxietyMaxPossible = 0;
  let avoidanceMaxPossible = 0;

  attachmentStyleQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      // 각 질문의 가중치에 따라 점수 계산
      // 5점 척도이므로 (answer - 3)을 사용하여 -2 ~ +2 범위로 변환
      const normalizedAnswer = answer - 3;

      if (question.anxietyWeight !== 0) {
        anxietySum += normalizedAnswer * question.anxietyWeight;
        anxietyMaxPossible += 2 * Math.abs(question.anxietyWeight);
      }
      if (question.avoidanceWeight !== 0) {
        avoidanceSum += normalizedAnswer * question.avoidanceWeight;
        avoidanceMaxPossible += 2 * Math.abs(question.avoidanceWeight);
      }
    }
  });

  // 0-100 점수로 변환
  const anxietyScore = Math.round(((anxietySum + anxietyMaxPossible) / (2 * anxietyMaxPossible)) * 100);
  const avoidanceScore = Math.round(((avoidanceSum + avoidanceMaxPossible) / (2 * avoidanceMaxPossible)) * 100);

  // 애착 유형 결정
  let primaryStyle: AttachmentStyle;
  const anxietyThreshold = 50;
  const avoidanceThreshold = 50;

  if (anxietyScore < anxietyThreshold && avoidanceScore < avoidanceThreshold) {
    primaryStyle = "secure";
  } else if (anxietyScore >= anxietyThreshold && avoidanceScore < avoidanceThreshold) {
    primaryStyle = "anxious";
  } else if (anxietyScore < anxietyThreshold && avoidanceScore >= avoidanceThreshold) {
    primaryStyle = "avoidant";
  } else {
    primaryStyle = "fearfulAvoidant";
  }

  return {
    anxietyScore: Math.max(0, Math.min(100, anxietyScore)),
    avoidanceScore: Math.max(0, Math.min(100, avoidanceScore)),
    primaryStyle,
  };
};

const styleColors: Record<AttachmentStyle, string> = {
  secure: "bg-green-500",
  anxious: "bg-amber-500",
  avoidant: "bg-blue-500",
  fearfulAvoidant: "bg-purple-500",
};

const styleTextColors: Record<AttachmentStyle, string> = {
  secure: "text-green-500",
  anxious: "text-amber-500",
  avoidant: "text-blue-500",
  fearfulAvoidant: "text-purple-500",
};

const styleBgColors: Record<AttachmentStyle, string> = {
  secure: "from-green-500/10 to-emerald-500/10",
  anxious: "from-amber-500/10 to-orange-500/10",
  avoidant: "from-blue-500/10 to-cyan-500/10",
  fearfulAvoidant: "from-purple-500/10 to-pink-500/10",
};

const AttachmentStyleTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCompleteButton, setShowCompleteButton] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = attachmentStyleQuestions.length;
  const currentQuestionData = attachmentStyleQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const allAnswered = answeredCount === totalQuestions;

  // 마지막 질문 답변 후 결과 보기 버튼 표시
  useEffect(() => {
    if (isLastQuestion && answers[currentQuestionData.id] !== undefined) {
      setShowCompleteButton(true);
    }
  }, [isLastQuestion, answers, currentQuestionData.id]);

  const handleAnswer = (questionId: number, value: AnswerValue) => {
    if (isTransitioning) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // 마지막 질문이 아닌 경우에만 자동으로 다음 질문으로 이동
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
    setShowCompleteButton(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = async () => {
    const result = calculateResults(answers);
    const styleInfo = attachmentStyleDescriptions[result.primaryStyle];

    const shareText = `My Attachment Style Test Result

Type: ${styleInfo.name} (${styleInfo.nameEn})
Anxiety Level: ${result.anxietyScore}%
Avoidance Level: ${result.avoidanceScore}%

${styleInfo.description}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Attachment Style Test Result",
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      alert("Result copied to clipboard!");
    }
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Attachment Style Test', path: '/test/attachment-style-test/' },
  ]);

  if (showResults) {
    const result = calculateResults(answers);
    const styleInfo = attachmentStyleDescriptions[result.primaryStyle];

    // 매트릭스 위치 계산 (불안 = X축, 회피 = Y축)
    const dotX = result.anxietyScore;
    const dotY = result.avoidanceScore;

    return (
      <div className="min-h-screen gradient-hero">
        <SEOHead
          title="Your Attachment Style - Test Results"
          description="Understand your attachment style and how it affects your relationships. See your anxiety and avoidance levels."
          path="/test/attachment-style-test/"
          jsonLd={breadcrumbSchema}
        />
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="test-card text-center animate-scale-in max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Your Attachment Style
              </h2>
            </div>

            {/* Primary Style */}
            <div className={cn("p-6 rounded-xl bg-gradient-to-br mb-6", styleBgColors[result.primaryStyle])}>
              <div className="text-sm text-muted-foreground mb-1">Primary Attachment Style</div>
              <div className={cn("text-3xl font-display font-bold mb-2", styleTextColors[result.primaryStyle])}>
                {styleInfo.name}
              </div>
              <div className="text-sm text-muted-foreground mb-3">
                {styleInfo.nameEn}
              </div>
              <p className="text-sm text-foreground">
                {styleInfo.description}
              </p>
            </div>

            {/* Score Bars */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="text-sm text-muted-foreground mb-2">Anxiety Level</div>
                <div className="text-2xl font-bold text-amber-500 mb-2">{result.anxietyScore}%</div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${result.anxietyScore}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {result.anxietyScore < 30 ? "Low" : result.anxietyScore < 70 ? "Medium" : "High"}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="text-sm text-muted-foreground mb-2">Avoidance Level</div>
                <div className="text-2xl font-bold text-blue-500 mb-2">{result.avoidanceScore}%</div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${result.avoidanceScore}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {result.avoidanceScore < 30 ? "Low" : result.avoidanceScore < 70 ? "Medium" : "High"}
                </div>
              </div>
            </div>

            {/* 2x2 Matrix */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-foreground mb-4">Attachment Style Matrix</h3>
              <div className="relative w-full aspect-square max-w-[300px] mx-auto">
                {/* Background quadrants */}
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                  <div className="bg-green-500/20 rounded-tl-lg flex items-center justify-center text-xs text-muted-foreground p-2 text-center">
                    Secure
                    <br />
                    <span className="text-[10px]">(Low Anxiety, Low Avoidance)</span>
                  </div>
                  <div className="bg-blue-500/20 rounded-tr-lg flex items-center justify-center text-xs text-muted-foreground p-2 text-center">
                    Avoidant
                    <br />
                    <span className="text-[10px]">(Low Anxiety, High Avoidance)</span>
                  </div>
                  <div className="bg-amber-500/20 rounded-bl-lg flex items-center justify-center text-xs text-muted-foreground p-2 text-center">
                    Anxious
                    <br />
                    <span className="text-[10px]">(High Anxiety, Low Avoidance)</span>
                  </div>
                  <div className="bg-purple-500/20 rounded-br-lg flex items-center justify-center text-xs text-muted-foreground p-2 text-center">
                    Fearful-Avoidant
                    <br />
                    <span className="text-[10px]">(High Anxiety, High Avoidance)</span>
                  </div>
                </div>

                {/* Axes */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

                {/* Axis labels */}
                <div className="absolute left-1/2 -top-6 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
                  Low Avoidance
                </div>
                <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
                  High Avoidance
                </div>
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full text-xs text-muted-foreground whitespace-nowrap">
                  Low Anxiety
                </div>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full text-xs text-muted-foreground whitespace-nowrap">
                  High Anxiety
                </div>

                {/* Result dot */}
                <div
                  className={cn(
                    "absolute w-4 h-4 rounded-full shadow-lg border-2 border-white transform -translate-x-1/2 -translate-y-1/2 z-10",
                    styleColors[result.primaryStyle]
                  )}
                  style={{
                    left: `${dotX}%`,
                    top: `${dotY}%`,
                  }}
                />
              </div>
            </div>

            {/* Characteristics */}
            <div className="text-left p-4 rounded-lg bg-muted/20 mb-6">
              <h3 className="font-semibold text-foreground mb-3">
                Characteristics of {styleInfo.name}
              </h3>
              <ul className="space-y-2 mb-4">
                {styleInfo.characteristics.map((char, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className={styleTextColors[result.primaryStyle]}>•</span>
                    {char}
                  </li>
                ))}
              </ul>

              <h4 className="font-medium text-foreground mb-2 mt-4">In Relationships</h4>
              <p className="text-sm text-muted-foreground mb-4">{styleInfo.inRelationship}</p>
            </div>

            {/* Advice */}
            <div className={cn("text-left p-4 rounded-lg mb-6", `${styleColors[result.primaryStyle].replace('bg-', 'bg-')}/10`)}>
              <h3 className="font-semibold text-foreground mb-3">Relationship Advice</h3>
              <ul className="space-y-2">
                {styleInfo.advice.map((advice, idx) => (
                  <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                    <CheckCircle2 className={cn("w-4 h-4 mt-0.5 flex-shrink-0", styleTextColors[result.primaryStyle])} />
                    {advice}
                  </li>
                ))}
              </ul>
            </div>

            {/* Type Overview */}
            <div className="text-left p-4 rounded-lg bg-muted/10 mb-6">
              <h3 className="font-semibold text-foreground mb-3">The Four Attachment Styles</h3>
              <div className="space-y-3">
                {(Object.entries(attachmentStyleDescriptions) as [AttachmentStyle, typeof attachmentStyleDescriptions.secure][]).map(([style, info]) => (
                  <div
                    key={style}
                    className={cn(
                      "p-3 rounded-lg border-l-4 transition-all",
                      result.primaryStyle === style
                        ? `${styleColors[style].replace('bg-', 'border-')} bg-muted/30`
                        : "border-transparent bg-muted/10"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={cn("w-2 h-2 rounded-full", styleColors[style])} />
                      <span className={cn("font-medium text-sm", result.primaryStyle === style && styleTextColors[style])}>
                        {info.name}
                      </span>
                      <span className="text-xs text-muted-foreground">({info.nameEn})</span>
                    </div>
                    <p className="text-xs text-muted-foreground ml-4">
                      {style === "secure" && "Low Anxiety + Low Avoidance"}
                      {style === "anxious" && "High Anxiety + Low Avoidance"}
                      {style === "avoidant" && "Low Anxiety + High Avoidance"}
                      {style === "fearfulAvoidant" && "High Anxiety + High Avoidance"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Description */}
            <div className="text-left p-6 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 mb-6">
              <h3 className="font-semibold text-indigo-600 mb-4 text-lg">{styleInfo.name} - In-Depth Analysis</h3>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                {styleInfo.detailedDescription}
              </p>
            </div>

            {/* Scientific Background */}
            <div className="text-left p-6 rounded-xl bg-blue-500/10 mb-6">
              <h3 className="font-semibold text-blue-600 mb-4 text-lg">Scientific Background</h3>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                {styleInfo.scientificBackground}
              </p>
            </div>

            {/* Communication Tips */}
            <div className="text-left p-6 rounded-xl bg-teal-500/10 mb-6">
              <h3 className="font-semibold text-teal-600 mb-4 text-lg">Communication Tips</h3>
              <ul className="space-y-2">
                {styleInfo.communicationTips.map((tip, idx) => (
                  <li key={idx} className="text-sm text-foreground flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-teal-600">{idx + 1}</span>
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Healing Strategies */}
            <div className="text-left p-6 rounded-xl bg-emerald-500/10 mb-6">
              <h3 className="font-semibold text-emerald-600 mb-4 text-lg">Healing Strategies</h3>
              <ul className="space-y-2">
                {styleInfo.healingStrategies.map((strategy, idx) => (
                  <li key={idx} className="text-sm text-foreground flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {strategy}
                  </li>
                ))}
              </ul>
            </div>

            {/* Compatible & Challenging Styles */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="text-left p-4 rounded-lg bg-green-500/10">
                <h4 className="font-semibold text-green-600 mb-3">Compatible Styles</h4>
                <div className="flex flex-wrap gap-2">
                  {styleInfo.compatibleStyles.map((style) => (
                    <span
                      key={style}
                      className="px-3 py-1.5 bg-green-500/20 text-green-700 rounded-full text-sm font-medium"
                    >
                      {attachmentStyleDescriptions[style].name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-left p-4 rounded-lg bg-orange-500/10">
                <h4 className="font-semibold text-orange-600 mb-3">Challenging Styles</h4>
                <div className="flex flex-wrap gap-2">
                  {styleInfo.challengingStyles.map((style) => (
                    <span
                      key={style}
                      className="px-3 py-1.5 bg-orange-500/20 text-orange-700 rounded-full text-sm font-medium"
                    >
                      {attachmentStyleDescriptions[style].name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Button onClick={handleReset} variant="outline" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Retake
              </Button>
              <Button
                onClick={handleShare}
                className="gap-2 gradient-primary border-0"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Attachment Style Test - Find Your Pattern"
        description="Discover your attachment style in relationships. Are you secure, anxious, avoidant, or fearful-avoidant? For entertainment purposes only."
        path="/test/attachment-style-test/"
        jsonLd={breadcrumbSchema}
      />
      {/* 상단 바 */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-background/95 backdrop-blur-sm">
        <div></div>
        <h1 className="font-semibold text-foreground">Attachment Style Test</h1>
        <span className="text-sm text-muted-foreground min-w-[48px] text-right">
          {currentQuestion + 1}/{totalQuestions}
        </span>
      </div>

      {/* 프로그레스 바 */}
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* 질문 영역 */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div
          className={cn(
            "transition-all duration-300",
            isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          )}
        >
          <div className="text-center">
            <span className="inline-block text-sm font-medium text-primary mb-4">
              Q{currentQuestion + 1}
            </span>
            <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
              {currentQuestionData.text}
            </p>
          </div>
        </div>
      </div>

      {/* 5점 척도 */}
      <div className="px-6 pb-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-3">
          <span>Strongly Disagree</span>
          <span>Strongly Agree</span>
        </div>
        <div className="flex justify-center gap-3">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => handleAnswer(currentQuestionData.id, value as AnswerValue)}
              className={cn(
                "flex-1 aspect-square max-w-16 rounded-full border-2 flex items-center justify-center text-lg font-medium transition-all duration-200",
                answers[currentQuestionData.id] === value
                  ? "border-primary bg-primary text-primary-foreground scale-110"
                  : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground hover:scale-105"
              )}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <div className="border-t bg-background/95 backdrop-blur-sm px-4 py-4 pb-safe">
        <div className="flex gap-3">
          <Button
            onClick={handlePrevQuestion}
            variant="outline"
            disabled={currentQuestion === 0}
            className="flex-1 gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {isLastQuestion && allAnswered ? (
            <Button
              onClick={handleSubmit}
              className="flex-1 gap-2 gradient-primary border-0"
            >
              <CheckCircle2 className="w-4 h-4" />
              View Results
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              variant="outline"
              disabled={currentQuestion === totalQuestions - 1 || answers[currentQuestionData.id] === undefined}
              className="flex-1 gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* 미응답 질문 안내 */}
        {isLastQuestion && !allAnswered && (
          <p className="text-xs text-muted-foreground text-center mt-3">
            {answeredCount}/{totalQuestions} questions answered - Please answer all questions
          </p>
        )}
      </div>
    </div>
  );
};

export default AttachmentStyleTest;
