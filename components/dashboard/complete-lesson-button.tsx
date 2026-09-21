"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useXPToast } from "@/components/dashboard/xp-toast-provider";
import { ACHIEVEMENTS } from "@/lib/data/gamification-config";

export function CompleteLessonButton({
  lessonId,
  alreadyCompleted,
  nextHref,
}: {
  lessonId: string;
  alreadyCompleted: boolean;
  nextHref?: string;
}) {
  const router = useRouter();
  const { fireXP, fireAchievement } = useXPToast();
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(alreadyCompleted);

  async function handleComplete() {
    setLoading(true);
    const res = await fetch(`/api/progress/lesson/${lessonId}`, { method: "POST" });
    const data = await res.json();
    setLoading(false);
    setDone(true);

    if (data.xpAwarded > 0) fireXP(data.xpAwarded, "Lección completada");
    for (const code of data.newAchievements ?? []) {
      const achievement = ACHIEVEMENTS.find((a) => a.code === code);
      if (achievement) fireAchievement(`${achievement.icon} ${achievement.title}`);
    }
    router.refresh();
  }

  if (done) {
    return (
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="secondary" disabled className="flex-1">
          <CheckCircle2 className="h-4 w-4 text-success" />
          Lección completada
        </Button>
        {nextHref && (
          <Button href={nextHref} className="flex-1">
            Siguiente lección
          </Button>
        )}
      </div>
    );
  }

  return (
    <Button onClick={handleComplete} disabled={loading} className="w-full sm:w-auto">
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
      Marcar como completada (+10 XP)
    </Button>
  );
}
