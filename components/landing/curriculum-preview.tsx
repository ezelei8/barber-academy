import { CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MODULES } from "@/lib/data/course-content";

export function CurriculumPreview() {
  return (
    <section className="border-y border-carbon-800 bg-carbon-900/40 py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="El curso"
          title="8 módulos, de cero a tu proyecto propio"
          description="Cada módulo se apoya en el anterior. Herramientas, fundamentos, degradados, cortes, barba, práctica, trabajo profesional y tu propio proyecto de barbería."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MODULES.map((m, i) => (
            <Card
              key={m.id}
              className="animate-fade-up flex flex-col p-6 transition-colors hover:border-gold-500/30"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="text-xs font-semibold tracking-widest text-gold-500/70">
                MÓDULO {m.order}
              </span>
              <h3 className="mt-2 text-base font-semibold text-bone-100">{m.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-bone-500">{m.subtitle}</p>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-bone-600">
                <CheckCircle2 className="h-3.5 w-3.5 text-gold-500/60" />
                {m.lessons.length} lecciones
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/curso" variant="outline" size="lg">
            Ver el programa completo
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
