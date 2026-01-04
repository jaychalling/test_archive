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

export const loveLanguageDescriptions: Record<LoveLanguage, {
  name: string;
  nameEn: string;
  description: string;
  characteristics: string[];
  tips: string;
}> = {
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
  },
};
