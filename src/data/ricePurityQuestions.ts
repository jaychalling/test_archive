export interface ScoreRangeInfo {
  minScore: number;
  maxScore: number;
  title: string;
  titleKo: string;
  emoji: string;
  description: string;
  detailedDescription: string;
  interpretation: string;
  commonCharacteristics: string[];
  lifestyleTips: string[];
  color: string;
}

export const scoreRanges: ScoreRangeInfo[] = [
  {
    minScore: 97,
    maxScore: 100,
    title: "Pure as Snow",
    titleKo: "순수한 영혼",
    emoji: "😇",
    description: "당신은 정말 순수하군요!",
    detailedDescription: "97-100점대의 점수는 Rice Purity Test에서 매우 드문 결과입니다. 이 점수대에 해당하는 사람들은 대부분의 경험을 아직 하지 않았으며, 매우 보수적이거나 젊은 연령대인 경우가 많습니다. 이 점수는 당신이 조심스럽고 신중한 성격을 가지고 있으며, 사회적 압력에 쉽게 흔들리지 않는다는 것을 나타낼 수 있습니다. Rice Purity Test는 1924년 라이스 대학교에서 처음 만들어진 이후, 대학 신입생들 사이에서 아이스브레이킹 도구로 사용되어 왔습니다. 높은 점수는 '순수함'을 의미하지만, 이것이 좋거나 나쁘다는 판단을 내리는 것이 아닙니다.",
    interpretation: "높은 점수는 당신이 자신만의 페이스로 인생을 살아가고 있다는 것을 보여줍니다. 경험의 양보다 질이 중요하며, 당신이 준비되었을 때 새로운 경험을 해도 늦지 않습니다. 자신의 가치관과 경계를 명확히 하는 것은 건강한 자아 존중감의 표시입니다.",
    commonCharacteristics: [
      "신중하고 계획적인 성격",
      "강한 자기 통제력",
      "명확한 개인적 가치관 보유",
      "사회적 압력에 쉽게 흔들리지 않음",
      "가까운 관계에서 깊은 연결 추구"
    ],
    lifestyleTips: [
      "자신의 페이스를 유지하세요",
      "새로운 경험에 열린 마음을 가지되, 강요받지 마세요",
      "자신의 가치관을 존중하는 사람들과 시간을 보내세요",
      "경험보다 관계의 질에 집중하세요",
      "호기심이 생기면 안전하게 탐색해도 괜찮습니다"
    ],
    color: "emerald"
  },
  {
    minScore: 94,
    maxScore: 96,
    title: "Very Pure",
    titleKo: "매우 순수함",
    emoji: "😊",
    description: "매우 깨끗한 영혼의 소유자입니다.",
    detailedDescription: "94-96점대는 여전히 매우 높은 순수도 점수입니다. 이 범위에 속하는 사람들은 몇 가지 가벼운 경험만을 했을 가능성이 높습니다. 아마도 기본적인 연애 경험(손잡기, 데이트)이나 일부 사회적 활동(파티 참석 정도)을 경험했을 수 있습니다. 이 점수는 당신이 여전히 많은 첫 경험들을 앞에 두고 있으며, 인생의 다양한 측면을 천천히 탐색하고 있다는 것을 나타냅니다. 대학 환경에서 이 점수는 신입생들 사이에서 흔히 볼 수 있습니다.",
    interpretation: "이 점수는 당신이 자신의 경계를 잘 지키면서도 일부 사회적 경험에는 열려 있다는 것을 보여줍니다. 인생은 마라톤이지 단거리 달리기가 아닙니다. 자신에게 맞는 속도로 새로운 경험을 탐색하는 것이 중요합니다.",
    commonCharacteristics: [
      "기본적인 사회적 경험 보유",
      "자기 경계를 잘 지키는 성격",
      "신중한 의사결정 스타일",
      "친밀한 관계 형성에 시간을 들이는 편",
      "전통적인 가치관 유지"
    ],
    lifestyleTips: [
      "편안한 속도로 새로운 경험을 시도하세요",
      "신뢰할 수 있는 사람들과 함께 새로운 것을 경험하세요",
      "자신의 한계를 존중하면서도 성장의 기회를 열어두세요",
      "사회적 압력에 굴복하지 마세요",
      "자신의 선택에 자신감을 가지세요"
    ],
    color: "green"
  },
  {
    minScore: 77,
    maxScore: 93,
    title: "Average",
    titleKo: "평균적",
    emoji: "🙂",
    description: "평범한 경험을 가지고 있네요.",
    detailedDescription: "77-93점대는 Rice Purity Test에서 가장 흔한 점수 범위입니다. 대부분의 사람들이 이 범위에 속하며, 이는 평균적인 삶의 경험을 나타냅니다. 연애, 음주, 파티 참석 등 일반적인 사회적 경험을 했지만, 극단적인 경험은 피해온 경우가 많습니다. 이 점수대의 사람들은 일반적으로 건강한 호기심과 적절한 자기 통제력 사이에서 균형을 잡고 있습니다. 대학 생활이나 젊은 성인기의 전형적인 경험들을 반영하는 점수입니다.",
    interpretation: "이 점수는 당신이 균형 잡힌 삶을 살고 있다는 것을 보여줍니다. 새로운 경험에 열려 있으면서도 무모하지 않은 선택을 해왔습니다. 이것은 많은 사람들이 공유하는 경험 수준이며, 사회적으로 건강한 발달을 나타냅니다.",
    commonCharacteristics: [
      "균형 잡힌 사회 생활",
      "적절한 위험 감수 능력",
      "다양한 친구 관계 유지",
      "일반적인 대학/청년 경험 보유",
      "호기심과 신중함의 균형"
    ],
    lifestyleTips: [
      "지금까지의 균형을 유지하세요",
      "새로운 경험을 할 때는 안전을 최우선으로 하세요",
      "자신의 가치관에 맞는 선택을 계속하세요",
      "또래 압력에 무비판적으로 따르지 마세요",
      "경험의 질에 집중하세요"
    ],
    color: "blue"
  },
  {
    minScore: 45,
    maxScore: 76,
    title: "Experienced",
    titleKo: "경험 많음",
    emoji: "😏",
    description: "꽤 다양한 경험을 해보셨군요.",
    detailedDescription: "45-76점대는 평균 이상의 다양한 경험을 가진 사람들의 범위입니다. 이 점수대에 해당하는 사람들은 연애, 성적 경험, 파티 문화, 때로는 약물이나 알코올 관련 경험까지 다양한 삶의 측면을 탐색해 왔습니다. 이 점수는 당신이 호기심이 많고 새로운 경험에 열려 있다는 것을 나타냅니다. 대학 시절이나 20대 초반에 활발한 사회 생활을 한 사람들에게서 흔히 볼 수 있는 점수입니다.",
    interpretation: "다양한 경험은 삶을 풍요롭게 만들 수 있지만, 모든 경험이 긍정적인 것은 아닙니다. 이 점수는 당신이 다양한 상황을 경험해봤음을 나타내며, 이러한 경험들이 당신을 더 현명하게 만들었을 수 있습니다. 중요한 것은 과거의 경험에서 배우고 성장하는 것입니다.",
    commonCharacteristics: [
      "활발한 사회 생활 경험",
      "다양한 인간관계 경험",
      "위험 감수에 상대적으로 열린 태도",
      "파티 문화에 익숙함",
      "새로운 경험에 대한 호기심"
    ],
    lifestyleTips: [
      "경험에서 얻은 교훈을 되새겨보세요",
      "앞으로의 선택에서 더 신중해져도 괜찮습니다",
      "건강한 관계와 습관을 우선시하세요",
      "자신의 경험을 부끄러워하지 마세요",
      "미래를 위한 건강한 목표를 세우세요"
    ],
    color: "amber"
  },
  {
    minScore: 9,
    maxScore: 44,
    title: "Wild One",
    titleKo: "자유로운 영혼",
    emoji: "🔥",
    description: "자유로운 영혼이시네요!",
    detailedDescription: "9-44점대는 매우 다양하고 광범위한 경험을 가진 사람들의 범위입니다. 이 점수는 당신이 삶의 많은 측면을 탐색해 왔으며, 일반적인 경험의 범위를 훨씬 넘어섰다는 것을 나타냅니다. 연애, 성적 경험, 파티, 약물 사용 등 다양한 영역에서 광범위한 경험을 했을 가능성이 높습니다. 이러한 점수는 종종 모험심이 강하고, 사회적 규범에 덜 구속받는 성격을 나타냅니다.",
    interpretation: "높은 경험 수준은 삶을 다양한 관점에서 볼 수 있게 해주지만, 때로는 건강이나 관계에 영향을 미칠 수 있는 경험들도 포함됩니다. 중요한 것은 과거의 경험을 판단하지 않고, 앞으로 자신에게 좋은 선택을 하는 것입니다. 자기 성찰과 자기 돌봄을 실천하세요.",
    commonCharacteristics: [
      "모험심이 강함",
      "사회적 규범에 덜 구속됨",
      "다양한 사회적 환경에서의 경험",
      "위험 감수 성향이 높음",
      "열린 마음과 호기심"
    ],
    lifestyleTips: [
      "자신의 건강과 안전을 우선시하세요",
      "의미 있는 관계에 투자하세요",
      "과거 경험에서 배운 교훈을 소중히 하세요",
      "필요하다면 전문적인 도움을 구하는 것을 두려워하지 마세요",
      "자신에게 친절하고 자기 비판을 줄이세요"
    ],
    color: "orange"
  },
  {
    minScore: 0,
    maxScore: 8,
    title: "Legendary",
    titleKo: "전설적",
    emoji: "👑",
    description: "전설적인 경험의 소유자!",
    detailedDescription: "0-8점대는 Rice Purity Test에서 매우 드문 결과입니다. 이 점수는 거의 모든 테스트 항목에 '예'라고 답했음을 의미하며, 매우 광범위한 삶의 경험을 나타냅니다. 이 점수대에 해당하는 사람들은 극도로 다양한 경험을 해왔으며, 일반적인 삶의 경계를 많이 넘어섰습니다. 이러한 결과는 매우 드물며, 테스트 응답자의 극히 일부만이 이 범위에 속합니다.",
    interpretation: "이 점수는 판단의 대상이 아닙니다. 모든 경험은 우리 삶의 일부이며, 중요한 것은 그 경험에서 무엇을 배웠는지입니다. 과거의 경험이 어떠했든, 앞으로의 선택은 항상 당신의 것입니다. 자신을 돌보고, 필요하다면 지원을 구하고, 의미 있는 관계를 구축하는 데 집중하세요.",
    commonCharacteristics: [
      "매우 광범위한 삶의 경험",
      "사회적 규범을 넘어선 탐험",
      "높은 위험 감수 성향",
      "다양한 사회적 환경 경험",
      "전통적 경계에 구속받지 않음"
    ],
    lifestyleTips: [
      "자신의 신체적, 정신적 건강을 점검하세요",
      "지지적인 관계를 구축하고 유지하세요",
      "과거를 판단하지 말고 앞으로 나아가세요",
      "전문적인 상담이나 지원이 도움이 될 수 있습니다",
      "자신의 경험을 통해 다른 사람들을 도울 수 있는 방법을 생각해보세요"
    ],
    color: "red"
  }
];

export const getScoreRange = (score: number): ScoreRangeInfo => {
  return scoreRanges.find(range => score >= range.minScore && score <= range.maxScore) || scoreRanges[5];
};

// Rice Purity Test 역사와 배경
export const testBackground = {
  history: "Rice Purity Test는 1924년 미국 텍사스주 휴스턴에 위치한 라이스 대학교(Rice University)에서 처음 만들어졌습니다. 원래는 대학 신입생들이 서로를 알아가고 아이스브레이킹을 하기 위한 도구로 사용되었습니다. 100년이 넘는 역사를 가진 이 테스트는 시대에 따라 질문들이 수정되어 왔지만, 기본적인 형식은 유지되어 왔습니다.",
  purpose: "이 테스트의 목적은 개인의 경험을 측정하고 비교하는 것이 아니라, 자기 성찰의 도구로 사용하거나 친구들과 재미있는 대화를 나누기 위한 것입니다. 점수가 높거나 낮다고 해서 좋거나 나쁜 것이 아닙니다. 각자의 삶은 고유하며, 이 테스트는 단순히 다양한 경험의 스펙트럼을 보여주는 것입니다.",
  disclaimer: "Rice Purity Test는 과학적으로 검증된 심리 테스트가 아닙니다. 이것은 재미를 위한 자가 평가 도구이며, 결과를 심각하게 받아들이거나 자신이나 다른 사람을 판단하는 데 사용해서는 안 됩니다. 모든 사람의 삶의 경로는 다르며, 경험의 양이 사람의 가치를 결정하지 않습니다."
};

export const ricePurityQuestions = [
  "Held hands romantically?",
  "Been on a date?",
  "Been in a relationship?",
  "Danced without leaving room for Jesus?",
  "Kissed a non-family member?",
  "Kissed a non-family member on the lips?",
  "French kissed?",
  "French kissed in public?",
  "Kissed on the neck?",
  "Kissed horizontally?",
  "Given or received a hickey?",
  "Kissed or been kissed on the breast?",
  "Kissed someone below the belt?",
  "Kissed for more than two hours consecutively?",
  "Played a game involving stripping?",
  "Seen or been seen by another person in a sensual context?",
  "Masturbated?",
  "Masturbated to a picture or video?",
  "Masturbated while someone else was in the room?",
  "Been caught masturbating?",
  "Masturbated with an inanimate object?",
  "Seen or touched another person's private parts?",
  "Had your private parts seen or touched by another person?",
  "Seen or touched a private part over clothes?",
  "Sent a sexually explicit text or picture?",
  "Sent or received sexually explicit photographs?",
  "Engaged in sexually explicit activity over video chat?",
  "Cheated on a significant other during a relationship?",
  "Purchased contraceptives?",
  "Engaged in sexual activity while in a committed relationship?",
  "Showered with a member of the opposite sex?",
  "Gone through the motions of intercourse while fully dressed?",
  "Undressed or been undressed by a member of the opposite sex?",
  "Had a one-night stand?",
  "Had sexual intercourse?",
  "Had sexual intercourse three or more times in one night?",
  "Had sexual intercourse 10 or more times?",
  "Had sexual intercourse in four or more positions?",
  "Had sexual intercourse with a stranger?",
  "Had sexual intercourse in a public place?",
  "Had sexual intercourse in a pool or hot tub?",
  "Had sexual intercourse in a bed belonging to someone else?",
  "Had sexual intercourse while you or your partner's parents were home?",
  "Had sexual intercourse with a non-significant other?",
  "Had sexual intercourse in a car?",
  "Had sexual intercourse outdoors?",
  "Joined the Mile High Club?",
  "Participated in a threesome?",
  "Participated in an orgy?",
  "Had two or more distinct acts of sexual intercourse with two or more people within 24 hours?",
  "Had sexual intercourse with five or more partners?",
  "Been walked in on while engaging in a sexual act?",
  "Kicked a roommate out to engage in sexual activity?",
  "Engaged in sexual activity with a roommate present?",
  "Achieved orgasm with another person?",
  "Paid or been paid for a sexual act?",
  "Committed an act of voyeurism?",
  "Committed an act of incest?",
  "Engaged in sexual activity with a partner of the same sex?",
  "Had sexual intercourse with a virgin?",
  "Had sexual intercourse without a condom?",
  "Had a pregnancy scare?",
  "Impregnated someone or been impregnated?",
  "Paid for or provided money for an abortion?",
  "Had an STI or STD?",
  "Consumed alcohol?",
  "Played a drinking game?",
  "Been drunk?",
  "Faked sobriety to a parent or teacher?",
  "Had a hangover?",
  "Played beer pong?",
  "Done a keg stand?",
  "Shotgunned a beer?",
  "Been to a bar?",
  "Been to a club?",
  "Been kicked out of a bar or club?",
  "Been to a party?",
  "Had alcohol confiscated?",
  "Been arrested for an alcohol-related offense?",
  "Been present while a party was busted?",
  "Used tobacco?",
  "Used marijuana?",
  "Used a drug stronger than marijuana?",
  "Used methamphetamine, crack cocaine, PCP, horse tranquilizers, or heroin?",
  "Been high or drunk alone?",
  "Been to a rave?",
  "Hosted or attended a party where drugs were used?",
  "Been under the influence of alcohol or drugs at work or school?",
  "Used a fake ID?",
  "Been to a strip club?",
  "Been to a sex shop?",
  "Purchased items from a sex shop?",
  "Watched pornographic material?",
  "Committed a moving violation or been in an accident while under the influence?",
  "Been physically violent with another person?",
  "Vandalized property?",
  "Broken into a building?",
  "Stolen something?",
  "Spent a night in jail?",
  "Been convicted of a crime?",
];
