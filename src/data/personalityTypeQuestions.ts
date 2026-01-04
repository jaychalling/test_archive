// 16가지 성격 유형 테스트 (16 Personality Style Test)
// 4가지 차원: E/I, S/N, T/F, J/P

export type Dimension = "EI" | "SN" | "TF" | "JP";

export interface PersonalityQuestion {
  id: number;
  dimension: Dimension;
  optionA: {
    text: string;
    type: "E" | "S" | "T" | "J"; // 첫 번째 선택지의 유형
  };
  optionB: {
    text: string;
    type: "I" | "N" | "F" | "P"; // 두 번째 선택지의 유형
  };
}

export type AnswerChoice = "A" | "B";

// 40개 질문 (각 차원당 10개)
export const personalityQuestions: PersonalityQuestion[] = [
  // === E/I (외향/내향) - 에너지 방향 10문항 ===
  {
    id: 1,
    dimension: "EI",
    optionA: {
      text: "사람들과 어울리면 에너지가 충전된다.",
      type: "E",
    },
    optionB: {
      text: "혼자만의 시간을 가지면 에너지가 충전된다.",
      type: "I",
    },
  },
  {
    id: 2,
    dimension: "EI",
    optionA: {
      text: "말을 하면서 생각을 정리하는 편이다.",
      type: "E",
    },
    optionB: {
      text: "충분히 생각한 후에 말하는 편이다.",
      type: "I",
    },
  },
  {
    id: 3,
    dimension: "EI",
    optionA: {
      text: "넓고 다양한 친구 관계를 선호한다.",
      type: "E",
    },
    optionB: {
      text: "깊고 소수의 친구 관계를 선호한다.",
      type: "I",
    },
  },
  {
    id: 4,
    dimension: "EI",
    optionA: {
      text: "파티나 모임에 참석하면 활기를 얻는다.",
      type: "E",
    },
    optionB: {
      text: "파티나 모임 후에는 혼자 쉬고 싶다.",
      type: "I",
    },
  },
  {
    id: 5,
    dimension: "EI",
    optionA: {
      text: "새로운 사람을 만나는 것이 즐겁다.",
      type: "E",
    },
    optionB: {
      text: "이미 아는 사람들과 시간을 보내는 것이 편하다.",
      type: "I",
    },
  },
  {
    id: 6,
    dimension: "EI",
    optionA: {
      text: "먼저 행동하고 나중에 생각하는 편이다.",
      type: "E",
    },
    optionB: {
      text: "충분히 생각한 후에 행동하는 편이다.",
      type: "I",
    },
  },
  {
    id: 7,
    dimension: "EI",
    optionA: {
      text: "적극적으로 대화를 이끄는 편이다.",
      type: "E",
    },
    optionB: {
      text: "대화를 듣고 필요할 때만 말하는 편이다.",
      type: "I",
    },
  },
  {
    id: 8,
    dimension: "EI",
    optionA: {
      text: "외부 세계의 사람과 활동에 관심이 많다.",
      type: "E",
    },
    optionB: {
      text: "내면세계의 생각과 감정에 관심이 많다.",
      type: "I",
    },
  },
  {
    id: 9,
    dimension: "EI",
    optionA: {
      text: "그룹 활동을 할 때 능률이 오른다.",
      type: "E",
    },
    optionB: {
      text: "혼자 작업할 때 집중이 더 잘 된다.",
      type: "I",
    },
  },
  {
    id: 10,
    dimension: "EI",
    optionA: {
      text: "생각을 바로바로 말로 표현하는 편이다.",
      type: "E",
    },
    optionB: {
      text: "글로 생각을 표현하는 것이 더 편하다.",
      type: "I",
    },
  },

  // === S/N (감각/직관) - 정보 수집 방식 10문항 ===
  {
    id: 11,
    dimension: "SN",
    optionA: {
      text: "현재의 사실과 구체적인 정보에 집중한다.",
      type: "S",
    },
    optionB: {
      text: "미래의 가능성과 의미에 집중한다.",
      type: "N",
    },
  },
  {
    id: 12,
    dimension: "SN",
    optionA: {
      text: "직접 경험한 것을 신뢰하는 편이다.",
      type: "S",
    },
    optionB: {
      text: "직감이나 영감을 신뢰하는 편이다.",
      type: "N",
    },
  },
  {
    id: 13,
    dimension: "SN",
    optionA: {
      text: "세부 사항과 디테일을 잘 파악한다.",
      type: "S",
    },
    optionB: {
      text: "전체적인 그림과 패턴을 잘 파악한다.",
      type: "N",
    },
  },
  {
    id: 14,
    dimension: "SN",
    optionA: {
      text: "실용적이고 현실적인 접근을 선호한다.",
      type: "S",
    },
    optionB: {
      text: "창의적이고 혁신적인 접근을 선호한다.",
      type: "N",
    },
  },
  {
    id: 15,
    dimension: "SN",
    optionA: {
      text: "검증된 방법을 따르는 것이 안전하다고 생각한다.",
      type: "S",
    },
    optionB: {
      text: "새로운 방법을 시도하는 것이 재미있다고 생각한다.",
      type: "N",
    },
  },
  {
    id: 16,
    dimension: "SN",
    optionA: {
      text: "단계별로 순서대로 일을 처리하는 것을 선호한다.",
      type: "S",
    },
    optionB: {
      text: "직관에 따라 유연하게 일을 처리하는 것을 선호한다.",
      type: "N",
    },
  },
  {
    id: 17,
    dimension: "SN",
    optionA: {
      text: "사실적이고 명확한 정보를 선호한다.",
      type: "S",
    },
    optionB: {
      text: "은유적이고 추상적인 개념을 선호한다.",
      type: "N",
    },
  },
  {
    id: 18,
    dimension: "SN",
    optionA: {
      text: "지금 일어나고 있는 일에 주목한다.",
      type: "S",
    },
    optionB: {
      text: "앞으로 일어날 수 있는 일에 주목한다.",
      type: "N",
    },
  },
  {
    id: 19,
    dimension: "SN",
    optionA: {
      text: "구체적인 예시와 사례로 설명하는 것을 좋아한다.",
      type: "S",
    },
    optionB: {
      text: "개념과 이론으로 설명하는 것을 좋아한다.",
      type: "N",
    },
  },
  {
    id: 20,
    dimension: "SN",
    optionA: {
      text: "익숙하고 안정적인 환경이 편하다.",
      type: "S",
    },
    optionB: {
      text: "변화와 새로운 도전이 자극이 된다.",
      type: "N",
    },
  },

  // === T/F (사고/감정) - 의사결정 방식 10문항 ===
  {
    id: 21,
    dimension: "TF",
    optionA: {
      text: "논리와 분석을 바탕으로 결정한다.",
      type: "T",
    },
    optionB: {
      text: "가치와 감정을 바탕으로 결정한다.",
      type: "F",
    },
  },
  {
    id: 22,
    dimension: "TF",
    optionA: {
      text: "객관적인 사실이 중요하다고 생각한다.",
      type: "T",
    },
    optionB: {
      text: "사람들의 감정이 중요하다고 생각한다.",
      type: "F",
    },
  },
  {
    id: 23,
    dimension: "TF",
    optionA: {
      text: "공정함과 원칙을 중시한다.",
      type: "T",
    },
    optionB: {
      text: "조화와 배려를 중시한다.",
      type: "F",
    },
  },
  {
    id: 24,
    dimension: "TF",
    optionA: {
      text: "비판을 건설적인 피드백으로 받아들인다.",
      type: "T",
    },
    optionB: {
      text: "비판을 개인적으로 받아들이는 경향이 있다.",
      type: "F",
    },
  },
  {
    id: 25,
    dimension: "TF",
    optionA: {
      text: "머리로 이해하는 것이 더 중요하다.",
      type: "T",
    },
    optionB: {
      text: "마음으로 공감하는 것이 더 중요하다.",
      type: "F",
    },
  },
  {
    id: 26,
    dimension: "TF",
    optionA: {
      text: "솔직하고 직접적으로 의견을 말한다.",
      type: "T",
    },
    optionB: {
      text: "상대방의 기분을 고려해서 부드럽게 말한다.",
      type: "F",
    },
  },
  {
    id: 27,
    dimension: "TF",
    optionA: {
      text: "논쟁에서 이기는 것이 중요하다.",
      type: "T",
    },
    optionB: {
      text: "관계를 유지하는 것이 더 중요하다.",
      type: "F",
    },
  },
  {
    id: 28,
    dimension: "TF",
    optionA: {
      text: "문제 해결에 초점을 맞춘다.",
      type: "T",
    },
    optionB: {
      text: "감정적 지지에 초점을 맞춘다.",
      type: "F",
    },
  },
  {
    id: 29,
    dimension: "TF",
    optionA: {
      text: "일의 효율성을 우선시한다.",
      type: "T",
    },
    optionB: {
      text: "사람들의 만족을 우선시한다.",
      type: "F",
    },
  },
  {
    id: 30,
    dimension: "TF",
    optionA: {
      text: "냉정하고 객관적이라는 말을 듣는다.",
      type: "T",
    },
    optionB: {
      text: "따뜻하고 친절하다는 말을 듣는다.",
      type: "F",
    },
  },

  // === J/P (판단/인식) - 생활 양식 10문항 ===
  {
    id: 31,
    dimension: "JP",
    optionA: {
      text: "계획을 세우고 그대로 진행하는 것을 좋아한다.",
      type: "J",
    },
    optionB: {
      text: "상황에 따라 유연하게 대처하는 것을 좋아한다.",
      type: "P",
    },
  },
  {
    id: 32,
    dimension: "JP",
    optionA: {
      text: "마감 기한 전에 일을 끝내는 것이 편하다.",
      type: "J",
    },
    optionB: {
      text: "마감 직전에 집중력이 올라간다.",
      type: "P",
    },
  },
  {
    id: 33,
    dimension: "JP",
    optionA: {
      text: "정리정돈이 잘 되어 있어야 마음이 편하다.",
      type: "J",
    },
    optionB: {
      text: "어느 정도 어수선해도 괜찮다.",
      type: "P",
    },
  },
  {
    id: 34,
    dimension: "JP",
    optionA: {
      text: "결정을 빨리 내리고 진행하는 것을 선호한다.",
      type: "J",
    },
    optionB: {
      text: "다양한 가능성을 열어두고 결정을 미루는 편이다.",
      type: "P",
    },
  },
  {
    id: 35,
    dimension: "JP",
    optionA: {
      text: "일정과 규칙이 있으면 안정감을 느낀다.",
      type: "J",
    },
    optionB: {
      text: "일정과 규칙에 구속받는 느낌이 든다.",
      type: "P",
    },
  },
  {
    id: 36,
    dimension: "JP",
    optionA: {
      text: "목표를 세우고 체계적으로 달성해 나간다.",
      type: "J",
    },
    optionB: {
      text: "흥미가 이끄는 대로 자유롭게 탐색한다.",
      type: "P",
    },
  },
  {
    id: 37,
    dimension: "JP",
    optionA: {
      text: "한 번 시작한 일은 끝을 봐야 직성이 풀린다.",
      type: "J",
    },
    optionB: {
      text: "여러 가지 일을 동시에 진행하는 것이 재미있다.",
      type: "P",
    },
  },
  {
    id: 38,
    dimension: "JP",
    optionA: {
      text: "예측 가능하고 안정적인 생활을 선호한다.",
      type: "J",
    },
    optionB: {
      text: "즉흥적이고 변화가 많은 생활을 선호한다.",
      type: "P",
    },
  },
  {
    id: 39,
    dimension: "JP",
    optionA: {
      text: "약속 시간에 항상 정확하게 맞춰 간다.",
      type: "J",
    },
    optionB: {
      text: "약속 시간에 늦는 경우가 종종 있다.",
      type: "P",
    },
  },
  {
    id: 40,
    dimension: "JP",
    optionA: {
      text: "to-do 리스트를 작성하고 체크하는 것을 좋아한다.",
      type: "J",
    },
    optionB: {
      text: "to-do 리스트 없이도 자연스럽게 일을 처리한다.",
      type: "P",
    },
  },
];

// 16가지 유형 정보
export type PersonalityType =
  | "ISTJ" | "ISFJ" | "INFJ" | "INTJ"
  | "ISTP" | "ISFP" | "INFP" | "INTP"
  | "ESTP" | "ESFP" | "ENFP" | "ENTP"
  | "ESTJ" | "ESFJ" | "ENFJ" | "ENTJ";

export interface PersonalityTypeInfo {
  type: PersonalityType;
  name: string;
  nickname: string;
  emoji: string;
  description: string;
  characteristics: string[];
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  famousPeople: string[];
}

export const personalityTypeInfo: Record<PersonalityType, PersonalityTypeInfo> = {
  ISTJ: {
    type: "ISTJ",
    name: "청렴결백한 논리주의자",
    nickname: "소금형",
    emoji: "",
    description: "사실에 근거한 사고를 하며, 책임감이 강하고 신중합니다. 전통과 질서를 중시하고, 맡은 일을 묵묵히 수행하는 현실주의자입니다.",
    characteristics: [
      "신뢰할 수 있고 책임감이 강함",
      "체계적이고 조직적으로 일을 처리함",
      "규칙과 전통을 존중함",
      "사실과 현실에 기반한 판단을 함",
      "인내심이 강하고 꾸준함",
    ],
    strengths: [
      "뛰어난 집중력과 끈기",
      "정확하고 꼼꼼한 업무 처리",
      "약속을 철저히 지킴",
      "안정적이고 신뢰할 수 있음",
    ],
    weaknesses: [
      "변화에 적응하는 데 시간이 걸림",
      "감정 표현이 서툴 수 있음",
      "융통성이 부족할 수 있음",
      "타인의 감정을 간과할 수 있음",
    ],
    careers: ["회계사", "법률가", "공무원", "은행원", "군인", "엔지니어"],
    famousPeople: ["워렌 버핏", "안젤라 메르켈"],
  },
  ISFJ: {
    type: "ISFJ",
    name: "용감한 수호자",
    nickname: "임금 뒷편의 권력형",
    emoji: "",
    description: "따뜻하고 헌신적이며, 주변 사람들을 돌보는 것을 좋아합니다. 조용히 책임을 다하며 실질적인 도움을 주는 것에 기쁨을 느낍니다.",
    characteristics: [
      "타인을 배려하고 돌보는 것을 좋아함",
      "책임감이 강하고 성실함",
      "전통과 안정을 중시함",
      "세심하고 관찰력이 뛰어남",
      "겸손하고 조용함",
    ],
    strengths: [
      "뛰어난 기억력과 세심함",
      "타인에 대한 깊은 배려",
      "신뢰할 수 있고 헌신적임",
      "실용적인 문제 해결 능력",
    ],
    weaknesses: [
      "자신의 필요를 간과하는 경향",
      "변화를 받아들이기 어려움",
      "비판에 민감할 수 있음",
      "거절을 잘 못함",
    ],
    careers: ["간호사", "사회복지사", "교사", "행정직", "사서", "영양사"],
    famousPeople: ["마더 테레사", "케이트 미들턴"],
  },
  INFJ: {
    type: "INFJ",
    name: "선의의 옹호자",
    nickname: "예언자형",
    emoji: "",
    description: "깊은 통찰력을 가진 이상주의자로, 조용히 영향력을 행사합니다. 인류애적 가치를 중시하며 의미 있는 삶을 추구합니다.",
    characteristics: [
      "깊은 통찰력과 직관력",
      "이상주의적이고 원칙적",
      "타인을 돕고자 하는 열망",
      "창의적이고 영감을 주는 비전",
      "조용하지만 확고한 의지",
    ],
    strengths: [
      "뛰어난 공감 능력",
      "깊은 통찰력과 직관",
      "강한 원칙과 가치관",
      "창의적인 문제 해결",
    ],
    weaknesses: [
      "비현실적인 기대를 가질 수 있음",
      "비판에 민감함",
      "완벽주의적 성향",
      "번아웃에 취약할 수 있음",
    ],
    careers: ["상담사", "심리학자", "작가", "예술가", "교수", "종교인"],
    famousPeople: ["넬슨 만델라", "마틴 루터 킹"],
  },
  INTJ: {
    type: "INTJ",
    name: "용의주도한 전략가",
    nickname: "과학자형",
    emoji: "",
    description: "독립적이고 분석적인 전략가로, 높은 기준과 명확한 비전을 가지고 있습니다. 지식과 역량을 중시하며 효율성을 추구합니다.",
    characteristics: [
      "전략적 사고와 장기적 비전",
      "독립적이고 자기 확신이 강함",
      "지적 호기심이 풍부함",
      "높은 기준과 기대치",
      "효율성과 개선을 추구함",
    ],
    strengths: [
      "뛰어난 분석력과 전략적 사고",
      "독립적인 문제 해결 능력",
      "높은 자기 기준과 목표",
      "지속적인 자기 발전",
    ],
    weaknesses: [
      "지나친 완벽주의",
      "감정 표현이 서툴 수 있음",
      "타인에게 비판적일 수 있음",
      "사회적 규범을 무시할 수 있음",
    ],
    careers: ["과학자", "전략 컨설턴트", "프로그래머", "투자 분석가", "의사", "건축가"],
    famousPeople: ["일론 머스크", "마크 저커버그"],
  },
  ISTP: {
    type: "ISTP",
    name: "만능 재주꾼",
    nickname: "백과사전형",
    emoji: "",
    description: "논리적이고 실용적인 문제 해결사입니다. 호기심이 많고 손으로 직접 해보는 것을 좋아하며, 위기 상황에서 침착하게 대처합니다.",
    characteristics: [
      "논리적이고 분석적인 사고",
      "실용적인 문제 해결 능력",
      "적응력이 뛰어남",
      "위기 상황에서 침착함",
      "독립적이고 자유로운 영혼",
    ],
    strengths: [
      "뛰어난 기술적 능력",
      "위기 대처 능력",
      "유연하고 적응력이 높음",
      "관찰력이 뛰어남",
    ],
    weaknesses: [
      "감정 표현이 어려움",
      "장기적인 약속을 꺼림",
      "무뚝뚝하게 보일 수 있음",
      "규칙에 반항적일 수 있음",
    ],
    careers: ["엔지니어", "정비사", "파일럿", "요리사", "운동선수", "경찰관"],
    famousPeople: ["마이클 조던", "톰 크루즈"],
  },
  ISFP: {
    type: "ISFP",
    name: "호기심 많은 예술가",
    nickname: "성인군자형",
    emoji: "",
    description: "온화하고 감성적인 예술가 유형입니다. 현재 순간을 즐기며, 자신만의 가치관에 따라 조용히 자신을 표현합니다.",
    characteristics: [
      "감성적이고 예술적 감각",
      "유연하고 개방적",
      "현재 순간을 즐김",
      "개인적 가치관을 중시",
      "조용하고 친절함",
    ],
    strengths: [
      "뛰어난 미적 감각",
      "유연하고 적응력이 높음",
      "타인에 대한 배려심",
      "실용적인 창의성",
    ],
    weaknesses: [
      "계획을 세우는 것이 어려움",
      "비판에 민감함",
      "갈등을 피하려는 경향",
      "자기 주장이 약할 수 있음",
    ],
    careers: ["예술가", "디자이너", "뮤지션", "패션 디자이너", "간호사", "수의사"],
    famousPeople: ["마이클 잭슨", "오드리 햅번"],
  },
  INFP: {
    type: "INFP",
    name: "열정적인 중재자",
    nickname: "잔다르크형",
    emoji: "",
    description: "이상주의적이고 공감 능력이 뛰어난 명상가입니다. 진정한 자아를 찾고, 타인을 돕고 세상을 더 나은 곳으로 만들고자 합니다.",
    characteristics: [
      "깊은 공감 능력과 이상주의",
      "창의적이고 상상력이 풍부함",
      "강한 내적 가치관",
      "자기 표현에 대한 열망",
      "조화와 평화를 추구함",
    ],
    strengths: [
      "뛰어난 공감 능력",
      "창의적이고 독창적",
      "강한 원칙과 진정성",
      "깊은 헌신과 열정",
    ],
    weaknesses: [
      "비현실적인 기대",
      "자기 비판적인 경향",
      "일상적인 업무에 지루함",
      "갈등 상황에서 어려움",
    ],
    careers: ["작가", "심리상담사", "사회운동가", "예술가", "음악가", "교사"],
    famousPeople: ["셰익스피어", "윌리엄 셰익스피어"],
  },
  INTP: {
    type: "INTP",
    name: "논리적인 사색가",
    nickname: "아이디어 뱅크형",
    emoji: "",
    description: "분석적이고 객관적인 사색가입니다. 복잡한 문제를 논리적으로 해결하는 것을 즐기며, 지식과 이해에 대한 갈증이 있습니다.",
    characteristics: [
      "논리적이고 분석적인 사고",
      "지적 호기심이 강함",
      "독창적인 아이디어",
      "독립적이고 자율적",
      "이론과 시스템에 관심",
    ],
    strengths: [
      "뛰어난 분석력",
      "창의적인 문제 해결",
      "객관적이고 논리적",
      "지속적인 학습 의지",
    ],
    weaknesses: [
      "사회적 상황에서 어색함",
      "감정 표현이 어려움",
      "실행력이 부족할 수 있음",
      "세부 사항을 놓칠 수 있음",
    ],
    careers: ["과학자", "철학자", "프로그래머", "수학자", "교수", "시스템 분석가"],
    famousPeople: ["아인슈타인", "빌 게이츠"],
  },
  ESTP: {
    type: "ESTP",
    name: "모험을 즐기는 사업가",
    nickname: "수완좋은 활동가형",
    emoji: "",
    description: "활동적이고 현실적인 문제 해결사입니다. 현재 순간에 집중하며, 위험을 감수하고 새로운 경험을 추구합니다.",
    characteristics: [
      "활동적이고 에너지가 넘침",
      "현실적이고 실용적",
      "위험을 감수하는 모험가",
      "사교적이고 매력적",
      "빠른 상황 판단력",
    ],
    strengths: [
      "뛰어난 협상 능력",
      "위기 대처 능력",
      "현실적인 문제 해결",
      "사교적이고 설득력 있음",
    ],
    weaknesses: [
      "충동적인 결정",
      "규칙을 무시하는 경향",
      "장기적인 계획이 어려움",
      "감정적 문제에 둔감할 수 있음",
    ],
    careers: ["사업가", "영업직", "응급구조사", "운동선수", "배우", "경찰관"],
    famousPeople: ["도널드 트럼프", "마돈나"],
  },
  ESFP: {
    type: "ESFP",
    name: "자유로운 영혼의 연예인",
    nickname: "사교적인 유형",
    emoji: "",
    description: "밝고 사교적인 연예인 유형입니다. 현재 순간을 즐기며, 주변 사람들에게 즐거움을 선사하는 것을 좋아합니다.",
    characteristics: [
      "밝고 긍정적인 에너지",
      "사교적이고 친근함",
      "현재 순간을 즐김",
      "유연하고 적응력이 높음",
      "실용적이고 현실적",
    ],
    strengths: [
      "뛰어난 사교성",
      "긍정적인 에너지",
      "실용적인 문제 해결",
      "유연한 대처 능력",
    ],
    weaknesses: [
      "장기적인 계획이 어려움",
      "비판에 민감함",
      "충동적인 결정",
      "지루함을 잘 참지 못함",
    ],
    careers: ["연예인", "이벤트 플래너", "판매직", "관광가이드", "홍보 전문가", "요리사"],
    famousPeople: ["마릴린 먼로", "저스틴 비버"],
  },
  ENFP: {
    type: "ENFP",
    name: "재기발랄한 활동가",
    nickname: "스파크형",
    emoji: "",
    description: "열정적이고 창의적인 자유로운 영혼입니다. 가능성에 대한 탐험을 즐기며, 타인에게 영감을 주는 것을 좋아합니다.",
    characteristics: [
      "열정적이고 창의적",
      "호기심이 많고 탐험적",
      "사람들과의 연결을 중시",
      "자유롭고 유연함",
      "이상주의적이고 낙관적",
    ],
    strengths: [
      "뛰어난 창의성",
      "열정적인 소통 능력",
      "적응력과 유연성",
      "타인에게 영감을 줌",
    ],
    weaknesses: [
      "집중력 유지가 어려움",
      "지나치게 이상주의적",
      "세부 사항을 놓칠 수 있음",
      "결정을 미루는 경향",
    ],
    careers: ["컨설턴트", "기자", "마케터", "배우", "상담사", "작가"],
    famousPeople: ["로빈 윌리엄스", "윌 스미스"],
  },
  ENTP: {
    type: "ENTP",
    name: "논쟁을 즐기는 변론가",
    nickname: "발명가형",
    emoji: "",
    description: "창의적이고 전략적인 사고를 하는 논쟁가입니다. 새로운 아이디어와 가능성을 탐구하며, 지적인 토론을 즐깁니다.",
    characteristics: [
      "창의적이고 독창적인 사고",
      "지적 호기심이 강함",
      "논쟁과 토론을 즐김",
      "빠른 상황 파악 능력",
      "유연하고 적응력이 높음",
    ],
    strengths: [
      "뛰어난 아이디어 생성",
      "빠른 분석력과 문제 해결",
      "설득력 있는 커뮤니케이션",
      "새로운 도전에 적극적",
    ],
    weaknesses: [
      "프로젝트 완료가 어려움",
      "규칙과 권위에 반항적",
      "감정적 문제에 둔감할 수 있음",
      "논쟁적으로 보일 수 있음",
    ],
    careers: ["변호사", "기업가", "컨설턴트", "발명가", "감독", "마케터"],
    famousPeople: ["토마스 에디슨", "마크 트웨인"],
  },
  ESTJ: {
    type: "ESTJ",
    name: "엄격한 관리자",
    nickname: "사업가형",
    emoji: "",
    description: "조직적이고 책임감 있는 관리자 유형입니다. 전통과 질서를 중시하며, 목표 달성을 위해 체계적으로 일을 추진합니다.",
    characteristics: [
      "조직적이고 체계적",
      "책임감이 강하고 신뢰할 수 있음",
      "전통과 규칙을 중시",
      "직접적이고 솔직함",
      "목표 지향적이고 실용적",
    ],
    strengths: [
      "뛰어난 조직력과 관리 능력",
      "신뢰할 수 있고 책임감 있음",
      "결단력 있는 리더십",
      "효율적인 업무 처리",
    ],
    weaknesses: [
      "융통성이 부족할 수 있음",
      "지나치게 권위적일 수 있음",
      "감정적 표현이 어려움",
      "변화를 받아들이기 어려움",
    ],
    careers: ["경영자", "군장교", "판사", "은행장", "회계사", "프로젝트 매니저"],
    famousPeople: ["힐러리 클린턴", "헨리 포드"],
  },
  ESFJ: {
    type: "ESFJ",
    name: "사교적인 외교관",
    nickname: "친선도모형",
    emoji: "",
    description: "따뜻하고 사교적인 돌봄의 유형입니다. 조화로운 관계를 중시하며, 타인을 돕고 지지하는 것에서 기쁨을 찾습니다.",
    characteristics: [
      "따뜻하고 친절함",
      "사교적이고 협조적",
      "책임감이 강함",
      "타인의 필요에 민감함",
      "전통과 조화를 중시",
    ],
    strengths: [
      "뛰어난 대인 관계 능력",
      "조직력과 책임감",
      "타인을 돌보는 능력",
      "긍정적인 분위기 조성",
    ],
    weaknesses: [
      "비판에 민감함",
      "타인의 인정에 의존적",
      "변화를 받아들이기 어려움",
      "자신의 필요를 간과함",
    ],
    careers: ["교사", "간호사", "인사담당자", "이벤트 플래너", "사회복지사", "판매직"],
    famousPeople: ["테일러 스위프트", "제니퍼 가너"],
  },
  ENFJ: {
    type: "ENFJ",
    name: "정의로운 사회운동가",
    nickname: "언변능숙형",
    emoji: "",
    description: "카리스마 있고 영감을 주는 지도자 유형입니다. 타인의 성장과 발전에 관심이 많으며, 이상적인 세상을 위해 노력합니다.",
    characteristics: [
      "카리스마 있고 영향력 있음",
      "타인의 성장에 관심",
      "공감 능력이 뛰어남",
      "이상주의적이고 열정적",
      "뛰어난 의사소통 능력",
    ],
    strengths: [
      "뛰어난 리더십",
      "깊은 공감 능력",
      "영감을 주는 소통 능력",
      "타인을 동기부여하는 능력",
    ],
    weaknesses: [
      "타인의 문제를 너무 떠안음",
      "비판에 민감함",
      "자신의 필요를 간과함",
      "지나치게 이상주의적",
    ],
    careers: ["교사", "상담사", "정치인", "마케팅 매니저", "HR 전문가", "작가"],
    famousPeople: ["버락 오바마", "오프라 윈프리"],
  },
  ENTJ: {
    type: "ENTJ",
    name: "대담한 통솔자",
    nickname: "지도자형",
    emoji: "",
    description: "자신감 있고 전략적인 리더 유형입니다. 높은 목표를 세우고 이를 달성하기 위해 사람들을 이끄는 능력이 탁월합니다.",
    characteristics: [
      "자신감 있고 결단력 있음",
      "전략적이고 비전 지향적",
      "효율성과 성과를 중시",
      "직접적이고 솔직함",
      "리더십이 뛰어남",
    ],
    strengths: [
      "뛰어난 전략적 사고",
      "강력한 리더십",
      "결단력 있는 의사결정",
      "목표 달성에 대한 집중력",
    ],
    weaknesses: [
      "지나치게 비판적일 수 있음",
      "감정을 무시하는 경향",
      "인내심이 부족할 수 있음",
      "권위적으로 보일 수 있음",
    ],
    careers: ["CEO", "변호사", "경영 컨설턴트", "투자은행가", "정치인", "사업가"],
    famousPeople: ["스티브 잡스", "마거릿 대처"],
  },
};

// 차원 정보
export interface DimensionInfo {
  code: Dimension;
  name: string;
  poleA: { code: string; name: string; description: string };
  poleB: { code: string; name: string; description: string };
}

export const dimensionInfo: Record<Dimension, DimensionInfo> = {
  EI: {
    code: "EI",
    name: "에너지 방향",
    poleA: {
      code: "E",
      name: "외향성 (Extraversion)",
      description: "외부 세계로부터 에너지를 얻으며, 사람들과 교류하는 것을 즐깁니다.",
    },
    poleB: {
      code: "I",
      name: "내향성 (Introversion)",
      description: "내면 세계에서 에너지를 얻으며, 혼자만의 시간과 깊은 사고를 즐깁니다.",
    },
  },
  SN: {
    code: "SN",
    name: "정보 수집",
    poleA: {
      code: "S",
      name: "감각형 (Sensing)",
      description: "오감을 통해 현재의 구체적인 사실과 세부 사항에 집중합니다.",
    },
    poleB: {
      code: "N",
      name: "직관형 (iNtuition)",
      description: "육감과 직관을 통해 미래의 가능성과 패턴을 포착합니다.",
    },
  },
  TF: {
    code: "TF",
    name: "의사결정",
    poleA: {
      code: "T",
      name: "사고형 (Thinking)",
      description: "논리와 객관적 분석을 바탕으로 합리적인 결정을 내립니다.",
    },
    poleB: {
      code: "F",
      name: "감정형 (Feeling)",
      description: "가치와 감정, 타인에 대한 영향을 고려하여 결정을 내립니다.",
    },
  },
  JP: {
    code: "JP",
    name: "생활 양식",
    poleA: {
      code: "J",
      name: "판단형 (Judging)",
      description: "계획적이고 체계적으로 생활하며, 결정을 빨리 내리는 것을 선호합니다.",
    },
    poleB: {
      code: "P",
      name: "인식형 (Perceiving)",
      description: "유연하고 개방적으로 생활하며, 가능성을 열어두는 것을 선호합니다.",
    },
  },
};

// 결과 계산을 위한 타입
export interface DimensionScore {
  dimension: Dimension;
  poleA: number; // E, S, T, J 점수
  poleB: number; // I, N, F, P 점수
  percentageA: number;
  percentageB: number;
  dominant: "A" | "B";
}

export interface PersonalityResult {
  typeCode: PersonalityType;
  dimensionScores: {
    EI: DimensionScore;
    SN: DimensionScore;
    TF: DimensionScore;
    JP: DimensionScore;
  };
}

// 색상 정의
export const typeColors: Record<string, string> = {
  // Analysts (NT)
  INTJ: "bg-purple-500",
  INTP: "bg-purple-500",
  ENTJ: "bg-purple-500",
  ENTP: "bg-purple-500",
  // Diplomats (NF)
  INFJ: "bg-green-500",
  INFP: "bg-green-500",
  ENFJ: "bg-green-500",
  ENFP: "bg-green-500",
  // Sentinels (SJ)
  ISTJ: "bg-blue-500",
  ISFJ: "bg-blue-500",
  ESTJ: "bg-blue-500",
  ESFJ: "bg-blue-500",
  // Explorers (SP)
  ISTP: "bg-amber-500",
  ISFP: "bg-amber-500",
  ESTP: "bg-amber-500",
  ESFP: "bg-amber-500",
};

export const typeTextColors: Record<string, string> = {
  INTJ: "text-purple-500",
  INTP: "text-purple-500",
  ENTJ: "text-purple-500",
  ENTP: "text-purple-500",
  INFJ: "text-green-500",
  INFP: "text-green-500",
  ENFJ: "text-green-500",
  ENFP: "text-green-500",
  ISTJ: "text-blue-500",
  ISFJ: "text-blue-500",
  ESTJ: "text-blue-500",
  ESFJ: "text-blue-500",
  ISTP: "text-amber-500",
  ISFP: "text-amber-500",
  ESTP: "text-amber-500",
  ESFP: "text-amber-500",
};

export const typeBgColors: Record<string, string> = {
  INTJ: "from-purple-500/10 to-violet-500/10",
  INTP: "from-purple-500/10 to-violet-500/10",
  ENTJ: "from-purple-500/10 to-violet-500/10",
  ENTP: "from-purple-500/10 to-violet-500/10",
  INFJ: "from-green-500/10 to-emerald-500/10",
  INFP: "from-green-500/10 to-emerald-500/10",
  ENFJ: "from-green-500/10 to-emerald-500/10",
  ENFP: "from-green-500/10 to-emerald-500/10",
  ISTJ: "from-blue-500/10 to-cyan-500/10",
  ISFJ: "from-blue-500/10 to-cyan-500/10",
  ESTJ: "from-blue-500/10 to-cyan-500/10",
  ESFJ: "from-blue-500/10 to-cyan-500/10",
  ISTP: "from-amber-500/10 to-orange-500/10",
  ISFP: "from-amber-500/10 to-orange-500/10",
  ESTP: "from-amber-500/10 to-orange-500/10",
  ESFP: "from-amber-500/10 to-orange-500/10",
};

// 유형 그룹
export const typeGroups = {
  analysts: {
    name: "분석가형",
    description: "직관적이고 사고 지향적",
    types: ["INTJ", "INTP", "ENTJ", "ENTP"] as PersonalityType[],
    color: "purple",
  },
  diplomats: {
    name: "외교관형",
    description: "직관적이고 감정 지향적",
    types: ["INFJ", "INFP", "ENFJ", "ENFP"] as PersonalityType[],
    color: "green",
  },
  sentinels: {
    name: "관리자형",
    description: "감각적이고 판단 지향적",
    types: ["ISTJ", "ISFJ", "ESTJ", "ESFJ"] as PersonalityType[],
    color: "blue",
  },
  explorers: {
    name: "탐험가형",
    description: "감각적이고 인식 지향적",
    types: ["ISTP", "ISFP", "ESTP", "ESFP"] as PersonalityType[],
    color: "amber",
  },
};

export const getTypeGroup = (type: PersonalityType): keyof typeof typeGroups => {
  if (typeGroups.analysts.types.includes(type)) return "analysts";
  if (typeGroups.diplomats.types.includes(type)) return "diplomats";
  if (typeGroups.sentinels.types.includes(type)) return "sentinels";
  return "explorers";
};
