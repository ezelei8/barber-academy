import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        gold: "bg-gold-500/10 text-gold-400 border border-gold-500/25",
        neutral: "bg-carbon-800 text-bone-400 border border-carbon-600",
        success: "bg-success/10 text-success border border-success/25",
        warning: "bg-warning/10 text-warning border border-warning/25",
        danger: "bg-danger/10 text-danger border border-danger/25",
        info: "bg-info/10 text-info border border-info/25",
      },
    },
    defaultVariants: { variant: "neutral" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
