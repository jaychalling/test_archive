// Data Pools for Pattern B (Pool-based Random Extraction)

export const MEMORY_POOL = [
    // Set A (Standard)
    ["Apple", "Ocean", "Friend", "Airplane", "Hope"],
    // Set B (Nature)
    ["Tiger", "Pencil", "Cloud", "Map", "Promise"],
    // Set C (Household)
    ["Piano", "Watch", "Bag", "Mirror", "Love"],
    // Set D (Abstract)
    ["Peace", "Joy", "Space", "Song", "Glasses"],
];

export const LOGIC_POOL = {
    syllogism: [
        {
            q: "'All mammals breathe oxygen. Sharks breathe oxygen. Therefore, sharks are mammals.'\nIs this conclusion true?",
            options: ["True", "False"],
            answer: "False"
        },
        {
            q: "'All birds have wings. Penguins are birds. Therefore, penguins have wings.'\nIs this conclusion true?",
            options: ["True", "False"],
            answer: "True"
        },
        {
            q: "'Roses are flowers. Some flowers wither quickly. Therefore, roses wither quickly.'\nIs this conclusion true?",
            options: ["True", "False"],
            answer: "False"
        }
    ],
    analogy: [
        {
            q: "Bird : Air = Fish : [ ? ]",
            answer: ["Water", "Underwater", "Ocean", "River", "Sea"]
        },
        {
            q: "Doctor : Hospital = Teacher : [ ? ]",
            answer: ["School", "Classroom", "College", "Academy"]
        },
        {
            q: "Winter : Cold = Summer : [ ? ]",
            answer: ["Hot", "Warm", "Heat"]
        }
    ]
};

export const SOCIAL_POOL = [
    {
        id: 'fauxpas_dress',
        text: "Q. Faux Pas Recognition",
        subText: "Emily bought a new dress. Her friend Lisa came over and said, 'I really hate that style of dress.' Lisa didn't know Emily had bought that dress.\n\nDid Lisa intentionally try to hurt Emily's feelings?",
        options: ["Yes", "No"],
        correctAnswer: "No"
    },
    {
        id: 'fauxpas_vase',
        text: "Q. Faux Pas Recognition",
        subText: "Jack brought a vase as a housewarming gift. The host said, 'Oh my, this is a design I've always really disliked!' Did the host make a rude remark?",
        options: ["Yes", "No"],
        correctAnswer: "Yes"
    }
];
