"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/brand";

const NAV_LINKS = [
  { href: "/curso", label: "El curso" },
  { href: "/precios", label: "Precios" },
  { href: "/#instructor", label: "Instructor" },
  { href: "/#preguntas", label: "Preguntas" },
];

export function MarketingNavbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [lastPathname, setLastPathname] = React.useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-carbon-700 bg-carbon-950/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500 text-carbon-950">
            <Scissors className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span className="text-sm font-semibold tracking-wide text-bone-100">
            {BRAND.logoText.primary}
            <span className="text-gold-400">{BRAND.logoText.accent}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-bone-400 transition-colors hover:text-bone-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button href="/login" variant="ghost" size="sm">
            Iniciar sesión
          </Button>
          <Button href="/precios" variant="primary" size="sm">
            Quiero aprender
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-bone-200 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-carbon-700 bg-carbon-950 px-5 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-sm font-medium text-bone-300 hover:bg-carbon-800 hover:text-bone-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <Button href="/login" variant="secondary" className="w-full">
              Iniciar sesión
            </Button>
            <Button href="/precios" variant="primary" className="w-full">
              Quiero aprender barbería
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
