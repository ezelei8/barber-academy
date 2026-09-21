import { ArrowRight, Play, Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(212,162,74,0.14) 0%, rgba(8,8,10,0) 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-gold-500/10 blur-[120px]"
      />

      <Container className="flex flex-col items-center text-center">
        <div className="animate-fade-up flex items-center gap-2 rounded-full border border-carbon-700 bg-carbon-900/60 px-4 py-1.5 text-xs font-medium text-bone-400">
          <span className="flex h-1.5 w-1.5 rounded-full bg-gold-400" />
          Formación online · práctica evaluada · tutor de IA
        </div>

        <h1 className="animate-fade-up mt-7 max-w-4xl text-balance text-4xl font-bold leading-[1.08] tracking-tight text-bone-100 sm:text-6xl md:text-7xl [animation-delay:80ms]">
          Aprendé barbería.
          <br />
          <span className="gold-gradient-text">Dominá la técnica.</span>
          <br />
          Construí tu profesión.
        </h1>

        <p className="animate-fade-up mt-6 max-w-xl text-balance text-base leading-relaxed text-bone-400 sm:text-lg [animation-delay:160ms]">
          Un camino claro, módulo por módulo: desde las herramientas básicas
          hasta los degradados más exigentes, con tareas evaluadas, progreso
          medible y un tutor de IA que responde tus dudas 24/7.
        </p>

        <div className="animate-fade-up mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row [animation-delay:240ms]">
          <Button href="/precios" size="lg" className="w-full sm:w-auto">
            QUIERO APRENDER BARBERÍA
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/curso" variant="secondary" size="lg" className="w-full sm:w-auto">
            <Play className="h-4 w-4" />
            VER EL CURSO
          </Button>
        </div>

        <div className="animate-fade-up mt-8 flex items-center gap-2 text-sm text-bone-600 [animation-delay:320ms]">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
            ))}
          </div>
          <span>Formación estructurada · 8 módulos · práctica desde el día 1</span>
        </div>

        {/* Media placeholder — swap for real hero video/photo of cuts */}
        <div className="animate-scale-in relative mt-16 w-full max-w-5xl [animation-delay:400ms]">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-carbon-700 bg-carbon-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-carbon-850 to-carbon-950 text-bone-600">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-carbon-600 bg-carbon-900/80">
                <Play className="h-6 w-6 translate-x-0.5 text-gold-400" fill="currentColor" />
              </div>
              <p className="text-sm">Video / fotografía de cortes reales — a reemplazar</p>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-4 hidden rounded-xl border border-carbon-700 bg-carbon-900/95 px-4 py-3 shadow-xl backdrop-blur sm:block">
            <p className="text-xs text-bone-600">Alumnos activos</p>
            <p className="text-lg font-semibold text-bone-100">+120</p>
          </div>
          <div className="absolute -right-4 -top-6 hidden rounded-xl border border-carbon-700 bg-carbon-900/95 px-4 py-3 shadow-xl backdrop-blur sm:block">
            <p className="text-xs text-bone-600">Módulos</p>
            <p className="text-lg font-semibold text-bone-100">8 completos</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
