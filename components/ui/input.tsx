import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-12 w-full rounded-xl border border-carbon-600 bg-carbon-900 px-4 text-sm text-bone-100 placeholder:text-bone-700 outline-none transition-colors focus:border-gold-500/60 focus:ring-2 focus:ring-gold-500/20",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full rounded-xl border border-carbon-600 bg-carbon-900 px-4 py-3 text-sm text-bone-100 placeholder:text-bone-700 outline-none transition-colors focus:border-gold-500/60 focus:ring-2 focus:ring-gold-500/20",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("mb-1.5 block text-sm font-medium text-bone-200", className)}
      {...props}
    />
  );
}
