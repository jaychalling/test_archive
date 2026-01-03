'use client';

// SVG 도형 컴포넌트
export const Triangle = ({ size = 40, fill = 'black', className = '' }: { size?: number; fill?: string; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
        <polygon points="50,10 90,90 10,90" fill={fill} />
    </svg>
);

export const Circle = ({ size = 40, fill = 'black', className = '' }: { size?: number; fill?: string; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
        <circle cx="50" cy="50" r="40" fill={fill} />
    </svg>
);

export const Square = ({ size = 40, fill = 'black', className = '' }: { size?: number; fill?: string; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
        <rect x="10" y="10" width="80" height="80" fill={fill} />
    </svg>
);

export const Pentagon = ({ size = 40, fill = 'black', className = '' }: { size?: number; fill?: string; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
        <polygon points="50,10 90,40 75,90 25,90 10,40" fill={fill} />
    </svg>
);

export const Dot = ({ size = 40, fill = 'black', className = '' }: { size?: number; fill?: string; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
        <circle cx="50" cy="50" r="15" fill={fill} />
    </svg>
);

export const Arrow = ({ size = 40, direction = 'up', fill = 'black', className = '' }: {
    size?: number;
    direction?: 'up' | 'right' | 'down' | 'left';
    fill?: string;
    className?: string;
}) => {
    const rotations = { up: 0, right: 90, down: 180, left: 270 };
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
            <g transform={`rotate(${rotations[direction]} 50 50)`}>
                <polygon points="50,20 70,60 60,60 60,80 40,80 40,60 30,60" fill={fill} />
            </g>
        </svg>
    );
};

export const Plus = ({ size = 40, fill = 'black', className = '' }: { size?: number; fill?: string; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
        <rect x="45" y="10" width="10" height="80" fill={fill} />
        <rect x="10" y="45" width="80" height="10" fill={fill} />
    </svg>
);

// 패턴 렌더러
export type VisualPattern = {
    type: 'grid' | 'sequence' | 'rotation' | 'dots';
    data: any;
};

export const PatternRenderer = ({ pattern }: { pattern: VisualPattern }) => {
    if (pattern.type === 'grid') {
        // 3x3 그리드 or 1x3 row
        const { rows } = pattern.data;
        return (
            <div className="flex flex-col gap-2 bg-slate-50 p-6 rounded-xl">
                {rows.map((row: any[], rowIdx: number) => (
                    <div key={rowIdx} className="flex gap-2 justify-center">
                        {row.map((cell: any, cellIdx: number) => (
                            <div
                                key={cellIdx}
                                className="w-20 h-20 border-2 border-slate-300 rounded-lg flex items-center justify-center bg-white"
                            >
                                {cell.shape === 'triangle' && <Triangle size={50} fill={cell.fill || 'black'} />}
                                {cell.shape === 'circle' && <Circle size={50} fill={cell.fill || 'black'} />}
                                {cell.shape === 'square' && <Square size={50} fill={cell.fill || 'black'} />}
                                {cell.shape === 'pentagon' && <Pentagon size={50} fill={cell.fill || 'black'} />}
                                {cell.shape === 'empty' && <span className="text-4xl text-slate-300">?</span>}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }

    if (pattern.type === 'sequence') {
        const { items } = pattern.data;
        return (
            <div className="flex gap-4 justify-center items-center bg-slate-50 p-6 rounded-xl">
                {items.map((item: any, idx: number) => (
                    <div key={idx} className="flex flex-col items-center gap-2">
                        <div className="w-20 h-20 border-2 border-slate-300 rounded-lg flex items-center justify-center bg-white">
                            {item.shape === 'arrow' && <Arrow size={50} direction={item.direction} fill={item.fill || 'black'} />}
                            {item.shape === 'dots' && (
                                <div className="grid grid-cols-2 gap-1">
                                    {Array.from({ length: item.count }).map((_, i) => (
                                        <Dot key={i} size={15} fill={item.fill || 'black'} />
                                    ))}
                                </div>
                            )}
                            {item.shape === 'square' && <Square size={50} fill={item.fill || 'black'} />}
                            {item.shape === 'triangle' && <Triangle size={50} fill={item.fill || 'black'} />}
                            {item.shape === 'circle' && <Circle size={50} fill={item.fill || 'black'} />}
                            {item.shape === 'empty' && <span className="text-4xl text-slate-300">?</span>}
                        </div>
                        {item.label && <span className="text-xs text-slate-500">{item.label}</span>}
                    </div>
                ))}
            </div>
        );
    }

    if (pattern.type === 'rotation') {
        const { shape, steps } = pattern.data;
        return (
            <div className="flex gap-4 justify-center items-center bg-slate-50 p-6 rounded-xl">
                {steps.map((step: any, idx: number) => (
                    <div key={idx} className="flex flex-col items-center gap-2">
                        <div className="w-20 h-20 border-2 border-slate-300 rounded-lg flex items-center justify-center bg-white">
                            {shape === 'arrow' && !step.isQuestion && <Arrow size={50} direction={step.direction} fill={step.fill || 'black'} />}
                            {step.isQuestion && <span className="text-4xl text-slate-300">?</span>}
                        </div>
                        {step.label && <span className="text-xs text-slate-500">{step.label}</span>}
                    </div>
                ))}
            </div>
        );
    }

    if (pattern.type === 'dots') {
        const { cells } = pattern.data;
        return (
            <div className="flex gap-4 justify-center items-center bg-slate-50 p-6 rounded-xl">
                {cells.map((cell: any, idx: number) => (
                    <div key={idx} className="flex flex-col items-center gap-2">
                        <div className="w-24 h-24 border-2 border-slate-300 rounded-lg flex items-center justify-center bg-white">
                            {cell.count > 0 ? (
                                <div className={`grid ${cell.count <= 4 ? 'grid-cols-2' : 'grid-cols-3'} gap-2`}>
                                    {Array.from({ length: cell.count }).map((_, i) => (
                                        <Dot key={i} size={cell.count <= 4 ? 20 : 15} fill="black" />
                                    ))}
                                </div>
                            ) : (
                                <span className="text-4xl text-slate-300">?</span>
                            )}
                        </div>
                        {cell.label && <span className="text-xs text-slate-500">{cell.label}</span>}
                    </div>
                ))}
            </div>
        );
    }

    return null;
};
