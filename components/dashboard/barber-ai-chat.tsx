"use client";

import * as React from "react";
import Link from "next/link";
import { Bot, Send, Loader2, User, AlertTriangle, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MODULES } from "@/lib/data/course-content";
import { cn } from "@/lib/utils";

type ChatMessage = { role: "user" | "assistant"; content: string; connected?: boolean };

const QUICK_PROMPTS = [
  "¿Cómo hago un fade?",
  "¿Por qué me quedó marcada esta línea?",
  "¿Qué máquina debería usar?",
  "No entendí esta parte",
  "¿Qué debería practicar ahora?",
  "¿Cuál es mi próximo módulo?",
];

function findModuleReference(text: string) {
  const match = text.match(/[Mm]ódulo\s+(\d+)/);
  if (!match) return null;
  const order = Number(match[1]);
  return MODULES.find((m) => m.order === order) ?? null;
}

export function BarberAIChat({ studentName }: { studentName: string }) {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Hola ${studentName}, soy Barber AI. Puedo ayudarte con dudas técnicas del curso, decirte qué te conviene repasar según tu progreso, o armarte un mini quiz de práctica. ¿En qué te ayudo?`,
      connected: true,
    },
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/barber-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
      }),
    });
    const data = await res.json();
    setLoading(false);
    setMessages((prev) => [...prev, { role: "assistant", content: data.reply, connected: data.connected }]);
  }

  return (
    <Card className="flex h-[70vh] flex-col overflow-hidden sm:h-[75vh]">
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
        {messages.map((m, i) => {
          const moduleRef = m.role === "assistant" ? findModuleReference(m.content) : null;
          return (
            <div key={i} className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}>
              <div
                className={cn(
                  "flex h-8 w-8 flex-none items-center justify-center rounded-full",
                  m.role === "assistant" ? "bg-gold-500/15 text-gold-400" : "bg-carbon-800 text-bone-300"
                )}
              >
                {m.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>
              <div className={cn("flex max-w-[85%] flex-col gap-2", m.role === "user" && "items-end")}>
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                    m.role === "assistant"
                      ? m.connected === false
                        ? "border border-warning/30 bg-warning/5 text-bone-300"
                        : "bg-carbon-800 text-bone-100"
                      : "bg-gold-500 text-carbon-950"
                  )}
                >
                  {m.connected === false && (
                    <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-warning">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      Barber AI no conectado
                    </div>
                  )}
                  {m.content}
                </div>
                {moduleRef && (
                  <Link
                    href={`/dashboard/modulo/${moduleRef.id}`}
                    className="flex items-center gap-1.5 rounded-full border border-gold-500/25 bg-gold-500/5 px-3 py-1 text-xs font-medium text-gold-400 hover:bg-gold-500/10"
                  >
                    <BookOpen className="h-3 w-3" />
                    Ir a Módulo {moduleRef.order} — {moduleRef.title}
                  </Link>
                )}
              </div>
            </div>
          );
        })}
        {loading && (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
              <Bot className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1.5 rounded-2xl bg-carbon-800 px-4 py-3">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-bone-500" />
              <span className="text-xs text-bone-500">Barber AI está pensando...</span>
            </div>
          </div>
        )}
      </div>

      {messages.length <= 1 && (
        <div className="no-scrollbar flex gap-2 overflow-x-auto border-t border-carbon-800 px-4 py-3 sm:px-6">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => sendMessage(p)}
              className="flex-none rounded-full border border-carbon-600 px-3 py-1.5 text-xs text-bone-400 hover:border-gold-500/40 hover:text-gold-400"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="flex items-end gap-2 border-t border-carbon-800 p-3 sm:p-4"
      >
        <Textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage(input);
            }
          }}
          placeholder="Preguntale algo a Barber AI..."
          className="max-h-32 min-h-[44px] resize-none py-2.5"
        />
        <Button type="submit" size="icon" disabled={loading || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Card>
  );
}
