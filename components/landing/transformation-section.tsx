import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const STEPS = [
  { n: "01", title: "Principiante", description: "Arrancás sin experiencia previa, con las herramientas y la bioseguridad como base." },
  { n: "02", title: "Aprendizaje estructurado", description: "Avanzás módulo por módulo: fundamentos, degradados, cortes y barba, en orden." },
  { n: "03", title: "Práctica", description: "Aplicás cada técnica en ejercicios y trabajos reales, con misiones guiadas." },
  { n: "04", title: "Evaluación", description: "Tus tareas y cuestionarios se revisan, con feedback concreto para corregir." },
  { n: "05", title: "Formación completada", description: "Cerrás los 8 módulos con un proyecto propio y tu certificado de finalización." },
];

export function TransformationSection() {
  return (
    <section className="border-y border-carbon-800 bg-carbon-900/40 py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="La transformación"
          align="center"
          title="Un camino educativo, no una promesa vacía"
          description="No prometemos resultados económicos garantizados. Te damos una formación completa, medible y evaluada, paso a paso."
          className="mx-auto"
        />

        <div className="relative mx-auto mt-16 max-w-3xl">
          <div className="absolute left-[27px] top-2 bottom-2 w-px bg-carbon-700" />
          <ol className="flex flex-col gap-10">
            {STEPS.map((step, i) => (
              <li
                key={step.n}
                className="animate-fade-up relative flex gap-5"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="relative z-10 flex h-14 w-14 flex-none items-center justify-center rounded-full border border-carbon-600 bg-carbon-900 text-sm font-semibold text-gold-400">
                  {step.n}
                </div>
                <div className={cn("flex-1 pt-2.5")}>
                  <h3 className="text-lg font-semibold text-bone-100 sm:text-xl">{step.title}</h3>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed text-bone-500">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
