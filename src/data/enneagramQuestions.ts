export type EnneagramType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface EnneagramQuestion {
  id: number;
  text: string;
  type: EnneagramType;
}

// 5점 척도 옵션
export type AnswerValue = 1 | 2 | 3 | 4 | 5;

export const answerOptions: { value: AnswerValue; label: string }[] = [
  { value: 1, label: "전혀 아니다" },
  { value: 2, label: "아니다" },
  { value: 3, label: "보통이다" },
  { value: 4, label: "그렇다" },
  { value: 5, label: "매우 그렇다" },
];

// 각 유형당 4개 질문, 총 36개 질문
export const enneagramQuestions: EnneagramQuestion[] = [
  // === Type 1 (개혁가) - 4문항 ===
  {
    id: 1,
    text: "나는 항상 올바른 일을 해야 한다는 강한 의무감을 느낀다.",
    type: 1,
  },
  {
    id: 2,
    text: "사소한 실수도 나를 괴롭히며, 완벽하게 하지 않으면 불안하다.",
    type: 1,
  },
  {
    id: 3,
    text: "다른 사람들이 규칙을 어기거나 부주의하면 화가 난다.",
    type: 1,
  },
  {
    id: 4,
    text: "나는 내 자신과 타인에게 높은 기준을 적용한다.",
    type: 1,
  },

  // === Type 2 (조력가) - 4문항 ===
  {
    id: 5,
    text: "다른 사람을 도울 때 가장 행복하고 보람을 느낀다.",
    type: 2,
  },
  {
    id: 6,
    text: "나는 다른 사람의 감정과 필요를 잘 파악한다.",
    type: 2,
  },
  {
    id: 7,
    text: "사람들에게 필요한 존재가 되는 것이 중요하다.",
    type: 2,
  },
  {
    id: 8,
    text: "내가 베푼 것에 대해 감사받지 못하면 서운하다.",
    type: 2,
  },

  // === Type 3 (성취가) - 4문항 ===
  {
    id: 9,
    text: "성공하고 인정받는 것이 나에게 매우 중요하다.",
    type: 3,
  },
  {
    id: 10,
    text: "나는 목표를 달성하기 위해 효율적으로 일한다.",
    type: 3,
  },
  {
    id: 11,
    text: "다른 사람들에게 어떻게 보이는지 신경을 많이 쓴다.",
    type: 3,
  },
  {
    id: 12,
    text: "실패는 나에게 받아들이기 어려운 일이다.",
    type: 3,
  },

  // === Type 4 (예술가) - 4문항 ===
  {
    id: 13,
    text: "나는 다른 사람들과 다르다고 느끼며, 이것이 나의 정체성이다.",
    type: 4,
  },
  {
    id: 14,
    text: "깊은 감정과 내면의 세계가 나에게 매우 중요하다.",
    type: 4,
  },
  {
    id: 15,
    text: "평범하거나 일상적인 것에 만족하지 못한다.",
    type: 4,
  },
  {
    id: 16,
    text: "나는 우울함이나 그리움 같은 감정을 자주 경험한다.",
    type: 4,
  },

  // === Type 5 (탐구가) - 4문항 ===
  {
    id: 17,
    text: "지식을 쌓고 이해하는 것이 나에게 가장 중요하다.",
    type: 5,
  },
  {
    id: 18,
    text: "혼자만의 시간과 공간이 꼭 필요하다.",
    type: 5,
  },
  {
    id: 19,
    text: "감정보다는 논리와 분석을 더 신뢰한다.",
    type: 5,
  },
  {
    id: 20,
    text: "나는 관찰자로서 한 발짝 물러서 있는 것을 선호한다.",
    type: 5,
  },

  // === Type 6 (충성가) - 4문항 ===
  {
    id: 21,
    text: "최악의 상황을 대비해 미리 준비하는 편이다.",
    type: 6,
  },
  {
    id: 22,
    text: "신뢰할 수 있는 사람이나 조직에 충성하는 것이 중요하다.",
    type: 6,
  },
  {
    id: 23,
    text: "결정을 내리기 전에 여러 가지 가능성과 위험을 고려한다.",
    type: 6,
  },
  {
    id: 24,
    text: "권위자나 시스템에 대해 의심과 신뢰 사이에서 갈등한다.",
    type: 6,
  },

  // === Type 7 (낙천가) - 4문항 ===
  {
    id: 25,
    text: "새로운 경험과 가능성을 탐색하는 것이 즐겁다.",
    type: 7,
  },
  {
    id: 26,
    text: "지루함과 제약을 피하고 싶어한다.",
    type: 7,
  },
  {
    id: 27,
    text: "미래의 계획과 아이디어에 대해 생각하면 신난다.",
    type: 7,
  },
  {
    id: 28,
    text: "부정적인 감정보다는 긍정적인 면에 집중하려 한다.",
    type: 7,
  },

  // === Type 8 (도전가) - 4문항 ===
  {
    id: 29,
    text: "나는 강하고 자신감 있게 행동한다.",
    type: 8,
  },
  {
    id: 30,
    text: "불의나 약자를 괴롭히는 것을 보면 참지 못한다.",
    type: 8,
  },
  {
    id: 31,
    text: "상황을 통제하고 주도권을 갖는 것이 편하다.",
    type: 8,
  },
  {
    id: 32,
    text: "나약함을 보이는 것은 위험하다고 느낀다.",
    type: 8,
  },

  // === Type 9 (중재자) - 4문항 ===
  {
    id: 33,
    text: "갈등을 피하고 평화로운 분위기를 유지하고 싶다.",
    type: 9,
  },
  {
    id: 34,
    text: "다른 사람의 관점을 쉽게 이해하고 수용한다.",
    type: 9,
  },
  {
    id: 35,
    text: "중요한 결정을 내리는 것이 어렵거나 미루게 된다.",
    type: 9,
  },
  {
    id: 36,
    text: "나만의 의견보다 모두가 동의할 수 있는 것을 선호한다.",
    type: 9,
  },
];

export interface EnneagramResult {
  scores: Record<EnneagramType, number>; // 각 유형별 점수 (0-100)
  mainType: EnneagramType;
  wing: EnneagramType | null;
}

export interface EnneagramTypeInfo {
  name: string;
  nameEn: string;
  title: string;
  coreMotivation: string;
  coreFear: string;
  coreDesire: string;
  growthDirection: string;
  stressDirection: string;
  characteristics: string[];
  strengths: string[];
  challenges: string[];
  color: string;
}

export const enneagramTypeInfo: Record<EnneagramType, EnneagramTypeInfo> = {
  1: {
    name: "1유형",
    nameEn: "Type 1",
    title: "개혁가 (The Reformer)",
    coreMotivation: "올바르고 선한 것을 추구하며, 더 나은 세상을 만들고자 함",
    coreFear: "부패하거나 결함이 있는 존재가 되는 것, 비난받는 것",
    coreDesire: "완전함, 올바름, 균형을 이루는 것",
    growthDirection: "7유형으로 통합 - 자발성과 즐거움을 받아들임",
    stressDirection: "4유형으로 분열 - 우울하고 자기비판적이 됨",
    characteristics: [
      "원칙적이고 목적의식이 강함",
      "자기 통제력이 뛰어남",
      "높은 도덕적 기준을 가짐",
      "개선과 발전을 추구함",
    ],
    strengths: [
      "정직하고 신뢰할 수 있음",
      "책임감이 강함",
      "공정하고 윤리적임",
      "근면하고 성실함",
    ],
    challenges: [
      "지나친 비판적 태도",
      "완벽주의로 인한 스트레스",
      "분노를 억압하는 경향",
      "융통성 부족",
    ],
    color: "slate",
  },
  2: {
    name: "2유형",
    nameEn: "Type 2",
    title: "조력가 (The Helper)",
    coreMotivation: "사랑받고 필요한 존재가 되고자 함",
    coreFear: "사랑받지 못하고 원치 않는 존재가 되는 것",
    coreDesire: "무조건적인 사랑을 받는 것",
    growthDirection: "4유형으로 통합 - 자기 인식과 진정성을 발견함",
    stressDirection: "8유형으로 분열 - 공격적이고 지배적이 됨",
    characteristics: [
      "따뜻하고 배려심이 깊음",
      "타인의 필요에 민감함",
      "관계 중심적임",
      "칭찬과 감사에 동기부여됨",
    ],
    strengths: [
      "공감 능력이 뛰어남",
      "관대하고 친절함",
      "사람들을 연결하는 능력",
      "헌신적이고 지지적임",
    ],
    challenges: [
      "자신의 필요를 무시함",
      "타인에게 지나치게 개입함",
      "조건적인 도움을 제공함",
      "거절에 대한 두려움",
    ],
    color: "rose",
  },
  3: {
    name: "3유형",
    nameEn: "Type 3",
    title: "성취가 (The Achiever)",
    coreMotivation: "가치있고 성공적인 사람이 되고자 함",
    coreFear: "무가치하고 실패한 존재가 되는 것",
    coreDesire: "가치있고 인정받는 것",
    growthDirection: "6유형으로 통합 - 충성심과 진정한 연결을 발견함",
    stressDirection: "9유형으로 분열 - 무기력하고 방향을 잃음",
    characteristics: [
      "목표 지향적이고 야심적임",
      "적응력이 뛰어남",
      "이미지에 신경을 씀",
      "효율적이고 생산적임",
    ],
    strengths: [
      "추진력과 결단력",
      "뛰어난 커뮤니케이션 능력",
      "리더십과 동기부여 능력",
      "긍정적이고 활력 넘침",
    ],
    challenges: [
      "일중독 경향",
      "진정한 자아를 잃을 수 있음",
      "타인의 평가에 지나치게 의존",
      "감정을 억압함",
    ],
    color: "amber",
  },
  4: {
    name: "4유형",
    nameEn: "Type 4",
    title: "예술가 (The Individualist)",
    coreMotivation: "자신의 정체성을 찾고 독특함을 표현하고자 함",
    coreFear: "정체성이 없거나 평범한 존재가 되는 것",
    coreDesire: "진정한 자신을 찾고 표현하는 것",
    growthDirection: "1유형으로 통합 - 규율과 객관성을 얻음",
    stressDirection: "2유형으로 분열 - 지나치게 의존적이 됨",
    characteristics: [
      "감수성이 풍부하고 표현적임",
      "독창적이고 창의적임",
      "깊은 감정을 경험함",
      "진정성을 추구함",
    ],
    strengths: [
      "깊은 공감 능력",
      "창의성과 예술적 감각",
      "진정성과 정직함",
      "감정적 깊이",
    ],
    challenges: [
      "우울함과 멜랑콜리",
      "자기 몰입과 자기 연민",
      "질투와 비교",
      "감정 기복",
    ],
    color: "purple",
  },
  5: {
    name: "5유형",
    nameEn: "Type 5",
    title: "탐구가 (The Investigator)",
    coreMotivation: "지식을 쌓고 세상을 이해하고자 함",
    coreFear: "무능하고 쓸모없는 존재가 되는 것",
    coreDesire: "유능하고 지식이 풍부한 것",
    growthDirection: "8유형으로 통합 - 자신감과 행동력을 얻음",
    stressDirection: "7유형으로 분열 - 산만하고 충동적이 됨",
    characteristics: [
      "분석적이고 통찰력 있음",
      "독립적이고 자족적임",
      "지적 호기심이 강함",
      "관찰자적 태도",
    ],
    strengths: [
      "뛰어난 분석력",
      "객관적이고 냉철함",
      "집중력과 인내심",
      "지적 깊이",
    ],
    challenges: [
      "감정적 거리감",
      "지나친 고립",
      "행동보다 관찰에 치우침",
      "에너지 고갈에 대한 두려움",
    ],
    color: "blue",
  },
  6: {
    name: "6유형",
    nameEn: "Type 6",
    title: "충성가 (The Loyalist)",
    coreMotivation: "안전하고 지지받는 환경을 만들고자 함",
    coreFear: "지원이나 안내 없이 남겨지는 것",
    coreDesire: "안전과 확신을 갖는 것",
    growthDirection: "9유형으로 통합 - 평화로움과 신뢰를 얻음",
    stressDirection: "3유형으로 분열 - 경쟁적이고 오만해짐",
    characteristics: [
      "책임감이 강하고 신뢰할 수 있음",
      "위험을 예측하고 대비함",
      "충성스럽고 헌신적임",
      "의심과 확인을 반복함",
    ],
    strengths: [
      "충성심과 헌신",
      "문제 해결 능력",
      "위기 대처 능력",
      "협동적이고 지지적임",
    ],
    challenges: [
      "불안과 걱정",
      "의심과 불신",
      "최악의 시나리오 상상",
      "결정 장애",
    ],
    color: "teal",
  },
  7: {
    name: "7유형",
    nameEn: "Type 7",
    title: "낙천가 (The Enthusiast)",
    coreMotivation: "행복하고 자유로우며 다양한 경험을 하고자 함",
    coreFear: "고통받고 제한되며 지루해지는 것",
    coreDesire: "만족하고 충족되는 것",
    growthDirection: "5유형으로 통합 - 깊이와 집중력을 얻음",
    stressDirection: "1유형으로 분열 - 비판적이고 완벽주의적이 됨",
    characteristics: [
      "열정적이고 에너지 넘침",
      "다재다능하고 창의적임",
      "미래 지향적임",
      "낙관적이고 유쾌함",
    ],
    strengths: [
      "긍정적인 에너지",
      "창의성과 아이디어",
      "적응력과 유연성",
      "재미있고 영감을 줌",
    ],
    challenges: [
      "약속을 지키기 어려움",
      "깊이 부족",
      "고통을 회피함",
      "산만하고 집중력 부족",
    ],
    color: "orange",
  },
  8: {
    name: "8유형",
    nameEn: "Type 8",
    title: "도전가 (The Challenger)",
    coreMotivation: "자신과 타인을 보호하고 통제하고자 함",
    coreFear: "통제당하거나 상처받는 것",
    coreDesire: "자신을 보호하고 통제권을 유지하는 것",
    growthDirection: "2유형으로 통합 - 부드러움과 배려를 얻음",
    stressDirection: "5유형으로 분열 - 고립되고 비밀스러워짐",
    characteristics: [
      "강인하고 자신감 있음",
      "결단력이 있음",
      "직접적이고 솔직함",
      "보호적이고 정의로움",
    ],
    strengths: [
      "리더십과 결단력",
      "용기와 자신감",
      "정의감",
      "보호하는 힘",
    ],
    challenges: [
      "지나친 강압",
      "취약함을 보이기 어려움",
      "분노 조절",
      "타인을 위협할 수 있음",
    ],
    color: "red",
  },
  9: {
    name: "9유형",
    nameEn: "Type 9",
    title: "중재자 (The Peacemaker)",
    coreMotivation: "내적 평화를 유지하고 조화를 이루고자 함",
    coreFear: "분리되고 갈등에 휘말리는 것",
    coreDesire: "평화와 조화를 유지하는 것",
    growthDirection: "3유형으로 통합 - 자기 발전과 추진력을 얻음",
    stressDirection: "6유형으로 분열 - 불안하고 의존적이 됨",
    characteristics: [
      "평화롭고 수용적임",
      "중재 능력이 뛰어남",
      "인내심이 강함",
      "다양한 관점을 이해함",
    ],
    strengths: [
      "중재와 조화 능력",
      "수용적이고 개방적임",
      "안정감을 줌",
      "공감과 이해",
    ],
    challenges: [
      "자기 주장 부족",
      "결정 회피",
      "수동적 공격성",
      "자신을 잊어버림",
    ],
    color: "green",
  },
};

export const typeColors: Record<EnneagramType, string> = {
  1: "bg-slate-500",
  2: "bg-rose-500",
  3: "bg-amber-500",
  4: "bg-purple-500",
  5: "bg-blue-500",
  6: "bg-teal-500",
  7: "bg-orange-500",
  8: "bg-red-500",
  9: "bg-green-500",
};

export const typeTextColors: Record<EnneagramType, string> = {
  1: "text-slate-500",
  2: "text-rose-500",
  3: "text-amber-500",
  4: "text-purple-500",
  5: "text-blue-500",
  6: "text-teal-500",
  7: "text-orange-500",
  8: "text-red-500",
  9: "text-green-500",
};

export const typeBgColors: Record<EnneagramType, string> = {
  1: "from-slate-500/10 to-gray-500/10",
  2: "from-rose-500/10 to-pink-500/10",
  3: "from-amber-500/10 to-yellow-500/10",
  4: "from-purple-500/10 to-violet-500/10",
  5: "from-blue-500/10 to-cyan-500/10",
  6: "from-teal-500/10 to-emerald-500/10",
  7: "from-orange-500/10 to-amber-500/10",
  8: "from-red-500/10 to-rose-500/10",
  9: "from-green-500/10 to-emerald-500/10",
};

// 날개(Wing) 계산 - 인접한 유형 중 높은 점수
export const getWing = (
  mainType: EnneagramType,
  scores: Record<EnneagramType, number>
): EnneagramType | null => {
  // 인접한 유형 (1-9는 원형으로 연결됨)
  const leftWing = mainType === 1 ? 9 : (mainType - 1) as EnneagramType;
  const rightWing = mainType === 9 ? 1 : (mainType + 1) as EnneagramType;

  const leftScore = scores[leftWing];
  const rightScore = scores[rightWing];

  // 점수 차이가 너무 작으면 날개가 없는 것으로 판단
  if (Math.abs(leftScore - rightScore) < 5) {
    return null;
  }

  return leftScore > rightScore ? leftWing : rightWing;
};

// 에니어그램 유형 순서 (원형 다이어그램용)
export const typeOrder: EnneagramType[] = [9, 1, 2, 3, 4, 5, 6, 7, 8];

// 센터별 그룹
export const centers = {
  body: [8, 9, 1] as EnneagramType[], // 본능 센터 (분노)
  heart: [2, 3, 4] as EnneagramType[], // 감정 센터 (수치심)
  head: [5, 6, 7] as EnneagramType[], // 사고 센터 (두려움)
};

export const centerInfo = {
  body: {
    name: "본능 센터",
    emotion: "분노",
    description: "본능과 신체 감각을 기반으로 세상과 상호작용합니다.",
  },
  heart: {
    name: "감정 센터",
    emotion: "수치심",
    description: "감정과 관계를 기반으로 세상과 상호작용합니다.",
  },
  head: {
    name: "사고 센터",
    emotion: "두려움",
    description: "생각과 분석을 기반으로 세상과 상호작용합니다.",
  },
};

export const getCenter = (type: EnneagramType): "body" | "heart" | "head" => {
  if (centers.body.includes(type)) return "body";
  if (centers.heart.includes(type)) return "heart";
  return "head";
};
