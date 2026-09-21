"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Scissors, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { DASHBOARD_NAV } from "@/components/dashboard/nav-links";
import { Badge } from "@/components/ui/badge";
import type { StudentProfile } from "@/lib/types";
import { BRAND } from "@/lib/brand";

export function MobileTopbar({ student }: { student: StudentProfile }) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  // Close the drawer whenever the route changes. Adjusting state during
  // render (rather than in a useEffect) avoids an extra commit/render pass.
  const [lastPathname, setLastPathname] = React.useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-carbon-800 bg-carbon-950/95 px-4 backdrop-blur lg:hidden">
      <Link href="/dashboard" className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold-500 text-carbon-950">
          <Scissors className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
        <span className="text-xs font-semibold tracking-wide text-bone-100">
          {BRAND.logoText.primary}
          <span className="text-gold-400">{BRAND.logoText.accent}</span>
        </span>
      </Link>

      <div className="flex items-center gap-2">
        <Badge variant="gold" className="hidden xs:inline-flex">
          {student.currentXP.toLocaleString("es-UY")} XP
        </Badge>
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-bone-300"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-carbon-950/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative ml-auto flex h-full w-72 flex-col bg-carbon-900 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between border-b border-carbon-800 p-4">
              <div>
                <p className="text-sm font-medium text-bone-100">{student.name}</p>
                <p className="text-xs text-bone-600">{student.email}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-bone-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto p-3">
              {DASHBOARD_NAV.map((item) => {
                const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium",
                      active ? "bg-gold-500/10 text-gold-400" : "text-bone-300 hover:bg-carbon-800"
                    )}
                  >
                    <item.icon className="h-[18px] w-[18px]" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-3 border-t border-carbon-800 px-6 py-4 text-sm font-medium text-bone-400"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
