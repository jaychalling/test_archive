// Data Pools for Pattern B (Pool-based Random Extraction)

export const MEMORY_POOL = [
    // Set A (Standard)
    ["사과", "바다", "친구", "비행기", "희망"],
    // Set B (Nature)
    ["호랑이", "연필", "구름", "지도", "약속"],
    // Set C (Household)
    ["피아노", "시계", "가방", "거울", "사랑"],
    // Set D (Abstract)
    ["평화", "기쁨", "우주", "노래", "안경"],
];

export const LOGIC_POOL = {
    syllogism: [
        {
            q: "'모든 포유류는 산소로 숨을 쉰다. 상어는 산소로 숨을 쉰다. 그러므로 상어는 포유류이다.'\n이 결론은 참입니까?",
            options: ["참", "거짓"],
            answer: "거짓"
        },
        {
            q: "'모든 새는 날개가 있다. 펭귄은 새다. 그러므로 펭귄은 날개가 있다.'\n이 결론은 참입니까?",
            options: ["참", "거짓"],
            answer: "참"
        },
        {
            q: "'장미는 꽃이다. 어떤 꽃은 빨리 시든다. 그러므로 장미는 빨리 시든다.'\n이 결론은 참입니까?",
            options: ["참", "거짓"],
            answer: "거짓" // '어떤'이므로 반드시 참은 아님
        }
    ],
    analogy: [
        {
            q: "새 : 공중 = 물고기 : [ ? ]",
            answer: ["물", "수중", "바다", "강", "물속"]
        },
        {
            q: "의사 : 병원 = 선생님 : [ ? ]",
            answer: ["학교", "교실", "학원"]
        },
        {
            q: "겨울 : 춥다 = 여름 : [ ? ]",
            answer: ["덥다", "뜨겁다"]
        }
    ]
};

export const SOCIAL_POOL = [
    {
        id: 'fauxpas_dress',
        text: "Q. 실언(Faux Pas) 인식",
        subText: "영희는 새 드레스를 샀습니다. 친구 미수가 와서 '나 그 스타일 드레스 진짜 싫어해'라고 말했습니다. 미수는 영희가 그 드레스를 샀다는 걸 몰랐습니다.\n\n미수는 일부러 영희의 기분을 상하게 하려 했습니까?",
        options: ["예", "아니오"],
        correctAnswer: "아니오"
    },
    {
        id: 'fauxpas_vase',
        text: "Q. 실언(Faux Pas) 인식",
        subText: "철수는 집들이 선물로 꽃병을 사 갔습니다. 집주인은 '어머, 이거 내가 예전부터 정말 싫어하던 디자인이야!'라고 말했습니다. 집주인은 무례한 말을 했습니까?",
        options: ["예", "아니오"],
        correctAnswer: "예"
    }
];
