import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MISSIONS } from "@/lib/data/gamification-config";
import { getModuleById } from "@/lib/data/course-content";
import { AdminSaveBar } from "@/components/admin/save-bar";

export const metadata: Metadata = { title: "Misiones" };

export default function AdminMisionesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-bone-100 sm:text-3xl">Misiones</h1>
        <p className="mt-1 text-sm text-bone-500">Misiones activas que ven los alumnos en su dashboard.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {MISSIONS.map((m) => {
          const linkedModule = m.moduleId ? getModuleById(m.moduleId) : null;
          return (
            <Card key={m.id}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{m.emoji}</span>
                  <Badge variant="gold">+{m.xpReward} XP</Badge>
                </div>
                <h3 className="mt-3 text-sm font-semibold text-bone-100">{m.title}</h3>
                {linkedModule && <p className="mt-1 text-xs text-bone-600">Vinculada a: {linkedModule.title}</p>}
                <ol className="mt-3 space-y-1 text-xs text-bone-500">
                  {m.steps.map((s, i) => <li key={s}>{i + 1}. {s}</li>)}
                </ol>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <AdminSaveBar entity="misiones" />
    </div>
  );
}
