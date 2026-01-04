export type PersonalityDimension =
  | "energyRecharge" // 에너지 충전 방식
  | "socialPreference" // 사회적 선호도
  | "stimulationSeeking" // 자극 추구 수준
  | "focusDirection" // 내부 vs 외부 집중
  | "communicationStyle"; // 커뮤니케이션 스타일

export interface IntrovertExtrovertQuestion {
  id: number;
  text: string;
  dimension: PersonalityDimension;
  reversed: boolean; // true면 내향적 문항 (점수가 낮을수록 외향적)
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

// 각 차원당 4개 질문, 총 20개
export const introvertExtrovertQuestions: IntrovertExtrovertQuestion[] = [
  // === 에너지 충전 방식 (Energy Recharge) - 4문항 ===
  {
    id: 1,
    text: "파티나 모임 후에 혼자만의 시간이 필요하다.",
    dimension: "energyRecharge",
    reversed: true,
  },
  {
    id: 2,
    text: "사람들과 어울리면 에너지가 충전되는 느낌이 든다.",
    dimension: "energyRecharge",
    reversed: false,
  },
  {
    id: 3,
    text: "혼자 있는 시간이 길어지면 지루하고 불안해진다.",
    dimension: "energyRecharge",
    reversed: false,
  },
  {
    id: 4,
    text: "휴식을 취할 때 혼자 조용히 있는 것이 더 편안하다.",
    dimension: "energyRecharge",
    reversed: true,
  },

  // === 사회적 선호도 (Social Preference) - 4문항 ===
  {
    id: 5,
    text: "대규모 파티보다 소수의 친한 친구와의 모임이 더 좋다.",
    dimension: "socialPreference",
    reversed: true,
  },
  {
    id: 6,
    text: "새로운 사람들을 만나는 것이 즐겁다.",
    dimension: "socialPreference",
    reversed: false,
  },
  {
    id: 7,
    text: "넓은 인간관계보다 깊은 소수의 관계가 더 중요하다.",
    dimension: "socialPreference",
    reversed: true,
  },
  {
    id: 8,
    text: "다양한 사람들과 네트워킹하는 것이 자연스럽다.",
    dimension: "socialPreference",
    reversed: false,
  },

  // === 자극 추구 수준 (Stimulation Seeking) - 4문항 ===
  {
    id: 9,
    text: "조용하고 차분한 환경에서 일할 때 집중이 더 잘 된다.",
    dimension: "stimulationSeeking",
    reversed: true,
  },
  {
    id: 10,
    text: "새롭고 흥미진진한 경험을 자주 찾아다닌다.",
    dimension: "stimulationSeeking",
    reversed: false,
  },
  {
    id: 11,
    text: "예측 가능하고 익숙한 상황이 더 편안하다.",
    dimension: "stimulationSeeking",
    reversed: true,
  },
  {
    id: 12,
    text: "활기차고 북적이는 장소에서 기분이 좋아진다.",
    dimension: "stimulationSeeking",
    reversed: false,
  },

  // === 내부 vs 외부 집중 (Focus Direction) - 4문항 ===
  {
    id: 13,
    text: "말하기 전에 생각을 정리하는 편이다.",
    dimension: "focusDirection",
    reversed: true,
  },
  {
    id: 14,
    text: "생각을 말로 하면서 정리하는 편이다.",
    dimension: "focusDirection",
    reversed: false,
  },
  {
    id: 15,
    text: "자신의 내면 세계에 대해 깊이 성찰하는 시간을 갖는다.",
    dimension: "focusDirection",
    reversed: true,
  },
  {
    id: 16,
    text: "외부 활동과 행동을 통해 자신을 표현한다.",
    dimension: "focusDirection",
    reversed: false,
  },

  // === 커뮤니케이션 스타일 (Communication Style) - 4문항 ===
  {
    id: 17,
    text: "그룹 대화에서 주로 듣는 역할을 한다.",
    dimension: "communicationStyle",
    reversed: true,
  },
  {
    id: 18,
    text: "모임에서 대화를 주도하고 분위기를 이끄는 편이다.",
    dimension: "communicationStyle",
    reversed: false,
  },
  {
    id: 19,
    text: "일대일 대화가 그룹 대화보다 더 편하다.",
    dimension: "communicationStyle",
    reversed: true,
  },
  {
    id: 20,
    text: "낯선 사람에게도 먼저 말을 거는 것이 어렵지 않다.",
    dimension: "communicationStyle",
    reversed: false,
  },
];

// 결과 유형
export type PersonalityType =
  | "strongIntrovert"
  | "introvert"
  | "ambivert"
  | "extrovert"
  | "strongExtrovert";

export interface IntrovertExtrovertResult {
  extroversionScore: number; // 0-100
  personalityType: PersonalityType;
  dimensionScores: Record<PersonalityDimension, number>;
}

// 점수에 따른 성격 유형 결정
export const getPersonalityType = (score: number): PersonalityType => {
  if (score <= 25) return "strongIntrovert";
  if (score <= 40) return "introvert";
  if (score <= 60) return "ambivert";
  if (score <= 75) return "extrovert";
  return "strongExtrovert";
};

export const dimensionDescriptions: Record<PersonalityDimension, {
  name: string;
  nameEn: string;
  description: string;
}> = {
  energyRecharge: {
    name: "에너지 충전 방식",
    nameEn: "Energy Recharge",
    description: "혼자 있을 때 vs 사람들과 함께할 때 에너지를 얻는 정도",
  },
  socialPreference: {
    name: "사회적 선호도",
    nameEn: "Social Preference",
    description: "소규모 vs 대규모 모임에 대한 선호도",
  },
  stimulationSeeking: {
    name: "자극 추구 수준",
    nameEn: "Stimulation Seeking",
    description: "새로운 자극과 흥분을 추구하는 정도",
  },
  focusDirection: {
    name: "집중 방향",
    nameEn: "Focus Direction",
    description: "내면 세계 vs 외부 세계에 집중하는 정도",
  },
  communicationStyle: {
    name: "의사소통 스타일",
    nameEn: "Communication Style",
    description: "대화에서의 역할과 소통 방식",
  },
};

export const personalityTypeDescriptions: Record<PersonalityType, {
  name: string;
  nameEn: string;
  description: string;
  characteristics: string[];
  energyTips: string[];
  strengths: string[];
  watchPoints: string[];
  color: string;
}> = {
  strongIntrovert: {
    name: "강한 내향형",
    nameEn: "Strong Introvert",
    description: "당신은 혼자만의 시간에서 가장 큰 에너지를 얻습니다. 깊이 있는 생각과 내면 세계를 탐구하며, 소수의 의미 있는 관계를 소중히 여깁니다.",
    characteristics: [
      "혼자만의 시간이 필수적으로 필요합니다",
      "깊이 있는 일대일 대화를 선호합니다",
      "생각을 충분히 정리한 후에 말합니다",
      "조용한 환경에서 최상의 성과를 냅니다",
      "소수의 깊은 관계를 유지합니다",
    ],
    energyTips: [
      "사회적 활동 후에는 충분한 혼자만의 시간을 확보하세요",
      "조용한 공간에서 재충전하는 시간을 일상에 포함시키세요",
      "대규모 모임 전에 에너지를 미리 충전해두세요",
      "자신만의 피난처(집, 방, 특정 장소)를 만들어 두세요",
    ],
    strengths: [
      "깊이 있는 사고력과 통찰력",
      "집중력과 인내심이 뛰어남",
      "듣는 능력과 공감 능력이 우수함",
      "독립적으로 일하는 능력",
      "진정성 있는 관계 형성",
    ],
    watchPoints: [
      "지나친 고립에 주의가 필요합니다",
      "필요할 때 의견을 표현하는 것이 중요합니다",
      "새로운 관계 형성에 열린 마음을 가지세요",
      "때로는 편안함을 벗어나 도전해 보세요",
    ],
    color: "indigo",
  },
  introvert: {
    name: "내향형",
    nameEn: "Introvert",
    description: "당신은 내면의 세계를 중시하며, 혼자 또는 소수의 사람들과 함께할 때 편안함을 느낍니다. 사교적인 상황도 즐길 수 있지만, 재충전을 위한 혼자만의 시간이 필요합니다.",
    characteristics: [
      "사교 활동 후 혼자만의 시간이 필요합니다",
      "소규모 모임을 대규모 파티보다 선호합니다",
      "깊이 있는 대화를 좋아합니다",
      "관찰하고 경청하는 것을 잘합니다",
      "신중하게 결정을 내리는 편입니다",
    ],
    energyTips: [
      "일정에 혼자만의 시간을 정기적으로 배치하세요",
      "사회적 활동의 양을 자신에게 맞게 조절하세요",
      "에너지 수준을 모니터링하고 한계를 인식하세요",
      "조용한 취미나 활동을 통해 재충전하세요",
    ],
    strengths: [
      "신중하고 사려 깊은 의사결정",
      "경청과 관찰 능력",
      "깊이 있는 관계 형성",
      "독립적 작업 능력",
      "집중력과 끈기",
    ],
    watchPoints: [
      "자신의 생각을 더 적극적으로 표현해 보세요",
      "네트워킹의 중요성도 인식하세요",
      "새로운 경험에 때때로 도전해 보세요",
      "사회적 스킬을 지속적으로 연습하세요",
    ],
    color: "blue",
  },
  ambivert: {
    name: "양향형",
    nameEn: "Ambivert",
    description: "당신은 내향성과 외향성 사이에서 유연하게 움직입니다. 상황에 따라 사교적일 수도, 혼자 있기를 원할 수도 있습니다. 이러한 유연성은 다양한 환경에 적응하는 데 큰 강점이 됩니다.",
    characteristics: [
      "상황에 따라 내향적이거나 외향적으로 행동합니다",
      "혼자만의 시간과 사회적 시간 모두 즐깁니다",
      "다양한 유형의 사람들과 잘 어울립니다",
      "에너지 수준이 상황에 따라 달라집니다",
      "듣는 것과 말하는 것 모두 편안합니다",
    ],
    energyTips: [
      "자신의 에너지 패턴을 주의 깊게 관찰하세요",
      "필요에 따라 사회적 활동과 혼자만의 시간을 균형 있게 조절하세요",
      "과도한 사회적 활동이나 고립 모두 피하세요",
      "현재 기분과 에너지 수준에 귀 기울이세요",
    ],
    strengths: [
      "상황에 맞게 적응하는 유연성",
      "다양한 유형의 사람들과 연결 능력",
      "듣기와 말하기 균형",
      "폭넓은 관점과 이해력",
      "협업과 독립 작업 모두 가능",
    ],
    watchPoints: [
      "때로 정체성에 대해 혼란스러울 수 있습니다",
      "자신의 진정한 선호도를 파악하는 시간을 가지세요",
      "상황에 지나치게 맞추느라 자신을 잃지 마세요",
      "일관된 자기 관리 루틴을 만드세요",
    ],
    color: "purple",
  },
  extrovert: {
    name: "외향형",
    nameEn: "Extrovert",
    description: "당신은 사람들과의 상호작용에서 에너지를 얻습니다. 사교적인 활동을 즐기고, 다양한 사람들과 어울리는 것을 좋아합니다. 혼자 있는 시간도 필요하지만, 사람들과 함께할 때 가장 활기를 느낍니다.",
    characteristics: [
      "사람들과 함께할 때 에너지를 얻습니다",
      "새로운 사람을 만나는 것을 즐깁니다",
      "대화를 이끌고 분위기를 만들어갑니다",
      "행동하면서 생각을 정리합니다",
      "다양한 활동과 경험을 추구합니다",
    ],
    energyTips: [
      "사회적 활동을 정기적으로 계획하세요",
      "다양한 사람들과 교류할 기회를 만드세요",
      "팀 프로젝트나 협업 활동에 참여하세요",
      "때로는 혼자만의 성찰 시간도 필요함을 기억하세요",
    ],
    strengths: [
      "뛰어난 사교성과 네트워킹 능력",
      "긍정적 에너지와 열정 전파",
      "빠른 의사결정과 행동력",
      "팀 분위기 조성 능력",
      "새로운 환경에 빠른 적응",
    ],
    watchPoints: [
      "때로는 경청에 더 집중해 보세요",
      "혼자만의 시간의 가치도 인식하세요",
      "깊이 있는 성찰의 시간을 가지세요",
      "말하기 전에 한 번 더 생각해 보세요",
    ],
    color: "amber",
  },
  strongExtrovert: {
    name: "강한 외향형",
    nameEn: "Strong Extrovert",
    description: "당신은 사람들과의 상호작용을 통해 가장 큰 에너지를 얻습니다. 활기차고 사교적이며, 주변에 긍정적인 에너지를 전파합니다. 리더십과 소통 능력이 뛰어납니다.",
    characteristics: [
      "사람들과 함께할 때 가장 활기찹니다",
      "대규모 모임과 네트워킹을 즐깁니다",
      "자연스럽게 대화를 이끌고 주목받습니다",
      "새로운 경험과 자극을 적극적으로 찾습니다",
      "생각을 바로 말로 표현하는 편입니다",
    ],
    energyTips: [
      "활발한 사회적 일정을 유지하세요",
      "리더십 역할이나 팀 활동에 참여하세요",
      "새로운 사람들을 만날 기회를 찾으세요",
      "가끔은 혼자만의 시간도 의도적으로 가지세요",
    ],
    strengths: [
      "강력한 리더십과 영향력",
      "뛰어난 의사소통 능력",
      "높은 에너지와 열정",
      "빠른 관계 형성 능력",
      "변화에 대한 적응력",
    ],
    watchPoints: [
      "다른 사람의 말을 끝까지 들어주세요",
      "내향적인 사람들의 스타일을 존중하세요",
      "혼자만의 성찰 시간을 일부러 만드세요",
      "때로는 속도를 늦추고 깊이 생각해 보세요",
    ],
    color: "orange",
  },
};

export const dimensionOrder: PersonalityDimension[] = [
  "energyRecharge",
  "socialPreference",
  "stimulationSeeking",
  "focusDirection",
  "communicationStyle",
];

export const typeColors: Record<PersonalityType, string> = {
  strongIntrovert: "bg-indigo-500",
  introvert: "bg-blue-500",
  ambivert: "bg-purple-500",
  extrovert: "bg-amber-500",
  strongExtrovert: "bg-orange-500",
};

export const typeTextColors: Record<PersonalityType, string> = {
  strongIntrovert: "text-indigo-500",
  introvert: "text-blue-500",
  ambivert: "text-purple-500",
  extrovert: "text-amber-500",
  strongExtrovert: "text-orange-500",
};

export const typeBgColors: Record<PersonalityType, string> = {
  strongIntrovert: "from-indigo-500/10 to-blue-500/10",
  introvert: "from-blue-500/10 to-cyan-500/10",
  ambivert: "from-purple-500/10 to-pink-500/10",
  extrovert: "from-amber-500/10 to-yellow-500/10",
  strongExtrovert: "from-orange-500/10 to-red-500/10",
};
