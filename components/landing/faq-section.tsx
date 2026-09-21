"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "¿Necesito experiencia previa para empezar?",
    a: "No. La formación arranca desde cero: herramientas, higiene y fundamentos antes de tocar cualquier técnica de degradado o corte.",
  },
  {
    q: "¿Voy a recibir un título oficial?",
    a: "Al completar los 8 módulos y cumplir los requisitos definidos, obtenés un certificado de finalización de la formación. No es una certificación profesional oficial ni garantiza empleabilidad.",
  },
  {
    q: "¿Cómo funciona la práctica y evaluación?",
    a: "Cada módulo incluye tareas: cuestionarios, ejercicios prácticos y entregas en foto o video. Recibís feedback y XP por cada una.",
  },
  {
    q: "¿Qué es Barber AI?",
    a: "Un tutor de inteligencia artificial dentro de la plataforma que conoce el contenido del curso y tu progreso, y te ayuda a resolver dudas técnicas en el momento.",
  },
  {
    q: "¿Puedo hacer el curso desde el celular?",
    a: "Sí. Toda la plataforma está diseñada mobile-first: lecciones, tareas, misiones y Barber AI funcionan igual de bien en tu teléfono.",
  },
  {
    q: "¿Cómo se paga el curso?",
    a: "El sistema de pagos está preparado para integrarse con un proveedor (por ejemplo Stripe o Mercado Pago) apenas se configure. Vas a ver el estado real reflejado en /precios.",
  },
];

export function FAQSection() {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <section id="preguntas" className="py-24 sm:py-28">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="Preguntas frecuentes" title="Todo lo que necesitás saber" align="center" className="mx-auto" />

        <div className="mt-12 divide-y divide-carbon-800 border-y border-carbon-800">
          {FAQS.map((item, i) => (
            <div key={item.q}>
              <button
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-sm font-medium text-bone-100 sm:text-base">{item.q}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 flex-none text-bone-500 transition-transform duration-300",
                    open === i && "rotate-180 text-gold-400"
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid overflow-hidden transition-all duration-300 ease-out",
                  open === i ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                )}
              >
                <p className="min-h-0 text-sm leading-relaxed text-bone-500">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
