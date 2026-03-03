export function WavyBorder({ 
  className = "", 
  color = "#8b5cf6",
  position = "top" 
}: { 
  className?: string; 
  color?: string;
  position?: "top" | "bottom";
}) {
  return (
    <div className={`absolute left-0 right-0 ${position === "top" ? "top-0" : "bottom-0"} overflow-hidden ${className}`}>
      <svg
        className="relative block w-full"
        style={{ height: "40px" }}
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={position === "top" 
            ? "M0,20 Q300,0 600,20 T1200,20 L1200,0 L0,0 Z"
            : "M0,20 Q300,40 600,20 T1200,20 L1200,40 L0,40 Z"
          }
          fill={color}
          opacity="0.8"
        />
      </svg>
    </div>
  );
}

export function WavyDivider({ 
  gradient = "var(--gradient-pink-purple)",
  height = "60px"
}: { 
  gradient?: string;
  height?: string;
}) {
  return (
    <div className="relative w-full" style={{ height }}>
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wavyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#ff6ec7", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#8b5cf6", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path
          d="M0,60 Q150,30 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z"
          fill="url(#wavyGradient)"
        />
      </svg>
    </div>
  );
}

export function BlobShape({ 
  className = "",
  color = "#ff6ec7"
}: { 
  className?: string;
  color?: string;
}) {
  return (
    <div className={`absolute ${className}`}>
      <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          fill={color}
          d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.8C64.7,56.4,53.6,69,39.9,76.4C26.1,83.8,9.7,86,-7.1,86.1C-23.9,86.2,-41.2,84.2,-54.9,76.7C-68.6,69.2,-78.7,56.2,-84.4,41.8C-90.1,27.4,-91.4,11.6,-88.7,-3.3C-86,-18.2,-79.3,-32.2,-70.3,-44.7C-61.3,-57.2,-50,-68.2,-36.8,-76.1C-23.6,-84,-11.8,-88.8,1.3,-91.1C14.4,-93.4,30.6,-83.6,44.7,-76.4Z"
          transform="translate(100 100)"
          opacity="0.15"
        />
      </svg>
    </div>
  );
}
