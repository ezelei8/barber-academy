import type { Metadata } from "next";
import { Flame, Trophy, ClipboardCheck, BookOpen, Award, Lock, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import { getCurrentStudent } from "@/lib/get-current-student";
import { getCourseProgress, getModuleProgress, getTaskCounts, getUnlockedAchievements } from "@/lib/gamification";
import { getLevelProgress } from "@/lib/data/gamification-config";
import { MODULES } from "@/lib/data/course-content";
import { formatNumber } from "@/lib/utils";

export const metadata: Metadata = { title: "Mi progreso" };

export default async function ProgresoPage() {
  const student = await getCurrentStudent();
  const courseProgress = getCourseProgress(student);
  const levelProgress = getLevelProgress(student.currentXP);
  const taskCounts = getTaskCounts(student);
  const achievements = getUnlockedAchievements(student);

  const stats = [
    { icon: BookOpen, label: "Lecciones completadas", value: `${courseProgress.completedLessons}/${courseProgress.totalLessons}` },
    { icon: ClipboardCheck, label: "Tareas completadas", value: `${taskCounts.completed}/${taskCounts.total}` },
    { icon: Trophy, label: "Logros desbloqueados", value: achievements.length },
    { icon: Flame, label: "Racha actual", value: `${student.streakDays} días` },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-bone-100 sm:text-3xl">Mi progreso</h1>
        <p className="mt-1 text-sm text-bone-500">
          Te faltan {courseProgress.remainingLessons} lecciones para completar la formación.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <s.icon className="h-4 w-4 text-gold-400" />
              <p className="mt-2 text-xl font-semibold text-bone-100">{s.value}</p>
              <p className="text-[11px] text-bone-600">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-bone-200">
              {levelProgress.current.name} · Nivel {levelProgress.current.order}
            </span>
            <span className="text-bone-500">
              {formatNumber(student.currentXP)} XP
              {levelProgress.next && ` / ${formatNumber(levelProgress.next.minXP)} XP`}
            </span>
          </div>
          <ProgressBar value={levelProgress.percent} className="mt-3" />
          {levelProgress.next ? (
            <p className="mt-2 text-xs text-bone-600">
              Te faltan {formatNumber(levelProgress.next.minXP - student.currentXP)} XP para
              alcanzar el nivel &quot;{levelProgress.next.name}&quot;.
            </p>
          ) : (
            <p className="mt-2 text-xs text-bone-600">Alcanzaste el nivel máximo de la formación.</p>
          )}
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-bone-200">Progreso por módulo</h2>
        <div className="flex flex-col gap-3">
          {MODULES.map((m) => {
            const p = getModuleProgress(student, m.id);
            return (
              <Card key={m.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-bone-200">Módulo {m.order} · {m.title}</span>
                    <span className="text-bone-500">{p.completed}/{p.total}</span>
                  </div>
                  <ProgressBar value={p.percent} className="mt-2.5" />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-carbon-700 bg-carbon-900/40 p-4 text-xs leading-relaxed text-bone-600">
        El progreso general del curso se calcula sobre lecciones completadas. El total de XP
        también cuenta tareas, cuestionarios y misiones, por eso puede avanzar más rápido que
        el porcentaje de lecciones.
      </div>

      <Card className={courseProgress.percent >= 100 ? "border-gold-500/30 bg-gold-500/5" : undefined}>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-carbon-800 text-gold-400">
            {courseProgress.percent >= 100 ? <Award className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-bone-100">Certificado de finalización</p>
            <p className="text-xs text-bone-500">
              {courseProgress.percent >= 100
                ? "Completaste la formación. Generá tu certificado en PDF."
                : `Se desbloquea al completar el 100% del curso (te faltan ${courseProgress.remainingLessons} lecciones).`}
            </p>
          </div>
          {courseProgress.percent >= 100 && (
            <Button href="/api/certificates/generate" size="sm">
              <Download className="h-4 w-4" />
              Descargar
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
