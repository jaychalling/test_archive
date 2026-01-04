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

export const attachmentStyleDescriptions: Record<AttachmentStyle, {
  name: string;
  nameEn: string;
  description: string;
  characteristics: string[];
  inRelationship: string;
  advice: string[];
  color: string;
}> = {
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
  },
};
