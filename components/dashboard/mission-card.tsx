"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, PartyPopper } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useXPToast } from "@/components/dashboard/xp-toast-provider";
import type { Mission } from "@/lib/types";

export function MissionCard({ mission, completed }: { mission: Mission; completed: boolean }) {
  const router = useRouter();
  const { fireMission, fireXP } = useXPToast();
  const [loading, setLoading] = React.useState(false);
  const [checked, setChecked] = React.useState<boolean[]>(mission.steps.map(() => false));
  const [done, setDone] = React.useState(completed);

  const allChecked = checked.every(Boolean);

  async function handleComplete() {
    setLoading(true);
    const res = await fetch(`/api/missions/${mission.id}/complete`, { method: "POST" });
    const data = await res.json();
    setLoading(false);
    setDone(true);
    if (data.xpAwarded > 0) {
      fireMission("🎉 Misión completada");
      fireXP(data.xpAwarded, mission.title);
    }
    router.refresh();
  }

  return (
    <Card className={done ? "border-success/30" : "border-gold-500/20"}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-2xl">{mission.emoji}</span>
          <Badge variant={done ? "success" : "gold"}>
            {done ? (
              <span className="flex items-center gap-1"><PartyPopper className="h-3 w-3" /> Completada</span>
            ) : (
              `+${mission.xpReward} XP`
            )}
          </Badge>
        </div>
        <h3 className="mt-3 text-base font-semibold text-bone-100">{mission.title}</h3>

        <ol className="mt-4 space-y-2.5">
          {mission.steps.map((step, i) => (
            <li key={step} className="flex items-start gap-2.5">
              <button
                type="button"
                disabled={done}
                onClick={() =>
                  setChecked((prev) => prev.map((c, idx) => (idx === i ? !c : c)))
                }
                className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md border text-[11px] transition-colors ${
                  done || checked[i]
                    ? "border-gold-500/50 bg-gold-500/15 text-gold-400"
                    : "border-carbon-600 text-transparent"
                }`}
                aria-label={`Marcar paso ${i + 1}`}
              >
                ✓
              </button>
              <span className={`text-sm ${done || checked[i] ? "text-bone-500 line-through" : "text-bone-300"}`}>
                {i + 1}. {step}
              </span>
            </li>
          ))}
        </ol>

        {!done && (
          <Button
            onClick={handleComplete}
            disabled={!allChecked || loading}
            className="mt-5 w-full"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Completar misión
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
