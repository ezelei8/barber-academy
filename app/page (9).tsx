import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Play, FileText, Bot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCurrentStudent } from "@/lib/get-current-student";
import { getLessonById } from "@/lib/data/course-content";
import { CompleteLessonButton } from "@/components/dashboard/complete-lesson-button";
import { formatDuration } from "@/lib/utils";

export default async function LeccionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = getLessonById(id);
  if (!found) notFound();
  const { lesson, module } = found;

  const student = await getCurrentStudent();
  const completed = student.completedLessonIds.includes(lesson.id);

  const lessonIndex = module.lessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = module.lessons[lessonIndex + 1];

  return (
    <div className="flex flex-col gap-6">
      <Link
        href={`/dashboard/modulo/${module.id}`}
        className="flex items-center gap-1.5 text-sm text-bone-500 hover:text-bone-200"
      >
        <ArrowLeft className="h-4 w-4" />
        {module.title}
      </Link>

      <div>
        <Badge variant="neutral">Módulo {module.order} · {module.title}</Badge>
        <h1 className="mt-3 text-2xl font-semibold text-bone-100 sm:text-3xl">{lesson.title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-bone-500">{lesson.summary}</p>
      </div>

      {lesson.type === "VIDEO" ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-carbon-700 bg-carbon-900">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-bone-600">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-carbon-600 bg-carbon-900/80">
              <Play className="h-6 w-6 translate-x-0.5 text-gold-400" fill="currentColor" />
            </div>
            <p className="text-sm">Video no conectado — falta un proveedor de almacenamiento/streaming</p>
            <p className="text-xs text-bone-700">Duración estimada: {formatDuration(lesson.durationSec)}</p>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="flex items-start gap-3 p-6">
            <FileText className="mt-0.5 h-5 w-5 flex-none text-gold-400" />
            <div>
              <p className="text-sm text-bone-300">
                Esta es una lección de lectura. El contenido completo se carga desde el panel de
                administración — acá se muestra el resumen de la clase.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-bone-400">{lesson.summary}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <CompleteLessonButton
        lessonId={lesson.id}
        alreadyCompleted={completed}
        nextHref={nextLesson ? `/dashboard/leccion/${nextLesson.id}` : undefined}
      />

      <Card className="border-gold-500/20 bg-carbon-900/40">
        <CardContent className="flex items-center gap-4 p-5">
          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gold-500/10 text-gold-400">
            <Bot className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-bone-100">¿No te quedó claro algo de esta lección?</p>
            <p className="text-xs text-bone-500">Preguntale a Barber AI — conoce este módulo y tu progreso.</p>
          </div>
          <Link href="/dashboard/barber-ai" className="text-sm font-medium text-gold-400 hover:underline">
            Preguntar
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
