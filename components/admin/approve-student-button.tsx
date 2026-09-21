"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EnrollmentStatus } from "@/lib/types";

export function ApproveStudentButton({
  studentId,
  status,
}: {
  studentId: string;
  status: EnrollmentStatus;
}) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  async function setStatus(next: EnrollmentStatus) {
    setLoading(true);
    const res = await fetch(`/api/admin/students/${studentId}/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setLoading(false);
    if (res.ok) router.refresh();
  }

  if (status === "PENDING_PAYMENT") {
    return (
      <Button size="sm" variant="primary" onClick={() => setStatus("ACTIVE")} disabled={loading}>
        {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
        Aprobar pago
      </Button>
    );
  }

  return (
    <Button size="sm" variant="ghost" onClick={() => setStatus("PENDING_PAYMENT")} disabled={loading}>
      {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RotateCcw className="h-3.5 w-3.5" />}
      Revertir
    </Button>
  );
}
