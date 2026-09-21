import type { Metadata } from "next";
import Link from "next/link";
import { Layers, PlayCircle, ClipboardList } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MODULES } from "@/lib/data/course-content";

export const metadata: Metadata = { title: "Módulos" };

export default function AdminModulosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-bone-100 sm:text-3xl">Módulos</h1>
          <p className="mt-1 text-sm text-bone-500">Estructura del curso — {MODULES.length} módulos.</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {MODULES.map((m) => (
          <Card key={m.id}>
            <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-carbon-800 text-sm font-semibold text-gold-400">
                  {m.order}
                </div>
                <div>
                  <p className="text-sm font-semibold text-bone-100">{m.title}</p>
                  <p className="mt-0.5 max-w-xl text-xs leading-relaxed text-bone-500">{m.description}</p>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-bone-600">
                    <span className="flex items-center gap-1"><PlayCircle className="h-3.5 w-3.5" /> {m.lessons.length} lecciones</span>
                    <span className="flex items-center gap-1"><ClipboardList className="h-3.5 w-3.5" /> {m.taskIds.length} tareas</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-none items-center gap-2">
                <Badge variant="success">Publicado</Badge>
                <Link
                  href={`/admin/lecciones#${m.id}`}
                  className="rounded-lg border border-carbon-600 px-3 py-1.5 text-xs font-medium text-bone-300 hover:border-gold-500/40 hover:text-gold-400"
                >
                  Ver lecciones
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-2.5 rounded-xl border border-carbon-700 bg-carbon-900/40 p-4 text-xs text-bone-600">
        <Layers className="h-4 w-4 flex-none text-bone-500" />
        Crear, reordenar y despublicar módulos requiere persistencia en base de datos
        (modelo <code className="text-bone-400">Module</code>). La estructura ya está lista para
        editarse una vez conectada.
      </div>
    </div>
  );
}
