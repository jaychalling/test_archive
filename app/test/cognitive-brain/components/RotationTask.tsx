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
        const angle = Math.floor(Math.random() * 8) * 45;
        const isMirrored = Math.random() > 0.5;

        setTargetAngle(angle);
        setIsTargetMirrored(isMirrored);

        // 2. Generate Options
        const correctMirrorStatus = isMirrored;
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
                Select the <span className="text-indigo-600 border-b-2 border-indigo-200">matching shape</span> (can be rotated) below.
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
                        className="flex items-center justify-center h-32 bg-white border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-100 transition-all active:scale-95 shadow-sm focus:outline-none"
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
