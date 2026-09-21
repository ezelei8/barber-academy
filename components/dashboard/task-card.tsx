"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, Image as ImageIcon, Video, HelpCircle, ClipboardCheck, PenLine, ListChecks } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { useXPToast } from "@/components/dashboard/xp-toast-provider";
import { ACHIEVEMENTS } from "@/lib/data/gamification-config";
import type { CourseTask } from "@/lib/types";

const TYPE_ICON: Record<CourseTask["type"], React.ElementType> = {
  QUESTION: PenLine,
  QUIZ: HelpCircle,
  PRACTICAL: ClipboardCheck,
  PHOTO_UPLOAD: ImageIcon,
  VIDEO_UPLOAD: Video,
  SELF_ASSESSMENT: ListChecks,
};

const TYPE_LABEL: Record<CourseTask["type"], string> = {
  QUESTION: "Pregunta",
  QUIZ: "Cuestionario",
  PRACTICAL: "Ejercicio práctico",
  PHOTO_UPLOAD: "Subida de foto",
  VIDEO_UPLOAD: "Subida de video",
  SELF_ASSESSMENT: "Autoevaluación",
};

const STATUS_META: Record<string, { icon: string; label: string; variant: "neutral" | "info" | "success" }> = {
  PENDING: { icon: "○", label: "Pendiente", variant: "neutral" },
  IN_PROGRESS: { icon: "◔", label: "En progreso", variant: "info" },
  SUBMITTED: { icon: "◔", label: "Enviada", variant: "info" },
  COMPLETED: { icon: "✓", label: "Completada", variant: "success" },
};

export function TaskCard({ task, completed, moduleTitle }: { task: CourseTask; completed: boolean; moduleTitle: string }) {
  const router = useRouter();
  const { fireXP, fireAchievement } = useXPToast();
  const [expanded, setExpanded] = React.useState(false);
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(completed);

  const Icon = TYPE_ICON[task.type];
  const status = done ? "COMPLETED" : task.status;
  const statusMeta = STATUS_META[status];
  const needsFile = task.type === "PHOTO_UPLOAD" || task.type === "VIDEO_UPLOAD";
  const needsText = task.type === "QUESTION" || task.type === "SELF_ASSESSMENT";

  async function handleSubmit() {
    setLoading(true);
    const res = await fetch(`/api/tasks/${task.id}/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) return;

    setDone(true);
    setExpanded(false);
    if (data.xpAwarded > 0) fireXP(data.xpAwarded, task.title);
    for (const code of data.newAchievements ?? []) {
      const achievement = ACHIEVEMENTS.find((a) => a.code === code);
      if (achievement) fireAchievement(`${achievement.icon} ${achievement.title}`);
    }
    router.refresh();
  }

  return (
    <Card className={done ? "opacity-70" : undefined}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-carbon-800 text-bone-400">
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-bone-600">{moduleTitle} · {TYPE_LABEL[task.type]}</p>
              <h3 className="mt-0.5 text-sm font-semibold text-bone-100">{task.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-bone-500">{task.description}</p>
            </div>
          </div>
          <Badge variant={statusMeta.variant}>{statusMeta.icon} {statusMeta.label}</Badge>
        </div>

        {task.feedback && (
          <div className="mt-3 rounded-lg border border-carbon-700 bg-carbon-900/50 p-3 text-xs text-bone-400">
            <span className="font-medium text-bone-300">Feedback del instructor: </span>
            {task.feedback}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-medium text-gold-500/80">+{task.xpReward} XP</span>
          {!done && (
            <Button size="sm" variant={expanded ? "secondary" : "outline"} onClick={() => setExpanded((v) => !v)}>
              {expanded ? "Cancelar" : "Completar tarea"}
            </Button>
          )}
        </div>

        {expanded && !done && (
          <div className="mt-4 space-y-3 border-t border-carbon-800 pt-4">
            {needsText && (
              <Textarea
                rows={3}
                placeholder="Escribí tu respuesta..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            )}
            {needsFile && (
              <div className="rounded-xl border border-dashed border-carbon-600 p-4 text-center">
                <input type="file" accept={task.type === "PHOTO_UPLOAD" ? "image/*" : "video/*"} className="mx-auto text-xs text-bone-500" disabled />
                <p className="mt-2 text-[11px] text-bone-700">
                  La subida de archivos requiere un proveedor de almacenamiento conectado (ver README).
                  Por ahora podés marcar la tarea como enviada.
                </p>
              </div>
            )}
            {task.type === "QUIZ" && (
              <p className="text-xs text-bone-500">
                El cuestionario interactivo se configura desde /admin/tareas. Esta demo simula la
                aprobación al confirmar.
              </p>
            )}
            {task.type === "PRACTICAL" && (
              <p className="text-xs text-bone-500">
                Practicá la técnica y confirmá cuando termines. Los ejercicios prácticos evaluados
                se revisan desde el panel del instructor.
              </p>
            )}
            <Button onClick={handleSubmit} disabled={loading} className="w-full">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Confirmar y enviar
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
