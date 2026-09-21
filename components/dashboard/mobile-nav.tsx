"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MOBILE_PRIMARY_NAV } from "@/components/dashboard/nav-links";

/** One-handed bottom navigation for mobile — the 5 most-used destinations. */
export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-carbon-800 bg-carbon-950/95 pb-safe pt-1.5 backdrop-blur lg:hidden">
      <div className="grid grid-cols-5">
        {MOBILE_PRIMARY_NAV.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 py-2"
            >
              <item.icon
                className={cn("h-5 w-5", active ? "text-gold-400" : "text-bone-600")}
              />
              <span className={cn("text-[10px] font-medium", active ? "text-gold-400" : "text-bone-600")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
