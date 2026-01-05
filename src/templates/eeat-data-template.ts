/**
 * E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) 패턴 기반
 * 테스트 결과 데이터 인터페이스 템플릿
 *
 * Google E-E-A-T 가이드라인 준수를 위한 표준 데이터 구조
 * 새 테스트 생성 시 이 인터페이스를 확장하여 사용하세요.
 */

// ============================================
// 기본 결과 정보 인터페이스
// ============================================

/**
 * 테스트 결과의 기본 정보
 */
export interface BaseResultInfo {
  /** 영문 이름 */
  name: string;
  /** 한글 이름 */
  nameKo: string;
  /** 짧은 설명 (1-2문장, 50-100자) */
  description: string;
  /** Tailwind gradient class (예: "from-blue-400 to-indigo-500") */
  color: string;
}

// ============================================
// E-E-A-T 확장 인터페이스
// ============================================

/**
 * E-E-A-T 가이드라인을 충족하는 확장 콘텐츠
 */
export interface EEATExtension {
  /**
   * 상세 분석 (최소 500자)
   * - 해당 유형의 심층적 특성 설명
   * - 행동 패턴, 사고 방식, 감정적 특성 포함
   * - 장단점을 균형있게 서술
   */
  detailedDescription: string;

  /**
   * 배경 정보 (최소 300자)
   * 테스트 유형에 따라 다른 이름 사용:
   * - 심리 테스트: scientificBackground (과학적 배경)
   * - 가치관 테스트: philosophicalBackground (철학적 배경)
   * - 문화/역사 테스트: historicalBackground (역사적 배경)
   * - BDSM 테스트: psychologicalBackground (심리학적 배경)
   */
  background: string;

  /**
   * 강점 (4-5개 항목)
   * - 각 항목 1-2문장
   * - 구체적이고 실용적인 강점
   * - 긍정적이지만 과장하지 않음
   */
  strengths: string[];

  /**
   * 약점 (4-5개 항목)
   * - 각 항목 1-2문장
   * - 건설적인 표현 사용
   * - 개선 가능성 암시
   */
  weaknesses: string[];

  /**
   * 실제 사례 (3-4개 항목)
   * - 해당 유형을 가진 실제/가상 인물
   * - 또는 해당 특성이 나타나는 상황
   * - 독자가 공감할 수 있는 예시
   */
  realWorldExamples: string[];
}

// ============================================
// 테스트 배경 정보
// ============================================

/**
 * 테스트 자체에 대한 배경 정보
 * 결과 페이지 하단에 표시
 */
export interface TestBackground {
  /** 테스트의 역사와 발전 과정 */
  history: string;
  /** 테스트의 목적과 측정 대상 */
  purpose: string;
  /** 한계 및 면책 조항 (필수) */
  disclaimer: string;
}

// ============================================
// 전체 E-E-A-T 결과 인터페이스
// ============================================

/**
 * E-E-A-T 가이드라인을 완전히 충족하는 결과 정보
 * BaseResultInfo + EEATExtension 조합
 */
export interface EEATResultInfo extends BaseResultInfo, EEATExtension {}

// ============================================
// 특화된 배경 정보 타입들
// ============================================

/** 과학적 배경 (심리 테스트용) */
export interface ScientificEEATResult extends BaseResultInfo {
  detailedDescription: string;
  scientificBackground: string;
  strengths: string[];
  weaknesses: string[];
  realWorldExamples: string[];
}

/** 철학적 배경 (가치관/도덕 테스트용) */
export interface PhilosophicalEEATResult extends BaseResultInfo {
  detailedDescription: string;
  philosophicalBackground: string;
  strengths: string[];
  weaknesses: string[];
  realWorldExamples: string[];
}

/** 역사적 배경 (정치/문화 테스트용) */
export interface HistoricalEEATResult extends BaseResultInfo {
  detailedDescription: string;
  historicalBackground: string;
  strengths: string[];
  weaknesses: string[];
  realWorldExamples: string[];
}

/** 심리학적 배경 (관계/성향 테스트용) */
export interface PsychologicalEEATResult extends BaseResultInfo {
  detailedDescription: string;
  psychologicalBackground: string;
  characteristics: string[];
  healthyPractices: string[];
  communicationTips: string[];
}

// ============================================
// 유틸리티 타입
// ============================================

/**
 * 결과 데이터 레코드 타입
 * 사용 예: Record<ResultType, EEATResultInfo>
 */
export type EEATResultRecord<T extends string> = Record<T, EEATResultInfo>;

// ============================================
// 예시 템플릿
// ============================================

/**
 * 새 테스트 생성 시 참고할 수 있는 예시 데이터 구조
 */
export const exampleResultTemplate: EEATResultInfo = {
  name: "Example Type",
  nameKo: "예시 유형",
  description: "이 유형에 대한 간단한 설명입니다. 1-2문장으로 핵심을 전달합니다.",
  color: "from-blue-400 to-indigo-500",
  detailedDescription: `
    이 유형에 대한 상세한 분석입니다. 최소 500자 이상 작성해야 합니다.
    해당 유형의 핵심 특성, 행동 패턴, 사고 방식을 설명합니다.
    장점과 단점을 균형있게 다루며, 독자가 자신을 이해하는 데 도움이 되는
    깊이 있는 통찰을 제공합니다. 구체적인 예시와 상황을 포함하면 좋습니다.
  `.trim(),
  background: `
    이 유형의 과학적/철학적/역사적 배경입니다. 최소 300자 이상 작성합니다.
    관련된 이론, 연구, 학자를 인용하여 신뢰성을 높입니다.
    학술적 근거를 바탕으로 설명하되, 일반 독자도 이해할 수 있게 작성합니다.
  `.trim(),
  strengths: [
    "이 유형의 첫 번째 강점에 대한 구체적인 설명입니다",
    "두 번째 강점 - 실용적이고 구체적으로 작성합니다",
    "세 번째 강점 - 긍정적이지만 과장하지 않습니다",
    "네 번째 강점 - 독자가 공감할 수 있는 내용으로",
  ],
  weaknesses: [
    "이 유형이 주의해야 할 첫 번째 점입니다",
    "두 번째 약점 - 건설적인 표현을 사용합니다",
    "세 번째 약점 - 개선 가능성을 암시합니다",
    "네 번째 약점 - 비난이 아닌 이해의 관점에서",
  ],
  realWorldExamples: [
    "이 유형의 대표적인 실제/가상 인물 - 간단한 설명",
    "두 번째 예시 인물 또는 상황 - 독자가 공감할 수 있는 사례",
    "세 번째 예시 - 다양한 분야에서 선택",
  ],
};

/**
 * 테스트 배경 정보 예시 템플릿
 */
export const exampleTestBackground: TestBackground = {
  history: `
    이 테스트의 역사와 발전 과정을 설명합니다.
    누가 언제 만들었는지, 어떻게 발전해왔는지를 포함합니다.
    학술적 근거가 있다면 함께 언급합니다.
  `.trim(),
  purpose: `
    이 테스트의 목적과 측정 대상을 설명합니다.
    어떤 특성을 측정하고, 결과를 어떻게 해석해야 하는지 안내합니다.
  `.trim(),
  disclaimer: `
    이 테스트는 재미와 자기 성찰을 위한 것이며, 전문적인 심리학적 진단 도구가 아닙니다.
    결과를 절대적인 것으로 받아들이지 마시고, 자신을 탐구하는 출발점으로 활용해 주세요.
  `.trim(),
};
