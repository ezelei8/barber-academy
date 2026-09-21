"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scissors, LogOut, ArrowLeft } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { ADMIN_NAV } from "@/components/admin/nav-links";
import { BRAND } from "@/lib/brand";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-carbon-800 bg-carbon-950 lg:flex">
      <Link href="/admin" className="flex items-center gap-2.5 px-6 py-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500 text-carbon-950">
          <Scissors className="h-4 w-4" strokeWidth={2.5} />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold tracking-wide text-bone-100">
            {BRAND.logoText.primary}
            <span className="text-gold-400">{BRAND.logoText.accent}</span>
          </p>
          <p className="text-[10px] tracking-widest text-bone-600">PANEL ADMIN</p>
        </div>
      </Link>

      <nav className="flex-1 space-y-1 px-3">
        {ADMIN_NAV.map((item) => {
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

      <Link
        href="/dashboard"
        className="mx-3 mb-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-bone-500 hover:bg-carbon-800/70 hover:text-bone-200"
      >
        <ArrowLeft className="h-[18px] w-[18px]" />
        Vista de alumno
      </Link>

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mx-3 mb-4 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-bone-500 hover:bg-carbon-800/70 hover:text-bone-200"
      >
        <LogOut className="h-[18px] w-[18px]" />
        Cerrar sesión
      </button>
    </aside>
  );
}
