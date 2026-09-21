import type { Metadata } from "next";
import { MISSIONS } from "@/lib/data/gamification-config";
import { isMissionCompleted } from "@/lib/store";
import { MissionCard } from "@/components/dashboard/mission-card";

export const metadata: Metadata = { title: "Misiones" };

export default function MisionesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-bone-100 sm:text-3xl">Misiones</h1>
        <p className="mt-1 text-sm text-bone-500">
          Objetivos cortos y concretos para avanzar todos los días.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {MISSIONS.map((mission) => (
          <MissionCard key={mission.id} mission={mission} completed={isMissionCompleted(mission.id)} />
        ))}
      </div>
    </div>
  );
}
