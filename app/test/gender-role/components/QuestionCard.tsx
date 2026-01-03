import React from 'react';
import { Module, QuestionItem, LikertOption } from '../questions';

interface QuestionCardProps {
    module: Module;
    item: QuestionItem;
    answers: Record<string, number>;
    onAnswer: (key: string, value: number) => void;
}

const Scale = ({
    options,
    value,
    onChange,
    label
}: {
    options: LikertOption[];
    value?: number;
    onChange: (val: number) => void;
    label?: string;
}) => (
    <div className="space-y-3">
        {label && <p className="font-semibold text-slate-800 dark:text-slate-200">{label}</p>}
        <div className="flex flex-col gap-2 sm:grid sm:grid-cols-5 sm:gap-2">
            {options.map((opt) => (
                <button
                    key={opt.value}
                    onClick={() => onChange(opt.value)}
                    className={`
            relative p-3 sm:py-4 rounded-xl text-sm font-medium transition-all duration-200 border
            ${value === opt.value
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-slate-50 dark:hover:bg-slate-750'
                        }
          `}
                >
                    <span className="block sm:hidden text-left">{opt.text}</span>
                    <span className="hidden sm:block text-center">{opt.value}</span>
                </button>
            ))}
        </div>
        <div className="hidden sm:flex justify-between text-xs text-slate-400 px-1">
            <span>{options[0].text}</span>
            <span>{options[options.length - 1].text}</span>
        </div>
    </div>
);

const QuestionCard: React.FC<QuestionCardProps> = ({ module, item, answers, onAnswer }) => {
    const isScenario = module.responseType === 'Scenario_Dual_Rating';

    if (isScenario) {
        return (
            <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
                <div className="space-y-4">
                    <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-xs font-bold rounded-full uppercase tracking-wider">
                        {module.title}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                        {item.scenarioContext}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        {module.description}
                    </p>
                </div>

                <div className="space-y-8">
                    {item.actions?.map((action) => {
                        // 1-5 Scale for scenarios (Unlikely to Likely)
                        const scenarioOptions = [
                            { value: 1, text: "Unlikely" },
                            { value: 2, text: "Somewhat Unlikely" },
                            { value: 3, text: "Neutral" },
                            { value: 4, text: "Somewhat Likely" },
                            { value: 5, text: "Very Likely" }
                        ];
                        const answerKey = `${item.id}_${action.subId}`;

                        return (
                            <div key={action.subId} className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                                        {action.subId}
                                    </span>
                                    <p className="text-lg text-slate-800 dark:text-slate-200 font-medium">
                                        {action.text}
                                    </p>
                                </div>
                                <Scale
                                    options={scenarioOptions}
                                    value={answers[answerKey]}
                                    onChange={(val) => onAnswer(answerKey, val)}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }

    // Standard Likert (M1, M3)
    const options = module.options || [];

    return (
        <div className="w-full max-w-2xl mx-auto space-y-4 animate-fade-in">
            <div className="space-y-3">
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-bold rounded-full uppercase tracking-wider">
                    {module.title}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-snug">
                    {item.text}
                </h3>
            </div>

            <div className="pt-4">
                <Scale
                    options={options}
                    value={answers[item.id.toString()]}
                    onChange={(val) => onAnswer(item.id.toString(), val)}
                />
            </div>
        </div>
    );
};

export default QuestionCard;
