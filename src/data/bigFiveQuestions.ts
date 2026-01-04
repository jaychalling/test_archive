export type BigFiveTrait =
  | "openness"
  | "conscientiousness"
  | "extraversion"
  | "agreeableness"
  | "neuroticism";

export interface BigFiveQuestion {
  id: number;
  text: string;
  trait: BigFiveTrait;
  reversed: boolean; // true if the question is negatively worded
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

// 각 특성당 10개 질문, 긍정/부정 문항 혼합
export const bigFiveQuestions: BigFiveQuestion[] = [
  // === Openness (개방성) - 10문항 ===
  {
    id: 1,
    text: "새로운 아이디어나 경험을 시도하는 것을 즐긴다.",
    trait: "openness",
    reversed: false,
  },
  {
    id: 2,
    text: "예술이나 미적인 것에 관심이 많다.",
    trait: "openness",
    reversed: false,
  },
  {
    id: 3,
    text: "상상력이 풍부한 편이다.",
    trait: "openness",
    reversed: false,
  },
  {
    id: 4,
    text: "추상적인 개념이나 철학적 사고에 흥미를 느낀다.",
    trait: "openness",
    reversed: false,
  },
  {
    id: 5,
    text: "다양한 관점에서 사물을 바라보려고 노력한다.",
    trait: "openness",
    reversed: false,
  },
  {
    id: 6,
    text: "새로운 것을 배우는 것이 즐겁다.",
    trait: "openness",
    reversed: false,
  },
  {
    id: 7,
    text: "전통적인 방식을 고수하는 것이 더 편하다.",
    trait: "openness",
    reversed: true,
  },
  {
    id: 8,
    text: "변화보다는 익숙한 것이 더 좋다.",
    trait: "openness",
    reversed: true,
  },
  {
    id: 9,
    text: "창의적인 활동(글쓰기, 그림, 음악 등)에 관심이 있다.",
    trait: "openness",
    reversed: false,
  },
  {
    id: 10,
    text: "현실적이고 실용적인 것만 중요하게 생각한다.",
    trait: "openness",
    reversed: true,
  },

  // === Conscientiousness (성실성) - 10문항 ===
  {
    id: 11,
    text: "일을 미리 계획하고 준비하는 편이다.",
    trait: "conscientiousness",
    reversed: false,
  },
  {
    id: 12,
    text: "맡은 일은 책임감 있게 끝까지 완수한다.",
    trait: "conscientiousness",
    reversed: false,
  },
  {
    id: 13,
    text: "정리정돈을 잘하고 깔끔하게 유지하려고 한다.",
    trait: "conscientiousness",
    reversed: false,
  },
  {
    id: 14,
    text: "목표를 세우고 그것을 달성하기 위해 노력한다.",
    trait: "conscientiousness",
    reversed: false,
  },
  {
    id: 15,
    text: "시간 약속을 잘 지키는 편이다.",
    trait: "conscientiousness",
    reversed: false,
  },
  {
    id: 16,
    text: "일을 끝까지 미루는 경향이 있다.",
    trait: "conscientiousness",
    reversed: true,
  },
  {
    id: 17,
    text: "규칙과 원칙을 중요하게 생각한다.",
    trait: "conscientiousness",
    reversed: false,
  },
  {
    id: 18,
    text: "물건을 자주 잃어버리거나 어디 두었는지 잊는다.",
    trait: "conscientiousness",
    reversed: true,
  },
  {
    id: 19,
    text: "세부 사항에 주의를 기울이는 편이다.",
    trait: "conscientiousness",
    reversed: false,
  },
  {
    id: 20,
    text: "급한 일이 아니면 느긋하게 처리하는 편이다.",
    trait: "conscientiousness",
    reversed: true,
  },

  // === Extraversion (외향성) - 10문항 ===
  {
    id: 21,
    text: "사람들과 어울리는 것이 즐겁다.",
    trait: "extraversion",
    reversed: false,
  },
  {
    id: 22,
    text: "파티나 모임에서 활발하게 대화를 이끄는 편이다.",
    trait: "extraversion",
    reversed: false,
  },
  {
    id: 23,
    text: "새로운 사람을 만나는 것을 좋아한다.",
    trait: "extraversion",
    reversed: false,
  },
  {
    id: 24,
    text: "에너지가 넘치고 활동적인 편이다.",
    trait: "extraversion",
    reversed: false,
  },
  {
    id: 25,
    text: "감정을 적극적으로 표현하는 편이다.",
    trait: "extraversion",
    reversed: false,
  },
  {
    id: 26,
    text: "혼자 있는 시간보다 사람들과 함께 있는 것이 좋다.",
    trait: "extraversion",
    reversed: false,
  },
  {
    id: 27,
    text: "모임에서 조용히 있는 편이다.",
    trait: "extraversion",
    reversed: true,
  },
  {
    id: 28,
    text: "낯선 사람과 대화를 시작하는 것이 어렵다.",
    trait: "extraversion",
    reversed: true,
  },
  {
    id: 29,
    text: "사교적인 상황에서 긴장하는 편이다.",
    trait: "extraversion",
    reversed: true,
  },
  {
    id: 30,
    text: "집에서 조용히 시간을 보내는 것을 더 선호한다.",
    trait: "extraversion",
    reversed: true,
  },

  // === Agreeableness (친화성) - 10문항 ===
  {
    id: 31,
    text: "다른 사람들의 감정에 공감을 잘 하는 편이다.",
    trait: "agreeableness",
    reversed: false,
  },
  {
    id: 32,
    text: "사람들을 돕는 것에서 기쁨을 느낀다.",
    trait: "agreeableness",
    reversed: false,
  },
  {
    id: 33,
    text: "타인의 의견을 존중하고 경청한다.",
    trait: "agreeableness",
    reversed: false,
  },
  {
    id: 34,
    text: "갈등 상황에서 화해하려고 노력하는 편이다.",
    trait: "agreeableness",
    reversed: false,
  },
  {
    id: 35,
    text: "사람들을 기본적으로 신뢰하는 편이다.",
    trait: "agreeableness",
    reversed: false,
  },
  {
    id: 36,
    text: "협력하는 것을 경쟁하는 것보다 선호한다.",
    trait: "agreeableness",
    reversed: false,
  },
  {
    id: 37,
    text: "다른 사람의 행동에 대해 비판적인 편이다.",
    trait: "agreeableness",
    reversed: true,
  },
  {
    id: 38,
    text: "내 이익을 위해서라면 다소 강하게 나갈 수 있다.",
    trait: "agreeableness",
    reversed: true,
  },
  {
    id: 39,
    text: "논쟁을 즐기거나 자주 반박하는 편이다.",
    trait: "agreeableness",
    reversed: true,
  },
  {
    id: 40,
    text: "다른 사람의 문제에 관심이 없는 편이다.",
    trait: "agreeableness",
    reversed: true,
  },

  // === Neuroticism (신경증) - 10문항 ===
  {
    id: 41,
    text: "작은 일에도 걱정을 많이 하는 편이다.",
    trait: "neuroticism",
    reversed: false,
  },
  {
    id: 42,
    text: "스트레스를 받으면 쉽게 압도당하는 느낌이 든다.",
    trait: "neuroticism",
    reversed: false,
  },
  {
    id: 43,
    text: "기분이 자주 변하는 편이다.",
    trait: "neuroticism",
    reversed: false,
  },
  {
    id: 44,
    text: "부정적인 생각에 사로잡히는 경우가 많다.",
    trait: "neuroticism",
    reversed: false,
  },
  {
    id: 45,
    text: "쉽게 불안해지거나 긴장하는 편이다.",
    trait: "neuroticism",
    reversed: false,
  },
  {
    id: 46,
    text: "우울한 기분을 자주 느낀다.",
    trait: "neuroticism",
    reversed: false,
  },
  {
    id: 47,
    text: "대체로 차분하고 평온한 편이다.",
    trait: "neuroticism",
    reversed: true,
  },
  {
    id: 48,
    text: "어려운 상황에서도 침착함을 유지하는 편이다.",
    trait: "neuroticism",
    reversed: true,
  },
  {
    id: 49,
    text: "감정적으로 안정되어 있다고 느낀다.",
    trait: "neuroticism",
    reversed: true,
  },
  {
    id: 50,
    text: "스트레스 상황에서 빠르게 회복하는 편이다.",
    trait: "neuroticism",
    reversed: true,
  },
];

export interface BigFiveResult {
  openness: number; // 0-100
  conscientiousness: number; // 0-100
  extraversion: number; // 0-100
  agreeableness: number; // 0-100
  neuroticism: number; // 0-100
}

export type ScoreLevel = "low" | "medium" | "high";

export const getScoreLevel = (score: number): ScoreLevel => {
  if (score < 40) return "low";
  if (score < 60) return "medium";
  return "high";
};

export const scoreLevelLabels: Record<ScoreLevel, string> = {
  low: "낮음",
  medium: "보통",
  high: "높음",
};

export const bigFiveDescriptions: Record<BigFiveTrait, {
  name: string;
  nameEn: string;
  description: string;
  highTraits: string[];
  lowTraits: string[];
  color: string;
}> = {
  openness: {
    name: "개방성",
    nameEn: "Openness",
    description: "새로운 경험에 대한 열린 태도, 상상력, 창의성, 지적 호기심을 나타냅니다.",
    highTraits: [
      "창의적이고 상상력이 풍부합니다",
      "새로운 경험과 아이디어에 열려 있습니다",
      "예술적 감수성이 높습니다",
      "다양한 관점을 수용합니다",
      "지적 탐구를 즐깁니다",
    ],
    lowTraits: [
      "전통적이고 익숙한 것을 선호합니다",
      "현실적이고 실용적인 접근을 합니다",
      "구체적인 것을 추상적인 것보다 선호합니다",
      "안정성과 일관성을 중시합니다",
      "변화보다 현상 유지를 선호합니다",
    ],
    color: "purple",
  },
  conscientiousness: {
    name: "성실성",
    nameEn: "Conscientiousness",
    description: "조직력, 책임감, 자기 규율, 목표 지향성을 나타냅니다.",
    highTraits: [
      "체계적이고 조직적입니다",
      "책임감이 강하고 신뢰할 수 있습니다",
      "목표 지향적이고 근면합니다",
      "계획을 세우고 실행합니다",
      "세부 사항에 주의를 기울입니다",
    ],
    lowTraits: [
      "유연하고 즉흥적입니다",
      "규칙에 덜 구애받습니다",
      "다양한 가능성을 열어둡니다",
      "느긋하게 접근합니다",
      "완벽주의에서 자유롭습니다",
    ],
    color: "blue",
  },
  extraversion: {
    name: "외향성",
    nameEn: "Extraversion",
    description: "사교성, 활력, 긍정적 감정 표현, 자극 추구를 나타냅니다.",
    highTraits: [
      "사교적이고 활발합니다",
      "에너지가 넘치고 열정적입니다",
      "사람들과 함께할 때 에너지를 얻습니다",
      "감정을 적극적으로 표현합니다",
      "주도적이고 자기주장이 강합니다",
    ],
    lowTraits: [
      "조용하고 내향적입니다",
      "혼자만의 시간에서 에너지를 충전합니다",
      "깊이 있는 소수의 관계를 선호합니다",
      "신중하게 말과 행동을 합니다",
      "차분하고 침착합니다",
    ],
    color: "amber",
  },
  agreeableness: {
    name: "친화성",
    nameEn: "Agreeableness",
    description: "협조성, 신뢰, 이타심, 타인에 대한 배려를 나타냅니다.",
    highTraits: [
      "친절하고 협조적입니다",
      "타인을 신뢰하고 배려합니다",
      "공감 능력이 뛰어납니다",
      "갈등을 피하고 조화를 추구합니다",
      "타인을 돕는 것을 즐깁니다",
    ],
    lowTraits: [
      "경쟁적이고 목표 지향적입니다",
      "비판적 사고를 합니다",
      "직접적으로 의견을 표현합니다",
      "자기 이익을 우선시합니다",
      "타협보다 원칙을 중시합니다",
    ],
    color: "green",
  },
  neuroticism: {
    name: "신경증",
    nameEn: "Neuroticism",
    description: "정서적 불안정성, 불안, 스트레스 민감도를 나타냅니다.",
    highTraits: [
      "감정의 기복이 있을 수 있습니다",
      "스트레스에 민감하게 반응합니다",
      "걱정이나 불안을 자주 경험합니다",
      "부정적 감정을 강하게 느낍니다",
      "예민하고 감수성이 풍부합니다",
    ],
    lowTraits: [
      "정서적으로 안정적입니다",
      "스트레스에 잘 대처합니다",
      "차분하고 평온합니다",
      "쉽게 당황하지 않습니다",
      "긍정적인 감정 상태를 유지합니다",
    ],
    color: "rose",
  },
};

export const traitColors: Record<BigFiveTrait, string> = {
  openness: "bg-purple-500",
  conscientiousness: "bg-blue-500",
  extraversion: "bg-amber-500",
  agreeableness: "bg-green-500",
  neuroticism: "bg-rose-500",
};

export const traitTextColors: Record<BigFiveTrait, string> = {
  openness: "text-purple-500",
  conscientiousness: "text-blue-500",
  extraversion: "text-amber-500",
  agreeableness: "text-green-500",
  neuroticism: "text-rose-500",
};

export const traitBgColors: Record<BigFiveTrait, string> = {
  openness: "from-purple-500/10 to-violet-500/10",
  conscientiousness: "from-blue-500/10 to-cyan-500/10",
  extraversion: "from-amber-500/10 to-orange-500/10",
  agreeableness: "from-green-500/10 to-emerald-500/10",
  neuroticism: "from-rose-500/10 to-pink-500/10",
};

export const traitOrder: BigFiveTrait[] = [
  "openness",
  "conscientiousness",
  "extraversion",
  "agreeableness",
  "neuroticism",
];

// 결과 프로필 유형
export interface PersonalityProfile {
  summary: string;
  strengths: string[];
  growthAreas: string[];
}

export const getPersonalityProfile = (result: BigFiveResult): PersonalityProfile => {
  const traits: { trait: BigFiveTrait; score: number }[] = [
    { trait: "openness", score: result.openness },
    { trait: "conscientiousness", score: result.conscientiousness },
    { trait: "extraversion", score: result.extraversion },
    { trait: "agreeableness", score: result.agreeableness },
    { trait: "neuroticism", score: result.neuroticism },
  ];

  const sortedTraits = [...traits].sort((a, b) => b.score - a.score);
  const highestTrait = sortedTraits[0];
  const secondHighest = sortedTraits[1];
  const lowestTrait = sortedTraits[4];

  const summaries: Record<string, string> = {
    openness: "창의적이고 호기심이 많은 탐험가 유형입니다. 새로운 경험과 아이디어에 열려 있으며, 예술적 감수성이 풍부합니다.",
    conscientiousness: "체계적이고 목표 지향적인 성취자 유형입니다. 책임감이 강하고 신뢰할 수 있으며, 계획적으로 일을 추진합니다.",
    extraversion: "사교적이고 활발한 에너자이저 유형입니다. 사람들과 어울리는 것을 즐기며, 긍정적인 에너지를 발산합니다.",
    agreeableness: "따뜻하고 협조적인 조화로운 유형입니다. 타인에 대한 배려가 깊고 공감 능력이 뛰어납니다.",
    neuroticism: "감수성이 풍부하고 예민한 감정형입니다. 깊이 있는 감정을 경험하며, 주변 환경에 민감하게 반응합니다.",
  };

  const strengths: string[] = [];
  const growthAreas: string[] = [];

  // 높은 특성에 따른 강점
  if (result.openness >= 60) {
    strengths.push("창의적 사고와 혁신적인 아이디어");
    strengths.push("새로운 경험에 대한 열린 자세");
  }
  if (result.conscientiousness >= 60) {
    strengths.push("뛰어난 조직력과 계획성");
    strengths.push("높은 책임감과 신뢰성");
  }
  if (result.extraversion >= 60) {
    strengths.push("원활한 대인 관계와 소통 능력");
    strengths.push("긍정적인 에너지와 리더십");
  }
  if (result.agreeableness >= 60) {
    strengths.push("뛰어난 공감 능력과 협동심");
    strengths.push("조화로운 관계 형성");
  }
  if (result.neuroticism <= 40) {
    strengths.push("정서적 안정성과 스트레스 대처 능력");
    strengths.push("침착하고 차분한 태도");
  }

  // 성장 영역
  if (result.openness <= 40) {
    growthAreas.push("새로운 경험에 더 열린 자세를 가져보세요");
  }
  if (result.conscientiousness <= 40) {
    growthAreas.push("목표 설정과 계획 수립 습관을 길러보세요");
  }
  if (result.extraversion <= 40) {
    growthAreas.push("점진적으로 사회적 상호작용을 늘려보세요");
  }
  if (result.agreeableness <= 40) {
    growthAreas.push("타인의 관점에서 생각해보는 연습을 해보세요");
  }
  if (result.neuroticism >= 60) {
    growthAreas.push("스트레스 관리와 감정 조절 기술을 개발해보세요");
    growthAreas.push("마음챙김이나 명상 연습이 도움이 될 수 있습니다");
  }

  if (strengths.length === 0) {
    strengths.push("균형 잡힌 성격 특성");
    strengths.push("다양한 상황에 적응하는 유연성");
  }

  if (growthAreas.length === 0) {
    growthAreas.push("현재의 균형 잡힌 성격을 유지하세요");
    growthAreas.push("자신의 강점을 더욱 발전시켜 나가세요");
  }

  return {
    summary: summaries[highestTrait.trait],
    strengths: strengths.slice(0, 4),
    growthAreas: growthAreas.slice(0, 3),
  };
};
