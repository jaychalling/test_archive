export interface Option {
    label: string;
    isCorrect: boolean;
}

export interface VisualPattern {
    type: 'grid' | 'sequence' | 'rotation' | 'dots';
    data: any;
}

export interface Question {
    id: number;
    section: 'verbal' | 'numerical' | 'spatial';
    difficulty: number; // 1-5
    text: string;
    options: Option[];
    visualPattern?: VisualPattern;
}

// 50 Questions: Verbal (15) + Numerical (15) + Spatial (20)
export const QUESTIONS: Question[] = [
    // ========== SECTION I: VERBAL (15 Questions) ==========
    {
        id: 1,
        section: 'verbal',
        difficulty: 1,
        text: 'Select the word that is most similar in meaning to "FORTUNATE".',
        options: [
            { label: 'Rich', isCorrect: false },
            { label: 'Lucky', isCorrect: true },
            { label: 'Brave', isCorrect: false },
            { label: 'Intelligent', isCorrect: false },
        ],
    },
    {
        id: 2,
        section: 'verbal',
        difficulty: 2,
        text: 'BRAKE is to CAR as REIN is to _____?',
        options: [
            { label: 'Rider', isCorrect: false },
            { label: 'Horse', isCorrect: true },
            { label: 'Saddle', isCorrect: false },
            { label: 'Speed', isCorrect: false },
        ],
    },
    {
        id: 3,
        section: 'verbal',
        difficulty: 2,
        text: 'Which word implies the opposite of "CANDID"?',
        options: [
            { label: 'Honest', isCorrect: false },
            { label: 'Deceptive', isCorrect: true },
            { label: 'Sweet', isCorrect: false },
            { label: 'Brief', isCorrect: false },
        ],
    },
    {
        id: 4,
        section: 'verbal',
        difficulty: 3,
        text: 'If a project is described as a "ballpark figure," what does it imply?',
        options: [
            { label: 'It is related to sports statistics.', isCorrect: false },
            { label: 'It is an exact and precise calculation.', isCorrect: false },
            { label: 'It is a rough numerical estimate.', isCorrect: true },
            { label: 'It is a very large amount of money.', isCorrect: false },
        ],
    },
    {
        id: 5,
        section: 'verbal',
        difficulty: 2,
        text: 'Which of the following words does not belong with the others?',
        options: [
            { label: 'Dollar', isCorrect: false },
            { label: 'Euro', isCorrect: false },
            { label: 'Bitcoin', isCorrect: false },
            { label: 'Bank', isCorrect: true },
        ],
    },
    {
        id: 6,
        section: 'verbal',
        difficulty: 2,
        text: 'FRAGILE is to CRACK as FLEXIBLE is to _____?',
        options: [
            { label: 'Break', isCorrect: false },
            { label: 'Bend', isCorrect: true },
            { label: 'Hard', isCorrect: false },
            { label: 'Glass', isCorrect: false },
        ],
    },
    {
        id: 7,
        section: 'verbal',
        difficulty: 3,
        text: 'Despite the __________ evidence against him, the defendant maintained a demeanor of complete innocence.',
        options: [
            { label: 'circumstantial', isCorrect: false },
            { label: 'overwhelming', isCorrect: true },
            { label: 'ambiguous', isCorrect: false },
            { label: 'negligible', isCorrect: false },
        ],
    },
    {
        id: 8,
        section: 'verbal',
        difficulty: 2,
        text: 'TREE is to FOREST as SOLDIER is to _____?',
        options: [
            { label: 'Gun', isCorrect: false },
            { label: 'War', isCorrect: false },
            { label: 'Army', isCorrect: true },
            { label: 'General', isCorrect: false },
        ],
    },
    {
        id: 9,
        section: 'verbal',
        difficulty: 3,
        text: 'What is the underlying meaning of the proverb: "Don\'t count your chickens before they hatch"?',
        options: [
            { label: 'Poultry farming requires precise calculation.', isCorrect: false },
            { label: 'Do not rely on plans that have not yet materialized.', isCorrect: true },
            { label: 'Eggs are fragile and should be handled with care.', isCorrect: false },
            { label: 'Anticipation is better than realization.', isCorrect: false },
        ],
    },
    {
        id: 10,
        section: 'verbal',
        difficulty: 4,
        text: 'EPHEMERAL is to LASTING as MUNDANE is to _____?',
        options: [
            { label: 'Ordinary', isCorrect: false },
            { label: 'Extraordinary', isCorrect: true },
            { label: 'Temporary', isCorrect: false },
            { label: 'Boring', isCorrect: false },
        ],
    },
    {
        id: 11,
        section: 'verbal',
        difficulty: 3,
        text: 'Statement 1: All mammals breathe oxygen.\nStatement 2: Some sea creatures are mammals.\nConclusion: Therefore, some sea creatures breathe oxygen.\n\nIs this conclusion logically valid?',
        options: [
            { label: 'Yes', isCorrect: true },
            { label: 'No', isCorrect: false },
            { label: 'Cannot be determined', isCorrect: false },
            { label: 'Only if they are whales', isCorrect: false },
        ],
    },
    {
        id: 12,
        section: 'verbal',
        difficulty: 2,
        text: 'Rearrange the letters "L E P P A". What category does the word belong to?',
        options: [
            { label: 'Animal', isCorrect: false },
            { label: 'Fruit', isCorrect: true },
            { label: 'Country', isCorrect: false },
            { label: 'Tool', isCorrect: false },
        ],
    },
    {
        id: 13,
        section: 'verbal',
        difficulty: 4,
        text: 'In the sentence "The board decided to table the motion," what does "table" mean?',
        options: [
            { label: 'To put it on a physical table.', isCorrect: false },
            { label: 'To discuss it immediately.', isCorrect: false },
            { label: 'To postpone discussion of it.', isCorrect: true },
            { label: 'To propose it for a vote.', isCorrect: false },
        ],
    },
    {
        id: 14,
        section: 'verbal',
        difficulty: 5,
        text: '"Every time I wash my car, it rains. Therefore, my car washing causes rain." Which logical fallacy is this?',
        options: [
            { label: 'Ad Hominem', isCorrect: false },
            { label: 'Post Hoc Ergo Propter Hoc', isCorrect: true },
            { label: 'Straw Man', isCorrect: false },
            { label: 'Circular Reasoning', isCorrect: false },
        ],
    },
    {
        id: 15,
        section: 'verbal',
        difficulty: 5,
        text: 'MITIGATE is to AGGRAVATE as ALLEVIATE is to _____?',
        options: [
            { label: 'Palliate', isCorrect: false },
            { label: 'Exacerbate', isCorrect: true },
            { label: 'Soothe', isCorrect: false },
            { label: 'Improve', isCorrect: false },
        ],
    },

    // ========== SECTION II: NUMERICAL (15 Questions) ==========
    {
        id: 16,
        section: 'numerical',
        difficulty: 1,
        text: 'What comes next in the sequence: 5, 10, 15, 20, _____?',
        options: [
            { label: '22', isCorrect: false },
            { label: '25', isCorrect: true },
            { label: '30', isCorrect: false },
            { label: '35', isCorrect: false },
        ],
    },
    {
        id: 17,
        section: 'numerical',
        difficulty: 1,
        text: 'If you buy a coffee for $2.50 and pay with a $10 bill, how much change should you receive?',
        options: [
            { label: '$6.50', isCorrect: false },
            { label: '$7.25', isCorrect: false },
            { label: '$7.50', isCorrect: true },
            { label: '$8.50', isCorrect: false },
        ],
    },
    {
        id: 18,
        section: 'numerical',
        difficulty: 2,
        text: 'How many inches are in 2 yards? (1 yard = 3 feet, 1 foot = 12 inches)',
        options: [
            { label: '24', isCorrect: false },
            { label: '36', isCorrect: false },
            { label: '48', isCorrect: false },
            { label: '72', isCorrect: true },
        ],
    },
    {
        id: 19,
        section: 'numerical',
        difficulty: 2,
        text: 'A car travels 60 miles in 1.5 hours. What is its average speed in mph?',
        options: [
            { label: '30 mph', isCorrect: false },
            { label: '40 mph', isCorrect: true },
            { label: '45 mph', isCorrect: false },
            { label: '90 mph', isCorrect: false },
        ],
    },
    {
        id: 20,
        section: 'numerical',
        difficulty: 2,
        text: 'Which of the following is the largest number?',
        options: [
            { label: '0.7', isCorrect: false },
            { label: '3/4', isCorrect: true },
            { label: '65%', isCorrect: false },
            { label: '2/3', isCorrect: false },
        ],
    },
    {
        id: 21,
        section: 'numerical',
        difficulty: 2,
        text: 'What comes next: 3, 6, 12, 24, _____?',
        options: [
            { label: '30', isCorrect: false },
            { label: '36', isCorrect: false },
            { label: '48', isCorrect: true },
            { label: '64', isCorrect: false },
        ],
    },
    {
        id: 22,
        section: 'numerical',
        difficulty: 3,
        text: 'If 3 machines can make 3 widgets in 3 minutes, how long would it take 100 machines to make 100 widgets?',
        options: [
            { label: '3 minutes', isCorrect: true },
            { label: '33 minutes', isCorrect: false },
            { label: '100 minutes', isCorrect: false },
            { label: '1 minute', isCorrect: false },
        ],
    },
    {
        id: 23,
        section: 'numerical',
        difficulty: 3,
        text: 'What number completes the sequence: 1, 1, 2, 3, 5, 8, 13, _____?',
        options: [
            { label: '19', isCorrect: false },
            { label: '21', isCorrect: true },
            { label: '22', isCorrect: false },
            { label: '24', isCorrect: false },
        ],
    },
    {
        id: 24,
        section: 'numerical',
        difficulty: 3,
        text: 'If 2x + 4 = 16, what is the value of 3x - 5?',
        options: [
            { label: '10', isCorrect: false },
            { label: '12', isCorrect: false },
            { label: '13', isCorrect: true },
            { label: '15', isCorrect: false },
        ],
    },
    {
        id: 25,
        section: 'numerical',
        difficulty: 4,
        text: 'A shirt was originally $100. It was discounted by 20%, and then the discounted price was raised by 20%. What is the final price?',
        options: [
            { label: '$96', isCorrect: true },
            { label: '$100', isCorrect: false },
            { label: '$104', isCorrect: false },
            { label: '$120', isCorrect: false },
        ],
    },
    {
        id: 26,
        section: 'numerical',
        difficulty: 3,
        text: 'In a magic square where every row, column, and diagonal sums to 15:\n[2, 7, 6]\n[9, 5, 1]\n[4, 3, ?]\nWhat is the missing number?',
        options: [
            { label: '4', isCorrect: false },
            { label: '5', isCorrect: false },
            { label: '8', isCorrect: true },
            { label: '9', isCorrect: false },
        ],
    },
    {
        id: 27,
        section: 'numerical',
        difficulty: 4,
        text: 'Two trains are 150 miles apart, traveling towards each other. Train A goes 50 mph, Train B goes 100 mph. How long until they meet?',
        options: [
            { label: '30 minutes', isCorrect: false },
            { label: '1 hour', isCorrect: true },
            { label: '1.5 hours', isCorrect: false },
            { label: '2 hours', isCorrect: false },
        ],
    },
    {
        id: 28,
        section: 'numerical',
        difficulty: 4,
        text: 'Identify the missing number: 3, 4, 6, 9, 13, _____?\n(Hint: Look at the differences between consecutive numbers)',
        options: [
            { label: '17', isCorrect: false },
            { label: '18', isCorrect: true },
            { label: '19', isCorrect: false },
            { label: '21', isCorrect: false },
        ],
    },
    {
        id: 29,
        section: 'numerical',
        difficulty: 5,
        text: 'In a bag, there are 3 Red balls and 5 Blue balls. If you draw two balls without replacement, what is the probability that both are Red?',
        options: [
            { label: '3/28', isCorrect: true },
            { label: '9/64', isCorrect: false },
            { label: '1/4', isCorrect: false },
            { label: '3/8', isCorrect: false },
        ],
    },
    {
        id: 30,
        section: 'numerical',
        difficulty: 5,
        text: 'A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?',
        options: [
            { label: '$0.05', isCorrect: true },
            { label: '$0.10', isCorrect: false },
            { label: '$0.15', isCorrect: false },
            { label: '$0.50', isCorrect: false },
        ],
    },

    // ========== SECTION III: SPATIAL (20 Questions) ==========
    // Text-based pattern recognition without images
    {
        id: 31,
        section: 'spatial',
        difficulty: 1,
        text: 'Pattern Rule: Each row shows the same shape. What shape completes the pattern?',
        options: [
            { label: 'Circle', isCorrect: false },
            { label: 'Triangle', isCorrect: false },
            { label: 'Square', isCorrect: true },
            { label: 'Pentagon', isCorrect: false },
        ],
        visualPattern: {
            type: 'grid',
            data: {
                rows: [
                    [
                        { shape: 'square', fill: 'black' },
                        { shape: 'square', fill: 'black' },
                        { shape: 'empty' },
                    ],
                ],
            },
        },
    },
    {
        id: 32,
        section: 'spatial',
        difficulty: 1,
        text: 'When you combine a vertical line "|" and a horizontal line "-", what shape do you get?',
        options: [
            { label: 'L-shape', isCorrect: false },
            { label: 'Plus sign (+)', isCorrect: true },
            { label: 'T-shape', isCorrect: false },
            { label: 'Square', isCorrect: false },
        ],
        visualPattern: {
            type: 'sequence',
            data: {
                items: [
                    { shape: 'line-v', label: '|' },
                    { shape: 'plus-text', label: '+' },
                    { shape: 'line-h', label: '-' },
                    { shape: 'equals', label: '=' },
                    { shape: 'empty', label: '?' },
                ],
            },
        },
    },
    {
        id: 33,
        section: 'spatial',
        difficulty: 2,
        text: 'An arrow points UP. After rotating 90 degrees clockwise, which direction does it point?',
        options: [
            { label: 'Up', isCorrect: false },
            { label: 'Down', isCorrect: false },
            { label: 'Left', isCorrect: false },
            { label: 'Right', isCorrect: true },
        ],
        visualPattern: {
            type: 'rotation',
            data: {
                shape: 'arrow',
                steps: [
                    { direction: 'up', label: 'Start' },
                    { direction: 'right', label: '90° CW', isQuestion: true },
                ],
            },
        },
    },
    {
        id: 34,
        section: 'spatial',
        difficulty: 2,
        text: 'Pattern: Each cell adds one dot. How many dots in Cell 4?',
        options: [
            { label: '3 dots', isCorrect: false },
            { label: '4 dots', isCorrect: true },
            { label: '5 dots', isCorrect: false },
            { label: '6 dots', isCorrect: false },
        ],
        visualPattern: {
            type: 'dots',
            data: {
                cells: [
                    { count: 1, label: 'Cell 1' },
                    { count: 2, label: 'Cell 2' },
                    { count: 3, label: 'Cell 3' },
                    { count: 0, label: 'Cell 4' },
                ],
            },
        },
    },
    {
        id: 35,
        section: 'spatial',
        difficulty: 2,
        text: 'A shape is BLACK. After applying a color inversion, what color is it?',
        options: [
            { label: 'Gray', isCorrect: false },
            { label: 'Black', isCorrect: false },
            { label: 'White', isCorrect: true },
            { label: 'Transparent', isCorrect: false },
        ],
    },
    {
        id: 36,
        section: 'spatial',
        difficulty: 2,
        text: 'Pattern: Each row decreases by 1 square.\nRow 1: 4 squares | Row 2: 3 squares | Row 3: ?\nHow many squares in Row 3?',
        options: [
            { label: '1 square', isCorrect: false },
            { label: '2 squares', isCorrect: true },
            { label: '3 squares', isCorrect: false },
            { label: '4 squares', isCorrect: false },
        ],
    },
    {
        id: 37,
        section: 'spatial',
        difficulty: 3,
        text: 'A dot starts at the TOP-LEFT corner of a square. It moves clockwise to each corner.\nPosition 1: Top-Left | Position 2: Top-Right | Position 3: Bottom-Right | Position 4: ?',
        options: [
            { label: 'Top-Left', isCorrect: false },
            { label: 'Top-Right', isCorrect: false },
            { label: 'Bottom-Right', isCorrect: false },
            { label: 'Bottom-Left', isCorrect: true },
        ],
    },
    {
        id: 38,
        section: 'spatial',
        difficulty: 3,
        text: 'A cross-shaped net is folded into a 3D shape. What shape is formed?',
        options: [
            { label: 'Pyramid', isCorrect: false },
            { label: 'Cube', isCorrect: true },
            { label: 'Cylinder', isCorrect: false },
            { label: 'Sphere', isCorrect: false },
        ],
    },
    {
        id: 39,
        section: 'spatial',
        difficulty: 4,
        text: 'XOR Logic: When two shapes overlap, the overlapping area disappears.\nShape A covers the LEFT half. Shape B covers the RIGHT half.\nWhat remains after XOR?',
        options: [
            { label: 'Nothing (empty)', isCorrect: true },
            { label: 'Full shape', isCorrect: false },
            { label: 'Center only', isCorrect: false },
            { label: 'Edges only', isCorrect: false },
        ],
    },
    {
        id: 40,
        section: 'spatial',
        difficulty: 4,
        text: 'Dual rotation: The outer ring rotates 90 degrees clockwise, while the inner circle rotates 45 degrees counter-clockwise. If a mark starts at 12 o\'clock on both, where is the outer mark after one rotation?',
        options: [
            { label: '12 o\'clock', isCorrect: false },
            { label: '3 o\'clock', isCorrect: true },
            { label: '6 o\'clock', isCorrect: false },
            { label: '9 o\'clock', isCorrect: false },
        ],
    },
    {
        id: 41,
        section: 'spatial',
        difficulty: 3,
        text: 'Dimensional analogy: A square (2D) becomes a cube (3D). What does a circle (2D) become?',
        options: [
            { label: 'Cylinder', isCorrect: false },
            { label: 'Sphere', isCorrect: true },
            { label: 'Cone', isCorrect: false },
            { label: 'Pyramid', isCorrect: false },
        ],
    },
    {
        id: 42,
        section: 'spatial',
        difficulty: 3,
        text: 'Sudoku logic: Each row must contain Triangle, Circle, and Square exactly once. What fills the blank?',
        options: [
            { label: 'Triangle', isCorrect: false },
            { label: 'Circle', isCorrect: false },
            { label: 'Square', isCorrect: true },
            { label: 'Pentagon', isCorrect: false },
        ],
        visualPattern: {
            type: 'grid',
            data: {
                rows: [
                    [
                        { shape: 'triangle', fill: 'black' },
                        { shape: 'circle', fill: 'black' },
                        { shape: 'empty' },
                    ],
                ],
            },
        },
    },
    {
        id: 43,
        section: 'spatial',
        difficulty: 4,
        text: 'Pattern: Size decreases AND color fades with each step.\nStep 1: Large Black | Step 2: Medium Gray | Step 3: ?',
        options: [
            { label: 'Small Black', isCorrect: false },
            { label: 'Large White', isCorrect: false },
            { label: 'Small White', isCorrect: true },
            { label: 'Medium White', isCorrect: false },
        ],
    },
    {
        id: 44,
        section: 'spatial',
        difficulty: 3,
        text: 'Gestalt closure: An incomplete circle is missing 1/4 of its arc. If you mentally complete it, what shape do you see?',
        options: [
            { label: 'Square', isCorrect: false },
            { label: 'Triangle', isCorrect: false },
            { label: 'Full Circle', isCorrect: true },
            { label: 'Oval', isCorrect: false },
        ],
    },
    {
        id: 45,
        section: 'spatial',
        difficulty: 4,
        text: 'Visual weight balance: 1 Triangle = 2 Circles = 4 Squares.\nTo balance 2 Triangles, how many Squares are needed?',
        options: [
            { label: '4 Squares', isCorrect: false },
            { label: '6 Squares', isCorrect: false },
            { label: '8 Squares', isCorrect: true },
            { label: '16 Squares', isCorrect: false },
        ],
    },
    {
        id: 46,
        section: 'spatial',
        difficulty: 5,
        text: 'Diagonal rule: In a 3x3 grid, the main diagonal (top-left to bottom-right) shows: Small, Medium, Large.\nWhat size belongs in the CENTER cell?',
        options: [
            { label: 'Small', isCorrect: false },
            { label: 'Medium', isCorrect: true },
            { label: 'Large', isCorrect: false },
            { label: 'Extra Large', isCorrect: false },
        ],
    },
    {
        id: 47,
        section: 'spatial',
        difficulty: 4,
        text: 'Layering depth: Three squares overlap. Square A (front), Square B (middle), Square C (back).\nIf Square A is removed, which square is now in front?',
        options: [
            { label: 'Square A', isCorrect: false },
            { label: 'Square B', isCorrect: true },
            { label: 'Square C', isCorrect: false },
            { label: 'None visible', isCorrect: false },
        ],
    },
    {
        id: 48,
        section: 'spatial',
        difficulty: 5,
        text: 'Morphing sequence: Shape gradually transforms from Circle to Square over 5 steps.\nStep 1: Circle | Step 3: ??? | Step 5: Square\nWhat best describes Step 3?',
        options: [
            { label: 'Circle', isCorrect: false },
            { label: 'Rounded Square (intermediate)', isCorrect: true },
            { label: 'Square', isCorrect: false },
            { label: 'Triangle', isCorrect: false },
        ],
    },
    {
        id: 49,
        section: 'spatial',
        difficulty: 5,
        text: 'Meta-rule: Row 1 uses addition (+1 shape). Row 2 uses subtraction (-1 shape). Row 3 follows the pattern of alternating rules.\nWhat rule does Row 3 use?',
        options: [
            { label: 'Addition (+1 shape)', isCorrect: true },
            { label: 'Subtraction (-1 shape)', isCorrect: false },
            { label: 'Multiplication', isCorrect: false },
            { label: 'No change', isCorrect: false },
        ],
    },
    {
        id: 50,
        section: 'spatial',
        difficulty: 5,
        text: 'Impossible figures: Which of these can actually exist as a 3D object?\nA) Penrose Triangle | B) Standard Cube | C) Escher Staircase | D) Klein Bottle (in 3D space)',
        options: [
            { label: 'Penrose Triangle', isCorrect: false },
            { label: 'Standard Cube', isCorrect: true },
            { label: 'Escher Staircase', isCorrect: false },
            { label: 'Klein Bottle', isCorrect: false },
        ],
    },
];

// IQ Score Categories
export interface IQCategory {
    minIQ: number;
    maxIQ: number;
    label: string;
    percentile: string;
    description: string;
    emoji: string;
}

export const IQ_CATEGORIES: IQCategory[] = [
    { minIQ: 0, maxIQ: 69, label: 'Below Average', percentile: 'Bottom 2%', description: 'You may benefit from additional support in cognitive tasks. Consider retaking when rested.', emoji: '' },
    { minIQ: 70, maxIQ: 84, label: 'Low Average', percentile: 'Bottom 16%', description: 'Your score is slightly below the general population average. Many successful people score in this range.', emoji: '' },
    { minIQ: 85, maxIQ: 99, label: 'Average', percentile: '16-50%', description: 'You are within the normal intelligence range shared by about half the population.', emoji: '' },
    { minIQ: 100, maxIQ: 114, label: 'High Average', percentile: '50-84%', description: 'You demonstrate above-average cognitive abilities. Well suited for complex problem-solving tasks.', emoji: '' },
    { minIQ: 115, maxIQ: 129, label: 'Superior', percentile: 'Top 16%', description: 'You show superior intellectual abilities. You may excel in academic and professional settings.', emoji: '' },
    { minIQ: 130, maxIQ: 144, label: 'Gifted', percentile: 'Top 2%', description: 'Your cognitive abilities are in the gifted range. Mensa-qualifying score!', emoji: '' },
    { minIQ: 145, maxIQ: 200, label: 'Genius', percentile: 'Top 0.1%', description: 'Exceptional intellectual capabilities. You are among the rarest cognitive profiles.', emoji: '' },
];

export interface IQResult {
    rawScore: number;
    iqScore: number;
    category: IQCategory;
    verbalScore: number;
    numericalScore: number;
    spatialScore: number;
    verbalPercent: number;
    numericalPercent: number;
    spatialPercent: number;
}

/**
 * Calculate IQ result from answer indices
 * Formula: IQ = 100 + 15 * (Raw Score - 28) / 10
 * @param res - String of answer indices (e.g., "01230123...")
 */
export function calculateResult(res: string): IQResult {
    if (!res) {
        return getDefaultResult();
    }

    const indices = res.split('').map(Number);
    let rawScore = 0;
    let verbalScore = 0;
    let numericalScore = 0;
    let spatialScore = 0;

    indices.forEach((optionIndex, qIndex) => {
        const question = QUESTIONS[qIndex];
        if (question && question.options[optionIndex]?.isCorrect) {
            rawScore++;
            if (question.section === 'verbal') verbalScore++;
            else if (question.section === 'numerical') numericalScore++;
            else if (question.section === 'spatial') spatialScore++;
        }
    });

    // IQ Formula: IQ = 100 + 15 * (Raw Score - mu) / sigma
    // mu (expected mean): 28, sigma (standard deviation): 10
    const mu = 28;
    const sigma = 10;
    let iqScore = Math.round(100 + 15 * (rawScore - mu) / sigma);

    // Clamp IQ to reasonable range
    iqScore = Math.max(55, Math.min(iqScore, 160));

    // Find category
    const category = IQ_CATEGORIES.find(cat => iqScore >= cat.minIQ && iqScore <= cat.maxIQ) || IQ_CATEGORIES[3];

    // Calculate section percentages
    const verbalPercent = Math.round((verbalScore / 15) * 100);
    const numericalPercent = Math.round((numericalScore / 15) * 100);
    const spatialPercent = Math.round((spatialScore / 20) * 100);

    return {
        rawScore,
        iqScore,
        category,
        verbalScore,
        numericalScore,
        spatialScore,
        verbalPercent,
        numericalPercent,
        spatialPercent,
    };
}

function getDefaultResult(): IQResult {
    return {
        rawScore: 28,
        iqScore: 100,
        category: IQ_CATEGORIES[3],
        verbalScore: 8,
        numericalScore: 8,
        spatialScore: 12,
        verbalPercent: 53,
        numericalPercent: 53,
        spatialPercent: 60,
    };
}
