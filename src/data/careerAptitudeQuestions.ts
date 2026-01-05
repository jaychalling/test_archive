// Career Aptitude Test Questions
// Based on Holland's RIASEC model (Realistic, Investigative, Artistic, Social, Enterprising, Conventional)

export interface CareerQuestion {
  id: number;
  text: string;
  hollandCode: 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
}

export type AnswerValue = 1 | 2 | 3 | 4 | 5;

export const answerOptions: { value: AnswerValue; label: string }[] = [
  { value: 1, label: "Not Interested" },
  { value: 2, label: "Slightly Interested" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Interested" },
  { value: 5, label: "Very Interested" },
];

export type HollandCode = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export interface CareerTypeInfo {
  code: HollandCode;
  name: string;
  nameKo: string;
  description: string;
  detailedDescription: string;
  theoreticalBackground: string;
  strengths: string[];
  weaknesses: string[];
  careerExamples: string[];
  color: string;
}

export const testBackground = {
  history: "Holland's Career Aptitude Theory was developed by psychologist John Holland in the 1950s as a career choice framework. The theory classifies people into six personality types (RIASEC), each matching well with specific occupational environments. It is one of the most widely used career counseling tools globally, with over 50 years of research validating its effectiveness.",
  purpose: "This test identifies your career aptitude based on Holland's RIASEC model. It determines which of the six types—Realistic (R), Investigative (I), Artistic (A), Social (S), Enterprising (E), or Conventional (C)—best matches your interests, and suggests suitable career fields and pathways.",
  disclaimer: "This test is a reference tool for career exploration and self-understanding. It cannot replace professional career counseling or job placement services. Results reflect your current interests and tendencies. Please consider various factors when making career decisions.",
};

export const careerQuestions: CareerQuestion[] = [
  // Realistic - Hands-on activities with tools and physical objects
  { id: 1, text: "Working with machinery, tools, and repairs", hollandCode: 'R' },
  { id: 2, text: "Active outdoor work involving physical activity", hollandCode: 'R' },
  { id: 3, text: "Creating practical and tangible products", hollandCode: 'R' },
  { id: 4, text: "Skilled trades like construction, carpentry, or welding", hollandCode: 'R' },
  { id: 5, text: "Work utilizing physical fitness and athleticism", hollandCode: 'R' },

  // Investigative - Analytical and research activities
  { id: 6, text: "Conducting scientific experiments or research", hollandCode: 'I' },
  { id: 7, text: "Analyzing and solving complex problems logically", hollandCode: 'I' },
  { id: 8, text: "Exploring and learning new knowledge", hollandCode: 'I' },
  { id: 9, text: "Collecting data and identifying patterns", hollandCode: 'I' },
  { id: 10, text: "Working with mathematics, physics, or chemistry", hollandCode: 'I' },

  // Artistic - Creative and expressive activities
  { id: 11, text: "Creating artistic works such as design, drawing, or music", hollandCode: 'A' },
  { id: 12, text: "Expressing ideas freely and creatively", hollandCode: 'A' },
  { id: 13, text: "Writing, storytelling, or content creation", hollandCode: 'A' },
  { id: 14, text: "Solving problems in original and innovative ways", hollandCode: 'A' },
  { id: 15, text: "Using aesthetic sense to create beautiful things", hollandCode: 'A' },

  // Social - Helping and teaching activities
  { id: 16, text: "Teaching and educating others", hollandCode: 'S' },
  { id: 17, text: "Listening to people's problems and providing counseling", hollandCode: 'S' },
  { id: 18, text: "Working collaboratively in team environments", hollandCode: 'S' },
  { id: 19, text: "Supporting vulnerable or disadvantaged people", hollandCode: 'S' },
  { id: 20, text: "Helping people grow and develop", hollandCode: 'S' },

  // Enterprising - Persuading and leading activities
  { id: 21, text: "Planning and operating a business", hollandCode: 'E' },
  { id: 22, text: "Persuading and influencing others", hollandCode: 'E' },
  { id: 23, text: "Exercising leadership and managing teams", hollandCode: 'E' },
  { id: 24, text: "Achieving goals in competitive environments", hollandCode: 'E' },
  { id: 25, text: "Sales, marketing, or negotiation work", hollandCode: 'E' },

  // Conventional - Systematic and organized activities
  { id: 26, text: "Working accurately according to established procedures and rules", hollandCode: 'C' },
  { id: 27, text: "Organizing data and managing documents", hollandCode: 'C' },
  { id: 28, text: "Working with numbers in accounting, finance, or statistics", hollandCode: 'C' },
  { id: 29, text: "Working in systematic and organized environments", hollandCode: 'C' },
  { id: 30, text: "Paying attention to details and checking work thoroughly", hollandCode: 'C' },
];

export const hollandTypeDescriptions: Record<HollandCode, CareerTypeInfo> = {
  R: {
    code: 'R',
    name: "Realistic",
    nameKo: "Realistic",
    description: "Prefers hands-on, practical work with tools and machinery, valuing concrete and tangible results.",
    detailedDescription: "The Realistic type tends to favor practical, hands-on activities. They are interested in working with physical objects such as machines, tools, animals, or plants, and enjoy activities that utilize manual skills and physical abilities. Rather than abstract or theoretical concepts, they prefer concrete and practical tasks, finding satisfaction in creating visible, tangible outcomes. They typically enjoy outdoor activities and favor systematic, orderly work. Generally, they are people of action rather than words, feeling more comfortable working independently than engaging in complex social interactions. When problems arise, they tend to seek practical and immediate solutions.",
    theoreticalBackground: "In Holland's theory, the Realistic type prefers direct interaction with the physical world. Research indicates that individuals with strong Realistic tendencies have high spatial perception and mechanical aptitude, favoring concrete and systematic thinking. They typically hold pragmatic values and often display characteristics traditionally associated with masculinity. Realistic types show the highest job satisfaction and performance when working in Realistic environments (e.g., construction sites, factories, farms).",
    strengths: [
      "Excellent mechanical aptitude and manual dexterity for skillfully handling tools and equipment",
      "Outstanding practical and concrete problem-solving abilities",
      "Strong performance in activities utilizing physical abilities and stamina",
      "Works independently and completes tasks in a self-directed manner",
      "Demonstrates patience and steadily pursues goals"
    ],
    weaknesses: [
      "May find it challenging to work with abstract and theoretical concepts",
      "May feel uncomfortable in complex social situations or interpersonal relationships",
      "May struggle with emotional expression or empathetic communication",
      "May take time to adapt to changes and new approaches"
    ],
    careerExamples: [
      "Mechanical engineer, auto mechanic, architect, carpenter, welder",
      "Electrician, plumber, farmer, landscaper, animal trainer",
      "Aircraft mechanic, chef, athlete, firefighter, military personnel"
    ],
    color: "from-amber-500 to-orange-500",
  },
  I: {
    code: 'I',
    name: "Investigative",
    nameKo: "Investigative",
    description: "Prefers observing, analyzing, and conducting research, enjoying logical thinking and intellectual exploration.",
    detailedDescription: "The Investigative type is characterized by strong intellectual curiosity and analytical thinking. They enjoy dealing with abstract and theoretical problems, with interests in science, mathematics, and research. They find satisfaction in exploring new knowledge and solving complex problems logically. They prefer independent thinking and research, demonstrating excellent systematic and critical thinking skills. Generally introverted and reflective, they enjoy immersing themselves in the world of ideas and concepts. Rather than social situations, they prefer solitary work or deep conversations with a small group of colleagues. They draw conclusions based on evidence and data, valuing accuracy and objectivity.",
    theoreticalBackground: "The Investigative type represents academic and scientific inclinations in Holland's model. Research shows that individuals with strong Investigative tendencies excel in mathematical ability, logical reasoning, and critical thinking, while valuing intellectual autonomy. They hold learning-oriented values and derive intrinsic motivation from the process of acquiring new knowledge and solving problems. Investigative types demonstrate the highest creativity and productivity when working in Investigative environments (e.g., laboratories, universities, R&D centers).",
    strengths: [
      "Analyzes and solves complex problems logically and systematically",
      "Rapidly acquires new knowledge through strong intellectual curiosity and learning ability",
      "Makes accurate judgments using objective and critical thinking",
      "Conducts independent research and develops innovative ideas",
      "Pays attention to details and validates thoroughly"
    ],
    weaknesses: [
      "May lack practicality due to overly theoretical and abstract approaches",
      "May struggle with social skills or managing interpersonal relationships",
      "Perfectionist tendencies may slow down decision-making or project completion",
      "Preference for logical over emotional communication may lead to misunderstandings"
    ],
    careerExamples: [
      "Scientist, researcher, data analyst, statistician",
      "Physician, pharmacist, veterinarian, life scientist",
      "Software developer, systems analyst, university professor"
    ],
    color: "from-violet-500 to-purple-500",
  },
  A: {
    code: 'A',
    name: "Artistic",
    nameKo: "Artistic",
    description: "Values creative and free expression, pursuing beauty and originality.",
    detailedDescription: "The Artistic type favors creativity and originality. They are interested in artistic expression through art, music, literature, and design, enjoying working in their own way within free environments. They possess rich imagination and keen sensitivity, pursuing beauty and meaning. Rather than being bound by fixed rules or frameworks, they prefer to experiment and express freely. They value emotions and intuition, excelling at generating unique and innovative ideas. They generally function better in unstructured environments and need opportunities for autonomy and self-expression. They view the world from perspectives different from others and express these views in original ways.",
    theoreticalBackground: "The Artistic type represents expressive and creative tendencies in Holland's theory. Research shows that individuals with strong Artistic inclinations demonstrate high divergent thinking, originality, and aesthetic sensitivity, excelling at finding innovative solutions to unstructured problem situations. They value autonomy and self-expression as important principles, pursuing individuality and originality over traditional conventions. Artistic types show the highest creativity and job satisfaction when working in Artistic environments (e.g., design studios, advertising agencies, publishing houses).",
    strengths: [
      "Excellent ability to generate original and innovative ideas",
      "Creates beautiful and meaningful works through aesthetic sense and expressiveness",
      "Explores various perspectives and possibilities with flexible thinking",
      "Provides deep insights by utilizing emotions and intuition",
      "Engages in creative activities self-directedly in free environments"
    ],
    weaknesses: [
      "May find systematic and repetitive tasks boring and difficult to focus on",
      "May overlook realistic and practical aspects",
      "May resist following established rules and procedures",
      "May experience financial difficulties by prioritizing self-expression over economic stability"
    ],
    careerExamples: [
      "Graphic designer, illustrator, web designer, UX/UI designer",
      "Writer, screenwriter, journalist, editor",
      "Musician, actor, dancer, film director, photographer"
    ],
    color: "from-pink-500 to-rose-500",
  },
  S: {
    code: 'S',
    name: "Social",
    nameKo: "Social",
    description: "Prefers helping, teaching, and collaborating with people, with strong interest in others' growth and welfare.",
    detailedDescription: "The Social type prefers working with and helping people. They are interested in fields that support people's growth and development, such as education, counseling, healthcare, and social welfare. They have excellent empathy and are sensitive to others' emotions and needs, valuing positive relationship formation. They are cooperative and kind, pursuing teamwork and harmony. Generally extroverted and warm, they gain energy from meaningful interactions with people. They find fulfillment in understanding and encouraging others and solving their problems together. They value cooperation over competition and community benefit over individual success.",
    theoreticalBackground: "The Social type represents interpersonally oriented and altruistic tendencies in Holland's model. Research shows that individuals with strong Social inclinations excel in social intelligence, empathy, and communication skills, valuing cooperative and supportive relationships. They hold altruistic values and derive intrinsic rewards from contributing to others' welfare and growth. Social types demonstrate the highest job satisfaction and psychological well-being when working in Social environments (e.g., schools, hospitals, counseling centers).",
    strengths: [
      "Understands others' emotions and needs well through excellent empathy",
      "Builds trust relationships through effective communication and listening",
      "Exceptional ability to create cooperative and harmonious team environments",
      "Helps others grow through teaching and encouragement",
      "Supports people in difficulty with patience and consideration"
    ],
    weaknesses: [
      "May experience emotional burnout from excessive involvement in others' problems",
      "May avoid conflict or sacrifice personal needs",
      "May take criticism or rejection personally and get hurt easily",
      "May show reduced efficiency by preferring relationship-centered approaches over systematic and analytical work"
    ],
    careerExamples: [
      "Teacher, university professor, educational consultant, special education teacher",
      "Counselor, psychotherapist, social worker, career counselor",
      "Nurse, physical therapist, occupational therapist, nutritionist"
    ],
    color: "from-blue-500 to-cyan-500",
  },
  E: {
    code: 'E',
    name: "Enterprising",
    nameKo: "Enterprising",
    description: "Prefers exercising leadership, persuading people, and achieving goals.",
    detailedDescription: "The Enterprising type is ambitious, energetic, and prefers demonstrating leadership. They are interested in fields involving persuasion and influence, such as business, sales, management, and politics. They are goal-oriented and competitive, valuing success and achievement. Confident and extroverted, they are unafraid to seize new opportunities and take risks. Generally sociable and persuasive, they excel at motivating and organizing people. They prefer quick decision-making, are action-oriented, and work in a results-focused manner. They value power, status, and material rewards, with strong motivation to reach influential positions.",
    theoreticalBackground: "The Enterprising type represents persuasive and leadership-oriented tendencies in Holland's theory. Research shows that individuals with strong Enterprising inclinations have high self-confidence, dominance needs, and achievement motivation, displaying competitive and ambitious characteristics. They value status and power as important principles and derive satisfaction from goal achievement and visible results. Enterprising types demonstrate the highest performance and job satisfaction when working in Enterprising environments (e.g., corporate leadership, sales departments, venture companies).",
    strengths: [
      "Leads teams and achieves goals with strong leadership",
      "Influences people through excellent persuasion and negotiation skills",
      "Seizes new opportunities and boldly takes on challenges",
      "Gets motivated in competitive environments and achieves high performance",
      "Drives projects forward with quick decision-making and action"
    ],
    weaknesses: [
      "Excessive competitiveness may strain relationships with others",
      "Obsession with power and success may lead to unethical choices",
      "Impatience and hasty decisions may result in mistakes",
      "May overlook others' emotions and needs while focusing solely on goals"
    ],
    careerExamples: [
      "CEO, management consultant, entrepreneur, startup founder",
      "Sales manager, marketing director, advertising planner",
      "Lawyer, politician, lobbyist, real estate agent"
    ],
    color: "from-red-500 to-orange-500",
  },
  C: {
    code: 'C',
    name: "Conventional",
    nameKo: "Conventional",
    description: "Prefers systematic and organized work, valuing accuracy and attention to detail.",
    detailedDescription: "The Conventional type favors orderly and systematic approaches. They are interested in structured and regular work such as accounting, administration, finance, and data management. They value accuracy and efficiency, preferring to follow established procedures and rules. They pay attention to details, check thoroughly, and strive to minimize errors. Generally cautious and responsible, they prefer predictable and stable environments. They work organizationally and methodically, feeling secure in maintaining systems and order. They respect tradition and convention over innovation or change, trusting proven methods.",
    theoreticalBackground: "The Conventional type represents tendencies that emphasize order and accuracy in Holland's model. Research shows that individuals with strong Conventional inclinations excel in numerical processing, attention to detail, and organizational abilities, preferring structured and predictable environments. They value stability and security as important principles and derive satisfaction from rule compliance and maintaining efficient systems. Conventional types demonstrate the highest accuracy and reliability when working in Conventional environments (e.g., accounting firms, banks, government agencies).",
    strengths: [
      "Performs work accurately and meticulously with attention to detail",
      "Works systematically and organizationally to maximize efficiency",
      "Completes assigned tasks reliably and responsibly",
      "Effectively manages and analyzes complex data and numbers",
      "Minimizes errors by adhering to established procedures and rules"
    ],
    weaknesses: [
      "May struggle to adapt to change and uncertainty",
      "May stick to traditional methods rather than creative and innovative approaches",
      "Excessive perfectionism may lead to inflexibility and rigidity",
      "May get buried in repetitive and routine tasks and miss the big picture"
    ],
    careerExamples: [
      "Accountant, tax advisor, auditor, financial analyst",
      "Administrative manager, office manager, secretary, HR specialist",
      "Bank teller, insurance actuary, librarian, data entry specialist"
    ],
    color: "from-green-500 to-teal-500",
  },
};

export const calculateTopTypes = (answers: Record<number, AnswerValue>): { code: HollandCode; score: number }[] => {
  const typeScores: Record<HollandCode, number> = {
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0,
  };

  careerQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined) {
      typeScores[question.hollandCode] += answer;
    }
  });

  // Sort by score in descending order
  return Object.entries(typeScores)
    .map(([code, score]) => ({ code: code as HollandCode, score }))
    .sort((a, b) => b.score - a.score);
};

// FAQ Data for Result Page
export const careerAptitudeFAQs = [
  {
    question: "Can I have more than one career aptitude type?",
    answer: "Absolutely! Most people are a combination of multiple Holland types. Your results show your top 3 types in order of preference, forming your Holland Code (like RIA or SEC). This combination provides a more nuanced understanding of your career interests than a single type alone. The interaction between your types can reveal unique career paths that satisfy multiple aspects of your personality."
  },
  {
    question: "What if I want to change careers - will my results still apply?",
    answer: "Yes! Your Holland Code reflects your fundamental interests and preferences, which tend to remain relatively stable over time. If you're considering a career change, use your results to identify fields that better align with your natural inclinations. Many successful career transitions happen when people move toward work that matches their Holland type more closely. However, life experiences can shift your interests, so retaking the test periodically can be helpful."
  },
  {
    question: "How accurate is this test compared to professional career assessments?",
    answer: "This test is based on Holland's RIASEC theory, one of the most researched and validated career models in psychology. While it provides valuable insights for self-exploration and career planning, it's designed for educational and entertainment purposes. For comprehensive career counseling, especially for major life decisions, consider taking validated assessments like the Self-Directed Search (SDS) or Strong Interest Inventory with a certified career counselor."
  },
  {
    question: "Should I only pursue careers that match my top type?",
    answer: "Not necessarily. While your Holland Code suggests careers where you're likely to find satisfaction, many factors influence career success and happiness - including skills, values, work environment, and life circumstances. Use your results as one important piece of information, but also consider your abilities, education, market opportunities, and personal goals. Some of the most fulfilling careers combine elements from multiple types."
  },
  {
    question: "Can I combine my Holland Code with other personality tests?",
    answer: "Definitely! Combining this test with others provides a more complete picture. Try the Big Five Personality Test to understand your work style, the Emotional Intelligence Test to assess interpersonal skills, or the 16 Personality Types Test for deeper self-understanding. Career aptitude (what you're interested in) combined with personality traits (how you work) and emotional intelligence (how you relate to others) offers comprehensive career guidance."
  },
  {
    question: "What if my current job doesn't match my Holland Code?",
    answer: "This is actually quite common! Many people work in jobs that don't perfectly align with their interests. If you find yourself in this situation, you have several options: look for aspects of your current role that do match your type, seek projects or responsibilities that better align with your interests, develop a hobby that satisfies your Holland type, or consider a gradual transition to a more suitable field. Even small changes can significantly improve job satisfaction."
  }
];

// Celebrity/Professional Comparisons for Result Page
export const careerAptitudeCelebrities = [
  {
    name: "Elon Musk",
    score: 23, // High Investigative + Enterprising
    description: "Entrepreneur and engineer known for innovative problem-solving in technology and space exploration. Strong I-E combination.",
    avatar: "🚀"
  },
  {
    name: "Marie Kondo",
    score: 21, // High Conventional + Social
    description: "Organizing consultant who systematically helps people declutter and find joy. Notable C-S profile.",
    avatar: "✨"
  },
  {
    name: "Gordon Ramsay",
    score: 19, // Realistic + Enterprising
    description: "Chef and restaurateur combining hands-on culinary skills with business leadership. Strong R-E traits.",
    avatar: "👨‍🍳"
  },
  {
    name: "Taylor Swift",
    score: 22, // Artistic + Enterprising
    description: "Singer-songwriter and businesswoman blending creative artistry with strategic career management. A-E combination.",
    avatar: "🎵"
  },
  {
    name: "Dr. Anthony Fauci",
    score: 24, // Investigative + Social
    description: "Physician-scientist dedicated to research and public health education. Classic I-S profile.",
    avatar: "🔬"
  },
  {
    name: "Serena Williams",
    score: 18, // Realistic + Enterprising
    description: "Professional athlete and entrepreneur combining physical excellence with business ventures. R-E strengths.",
    avatar: "🎾"
  },
  {
    name: "Mr. Rogers",
    score: 20, // Social + Artistic
    description: "Educator and TV personality who taught children with creativity and empathy. S-A combination.",
    avatar: "📺"
  },
  {
    name: "Warren Buffett",
    score: 22, // Conventional + Investigative
    description: "Investor known for analytical thinking and systematic approach to financial analysis. C-I traits.",
    avatar: "💼"
  }
];
