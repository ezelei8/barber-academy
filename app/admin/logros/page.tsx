import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ACHIEVEMENTS } from "@/lib/data/gamification-config";
import { LEVELS } from "@/lib/data/gamification-config";
import { AdminSaveBar } from "@/components/admin/save-bar";

export const metadata: Metadata = { title: "Logros" };

const CONDITION_LABEL: Record<string, string> = {
  MODULE_COMPLETE: "Módulos completados",
  TASK_COUNT: "Cantidad de tareas",
  STREAK_DAYS: "Días de racha",
  FIRST_SUBMISSION: "Primera entrega",
  COURSE_COMPLETE: "Curso completo",
  CUSTOM: "Condición personalizada",
};

export default function AdminLogrosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-bone-100 sm:text-3xl">Logros y niveles</h1>
        <p className="mt-1 text-sm text-bone-500">Condiciones de desbloqueo automático y niveles del curso.</p>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-bone-200">Logros</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((a) => (
            <Card key={a.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{a.icon}</span>
                  <Badge variant="neutral">{a.code}</Badge>
                </div>
                <p className="mt-2 text-sm font-medium text-bone-100">{a.title}</p>
                <p className="mt-1 text-xs text-bone-500">{a.description}</p>
                <p className="mt-2 text-[11px] text-bone-600">
                  Condición: {CONDITION_LABEL[a.condition]} ≥ {a.threshold}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-bone-200">Niveles</h2>
        <Card>
          <div className="divide-y divide-carbon-800">
            {LEVELS.map((l) => (
              <div key={l.order} className="flex items-center justify-between gap-3 p-4">
                <div>
                  <p className="text-sm font-medium text-bone-100">Nivel {l.order} — {l.name}</p>
                  <p className="text-xs text-bone-600">{l.description}</p>
                </div>
                <Badge variant="gold">{l.minXP.toLocaleString("es-UY")} XP</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <AdminSaveBar entity="logros y niveles" />
    </div>
  );
}
