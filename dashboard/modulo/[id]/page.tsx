import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Circle, PlayCircle, FileText, ClipboardList, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCurrentStudent } from "@/lib/get-current-student";
import { getModuleProgress } from "@/lib/gamification";
import { getModuleById, getTasksForModule } from "@/lib/data/course-content";
import { cn, formatDuration } from "@/lib/utils";

const TASK_STATUS_LABEL: Record<string, string> = {
  PENDING: "Pendiente",
  IN_PROGRESS: "En progreso",
  SUBMITTED: "Enviada",
  COMPLETED: "Completada",
};

export default async function ModuloPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const courseModule = getModuleById(id);
  if (!courseModule) notFound();

  const student = await getCurrentStudent();
  const progress = getModuleProgress(student, courseModule.id);
  const tasks = getTasksForModule(courseModule.id);

  return (
    <div className="flex flex-col gap-6">
      <Link href="/dashboard/curso" className="flex items-center gap-1.5 text-sm text-bone-500 hover:text-bone-200">
        <ArrowLeft className="h-4 w-4" />
        Mi curso
      </Link>

      <div>
        <span className="text-xs font-semibold tracking-widest text-gold-500/70">MÓDULO {courseModule.order}</span>
        <h1 className="mt-1 text-2xl font-semibold text-bone-100 sm:text-3xl">{courseModule.title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-bone-500">{courseModule.description}</p>
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-bone-300">Progreso del módulo</span>
            <span className="text-bone-400">{progress.completed}/{progress.total} lecciones</span>
          </div>
          <ProgressBar value={progress.percent} className="mt-3" />
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-bone-200">Lecciones</h2>
        <div className="divide-y divide-carbon-800 overflow-hidden rounded-2xl border border-carbon-700 bg-carbon-850/50">
          {courseModule.lessons.map((lesson) => {
            const completed = student.completedLessonIds.includes(lesson.id);
            return (
              <Link
                key={lesson.id}
                href={`/dashboard/leccion/${lesson.id}`}
                className="flex items-center gap-3 p-4 transition-colors hover:bg-carbon-800/40 sm:p-5"
              >
                {completed ? (
                  <CheckCircle2 className="h-4 w-4 flex-none text-success" />
                ) : (
                  <Circle className="h-4 w-4 flex-none text-bone-700" />
                )}
                {lesson.type === "VIDEO" ? (
                  <PlayCircle className="h-4 w-4 flex-none text-bone-600" />
                ) : (
                  <FileText className="h-4 w-4 flex-none text-bone-600" />
                )}
                <span className={cn("flex-1 text-sm", completed ? "text-bone-400" : "text-bone-100")}>
                  {lesson.title}
                </span>
                <span className="text-xs tabular-nums text-bone-700">{formatDuration(lesson.durationSec)}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {tasks.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-semibold text-bone-200">Tareas del módulo</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {tasks.map((task) => {
              const completed = student.completedTaskIds.includes(task.id);
              return (
                <Link
                  key={task.id}
                  href="/dashboard/tareas"
                  className="flex flex-col gap-2 rounded-xl border border-carbon-700 bg-carbon-900/40 p-4 hover:border-gold-500/30"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <ClipboardList className="h-4 w-4 text-bone-600" />
                      <span className="text-sm font-medium text-bone-100">{task.title}</span>
                    </div>
                    <Badge variant={completed ? "success" : "neutral"}>
                      {completed ? "Completada" : TASK_STATUS_LABEL[task.status]}
                    </Badge>
                  </div>
                  <p className="text-xs text-bone-600">+{task.xpReward} XP</p>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <Button href="/dashboard/tareas" variant="ghost">Ver todas mis tareas</Button>
      </div>
    </div>
  );
}
