"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import type { CourseTask } from "@/lib/types";

export function TaskReviewCard({ task, moduleTitle }: { task: CourseTask; moduleTitle: string }) {
  const router = useRouter();
  const [feedback, setFeedback] = React.useState(task.feedback ?? "");
  const [loading, setLoading] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  async function handleSave() {
    setLoading(true);
    const res = await fetch(`/api/admin/tasks/${task.id}/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feedback }),
    });
    setLoading(false);
    if (res.ok) {
      setSaved(true);
      router.refresh();
      window.setTimeout(() => setSaved(false), 2000);
    }
  }

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-bone-600">{moduleTitle} · {task.type}</p>
            <h3 className="mt-0.5 text-sm font-semibold text-bone-100">{task.title}</h3>
          </div>
          <Badge variant="neutral">+{task.xpReward} XP</Badge>
        </div>
        <div className="mt-3">
          <Textarea
            rows={2}
            placeholder="Feedback para el alumno..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>
        <div className="mt-2 flex justify-end">
          <Button size="sm" variant="secondary" onClick={handleSave} disabled={loading}>
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : saved ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-success" />
            ) : null}
            {saved ? "Guardado" : "Guardar feedback"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
