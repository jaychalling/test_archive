"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "dashed";
    className?: string;
    children: React.ReactNode;
}

export const Button = ({ variant = "primary", className = "", children, ...props }: ButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-slate-900 text-white hover:bg-slate-800",
        secondary: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-100",
        outline: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50",
        ghost: "bg-transparent text-gray-500 hover:text-gray-900",
        dashed: "bg-white border border-dashed border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50",
    };

    const variantStyles = variants[variant] || variants.primary;

    return (
        <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
            {children}
        </button>
    );
};
