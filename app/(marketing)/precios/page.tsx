import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BRAND, whatsappLink } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Precios",
  description: `Accedé a la formación completa de ${BRAND.name}: 8 módulos, práctica evaluada y ${BRAND.aiAssistantName}.`,
};

const FEATURES = [
  "Acceso completo a los 8 módulos",
  "Tareas, cuestionarios y evaluaciones",
  "Sistema de XP, niveles, misiones y logros",
  "Barber AI, tu tutor de inteligencia artificial",
  "Seguimiento de progreso ilimitado",
  "Certificado de finalización",
];

export default function PreciosPage() {
  const wa = whatsappLink(`Hola! Quiero anotarme en ${BRAND.name}.`);

  return (
    <section className="py-32 sm:py-40">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Precios"
          align="center"
          title="Una sola formación. Acceso completo."
          description="Sin niveles confusos ni contenido bloqueado por partes: al inscribirte accedés a toda la academia."
          className="mx-auto"
        />

        <Card className="mx-auto mt-12 max-w-md overflow-hidden">
          <div className="border-b border-carbon-700 bg-gradient-to-br from-carbon-850 to-carbon-900 p-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-400">Formación completa</p>
            <p className="mt-3 text-5xl font-bold tracking-tight text-bone-100">
              USD 149
              <span className="text-base font-normal text-bone-600"> / pago único</span>
            </p>
            <p className="mt-2 text-sm text-bone-600">Precio de referencia — configurable desde el panel de administración.</p>
          </div>
          <div className="p-8">
            <ul className="space-y-3">
              {FEATURES.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm text-bone-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-gold-500/70" />
                  {f}
                </li>
              ))}
            </ul>
            <Button href="/register" size="lg" className="mt-7 w-full">
              QUIERO APRENDER BARBERÍA
            </Button>
            <p className="mt-3 text-center text-xs text-bone-700">
              Creás tu cuenta y coordinamos el pago directamente con vos. Ni bien lo confirmamos,
              te habilitamos el acceso completo.
            </p>
          </div>
        </Card>

        <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 rounded-xl border border-gold-500/20 bg-gold-500/5 p-4">
          <p className="text-xs leading-relaxed text-bone-300">
            <strong className="text-bone-100">Cómo se paga:</strong> el pago se coordina por fuera
            de la plataforma (transferencia, efectivo, etc.) — no hay tarjeta ni checkout acá.
            Registrate, escribinos y arrancás apenas confirmemos el pago.
          </p>
          {wa && (
            <Button href={wa} variant="outline" size="sm" className="self-start">
              <MessageCircle className="h-3.5 w-3.5" />
              Escribir por WhatsApp
            </Button>
          )}
        </div>

        <div className="mx-auto mt-4 flex max-w-md gap-3 rounded-xl border border-carbon-700 bg-carbon-900/50 p-4">
          <ShieldCheck className="h-4 w-4 flex-none text-bone-500" />
          <p className="text-xs leading-relaxed text-bone-500">
            Formación educativa. No garantiza ingresos ni resultados profesionales específicos;
            el certificado de finalización acredita haber completado el programa, no una
            certificación profesional oficial.
          </p>
        </div>
      </Container>
    </section>
  );
}
