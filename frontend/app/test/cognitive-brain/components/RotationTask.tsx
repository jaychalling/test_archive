import { useState, useEffect } from 'react';

interface Props {
    difficulty: 'easy' | 'hard';
    onComplete: (isCorrect: boolean) => void;
}

export default function RotationTask({ difficulty, onComplete }: Props) {
    const [targetAngle, setTargetAngle] = useState(0);
    const [isTargetMirrored, setIsTargetMirrored] = useState(false);
    const [options, setOptions] = useState<any[]>([]);

    // Initialize
    useEffect(() => {
        generateProblem();
    }, []);

    const generateProblem = () => {
        // 1. Generate Target Configuration
        // Angle: 0, 45, 90, 135, 180, 225, 270, 315
        const angle = Math.floor(Math.random() * 8) * 45;
        const isMirrored = Math.random() > 0.5;

        setTargetAngle(angle);
        setIsTargetMirrored(isMirrored);

        // 2. Generate Options
        // We need 4 options: 1 Correct, 3 Wrong
        // Correct Option: Matches target (conceptually). 
        // Wait, typical mental rotation asks "Which of these is the SAME object?"
        // So if Target is Rotated Normal 'R', Correct Answer is another Rotated Normal 'R' (different angle) or just Normal 'R'.
        // Logic: Provide 4 rotated 'R's. Some are Mirrored, Some are Normal.
        // User must pick the one that matches the "Target" 's chirality (Mirror state).

        // Let's Simplify:
        // Target: A Rotated 'R'.
        // Question: "Is this a Normal 'R' or a Mirrored 'R'?" -> Simpler, but maybe too simple.
        // Better: Standard MR Task. Target = Normal R (Rotated). Options = 4 choices.

        // Implementation:
        // Target is ALWAYS displayed as the "Question". 
        // But wait, standard MR shows TWO objects and asks "Are they same?"
        // OR shows One Object and asks "Select the matching object from below".

        // Let's go with: "Select the matching object".
        // Object A (Top): Rotated, Random Mirror status.
        // Options (Bottom): 4 Choices with random rotations. Only ONE has same Mirror status as A.

        const correctMirrorStatus = isMirrored;

        // Generate 4 options
        const newOptions = [];
        const correctIndex = Math.floor(Math.random() * 4);

        for (let i = 0; i < 4; i++) {
            const optionAngle = Math.floor(Math.random() * 8) * 45;

            if (i === correctIndex) {
                // Correct Answer: Same Mirror Status, Random Angle
                newOptions.push({ id: i, mirrored: correctMirrorStatus, angle: optionAngle });
            } else {
                // Wrong Answer: Opposite Mirror Status, Random Angle
                newOptions.push({ id: i, mirrored: !correctMirrorStatus, angle: optionAngle });
            }
        }
        setOptions(newOptions);
    };

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-8 text-center text-gray-800">
                아래 도형과 <span className="text-indigo-600">같은 모양</span>(회전 가능)을 고르세요.
            </h3>

            {/* Target Object */}
            <div className="bg-indigo-50 p-8 rounded-full mb-12 shadow-inner border-2 border-indigo-100">
                <div
                    className="text-9xl font-black text-indigo-600 transition-all duration-500"
                    style={{
                        transform: `rotate(${targetAngle}deg) scaleX(${isTargetMirrored ? -1 : 1})`,
                        display: 'inline-block'
                    }}
                >
                    R
                </div>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-2 gap-4 w-full px-4">
                {options.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => onComplete(opt.mirrored === isTargetMirrored)}
                        className="flex items-center justify-center h-32 bg-white border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all active:scale-95 shadow-sm"
                    >
                        <div
                            className="text-6xl font-black text-gray-700"
                            style={{
                                transform: `rotate(${opt.angle}deg) scaleX(${opt.mirrored ? -1 : 1})`,
                                display: 'inline-block'
                            }}
                        >
                            R
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
