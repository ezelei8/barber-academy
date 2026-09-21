import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-tight transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/60 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-gold-500 text-carbon-950 hover:bg-gold-400 shadow-[0_0_0_1px_rgba(212,162,74,0.15),0_8px_24px_-8px_rgba(212,162,74,0.45)]",
        secondary:
          "bg-carbon-800 text-bone-100 border border-carbon-600 hover:bg-carbon-700 hover:border-carbon-500",
        ghost: "text-bone-200 hover:bg-carbon-800/70",
        outline:
          "border border-gold-500/50 text-gold-400 hover:bg-gold-500/10 hover:border-gold-400",
        danger: "bg-danger/10 text-danger border border-danger/30 hover:bg-danger/20",
        link: "text-gold-400 underline-offset-4 hover:underline p-0 h-auto rounded-none",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

export function Button({ className, variant, size, href, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {props.children}
      </Link>
    );
  }
  return <button className={classes} {...props} />;
}
