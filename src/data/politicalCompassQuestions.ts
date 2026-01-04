export interface PoliticalCompassQuestion {
  id: number;
  text: string;
  category: "economic" | "social";
}

export const politicalCompassQuestions: PoliticalCompassQuestion[] = [
  // 경제 관련 질문 (Economic: Left/Right)
  // 동의 = 우파(+), 반대 = 좌파(-)
  {
    id: 1,
    text: "시장 경제는 정부의 개입 없이 스스로 조절될 수 있다.",
    category: "economic",
  },
  {
    id: 2,
    text: "대기업에 대한 규제를 줄여야 경제가 성장한다.",
    category: "economic",
  },
  {
    id: 3,
    text: "최저임금 제도는 오히려 고용을 감소시킨다.",
    category: "economic",
  },
  {
    id: 4,
    text: "의료, 교육 등 공공서비스는 민영화되어야 한다.",
    category: "economic",
  },
  {
    id: 5,
    text: "부유층에 대한 세금을 높이면 경제 발전을 저해한다.",
    category: "economic",
  },
  {
    id: 6,
    text: "복지 제도의 확대는 개인의 근로 의욕을 떨어뜨린다.",
    category: "economic",
  },
  {
    id: 7,
    text: "노동조합은 기업의 경쟁력을 약화시킨다.",
    category: "economic",
  },
  {
    id: 8,
    text: "사유재산권은 어떤 경우에도 침해받아서는 안 된다.",
    category: "economic",
  },
  {
    id: 9,
    text: "자유무역은 모든 국가에 이익이 된다.",
    category: "economic",
  },
  {
    id: 10,
    text: "기업의 사회적 책임보다 이윤 창출이 더 중요하다.",
    category: "economic",
  },

  // 사회/권위 관련 질문 (Social: Authoritarian/Libertarian)
  // 동의 = 권위주의(+), 반대 = 자유주의(-)
  {
    id: 11,
    text: "사회 안정을 위해 개인의 자유가 일부 제한될 수 있다.",
    category: "social",
  },
  {
    id: 12,
    text: "국가 안보를 위해 시민의 통신 감청이 필요하다.",
    category: "social",
  },
  {
    id: 13,
    text: "전통적인 가족 가치관을 지키는 것이 중요하다.",
    category: "social",
  },
  {
    id: 14,
    text: "범죄에 대한 처벌은 더 강화되어야 한다.",
    category: "social",
  },
  {
    id: 15,
    text: "군대나 경찰에 대한 예산을 늘려야 한다.",
    category: "social",
  },
  {
    id: 16,
    text: "학교에서 애국심 교육을 강화해야 한다.",
    category: "social",
  },
  {
    id: 17,
    text: "언론의 자유는 국익을 위해 제한될 수 있다.",
    category: "social",
  },
  {
    id: 18,
    text: "종교적 가치가 법률에 반영되어야 한다.",
    category: "social",
  },
  {
    id: 19,
    text: "강력한 지도자가 민주적 절차보다 효과적일 수 있다.",
    category: "social",
  },
  {
    id: 20,
    text: "마약 사용은 개인의 선택이 아니라 범죄로 엄격히 처벌해야 한다.",
    category: "social",
  },
  {
    id: 21,
    text: "이민자 유입은 엄격하게 제한되어야 한다.",
    category: "social",
  },
  {
    id: 22,
    text: "집회 및 시위는 사회 질서를 위해 제한될 수 있다.",
    category: "social",
  },
];

export type AnswerValue = -2 | -1 | 0 | 1 | 2;

export const answerOptions: { value: AnswerValue; label: string }[] = [
  { value: -2, label: "강하게 반대" },
  { value: -1, label: "반대" },
  { value: 0, label: "중립" },
  { value: 1, label: "동의" },
  { value: 2, label: "강하게 동의" },
];
