"use client";

import * as React from "react";
import { ChevronDown, PlayCircle, FileText } from "lucide-react";
import { cn, formatDuration } from "@/lib/utils";
import type { CourseModule } from "@/lib/types";

export function ModuleAccordion({ modules }: { modules: CourseModule[] }) {
  const [open, setOpen] = React.useState<string | null>(modules[0]?.id ?? null);

  return (
    <div className="flex flex-col gap-4">
      {modules.map((m) => {
        const isOpen = open === m.id;
        const totalMin = Math.round(m.lessons.reduce((s, l) => s + l.durationSec, 0) / 60);
        return (
          <div
            key={m.id}
            className={cn(
              "overflow-hidden rounded-2xl border transition-colors",
              isOpen ? "border-gold-500/30 bg-carbon-900/60" : "border-carbon-700 bg-carbon-850/50"
            )}
          >
            <button
              className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
              onClick={() => setOpen(isOpen ? null : m.id)}
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    "flex h-11 w-11 flex-none items-center justify-center rounded-xl border text-sm font-semibold",
                    isOpen
                      ? "border-gold-500/40 bg-gold-500/10 text-gold-400"
                      : "border-carbon-600 bg-carbon-800 text-bone-400"
                  )}
                >
                  {m.order}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-bone-100 sm:text-lg">{m.title}</h3>
                  <p className="mt-0.5 text-xs text-bone-600 sm:text-sm">
                    {m.lessons.length} lecciones · ~{totalMin} min
                  </p>
                </div>
              </div>
              <ChevronDown
                className={cn(
                  "h-5 w-5 flex-none text-bone-500 transition-transform duration-300",
                  isOpen && "rotate-180 text-gold-400"
                )}
              />
            </button>

            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="min-h-0">
                <p className="px-5 pb-4 text-sm leading-relaxed text-bone-500 sm:px-6">
                  {m.description}
                </p>
                <ul className="divide-y divide-carbon-800 border-t border-carbon-800">
                  {m.lessons.map((lesson) => (
                    <li key={lesson.id} className="flex items-center gap-3 px-5 py-3.5 sm:px-6">
                      {lesson.type === "VIDEO" ? (
                        <PlayCircle className="h-4 w-4 flex-none text-bone-600" />
                      ) : (
                        <FileText className="h-4 w-4 flex-none text-bone-600" />
                      )}
                      <span className="flex-1 text-sm text-bone-300">{lesson.title}</span>
                      <span className="text-xs tabular-nums text-bone-700">
                        {formatDuration(lesson.durationSec)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
