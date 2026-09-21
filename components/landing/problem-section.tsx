import { Compass, Scissors, ListX, Eye, Wrench, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";

const PROBLEMS = [
  { icon: Compass, title: "No sabe por dónde empezar", description: "Demasiada información suelta y ningún orden claro para avanzar." },
  { icon: Scissors, title: "Mira tutoriales aislados", description: "Videos sueltos que no se conectan entre sí ni construyen una base real." },
  { icon: ListX, title: "No tiene una metodología", description: "Practica sin un camino estructurado que le diga qué sigue después." },
  { icon: Eye, title: "No sabe qué está haciendo mal", description: "Practica, pero no tiene forma de evaluar ni corregir su propia técnica." },
  { icon: Wrench, title: "No sabe qué herramientas necesita", description: "Duda entre marcas, tipos de máquina y qué realmente vale la pena comprar." },
  { icon: Users, title: "Le cuesta conseguir sus primeros clientes", description: "Sabe cortar, pero no sabe cómo empezar a construir su propia base de clientes." },
];

export function ProblemSection() {
  return (
    <section className="py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="El problema"
          title="Aprender barbería solo, a los ponchazos, no funciona"
          description="Si te identificás con alguno de estos puntos, no es que te falte talento: te falta una estructura."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <Card
              key={p.title}
              className="animate-fade-up p-6 transition-colors hover:border-carbon-500"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-carbon-800 text-gold-400">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold text-bone-100">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-bone-500">{p.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
