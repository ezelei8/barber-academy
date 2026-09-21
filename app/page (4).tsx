import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame, PlayCircle, Target, Trophy, Bot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { LevelRing } from "@/components/ui/level-ring";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCurrentStudent } from "@/lib/get-current-student";
import { getCourseProgress, getNextLesson, getUnlockedAchievements } from "@/lib/gamification";
import { getLevelProgress } from "@/lib/data/gamification-config";
import { MISSIONS } from "@/lib/data/gamification-config";
import { getModuleById } from "@/lib/data/course-content";
import { formatDuration, formatNumber } from "@/lib/utils";

export const metadata: Metadata = { title: "Mi dashboard" };

export default async function DashboardHomePage() {
  const student = await getCurrentStudent();
  const courseProgress = getCourseProgress(student);
  const levelProgress = getLevelProgress(student.currentXP);
  const next = getNextLesson(student);
  const mission = MISSIONS[0];
  const achievements = getUnlockedAchievements(student);
  const currentModule = getModuleById(student.lastActiveModuleId);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-bone-100 sm:text-3xl">Hola, {student.name}</h1>
        <p className="mt-1 text-sm text-bone-500">Continuá con tu aprendizaje.</p>
      </div>

      {/* Level + XP + course progress */}
      <Card className="overflow-hidden">
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-5">
            <LevelRing percent={levelProgress.percent} level={levelProgress.current.order} size={92} />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-bone-600">
                Nivel {levelProgress.current.order}
              </p>
              <p className="text-lg font-semibold text-bone-100">{levelProgress.current.name}</p>
              <p className="mt-1 text-sm text-bone-500">
                {formatNumber(student.currentXP)} XP
                {levelProgress.next && ` / ${formatNumber(levelProgress.next.minXP)} XP`}
              </p>
            </div>
          </div>

          <div className="flex-1 sm:pl-8 sm:border-l sm:border-carbon-700">
            <ProgressBar value={levelProgress.percent} showLabel className="mb-4" />
            <div className="flex items-center gap-2 text-xs text-bone-600">
              <Flame className="h-3.5 w-3.5 text-gold-400" />
              Racha de {student.streakDays} días seguidos aprendiendo
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-bone-700">
              El nivel refleja tu progreso educativo dentro de la plataforma. No es una
              certificación profesional ni garantiza que estés listo para ejercer.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Next lesson */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-bone-100">Próxima lección</h2>
              <Badge variant="neutral">{currentModule?.title}</Badge>
            </div>

            {next ? (
              <Link
                href={`/dashboard/leccion/${next.lesson.id}`}
                className="mt-4 flex items-center gap-4 rounded-xl border border-carbon-700 bg-carbon-900/50 p-4 transition-colors hover:border-gold-500/30"
              >
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-gold-500/10 text-gold-400">
                  <PlayCircle className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-bone-100">{next.lesson.title}</p>
                  <p className="text-xs text-bone-600">
                    {next.module.title} · {formatDuration(next.lesson.durationSec)}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 flex-none text-bone-600" />
              </Link>
            ) : (
              <p className="mt-4 text-sm text-bone-500">¡Completaste todas las lecciones disponibles!</p>
            )}

            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-carbon-800 pt-5 text-center">
              <div>
                <p className="text-lg font-semibold text-bone-100">{courseProgress.completedLessons}</p>
                <p className="text-[11px] text-bone-600">Lecciones vistas</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-bone-100">{courseProgress.modulesComplete}/{courseProgress.totalModules}</p>
                <p className="text-[11px] text-bone-600">Módulos completos</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-bone-100">{courseProgress.percent}%</p>
                <p className="text-[11px] text-bone-600">Progreso total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mission of the day */}
        <Card className="border-gold-500/20 bg-gradient-to-br from-carbon-850 to-carbon-900">
          <CardContent className="flex h-full flex-col p-6">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-gold-400" />
              <h2 className="text-sm font-semibold text-bone-100">Misión de hoy</h2>
            </div>
            <p className="mt-3 text-sm font-medium text-bone-100">
              {mission.emoji} {mission.title}
            </p>
            <ol className="mt-3 flex-1 space-y-1.5 text-xs text-bone-500">
              {mission.steps.map((s, i) => (
                <li key={s}>{i + 1}. {s}</li>
              ))}
            </ol>
            <div className="mt-4 flex items-center justify-between">
              <Badge variant="gold">+{mission.xpReward} XP</Badge>
              <Button href="/dashboard/misiones" size="sm" variant="outline">
                Ver misión
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Achievements preview */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-gold-400" />
                <h2 className="text-sm font-semibold text-bone-100">Logros recientes</h2>
              </div>
              <Link href="/dashboard/logros" className="text-xs font-medium text-gold-400 hover:underline">
                Ver todos
              </Link>
            </div>
            <div className="mt-4 flex gap-3">
              {achievements.slice(0, 4).map((a) => (
                <div
                  key={a.id}
                  title={a.title}
                  className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl border border-gold-500/25 bg-gold-500/5 text-2xl"
                >
                  {a.icon}
                </div>
              ))}
              {achievements.length === 0 && (
                <p className="text-sm text-bone-600">Todavía no desbloqueaste logros. ¡Arrancá una tarea!</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Barber AI teaser */}
        <Card className="border-gold-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-gold-400" />
              <h2 className="text-sm font-semibold text-bone-100">Barber AI</h2>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-bone-500">
              ¿No te sale el fade? ¿Dudas sobre qué máquina usar? Preguntale a tu tutor de IA,
              que conoce el curso y tu progreso.
            </p>
            <Button href="/dashboard/barber-ai" variant="secondary" className="mt-4 w-full">
              Hablar con Barber AI
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
