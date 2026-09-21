"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Trophy } from "lucide-react";

type XPToastPayload = {
  id: number;
  xp: number;
  label: string;
  kind: "xp" | "achievement" | "mission" | "level";
};

type XPToastContextValue = {
  fireXP: (xp: number, label: string) => void;
  fireAchievement: (label: string) => void;
  fireMission: (label: string) => void;
  fireLevelUp: (label: string) => void;
};

const XPToastContext = React.createContext<XPToastContextValue | null>(null);

export function useXPToast() {
  const ctx = React.useContext(XPToastContext);
  if (!ctx) throw new Error("useXPToast must be used within XPToastProvider");
  return ctx;
}

/**
 * Client-side gamification feedback layer (XP gained, mission complete,
 * achievement unlocked, level up). Purely presentational: it renders what
 * the server already computed and returned. Kept deliberately understated
 * per spec — professional, not a children's game.
 */
export function XPToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<XPToastPayload[]>([]);

  const push = React.useCallback((toast: Omit<XPToastPayload, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2400);
  }, []);

  const value: XPToastContextValue = {
    fireXP: (xp, label) => push({ xp, label, kind: "xp" }),
    fireAchievement: (label) => push({ xp: 0, label, kind: "achievement" }),
    fireMission: (label) => push({ xp: 0, label, kind: "mission" }),
    fireLevelUp: (label) => push({ xp: 0, label, kind: "level" }),
  };

  return (
    <XPToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-16 z-[100] flex flex-col items-center gap-2 sm:top-20">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2.5 rounded-full border border-gold-500/30 bg-carbon-900/95 px-4 py-2.5 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)] backdrop-blur"
            >
              {t.kind === "achievement" ? (
                <Trophy className="h-4 w-4 text-gold-400" />
              ) : (
                <Sparkles className="h-4 w-4 text-gold-400" />
              )}
              <span className="text-sm font-medium text-bone-100">
                {t.kind === "xp" && `+${t.xp} XP`}
                {t.kind !== "xp" && t.label}
              </span>
              {t.kind === "xp" && t.label && (
                <span className="text-sm text-bone-500">· {t.label}</span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </XPToastContext.Provider>
  );
}
