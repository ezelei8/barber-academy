import Link from "next/link";
import { Scissors } from "lucide-react";
import { Container } from "@/components/ui/container";
import { InstagramIcon, TikTokIcon } from "@/components/icons/social-icons";
import { BRAND } from "@/lib/brand";

export function MarketingFooter() {
  return (
    <footer className="border-t border-carbon-800 bg-carbon-950">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500 text-carbon-950">
              <Scissors className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <span className="text-sm font-semibold tracking-wide text-bone-100">
              {BRAND.logoText.primary}
              <span className="text-gold-400">{BRAND.logoText.accent}</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone-600">
            {BRAND.footerTagline}
          </p>
          <div className="mt-5 flex gap-3">
            <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-carbon-700 text-bone-500 hover:border-gold-500/40 hover:text-gold-400">
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a href="#" aria-label="TikTok" className="flex h-9 w-9 items-center justify-center rounded-full border border-carbon-700 text-bone-500 hover:border-gold-500/40 hover:text-gold-400">
              <TikTokIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-bone-600">Academia</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/curso" className="text-bone-400 hover:text-bone-100">El curso</Link></li>
            <li><Link href="/precios" className="text-bone-400 hover:text-bone-100">Precios</Link></li>
            <li><Link href="/#instructor" className="text-bone-400 hover:text-bone-100">Instructor</Link></li>
            <li><Link href="/#preguntas" className="text-bone-400 hover:text-bone-100">Preguntas frecuentes</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-bone-600">Cuenta</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/login" className="text-bone-400 hover:text-bone-100">Iniciar sesión</Link></li>
            <li><Link href="/register" className="text-bone-400 hover:text-bone-100">Crear cuenta</Link></li>
            <li><Link href="/dashboard" className="text-bone-400 hover:text-bone-100">Mi plataforma</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-bone-600">Legal</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li><span className="text-bone-600">Términos de uso</span></li>
            <li><span className="text-bone-600">Privacidad</span></li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-carbon-800 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-bone-700 sm:flex-row">
          <p>© {new Date().getFullYear()} {BRAND.name}. Todos los derechos reservados.</p>
          <p>Contenido educativo. No garantiza resultados profesionales ni certificación oficial.</p>
        </Container>
      </div>
    </footer>
  );
}
