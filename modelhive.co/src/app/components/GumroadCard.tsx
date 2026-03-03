import { motion } from "motion/react";
import { cn } from "./ui/utils";

interface GumroadCardProps {
  children: React.ReactNode;
  gradient?: "pink-purple" | "purple-blue" | "blue-cyan" | "cyan-green" | "yellow-orange" | "orange-red";
  className?: string;
  hover?: boolean;
}

const gradients = {
  "pink-purple": "from-pink-500/10 to-purple-500/10 border-pink-500/20 hover:border-pink-500/40",
  "purple-blue": "from-purple-500/10 to-blue-500/10 border-purple-500/20 hover:border-purple-500/40",
  "blue-cyan": "from-blue-500/10 to-cyan-500/10 border-blue-500/20 hover:border-blue-500/40",
  "cyan-green": "from-cyan-500/10 to-green-500/10 border-cyan-500/20 hover:border-cyan-500/40",
  "yellow-orange": "from-yellow-500/10 to-orange-500/10 border-yellow-500/20 hover:border-yellow-500/40",
  "orange-red": "from-orange-500/10 to-red-500/10 border-orange-500/20 hover:border-orange-500/40",
};

const glowColors = {
  "pink-purple": "shadow-pink-500/10 hover:shadow-pink-500/20",
  "purple-blue": "shadow-purple-500/10 hover:shadow-purple-500/20",
  "blue-cyan": "shadow-blue-500/10 hover:shadow-blue-500/20",
  "cyan-green": "shadow-cyan-500/10 hover:shadow-cyan-500/20",
  "yellow-orange": "shadow-yellow-500/10 hover:shadow-yellow-500/20",
  "orange-red": "shadow-orange-500/10 hover:shadow-orange-500/20",
};

export function GumroadCard({
  children,
  gradient = "pink-purple",
  className,
  hover = true,
}: GumroadCardProps) {
  const Component = hover ? motion.div : "div";
  const motionProps = hover
    ? {
        whileHover: { y: -4, scale: 1.01 },
        transition: { duration: 0.2 },
      }
    : {};

  return (
    <Component
      className={cn(
        "relative bg-gradient-to-br backdrop-blur-sm border rounded-3xl p-6 transition-all shadow-xl",
        gradients[gradient],
        glowColors[gradient],
        className
      )}
      {...motionProps}
    >
      {children}
    </Component>
  );
}

export function BlobCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-3xl", className)}>
      {/* Animated blob background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            fill="#ff6ec7"
            d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.8C64.7,56.4,53.6,69,39.9,76.4C26.1,83.8,9.7,86,-7.1,86.1C-23.9,86.2,-41.2,84.2,-54.9,76.7C-68.6,69.2,-78.7,56.2,-84.4,41.8C-90.1,27.4,-91.4,11.6,-88.7,-3.3C-86,-18.2,-79.3,-32.2,-70.3,-44.7C-61.3,-57.2,-50,-68.2,-36.8,-76.1C-23.6,-84,-11.8,-88.8,1.3,-91.1C14.4,-93.4,30.6,-83.6,44.7,-76.4Z"
            transform="translate(100 100)"
          />
        </svg>
      </motion.div>

      <div className="relative z-10 bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-6">
        {children}
      </div>
    </div>
  );
}

export function StripedCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl bg-card/50 backdrop-blur border border-border p-6",
        className
      )}
    >
      {/* Diagonal stripes pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            currentColor 10px,
            currentColor 20px
          )`,
        }}
      />
      
      <div className="relative z-10">{children}</div>
    </div>
  );
}
