import * as React from "react";
import { motion } from "motion/react";
import { cn } from "./utils";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  gradient?: "pink-purple" | "purple-blue" | "blue-cyan" | "cyan-green" | "yellow-orange";
  size?: "sm" | "md" | "lg";
}

const gradients = {
  "pink-purple": "from-[#ff6ec7] to-[#8b5cf6]",
  "purple-blue": "from-[#8b5cf6] to-[#3b82f6]",
  "blue-cyan": "from-[#3b82f6] to-[#06b6d4]",
  "cyan-green": "from-[#06b6d4] to-[#10b981]",
  "yellow-orange": "from-[#fbbf24] to-[#f97316]",
};

const sizes = {
  sm: "h-8 px-3 text-sm rounded-2xl",
  md: "h-10 px-6 text-base rounded-2xl",
  lg: "h-12 px-8 text-lg rounded-3xl",
};

export function GradientButton({
  children,
  gradient = "pink-purple",
  size = "md",
  className,
  ...props
}: GradientButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative inline-flex items-center justify-center font-medium text-white overflow-hidden transition-all",
        "disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500",
        sizes[size],
        className
      )}
      {...props}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradients[gradient]}`} />
      
      {/* Animated gradient overlay on hover */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${gradients[gradient]} opacity-0`}
        whileHover={{ opacity: 0.3 }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradients[gradient]} blur-xl opacity-50 -z-10`} />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}

export function WavyButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative inline-flex items-center justify-center px-8 py-3 font-medium text-white overflow-hidden transition-all",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      style={{
        clipPath: "url(#wavy-clip)",
      }}
      {...props}
    >
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="wavy-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.1 Q 0.1,0 0.2,0.1 T 0.4,0.1 T 0.6,0.1 T 0.8,0.1 T 1,0.1 L 1,0.9 Q 0.9,1 0.8,0.9 T 0.6,0.9 T 0.4,0.9 T 0.2,0.9 T 0,0.9 Z" />
          </clipPath>
        </defs>
      </svg>
      
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
