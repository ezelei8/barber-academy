import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 80% at 50% 50%, rgba(212,162,74,0.12) 0%, rgba(8,8,10,0) 70%)",
        }}
      />
      <Container className="flex flex-col items-center rounded-3xl border border-carbon-700 bg-carbon-900/60 px-6 py-16 text-center sm:px-16">
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-bone-100 sm:text-4xl md:text-5xl">
          Tu formación en barbería empieza con un solo paso
        </h2>
        <p className="mt-4 max-w-xl text-balance text-base text-bone-400 sm:text-lg">
          Registrate, entrá a tu dashboard y arrancá el Módulo 1 hoy mismo.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button href="/precios" size="lg">
            QUIERO APRENDER BARBERÍA
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/curso" variant="ghost" size="lg">
            Ver el curso primero
          </Button>
        </div>
      </Container>
    </section>
  );
}
