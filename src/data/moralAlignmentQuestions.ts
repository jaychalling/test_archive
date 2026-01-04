export interface MoralAlignmentQuestion {
  id: number;
  text: string;
  axis: "goodEvil" | "lawfulChaotic";
  direction: 1 | -1; // 1 = 동의하면 Good/Lawful, -1 = 동의하면 Evil/Chaotic
}

export const moralAlignmentQuestions: MoralAlignmentQuestion[] = [
  // Good/Evil 축 질문 (이타심 vs 이기심, 도덕적 태도)
  // direction 1: 동의 = Good(+), direction -1: 동의 = Evil(-)
  {
    id: 1,
    text: "다른 사람을 돕는 것은 대가를 바라지 않아도 그 자체로 가치 있다.",
    axis: "goodEvil",
    direction: 1,
  },
  {
    id: 2,
    text: "때로는 목적을 위해 다른 사람을 이용하는 것이 정당화될 수 있다.",
    axis: "goodEvil",
    direction: -1,
  },
  {
    id: 3,
    text: "낯선 사람이 곤경에 처해 있다면 내 일정을 미루더라도 도와줄 것이다.",
    axis: "goodEvil",
    direction: 1,
  },
  {
    id: 4,
    text: "세상은 약육강식이며, 강한 자가 살아남는 것이 자연의 이치다.",
    axis: "goodEvil",
    direction: -1,
  },
  {
    id: 5,
    text: "모든 생명은 동등한 존엄성을 가진다.",
    axis: "goodEvil",
    direction: 1,
  },
  {
    id: 6,
    text: "복수는 정당한 것이며, 나에게 해를 끼친 자에게 되갚아야 한다.",
    axis: "goodEvil",
    direction: -1,
  },
  {
    id: 7,
    text: "타인의 고통을 보면 마음이 아프고 공감하게 된다.",
    axis: "goodEvil",
    direction: 1,
  },
  {
    id: 8,
    text: "나의 성공을 위해서라면 경쟁자를 밀어내는 것은 당연하다.",
    axis: "goodEvil",
    direction: -1,
  },
  {
    id: 9,
    text: "용서는 미덕이며, 원한을 품는 것보다 낫다.",
    axis: "goodEvil",
    direction: 1,
  },
  {
    id: 10,
    text: "결과가 좋다면 그 과정에서 누군가가 피해를 입어도 괜찮다.",
    axis: "goodEvil",
    direction: -1,
  },
  {
    id: 11,
    text: "약자를 보호하는 것은 사회의 의무이다.",
    axis: "goodEvil",
    direction: 1,
  },
  {
    id: 12,
    text: "신뢰는 이용당하기 위한 약점일 뿐이다.",
    axis: "goodEvil",
    direction: -1,
  },

  // Lawful/Chaotic 축 질문 (규칙/질서 vs 자유/개인주의)
  // direction 1: 동의 = Lawful(+), direction -1: 동의 = Chaotic(-)
  {
    id: 13,
    text: "법과 규칙은 사회 질서 유지를 위해 반드시 지켜져야 한다.",
    axis: "lawfulChaotic",
    direction: 1,
  },
  {
    id: 14,
    text: "규칙보다 상황에 맞는 유연한 판단이 더 중요하다.",
    axis: "lawfulChaotic",
    direction: -1,
  },
  {
    id: 15,
    text: "약속은 어떤 상황에서도 지켜야 한다.",
    axis: "lawfulChaotic",
    direction: 1,
  },
  {
    id: 16,
    text: "권위에 의문을 제기하는 것은 건강한 사회의 특징이다.",
    axis: "lawfulChaotic",
    direction: -1,
  },
  {
    id: 17,
    text: "전통과 관습은 존중받아야 하며 쉽게 바뀌어서는 안 된다.",
    axis: "lawfulChaotic",
    direction: 1,
  },
  {
    id: 18,
    text: "개인의 자유는 사회적 규범보다 우선한다.",
    axis: "lawfulChaotic",
    direction: -1,
  },
  {
    id: 19,
    text: "조직이나 집단의 결정은 개인의 의견보다 우선되어야 한다.",
    axis: "lawfulChaotic",
    direction: 1,
  },
  {
    id: 20,
    text: "때로는 규칙을 어기는 것이 올바른 일일 수 있다.",
    axis: "lawfulChaotic",
    direction: -1,
  },
  {
    id: 21,
    text: "명확한 위계질서가 있는 조직이 효율적이다.",
    axis: "lawfulChaotic",
    direction: 1,
  },
  {
    id: 22,
    text: "나는 나만의 도덕적 기준으로 행동하며, 남의 기준을 따르지 않는다.",
    axis: "lawfulChaotic",
    direction: -1,
  },
  {
    id: 23,
    text: "계획을 세우고 그에 따라 행동하는 것이 중요하다.",
    axis: "lawfulChaotic",
    direction: 1,
  },
  {
    id: 24,
    text: "즉흥적인 결정과 변화를 두려워하지 않는다.",
    axis: "lawfulChaotic",
    direction: -1,
  },
];

export type AnswerValue = 1 | 2 | 3 | 4 | 5;

export const answerOptions: { value: AnswerValue; label: string }[] = [
  { value: 1, label: "전혀 아니다" },
  { value: 2, label: "아니다" },
  { value: 3, label: "보통이다" },
  { value: 4, label: "그렇다" },
  { value: 5, label: "매우 그렇다" },
];

export type AlignmentType =
  | "lawfulGood"
  | "neutralGood"
  | "chaoticGood"
  | "lawfulNeutral"
  | "trueNeutral"
  | "chaoticNeutral"
  | "lawfulEvil"
  | "neutralEvil"
  | "chaoticEvil";

export interface AlignmentInfo {
  name: string;
  nickname: string;
  description: string;
  traits: string[];
  examples: string[];
  color: string;
}

export const alignmentData: Record<AlignmentType, AlignmentInfo> = {
  lawfulGood: {
    name: "Lawful Good",
    nickname: "십자군",
    description:
      "질서와 선의 수호자입니다. 법과 규칙을 존중하면서도 타인을 돕고 정의를 실현하려 합니다. 명예와 의무를 중시하며, 약자를 보호하고 악에 맞서 싸웁니다.",
    traits: [
      "정의감이 강함",
      "규칙과 법을 준수함",
      "약자를 보호함",
      "명예를 중시함",
      "책임감이 강함",
    ],
    examples: ["슈퍼맨", "캡틴 아메리카", "간달프", "아라곤"],
    color: "from-yellow-400 to-blue-500",
  },
  neutralGood: {
    name: "Neutral Good",
    nickname: "은인",
    description:
      "순수하게 선을 추구하는 사람입니다. 법이든 자유든 상관없이 가장 많은 선을 행할 수 있는 방법을 선택합니다. 융통성 있게 좋은 일을 하려 합니다.",
    traits: [
      "이타적임",
      "유연한 사고방식",
      "실용적인 선행",
      "편견 없이 도움",
      "결과 중심의 선행",
    ],
    examples: ["스파이더맨", "간달프", "덤블도어", "프로도"],
    color: "from-green-400 to-emerald-500",
  },
  chaoticGood: {
    name: "Chaotic Good",
    nickname: "반항아",
    description:
      "자유를 사랑하면서도 선한 마음을 가진 사람입니다. 억압적인 규칙이나 부당한 권위에 맞서며, 자신만의 방식으로 옳은 일을 합니다.",
    traits: [
      "자유를 사랑함",
      "권위에 반항함",
      "개인의 양심을 따름",
      "약자의 편에 섬",
      "창의적인 문제해결",
    ],
    examples: ["로빈 후드", "한 솔로", "잭 스패로우", "스타로드"],
    color: "from-orange-400 to-red-400",
  },
  lawfulNeutral: {
    name: "Lawful Neutral",
    nickname: "심판관",
    description:
      "질서와 규칙 그 자체를 중시하는 사람입니다. 선악보다 법과 체계의 유지가 중요하다고 믿으며, 공정하고 일관된 기준을 적용합니다.",
    traits: [
      "법과 질서 중시",
      "일관성 있는 행동",
      "공정함 추구",
      "의무에 충실함",
      "체계적인 사고",
    ],
    examples: ["로보캅", "드레드", "스팍", "닉 퓨리"],
    color: "from-blue-400 to-indigo-500",
  },
  trueNeutral: {
    name: "True Neutral",
    nickname: "방관자",
    description:
      "균형을 추구하거나 어느 쪽에도 치우치지 않는 사람입니다. 상황에 따라 유연하게 행동하며, 극단적인 선택을 피하려 합니다.",
    traits: [
      "균형 추구",
      "중립적 관점",
      "실용적인 접근",
      "판단 유보",
      "자연의 순리 존중",
    ],
    examples: ["트리가드", "엔트", "스네이프 교수", "닥터 맨해튼"],
    color: "from-gray-400 to-slate-500",
  },
  chaoticNeutral: {
    name: "Chaotic Neutral",
    nickname: "자유인",
    description:
      "개인의 자유를 최우선으로 여기는 사람입니다. 어떤 권위나 규칙에도 얽매이지 않으며, 자신의 욕구와 변덕에 따라 행동합니다.",
    traits: [
      "극도의 개인주의",
      "예측 불가능함",
      "구속을 싫어함",
      "자유분방함",
      "충동적인 행동",
    ],
    examples: ["잭 스패로우", "캣우먼", "데드풀", "록키"],
    color: "from-purple-400 to-pink-500",
  },
  lawfulEvil: {
    name: "Lawful Evil",
    nickname: "지배자",
    description:
      "체계와 규칙을 이용해 자신의 이익을 추구하는 사람입니다. 법의 허점을 이용하거나, 자신에게 유리한 규칙을 만들어 타인을 지배합니다.",
    traits: [
      "체계적인 악행",
      "권력 추구",
      "규칙을 이용함",
      "냉정하고 계산적",
      "조직적인 지배",
    ],
    examples: ["다스 베이더", "마그네토", "타노스", "킹핀"],
    color: "from-red-600 to-purple-700",
  },
  neutralEvil: {
    name: "Neutral Evil",
    nickname: "악당",
    description:
      "순수하게 자기 이익만을 추구하는 사람입니다. 선이든 악이든, 법이든 혼돈이든 상관없이 자신에게 이로운 것만 선택합니다.",
    traits: [
      "극도의 이기심",
      "수단과 방법을 가리지 않음",
      "충성심 없음",
      "배신을 두려워하지 않음",
      "실용적인 악",
    ],
    examples: ["볼드모트", "사우론", "사루만", "팔파틴"],
    color: "from-gray-700 to-red-800",
  },
  chaoticEvil: {
    name: "Chaotic Evil",
    nickname: "파괴자",
    description:
      "파괴와 혼돈 그 자체를 즐기는 사람입니다. 어떤 규칙도, 도덕도 인정하지 않으며, 자신의 욕망과 충동에 따라 무차별적으로 행동합니다.",
    traits: [
      "무질서와 파괴를 추구",
      "예측 불가능한 폭력성",
      "규칙의 완전한 거부",
      "충동적인 악행",
      "혼돈 그 자체를 즐김",
    ],
    examples: ["조커", "카오스 신들", "람지 볼튼", "카니지"],
    color: "from-red-700 to-black",
  },
};
