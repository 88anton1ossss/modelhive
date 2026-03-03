import { motion } from "motion/react";

export function GradientGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, #ff6ec7 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/4 right-0 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Wavy grid lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="wavy-grid"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0,50 Q25,45 50,50 T100,50"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <path
              d="M50,0 Q45,25 50,50 T50,100"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#wavy-grid)" />
      </svg>
    </div>
  );
}

export function DottedPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="dots"
            x="0"
            y="0"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  );
}

export function WavyLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute w-full h-32 top-0 left-0 opacity-30"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#ff6ec7", stopOpacity: 0.6 }} />
            <stop offset="50%" style={{ stopColor: "#8b5cf6", stopOpacity: 0.4 }} />
            <stop offset="100%" style={{ stopColor: "#3b82f6", stopOpacity: 0.6 }} />
          </linearGradient>
        </defs>
        <path
          d="M0,30 Q150,10 300,30 T600,30 T900,30 T1200,30 L1200,0 L0,0 Z"
          fill="url(#wave-gradient-1)"
        />
      </svg>
      
      <svg
        className="absolute w-full h-32 bottom-0 left-0 opacity-30 rotate-180"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#3b82f6", stopOpacity: 0.6 }} />
            <stop offset="50%" style={{ stopColor: "#06b6d4", stopOpacity: 0.4 }} />
            <stop offset="100%" style={{ stopColor: "#10b981", stopOpacity: 0.6 }} />
          </linearGradient>
        </defs>
        <path
          d="M0,30 Q150,10 300,30 T600,30 T900,30 T1200,30 L1200,0 L0,0 Z"
          fill="url(#wave-gradient-2)"
        />
      </svg>
    </div>
  );
}
