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

// E-E-A-T 기반 상세 특성 설명
export interface DetailedTraitInfo {
  name: string;
  nameEn: string;
  shortDescription: string;
  scientificBackground: string;
  highDescription: string;
  lowDescription: string;
  mediumDescription: string;
  highTraits: string[];
  lowTraits: string[];
  careerImplications: {
    high: string[];
    low: string[];
  };
  relationshipImplications: {
    high: string;
    low: string;
  };
  growthStrategies: {
    high: string[];
    low: string[];
  };
  facets: {
    name: string;
    description: string;
  }[];
  researchFindings: string[];
  color: string;
}

export const bigFiveDescriptions: Record<BigFiveTrait, DetailedTraitInfo> = {
  openness: {
    name: "개방성",
    nameEn: "Openness to Experience",
    shortDescription: "새로운 경험에 대한 열린 태도, 상상력, 창의성, 지적 호기심을 나타냅니다.",
    scientificBackground: "개방성(Openness to Experience)은 Big Five 성격 모델에서 가장 복잡하고 논쟁적인 요인 중 하나입니다. Costa와 McCrae(1992)의 연구에 따르면, 이 특성은 개인이 새로운 아이디어, 예술적 경험, 상상력, 지적 호기심에 얼마나 개방적인지를 측정합니다. 신경과학 연구들은 높은 개방성이 도파민 시스템의 활성화와 관련이 있으며, 이는 새로움 추구 행동과 연결됩니다. DeYoung(2015)의 연구는 개방성을 '인지적 탐색'의 일반적인 경향으로 설명하며, 이는 정보와 아이디어의 적극적인 탐구를 특징으로 합니다.",
    highDescription: "개방성이 높은 당신은 지적 호기심이 강하고 창의적인 사고를 즐기는 사람입니다. 새로운 경험과 아이디어에 대해 열린 마음을 가지고 있으며, 추상적인 개념과 복잡한 문제를 탐구하는 것을 좋아합니다. 예술, 문학, 철학 등 다양한 분야에 관심을 가지고 있을 가능성이 높으며, 전통적인 방식에 도전하고 혁신적인 해결책을 찾는 것을 선호합니다. 연구에 따르면 높은 개방성을 가진 사람들은 창의적 직업에서 더 큰 만족감을 느끼며, 다문화적 경험에 더 잘 적응하는 경향이 있습니다.",
    lowDescription: "개방성이 낮은 당신은 실용적이고 현실적인 접근 방식을 선호하는 사람입니다. 검증된 방법과 익숙한 환경에서 더 편안함을 느끼며, 급격한 변화보다는 안정성과 일관성을 중시합니다. 이것은 부정적인 특성이 아닙니다 - 실제로 많은 상황에서 실용적인 접근은 매우 가치 있습니다. 구체적인 사실과 명확한 정보를 선호하며, 추상적인 이론보다 실질적인 적용에 관심을 갖습니다. 조직에서 안정성을 제공하고 검증된 프로세스를 유지하는 역할에서 뛰어난 성과를 보이는 경향이 있습니다.",
    mediumDescription: "개방성이 중간 수준인 당신은 새로운 경험과 익숙한 것 사이에서 균형을 유지하는 사람입니다. 상황에 따라 혁신적인 아이디어를 탐구하기도 하고, 검증된 방법을 고수하기도 합니다. 이러한 유연성은 다양한 환경에서 적응력을 발휘할 수 있게 해줍니다. 창의성과 실용성을 모두 갖추고 있어, 새로운 아이디어를 현실에 적용하는 데 능숙할 수 있습니다.",
    highTraits: [
      "풍부한 상상력과 창의적 사고 능력을 보유하고 있습니다",
      "새로운 경험과 도전에 적극적으로 나서는 편입니다",
      "예술, 음악, 문학 등 미적 경험에 깊은 감수성을 가지고 있습니다",
      "다양한 관점과 가치관을 수용하고 이해하려 노력합니다",
      "지적 탐구와 학습에 대한 내재적 동기가 강합니다",
      "추상적 개념과 복잡한 아이디어를 탐구하는 것을 즐깁니다",
      "전통에 도전하고 새로운 해결책을 찾는 것을 선호합니다"
    ],
    lowTraits: [
      "검증된 방법과 전통적인 접근 방식을 선호합니다",
      "실용적이고 현실적인 관점에서 상황을 판단합니다",
      "구체적이고 명확한 정보를 추상적 개념보다 선호합니다",
      "안정적이고 예측 가능한 환경에서 더 편안함을 느낍니다",
      "변화보다는 현상 유지와 일관성을 중시합니다",
      "명확한 구조와 규칙이 있는 상황을 선호합니다",
      "실질적인 결과와 적용에 초점을 맞춥니다"
    ],
    careerImplications: {
      high: [
        "예술, 디자인, 창작 분야에서 뛰어난 성과를 낼 수 있습니다",
        "연구, 학술, 과학 분야에서 혁신적인 발견을 할 가능성이 높습니다",
        "마케팅, 광고, 브랜딩 등 창의성이 요구되는 역할에 적합합니다",
        "컨설팅, 전략 기획 등 복잡한 문제 해결이 필요한 직종에서 강점을 발휘합니다",
        "스타트업, 벤처 등 혁신적인 환경에서 동기부여를 받습니다"
      ],
      low: [
        "회계, 재무, 감사 등 정확성과 일관성이 중요한 분야에 적합합니다",
        "품질 관리, 프로세스 관리 등 표준화된 절차가 필요한 역할에서 강점을 보입니다",
        "행정, 운영 관리 등 안정적인 시스템 유지가 중요한 직종에 적합합니다",
        "법률, 규정 준수 관련 업무에서 세심함을 발휘할 수 있습니다",
        "제조, 생산 관리 등 검증된 프로세스를 따르는 역할에서 뛰어납니다"
      ]
    },
    relationshipImplications: {
      high: "관계에서 새로운 경험과 활동을 함께 탐구하는 것을 중요하게 생각합니다. 파트너와 함께 새로운 곳을 여행하거나, 새로운 취미를 시도하거나, 깊은 대화를 나누는 것을 즐깁니다. 지적인 자극과 정서적 깊이를 제공하는 관계에서 더 큰 만족감을 느끼며, 파트너의 성장과 변화를 지지합니다. 다만, 때로는 일상적인 안정감보다 새로움을 추구하는 경향이 있어, 파트너가 안정을 원할 때 갈등이 생길 수 있습니다.",
      low: "관계에서 안정성, 예측 가능성, 일관성을 중요하게 생각합니다. 신뢰할 수 있는 일상과 확립된 루틴을 파트너와 함께 유지하는 것을 선호합니다. 검증된 활동과 익숙한 환경에서 파트너와 시간을 보내는 것에서 안정감을 느끼며, 급격한 변화보다는 점진적인 발전을 선호합니다. 실용적인 문제 해결과 현실적인 계획에 강점을 보여 관계의 안정적인 기반을 제공합니다."
    },
    growthStrategies: {
      high: [
        "창의적 아이디어를 현실적으로 실행하는 구체적인 계획을 세워보세요",
        "때로는 검증된 방법의 가치도 인정하고 활용해보세요",
        "일상적인 루틴의 중요성도 인식하고 적절한 구조를 만들어보세요",
        "새로운 것에 대한 열정을 유지하되, 완료까지 집중하는 연습을 해보세요"
      ],
      low: [
        "일주일에 한 번은 새로운 것(음식, 장소, 활동)을 시도해보세요",
        "다른 관점에서 문제를 바라보는 연습을 해보세요 - '만약에...'라고 질문해보기",
        "예술, 음악, 문학 등 다양한 문화적 경험에 노출되어 보세요",
        "익숙한 영역을 벗어나 새로운 기술이나 취미를 배워보세요"
      ]
    },
    facets: [
      { name: "상상력 (Fantasy)", description: "풍부한 내면 세계와 상상력을 가지고 있으며, 현실을 넘어서는 가능성을 탐구합니다." },
      { name: "미적 감수성 (Aesthetics)", description: "예술, 음악, 자연의 아름다움에 깊이 반응하고 감상합니다." },
      { name: "감정 개방성 (Feelings)", description: "자신의 감정을 인식하고 탐구하며, 다양한 감정적 경험에 열려 있습니다." },
      { name: "행동 모험성 (Actions)", description: "새로운 활동, 장소, 음식 등을 시도하는 것을 즐깁니다." },
      { name: "지적 호기심 (Ideas)", description: "추상적 개념, 철학적 논의, 지적 퍼즐에 관심을 가집니다." },
      { name: "가치 개방성 (Values)", description: "전통적인 가치에 도전하고 다양한 도덕적, 정치적 관점을 탐구합니다." }
    ],
    researchFindings: [
      "높은 개방성은 창의적 성취 및 예술적 관심과 강한 상관관계를 보입니다 (Feist, 1998)",
      "개방성은 Big Five 중 지능과 가장 높은 상관관계를 보이는 특성입니다 (DeYoung et al., 2005)",
      "개방성이 높은 사람들은 명상과 마음챙김 수련에서 더 큰 효과를 경험합니다 (Campanella et al., 2014)",
      "이 특성은 나이가 들어도 비교적 안정적으로 유지되는 경향이 있습니다 (Roberts et al., 2006)",
      "높은 개방성은 다문화 환경에서의 적응력과 양의 상관관계를 보입니다 (Huang et al., 2005)"
    ],
    color: "purple",
  },
  conscientiousness: {
    name: "성실성",
    nameEn: "Conscientiousness",
    shortDescription: "조직력, 책임감, 자기 규율, 목표 지향성을 나타냅니다.",
    scientificBackground: "성실성(Conscientiousness)은 자기 통제, 조직력, 신뢰성, 목표 지향적 행동을 포괄하는 성격 특성입니다. Roberts 등(2014)의 메타분석 연구에 따르면, 성실성은 직업적 성공, 학업 성취, 건강한 생활습관, 수명 연장과 가장 강력한 상관관계를 보이는 성격 특성입니다. 신경과학적으로 성실성은 전두엽 피질의 기능과 관련이 있으며, 이는 계획, 의사결정, 충동 조절을 담당합니다. 발달 심리학 연구는 성실성이 20대 이후 점진적으로 증가하는 경향을 보인다고 보고합니다.",
    highDescription: "성실성이 높은 당신은 체계적이고 신뢰할 수 있는 사람입니다. 목표를 설정하고 이를 달성하기 위해 꾸준히 노력하며, 책임감이 강하고 약속을 잘 지킵니다. 계획을 세우고 실행하는 것을 즐기며, 세부 사항에 주의를 기울입니다. 연구에 따르면 높은 성실성은 직업적 성공, 학업 성취, 건강한 생활습관과 강한 양의 상관관계를 보입니다. 당신은 조직 내에서 신뢰받는 구성원이 될 가능성이 높으며, 장기적인 목표를 향해 꾸준히 나아가는 능력을 갖추고 있습니다.",
    lowDescription: "성실성이 낮은 당신은 유연하고 적응력이 뛰어난 사람입니다. 엄격한 계획보다는 상황에 따라 유연하게 대응하는 것을 선호하며, 즉흥적인 결정을 잘 내립니다. 이것은 창의성과 혁신이 필요한 상황에서 장점이 될 수 있습니다. 규칙과 구조에 덜 구애받기 때문에 새로운 가능성을 탐색하는 데 더 자유롭습니다. 다만, 장기적인 목표 달성이나 지루한 작업의 완료에 어려움을 겪을 수 있으므로, 외부 구조나 시스템의 도움을 받는 것이 효과적일 수 있습니다.",
    mediumDescription: "성실성이 중간 수준인 당신은 필요할 때 조직적으로 일하면서도 유연성을 유지하는 균형 잡힌 접근 방식을 가지고 있습니다. 중요한 목표에는 체계적으로 접근하면서도, 상황에 따라 즉흥적인 결정을 내릴 수 있습니다. 이러한 균형은 다양한 상황에서 적응하는 데 도움이 됩니다.",
    highTraits: [
      "체계적이고 조직적인 접근 방식으로 일을 처리합니다",
      "강한 책임감으로 맡은 일을 끝까지 완수합니다",
      "명확한 목표를 설정하고 달성을 위해 꾸준히 노력합니다",
      "시간 약속과 마감을 철저히 지킵니다",
      "세부 사항에 주의를 기울이며 실수를 최소화합니다",
      "장기적인 결과를 고려하여 현재의 충동을 조절합니다",
      "계획을 세우고 단계별로 실행하는 것을 선호합니다"
    ],
    lowTraits: [
      "유연하고 상황에 따라 적응하는 것을 선호합니다",
      "엄격한 규칙보다는 상황적 판단을 중시합니다",
      "즉흥적인 결정과 자유로운 일정을 편안하게 느낍니다",
      "다양한 가능성을 열어두고 선택의 여지를 남깁니다",
      "완벽주의적 압박에서 자유롭습니다",
      "창의적이고 비구조화된 환경에서 더 잘 기능합니다",
      "느긋하게 흘러가는 대로 접근하는 경향이 있습니다"
    ],
    careerImplications: {
      high: [
        "프로젝트 관리, 운영 관리 등 조직력이 요구되는 역할에 탁월합니다",
        "회계, 재무, 법률 등 정확성과 세심함이 중요한 분야에 적합합니다",
        "의료, 엔지니어링 등 높은 기준과 안전이 중요한 전문직에서 강점을 보입니다",
        "경영, 리더십 역할에서 신뢰와 존경을 받을 가능성이 높습니다",
        "연구, 학술 분야에서 장기 프로젝트를 성공적으로 완수합니다"
      ],
      low: [
        "예술, 음악, 창작 분야에서 자유로운 표현이 가능합니다",
        "스타트업, 벤처 등 빠르게 변화하는 환경에서 적응력을 발휘합니다",
        "위기 대응, 긴급 상황 관리 등 즉각적인 판단이 필요한 역할에 적합합니다",
        "컨설팅, 영업 등 유연한 접근이 필요한 역할에서 강점을 보입니다",
        "창의적 문제 해결이 중요한 혁신적 역할에 적합합니다"
      ]
    },
    relationshipImplications: {
      high: "관계에서 신뢰성과 일관성을 제공합니다. 약속을 지키고 책임감 있게 행동하며, 파트너가 의지할 수 있는 안정적인 존재입니다. 관계에서도 목표를 설정하고 함께 성장하는 것을 중요하게 생각합니다. 다만, 때로는 파트너에게도 높은 기준을 적용하여 갈등이 생길 수 있으며, 즉흥적인 즐거움을 놓칠 수 있습니다. 관계에서도 유연성을 기르는 것이 도움이 될 수 있습니다.",
      low: "관계에서 자발성과 재미를 제공합니다. 즉흥적인 데이트나 예상치 못한 모험을 즐기며, 관계를 가볍고 즐겁게 유지하는 데 강점이 있습니다. 파트너의 불완전함을 받아들이고 비판하지 않는 경향이 있습니다. 다만, 장기적인 계획이나 약속에 대한 기대를 관리하는 것이 중요하며, 파트너가 안정성을 원할 때 이를 인식하고 노력하는 것이 필요할 수 있습니다."
    },
    growthStrategies: {
      high: [
        "때로는 계획을 내려놓고 즉흥적인 순간을 즐겨보세요",
        "완벽하지 않아도 괜찮다는 것을 스스로에게 상기시켜 보세요",
        "타인에게 과도한 기준을 적용하지 않도록 의식적으로 노력해보세요",
        "놀이와 휴식의 시간을 의도적으로 일정에 포함시켜보세요"
      ],
      low: [
        "작은 목표부터 시작하여 달성의 만족감을 경험해보세요",
        "할 일 목록이나 캘린더 앱 등 외부 도구를 활용해보세요",
        "중요한 약속과 마감을 알림으로 설정해보세요",
        "책임감 있는 파트너나 멘토와 함께 목표를 공유해보세요"
      ]
    },
    facets: [
      { name: "유능감 (Competence)", description: "자신의 능력과 효과성에 대한 믿음, 실제로 일을 잘 해내는 능력입니다." },
      { name: "질서정연함 (Order)", description: "깔끔하고 조직적인 환경을 유지하려는 경향입니다." },
      { name: "책임감 (Dutifulness)", description: "의무와 약속을 지키려는 강한 윤리적 의무감입니다." },
      { name: "성취 지향 (Achievement Striving)", description: "높은 목표를 설정하고 달성하기 위해 노력하는 경향입니다." },
      { name: "자기 규율 (Self-Discipline)", description: "지루하거나 어려운 과제도 끝까지 완수하는 능력입니다." },
      { name: "신중함 (Deliberation)", description: "행동하기 전에 충분히 생각하고 결과를 고려하는 경향입니다." }
    ],
    researchFindings: [
      "성실성은 직업적 성공을 예측하는 가장 강력한 성격 특성입니다 (Barrick & Mount, 1991)",
      "높은 성실성은 더 긴 수명과 관련이 있습니다 (Friedman et al., 1993)",
      "성실성은 학업 성취와 강한 양의 상관관계를 보입니다 (Poropat, 2009)",
      "이 특성은 20대 이후 점진적으로 증가하는 경향이 있습니다 (Roberts et al., 2006)",
      "성실성은 건강한 생활습관 및 낮은 위험 행동과 관련됩니다 (Bogg & Roberts, 2004)"
    ],
    color: "blue",
  },
  extraversion: {
    name: "외향성",
    nameEn: "Extraversion",
    shortDescription: "사교성, 활력, 긍정적 감정 표현, 자극 추구를 나타냅니다.",
    scientificBackground: "외향성(Extraversion)은 Big Five 모델에서 가장 널리 알려진 특성으로, 사회적 상호작용에 대한 선호, 긍정적 감정의 경험, 활력과 자극 추구를 포함합니다. Eysenck(1967)의 각성 이론에 따르면, 외향적인 사람들은 기저 각성 수준이 낮아 외부 자극을 더 추구하는 경향이 있습니다. Watson과 Clark(1997)의 연구는 외향성이 긍정적 정서성(Positive Affectivity)과 밀접하게 관련되어 있음을 보여줍니다. 뇌 영상 연구들은 외향성이 보상 시스템의 민감도와 관련이 있음을 시사합니다.",
    highDescription: "외향성이 높은 당신은 사교적이고 활력이 넘치는 사람입니다. 사람들과 어울리는 것에서 에너지를 얻으며, 대화하고 새로운 관계를 형성하는 것을 즐깁니다. 감정을 적극적으로 표현하고, 모임에서 자연스럽게 중심이 되는 경향이 있습니다. 연구에 따르면 외향적인 사람들은 더 자주 긍정적인 감정을 경험하며, 사회적 지지 네트워크가 더 넓습니다. 당신은 팀 환경에서 뛰어난 성과를 보이며, 리더십 역할에서 자연스럽게 영향력을 발휘할 수 있습니다.",
    lowDescription: "외향성이 낮은 당신은 내향적이고 사려 깊은 사람입니다. 혼자만의 시간에서 에너지를 충전하며, 깊이 있는 소수의 관계를 선호합니다. 이것은 수줍음이나 사회적 불안과는 다릅니다 - 당신은 단순히 조용하고 차분한 환경을 선호하는 것입니다. 깊이 있는 사고와 집중력이 필요한 작업에서 뛰어난 성과를 보이며, 경청하고 관찰하는 능력이 뛰어납니다. 연구에 따르면 내향적인 사람들은 혼자 작업할 때 더 높은 생산성을 보이며, 깊은 전문성을 개발하는 데 강점이 있습니다.",
    mediumDescription: "외향성이 중간 수준인 당신은 '양향성(Ambivert)'의 특성을 보입니다. 상황에 따라 사교적으로 활동하기도 하고, 혼자만의 시간을 즐기기도 합니다. 이러한 유연성은 다양한 사회적 상황에 적응하는 데 큰 강점이 됩니다. 필요할 때 에너지를 발산할 수 있으면서도, 충전의 시간도 적절히 가질 줄 압니다.",
    highTraits: [
      "사람들과 어울리며 에너지를 얻습니다",
      "대화를 이끌고 새로운 관계를 쉽게 형성합니다",
      "감정을 적극적이고 열정적으로 표현합니다",
      "활동적이고 자극적인 환경을 선호합니다",
      "모임에서 자연스럽게 중심 역할을 합니다",
      "낙관적이고 열정적인 태도를 유지합니다",
      "다양한 사회적 상황에서 편안함을 느낍니다"
    ],
    lowTraits: [
      "혼자만의 시간에서 에너지를 충전합니다",
      "깊이 있는 소수의 관계를 선호합니다",
      "말하기보다 경청하고 관찰하는 것을 좋아합니다",
      "조용하고 차분한 환경에서 더 잘 기능합니다",
      "신중하게 생각한 후 말하는 경향이 있습니다",
      "집중이 필요한 개인 작업에서 뛰어납니다",
      "사생활과 개인 공간을 중요하게 생각합니다"
    ],
    careerImplications: {
      high: [
        "영업, 마케팅, PR 등 대인 관계가 중요한 역할에 적합합니다",
        "리더십, 관리직 등 팀을 이끄는 역할에서 강점을 보입니다",
        "교육, 강의, 프레젠테이션 등 발표가 필요한 분야에 적합합니다",
        "이벤트 기획, 엔터테인먼트 등 활동적인 환경에서 번창합니다",
        "네트워킹이 중요한 기업가 정신과 사업 개발에 적합합니다"
      ],
      low: [
        "연구, 분석 등 깊은 집중이 필요한 역할에 적합합니다",
        "글쓰기, 편집, 프로그래밍 등 독립적인 작업에 강점을 보입니다",
        "회계, 데이터 분석 등 세밀한 작업이 필요한 분야에 적합합니다",
        "예술, 디자인 등 개인의 창의성을 발휘하는 역할에 적합합니다",
        "연구 개발, 기술 전문가 등 깊은 전문성이 요구되는 분야에 적합합니다"
      ]
    },
    relationshipImplications: {
      high: "관계에서 활발한 사회 활동과 함께하는 경험을 중요하게 생각합니다. 파트너와 친구들과 자주 어울리고, 함께 외출하고, 새로운 사람들을 만나는 것을 즐깁니다. 감정을 적극적으로 표현하고, 관계에 열정과 활력을 가져옵니다. 다만, 파트너가 조용한 시간을 원할 때 이를 이해하고 존중하는 것이 중요합니다. 또한, 깊이 있는 일대일 대화의 시간도 의식적으로 마련하는 것이 관계의 깊이를 더할 수 있습니다.",
      low: "관계에서 깊이와 친밀감을 중요하게 생각합니다. 소수의 깊은 관계에 집중하며, 파트너와 조용히 함께하는 시간을 소중히 여깁니다. 경청하는 능력이 뛰어나며, 사려 깊은 대화를 통해 관계를 깊게 합니다. 다만, 자신의 감정과 생각을 더 적극적으로 표현하는 연습이 파트너와의 소통에 도움이 될 수 있습니다. 파트너가 사회적 활동을 원할 때 함께 참여하려는 노력도 관계에 긍정적입니다."
    },
    growthStrategies: {
      high: [
        "혼자만의 성찰 시간을 의도적으로 마련해보세요",
        "깊이 있는 일대일 대화의 가치를 인식하고 실천해보세요",
        "말하기 전에 잠시 멈추고 다른 사람의 말을 경청해보세요",
        "혼자서 할 수 있는 취미나 활동을 개발해보세요"
      ],
      low: [
        "편안한 소규모 모임부터 시작하여 사회적 근육을 키워보세요",
        "관심사를 공유하는 그룹이나 커뮤니티에 참여해보세요",
        "자신의 생각과 의견을 더 적극적으로 표현하는 연습을 해보세요",
        "때로는 에너지 소모에도 불구하고 사회적 활동에 참여해보세요"
      ]
    },
    facets: [
      { name: "따뜻함 (Warmth)", description: "타인에 대한 친근함과 애정을 쉽게 표현합니다." },
      { name: "사교성 (Gregariousness)", description: "다른 사람들과 함께 있는 것을 선호하고 즐깁니다." },
      { name: "주장성 (Assertiveness)", description: "자신의 의견을 표현하고 그룹에서 주도권을 잡는 경향입니다." },
      { name: "활동성 (Activity)", description: "높은 에너지 수준과 바쁘게 움직이는 것을 선호합니다." },
      { name: "자극 추구 (Excitement-Seeking)", description: "흥분과 자극적인 경험을 찾는 경향입니다." },
      { name: "긍정적 정서 (Positive Emotions)", description: "기쁨, 행복, 열정 같은 긍정적 감정을 자주 경험합니다." }
    ],
    researchFindings: [
      "외향성은 주관적 행복감과 가장 강한 상관관계를 보이는 성격 특성입니다 (Steel et al., 2008)",
      "외향적인 리더들은 수동적인 팀에서 더 효과적이며, 내향적인 리더들은 주도적인 팀에서 더 효과적입니다 (Grant et al., 2011)",
      "외향성과 내향성은 최적 각성 수준의 차이와 관련이 있습니다 (Eysenck, 1967)",
      "내향적인 사람들은 외부 보상보다 내적 동기에 더 반응합니다 (Depue & Collins, 1999)",
      "양향성(중간 수준의 외향성)이 영업 성과에서 가장 효과적일 수 있습니다 (Grant, 2013)"
    ],
    color: "amber",
  },
  agreeableness: {
    name: "친화성",
    nameEn: "Agreeableness",
    shortDescription: "협조성, 신뢰, 이타심, 타인에 대한 배려를 나타냅니다.",
    scientificBackground: "친화성(Agreeableness)은 개인의 대인 관계 지향성을 나타내는 성격 특성으로, 협조성, 신뢰, 이타심, 겸손함을 포함합니다. 진화 심리학적 관점에서 친화성은 집단 생활의 사회적 요구에 적응한 결과로 볼 수 있습니다. Graziano와 Eisenberg(1997)의 연구에 따르면, 높은 친화성은 친사회적 행동, 낮은 공격성, 더 나은 대인 관계와 관련이 있습니다. 신경과학 연구는 친화성이 거울 뉴런 시스템의 활동과 관련이 있으며, 이는 공감 능력과 연결됩니다.",
    highDescription: "친화성이 높은 당신은 따뜻하고 배려심이 깊은 사람입니다. 타인의 감정과 필요에 민감하게 반응하며, 협력하고 도움을 주는 것에서 기쁨을 느낍니다. 갈등보다는 조화를 추구하며, 사람들과 신뢰 관계를 쉽게 형성합니다. 연구에 따르면 높은 친화성은 팀워크, 관계 만족도, 친사회적 행동과 강한 양의 상관관계를 보입니다. 당신은 조직 내에서 협력을 촉진하고 긍정적인 분위기를 만드는 역할을 합니다.",
    lowDescription: "친화성이 낮은 당신은 독립적이고 분석적인 사고를 하는 사람입니다. 비판적 시각으로 상황을 평가하며, 필요할 때 어려운 결정을 내릴 수 있습니다. 이것은 냉정함이 아닌 객관성입니다. 당신은 경쟁적인 환경에서 강점을 보이며, 자신의 입장을 명확히 주장할 수 있습니다. 연구에 따르면 낮은 친화성은 협상 능력, 비판적 사고, 리더십 역할에서의 어려운 결정 능력과 관련이 있습니다.",
    mediumDescription: "친화성이 중간 수준인 당신은 협력과 경쟁, 타인 배려와 자기 주장 사이에서 균형을 유지하는 사람입니다. 상황에 따라 협조적으로 행동하기도 하고, 필요할 때는 자신의 입장을 굳건히 지킬 수도 있습니다. 이러한 유연성은 다양한 대인 관계 상황에서 적응력을 발휘하게 해줍니다.",
    highTraits: [
      "타인의 감정과 필요에 민감하게 공감합니다",
      "돕고 협력하는 것에서 진정한 기쁨을 느낍니다",
      "사람들을 기본적으로 신뢰하고 최선을 기대합니다",
      "갈등보다 조화와 화해를 추구합니다",
      "겸손하고 자기 자랑을 하지 않습니다",
      "타인의 관점과 의견을 존중합니다",
      "팀과 그룹의 이익을 개인적 이익보다 우선시합니다"
    ],
    lowTraits: [
      "독립적이고 경쟁적인 접근 방식을 취합니다",
      "비판적이고 분석적인 시각으로 상황을 평가합니다",
      "자신의 의견과 입장을 명확히 표현합니다",
      "필요할 때 어려운 결정을 내릴 수 있습니다",
      "자기 이익을 인식하고 협상에서 주장합니다",
      "회의적인 태도로 정보를 검증합니다",
      "타협보다 원칙을 고수하는 경향이 있습니다"
    ],
    careerImplications: {
      high: [
        "간호, 사회복지, 상담 등 돌봄 분야에 적합합니다",
        "인사, 고객 서비스 등 대인 관계가 중요한 역할에 강점을 보입니다",
        "교육, 멘토링 등 타인의 성장을 돕는 분야에 적합합니다",
        "팀 기반의 협력적 환경에서 뛰어난 성과를 보입니다",
        "중재, 갈등 해결 역할에서 능력을 발휘합니다"
      ],
      low: [
        "경영, 리더십 역할에서 어려운 결정을 내릴 수 있습니다",
        "협상, 계약, 법률 분야에서 강점을 보입니다",
        "비평, 편집, 품질 관리 등 비판적 시각이 필요한 역할에 적합합니다",
        "영업, 거래 등 경쟁적인 환경에서 성과를 냅니다",
        "수사, 조사 등 객관적 판단이 필요한 분야에 적합합니다"
      ]
    },
    relationshipImplications: {
      high: "관계에서 파트너의 필요와 행복을 우선시하며, 조화롭고 평화로운 관계를 만들기 위해 노력합니다. 공감 능력이 뛰어나 파트너의 감정을 잘 이해하고 지지합니다. 갈등을 피하려는 경향이 있어 때로는 자신의 필요를 표현하지 못할 수 있습니다. 건강한 관계를 위해 자신의 경계를 설정하고, 필요할 때 자신의 의견을 표현하는 연습이 도움이 될 수 있습니다.",
      low: "관계에서 직접적이고 솔직한 소통을 합니다. 자신의 의견과 필요를 명확히 표현하며, 관계에서도 개인의 독립성을 유지합니다. 때로는 파트너에게 비판적으로 보일 수 있으므로, 피드백을 전달할 때 상대방의 감정을 고려하는 것이 중요합니다. 파트너의 감정적 필요에 더 주의를 기울이고, 공감을 표현하는 연습이 관계의 깊이를 더할 수 있습니다."
    },
    growthStrategies: {
      high: [
        "자신의 필요와 경계를 인식하고 표현하는 연습을 해보세요",
        "모든 사람을 기쁘게 하려고 하지 않아도 괜찮다는 것을 인식하세요",
        "때로는 '아니오'라고 말하는 것이 건강한 관계에 필요함을 기억하세요",
        "비판적 사고와 건설적 피드백을 제공하는 연습을 해보세요"
      ],
      low: [
        "타인의 관점에서 상황을 보는 연습을 해보세요",
        "협력과 팀워크의 가치를 인식하고 실천해보세요",
        "비판을 전달할 때 상대방의 감정을 고려해보세요",
        "신뢰를 쌓기 위해 사람들에게 기회를 주는 연습을 해보세요"
      ]
    },
    facets: [
      { name: "신뢰 (Trust)", description: "타인이 정직하고 선의를 가지고 있다고 믿는 경향입니다." },
      { name: "솔직함 (Straightforwardness)", description: "진실되고 거짓 없이 행동하는 경향입니다." },
      { name: "이타심 (Altruism)", description: "타인을 돕고 그들의 복지에 관심을 갖는 경향입니다." },
      { name: "순응성 (Compliance)", description: "갈등을 피하고 분쟁에서 양보하려는 경향입니다." },
      { name: "겸손 (Modesty)", description: "자기 자랑을 피하고 겸손하게 행동하는 경향입니다." },
      { name: "온정 (Tender-Mindedness)", description: "타인의 필요에 공감하고 동정하는 경향입니다." }
    ],
    researchFindings: [
      "친화성은 관계 만족도와 강한 양의 상관관계를 보입니다 (Malouff et al., 2010)",
      "높은 친화성은 팀 성과에 긍정적인 영향을 미칩니다 (Bell, 2007)",
      "낮은 친화성은 더 높은 수입 및 리더십 위치와 관련이 있습니다 (Judge et al., 2012)",
      "친화성은 친사회적 행동의 가장 강력한 예측 변수입니다 (Graziano et al., 2007)",
      "여성이 남성보다 평균적으로 더 높은 친화성을 보입니다 (Costa et al., 2001)"
    ],
    color: "green",
  },
  neuroticism: {
    name: "신경증",
    nameEn: "Neuroticism",
    shortDescription: "정서적 불안정성, 불안, 스트레스 민감도를 나타냅니다.",
    scientificBackground: "신경증(Neuroticism)은 부정적 감정을 경험하는 경향성을 나타내는 성격 특성으로, 불안, 우울, 분노, 자의식을 포함합니다. 이 특성은 때때로 역으로 '정서적 안정성(Emotional Stability)'으로 측정되기도 합니다. Gray(1970)의 강화 민감도 이론에 따르면, 신경증이 높은 사람들은 행동 억제 시스템(BIS)이 더 활성화되어 있어 위협과 처벌 신호에 더 민감합니다. 신경과학 연구는 신경증이 편도체의 반응성 및 스트레스 호르몬 시스템과 관련이 있음을 보여줍니다.",
    highDescription: "신경증이 높은 당신은 감정적으로 민감하고 예민한 사람입니다. 스트레스나 위협에 강하게 반응하며, 걱정과 불안을 더 자주 경험할 수 있습니다. 이것은 약점이 아니라 당신만의 특성입니다. 높은 신경증은 위험 감지 능력이 뛰어나다는 것을 의미하며, 이는 진화적으로 중요한 적응 기능이었습니다. 당신은 깊은 감정을 경험하며, 예술적이거나 창의적인 표현에 강점을 보일 수 있습니다. 자기 인식이 높고 자신의 감정 상태를 잘 파악합니다.",
    lowDescription: "신경증이 낮은 당신은 정서적으로 안정적이고 침착한 사람입니다. 스트레스 상황에서도 차분함을 유지하며, 부정적인 감정에서 빠르게 회복합니다. 위기 상황에서 냉정한 판단을 내릴 수 있으며, 압박 속에서도 성과를 유지합니다. 연구에 따르면 낮은 신경증은 전반적인 삶의 만족도, 스트레스 대처 능력, 신체 건강과 양의 상관관계를 보입니다. 당신은 안정적이고 예측 가능한 존재로, 주변 사람들에게 편안함을 제공합니다.",
    mediumDescription: "신경증이 중간 수준인 당신은 적절한 수준의 정서적 반응성을 가지고 있습니다. 스트레스에 반응하면서도 과도하게 압도당하지 않으며, 감정을 경험하면서도 적절히 조절할 수 있습니다. 이러한 균형은 감정적 신호를 인식하면서도 효과적으로 기능하는 데 도움이 됩니다.",
    highTraits: [
      "감정의 깊이와 강도가 높습니다",
      "위험과 잠재적 문제를 빠르게 감지합니다",
      "자기 인식이 높고 내면을 잘 살핍니다",
      "예민하고 세심한 관찰 능력을 가지고 있습니다",
      "공감 능력이 뛰어날 수 있습니다",
      "예술적, 창의적 표현에 깊이를 더할 수 있습니다",
      "완벽주의적 경향으로 높은 기준을 유지합니다"
    ],
    lowTraits: [
      "정서적으로 안정적이고 침착합니다",
      "스트레스 상황에서도 냉정함을 유지합니다",
      "부정적 감정에서 빠르게 회복합니다",
      "걱정이나 불안을 자주 경험하지 않습니다",
      "압박 속에서도 성과를 유지합니다",
      "낙관적이고 긍정적인 전망을 가집니다",
      "자신감 있고 안정적인 자아상을 가지고 있습니다"
    ],
    careerImplications: {
      high: [
        "창의적 분야(글쓰기, 예술, 음악)에서 감정적 깊이를 활용할 수 있습니다",
        "상담, 치료 분야에서 공감 능력을 발휘할 수 있습니다",
        "품질 관리, 위험 평가 등 문제를 예측하는 역할에 적합할 수 있습니다",
        "연구, 분석 등 세심한 주의가 필요한 분야에서 강점을 보일 수 있습니다",
        "구조화되고 예측 가능한 환경에서 더 잘 기능합니다"
      ],
      low: [
        "위기 관리, 응급 상황 대응 등 압박이 높은 역할에 적합합니다",
        "리더십, 경영 역할에서 안정적인 의사결정을 내립니다",
        "협상, 거래 등 높은 스트레스 상황에서 강점을 보입니다",
        "군사, 경찰, 소방 등 고위험 직종에 적합합니다",
        "변동성이 큰 환경(스타트업, 투자)에서 안정성을 유지합니다"
      ]
    },
    relationshipImplications: {
      high: "관계에서 깊은 감정적 연결을 추구합니다. 파트너의 감정 변화에 민감하게 반응하며, 친밀한 유대를 형성하려고 노력합니다. 때로는 걱정이나 불안이 관계에 영향을 미칠 수 있으므로, 자신의 감정을 파트너와 솔직히 나누고, 필요할 때 지지를 요청하는 것이 중요합니다. 스트레스 관리 기술을 개발하면 관계에서도 더 안정적으로 기능할 수 있습니다. 파트너에게 당신의 필요를 명확히 전달하세요.",
      low: "관계에서 안정성과 차분함을 제공합니다. 파트너가 힘든 시기를 겪을 때 든든한 버팀목이 될 수 있습니다. 다만, 감정적으로 덜 반응하는 것이 파트너에게 무관심으로 보일 수 있으므로, 감정을 의식적으로 표현하고 파트너의 감정적 필요에 반응하는 연습이 도움이 될 수 있습니다. 파트너의 감정적 경험을 존중하고 이해하려는 노력이 관계를 깊게 합니다."
    },
    growthStrategies: {
      high: [
        "마음챙김(Mindfulness)과 명상을 통해 감정 조절 능력을 기르세요",
        "인지행동기법(CBT)을 통해 부정적 사고 패턴을 인식하고 재구성해보세요",
        "규칙적인 운동과 충분한 수면으로 스트레스 저항력을 높이세요",
        "신뢰할 수 있는 사람과 감정을 나누고 사회적 지지를 받으세요",
        "자기 비판을 줄이고 자기 연민(Self-Compassion)을 실천하세요",
        "걱정 시간을 정해두고 그 외 시간에는 걱정을 미루는 연습을 해보세요"
      ],
      low: [
        "타인의 감정적 경험에 더 공감하는 연습을 해보세요",
        "자신의 감정을 더 의식적으로 인식하고 표현해보세요",
        "감정이 의사결정에 미치는 영향을 인식해보세요",
        "파트너나 가까운 사람의 감정적 필요에 더 주의를 기울여보세요"
      ]
    },
    facets: [
      { name: "불안 (Anxiety)", description: "걱정, 긴장, 불안을 자주 경험하는 경향입니다." },
      { name: "적대적 분노 (Angry Hostility)", description: "좌절이나 불공정에 분노로 반응하는 경향입니다." },
      { name: "우울 (Depression)", description: "슬픔, 죄책감, 외로움을 경험하는 경향입니다." },
      { name: "자의식 (Self-Consciousness)", description: "다른 사람들 앞에서 수줍음이나 당황함을 느끼는 경향입니다." },
      { name: "충동성 (Impulsiveness)", description: "유혹이나 충동을 조절하기 어려운 경향입니다." },
      { name: "취약성 (Vulnerability)", description: "스트레스에 압도당하고 대처하기 어려운 경향입니다." }
    ],
    researchFindings: [
      "신경증은 우울증 및 불안 장애의 가장 강력한 성격 예측 변수입니다 (Lahey, 2009)",
      "낮은 신경증은 전반적인 행복과 삶의 만족도와 관련됩니다 (Steel et al., 2008)",
      "신경증은 마음챙김 훈련을 통해 감소시킬 수 있습니다 (Keng et al., 2011)",
      "높은 신경증은 스트레스 관련 건강 문제와 관련이 있습니다 (Suls & Bunde, 2005)",
      "인지행동치료(CBT)는 신경증적 성향을 완화하는 데 효과적입니다 (Quilty et al., 2008)"
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
  detailedSummary: string;
  strengths: string[];
  growthAreas: string[];
  dominantTraits: BigFiveTrait[];
  overallInterpretation: string;
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

  // 우세한 특성 (60% 이상)
  const dominantTraits = traits.filter(t => t.score >= 60).map(t => t.trait);

  const summaries: Record<string, string> = {
    openness: "창의적이고 호기심이 많은 탐험가 유형입니다. 새로운 경험과 아이디어에 열려 있으며, 예술적 감수성이 풍부합니다.",
    conscientiousness: "체계적이고 목표 지향적인 성취자 유형입니다. 책임감이 강하고 신뢰할 수 있으며, 계획적으로 일을 추진합니다.",
    extraversion: "사교적이고 활발한 에너자이저 유형입니다. 사람들과 어울리는 것을 즐기며, 긍정적인 에너지를 발산합니다.",
    agreeableness: "따뜻하고 협조적인 조화로운 유형입니다. 타인에 대한 배려가 깊고 공감 능력이 뛰어납니다.",
    neuroticism: "감수성이 풍부하고 예민한 감정형입니다. 깊이 있는 감정을 경험하며, 주변 환경에 민감하게 반응합니다.",
  };

  // 상세 요약 생성
  const detailedSummaries: Record<string, string> = {
    openness: `당신은 Big Five 성격 모델에서 개방성이 가장 두드러진 유형으로 분류됩니다. 이는 1990년대 Costa와 McCrae가 개발한 NEO-PI-R 검사를 기반으로 한 평가입니다. 개방성이 높은 사람들은 전통적인 방식에 안주하기보다 새로운 관점과 아이디어를 탐구하는 것을 선호합니다. 연구에 따르면, 이러한 특성을 가진 사람들은 예술, 과학, 혁신 분야에서 특히 두각을 나타내며, 다문화적 환경에서의 적응력도 뛰어납니다.`,
    conscientiousness: `당신은 Big Five 성격 모델에서 성실성이 가장 두드러진 유형으로 분류됩니다. 심리학 연구에서 성실성은 직업적 성공과 학업 성취를 예측하는 가장 강력한 성격 특성으로 알려져 있습니다(Barrick & Mount, 1991). 높은 성실성을 가진 사람들은 목표 설정, 계획 수립, 실행에 있어 뛰어난 능력을 보이며, 조직 내에서 신뢰받는 구성원으로 인정받는 경향이 있습니다.`,
    extraversion: `당신은 Big Five 성격 모델에서 외향성이 가장 두드러진 유형으로 분류됩니다. Eysenck의 각성 이론에 따르면, 외향적인 사람들은 기저 각성 수준이 낮아 외부 자극과 사회적 상호작용에서 에너지를 얻습니다. 연구에 따르면 외향성은 주관적 행복감과 가장 강한 상관관계를 보이는 성격 특성이며(Steel et al., 2008), 리더십 역할과 대인 관계 중심 직업에서 강점을 발휘합니다.`,
    agreeableness: `당신은 Big Five 성격 모델에서 친화성이 가장 두드러진 유형으로 분류됩니다. 친화성은 협조성, 공감 능력, 이타심을 포함하는 특성으로, 대인 관계의 질과 팀워크에 큰 영향을 미칩니다. Graziano와 Eisenberg(1997)의 연구에 따르면, 높은 친화성은 친사회적 행동의 가장 강력한 예측 변수이며, 관계 만족도와도 강한 양의 상관관계를 보입니다.`,
    neuroticism: `당신은 Big Five 성격 모델에서 신경증이 가장 두드러진 유형으로 분류됩니다. 이는 감정적으로 민감하고 예민하다는 것을 의미하며, 반드시 부정적인 특성이 아닙니다. 높은 신경증은 위험 감지 능력, 자기 인식, 깊은 감정 경험과 관련이 있습니다. 중요한 것은 이러한 특성을 이해하고 효과적으로 관리하는 방법을 배우는 것입니다.`,
  };

  const strengths: string[] = [];
  const growthAreas: string[] = [];

  // 높은 특성에 따른 강점
  if (result.openness >= 60) {
    strengths.push("창의적 사고와 혁신적인 아이디어로 문제를 해결합니다");
    strengths.push("새로운 경험에 대한 열린 자세로 성장 기회를 잡습니다");
  }
  if (result.conscientiousness >= 60) {
    strengths.push("뛰어난 조직력과 계획성으로 목표를 달성합니다");
    strengths.push("높은 책임감과 신뢰성으로 팀에 기여합니다");
  }
  if (result.extraversion >= 60) {
    strengths.push("원활한 대인 관계와 소통 능력으로 협력을 이끕니다");
    strengths.push("긍정적인 에너지와 리더십으로 팀에 활력을 줍니다");
  }
  if (result.agreeableness >= 60) {
    strengths.push("뛰어난 공감 능력으로 깊은 관계를 형성합니다");
    strengths.push("협동심과 배려로 조화로운 환경을 만듭니다");
  }
  if (result.neuroticism <= 40) {
    strengths.push("정서적 안정성으로 스트레스 상황에서도 침착함을 유지합니다");
    strengths.push("차분한 태도로 위기 상황에서 신뢰를 제공합니다");
  }

  // 성장 영역
  if (result.openness <= 40) {
    growthAreas.push("새로운 경험에 더 열린 자세를 가져보세요 - 일주일에 한 번 새로운 것을 시도해보는 것부터 시작할 수 있습니다");
  }
  if (result.conscientiousness <= 40) {
    growthAreas.push("목표 설정과 계획 수립 습관을 길러보세요 - 작은 목표부터 시작하여 성취감을 경험해보세요");
  }
  if (result.extraversion <= 40) {
    growthAreas.push("점진적으로 사회적 상호작용을 늘려보세요 - 편안한 소규모 모임부터 시작하는 것이 효과적입니다");
  }
  if (result.agreeableness <= 40) {
    growthAreas.push("타인의 관점에서 생각해보는 연습을 해보세요 - 공감 능력은 연습을 통해 발전할 수 있습니다");
  }
  if (result.neuroticism >= 60) {
    growthAreas.push("스트레스 관리와 감정 조절 기술을 개발해보세요 - 마음챙김이나 명상이 효과적입니다");
    growthAreas.push("인지행동기법(CBT)을 통해 부정적 사고 패턴을 재구성하는 방법을 배워보세요");
  }

  if (strengths.length === 0) {
    strengths.push("균형 잡힌 성격 특성으로 다양한 상황에 적응합니다");
    strengths.push("극단적이지 않은 접근으로 유연하게 대응합니다");
  }

  if (growthAreas.length === 0) {
    growthAreas.push("현재의 균형 잡힌 성격을 유지하면서 특정 상황에서 필요한 특성을 의식적으로 발휘해보세요");
    growthAreas.push("자신의 강점을 더욱 발전시켜 전문성을 높여보세요");
  }

  // 전체적인 해석 생성
  const overallInterpretation = generateOverallInterpretation(result, highestTrait.trait, secondHighest.trait);

  return {
    summary: summaries[highestTrait.trait],
    detailedSummary: detailedSummaries[highestTrait.trait],
    strengths: strengths.slice(0, 4),
    growthAreas: growthAreas.slice(0, 3),
    dominantTraits,
    overallInterpretation,
  };
};

// E-E-A-T 기반 전체 해석 생성
function generateOverallInterpretation(result: BigFiveResult, highest: BigFiveTrait, secondHighest: BigFiveTrait): string {
  const interpretations: string[] = [];

  // 도입부
  interpretations.push(`Big Five 성격 테스트 결과를 바탕으로 당신의 성격 프로필을 종합적으로 분석해드립니다. 이 테스트는 Costa와 McCrae(1992)가 개발한 NEO-PI-R 모델을 기반으로 하며, 현대 심리학에서 가장 과학적으로 검증된 성격 평가 도구 중 하나입니다. 수십 년간의 연구를 통해 이 모델의 신뢰도와 타당도가 입증되었으며, 전 세계적으로 다양한 문화권에서 일관된 결과를 보여주고 있습니다.`);

  // 특성 조합에 따른 해석
  if (result.openness >= 60 && result.conscientiousness >= 60) {
    interpretations.push(`당신은 개방성과 성실성이 모두 높은 드문 조합을 보여줍니다. 이는 창의적인 아이디어를 가지면서도 이를 체계적으로 실행할 수 있는 능력을 갖추고 있음을 의미합니다. 연구에 따르면 이러한 조합은 혁신적인 프로젝트의 성공과 강한 상관관계를 보입니다. 당신은 '비전을 가진 실행가' 유형으로, 아이디어를 현실로 만들어내는 데 탁월한 능력을 발휘할 수 있습니다.`);
  }

  if (result.extraversion >= 60 && result.agreeableness >= 60) {
    interpretations.push(`당신은 외향성과 친화성이 모두 높은 조합을 보여줍니다. 이는 사교적이면서도 협조적인 성격을 의미하며, 대인 관계에서 특히 강점을 발휘합니다. 이러한 특성의 조합은 팀 리더십, 고객 관계, 중재 역할에서 뛰어난 성과를 예측합니다. 사람들은 당신과 함께 있을 때 편안함과 에너지를 동시에 느낄 가능성이 높습니다.`);
  }

  if (result.neuroticism <= 40 && result.conscientiousness >= 60) {
    interpretations.push(`당신은 정서적으로 안정되면서도 성실한 특성을 보여줍니다. 이 조합은 직업적 성공과 가장 강한 상관관계를 보이는 성격 프로필 중 하나입니다. 스트레스 상황에서도 침착하게 계획을 실행할 수 있으며, 장기적인 목표를 향해 꾸준히 나아가는 능력이 뛰어납니다. 리더십 역할이나 고압적인 환경에서 특히 강점을 발휘할 수 있습니다.`);
  }

  if (result.openness >= 60 && result.extraversion <= 40) {
    interpretations.push(`당신은 개방성이 높으면서도 내향적인 특성을 보여줍니다. 이는 깊이 있는 사고와 창의성을 결합한 '사색적 창조자' 유형입니다. 혼자만의 시간에서 아이디어를 발전시키고, 독립적인 창작 활동에서 뛰어난 성과를 보일 가능성이 높습니다. 작가, 연구자, 예술가 등 집중과 창의성이 모두 필요한 분야에서 강점을 발휘할 수 있습니다.`);
  }

  // 균형 잡힌 프로필에 대한 해석
  const allMedium = Object.values(result).every(score => score >= 40 && score <= 60);
  if (allMedium) {
    interpretations.push(`당신은 모든 특성이 중간 범위에 있는 균형 잡힌 성격 프로필을 보여줍니다. 이는 극단적이지 않고 상황에 따라 유연하게 적응할 수 있음을 의미합니다. 다양한 환경과 역할에서 적응력을 발휘할 수 있으며, 다른 성격 유형의 사람들과도 원활하게 협력할 수 있습니다. 이러한 유연성은 복잡하고 다양한 요구가 있는 현대 사회에서 큰 강점이 될 수 있습니다.`);
  }

  // 마무리
  interpretations.push(`성격은 고정된 것이 아니라 경험과 의식적인 노력을 통해 발전할 수 있습니다. 연구에 따르면 Big Five 특성들은 나이가 들면서 점진적으로 변화하며(Roberts et al., 2006), 의도적인 연습과 환경의 변화를 통해서도 조절될 수 있습니다. 이 결과를 자기 이해의 도구로 활용하되, 자신의 가능성을 제한하는 틀로 받아들이지 않는 것이 중요합니다. 당신의 성격 특성을 이해하고 활용하여 더 나은 삶의 결정을 내리는 데 이 정보가 도움이 되기를 바랍니다.`);

  return interpretations.join('\n\n');
}
