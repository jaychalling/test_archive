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

export interface PersonalityTypeInfo {
  name: string;
  nameEn: string;
  description: string;
  characteristics: string[];
  energyTips: string[];
  strengths: string[];
  watchPoints: string[];
  color: string;
  detailedDescription: string;
  scientificBackground: string;
  careerSuggestions: string[];
  socialTips: string[];
}

export const personalityTypeDescriptions: Record<PersonalityType, PersonalityTypeInfo> = {
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
    detailedDescription: "강한 내향형은 내향성 스펙트럼의 가장 끝에 위치합니다. 이 유형은 사회적 상호작용이 에너지를 소모시키며, 혼자만의 시간을 통해서만 진정으로 재충전됩니다. 내면 세계가 풍부하고 깊이 있는 사고를 하며, 표면적인 관계보다 소수의 의미 있는 관계를 선호합니다. 강한 내향형은 조용한 환경에서 최고의 성과를 내며, 독립적인 작업에서 빛을 발합니다. 이들은 말하기 전에 충분히 생각하고, 깊이 있는 통찰력을 제공합니다. Susan Cain의 '콰이어트'에서 강조하듯, 내향성은 약점이 아니라 다른 강점입니다. 현대 사회가 외향성을 이상화하지만, 많은 창의적이고 성공적인 사람들이 강한 내향형입니다.",
    scientificBackground: "내향성과 외향성의 개념은 Carl Jung에 의해 처음 제안되었으며, 후에 Hans Eysenck가 과학적으로 연구했습니다. Eysenck의 이론에 따르면, 내향형은 기저 각성 수준(baseline arousal)이 높아 외부 자극에 덜 의존합니다. 신경과학 연구에서 내향형은 전두엽 피질의 활동이 더 높고, 도파민 보상 시스템의 민감도가 다릅니다. 또한 내향형은 아세틸콜린 경로에 더 민감할 수 있으며, 이는 깊은 사고와 집중과 관련됩니다. 연구에 따르면 인구의 약 25-40%가 내향형으로 분류되며, 강한 내향형은 이 중 소수입니다.",
    careerSuggestions: [
      "작가, 편집자, 연구원",
      "프로그래머, 데이터 분석가",
      "그래픽 디자이너, 아티스트",
      "회계사, 재무 분석가",
      "심리상담사(개인 상담)"
    ],
    socialTips: [
      "미리 에너지를 충전하고 사회적 모임에 참여하세요",
      "필요할 때 조용히 빠져나와 재충전하세요",
      "일대일 대화나 소그룹 상호작용을 선호하세요",
      "자신의 한계를 인식하고 존중하세요",
      "문자나 이메일로 연락을 유지하는 것도 좋은 방법입니다"
    ],
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
    detailedDescription: "내향형은 외향성-내향성 스펙트럼에서 내향적 쪽에 위치하지만, 강한 내향형처럼 극단적이지 않습니다. 이들은 사회적 상호작용을 즐길 수 있지만, 그 후에는 에너지 재충전을 위한 혼자만의 시간이 필요합니다. 내향형은 깊이 있는 관계를 선호하며, 피상적인 대화보다 의미 있는 대화를 나누는 것을 좋아합니다. 이들은 관찰력이 뛰어나고, 상황을 파악한 후에 행동하는 경향이 있습니다. 직장에서 내향형은 독립적인 작업에서 뛰어난 성과를 보이며, 깊은 집중력을 발휘합니다. 팀 환경에서도 잘 기능하지만, 소규모 팀이나 명확한 역할이 있는 환경을 선호합니다. 창의적인 문제 해결과 분석적 사고에서 강점을 보이며, 신중한 의사결정으로 알려져 있습니다. 많은 성공적인 작가, 과학자, 예술가들이 내향형에 속합니다.",
    scientificBackground: "심리학자 Carl Jung은 내향성을 정신 에너지가 내면으로 향하는 성격 특성으로 정의했습니다. 현대 신경과학 연구에 따르면, 내향형은 전두엽 피질에서 더 많은 혈류가 관찰되며, 이는 깊은 사고와 계획과 관련이 있습니다. Hans Eysenck의 각성 이론에서는 내향형이 기저 각성 수준이 높기 때문에 외부 자극을 덜 필요로 한다고 설명합니다. 연구에 따르면 내향형은 도파민 보상 시스템에 덜 민감하여 사회적 상호작용에서 오는 '보상' 추구가 덜 강렬합니다. 쌍생아 연구에서는 내향성-외향성의 약 40-60%가 유전적 요인에 의해 결정된다는 것을 보여줍니다.",
    careerSuggestions: [
      "소프트웨어 개발자, 백엔드 엔지니어",
      "연구원, 학자, 과학자",
      "편집자, 기술 작가",
      "회계사, 재무 분석가",
      "사서, 아키비스트",
      "그래픽 디자이너, UI/UX 디자이너"
    ],
    socialTips: [
      "사회적 모임 전에 에너지를 충분히 충전해 두세요",
      "소규모 모임이나 일대일 만남을 우선시하세요",
      "네트워킹 이벤트에서는 깊은 대화 몇 개에 집중하세요",
      "온라인 커뮤니케이션을 활용하여 관계를 유지하세요",
      "자신의 한계를 인식하고 필요시 중간에 휴식을 취하세요",
      "친한 친구와 함께 사회적 이벤트에 참석하면 더 편안합니다"
    ],
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
    detailedDescription: "양향형(Ambivert)은 내향성과 외향성 스펙트럼의 중간에 위치하며, 연구에 따르면 인구의 대다수가 이 범주에 속합니다. 양향형은 상황에 따라 내향적 또는 외향적 특성을 유연하게 발휘할 수 있어 다양한 환경에 적응하는 데 큰 이점이 있습니다. 이들은 사회적 상호작용을 즐기면서도 혼자만의 시간을 소중히 여기며, 두 가지 모두에서 에너지를 얻을 수 있습니다. 양향형은 내향형과 외향형 모두와 쉽게 소통할 수 있어 '인간관계의 카멜레온'이라고 불리기도 합니다. 직장에서 양향형은 독립 작업과 협업 모두에서 편안함을 느끼며, 상황에 맞게 리더십을 발휘하거나 팀원으로서 역할을 수행할 수 있습니다. 이러한 유연성은 영업, 관리, 컨설팅 등 다양한 대인 관계 상황을 요구하는 직업에서 특히 유리합니다.",
    scientificBackground: "심리학자 Hans Eysenck는 성격 특성이 정규 분포를 따른다고 제안했으며, 대부분의 사람들이 극단적인 내향형이나 외향형이 아닌 중간 어딘가에 위치한다고 설명했습니다. Adam Grant의 2013년 연구에서는 양향형 영업사원이 내향형이나 외향형보다 더 높은 성과를 보인다는 것을 발견했습니다. 이는 양향형이 상황에 맞게 말하기와 듣기를 조절할 수 있기 때문입니다. 신경과학적 관점에서, 양향형은 도파민 보상 시스템에 대한 중간 정도의 민감성을 보이며, 이는 사회적 자극에 대해 균형 잡힌 반응을 가능하게 합니다. 일부 연구자들은 양향형이 가장 적응적인 성격 유형일 수 있다고 제안합니다.",
    careerSuggestions: [
      "영업 및 비즈니스 개발",
      "프로젝트 매니저, 팀 리더",
      "컨설턴트, 코치",
      "교사, 강사",
      "마케팅 전문가",
      "HR 전문가, 채용 담당자"
    ],
    socialTips: [
      "자신의 에너지 수준을 정기적으로 체크하세요",
      "상황에 따라 적절히 내향적/외향적 모드를 선택하세요",
      "양쪽 특성을 모두 활용하여 다양한 사람들과 연결하세요",
      "사회적 활동과 혼자만의 시간을 균형 있게 배분하세요",
      "자신의 진정한 선호도가 무엇인지 성찰하는 시간을 가지세요",
      "과도한 사회화나 과도한 고립 모두 피하세요"
    ],
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
    detailedDescription: "외향형은 사회적 상호작용을 통해 에너지를 얻고 충전하는 사람들입니다. 이들은 다른 사람들과 함께할 때 활기를 느끼며, 사교적인 환경에서 번창합니다. 외향형은 일반적으로 새로운 사람을 만나는 것을 즐기고, 대화를 이끌며, 그룹 상황에서 편안함을 느낍니다. 생각을 말로 표현하면서 정리하는 경향이 있어, 브레인스토밍 세션이나 토론에서 활발하게 참여합니다. 외향형은 행동 지향적이며 새로운 경험을 추구합니다. 이들은 변화와 다양성을 즐기고, 루틴보다는 역동적인 환경을 선호합니다. 직장에서 외향형은 팀 환경에서 뛰어난 성과를 보이며, 네트워킹과 관계 구축에 능숙합니다. 리더십 역할에서 자연스럽게 빛을 발하며, 긍정적인 에너지로 주변 사람들에게 동기를 부여합니다.",
    scientificBackground: "Carl Jung의 원래 개념에서 외향성은 정신 에너지가 외부 세계로 향하는 것을 의미합니다. Hans Eysenck의 연구에 따르면, 외향형은 대뇌 피질의 기저 각성 수준이 낮아 외부 자극을 더 많이 추구합니다. 신경과학 연구에서 외향형은 도파민 보상 시스템에 더 민감하며, 이는 사회적 상호작용에서 더 많은 쾌감을 느끼게 합니다. 외향형은 전두엽 피질보다 후두엽과 측두엽 영역에서 더 많은 활동을 보이는데, 이는 외부 자극 처리와 관련이 있습니다. 연구에 따르면 외향성은 긍정적 감정과 높은 상관관계가 있으며, 행복감과 삶의 만족도에 긍정적인 영향을 미칩니다.",
    careerSuggestions: [
      "영업 담당자, 비즈니스 개발 매니저",
      "이벤트 플래너, PR 전문가",
      "교사, 트레이너, 강연자",
      "고객 서비스 관리자",
      "정치인, 로비스트",
      "엔터테이너, 방송인"
    ],
    socialTips: [
      "다양한 사회적 그룹에 참여하여 네트워크를 넓히세요",
      "내향형 친구나 동료들의 스타일을 존중하세요",
      "대화에서 말하기와 듣기의 균형을 의식적으로 유지하세요",
      "혼자만의 성찰 시간을 일정에 의도적으로 포함시키세요",
      "팀 프로젝트에서 리더십을 발휘하되 다른 의견도 존중하세요",
      "에너지가 넘칠 때 주변 사람들이 압도되지 않도록 주의하세요"
    ],
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
    detailedDescription: "강한 외향형은 외향성 스펙트럼의 가장 끝에 위치합니다. 이 유형은 사회적 상호작용을 통해 최대한의 에너지를 얻으며, 사람들과 함께 있을 때 가장 생동감을 느낍니다. 대규모 모임, 파티, 네트워킹 이벤트에서 번창하며, 자연스럽게 주목의 중심이 됩니다. 강한 외향형은 뛰어난 카리스마와 대화 능력을 가지고 있어 사람들을 쉽게 끌어들이고 영감을 줍니다. 이들은 새로운 경험과 자극을 적극적으로 추구하며, 모험적이고 즉흥적인 성향을 보입니다. 생각을 말로 표현하면서 정리하는 경향이 강하여, 혼자 조용히 생각하는 것보다 토론이나 대화를 통해 아이디어를 발전시킵니다. 직장에서 강한 외향형은 리더십 역할에서 탁월하며, 팀을 동기 부여하고 조직 문화를 형성하는 데 큰 영향을 미칩니다. 영업, 마케팅, 엔터테인먼트, 정치 분야에서 성공하는 경우가 많습니다.",
    scientificBackground: "Hans Eysenck의 성격 이론에 따르면, 강한 외향형은 대뇌 피질의 기저 각성 수준이 가장 낮아 외부 자극을 가장 많이 추구합니다. 이로 인해 사회적 상호작용, 새로운 경험, 감각적 자극을 통해 최적의 각성 수준에 도달합니다. 신경과학 연구에서 강한 외향형은 도파민 보상 경로가 매우 활발하며, 이는 사회적 상호작용에서 강한 쾌감과 보상 반응을 경험하게 합니다. 또한 강한 외향형은 뇌의 보상 중추인 복측 피개 영역(VTA)과 측좌핵(nucleus accumbens)의 활동이 더 활발합니다. 연구에 따르면 강한 외향성은 높은 긍정적 정서성과 관련이 있으며, 스트레스 상황에서도 빠르게 회복하는 경향이 있습니다. 그러나 혼자 있는 시간이 부족하면 번아웃의 위험도 있습니다.",
    careerSuggestions: [
      "CEO, 경영 임원, 기업가",
      "영업 이사, 비즈니스 개발 임원",
      "방송인, 연예인, MC",
      "정치인, 외교관",
      "이벤트 기획자, 프로모터",
      "모티베이션 스피커, 강연자"
    ],
    socialTips: [
      "다양한 사회적 환경에서 리더십을 발휘하세요",
      "내향형 사람들과 일할 때는 그들의 스타일을 존중하고 공간을 주세요",
      "대화에서 다른 사람들이 말할 기회를 의식적으로 만들어 주세요",
      "정기적으로 혼자만의 시간을 스케줄에 포함시키세요",
      "충동적인 결정 전에 잠시 멈추고 생각하는 습관을 기르세요",
      "에너지 수준이 다른 사람들과 균형을 맞추는 연습을 하세요"
    ],
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
