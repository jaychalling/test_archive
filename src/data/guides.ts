// Support-article cluster for topical authority.
// Each guide targets low-competition informational queries and funnels
// internal links to its money test page (hub-and-spoke).

export interface GuideSection {
  heading: string;
  paragraphs: string[];
}

export interface GuideFAQ {
  question: string;
  answer: string;
}

export interface Guide {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  category: string;
  readMinutes: number;
  datePublished: string;
  intro: string[];
  sections: GuideSection[];
  faqs: GuideFAQ[];
  cta: { testPath: string; testLabel: string; line: string };
  related: { to: string; label: string }[];
}

export const guides: Guide[] = [
  {
    slug: "rice-purity-score-meaning",
    title: "Rice Purity Score Meaning: Every Range Explained",
    seoTitle: "What Does Your Rice Purity Score Actually Mean?",
    seoDescription:
      "Most people misread their rice purity score. See what every range from 100 to 0 typically says about you — and why a low score isn't what you think.",
    category: "Rice Purity",
    readMinutes: 4,
    datePublished: "2026-06-12",
    intro: [
      "You took the test, you got a number — and now you are wondering whether your rice purity score is \"normal.\" The short answer: there is no good or bad score. The longer answer is that each range tends to say something different about where you are in life, and most people read their number far more judgmentally than it deserves.",
      "Your rice purity score starts at 100 and loses one point for every listed experience you have had. That means the score is really just a count of life experiences — not a measure of character, morality, or worth.",
    ],
    sections: [
      {
        heading: "The Score Ranges at a Glance",
        paragraphs: [
          "Scores of 97–100 are rare and usually belong to people who are young, highly focused on school or goals, or simply haven't had the opportunity for much of the list yet. Scores of 90–96 typically mean a careful, low-risk lifestyle with a few ordinary firsts — holding hands, a first kiss.",
          "The 70–89 band is where a large share of high-school and early-college takers land: some romantic experience, some rule-bending, nothing dramatic. Scores of 45–69 typically reflect a fairly standard college experience — parties, relationships, and a collection of stories.",
          "Below 45, the score mostly tells you that someone has lived widely — travel, nightlife, risk-taking, and experimentation. People in this range often report the test felt more like a highlight reel than a confession.",
        ],
      },
      {
        heading: "Why Your Score Drops With Age (and Why That's Fine)",
        paragraphs: [
          "Because the score is a running count of experiences, it can only go down over time — a 30-year-old with a 95 would be far more unusual than a 19-year-old with a 95. Comparing your score against people your own age is the only comparison that means anything.",
          "This is also why the same score reads differently in different contexts: an 80 at age 16 is typical, while an 80 at 25 suggests a deliberately cautious lifestyle. Neither is better — they are simply different paces.",
        ],
      },
      {
        heading: "What the Score Is Not",
        paragraphs: [
          "The rice purity test began at Rice University as an icebreaker, not an assessment. It is not a psychological instrument, it does not predict anything, and it was never designed to be scored competitively. Treat it as a conversation starter — that is the spirit it was written in.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is a low rice purity score bad?",
        answer:
          "No. A lower score simply means you have had more of the listed experiences. The test counts experiences — it does not measure character, judgment, or worth. Many people with low scores describe them as a record of a full, adventurous life.",
      },
      {
        question: "What is a normal rice purity score?",
        answer:
          "It depends almost entirely on age. Informal polls typically place many high schoolers in the 80s and 90s, college students anywhere from the 50s to the 80s, and adults lower still. Comparing against your own age group is the only meaningful comparison.",
      },
      {
        question: "Can my rice purity score go up?",
        answer:
          "No — the score counts experiences you have already had, so it can only stay the same or decrease over time. That is by design: it is a snapshot of your life so far, not a rating that you improve.",
      },
    ],
    cta: {
      testPath: "/test/rice-purity/",
      testLabel: "Take the Rice Purity Test",
      line: "Curious where you land? The classic 100 questions take about five minutes, and your answers never leave your device.",
    },
    related: [
      { to: "/guides/average-rice-purity-score/", label: "What Is the Average Rice Purity Score?" },
      { to: "/test/toxic-trait-test/", label: "Toxic Trait Test" },
      { to: "/test/mental-age-test/", label: "Mental Age Test" },
    ],
  },
  {
    slug: "average-rice-purity-score",
    title: "What Is the Average Rice Purity Score?",
    seoTitle: "Average Rice Purity Score — Are You Above or Below It?",
    seoDescription:
      "Most takers guess the average rice purity score wrong. See the commonly reported averages by age group and how your number really compares.",
    category: "Rice Purity",
    readMinutes: 4,
    datePublished: "2026-06-12",
    intro: [
      "The first thing almost everyone does after seeing their rice purity score is ask the same question: is that higher or lower than everyone else? Here is what the available numbers typically show — and why the \"average\" depends almost entirely on who you are comparing against.",
    ],
    sections: [
      {
        heading: "Commonly Reported Averages",
        paragraphs: [
          "There is no official statistics body for the rice purity test, so the best available picture comes from informal polls, college newspaper surveys, and large online threads where takers share results. Those sources tend to converge on a similar pattern: high schoolers often report averages in the 80s, college students commonly land somewhere in the 50s to 70s, and graduates report progressively lower numbers.",
          "The pattern matters more than any single number: the average drops steadily with age, because the score is a running count of life experiences that can only decrease. A \"low\" score for one age group is a typical score for the next.",
        ],
      },
      {
        heading: "Why Averages From Different Sources Disagree",
        paragraphs: [
          "Self-selected online polls skew toward people who found their result interesting enough to share — usually the very high and very low ends. Campus surveys capture a narrow age band. And because the test is anonymous and unverified, every number is self-reported. Treat any average you see — including the ranges above — as a rough landmark, not a benchmark.",
          "If you want a comparison that actually says something, compare against people your own age and stage of life. A 70 means something completely different at 16 than it does at 26.",
        ],
      },
      {
        heading: "Above Average, Below Average — Does It Matter?",
        paragraphs: [
          "The test was written as a dorm-room icebreaker, and the most useful thing it produces is conversation, not ranking. Scoring above the average typically reflects a more cautious or slower-paced lifestyle; scoring below it typically reflects more experiences, earlier. Both describe a pace — neither describes a person's value.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the average rice purity score for college students?",
        answer:
          "Informal college surveys and online polls most often report averages in the 50s to 70s for university students, though individual campuses and friend groups vary widely. All figures are self-reported, so treat them as rough landmarks.",
      },
      {
        question: "Is a rice purity score of 90+ rare?",
        answer:
          "Among adults, yes — scores above 90 typically belong to younger takers or people with deliberately cautious lifestyles. Among high schoolers, 90+ is common and entirely typical.",
      },
    ],
    cta: {
      testPath: "/test/rice-purity/",
      testLabel: "Take the Rice Purity Test",
      line: "Get your own number first — then the averages above will actually mean something.",
    },
    related: [
      { to: "/guides/rice-purity-score-meaning/", label: "Rice Purity Score Meaning: Every Range Explained" },
      { to: "/test/rice-purity/", label: "Rice Purity Test" },
      { to: "/test/love-language-test/", label: "Love Language Test" },
    ],
  },
  {
    slug: "political-compass-quadrants-explained",
    title: "The Four Political Compass Quadrants, Explained",
    seoTitle: "Which Political Compass Quadrant Are You In? All 4 Explained",
    seoDescription:
      "Auth-left, auth-right, lib-left, lib-right — what the four political compass quadrants actually mean, with the ideas and policies typical of each.",
    category: "Political Compass",
    readMinutes: 5,
    datePublished: "2026-06-12",
    intro: [
      "A political compass result is a dot in one of four quadrants — but the quadrant names confuse almost everyone at first. \"Libertarian left\" sounds like a contradiction until you see what the two axes separately measure. Here is a plain-language tour of all four quadrants and the thinking typical of each.",
      "Quick recap: the horizontal axis measures economic views (left = more redistribution and regulation, right = freer markets), while the vertical axis measures social views (authoritarian = more central authority and order, libertarian = more personal freedom). Your quadrant is just the combination of the two.",
    ],
    sections: [
      {
        heading: "Authoritarian Left (Top-Left)",
        paragraphs: [
          "This quadrant combines a state-led economy with strong central authority. Typical positions include public ownership of major industries, robust welfare programs, and the view that an active, powerful government is the best tool for achieving equality. Historical examples often cited for this quadrant include centrally planned states, though milder versions simply favor a strong managerial state.",
        ],
      },
      {
        heading: "Authoritarian Right (Top-Right)",
        paragraphs: [
          "Here free-market economics meets traditional order. Typical positions include low taxes and deregulation paired with strong national defense, law-and-order policy, and respect for traditional institutions. Many conventional conservative parties around the world sit somewhere in this quadrant's milder regions.",
        ],
      },
      {
        heading: "Libertarian Left (Bottom-Left)",
        paragraphs: [
          "This quadrant pairs economic egalitarianism with deep skepticism of authority — favoring cooperatives, community-level decision making, and expansive personal freedoms at the same time. People here typically want wealth shared more evenly but distrust large centralized states as the mechanism.",
        ],
      },
      {
        heading: "Libertarian Right (Bottom-Right)",
        paragraphs: [
          "The free-market quadrant in both senses: minimal government in the economy and in private life. Typical positions include low taxes, minimal regulation, strong property rights, and broad civil liberties. Classical liberals and libertarians land here.",
        ],
      },
      {
        heading: "Why Two People \"On the Right\" Can Disagree About Everything",
        paragraphs: [
          "The compass's whole point is that one line cannot hold modern politics. A libertarian-right voter and an authoritarian-right voter may share a tax policy and clash on everything else — surveillance, drug policy, speech. The same is true on the left. When your result surprises you, it is usually the vertical axis doing the surprising.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which political compass quadrant is the most common?",
        answer:
          "It varies by country and by how questions are phrased, so there is no single answer. Online test-taker populations tend to skew toward the libertarian half, while national electorates spread far more evenly. Treat quadrant membership as a description of views, not a popularity contest.",
      },
      {
        question: "Can I be close to the center?",
        answer:
          "Yes — many people land near the middle on one or both axes, which typically means mixed or pragmatic views rather than indecision. A centrist result is just as informative as a corner result.",
      },
      {
        question: "Is one quadrant correct?",
        answer:
          "No. The compass describes positions; it does not rank them. Reasonable people land in all four quadrants, and the test is a tool for understanding your own views, not for scoring them.",
      },
    ],
    cta: {
      testPath: "/test/political-compass-test/",
      testLabel: "Take the Political Compass Test",
      line: "Find your own quadrant — the quiz takes about five minutes and plots you on both axes instantly.",
    },
    related: [
      { to: "/guides/left-vs-right-political-spectrum/", label: "Left vs Right: What the Spectrum Actually Measures" },
      { to: "/test/moral-alignment-test/", label: "Moral Alignment Test" },
      { to: "/test/big-five-test/", label: "Big Five Personality Test" },
    ],
  },
  {
    slug: "left-vs-right-political-spectrum",
    title: "Left vs Right: What the Political Spectrum Actually Measures",
    seoTitle: "Left vs Right Politics — What the Spectrum Really Measures",
    seoDescription:
      "\"Left\" and \"right\" get used for everything from taxes to free speech. Here's what the economic spectrum actually measures — and what it can't.",
    category: "Political Compass",
    readMinutes: 4,
    datePublished: "2026-06-12",
    intro: [
      "\"Left\" and \"right\" are the oldest shorthand in politics — the terms date back to the seating chart of France's revolutionary assembly in 1789, where supporters of the king sat on the right and revolutionaries on the left. More than two centuries later, the words are stretched to cover taxes, immigration, religion, speech, and everything in between. That stretching is exactly why they confuse people.",
    ],
    sections: [
      {
        heading: "What Left and Right Originally Measure: Economics",
        paragraphs: [
          "In the political-compass framework, left versus right is strictly the economic axis. The economic left favors redistribution, regulation, public services, and collective ownership of key resources. The economic right favors free markets, private property, lower taxes, and competition as the main engine of prosperity.",
          "Most real-world positions are mixtures. Someone can support universal healthcare (economically left) and free trade (economically right) at the same time — that simply places them near the economic center.",
        ],
      },
      {
        heading: "What Left and Right Don't Measure: Authority and Freedom",
        paragraphs: [
          "Many of the loudest political fights — surveillance, drug policy, censorship, policing, lifestyle freedoms — are not economic at all. They live on a second axis: authoritarian versus libertarian. That is why a one-line spectrum keeps producing absurd results, like placing a free-speech libertarian and a traditionalist authoritarian at the same point because they share a tax policy.",
          "Two-axis models exist precisely to pull these apart. When people say \"I'm right-wing but socially liberal\" or \"left-wing but tough on crime,\" they are describing two different axes with one vocabulary.",
        ],
      },
      {
        heading: "How to Use the Labels Without Being Used by Them",
        paragraphs: [
          "Labels compress; compression loses information. \"Left\" and \"right\" remain useful as quick orientation, but the moment a conversation gets specific — what should taxes fund, who decides what can be said — the labels stop helping. Knowing your own coordinates on both axes typically explains your views better than any single word can.",
        ],
      },
    ],
    faqs: [
      {
        question: "Where do the terms left and right come from?",
        answer:
          "From the French National Assembly of 1789: supporters of the monarchy sat to the president's right, revolutionaries to the left. The seating chart became shorthand for conservative versus progressive politics and spread worldwide.",
      },
      {
        question: "Can someone be left on some issues and right on others?",
        answer:
          "Yes — most people are. Mixed positions usually mean your economic views and your social views point in different directions, which is exactly what two-axis models like the political compass are designed to show.",
      },
    ],
    cta: {
      testPath: "/test/political-compass-test/",
      testLabel: "Take the Political Compass Test",
      line: "See your own coordinates on both axes — economic and social — in about five minutes.",
    },
    related: [
      { to: "/guides/political-compass-quadrants-explained/", label: "The Four Political Compass Quadrants, Explained" },
      { to: "/test/political-compass-test/", label: "Political Compass Test" },
      { to: "/test/communication-style-test/", label: "Communication Style Test" },
    ],
  },
  {
    slug: "what-is-mental-age",
    title: "What Is Mental Age? How It's Estimated and What It Means",
    seoTitle: "What Is Mental Age? Why Yours Might Not Match Your Birthday",
    seoDescription:
      "Your mental age can sit decades away from your real age. What mental age means, how quizzes estimate it, and why an old or young result is good news either way.",
    category: "Mental Age",
    readMinutes: 4,
    datePublished: "2026-06-12",
    intro: [
      "Some 20-year-olds plan like accountants; some 50-year-olds buy a skateboard on a Tuesday. \"Mental age\" is the casual term for that gap — how old your mind feels and behaves, regardless of what your birth certificate says.",
      "The phrase has a long history: early intelligence researchers used \"mental age\" to compare children's test performance against age norms. Modern online quizzes use the words very differently — they estimate a personality-flavored age based on habits and attitudes, not intelligence. That is the version this guide covers.",
    ],
    sections: [
      {
        heading: "How a Mental Age Quiz Estimates Your Number",
        paragraphs: [
          "Quizzes like ours look at three broad signals. Maturity: how you handle responsibility, conflict, and other people's needs. Wisdom: how you weigh decisions, learn from mistakes, and think about the future. Playfulness: how much novelty, humor, and spontaneity you keep in daily life.",
          "Caution and planning push the estimate older; spontaneity and curiosity pull it younger. The result is a blend — which is why two people with the same birthday can land thirty years apart and both be answering honestly.",
        ],
      },
      {
        heading: "Old Soul or Young at Heart — Both Are Compliments",
        paragraphs: [
          "An older mental age typically signals reliability, foresight, and steadiness — the friend who books the restaurant and remembers the birthdays. A younger mental age typically signals openness, energy, and adaptability — the friend who suggests the road trip in the first place.",
          "Neither pattern is a problem, and most people drift between them depending on context: plenty of spreadsheet-brained professionals have a distinctly twelve-year-old sense of humor. The interesting part of the result is noticing which mode is your default.",
        ],
      },
      {
        heading: "What Mental Age Is Not",
        paragraphs: [
          "An online mental age quiz is not an IQ test, a clinical assessment, or a developmental measure. It cannot diagnose anything and it does not predict capability. It is a structured mirror: a fun way to see your own habits and attitudes from a new angle — and, usually, a very effective conversation starter.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is mental age the same as IQ?",
        answer:
          "No. The historical term \"mental age\" came from early intelligence testing, but modern online mental age quizzes measure personality-style traits — maturity, wisdom, playfulness — not cognitive ability. A mental age result says nothing about intelligence.",
      },
      {
        question: "Is it bad if my mental age is much older or younger than my real age?",
        answer:
          "Not at all. An older result typically reflects caution and reliability; a younger one typically reflects curiosity and spontaneity. Both come with real strengths, and results often shift as your life circumstances change.",
      },
      {
        question: "Can my mental age change over time?",
        answer:
          "Yes — because it reflects current habits and attitudes rather than a fixed trait, taking the quiz at different points in life often produces different results. Big life changes are the usual cause.",
      },
    ],
    cta: {
      testPath: "/test/mental-age-test/",
      testLabel: "Take the Mental Age Test",
      line: "Three minutes, instant result, and a comparison against your actual age.",
    },
    related: [
      { to: "/test/mental-age-test/", label: "Mental Age Test" },
      { to: "/test/16-personality-test/", label: "16 Personalities Test" },
      { to: "/test/emotional-intelligence-test/", label: "Emotional Intelligence Test" },
    ],
  },
  {
    slug: "big-five-vs-16-personalities",
    title: "Big Five vs 16 Personalities: Which Test Should You Take?",
    seoTitle: "Big Five vs 16 Personalities — Which Test Fits You Better?",
    seoDescription:
      "Researchers prefer one, the internet loves the other. How the Big Five and 16-personalities frameworks differ, where each shines, and which to take first.",
    category: "Personality",
    readMinutes: 5,
    datePublished: "2026-06-12",
    intro: [
      "The two most popular ways to map a personality could hardly be more different. One gives you a four-letter identity like INFJ; the other gives you five sliding scales and no label at all. Both are worth taking — but they answer different questions, and knowing the difference will save you from arguing with your own results.",
    ],
    sections: [
      {
        heading: "How the Two Frameworks Work",
        paragraphs: [
          "The 16-personalities approach (MBTI-style) sorts you into one side of each of four dichotomies — Introversion/Extraversion, Sensing/Intuition, Thinking/Feeling, Judging/Perceiving — and combines them into one of 16 types. Its output is an identity: a memorable four-letter code with a name and a tribe.",
          "The Big Five (OCEAN) scores you on five continuous traits — Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism — each as a percentile rather than a category. Its output is a profile: five numbers that locate you on five spectrums.",
        ],
      },
      {
        heading: "Where Each One Shines",
        paragraphs: [
          "The 16-type model wins on memorability and conversation. A four-letter code is easy to share, easy to compare with friends, and surprisingly good at sparking self-reflection. It is the better icebreaker and the better identity tool.",
          "The Big Five wins on precision. Because it never forces you to one side of a line, it captures the people dichotomies miss — the half-introvert, the moderately organized. Personality researchers overwhelmingly use the Big Five for exactly this reason: traits measured on spectrums track real-world outcomes more reliably than type labels.",
        ],
      },
      {
        heading: "The Borderline Problem",
        paragraphs: [
          "The biggest practical difference appears if you sit near the middle of any dimension. In a 16-type test, a 51/49 lean on Thinking versus Feeling flips your entire four-letter identity; on the Big Five, the same answers simply show as a mid-range score — which is the more honest description.",
          "This is why some people get a different MBTI-style type every time they test: they are not inconsistent, they are mid-spectrum. If that is you, the Big Five result will typically feel more stable and more accurate.",
        ],
      },
      {
        heading: "So Which Should You Take First?",
        paragraphs: [
          "Take both — they are short. If you want a shareable identity and a fun entry point, start with the 16 personalities test. If you want the more precise self-portrait, start with the Big Five. Comparing the two results against each other is often the most revealing exercise of all.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is the Big Five more accurate than 16 personalities?",
        answer:
          "Researchers generally consider the Big Five more scientifically robust because it measures traits on continuous spectrums rather than forcing binary categories. That said, 16-type tests remain popular and useful for self-reflection and conversation — accuracy and usefulness aren't the same thing.",
      },
      {
        question: "Why does my 16 personalities type keep changing?",
        answer:
          "Usually because you sit near the middle on one or more dimensions, so small mood and context changes flip the letter. A spectrum-based test like the Big Five shows mid-range scores directly instead of flipping your label.",
      },
      {
        question: "Do the four MBTI-style letters map onto the Big Five?",
        answer:
          "Roughly, yes — research finds strong overlaps (for example, Extraversion appears in both, and Judging/Perceiving tracks Conscientiousness). The main Big Five trait without a clear MBTI-style counterpart is Neuroticism, which measures emotional reactivity.",
      },
    ],
    cta: {
      testPath: "/test/big-five-test/",
      testLabel: "Take the Big Five Test",
      line: "Get your five trait scores in about seven minutes — then try the 16 personalities test and compare.",
    },
    related: [
      { to: "/test/16-personality-test/", label: "16 Personalities Test" },
      { to: "/test/big-five-test/", label: "Big Five Personality Test" },
      { to: "/test/enneagram-test/", label: "Enneagram Test" },
    ],
  },
];

export const getGuide = (slug: string): Guide | undefined =>
  guides.find((g) => g.slug === slug);
