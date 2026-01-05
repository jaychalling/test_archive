export interface PoliticalCompassQuestion {
  id: number;
  text: string;
  category: "economic" | "social";
}

export type QuadrantType = "leftAuthoritarian" | "rightAuthoritarian" | "leftLibertarian" | "rightLibertarian";

export interface QuadrantInfo {
  name: string;
  nameEn: string;
  description: string;
  detailedDescription: string;
  historicalBackground: string;
  keyPolicies: string[];
  famousExamples: string[];
  strengthsAndWeaknesses: {
    strengths: string[];
    weaknesses: string[];
  };
  color: string;
}

export const quadrantDescriptions: Record<QuadrantType, QuadrantInfo> = {
  leftAuthoritarian: {
    name: "좌파 권위주의",
    nameEn: "Left Authoritarian",
    description: "국가 주도의 경제 개입과 강력한 중앙 권력을 선호합니다. 평등을 위한 정부의 적극적인 역할을 지지합니다.",
    detailedDescription: "좌파 권위주의는 경제적으로는 국가 통제와 재분배를 선호하면서, 사회적으로는 강력한 중앙 권력과 집단주의적 가치를 강조하는 정치 성향입니다. 이 사분면에 속하는 사람들은 경제적 불평등을 해소하기 위해 정부가 적극적으로 개입해야 한다고 믿지만, 동시에 사회 질서와 집단적 목표를 위해 개인의 자유가 일정 부분 제한될 수 있다고 생각합니다. 역사적으로 이 정치 성향은 사회주의 국가들이나 공산주의 체제에서 나타났으며, 현대에는 일부 사회민주주의 정당에서도 권위주의적 요소가 나타날 수 있습니다.",
    historicalBackground: "좌파 권위주의의 역사적 기원은 19세기 마르크스-레닌주의에서 찾을 수 있습니다. 소련, 중국, 쿠바 등의 공산주의 국가들이 이 사분면의 대표적인 역사적 사례입니다. 이들 국가는 생산 수단의 국유화, 중앙 계획 경제, 일당 독재 체제를 특징으로 했습니다. 20세기 중반에는 전 세계 인구의 상당 부분이 이러한 체제 하에서 살았습니다. 현대에는 순수한 좌파 권위주의 국가는 드물지만, 일부 국가에서는 권위주의적 통치와 사회주의적 경제 정책이 혼합되어 나타납니다.",
    keyPolicies: [
      "주요 산업의 국유화 및 국가 통제",
      "중앙 계획 경제 또는 강력한 정부 규제",
      "부의 재분배를 위한 누진세 정책",
      "보편적 복지 및 공공서비스 확대",
      "언론 및 정보에 대한 국가 통제",
      "집단적 목표를 위한 개인 자유 제한"
    ],
    famousExamples: [
      "블라디미르 레닌 (소련)",
      "마오쩌둥 (중국)",
      "피델 카스트로 (쿠바)",
      "요시프 스탈린 (소련)",
      "클레멘트 애틀리 (영국 - 온건한 좌파권위주의)"
    ],
    strengthsAndWeaknesses: {
      strengths: [
        "경제적 불평등 해소에 집중할 수 있음",
        "신속한 산업화와 발전 가능",
        "보편적 교육, 의료 제공 가능",
        "통일된 국가 비전 추진 가능",
        "위기 상황에서의 빠른 대응"
      ],
      weaknesses: [
        "개인의 자유와 권리 침해 가능성",
        "경제적 비효율성 발생 가능",
        "권력 남용 및 부패 위험",
        "혁신과 창의성 저해 가능",
        "반대 의견 억압 경향"
      ]
    },
    color: "red"
  },
  rightAuthoritarian: {
    name: "우파 권위주의",
    nameEn: "Right Authoritarian",
    description: "자유 시장 경제와 전통적 가치, 강력한 국가 권위를 지지합니다. 질서와 안정을 중시합니다.",
    detailedDescription: "우파 권위주의는 경제적으로는 자유 시장과 사유재산권을 지지하면서, 사회적으로는 전통적 가치, 강력한 국가 권력, 사회 질서를 강조하는 정치 성향입니다. 이 사분면에 속하는 사람들은 시장 경제의 효율성을 믿지만, 사회적 안정과 전통적 가치를 유지하기 위해 강력한 정부가 필요하다고 생각합니다. 역사적으로 파시즘, 군사 독재, 일부 보수적 군주제 등이 이 사분면에 해당합니다. 현대에는 일부 우파 포퓰리즘 정당이나 권위주의적 자본주의 체제가 이 성향을 보일 수 있습니다.",
    historicalBackground: "우파 권위주의의 역사적 예로는 20세기 파시즘(이탈리아의 무솔리니, 스페인의 프랑코), 군사 독재 정권(칠레의 피노체트, 한국의 박정희), 그리고 현대 권위주의적 자본주의 국가들이 있습니다. 이들은 자본주의적 경제 체제를 유지하면서 정치적 자유를 제한하고, 전통적 가치와 민족주의를 강조했습니다. 냉전 시대에는 많은 우파 권위주의 정권이 반공주의의 이름으로 지지를 받았습니다.",
    keyPolicies: [
      "자유 시장 경제와 기업 친화적 정책",
      "전통적 가족 가치 및 종교적 가치 보호",
      "강력한 국방 및 법질서",
      "엄격한 이민 정책",
      "민족주의 및 애국심 강조",
      "범죄에 대한 강력한 처벌"
    ],
    famousExamples: [
      "아우구스토 피노체트 (칠레)",
      "프란시스코 프랑코 (스페인)",
      "박정희 (대한민국)",
      "리콴유 (싱가포르)",
      "빅토르 오르반 (헝가리)"
    ],
    strengthsAndWeaknesses: {
      strengths: [
        "경제 성장과 발전에 집중 가능",
        "사회 안정과 질서 유지",
        "신속한 정책 결정 및 실행",
        "전통적 가치와 문화 보존",
        "국가 정체성 강화"
      ],
      weaknesses: [
        "인권 침해 및 정치적 억압",
        "경제적 불평등 심화 가능",
        "권력 집중으로 인한 부패",
        "소수자 권리 무시",
        "민주적 제도 약화"
      ]
    },
    color: "blue"
  },
  leftLibertarian: {
    name: "좌파 자유주의",
    nameEn: "Left Libertarian",
    description: "경제적 평등과 개인의 자유를 모두 중시합니다. 진보적 가치와 사회적 자유를 지지합니다.",
    detailedDescription: "좌파 자유주의는 경제적으로는 평등과 재분배를 추구하면서, 사회적으로는 개인의 자유와 권리를 최대한 보장해야 한다고 믿는 정치 성향입니다. 이 사분면에 속하는 사람들은 자본주의가 불평등을 야기한다고 보지만, 동시에 권위주의적인 해결책도 거부합니다. 협동조합, 참여 민주주의, 환경주의, 사회 정의 운동 등이 이 성향과 관련됩니다. 역사적으로 아나키즘, 자유사회주의, 녹색 정치 등이 이 사분면에 해당하며, 현대에는 진보적 사회민주주의나 녹색당이 이 성향을 보입니다.",
    historicalBackground: "좌파 자유주의의 사상적 기원은 무정부주의, 자유사회주의, 코뮌주의 등에서 찾을 수 있습니다. 피에르 조제프 프루동, 미하일 바쿠닌, 표트르 크로포트킨 등이 이 사상의 초기 이론가들입니다. 20세기에는 스페인 내전 당시 카탈루냐의 아나르코-생디칼리즘 실험이 주목받았습니다. 1960년대 신좌파 운동, 1970-80년대 녹색 정치의 부상, 최근의 점령 운동(Occupy Movement)과 기후 정의 운동이 이 전통을 이어가고 있습니다.",
    keyPolicies: [
      "부의 재분배와 경제적 평등 추구",
      "개인의 사회적 자유 극대화",
      "환경 보호 및 지속 가능한 발전",
      "소수자 권리와 다양성 존중",
      "참여 민주주의와 분권화",
      "협동조합 및 노동자 소유 기업 지지"
    ],
    famousExamples: [
      "놈 촘스키 (미국)",
      "버니 샌더스 (미국)",
      "제레미 코빈 (영국)",
      "조지 오웰 (영국)",
      "그레타 툰베리 (스웨덴 - 환경 운동)"
    ],
    strengthsAndWeaknesses: {
      strengths: [
        "경제적 평등과 개인 자유 동시 추구",
        "환경 및 사회 정의에 대한 관심",
        "참여적이고 포용적인 정치 문화",
        "다양성과 소수자 권리 보호",
        "기업 권력에 대한 견제"
      ],
      weaknesses: [
        "실현 가능성에 대한 의문",
        "대규모 조직 및 실행의 어려움",
        "경제적 효율성 저하 가능",
        "정책 우선순위 갈등",
        "급진적 변화에 대한 저항"
      ]
    },
    color: "green"
  },
  rightLibertarian: {
    name: "우파 자유주의",
    nameEn: "Right Libertarian",
    description: "자유 시장 경제와 개인의 자유를 모두 중시합니다. 정부의 개입을 최소화하고 개인의 권리를 존중합니다.",
    detailedDescription: "우파 자유주의(리버테리어니즘)는 경제적으로는 완전한 자유 시장과 사유재산권을 지지하면서, 사회적으로도 개인의 자유를 최대한 보장해야 한다고 믿는 정치 성향입니다. 이 사분면에 속하는 사람들은 정부의 역할을 최소화하고, 개인과 시장이 스스로 문제를 해결할 수 있다고 믿습니다. 자유지상주의, 고전적 자유주의, 아나르코-자본주의 등이 이 성향에 해당합니다. 현대에는 리버테리언 정당이나 일부 보수적 자유주의 정당에서 이 성향이 나타납니다.",
    historicalBackground: "우파 자유주의의 사상적 기원은 존 로크, 애덤 스미스, 프레데릭 바스티아 등의 고전적 자유주의에서 찾을 수 있습니다. 20세기에는 프리드리히 하이에크, 밀턴 프리드먼, 아인 랜드 등이 이 사상을 발전시켰습니다. 1970년대 미국에서 리버테리언 당이 창당되었고, 론 폴과 같은 정치인들이 이 사상을 대중화했습니다. 실리콘밸리의 기술 기업가들 사이에서도 이 사상이 인기를 얻고 있습니다.",
    keyPolicies: [
      "최소 정부와 낮은 세금",
      "완전한 자유 시장 경제",
      "개인의 자유와 사생활 보호",
      "마약, 총기 등에 대한 자유로운 접근",
      "규제 철폐 및 민영화",
      "자발적 계약과 사유재산권 강화"
    ],
    famousExamples: [
      "프리드리히 하이에크 (오스트리아)",
      "밀턴 프리드먼 (미국)",
      "론 폴 (미국)",
      "아인 랜드 (미국)",
      "일론 머스크 (미국/남아프리카)"
    ],
    strengthsAndWeaknesses: {
      strengths: [
        "개인의 자유와 책임 강조",
        "시장 효율성 극대화",
        "혁신과 기업가 정신 촉진",
        "정부 권력 남용 방지",
        "개인 선택의 자유 보장"
      ],
      weaknesses: [
        "경제적 불평등 심화 가능",
        "사회 안전망 부재",
        "시장 실패에 대한 대응 어려움",
        "환경 문제 해결 어려움",
        "공공재 공급 문제"
      ]
    },
    color: "purple"
  }
};

export const getQuadrant = (economic: number, social: number): QuadrantType => {
  const isLeft = economic < 0;
  const isAuthoritarian = social > 0;

  if (isLeft && isAuthoritarian) return "leftAuthoritarian";
  if (!isLeft && isAuthoritarian) return "rightAuthoritarian";
  if (isLeft && !isAuthoritarian) return "leftLibertarian";
  return "rightLibertarian";
};

// Political Compass 테스트 배경
export const testBackground = {
  history: "Political Compass 테스트는 2001년 영국의 정치 저널리스트들에 의해 만들어졌습니다. 기존의 단순한 좌-우 스펙트럼의 한계를 극복하고, 경제적 차원과 사회적/권위적 차원을 분리하여 정치 성향을 더 정확하게 측정하고자 했습니다. 이 2차원 모델은 Hans Eysenck의 1950년대 연구에서 영향을 받았으며, 현재 전 세계적으로 가장 널리 사용되는 정치 성향 측정 도구 중 하나입니다.",
  disclaimer: "이 테스트는 교육 및 자기 이해 목적으로 제작되었으며, 공식적인 정치적 분류가 아닙니다. 정치적 견해는 복잡하고 다양한 요소에 영향을 받으며, 단순한 2차원 모델로 완전히 설명될 수 없습니다. 테스트 결과를 절대적인 것으로 받아들이지 마시고, 자신의 정치적 견해를 탐구하는 출발점으로 활용하시기 바랍니다."
};

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
