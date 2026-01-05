export type AttachmentStyle = "secure" | "anxious" | "avoidant" | "fearfulAvoidant";

export interface AttachmentQuestion {
  id: number;
  text: string;
  // 양수는 해당 축의 높은 점수, 음수는 낮은 점수
  anxietyWeight: number; // 불안 축 가중치 (-1 ~ 1)
  avoidanceWeight: number; // 회피 축 가중치 (-1 ~ 1)
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

export const attachmentStyleQuestions: AttachmentQuestion[] = [
  // === 불안 축 관련 질문 (높은 점수 = 높은 불안) ===
  // 관계에서의 안정감
  {
    id: 1,
    text: "연인이 연락이 없으면 불안해지고 자꾸 확인하고 싶어진다.",
    anxietyWeight: 1,
    avoidanceWeight: 0,
  },
  {
    id: 2,
    text: "상대방이 나를 진심으로 사랑하는지 자주 의심이 든다.",
    anxietyWeight: 1,
    avoidanceWeight: 0,
  },
  {
    id: 3,
    text: "관계에서 거절당하거나 버림받을까봐 두렵다.",
    anxietyWeight: 1,
    avoidanceWeight: 0,
  },
  // 혼자 있을 때의 감정
  {
    id: 4,
    text: "혼자 있을 때 공허함이나 외로움을 강하게 느낀다.",
    anxietyWeight: 1,
    avoidanceWeight: 0,
  },
  {
    id: 5,
    text: "파트너와 떨어져 있으면 불안하고 집중이 안 된다.",
    anxietyWeight: 1,
    avoidanceWeight: 0,
  },
  // 파트너에 대한 기대
  {
    id: 6,
    text: "파트너가 나의 모든 감정적 필요를 채워주길 기대한다.",
    anxietyWeight: 1,
    avoidanceWeight: 0,
  },

  // === 회피 축 관련 질문 (높은 점수 = 높은 회피) ===
  // 친밀감에 대한 태도
  {
    id: 7,
    text: "사람들과 너무 가까워지는 것이 불편하다.",
    anxietyWeight: 0,
    avoidanceWeight: 1,
  },
  {
    id: 8,
    text: "나의 깊은 감정을 타인에게 보여주기 어렵다.",
    anxietyWeight: 0,
    avoidanceWeight: 1,
  },
  {
    id: 9,
    text: "누군가에게 의지하는 것이 편하지 않다.",
    anxietyWeight: 0,
    avoidanceWeight: 1,
  },
  // 독립성 강조
  {
    id: 10,
    text: "관계보다 개인의 자유와 독립이 더 중요하다.",
    anxietyWeight: 0,
    avoidanceWeight: 1,
  },
  {
    id: 11,
    text: "파트너가 너무 많은 시간을 함께 보내려 하면 부담스럽다.",
    anxietyWeight: 0,
    avoidanceWeight: 1,
  },
  {
    id: 12,
    text: "혼자만의 시간과 공간을 매우 중요하게 생각한다.",
    anxietyWeight: 0,
    avoidanceWeight: 1,
  },

  // === 안정형 (낮은 불안, 낮은 회피) ===
  {
    id: 13,
    text: "나는 연인에게 쉽게 마음을 열고 의지할 수 있다.",
    anxietyWeight: -0.5,
    avoidanceWeight: -0.5,
  },
  {
    id: 14,
    text: "관계에서 안정감을 느끼고 상대를 신뢰한다.",
    anxietyWeight: -0.5,
    avoidanceWeight: -0.5,
  },
  {
    id: 15,
    text: "갈등이 생겨도 대화로 해결할 수 있다고 믿는다.",
    anxietyWeight: -0.5,
    avoidanceWeight: -0.5,
  },

  // === 갈등 상황 대처 방식 ===
  {
    id: 16,
    text: "갈등이 생기면 상대방이 나를 떠날까봐 걱정된다.",
    anxietyWeight: 1,
    avoidanceWeight: 0,
  },
  {
    id: 17,
    text: "문제가 생기면 일단 거리를 두고 혼자 정리하려 한다.",
    anxietyWeight: 0,
    avoidanceWeight: 1,
  },
  {
    id: 18,
    text: "갈등 상황에서 감정을 억누르고 무관심한 척 한다.",
    anxietyWeight: 0,
    avoidanceWeight: 1,
  },

  // === 두려움-회피형 (높은 불안 + 높은 회피) ===
  {
    id: 19,
    text: "친밀한 관계를 원하지만 동시에 두렵기도 하다.",
    anxietyWeight: 0.5,
    avoidanceWeight: 0.5,
  },
  {
    id: 20,
    text: "가까워지면 상처받을까봐 먼저 거리를 둔다.",
    anxietyWeight: 0.5,
    avoidanceWeight: 0.5,
  },
  {
    id: 21,
    text: "사랑받고 싶지만 사랑받을 자격이 없는 것 같다.",
    anxietyWeight: 0.5,
    avoidanceWeight: 0.5,
  },
  {
    id: 22,
    text: "관계에서 밀당을 반복하게 된다 (밀었다 당겼다).",
    anxietyWeight: 0.5,
    avoidanceWeight: 0.5,
  },

  // === 추가 질문 ===
  {
    id: 23,
    text: "상대방의 작은 행동 변화에도 민감하게 반응한다.",
    anxietyWeight: 1,
    avoidanceWeight: 0,
  },
  {
    id: 24,
    text: "감정적으로 힘들 때 파트너에게 솔직히 말하기 어렵다.",
    anxietyWeight: 0.3,
    avoidanceWeight: 0.7,
  },
];

export interface AttachmentResult {
  anxietyScore: number; // 0-100
  avoidanceScore: number; // 0-100
  primaryStyle: AttachmentStyle;
}

export interface AttachmentStyleInfo {
  name: string;
  nameEn: string;
  description: string;
  characteristics: string[];
  inRelationship: string;
  advice: string[];
  color: string;
  detailedDescription: string;
  scientificBackground: string;
  communicationTips: string[];
  healingStrategies: string[];
  compatibleStyles: AttachmentStyle[];
  challengingStyles: AttachmentStyle[];
}

export const attachmentStyleDescriptions: Record<AttachmentStyle, AttachmentStyleInfo> = {
  secure: {
    name: "안정형",
    nameEn: "Secure",
    description: "건강한 자아상과 타인에 대한 신뢰를 바탕으로 안정적인 관계를 형성합니다. 친밀감과 독립성 사이에서 균형을 유지할 수 있습니다.",
    characteristics: [
      "자신과 타인에 대해 긍정적인 시각을 가짐",
      "감정을 편하게 표현하고 공유할 수 있음",
      "파트너를 신뢰하고 의지할 수 있음",
      "혼자 있어도 편안함을 느낌",
      "갈등을 건설적으로 해결하려 함",
    ],
    inRelationship: "안정적이고 지지적인 파트너가 되며, 상대의 필요와 자신의 필요 사이에서 균형을 잘 유지합니다. 감정적으로 안정되어 있어 관계에서 안전기지 역할을 합니다.",
    advice: [
      "현재의 관계 패턴을 유지하세요",
      "다른 애착 유형의 파트너를 이해하고 지지해주세요",
      "건강한 경계를 유지하면서도 열린 마음을 가지세요",
    ],
    color: "green",
    detailedDescription: "안정형 애착은 John Bowlby와 Mary Ainsworth의 애착 이론에서 가장 건강한 애착 유형으로 간주됩니다. 안정형 애착을 가진 사람들은 어린 시절 일관되고 반응적인 양육을 경험했을 가능성이 높습니다. 이들은 자신이 사랑받을 가치가 있다고 느끼며, 타인을 신뢰할 수 있다고 믿습니다. 성인 관계에서 안정형은 친밀감을 편안하게 느끼면서도 독립성을 유지할 수 있습니다. 연구에 따르면 안정형 애착은 관계 만족도, 정신 건강, 그리고 전반적인 삶의 질과 강하게 연관되어 있습니다. 흥미롭게도 애착 유형은 고정된 것이 아니며, '획득된 안정(earned security)'을 통해 불안정한 애착에서 안정형으로 발전할 수 있습니다.",
    scientificBackground: "애착 이론은 1960년대 영국의 정신과 의사 John Bowlby에 의해 발전되었으며, Mary Ainsworth의 '낯선 상황 실험'을 통해 과학적으로 검증되었습니다. 안정형 애착은 영아의 뇌 발달, 특히 전전두엽 피질과 변연계의 건강한 연결과 관련이 있습니다. 신경과학 연구에 따르면, 안정형 애착을 가진 사람들은 스트레스 상황에서 코르티솔 반응이 더 적절하게 조절됩니다. 성인 애착 연구(Adult Attachment Interview, AAI)에서 안정형은 '자율적(Autonomous)' 상태로 분류되며, 자신의 어린 시절 경험에 대해 일관되고 통합된 서사를 가지고 있습니다. 연구에 따르면 성인 인구의 약 50-60%가 안정형 애착을 보이며, 이는 문화에 따라 다소 차이가 있습니다.",
    communicationTips: [
      "불안정한 애착을 가진 파트너에게 안전기지 역할을 해주세요",
      "파트너의 감정적 필요에 일관되게 반응하세요",
      "자신의 필요도 명확하게 표현하는 것을 잊지 마세요",
      "갈등 상황에서 침착함을 유지하고 해결책을 함께 찾으세요",
      "파트너의 애착 스타일을 이해하고 맞춤 소통을 시도하세요"
    ],
    healingStrategies: [
      "현재의 건강한 관계 패턴을 의식적으로 유지하세요",
      "스트레스 상황에서도 정서 조절 능력을 발휘하세요",
      "파트너가 불안정한 애착을 가졌다면 인내심을 갖고 지지해주세요",
      "자기 돌봄과 관계 돌봄의 균형을 유지하세요",
      "지속적인 자기 성찰을 통해 관계를 성장시키세요"
    ],
    compatibleStyles: ["secure", "anxious", "avoidant"],
    challengingStyles: ["fearfulAvoidant"],
  },
  anxious: {
    name: "불안형",
    nameEn: "Anxious-Preoccupied",
    description: "관계에서 안심을 얻고 싶어하며, 파트너의 사랑을 자주 확인받고 싶어합니다. 거절이나 버림받음에 대한 두려움이 있습니다.",
    characteristics: [
      "관계에 대해 자주 걱정하고 불안해함",
      "파트너의 행동에 민감하게 반응함",
      "상대의 사랑과 관심을 자주 확인하고 싶어함",
      "혼자 있을 때 불안하거나 외로움을 느낌",
      "상대에게 많이 의존하는 경향이 있음",
    ],
    inRelationship: "열정적이고 헌신적인 파트너가 될 수 있지만, 때로는 과도한 확인과 불안이 관계에 부담이 될 수 있습니다. 상대의 반응에 따라 감정 기복이 있을 수 있습니다.",
    advice: [
      "자기 자신에 대한 가치감을 키우세요",
      "불안을 느낄 때 바로 반응하지 말고 잠시 멈춰보세요",
      "취미나 친구 관계 등 관계 외의 활동을 발전시키세요",
      "명상이나 마음챙김 연습이 도움이 됩니다",
      "파트너에게 솔직하게 필요를 표현하되 비난하지 마세요",
    ],
    color: "amber",
    detailedDescription: "불안형 애착(또는 불안-몰입형)은 자신에 대해서는 부정적이지만 타인에 대해서는 긍정적인 내적 작업 모델을 가지고 있습니다. 어린 시절 양육자의 반응이 일관적이지 않았던 경험과 관련이 있을 수 있습니다. 때로는 반응적이었지만 때로는 그렇지 않았던 양육 패턴은 아이에게 '더 노력하면 사랑받을 수 있다'는 믿음을 형성시킵니다. 성인이 된 후에도 이 패턴은 지속되어, 파트너의 사랑을 확인받기 위해 끊임없이 노력하게 됩니다. 불안형 애착을 가진 사람들은 매우 사랑스럽고 헌신적인 파트너가 될 수 있지만, 관계에 대한 지속적인 불안이 오히려 상대를 밀어내는 역설적인 상황을 만들 수 있습니다.",
    scientificBackground: "불안형 애착은 Bartholomew와 Horowitz의 4가지 성인 애착 유형 모델에서 '몰입형(Preoccupied)'으로 불립니다. 이 유형은 자기 모델이 부정적이고 타인 모델이 긍정적인 것이 특징입니다. 신경과학 연구에 따르면, 불안형 애착을 가진 사람들은 거절 신호에 더 민감하게 반응하며, 편도체의 활성화가 증가하는 경향이 있습니다. 또한 옥시토신 시스템의 반응성이 다를 수 있습니다. 진화심리학적 관점에서, 불안형 애착은 불확실한 환경에서 적응적이었을 수 있습니다. 양육자의 주의를 끌기 위해 더 많은 신호를 보내는 것이 생존에 도움이 되었기 때문입니다. 성인 인구의 약 15-20%가 불안형 애착을 보입니다.",
    communicationTips: [
      "불안을 느낄 때 행동하기 전에 잠시 멈추고 호흡하세요",
      "파트너에게 직접적으로 필요를 표현하되, 비난이나 비판 없이 하세요",
      "파트너의 응답이 늦어도 최악의 상황을 가정하지 마세요",
      "갈등 시 감정이 고조되면 잠시 쉬는 시간을 가지세요",
      "문자나 전화 횟수를 의식적으로 조절해보세요"
    ],
    healingStrategies: [
      "자기 자신과의 관계를 강화하세요 - 혼자 있는 시간을 연습하세요",
      "자기 가치감은 파트너의 반응에 달려있지 않다는 것을 인식하세요",
      "마음챙김 명상을 통해 불안을 관찰하는 연습을 하세요",
      "치료사나 상담사와 함께 어린 시절 경험을 탐색해보세요",
      "관계 외의 지지 시스템(친구, 가족, 취미)을 발전시키세요"
    ],
    compatibleStyles: ["secure"],
    challengingStyles: ["avoidant", "fearfulAvoidant"],
  },
  avoidant: {
    name: "회피형",
    nameEn: "Dismissive-Avoidant",
    description: "독립성과 자기 충족을 중시하며, 감정적 친밀감을 불편해합니다. 관계보다 개인의 자유를 우선시하는 경향이 있습니다.",
    characteristics: [
      "감정적 친밀감을 불편해하거나 피함",
      "독립성과 자기 충족을 매우 중요시함",
      "감정을 억제하고 표현하지 않으려 함",
      "다른 사람에게 의지하는 것을 꺼림",
      "관계가 가까워지면 거리를 두려 함",
    ],
    inRelationship: "파트너에게 냉담하거나 거리감 있게 보일 수 있습니다. 감정 표현이 적고, 갈등 시 철수하는 경향이 있어 상대가 외로움을 느낄 수 있습니다.",
    advice: [
      "감정을 느끼고 표현하는 연습을 해보세요",
      "취약함을 보여주는 것이 약점이 아님을 인식하세요",
      "파트너에게 작은 것부터 의지해보세요",
      "친밀감이 불편할 때 왜 그런지 자기 탐색을 해보세요",
      "관계에서의 작은 연결 순간들을 알아차리세요",
    ],
    color: "blue",
    detailedDescription: "회피형 애착(또는 무시-회피형)은 자신에 대해서는 긍정적이지만 타인에 대해서는 부정적인 내적 작업 모델을 가지고 있습니다. 어린 시절 양육자가 감정적으로 이용 불가능했거나, 독립성을 강조하고 감정 표현을 억압했던 경험과 관련이 있을 수 있습니다. 아이는 자신의 감정적 필요를 표현해도 충족되지 않는다는 것을 배우고, 결국 필요 자체를 억압하게 됩니다. 성인이 된 후, 회피형은 친밀감을 불편해하며 '나는 혼자서도 괜찮다'는 자세를 취합니다. 그러나 이는 진정한 독립이 아니라 취약함에 대한 방어입니다. 회피형 애착을 가진 사람들도 깊은 곳에서는 연결을 원하지만, 이를 인정하기 어려워합니다.",
    scientificBackground: "회피형 애착은 Bartholomew와 Horowitz의 모델에서 '무시형(Dismissing)'으로 분류됩니다. 이 유형은 자기 모델이 긍정적이고 타인 모델이 부정적인 것이 특징입니다. Mary Ainsworth의 '낯선 상황 실험'에서 회피형 영아는 양육자와 분리되어도 고통을 보이지 않았지만, 생리학적 측정(심박수, 코르티솔)에서는 스트레스 반응이 나타났습니다. 이는 감정 억제가 외부적으로만 이루어지고 내부적으로는 스트레스를 경험함을 보여줍니다. 신경과학 연구에 따르면, 회피형 애착은 감정 처리와 관련된 뇌 영역의 비활성화와 연관될 수 있습니다. 성인 인구의 약 20-25%가 회피형 애착을 보입니다.",
    communicationTips: [
      "감정을 표현하는 것이 약점이 아님을 기억하세요",
      "파트너의 친밀감 요청을 '침입'이 아닌 '연결 시도'로 재해석해보세요",
      "갈등 시 물러서기보다 잠시 쉬고 다시 대화하겠다고 약속하세요",
      "작은 것부터 감정을 공유하는 연습을 해보세요",
      "파트너에게 혼자만의 시간이 필요하다고 설명하되, 관계의 중요성도 표현하세요"
    ],
    healingStrategies: [
      "감정을 느끼고 명명하는 연습을 하세요 - 감정 일기가 도움이 됩니다",
      "취약함을 보여주는 것이 강점이 될 수 있음을 배우세요",
      "안전한 관계에서 조금씩 의지하는 연습을 해보세요",
      "어린 시절 경험과 현재 패턴의 연결을 탐색해보세요",
      "친밀감에 대한 두려움을 인정하고 작은 단계로 극복해보세요"
    ],
    compatibleStyles: ["secure"],
    challengingStyles: ["anxious", "fearfulAvoidant"],
  },
  fearfulAvoidant: {
    name: "두려움-회피형",
    nameEn: "Fearful-Avoidant",
    description: "친밀함을 원하면서도 두려워하는 모순된 감정을 경험합니다. 가까워지면 상처받을까봐 거리를 두지만, 멀어지면 불안해집니다.",
    characteristics: [
      "친밀감을 원하지만 동시에 두려워함",
      "관계에서 불안과 회피가 모두 높음",
      "상대의 반응에 따라 극단적으로 반응할 수 있음",
      "관계 패턴이 혼란스러움 (밀당)",
      "자신과 타인에 대한 부정적 시각이 있을 수 있음",
    ],
    inRelationship: "강렬한 감정과 함께 관계의 기복이 클 수 있습니다. 가까워지면 밀어내고, 멀어지면 다시 다가가는 패턴이 반복될 수 있습니다.",
    advice: [
      "과거의 관계 경험이나 상처를 탐색해보세요",
      "전문 상담을 통해 깊은 자기 이해를 도모해보세요",
      "안전한 관계에서 조금씩 신뢰를 쌓아가세요",
      "자기 패턴을 인식하고 알아차릴 때 행동을 멈춰보세요",
      "자기 자신에게 연민을 가져보세요",
    ],
    color: "purple",
    detailedDescription: "두려움-회피형 애착(또는 혼란형/비조직화된 애착)은 불안과 회피가 모두 높은 가장 복잡한 애착 유형입니다. 이 유형은 자신에 대해서도, 타인에 대해서도 부정적인 내적 작업 모델을 가지고 있습니다. 어린 시절 양육자가 두려움의 원천이자 동시에 안전의 원천이었던 경험과 관련이 있을 수 있습니다. 아이는 위로를 구해야 하지만 그 대상이 동시에 두려운 존재인 해결 불가능한 딜레마에 놓입니다. 성인이 된 후, 이러한 사람들은 친밀감을 깊이 원하지만 동시에 두려워합니다. '가까워지면 상처받을 것'이라는 두려움과 '멀어지면 버림받을 것'이라는 두려움 사이에서 갈등합니다. 이로 인해 관계에서 '밀고 당기는' 패턴이 나타납니다.",
    scientificBackground: "두려움-회피형 애착은 Mary Main이 발견한 '비조직화된(Disorganized)' 애착 패턴과 관련이 있습니다. 이 유형은 주로 양육자의 학대, 방임, 또는 해결되지 않은 트라우마와 연관됩니다. 신경과학 연구에 따르면, 비조직화된 애착을 가진 사람들은 스트레스 상황에서 편도체의 과활성화와 전전두엽 피질의 저활성화를 보일 수 있습니다. 이는 감정 조절의 어려움을 설명합니다. 또한 이 애착 유형은 해리(dissociation) 경험과 연관될 수 있습니다. 성인 인구의 약 5-10%가 두려움-회피형 애착을 보이며, 이 유형은 다른 유형에 비해 정신 건강 문제와 더 강하게 연관되어 있습니다. 그러나 전문적인 도움을 통해 '획득된 안정(earned security)'으로 발전할 수 있습니다.",
    communicationTips: [
      "자신의 패턴(밀고 당기기)을 인식하고 파트너에게 설명해보세요",
      "압도되는 감정이 올 때 잠시 멈추고 자기 조절을 시도하세요",
      "작은 신뢰 구축부터 시작하세요 - 큰 약속보다 일관된 작은 행동들",
      "갈등 시 극단적인 반응(완전한 철수 또는 과도한 추구)을 피하세요",
      "파트너에게 자신이 필요로 하는 안심을 구체적으로 표현해보세요"
    ],
    healingStrategies: [
      "전문 상담사(특히 트라우마 전문)와 함께 과거를 탐색하세요",
      "EMDR, 체감 경험 치료(Somatic Experiencing) 등이 도움이 될 수 있습니다",
      "자기 자신에게 연민을 가지세요 - 이 패턴은 생존 전략이었습니다",
      "안전한 관계에서 '안정형'의 요소를 경험해보세요",
      "마음챙김과 신체 기반 연습을 통해 정서 조절 능력을 키우세요"
    ],
    compatibleStyles: ["secure"],
    challengingStyles: ["anxious", "avoidant", "fearfulAvoidant"],
  },
};
