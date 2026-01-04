export interface BdsmQuestion {
  id: number;
  text: string;
  category: "dominant" | "submissive" | "sadism" | "masochism" | "switch";
}

export const bdsmQuestions: BdsmQuestion[] = [
  // Dominant 성향 질문 (5개)
  {
    id: 1,
    text: "나는 관계에서 주도권을 가지는 것을 선호한다.",
    category: "dominant",
  },
  {
    id: 2,
    text: "상대방이 나의 결정을 따를 때 만족감을 느낀다.",
    category: "dominant",
  },
  {
    id: 3,
    text: "나는 계획을 세우고 상대방을 이끄는 역할이 편하다.",
    category: "dominant",
  },
  {
    id: 4,
    text: "상대방을 보호하고 돌보는 것에서 기쁨을 느낀다.",
    category: "dominant",
  },
  {
    id: 5,
    text: "나는 규칙을 정하고 그것이 지켜지길 원한다.",
    category: "dominant",
  },

  // Submissive 성향 질문 (5개)
  {
    id: 6,
    text: "신뢰하는 사람에게 결정을 맡기는 것이 편안하다.",
    category: "submissive",
  },
  {
    id: 7,
    text: "상대방의 지시를 따르는 것에서 안정감을 느낀다.",
    category: "submissive",
  },
  {
    id: 8,
    text: "나는 상대방을 기쁘게 하는 것에 큰 보람을 느낀다.",
    category: "submissive",
  },
  {
    id: 9,
    text: "누군가에게 의지하고 보호받는 느낌이 좋다.",
    category: "submissive",
  },
  {
    id: 10,
    text: "상대방이 정한 규칙을 따르는 것이 자연스럽다.",
    category: "submissive",
  },

  // Sadism 성향 질문 (5개)
  {
    id: 11,
    text: "상대방의 반응을 이끌어내는 것을 즐긴다.",
    category: "sadism",
  },
  {
    id: 12,
    text: "상대방을 적절히 긴장하게 만드는 것이 흥미롭다.",
    category: "sadism",
  },
  {
    id: 13,
    text: "상대방의 한계를 탐색하는 것에 관심이 있다.",
    category: "sadism",
  },
  {
    id: 14,
    text: "상대방이 나로 인해 강한 감정을 느낄 때 만족스럽다.",
    category: "sadism",
  },
  {
    id: 15,
    text: "상대방에게 약간의 자극을 주는 것을 즐긴다.",
    category: "sadism",
  },

  // Masochism 성향 질문 (5개)
  {
    id: 16,
    text: "강렬한 감각 경험에 끌린다.",
    category: "masochism",
  },
  {
    id: 17,
    text: "적당한 긴장감이나 압박감에서 흥분을 느낀다.",
    category: "masochism",
  },
  {
    id: 18,
    text: "극복해야 할 도전이 있을 때 더 몰입하게 된다.",
    category: "masochism",
  },
  {
    id: 19,
    text: "강한 자극 후에 오는 해방감을 좋아한다.",
    category: "masochism",
  },
  {
    id: 20,
    text: "자신의 한계를 시험하는 경험에 흥미가 있다.",
    category: "masochism",
  },

  // Switch 성향 질문 (5개)
  {
    id: 21,
    text: "상황에 따라 주도하거나 따르는 역할 모두 즐긴다.",
    category: "switch",
  },
  {
    id: 22,
    text: "역할을 바꿔가며 다양한 경험을 하고 싶다.",
    category: "switch",
  },
  {
    id: 23,
    text: "상대방에 따라 나의 역할이 자연스럽게 바뀐다.",
    category: "switch",
  },
  {
    id: 24,
    text: "한 가지 역할에만 고정되는 것이 답답하게 느껴진다.",
    category: "switch",
  },
  {
    id: 25,
    text: "주도권의 주고받음 자체가 흥미롭다.",
    category: "switch",
  },
];

export type BdsmAnswerValue = 1 | 2 | 3 | 4 | 5;

export const bdsmAnswerOptions: { value: BdsmAnswerValue; label: string }[] = [
  { value: 1, label: "전혀 아니다" },
  { value: 2, label: "아니다" },
  { value: 3, label: "보통이다" },
  { value: 4, label: "그렇다" },
  { value: 5, label: "매우 그렇다" },
];

export interface BdsmResult {
  dominant: number;
  submissive: number;
  sadism: number;
  masochism: number;
  switch: number;
}

export const bdsmTraitDescriptions: Record<string, { name: string; description: string }> = {
  dominant: {
    name: "도미넌트 (Dominant)",
    description: "관계에서 주도권을 가지고 이끄는 것을 선호합니다. 상대방을 보호하고 돌보며, 결정을 내리고 방향을 제시하는 역할에서 만족감을 느낍니다.",
  },
  submissive: {
    name: "서브미시브 (Submissive)",
    description: "신뢰하는 상대에게 주도권을 맡기는 것에서 편안함을 느낍니다. 상대방을 기쁘게 하고 그들의 기대에 부응하는 것에서 보람을 찾습니다.",
  },
  sadism: {
    name: "새디스트 (Sadist)",
    description: "상대방에게 자극을 주고 그 반응을 관찰하는 것을 즐깁니다. 상대의 한계를 탐색하고 강렬한 감정을 이끌어내는 것에 관심이 있습니다.",
  },
  masochism: {
    name: "마조히스트 (Masochist)",
    description: "강렬한 감각 경험과 도전적인 상황에 끌립니다. 자신의 한계를 시험하고 그 과정에서 오는 해방감을 즐깁니다.",
  },
  switch: {
    name: "스위치 (Switch)",
    description: "상황과 상대에 따라 주도적인 역할과 따르는 역할을 유연하게 오갑니다. 다양한 역할 경험을 통해 풍부한 관계 역동을 즐깁니다.",
  },
};
