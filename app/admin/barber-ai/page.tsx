import type { Metadata } from "next";
import { Bot, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input, Label, Textarea } from "@/components/ui/input";
import { MODULES } from "@/lib/data/course-content";
import { AdminSaveBar } from "@/components/admin/save-bar";

export const metadata: Metadata = { title: "Barber AI" };

export default function AdminBarberAIPage() {
  const connected = Boolean(process.env.ANTHROPIC_API_KEY);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-bone-100 sm:text-3xl">Barber AI</h1>
        <p className="mt-1 text-sm text-bone-500">Estado de conexión y base de conocimiento del tutor.</p>
      </div>

      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-carbon-800 text-gold-400">
            <Bot className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-bone-100">Modelo de lenguaje (Anthropic API)</p>
            <p className="text-xs text-bone-600">
              Variable de entorno requerida: <code className="text-bone-400">ANTHROPIC_API_KEY</code>
            </p>
          </div>
          {connected ? (
            <Badge variant="success"><CheckCircle2 className="h-3 w-3" /> Conectado</Badge>
          ) : (
            <Badge variant="danger"><XCircle className="h-3 w-3" /> No conectado</Badge>
          )}
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-bone-200">
          Contenido autorizado usado como base ({MODULES.reduce((s, m) => s + m.lessons.length, 0)} lecciones)
        </h2>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs leading-relaxed text-bone-500">
              Barber AI responde primero con el resumen de cada módulo y lección del curso (ver
              /dashboard/curso), además del progreso real del alumno. Para agregar conocimiento
              adicional — técnicas específicas, notas del instructor, respuestas a dudas
              frecuentes — se usa la tabla <code className="text-bone-400">AIKnowledge</code> del
              schema, editable desde este panel una vez conectada la base de datos.
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-bone-200">Agregar contenido a la base de conocimiento</h2>
        <Card>
          <CardContent className="flex flex-col gap-4 p-6">
            <div>
              <Label htmlFor="ai-title">Título</Label>
              <Input id="ai-title" placeholder='Ej: "Cómo corregir un skin fade marcado"' />
            </div>
            <div>
              <Label htmlFor="ai-content">Contenido</Label>
              <Textarea id="ai-content" rows={4} placeholder="Explicación detallada para que Barber AI la use al responder..." />
            </div>
          </CardContent>
        </Card>
      </div>

      <AdminSaveBar entity="la base de conocimiento de Barber AI" />
    </div>
  );
}
