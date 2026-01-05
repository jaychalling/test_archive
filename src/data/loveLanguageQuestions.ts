export type LoveLanguage =
  | "wordsOfAffirmation"
  | "actsOfService"
  | "receivingGifts"
  | "qualityTime"
  | "physicalTouch";

export interface LoveLanguageQuestion {
  id: number;
  optionA: {
    text: string;
    language: LoveLanguage;
  };
  optionB: {
    text: string;
    language: LoveLanguage;
  };
}

// 5개 언어의 모든 조합: C(5,2) = 10개 조합
// 각 조합당 3개 질문 = 총 30개 질문
export const loveLanguageQuestions: LoveLanguageQuestion[] = [
  // 인정의 말 vs 봉사 (3개)
  {
    id: 1,
    optionA: {
      text: "칭찬과 격려의 말을 듣는 것",
      language: "wordsOfAffirmation",
    },
    optionB: {
      text: "내가 해야 할 일을 대신 해주는 것",
      language: "actsOfService",
    },
  },
  {
    id: 2,
    optionA: {
      text: "\"사랑해\", \"고마워\"라는 말을 자주 듣는 것",
      language: "wordsOfAffirmation",
    },
    optionB: {
      text: "내가 피곤할 때 집안일을 도와주는 것",
      language: "actsOfService",
    },
  },
  {
    id: 3,
    optionA: {
      text: "내 노력을 인정하고 칭찬해주는 것",
      language: "wordsOfAffirmation",
    },
    optionB: {
      text: "바쁜 나를 위해 음식을 준비해주는 것",
      language: "actsOfService",
    },
  },

  // 인정의 말 vs 선물 (3개)
  {
    id: 4,
    optionA: {
      text: "내가 특별하다고 말해주는 것",
      language: "wordsOfAffirmation",
    },
    optionB: {
      text: "의미 있는 선물을 받는 것",
      language: "receivingGifts",
    },
  },
  {
    id: 5,
    optionA: {
      text: "응원과 지지의 말을 해주는 것",
      language: "wordsOfAffirmation",
    },
    optionB: {
      text: "기념일에 깜짝 선물을 받는 것",
      language: "receivingGifts",
    },
  },
  {
    id: 6,
    optionA: {
      text: "진심 어린 감사 편지를 받는 것",
      language: "wordsOfAffirmation",
    },
    optionB: {
      text: "나를 위해 고른 작은 선물을 받는 것",
      language: "receivingGifts",
    },
  },

  // 인정의 말 vs 함께하는 시간 (3개)
  {
    id: 7,
    optionA: {
      text: "나에 대해 좋은 점을 말해주는 것",
      language: "wordsOfAffirmation",
    },
    optionB: {
      text: "둘만의 시간을 보내는 것",
      language: "qualityTime",
    },
  },
  {
    id: 8,
    optionA: {
      text: "나를 자랑스럽게 여긴다고 말해주는 것",
      language: "wordsOfAffirmation",
    },
    optionB: {
      text: "함께 산책하며 대화하는 것",
      language: "qualityTime",
    },
  },
  {
    id: 9,
    optionA: {
      text: "격려의 문자 메시지를 받는 것",
      language: "wordsOfAffirmation",
    },
    optionB: {
      text: "함께 영화를 보며 시간을 보내는 것",
      language: "qualityTime",
    },
  },

  // 인정의 말 vs 스킨십 (3개)
  {
    id: 10,
    optionA: {
      text: "\"넌 정말 대단해\"라는 말을 듣는 것",
      language: "wordsOfAffirmation",
    },
    optionB: {
      text: "따뜻한 포옹을 받는 것",
      language: "physicalTouch",
    },
  },
  {
    id: 11,
    optionA: {
      text: "힘들 때 위로의 말을 듣는 것",
      language: "wordsOfAffirmation",
    },
    optionB: {
      text: "손을 꼭 잡아주는 것",
      language: "physicalTouch",
    },
  },
  {
    id: 12,
    optionA: {
      text: "내 장점을 말해주는 것",
      language: "wordsOfAffirmation",
    },
    optionB: {
      text: "어깨를 토닥여주는 것",
      language: "physicalTouch",
    },
  },

  // 봉사 vs 선물 (3개)
  {
    id: 13,
    optionA: {
      text: "차를 세차해주는 것",
      language: "actsOfService",
    },
    optionB: {
      text: "내가 좋아하는 것을 기억해 선물하는 것",
      language: "receivingGifts",
    },
  },
  {
    id: 14,
    optionA: {
      text: "아플 때 간호해주는 것",
      language: "actsOfService",
    },
    optionB: {
      text: "꽃다발이나 케이크를 받는 것",
      language: "receivingGifts",
    },
  },
  {
    id: 15,
    optionA: {
      text: "복잡한 일을 도와주는 것",
      language: "actsOfService",
    },
    optionB: {
      text: "여행에서 기념품을 사오는 것",
      language: "receivingGifts",
    },
  },

  // 봉사 vs 함께하는 시간 (3개)
  {
    id: 16,
    optionA: {
      text: "내 짐을 들어주는 것",
      language: "actsOfService",
    },
    optionB: {
      text: "함께 취미 활동을 하는 것",
      language: "qualityTime",
    },
  },
  {
    id: 17,
    optionA: {
      text: "내 일정을 챙겨주는 것",
      language: "actsOfService",
    },
    optionB: {
      text: "전화나 영상통화로 이야기하는 것",
      language: "qualityTime",
    },
  },
  {
    id: 18,
    optionA: {
      text: "아침을 준비해주는 것",
      language: "actsOfService",
    },
    optionB: {
      text: "함께 저녁 식사를 하며 대화하는 것",
      language: "qualityTime",
    },
  },

  // 봉사 vs 스킨십 (3개)
  {
    id: 19,
    optionA: {
      text: "피곤할 때 안마해주는 것",
      language: "actsOfService",
    },
    optionB: {
      text: "다정하게 머리를 쓰다듬어주는 것",
      language: "physicalTouch",
    },
  },
  {
    id: 20,
    optionA: {
      text: "약속 시간에 데려다주는 것",
      language: "actsOfService",
    },
    optionB: {
      text: "만날 때 반갑게 안아주는 것",
      language: "physicalTouch",
    },
  },
  {
    id: 21,
    optionA: {
      text: "내 방을 정리해주는 것",
      language: "actsOfService",
    },
    optionB: {
      text: "옆에 앉아 팔짱을 끼는 것",
      language: "physicalTouch",
    },
  },

  // 선물 vs 함께하는 시간 (3개)
  {
    id: 22,
    optionA: {
      text: "생일에 특별한 선물을 받는 것",
      language: "receivingGifts",
    },
    optionB: {
      text: "생일을 함께 축하하며 시간을 보내는 것",
      language: "qualityTime",
    },
  },
  {
    id: 23,
    optionA: {
      text: "나만을 위해 골라준 선물을 받는 것",
      language: "receivingGifts",
    },
    optionB: {
      text: "온전히 나에게 집중해주는 것",
      language: "qualityTime",
    },
  },
  {
    id: 24,
    optionA: {
      text: "내가 원하던 것을 선물받는 것",
      language: "receivingGifts",
    },
    optionB: {
      text: "함께 여행을 가는 것",
      language: "qualityTime",
    },
  },

  // 선물 vs 스킨십 (3개)
  {
    id: 25,
    optionA: {
      text: "직접 만든 선물을 받는 것",
      language: "receivingGifts",
    },
    optionB: {
      text: "따뜻하게 안겨 있는 것",
      language: "physicalTouch",
    },
  },
  {
    id: 26,
    optionA: {
      text: "예상치 못한 깜짝 선물을 받는 것",
      language: "receivingGifts",
    },
    optionB: {
      text: "손을 잡고 걷는 것",
      language: "physicalTouch",
    },
  },
  {
    id: 27,
    optionA: {
      text: "나를 생각하며 사온 작은 선물을 받는 것",
      language: "receivingGifts",
    },
    optionB: {
      text: "가볍게 뽀뽀해주는 것",
      language: "physicalTouch",
    },
  },

  // 함께하는 시간 vs 스킨십 (3개)
  {
    id: 28,
    optionA: {
      text: "함께 카페에서 대화를 나누는 것",
      language: "qualityTime",
    },
    optionB: {
      text: "소파에서 함께 기대어 있는 것",
      language: "physicalTouch",
    },
  },
  {
    id: 29,
    optionA: {
      text: "함께 맛있는 음식을 먹으러 가는 것",
      language: "qualityTime",
    },
    optionB: {
      text: "헤어질 때 따뜻하게 안아주는 것",
      language: "physicalTouch",
    },
  },
  {
    id: 30,
    optionA: {
      text: "함께 특별한 경험을 하는 것",
      language: "qualityTime",
    },
    optionB: {
      text: "포옹하며 위로받는 것",
      language: "physicalTouch",
    },
  },
];

export interface LoveLanguageResult {
  wordsOfAffirmation: number;
  actsOfService: number;
  receivingGifts: number;
  qualityTime: number;
  physicalTouch: number;
}

export interface LoveLanguageInfo {
  name: string;
  nameEn: string;
  description: string;
  characteristics: string[];
  tips: string;
  detailedDescription: string;
  scientificBackground: string;
  expressionMethods: string[];
  recognitionSigns: string[];
  partnershipTips: string[];
}

export const loveLanguageDescriptions: Record<LoveLanguage, LoveLanguageInfo> = {
  wordsOfAffirmation: {
    name: "인정의 말",
    nameEn: "Words of Affirmation",
    description: "칭찬, 격려, 감사의 말을 통해 사랑을 표현하고 느낍니다. 진심 어린 말 한마디가 큰 힘이 됩니다.",
    characteristics: [
      "칭찬과 격려의 말에 크게 감동받습니다",
      "비판이나 부정적인 말에 민감합니다",
      "감사의 표현을 중요하게 생각합니다",
      "응원과 지지의 말을 들으면 용기가 납니다",
    ],
    tips: "자주 진심 어린 칭찬을 해주고, 감사의 말을 표현해주세요. 격려의 문자나 손편지도 좋습니다.",
    detailedDescription: "인정의 말(Words of Affirmation)은 Gary Chapman 박사의 '5가지 사랑의 언어' 중 하나로, 언어적 표현을 통해 사랑을 주고받는 방식입니다. 이 사랑의 언어를 가진 사람들은 칭찬, 격려, 감사, 애정의 말을 통해 깊은 감정적 연결을 경험합니다. 반대로 비판, 무시, 부정적인 말은 이들에게 큰 상처가 될 수 있습니다. 이 유형은 단순히 듣고 싶은 말을 원하는 것이 아니라, 진심에서 우러나오는 언어적 표현을 통해 사랑받고 있다는 확신을 얻습니다. 문자, 편지, 대화, 공개적인 칭찬 등 다양한 형태로 이 사랑의 언어를 표현할 수 있습니다.",
    scientificBackground: "사랑의 언어 개념은 Gary Chapman 박사가 30년 이상의 결혼 상담 경험을 바탕으로 1992년 저서 '5가지 사랑의 언어'에서 제시했습니다. 언어는 인간 연결의 근본적인 도구이며, 긍정적인 언어는 신경과학적으로 도파민과 옥시토신 분비를 촉진합니다. 연구에 따르면 커플 간의 긍정적 대 부정적 상호작용 비율(Gottman 비율)이 관계 만족도와 강하게 연관됩니다. 인정의 말은 자존감, 애착 안정성, 관계 만족도에 긍정적인 영향을 미칩니다. 발달심리학적으로 어린 시절 언어적 격려를 많이 받은 사람들이 이 사랑의 언어를 더 중요하게 여기는 경향이 있습니다.",
    expressionMethods: [
      "구체적이고 진심 어린 칭찬 자주 하기",
      "감사 일기나 편지 쓰기",
      "공개적으로 파트너 칭찬하기",
      "힘들 때 격려의 말 건네기",
      "사랑한다는 말 자주 하기"
    ],
    recognitionSigns: [
      "칭찬받으면 눈에 띄게 기뻐한다",
      "비판적인 말에 깊이 상처받는다",
      "과거에 받은 칭찬을 오래 기억한다",
      "감사 표현을 자주 한다",
      "SNS나 문자로 애정 표현을 좋아한다"
    ],
    partnershipTips: [
      "비판보다 긍정적인 피드백을 먼저 제시하세요",
      "매일 한 가지씩 파트너의 좋은 점을 말해주세요",
      "공개적으로 파트너에 대해 좋게 말하세요",
      "갈등 상황에서도 인신공격적 언어는 피하세요",
      "특별한 날에는 손편지를 써보세요"
    ],
  },
  actsOfService: {
    name: "봉사",
    nameEn: "Acts of Service",
    description: "상대를 위한 행동으로 사랑을 표현하고 느낍니다. 말보다 행동으로 보여주는 것이 중요합니다.",
    characteristics: [
      "상대가 자신을 위해 무언가를 해줄 때 사랑을 느낍니다",
      "도움이 필요할 때 도와주는 것을 감사히 여깁니다",
      "약속을 지키는 것을 중요하게 생각합니다",
      "작은 배려의 행동에 감동받습니다",
    ],
    tips: "상대의 짐을 덜어주는 행동을 해보세요. 집안일 돕기, 심부름 해주기 등 실질적인 도움이 사랑 표현이 됩니다.",
    detailedDescription: "봉사(Acts of Service)는 행동을 통해 사랑을 표현하고 느끼는 방식입니다. '말보다 행동'이라는 속담처럼, 이 사랑의 언어를 가진 사람들은 상대가 자신을 위해 무언가를 해줄 때 깊은 사랑을 느낍니다. 이는 단순한 집안일 돕기부터 복잡한 문제 해결까지 다양한 형태로 나타납니다. 중요한 것은 상대의 짐을 덜어주고 삶을 더 쉽게 만들어주려는 의도입니다. 반대로 약속을 지키지 않거나, 도움이 필요할 때 무관심한 태도는 이들에게 큰 실망이 됩니다. 봉사는 시간, 에너지, 노력을 투자하는 것이기 때문에, 이를 통해 받는 사랑은 매우 의미있게 느껴집니다.",
    scientificBackground: "봉사의 사랑 언어는 상호성과 협력에 대한 진화심리학적 기반을 가지고 있습니다. 인간은 사회적 동물로서 상호 도움을 통해 생존해왔습니다. 행동을 통한 돌봄은 옥시토신 분비를 촉진하며, 이는 신뢰와 유대감을 강화합니다. 연구에 따르면 커플 간의 가사 분담 공정성은 관계 만족도와 밀접하게 연관됩니다. 또한 봉사의 언어는 '사랑의 증거'를 원하는 사람들에게 특히 중요한데, 말은 쉽게 할 수 있지만 행동은 진정성을 요구하기 때문입니다. 애착 이론 관점에서, 일관된 돌봄 행동은 안정 애착 형성에 기여합니다.",
    expressionMethods: [
      "파트너의 할 일을 대신 해주기",
      "아침 식사나 커피 준비해주기",
      "아플 때 간호하고 돌봐주기",
      "복잡한 문제(행정, 기술 등) 대신 처리해주기",
      "파트너의 일정에 맞춰 도움이 필요한 것 미리 파악하기"
    ],
    recognitionSigns: [
      "누군가 도와줬을 때 깊이 감동한다",
      "'행동으로 보여줘'라는 말을 자주 한다",
      "약속을 지키는 것을 매우 중요하게 여긴다",
      "실질적인 도움을 주는 것으로 사랑을 표현한다",
      "게으름이나 무관심에 실망한다"
    ],
    partnershipTips: [
      "먼저 물어보세요: '내가 도와줄 일 있어?'",
      "약속한 것은 반드시 지키세요",
      "파트너가 힘들어할 때 적극적으로 도와주세요",
      "집안일을 공정하게 분담하세요",
      "도움을 주기 전에 상대가 원하는 방식을 확인하세요"
    ],
  },
  receivingGifts: {
    name: "선물",
    nameEn: "Receiving Gifts",
    description: "의미 있는 선물을 통해 사랑을 표현하고 느낍니다. 선물의 가격보다 정성과 의미가 중요합니다.",
    characteristics: [
      "선물에 담긴 마음과 정성을 읽습니다",
      "기념일이나 특별한 날을 중요하게 여깁니다",
      "작은 선물도 오래 기억하고 소중히 간직합니다",
      "선물을 통해 상대가 자신을 생각한다고 느낍니다",
    ],
    tips: "특별한 날이 아니어도 작은 선물을 준비해보세요. 상대가 좋아하는 것을 기억해두었다가 선물하면 더욱 좋습니다.",
    detailedDescription: "선물(Receiving Gifts)은 물질적인 표현을 통해 사랑을 느끼는 언어입니다. 이것은 물질주의와는 다릅니다. 이 사랑의 언어를 가진 사람들에게 선물은 '사랑의 상징'입니다. 선물의 가격이 아닌 그 안에 담긴 생각, 노력, 정성이 중요합니다. 상대가 자신을 생각하며 무언가를 골랐다는 사실 자체가 사랑의 증거가 됩니다. 이들은 선물을 받으면 오래도록 간직하며, 그것을 볼 때마다 사랑받고 있다는 느낌을 떠올립니다. 반대로 기념일을 잊거나 선물에 무관심한 태도는 '내가 중요하지 않다'는 메시지로 받아들여질 수 있습니다.",
    scientificBackground: "선물 주고받기는 인류 역사에서 가장 오래된 사회적 유대 형성 방식 중 하나입니다. 인류학적으로 선물 교환은 관계를 형성하고 유지하는 핵심 메커니즘이었습니다(Marcel Mauss의 '선물' 연구). 신경과학적으로 선물을 받을 때 보상 중추가 활성화되며, 도파민이 분비됩니다. 흥미롭게도 선물을 줄 때도 비슷한 뇌 반응이 나타납니다. 연구에 따르면 선물의 가치는 금전적 가치보다 상대가 자신을 얼마나 이해하고 있는지를 나타내는 '생각의 가치'에서 옵니다. 선물을 물리적 '사랑의 토큰'으로 보는 것이 이 사랑의 언어의 핵심입니다.",
    expressionMethods: [
      "상대가 원하는 것을 평소에 메모해두기",
      "기념일뿐 아니라 일상에서도 작은 선물하기",
      "여행 갈 때 기념품 사오기",
      "직접 만든 선물 준비하기",
      "'널 생각하며 샀어'라고 말해주기"
    ],
    recognitionSigns: [
      "선물을 오랫동안 간직하고 소중히 여긴다",
      "선물을 받으면 매우 기뻐하고 감동한다",
      "기념일이나 특별한 날을 중요하게 생각한다",
      "다른 사람에게도 선물을 자주 한다",
      "선물 받은 이야기를 자주 한다"
    ],
    partnershipTips: [
      "기념일을 잊지 마세요 - 캘린더에 미리 표시하세요",
      "비싸지 않아도 됩니다. 정성과 생각이 담긴 것이면 충분합니다",
      "파트너가 좋아하는 것, 원하는 것을 평소에 메모해두세요",
      "깜짝 선물은 큰 감동을 줍니다",
      "선물을 줄 때 그 의미와 이유를 설명해주세요"
    ],
  },
  qualityTime: {
    name: "함께하는 시간",
    nameEn: "Quality Time",
    description: "온전히 함께하는 시간을 통해 사랑을 표현하고 느낍니다. 집중된 관심과 함께하는 경험이 중요합니다.",
    characteristics: [
      "함께 시간을 보내는 것 자체를 사랑으로 느낍니다",
      "상대가 딴짓하면 소외감을 느낄 수 있습니다",
      "함께하는 활동과 대화를 중요시합니다",
      "눈을 맞추며 이야기하는 것을 좋아합니다",
    ],
    tips: "함께하는 시간에는 휴대폰을 내려놓고 온전히 집중해주세요. 함께 할 수 있는 활동을 계획해보세요.",
    detailedDescription: "함께하는 시간(Quality Time)은 온전한 관심과 존재를 통해 사랑을 느끼는 언어입니다. '함께 있는 것'과 '함께하는 것'은 다릅니다. 이 사랑의 언어를 가진 사람들에게는 상대가 자신에게 온전히 집중해주는 것이 가장 큰 사랑의 표현입니다. 함께 대화하기, 산책하기, 여행하기, 취미 활동 공유하기 등 다양한 형태로 나타납니다. 중요한 것은 '같은 공간에 있음'이 아니라 '함께 경험을 공유함'입니다. 반대로 만남 중에 휴대폰만 보거나, 다른 일에 정신이 팔려 있거나, 약속을 자주 취소하는 것은 이들에게 큰 상처가 됩니다.",
    scientificBackground: "함께하는 시간의 중요성은 사회적 연결에 대한 인간의 기본적 필요에 기반합니다. 신경과학 연구에 따르면, 집중된 사회적 상호작용은 옥시토신 분비를 촉진하고 스트레스 호르몬을 감소시킵니다. '집중된 관심(focused attention)'은 상대에게 '당신은 중요하다'는 메시지를 전달합니다. John Gottman의 연구에서 '전환 순간(turning toward)'—파트너의 관심 요청에 반응하는 것—이 관계 성공의 핵심 예측 변수임을 발견했습니다. 현대의 디지털 산만함 시대에 함께하는 시간의 가치는 더욱 높아졌습니다. 연구에 따르면 식사 시간에 휴대폰을 사용하면 관계 만족도가 감소합니다.",
    expressionMethods: [
      "함께 할 수 있는 취미 활동 찾기",
      "대화할 때 눈을 맞추고 경청하기",
      "함께하는 시간에는 휴대폰 내려놓기",
      "정기적인 데이트 시간 만들기",
      "함께 새로운 경험 시도하기"
    ],
    recognitionSigns: [
      "함께 시간을 보내자고 자주 제안한다",
      "대화할 때 딴짓하면 서운해한다",
      "함께한 추억을 자주 이야기한다",
      "약속 취소에 크게 실망한다",
      "함께하는 활동을 계획하는 것을 즐긴다"
    ],
    partnershipTips: [
      "함께하는 시간에는 온전히 집중하세요",
      "정기적인 '우리만의 시간'을 만드세요",
      "함께 할 수 있는 새로운 활동을 시도하세요",
      "대화할 때 경청하고 눈을 맞추세요",
      "바쁘더라도 짧은 시간이라도 온전히 함께하세요"
    ],
  },
  physicalTouch: {
    name: "스킨십",
    nameEn: "Physical Touch",
    description: "신체적 접촉을 통해 사랑을 표현하고 느낍니다. 포옹, 손잡기 등 따뜻한 터치가 큰 위로가 됩니다.",
    characteristics: [
      "포옹이나 손잡기를 통해 안정감을 느낍니다",
      "신체적 거리가 멀면 서운할 수 있습니다",
      "가벼운 터치도 큰 의미로 받아들입니다",
      "힘들 때 안아주는 것이 큰 위로가 됩니다",
    ],
    tips: "자주 포옹하고, 손을 잡아주세요. 대화할 때 가볍게 터치하거나 기대어 앉는 것도 좋습니다.",
    detailedDescription: "스킨십(Physical Touch)은 신체적 접촉을 통해 사랑을 느끼고 표현하는 언어입니다. 이 사랑의 언어를 가진 사람들에게 따뜻한 포옹, 손잡기, 어깨를 토닥이는 것, 가볍게 안기는 것 등은 말보다 강력한 사랑의 메시지입니다. 스킨십은 성적인 접촉만을 의미하지 않습니다. 일상에서의 다정한 터치가 더 중요합니다. 이들에게 신체적 접촉은 안전감, 연결감, 소속감을 제공합니다. 반대로 신체적 거리감, 터치 거부, 회피는 깊은 거절감으로 느껴질 수 있습니다. 힘들거나 슬플 때 말보다 따뜻한 포옹이 더 큰 위로가 됩니다.",
    scientificBackground: "신체적 접촉의 중요성은 강력한 과학적 근거를 가지고 있습니다. 해리 할로우의 원숭이 실험은 접촉 위안(contact comfort)이 기본적인 필요임을 보여주었습니다. 스킨십은 '사랑 호르몬'이라 불리는 옥시토신 분비를 촉진하고, 스트레스 호르몬인 코르티솔을 감소시킵니다. 연구에 따르면 정기적인 포옹은 혈압을 낮추고 면역 기능을 강화합니다. 신생아에게 '캥거루 케어'(피부 접촉)가 발달에 중요하듯, 성인에게도 스킨십은 정서적 안정에 필수적입니다. 하루 8번의 포옹이 정서적 건강에 이상적이라는 연구도 있습니다(Virginia Satir). 피부는 인체에서 가장 큰 감각 기관이며, 터치를 통해 풍부한 감정 정보를 전달합니다.",
    expressionMethods: [
      "자주 포옹하기",
      "손잡고 걷기",
      "대화할 때 가볍게 터치하기",
      "함께 소파에서 기대어 앉기",
      "아침저녁 인사할 때 안아주기"
    ],
    recognitionSigns: [
      "스킨십을 먼저 시도한다",
      "신체적 거리가 멀면 불안해한다",
      "포옹을 받으면 눈에 띄게 편안해진다",
      "힘들 때 안아달라고 요청한다",
      "함께 있을 때 가까이 붙어 있으려 한다"
    ],
    partnershipTips: [
      "일상에서 자주 터치하세요 (어깨, 팔 등)",
      "헤어질 때와 만날 때 포옹하세요",
      "TV 볼 때 함께 기대어 앉으세요",
      "손잡고 걷는 것을 습관화하세요",
      "스킨십에 대한 파트너의 선호를 파악하세요"
    ],
  },
};
