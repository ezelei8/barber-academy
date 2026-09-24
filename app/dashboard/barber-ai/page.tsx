import type { Metadata } from "next";
import { Info } from "lucide-react";
import { getCurrentStudent } from "@/lib/get-current-student";
import { BarberAIChat } from "@/components/dashboard/barber-ai-chat";

export const metadata: Metadata = { title: "Barber AI" };

export default async function BarberAIPage() {
  const student = await getCurrentStudent();
  const aiConnected = Boolean(process.env.ANTHROPIC_API_KEY);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-bone-100 sm:text-3xl">Barber AI</h1>
        <p className="mt-1 text-sm text-bone-500">
          Tu tutor de inteligencia artificial. Conoce el curso, tus módulos y tu progreso.
        </p>
      </div>

      {!aiConnected && (
        <div className="flex gap-3 rounded-xl border border-warning/25 bg-warning/5 p-4">
          <Info className="h-4 w-4 flex-none text-warning" />
          <p className="text-xs leading-relaxed text-bone-400">
            <strong className="text-bone-200">ANTHROPIC_API_KEY no configurada</strong> en este
            entorno — Barber AI va a avisarte esto mismo dentro del chat en lugar de simular una
            respuesta. Configurala en las variables de entorno del servidor para activarlo.
          </p>
        </div>
      )}

      <BarberAIChat studentName={student.name} />
    </div>
  );
}
