import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

/**
 * DEMO content — replace with the real instructor's photo, bio and
 * credentials before launch. Structure is ready: photo, name, story,
 * experience, specialty, teaching philosophy.
 */
const INSTRUCTOR = {
  name: "Nombre del Instructor",
  role: "Barbero profesional · Fundador de la academia",
  specialty: "Degradados y técnica de navaja",
  bio: "Más de una década detrás del sillón, formando barberos desde cero. Esta academia nace de una idea simple: la técnica se enseña con método, no solo con práctica repetida.",
  philosophy:
    "\"No creo en atajos. Creo en fundamentos sólidos, práctica evaluada y en darle a cada alumno un camino claro para saber, en todo momento, en qué punto está parado.\"",
};

export function InstructorSection() {
  return (
    <section id="instructor" className="py-24 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <Badge variant="gold" className="mb-5">El instructor</Badge>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-bone-100 sm:text-4xl">
            {INSTRUCTOR.name}
          </h2>
          <p className="mt-1.5 text-sm font-medium text-gold-400">{INSTRUCTOR.role}</p>

          <p className="mt-6 text-base leading-relaxed text-bone-400">{INSTRUCTOR.bio}</p>

          <div className="mt-6 rounded-xl border-l-2 border-gold-500/50 bg-carbon-900/60 p-5">
            <p className="text-sm italic leading-relaxed text-bone-300">{INSTRUCTOR.philosophy}</p>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-carbon-800 pt-6">
            <div>
              <dt className="text-xs uppercase tracking-wider text-bone-600">Especialidad</dt>
              <dd className="mt-1 text-sm font-medium text-bone-200">{INSTRUCTOR.specialty}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-bone-600">Formato</dt>
              <dd className="mt-1 text-sm font-medium text-bone-200">100% online, a tu ritmo</dd>
            </div>
          </dl>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-carbon-700 bg-gradient-to-br from-carbon-850 to-carbon-950">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-bone-700">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-carbon-600 bg-carbon-900">
                <User className="h-8 w-8" />
              </div>
              <p className="px-8 text-center text-xs text-bone-600">
                Foto del instructor — a reemplazar
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
