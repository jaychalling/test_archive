import { useState, useEffect, useRef } from 'react';

interface Node {
    id: string;
    label: string;
    x: number; // 퍼센트(%) 단위
    y: number; // 퍼센트(%) 단위
    status: 'pending' | 'active' | 'completed' | 'error';
}

interface Props {
    variant: 'A' | 'B'; // A: 숫자만(1-2-3), B: 숫자-글자(1-ㄱ-2-ㄴ)
    nodeCount?: number;
    onComplete: (score: number, timeMs: number) => void;
}

export default function TrailMakingTask({ variant, nodeCount = 8, onComplete }: Props) {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [nextTargetIndex, setNextTargetIndex] = useState(0);
    const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);
    const [startTime, setStartTime] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // 1. 노드 생성 및 배치 (충돌 방지 로직 포함)
    useEffect(() => {
        const labels = generateLabels(variant, nodeCount);
        const newNodes: Node[] = [];
        const nodeSize = 12; // 노드 크기(%) - 겹침 계산용

        for (let i = 0; i < labels.length; i++) {
            let position;
            let attempts = 0;

            // 🛡️ 충돌 방지: 겹치지 않을 때까지 최대 50번 위치 재추첨
            do {
                position = {
                    x: Math.random() * 80 + 10, // 10% ~ 90% 사이 (화면 밖 이탈 방지)
                    y: Math.random() * 80 + 10,
                };
                attempts++;
            } while (checkCollision(position, newNodes, nodeSize) && attempts < 50);

            newNodes.push({
                id: labels[i],
                label: labels[i],
                x: position.x,
                y: position.y,
                status: i === 0 ? 'active' : 'pending', // 첫 번째 노드는 활성화 표시
            });
        }

        setNodes(newNodes);
        setStartTime(Date.now());
    }, [variant, nodeCount]);

    // 2. 노드 클릭 핸들러
    const handleNodeClick = (index: number) => {
        // 이미 완료된 노드거나, 순서가 틀린 노드면 무시
        if (index < nextTargetIndex) return;

        if (index === nextTargetIndex) {
            // ✅ 정답: 선 연결 및 상태 업데이트
            const currentNodes = [...nodes];
            currentNodes[index].status = 'completed';

            // 다음 타겟 활성화
            if (index + 1 < currentNodes.length) {
                currentNodes[index + 1].status = 'active';
            }

            // 선 그리기 (이전 노드 -> 현재 노드)
            if (index > 0) {
                setLines(prev => [...prev, {
                    x1: nodes[index - 1].x,
                    y1: nodes[index - 1].y,
                    x2: nodes[index].x,
                    y2: nodes[index].y
                }]);
            }

            setNodes(currentNodes);
            setNextTargetIndex(prev => prev + 1);

            // 🎉 게임 종료 체크
            if (index === nodes.length - 1) {
                const endTime = Date.now();
                const duration = endTime - startTime;
                // 점수 계산 (빠를수록 고득점, 예: 30초 내 만점)
                const score = Math.max(0, 100 - Math.floor(duration / 1000));
                setTimeout(() => onComplete(score, duration), 500);
            }
        } else {
            // ❌ 오답: 에러 피드백 (진동 등)
            const currentNodes = [...nodes];
            currentNodes[index].status = 'error';
            setNodes(currentNodes);
            setTimeout(() => {
                currentNodes[index].status = 'pending'; // 0.5초 후 복구
                setNodes([...currentNodes]);
            }, 500);
        }
    };

    return (
        <div className="flex flex-col items-center w-full h-full max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4 text-gray-700">
                {variant === 'A' ? '1부터 순서대로 누르세요' : '숫자와 글자를 번갈아 누르세요 (1->ㄱ->2...)'}
            </h3>

            <div ref={containerRef} className="relative w-full h-96 bg-gray-50 border-2 border-gray-200 rounded-xl shadow-inner overflow-hidden">
                {/* 🎨 연결선 (SVG) - 노드 뒤에 그려짐 */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    {lines.map((line, i) => (
                        <line
                            key={i}
                            x1={`${line.x1}%`} y1={`${line.y1}%`}
                            x2={`${line.x2}%`} y2={`${line.y2}%`}
                            stroke="#6366f1" strokeWidth="2" strokeDasharray="5,5"
                        />
                    ))}
                </svg>

                {/* 🔘 노드 버튼들 */}
                {nodes.map((node, i) => (
                    <button
                        key={node.id}
                        onClick={() => handleNodeClick(i)}
                        className={`absolute w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md transition-all duration-200 transform
              ${node.status === 'completed' ? 'bg-indigo-500 text-white scale-110' : ''}
              ${node.status === 'active' ? 'bg-white border-2 border-indigo-500 text-indigo-700 animate-pulse ring-4 ring-indigo-200' : ''}
              ${node.status === 'pending' ? 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-100' : ''}
              ${node.status === 'error' ? 'bg-red-500 text-white animate-shake' : ''}
            `}
                        style={{
                            left: `${node.x}%`,
                            top: `${node.y}%`,
                            transform: 'translate(-50%, -50%)' // 중심점 기준 배치
                        }}
                    >
                        {node.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

// --- Helpers ---

// 충돌 감지 함수 (피타고라스 거리 계산)
function checkCollision(pos: { x: number, y: number }, existingNodes: Node[], minSize: number) {
    return existingNodes.some(node => {
        const dx = node.x - pos.x;
        const dy = node.y - pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < minSize + 5; // 최소 거리(%) + 여유분
    });
}

// 라벨 생성기 (1, 2, 3... or 1, 가, 2, 나...)
function generateLabels(variant: 'A' | 'B', count: number) {
    const result = [];
    const hangeul = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ'];

    for (let i = 0; i < count; i++) {
        if (variant === 'A') {
            result.push(String(i + 1));
        } else {
            // 짝수 인덱스: 숫자, 홀수 인덱스: 한글
            if (i % 2 === 0) result.push(String(Math.floor(i / 2) + 1));
            else result.push(hangeul[Math.floor(i / 2)]);
        }
    }
    return result;
}
