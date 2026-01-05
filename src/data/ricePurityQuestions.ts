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
    description: "You are truly pure!",
    detailedDescription: "A score of 97-100 is a very rare result on the Rice Purity Test. People in this score range have not yet had most experiences and are often very conservative or young. This score may indicate that you have a cautious and prudent personality and are not easily swayed by social pressure. The Rice Purity Test was first created at Rice University in 1924 and has since been used as an icebreaker among college freshmen. A high score signifies 'purity,' but this is not meant to judge whether that is good or bad.",
    interpretation: "A high score shows that you are living life at your own pace. Quality of experiences matters more than quantity, and it's never too late to try new experiences when you're ready. Having clear personal values and boundaries is a sign of healthy self-respect.",
    commonCharacteristics: [
      "Cautious and planful personality",
      "Strong self-control",
      "Clear personal values",
      "Not easily swayed by social pressure",
      "Seeks deep connections in close relationships"
    ],
    lifestyleTips: [
      "Maintain your own pace",
      "Keep an open mind to new experiences, but don't feel pressured",
      "Spend time with people who respect your values",
      "Focus on the quality of relationships rather than experiences",
      "It's okay to explore safely when curiosity arises"
    ],
    color: "emerald"
  },
  {
    minScore: 94,
    maxScore: 96,
    title: "Very Pure",
    titleKo: "매우 순수함",
    emoji: "😊",
    description: "You have a very clean soul.",
    detailedDescription: "A score of 94-96 is still a very high purity score. People in this range have likely only had a few light experiences. You may have had basic romantic experiences (holding hands, dating) or some social activities (attending parties). This score indicates that you still have many first experiences ahead of you and are slowly exploring various aspects of life. In a college setting, this score is commonly seen among freshmen.",
    interpretation: "This score shows that you keep your boundaries well while being open to some social experiences. Life is a marathon, not a sprint. It's important to explore new experiences at a pace that suits you.",
    commonCharacteristics: [
      "Basic social experiences",
      "Good at maintaining personal boundaries",
      "Cautious decision-making style",
      "Takes time to form intimate relationships",
      "Maintains traditional values"
    ],
    lifestyleTips: [
      "Try new experiences at a comfortable pace",
      "Experience new things with people you trust",
      "Keep open to growth opportunities while respecting your limits",
      "Don't give in to peer pressure",
      "Be confident in your choices"
    ],
    color: "green"
  },
  {
    minScore: 77,
    maxScore: 93,
    title: "Average",
    titleKo: "평균적",
    emoji: "🙂",
    description: "You have average experiences.",
    detailedDescription: "A score of 77-93 is the most common score range on the Rice Purity Test. Most people fall within this range, indicating average life experiences. You've had typical social experiences like dating, drinking, and attending parties, but have avoided extreme experiences. People in this score range generally balance healthy curiosity with appropriate self-control. This score reflects typical college or young adult experiences.",
    interpretation: "This score shows that you are living a balanced life. You've been open to new experiences while making sensible choices. This is a level of experience shared by many people and indicates healthy social development.",
    commonCharacteristics: [
      "Balanced social life",
      "Appropriate risk-taking ability",
      "Maintains diverse friendships",
      "Typical college/young adult experiences",
      "Balance between curiosity and caution"
    ],
    lifestyleTips: [
      "Maintain your current balance",
      "Prioritize safety when trying new experiences",
      "Continue making choices that align with your values",
      "Don't blindly follow peer pressure",
      "Focus on quality of experiences"
    ],
    color: "blue"
  },
  {
    minScore: 45,
    maxScore: 76,
    title: "Experienced",
    titleKo: "경험 많음",
    emoji: "😏",
    description: "You've had quite diverse experiences.",
    detailedDescription: "A score of 45-76 indicates above-average diverse experiences. People in this score range have explored various aspects of life including dating, sexual experiences, party culture, and sometimes drug or alcohol-related experiences. This score indicates that you are curious and open to new experiences. This score is commonly seen in people who had active social lives during college or their early twenties.",
    interpretation: "Diverse experiences can enrich life, but not all experiences are positive. This score indicates that you've experienced various situations, and these experiences may have made you wiser. What's important is learning and growing from past experiences.",
    commonCharacteristics: [
      "Active social life experience",
      "Diverse relationship experiences",
      "Relatively open attitude to risk-taking",
      "Familiar with party culture",
      "Curiosity about new experiences"
    ],
    lifestyleTips: [
      "Reflect on lessons learned from your experiences",
      "It's okay to become more cautious in future choices",
      "Prioritize healthy relationships and habits",
      "Don't be ashamed of your experiences",
      "Set healthy goals for the future"
    ],
    color: "amber"
  },
  {
    minScore: 9,
    maxScore: 44,
    title: "Wild One",
    titleKo: "자유로운 영혼",
    emoji: "🔥",
    description: "You're a free spirit!",
    detailedDescription: "A score of 9-44 indicates very diverse and extensive experiences. This score indicates that you have explored many aspects of life and have gone far beyond typical experiences. You likely have extensive experience in areas such as dating, sexual experiences, parties, and drug use. Such scores often indicate an adventurous personality that is less bound by social norms.",
    interpretation: "A high level of experience can help you see life from various perspectives, but sometimes includes experiences that may affect health or relationships. What's important is not judging past experiences, but making good choices for yourself going forward. Practice self-reflection and self-care.",
    commonCharacteristics: [
      "Strong adventurous spirit",
      "Less bound by social norms",
      "Experience in various social environments",
      "High risk-taking tendency",
      "Open mind and curiosity"
    ],
    lifestyleTips: [
      "Prioritize your physical and mental health",
      "Invest in meaningful relationships",
      "Cherish the lessons learned from past experiences",
      "Don't be afraid to seek professional help if needed",
      "Be kind to yourself and reduce self-criticism"
    ],
    color: "orange"
  },
  {
    minScore: 0,
    maxScore: 8,
    title: "Legendary",
    titleKo: "전설적",
    emoji: "👑",
    description: "A legendary experience holder!",
    detailedDescription: "A score of 0-8 is a very rare result on the Rice Purity Test. This score means you answered 'yes' to almost all test items, indicating very extensive life experiences. People in this score range have had extremely diverse experiences and have crossed many conventional life boundaries. Such results are very rare, and only a small fraction of test respondents fall within this range.",
    interpretation: "This score is not meant for judgment. All experiences are part of our lives, and what matters is what we learn from them. Whatever your past experiences, your future choices are always yours. Take care of yourself, seek support if needed, and focus on building meaningful relationships.",
    commonCharacteristics: [
      "Very extensive life experiences",
      "Exploration beyond social norms",
      "High risk-taking tendency",
      "Experience in various social environments",
      "Not bound by traditional boundaries"
    ],
    lifestyleTips: [
      "Check your physical and mental health",
      "Build and maintain supportive relationships",
      "Move forward without judging the past",
      "Professional counseling or support can help",
      "Think about how your experiences can help others"
    ],
    color: "red"
  }
];

export const getScoreRange = (score: number): ScoreRangeInfo => {
  return scoreRanges.find(range => score >= range.minScore && score <= range.maxScore) || scoreRanges[5];
};

// Rice Purity Test History and Background
export const testBackground = {
  history: "The Rice Purity Test was first created in 1924 at Rice University in Houston, Texas, USA. It was originally used as an icebreaker for college freshmen to get to know each other. With over 100 years of history, the test questions have been modified over time, but the basic format has been maintained.",
  purpose: "The purpose of this test is not to measure and compare individual experiences, but to use it as a tool for self-reflection or to have fun conversations with friends. Having a high or low score is neither good nor bad. Each person's life is unique, and this test simply shows the spectrum of various experiences.",
  disclaimer: "The Rice Purity Test is not a scientifically validated psychological test. It is a self-assessment tool for fun, and the results should not be taken seriously or used to judge yourself or others. Everyone's life path is different, and the amount of experience does not determine a person's worth."
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
