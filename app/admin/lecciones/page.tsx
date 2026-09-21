import type { Metadata } from "next";
import { PlayCircle, FileText, Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MODULES } from "@/lib/data/course-content";
import { formatDuration } from "@/lib/utils";

export const metadata: Metadata = { title: "Lecciones" };

export default function AdminLeccionesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-bone-100 sm:text-3xl">Lecciones</h1>
        <p className="mt-1 text-sm text-bone-500">
          Video no conectado a un proveedor de almacenamiento — ver README, sección
          &quot;Almacenamiento&quot;.
        </p>
      </div>

      {MODULES.map((m) => (
        <div key={m.id} id={m.id} className="scroll-mt-20">
          <h2 className="mb-3 text-sm font-semibold text-bone-200">
            Módulo {m.order} — {m.title}
          </h2>
          <Card>
            <div className="divide-y divide-carbon-800">
              {m.lessons.map((l) => (
                <CardContent key={l.id} className="flex items-center gap-3 p-4">
                  {l.type === "VIDEO" ? (
                    <PlayCircle className="h-4 w-4 flex-none text-bone-600" />
                  ) : (
                    <FileText className="h-4 w-4 flex-none text-bone-600" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-bone-100">{l.title}</p>
                    <p className="text-xs text-bone-600">{formatDuration(l.durationSec)} · +{l.xpReward} XP</p>
                  </div>
                  {l.videoUrl ? (
                    <Badge variant="success">Video cargado</Badge>
                  ) : l.type === "VIDEO" ? (
                    <button className="flex items-center gap-1.5 rounded-lg border border-dashed border-carbon-600 px-3 py-1.5 text-xs text-bone-500" disabled>
                      <Upload className="h-3.5 w-3.5" />
                      Subir video
                    </button>
                  ) : (
                    <Badge variant="neutral">Texto</Badge>
                  )}
                </CardContent>
              ))}
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
