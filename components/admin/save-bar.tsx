"use client";

import * as React from "react";
import { Info, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Reused across admin CRUD-ish screens. Since there's no database connected
 * yet, "saving" is an honest no-op: it shows exactly what's blocking real
 * persistence instead of pretending the write succeeded silently.
 */
export function AdminSaveBar({ entity }: { entity: string }) {
  const [state, setState] = React.useState<"idle" | "saving" | "shown">("idle");

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-2.5 text-xs text-bone-600">
        <Info className="mt-0.5 h-3.5 w-3.5 flex-none text-info" />
        <span>
          Los cambios de {entity} se guardan en base de datos una vez conectado PostgreSQL
          (ver README). Por ahora esta pantalla es de solo demostración de UI.
        </span>
      </div>
      <Button
        onClick={() => {
          setState("saving");
          window.setTimeout(() => setState("shown"), 500);
        }}
        disabled={state === "saving"}
        className="sm:flex-none"
      >
        {state === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {state === "shown" ? "Sin base de datos conectada" : "Guardar cambios"}
      </Button>
    </div>
  );
}
