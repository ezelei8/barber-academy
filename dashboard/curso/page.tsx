import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Lock, PlayCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Badge } from "@/components/ui/badge";
import { getCurrentStudent } from "@/lib/get-current-student";
import { getCourseProgress, getModuleProgress } from "@/lib/gamification";
import { MODULES, COURSE_META } from "@/lib/data/course-content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Mi curso" };

export default async function MiCursoPage() {
  const student = await getCurrentStudent();
  const courseProgress = getCourseProgress(student);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-bone-100 sm:text-3xl">{COURSE_META.shortTitle}</h1>
        <p className="mt-1 text-sm text-bone-500">
          {courseProgress.completedLessons} de {courseProgress.totalLessons} lecciones completadas.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-bone-200">Progreso general del curso</span>
            <span className="text-bone-400">{courseProgress.percent}%</span>
          </div>
          <ProgressBar value={courseProgress.percent} className="mt-3" />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {MODULES.map((module, i) => {
          const progress = getModuleProgress(student, module.id);
          const prevComplete = i === 0 || getModuleProgress(student, MODULES[i - 1].id).isComplete;
          const isLocked = !prevComplete && progress.completed === 0;

          return (
            <Link
              key={module.id}
              href={isLocked ? "#" : `/dashboard/modulo/${module.id}`}
              aria-disabled={isLocked}
              className={cn(
                "group rounded-2xl border border-carbon-700 bg-carbon-850/60 p-5 transition-colors",
                isLocked ? "cursor-not-allowed opacity-60" : "hover:border-gold-500/30"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-semibold tracking-widest text-gold-500/70">
                    MÓDULO {module.order}
                  </span>
                  <h3 className="mt-1 text-base font-semibold text-bone-100">{module.title}</h3>
                  <p className="mt-1 text-xs text-bone-600">{module.subtitle}</p>
                </div>
                {progress.isComplete ? (
                  <CheckCircle2 className="h-5 w-5 flex-none text-success" />
                ) : isLocked ? (
                  <Lock className="h-5 w-5 flex-none text-bone-700" />
                ) : (
                  <PlayCircle className="h-5 w-5 flex-none text-gold-400" />
                )}
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-bone-600">
                  <span>{progress.completed}/{progress.total} lecciones</span>
                  <span>{progress.percent}%</span>
                </div>
                <ProgressBar value={progress.percent} className="mt-2" />
              </div>

              {progress.isComplete && (
                <Badge variant="success" className="mt-4">Completado</Badge>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
