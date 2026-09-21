import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold-500/25 bg-gold-500/5 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-gold-400 uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-bone-100 sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-balance text-base leading-relaxed text-bone-400 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
