import { Clock3, Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { BRAND, whatsappLink } from "@/lib/brand";
import type { StudentProfile } from "@/lib/types";
import { SignOutButton } from "@/components/dashboard/sign-out-button";

/**
 * Se muestra en lugar del dashboard completo mientras el alumno está en
 * PENDING_PAYMENT. El pago se coordina por fuera de la plataforma (no hay
 * pasarela conectada), así que esta pantalla explica el paso siguiente y da
 * los mismos canales de contacto que /precios. El admin aprueba el acceso
 * desde /admin/alumnos una vez que confirma el pago.
 */
export function PendingPaymentScreen({ student }: { student: StudentProfile }) {
  const wa = whatsappLink(`Hola! Soy ${student.name}, ya me registré en ${BRAND.name} y quiero coordinar el pago.`);

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-16">
      <Container className="max-w-md text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400">
          <Clock3 className="h-6 w-6" />
        </span>
        <h1 className="mt-5 text-xl font-semibold text-bone-100 sm:text-2xl">
          Tu cuenta está creada, falta confirmar el pago
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-bone-500">
          Hola {student.name.split(" ")[0]}. En {BRAND.name} el pago se coordina directamente con
          nosotros (no por acá). Ni bien lo confirmemos, habilitamos tu acceso completo al curso —
          no hace falta que hagas nada más.
        </p>

        <div className="mt-7 flex flex-col gap-2.5">
          {wa && (
            <Button href={wa} size="lg" className="w-full">
              <MessageCircle className="h-4 w-4" />
              Coordinar pago por WhatsApp
            </Button>
          )}
          {BRAND.contactEmail && (
            <Button href={`mailto:${BRAND.contactEmail}`} variant="secondary" size="lg" className="w-full">
              <Mail className="h-4 w-4" />
              Escribir a {BRAND.contactEmail}
            </Button>
          )}
          {!wa && !BRAND.contactEmail && (
            <p className="rounded-xl border border-carbon-700 bg-carbon-900/60 p-4 text-xs text-bone-600">
              Todavía no se cargó un medio de contacto para esta academia (WhatsApp o email en
              lib/brand.ts). Mientras tanto, coordiná el pago por el canal que ya usás con el
              alumno.
            </p>
          )}
        </div>

        <p className="mt-6 text-xs text-bone-700">
          Ya pagaste y seguís viendo esta pantalla? Puede que todavía no lo hayamos aprobado del
          lado nuestro — probá de nuevo en un rato.
        </p>

        <div className="mt-8 border-t border-carbon-800 pt-5">
          <SignOutButton />
        </div>
      </Container>
    </div>
  );
}
