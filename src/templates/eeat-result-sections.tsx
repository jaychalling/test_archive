/**
 * E-E-A-T 결과 페이지 섹션 컴포넌트
 *
 * Google E-E-A-T 가이드라인을 준수하는 표준 UI 섹션들
 * 새 테스트 결과 페이지 생성 시 이 컴포넌트들을 활용하세요.
 */

import React from "react";
import {
  BookOpen,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  Users,
  History,
  CheckCircle2,
  AlertCircle,
  Brain,
  Heart,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// 타입 정의
// ============================================

interface DetailedDescriptionProps {
  title?: string;
  description: string;
  bgColor?: string;
  textColor?: string;
  icon?: React.ReactNode;
}

interface BackgroundSectionProps {
  title: string;
  content: string;
  variant?: "scientific" | "philosophical" | "historical" | "psychological";
}

interface StrengthsWeaknessesProps {
  strengths: string[];
  weaknesses: string[];
}

interface RealWorldExamplesProps {
  examples: string[];
  title?: string;
}

interface TestBackgroundProps {
  history: string;
  purpose: string;
  disclaimer: string;
  testName?: string;
}

interface CharacteristicsProps {
  items: string[];
  title?: string;
}

interface PracticesTipsProps {
  practices: string[];
  tips: string[];
  practicesTitle?: string;
  tipsTitle?: string;
}

// ============================================
// 상세 분석 섹션
// ============================================

/**
 * 상세 분석 섹션
 * 결과의 심층적인 설명을 표시합니다.
 */
export const DetailedDescriptionSection: React.FC<DetailedDescriptionProps> = ({
  title = "상세 분석",
  description,
  bgColor = "bg-primary/5",
  textColor = "text-primary",
  icon = <BookOpen className="w-5 h-5" />,
}) => (
  <div className={cn("text-left p-6 rounded-xl mb-6", bgColor)}>
    <h3
      className={cn(
        "font-semibold mb-4 text-lg flex items-center gap-2",
        textColor
      )}
    >
      {icon}
      {title}
    </h3>
    <p className="text-foreground leading-relaxed">{description}</p>
  </div>
);

// ============================================
// 배경 정보 섹션
// ============================================

const backgroundVariants = {
  scientific: {
    title: "과학적 배경",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-600",
    icon: <Brain className="w-5 h-5" />,
  },
  philosophical: {
    title: "철학적 배경",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-600",
    icon: <Lightbulb className="w-5 h-5" />,
  },
  historical: {
    title: "역사적 배경",
    bgColor: "bg-amber-500/10",
    textColor: "text-amber-600",
    icon: <History className="w-5 h-5" />,
  },
  psychological: {
    title: "심리학적 배경",
    bgColor: "bg-indigo-500/10",
    textColor: "text-indigo-600",
    icon: <Brain className="w-5 h-5" />,
  },
};

/**
 * 배경 정보 섹션
 * 과학적/철학적/역사적/심리학적 배경을 표시합니다.
 */
export const BackgroundSection: React.FC<BackgroundSectionProps> = ({
  title,
  content,
  variant = "scientific",
}) => {
  const config = backgroundVariants[variant];

  return (
    <div className={cn("text-left p-6 rounded-xl mb-6", config.bgColor)}>
      <h3
        className={cn(
          "font-semibold mb-4 text-lg flex items-center gap-2",
          config.textColor
        )}
      >
        {config.icon}
        {title || config.title}
      </h3>
      <p className="text-foreground leading-relaxed">{content}</p>
    </div>
  );
};

// ============================================
// 강점/약점 그리드 섹션
// ============================================

/**
 * 강점/약점 2열 그리드 섹션
 */
export const StrengthsWeaknessesSection: React.FC<StrengthsWeaknessesProps> = ({
  strengths,
  weaknesses,
}) => (
  <div className="grid md:grid-cols-2 gap-4 mb-6">
    {/* 강점 */}
    <div className="text-left p-5 rounded-xl bg-green-500/10">
      <h3 className="font-semibold text-green-600 mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5" />
        강점
      </h3>
      <ul className="space-y-2">
        {strengths.map((strength, idx) => (
          <li
            key={idx}
            className="text-sm text-foreground flex items-start gap-2"
          >
            <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
            {strength}
          </li>
        ))}
      </ul>
    </div>

    {/* 약점 */}
    <div className="text-left p-5 rounded-xl bg-red-500/10">
      <h3 className="font-semibold text-red-600 mb-4 flex items-center gap-2">
        <TrendingDown className="w-5 h-5" />
        약점
      </h3>
      <ul className="space-y-2">
        {weaknesses.map((weakness, idx) => (
          <li
            key={idx}
            className="text-sm text-foreground flex items-start gap-2"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 text-red-500 flex-shrink-0" />
            {weakness}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// ============================================
// 실제 사례 섹션
// ============================================

/**
 * 실제 사례 섹션
 */
export const RealWorldExamplesSection: React.FC<RealWorldExamplesProps> = ({
  examples,
  title = "실제 사례",
}) => (
  <div className="text-left p-6 rounded-xl bg-blue-500/10 mb-6">
    <h3 className="font-semibold text-blue-600 mb-4 text-lg flex items-center gap-2">
      <Users className="w-5 h-5" />
      {title}
    </h3>
    <ul className="space-y-3">
      {examples.map((example, idx) => (
        <li key={idx} className="text-sm text-foreground flex items-start gap-2">
          <span className="font-medium text-blue-500">•</span>
          {example}
        </li>
      ))}
    </ul>
  </div>
);

// ============================================
// 테스트 배경 섹션
// ============================================

/**
 * 테스트 배경 정보 섹션
 * 테스트의 역사, 목적, 면책 조항을 표시합니다.
 */
export const TestBackgroundSection: React.FC<TestBackgroundProps> = ({
  history,
  purpose,
  disclaimer,
  testName = "테스트",
}) => (
  <div className="text-left p-6 rounded-xl bg-muted/30 mb-8">
    <h3 className="font-semibold text-foreground mb-4 text-lg flex items-center gap-2">
      <History className="w-5 h-5" />
      {testName}에 대하여
    </h3>
    <div className="space-y-4">
      <div>
        <h4 className="font-medium text-foreground mb-2">역사</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {history}
        </p>
      </div>
      <div>
        <h4 className="font-medium text-foreground mb-2">목적</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {purpose}
        </p>
      </div>
      <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
        <h4 className="font-medium text-amber-600 mb-2 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          참고사항
        </h4>
        <p className="text-sm text-foreground leading-relaxed">{disclaimer}</p>
      </div>
    </div>
  </div>
);

// ============================================
// 특성 목록 섹션
// ============================================

/**
 * 특성 목록 섹션 (2열 그리드)
 */
export const CharacteristicsSection: React.FC<CharacteristicsProps> = ({
  items,
  title = "주요 특성",
}) => (
  <div className="text-left p-5 rounded-xl bg-cyan-500/10 mb-6">
    <h3 className="font-semibold text-cyan-600 mb-4">{title}</h3>
    <ul className="grid md:grid-cols-2 gap-2">
      {items.map((item, idx) => (
        <li key={idx} className="text-sm text-foreground flex items-start gap-2">
          <span className="text-cyan-500 font-bold">•</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

// ============================================
// 건강한 실천/의사소통 팁 섹션
// ============================================

/**
 * 건강한 실천과 의사소통 팁 2열 그리드
 */
export const PracticesTipsSection: React.FC<PracticesTipsProps> = ({
  practices,
  tips,
  practicesTitle = "건강한 실천",
  tipsTitle = "의사소통 팁",
}) => (
  <div className="grid md:grid-cols-2 gap-4 mb-6">
    <div className="text-left p-5 rounded-xl bg-green-500/10">
      <h3 className="font-semibold text-green-600 mb-4 flex items-center gap-2">
        <Heart className="w-5 h-5" />
        {practicesTitle}
      </h3>
      <ul className="space-y-2">
        {practices.map((practice, idx) => (
          <li
            key={idx}
            className="text-sm text-foreground flex items-start gap-2"
          >
            <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
            {practice}
          </li>
        ))}
      </ul>
    </div>
    <div className="text-left p-5 rounded-xl bg-purple-500/10">
      <h3 className="font-semibold text-purple-600 mb-4 flex items-center gap-2">
        <MessageCircle className="w-5 h-5" />
        {tipsTitle}
      </h3>
      <ul className="space-y-2">
        {tips.map((tip, idx) => (
          <li
            key={idx}
            className="text-sm text-foreground flex items-start gap-2"
          >
            <span className="text-purple-500 font-bold">•</span>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// ============================================
// 통합 결과 섹션 컴포넌트
// ============================================

interface EEATResultSectionsProps {
  detailedDescription: string;
  background: {
    content: string;
    variant?: "scientific" | "philosophical" | "historical" | "psychological";
    title?: string;
  };
  strengths: string[];
  weaknesses: string[];
  realWorldExamples: string[];
  testBackground: {
    history: string;
    purpose: string;
    disclaimer: string;
    testName?: string;
  };
  resultName?: string;
  resultColor?: string;
}

/**
 * 모든 E-E-A-T 섹션을 한 번에 렌더링하는 통합 컴포넌트
 */
export const EEATResultSections: React.FC<EEATResultSectionsProps> = ({
  detailedDescription,
  background,
  strengths,
  weaknesses,
  realWorldExamples,
  testBackground,
  resultName,
  resultColor,
}) => (
  <>
    <DetailedDescriptionSection
      title={resultName ? `${resultName} 상세 분석` : "상세 분석"}
      description={detailedDescription}
      bgColor={resultColor ? `${resultColor}/10` : "bg-primary/5"}
      textColor={resultColor ? resultColor.replace("bg-", "text-").replace("/10", "-600") : "text-primary"}
    />

    <BackgroundSection
      title={background.title}
      content={background.content}
      variant={background.variant}
    />

    <StrengthsWeaknessesSection
      strengths={strengths}
      weaknesses={weaknesses}
    />

    <RealWorldExamplesSection examples={realWorldExamples} />

    <TestBackgroundSection
      history={testBackground.history}
      purpose={testBackground.purpose}
      disclaimer={testBackground.disclaimer}
      testName={testBackground.testName}
    />
  </>
);

export default EEATResultSections;
