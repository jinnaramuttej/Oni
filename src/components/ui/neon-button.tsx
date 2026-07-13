"use client";
import React from 'react'
import { cn } from '@/lib/utils'

const variantClasses = {
    default: "bg-white/5 hover:bg-white/10 border-white/10 backdrop-blur-md",
    solid: "bg-white text-black border-transparent transition-all duration-200",
    ghost: "border-transparent bg-transparent hover:border-white/10 hover:bg-white/5",
};

const sizeClasses = {
    default: "px-7 py-2",
    sm: "px-4 py-1",
    lg: "px-10 py-3",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "solid" | "ghost";
    size?: "default" | "sm" | "lg";
    neon?: boolean;
}

const NeonButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, neon = true, size = "default", variant = "default", children, ...props }, ref) => {
        const baseClass = "relative group border text-foreground mx-auto text-center rounded-full transition-all duration-300 font-semibold";
        const vClass = variantClasses[variant] || variantClasses.default;
        const sClass = sizeClasses[size] || sizeClasses.default;

        return (
            <button
                className={cn(baseClass, vClass, sClass, className)}
                ref={ref}
                {...props}
            >
                <span className={cn("absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 inset-y-0 bg-gradient-to-r w-3/4 mx-auto from-transparent via-white/60 to-transparent hidden", neon && "block")} />
                {children}
                <span className={cn("absolute group-hover:opacity-30 transition-all duration-500 ease-in-out inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-white/60 to-transparent hidden", neon && "block")} />
            </button>
        );
    }
)

NeonButton.displayName = 'NeonButton';

export { NeonButton };
