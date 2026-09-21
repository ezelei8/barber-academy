import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { LevelRing } from "@/components/ui/level-ring";
import { Badge } from "@/components/ui/badge";
import { Bot, Target, Trophy, Flame } from "lucide-react";
import { DEMO_STUDENT } from "@/lib/data/demo-student";
import { getCourseProgress, getModuleProgress } from "@/lib/gamification";
import { getLevelProgress } from "@/lib/data/gamification-config";

export function PlatformPreview() {
  const courseProgress = getCourseProgress(DEMO_STUDENT);
  const levelProgress = getLevelProgress(DEMO_STUDENT.currentXP);
  const moduleProgress = getModuleProgress(DEMO_STUDENT, "m3");

  return (
    <section className="py-24 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Tu plataforma"
            title="No es solo un curso. Es tu propio camino, con seguimiento real"
            description="Nivel, XP, misiones diarias, logros y progreso automático — para que siempre sepas exactamente en qué punto de tu formación estás."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3 rounded-xl border border-carbon-700 bg-carbon-900/50 p-4">
              <Target className="h-5 w-5 flex-none text-gold-400" />
              <div>
                <p className="text-sm font-medium text-bone-100">Misiones diarias</p>
                <p className="mt-0.5 text-xs leading-relaxed text-bone-500">Objetivos concretos que te guían paso a paso.</p>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-carbon-700 bg-carbon-900/50 p-4">
              <Trophy className="h-5 w-5 flex-none text-gold-400" />
              <div>
                <p className="text-sm font-medium text-bone-100">Logros y progreso</p>
                <p className="mt-0.5 text-xs leading-relaxed text-bone-500">Cada avance queda registrado automáticamente.</p>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-carbon-700 bg-carbon-900/50 p-4">
              <Bot className="h-5 w-5 flex-none text-gold-400" />
              <div>
                <p className="text-sm font-medium text-bone-100">Barber AI</p>
                <p className="mt-0.5 text-xs leading-relaxed text-bone-500">Tutor de IA que conoce tu curso y tu progreso.</p>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-carbon-700 bg-carbon-900/50 p-4">
              <Flame className="h-5 w-5 flex-none text-gold-400" />
              <div>
                <p className="text-sm font-medium text-bone-100">Racha de estudio</p>
                <p className="mt-0.5 text-xs leading-relaxed text-bone-500">Mantenete constante, un poco cada día.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live dashboard preview using real demo data */}
        <Card className="animate-scale-in overflow-hidden p-0">
          <div className="flex items-center justify-between border-b border-carbon-700 p-5">
            <div>
              <p className="text-xs text-bone-600">Hola, {DEMO_STUDENT.name}</p>
              <p className="text-sm font-medium text-bone-100">Continuá con tu aprendizaje</p>
            </div>
            <Badge variant="gold">{DEMO_STUDENT.streakDays} días de racha 🔥</Badge>
          </div>
          <div className="flex items-center gap-5 p-5">
            <LevelRing percent={levelProgress.percent} level={levelProgress.current.order} size={84} />
            <div className="flex-1">
              <p className="text-sm font-semibold text-bone-100">{levelProgress.current.name}</p>
              <p className="mt-1 text-xs text-bone-500">
                {DEMO_STUDENT.currentXP.toLocaleString("es-UY")} XP
                {levelProgress.next && ` · faltan ${(levelProgress.next.minXP - DEMO_STUDENT.currentXP).toLocaleString("es-UY")} para subir de nivel`}
              </p>
              <ProgressBar value={levelProgress.percent} className="mt-2.5" />
            </div>
          </div>
          <div className="space-y-3 border-t border-carbon-700 p-5">
            <div className="flex items-center justify-between text-xs text-bone-500">
              <span>Progreso general del curso</span>
              <span className="font-medium text-bone-300">{courseProgress.percent}%</span>
            </div>
            <ProgressBar value={courseProgress.percent} />
            <div className="flex items-center justify-between text-xs text-bone-500">
              <span>Módulo actual: Degradados</span>
              <span className="font-medium text-bone-300">{moduleProgress.completed}/{moduleProgress.total} lecciones</span>
            </div>
          </div>
          <div className="flex items-center gap-3 border-t border-carbon-700 bg-carbon-900/60 p-5">
            <span className="text-lg">🎯</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-bone-100">Misión de hoy</p>
              <p className="text-xs text-bone-500">Realizá tu primer Mid Fade — +250 XP</p>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}
