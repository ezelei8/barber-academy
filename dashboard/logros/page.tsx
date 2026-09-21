import type { Metadata } from "next";
import { Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCurrentStudent } from "@/lib/get-current-student";
import { getLockedAchievements, getUnlockedAchievements } from "@/lib/gamification";

export const metadata: Metadata = { title: "Logros" };

export default async function LogrosPage() {
  const student = await getCurrentStudent();
  const unlocked = getUnlockedAchievements(student);
  const locked = getLockedAchievements(student);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-bone-100 sm:text-3xl">Logros</h1>
        <p className="mt-1 text-sm text-bone-500">
          {unlocked.length} de {unlocked.length + locked.length} logros desbloqueados.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {unlocked.map((a) => (
          <Card key={a.id} className="border-gold-500/25 bg-gold-500/5">
            <CardContent className="flex flex-col items-center p-5 text-center">
              <span className="text-3xl">{a.icon}</span>
              <p className="mt-3 text-sm font-semibold text-bone-100">{a.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-bone-500">{a.description}</p>
              <Badge variant="gold" className="mt-3">Desbloqueado</Badge>
            </CardContent>
          </Card>
        ))}

        {locked.map((a) => (
          <Card key={a.id} className="opacity-60">
            <CardContent className="flex flex-col items-center p-5 text-center">
              <span className="relative text-3xl grayscale">
                {a.icon}
                <Lock className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-carbon-900 p-0.5 text-bone-600" />
              </span>
              <p className="mt-3 text-sm font-semibold text-bone-300">{a.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-bone-600">{a.description}</p>
              <Badge variant="neutral" className="mt-3">Bloqueado</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
