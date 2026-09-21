import Link from "next/link";
import { Scissors } from "lucide-react";
import { BRAND } from "@/lib/brand";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-5 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 0%, rgba(212,162,74,0.12) 0%, rgba(8,8,10,0) 65%)",
        }}
      />
      <Link href="/" className="mb-8 flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-500 text-carbon-950">
          <Scissors className="h-4 w-4" strokeWidth={2.5} />
        </span>
        <span className="text-sm font-semibold tracking-wide text-bone-100">
          {BRAND.logoText.primary}
          <span className="text-gold-400">{BRAND.logoText.accent}</span>
        </span>
      </Link>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
