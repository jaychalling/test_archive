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

// All combinations of 5 languages: C(5,2) = 10 combinations
// 3 questions per combination = 30 total questions
export const loveLanguageQuestions: LoveLanguageQuestion[] = [
  // Words of Affirmation vs Acts of Service (3)
  {
    id: 1,
    optionA: {
      text: "Hearing words of praise and encouragement",
      language: "wordsOfAffirmation",
    },
    optionB: {
      text: "Having someone do tasks for me",
      language: "actsOfService",
    },
  },
  {
    id: 2,
    optionA: {
      text: "Frequently hearing 'I love you' or 'Thank you'",
      language: "wordsOfAffirmation",
    },
    optionB: {
      text: "Getting help with housework when I'm tired",
      language: "actsOfService",
    },
  },
  {
    id: 3,
    optionA: {
      text: "Having my efforts recognized and praised",
      language: "wordsOfAffirmation",
    },
    optionB: {
      text: "Having food prepared for me when I'm busy",
      language: "actsOfService",
    },
  },

  // Words of Affirmation vs Receiving Gifts (3)
  {
    id: 4,
    optionA: {
      text: "Being told that I'm special",
      language: "wordsOfAffirmation",
    },
    optionB: {
      text: "Receiving a meaningful gift",
      language: "receivingGifts",
    },
  },
  {
    id: 5,
    optionA: {
      text: "Receiving words of support and encouragement",
      language: "wordsOfAffirmation",
    },
    optionB: {
      text: "Receiving a surprise gift on anniversaries",
      language: "receivingGifts",
    },
  },
  {
    id: 6,
    optionA: {
      text: "Receiving a heartfelt thank-you letter",
      language: "wordsOfAffirmation",
    },
    optionB: {
      text: "Receiving a small gift chosen just for me",
      language: "receivingGifts",
    },
  },

  // Words of Affirmation vs Quality Time (3)
  {
    id: 7,
    optionA: {
      text: "Being told good things about me",
      language: "wordsOfAffirmation",
    },
    optionB: {
      text: "Spending time alone together",
      language: "qualityTime",
    },
  },
  {
    id: 8,
    optionA: {
      text: "Being told that they're proud of me",
      language: "wordsOfAffirmation",
    },
    optionB: {
      text: "Taking a walk and having a conversation together",
      language: "qualityTime",
    },
  },
  {
    id: 9,
    optionA: {
      text: "Receiving encouraging text messages",
      language: "wordsOfAffirmation",
    },
    optionB: {
      text: "Spending time watching a movie together",
      language: "qualityTime",
    },
  },

  // Words of Affirmation vs Physical Touch (3)
  {
    id: 10,
    optionA: {
      text: "Hearing 'You're really amazing'",
      language: "wordsOfAffirmation",
    },
    optionB: {
      text: "Receiving a warm hug",
      language: "physicalTouch",
    },
  },
  {
    id: 11,
    optionA: {
      text: "Hearing comforting words when struggling",
      language: "wordsOfAffirmation",
    },
    optionB: {
      text: "Having my hand held tightly",
      language: "physicalTouch",
    },
  },
  {
    id: 12,
    optionA: {
      text: "Being told my strengths",
      language: "wordsOfAffirmation",
    },
    optionB: {
      text: "Getting a pat on the shoulder",
      language: "physicalTouch",
    },
  },

  // Acts of Service vs Receiving Gifts (3)
  {
    id: 13,
    optionA: {
      text: "Having my car washed for me",
      language: "actsOfService",
    },
    optionB: {
      text: "Receiving a gift that shows they remembered what I like",
      language: "receivingGifts",
    },
  },
  {
    id: 14,
    optionA: {
      text: "Being taken care of when sick",
      language: "actsOfService",
    },
    optionB: {
      text: "Receiving flowers or a cake",
      language: "receivingGifts",
    },
  },
  {
    id: 15,
    optionA: {
      text: "Getting help with complicated tasks",
      language: "actsOfService",
    },
    optionB: {
      text: "Receiving a souvenir from a trip",
      language: "receivingGifts",
    },
  },

  // Acts of Service vs Quality Time (3)
  {
    id: 16,
    optionA: {
      text: "Having someone carry my bags",
      language: "actsOfService",
    },
    optionB: {
      text: "Doing a hobby activity together",
      language: "qualityTime",
    },
  },
  {
    id: 17,
    optionA: {
      text: "Having someone keep track of my schedule",
      language: "actsOfService",
    },
    optionB: {
      text: "Talking on the phone or video call",
      language: "qualityTime",
    },
  },
  {
    id: 18,
    optionA: {
      text: "Having breakfast prepared for me",
      language: "actsOfService",
    },
    optionB: {
      text: "Having dinner together and talking",
      language: "qualityTime",
    },
  },

  // Acts of Service vs Physical Touch (3)
  {
    id: 19,
    optionA: {
      text: "Getting a massage when tired",
      language: "actsOfService",
    },
    optionB: {
      text: "Having my hair stroked affectionately",
      language: "physicalTouch",
    },
  },
  {
    id: 20,
    optionA: {
      text: "Being driven to appointments",
      language: "actsOfService",
    },
    optionB: {
      text: "Being greeted with a hug when meeting",
      language: "physicalTouch",
    },
  },
  {
    id: 21,
    optionA: {
      text: "Having my room cleaned for me",
      language: "actsOfService",
    },
    optionB: {
      text: "Sitting next to each other arm in arm",
      language: "physicalTouch",
    },
  },

  // Receiving Gifts vs Quality Time (3)
  {
    id: 22,
    optionA: {
      text: "Receiving a special gift on my birthday",
      language: "receivingGifts",
    },
    optionB: {
      text: "Celebrating my birthday by spending time together",
      language: "qualityTime",
    },
  },
  {
    id: 23,
    optionA: {
      text: "Receiving a gift chosen just for me",
      language: "receivingGifts",
    },
    optionB: {
      text: "Having their complete attention focused on me",
      language: "qualityTime",
    },
  },
  {
    id: 24,
    optionA: {
      text: "Receiving something I've been wanting",
      language: "receivingGifts",
    },
    optionB: {
      text: "Going on a trip together",
      language: "qualityTime",
    },
  },

  // Receiving Gifts vs Physical Touch (3)
  {
    id: 25,
    optionA: {
      text: "Receiving a handmade gift",
      language: "receivingGifts",
    },
    optionB: {
      text: "Being held warmly",
      language: "physicalTouch",
    },
  },
  {
    id: 26,
    optionA: {
      text: "Receiving an unexpected surprise gift",
      language: "receivingGifts",
    },
    optionB: {
      text: "Walking while holding hands",
      language: "physicalTouch",
    },
  },
  {
    id: 27,
    optionA: {
      text: "Receiving a small gift bought while thinking of me",
      language: "receivingGifts",
    },
    optionB: {
      text: "Receiving a light kiss",
      language: "physicalTouch",
    },
  },

  // Quality Time vs Physical Touch (3)
  {
    id: 28,
    optionA: {
      text: "Having a conversation together at a cafe",
      language: "qualityTime",
    },
    optionB: {
      text: "Leaning on each other on the couch",
      language: "physicalTouch",
    },
  },
  {
    id: 29,
    optionA: {
      text: "Going out to eat delicious food together",
      language: "qualityTime",
    },
    optionB: {
      text: "Receiving a warm hug when saying goodbye",
      language: "physicalTouch",
    },
  },
  {
    id: 30,
    optionA: {
      text: "Sharing a special experience together",
      language: "qualityTime",
    },
    optionB: {
      text: "Being comforted with a hug",
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
    name: "Words of Affirmation",
    nameEn: "Words of Affirmation",
    description: "Expresses and feels love through praise, encouragement, and words of appreciation. A heartfelt word can be a great source of strength.",
    characteristics: [
      "Deeply moved by words of praise and encouragement",
      "Sensitive to criticism or negative words",
      "Values expressions of gratitude",
      "Gains courage from words of support and encouragement",
    ],
    tips: "Give sincere compliments often and express gratitude. Encouraging texts or handwritten letters are also great.",
    detailedDescription: "Words of Affirmation is one of Dr. Gary Chapman's '5 Love Languages,' a way of giving and receiving love through verbal expression. People with this love language experience deep emotional connection through praise, encouragement, appreciation, and words of affection. Conversely, criticism, dismissal, and negative words can be deeply hurtful to them. This type doesn't just want to hear what they want to hear, but gains the assurance of being loved through genuine verbal expressions. This love language can be expressed in various forms such as texts, letters, conversations, and public compliments.",
    scientificBackground: "The concept of love languages was presented by Dr. Gary Chapman in his 1992 book 'The 5 Love Languages,' based on over 30 years of marriage counseling experience. Language is a fundamental tool for human connection, and positive language neurologically promotes the release of dopamine and oxytocin. Research shows that the ratio of positive to negative interactions between couples (Gottman ratio) is strongly correlated with relationship satisfaction. Words of affirmation positively affect self-esteem, attachment security, and relationship satisfaction. Developmentally, people who received more verbal encouragement in childhood tend to value this love language more.",
    expressionMethods: [
      "Give specific and sincere compliments often",
      "Write gratitude journals or letters",
      "Praise your partner publicly",
      "Give encouraging words during difficult times",
      "Say 'I love you' frequently"
    ],
    recognitionSigns: [
      "Visibly happy when complimented",
      "Deeply hurt by critical words",
      "Remembers compliments received long ago",
      "Frequently expresses gratitude",
      "Enjoys expressing affection through SNS or texts"
    ],
    partnershipTips: [
      "Present positive feedback before criticism",
      "Tell your partner one good thing about them every day",
      "Speak positively about your partner in public",
      "Avoid personal attacks even during conflicts",
      "Try writing handwritten letters for special occasions"
    ],
  },
  actsOfService: {
    name: "Acts of Service",
    nameEn: "Acts of Service",
    description: "Expresses and feels love through actions for the other person. Showing through actions rather than words is important.",
    characteristics: [
      "Feels loved when someone does something for them",
      "Appreciates help when needed",
      "Values keeping promises",
      "Moved by small thoughtful actions",
    ],
    tips: "Do things that lighten your partner's load. Helping with housework, running errands - practical help is an expression of love.",
    detailedDescription: "Acts of Service is a way of expressing and feeling love through actions. Like the saying 'actions speak louder than words,' people with this love language feel deep love when someone does something for them. This can range from simple household chores to solving complex problems. What matters is the intention to lighten the other person's burden and make their life easier. Conversely, not keeping promises or being indifferent when help is needed is a big disappointment to them. Because service involves investing time, energy, and effort, the love received through it feels very meaningful.",
    scientificBackground: "The love language of service has evolutionary psychological foundations in reciprocity and cooperation. Humans have survived as social animals through mutual help. Care through action promotes oxytocin release, which strengthens trust and bonding. Research shows that fairness in household division between couples is closely related to relationship satisfaction. Additionally, the language of service is particularly important for those who want 'proof of love,' because while words are easy to say, actions require sincerity. From an attachment theory perspective, consistent caring behavior contributes to forming secure attachment.",
    expressionMethods: [
      "Take over your partner's tasks",
      "Prepare breakfast or coffee",
      "Care for and look after them when they're sick",
      "Handle complicated matters (administrative, technical) for them",
      "Anticipate what help they need based on their schedule"
    ],
    recognitionSigns: [
      "Deeply moved when someone helps them",
      "Often says 'show me through actions'",
      "Considers keeping promises very important",
      "Expresses love by providing practical help",
      "Disappointed by laziness or indifference"
    ],
    partnershipTips: [
      "Ask first: 'Is there anything I can help with?'",
      "Always keep your promises",
      "Actively help when your partner is struggling",
      "Share household chores fairly",
      "Check what way your partner wants help before providing it"
    ],
  },
  receivingGifts: {
    name: "Receiving Gifts",
    nameEn: "Receiving Gifts",
    description: "Expresses and feels love through meaningful gifts. The thought and meaning behind the gift matters more than its price.",
    characteristics: [
      "Reads the heart and thoughtfulness in gifts",
      "Values anniversaries and special days",
      "Remembers and cherishes even small gifts for a long time",
      "Feels the other person is thinking of them through gifts",
    ],
    tips: "Prepare small gifts even when it's not a special day. Remembering what they like and giving it as a gift is even better.",
    detailedDescription: "Receiving Gifts is a language of feeling love through material expression. This is different from materialism. For people with this love language, gifts are 'symbols of love.' It's not about the price but the thought, effort, and care behind it. The very fact that someone thought of them and chose something becomes proof of love. They cherish gifts for a long time, and whenever they see them, they recall the feeling of being loved. Conversely, forgetting anniversaries or being indifferent to gifts can be received as the message 'I'm not important.'",
    scientificBackground: "Gift-giving is one of the oldest forms of social bonding in human history. Anthropologically, gift exchange was a key mechanism for forming and maintaining relationships (Marcel Mauss's 'The Gift' research). Neurologically, the reward center is activated when receiving a gift, and dopamine is released. Interestingly, similar brain responses occur when giving gifts as well. Research shows the value of a gift comes not from its monetary value but from the 'thought value' indicating how well the other person understands them. Seeing gifts as physical 'tokens of love' is the core of this love language.",
    expressionMethods: [
      "Make notes of what they want during regular times",
      "Give small gifts not just on anniversaries but in daily life",
      "Bring souvenirs when traveling",
      "Prepare handmade gifts",
      "Say 'I bought this thinking of you'"
    ],
    recognitionSigns: [
      "Cherishes and treasures gifts for a long time",
      "Very happy and moved when receiving gifts",
      "Considers anniversaries and special days important",
      "Often gives gifts to others too",
      "Often talks about gifts they've received"
    ],
    partnershipTips: [
      "Don't forget anniversaries - mark them on your calendar in advance",
      "It doesn't have to be expensive. Thoughtfulness and care are enough",
      "Make notes of what your partner likes and wants during regular times",
      "Surprise gifts create big impressions",
      "Explain the meaning and reason when giving a gift"
    ],
  },
  qualityTime: {
    name: "Quality Time",
    nameEn: "Quality Time",
    description: "Expresses and feels love through time spent fully together. Focused attention and shared experiences are important.",
    characteristics: [
      "Feels loved simply by spending time together",
      "May feel left out if the other person is distracted",
      "Values shared activities and conversation",
      "Likes talking while making eye contact",
    ],
    tips: "Put down your phone and focus fully during time together. Plan activities you can do together.",
    detailedDescription: "Quality Time is a language of feeling love through complete attention and presence. 'Being together' and 'doing things together' are different. For people with this love language, having someone's full attention is the greatest expression of love. This can take many forms: having conversations, taking walks, traveling, sharing hobbies. What matters is not 'being in the same space' but 'sharing an experience.' Conversely, looking only at your phone during a meeting, being distracted by other things, or frequently canceling plans are deeply hurtful to them.",
    scientificBackground: "The importance of quality time is based on the fundamental human need for social connection. Neuroscience research shows that focused social interaction promotes oxytocin release and reduces stress hormones. 'Focused attention' conveys the message 'you are important' to the other person. John Gottman's research found that 'turning toward'—responding to a partner's bids for connection—is a key predictor of relationship success. In the age of digital distraction, the value of quality time has increased even more. Research shows that using phones during mealtimes decreases relationship satisfaction.",
    expressionMethods: [
      "Find hobbies you can do together",
      "Make eye contact and listen during conversations",
      "Put down your phone during time together",
      "Create regular date time",
      "Try new experiences together"
    ],
    recognitionSigns: [
      "Often suggests spending time together",
      "Gets upset if the other person is distracted during conversation",
      "Often talks about memories shared together",
      "Very disappointed by canceled plans",
      "Enjoys planning activities to do together"
    ],
    partnershipTips: [
      "Focus fully during time together",
      "Create regular 'our time'",
      "Try new activities you can do together",
      "Listen and make eye contact during conversation",
      "Even if busy, be fully present for even a short time"
    ],
  },
  physicalTouch: {
    name: "Physical Touch",
    nameEn: "Physical Touch",
    description: "Expresses and feels love through physical contact. Hugs, holding hands, and warm touch bring great comfort.",
    characteristics: [
      "Feels secure through hugs or holding hands",
      "May feel left out if physically distant",
      "Finds even light touches very meaningful",
      "A hug is a great comfort when struggling",
    ],
    tips: "Hug often and hold hands. Touching lightly or leaning on each other during conversation is also good.",
    detailedDescription: "Physical Touch is a language of feeling and expressing love through physical contact. For people with this love language, warm hugs, holding hands, patting shoulders, and leaning gently are love messages more powerful than words. Physical touch doesn't only mean sexual contact. Affectionate touches in daily life are more important. For them, physical contact provides feelings of safety, connection, and belonging. Conversely, physical distance, rejection of touch, or avoidance can feel like deep rejection. When struggling or sad, a warm hug is more comforting than words.",
    scientificBackground: "The importance of physical contact has strong scientific evidence. Harry Harlow's monkey experiments showed that contact comfort is a basic need. Touch promotes the release of oxytocin, called the 'love hormone,' and reduces cortisol, the stress hormone. Research shows that regular hugging lowers blood pressure and strengthens immune function. Just as 'kangaroo care' (skin contact) is important for newborn development, physical touch is essential for emotional stability in adults too. Some research suggests eight hugs a day is ideal for emotional health (Virginia Satir). Skin is the largest sensory organ in the body and conveys rich emotional information through touch.",
    expressionMethods: [
      "Hug frequently",
      "Walk while holding hands",
      "Touch lightly during conversation",
      "Lean on each other on the couch",
      "Give a hug when saying hello and goodbye"
    ],
    recognitionSigns: [
      "Initiates physical contact",
      "Gets anxious when physically distant",
      "Visibly relaxes when hugged",
      "Asks to be held when struggling",
      "Tries to stay close when together"
    ],
    partnershipTips: [
      "Touch often in daily life (shoulder, arm, etc.)",
      "Hug when parting and meeting",
      "Lean on each other when watching TV",
      "Make holding hands while walking a habit",
      "Understand your partner's preferences for physical touch"
    ],
  },
};
