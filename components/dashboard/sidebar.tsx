"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scissors, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { DASHBOARD_NAV } from "@/components/dashboard/nav-links";
import { LevelRing } from "@/components/ui/level-ring";
import type { StudentProfile } from "@/lib/types";
import { getLevelProgress } from "@/lib/data/gamification-config";
import { BRAND } from "@/lib/brand";

export function DashboardSidebar({ student }: { student: StudentProfile }) {
  const pathname = usePathname();
  const levelProgress = getLevelProgress(student.currentXP);

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-carbon-800 bg-carbon-950 lg:flex">
      <Link href="/dashboard" className="flex items-center gap-2.5 px-6 py-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500 text-carbon-950">
          <Scissors className="h-4 w-4" strokeWidth={2.5} />
        </span>
        <span className="text-sm font-semibold tracking-wide text-bone-100">
          {BRAND.logoText.primary}
          <span className="text-gold-400">{BRAND.logoText.accent}</span>
        </span>
      </Link>

      <nav className="flex-1 space-y-1 px-3">
        {DASHBOARD_NAV.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-gold-500/10 text-gold-400"
                  : "text-bone-500 hover:bg-carbon-800/70 hover:text-bone-200"
              )}
            >
              <item.icon className="h-[18px] w-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mx-3 mb-3 rounded-2xl border border-carbon-700 bg-carbon-900/60 p-4">
        <div className="flex items-center gap-3">
          <LevelRing percent={levelProgress.percent} level={levelProgress.current.order} size={52} strokeWidth={4} />
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-bone-100">{levelProgress.current.name}</p>
            <p className="text-[11px] text-bone-600">{student.currentXP.toLocaleString("es-UY")} XP</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-carbon-800 p-4">
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-carbon-800 text-xs font-semibold text-bone-200">
          {student.avatarInitials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-bone-100">{student.name}</p>
          <p className="truncate text-xs text-bone-600">{student.email}</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          aria-label="Cerrar sesión"
          className="flex h-8 w-8 flex-none items-center justify-center rounded-lg text-bone-600 hover:bg-carbon-800 hover:text-bone-200"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
