import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  className,
  trackClassName,
  barClassName,
  showLabel = false,
}: {
  value: number; // 0-100
  className?: string;
  trackClassName?: string;
  barClassName?: string;
  showLabel?: boolean;
}) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "h-2 flex-1 overflow-hidden rounded-full bg-carbon-700",
          trackClassName
        )}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 transition-[width] duration-700 ease-out",
            barClassName
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium tabular-nums text-bone-400">{Math.round(pct)}%</span>
      )}
    </div>
  );
}
