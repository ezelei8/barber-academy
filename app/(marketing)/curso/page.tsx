import type { Metadata } from "next";
import { CheckCircle2, Clock, Layers, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ModuleAccordion } from "@/components/landing/module-accordion";
import { MODULES, COURSE_META } from "@/lib/data/course-content";

export const metadata: Metadata = {
  title: "El curso",
  description:
    "Programa completo de la formación en barbería: 8 módulos, desde herramientas y fundamentos hasta degradados, cortes, barba y tu propio proyecto.",
};

const INCLUDES = [
  "8 módulos completos, de fundamentos a proyecto propio",
  "Tareas evaluadas: cuestionarios, prácticas y entregas en foto/video",
  "Sistema de XP, niveles, misiones y logros",
  "Barber AI: tutor de inteligencia artificial dentro de la plataforma",
  "Seguimiento automático de tu progreso módulo a módulo",
  "Certificado de finalización al completar la formación",
];

export default function CursoPage() {
  const totalLessons = MODULES.reduce((s, m) => s + m.lessons.length, 0);
  const totalMinutes = Math.round(
    MODULES.reduce((s, m) => s + m.lessons.reduce((s2, l) => s2 + l.durationSec, 0), 0) / 60
  );

  return (
    <>
      <section className="pb-16 pt-32 sm:pb-20 sm:pt-40">
        <Container>
          <SectionHeading
            eyebrow="Programa completo"
            title={COURSE_META.title}
            description={COURSE_META.description}
          />

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-carbon-700 bg-carbon-900/50 p-4">
              <Layers className="h-4 w-4 text-gold-400" />
              <p className="mt-2 text-xl font-semibold text-bone-100">{MODULES.length}</p>
              <p className="text-xs text-bone-600">Módulos</p>
            </div>
            <div className="rounded-xl border border-carbon-700 bg-carbon-900/50 p-4">
              <CheckCircle2 className="h-4 w-4 text-gold-400" />
              <p className="mt-2 text-xl font-semibold text-bone-100">{totalLessons}</p>
              <p className="text-xs text-bone-600">Lecciones</p>
            </div>
            <div className="rounded-xl border border-carbon-700 bg-carbon-900/50 p-4">
              <Clock className="h-4 w-4 text-gold-400" />
              <p className="mt-2 text-xl font-semibold text-bone-100">~{Math.round(totalMinutes / 60)}h</p>
              <p className="text-xs text-bone-600">De contenido</p>
            </div>
            <div className="rounded-xl border border-carbon-700 bg-carbon-900/50 p-4">
              <Sparkles className="h-4 w-4 text-gold-400" />
              <p className="mt-2 text-xl font-semibold text-bone-100">100%</p>
              <p className="text-xs text-bone-600">A tu ritmo</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-14">
        <Container className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <ModuleAccordion modules={MODULES} />

          <aside className="h-fit space-y-6 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-carbon-700 bg-carbon-900/60 p-6">
              <h3 className="text-sm font-semibold text-bone-100">Qué incluye</h3>
              <ul className="mt-4 space-y-3">
                {INCLUDES.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-bone-400">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-gold-500/70" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button href="/precios" className="mt-6 w-full">
                QUIERO APRENDER BARBERÍA
              </Button>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
