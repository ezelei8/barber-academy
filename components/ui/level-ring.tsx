"use client";

import { cn } from "@/lib/utils";

/** Circular progress ring showing XP progress toward the next level. */
export function LevelRing({
  percent,
  size = 96,
  strokeWidth = 7,
  level,
  className,
}: {
  percent: number;
  size?: number;
  strokeWidth?: number;
  level: number;
  className?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(100, Math.max(0, percent));
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-carbon-700)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#level-ring-gradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 900ms cubic-bezier(0.16,1,0.3,1)" }}
        />
        <defs>
          <linearGradient id="level-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-gold-300)" />
            <stop offset="100%" stopColor="var(--color-gold-600)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[10px] font-medium tracking-wide text-bone-600 uppercase">Nivel</span>
        <span className="text-xl font-bold text-bone-100">{level}</span>
      </div>
    </div>
  );
}
